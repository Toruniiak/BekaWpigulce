/* ============================================================================
   BekaWpigułce — STRONA GŁÓWNA  (home.js)
   Wypełnia sekcje danymi z DB. Sekcje bez treści chowa, więc czysty start
   wygląda schludnie, a nie „pusto".  Wymaga: content.js, db.js, shell.js, cards.js.
   ========================================================================== */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const s = DB.settings.get();
  const hide = sel => { const el = $(sel); if (el) el.hidden = true; };

  /* --- Powitanie / zaproszenie (można zwinąć; pamiętane w przeglądarce) --- */
  (function welcome() {
    const box = $('#welcome'); if (!box) return;
    let closed = false; try { closed = localStorage.getItem('bwp_welcome_closed') === '1'; } catch (x) {}
    if (closed) { box.hidden = true; return; }
    const memes = DB.memes.approved().length, vids = DB.videos.all().length;
    const riddles = DB.memes.approved().filter(m => m.category === 'zagadki').length;
    const games = DB.games.enabled().length, quizzes = DB.quizzes.all().length;
    box.innerHTML = `
      <article class="welcome-card">
        <button class="icon-btn welcome-x" aria-label="Zwiń powitanie" title="Zwiń">✕</button>
        <span class="eyebrow">👋 Witaj na BekaWpigułce</span>
        <h2 class="sec-h" style="margin:6px 0 10px">Cała beka z naszego Facebooka w jednym miejscu</h2>
        <p class="muted">Wszystko, co wrzucamy na Facebooka, ląduje tu automatycznie kilkanaście minut po publikacji. Bez algorytmu, który chowa posty, bez szukania po tablicy.</p>
        <ul class="welcome-list">
          <li>😂 <b>${memes}</b> memów i grafik, posegregowanych w kategorie (PRL, auta, rodzina, praca…)</li>
          <li>🎬 <b>${vids}</b> rolek i filmów do obejrzenia od ręki</li>
          <li>🧩 <b>${riddles}</b> zagadek, a do tego <b>${quizzes}</b> quizów i <b>${games}</b> gier z rekordami i osiągnięciami</li>
          <li>🔥 Codziennie nowe zadania: zagadka, quiz, gra i rolka dnia. Wracaj i nie przerywaj serii!</li>
        </ul>
        <div class="row" style="gap:10px;flex-wrap:wrap;margin-top:14px">
          <a class="btn" href="#daily">Zobacz zadania na dziś</a>
          <a class="btn btn--ghost" href="${DB.util.esc(s.fb_page_url)}" target="_blank" rel="noopener">Obserwuj na Facebooku</a>
        </div>
      </article>`;
    box.querySelector('.welcome-x').onclick = () => { box.hidden = true; try { localStorage.setItem('bwp_welcome_closed', '1'); } catch (x) {} };
  })();

  /* --- Licznik fanów: fb-stats.js (aktualizowany automatycznie z Facebooka) --- */
  function fansLabel() {
    const n = (window.__BWP_STATS__ || {}).followers;
    if (!n) return '15 tys.+';
    if (n >= 1e6) return (n / 1e6).toLocaleString('pl-PL', { maximumFractionDigits: 1 }) + ' mln';
    if (n >= 1e4) return (n / 1e3).toLocaleString('pl-PL', { maximumFractionDigits: 1 }) + ' tys.';
    return n.toLocaleString('pl-PL');
  }

  /* --- Hero: liczby --- */
  const st = DB.stats();
  $('#heroStats').innerHTML = [
    [st.memes_approved, 'grafik i memów'],
    [st.votes_total.toLocaleString('pl-PL'), 'głosów'],
    [st.videos, 'rolek i filmów'],
    [fansLabel(), 'obserwujących na FB']
  ].map(x => `<div class="stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');

  /* --- Facebook: link + wtyczka + przycisk „Obserwuj" --- */
  $('#fbLink').href = s.fb_page_url;
  $('#fbPlugin').setAttribute('data-href', s.fb_page_url);
  const fbFollow = $('#fbFollow'); if (fbFollow) fbFollow.href = s.fb_page_url;
  UI.loadFacebook();

  /* --- Polecane (chowane gdy brak) --- */
  const feat = DB.memes.featured().slice(0, 4);
  const featList = feat.length ? feat : DB.memes.approved().slice(0, 4);
  if (featList.length) { const fg = $('#featuredGrid'); featList.forEach(m => fg.appendChild(Cards.meme(m))); }
  else hide('#featured');

  /* --- Odpowiedzi (lejek z FB) --- */
  const ans = DB.answers.published().slice(0, 3);
  if (ans.length) {
    $('#answers').hidden = false;
    $('#answersGrid').innerHTML = ans.map(a => `
      <a class="ans-card" href="odpowiedzi.html?a=${encodeURIComponent(a.slug)}">
        ${a.image ? `<div class="ans-thumb"><img src="${DB.util.esc(a.image)}" alt=""></div>` : `<div class="ans-thumb ans-thumb--ph">✅</div>`}
        <div class="ans-card-body">
          <span class="eyebrow">Zagadka z FB</span>
          <h3>${DB.util.esc(a.title || a.question || 'Odpowiedź')}</h3>
          <span class="ans-go">Zobacz odpowiedź →</span>
        </div></a>`).join('');
  }

  /* --- Mem dnia (chowa lewą kolumnę gdy brak; sonda zostaje) --- */
  const mod = DB.memes.memOfDay();
  if (mod) $('#memOfDay').appendChild(Cards.meme(mod));
  else { const col = document.querySelector('#memdnia .split > div:first-child'); if (col) col.style.display = 'none'; }

  /* --- Sonda --- */
  renderPoll();
  function renderPoll() {
    const p = DB.polls.main(); if (!p) { hide('#memdnia'); return; }
    $('#pollQ').textContent = p.question;
    const box = $('#pollBox');
    const my = DB.polls.myVote(p.id);
    const voted = my !== undefined;
    const total = p.options.reduce((a, o) => a + o.votes, 0) || 1;
    box.innerHTML = p.options.map((o, i) => {
      const pct = Math.round(o.votes / total * 100);
      return `<div class="poll-opt ${voted ? '' : 'unvoted'}" data-i="${i}">
        <div class="poll-bar-wrap"><div class="poll-bar" style="width:${voted ? pct : 0}%"></div>
          <div class="poll-lab"><span>${DB.util.esc(o.label)}</span><span class="pc">${voted ? pct + '%' : ''}</span></div>
        </div></div>`;
    }).join('') + `<p class="poll-hint">${voted ? 'Dzięki za głos! Razem: ' + total : 'Kliknij, żeby zagłosować'}</p>`;
    if (!voted) box.querySelectorAll('.poll-opt').forEach(opt => opt.onclick = () => {
      const r = DB.polls.vote(p.id, +opt.dataset.i);
      if (r.ok) { renderPoll(); UI.toast('Głos zapisany ✓', 'ok'); }
    });
  }

  /* --- Top memów (chowane gdy brak) --- */
  const top = DB.memes.top(5);
  if (top.length) { const tg = $('#topGrid'); top.forEach((m, i) => tg.appendChild(Cards.meme(m, { rank: i + 1 }))); }
  else hide('#top');

  /* --- Filmy (chowane gdy brak) --- */
  const vids = DB.videos.all().slice(0, 3);
  if (vids.length) { const vg = $('#videoGrid'); vids.forEach(v => vg.appendChild(Cards.video(v))); }
  else hide('#vids');

  /* --- Reakcje --- */
  renderReacts();
  function renderReacts() {
    const r = DB.reactions.get();
    const map = { fire: '🔥', wow: '😮', heart: '❤️', poop: '💩' };
    $('#reacts').innerHTML = Object.keys(map).map(k =>
      `<button class="react" data-k="${k}">${map[k]}<span class="rc">${r[k]}</span></button>`).join('');
    $('#reacts').querySelectorAll('.react').forEach(b => b.onclick = () => {
      DB.reactions.add(b.dataset.k);
      b.querySelector('.rc').textContent = DB.reactions.get()[b.dataset.k];
      b.style.transform = 'translateY(-3px) scale(1.15)';
      setTimeout(() => b.style.transform = '', 150);
    });
  }
})();
