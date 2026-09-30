/* Original sprite atlases. Each sheet is a 4 by 4 grid of transparent art. */
(() => {
  const entries = {};
  const add = (sheet, ids) => ids.forEach((id, index) => { entries[id] = {sheet, index}; });
  add('crops', ['rice','lotus','banana','morning_glory','mango','lemongrass','cotton','coconut','cassava','pepper','tamarind','pomelo','durian','chili','corn','watermelon']);
  add('goods', ['porridge','banana_cake','nom_banh_chok','stir_fry','amok','ansom_chek','tamarind_soup','pepper_crab','palm_cake','pomelo_salad','durian_coconut','rice_flour','lotus_garland','krama','palm_candy','egg']);
  add('village', ['mature_rice','rice_shoots','banana_tree_crop','mango_fruit','home','basket','krama_cloth','clay_pot','chicken','water_buffalo','fish','boat','palm_tree','banana_tree','market_stall','loom']);
  add('buildings', ['fish_pond','chicken_coop','buffalo_pen','cooking_house','weaving_house','village_market','order_board','river_landing','rice_mill','basket_workshop','sugar_palm_workshop','storage_house','lotus_garden','festival_lanterns','village_well','flower_bench']);
  add('people', ['dara','srey_mom','ta_sok','vanna','tonle_sap','kep','kampong_speu','mondulkiri','farm_nav','orders_nav','kitchen_nav','explore_nav','market_nav','journal_nav','settings_icon','coin_icon']);
  entries.flowers = entries.lotus_garden;
  entries.lanterns = entries.festival_lanterns;
  entries.boat_decor = entries.boat;
  entries.coop = entries.chicken_coop;
  entries.buffalo = entries.buffalo_pen;
  entries.pond = entries.fish_pond;
  entries.kitchen = entries.cooking_house;
  entries.workshop = entries.weaving_house;
  entries.market = entries.village_market;
  entries.orders = entries.order_board;
  entries.explore = entries.river_landing;
  entries.milk = entries.clay_pot;
  entries.crab = entries.pepper_crab;
  entries.palm_sugar = entries.palm_candy;
  entries.honey = entries.clay_pot;
  entries.grilled_corn = entries.corn;
  entries.fruit_plate = entries.watermelon;
  entries.irrigation = entries.village_well;
  entries.net = entries.fish_pond;
  entries.cart = entries.river_landing;
  entries.stove = entries.cooking_house;

  function sprite(id, className='') {
    const entry = entries[id] || entries.basket;
    const x = (entry.index % 4) * 100 / 3;
    const y = Math.floor(entry.index / 4) * 100 / 3;
    return `<span class="art-sprite art-${entry.sheet} ${className}" style="background-position:${x}% ${y}%" aria-hidden="true"></span>`;
  }

  window.SrokArt = {sprite, has: id => !!entries[id]};
})();
