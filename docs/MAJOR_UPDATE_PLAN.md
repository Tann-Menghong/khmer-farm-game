# Srok Srae (ស្រុកស្រែ) — Major Update Design and Development Plan

Status: v2.0.0 was the public release when this audit began. The v1.9.0 baseline in the request is superseded. The v2.1.0 work described as **implemented** below is a focused continuation, not completion of this entire plan. Costs and unlocks beyond level 10 are design targets requiring play balance. Cambodian names, food details, and regional depictions need review with Cambodian players before broad promotion.

## 1. Executive Summary

Preserve the offline, bilingual Cambodian village game and build quality around its existing plant → make → trade → expand loop. v2.1.0 extends the level path to 10, adds three functional and visible purchases, a bounded daily market demand bonus, a tenth item earning mini-game, new illustrated assets, and a simple prosperity measure. A production quality map, complete asset replacement, rich NPC animation, audio, and measured 60 FPS need later releases.

## 2. Current Game Problems

**P0:** No physical device frame-time or memory measurement; some Khmer copy and narrow-screen layouts still need native-speaker/device review; secondary Unicode icons remain. **P1:** Many crop stages and regional items use atlas art, villagers are largely static, and level rewards formerly ended at seven. **P2:** Market prices were static, purchases had few late goals, sound is synthesized feedback, and mini-games are short. **P3:** Day/night scenes, photo mode, and broader cosmetic choices. Working systems include an interactive zoomable map, 16 crops, cooking/crafting queues, animals, item-earning fishing, orders, four journeys, three campaigns, offline save with backup, bilingual UI, and consent-based updates. This audit comes from source and automated gameplay checks; it is not a claim of physical-device QA.

## 3. Major Update Vision

A living fictional Cambodian village whose fields, workshops, paths, homes, waterfront, and neighbors visibly improve with player effort. A new player should find one useful action within 30 seconds; deeper property and production choices should unfold gradually. Original art and interaction patterns are required throughout.

## 4. Core Gameplay Loop Improvements

Show one next action on the dashboard, one clear reward at collection, and the next useful unlock in the profile. Free rice keeps the economy recoverable. Avoid forced long waits: players can farm, fish, make goods, fill orders, or play an available activity while production runs. Track first-session completion and time to first order in play tests.

## 5. New Dashboard UX/UI

Top: avatar, level, XP, coins. Center: directly interactive village map. Below: three small counters for ready crops, fillable orders, and stocked goods; one contextual next action; six illustrated shortcuts. v2.1.0 adds a compact prosperity value. Future passes should move one contextual action over the map only after touch and visibility tests, without hiding the fields.

## 6. Complete Navigation Architecture

Persistent bottom destinations: Farm, Orders, Kitchen, Explore, Market, Village. Farm has Map, Fields, Games; Kitchen has Cook and Workshop; Market has Sell and Storage; Village has Build, Decorate, People, Progress. Profile and Settings open from the header. Back closes the current modal before leaving the current destination. Common tasks should take one to three deliberate taps.

## 7. Screen-by-Screen UX/UI Redesign

Screen specifications below use a shared system: rice green `#207663`, deep teal `#175f60`, warm cream `#fff9e9`, harvest gold `#e6ae56`, earth brown `#825c3c`; 8 px spacing rhythm, 12–19 px rounded panels, visible focus, minimum 48 dp targets, original illustrated art, and short 120–250 ms motion. Disabled controls include text explaining the requirement. All screens reserve room for Khmer line wrapping. `—` means the state is not applicable rather than an invisible error.

