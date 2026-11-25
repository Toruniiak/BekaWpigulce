/* ============================================================================
   BekaWpigułce — CODZIENNE POWROTY  (codziennie.js)
   ----------------------------------------------------------------------------
   Sekcja „Dziś na BekaWpigułce" na stronie głównej:
     • seria dni z rzędu (🔥) + rekord, odznaki za 3 / 7 / 30 dni,
     • 4 zadania dnia (zagadka, quiz, gra, rolka) wybierane DETERMINISTYCZNIE
       z daty — każdy odwiedzający ma tego dnia to samo, jutro coś nowego,
     • licznik „nowe od Twojej ostatniej wizyty",
     • odliczanie do nowych zadań (północ),
     • tygodniowy kalendarz wydarzeń (dzisiejsze podświetlone).
   Wszystko lokalnie w przeglądarce (strona statyczna, bez kont na serwerze).
   Wymaga: db.js, shell.js, cards.js. Host: <section id="daily">.
   ========================================================================== */
(() => {
  'use strict';
  const host = document.getElementById('daily');
  if (!host || typeof DB === 'undefined') return;
  const e = DB.util.esc;

  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = dayKey();
  const dayNo = Math.floor(new Date(today + 'T12:00:00').getTime() / 864e5); // numer dnia (lokalnie)
  const pick = (list, salt) => list.length ? list[(dayNo * 7919 + salt * 104729) % list.length] : null;
  const ls = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (x) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (x) { /* brak localStorage */ } }
  };

  /* ---- seria dni z rzędu ---------------------------------------------- */
  const st = ls.get('bwp_streak', { last: '', count: 0, best: 0, days: 0 });
  const prevVisit = ls.get('bwp_last_visit', null);
  if (st.last !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    st.count = st.last === dayKey(y) ? st.count + 1 : 1;
    st.best = Math.max(st.best || 0, st.count);
    st.days = (st.days || 0) + 1;
    st.last = today;
    ls.set('bwp_streak', st);
  }
  ls.set('bwp_last_visit', new Date().toISOString());
  const nextBadge = [3, 7, 14, 30, 100].find(n => n > st.count);

  /* ---- nowe od ostatniej wizyty --------------------------------------- */
  const fresh = prevVisit
    ? DB.memes.approved().filter(m => m.created_at > prevVisit).length + DB.videos.all().filter(v => v.created_at > prevVisit).length
    : 0;

  /* ---- zadania dnia ---------------------------------------------------- */
  const riddles = DB.memes.approved().filter(m => m.category === 'zagadki' && m.source === 'facebook');
  const riddle = pick(riddles, 1);
  const quiz = pick(DB.quizzes.all(), 2);
  const games = DB.games.enabled().filter(g => g.code !== 'ubieranka');
  const game = pick(games, 3);
  const reel = pick(DB.videos.all().filter(v => v.source === 'facebook' && (v.length || 0) >= 20), 4);

  const done = ls.get('bwp_daily_done', {});
  if (done.day !== today) { done.day = today; done.items = {}; }
  if (window.Rank) Rank.award('visit');
  const mark = (k) => {
    if (window.Rank) Rank.award('task', k);
    if (done.items[k]) return;
    done.items[k] = 1; ls.set('bwp_daily_done', done);
    const n = Object.keys(done.items).length;
    if (n === 4) {
      const full = ls.get('bwp_full_days', 0) + 1; ls.set('bwp_full_days', full);
      UI.toast('Dzień zaliczony! 🏆 Wszystkie 4 zadania zrobione.', 'ok', 3200);
    }
  };

  const tasks = [
    riddle && { k: 'zagadka', ico: '🧩', h: 'Zagadka dnia', t: (riddle.caption || '').split('\n')[0].slice(0, 80),
      img: riddle.image, href: riddle.source_fb, ext: true, cta: 'Odpowiedz na FB ↗' },
    quiz && { k: 'quiz', ico: '🧠', h: 'Quiz dnia', t: quiz.title, href: 'rozrywka.html?quiz=' + encodeURIComponent(quiz.id), cta: 'Rozwiąż quiz →' },
    game && { k: 'gra', ico: '🎮', h: 'Gra dnia', t: game.name + ' — pobij swój rekord', href: 'rozrywka.html?gra=' + encodeURIComponent(game.code), cta: 'Zagraj →' },
    reel && { k: 'rolka', ico: '🎬', h: 'Rolka dnia', t: reel.title, img: reel.thumb, video: reel.id, cta: 'Obejrzyj ▶' }
  ].filter(Boolean);

  /* ---- kalendarz tygodnia --------------------------------------------- */
  const WEEK = [
    { d: 'Pon', n: 'Zagadkowy poniedziałek', i: '🧩', href: 'odpowiedzi.html' },
    { d: 'Wt', n: 'Quizowy wtorek', i: '🧠', href: 'rozrywka.html#quizy' },
    { d: 'Śr', n: 'Środa z PRL-em', i: '📻', href: 'memy.html?cat=nostalgia' },
    { d: 'Czw', n: 'Turniej gry tygodnia', i: '🏆', href: 'ranking.html' },
    { d: 'Pt', n: 'Piątkowe rolki', i: '🎬', href: 'filmy.html' },
    { d: 'Sob', n: 'Sobotni top memów', i: '🔥', href: 'memy.html?sort=top' },
    { d: 'Nd', n: 'Niedziela z rodziną', i: '👨‍👩‍👧', href: 'memy.html?cat=rodzina' }
  ];
  const wd = (new Date().getDay() + 6) % 7; // 0 = poniedziałek

  const dateLabel = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });

  host.innerHTML = `
    <div class="sec-head">
      <h2 class="sec-h">Dziś na <span class="ac">BekaWpigułce</span></h2>
      <span class="muted micro">${e(dateLabel)}</span>
    </div>
    <div class="daily-top">
      <div class="daily-streak" title="Rekord: ${st.best} dni · wszystkich wizyt: ${st.days}">
        <b>🔥 ${st.count}</b><span>${st.count === 1 ? 'dzień' : 'dni'} z rzędu${nextBadge ? ` · do odznaki: ${nextBadge - st.count}` : ''}</span>
      </div>
      <div class="daily-info">
        ${fresh ? `<span class="pill pill--y">🆕 ${fresh} nowych od Twojej ostatniej wizyty</span>` : ''}
        <span class="muted micro" id="dailyProgress"></span>
        <span class="muted micro">Nowe zadania za <b id="dailyCountdown">--:--:--</b></span>
      </div>
    </div>
    <div class="daily-grid">
      ${tasks.map(t => `
        <a class="daily-card" data-k="${t.k}" ${t.href ? `href="${e(t.href)}"` : 'href="#"'} ${t.ext ? 'target="_blank" rel="noopener"' : ''} ${t.video ? `data-video="${e(t.video)}"` : ''}>
          ${t.img ? `<img src="${e(t.img)}" alt="" loading="lazy">` : `<div class="daily-ico">${t.ico}</div>`}
          <div class="daily-body">
            <span class="eyebrow">${t.ico} ${e(t.h)}</span>
            <b>${e(t.t)}</b>
            <span class="daily-cta">${e(t.cta)}</span>
          </div>
          <span class="daily-check" aria-hidden="true">✓</span>
        </a>`).join('')}
    </div>
    <div class="week-strip">
      ${WEEK.map((w, i) => `
        <a class="week-day${i === wd ? ' is-today' : ''}" href="${e(w.href)}" title="${e(w.n)}">
          <span class="wd">${w.d}</span><span class="wi">${w.i}</span><span class="wn">${e(w.n)}</span>
        </a>`).join('')}
    </div>`;

  function refreshDone() {
    host.querySelectorAll('.daily-card').forEach(c => c.classList.toggle('is-done', !!done.items[c.dataset.k]));
    const n = Object.keys(done.items).length;
    const p = host.querySelector('#dailyProgress');
    if (p) p.textContent = `Zadania dnia: ${n}/${tasks.length}` + (n >= tasks.length ? ' ✅' : '');
  }
  host.querySelectorAll('.daily-card').forEach(c => c.addEventListener('click', ev => {
    mark(c.dataset.k); refreshDone();
    if (c.dataset.video) {
      ev.preventDefault();
      const v = DB.videos.all().find(x => x.id === c.dataset.video);
      if (v) Cards.playVideo(v);
    }
  }));
  refreshDone();

  const cd = host.querySelector('#dailyCountdown');
  const tick = () => {
    const now = new Date(), mid = new Date(now); mid.setHours(24, 0, 0, 0);
    const s = Math.max(0, Math.floor((mid - now) / 1000));
    cd.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
    if (s === 0) setTimeout(() => location.reload(), 1500);
  };
  tick(); setInterval(tick, 1000);

  /* ---- mini-ranking tygodnia + zaproszenie do rywalizacji ------------- */
  if (window.Rank && Rank.ready) {
    const box = document.createElement('div');
    box.className = 'home-rank';
    host.appendChild(box);
    const g = Rank.gameOfWeek();
    Promise.all([Rank.leaderboard('week', 5), Rank.whenReady]).then(([top]) => {
      const me = Rank.profile;
      box.innerHTML = `
        <div class="sec-head" style="margin-bottom:10px"><h3 class="card-h">🏆 Top 5 tygodnia</h3>
          <a class="sec-link" href="ranking.html">Pełny ranking →</a></div>
        <ol class="rk-list">${top.length ? top.map(r => `<li class="rk-row${me && r.nick === me.nick ? ' is-me' : ''}">
          <span class="rk-pos">${r.pos === 1 ? '🥇' : r.pos === 2 ? '🥈' : r.pos === 3 ? '🥉' : r.pos}</span>
          <span class="rk-av">${e(r.avatar)}</span><span class="rk-nick">${e(r.nick)}</span><b class="rk-pts">${r.pts} pkt</b></li>`).join('')
          : '<li class="rk-empty muted">Ranking dopiero rusza — zgarnij pierwsze miejsce! 🚀</li>'}</ol>
        <p class="muted micro" style="margin-top:8px">Turniej tygodnia: <b>${e(g.name)}</b>. Punkty za wizyty, zadania dnia, quizy i gry.</p>
        ${me ? '' : '<button class="btn btn--sm" id="homeJoin" style="margin-top:8px">Załóż konto i walcz o Mistrza tygodnia</button>'}`;
      const j = box.querySelector('#homeJoin'); if (j) j.onclick = () => Rank.openAuth('register');
    });
  }
})();
