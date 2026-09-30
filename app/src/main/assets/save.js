/* Two-slot local save with recovery from interrupted or malformed writes. */
(() => {
  function valid(raw) {
    return raw && typeof raw === 'object' && Number.isInteger(raw.version)
      && Array.isArray(raw.plots) && raw.plots.length >= 12 && raw.plots.length <= 20
      && raw.inventory && typeof raw.inventory === 'object'
      && Number.isFinite(Number(raw.coins)) && Number.isFinite(Number(raw.xp));
  }
  function parse(text) {
    try { const raw=JSON.parse(text); return valid(raw)?raw:null; }
    catch (_) { return null; }
  }
  function load(key) {
    const primary=parse(localStorage.getItem(key));
    if(primary)return {state:primary,recovered:false};
    const backup=parse(localStorage.getItem(key+'-backup'));
    return {state:backup,recovered:!!backup};
  }
  function save(key,state) {
    try {
      const current=localStorage.getItem(key);
      if(parse(current))localStorage.setItem(key+'-backup',current);
      localStorage.setItem(key,JSON.stringify(state));
      return true;
    } catch (_) { return false; }
  }
  window.SrokSave={load,save};
})();
