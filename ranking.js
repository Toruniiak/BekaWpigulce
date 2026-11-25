/* ============================================================================
   BekaWpigułce — KONTA, PUNKTY, RANKINGI  (ranking.js)
   ----------------------------------------------------------------------------
   Globalny obiekt `Rank` (backend: Supabase, schemat w supabase/ranking.sql):
     • Rank.openAuth()            — okno logowania / rejestracji (e-mail + hasło + nick)
     • Rank.award(kind, ref, val) — punkty: visit / task / game / quiz (liczy SERWER)
     • Rank.submitScore(gra, pkt) — najlepszy wynik w turnieju tygodnia
     • Rank.leaderboard(okres), Rank.gameBoard(gra), Rank.myStats(), Rank.lastWeek()
     • Rank.gameOfWeek()          — gra turnieju bieżącego tygodnia (ta sama dla wszystkich)
   Gdy supabase-config.js jest pusty, wszystko działa „na sucho" (Rank.ready = false).
   ========================================================================== */
const Rank = (() => {
  'use strict';
  const cfg = window.__BWP_SUPABASE__ || {};
  const ready = !!(cfg.url && cfg.anonKey && window.supabase && window.supabase.createClient);
  const sb = ready ? window.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'bkw_sb_auth' }
  }) : null;

  const SCORE_GAMES = ['bloki', 'g2048', 'snake', 'runner', 'lap', 'reflex', 'simon'];
  const GAME_NAMES = { bloki: 'Bloki 10×10', g2048: '2048', snake: 'Wężyk', runner: 'Motorek', lap: 'Złap Mema', reflex: 'Klikolot', simon: 'Powtórz sekwencję' };
  const esc = s => String(s == null ? '' : s).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

  let profile = null;            // { nick, avatar } zalogowanego
  const listeners = [];
  const emit = () => listeners.forEach(fn => { try { fn(profile); } catch (e) { /* nic */ } });

  /* ---- sesja ----------------------------------------------------------- */
  async function loadProfile() {
    if (!sb) return null;
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { profile = null; return null; }
    const { data } = await sb.from('profiles').select('nick,avatar').eq('id', session.user.id).maybeSingle();
    profile = data || { nick: (session.user.user_metadata || {}).nick || 'gracz', avatar: '🙂' };
    return profile;
  }
  const whenReady = ready ? loadProfile().catch(() => null) : Promise.resolve(null);
  if (sb) sb.auth.onAuthStateChange((ev) => {
    if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT' || ev === 'USER_UPDATED') loadProfile().then(() => { emit(); renderChip(); });
  });

  /* ---- punkty ---------------------------------------------------------- */
  async function award(kind, ref = '', value = 0) {
    if (!sb) return 0;
    await whenReady;
    if (!profile) return 0;
    const { data, error } = await sb.rpc('award', { p_kind: kind, p_ref: ref, p_value: value | 0 });
    if (error || !data) return 0;
    if (typeof UI !== 'undefined') UI.toast(`+${data} pkt do rankingu 🏅`, 'ok', 1600);
    return data;
  }
  async function submitScore(game, score) {
    if (!sb || !SCORE_GAMES.includes(game)) return 0;
    await whenReady;
    if (!profile) return 0;
    const { data } = await sb.rpc('submit_score', { p_game: game, p_score: Math.floor(score) | 0 });
    return data || 0;
  }

  /* ---- odczyty --------------------------------------------------------- */
  const rpc = async (fn, args) => { if (!sb) return []; const { data, error } = await sb.rpc(fn, args); return error ? [] : (data || []); };
  const leaderboard = (period = 'week', limit = 50) => rpc('leaderboard', { p_period: period, p_limit: limit });
  const gameBoard = (game, limit = 20) => rpc('game_leaderboard', { p_game: game, p_limit: limit });
  const lastWeek = () => rpc('last_week_winners', { p_limit: 3 });
  async function myStats() { await whenReady; if (!profile) return null; const r = await rpc('my_stats', {}); return Array.isArray(r) ? null : r; }

  /* Gra turnieju: zależna od numeru tygodnia (pon.–niedz.), identyczna u wszystkich. */
  function gameOfWeek() {
    const d = new Date(); const day = (d.getDay() + 6) % 7; d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - day);
    const wk = Math.round(d.getTime() / (7 * 864e5));
    const code = SCORE_GAMES[((wk % SCORE_GAMES.length) + SCORE_GAMES.length) % SCORE_GAMES.length];
    return { code, name: GAME_NAMES[code] };
  }

  /* ---- logowanie / rejestracja ---------------------------------------- */
  function openAuth(mode = 'login') {
    if (typeof UI === 'undefined') return;
    if (!ready) return UI.toast('Konta i rankingi uruchamiamy lada chwila 🔧', 'info', 3000);
    if (profile) {
      const body = UI.modal(`
        <p style="margin-bottom:14px">Zalogowano jako <b>${esc(profile.avatar)} ${esc(profile.nick)}</b>.</p>
        <div class="row" style="gap:10px;flex-wrap:wrap">
          <a class="btn" href="ranking.html">Mój ranking 🏆</a>
          <button class="btn btn--ghost" id="rkOut">Wyloguj</button>
        </div>`, { title: '👤 Twoje konto' });
      body.querySelector('#rkOut').onclick = async () => { await sb.auth.signOut(); UI.closeModal(); UI.toast('Wylogowano', 'info'); };
      return;
    }
    const reg = mode === 'register';
    const body = UI.modal(`
      <div class="row" style="gap:8px;margin-bottom:14px">
        <button class="fchip ${reg ? '' : 'on'}" data-m="login">Logowanie</button>
        <button class="fchip ${reg ? 'on' : ''}" data-m="register">Załóż konto</button>
      </div>
      ${reg ? `<div class="field"><label>Nick w rankingu (3–20 znaków)</label><input id="rkNick" maxlength="20" placeholder="np. MistrzBeki"></div>` : ''}
      <div class="field"><label>E-mail</label><input id="rkMail" type="email" autocomplete="email" placeholder="ty@example.com"></div>
      <div class="field"><label>Hasło${reg ? ' (min. 8 znaków)' : ''}</label><input id="rkPass" type="password" autocomplete="${reg ? 'new-password' : 'current-password'}"></div>
      <button class="btn btn--block" id="rkGo">${reg ? 'Załóż konto i graj o ranking' : 'Zaloguj'}</button>
      <p class="micro muted" style="margin-top:10px">Publicznie widać tylko nick i punkty. E-mail służy wyłącznie do logowania.</p>
      ${reg ? '' : '<button class="btn btn--ghost btn--sm" id="rkReset" style="margin-top:6px">Nie pamiętam hasła</button>'}`,
      { title: reg ? '🏆 Dołącz do rankingu' : '🔑 Zaloguj się' });
    body.querySelectorAll('[data-m]').forEach(b => b.onclick = () => openAuth(b.dataset.m));
    const go = body.querySelector('#rkGo');
    go.onclick = async () => {
      const mail = body.querySelector('#rkMail').value.trim(), pass = body.querySelector('#rkPass').value;
      if (!/^\S+@\S+\.\S+$/.test(mail)) return UI.toast('Podaj poprawny e-mail', 'err');
      go.disabled = true;
      try {
        if (reg) {
          const nick = body.querySelector('#rkNick').value.trim();
          if (!/^[A-Za-z0-9_.ąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]{3,20}$/.test(nick)) throw new Error('Nick: 3–20 znaków (litery, cyfry, spacja, _ . -)');
          if (pass.length < 8) throw new Error('Hasło musi mieć min. 8 znaków');
          const { data: free } = await sb.rpc('nick_available', { p_nick: nick });
          if (free === false) throw new Error('Ten nick jest już zajęty');
          const { data, error } = await sb.auth.signUp({ email: mail, password: pass, options: { data: { nick }, emailRedirectTo: location.origin + '/ranking.html' } });
          if (error) throw error;
          UI.closeModal();
          if (data.session) { UI.toast(`Witaj w rankingu, ${nick}! 🎉`, 'ok', 3000); award('visit'); }
          else UI.toast('Sprawdź skrzynkę e-mail i kliknij link aktywacyjny 📬', 'info', 5000);
        } else {
          const { error } = await sb.auth.signInWithPassword({ email: mail, password: pass });
          if (error) throw error;
          UI.closeModal(); UI.toast('Zalogowano 👋', 'ok'); award('visit');
        }
      } catch (err) {
        const m = String(err.message || err);
        UI.toast(/Invalid login/.test(m) ? 'Zły e-mail lub hasło' : /registered/.test(m) ? 'Ten e-mail ma już konto — zaloguj się' : m, 'err', 3500);
      } finally { go.disabled = false; }
    };
    const rs = body.querySelector('#rkReset');
    if (rs) rs.onclick = async () => {
      const mail = body.querySelector('#rkMail').value.trim();
      if (!/^\S+@\S+\.\S+$/.test(mail)) return UI.toast('Wpisz najpierw e-mail', 'err');
      await sb.auth.resetPasswordForEmail(mail, { redirectTo: location.origin + '/ranking.html' });
      UI.toast('Wysłaliśmy link do zmiany hasła 📬', 'info', 4000);
    };
  }

  /* ---- przycisk konta w menu ------------------------------------------ */
  function renderChip() {
    const chip = document.getElementById('userChip');
    if (!chip || !ready) return;
    chip.textContent = profile ? `${profile.avatar} ${profile.nick}` : 'Zaloguj / Ranking';
    chip.classList.toggle('chip--ghost', !profile);
    chip.onclick = () => openAuth();
  }
  document.addEventListener('DOMContentLoaded', () => { whenReady.then(renderChip); });

  return {
    ready, award, submitScore, leaderboard, gameBoard, lastWeek, myStats, gameOfWeek, openAuth,
    onChange: fn => listeners.push(fn), get profile() { return profile; }, whenReady, SCORE_GAMES, GAME_NAMES, esc
  };
})();
