// game.js (fixed: no imports, exposes window.Game.viewGame)
(function () {
  const U  = window.Utils;
  const UI = window.UI;
  const LEGACY_FALLBACK = (window.LEGACY_FALLBACK || []);

  function viewGame(data) {
    const app = document.querySelector('#app');

    const questions = (Array.isArray(data?.questions) && data.questions.length
      ? data.questions
      : LEGACY_FALLBACK) || [];

    const name   = data?.name || 'Autor';
    const theirs = Array.isArray(data?.answers) ? data.answers : [];
    const total  = questions.length;

    let step = 0;
    const picked   = Array(total).fill(null);
    const revealed = Array(total).fill(false);

    function toggleDisabled(btn, shouldDisable) {
      if (!btn) return;
      if (shouldDisable) {
        btn.setAttribute('disabled', 'disabled');
      } else {
        btn.removeAttribute('disabled');
      }
    }

    function renderStep() {
      const question = questions[step];
      const theirIndex = Number.isInteger(theirs[step]) ? theirs[step] : null;
      const isLastStep = step === total - 1;

      app.innerHTML = `
        <div class="grid" style="gap:18px">
          ${U.headerBlock('game', name)}
          <div class="card">
            <div class="mono" style="opacity:.9; font-weight:800; font-size:18px; margin-bottom:8px">
              ${step + 1}. ${U.escapeHtml(question.q)}
            </div>
            <div class="options" data-q="${step}">
              ${question.a.map((text, idx) => `<div class="opt" data-a="${idx}">${text}</div>`).join('')}
            </div>
            <div id="feedback" class="feedback" aria-live="polite"></div>
            <div class="row" style="margin-top:12px; gap:10px; flex-wrap:nowrap">
              <button class="btn" id="back" ${step === 0 ? 'disabled' : ''}>Wstecz</button>
              <div style="flex:1"></div>
              <button class="btn" id="check">Sprawdź</button>
              <button class="btn primary" id="next">${isLastStep ? 'Pokaż wynik' : 'Następne →'}</button>
            </div>
          </div>
          <div class="center muted small">Grasz o: <span class="glow">${U.escapeHtml(name)}</span></div>
        </div>
      `;

      const optionBox = app.querySelector('.options');
      const feedbackEl = app.querySelector('#feedback');
      const backBtn = document.getElementById('back');
      const checkBtn = document.getElementById('check');
      const nextBtn = document.getElementById('next');

      function resetFeedback() {
        if (!feedbackEl) return;
        feedbackEl.className = 'feedback';
        feedbackEl.textContent = '';
      }

      function syncSelection() {
        if (!optionBox) return;
        optionBox.querySelectorAll('.opt').forEach(opt => {
          const idx = Number(opt.dataset.a);
          opt.classList.toggle('selected', picked[step] === idx);
          if (!revealed[step]) {
            opt.classList.remove('correct', 'incorrect');
          }
        });
      }

      function syncOutcome() {
        if (!optionBox || !revealed[step]) return;
        optionBox.querySelectorAll('.opt').forEach(opt => opt.classList.remove('correct', 'incorrect'));

        if (!feedbackEl) return;

        if (theirIndex == null) {
          feedbackEl.className = 'feedback info';
          feedbackEl.textContent = `${name} nie odpowiedział(a) na to pytanie. Zapisaliśmy Twój wybór.`;
          return;
        }

        const selectedIndex = picked[step];
        const theirOpt = optionBox.querySelector(`.opt[data-a="${theirIndex}"]`);
        const yourOpt = optionBox.querySelector(`.opt[data-a="${selectedIndex}"]`);
        const isMatch = selectedIndex === theirIndex;

        if (theirOpt) theirOpt.classList.add('correct');
        if (yourOpt && !isMatch) yourOpt.classList.add('incorrect');

        const theirText = question.a[theirIndex] ?? '—';
        const yourText = question.a[selectedIndex] ?? '—';

        feedbackEl.className = `feedback ${isMatch ? 'good' : 'bad'}`;
        feedbackEl.innerHTML = isMatch
          ? `Brawo! Oboje stawiacie na <strong>${U.escapeHtml(yourText)}</strong>.`
          : `Tym razem inaczej. ${U.escapeHtml(name)} wybrał(a) <strong>${U.escapeHtml(theirText)}</strong>, a Ty <strong>${U.escapeHtml(yourText)}</strong>.`;
      }

      function updateButtons() {
        const hasSelection = picked[step] != null;
        toggleDisabled(checkBtn, !hasSelection);
        toggleDisabled(nextBtn, !revealed[step]);
      }

      U.addOptionA11y(optionBox);
      syncSelection();
      if (revealed[step]) {
        syncOutcome();
      } else {
        resetFeedback();
      }
      updateButtons();

      optionBox?.addEventListener('click', (e) => {
        const opt = e.target.closest('.opt');
        if (!opt) return;
        const idx = Number(opt.dataset.a);
        if (!Number.isInteger(idx)) return;

        picked[step] = idx;
        revealed[step] = false;
        syncSelection();
        resetFeedback();
        updateButtons();
        U.buzz();
      });

      backBtn?.addEventListener('click', () => {
        if (step > 0) {
          step -= 1;
          renderStep();
        }
      });

      checkBtn?.addEventListener('click', () => {
        if (picked[step] == null) {
          alert('Zaznacz odpowiedź.');
          return;
        }
        revealed[step] = true;
        syncOutcome();
        updateButtons();
      });

      nextBtn?.addEventListener('click', () => {
        if (!revealed[step]) return;
        if (step < total - 1) {
          step += 1;
          renderStep();
        } else {
          showResult();
        }
      });
    }

    function showResult() {
      let matches = 0;
      let comparable = 0;

      for (let i = 0; i < questions.length; i++) {
        const theirIndex = Number.isInteger(theirs[i]) ? theirs[i] : null;
        const yourIndex = picked[i];
        if (theirIndex == null || yourIndex == null) continue;
        comparable += 1;
        if (theirIndex === yourIndex) matches += 1;
      }

      const ratio = comparable ? (matches / comparable) : 0;
      const rawScore = comparable ? U.pct(ratio) : 0;
      const roundedUpTo5 = Math.min(100, Math.ceil(rawScore / 5) * 5);
      const canShowContact = roundedUpTo5 >= 75;
      const skippedByThem = questions.length - comparable;
      const skippedWord = skippedByThem === 1 ? 'pytanie'
        : (skippedByThem >= 2 && skippedByThem <= 4 ? 'pytania' : 'pytań');

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
            ${skippedByThem > 0 ? `
              <div class="muted" style="margin-top:6px">
                Wynik policzono na podstawie ${comparable} odpowiedzi. ${U.escapeHtml(name)} pominął/pominęła ${skippedByThem} ${skippedWord}.
              </div>` : ''
            }
            <div class="grid" style="gap:10px; margin-top:12px">
              ${questions.map((qq, i) => {
                const theirIndex = Number.isInteger(theirs[i]) ? theirs[i] : null;
                const yourIndex = picked[i];
                const ok = theirIndex != null && theirIndex === yourIndex;
                const statusText = theirIndex == null
                  ? 'ℹ︎ Brak odpowiedzi'
                  : ok ? '✔︎ Zgodne' : '✖︎ Różne';
                const color = theirIndex == null
                  ? 'var(--accent)'
                  : ok ? 'var(--ok)' : 'var(--bad)';
                const theirText = theirIndex == null ? '—' : qq.a[theirIndex] ?? '—';
                const yourText = yourIndex == null ? '—' : qq.a[yourIndex] ?? '—';
                return `
                  <div class="row small mono">
                    <div style="width:20px">${i + 1}.</div>
                    <div class="muted">${U.escapeHtml(qq.q)}</div>
                    <div class="mono" style="margin-left:6px">
                      <span style="color:${color}">${statusText}</span>
                      <span class="muted"> — Ty: ${U.escapeHtml(yourText)} | ${U.escapeHtml(name)}: ${U.escapeHtml(theirText)}</span>
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

    if (!total) {
      app.innerHTML = `
        <div class="card">
          <div class="title">Match Quiz</div>
          <div>Brak pytań do wyświetlenia.</div>
        </div>`;
      return;
    }

    renderStep();
  }

  window.Game = { viewGame };
})();