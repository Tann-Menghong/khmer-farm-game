# Srok Srae 2.3.0 — Village Days

This playable release extends the offline, bilingual village game and preserves saves from v2.2.0 and earlier. It is one step in the [major update plan](MAJOR_UPDATE_PLAN.md).

## Added

- **Coastal Crab Traps:** after returning from Kep, follow crab tracks through three short rounds. Completion earns one crab, or two with a perfect rating, plus XP. Crab is usable in pepper crab cooking and village orders. The activity is available in Farm → Games and Explore, with a saved best rating and cooldown.
- **Optional daily village tasks:** harvest three fields, deliver one order, and finish one mini-game. Claim 65 coins, 18 XP, and two lotus. Progress starts when the day's tasks first appear, resets on the next local day, and has no streak or missed-day penalty. The reward can be claimed once per day.
- **Levels 11 and 12:** level 11 unlocks a third kitchen queue slot; level 12 unlocks a third workshop queue slot. The profile previews these unlocks.
- **Original coastal trap illustration:** generated and optimized as a transparent WebP; [source and prompt](ASSET_PROMPTS_V2_3.md).

## Improved and fixed

- Queue save validation now keeps three jobs. Completed products in the third slot survive app restart.
- The village order card shows the community hall's extra XP in its displayed reward, matching the actual delivery reward.
- Crab activity and daily tasks use the existing storage, XP, achievements, and save systems. Core play remains offline.

## Verification and remaining work

Chrome gameplay regression covers crab reward gating, one-time daily task claims, save migration to schema 14, and third-slot reload, along with prior gameplay. English previews at 390 px and Khmer at 320 px were inspected. The Android build, install-over, offline launch, package/signature, and public APK hash should be checked before publication.

Physical phone frame-time, battery and memory profiling, native Khmer copy review, full-body villagers, comprehensive crop-stage art, and replacement of remaining secondary Unicode symbols are still open. A 60 FPS device guarantee is not claimed.
