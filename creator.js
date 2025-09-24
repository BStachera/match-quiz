// creator.js (fixed: window.Creator.viewCreator + uses window.Utils)
(function () {
  const U = window.Utils;

  const BASE_COUNT   = (window.BASE_QUESTIONS || []).length;
  const RANDOM_COUNT = window.RANDOM_COUNT || 3;

  function blockQuestion(q, i, reroll = false) {
    return `
      <div>
        <div class="row" style="justify-content:space-between; align-items:baseline">
          <div class="mono" style="opacity:.9; font-weight:700; margin-bottom:8px">${i + 1}. ${q.q}</div>
          ${reroll ? `<button class="btn small" data-reroll="${i}" title="Wylosuj inne">🎲 Wylosuj inne</button>` : ''}
        </div>
        <div class="options" data-q-index="${i}">
          ${q.a.map((txt, ai) => `<div class="opt" data-a="${ai}">${txt}</div>`).join('')}
        </div>
      </div>`;
  }

  function customBlock(q, i) {
    return `
      <div class="card" style="background:rgba(255,255,255,.03)">
        <div class="row" style="justify-content:space-between; align-items:baseline">
          <div class="mono" style="opacity:.9; font-weight:700; margin-bottom:8px">${i + 1}. ${q.q}</div>
          <button class="btn small" data-del="${i}" title="Usuń">🗑 Usuń</button>
        </div>
        <div class="options" data-q-index="${i}">
          ${q.a.map((txt, ai)=>`<div class="opt" data-a="${ai}">${txt}</div>`).join('')}
        </div>
      </div>`;
  }

  function viewCreator(prefill = null) {
    const app = document.getElementById('app');

    const usedQuestions = [...(window.BASE_QUESTIONS || []).map(q => ({ ...q }))];
    const usedIds = new Set(usedQuestions.map(q => q.id));
    for (let i = 0; i < RANDOM_COUNT; i++) {
      const nq = U.pickRandom(window.RANDOM_POOL || [], usedIds);
      if (nq) { usedQuestions.push({ ...nq }); usedIds.add(nq.id); }
    }

    const answers = [];
    let formBuffer = { name: '', contact: '' };

    function captureForm() {
      const nameEl = document.getElementById('name');
      const contactEl = document.getElementById('contact');
      if (nameEl)    formBuffer.name    = nameEl.value;
      if (contactEl) formBuffer.contact = contactEl.value;
    }
    function restoreForm() {
      const nameEl = document.getElementById('name');
      const contactEl = document.getElementById('contact');
      if (nameEl && formBuffer.name) nameEl.value = formBuffer.name;
      if (contactEl && formBuffer.contact) contactEl.value = formBuffer.contact;
    }

    function render() {
      const base   = usedQuestions.slice(0, BASE_COUNT);
      const random = usedQuestions.slice(BASE_COUNT, BASE_COUNT + RANDOM_COUNT);
      const custom = usedQuestions.slice(BASE_COUNT + RANDOM_COUNT);

      app.innerHTML = `
        <div class="grid" style="gap:18px">
          ${U.headerBlock('creator')}
          <div class="card">
            <div class="row" style="justify-content:space-between"><div class="pill">TRYB KREATORA</div></div>
            <div class="grid" style="gap:14px">
              <label>
                <div class="small muted">Twoje imię / ksywka:</div>
                <input id="name" type="text" placeholder="np. Piotr" />
              </label>
              <label>
                <div class="small muted">Link do kontaktu:</div>
                <input id="contact" type="url" placeholder="np. tel:+48123456789 / wa.me/48… / nick@domena.pl / instagram.com/nick" />
                <div class="hint" id="contactHint"></div>
              </label>
            </div>
          </div>

          <div class="card">
            <div class="pill">Pytania bazowe (zawsze)</div>
            <div class="grid" style="gap:16px">
              ${base.map((q, qi) => blockQuestion(q, qi)).join('')}
            </div>
          </div>

          <div class="card">
            <div class="pill">Pytania losowe</div>
            <div class="grid" style="gap:16px">
              ${random.map((q, ri) => blockQuestion(q, BASE_COUNT + ri, true)).join('')}
            </div>
          </div>

          <div class="card">
            <div class="pill">Twoje własne pytania (Tak/Nie)</div>
            <div class="grid" style="gap:16px">
              <div class="row" style="align-items:flex-end">
                <label style="flex:1">
                  <div class="small muted">Treść pytania:</div>
                  <input id="customText" type="text" placeholder="np. Czy lubisz psy?" />
                </label>
                <button class="btn small" id="addCustom">+ Dodaj (max 4)</button>
              </div>
              ${custom.map((q, idx) => customBlock(q, BASE_COUNT + RANDOM_COUNT + idx)).join('')}
            </div>
          </div>

          <div class="card">
            <div class="row">
              <button class="btn primary" id="gen">🔗 Generuj link + QR</button>
              <button class="btn ghost" id="reset">Wyczyść</button>
            </div>

            <div id="linkBox" class="grid" style="gap:8px; margin-top:12px; display:none">
              <div class="card url-grid" style="background:transparent; box-shadow:none; border:0; padding:0">
                <div class="url-col">
                  <input id="shareUrl" type="text" readonly class="mono" style="width:90%" />
                  <div class="url-row">
                    <a class="btn" id="openQuiz" style="margin-top:10px; width:88%; text-align:center;">Zobacz quiz</a>
                    <button class="btn" id="copy">Kopiuj</button>
                    <button class="btn" id="share" style="display:none">Udostępnij</button>
                  </div>
                </div>
                <div class="center">
                  <div class="qr-box" id="qrExport"><div id="qrcode"></div></div>
                  <div class="small muted" id="qrCaption"></div>
                  <button class="btn" id="saveqr" style="margin-top:8px">Pobierz QR PNG</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      restoreForm();

      document.querySelectorAll('.options').forEach(box => {
        U.addOptionA11y(box);
        box.addEventListener('click', e => {
          const opt = e.target.closest('.opt'); if (!opt) return;
          const idx = +box.dataset.qIndex; const ai = +opt.dataset.a;
          answers[idx] = ai;
          box.querySelectorAll('.opt').forEach(x => x.classList.remove('selected'));
          opt.classList.add('selected'); U.buzz();
        });
      });

      answers.forEach((ai, idx) => {
        if (ai == null) return;
        const box = document.querySelector(`.options[data-q-index="${idx}"]`);
        const opt = box?.querySelector(`.opt[data-a="${ai}"]`);
        if (opt) opt.classList.add('selected');
      });

      if (Array.isArray(prefill)) {
        prefill.forEach((ai, idx) => {
          const box = document.querySelector(`.options[data-q-index="${idx}"]`);
          if (box) {
            const opt = box.querySelector(`.opt[data-a="${ai}"]`);
            if (opt) { opt.classList.add('selected'); answers[idx] = ai; }
          }
        });
        prefill = null;
      }

      document.querySelectorAll('[data-reroll]').forEach(btn => {
        btn.addEventListener('click', () => {
          captureForm();
          const idx = +btn.dataset.reroll;
          const currentId = usedQuestions[idx].id;

          const exclude = new Set(usedQuestions.map(q => q.id));
          exclude.delete(currentId);

          const n = U.pickRandom(window.RANDOM_POOL || [], exclude);
          if (!n) return;

          usedQuestions[idx] = { ...n };
          answers[idx] = null;
          render();
        });
      });

      document.getElementById('addCustom').onclick = () => {
        captureForm();
        const input = document.getElementById('customText');
        const text = (input.value || '').trim();
        if (!text) return;

        const customCount = usedQuestions.slice(BASE_COUNT + RANDOM_COUNT).length;
        if (customCount >= 4) { alert('Maksymalnie 4 własne pytania.'); return; }

        const q = { id: 'c-' + (Date.now() + Math.random()).toString(36).slice(2), q: text, a: ['Tak ✅', 'Nie ❌'] };
        const insertAt = BASE_COUNT + RANDOM_COUNT + customCount;
        usedQuestions.splice(insertAt, 0, q);
        answers.splice(insertAt, 0, null);

        input.value = '';
        render();
      };

      document.querySelectorAll('[data-del]').forEach(btn => {
        btn.addEventListener('click', () => {
          captureForm();
          const idx = +btn.dataset.del;
          usedQuestions.splice(idx, 1);
          answers.splice(idx, 1);
          render();
        });
      });

      document.getElementById('reset').onclick = () => {
        formBuffer = { name: '', contact: '' };
        viewCreator();
      };

      document.getElementById('gen').onclick = () => {
        captureForm();

        const nameEl = document.getElementById('name');
        const contactEl = document.getElementById('contact');
        const hint = document.getElementById('contactHint');

        const name = (nameEl.value || '').trim() || 'Autor';
        const contactRaw = (contactEl.value || '').trim();

        let contact = '';
        if (contactRaw) {
          const norm = U.normalizeContact(contactRaw);
          if (!norm.ok) {
            hint.textContent = '⚠️ Niedozwolony kontakt. Dozwolone: tel (9–12 cyfr), WhatsApp, IG, FB/Messenger, Telegram, Discord, TikTok, X/Twitter, e-mail.';
            hint.style.color = '#ff8888';
            return;
          }
          hint.textContent = '';
          contact = norm.href;
        }

        if (answers.length !== usedQuestions.length || answers.some(x => x == null)) {
          alert('Uzupełnij wszystkie odpowiedzi.');
          return;
        }

        const payload = { version: 2, name, contact, questions: usedQuestions, answers };
        const hash = U.encodeState(payload);
        const url = location.origin + location.pathname + '#' + hash;

        const shareUrlEl = document.getElementById('shareUrl');
        shareUrlEl.value = url;

        if (typeof QRCode === 'function') {
          const box = document.getElementById('qrcode'); box.innerHTML = '';
          new QRCode(box, { text: url, width: 240, height: 240, colorDark: '#000', colorLight: '#fff', correctLevel: QRCode.CorrectLevel.M });
          document.getElementById('qrCaption').textContent = 'match-quiz + ' + name;
        }

        document.getElementById('copy').onclick = async () => { try { await navigator.clipboard.writeText(url); } catch {} };
        document.getElementById('openQuiz').onclick = () => window.open(url, '_blank', 'noopener');
        if (navigator.share) {
          const s = document.getElementById('share');
          s.style.display = 'inline-block';
          s.onclick = () => navigator.share({ title: 'Match Quiz', text: `Zagraj ze mną: ${name}`, url });
        }

        document.getElementById('saveqr').onclick = () => {
          const CANVAS_SIZE = 1000, SCALE = .85, QR_SIZE = Math.round(CANVAS_SIZE * SCALE), OFFSET = Math.round((CANVAS_SIZE - QR_SIZE) / 2);
          const canvas = document.createElement('canvas'); canvas.width = CANVAS_SIZE; canvas.height = CANVAS_SIZE;
          const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
          const tmp = document.createElement('div'); tmp.style.position = 'absolute'; tmp.style.left = '-9999px'; document.body.appendChild(tmp);
          new QRCode(tmp, { text: url, width: QR_SIZE, height: QR_SIZE, colorDark: '#000', colorLight: '#fff', correctLevel: QRCode.CorrectLevel.M });
          const qrCanvas = tmp.querySelector('canvas'); if (qrCanvas) ctx.drawImage(qrCanvas, OFFSET, OFFSET); document.body.removeChild(tmp);
          ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.font = '40px monospace'; ctx.fillText('match-quiz + ' + name, CANVAS_SIZE / 2, CANVAS_SIZE - 20);
          const a = document.createElement('a'); a.download = 'match-quiz.png'; a.href = canvas.toDataURL('image/png'); a.click();
        };

        document.getElementById('linkBox').style.display = 'grid';
      };
    }

    render();
  }

  window.Creator = { viewCreator };
})();