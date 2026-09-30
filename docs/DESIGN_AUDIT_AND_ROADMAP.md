# Srok Srae (ស្រុកស្រែ): design audit and development roadmap

This audit is based on the local Android source and the playable v1.5.0 build, using v1.4.1 as the starting point. **Implemented** and **proposed** items are distinguished throughout. The design target is a distinctive Cambodian village game with commercial quality clarity and feedback, using original art and systems.

## A. Current Game Audit

| Priority | Finding | Action |
|---|---|---|
| Critical | A single localStorage save could be lost if its JSON was corrupted. | **Implemented:** version 6 migration and a rotating validated backup. Add export/import and more thorough schema checks later. |
| Critical | Main farm used Unicode/emoji objects, creating inconsistent graphics across Android versions. | **Partly implemented:** original illustrated atlases now cover map buildings, crops, goods, villagers and navigation. Some small labels, badges and celebration graphics still need replacement. |
| High | A field click relied on a previously selected seed and gave little context. | **Implemented:** field opens a seed picker with cost, unlock and growth time; growth has five visual scales. |
| High | Fishing and animals were passive one tap timers. | **Partly implemented:** cast/bite/catch and animal feeding/care panels. Fishing still has one species and no rarity/location skill. |
| High | Six destinations and systems compete for a small phone screen. | **Partly implemented:** illustrated six item navigation and larger field dialog. Screen hierarchy, inventory filtering and order storytelling still need work. |
| High | Update download had no visible progress, cancel or retry. | **Implemented:** native progress, cancellation, retry, current/available version, optional file size and SHA-256 check. Android still approves installation. Live download path needs device testing. |
| Medium | Cooking is instant, crafting has one active job, orders are anonymous, and journeys are timer based. | Proposed: readable queues, named requests, interaction and region specific collections. Preserve old inventories and story progress. |
| Medium | Map and UI are rerendered after most actions and use large CSS effects. | Proposed: update only changed components, cap particles, profile frame time and memory on physical devices. |
| Medium | Khmer and English strings are embedded in UI templates. | Proposed: move all strings into keyed catalogs and review Khmer with native speakers. |
| Nice to have | Weather, sound, festivals and achievements have limited variation. | Expand after the core loops and accessibility pass. |

What already works: offline planting and harvesting, coin/XP progression, chickens and buffalo, fishing, recipes, crafts, market sales, village orders, four journeys, three stories, movable decorations, achievements, bilingual text, native optional updater and local saves. The main weaknesses are depth, feedback, visual consistency, content specificity and maintainability.

## B. Recommended Feature Upgrades

1. **Foundation:** robust migration, backup, input correctness, Android install and offline tests.
2. **Clarity:** farm centered HUD, concise contextual panels, readable inventories and touch targets of at least 48 dp.
3. **Satisfying loops:** crop stages and reward movement, animal care, fishing timing, production queues and named village requests.
4. **Original art:** complete the shared 2.5D atlas set, including every crop stage and animated animal state.
5. **Cambodian depth:** linked recipes, krama and basket craft, region collections, NPC relationships and village restoration.
6. **Polish:** sound, haptics, reduced motion, graphics settings, tutorial and device profiling.

Optional features should pass a test: they must give a meaningful choice, support village identity or clarify progress. Daily tasks should be optional and have no loss streak.

## C. UX/UI Redesign

**Design system.** Deep palm green `#245d53`, rice cream `#fff9e9`, clay `#8b6342`, harvest gold `#efbd65`, and coral `#d98468`; green is a primary action, gold a reward, coral a destructive or urgent action. Use one illustrated icon language, an 8 px spacing scale, 12–20 px radii, strong text contrast and 48 dp minimum touch areas. Khmer uses a bundled tested font in a future typography pass; keep text in code, permit two lines and avoid uppercase transformations on Khmer.

**Farm/HUD.** Keep the map largest, with avatar/level and XP, coins, weather as a small chip, a bottom six section bar and a contextual field or building sheet. The v1.5.0 map has a field seed picker. Next: move XP directly under the avatar and collapse secondary actions behind a village drawer.

