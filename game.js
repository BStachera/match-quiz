// game.js (fixed: no imports, exposes window.Game.viewGame)
(function () {
  const U  = window.Utils;
  const UI = window.UI;
  const LEGACY_FALLBACK = (window.LEGACY_FALLBACK || []);

  function viewGame(data) {
    const app = document.querySelector('#app');

    let questions = Array.isArray(data?.questions) && data.questions.length
      ? data.questions
      : LEGACY_FALLBACK;

    const name   = data?.name || 'Autor';
    const theirs = Array.isArray(data?.answers) ? data.answers : [];
    let step = 0;
    const picked = Array(questions.length).fill(null);

    function renderStep() {
      const q = questions[step];
      app.innerHTML = `
        <div class="grid" style="gap:18px">
          ${U.headerBlock('game', name)}
          <div class="card">
            <div class="mono" style="opacity:.9; font-weight:800; font-size:18px; margin-bottom:8px">
              ${step + 1}. ${U.escapeHtml(q.q)}
            </div>
            <div class="options" data-q="${step}">
              ${q.a.map((t, i) => `<div class="opt" data-a="${i}">${t}</div>`).join('')}
            </div>
            <div class="row" style="margin-top:12px">
              <button class="btn" id="back" ${step === 0 ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Wstecz</button>
              <div style="flex:1"></div>
              <button class="btn primary" id="next">${step === questions.length - 1 ? 'Pokaż wynik' : 'Dalej →'}</button>
            </div>
          </div>
          <div class="center muted small">Grasz o: <span class="glow">${U.escapeHtml(name)}</span></div>
        </div>
      `;

      if (picked[step] != null) {
        const opt = app.querySelector(`.opt[data-a="${picked[step]}"]`);
        if (opt) opt.classList.add('selected');
      }

      U.addOptionA11y(app);

      app.querySelector('.options').addEventListener('click', (e) => {
        const o = e.target.closest('.opt');
        if (!o) return;
        picked[step] = +o.dataset.a;
        app.querySelectorAll('.opt').forEach(x => x.classList.remove('selected'));
        o.classList.add('selected');
        U.buzz();
      });

      document.getElementById('back')?.addEventListener('click', () => {
        if (step > 0) { step--; renderStep(); }
      });

      document.getElementById('next').addEventListener('click', () => {
        if (picked[step] == null) {
          alert('Zaznacz odpowiedź.');
          return;
        }
        if (step < questions.length - 1) {
          step++; renderStep();
        } else {
          showResult();
        }
      });
    }

    function showResult() {
      let matches = 0;
      for (let i = 0; i < questions.length; i++) {
        if (theirs[i] === picked[i]) matches++;
      }
      const rawScore = U.pct(matches / questions.length);
      const roundedUpTo5 = Math.min(100, Math.ceil(rawScore / 5) * 5);
      const canShowContact = roundedUpTo5 >= 75;

      const norm = U.normalizeContact(data?.contact || '');
      const contactBtn = (norm.ok && canShowContact)
        ? `<a class="btn primary" href="${U.escapeAttr(norm.href)}" target="_blank" rel="noopener">💬 Napisz do ${U.escapeHtml(name)}</a>`
        : '';
      const contactText = (norm.ok && canShowContact)
        ? `<div class="muted" style="margin-top:8px; user-select:all;">Kontakt: ${U.escapeHtml(norm.display || norm.href)}</div>`
        : '';

      app.innerHTML = `
        <div class="grid" style="gap:18px">
          ${U.headerBlock('game', name)}
          <div class="card center">
            <div class="mono glow" style="font-size:56px; font-weight:900">${rawScore}%</div>
            ${!canShowContact && norm.ok ? `
              <div class="muted" style="margin-top:6px">
                Wynik <b>${roundedUpTo5}%</b> po zaokrągleniu do 5. Aby odsłonić kontakt, potrzebne jest co najmniej <b>75%</b>.
              </div>` : ''
            }
            <div class="grid" style="gap:10px; margin-top:12px">
              ${questions.map((qq, i) => {
                const ok = (theirs[i] === picked[i]);
                const you = qq.a[theirs[i]];
                const her = qq.a[picked[i]];
                return `
                  <div class="row small mono">
                    <div style="width:20px">${i + 1}.</div>
                    <div class="muted">${U.escapeHtml(qq.q)}</div>
                    <div class="mono" style="margin-left:6px">
                      <span style="color:${ok ? 'var(--ok)' : 'var(--bad)'}">${ok ? '✔︎ Zgodne' : '✖︎ Różne'}</span>
                      <span class="muted"> — Ty: ${U.escapeHtml(her ?? '—')} | ${U.escapeHtml(name)}: ${U.escapeHtml(you ?? '—')}</span>
                    </div>
                  </div>`;
              }).join('')}
            </div>

            <div class="row" style="justify-content:center; margin-top:14px">
              ${contactBtn}
            </div>
            ${contactText}
          </div>

          <div class="center">
            <a class="btn" id="makeOwn">Stwórz własny quiz</a>
          </div>
        </div>
      `;

      U.resultBuzz(rawScore);

      document.getElementById('makeOwn').onclick = () => {
        try { sessionStorage.setItem('prefillAnswers', JSON.stringify(picked)); } catch {}
        history.replaceState({}, '', location.pathname);
        location.reload();
      };
    }

    renderStep();
  }

  window.Game = { viewGame };
})();