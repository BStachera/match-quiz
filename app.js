;(()=>{"use strict";

/* Wymagania: Utils (js/utils.js), UI (js/ui.js), Game (js/game.js), Creator (js/creator.js)
   Używa: window.Utils, window.UI, window.Game, window.Creator */

const U = window.Utils || {};
const UI = window.UI   || { renderToApp: html => { const el=document.querySelector('#app'); if(el) el.innerHTML = html; } };

function getPrefillOnce(){
  try{
    const raw = sessionStorage.getItem('prefillAnswers');
    if(!raw) return null;
    sessionStorage.removeItem('prefillAnswers');
    return JSON.parse(raw);
  }catch{ return null; }
}

/** Router na podstawie location.hash */
function route(){
  const hash = (location.hash||'').replace(/^#/,'').trim();
  const prefill = getPrefillOnce();

  if(!hash){
    // Brak danych w URL -> kreator
    if (window.Creator && typeof window.Creator.viewCreator === 'function') {
      window.Creator.viewCreator(prefill);
    } else {
      // awaryjnie minimalny ekran
      UI.renderToApp(`<div class="card"><div class="title">Match Quiz</div><div>Ładowanie kreatora…</div></div>`);
      console.warn('Creator.viewCreator nie jest dostępny jeszcze.');
    }
    return;
  }

  // Mamy hash — spróbuj zdekodować stan gry
  let data = null;
  if (U && typeof U.decodeState === 'function') {
    data = U.decodeState(hash);
  } else {
    // fallback: spróbuj base64
    try{ data = JSON.parse(decodeURIComponent(escape(atob(hash)))); }catch{}
  }

  if(!data || ( !Array.isArray(data.answers) && !Array.isArray(data.questions) )){
    // uszkodzony/nieznany hash -> oczyść URL i pokaż kreator
    history.replaceState({}, '', location.pathname);
    if (window.Creator && typeof window.Creator.viewCreator === 'function') {
      window.Creator.viewCreator(prefill);
    } else {
      UI.renderToApp(`<div class="card"><div class="title">Match Quiz</div><div>Nieprawidłowy link — otwieram kreator…</div></div>`);
      console.warn('Creator.viewCreator nie jest dostępny jeszcze.');
    }
    return;
  }

  // Tryb gry
  if (window.Game && typeof window.Game.viewGame === 'function') {
    window.Game.viewGame(data);
  } else {
    UI.renderToApp(`<div class="card"><div class="title">Match Quiz</div><div>Ładowanie gry…</div></div>`);
    console.warn('Game.viewGame nie jest dostępny jeszcze.');
  }
}

/** Obsługa modala „O co chodzi?” */
function wireAboutModal(){
  const modal = document.getElementById('aboutModal');
  if(!modal) return;

  // Delegacja kliknięć
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(!(t instanceof HTMLElement)) return;

    if (t.id === 'openAbout') modal.classList.add('show');
    if (t.id === 'closeAbout') modal.classList.remove('show');
    if (t.id === 'aboutShare'){
      alert(
`Pobierz QR PNG (1000×1000), użyj edytora zdjęć w telefonie i wklej kod w róg fotki.
Możesz też wydrukować QR i zrobić z nim zdjęcie — to wygląda wiarygodnie i wyróżnia.
Uwaga: niektóre aplikacje ograniczają linki, ale QR zwykle działa bez problemu.`
      );
    }
  });

  // Klik w tło zamyka
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.classList.remove('show'); });
}

/** Rejestracja Service Workera (opcjonalnie) */
function registerSW(){
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('sw.js').catch(()=>{ /* cicho */ });
    });
  }
}

/** Start */
function init(){
  wireAboutModal();
  registerSW();
  route();
  window.addEventListener('hashchange', route);
}

/** Upublicznienie (głównie do debugowania) */
window.App = { route, init };

document.addEventListener('DOMContentLoaded', init);

})();
