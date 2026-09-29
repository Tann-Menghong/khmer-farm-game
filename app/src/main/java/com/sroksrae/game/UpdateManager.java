package com.sroksrae.game;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;

/** Checks a small public release manifest and installs only a matching SHA-256 APK. */
final class UpdateManager {
    private static final String MANIFEST = "https://raw.githubusercontent.com/Tann-Menghong/khmer-farm-game/main/releases/latest.json";
    private static final String APK_PREFIX = "https://raw.githubusercontent.com/Tann-Menghong/khmer-farm-game/main/releases/";
    private static final int UNKNOWN_SOURCES_REQUEST = 10;
    private static final long CHECK_INTERVAL = 24L * 60 * 60 * 1000;
    private final Activity activity;
    private boolean checking;

    UpdateManager(Activity activity) { this.activity = activity; }

    void check(boolean manual) {
        if (checking) return;
        if (!manual && System.currentTimeMillis() - activity.getPreferences(0).getLong("lastUpdateCheck", 0) < CHECK_INTERVAL) return;
        checking = true;
        new Thread(() -> {
            try {
                HttpURLConnection connection = open(MANIFEST, 7000);
                JSONObject manifest;
                try (InputStream input = connection.getInputStream()) {
                    ByteArrayOutputStream output = new ByteArrayOutputStream();
                    byte[] buffer = new byte[1024];
                    int count;
                    while ((count = input.read(buffer)) != -1) {
                        if (output.size() + count > 8192) throw new Exception("Update manifest too large");
                        output.write(buffer, 0, count);
                    }
                    manifest = new JSONObject(output.toString("UTF-8"));
                } finally { connection.disconnect(); }
                int installed = activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0).versionCode;
                int available = manifest.getInt("versionCode");
                activity.getPreferences(0).edit().putLong("lastUpdateCheck", System.currentTimeMillis()).apply();
                activity.runOnUiThread(() -> {
                    checking = false;
                    if (activity.isFinishing()) return;
                    if (available > installed) showUpdate(manifest);
                    else if (manual) message("Up to date", "You have the latest Srok Srae version.");
                });
            } catch (Exception error) {
                Log.w("SrokSraeUpdate", "Check failed", error);
                activity.runOnUiThread(() -> {
                    checking = false;
                    if (manual && !activity.isFinishing()) message("Update check unavailable", "Connect to the internet and try again.");
                });
            }
        }, "SrokSraeUpdateCheck").start();
    }

    private HttpURLConnection open(String address, int timeout) throws Exception {
        URL url = new URL(address);
        if (!"https".equals(url.getProtocol())) throw new Exception("HTTPS required");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(timeout);
        connection.setReadTimeout(timeout);
        return connection;
    }

    private void showUpdate(JSONObject manifest) {
        String version = manifest.optString("versionName", "new version");
        String notes = manifest.optString("notes", "New village improvements are ready.");
        new AlertDialog.Builder(activity)
                .setTitle("Srok Srae " + version + " is ready")
                .setMessage(notes + "\n\nDownload and install this update? Your farm save stays on this device.")
                .setNegativeButton("Later", null)
                .setPositiveButton("Update", (dialog, which) -> download(manifest))
                .show();
    }

    private void download(JSONObject manifest) {
        AlertDialog progress = new AlertDialog.Builder(activity)
                .setTitle("Downloading update")
                .setMessage("Please wait while the APK is verified.")
                .setCancelable(false)
                .create();
        progress.show();
        new Thread(() -> {
            File part = new File(activity.getCacheDir(), UpdateApkProvider.FILE_NAME + ".part");
            try {
                String url = manifest.getString("apkUrl");
                String expected = manifest.getString("sha256");
                if (!url.startsWith(APK_PREFIX) || !expected.matches("(?i)[0-9a-f]{64}")) throw new Exception("Invalid update manifest");
                HttpURLConnection connection = open(url, 15000);
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                long total = 0;
                try (InputStream input = connection.getInputStream(); FileOutputStream output = new FileOutputStream(part)) {
                    byte[] buffer = new byte[8192];
                    int count;
                    while ((count = input.read(buffer)) != -1) {
                        total += count;
                        if (total > 120L * 1024 * 1024) throw new Exception("Update too large");
                        output.write(buffer, 0, count);
                        digest.update(buffer, 0, count);
                    }
                } finally { connection.disconnect(); }
                StringBuilder actual = new StringBuilder();
                for (byte b : digest.digest()) actual.append(String.format("%02x", b & 0xff));
                if (!actual.toString().equalsIgnoreCase(expected)) throw new Exception("Update checksum mismatch");
                File target = new File(activity.getCacheDir(), UpdateApkProvider.FILE_NAME);
                if (target.exists() && !target.delete()) throw new Exception("Cannot replace old update");
                if (!part.renameTo(target)) throw new Exception("Cannot save update");
                activity.runOnUiThread(() -> { progress.dismiss(); if (!activity.isFinishing()) install(); });
            } catch (Exception error) {
                Log.w("SrokSraeUpdate", "Download failed", error);
                part.delete();
                activity.runOnUiThread(() -> {
                    progress.dismiss();
                    if (!activity.isFinishing()) message("Download failed", "The update could not be downloaded or verified. Please try again.");
                });
            }
        }, "SrokSraeUpdateDownload").start();
    }

    private void install() {
        if (Build.VERSION.SDK_INT >= 26 && !activity.getPackageManager().canRequestPackageInstalls()) {
            Intent settings = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                    Uri.parse("package:" + activity.getPackageName()));
            activity.startActivityForResult(settings, UNKNOWN_SOURCES_REQUEST);
            return;
        }
        Uri uri = Uri.parse("content://" + activity.getPackageName() + ".updates/update.apk");
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(uri, "application/vnd.android.package-archive");
        intent.setClipData(ClipData.newRawUri("Srok Srae update", uri));
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        try { activity.startActivity(intent); }
        catch (Exception error) { message("Installer unavailable", "Download the APK from the releases folder to update."); }
    }

    void onActivityResult(int requestCode) {
        if (requestCode != UNKNOWN_SOURCES_REQUEST || Build.VERSION.SDK_INT < 26) return;
        if (activity.getPackageManager().canRequestPackageInstalls()) install();
        else message("Installation not allowed", "Allow installs from Srok Srae to finish this update.");
    }

    private void message(String title, String body) {
        new AlertDialog.Builder(activity).setTitle(title).setMessage(body).setPositiveButton("OK", null).show();
    }
}