| Screen | Purpose, information, actions | Layout, visual, motion | Empty / loading / success / error / Khmer |
|---|---|---|---|
| Splash | Brand and local save opening; no decision. | Full village dawn illustration, logo in live text, quiet fade. | Fresh save goes to welcome; loading shows progress; corrupt save offers recovered backup; Khmer title stays live text. |
| Loading | Explain save and asset preparation. | Narrow progress bar under village image. | Offline never blocks; loaded → dashboard; read error → retry or recovery; Khmer wraps beneath bar. |
| New game | Start or resume, choose language. | Two large illustrated cards and Settings link. | No save → Start; save → Continue; failure gives retry; Khmer buttons grow in height. |
| Profile creation | Enter farmer, farm, village names and avatar. | Portrait grid, three labeled fields, primary Save. | Defaults provided; save confirmation; invalid blank names restore safe defaults; grapheme-aware Khmer length. |
| Main dashboard | See farm, level, coins, readiness, one next action. | Teal header, map, metric cards, illustrated shortcut grid. | No ready task → plant prompt; brief loading skeleton; action → reward toast; save issue → recovery notice; Khmer metric labels wrap. |
| Village map | Explore and select fields/buildings/decor. | Warm isometric ground, art cutouts, anchored labels, toolbar for arrange/zoom. | Locked plots visibly marked; artwork loads without blocking; harvest pulse; invalid placement explains why; Khmer labels sit in flexible pills. |
| Farm/fields | Plant, inspect timers, quick plant/harvest. | Illustrated field cards and two batch controls. | Empty plot → seed choice; growing → timer; ready → harvest effect; insufficient coins → free rice route; Khmer action labels use two lines. |
| Crop selection | Compare cost, growth, yield, XP, stock. | Illustrated crop grid, selected border, Plant button. | Locked crop states level; chosen seed closes sheet; missing funds explains price; Khmer names wrap under images. |
| Animal area | Feed, care, collect eggs and buffalo products. | One card per animal with portrait and timer. | Unbuilt → cost; waiting → timer; collected → item feedback; missing feed → source shortcut; Khmer action text may wrap. |
| Fishing | Cast and identify catch in a small interaction. | Pond art with three large tappable water tiles and progress. | Waiting → bite; catch → fish reward; cooldown visible; no network dependency; Khmer prompt is one short sentence. |
| Storage | Find quantities, sale values, and recipe uses. | Search, category chips, illustrated item cards. | Zero results → clear filter; instant local filter; selected card → uses; invalid item data hidden safely; Khmer names wrap. |
| Market | Sell goods and see daily demand. | Village banner, three demand cards, sell grid, daily gift. | Empty basket → farm shortcut; no remote loading; sale → coin feedback; invalid quantity blocked; Khmer price labels use compact lines. |
| Orders | Help a named neighbor for coins and XP. | Portrait, short request, required item chips, reward, Deliver. | Missing goods → source route; filled → bright action; completed → new order; save failure shows recovery; Khmer story wraps naturally. |
| Cooking | Queue dishes from available ingredients. | Two slots above recipe cards, ingredient chips. | Empty slots invite cooking; running → time; collected → dish; missing ingredient points to source; Khmer dish names have flexible card height. |
| Workshop | Queue krama, flour, garlands, and candy. | Same queue grammar as kitchen with workshop art. | Full queue explains limit; completion → collect; invalid legacy job recovered by migration; Khmer material labels wrap. |
| Journeys | Choose region, see cost/time/reward, collect. | Four illustrated destination cards and active journey strip. | Locked → level; underway → timer; return → goods; insufficient coins → market route; Khmer place names stay untruncated. |
| Profile | Customize portrait/names, see XP and statistics. | Large portrait, stats grid, unlock preview. | Default identity filled; save → toast; unsafe input normalized; Khmer names are live text with flexible width. |
| Quests/story | Track campaign chapters and a next achievable goal. | Campaign banner and concise goal cards. | Completed → celebration; unavailable → clue; save on claim; long Khmer copy folds under title. |
| Achievements | Show earned and upcoming badges. | Illustrated badge grid with explicit earned/locked text. | No badges → first goal; earned → restrained sparkle; progress loads locally; Khmer captions wrap. |
| Property shop | Compare permanent benefits, cost, level. | Two-column illustrated purchase cards. | Locked/poor/owned each named; purchase changes map and ability; transaction failure preserves coins; Khmer descriptions can use three lines. |
| Vehicle shop | Compare delivery/journey benefit and ownership. | Filtered property cards for transport, later dedicated garage. | No vehicle → next unlock; purchase animation on map; cost errors clear; Khmer route text wraps. |
| Decorations | Buy, arrange, select and move objects. | Gallery plus map placement guide. | No decor → starter suggestion; move → selected outline; invalid map point → reason; Khmer controls show text and icon. |
| Mini-game hub | Pick an item earning activity and see rating/cooldown. | Two-column illustrated card grid. | Locked → requirement; ready → Play; finished → item/XP and stars; invalid attempt does not spend items; Khmer instruction is brief. |
| Settings | Language, graphics, reduced motion, audio, help. | Grouped cards with large toggles. | Saved immediately; update check can fail offline without blocking; Khmer toggle labels wrap. |
| Update | Compare installed and available release, choose download. | Version and notes card, size, verified progress, Cancel/Retry. | Offline → clear error; download only after tap; hash mismatch rejects APK; Android installer approves; Khmer notes wrap and remain scrollable. |

