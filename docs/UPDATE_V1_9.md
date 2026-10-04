# Srok Srae v1.9.0 — Village Dashboard

## Released changes

- The main farm has a dashboard with live counts for ready crops, fulfillable orders, and goods in stock. A suggested next action and six shortcuts connect farming, fishing, orders, production, games, and village growth.
- The interactive map uses a new original Cambodian countryside ground illustration with a waterway, paths, vegetation, and rice paddies. Fields and stations were repositioned around the illustrated terrain. Buildings, fields, decorations, zoom, and dragging remain interactive. Arrange mode now shows a placement grid.
- A player profile opens from the avatar. It has original portrait art, a saved editable farmer name, level and XP, and farm statistics. Save schema 10 carries previous progress forward.
- Orders, recipes, workshops, market goods, journeys, and purchasable property use compact dashboard grids on phones. The app uses a coordinated jade, cream, and warm gold gradient palette.
- The Fields view can plant the selected crop in up to four empty plots or harvest all ready plots with one tap. The guided first planting still uses individual field taps.
- The Android status and navigation colors match the new palette. The document language changes with the Khmer or English setting.

## Farming flow

The dashboard makes the loop visible: **plant → harvest → cook or craft → fill orders or sell → earn coins → improve the village**. Shortcuts lead to those existing systems. Routine field actions can be batched, while tapping an individual field still works.

## Art and performance

Two original images were generated for this version: the village map ground and the farmer portrait. Full-resolution source PNGs are in `art-source/`; optimized WebP assets are bundled with the game. The static map image replaces multiple ground-shape layers. Smooth 60 FPS remains a design target on suitable Android phones, not a measured guarantee. Reduced motion and low graphics settings remain available.

## Verification

The local gameplay regression covers the dashboard, profile saving and migration, map interactions, one tap planting and harvesting, animal care, fishing, crafting, orders, market, journeys, campaigns, and recovery from a corrupt primary save. Phone-size English and Khmer previews are saved in `qa/`. The Android APK is built and verified as an upgrade over v1.8.0.

## Recommended next update

1. Add a simple animal care activity that grants a real product, matching the fishing approach.
2. Give the order board more short villager stories and clearer supply planning.
3. Expand the progression table and unlock pacing after the current levels, with more farming and village improvements instead of longer waits.
4. Add original environmental sound and production animation, then measure frame pacing and memory on low and midrange Android devices.
5. Review Khmer copy, food details, and regional imagery with Cambodian players before wider distribution.

These are recommendations for later versions and are not included in v1.9.0.
