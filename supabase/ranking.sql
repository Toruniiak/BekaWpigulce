-- ============================================================================
-- BekaWpigułce — konta, punkty i rankingi (Supabase / Postgres)
-- Uruchom w Supabase → SQL Editor. Skrypt jest idempotentny (można puścić ponownie).
--
-- Zasady bezpieczeństwa:
--  • klient NIGDY nie zapisuje punktów bezpośrednio — tabele mają RLS bez polityk zapisu,
--    punkty przyznają wyłącznie funkcje award()/submit_score() (security definer),
--  • punkty liczy serwer (stałe stawki, limity dzienne, unikalność dzień+rodzaj+ref),
--  • wyniki gier mają górne limity wiarygodności (strona jest statyczna, więc pełna
--    weryfikacja rozgrywki nie jest możliwa — limity ograniczają oszukiwanie),
--  • publicznie widać tylko nick, avatar i punkty — nigdy e-mail.
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  nick text not null unique
    check (char_length(nick) between 3 and 20 and nick ~ '^[A-Za-z0-9_.ąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+$'),
  avatar text not null default '🙂' check (char_length(avatar) <= 8),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select using (true);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);

create table if not exists public.points (
  user_id uuid not null references public.profiles(id) on delete cascade,
  day date not null,
  kind text not null check (kind in ('visit', 'task', 'game', 'quiz')),
  ref text not null default '',
  pts int not null check (pts between 0 and 50),
  created_at timestamptz not null default now(),
  primary key (user_id, day, kind, ref)
);
alter table public.points enable row level security;   -- brak polityk = brak bezpośredniego dostępu
create index if not exists points_day_idx on public.points (day);

create table if not exists public.game_scores (
  user_id uuid not null references public.profiles(id) on delete cascade,
  game text not null,
  week date not null,
  best int not null check (best >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, game, week)
);
alter table public.game_scores enable row level security;

-- ---------------------------------------------------------------- pomocnicze
create or replace function public.pl_today() returns date
language sql stable as $$ select (now() at time zone 'Europe/Warsaw')::date $$;

create or replace function public.pl_week() returns date
language sql stable as $$ select date_trunc('week', now() at time zone 'Europe/Warsaw')::date $$;

-- Profil zakładany automatycznie przy rejestracji (nick z metadanych, a gdy zajęty — z dopiskiem).
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare base text; n text; i int := 0;
begin
  base := coalesce(nullif(trim(new.raw_user_meta_data ->> 'nick'), ''), 'gracz');
  base := left(regexp_replace(base, '[^A-Za-z0-9_.ąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]', '', 'g'), 16);
  if char_length(base) < 3 then base := 'gracz'; end if;
  n := base;
  while exists (select 1 from profiles where lower(nick) = lower(n)) loop
    i := i + 1; n := base || (floor(random() * 900) + 100)::int;
    exit when i > 20;
  end loop;
  insert into profiles (id, nick) values (new.id, n) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.nick_available(p_nick text) returns boolean
language sql stable security definer set search_path = public as $$
  select not exists (select 1 from profiles where lower(nick) = lower(trim(p_nick)))
$$;

-- ---------------------------------------------------------------- punkty
-- visit: 10 pkt raz dziennie · task: 5 pkt za każde z 4 zadań dnia · game: 5 pkt raz dziennie
-- za każdą grę · quiz: 1 pkt za poprawną odpowiedź (max 15) raz dziennie za każdy quiz.
create or replace function public.award(p_kind text, p_ref text default '', p_value int default 0)
returns int language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); v int;
begin
  if uid is null or not exists (select 1 from profiles where id = uid) then return 0; end if;
  p_ref := coalesce(p_ref, '');
  if p_kind = 'visit' then v := 10; p_ref := '';
  elsif p_kind = 'task' and p_ref in ('zagadka', 'quiz', 'gra', 'rolka') then v := 5;
  elsif p_kind = 'game' and p_ref ~ '^[a-z0-9]{2,12}$' then v := 5;
  elsif p_kind = 'quiz' and p_ref ~ '^[A-Za-z0-9_-]{2,40}$' then v := least(greatest(coalesce(p_value, 0), 0), 15);
  else return 0;
  end if;
  insert into points (user_id, day, kind, ref, pts) values (uid, pl_today(), p_kind, p_ref, v)
    on conflict do nothing;
  if not found then return 0; end if;
  return v;
end $$;