## 8. Village Map Redesign

Keep the current movable 900×650 village as the functional base. v2.1.0 adds visible orchard, community hall, and produce boat upon purchase. Next, divide art into farm, homes, pond, market, workshops, and river anchors; repaint ground with clear walkable paths; then stage villagers, birds, and water in quality-scaled layers. Decoration edit mode retains a grid, selection, cancel, and saved position. Any decorative school or pagoda-inspired landmark needs careful cultural art review and should have no disrespectful gameplay transaction.

## 9. Visual Art Direction

Soft 2.5D view, approximately 30° downward camera, warm light from upper left, soft contact shadows down right, textured wood and clay, restrained outlines, strong silhouette at 48–96 px. Use green rice fields, waterways, raised wooden village homes, woven baskets and textiles as original references. No copied commercial assets, text baked into art, emoji objects, or mixed photographic scenes. Limit gradients mainly to primary UI and reward accents.

## 10. HD Asset Requirements

Source PNGs should be archived, shipped WebP variants sized to display, transparency for isolated objects, and visually inspected at 320 dp and 390 dp. The three v2.1.0 illustrated cutouts are 720 px on their longest side; their optimized files are about 68–174 KB. Inventory for later production: 16 crops × 5 stages; chicken/duck/buffalo idle, feed, walk, collect; six villager portraits plus map poses; farm house, storage, mill, kitchen, loom, market, hall, pens, stalls; bicycle, motorbike, boat, pickup, truck; pond, bridge, roads, palms, banana trees, fences, crates, tools, baskets, krama, cooking vessels; 13 food cards; four regional backgrounds; eight reward/UI families; mini-game tiles and feedback. Provide atlas metadata, pivot, scale, frame count, lighting, and export size for each asset before a bulk generation pass.

## 11. Player Profile System

Already saved: farmer/farm/village names, three portraits, level, XP, and core activity stats. Next: additional original avatar cosmetics earned through chapters, richer crop/fish/order totals, and explicit edit controls. Keep appearance choices open to all players and store no personal account data.

## 12. Progression and Level System

v2.1.0 extends XP thresholds to level 10: 8 at 1,220 XP unlocks orchard; 9 at 1,580 unlocks river boat; 10 at 1,990 unlocks community hall. Level 7 opens Fruit Harvest. A future level 11–20 path should release only with balanced crop, recipe, storage, and property content. Preview up to three unlocks and celebrate real unlocks, not the number alone. Check median time per level in play tests.

## 13. Farming Improvements

Already: 16 crops, five distinct growth images for rice/lotus/banana/water spinach, weather-based timing, quick plant four, collect ready, and XP feedback. v2.1.0 orchard adds one harvest item to six fruit crops. Next: art stages for the remaining 12 crops, short planting/harvest motion, batched feedback, and tooltips for recipe use. Keep free rice and avoid harvest loss from being offline.

## 14. Animal System Improvements

Existing chicken and buffalo have timed product collection and feeding/care; Buffalo Bath earns a product. Next: visible state changes, simple walk and idle loops, and clear feed source. Ducks may add eggs or feathers only when recipes/orders use them. Avoid adding animals whose outputs have no role.

## 15. Fishing Improvements

The catch activity must be completed to receive fish. Add location-specific catch tables after species and regional review, then a small fish collection book and a readable result panel. Keep failure forgiving and show cooldown. Do not promise scientifically accurate distributions from the current generic fish item.

