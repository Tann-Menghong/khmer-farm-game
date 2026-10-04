# Srok Srae v2.0.0 — Living Village

## Included in this release

- The player profile now saves a farmer name, farm name, village name, and one of three original illustrated portraits. It previews the next level's available crops, recipes, workshops, properties, or journeys within the existing seven-level progression.
- Village orders show a named neighbor, a short request, the needed goods, and a route toward a missing ingredient. The board keeps the same saved orders and rewards.
- The market includes a visual, searchable storage view with crop, animal, fish, food, craft, and regional filters. Cards show quantity, sale value, and up to three production uses.
- The kitchen and workshop each have two independent timed slots. Ingredients are spent when work starts; the finished item and XP are awarded on collection. In-progress v1.9 workshop jobs migrate into the new queue, including the rice-mill output bonus.
- Buffalo Bath is the ninth item-earning mini-game. The player brushes, rinses, and dries their owned buffalo to earn a product and a saved star rating. Fishing still requires its catch game to obtain fish.
- Rice, lotus, banana, and water spinach fields now show five original growth-stage illustrations. The map and field view update their art as the crops grow; ripe crops sway unless reduced motion or low graphics is selected.
- The village map shows ready production buildings. The new portraits and buffalo illustration share the game's warm illustrated style. Original source PNGs and optimized WebP assets are included in the repository.
- Save schema 11 validates currency, inventory, orders, and production jobs before loading. The existing local backup and recovery flow remains in place.

## Play and save behavior

Core gameplay, including all nine mini-games, remains offline. Named orders and the storage interface do not change saved inventory. Existing v1.9.0 saves upgrade on launch. The Android package ID and prototype signing certificate remain the same so this APK can install over v1.9.0.

## Verification

`node scripts/smoke-test.mjs` checks the farming and story regressions, crop image decoding and stage changes, profile, queues, old workshop-job migration, storage filters, and the ninth mini-game reward. `node scripts/capture-v2.mjs` creates phone-size English and Khmer previews in `qa/`. The release APK is built with Gradle and verified with Android's signing tool. On the emulator, v1.9.0 detected v2.0.0, downloaded and verified the APK, requested Android installation approval, installed over v1.9.0, and launched v2.0.0.

## Remaining work

- The other twelve crops still use the previous illustrated atlas rather than a full five-stage set.
- Player levels currently stop at seven. Property benefits are functional, but additional levels, buildings, vehicles, and management systems require balance and content work.
- A physical Android device has not yet been profiled. 60 FPS is a target, not a verified claim. Sound is currently simple generated feedback rather than a finished ambience and music mix.
- Khmer copy, food descriptions, and regional details need review with Cambodian players before a wider launch.