-- Najlepszy wynik w grze w bieżącym tygodniu (turniej tygodnia). Limity wiarygodności per gra.
create or replace function public.submit_score(p_game text, p_score int)
returns int language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); cap int;
begin
  if uid is null or not exists (select 1 from profiles where id = uid) then return 0; end if;
  cap := case p_game when 'lap' then 400 when 'reflex' then 150 when 'snake' then 400 when 'runner' then 50000
                     when 'bloki' then 20000 when 'g2048' then 400000 when 'simon' then 60 else null end;
  if cap is null or p_score is null or p_score < 0 or p_score > cap then return 0; end if;
  insert into game_scores (user_id, game, week, best) values (uid, p_game, pl_week(), p_score)
    on conflict (user_id, game, week) do update
      set best = greatest(game_scores.best, excluded.best),
          updated_at = case when excluded.best > game_scores.best then now() else game_scores.updated_at end;
  return p_score;
end $$;

-- ---------------------------------------------------------------- rankingi (publiczne)
create or replace function public.leaderboard(p_period text default 'week', p_limit int default 50)
returns table (pos bigint, nick text, avatar text, pts bigint)
language sql stable security definer set search_path = public as $$
  select rank() over (order by sum(p.pts) desc) as pos, pr.nick, pr.avatar, sum(p.pts)::bigint as pts
  from points p join profiles pr on pr.id = p.user_id
  where case p_period
          when 'day' then p.day = pl_today()
          when 'week' then p.day >= pl_week()
          when 'month' then p.day >= date_trunc('month', pl_today())::date
          else true end
  group by pr.id, pr.nick, pr.avatar
  order by pts desc, min(p.created_at)
  limit least(greatest(p_limit, 1), 100)
$$;

create or replace function public.game_leaderboard(p_game text, p_limit int default 20)
returns table (pos bigint, nick text, avatar text, best int)
language sql stable security definer set search_path = public as $$
  select rank() over (order by g.best desc) as pos, pr.nick, pr.avatar, g.best
  from game_scores g join profiles pr on pr.id = g.user_id
  where g.game = p_game and g.week = pl_week()
  order by g.best desc, g.updated_at
  limit least(greatest(p_limit, 1), 100)
$$;

-- Zwycięzcy poprzedniego tygodnia (punkty) — do „Mistrza tygodnia" na stronie głównej.
create or replace function public.last_week_winners(p_limit int default 3)
returns table (pos bigint, nick text, avatar text, pts bigint)
language sql stable security definer set search_path = public as $$
  select rank() over (order by sum(p.pts) desc), pr.nick, pr.avatar, sum(p.pts)::bigint
  from points p join profiles pr on pr.id = p.user_id
  where p.day >= pl_week() - 7 and p.day < pl_week()
  group by pr.id, pr.nick, pr.avatar
  order by 4 desc limit least(greatest(p_limit, 1), 10)
$$;

create or replace function public.my_stats() returns json
language sql stable security definer set search_path = public as $$
  with me as (select auth.uid() as id),
  tot as (
    select user_id,
           sum(pts) filter (where day = pl_today()) as d,
           sum(pts) filter (where day >= pl_week()) as w,
           sum(pts) as a
    from points group by user_id
  )
  select json_build_object(
    'nick', (select nick from profiles where id = (select id from me)),
    'avatar', (select avatar from profiles where id = (select id from me)),
    'today', coalesce((select d from tot where user_id = (select id from me)), 0),
    'week', coalesce((select w from tot where user_id = (select id from me)), 0),
    'all', coalesce((select a from tot where user_id = (select id from me)), 0),
    'rank_week', (select 1 + count(*) from tot where coalesce(w, 0) >
                   coalesce((select w from tot where user_id = (select id from me)), 0)),
    'players', (select count(*) from profiles)
  )
$$;

-- ---------------------------------------------------------------- uprawnienia
revoke all on function public.award(text, text, int) from public, anon;
revoke all on function public.submit_score(text, int) from public, anon;
revoke all on function public.my_stats() from public, anon;
grant execute on function public.award(text, text, int) to authenticated;
grant execute on function public.submit_score(text, int) to authenticated;
grant execute on function public.my_stats() to authenticated;
grant execute on function public.leaderboard(text, int) to anon, authenticated;
grant execute on function public.game_leaderboard(text, int) to anon, authenticated;
grant execute on function public.last_week_winners(int) to anon, authenticated;
grant execute on function public.nick_available(text) to anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