## 16. Cooking and Crafting Improvements

Two-slot kitchen and workshop queues already persist offline. Show ingredients, output quantity, timer, and collect state before starting; recipe cards should link to sources. Candidate chains are rice → mill → flour → simplified rice dish, and cotton → loom → krama. Actual recipes are simplified game systems and require cultural review.

## 17. Production Building System

Each building needs an ownership gate, two visible slots, stored completion timestamps, output collection, and one meaningful upgrade. Existing rice mill raises flour yield. Future queue upgrades need cost balancing and clear gain; do not introduce construction timers solely to delay play.

## 18. Market System

v2.1.0 shows three deterministic daily focus goods with +20%, +15%, or +10% sale bonuses. Prices are computed from the same rule in card and sale transaction; produce truck's permanent bonus stacks before demand. No internet or daily reset claim is required to farm. Future buyers should request existing goods and never make a previously viable crop unprofitable.

## 19. Order System

Current orders show a neighbor, request, item quantities, reward, and missing-item route. A market stall increases coins, motorbike and v2.1.0 hall increase XP. Next add one optional story or community order slot with explicit rewards. Keep normal orders available regardless of story progress.

## 20. Inventory System

Current visual Storage searches and filters crops, animals, fish, food, crafts, and regional goods, including counts, sell value and uses. Next: sort by quantity or recent gain, and identify ingredients needed by the pinned order. Local filtering should remain instant and preserve the selected category on screen switches where useful.

## 21. Property Ownership System

Nine existing functional purchases after v2.1.0: grain store, rice mill, family home, market stall, produce motorbike, produce truck, orchard, river boat, community hall. Purchases spend earned coins, persist in local save, and change gameplay; the three new buildings/boat also appear on the map. Future house tiers should unlock cosmetics or story scenes. A private car has no useful role yet and belongs outside the next scope.

## 22. Vehicle System

Motorbike and truck already affect orders, journeys, or sale value; boat adds a regional trip item. Next, unify transport information in a garage panel and show one simple animated departure/arrival. Bicycle, tuk-tuk, pickup, and tractor should enter only with distinct delivery, hauling, or farming value and regionally appropriate art.

## 23. Village Management System

v2.1.0 adds a visible, capped prosperity score derived from existing level, owned property, decorations, and celebrations. It is a progress summary, not a hidden tax or failure state. Future reputation should come from actual orders and friendship and unlock one tangible village feature. Resist multiple opaque meters.

## 24. Character and NPC System

Four named neighbors already appear in friendship and orders. Create a portrait, map pose, voice of dialogue, favorite item, and three relationship moments per character before adding more. Review Khmer names and speech with local players; avoid using a profession as a whole personality.

## 25. Quest and Achievement System

Three campaigns and achievements exist. Add a pinned, achievable next step tied to current inventory. Optional daily tasks should take roughly 5–10 minutes across normal play and never punish skipped days. Achievements need numeric progress, earned date, and a tangible but small one-time reward if introduced.

## 26. Reward System

Reward order: immediate item count, short coin/XP motion, then level/unlock preview if threshold crossed. Cap particles and respect reduced motion. Show source and destination for earned goods so a mini-game always teaches what it contributed.

## 27. Existing Mini-Game Improvements

The prior nine games (rice, fish, pond pairs, water gates, loom, basket packing, cargo, recipe, buffalo care) all award goods or coins and XP, with saved best rating. Improve instruction with one illustrated example, clear tap feedback, and increasing pattern variety. Keep retries inexpensive; no hard failure that consumes rare ingredients except the loom's successful crafting cost.

## 28. New Mini-Game Concepts

**Implemented in v2.1.0:** Fruit Harvest, a three-round ripe-mango selection activity, awards mango and XP with a cooldown and rating. **P2 candidates:** rice mill sorting for flour, irrigation routing for crop materials, and a cooking sequence for a dish ingredient. **P3 candidates:** timed market rush and festival preparation. Any new activity must produce an item used by farming, food, crafting, orders, or a chapter; test that it is understandable in one short instruction.

