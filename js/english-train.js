// Тренировки английского (13.11.2026): после каждого второго урока (не контрольной). Собираются сами из двух прошлых уроков:
// слова «Запомни», задания уроков вперемешку (только ввод и выбор — без плиток), диктант по примерам (услышал → напиши),
// повторение слов более старых уроков. Только пройденное. Не входят в дневной лимит.
// Прогресс: Store.get().ent[id] = {best, times, date}; id = номер урока, после которого стоит тренировка.
const ENP = (() => {
  const S0 = () => { const S = Store.get(); S.ent = S.ent || {}; return S; };
  const plain = () => EN.lessons().filter((l) => !l.check);
  // список тренировок: после 2-го, 4-го, … обычного урока
  const list = () => { if (!window.EN_I) return []; const P = plain(), out = [];
    for (let i = 1; i < P.length; i += 2) out.push({ id: P[i].n, sec: P[i].sec, from: [P[i - 1].n, P[i].n], t: `${P[i - 1].t.split(":")[0]} + ${P[i].t.split(":")[0]}`, s: "слова, задания вперемешку и диктант по двум прошлым урокам" });
    return out; };
  const tinfo = (id) => list().find((t) => t.id === +id);
  const tdone = (id) => ((S0().ent[id] || {}).times || 0) > 0;
  const isOpen = (id) => { const T = tinfo(id); if (!T || !EN.done(T.id)) return false; const prev = list().filter((x) => x.id < T.id).pop(); return !prev || tdone(prev.id); };
  const nextBefore = (n) => list().find((t) => t.id < n && !tdone(t.id) && isOpen(t.id)) || null;
  const after = (n) => list().filter((t) => t.id === n);
  const row = (T, cur) => { const open = isOpen(T.id), d = tdone(T.id);
    return `<${open ? "a" : "div"} class="card lrow frtr${cur ? " cur" : ""}${open ? "" : " lockd"}"${open ? ` href="#/ант/${T.id}"` : ""}><span class="ln">${open ? "🏋" : "🔒"}</span>
      <span class="lt"><b>Тренировка: ${esc(T.t)}</b><small>${esc(T.s)}</small></span><span class="lst">${d ? "✓" : cur ? "▶" : ""}</span></${open ? "a" : "div"}>`; };

  function page(args) {
    const T = tinfo(args[0]);
    if (!T) return `<div class="card soon"><h2>Такой тренировки нет</h2><a class="btn gold" href="#/английский">К урокам</a></div>`;
    if (!isOpen(T.id)) return `<div class="card soon nokeep"><div class="ic">🔒</div><h2>Тренировка пока закрыта</h2><p class="muted">Она откроется, когда пройдёшь урок ${EN.num(T.id)} и прошлые тренировки.</p><a class="btn gold" href="#/английский">К урокам</a></div>`;
    return Board.wrap(`<div id="entr"><div class="card muted">Собираю тренировку…</div></div>`);
  }
  async function bind(args) {
    const T = tinfo(args[0]); if (!T || !$("#entr")) return; Board.bind();
    const Ls = await Promise.all(EN.lessons().filter((l) => l.n <= T.id).map((l) => EN.load(l.n).catch(() => null)));
    const A = T.from.map((n) => EN_C[n]).filter(Boolean);
    const sh = AltT.shuffle, fix = (t) => Object.assign({ rq: t.why }, t, { lang: t.lang || (t.opts ? "x" : "en") });
    const mem = sh(A.flatMap((L) => EN.memItems(L))).slice(0, 5);
    const tasks = sh(A.flatMap((L) => (L.tasks || []).filter((t) => t.k !== "tiles"))).slice(0, 8).map(fix);
    const exs = sh(A.flatMap((L) => ["sut", "prosto"].flatMap((f) => String(L[f] || "").split("\n").map(EN.exParse).filter(Boolean))).filter((e) => !/[«»…]/.test(e.fr)));
    const dict = exs.slice(0, 4).map((e) => ({ k: "input", lsn: "dict", sec: T.sec, say: e.fr, q: "Послушай и напиши, что услышал", a: [e.fr], lang: "en", why: `«${e.fr}» — ${e.ru}`, rq: `«${e.fr}» — ${e.ru}` }));
    const older = Ls.filter((L) => L && !T.from.includes(L.n) && (L.words || []).length);
    const rev = sh(older.flatMap((L) => L.words.map((w) => [...w, L.n]))).slice(0, 4).map(([w, m, r, k], i) => i % 2
      ? { k: "input", lang: "en", q: `Напиши по-английски: «${m}»`, a: [w], why: `${w} — ${m} (урок ${EN.num(k)})`, hint: `читается «${r}»` }
      : { k: "listen", say: w, q: "Что значит прозвучавшее слово?", opts: sh([m, ...sh(older.flatMap((L) => L.words.map((x) => x[1])).filter((x) => x !== m)).slice(0, 2)]), a: m, lang: "x", why: `${w} — ${m}` });
    const items = [...mem, ...tasks, ...dict, ...rev];
    $("#entr").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/английский">← Все уроки</a><span class="muted">после урока ${EN.num(T.id)}</span></div>
      <div class="k">🇬🇧 Тренировка</div><h1 class="page">${esc(T.t)}</h1><p class="lead">Повторяем два прошлых урока: слова, задания вперемешку и диктант — услышал, напиши. Новых правил нет.</p>
      <div class="c2prog"><i id="entbar"></i></div><div class="alt-qs" id="entq"></div><div id="entend"></div>`;
    window.__enCur = { items };
    let done = 0, first = 0;
    AltT.mount($("#entq"), items, { bonus: true, onAnswer: (it, f, ok) => { done++; if (f && ok) first++; $("#entbar").style.width = Math.round(done / items.length * 100) + "%";
      if (done < items.length) return;
      const pct = Math.round(first / items.length * 100), S = S0(), o = S.ent[T.id] || { best: 0, times: 0 }, pts = o.times ? 0 : 10 + first;
      S.ent[T.id] = { best: Math.max(o.best, pct), times: o.times + 1, date: new Date().toISOString().slice(0, 10) }; if (pts) Store.addPoints(pts); else Store.save();
      if (typeof ENX !== "undefined") ENX.logDay({ tasks: items.length, ok: first });
      const nx = EN.nextOf(T.id);
      $("#entend").innerHTML = `<div class="card c2res"><div class="bigstars">🏋</div><h2>Тренировка пройдена!</h2><p>С первой попытки: <b>${first} из ${items.length}</b> (${pct}%). ${pts ? `+${pts} очков ✦` : ""}</p>
        <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${nx ? `<a class="btn gold" href="#/ан/${nx.n}">Дальше: ${nx.check ? "контрольная" : "урок " + EN.num(nx.n)} ▶</a>` : ""}<a class="btn" href="#/история">🎧 Послушать историю</a></div></div>`;
      $("#entend").scrollIntoView({ behavior: "smooth", block: "center" }); } });
  }
  return { list, after, row, nextBefore, page, bind, isOpen, tdone };
})();
