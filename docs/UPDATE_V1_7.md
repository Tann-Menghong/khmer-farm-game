# Srok Srae v1.7.0: village activities and property

This update adds five optional offline mini games, two earnable property purchases, a cleaner phone layout, and three original HD illustrations. Existing saves from schema 2 through 7 migrate to schema 8. The farm, inventory, campaigns, and earlier upgrades remain available.

## Village games

| Activity | Where | How to play | Reward | Cooldown |
|---|---|---|---|---|
| Rice sorting | Farm | Tap three ripe bundles in each of three rounds. | 2 rice and 5 XP without mistakes; otherwise 1 rice and 3 XP. | 90 seconds |
| Pond pairs | Farm | Turn over six illustrated cards and find three pairs. | 1 lotus and 6 XP without misses; otherwise 1 lotus and 4 XP. | 120 seconds |
| Water channels | Farm | Tap four gates until each large arrow matches its target. | 8 coins and 4 XP. | 120 seconds |
| Krama pattern | Kitchen → Workshop | Match four colored stripes. Three cotton are consumed only on completion. | 1 krama and 23 XP, plus 5 XP for a perfect pattern. Counts toward crafting and the makers story. | 90 seconds |
| Market baskets | Market | Pick the basket with the requested produce count in three rounds. | 15 coins and 5 XP without mistakes; otherwise 10 coins and 3 XP. | 180 seconds |

Games have no countdown or permanent failure. Leaving does not spend resources. A completed activity starts a saved cooldown. Six completions earn the Village Games achievement. These are light games inspired by village tasks, not simulations of actual Cambodian weaving or water management.

## Earn, save, and buy

The Village screen now shows available coins and the two property purchases. Players can buy each once with coins earned through normal farming, orders, trade, and stories.

| Purchase | Unlock | Cost | Visible result | Benefit |
|---|---:|---:|---|---|
| Family home | Level 3 | 420 coins | Larger illustrated house on the farm map | Daily village gift rises from 30 to 50 coins. |
| Produce truck | Level 5 | 720 coins | Illustrated truck beside the village road | Each sale earns bonus coins; journeys started afterward finish 20% sooner. |

The truck adds at least one coin per sale, with the bonus growing with the item's price. An existing journey keeps its original finish time when the truck is bought. Property ownership and benefits persist in local saves.

## Visual and interface changes

- The farm map appears before the optional activities. Short instructions remain beside the action that needs them.
- The top bar focuses on coins, level, and XP; weather is shown on the map toolbar. Only Explore and Field grid show the scenic strip, leaving more room for task screens.
- Village property cards show price, unlock level, ownership, and the gameplay benefit. Touch controls are at least about 44 CSS pixels in the updated areas.
- New generated original artwork: Cambodian countryside panorama, raised wooden family home, and produce truck. Optimized WebP files are used in the app; HD source PNGs are in `art-source/`.
- Auto, High, and Low graphics options are available. High adds subtle transform and opacity motion; Low removes extra effects. Reduced motion remains available.

The game uses CSS transforms for map movement and animated art. **60 FPS is a target, not a measured guarantee**; actual performance needs testing on a range of Android phones. The new WebP files total under 500 KB, while source PNGs are kept outside the APK.

## Verification and remaining work

`node scripts/smoke-test.mjs` checks old-save migration, existing farm loops, all five games, property purchases and bonuses, save recovery, and the three story endings. `node scripts/capture-ui.mjs` makes 390 px English and Khmer previews. Build and install the signed APK on Android before publication. Test real touch feel, frame pacing, and natural Khmer wording with Cambodian players. A live in-app updater download still needs device verification.

Recommended next: improve inventory filtering and quantity selling, add property interiors only if they offer useful play, record original sound effects with separate volume controls, and test asset size and frame pacing on weaker devices. These are recommendations, not implemented features.