## 29. Journey Improvements

Current Tonle Sap, Kep, Kampong Speu, and Mondulkiri trips have cost, time, and reward. The river boat adds one fish on a Tonle Sap return or crab on a Kep return. Future regional scenes need source-backed research, unique art, one neighbor, and a resource whose use is clear. Do not imply that every regional product or recipe originates only from its depicted region.

## 30. Story Expansion

Keep Village Festival, River Celebration, and Makers Fair with their current saved state and endings. Add short dialogue moments and visible map decorations as existing chapters progress before writing a fourth campaign. Free farming remains available after an ending.

## 31. Animation Plan

Prioritize 150–250 ms touch/collect feedback, 350–600 ms harvest and purchase feedback, then subtle low-cost loops for water, crop sway, and one or two villagers. Animate transforms and opacity where possible, pause offscreen effects, and honor reduced motion. Frame count and texture budget should follow measured device profiles.

## 32. Sound and Music Plan

Separate sliders/toggles for effects, ambience, and music in a later update. Commission or record original sounds: planting, harvesting, pond, animals, kitchen, market, vehicles, rain, rewards. Provide a quiet default mix and keep gameplay understandable muted. Do not use unlicensed recordings or a generic imitation of traditional Cambodian performance.

## 33. Performance and 60 FPS Plan

Measure median, P95 and P99 frame time on at least one recent and one lower-end physical Android phone. Target ≤16.7 ms median on the capable phone, graceful ≤33.3 ms median in Low on the weaker phone, and no recurring >100 ms spikes during map pan. Profile WebView raster, image decode, DOM count, layout, input latency, memory, load time and battery. Use WebP cutouts, sprites/atlases, event-driven UI, static scenery layers, limited animated objects, and offscreen pauses. Current desktop smoke tests and emulator installation do **not** prove 60 FPS.

## 34. Offline and Save Architecture

Keep gameplay rules and assets bundled. Versioned local schema 12 reads older supported saves, validates state, and has a backup recovery path. Save after transactions and on app background, writing atomically where available. Add explicit migration fixtures for every shipped schema and test corruption/recovery after an interrupted write. Internet is only for update checks/downloads; installation always requires player action and Android approval.

## 35. Khmer/English Localization Requirements

Use live UTF-8 strings separate from artwork, a Khmer-capable bundled font, flexible card heights, and grapheme-safe input length. Review every new phrase with native Khmer speakers, especially role names, food terms, and small buttons. Test at 320 dp, 390 dp, and large system text; avoid fixed width English assumptions.

## 36. Onboarding and Tutorial

Current guided planting → harvest → order steps are a usable base. Extend with one optional contextual prompt for cooking or property after the first order, plus Replay/Skip. Keep speech to one short sentence per action and never reset a completed step after migration.

## 37. Accessibility

Use 48 dp touch targets, label + shape rather than color alone, visible keyboard/touch focus, sufficient contrast over art, reduced motion, separate audio controls when audio ships, and meaningful screen-reader names for art-only buttons. Verify in English and Khmer at enlarged text.

## 38. Recommended New Features

| Problem | Proposed solution | Player benefit | Priority |
|---|---|---|---|
| Progress stops early | Balanced levels 11–20 with one visible unlock each | Clear long-term goals | P1 |
| Static world | Two or three looping villager routes and purchase-based scene changes | A village that feels lived in | P1 |
| Unclear next ingredient | Pin order/recipe to dashboard and highlight sources | Less menu searching | P1 |
| Little record of discovery | Crop/fish/recipe collection book using existing data | Optional mastery without pressure | P2 |
| Few reasons to revisit areas | Short neighbor relationship chapters | Meaningful community connection | P2 |
| Repetitive selling | Fair demand rotation plus one special buyer | More choices using existing goods | P2 |

## 39. Features That Should NOT Be Added Yet

Real-time multiplayer, a pay-to-win currency, manual vehicle driving, unrestricted property purchases, online-only events, server-required saves, an elaborate stock market, and dozens of new crops without recipes. They increase scope or friction before visuals, performance, localization, and core clarity are finished. Also defer photo mode and seasonal live operations until art and device performance are stable.

