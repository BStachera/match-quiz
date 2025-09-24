// utils.js — minimal utils without external deps
;(()=>{
  "use strict";

  /* ===== State encoding/decoding (URL safe base64) ===== */
  function b64urlEncode(str){
    try { return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
    catch(e){
      // polyfill for UTF-8
      const utf8 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_,p)=>String.fromCharCode('0x'+p));
      return btoa(utf8).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
    }
  }
  function b64urlDecode(str){
    try {
      str = str.replace(/-/g,'+').replace(/_/g,'/'); while (str.length % 4) str += '=';
      const bin = atob(str);
      try { return decodeURIComponent(Array.from(bin, c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('')); }
      catch { return bin; }
    } catch(e){ return ''; }
  }

  function encodeState(obj){
    const json = JSON.stringify(obj);
    return b64urlEncode(json);
  }
  function decodeState(hash){
    if(!hash) return null;
    const json = b64urlDecode(hash);
    try { return JSON.parse(json); } catch { return null; }
  }

  /* ===== Helpers ===== */
  const pct = n => Math.round(n*100);

  const escapeHtml = (str='') => String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[s]));

  const escapeAttr = s => escapeHtml(String(s)).replace(/"/g,'&quot;');

  function normalizeContact(raw){
    const t = String(raw||'').trim();

    // tel:
    const digits = t.replace(/[^\d+]/g,'');
    if (/^\+?\d{9,12}$/.test(digits)) {
      const num = digits.startsWith('+') ? digits : ('+48' + digits); // lekka preferencja PL
      return { ok:true, href:`tel:${num}`, display:num };
    }

    // email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
      return { ok:true, href:`mailto:${t}`, display:t };
    }

    // linki social / komunikatory / zwykłe URL
    if (/^https?:\/\//i.test(t)) {
      return { ok:true, href:t, display:t.replace(/^https?:\/\//,'') };
    }

    // shorthand instagram/x etc.
    if (/^@?[a-z0-9._]{2,30}$/i.test(t)) {
      return { ok:true, href:`https://instagram.com/${t.replace(/^@/,'')}`, display:'@'+t.replace(/^@/,'') };
    }

    return { ok:false };
  }

  function headerBlock(mode='creator', name=''){
    const title = mode==='game' ? `MATCH QUIZ` : `MATCH QUIZ`;
    const sub   = mode==='game' ? `Grasz o: ${escapeHtml(name||'Autor')}` : `Stwórz swój quiz i wyślij znajomym`;
    return `
      <div class="title">`+title+`</div>
      <div class="muted center small">`+sub+`</div>
    `;
  }

  function buzz(){ try{ navigator.vibrate?.(10); }catch{} }
  function resultBuzz(score){ try{ if(score>=75) navigator.vibrate?.([30,20,30]); else navigator.vibrate?.(30);}catch{} }

  function addOptionA11y(scope){
    (scope || document).querySelectorAll('.opt').forEach(opt=>{
      opt.tabIndex = 0;
      opt.setAttribute('role','button');
      opt.addEventListener('keydown', (e)=>{
        if (e.key==='Enter' || e.key===' ') { e.preventDefault(); opt.click(); }
      });
    });
  }

  function pickRandom(pool, excludeIds=new Set()){
    const available = (pool||[]).filter(q=>!excludeIds.has(q.id));
    if(!available.length) return null;
    return available[Math.floor(Math.random()*available.length)];
  }

  window.Utils = {
    encodeState, decodeState, pct, escapeHtml, escapeAttr,
    normalizeContact, headerBlock, buzz, resultBuzz, addOptionA11y, pickRandom
  };
})();