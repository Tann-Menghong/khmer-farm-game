/* Shared content rules for the village dashboard. No network or UI state. */
(() => {
  'use strict';
  const neighbors = [
    {id:'dara',en:'Dara',km:'ដារ៉ា',requestEn:'Supplies for a day by the water.',requestKm:'សម្ភារៈសម្រាប់មួយថ្ងៃនៅក្បែរទឹក។'},
    {id:'srey_mom',en:'Srey Mom',km:'ស្រីមុំ',requestEn:'Ingredients for a meal with neighbors.',requestKm:'គ្រឿងផ្សំសម្រាប់អាហារជាមួយអ្នកជិតខាង។'},
    {id:'ta_sok',en:'Ta Sok',km:'តាសុខ',requestEn:'Goods for the family garden.',requestKm:'ទំនិញសម្រាប់សួនគ្រួសារ។'},
    {id:'vanna',en:'Vanna',km:'វណ្ណា',requestEn:'A little help at the village workshop.',requestKm:'ជួយការងារតិចតួចនៅសិប្បកម្មភូមិ។'}
  ];
  const categories = ['all','crops','animals','fish','food','crafts','regional'];
  function orderNeighbor(id) { return neighbors[Math.abs(Number(id)||0)%neighbors.length]; }
  function category(id, crops, recipes, crafts) {
    if(crops.some(item=>item.id===id))return 'crops';
    if(recipes.some(item=>item.id===id))return 'food';
    if(crafts.some(item=>item.id===id))return 'crafts';
    if(id==='egg'||id==='milk')return 'animals';
    if(id==='fish'||id==='crab')return 'fish';
    return 'regional';
  }
  function uses(id, recipes, crafts) {
    return [...recipes,...crafts].filter(item=>item.needs&&item.needs[id]).slice(0,3);
  }
  function validJobs(raw, catalog) {
    return (Array.isArray(raw)?raw:[]).filter(job=>job&&catalog.some(item=>item.id===job.id)
      &&Number.isFinite(Number(job.at))&&Number(job.at)>0)
      .slice(0,2).map(job=>({id:job.id,at:Number(job.at),amount:Math.max(1,Math.min(2,Number(job.amount)||1))}));
  }
  function cookingSeconds(level) { return 20+Math.max(1,Number(level)||1)*7; }
  window.SrokSystems={neighbors,categories,orderNeighbor,category,uses,validJobs,cookingSeconds};
})();
