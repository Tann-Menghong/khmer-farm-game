# ស្រុកស្រែ • Srok Srae

A complete, self-contained, offline Cambodian village farming game for Android. It is an original single-player game with three story campaigns and three endings. It does not use Hay Day code, art, names, or assets.

[Preview the game](preview.png)

## Play

1. Drag the village map to explore your farm, use + and − to zoom, select a seed, then tap a field to plant or harvest. The Field grid is available for precise planting. Rice seeds are always free.
2. Tap the pond to catch fish. Buy chickens and a water buffalo as you level up, then collect their products.
3. Fill village orders, cook meals, and sell goods in the market.
4. Follow five village chapters, decorate the village, and host the festival.
5. Explore Tonle Sap, Kep, Kampong Speu, and Mondulkiri for regional goods. Complete four journey chapters and hold a river celebration.
6. Claim a daily market gift. Daily weather changes the growing time of newly planted crops. Farming and achievements remain available after both endings.
7. Spend coins on water channels, a fishing net, a travel cart, and a clay stove to improve production.
8. Expand the farm from 12 to 20 plots. Grow cotton, make rice flour, lotus garlands, woven krama, and palm sugar candy in the workshop.
9. Give favorite items to four village neighbors. Friendship earns rewards and helps open the makers fair.
10. Tap buildings on the map for fishing, animals, cooking, weaving, orders, trading, and regional journeys. Buy decorations in the Journal, then tap Arrange on the map to move them.

The game has an interactive isometric village map, thirteen crops, eleven cooking recipes, four workshop crafts, four travel destinations, four permanent upgrades, three animal or fishing stations, rotating village orders, four friends, movable decorations, twelve achievements, English and Khmer controls, sound settings, a help screen, and automatic local saves. Farming needs no internet connection or account. Version 1.4 reads and upgrades saves from versions 1.0 through 1.3.

The art is made from original CSS shapes, a small Android vector icon, and device emoji. Recipes use simplified game ingredients. Cambodian cultural names and Khmer copy should be reviewed with Cambodian players before public release.

## Install the test APK

Download [the current debug APK](releases/srok-srae-v1.4-debug.apk) to an Android phone and open it, or use Android Debug Bridge:

```powershell
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

This is a debug-signed APK for direct installation. A Play Store release requires your own production signing key, store listing, device testing, and final cultural and language review.

## In-app updates

When online, the app checks the public [release manifest](releases/latest.json) at launch at most once per day. You can also use **Settings → Check**. If a newer version is listed, the app offers to download it, checks its SHA-256 hash, and opens Android's installer. Android asks the player to approve installation and may require allowing installs from Srok Srae. The game itself remains playable offline. Existing local saves remain in place when an update installs over the same app.

To publish a later update, increase `versionCode` and `versionName`, build a new APK with the **same signing key**, copy it into `releases/`, then update `releases/latest.json` with its URL and SHA-256 hash before pushing. These prototype APKs use the local Android debug key; APKs built with a different key cannot update this installation. The public GitHub repository hosts the update files, so a private repository would require a different update server.

## Build and test

Open the folder in Android Studio and build the `app` module, or use JDK 17 and the Android SDK:

```powershell
.\gradlew.bat assembleDebug
node scripts/smoke-test.mjs
```

The smoke test uses locally installed Google Chrome and checks the map, farming, fishing, old-save migration, all three endings, the daily gift, travel, regional cooking, all four upgrades, workshop crafting, friendships, and land expansion. The app has also been launched and interacted with on Android emulators.

Regional themes were checked against Cambodia's Ministry of Tourism material on [Tonle Sap](https://tourismcambodia.org/public/provinces/search/detail/389/phnom-krom-tonle-sap-lake), [Kep seafood and Kampot pepper](https://www.tourismcambodia.org/public/index.php/official-activities/new-beginnings-a-gourmet-guide-to-cambodia), and [regional products including Kampong Speu palm sugar and Koh Trong pomelos](https://www.tourismcambodia.org/public/index.php/official-activities/nom-banh-chok-siem-reap-set-for-trademark-by-ministry). Game recipes use simplified ingredients.

The krama workshop theme follows [UNESCO's description of krama as a Cambodian handwoven cotton or silk textile](https://ich.unesco.org/en/RL/cultural-practices-and-expressions-linked-to-krama-a-traditional-woven-textile-in-cambodia-02115). The game simplifies the real weaving process.

Game source: `app/src/main/assets/`. Android shell: `app/src/main/java/com/sroksrae/game/MainActivity.java`.