## 40. P0/P1/P2/P3 Priority Table

| Priority | Work | Done when |
|---|---|---|
| P0 | Save migration/regression, input navigation, Khmer fit, phone performance baseline | No progression loss or blocked core loop on test devices |
| P1 | Consistent dashboard/map art, levels 8–10, functional property and demand, better feedback | The village visibly grows and new benefits work offline |
| P2 | Remaining crop stages, scene NPCs, richer quests, fish collection, audio | New content connects to the economy and passes balance play tests |
| P3 | Seasonal art, photo mode, deeper vehicles, advanced relationship stories | Core quality and physical device targets are already met |

## 41. Development Roadmap

| Phase | Tasks and dependencies | Expected result | Test gate |
|---|---|---|---|
| 1 Foundation | Save fixtures, touch/layout audit, localizable strings; requires current save inventory | Reliable base | Old saves open, core actions work offline at 320 dp |
| 2 Visual | Asset bible, cutouts, ground map, selected animation; requires locked perspective | Cohesive Cambodian village | Side-by-side art review, decode/memory check |
| 3 Gameplay | Farm feedback, production clarity, demand, order routes; requires economy worksheet | Faster satisfying loop | First order completed in play test, rewards balanced |
| 4 Management | Functional homes, vehicles, prosperity; requires level pacing | Visible development | Each purchase changes a rule and the map |
| 5 Content | Crops/recipes/regions/stories/mini-games; requires art and cultural review | More replayable choices | Every item has at least one meaningful use |
| 6 Polish | Audio, accessibility, device profiling, battery, bug fixes; requires near-final content | Release-quality Android build | Acceptance criteria below on physical phones |

## 42. Testing Checklist

Automated desktop checks cover planting, growth stages, quick harvest, chicken and buffalo, fishing reward gating, ten mini-games, cooking/craft queues, orders, market sales, journeys, campaigns, map editing, English UI, profile, purchases, old-save migration, corrupt-save recovery, and asset decode. Android release checks: Gradle build, package/version, signature continuity, emulator install-over, launch, offline airplane mode, Khmer font, update manifest/download/hash/installer, 320/390/large screen. Still required: physical phone frame-time/memory/battery runs, screen-reader review, rotation policy check, native Khmer copy review, first-session player play test.

## 43. Performance Acceptance Criteria

On a specified capable test device: ≥55 FPS sustained during ordinary map pan and ≤16.7 ms median frame, with P95 recorded; lower-end device Low mode: ≥28 FPS sustained and ≤33.3 ms median. No recurring >100 ms pauses on harvest or menu open. Establish baseline APK size, first interactive time, peak RAM, and 15-minute battery use before accepting art changes. These are targets, not current measured results.

## 44. UX/UI Acceptance Criteria

New players locate an empty field, plant rice, and identify the next action within 60 seconds without explanation. Harvest takes at most two taps; order inspection one tap from bottom nav; production starts within three from the relevant map building. No horizontal overflow or clipped Khmer at 320 dp and large text. Disabled actions state why. A modal never traps navigation.

## 45. Gameplay Acceptance Criteria

All ten mini-games grant their stated item only after success and persist rating/cooldown. Every property grants the displayed effect once, survives reload, and cannot overdraw coins. Free rice permits recovery from zero coins. Three stories can finish and free play continues. Market demand never reduces base price; new goods have uses. Save migration preserves old fields, inventory, story, and purchases.

## 46. Recommended Next Version Scope

**v2.1.0 — Growing Village.** Added: Fruit Harvest, orchard, river boat, community hall, three daily market demand goods, levels 8–10. Improved: fruit yields, journey returns, village order XP, prosperity visibility, property map art. Fixed: legacy save schema migration coverage and sale-price regression checks. Performance: optimized WebP cutouts; physical 60 FPS remains unverified. Visual: three original 2.5D transparent illustrations. Localization: English/Khmer strings for new gameplay; native-speaker review remains open. Next larger release should prioritize remaining crop art, touch/Khmer QA, device profiling, and first-session play testing before more systems.
