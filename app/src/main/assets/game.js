(() => {
  'use strict';
  const SAVE_KEY = 'srok-srae-save-v2';
  const CROPS = [
    {id:'rice',en:'Rice',km:'ស្រូវ',icon:'🌾',cost:0,seconds:20,level:1,yield:2,sell:4,xp:3},
    {id:'lotus',en:'Lotus',km:'ឈូក',icon:'🪷',cost:3,seconds:35,level:1,yield:2,sell:7,xp:5},
    {id:'banana',en:'Banana',km:'ចេក',icon:'🍌',cost:6,seconds:50,level:2,yield:2,sell:11,xp:7},
    {id:'morning_glory',en:'Water spinach',km:'ត្រកួន',icon:'🥬',cost:5,seconds:45,level:2,yield:2,sell:9,xp:6},
    {id:'mango',en:'Mango',km:'ស្វាយ',icon:'🥭',cost:9,seconds:70,level:3,yield:2,sell:16,xp:10},
    {id:'lemongrass',en:'Lemongrass',km:'គល់ស្លឹកគ្រៃ',icon:'🌿',cost:8,seconds:65,level:3,yield:2,sell:14,xp:9},
    {id:'cotton',en:'Cotton',km:'កប្បាស',icon:'☁️',cost:7,seconds:60,level:3,yield:2,sell:12,xp:8},
    {id:'coconut',en:'Coconut',km:'ដូង',icon:'🥥',cost:12,seconds:90,level:4,yield:2,sell:20,xp:12},
    {id:'cassava',en:'Cassava',km:'ដំឡូងមី',icon:'🍠',cost:10,seconds:80,level:4,yield:2,sell:17,xp:11},
    {id:'pepper',en:'Kampot pepper',km:'ម្រេចកំពត',icon:'🌶️',cost:16,seconds:100,level:5,yield:2,sell:26,xp:15},
    {id:'tamarind',en:'Tamarind',km:'អំពិល',icon:'🌿',cost:14,seconds:95,level:5,yield:2,sell:23,xp:14},
    {id:'pomelo',en:'Koh Trong pomelo',km:'ក្រូចថ្លុងកោះទ្រង់',icon:'🍊',cost:20,seconds:120,level:6,yield:2,sell:31,xp:18},
    {id:'durian',en:'Durian',km:'ធុរេន',icon:'🍈',cost:24,seconds:135,level:6,yield:2,sell:36,xp:20},
    {id:'corn',en:'Corn',km:'ពោត',icon:'🌽',cost:5,seconds:55,level:2,yield:2,sell:10,xp:6},
    {id:'watermelon',en:'Watermelon',km:'ឪឡឹក',icon:'🍉',cost:13,seconds:85,level:4,yield:2,sell:22,xp:12},
    {id:'chili',en:'Chili',km:'ម្ទេស',icon:'🌶️',cost:14,seconds:95,level:5,yield:2,sell:25,xp:14}
  ];
  const GOODS = [
    {id:'fish',en:'Fresh fish',km:'ត្រីស្រស់',icon:'🐟',sell:11},
    {id:'egg',en:'Egg',km:'ពងមាន់',icon:'🥚',sell:13},
    {id:'milk',en:'Buffalo milk',km:'ទឹកដោះក្របី',icon:'🥛',sell:24},
    {id:'crab',en:'Kep crab',km:'ក្តាមកែប',icon:'🦀',sell:34},
    {id:'palm_sugar',en:'Kampong Speu palm sugar',km:'ស្ករត្នោតកំពង់ស្ពឺ',icon:'🌴',sell:30},
    {id:'honey',en:'Mondulkiri honey',km:'ទឹកឃ្មុំមណ្ឌលគិរី',icon:'🍯',sell:40}
  ];
  const RECIPES = [
    {id:'porridge',en:'Fish rice porridge',km:'បបរត្រី',icon:'🍚',level:1,needs:{rice:2,fish:1},sell:31,xp:13},
    {id:'banana_cake',en:'Banana cake',km:'នំចេក',icon:'🍰',level:2,needs:{banana:2,egg:1},sell:43,xp:18},
    {id:'nom_banh_chok',en:'Nom banh chok',km:'នំបញ្ចុក',icon:'🍜',level:3,needs:{rice_flour:1,fish:1,lemongrass:1},sell:55,xp:22},
    {id:'stir_fry',en:'Stir-fried water spinach',km:'ត្រកួនឆា',icon:'🥘',level:3,needs:{morning_glory:2,lemongrass:1},sell:42,xp:18},
    {id:'amok',en:'Fish amok',km:'អាម៉ុកត្រី',icon:'🍲',level:4,needs:{fish:2,coconut:1,lemongrass:1},sell:70,xp:26},
    {id:'ansom_chek',en:'Nom ansom chek',km:'នំអន្សមចេក',icon:'🍌',level:4,needs:{rice:2,banana:1,coconut:1},sell:64,xp:25},
    {id:'tamarind_soup',en:'Tamarind fish soup',km:'សម្លម្ជូរអំពិលត្រី',icon:'🍲',level:5,needs:{fish:1,tamarind:1,lemongrass:1},sell:70,xp:27},
    {id:'pepper_crab',en:'Kep pepper crab',km:'ក្តាមម្រេចកែប',icon:'🦀',level:5,needs:{crab:1,pepper:2},sell:105,xp:36},
    {id:'palm_cake',en:'Palm sugar rice cake',km:'នំស្ករត្នោត',icon:'🍮',level:5,needs:{rice:2,palm_sugar:1,coconut:1},sell:85,xp:30},
    {id:'pomelo_salad',en:'Pomelo herb salad',km:'ញាំក្រូចថ្លុង',icon:'🥗',level:6,needs:{pomelo:1,lemongrass:1},sell:78,xp:30},
    {id:'durian_coconut',en:'Durian coconut sweet',km:'បង្អែមធុរេនដូង',icon:'🍨',level:6,needs:{durian:1,coconut:1,palm_sugar:1},sell:110,xp:38},
    {id:'grilled_corn',en:'Grilled corn',km:'ពោតអាំង',icon:'🌽',level:2,needs:{corn:2},sell:28,xp:10},
    {id:'fruit_plate',en:'Fresh fruit plate',km:'ចានផ្លែឈើស្រស់',icon:'🍉',level:4,needs:{watermelon:1,banana:1,mango:1},sell:62,xp:22}
  ];
  const DECOR = [
    {id:'flowers',en:'Lotus garden',km:'សួនផ្កាឈូក',icon:'🪷',cost:45},
    {id:'lanterns',en:'Festival lanterns',km:'គោមបុណ្យ',icon:'🏮',cost:75},
    {id:'boat',en:'Village boat',km:'ទូកភូមិ',icon:'🛶',cost:120}
  ];
  const CRAFTS = [
    {id:'rice_flour',en:'Rice flour',km:'ម្សៅអង្ករ',icon:'🥣',level:2,seconds:35,needs:{rice:3},sell:24,xp:9},
    {id:'lotus_garland',en:'Lotus garland',km:'កម្រងផ្កាឈូក',icon:'🌸',level:2,seconds:45,needs:{lotus:3},sell:45,xp:13},
    {id:'krama',en:'Woven krama',km:'ក្រមាត្បាញ',icon:'🧣',level:3,seconds:90,needs:{cotton:3},sell:75,xp:23},
    {id:'palm_candy',en:'Palm sugar candy',km:'ស្ករត្នោតគ្រាប់',icon:'🍬',level:5,seconds:65,needs:{palm_sugar:2,coconut:1},sell:95,xp:27}
  ];
  const FRIENDS = [
    {id:'dara',en:'Dara the fisher',km:'ដារ៉ា អ្នកនេសាទ',icon:'👧🏽',favorite:'fish'},
    {id:'srey_mom',en:'Srey Mom the cook',km:'ស្រីមុំ ចុងភៅ',icon:'👩🏽‍🍳',favorite:'porridge'},
    {id:'ta_sok',en:'Ta Sok the gardener',km:'តាសុខ អ្នកថែសួន',icon:'👴🏽',favorite:'lotus_garland'},
    {id:'vanna',en:'Vanna the weaver',km:'វណ្ណា អ្នកត្បាញ',icon:'👩🏽',favorite:'krama'}
  ];
  const MAKERS = [
    {en:'Hands at work',km:'ដៃកំពុងធ្វើការ',text:'Make three village goods and give a neighbor a gift.',textKm:'ផលិតទំនិញភូមិបីមុខ ហើយជូនអំណោយមួយដល់អ្នកជិតខាង។',goals:[['crafted',3],['gifts',1]],reward:80},
    {en:'The weaver’s scarf',km:'ក្រមារបស់អ្នកត្បាញ',text:'Weave a krama and bring four gifts to neighbors.',textKm:'ត្បាញក្រមាមួយ ហើយជូនអំណោយបួនដល់អ្នកជិតខាង។',goals:[['krama',1],['gifts',4]],reward:130},
    {en:'Village makers fair',km:'ផ្សារអ្នកផលិតភូមិ',text:'Make ten goods and build ten friendship hearts to open the makers fair.',textKm:'ផលិតទំនិញដប់ និងបង្កើតបេះដូងមិត្តភាពដប់ ដើម្បីបើកផ្សារអ្នកផលិត។',goals:[['crafted',10],['hearts',10]],reward:220}
  ];
  const UPGRADES = [
    {id:'irrigation',en:'Water channels',km:'ប្រឡាយទឹក',icon:'💧',level:2,cost:100,desc:'Crops grow 15% faster.',descKm:'ដំណាំលូតលាស់លឿនជាងមុន ១៥%។'},
    {id:'net',en:'Fishing net',km:'សំណាញ់នេសាទ',icon:'🕸️',level:3,cost:110,desc:'Catch two fish each time.',descKm:'ចាប់បានត្រីពីរក្បាលរាល់លើក។'},
    {id:'cart',en:'Travel cart',km:'រទេះដំណើរ',icon:'🛒',level:4,cost:150,desc:'Journeys finish 25% faster.',descKm:'ដំណើរបញ្ចប់លឿនជាងមុន ២៥%។'},
    {id:'stove',en:'Clay stove',km:'ចង្ក្រានដី',icon:'🔥',level:5,cost:180,desc:'Cook two portions at once.',descKm:'ចម្អិនបានពីរចានក្នុងមួយលើក។'}
  ];
  const PROPERTY = [
    {id:'storage_house',en:'Grain store',km:'ឃ្លាំងស្រូវ',level:2,cost:220,desc:'Keep more of the harvest. Your daily gift includes two extra rice.',descKm:'រក្សាទុកផលដំណាំបានច្រើន។ អំណោយប្រចាំថ្ងៃបន្ថែមស្រូវពីរ។'},
    {id:'rice_mill',en:'Village rice mill',km:'រោងម៉ាស៊ីនកិនស្រូវ',level:3,cost:330,desc:'Make two bags of rice flour from one workshop batch.',descKm:'ផលិតម្សៅអង្ករបានពីរថង់ក្នុងមួយដង។'},
    {id:'family_home',en:'Family home',km:'ផ្ទះគ្រួសារ',level:3,cost:420,desc:'A larger home beside the fields. Daily village gift includes 20 extra coins.',descKm:'ផ្ទះធំជាងមុនក្បែរស្រែ។ អំណោយប្រចាំថ្ងៃបន្ថែម ២០ កាក់។'},
    {id:'market_stall',en:'Market stall',km:'តូបផ្សារ',level:4,cost:460,desc:'Organize deliveries. Each village order pays 10 extra coins.',descKm:'រៀបចំការដឹកជញ្ជូន។ កម្ម៉ង់ភូមិនីមួយៗទទួលបានកាក់បន្ថែម ១០។'},
    {id:'produce_motorbike',en:'Produce motorbike',km:'ម៉ូតូដឹកផលដំណាំ',level:4,cost:520,desc:'Deliver around the village. Orders give 4 extra XP and journeys finish 10% sooner.',descKm:'ដឹកជញ្ជូនក្នុងភូមិ។ កម្ម៉ង់ផ្តល់បទពិសោធន៍បន្ថែម ៤ ហើយដំណើរលឿនជាងមុន ១០%។'},
    {id:'produce_truck',en:'Produce truck',km:'រថយន្តដឹកផលដំណាំ',level:5,cost:720,desc:'Carry goods to market. Earn bonus coins on every sale and finish journeys 20% sooner.',descKm:'ដឹកផលដំណាំទៅផ្សារ។ លក់បានកាក់បន្ថែមរាល់លើក ហើយដំណើរលឿនជាងមុន ២០%។'}
  ];
  const REGIONS = [
    {id:'tonle_sap',en:'Tonle Sap Lake',km:'បឹងទន្លេសាប',icon:'🚣',level:2,cost:0,seconds:45,rewards:{fish:2,lotus:1},xp:12,desc:'Visit the great lake and return with fish and lotus.',descKm:'ទៅបឹងទន្លេសាប ហើយនាំត្រី និងឈូកត្រឡប់មកវិញ។'},
    {id:'kep',en:'Kep Coast',km:'ឆ្នេរកែប',icon:'🦀',level:4,cost:15,seconds:70,rewards:{crab:2},xp:18,desc:'Bring back crab from the coast.',descKm:'នាំក្តាមពីឆ្នេរត្រឡប់មកវិញ។'},
    {id:'kampong_speu',en:'Kampong Speu',km:'កំពង់ស្ពឺ',icon:'🌴',level:5,cost:20,seconds:90,rewards:{palm_sugar:2},xp:22,desc:'Trade for palm sugar from the countryside.',descKm:'ដោះដូរស្ករត្នោតពីជនបទ។'},
    {id:'mondulkiri',en:'Mondulkiri',km:'មណ្ឌលគិរី',icon:'🍯',level:6,cost:25,seconds:110,rewards:{honey:2},xp:26,desc:'Bring forest honey back to the village.',descKm:'នាំទឹកឃ្មុំព្រៃមកភូមិ។'}
  ];
  const JOURNEY = [
    {en:'The great lake',km:'បឹងធំ',text:'Travel to Tonle Sap and bring new goods to the village.',textKm:'ធ្វើដំណើរទៅទន្លេសាប ហើយនាំទំនិញថ្មីមកភូមិ។',goals:[['tonle_sap',1],['trips',2]],reward:80},
    {en:'Flavors of Kep',km:'រសជាតិកែប',text:'Return from Kep and cook pepper crab.',textKm:'ត្រឡប់ពីកែប ហើយចម្អិនក្តាមម្រេច។',goals:[['kep',1],['pepper_crab',1]],reward:110},
    {en:'Sweet countryside',km:'រសជាតិផ្អែមជនបទ',text:'Find palm sugar and bake a village rice cake.',textKm:'រកស្ករត្នោត ហើយធ្វើនំអង្ករភូមិ។',goals:[['kampong_speu',1],['palm_cake',1]],reward:140},
    {en:'Across Cambodia',km:'ទូទាំងកម្ពុជា',text:'Visit every region and complete eight journeys to prepare a river celebration.',textKm:'ទៅគ្រប់តំបន់ និងបញ្ចប់ដំណើរប្រាំបីដង ដើម្បីរៀបចំពិធីទន្លេ។',goals:[['regions',4],['trips',8]],reward:250}
  ];
  const chromeVersion = /Chrome\/(\d+)/.exec(navigator.userAgent);
  const olderEmoji = chromeVersion && Number(chromeVersion[1]) < 100;
  if (olderEmoji) {
    document.documentElement.classList.add('legacy-webview');
    CROPS.find(c=>c.id==='lotus').icon='🌺';
    CROPS.find(c=>c.id==='morning_glory').icon='🌿';
    DECOR.find(d=>d.id==='flowers').icon='🌺';
  }
  const CHAPTERS = [
    {en:'A new season',km:'រដូវថ្មី',npc:'👩🏽‍🌾',speaker:'Srey Mom',text:'Our village fields are quiet. Plant crops and bring a fish from the pond.',textKm:'ស្រែភូមិយើងស្ងាត់ណាស់។ ដាំដំណាំ ហើយនាំត្រីពីស្រះមក។',goals:[['harvest',4],['fish',1]],reward:55},
    {en:'Neighbors help neighbors',km:'អ្នកជិតខាងជួយគ្នា',npc:'👴🏽',speaker:'Ta Sok',text:'Fill village orders and prepare warm meals for our neighbors.',textKm:'បំពេញការកម្ម៉ង់ និងចម្អិនអាហារសម្រាប់អ្នកជិតខាង។',goals:[['orders',3],['cooked',2]],reward:90},
    {en:'Life around the farm',km:'ជីវិតជុំវិញកសិដ្ឋាន',npc:'👧🏽',speaker:'Dara',text:'Grow the fields and welcome chickens to the village.',textKm:'ពង្រីកស្រែ និងនាំមាន់មកភូមិ។',goals:[['harvest',20],['eggs',3]],reward:110},
    {en:'Prepare the feast',km:'ត្រៀមពិធីជប់លៀង',npc:'👩🏽‍🍳',speaker:'Srey Mom',text:'Share more dishes and deliveries so everyone can join the celebration.',textKm:'ចែករំលែកម្ហូប និងទំនិញ ដើម្បីឱ្យគ្រប់គ្នាចូលរួមពិធី។',goals:[['orders',8],['cooked',7]],reward:150},
    {en:'Village festival',km:'បុណ្យភូមិ',npc:'🎊',speaker:'The village',text:'Decorate the village and save 200 coins to host the festival.',textKm:'តុបតែងភូមិ និងសន្សំ ២០០ កាក់ ដើម្បីរៀបចំពិធីបុណ្យ។',goals:[['decor',3],['coins',200]],reward:0}
  ];
  const ALL = [...CROPS,...GOODS,...RECIPES,...CRAFTS];
  const MINI_IDS = ['rice','fish','lotus','canal','loom','market','cargo','recipe'];
  const BY_ID = {};
  ALL.forEach(x => { BY_ID[x.id] = x; });
  const XP_LEVELS = [0,0,35,100,210,370,600,900];
  const app = document.getElementById('app');
  const modalRoot = document.getElementById('modal-root');
  const toastEl = document.getElementById('toast');
  let tab = 'farm', kitchenMode='cook', farmMode='map', villageMode='build', marketShowAll=false, arranging=false, selectedDecor='', pendingPlot=-1, pendingAnimal='', pendingSale='', fishingCastAt=0, miniSession=null, mapMoved=false, mapFrame=0, recoveredSave=false, modal = '', toastTimer, audio;

  const freshState = () => ({version:10,profileName:'Village farmer',coins:80,xp:0,plots:Array(12).fill(null),inventory:{},selected:'rice',fishAt:0,coopAt:0,buffaloAt:0,animalCare:{chicken:0,buffalo:0},miniAt:{rice:0,loom:0,market:0,lotus:0,canal:0,cargo:0,recipe:0},miniBest:{},mapCamera:{x:0,y:0,zoom:1},decorPositions:{},ownedProperty:[],reducedMotion:false,graphics:'auto',
    chicken:false,buffalo:false,chapter:0,won:false,stats:{harvest:0,fish:0,orders:0,cooked:0,eggs:0,milk:0,earned:0,trips:0,crafted:0,gifts:0,miniGames:0,propertySpent:0},
    orders:[],nextOrderId:1,decor:[],upgrades:[],sound:true,lang:'en',seenHelp:false,tutorialStep:0,travel:null,visits:{},cookedKinds:{},journeyChapter:0,journeyWon:false,lastDaily:'',workshop:null,craftedKinds:{},friendship:{},friendRewards:{},giftAt:{},makersChapter:0,makersWon:false});
  function normalizeProfileName(value) {
    const name=typeof value==='string'?value.trim().replace(/\s+/g,' '):'';
    if(!name)return 'Village farmer';
    if(typeof Intl!=='undefined'&&typeof Intl.Segmenter==='function')return [...new Intl.Segmenter('km',{granularity:'grapheme'}).segment(name)].slice(0,24).map(part=>part.segment).join('');
    return Array.from(name).slice(0,48).join('');
  }
  function load() {
    try {
      const result = SrokSave.load(SAVE_KEY), raw=result.state;
      recoveredSave=result.recovered;
      if (!raw || ![2,3,4,5,6,7,8,9,10].includes(raw.version)) return freshState();
      const s = freshState();
      Object.assign(s,raw);
      s.version=10;
      s.profileName=normalizeProfileName(raw.profileName);
      s.mapCamera=raw.mapCamera && typeof raw.mapCamera==='object' ? raw.mapCamera : {x:0,y:0,zoom:1};
      s.decorPositions=raw.decorPositions && typeof raw.decorPositions==='object' ? raw.decorPositions : {};
      s.animalCare=Object.assign({chicken:0,buffalo:0},raw.animalCare||{});
      s.miniAt={rice:0,loom:0,market:0,lotus:0,canal:0,cargo:0,recipe:0};
      for(const key of Object.keys(s.miniAt))s.miniAt[key]=Math.max(0,Number(raw.miniAt&&raw.miniAt[key])||0);
      s.miniBest={};
      for(const id of ['rice','lotus','canal','loom','market','fish','cargo','recipe'])s.miniBest[id]=Math.min(3,Math.max(0,Number(raw.miniBest&&raw.miniBest[id])||0));
      s.stats = Object.assign(freshState().stats,raw.stats || {});
      s.inventory = raw.inventory && typeof raw.inventory === 'object' ? raw.inventory : {};
      s.plots = Array.isArray(raw.plots) ? raw.plots.slice(0,20) : s.plots;
      while (s.plots.length < 12) s.plots.push(null);
      s.plots=s.plots.map(plot=>plot&&BY_ID[plot.id]&&Number.isFinite(Number(plot.at))?plot:null);
      s.orders = Array.isArray(raw.orders) ? raw.orders.slice(0,3) : [];
      s.decor = Array.isArray(raw.decor) ? raw.decor : [];
      s.upgrades = Array.isArray(raw.upgrades) ? raw.upgrades : [];
      s.ownedProperty = Array.isArray(raw.ownedProperty) ? raw.ownedProperty.filter(id=>PROPERTY.some(item=>item.id===id)) : [];
      s.graphics = ['auto','high','low'].includes(raw.graphics) ? raw.graphics : 'auto';
      s.visits = raw.visits && typeof raw.visits==='object' ? raw.visits : {};
      s.cookedKinds = raw.cookedKinds && typeof raw.cookedKinds==='object' ? raw.cookedKinds : {};
      s.craftedKinds = raw.craftedKinds && typeof raw.craftedKinds==='object' ? raw.craftedKinds : {};
      s.friendship = raw.friendship && typeof raw.friendship==='object' ? raw.friendship : {};
      s.friendRewards = raw.friendRewards && typeof raw.friendRewards==='object' ? raw.friendRewards : {};
      s.giftAt = raw.giftAt && typeof raw.giftAt==='object' ? raw.giftAt : {};
      s.coins = Math.max(0,Number(s.coins) || 0);
      s.xp = Math.max(0,Number(s.xp) || 0);
      s.tutorialStep = [0,1,2,3].includes(Number(s.tutorialStep)) ? Number(s.tutorialStep) : 0;
      if(!BY_ID[s.selected])s.selected='rice';
      return s;
    } catch (_) { return freshState(); }
  }
  let state = load();
  function save() { if(!SrokSave.save(SAVE_KEY,state))console.warn('Srok Srae could not save progress'); }
  function L(en,km) { return state.lang === 'km' ? km : en; }
  function profileDisplayName() { return state.profileName==='Village farmer'?L('Village farmer','កសិករភូមិ'):state.profileName; }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
  function name(item) { return state.lang === 'km' ? item.km : item.en; }
  function art(id, cls='') { return SrokArt.sprite(id,cls); }
  function cropStage(plot) {
    if (!plot) return 0;
    const crop=BY_ID[plot.id],duration=plot.duration||((crop?crop.seconds:60)*1000);
    const elapsed=Math.max(0,Math.min(duration,Date.now()-(plot.startedAt||plot.at-duration)));
    return Math.min(4,Math.floor(elapsed/duration*4));
  }
  function level() { let n=1; for(let i=2;i<XP_LEVELS.length;i++) if(state.xp>=XP_LEVELS[i]) n=i; return n; }
  function profileTitle() { return level()>=5?L('Village steward','អ្នកថែភូមិ'):level()>=3?L('Growing farmer','កសិករកំពុងរីកចម្រើន'):L('New farmer','កសិករថ្មី'); }
  function nextLevel() { return XP_LEVELS[Math.min(XP_LEVELS.length-1,level()+1)]; }
  function count(id) { return Math.max(0,Number(state.inventory[id]) || 0); }
  function hasProperty(id) { return state.ownedProperty.includes(id); }
  function sellPrice(item) { return item.sell+(hasProperty('produce_truck')?Math.max(1,Math.round(item.sell*.1)):0); }
  function add(id,n) { state.inventory[id] = count(id)+n; }
  function spend(req) { for(const [id,n] of Object.entries(req)) add(id,-n); }
  function has(req) { return Object.entries(req).every(([id,n]) => count(id)>=n); }
  function timeLeft(at) { return Math.max(0,Math.ceil((at-Date.now())/1000)); }
  function clock(seconds) { return seconds>=60 ? `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}` : `${seconds}s`; }
  function weather() {
    const day=Math.floor(Date.now()/86400000);
    return [
      {id:'sunny',icon:'☀️',en:'Sunny',km:'ថ្ងៃរះ',factor:1},
      {id:'rainy',icon:'🌧️',en:'Rainy',km:'ភ្លៀង',factor:.8},
      {id:'breezy',icon:'🌤️',en:'Breezy',km:'ខ្យល់ត្រជាក់',factor:.9},
      {id:'cloudy',icon:'☁️',en:'Cloudy',km:'ពពក',factor:1.1}
    ][day%4];
  }
  function dailyDate() { const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }
  function journeyValue(key) {
    if(key==='trips') return state.stats.trips||0;
    if(key==='regions') return REGIONS.filter(r=>(state.visits[r.id]||0)>0).length;
    if(key==='pepper_crab'||key==='palm_cake')return state.cookedKinds[key]||0;
    return state.visits[key]||0;
  }
  function journeyGoalName(key) {
    if(key==='trips')return L('Journeys completed','ដំណើរបានបញ្ចប់');
    if(key==='regions')return L('Regions visited','តំបន់បានទៅ');
    if(key==='pepper_crab')return L('Pepper crab cooked','ក្តាមម្រេចបានចម្អិន');
    if(key==='palm_cake')return L('Palm cakes made','នំស្ករត្នោតបានធ្វើ');
    const region=REGIONS.find(r=>r.id===key);return region?name(region):key;
  }
  function journeyComplete() {return !state.journeyWon && JOURNEY[state.journeyChapter].goals.every(([key,n])=>journeyValue(key)>=n);}
  function makersValue(key) {
    if(key==='crafted'||key==='gifts')return state.stats[key]||0;
    if(key==='hearts')return FRIENDS.reduce((sum,f)=>sum+(state.friendship[f.id]||0),0);
    return state.craftedKinds[key]||0;
  }
  function makersGoalName(key) {
    if(key==='crafted')return L('Goods made','ទំនិញបានផលិត');
    if(key==='gifts')return L('Gifts given','អំណោយបានជូន');
    if(key==='hearts')return L('Friendship hearts','បេះដូងមិត្តភាព');
    return name(CRAFTS.find(x=>x.id===key));
  }
  function makersComplete() {return !state.makersWon && MAKERS[state.makersChapter].goals.every(([key,n])=>makersValue(key)>=n);}
  function ping(freq=660) {
    if(!state.sound) return;
    try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); const osc=audio.createOscillator(), gain=audio.createGain();
      osc.type='sine'; osc.frequency.value=freq; gain.gain.setValueAtTime(.08,audio.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.17);
      osc.connect(gain).connect(audio.destination); osc.start(); osc.stop(audio.currentTime+.18); } catch (_) {}
  }
  function toast(message) { toastEl.textContent=message; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2400); }
  function confetti() { const el=document.createElement('div');el.className='confetti';document.body.appendChild(el);setTimeout(()=>el.remove(),2100); }
  function commit(sound=690) { save(); render(); ping(sound); }
  function makeOrder() {
    const id = state.nextOrderId++;
    const pool = CROPS.filter(c=>c.level<=level()).map(c=>c.id).concat('fish');
    if(state.chicken) pool.push('egg');
    if(state.buffalo) pool.push('milk');
    if((state.visits.kep||0)>0) pool.push('crab');
    if((state.visits.kampong_speu||0)>0) pool.push('palm_sugar');
    if((state.visits.mondulkiri||0)>0) pool.push('honey');
    CRAFTS.filter(x=>(state.craftedKinds[x.id]||0)>0).forEach(x=>pool.push(x.id));
    const first = pool[(id*7+3)%pool.length];
    let second = pool[(id*11+1)%pool.length];
    if(second===first) second=pool[(pool.indexOf(first)+1)%pool.length];
    const needs = {[first]:1+(id%3)};
    if(id>1 && second!==first) needs[second]=1+(id%2);
    const value=Object.entries(needs).reduce((sum,[key,n])=>sum+BY_ID[key].sell*n,0);
    return {id,needs,coins:Math.round(value*1.6+8),xp:10+Object.values(needs).reduce((a,b)=>a+b,0)*4};
  }
  while(state.orders.length<3) state.orders.push(makeOrder());
  save();

  function progressGoal(key) { return key==='coins'?state.coins:key==='decor'?state.decor.length:state.stats[key]||0; }
  function goalName(key) {
    return ({harvest:L('Harvests','ប្រមូលផល'),fish:L('Fish caught','ចាប់ត្រី'),orders:L('Orders filled','ការកម្ម៉ង់'),cooked:L('Dishes cooked','ម្ហូបចម្អិន'),eggs:L('Eggs collected','ប្រមូលពង'),decor:L('Decorations','គ្រឿងតុបតែង'),coins:L('Coins saved','កាក់សន្សំ')})[key];
  }
  function chapterComplete() { return state.chapter<5 && CHAPTERS[state.chapter].goals.every(([key,n])=>progressGoal(key)>=n); }
  function storyCard() {
    if(state.won) return `<div class="card chapter"><div class="npc">${art('festival_lanterns')}</div><h3>${L('The festival lives on!','ពិធីបុណ្យនៅតែបន្ត!')}</h3><p>${L('You restored village life. Keep farming and helping your neighbors.','អ្នកបានស្តារជីវិតភូមិឡើងវិញ។ បន្តដាំដុះ និងជួយអ្នកជិតខាង។')}</p></div>`;
    const ch=CHAPTERS[state.chapter];
    return `<div class="card chapter"><div class="npc">${art(ch.speaker==='Srey Mom'?'srey_mom':ch.speaker==='Ta Sok'?'ta_sok':ch.speaker==='Dara'?'dara':'festival_lanterns')}</div><small>${L('CHAPTER','វគ្គ')} ${state.chapter+1} / 5 • ${ch.speaker}</small><h3>${state.lang==='km'?ch.km:ch.en}</h3><p>${state.lang==='km'?ch.textKm:ch.text}</p>
      ${ch.goals.map(([key,n])=>`<div class="row between"><small>${goalName(key)}</small><b>${Math.min(progressGoal(key),n)} / ${n}</b></div><div class="progress"><span style="width:${Math.min(100,progressGoal(key)/n*100)}%"></span></div>`).join('')}
      <button class="btn ${state.chapter===4?'coral':''}" data-action="claim" ${chapterComplete()?'':'disabled'}>${state.chapter===4?L('START THE FESTIVAL 🎉','ចាប់ផ្តើមពិធីបុណ្យ 🎉'):L('COMPLETE CHAPTER','បញ្ចប់វគ្គ')}</button></div>`;
  }
  function station(action,cls,icon,title,sub,ready) { return `<button class="station ${cls} ${ready?'ready':''}" data-action="${action}" aria-label="${title}: ${sub}">${art(action==='fishPanel'?'fish_pond':action==='kitchenTab'?'cooking_house':action)}${title}<br><small>${sub}</small></button>`; }
  function scene() {
    const fishTime=timeLeft(state.fishAt), eggTime=timeLeft(state.coopAt), milkTime=timeLeft(state.buffaloAt);
    return `<div class="scene weather-${weather().id}"><div class="sun"></div><div class="cloud"></div><div class="palm">${art('palm_tree')}</div>
      <div class="house">${art('home')}</div><div class="farmer">${art('basket')}</div>
       ${station('fishPanel','pond','🐟',L('Pond','ស្រះ'),fishTime?clock(fishTime):L('Catch fish','ចាប់ត្រី'),!fishTime)}
      ${station('coop','coop','🐔',L('Coop','ទ្រុងមាន់'),!state.chicken?`◉ 70`:(eggTime?clock(eggTime):L('Collect','ប្រមូល')),state.chicken&&!eggTime)}
      ${station('buffalo','buffalo','🐃',L('Buffalo','ក្របី'),!state.buffalo?`◉ 180`:(milkTime?clock(milkTime):L('Collect','ប្រមូល')),state.buffalo&&!milkTime)}
      ${station('kitchenTab','kitchen-hot','🍲',L('Kitchen','ផ្ទះបាយ'),L('Cook','ចម្អិន'),false)}
      ${state.decor.includes('flowers')?`<span class="world-decor flowers">${art('flowers')}</span>`:''}
      ${state.decor.includes('lanterns')?`<span class="world-decor lanterns">${art('lanterns')}</span>`:''}
      ${state.decor.includes('boat')?`<span class="world-decor boat">${art('boat')}</span>`:''}
      ${state.journeyWon?'<span class="world-decor river-banner">🎏</span>':''}
      ${state.makersWon?'<span class="world-decor makers-banner">🧣</span>':''}</div>`;
  }
  const mapPlotPosition = i => ({x:244+(i%5)*92+(Math.floor(i/5)%2)*18,y:278+Math.floor(i/5)*56+(i%5)*8});
  const decorDefaults={flowers:{x:120,y:126},lanterns:{x:635,y:132},boat:{x:688,y:396}};
  function renderMap() {
    const tutorialPlot=state.plots.findIndex(plot=>!plot);
    const station=(key,x,y,icon,en,km,action,extra='')=>`<button class="map-station ${extra}" style="left:${x}px;top:${y}px" data-action="${action}" data-id="${key}" aria-label="${L(en,km)}">${art(key==='market'&&hasProperty('market_stall')?'market_stall':key)}<b>${L(en,km)}</b></button>`;
    return `<div class="map-shell"><div class="map-toolbar"><strong>${art('farm_nav')} ${L('Village','ភូមិ')} · ${name(weather())}</strong><div><button class="map-tool ${arranging?'active':''}" data-action="arrange">${arranging?L('DONE','រួចរាល់'):L('ARRANGE','តុបតែង')}</button><button class="map-tool" data-action="mapZoom" data-id="out" aria-label="Zoom out">−</button><button class="map-tool" data-action="mapZoom" data-id="in" aria-label="Zoom in">+</button></div></div>
      <div class="map-viewport ${arranging?'arranging':''} ${selectedDecor?'placement-active':''}" id="farm-map" role="region" aria-label="${L('Interactive farm map','ផែនទីកសិដ្ឋាន')}" tabindex="0"><div class="map-world" id="map-world">
        <div class="map-river"></div><div class="map-road road-a"></div><div class="map-road road-b"></div><div class="map-paddy paddy-a"></div><div class="map-paddy paddy-b"></div>
        <div class="map-palm palm-a">${art('palm_tree')}</div><div class="map-palm palm-b">${art('banana_tree')}</div><div class="map-palm palm-c">${art('palm_tree')}</div><div class="map-cloud"></div>
        <div class="map-house ${hasProperty('family_home')?'improved':''}">${art(hasProperty('family_home')?'family_home':'home')}<small>${L('Our home','ផ្ទះយើង')}</small></div>
        ${hasProperty('produce_truck')?`<div class="map-truck" aria-label="${L('Your produce truck','រថយន្តដឹកផលដំណាំរបស់អ្នក')}">${art('produce_truck')}</div>`:''}
        ${hasProperty('produce_motorbike')?`<div class="map-owned map-motorbike" aria-label="${L('Your motorbike','ម៉ូតូរបស់អ្នក')}">${art('produce_motorbike')}</div>`:''}
        ${hasProperty('storage_house')?`<div class="map-owned map-storage" aria-label="${L('Your grain store','ឃ្លាំងស្រូវរបស់អ្នក')}">${art('storage_house')}</div>`:''}
        ${hasProperty('rice_mill')?`<div class="map-owned map-mill" aria-label="${L('Your rice mill','រោងម៉ាស៊ីនកិនស្រូវរបស់អ្នក')}">${art('rice_mill')}</div>`:''}
        ${Array.from({length:20},(_,i)=>{const p=mapPlotPosition(i),plot=state.plots[i],crop=plot&&BY_ID[plot.id],ready=plot&&!timeLeft(plot.at),stage=cropStage(plot);return `<button class="map-plot ${plot?'growing growth-'+stage:'empty'} ${ready?'ready':''} ${i>=state.plots.length?'locked':''} ${i===tutorialPlot&&state.tutorialStep===1?'tutorial-target':''}" style="left:${p.x}px;top:${p.y}px" ${i>=state.plots.length?'disabled':''} data-action="${plot?'plot':'openPlot'}" data-id="${i}" aria-label="${L('Field','ស្រែ')} ${i+1}${crop?' '+name(crop):''}">${i>=state.plots.length?'×':crop?art(stage<2&&crop.id==='rice'?'rice_shoots':crop.id):'+'}${plot?`<small>${ready?L('READY','រួចរាល់'):clock(timeLeft(plot.at))}</small>`:''}</button>`;}).join('')}
        ${station('pond',104,334,'🐟','Fish pond','ស្រះត្រី','fishPanel',!timeLeft(state.fishAt)?'map-ready':'')}
        ${station('coop',612,204,'🐔',state.chicken?'Chicken coop':'Build coop','ទ្រុងមាន់','animalPanel',state.chicken&&!timeLeft(state.coopAt)?'map-ready':'')}
        ${station('buffalo',730,260,'🐃',state.buffalo?'Water buffalo':'Buffalo pen','ក្រោលក្របី','animalPanel',state.buffalo&&!timeLeft(state.buffaloAt)?'map-ready':'')}
        ${station('kitchen',335,116,'🍲','Kitchen','ផ្ទះបាយ','kitchenTab')}
        ${station('workshop',746,111,'🧣','Weaving','ត្បាញ','workshopTab')}
        ${station('market',805,455,'🧺','Market','ផ្សារ','marketTab')}
        ${station('orders',523,90,'📋','Orders','កម្ម៉ង់','ordersTab')}
        ${station('explore',82,486,'🚣','Explore','ដំណើរ','exploreTab')}
        ${state.decor.map(id=>{const d=DECOR.find(item=>item.id===id),p=state.decorPositions[id]||decorDefaults[id];return d?`<button class="map-decoration ${selectedDecor===id?'selected':''}" style="left:${p.x}px;top:${p.y}px" data-action="mapDecor" data-id="${id}" aria-label="${name(d)}">${art(id==='boat'?'boat_decor':id)}</button>`:'';}).join('')}
        ${state.journeyWon?`<div class="map-flag" style="left:443px;top:73px">${art('festival_lanterns')}</div>`:''}${state.makersWon?`<div class="map-flag" style="left:782px;top:73px">${art('krama')}</div>`:''}
      </div></div><p class="map-hint">${arranging?(selectedDecor?L('Tap the ground to place your decoration.','ចុចលើដីដើម្បីដាក់គ្រឿងតុបតែង។'):L('Tap a decoration, then tap a new place.','ចុចគ្រឿងតុបតែង រួចចុចទីតាំងថ្មី។')):L('Drag to move • tap a field or building • use + and − to zoom','អូសដើម្បីផ្លាស់ទី • ចុចស្រែ ឬអគារ • ប្រើ + និង − ដើម្បីពង្រីក')}</p></div>`;
  }
  function miniReady(id) {
    return !timeLeft(id==='fish'?state.fishAt:(state.miniAt[id]||0)) && (id!=='loom'||(level()>=3&&count('cotton')>=3&&!state.workshop));
  }
  function miniButtonLabel(id) {
    const wait=timeLeft(id==='fish'?state.fishAt:(state.miniAt[id]||0));
    if(wait)return `${L('READY IN','រួចរាល់ក្នុង')} ${clock(wait)}`;
    if(id==='loom'&&level()<3)return `${L('LEVEL','កម្រិត')} 3`;
    if(id==='loom'&&state.workshop)return L('WORKBENCH BUSY','តុការងាររវល់');
    if(id==='loom'&&count('cotton')<3)return L('NEED 3 COTTON','ត្រូវការកប្បាស ៣');
    return L('PLAY','លេង');
  }
  function miniCard(id) {
    const details={
      rice:['mature_rice',L('Sort the rice harvest','បែងចែកស្រូវ'),L('Pick ripe bundles over three rounds. Earn rice and XP.','ជ្រើសស្រូវទុំបីវគ្គ ដើម្បីទទួលស្រូវ និងបទពិសោធន៍។')],
      loom:['weaving_house',L('Weave a krama','ត្បាញក្រមា'),L('Match four stripes. Uses 3 cotton to make a krama.','ផ្គូផ្គងខ្សែបួនពណ៌។ ប្រើកប្បាស ៣ ដើម្បីធ្វើក្រមា។')],
      market:['basket',L('Pack market baskets','រៀបចំកន្ត្រកផ្សារ'),L('Choose the basket with the requested count. Earn a small coin reward.','ជ្រើសកន្ត្រកដែលមានចំនួនត្រឹមត្រូវ ដើម្បីទទួលកាក់។')],
      lotus:['lotus',L('Find pond pairs','ស្វែងរកគូនៅស្រះ'),L('Turn over cards to find three matching pairs.','បើកសន្លឹកបៀ ដើម្បីរកគូដូចគ្នាបីគូ។')],
      canal:['village_well',L('Guide the water','នាំទឹកទៅស្រែ'),L('Turn four gates to match the channel arrows. Earn rice.','បង្វិលទ្វារទឹកបួនឱ្យត្រូវតាមព្រួញប្រឡាយ ដើម្បីទទួលស្រូវ។')],
      fish:['fish_pond',L('Reel in a fish','ទាញត្រី'),L('Cast, then spot the fish among the ripples to catch it.','បោះសន្ទូច រួចស្វែងរកត្រីក្នុងរលកទឹក ដើម្បីចាប់ត្រី។')],
      cargo:['boat',L('Load the boat','ផ្ទុកទំនិញលើទូក'),L('Fill three boat loads without going over the limit. Earn bananas.','ផ្ទុកទំនិញលើទូកបីដងដោយមិនលើសចំណុះ ដើម្បីទទួលចេក។')],
      recipe:['cooking_house',L('Finish the recipe','បំពេញមុខម្ហូប'),L('Pick the missing ingredient in three dishes. Earn lemongrass.','ជ្រើសគ្រឿងផ្សំដែលខ្វះក្នុងម្ហូបបីមុខ ដើម្បីទទួលស្លឹកគ្រៃ។')]
    }[id];
    const best=state.miniBest[id]||0;
    return `<div class="card mini-entry"><div class="mini-entry-art">${art(details[0])}</div><div><h3>${details[1]}</h3><p>${details[2]}</p><small class="mini-best">${L('Best','ល្អបំផុត')} <span class="mini-rating" aria-label="${L('Best rating','ពិន្ទុល្អបំផុត')} ${best}/3">${[1,2,3].map(n=>`<span class="${n<=best?'filled':''}"></span>`).join('')}</span></small></div><button class="btn small" data-action="openMini" data-id="${id}" ${miniReady(id)?'':'disabled'}>${miniButtonLabel(id)}</button></div>`;
  }
  function renderGamesHub() {
    const bestCount=MINI_IDS.filter(id=>(state.miniBest[id]||0)===3).length;
    return `<div class="games-summary"><div>${art('basket')}<strong>${L('Village games','ល្បែងភូមិ')}</strong><span>${L('Play to earn useful items for your village.','លេងដើម្បីទទួលវត្ថុមានប្រយោជន៍សម្រាប់ភូមិ។')}</span></div><b>${bestCount}/${MINI_IDS.length} ${L('perfect','ល្អឥតខ្ចោះ')}</b></div><div class="games-list">${MINI_IDS.map(miniCard).join('')}</div>`;
  }
  function renderFarmDashboard() {
    const readyFields=state.plots.filter(plot=>plot&&!timeLeft(plot.at)).length;
    const readyOrders=state.orders.filter(order=>has(order.needs)).length;
    const goods=ALL.filter(item=>count(item.id)>0).length;
    const actions=[
      ['farmMode','fields','rice',L('Plant & harvest','ដាំ និងប្រមូលផល')],
      ['fishPanel','','fish_pond',L('Go fishing','ចាប់ត្រី')],
      ['tab','orders','order_board',L('Fill orders','បំពេញកម្ម៉ង់')],
      ['tab','kitchen','cooking_house',L('Cook & craft','ចម្អិន និងផលិត')],
      ['farmMode','games','basket',L('Play games','លេងល្បែង')],
      ['tab','journal','home',L('Grow village','ពង្រីកភូមិ')]
    ];
    const next=readyFields?[L('Harvest is ready','ផលដំណាំរួចរាល់'),L('Tap ripe fields to gather crops and XP.','ចុចស្រែទុំដើម្បីប្រមូលផល និងបទពិសោធន៍។'),'farmMode','fields','mature_rice']:readyOrders?[L('Help a neighbor','ជួយអ្នកភូមិ'),L('You have the goods for a village order.','អ្នកមានទំនិញគ្រប់សម្រាប់កម្ម៉ង់ភូមិ។'),'tab','orders','order_board']:state.workshop&&!timeLeft(state.workshop.at)?[L('Workshop goods are ready','ទំនិញសិប្បកម្មរួចរាល់'),L('Collect your finished village product.','ប្រមូលទំនិញភូមិដែលផលិតរួច។'),'tab','kitchen','weaving_house']:[L('Build your village','កសាងភូមិរបស់អ្នក'),L('Plant, make goods, fill orders, then improve your home.','ដាំដំណាំ ផលិតទំនិញ បំពេញកម្ម៉ង់ រួចកែលម្អផ្ទះ។'),'farmMode','fields','rice'];
    return `<section class="dashboard-overview" aria-label="${L('Farm dashboard','ផ្ទាំងគ្រប់គ្រងកសិដ្ឋាន')}"><div class="dashboard-overview-top"><div><small>${L('VILLAGE DASHBOARD','ផ្ទាំងគ្រប់គ្រងភូមិ')}</small><h2>${L('Your village is growing','ភូមិរបស់អ្នកកំពុងរីកចម្រើន')}</h2></div><button class="dashboard-profile" data-action="profile" aria-label="${L('Open player profile','បើកប្រវត្តិអ្នកលេង')}">${art('farmer_profile')}</button></div><div class="dashboard-metrics"><div><strong data-dashboard="fields">${readyFields}</strong><span>${L('Crops ready','ដំណាំរួចរាល់')}</span></div><div><strong data-dashboard="orders">${readyOrders}</strong><span>${L('Orders ready','កម្ម៉ង់រួចរាល់')}</span></div><div><strong data-dashboard="goods">${goods}</strong><span>${L('Goods in stock','ទំនិញក្នុងឃ្លាំង')}</span></div></div></section>
      <div class="dashboard-heading"><h3>${L('What to do next','ធ្វើអ្វីបន្ទាប់')}</h3><span>${L('Tap to play','ចុចដើម្បីលេង')}</span></div><button class="dashboard-next" data-action="${next[2]}" data-id="${next[3]}">${art(next[4])}<span><b>${next[0]}</b><small>${next[1]}</small></span><i aria-hidden="true">›</i></button>
      <div class="dashboard-heading"><h3>${L('Village activities','សកម្មភាពក្នុងភូមិ')}</h3></div><div class="dashboard-actions">${actions.map(([action,id,icon,label])=>`<button data-action="${action}" data-id="${id}">${art(icon)}<span>${label}</span></button>`).join('')}</div>`;
  }
  function renderFarm() {
    const switcher=`<div class="farm-switch"><button class="${farmMode==='map'?'active':''}" data-action="farmMode" data-id="map">${art('farm_nav')} ${L('Map','ផែនទី')}</button><button class="${farmMode==='fields'?'active':''}" data-action="farmMode" data-id="fields">${art('rice')} ${L('Fields','ស្រែ')}</button><button class="${farmMode==='games'?'active':''}" data-action="farmMode" data-id="games">${art('basket')} ${L('Games','ល្បែង')}</button></div>`;
    if(farmMode==='games')return `<div class="section-head"><h2>${L('Play in the village','លេងនៅក្នុងភូមិ')}</h2><small>${state.stats.miniGames||0} ${L('completed','បានបញ្ចប់')}</small></div>${switcher}${renderGamesHub()}`;
    return `<div class="section-head"><h2>${L('Your farm','កសិដ្ឋានរបស់អ្នក')}</h2><small>${state.plots.length}/20 ${L('fields','ស្រែ')}</small></div>
      ${state.tutorialStep?`<div class="tutorial-tip">${art(state.tutorialStep===3?'orders_nav':'rice')}<span>${state.tutorialStep===1?L('Tap a field and choose free rice.','ចុចស្រែ ហើយជ្រើសស្រូវឥតគិតថ្លៃ។'):state.tutorialStep===2?L('Wait for golden rice, then tap to harvest.','រង់ចាំស្រូវទុំ រួចចុចប្រមូលផល។'):L('Open Orders to help a neighbor.','បើកកម្ម៉ង់ដើម្បីជួយអ្នកភូមិ។')}</span><button data-action="skipTutorial">${L('SKIP','រំលង')}</button></div>`:''}
      ${switcher}
      ${farmMode==='map'?renderMap():''}
      ${farmMode==='fields'?`<div class="section-head farm-seeds-head"><h2>${L('Choose a seed','ជ្រើសគ្រាប់ពូជ')}</h2><small>${L('Tap an empty field to plant','ចុចស្រែទំនេរដើម្បីដាំ')}</small></div><div class="seed-scroll" aria-label="${L('Seeds','គ្រាប់ពូជ')}">${CROPS.map(c=>`<button class="seed ${state.selected===c.id?'active':''} ${level()<c.level?'locked':''}" data-action="select" data-id="${c.id}"><span class="emoji">${art(c.id)}</span><strong>${name(c)}</strong><small>${level()<c.level?`${L('Level','កម្រិត')} ${c.level}`:c.cost?`◉ ${c.cost}`:L('FREE','ឥតគិតថ្លៃ')}</small></button>`).join('')}</div>`:''}
      ${farmMode==='fields'?`<div class="field-actions"><button class="btn small" data-action="plantBatch" ${state.tutorialStep||!state.plots.some(plot=>!plot)||level()<BY_ID[state.selected].level||state.coins<BY_ID[state.selected].cost?'disabled':''}>${art('rice_shoots')} ${L('PLANT UP TO 4','ដាំរហូតដល់ ៤')}</button><button class="btn small secondary" data-action="harvestReady" ${state.tutorialStep||!state.plots.some(plot=>plot&&!timeLeft(plot.at))?'disabled':''}>${art('mature_rice')} ${L('HARVEST READY','ប្រមូលផលរួចរាល់')}</button></div>`:''}
      ${farmMode==='fields'?`<div class="fields">${state.plots.map((plot,i)=>{const crop=plot&&BY_ID[plot.id],ready=plot&&timeLeft(plot.at)===0;
        return `<button class="plot ${!plot?'empty':''} ${ready?'ready':''} ${plot?'growth-'+cropStage(plot):''}" data-action="${plot?'plot':'openPlot'}" data-id="${i}" aria-label="${!plot?L('Empty plot','ដីទំនេរ'):name(crop)}"><span class="crop-icon">${plot?art(crop.id):'+'}</span>${plot?`<span class="timer" data-until="${plot.at}">${ready?L('READY','រួចរាល់'):clock(timeLeft(plot.at))}</span>`:''}</button>`;}).join('')}</div>
      `:''}
      ${farmMode==='fields'&&state.plots.length<20?`<div class="card row between"><div><h3>${art('rice_shoots')} ${L('Expand your fields','ពង្រីកស្រែ')}</h3><p>${L('Add four more planting plots.','បន្ថែមដីដាំដុះបួនកន្លែង។')} ${state.plots.length}/20</p></div><button class="btn small secondary" data-action="expand" ${level()<(state.plots.length===12?3:5)||state.coins<(state.plots.length===12?150:250)?'disabled':''}>◉ ${state.plots.length===12?150:250}</button></div>`:''}
      ${farmMode==='map'?renderFarmDashboard():`<div class="card games-teaser"><div>${art('basket')}<div><h3>${L('Play village games','លេងល្បែងភូមិ')}</h3><p>${L('Catch fish and earn useful supplies.','ចាប់ត្រី និងទទួលសម្ភារៈមានប្រយោជន៍។')}</p></div></div><button class="btn small" data-action="farmMode" data-id="games">${L('SEE GAMES','មើលល្បែង')}</button></div>`}`;
  }
  function mapScale() {
    const viewport=document.getElementById('farm-map');
    return viewport?Math.max(.65,viewport.clientWidth/780)*state.mapCamera.zoom:1;
  }
  function updateMapTransform() {
    if(mapFrame)return;
    mapFrame=requestAnimationFrame(()=>{
      mapFrame=0;
      const world=document.getElementById('map-world');
      if(world)world.style.transform=`translate3d(${state.mapCamera.x}px,${state.mapCamera.y}px,0) scale(${mapScale()})`;
    });
  }
  function setupMap() {
    const viewport=document.getElementById('farm-map');
    if(!viewport)return;
    updateMapTransform();
    let drag=null;
    viewport.addEventListener('pointerdown',event=>{
      if(event.button!==0)return;
      drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:state.mapCamera.x,startY:state.mapCamera.y};
      mapMoved=false;
    });
    viewport.addEventListener('pointermove',event=>{
      if(!drag||drag.id!==event.pointerId)return;
      const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
      if(Math.abs(dx)+Math.abs(dy)>7&&!mapMoved){mapMoved=true;viewport.setPointerCapture(event.pointerId);}
      if(mapMoved){state.mapCamera.x=drag.startX+dx;state.mapCamera.y=drag.startY+dy;updateMapTransform();}
    });
    viewport.addEventListener('pointerup',event=>{if(drag&&drag.id===event.pointerId){drag=null;if(mapMoved)save();}});
    viewport.addEventListener('pointercancel',()=>{drag=null;});
    viewport.addEventListener('wheel',event=>{event.preventDefault();state.mapCamera.zoom=Math.max(.65,Math.min(2.2,state.mapCamera.zoom*(event.deltaY<0?1.1:.9)));updateMapTransform();save();},{passive:false});
    viewport.addEventListener('click',event=>{
      if(!arranging||!selectedDecor||event.target.closest('button')||mapMoved)return;
      const rect=viewport.getBoundingClientRect(),scale=mapScale();
      const x=Math.round((event.clientX-rect.left-state.mapCamera.x)/scale);
      const y=Math.round((event.clientY-rect.top-state.mapCamera.y)/scale);
      if(x<20||x>840||y<20||y>610)return;
      state.decorPositions[selectedDecor]={x,y};selectedDecor='';save();render();
      toast(L('Decoration placed!','បានដាក់គ្រឿងតុបតែង!'));
    });
  }
  function renderOrders() {
    const villagers=['dara','srey_mom','ta_sok','vanna'];
    return `<div class="section-head"><h2>${L('Village story','រឿងភូមិ')}</h2><small>${L('Help your neighbors','ជួយអ្នកជិតខាង')}</small></div>${storyCard()}
       <div class="section-head"><h2>${L('Order board','បញ្ជីកម្ម៉ង់')}</h2><small>${L('Fresh requests','ការស្នើសុំថ្មី')}</small></div><div class="list order-grid">${state.orders.map(o=>`<div class="card"><div class="row"><div class="item-icon">${art(villagers[o.id%villagers.length])}</div><div class="item-main"><b>${L('Neighbor','អ្នកភូមិ')} #${o.id}</b><small>${L('Please bring','សូមនាំមក')}</small></div><span class="reward">${art('coin_icon')} ${o.coins+(hasProperty('market_stall')?10:0)} · +${o.xp+(hasProperty('produce_motorbike')?4:0)} XP</span></div>
        <div class="requirements">${Object.entries(o.needs).map(([id,n])=>`<span class="req ${count(id)>=n?'ok':''}">${art(id)} ${name(BY_ID[id])} ${count(id)}/${n}</span>`).join('')}</div>
        <button class="btn small" data-action="deliver" data-id="${o.id}" ${has(o.needs)?'':'disabled'}>${L('DELIVER','ដឹកជញ្ជូន')}</button></div>`).join('')}</div>`;
  }
  function renderKitchen() {
    const switcher=`<div class="kitchen-switch"><button data-action="kitchenMode" data-id="cook" class="${kitchenMode==='cook'?'active':''}">${art('kitchen_nav')} ${L('Cooking','ចម្អិន')}</button><button data-action="kitchenMode" data-id="workshop" class="${kitchenMode==='workshop'?'active':''}">${art('weaving_house')} ${L('Workshop','សិប្បកម្ម')}</button></div>`;
    if(kitchenMode==='workshop')return `<div class="section-head"><h2>${L('Village workshop','សិប្បកម្មភូមិ')}</h2><small>${L('Make goods by hand','ផលិតដោយដៃ')}</small></div>${switcher}${renderWorkshop()}`;
    return `<div class="section-head"><h2>${L('Village kitchen','ផ្ទះបាយភូមិ')}</h2><small>${L('Cook from the harvest','ចម្អិនពីផលដំណាំ')}</small></div>${switcher}<div class="card"><h3>${art('cooking_house')} ${L('Recipes from home','មុខម្ហូបពីផ្ទះ')}</h3><p>${L('Gather ingredients on the farm. Cooking gives experience and makes valuable dishes for the market.','ប្រមូលគ្រឿងផ្សំពីស្រែ។ ការចម្អិនផ្តល់បទពិសោធន៍ និងម្ហូបសម្រាប់លក់នៅផ្សារ។')}</p></div><div class="list recipe-grid">${RECIPES.map(r=>`<div class="card"><div class="row"><div class="item-icon">${art(r.id)}</div><div class="item-main"><b>${name(r)}</b><small>${level()<r.level?`${L('Unlock at level','បើកនៅកម្រិត')} ${r.level}`:`+${r.xp} XP • ${L('Sells for','លក់បាន')} ◉ ${r.sell}`}</small></div></div><div class="requirements">${Object.entries(r.needs).map(([id,n])=>`<span class="req ${count(id)>=n?'ok':''}">${art(id)} ${count(id)}/${n}</span>`).join('')}</div><div class="row between"><small>${L('In pantry','ក្នុងឃ្លាំង')}: ${count(r.id)}</small><button class="btn small" data-action="cook" data-id="${r.id}" ${level()>=r.level&&has(r.needs)?'':'disabled'}>${L('COOK','ចម្អិន')}</button></div></div>`).join('')}</div>`;
  }
  function renderWorkshop() {
    const ch=MAKERS[Math.min(state.makersChapter,MAKERS.length-1)];
    const active=state.workshop&&CRAFTS.find(x=>x.id===state.workshop.id);
    return `<div class="card chapter"><h3>${art('weaving_house')} ${state.makersWon?L('The makers fair is open!','ផ្សារអ្នកផលិតបានបើក!'):(state.lang==='km'?ch.km:ch.en)}</h3><p>${state.makersWon?L('Keep making goods and sharing gifts with the village.','បន្តផលិតទំនិញ និងជូនអំណោយដល់អ្នកភូមិ។'):(state.lang==='km'?ch.textKm:ch.text)}</p>
      ${state.makersWon?'':ch.goals.map(([key,n])=>`<div class="row between"><small>${makersGoalName(key)}</small><b>${Math.min(makersValue(key),n)} / ${n}</b></div><div class="progress"><span style="width:${Math.min(100,makersValue(key)/n*100)}%"></span></div>`).join('')}
      ${state.makersWon?'':`<button class="btn" data-action="makersClaim" ${makersComplete()?'':'disabled'}>${state.makersChapter===2?L('OPEN MAKERS FAIR','បើកផ្សារអ្នកផលិត'):L('COMPLETE CHAPTER','បញ្ចប់វគ្គ')}</button>`}</div>
      ${miniCard('loom')}
      ${active?`<div class="card craft-active"><h3>${art(active.id)} ${L('On the workbench','នៅលើតុការងារ')}: ${name(active)}</h3><button class="btn" data-action="collectCraft" ${timeLeft(state.workshop.at)?'disabled':''}>${timeLeft(state.workshop.at)?clock(timeLeft(state.workshop.at)):L('COLLECT','ប្រមូល')}</button></div>`:''}
      <div class="list craft-grid">${CRAFTS.map(r=>`<div class="card"><div class="row"><div class="item-icon">${art(r.id)}</div><div class="item-main"><b>${name(r)}</b><small>${level()<r.level?`${L('Unlock at level','បើកនៅកម្រិត')} ${r.level}`:`${clock(r.seconds)} • ◉ ${r.sell} • +${r.xp} XP`}</small></div></div><div class="requirements">${Object.entries(r.needs).map(([id,n])=>`<span class="req ${count(id)>=n?'ok':''}">${art(id)} ${count(id)}/${n}</span>`).join('')}</div><div class="row between"><small>${L('Owned','មាន')}: ${count(r.id)}</small><button class="btn small" data-action="craft" data-id="${r.id}" ${state.workshop||level()<r.level||!has(r.needs)?'disabled':''}>${L('MAKE','ផលិត')}</button></div></div>`).join('')}</div>`;
  }
  function renderMarket() {
    const goods=marketShowAll?ALL:ALL.filter(item=>count(item.id)>0);
    const giftCoins=hasProperty('family_home')?50:30,giftRice=hasProperty('storage_house')?4:2;
    return `<div class="section-head"><h2>${L('Village market','ផ្សារភូមិ')}</h2><small>${art('coin_icon')} ${state.coins}</small></div>
      <div class="market-banner"><strong>${L('From the farm to the village','ពីស្រែទៅភូមិ')}</strong></div>
      <div class="card daily"><div class="row between"><div><h3>${art('basket')} ${L('Daily village gift','អំណោយប្រចាំថ្ងៃ')}</h3><p>+${giftCoins} ${L('coins','កាក់')} · +${giftRice} ${name(BY_ID.rice)}</p></div><button class="btn small" data-action="daily" ${state.lastDaily===dailyDate()?'disabled':''}>${state.lastDaily===dailyDate()?L('CLAIMED','បានយក'):L('CLAIM','យក')}</button></div></div>
      <div class="market-actions"><button class="btn small secondary" data-action="goBuild">${L('BUY PROPERTY','ទិញអចលនទ្រព្យ')}</button><button class="btn small" data-action="marketFilter">${marketShowAll?L('OWNED ONLY','បង្ហាញតែរបស់មាន'):L('SEE ALL GOODS','មើលទំនិញទាំងអស់')}</button></div>
      <div class="section-head"><h2>${L('Your goods','ទំនិញរបស់អ្នក')}</h2><small>${ALL.filter(item=>count(item.id)>0).length} ${L('types ready to sell','មុខរួចរាល់លក់')}</small></div>
      ${goods.length?`<div class="list market-list">${goods.map(item=>`<div class="card row"><div class="item-icon">${art(item.id)}</div><div class="item-main"><b>${name(item)}</b><small>${L('Owned','មាន')} ${count(item.id)} · ${sellPrice(item)} ${L('coins each','កាក់ក្នុងមួយ')}</small></div><button class="btn small secondary" data-action="sellPanel" data-id="${item.id}" ${count(item.id)?'':'disabled'}>${L('SELL','លក់')}</button></div>`).join('')}</div>`:`<div class="card empty-market">${art('basket')}<h3>${L('Your basket is empty','កន្ត្រករបស់អ្នកទទេ')}</h3><p>${L('Harvest a field, catch fish, or cook a dish, then come back to sell.','ប្រមូលផលពីស្រែ ចាប់ត្រី ឬចម្អិនម្ហូប រួចត្រឡប់មកលក់។')}</p><button class="btn small" data-action="tab" data-id="farm">${L('GO TO FARM','ទៅកសិដ្ឋាន')}</button></div>`}`;
  }
  function renderExplore() {
    const journey=JOURNEY[Math.min(state.journeyChapter,JOURNEY.length-1)];
    const active=state.travel&&REGIONS.find(r=>r.id===state.travel.id);
    return `<div class="section-head"><h2>${L('Explore Cambodia','ស្វែងរកកម្ពុជា')}</h2><small>${L('Journeys & trade','ដំណើរ និងពាណិជ្ជកម្ម')}</small></div>
      <div class="card chapter"><h3>🚣 ${state.journeyWon?L('River celebration complete!','ពិធីទន្លេបានបញ្ចប់!'):(state.lang==='km'?journey.km:journey.en)}</h3>
        <p>${state.journeyWon?L('Your journeys connected the village with every region. Continue exploring for goods and achievements.','ដំណើររបស់អ្នកបានភ្ជាប់ភូមិជាមួយគ្រប់តំបន់។ បន្តស្វែងរកទំនិញ និងសមិទ្ធផល។'):(state.lang==='km'?journey.textKm:journey.text)}</p>
        ${state.journeyWon?'':journey.goals.map(([key,n])=>`<div class="row between"><small>${journeyGoalName(key)}</small><b>${Math.min(journeyValue(key),n)} / ${n}</b></div><div class="progress"><span style="width:${Math.min(100,journeyValue(key)/n*100)}%"></span></div>`).join('')}
        ${state.journeyWon?'':`<button class="btn" data-action="journeyClaim" ${journeyComplete()?'':'disabled'}>${state.journeyChapter===3?L('HOLD RIVER CELEBRATION','រៀបចំពិធីទន្លេ'):L('COMPLETE JOURNEY CHAPTER','បញ្ចប់វគ្គដំណើរ')}</button>`}
      </div>
      ${active?`<div class="card travel-active"><h3>${art(active.id)} ${L('Journey underway','កំពុងធ្វើដំណើរ')}: ${name(active)}</h3><p>${L('Your neighbors will return with','អ្នកភូមិនឹងត្រឡប់មកជាមួយ')} ${Object.entries(active.rewards).map(([id,n])=>`${art(id)} ${n} ${name(BY_ID[id])}`).join(', ')}.</p><button class="btn" data-action="collectTrip" ${timeLeft(state.travel.at)?'disabled':''}>${timeLeft(state.travel.at)?clock(timeLeft(state.travel.at)):L('WELCOME THEM HOME','ទទួលពួកគេត្រឡប់')}</button></div>`:''}
      <div class="section-head"><h2>${L('Choose a destination','ជ្រើសរើសគោលដៅ')}</h2><small>${L('One trip at a time','មួយដំណើរម្តង')}</small></div>
      <div class="region-grid">${REGIONS.map(r=>`<div class="card region"><div class="region-icon">${art(r.id)}</div><h3>${name(r)}</h3><p>${state.lang==='km'?r.descKm:r.desc}</p><div class="requirements">${Object.entries(r.rewards).map(([id,n])=>`<span class="req">${art(id)} ×${n}</span>`).join('')}</div><div class="row between"><small>${L('Visited','បានទៅ')} ${state.visits[r.id]||0} • ${clock(r.seconds)} • ◉ ${r.cost}</small><button class="btn small" data-action="trip" data-id="${r.id}" ${state.travel||level()<r.level||state.coins<r.cost?'disabled':''}>${level()<r.level?`${L('LV','កម្រិត')} ${r.level}`:L('GO','ទៅ')}</button></div></div>`).join('')}</div>`;
  }
  function achievements() {
    return [
      [art('basket'),L('Village games','ល្បែងភូមិ'),(state.stats.miniGames||0)>=6],
      [art('rice'),L('First harvest','ផលដំបូង'),state.stats.harvest>=1],
      [art('fish'),L('Pond friend','មិត្តស្រះ'),state.stats.fish>=10],
      [art('order_board'),L('Village helper','អ្នកជួយភូមិ'),state.stats.orders>=8],
      [art('cooking_house'),L('Home cook','ចុងភៅផ្ទះ'),state.stats.cooked>=7],
      [art('chicken'),L('Animal keeper','អ្នកចិញ្ចឹមសត្វ'),state.chicken&&state.buffalo],
      [art('festival_lanterns'),L('Festival host','ម្ចាស់ពិធីបុណ្យ'),state.won],
      [art('boat'),L('Lake traveler','អ្នកធ្វើដំណើរបឹង'),(state.visits.tonle_sap||0)>0],
      [art('crab'),L('Coastal cook','ចុងភៅឆ្នេរ'),(state.cookedKinds.pepper_crab||0)>0],
      [art('river_landing'),L('River celebration','ពិធីទន្លេ'),state.journeyWon],
      [art('weaving_house'),L('First maker','អ្នកផលិតដំបូង'),state.stats.crafted>=1],
      [art('dara'),L('Good neighbor','អ្នកជិតខាងល្អ'),state.stats.gifts>=5],
      [art('krama'),L('Makers fair','ផ្សារអ្នកផលិត'),state.makersWon],
      [art('family_home'),L('Village builder','អ្នកសាងសង់ភូមិ'),state.ownedProperty.length>=3],
      [art('basket'),L('Game master','អ្នកលេងឆ្នើម'),MINI_IDS.every(id=>(state.miniBest[id]||0)===3)]
    ];
  }
  function renderJournal() {
    const tabs=[['build',L('Build','សាងសង់')],['decor',L('Decorate','តុបតែង')],['people',L('People','អ្នកភូមិ')],['progress',L('Progress','វឌ្ឍនភាព')]];
    const header=`<div class="section-head"><h2>${L('Your village','ភូមិរបស់អ្នក')}</h2><small>${state.ownedProperty.length}/${PROPERTY.length} ${L('properties','អចលនទ្រព្យ')}</small></div><div class="village-switch">${tabs.map(([id,label])=>`<button data-action="villageMode" data-id="${id}" class="${villageMode===id?'active':''}">${label}</button>`).join('')}</div>`;
    if(villageMode==='build')return `${header}<div class="property-summary"><span>${art('coin_icon')} <b>${state.coins}</b> ${L('coins available','កាក់ដែលមាន')}</span><span>${L('Spent on village','ចំណាយលើភូមិ')} ${state.stats.propertySpent||0}</span></div><p class="section-note">${L('Earn coins by selling goods and completing orders. Each purchase gives a lasting benefit.','រកកាក់ដោយលក់ទំនិញ និងបំពេញកម្ម៉ង់។ ការទិញនីមួយៗផ្តល់អត្ថប្រយោជន៍ជាប់លាប់។')}</p><div class="section-head property-head"><h2>${L('Homes, workshops & transport','ផ្ទះ សិប្បកម្ម និងយានជំនិះ')}</h2></div><div class="property-grid">${PROPERTY.map(item=>`<div class="card property-card ${hasProperty(item.id)?'owned':''}"><div class="property-art">${art(item.id)}</div><div class="property-copy"><h3>${name(item)}</h3><p>${state.lang==='km'?item.descKm:item.desc}</p><small>${hasProperty(item.id)?L('Owned and working','បានទិញ និងកំពុងប្រើ'):`${L('Unlocks at level','បើកនៅកម្រិត')} ${item.level} · ${item.cost} ${L('coins','កាក់')}`}</small></div><button class="btn small" data-action="buyProperty" data-id="${item.id}" ${hasProperty(item.id)||level()<item.level||state.coins<item.cost?'disabled':''}>${hasProperty(item.id)?L('OWNED','មានហើយ'):level()<item.level?`${L('LEVEL','កម្រិត')} ${item.level}`:`${L('BUY','ទិញ')} · ${item.cost}`}</button></div>`).join('')}</div><div class="section-head property-head"><h2>${L('Farm upgrades','ការកែលម្អកសិដ្ឋាន')}</h2></div><div class="list">${UPGRADES.map(u=>`<div class="card row"><div class="item-icon">${art(u.id)}</div><div class="item-main"><b>${name(u)}</b><small>${state.lang==='km'?u.descKm:u.desc} · ${state.upgrades.includes(u.id)?L('Built','បានសាងសង់'):`${u.cost} ${L('coins','កាក់')}`}</small></div><button class="btn small secondary" data-action="upgrade" data-id="${u.id}" ${state.upgrades.includes(u.id)||level()<u.level||state.coins<u.cost?'disabled':''}>${state.upgrades.includes(u.id)?L('OWNED','មានហើយ'):level()<u.level?`${L('LV','កម្រិត')} ${u.level}`:L('BUY','ទិញ')}</button></div>`).join('')}</div>`;
    if(villageMode==='decor')return `${header}<div class="card"><h3>${L('Decorate the village','តុបតែងភូមិ')}</h3><p>${L('Buy decorations here, then use Arrange on the farm map to move them.','ទិញគ្រឿងតុបតែងនៅទីនេះ រួចប្រើប៊ូតុង តុបតែង លើផែនទីភូមិដើម្បីផ្លាស់ទី។')}</p><div class="decor-scene">${state.decor.map(id=>`<span>${art(id)}</span>`).join('')}</div></div><div class="list">${DECOR.map(d=>`<div class="card row"><div class="item-icon">${art(d.id)}</div><div class="item-main"><b>${name(d)}</b><small>${state.decor.includes(d.id)?L('Placed in village','បានដាក់ក្នុងភូមិ'):`${d.cost} ${L('coins','កាក់')}`}</small></div><button class="btn small secondary" data-action="decor" data-id="${d.id}" ${state.decor.includes(d.id)||state.coins<d.cost?'disabled':''}>${state.decor.includes(d.id)?L('OWNED','មានហើយ'):L('BUY','ទិញ')}</button></div>`).join('')}</div>`;
    if(villageMode==='people')return `${header}${renderFriends()}`;
    return `${header}<div class="card"><h3>${L('Farm progress','ការរីកចម្រើន')}</h3><div class="stat-grid">${[['harvest','rice',L('Harvests','ប្រមូលផល')],['fish','fish',L('Fish','ត្រី')],['orders','orders_nav',L('Orders','កម្ម៉ង់')],['cooked','kitchen_nav',L('Dishes','ម្ហូប')],['earned','coin_icon',L('Coins earned','កាក់រកបាន')],['miniGames','basket',L('Games played','ល្បែងបានលេង')]].map(([key,icon,title])=>`<div class="stat"><b>${art(icon)} ${state.stats[key]||0}</b><small>${title}</small></div>`).join('')}</div></div><div class="card"><h3>${art('river_landing')} ${L('Journeys','ដំណើរ')}</h3><p>${L('Trips completed','ដំណើរបានបញ្ចប់')}: ${state.stats.trips||0} · ${L('Regions visited','តំបន់បានទៅ')}: ${journeyValue('regions')}/${REGIONS.length}</p></div><div class="card"><h3>${L('Achievements','សមិទ្ធផល')}</h3><div class="badges">${achievements().map(([icon,title,earned])=>`<div class="badge ${earned?'':'locked'}"><span>${icon}</span>${title}</div>`).join('')}</div></div>`;
  }
  function renderFriends() {
    return `<div class="section-head" style="margin-top:18px"><h2>${L('Village friends','មិត្តអ្នកភូមិ')}</h2><small>${L('Share gifts','ជូនអំណោយ')}</small></div>
      <div class="card"><p>${L('Give each neighbor a favorite item to grow friendship. Every three hearts earn a coin gift.','ជូនវត្ថុដែលអ្នកភូមិចូលចិត្ត ដើម្បីបង្កើនមិត្តភាព។ រាល់បេះដូងបី ទទួលបានកាក់។')}</p></div>
      <div class="list">${FRIENDS.map(f=>{const favorite=BY_ID[f.favorite],hearts=state.friendship[f.id]||0,seconds=timeLeft(state.giftAt[f.id]||0);return `<div class="card row"><div class="item-icon">${art(f.id)}</div><div class="item-main"><b>${name(f)}</b><small>♥ ${hearts} • ${L('Likes','ចូលចិត្ត')} ${art(f.favorite)} ${name(favorite)} (${count(f.favorite)})</small></div><button class="btn small" data-action="gift" data-id="${f.id}" ${seconds||!count(f.favorite)?'disabled':''}>${seconds?clock(seconds):L('GIVE','ជូន')}</button></div>`;}).join('')}</div>`;
  }
  function nav() {
    const entries=[['farm','farm_nav',L('Farm','ស្រែ')],['orders','orders_nav',L('Orders','កម្ម៉ង់')],['kitchen','kitchen_nav',L('Kitchen','ផ្ទះបាយ')],['explore','explore_nav',L('Explore','ដំណើរ')],['market','market_nav',L('Market','ផ្សារ')],['journal','journal_nav',L('Village','ភូមិ')]];
    return `<nav class="nav" aria-label="${L('Game sections','ផ្នែកល្បែង')}">${entries.map(([id,icon,title])=>`<button data-action="tab" data-id="${id}" class="${tab===id?'active':''}">${art(icon)}${title}</button>`).join('')}</nav>`;
  }
  function hydrateArt() {
    app.querySelectorAll('.list .card').forEach(card=>{
      const target=card.querySelector('[data-id]'),icon=card.querySelector('.item-icon');
      if(target&&icon&&SrokArt.has(target.dataset.id))icon.innerHTML=art(target.dataset.id);
    });
    app.querySelectorAll('.region').forEach(card=>{
      const target=card.querySelector('[data-action="trip"]'),icon=card.querySelector('.region-icon');
      if(target&&icon)icon.innerHTML=art(target.dataset.id);
    });
  }
  function render() {
    document.documentElement.lang=state.lang==='km'?'km':'en';
    const seedRail=app.querySelector('.seed-scroll');
    const scroll=window.scrollY,seedScroll=seedRail ? seedRail.scrollLeft : 0;
    const lv=level(), start=XP_LEVELS[lv], end=nextLevel();
    app.innerHTML=`<header class="top"><div class="brand"><div class="brand-identity"><button class="player-avatar" data-action="profile" aria-label="${L('Open player profile','បើកប្រវត្តិអ្នកលេង')}">${art('farmer_profile')}</button><div><h1>ស្រុកស្រែ</h1><small>SROK SRAE • ${L('CAMBODIAN VILLAGE','ភូមិខ្មែរ')}</small></div></div><button class="icon-btn" data-action="settings" aria-label="${L('Settings','ការកំណត់')}">${art('settings_icon')}</button></div><div class="status"><div class="pill">${art('coin_icon')} ${state.coins}</div><div class="pill level">${L('LV','កម្រិត')} ${lv}</div><div class="xp"><small>XP ${state.xp} / ${end}</small><div class="track"><div class="fill" style="width:${lv===XP_LEVELS.length-1?100:Math.min(100,(state.xp-start)/(end-start)*100)}%"></div></div></div></div></header>
      <div class="story-strip"><span>${art('festival_lanterns')} ${!state.won?`${L('Festival story','រឿងពិធីបុណ្យ')} ${state.chapter+1}/${CHAPTERS.length}`:!state.journeyWon?`${L('Journey story','រឿងដំណើរ')} ${state.journeyChapter+1}/${JOURNEY.length}`:!state.makersWon?`${L('Makers story','រឿងអ្នកផលិត')} ${state.makersChapter+1}/${MAKERS.length}`:L('All three stories complete','រឿងទាំងបីបានបញ្ចប់')}</span><button data-action="story">${L('VIEW GOAL','មើលគោលដៅ')} ›</button></div>
      ${tab==='explore'||(tab==='farm'&&farmMode==='fields')?scene():''}<main class="content">${({farm:renderFarm,orders:renderOrders,kitchen:renderKitchen,explore:renderExplore,market:renderMarket,journal:renderJournal})[tab]()}</main>${nav()}`;
    hydrateArt();
    if(app.querySelector('.seed-scroll')) app.querySelector('.seed-scroll').scrollLeft=seedScroll;
    setupMap();
    window.scrollTo(0,scroll);
    renderModal();
  }

  function renderMini() {
    const s=miniSession;
    if(!s)return '';
    const title={rice:L('Sort the rice harvest','បែងចែកស្រូវ'),loom:L('Weave a krama','ត្បាញក្រមា'),market:L('Pack market baskets','រៀបចំកន្ត្រកផ្សារ'),lotus:L('Find pond pairs','ស្វែងរកគូនៅស្រះ'),canal:L('Guide the water','នាំទឹកទៅស្រែ'),fish:L('Reel in a fish','ទាញត្រី'),cargo:L('Load the boat','ផ្ទុកទំនិញលើទូក'),recipe:L('Finish the recipe','បំពេញមុខម្ហូប')}[s.id];
    const icon={rice:'mature_rice',loom:'loom',market:'basket',lotus:'lotus',canal:'village_well',fish:'fish_pond',cargo:'boat',recipe:'cooking_house'}[s.id];
    const total=s.id==='loom'||s.id==='canal'?4:3;
    const progress=`<div class="mini-progress" aria-label="${L('Progress','វឌ្ឍនភាព')} ${Math.min(s.round+1,total)} / ${total}">${Array.from({length:total},(_,i)=>`<span class="${i<s.round?'done':i===s.round?'current':''}"></span>`).join('')}</div>`;
    if(s.finished) {
      const reward=s.reward;
      const result=[...Object.entries(reward.items).map(([id,amount])=>`${art(id)} +${amount} ${name(BY_ID[id])}`),...(reward.coins?[`${art('coin_icon')} +${reward.coins} ${L('coins','កាក់')}`]:[]),`+${reward.xp} XP`].join(' · ');
      return `<div class="mini-hero">${art(icon)}</div><h2>${L('Well done!','ធ្វើបានល្អ!')}</h2><div class="mini-rating" aria-label="${L('Rating','ពិន្ទុ')} ${s.stars}/3">${[1,2,3].map(n=>`<span class="${n<=s.stars?'filled':''}"></span>`).join('')}</div><p>${L('Activity complete','បានបញ្ចប់ល្បែង')} · ${s.mistakes} ${L('misses','ខុស')}</p><div class="mini-result">${result}</div><div class="actions"><button class="btn" data-action="close">${L('DONE','រួចរាល់')}</button></div>`;
    }
    let board='';
    if(s.id==='rice') {
      board=`<p>${L('Tap every ripe bundle. Leave the young shoots to grow.','ចុចស្រូវទុំទាំងអស់។ ទុកស្រូវខ្ចីឱ្យលូតលាស់។')}</p><div class="mini-rice-grid">${s.board.map((kind,i)=>`<button class="mini-rice-tile ${kind} ${s.picked.includes(i)?'picked':''}" data-action="miniPick" data-id="${i}" aria-label="${kind==='ripe'?L('Ripe rice','ស្រូវទុំ'):L('Young rice','ស្រូវខ្ចី')}" ${s.picked.includes(i)?'disabled':''}>${art(kind==='ripe'?'mature_rice':'rice_shoots')}<small>${kind==='ripe'?L('RIPE','ទុំ'):L('YOUNG','ខ្ចី')}</small></button>`).join('')}</div>`;
    } else if(s.id==='loom') {
      const stripes=[['clay',L('Clay','ដីក្រហម')],['gold',L('Gold','មាស')],['indigo',L('Indigo','ខៀវចាស់')]];
      board=`<p>${L('Match the next stripe in the pattern. Three cotton are used when the krama is finished.','ផ្គូផ្គងខ្សែបន្ទាប់តាមលំនាំ។ ប្រើកប្បាស ៣ ពេលត្បាញរួច។')}</p><div class="mini-pattern">${s.sequence.map((n,i)=>`<div class="mini-stripe ${stripes[n][0]} ${i<s.round?'done':i===s.round?'current':''}"><b>${i+1}</b><small>${stripes[n][1]}</small></div>`).join('')}</div><div class="mini-options">${stripes.map(([tone,label],i)=>`<button class="mini-color ${tone}" data-action="miniPick" data-id="${i}"><span></span>${label}</button>`).join('')}</div>`;
    } else if(s.id==='market') {
      board=`<p>${L('Choose the basket with exactly','ជ្រើសកន្ត្រកដែលមានចំនួន')} <b>${s.target}</b> ${name(BY_ID[s.produce])}.</p><div class="mini-market-product">${art(s.produce)} ${name(BY_ID[s.produce])}</div><div class="mini-options">${s.options.map(amount=>`<button class="mini-basket" data-action="miniPick" data-id="${amount}" aria-label="${amount} ${name(BY_ID[s.produce])}">${art('basket')}<b>${amount}</b></button>`).join('')}</div>`;
    } else if(s.id==='lotus') {
      board=`<p>${L('Turn over two cards to find a pair. Mismatched cards stay open until your next tap.','បើកសន្លឹកបៀពីរ ដើម្បីរកគូ។ បើមិនដូចគ្នា សូមចុចម្តងទៀត។')}</p><div class="mini-memory-grid">${s.cards.map((item,i)=>`<button class="mini-memory-card ${s.matched.includes(i)?'matched':''}" data-action="miniPick" data-id="${i}" aria-label="${s.matched.includes(i)||s.open.includes(i)?name(BY_ID[item]):L('Hidden card','សន្លឹកបៀបិទ')}" ${s.matched.includes(i)?'disabled':''}>${art(s.matched.includes(i)||s.open.includes(i)?item:'basket')}</button>`).join('')}</div>`;
    } else if(s.id==='canal') {
      board=`<p>${L('Tap each water gate until its large arrow matches the small target arrow.','ចុចទ្វារទឹកនីមួយៗ រហូតដល់ព្រួញធំត្រូវនឹងព្រួញគោលដៅតូច។')}</p><div class="mini-canal-grid">${s.gates.map((direction,i)=>`<button class="mini-canal-gate ${direction===s.target[i]?'aligned':''}" data-action="miniPick" data-id="${i}" aria-label="${L('Gate','ទ្វារទឹក')} ${i+1}, ${L('tap to turn','ចុចដើម្បីបង្វិល')}"><span class="mini-canal-target"><i class="direction d${s.target[i]}"></i></span><span class="mini-canal-channel"><i class="direction d${direction}"></i></span><small>${direction===s.target[i]?L('READY','ត្រឹមត្រូវ'):L('TURN','បង្វិល')}</small></button>`).join('')}</div>`;
    } else if(s.id==='fish') {
      board=`<p>${L('Follow the water and tap the fish shadow three times to reel in your catch.','មើលក្នុងទឹក ហើយចុចស្រមោលត្រីបីដងដើម្បីទាញត្រី។')}</p><div class="mini-fish-grid">${s.board.map((item,i)=>`<button class="mini-fish-tile ${item==='fish'?'fish':'plant'}" data-action="miniPick" data-id="${i}" aria-label="${item==='fish'?L('Fish shadow','ស្រមោលត្រី'):L('Water plants','រុក្ខជាតិក្នុងទឹក')}">${art(item)}<small>${item==='fish'?L('FISH','ត្រី'):L('PLANT','រុក្ខជាតិ')}</small></button>`).join('')}</div>`;
    } else if(s.id==='cargo') {
      board=`<p>${L('Load the boat to exactly','ផ្ទុកទូកឱ្យបាន')} <b>${s.target}</b> ${L('baskets. Going over restarts this load.','កន្ត្រក។ បើលើស ត្រូវចាប់ផ្តើមផ្ទុកម្តងទៀត។')}</p><div class="mini-cargo-scene">${art('boat','cargo-boat-art')}<div><strong>${s.load}/${s.target}</strong><div class="progress"><span style="width:${s.load/s.target*100}%"></span></div></div></div><div class="mini-options">${[1,2,3].map(n=>`<button class="mini-cargo-basket" data-action="miniPick" data-id="${n}" aria-label="${n} ${L('baskets','កន្ត្រក')}">${art('basket')}<b>+${n}</b></button>`).join('')}</div>`;
    } else if(s.id==='recipe') {
      board=`<p>${L('Which ingredient completes this dish?','តើគ្រឿងផ្សំណាដែលខ្វះសម្រាប់ម្ហូបនេះ?')}</p><div class="mini-recipe-dish">${art(s.recipe.dish)}<strong>${name(BY_ID[s.recipe.dish])}</strong></div><div class="mini-recipe-known">${L('Already added','បានដាក់រួច')}: ${s.recipe.shown.map(id=>`${art(id)} ${name(BY_ID[id])}`).join(' · ')}</div><div class="mini-options">${s.options.map(id=>`<button class="mini-recipe-option" data-action="miniPick" data-id="${id}">${art(id)}<b>${name(BY_ID[id])}</b></button>`).join('')}</div>`;
    }
    return `<div class="mini-hero">${art(icon,s.id==='cargo'?'cargo-boat-art':'')}</div><h2>${title}</h2>${progress}${board}<p class="mini-feedback" role="status">${s.feedback||L('Take your time. There is no timer.','លេងតាមសម្រួល។ គ្មានការកំណត់ពេល។')}</p><div class="actions"><button class="btn secondary" data-action="close">${L('LEAVE GAME','ចាកចេញពីល្បែង')}</button></div>`;
  }
  function renderModal() {
    if(!modal) { modalRoot.innerHTML=''; return; }
    let body='';
    if(modal==='profile') {
      const unlocked=achievements().filter(entry=>entry[2]).length;
      body=`<div class="profile-cover"><div class="profile-portrait">${art('farmer_profile')}</div><span>${L('PLAYER PROFILE','ប្រវត្តិអ្នកលេង')}</span></div><h2>${escapeHtml(profileDisplayName())}</h2><p class="profile-title">${profileTitle()} · ${L('Level','កម្រិត')} ${level()}</p><div class="profile-progress"><span>XP ${state.xp} / ${nextLevel()}</span><div class="progress"><span style="width:${level()===XP_LEVELS.length-1?100:Math.min(100,(state.xp-XP_LEVELS[level()])/(nextLevel()-XP_LEVELS[level()])*100)}%"></span></div></div><div class="profile-stats">${[[art('rice'),state.stats.harvest||0,L('Harvests','ប្រមូលផល')],[art('order_board'),state.stats.orders||0,L('Orders','កម្ម៉ង់')],[art('basket'),state.stats.miniGames||0,L('Games','ល្បែង')],[art('festival_lanterns'),unlocked,L('Badges','សមិទ្ធផល')]].map(([icon,value,label])=>`<div>${icon}<b>${value}</b><small>${label}</small></div>`).join('')}</div><label class="profile-label" for="profile-name">${L('Farmer name','ឈ្មោះកសិករ')}</label><input id="profile-name" class="profile-input" maxlength="64" autocomplete="nickname" value="${escapeHtml(profileDisplayName())}"><p class="muted profile-note">${L('Your name stays on this device with your saved farm.','ឈ្មោះរបស់អ្នករក្សាទុកលើឧបករណ៍នេះជាមួយកសិដ្ឋាន។')}</p><div class="actions"><button class="btn secondary" data-action="close">${L('CANCEL','បោះបង់')}</button><button class="btn" data-action="saveProfile">${L('SAVE PROFILE','រក្សាទុកប្រវត្តិ')}</button></div>`;
    }
    else if(modal==='mini') body=renderMini();
    else if(modal==='sale') {
      const item=BY_ID[pendingSale],owned=item?count(item.id):0,price=item?sellPrice(item):0;
      body=item?`<div class="dialog-art">${art(item.id)}</div><h2>${L('Sell','លក់')} ${name(item)}</h2><p>${L('You have','អ្នកមាន')} <b>${owned}</b>. ${L('Choose how many to sell.','ជ្រើសចំនួនដែលចង់លក់។')}</p><div class="sale-options"><button class="btn secondary" data-action="sellQty" data-id="1" ${owned<1?'disabled':''}>1 · +${price}</button><button class="btn secondary" data-action="sellQty" data-id="5" ${owned<5?'disabled':''}>5 · +${price*5}</button><button class="btn" data-action="sellQty" data-id="all" ${owned<1?'disabled':''}>${L('ALL','ទាំងអស់')} ${owned} · +${price*owned}</button></div><div class="actions"><button class="btn secondary" data-action="close">${L('CANCEL','បោះបង់')}</button></div>`:'';
    }
    else if(modal==='help') body=`<div class="welcome-art">${art('home')}${art('rice')}${art('srey_mom')}</div><h2>${L('Welcome to Srok Srae','សូមស្វាគមន៍មកកាន់ស្រុកស្រែ')}</h2><p>${L('Grow rice, help your neighbors, and bring this Cambodian village to life. Start with the glowing field.','ដាំស្រូវ ជួយអ្នកភូមិ ហើយធ្វើឱ្យភូមិខ្មែរនេះរស់រវើក។ ចាប់ផ្តើមពីស្រែដែលភ្លឺ។')}</p><div class="actions"><button class="btn secondary" data-action="skipTutorial">${L('SKIP','រំលង')}</button><button class="btn" data-action="startTutorial">${L('SHOW ME','បង្ហាញខ្ញុំ')}</button></div>`;
    else if(modal==='seedPicker') body=`<h2>${L('Plant a field','ដាំដំណាំក្នុងស្រែ')}</h2><p>${L('Choose a seed for this field. Rice is always free.','ជ្រើសគ្រាប់ពូជសម្រាប់ស្រែនេះ។ គ្រាប់ស្រូវឥតគិតថ្លៃជានិច្ច។')}</p><div class="seed-picker">${CROPS.map(c=>`<button class="seed-choice" data-action="plantChosen" data-id="${c.id}" ${level()<c.level||state.coins<c.cost?'disabled':''}>${art(c.id)}<span><b>${name(c)}</b><small>${level()<c.level?`${L('Level','កម្រិត')} ${c.level}`:`${c.cost?`◉ ${c.cost}`:L('FREE','ឥតគិតថ្លៃ')} · ${clock(c.seconds)}`}</small></span></button>`).join('')}</div><div class="actions"><button class="btn secondary" data-action="close">${L('CANCEL','បោះបង់')}</button></div>`;
    else if(modal==='animal') {
      const chicken=pendingAnimal==='chicken',owned=state[pendingAnimal],at=state[chicken?'coopAt':'buffaloAt'];
      const feed=chicken?'corn':'morning_glory',canFeed=count(feed)>0;
      body=`<div class="dialog-art">${art(chicken?'coop':'buffalo')}</div><h2>${chicken?L('Chicken coop','ទ្រុងមាន់'):L('Water buffalo','ក្របី')}</h2><p>${owned?(timeLeft(at)?`${L('Ready in','រួចរាល់ក្នុង')} ${clock(timeLeft(at))}`:L('Ready to collect','រួចរាល់ដើម្បីប្រមូល')):`${L('Unlock at level','បើកនៅកម្រិត')} ${chicken?2:4} · ◉ ${chicken?70:180}`}</p>${owned?`<div class="animal-care"><span>${L('Care','ការថែទាំ')} ${state.animalCare[pendingAnimal]||0}/3</span><span>${art(feed)} ${name(BY_ID[feed])} ${count(feed)}</span></div><p class="muted">${L('Feeding makes the next collection arrive sooner and adds a bonus product.','ផ្តល់ចំណីដើម្បីឱ្យប្រមូលផលលឿន និងទទួលបានផលបន្ថែម។')}</p>`:''}<div class="actions">${owned?`<button class="btn secondary" data-action="feedAnimal" ${canFeed?'':'disabled'}>${L('FEED','ផ្តល់ចំណី')}</button>`:''}<button class="btn" data-action="${chicken?'coop':'buffalo'}" ${owned&&timeLeft(at)?'disabled':''}>${owned?L('COLLECT','ប្រមូល'):L('BUILD','សាងសង់')}</button><button class="btn secondary" data-action="close">${L('CLOSE','បិទ')}</button></div>`;
    }
    else if(modal==='fishing') {
      const cooldown=timeLeft(state.fishAt),waiting=fishingCastAt&&Date.now()-fishingCastAt<1500;
      body=`<div class="dialog-art">${art('fish_pond')}</div><h2>${L('Fishing at the pond','ចាប់ត្រីនៅស្រះ')}</h2><p>${cooldown?`${L('Fish return in','ត្រីត្រឡប់មកវិញក្នុង')} ${clock(cooldown)}`:waiting?L('Watch the water for a bite…','មើលទឹករង់ចាំត្រីខាំនុយ…'):fishingCastAt?L('A fish is biting! Play the catch game to earn fish.','ត្រីកំពុងខាំនុយ! លេងល្បែងចាប់ត្រីដើម្បីទទួលត្រី។'):L('Cast your line, wait for a bite, then play to reel in your fish.','បោះសន្ទូច រង់ចាំត្រីខាំនុយ រួចលេងដើម្បីទាញត្រី។')}</p><div class="actions"><button class="btn" data-action="${fishingCastAt?'fishCatch':'fishCast'}" ${cooldown||waiting?'disabled':''}>${fishingCastAt?L('REEL IN','ទាញសន្ទូច'):L('CAST LINE','បោះសន្ទូច')}</button><button class="btn secondary" data-action="close">${L('CLOSE','បិទ')}</button></div>`;
    }
    else if(modal==='settings') body=`<h2>${art('settings_icon')} ${L('Settings','ការកំណត់')}</h2><div class="switch"><b>${L('Language','ភាសា')}</b><button class="btn small secondary" data-action="language">${state.lang==='en'?'English → ខ្មែរ':'ខ្មែរ → English'}</button></div>
      <div class="switch"><b>${L('Sound','សំឡេង')}</b><button class="btn small secondary" data-action="sound">${state.sound?L('ON','បើក'):L('OFF','បិទ')}</button></div>
      <div class="switch"><b>${L('Graphics','គុណភាពរូបភាព')}</b><button class="btn small secondary" data-action="graphics">${state.graphics==='auto'?L('AUTO','ស្វ័យប្រវត្តិ'):state.graphics==='high'?L('HIGH','ខ្ពស់'):L('LOW','ទាប')}</button></div>
      <div class="switch"><b>${L('Reduce animation','កាត់បន្ថយចលនា')}</b><button class="btn small secondary" data-action="motion">${state.reducedMotion?L('ON','បើក'):L('OFF','បិទ')}</button></div>
      <div class="switch"><b>${L('How to play','របៀបលេង')}</b><button class="btn small secondary" data-action="help">${L('OPEN','បើក')}</button></div>
      ${window.SrokAndroid?`<div class="switch"><b>${L('Game updates','ការធ្វើបច្ចុប្បន្នភាព')}</b><button class="btn small secondary" data-action="checkUpdate">${L('CHECK','ពិនិត្យ')}</button></div>`:''}
      <div class="switch"><b>${L('Start a new game','ចាប់ផ្តើមថ្មី')}</b><button class="btn small danger" data-action="resetPrompt">${L('RESET','កំណត់ឡើងវិញ')}</button></div>
      <p class="muted">${L('Progress saves automatically on this device. Works offline.','ដំណើរការរបស់អ្នករក្សាទុកដោយស្វ័យប្រវត្តិ។ អាចលេងដោយមិនប្រើអ៊ីនធឺណិត។')}</p><div class="actions"><button class="btn" data-action="close">${L('CLOSE','បិទ')}</button></div>`;
    else if(modal==='reset') body=`<h2>${L('Start over?','ចាប់ផ្តើមឡើងវិញ?')}</h2><p>${L('This will erase the farm, story progress, inventory, and decorations on this device.','វានឹងលុបស្រែ ដំណើររឿង ឃ្លាំង និងគ្រឿងតុបតែងនៅលើឧបករណ៍នេះ។')}</p><div class="actions"><button class="btn secondary" data-action="settings">${L('CANCEL','បោះបង់')}</button><button class="btn danger" data-action="resetConfirm">${L('ERASE AND RESTART','លុប និងចាប់ផ្តើមថ្មី')}</button></div>`;
    else if(modal==='won') body=`<div class="hero">🎊🏮🎊</div><h2>${L('The village festival begins!','ពិធីបុណ្យភូមិចាប់ផ្តើម!')}</h2><p>${L('The fields are full, neighbors are fed, and the village shines again. You completed the Srok Srae story!','ស្រែពោរពេញដោយផលដំណាំ អ្នកជិតខាងមានអាហារ ហើយភូមិភ្លឺស្រស់ស្អាតឡើងវិញ។ អ្នកបានបញ្ចប់រឿងស្រុកស្រែ!')}</p><p>${L('You can keep farming, cooking, trading, and collecting achievements.','អ្នកអាចបន្តដាំដុះ ចម្អិន លក់ និងប្រមូលសមិទ្ធផល។')}</p><div class="actions"><button class="btn" data-action="close">${L('KEEP PLAYING','បន្តលេង')}</button></div>`;
    else if(modal==='journeyWon') body=`<div class="hero">🚣🎊🏮</div><h2>${L('The river celebration begins!','ពិធីទន្លេចាប់ផ្តើម!')}</h2><p>${L('Your journeys brought neighbors and goods from across Cambodia together. The village has a new story to tell.','ដំណើររបស់អ្នកបាននាំអ្នកភូមិ និងទំនិញពីទូទាំងកម្ពុជាមកជួបជុំគ្នា។ ភូមិមានរឿងថ្មីមួយ។')}</p><div class="actions"><button class="btn" data-action="close">${L('KEEP EXPLORING','បន្តស្វែងរក')}</button></div>`;
    else if(modal==='makersWon') body=`<div class="hero">🧣💐🎊</div><h2>${L('The makers fair opens!','ផ្សារអ្នកផលិតបានបើក!')}</h2><p>${L('The village is full of hand-made goods and strong friendships. Your third story is complete!','ភូមិពោរពេញដោយទំនិញធ្វើដោយដៃ និងមិត្តភាពរឹងមាំ។ រឿងទីបីបានបញ្ចប់!')}</p><div class="actions"><button class="btn" data-action="close">${L('KEEP MAKING','បន្តផលិត')}</button></div>`;
    modalRoot.innerHTML=`<div class="overlay"><div class="dialog ${modal==='profile'?'profile-dialog':''}" role="dialog" aria-modal="true">${body}</div></div>`;
  }
  function harvestPlot(i) {
    const plot=state.plots[i];
    if(!plot) {
      const crop=BY_ID[state.selected];
      if(!crop||level()<crop.level) return toast(L('This seed is still locked.','គ្រាប់ពូជនេះមិនទាន់បើកទេ។'));
      if(state.coins<crop.cost) return toast(L('Not enough coins. Grow free rice to earn more.','កាក់មិនគ្រប់គ្រាន់។ ដាំស្រូវឥតគិតថ្លៃដើម្បីរកកាក់។'));
      const startedAt=Date.now(),duration=Math.ceil(crop.seconds*weather().factor*(state.upgrades.includes('irrigation')?.85:1))*1000;
      state.coins-=crop.cost; state.plots[i]={id:crop.id,startedAt,duration,at:startedAt+duration};
      if(state.tutorialStep===1)state.tutorialStep=2;
      commit(520); toast(`${L('Planted','បានដាំ')} ${name(crop)}`); return;
    }
    if(timeLeft(plot.at)>0) return toast(`${L('Growing','កំពុងលូតលាស់')} • ${clock(timeLeft(plot.at))}`);
    const crop=BY_ID[plot.id],oldLevel=level();
    add(crop.id,crop.yield); state.xp+=crop.xp; state.stats.harvest++; state.plots[i]=null;
    if(state.tutorialStep===2)state.tutorialStep=3;
    commit(820); toast(`+${crop.yield} ${name(crop)} • +${crop.xp} XP`);
    if(level()>oldLevel) { confetti(); setTimeout(()=>toast(`${L('Level up!','កម្រិតកើនឡើង!')} ${level()}`),450); }
  }
  function plantBatch() {
    if(state.tutorialStep)return;
    const crop=BY_ID[state.selected];
    if(!crop||level()<crop.level)return;
    const empty=state.plots.map((plot,i)=>plot? -1:i).filter(i=>i>=0).slice(0,4);
    const amount=Math.min(empty.length,crop.cost?Math.floor(state.coins/crop.cost):4);
    if(!amount)return toast(L('Choose empty fields and save enough coins for seeds.','ជ្រើសស្រែទំនេរ ហើយសន្សំកាក់សម្រាប់គ្រាប់ពូជ។'));
    const startedAt=Date.now(),duration=Math.ceil(crop.seconds*weather().factor*(state.upgrades.includes('irrigation')?.85:1))*1000;
    for(const i of empty.slice(0,amount))state.plots[i]={id:crop.id,startedAt,duration,at:startedAt+duration};
    state.coins-=crop.cost*amount;commit(530);toast(`${L('Planted','បានដាំ')} ${amount} × ${name(crop)}`);
  }
  function harvestReady() {
    if(state.tutorialStep)return;
    const ready=state.plots.map((plot,i)=>plot&&!timeLeft(plot.at)?i:-1).filter(i=>i>=0);
    if(!ready.length)return;
    const oldLevel=level();let xp=0,items=0;
    for(const i of ready){const crop=BY_ID[state.plots[i].id];add(crop.id,crop.yield);xp+=crop.xp;items+=crop.yield;state.plots[i]=null;state.stats.harvest++;}
    state.xp+=xp;commit(840);toast(`${L('Harvested','បានប្រមូលផល')} ${ready.length} ${L('fields','ស្រែ')} · +${items} ${L('goods','ទំនិញ')} · +${xp} XP`);
    if(level()>oldLevel)confetti();
  }
  function collectAnimal(type) {
    const chicken=type==='chicken',bought=state[type],cost=chicken?70:180,needLevel=chicken?2:4;
    if(!bought) {
      if(level()<needLevel) return toast(`${L('Unlock at level','បើកនៅកម្រិត')} ${needLevel}`);
      if(state.coins<cost) return toast(L('Save more coins at the market.','សន្សំកាក់បន្ថែមនៅផ្សារ។'));
      state.coins-=cost;state[type]=true;state[chicken?'coopAt':'buffaloAt']=Date.now()+(chicken?30000:60000);
      commit(620);toast(chicken?L('Chickens joined the farm!','មាន់បានមកកសិដ្ឋាន!'):L('A water buffalo joined the farm!','ក្របីបានមកកសិដ្ឋាន!'));return;
    }
    const timeKey=chicken?'coopAt':'buffaloAt';
    if(timeLeft(state[timeKey])) return toast(`${L('Ready in','រួចរាល់ក្នុង')} ${clock(timeLeft(state[timeKey]))}`);
    const item=chicken?'egg':'milk',n=(chicken?2:1)+(state.animalCare[type]>0?1:0);
    add(item,n);state.stats[chicken?'eggs':'milk']+=n;state.xp+=chicken?5:9;
    state.animalCare[type]=0;
    state[timeKey]=Date.now()+(chicken?45000:80000);
    modal='';commit(820);toast(`+${n} ${name(BY_ID[item])}`);
  }
  function feedAnimal() {
    const type=pendingAnimal,chicken=type==='chicken',feed=chicken?'corn':'morning_glory';
    if(!state[type]||!count(feed)||state.animalCare[type]>=3)return;
    state.inventory[feed]--;state.animalCare[type]++;
    const key=chicken?'coopAt':'buffaloAt';
    state[key]=Math.max(Date.now(),state[key]-(chicken?12000:20000));
    commit(560);renderModal();
  }
  function deliver(id) {
    const index=state.orders.findIndex(o=>o.id===Number(id));
    if(index<0)return;
    const order=state.orders[index];
    if(!has(order.needs))return toast(L('Gather the requested goods first.','ប្រមូលទំនិញដែលត្រូវការជាមុន។'));
    const coins=order.coins+(hasProperty('market_stall')?10:0),xp=order.xp+(hasProperty('produce_motorbike')?4:0);
    spend(order.needs);state.coins+=coins;state.xp+=xp;state.stats.orders++;state.stats.earned+=coins;
    state.orders.splice(index,1,makeOrder());if(state.tutorialStep===3)state.tutorialStep=0;commit(870);toast(`${L('Order delivered!','បានដឹកជញ្ជូន!')} +${coins} ${L('coins','កាក់')} · +${xp} XP`);
  }
  function cook(id) {
    const r=RECIPES.find(x=>x.id===id);
    if(!r||level()<r.level||!has(r.needs))return toast(L('Gather the ingredients first.','ប្រមូលគ្រឿងផ្សំជាមុន។'));
    const portions=state.upgrades.includes('stove')?2:1;
    spend(r.needs);add(id,portions);state.xp+=r.xp;state.stats.cooked+=portions;state.cookedKinds[id]=(state.cookedKinds[id]||0)+portions;commit(750);toast(`+${portions} ${name(r)} ${L('ready!','រួចរាល់!')}`);
  }
  function startTrip(id) {
    const region=REGIONS.find(r=>r.id===id);
    if(!region||state.travel)return;
    if(level()<region.level)return toast(`${L('Unlock at level','បើកនៅកម្រិត')} ${region.level}`);
    if(state.coins<region.cost)return toast(L('Save more coins for this journey.','សន្សំកាក់បន្ថែមសម្រាប់ដំណើរនេះ។'));
    state.coins-=region.cost;state.travel={id,at:Date.now()+Math.ceil(region.seconds*(state.upgrades.includes('cart')?.75:1)*(hasProperty('produce_motorbike')?.9:1)*(hasProperty('produce_truck')?.8:1))*1000};commit(570);
    toast(`${L('Journey started','ដំណើរបានចាប់ផ្តើម')}: ${name(region)}`);
  }
  function collectTrip() {
    if(!state.travel||timeLeft(state.travel.at))return;
    const region=REGIONS.find(r=>r.id===state.travel.id);
    if(!region)return;
    Object.entries(region.rewards).forEach(([id,n])=>add(id,n));
    state.xp+=region.xp;state.stats.trips++;state.visits[region.id]=(state.visits[region.id]||0)+1;state.travel=null;
    commit(850);toast(`${L('Returned from','ត្រឡប់ពី')} ${name(region)}! +${region.xp} XP`);
  }
  function claimJourney() {
    if(!journeyComplete())return;
    const reward=JOURNEY[state.journeyChapter].reward;
    state.coins+=reward;state.stats.earned+=reward;state.journeyChapter++;
    if(state.journeyChapter===JOURNEY.length){state.journeyWon=true;modal='journeyWon';}
    save();render();confetti();ping(930);
    if(!state.journeyWon)toast(`${L('Journey chapter complete!','បានបញ្ចប់វគ្គដំណើរ!')} ◉ +${reward}`);
  }
  function claimDaily() {
    if(state.lastDaily===dailyDate())return;
    const coins=hasProperty('family_home')?50:30,rice=hasProperty('storage_house')?4:2;
    state.lastDaily=dailyDate();state.coins+=coins;state.stats.earned+=coins;add('rice',rice);
    commit(730);toast(`${L('Daily gift claimed!','បានយកអំណោយ!')} +${coins} ${L('coins','កាក់')}, +${rice} ${name(BY_ID.rice)}`);
  }
  function expandFarm() {
    const countPlots=state.plots.length,cost=countPlots===12?150:250,required=countPlots===12?3:5;
    if(countPlots>=20||level()<required||state.coins<cost)return;
    state.coins-=cost;for(let i=0;i<4;i++)state.plots.push(null);
    commit(790);toast(L('Four new fields are ready!','ស្រែថ្មីបួនកន្លែងរួចរាល់!'));
  }
  function startCraft(id) {
    const item=CRAFTS.find(x=>x.id===id);
    if(!item||state.workshop||level()<item.level||!has(item.needs))return;
    spend(item.needs);state.workshop={id,at:Date.now()+item.seconds*1000};
    commit(590);toast(`${L('Making','កំពុងផលិត')} ${name(item)}`);
  }
  function collectCraft() {
    if(!state.workshop||timeLeft(state.workshop.at))return;
    const item=CRAFTS.find(x=>x.id===state.workshop.id);
    if(!item)return;
    const amount=item.id==='rice_flour'&&hasProperty('rice_mill')?2:1;
    add(item.id,amount);state.xp+=item.xp;state.stats.crafted+=amount;state.craftedKinds[item.id]=(state.craftedKinds[item.id]||0)+amount;state.workshop=null;
    commit(830);toast(`+${amount} ${name(item)} ${L('finished!','រួចរាល់!')}`);
  }
  function giveGift(id) {
    const friend=FRIENDS.find(x=>x.id===id);
    if(!friend||timeLeft(state.giftAt[id]||0)||!count(friend.favorite))return;
    add(friend.favorite,-1);state.friendship[id]=(state.friendship[id]||0)+1;state.stats.gifts++;
    state.giftAt[id]=Date.now()+30000;state.xp+=4;
    const tier=Math.floor(state.friendship[id]/3);
    let reward=0;
    if(tier>(state.friendRewards[id]||0)){
      state.friendRewards[id]=tier;reward=40+Math.min(tier,3)*20;state.coins+=reward;state.stats.earned+=reward;
    }
    commit(860);toast(`♥ ${name(friend)} +1 ${L('friendship','មិត្តភាព')}${reward?` • ◉ +${reward}`:''}`);
  }
  function claimMakers() {
    if(!makersComplete())return;
    const reward=MAKERS[state.makersChapter].reward;
    state.coins+=reward;state.stats.earned+=reward;state.makersChapter++;
    if(state.makersChapter===MAKERS.length){state.makersWon=true;modal='makersWon';}
    save();render();confetti();ping(930);
    if(!state.makersWon)toast(`${L('Makers chapter complete!','វគ្គអ្នកផលិតបានបញ្ចប់!')} ◉ +${reward}`);
  }
  function sell(id) {
    return sellQuantity(id,1);
  }
  function sellQuantity(id,amount) {
    const item=BY_ID[id];if(!item||!Number.isInteger(amount)||amount<1||count(id)<amount)return;
    const price=sellPrice(item);
    add(id,-amount);state.coins+=price*amount;state.stats.earned+=price*amount;modal='';pendingSale='';commit(670);toast(`${name(item)} ×${amount} • ${L('coins','កាក់')} +${price*amount}`);
  }
  function buyDecor(id) {
    const d=DECOR.find(x=>x.id===id);
    if(!d||state.decor.includes(id)||state.coins<d.cost)return;
    state.coins-=d.cost;state.decor.push(id);commit(810);toast(`${L('Placed in the village!','បានដាក់ក្នុងភូមិ!')}`);
  }
  function buyUpgrade(id) {
    const u=UPGRADES.find(x=>x.id===id);
    if(!u||state.upgrades.includes(id)||level()<u.level||state.coins<u.cost)return;
    state.coins-=u.cost;state.upgrades.push(id);commit(810);toast(`${name(u)} ${L('built!','បានសាងសង់!')}`);
  }
  function claim() {
    if(!chapterComplete())return;
    if(state.chapter===4) {
      state.coins-=200;state.won=true;state.chapter=5;save();render();modal='won';renderModal();confetti();ping(940);return;
    }
    const reward=CHAPTERS[state.chapter].reward;state.coins+=reward;state.stats.earned+=reward;state.chapter++;
    commit(940);confetti();toast(`${L('Chapter complete!','បានបញ្ចប់វគ្គ!')} 🪙 +${reward}`);
  }
  function startMini(id) {
    const game=SrokMini.create(id);
    if(!game)return;
    if(!miniReady(id))return toast(miniButtonLabel(id));
    miniSession=game;modal='mini';renderModal();ping(590);
  }
  function buyProperty(id) {
    const item=PROPERTY.find(entry=>entry.id===id);
    if(!item||hasProperty(id)||level()<item.level||state.coins<item.cost)return;
    state.coins-=item.cost;state.stats.propertySpent=(state.stats.propertySpent||0)+item.cost;state.ownedProperty.push(id);
    commit(820);confetti();toast(`${name(item)} ${L('is yours!','ជារបស់អ្នកហើយ!')}`);
  }
  function chooseMini(value) {
    if(modal!=='mini'||!miniSession||miniSession.finished)return;
    const s=miniSession,result=SrokMini.choose(s,value);
    s.feedback=result.correct?L('Good choice!','ជ្រើសត្រូវហើយ!'):L('Try another one.','សាកល្បងម្តងទៀត។');
    if(!result.finished){renderModal();ping(result.correct?720:420);return;}
    const stars=SrokMini.stars(s),perfect=stars===3;
    const reward={items:{},coins:0,xp:0};
    if(s.id==='rice') {
      reward.items.rice=perfect?2:1;reward.xp=perfect?5:3;
    } else if(s.id==='loom') {
      if(!has({cotton:3})||state.workshop){miniSession=null;modal='';renderModal();return;}
      spend({cotton:3});reward.items.krama=1;reward.xp=perfect?28:23;
      state.stats.crafted++;state.craftedKinds.krama=(state.craftedKinds.krama||0)+1;
    } else if(s.id==='lotus') {
      reward.items.lotus=1;reward.xp=perfect?6:4;
    } else if(s.id==='canal') {
      reward.items.rice=1;reward.coins=8;reward.xp=perfect?6:4;
    } else if(s.id==='fish') {
      reward.items.fish=state.upgrades.includes('net')?2:1;reward.xp=perfect?7:4;
      state.stats.fish+=reward.items.fish;state.fishAt=Date.now()+25000;
    } else if(s.id==='cargo') {
      reward.items.banana=perfect?2:1;reward.xp=perfect?7:4;
    } else if(s.id==='recipe') {
      reward.items.lemongrass=1;reward.xp=perfect?8:5;
    } else if(s.id==='market') {
      reward.items[s.produce]=1;
      reward.coins=perfect?15:10;reward.xp=perfect?5:3;
    }
    Object.entries(reward.items).forEach(([item,amount])=>add(item,amount));
    state.coins+=reward.coins;state.stats.earned+=reward.coins;
    state.xp+=reward.xp;state.stats.miniGames++;
    state.miniBest[s.id]=Math.max(state.miniBest[s.id]||0,stars);
    if(s.id!=='fish')state.miniAt[s.id]=Date.now()+(s.id==='market'?180000:['lotus','canal','cargo','recipe'].includes(s.id)?120000:90000);
    s.reward=reward;s.stars=stars;save();render();confetti();ping(880);
  }
  function act(action,id) {
    if(action==='tab'){tab=id;modal='';miniSession=null;render();window.scrollTo(0,0);return;}
    if(action==='openMini')return startMini(id);
    if(action==='miniPick')return chooseMini(id);
    if(action==='openPlot'){const index=Number(id);if(index>=0&&index<state.plots.length&&!state.plots[index]){pendingPlot=index;modal='seedPicker';renderModal();}return;}
    if(action==='startTutorial'){state.seenHelp=true;state.tutorialStep=1;modal='';save();render();return;}
    if(action==='skipTutorial'){state.seenHelp=true;state.tutorialStep=0;modal='';save();render();return;}
    if(action==='plantChosen'){if(pendingPlot<0)return;const index=pendingPlot;pendingPlot=-1;modal='';state.selected=id;harvestPlot(index);return;}
    if(action==='animalPanel'){pendingAnimal=id==='coop'?'chicken':'buffalo';modal='animal';renderModal();return;}
    if(action==='feedAnimal')return feedAnimal();
    if(action==='fishPanel'){fishingCastAt=0;modal='fishing';renderModal();return;}
    if(action==='fishCast'){if(timeLeft(state.fishAt))return;fishingCastAt=Date.now();renderModal();return;}
    if(action==='fishCatch'){if(!fishingCastAt||Date.now()-fishingCastAt<1500)return;fishingCastAt=0;modal='';return startMini('fish');}
    if(action==='farmMode'){farmMode=['fields','games'].includes(id)?id:'map';arranging=false;selectedDecor='';render();return;}
    if(action==='arrange'){arranging=!arranging;selectedDecor='';render();return;}
    if(action==='mapZoom'){state.mapCamera.zoom=Math.max(.65,Math.min(2.2,state.mapCamera.zoom*(id==='in'?1.25:.8)));save();updateMapTransform();return;}
    if(action==='mapDecor'){if(arranging){selectedDecor=id;render();}else toast(L('Tap Arrange to move decorations.','ចុចតុបតែងដើម្បីផ្លាស់ទីគ្រឿងតុបតែង។'));return;}
    if(action==='marketTab'||action==='ordersTab'||action==='exploreTab'||action==='workshopTab'){tab=action==='marketTab'?'market':action==='ordersTab'?'orders':action==='exploreTab'?'explore':'kitchen';if(action==='workshopTab')kitchenMode='workshop';render();window.scrollTo(0,0);return;}
    if(action==='kitchenTab'){tab='kitchen';kitchenMode='cook';render();window.scrollTo(0,0);return;}
    if(action==='kitchenMode'){kitchenMode=id;render();return;}
    if(action==='villageMode'){villageMode=['build','decor','people','progress'].includes(id)?id:'build';render();window.scrollTo(0,0);return;}
    if(action==='story'){tab=!state.won?'orders':!state.journeyWon?'explore':'kitchen';if(tab==='kitchen')kitchenMode='workshop';render();window.scrollTo(0,0);return;}
    if(action==='profile'){modal='profile';renderModal();return;}
    if(action==='saveProfile'){
      const input=modalRoot.querySelector('#profile-name');
      const value=input?input.value.trim():'';
      if(!value)return toast(L('Enter a farmer name.','សូមបញ្ចូលឈ្មោះកសិករ។'));
      state.profileName=normalizeProfileName(value);modal='';save();render();toast(L('Profile saved.','បានរក្សាទុកប្រវត្តិ។'));return;
    }
    if(action==='settings'||action==='help'||action==='resetPrompt'){modal=action==='resetPrompt'?'reset':action;renderModal();return;}
    if(action==='checkUpdate'){modal='';renderModal();if(window.SrokAndroid)window.SrokAndroid.checkForUpdates();return;}
    if(action==='close'){modal='';pendingPlot=-1;fishingCastAt=0;miniSession=null;renderModal();if(!state.seenHelp){state.seenHelp=true;save();}return;}
    if(action==='language'){state.lang=state.lang==='en'?'km':'en';save();render();return;}
    if(action==='sound'){state.sound=!state.sound;save();renderModal();if(state.sound)ping();return;}
    if(action==='graphics'){state.graphics=state.graphics==='auto'?'high':state.graphics==='high'?'low':'auto';applyDisplaySettings();save();renderModal();return;}
    if(action==='motion'){state.reducedMotion=!state.reducedMotion;applyDisplaySettings();save();renderModal();return;}
    if(action==='resetConfirm'){const {lang,sound,graphics,reducedMotion}=state;state=freshState();Object.assign(state,{lang,sound,graphics,reducedMotion,seenHelp:true});applyDisplaySettings();while(state.orders.length<3)state.orders.push(makeOrder());tab='farm';farmMode='map';kitchenMode='cook';villageMode='build';marketShowAll=false;modal='';miniSession=null;commit(440);toast(L('A new farm has begun.','កសិដ្ឋានថ្មីបានចាប់ផ្តើម។'));return;}
    if(action==='select'){const crop=BY_ID[id];if(level()<crop.level)return toast(`${L('Unlock at level','បើកនៅកម្រិត')} ${crop.level}`);state.selected=id;save();render();return;}
    if(action==='plantBatch')return plantBatch();
    if(action==='harvestReady')return harvestReady();
    if(action==='plot')return harvestPlot(Number(id));
    if(action==='fish')return act('fishPanel');
    if(action==='coop')return collectAnimal('chicken');
    if(action==='buffalo')return collectAnimal('buffalo');
    if(action==='deliver')return deliver(id);
    if(action==='cook')return cook(id);
    if(action==='craft')return startCraft(id);
    if(action==='collectCraft')return collectCraft();
    if(action==='gift')return giveGift(id);
    if(action==='expand')return expandFarm();
    if(action==='makersClaim')return claimMakers();
    if(action==='sell')return sell(id);
    if(action==='sellPanel'){if(!BY_ID[id]||!count(id))return;pendingSale=id;modal='sale';renderModal();return;}
    if(action==='sellQty'){const quantity=id==='all'?count(pendingSale):Number(id);return sellQuantity(pendingSale,quantity);}
    if(action==='marketFilter'){marketShowAll=!marketShowAll;render();return;}
    if(action==='goBuild'){tab='journal';villageMode='build';render();window.scrollTo(0,0);return;}
    if(action==='daily')return claimDaily();
    if(action==='trip')return startTrip(id);
    if(action==='collectTrip')return collectTrip();
    if(action==='journeyClaim')return claimJourney();
    if(action==='decor')return buyDecor(id);
    if(action==='upgrade')return buyUpgrade(id);
    if(action==='buyProperty')return buyProperty(id);
    if(action==='claim')return claim();
  }
  function handleClick(event) {
    if(event.target.closest('#farm-map') && mapMoved){event.preventDefault();event.stopPropagation();mapMoved=false;return;}
    const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
    event.preventDefault();act(button.dataset.action,button.dataset.id);
  }
  app.addEventListener('click',handleClick);
  modalRoot.addEventListener('click',handleClick);
  function tick() {
    const fieldsMetric=document.querySelector('[data-dashboard="fields"]');
    if(fieldsMetric){fieldsMetric.textContent=state.plots.filter(plot=>plot&&!timeLeft(plot.at)).length;document.querySelector('[data-dashboard="orders"]').textContent=state.orders.filter(order=>has(order.needs)).length;document.querySelector('[data-dashboard="goods"]').textContent=ALL.filter(item=>count(item.id)>0).length;}
    document.querySelectorAll('.map-plot[data-id]').forEach(el=>{
      const plot=state.plots[Number(el.dataset.id)];if(!plot)return;
      const seconds=timeLeft(plot.at),timer=el.querySelector('small');
      if(timer)timer.textContent=seconds?clock(seconds):L('READY','រួចរាល់');
      el.classList.toggle('ready',!seconds);
      const stage=cropStage(plot);
      for(let i=0;i<=4;i++)el.classList.toggle('growth-'+i,stage===i);
      if(plot.id==='rice'&&stage>=2){const sprite=el.querySelector('.art-sprite');if(sprite&&sprite.classList.contains('art-village'))sprite.outerHTML=art('rice');}
    });
    [['fish',state.fishAt,true],['coop',state.coopAt,state.chicken],['buffalo',state.buffaloAt,state.buffalo]].forEach(([action,at,owned])=>{
      const el=document.querySelector(`.map-station[data-id="${action==='fish'?'pond':action}"]`);
      if(el)el.classList.toggle('map-ready',owned&&!timeLeft(at));
    });
    document.querySelectorAll('.plot .timer').forEach(el=>{
      const seconds=timeLeft(Number(el.dataset.until));el.textContent=seconds?clock(seconds):L('READY','រួចរាល់');
      el.closest('.plot').classList.toggle('ready',!seconds);
      const gridPlot=el.closest('.plot'),plot=state.plots[Number(gridPlot.dataset.id)];
      if(plot){const stage=cropStage(plot);for(let i=0;i<=4;i++)gridPlot.classList.toggle('growth-'+i,stage===i);}
    });
    [['.pond',state.fishAt,L('Catch fish','ចាប់ត្រី')],['.coop',state.coopAt,L('Collect','ប្រមូល')],['.buffalo',state.buffaloAt,L('Collect','ប្រមូល')]].forEach(([selector,at,readyText])=>{
      const el=document.querySelector(selector);if(!el)return;
      if((selector==='.coop'&&!state.chicken)||(selector==='.buffalo'&&!state.buffalo))return;
      const seconds=timeLeft(at);el.querySelector('small').textContent=seconds?clock(seconds):readyText;el.classList.toggle('ready',!seconds);
    });
    if(state.travel){const button=document.querySelector('[data-action="collectTrip"]');if(button){const seconds=timeLeft(state.travel.at);button.textContent=seconds?clock(seconds):L('WELCOME THEM HOME','ទទួលពួកគេត្រឡប់');button.disabled=!!seconds;}}
    if(state.workshop){const button=document.querySelector('[data-action="collectCraft"]');if(button){const seconds=timeLeft(state.workshop.at);button.textContent=seconds?clock(seconds):L('COLLECT','ប្រមូល');button.disabled=!!seconds;}}
    FRIENDS.forEach(friend=>{const button=document.querySelector(`[data-action="gift"][data-id="${friend.id}"]`);if(button){const seconds=timeLeft(state.giftAt[friend.id]||0);button.textContent=seconds?clock(seconds):L('GIVE','ជូន');button.disabled=!!seconds||!count(friend.favorite);}});
    const dailyButton=document.querySelector('[data-action="daily"]');
    if(dailyButton&&state.lastDaily!==dailyDate()){dailyButton.disabled=false;dailyButton.textContent=L('CLAIM','យក');}
    document.querySelectorAll('[data-action="openMini"]').forEach(button=>{
      const id=button.dataset.id;
      button.disabled=!miniReady(id);
      button.textContent=miniButtonLabel(id);
    });
    if(modal==='fishing'||modal==='animal')renderModal();
  }
  window.gameBack=()=>{if(modal){modal='';miniSession=null;renderModal();return true;}if(tab!=='farm'){tab='farm';render();return true;}return false;};
  window.SrokGame={getState:()=>JSON.parse(JSON.stringify(state)),act,makeOrder,level,chapterComplete,journeyComplete,makersComplete};
  function applyDisplaySettings() {
    document.documentElement.classList.toggle('reduced-motion',state.reducedMotion);
    document.documentElement.classList.toggle('graphics-low',state.graphics==='low');
    document.documentElement.classList.toggle('graphics-high',state.graphics==='high');
  }
  applyDisplaySettings();
  render();
  if(!state.seenHelp){modal='help';renderModal();}
  setInterval(tick,1000);
})();
