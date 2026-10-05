# Srok Srae 2.2.0 — Village Neighbors

This is a focused, playable continuation of the [46-section major update plan](MAJOR_UPDATE_PLAN.md). It preserves the existing village, campaigns, property progression, local save, English and Khmer controls, and offline core play.

## Added

- **Rice Mill mini-game:** buy the rice mill, then measure three grain loads by tapping 1, 2, or 3 scoops. A successful run uses three rice and awards rice flour and XP; perfect play awards two flour. Star rating and cooldown save locally. Rice flour already has uses in cooking and orders.
- **Map visitors:** two of the existing four friends appear on village paths each day. Tap a portrait to view their favorite item and give a gift through the existing friendship system.
- **Original mill illustration:** transparent 2.5D WebP asset with a preserved source PNG. The [generation brief](ASSET_PROMPTS_V2_2.md) records the prompt and style rules.

## Improved

- Farm opens with tappable counts for crops ready, finished goods, and fillable orders. Each count routes to the relevant action.
- Crop cards show seed cost, growing time, harvest quantity, XP, and current stock before planting.
- Kitchen and workshop offer **Collect all** when finished goods are waiting. Unfinished queue entries remain in place.
- Workshop places weaving and milling activities side by side on phones, with wider layouts where space allows.
- Map visitor motion respects Reduced motion and Low graphics settings.

## Save compatibility and checks

Save schema 13 migrates schema 12 and earlier saves; the new mini-game fields default safely. Automated Chrome gameplay checks exercise all eleven mini-games, the mill ingredient/reward rule, both production queues, friendship gifts, old-save migration, and corrupted-save recovery. Phone previews were inspected at 390 px in English and 320 px in Khmer. Android release testing should include installing over v2.1.0, signature and manifest verification, an offline launch, and the update download hash.

## Still planned

The village uses static portrait visitors; full-body walking characters, complete replacement of secondary Unicode symbols, original licensed audio, wider cultural review, and measured physical-device 60 FPS remain future work. The current release does not claim those features.