**Shop and inventory.** Use tabs for Seeds, Buildings and Decorations; each tile shows art, owned count, requirement and outcome. Inventory should group Harvest, Animal, Seafood, Cooked and Crafted, with search and quantity controls.

**Orders.** Give each card a named villager, one sentence of context, exact ingredient counts, coin/XP rewards and a clear disabled reason. Story and festival requests have distinct markers without relying on color alone.

**Kitchen/workshop.** Show ingredients, owned count, result, time and queue slots before starting. Collect actions remain prominent. **Market** should show sale quantity, changing daily demand with a bounded bonus, and a buyer request; never hide base prices. **Journey** cards should show destination art, unlock, travel time, cost and likely goods. **Village/journal** should hold editing, NPCs, collections, achievements and settings, reducing clutter on the farm.

**Dialogs/feedback.** One task per sheet; close and Back behave consistently. v1.5.0 has a short, skippable guided first field, rice harvest and order prompt. Later extend it to the coop and add reward movement toward storage; sound and haptics must obey settings.

## D. Gameplay Improvements

**Farming.** Tap field → select crop → plant → five visible growth scales → harvest. v1.5.0 implements this flow and preserves real time timers offline. Next art pass needs separate seed, shoot, growing, mature and ready frames rather than scaling a single image. Show gain at the plot and storage, with a 150–350 ms animation.

**Economy.** Existing crops return two goods per plot. At base price, rice gives 8 coins from a free seed over 20 s; corn gives 20 from a 5 coin seed over 55 s. This supports free recovery while priced crops save taps. Later balance should measure coins per active minute, inventory bottlenecks and time to each unlock. Never require premium currency. Proposed level milestones: 1 rice/lotus and basic order, 2 chickens/corn/banana and Tonle Sap, 3 weaving and more land, 4 buffalo/coastal journey, 5 pepper and palm sugar, 6 advanced fruit recipes, 7 village restoration; extend through 20 only when there is enough content for each unlock.

**Animals.** v1.5.0 lets players buy, feed and collect. Feeding consumes corn for chicken or water spinach for buffalo, shortens the next cycle and adds one product. Proposed next: idle/walk/feed animation, clear care indicator, ducks and pigs only after their products connect to recipes/orders. Buffalo agricultural assistance should be researched with Cambodian farmers; the existing milk product is a legacy game mechanic, not an asserted cultural norm.

**Fishing.** v1.5.0 adds cast → short bite wait → catch with no punishing failure. Next: one accessible timing ring with generous window, three rarity bands, fish collection and Tonle Sap versus Kep species. Verify species names and ecological fit with Cambodian sources before writing them into the game.

**Cooking and craft.** Recipes already consume ingredients and grant XP. Add bounded queues to kitchen, loom, rice mill and basket workshop, showing output before spending inputs. Fish amok, nom banh chok, nom ansom and pepper crab can anchor linked orders, with simplified ingredients identified as game abstractions.

**Trading, quests and stories.** Introduce named normal, story, urgent and festival orders. Daily demand changes sale value by at most 20%, with a stable floor. The three existing arcs become Restore the Farm, Reopen the Market and Prepare the Festival, each ending in a visible village change. Optional daily tasks draw from unlocked activities and do not expire rewards already earned.

## E. Cambodian Content Expansion

Current crop balance (seconds are intentionally short for a prototype; later pacing requires play testing):

