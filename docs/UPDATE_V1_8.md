# Srok Srae v1.8.0 — Village Games and Management

## What changed

- The Farm screen has Map, Fields, and Games views. The Games view shows eight activities, their rewards, cooldowns, and best three star ratings.
- Fishing is now an item earning game: cast, wait for a bite, then find the fish in three rounds. Fish enters inventory only after completing the activity. The fishing net still increases the catch from one fish to two.
- Two more activities are playable: load a boat to its exact basket target to earn bananas, and complete three recipes to earn lemongrass. Market baskets also award produce as well as coins.
- Six coin purchases now support village management: grain store, rice mill, family home, market stall, produce motorbike, and produce truck. Each gives a concrete production, daily gift, order, sale, or travel benefit. Owned buildings or vehicles appear on the map where practical.
- The market shows goods that are actually in stock by default and lets players sell one, five, or all of an item. The Village screen separates Build, Decorate, People, and Progress.
- Original HD Cambodian market scenery and an illustrated produce motorbike were added. The map drag now batches visual updates through `requestAnimationFrame`; Android WebView hardware acceleration is explicitly enabled.

## Item earning activities

| Activity | Reward on completion |
| --- | --- |
| Sort rice | 1–2 rice |
| Reel in a fish | 1 fish, or 2 with the fishing net |
| Find pond pairs | 1 lotus |
| Guide water | 1 rice and 8 coins |
| Weave a krama | 1 krama; consumes 3 cotton |
| Pack market baskets | 1 produce item and 10–15 coins |
| Load the boat | 1–2 bananas |
| Finish the recipe | 1 lemongrass |

Each activity also grants XP. The activities have no pressure timer; the listed cooldown starts after completion. Fishing and the other activities work offline.

## Property purchases

| Property | Level | Coins | Benefit |
| --- | ---: | ---: | --- |
| Grain store | 2 | 220 | Daily gift includes two extra rice |
| Village rice mill | 3 | 330 | Rice flour workshop batch yields two bags |
| Family home | 3 | 420 | Daily gift includes 20 extra coins |
| Market stall | 4 | 460 | Every village order pays 10 extra coins |
| Produce motorbike | 4 | 520 | Orders give 4 extra XP; journeys are 10% shorter |
| Produce truck | 5 | 720 | Better market sale prices and journeys 20% shorter |

Property purchases use coins earned in play. Existing homes, trucks, upgrades, inventory, and story progress are carried forward by save schema 9.

## Verification

The local Chrome smoke test covers old-save migration, item earning through fishing, all eight game flows, property purchases, batch selling, farming, animals, journeys, cooking, workshop, campaigns, and backup recovery. Phone-size English and Khmer screenshots are captured in `qa/`. The Android release APK is built from this source. The visual performance goal is 60 FPS on suitable devices, with a lower graphics option for slower phones; a measured 60 FPS guarantee across Android devices is not claimed.

## Next improvements

Add varied fish behavior and location catches, more original animated production assets, better Khmer copy review with Cambodian players, and device profiling across low and midrange phones. Keep these as future work until implemented and measured.
