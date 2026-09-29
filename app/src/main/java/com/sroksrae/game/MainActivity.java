package com.sroksrae.game;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.webkit.WebSettings;
import android.webkit.WebChromeClient;
import android.webkit.ConsoleMessage;
import android.webkit.WebView;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;

/** Offline game shell with an optional, user-approved APK updater. */
public class MainActivity extends Activity {
    private WebView game;
    private UpdateManager updates;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(0xff245d53);
        getWindow().setNavigationBarColor(0xff245d53);
        game = new WebView(this);
        if (android.os.Build.VERSION.SDK_INT < 29) game.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        game.setBackgroundColor(0xffe9d7ae);
        WebSettings settings = game.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setDefaultTextEncodingName("UTF-8");
        game.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onConsoleMessage(ConsoleMessage message) {
                Log.w("SrokSraeWeb", message.message() + " at " + message.sourceId() + ":" + message.lineNumber());
                return true;
            }
        });
        updates = new UpdateManager(this);
        game.addJavascriptInterface(new Object() {
            @JavascriptInterface public void checkForUpdates() {
                runOnUiThread(() -> updates.check(true));
            }
        }, "SrokAndroid");
        game.loadUrl("file:///android_asset/index.html");
        setContentView(game);
        new Handler().postDelayed(() -> updates.check(false), 3500);
    }

    @Override public void onBackPressed() {
        game.evaluateJavascript("window.gameBack ? window.gameBack() : false", result -> {
            if ("false".equals(result)) MainActivity.super.onBackPressed();
        });
    }

    @Override protected void onDestroy() {
        game.destroy();
        super.onDestroy();
    }

    @Override protected void onActivityResult(int requestCode, int resultCode, android.content.Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        updates.onActivityResult(requestCode);
    }
}