| Crop (English / Khmer) | Level | Seed | Seconds | Yield | Sell each | Connected use |
|---|---:|---:|---:|---:|---:|---|
| Rice / ស្រូវ | 1 | 0 | 20 | 2 | 4 | porridge, flour, rice cake |
| Lotus / ឈូក | 1 | 3 | 35 | 2 | 7 | garland |
| Banana / ចេក | 2 | 6 | 50 | 2 | 11 | banana cake, ansom |
| Water spinach / ត្រកួន | 2 | 5 | 45 | 2 | 9 | stir fry, buffalo feed |
| Corn / ពោត | 2 | 5 | 55 | 2 | 10 | grilled corn, chicken feed |
| Mango / ស្វាយ | 3 | 9 | 70 | 2 | 16 | fruit plate |
| Lemongrass / គល់ស្លឹកគ្រៃ | 3 | 8 | 65 | 2 | 14 | amok, soup |
| Cotton / កប្បាស | 3 | 7 | 60 | 2 | 12 | krama |
| Coconut / ដូង | 4 | 12 | 90 | 2 | 20 | amok, sweets |
| Cassava / ដំឡូងមី | 4 | 10 | 80 | 2 | 17 | market, future flour |
| Watermelon / ឪឡឹក | 4 | 13 | 85 | 2 | 22 | fruit plate |
| Kampot pepper / ម្រេចកំពត | 5 | 16 | 100 | 2 | 26 | crab dish |
| Tamarind / អំពិល | 5 | 14 | 95 | 2 | 23 | fish soup |
| Chili / ម្ទេស | 5 | 14 | 95 | 2 | 25 | future curry |
| Koh Trong pomelo / ក្រូចថ្លុងកោះទ្រង់ | 6 | 20 | 120 | 2 | 31 | salad |
| Durian / ធុរេន | 6 | 24 | 135 | 2 | 36 | coconut sweet |

All 16 crops require **five distinct art stages** plus a small inventory icon. Proposed later crops: sugar cane, cucumber, long bean, kaffir lime, palm fruit and separate orchard trees, only after their recipes and plots are designed. Current foods include fish porridge, banana cake, nom banh chok, water spinach stir fry, amok, ansom chek, tamarind soup, pepper crab, palm cake, pomelo salad, durian sweet, grilled corn and fruit plate. Future foods: Khmer curry, bai sach chrouk, lok lak, kuy teav and num krok after ingredient and culinary review.

Objects/buildings to add: rice sacks, clay stove, bamboo baskets, fishing rod and net, rice mill, basket workshop, palm sugar workshop, storage house, school and community hall. Characters to deepen: Dara, Srey Mom, Ta Sok and Vanna already exist; give them written personalities and quest chains before adding more. Regions remain Tonle Sap, Kep, Kampong Speu and Mondulkiri; add specific environments and characters without making any region a single stereotype. A pagoda or festival depiction needs careful reference and local review.

