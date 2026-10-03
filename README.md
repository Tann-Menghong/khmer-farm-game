# ស្រុកស្រែ • Srok Srae

An original offline Cambodian village farming game for Android, with three story campaigns and three endings. The [design audit and roadmap](docs/DESIGN_AUDIT_AND_ROADMAP.md) distinguishes current features from planned polish and content. The [v1.7.0 update guide](docs/UPDATE_V1_7.md) explains the new village games, property purchases, art, and rewards.

[Preview the game](preview.png)

## Play

1. Drag the village map to explore your farm, use + and − to zoom, then tap an empty field to choose a seed. Tap a ripe field to harvest. The Field grid is available for precise planting. Rice seeds are always free.
2. Tap the pond to cast a line and catch fish. Buy chickens and a water buffalo as you level up, feed them, then collect their products.
3. Fill village orders, cook meals, and sell goods in the market.
4. Follow five village chapters, decorate the village, and host the festival.
5. Explore Tonle Sap, Kep, Kampong Speu, and Mondulkiri for regional goods. Complete four journey chapters and hold a river celebration.
6. Claim a daily market gift. Daily weather changes the growing time of newly planted crops. Farming and achievements remain available after both endings.
7. Spend coins on water channels, a fishing net, a travel cart, and a clay stove to improve production.
8. Expand the farm from 12 to 20 plots. Grow cotton, make rice flour, lotus garlands, woven krama, and palm sugar candy in the workshop.
9. Give favorite items to four village neighbors. Friendship earns rewards and helps open the makers fair.
10. Tap buildings on the map for fishing, animals, cooking, weaving, orders, trading, and regional journeys. Buy decorations in the Journal, then tap Arrange on the map to move them.
11. Play five optional village mini games: sort ripe rice, find pond pairs, guide water through gates, match a krama pattern using cotton, and pack market baskets. Each has a saved cooldown and a small reward.
12. Earn coins through farming, orders, and trade. Buy a family home for a better daily gift and a produce truck for sale bonuses and faster journeys. Both appear on the village map.

The game has an interactive isometric village map, sixteen crops, thirteen cooking recipes, four workshop crafts, four travel destinations, four permanent upgrades, two earnable property purchases, three animal or fishing stations, five mini games, rotating village orders, four friends, movable decorations, thirteen achievements, English and Khmer controls, graphics and reduced motion settings, a help screen, and automatic local saves with backup recovery. Farming needs no internet connection or account. Version 1.7.0 reads and upgrades earlier local saves.

The art includes five original illustrated WebP atlases and three new HD illustrations, with source PNGs in `art-source/`. Some secondary labels and effects still use Unicode symbols and need a final art pass. Recipes use simplified game ingredients. Cambodian cultural names and Khmer copy should be reviewed with Cambodian players before wider release. Smooth 60 FPS is a target on suitable devices, not yet a measured device guarantee.

## Install the release APK

Download the [Srok Srae 1.7.0 APK](https://github.com/Tann-Menghong/khmer-farm-game/releases/download/v1.7.0/srok-srae-v1.7.0-release.apk) to an Android phone and open it, or use Android Debug Bridge. See the [v1.7.0 release notes](https://github.com/Tann-Menghong/khmer-farm-game/releases/tag/v1.7.0).

```powershell
adb install -r releases/srok-srae-v1.7.0-release.apk
```

This is a non-debuggable release build signed with the local prototype certificate. The signature was verified, but installation over an existing APK requires that the existing APK was signed with the same certificate. Google Play publication requires a protected production signing plan, store listing, device testing, and final cultural and language review.

## In-app updates

When online, the app checks the public [release manifest](releases/latest.json) at launch at most once per day. You can also use **Settings → Check**. If a newer published version is listed, the app shows release notes and size when provided, then downloads only after player action. Progress, cancel, retry and SHA-256 verification precede Android's installer. Android asks the player to approve installation and may require allowing installs from Srok Srae. The game itself remains playable offline. The v1.7.0 manifest points to the bundled APK and its verified hash.

To publish a later update, increase `versionCode` and `versionName`, build a new APK with the **same signing key**, copy it into `releases/`, then update `releases/latest.json` with its URL and SHA-256 hash before pushing. These prototype APKs use the local Android debug key; APKs built with a different key cannot update this installation. The public GitHub repository hosts the update files, so a private repository would require a different update server.

## Build and test

Open the folder in Android Studio and build the `app` module, or use JDK 17 and the Android SDK:

```powershell
.\gradlew.bat assembleRelease
node scripts/smoke-test.mjs
```

The smoke test uses locally installed Google Chrome and checks the map, farming, fishing, animal care, all five mini games, property purchases and benefits, old-save migration and recovery, all three endings, the daily gift, travel, regional cooking, all four upgrades, workshop crafting, friendships, and land expansion. `node scripts/capture-ui.mjs` saves English and Khmer 390 px visual previews. A live in-app update download still needs device verification.

Regional themes were checked against Cambodia's Ministry of Tourism material on [Tonle Sap](https://tourismcambodia.org/public/provinces/search/detail/389/phnom-krom-tonle-sap-lake), [Kep seafood and Kampot pepper](https://www.tourismcambodia.org/public/index.php/official-activities/new-beginnings-a-gourmet-guide-to-cambodia), and [regional products including Kampong Speu palm sugar and Koh Trong pomelos](https://www.tourismcambodia.org/public/index.php/official-activities/nom-banh-chok-siem-reap-set-for-trademark-by-ministry). Game recipes use simplified ingredients.

The krama workshop theme follows [UNESCO's description of krama as a Cambodian handwoven cotton or silk textile](https://ich.unesco.org/en/RL/cultural-practices-and-expressions-linked-to-krama-a-traditional-woven-textile-in-cambodia-02115). The game simplifies the real weaving process.

Game source: `app/src/main/assets/`. Android shell: `app/src/main/java/com/sroksrae/game/MainActivity.java`.
