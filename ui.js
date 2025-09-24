;(()=>{"use strict";

/** Proste API UI bez frameworka. Wymaga istnienia #aboutModal w HTML. */
function setupAboutModal(){
  const modal = document.getElementById('aboutModal');
  if(!modal) return;

  // Otwieranie / zamykanie
  document.addEventListener('click', e=>{
    const id = e.target && e.target.id;
    if(id === 'openAbout'){ modal.classList.add('show'); }
    if(id === 'closeAbout'){ modal.classList.remove('show'); }
    if(e.target === modal){ modal.classList.remove('show'); }
    if(id === 'aboutShare'){
      alert(
`Pobierz QR PNG (1000×1000), użyj edytora zdjęć w telefonie i wklej kod w róg fotki.
Możesz też wydrukować QR i zrobić z nim zdjęcie — to wygląda wiarygodnie i wyróżnia.
Uwaga: niektóre aplikacje ograniczają linki, ale QR zwykle działa bez problemu.`
      );
    }
  });

  // Esc zamyka modal
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') modal.classList.remove('show');
  });
}

/** Pomocnicze: wstrzyknij HTML do #app */
function renderToApp(html){
  const root = document.getElementById('app');
  if(root) root.innerHTML = html;
}

/** Upublicznienie */
window.UI = {
  setupAboutModal,
  renderToApp
};

})();