UNESCO describes [krama as a Cambodian woven textile](https://ich.unesco.org/en/RL/cultural-practices-and-expressions-linked-to-krama-a-traditional-woven-textile-in-cambodia-02115). The Cambodian Ministry of Tourism describes [Tonle Sap's lake landscape](https://www.tourismcambodia.org/public/index.php/provinces/search/detail/389/phnom-krom-tonle-sap-lake). Recipe names, wildlife, dialect, textiles and architectural details should be reviewed by Cambodian artists and speakers before being presented as authoritative.

## F. Visual Art Direction

Warm, painterly 2.5D at a consistent three quarter camera angle. Light comes from upper left; shadows fall lower right. Buildings use readable silhouettes, raised rural wood forms where appropriate, warm roofs and restrained texture. Rice green/gold, water teal, soil ochre and krama red accents create the palette. Avoid text in images, logos, real person likenesses, copyrighted game elements and emoji as production objects. Mobile icons must survive a 40 px display size. Use WebP atlases for distribution and keep lossless originals in `art-source/`. The current atlases are a first pass and need frame level cleanup before final art lock.

## G. Asset List

The **current first pass** includes five 4×4, 1254 px transparent source atlases: village, crops, goods, buildings and people/regions/UI. The table below is the production checklist. Dimensions are per delivered frame at 1×; generate at 2× for downsampling. `T` means transparent background. All use the art direction in F.

| Asset name | Category and purpose | Frame size | Alpha | States needed |
|---|---|---:|---|---|
| Rice, lotus, banana, water spinach, corn, mango, lemongrass, cotton | Crop growth and inventory | 128×128 each | T | seed, shoot, growing, mature, ready; icon |
| Coconut, cassava, watermelon, pepper, tamarind, chili, pomelo, durian | Crop growth and inventory | 128×128 each | T | seed, shoot, growing, mature, ready; icon |
| Chicken, duck, buffalo, cow, pig, goose | Animal care and village | 256×256 each | T | idle 4, walk 6, feed 4, collect 3; happiness marker separate |
| Freshwater fish, snakehead, catfish, Kep crab, coastal seafood | Catch/results/inventory | 160×160 each | T | idle 2, catch 4, icon; species pending verification |
| Raised village home, storage, coop, buffalo pen, kitchen, loom | Map buildings | 384×384 each | T | idle, work, ready, upgrade construction |
| Rice mill, basket workshop, palm sugar workshop, market stall, fishing hut | Production/market map | 384×384 each | T | idle, work, ready, upgrade construction |
| Community hall, school, pagoda exterior, riverside landing | Village landmarks | 384×384 each | T | idle, restoration; pagoda review required |
| Dara, Srey Mom, Ta Sok, Vanna | Villager cards/dialogue | 256×256 each | T | neutral, happy, talking, quest complete |
| Tonle Sap, Kep, Kampong Speu, Mondulkiri | Journey card scenes | 512×320 each | No | day, weather variant, destination marker separate |
| Woven basket, krama, clay pot, cooking pot, rod, net, boat, rice sack, crate, hoe | Inventory/edit props | 128×128 each | T | idle; use state if interactive |
| Palm, banana tree, pond, river edge, dirt path, bridge, fence, flowers | Terrain kit | 128×128 tile or 256×256 prop | T except ground tile | still, sway/water 4 where visible |
| Coin, XP, level, shop, order, journey, village, settings, close, info | UI system | 96×96 each | T | default, pressed, selected/disabled via UI tint |
| Amok, nom banh chok, ansom, porridge, pepper crab, fruit dish, krama, flour, palm candy | Product/recipe icons | 128×128 each | T | idle; cooking/crafting result effect separate |
| Plant dust, harvest leaves, water ripple, reward trail, confetti | Effects | 128×128 sheet | T | 6–12 frames; reduced motion alternative |

## H. Image Generation Prompts

Shared suffix for every prompt: *Original Cambodian mobile farming game art, friendly polished painterly 2.5D, three quarter view from the south west, upper left warm daylight, lower right soft contact shadow, consistent proportions and earth/leaf/teal palette, centered isolated object, transparent background, no text, watermark, emoji, logo, person likeness or copyrighted game reference. Readable at 48 px.*

- **Home:** “A raised wooden Cambodian countryside home with staircase, shaded underfloor, practical roof and tropical plantings; show clear entrance and realistic rural details.” + shared suffix.
- **Rice growth sheet:** “Five separate equal sized frames of one rice plot: prepared soil, newly seeded, green shoots, full green growth, golden mature heads; consistent plot footprint and camera angle.” + shared suffix.
- **Water buffalo:** “A Cambodian farm water buffalo with natural anatomy and gentle expression; side three quarter idle, walking and eating pose reference; avoid caricature.” + shared suffix.
- **Village market:** “A small Cambodian village produce stall with woven baskets, rice, greens and fruit, functional awning and open customer side; no text signs.” + shared suffix.
- **Krama:** “Folded handwoven Cambodian krama with checked pattern and visible textile texture; respect everyday functional use.” + shared suffix.
- **Fishing pond:** “Warm freshwater pond edge with reeds, simple fishing rod and ripple area; no fish or human in the background so catch states can layer cleanly.” + shared suffix.

Generated sheets are first pass source art, not a claim that every final frame above has been produced. Manual splitting, correction and cultural review remain.

## I. Technical Improvements

**Implemented:** `art.js` maps atlas cells; `save.js` validates a primary and backup local save; `game.js` migrates versions 2–5 to schema 6; update manager now shows progress, cancel and retry while enforcing HTTPS, URL prefix and SHA-256. All core game data stays local, and the APK contains the art for offline play. The APK uses the same prototype debug certificate as earlier builds on this machine; a production release needs a protected permanent signing key and an intentional migration plan.

**Next:** extract crop, recipe, quest and translation data from the UI script; use component updates instead of full DOM replacement; maintain a save version migration table and optional player export; validate artwork dimensions and atlas index in CI; profile launch, WebView memory, frame time and battery at 30/60 FPS targets. Separate music, effects and ambience controls, add haptic and graphics preferences. Keep Android's installer as the final step and never install silently.

## J. Development Roadmap

| Phase | Tasks | Dependencies | Expected result and test criteria |
|---|---|---|---|
| 1 Foundation | Save backup/migration, install checks, broken input and first launch | Existing v1.4.1 save fixtures | No inventory loss; offline smoke and APK build pass. **Substantially done in v1.5.0.** |
| 2 UX/UI | Farm HUD, touch targets, inventory/shop filters, named order cards, concise onboarding | Design system and Khmer review | 360–430 px screens usable with no clipping; tasks understandable in both languages. **In progress.** |
| 3 Core gameplay | Full crop stages, skill fishing, animal states, cooking/craft queues, market demand | Balance spreadsheet and animation hooks | Each loop has clear input, feedback and reward; no deadlocks or unreasonable waits. **Seed picker and basic care/fishing done.** |
| 4 Visual | Complete separate production sprites, terrain and effects | Approved style and cultural review | Every visible game object uses consistent original art; atlas sizes fit memory budget. **First atlas pass done.** |
| 5 Content | More recipes, orders, NPC quests, regions, restoration and decorations | Stable core systems | Unlocks remain meaningful; every new item connects to at least two uses. |
| 6 Polish | Audio, haptics, accessibility, graphics options, profiling and release QA | Finished art/content | Smooth on target devices, 30 FPS fallback, full install/update/offline acceptance. |

## K. Implemented Changes in v1.5.0

- `app/src/main/assets/art.js`, `art/*.webp`, `art-source/*.png`: five original sprite atlases and icon mapping.
- `app/src/main/assets/save.js`: validated primary plus rotating backup.
- `app/src/main/assets/game.js`: schema 6 migration, crop growth stages, field seed picker, three crops, two recipes, animal feeding/bonus, simple fishing interaction, short guided onboarding, illustrated map/UI elements, reduced motion preference.
- `app/src/main/assets/style.css`, `index.html`: atlas styling, responsive dialog and navigation wiring.
- `app/src/main/java/com/sroksrae/game/UpdateManager.java`: download information, percentage where size is known, cancel, retry and existing checksum/install approval path.
- `app/build.gradle`: versionCode 8, versionName 1.5.0.
- `scripts/smoke-test.mjs`: legacy save, core loops, new animal/fishing actions and corrupt primary recovery checks.
- `scripts/capture-ui.mjs`: English/Khmer mobile viewport screenshots for visual review.

## L. Testing Checklist

| Check | Current status |
|---|---|
| APK build and signature | Passed local `assembleRelease`, `apksigner verify`; v1.5.0, code 8, 3.17 MB. |
| Browser first launch, English, Khmer, 390 px | Passed CDP smoke and captured welcome plus both language screenshots. |
| Offline gameplay, save/load and migration | Core game uses bundled assets; automated old save and corrupt primary recovery passed. Airplane mode device check pending. |
| Plant, harvest, animals, fish, cook, craft, market, orders | Automated core flow passed; manual touch feel check pending. |
| Four journeys, campaigns, map editing | Automated core checks passed; complete manual story playthrough pending. |
| Install, Android first launch and update download | APK installed on two emulators and Android 8 WebView launch was visually confirmed. Live update URL flow pending. |
| Different screen sizes and rotation | 390 px English/Khmer inspected; 360/430/tablet and Android portrait lock checks pending. |
| Performance and memory | Not yet profiled on low end and mid range physical phones. |

## M. Next Recommended Version

**v1.5.0** is the next local build after v1.4.1. Release notes for this local build:

- **Added:** illustrated sprite atlases, corn/watermelon/chili, grilled corn/fruit plate, field seed picker, short guided onboarding, animal feeding, cast/bite fishing interaction, save backup.
- **Improved:** visual crop stages, village map, navigation art, updater information/progress/cancel/retry.
- **Fixed:** recovery from a corrupted primary save, six item navigation grid, old save migration to schema 6.
- **Performance:** transparent WebP atlases keep the APK near 3.17 MB; device profiling still pending.
- **Visual:** original first pass Cambodian village, crop, building, product, people and region art.
- **Localization:** Khmer UI remains available; full professional translation and font QA still pending.

This is a substantial iterative update, not a claim that the commercial quality art and systems roadmap is finished.
