/* BekaWpigułce — strona rankingu (ranking.html). Wymaga: shell.js, ranking.js. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = Rank.esc;
  const medal = p => p === 1 ? '🥇' : p === 2 ? '🥈' : p === 3 ? '🥉' : p;

  if (!Rank.ready) {
    $('#rkMe').innerHTML = `<div class="card center" style="padding:34px">
      <div style="font-size:2.4rem">🔧</div><p style="font-weight:600;margin-top:8px">Rankingi uruchamiamy lada chwila.</p>
      <p class="muted">Już teraz zbieraj serię dni i rób zadania dnia na stronie głównej.</p></div>`;
    $('#rkList').innerHTML = '';
    return;
  }

  function rows(list, valKey, unit) {
    if (!list.length) return `<li class="rk-empty muted">Jeszcze nikt tu nie punktował. Bądź pierwszy! 🚀</li>`;
    const me = Rank.profile && Rank.profile.nick;
    return list.map(r => `<li class="rk-row${me && r.nick === me ? ' is-me' : ''}">
      <span class="rk-pos">${medal(r.pos)}</span><span class="rk-av">${esc(r.avatar)}</span>
      <span class="rk-nick">${esc(r.nick)}</span><b class="rk-pts">${Number(r[valKey]).toLocaleString('pl-PL')} ${unit}</b></li>`).join('');
  }

  async function renderMe() {
    await Rank.whenReady;
    const box = $('#rkMe');
    if (!Rank.profile) {
      box.innerHTML = `<div class="welcome-card">
        <span class="eyebrow">Dołącz do gry</span>
        <h2 class="sec-h" style="margin:6px 0 8px">Załóż konto i walcz o Mistrza tygodnia</h2>
        <p class="muted">Konto jest darmowe. Publicznie widać tylko Twój nick i punkty.</p>
        <div class="row" style="gap:10px;flex-wrap:wrap;margin-top:12px">
          <button class="btn" id="rkJoin">Załóż konto</button><button class="btn btn--ghost" id="rkLogin">Mam konto</button>
        </div></div>`;
      box.querySelector('#rkJoin').onclick = () => Rank.openAuth('register');
      box.querySelector('#rkLogin').onclick = () => Rank.openAuth('login');
      return;
    }
    const s = await Rank.myStats() || {};
    box.innerHTML = `<div class="rk-me">
      <div class="rk-me-h"><span class="rk-av big">${esc(Rank.profile.avatar)}</span><div><b>${esc(Rank.profile.nick)}</b>
        <span class="muted micro">miejsce w tym tygodniu: <b style="color:var(--yellow)">${s.rank_week || '—'}</b> z ${s.players || '—'}</span></div></div>
      <div class="rk-me-stats">
        <div class="stat"><b>${s.today || 0}</b><span>pkt dziś</span></div>
        <div class="stat"><b>${s.week || 0}</b><span>pkt w tygodniu</span></div>
        <div class="stat"><b>${s.all || 0}</b><span>pkt łącznie</span></div>
      </div></div>`;
  }

  let period = 'week';
  async function renderList() {
    $('#rkList').innerHTML = '<li class="rk-empty muted">Ładowanie…</li>';
    $('#rkList').innerHTML = rows(await Rank.leaderboard(period, 50), 'pts', 'pkt');
  }
  $('#rkTabs').querySelectorAll('.fchip').forEach(b => b.onclick = () => {
    $('#rkTabs').querySelectorAll('.fchip').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); period = b.dataset.p; renderList();
  });

  async function renderTourney() {
    const g = Rank.gameOfWeek();
    const list = await Rank.gameBoard(g.code, 20);
    $('#rkTourney').innerHTML = `
      <div class="sec-head"><h2 class="sec-h">Turniej tygodnia: <span class="ac">${esc(g.name)}</span></h2>
        <a class="sec-link" href="rozrywka.html?gra=${encodeURIComponent(g.code)}">Zagraj →</a></div>
      <p class="muted" style="margin:-6px 0 12px">Liczy się Twój najlepszy wynik od poniedziałku. W niedzielę o północy zwycięzca zostaje Mistrzem tygodnia, a w poniedziałek startuje nowa gra.</p>
      <ol class="rk-list">${rows(list, 'best', 'pkt')}</ol>`;
  }

  async function renderChamps() {
    const w = await Rank.lastWeek();
    if (!w.length) return;
    const box = $('#rkChamps'); box.hidden = false;
    box.innerHTML = `<div class="card"><span class="eyebrow">Mistrzowie poprzedniego tygodnia</span>
      <div class="rk-podium">${w.map(r => `<div><span>${medal(r.pos)}</span><b>${esc(r.avatar)} ${esc(r.nick)}</b><span class="muted micro">${r.pts} pkt</span></div>`).join('')}</div></div>`;
  }

  renderMe(); renderList(); renderTourney(); renderChamps();
  Rank.onChange(() => { renderMe(); renderList(); });
})();
