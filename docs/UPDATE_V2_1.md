# Srok Srae v2.1.0 — Growing Village

## Added

- Level progression from 7 to 10. Level 7 opens Fruit Harvest; levels 8, 9, and 10 open the orchard, boat, and hall purchases.
- Fruit Harvest, a three-round item-earning activity with a saved star rating and cooldown. Success gives mango and XP.
- Three original illustrated property assets, including an orchard, a produce boat, and a community hall. Source PNGs are in `art-source/`; the game bundles optimized transparent WebP files.
- Three daily market demand goods with 10–20% positive sale bonuses, computed locally and usable offline.
- A visible village prosperity score based on existing level, property, decoration, and story progress.

## Improved

- Owning the fruit orchard adds one fruit to banana, mango, coconut, watermelon, pomelo, and durian harvests.
- Owning the produce boat adds one fish to completed Tonle Sap journeys or one crab to completed Kep journeys.
- Owning the community hall adds eight XP to completed villager orders.
- Purchases visibly change the village map; the boat replaces the dock art at Explore.
- Market cards and the actual sale action use the same bonus calculation.

## Fixed and preserved

- Schema 12 migrates older supported local saves, preserving profile, plots, inventory, orders, stories, production jobs, and properties.
- Existing offline farming, animals, cooking, crafting, fishing, orders, journeys, campaigns, and save backup/recovery remain available.
- English and Khmer labels are provided for new actions. Native-speaker review is still needed for broader release.

## Verification

`node scripts/smoke-test.mjs` passes for old-save migration, three campaign endings, ten item-earning activities, property effects, daily demand, queues, batch harvest and sale, journeys, and backup recovery. `node scripts/capture-v2-1.mjs` produced English and Khmer phone-size previews in `qa/`. Gradle assembled a signed Android release; `aapt` confirms versionCode 14 and versionName 2.1.0. The certificate SHA-256 remains `18a834d0d17f06731404aea4211f808407f130737effa6d6f6a3b4c896788bab`, allowing an APK signed with this prototype key to install over v2.0.0. Installation and launch were checked on the Android emulator.

Physical-device frame-time, RAM, battery, and touch/Khmer reviews remain open. The game targets smooth 60 FPS on capable hardware; this is not a measured guarantee. Some older art and secondary Unicode symbols still need replacement. The full [major update plan](MAJOR_UPDATE_PLAN.md) separates later work from what shipped here.
