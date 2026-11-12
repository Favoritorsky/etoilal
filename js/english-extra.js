// Английская оболочка — истории, детектив, тренажёр слуха, прогресс (13.11.2026, по просьбе пользователя: «пассивно, нет контроля,
// не видно прогресса, нет правил» → всё интерактивное).
// • Истории (#/история/ID): фраза за фразой, звук + атмосфера (фон-петли и эффекты), перевод слова по клику, выборы → разные концовки.
//   Русская подсказка — переключатель: после каждой фразы (по умолчанию) / только после трудных / без русского. Текст: сразу / после звука / скрыт.
// • Детектив (#/детектив/ID): вступление → допросы (в любом порядке) → улики в блокнот → «кто виноват» + ответ по-английски (ключевые слова).
// • Слух (#/слух): фраза звучит → печатаешь с нуля → подсветка по словам (верно / почти / ошибка / пропущено); ошибки возвращаются позже.
// • Прогресс (#/прогресс): уроки, слова, точность на слух, концовки, дела, график по дням.
// Данные: data/english/stories.js (EN_ST), data/english/detective.js (EN_DET); звук: data/en-story-audio.js (EN_SA: "голос|текст" → файл),
// фоны и эффекты — audio/en/fx/*.mp3 (tools/build_en_audio.py). Прогресс: Store.get().enSt, .enDet, .enEar, .enDay.
const ENX = (() => {
  const S0 = () => { const S = Store.get(); S.enSt = S.enSt || {}; S.enDet = S.enDet || {}; S.enEar = S.enEar || { miss: [], seen: 0 }; S.enDay = S.enDay || {}; S.enOpt = S.enOpt || { ru: "all", txt: "after", auto: false }; return S; };
  const today = () => { const d = new Date(Date.now() - 7.5 * 3600000); return d.toISOString().slice(0, 10); };
  function logDay(add) { const S = S0(), k = today(), d = S.enDay[k] = S.enDay[k] || {};
    for (const [a, v] of Object.entries(add)) d[a] = (d[a] || 0) + v; Store.save(); }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const VNAME = { N: "", P: "Pavel", W: "Anna", A: "📢", L: "Lina", M: "Max", K: "Kip", T: "Tom", B: "Mrs. Baker", S: "Danny", D: "Dev", G: "Glitch", R: "Rita", O: "Oscar", J: "Jake", Z: "Zoe", C: "Chef", X: "Mr. Hill", Y: "Yuki" };

  // ---------------------------------------------------------------- звук
  const fileOf = (voice, text) => (window.EN_SA || {})[voice + "|" + text];
  let cur = null, amb = null, ambName = null, stopFlag = 0;
  function play(src, rate) { return new Promise((ok) => {
    if (!src) return ok(false);
    try { cur && cur.pause(); } catch (e) {}
    const a = new Audio(src); cur = a; a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true; a.playbackRate = rate || 1;
    let done = false; const fin = (v) => { if (!done) { done = true; ok(v); } };
    const guard = setTimeout(() => fin(true), 30000);                       // страховка: запись «застряла»
    a.onloadedmetadata = () => { clearTimeout(guard); setTimeout(() => fin(true), (a.duration / (rate || 1) + 3) * 1000); };
    a.onended = () => fin(true); a.onerror = () => fin(false); a.onpause = () => { if (a.currentTime < a.duration - .05) fin(true); }; a.play().catch(() => fin(false)); }); }
  function tts(text, ru) { return new Promise((ok) => {
    if (!("speechSynthesis" in window)) return ok(false);
    const u = new SpeechSynthesisUtterance(text); u.lang = ru ? "ru-RU" : "en-US"; u.rate = ru ? 1 : .85;
    const v = speechSynthesis.getVoices().find((x) => (ru ? /^ru/i : /^en/i).test(x.lang)); if (v) u.voice = v;
    let done = false; const fin = (v) => { if (!done) { done = true; ok(v); } };
    setTimeout(() => fin(true), 1200 + text.split(" ").length * 450);      // страховка: в браузере нет голоса — onend может не прийти
    u.onend = () => fin(true); u.onerror = () => fin(false); speechSynthesis.cancel(); speechSynthesis.speak(u); }); }
  const sayEn = async (voice, text, rate) => (await play(fileOf(voice, text), rate)) || tts(text);
  const sayRu = async (voice, text) => (await play(fileOf("ru:" + voice, text))) || tts(text, true);
  function setAmb(name) {
    if (name === ambName) return; ambName = name;
    const old = amb; if (old) { let v = old.volume; const t = setInterval(() => { v -= .04; if (v <= 0) { clearInterval(t); old.pause(); } else old.volume = v; }, 60); }
    amb = null; if (!name || name === "none") return;
    const a = new Audio(`audio/en/fx/amb_${name}.mp3`); a.loop = true; a.volume = 0; amb = a; a.play().catch(() => {});
    let v = 0; const t = setInterval(() => { v += .03; if (v >= .5 || amb !== a) { clearInterval(t); if (amb === a) a.volume = .5; } else a.volume = v; }, 60);
  }
  const sfx = (name) => play(`audio/en/fx/${name}.mp3`);
  function stopAll() { stopFlag++; try { cur && cur.pause(); } catch (e) {} try { speechSynthesis.cancel(); } catch (e) {} setAmb(null); }
  window.addEventListener("hashchange", () => stopAll());

  // ---------------------------------------------------------------- перевод слова по клику
  const wordsHTML = (text) => esc(text).replace(/[A-Za-z][A-Za-z']*/g, (w) => `<span class="enw" data-w="${w.toLowerCase().replace(/'s$/, "")}">${w}</span>`);
  function gloss(w, G) {
    const g = G || {}, base = [w, w.replace(/'s$/, ""), w.replace(/s$/, ""), w.replace(/es$/, ""), w.replace(/ed$/, ""), w.replace(/d$/, ""), w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/ies$/, "y"), w.replace(/ied$/, "y")];
    for (const b of base) { if (g[b]) return g[b]; if (COMMON[b]) return COMMON[b]; }
    return null;
  }
  // самые частые слова — чтобы перевод по клику был почти у всего
  const COMMON = { "the": "(артикль: этот, тот самый)", "a": "(артикль: один, какой-то)", "an": "(артикль: один, какой-то)", "i": "я", "you": "ты, вы", "he": "он", "she": "она", "it": "оно, это", "we": "мы", "they": "они",
    "me": "меня, мне", "him": "его, ему", "her": "её, ей", "us": "нас", "them": "их, им", "my": "мой", "your": "твой, ваш", "his": "его", "its": "его (о вещи)", "our": "наш", "their": "их",
    "is": "есть (является)", "are": "есть (являются)", "am": "есть (я)", "was": "был, была", "were": "были", "be": "быть", "been": "был (бывал)", "have": "иметь; (вспомогательный)", "has": "имеет", "had": "имел", "do": "делать; (вспомогательный)", "does": "делает", "did": "сделал; (вспомогательный)",
    "not": "не", "no": "нет; никакой", "yes": "да", "and": "и", "but": "но", "or": "или", "so": "так; поэтому", "because": "потому что", "if": "если", "then": "тогда, потом", "when": "когда", "what": "что", "who": "кто", "where": "где, куда", "why": "почему", "how": "как",
    "this": "этот, это", "that": "тот, то; что (союз)", "these": "эти", "those": "те", "there": "там", "here": "здесь", "in": "в", "on": "на", "at": "у, в, на (точка)", "to": "к, в; (частица «чтобы»)", "of": "(родительный падеж) …", "for": "для; в течение", "with": "с",
    "from": "из, от", "into": "в (внутрь)", "out": "наружу, вне", "up": "вверх", "down": "вниз", "about": "о, про", "after": "после", "before": "до, перед", "again": "снова", "very": "очень", "too": "тоже; слишком", "all": "все, всё", "every": "каждый", "some": "немного, некоторые",
    "can": "мочь", "could": "мог бы; смог", "will": "(будущее время)", "would": "бы", "must": "должен", "one": "один", "two": "два", "three": "три", "first": "первый", "last": "последний", "next": "следующий", "old": "старый", "new": "новый", "small": "маленький", "big": "большой",
    "go": "идти, ехать", "went": "пошёл, поехал", "come": "приходить", "came": "пришёл", "see": "видеть", "saw": "увидел", "look": "смотреть", "looked": "посмотрел", "say": "сказать", "said": "сказал", "know": "знать", "knew": "знал", "think": "думать", "want": "хотеть",
    "get": "получить; стать", "got": "получил; стал", "take": "взять", "took": "взял", "make": "делать", "made": "сделал", "give": "дать", "gave": "дал", "find": "найти", "found": "нашёл", "tell": "сказать, рассказать", "told": "рассказал", "time": "время; раз", "day": "день", "night": "ночь",
    "now": "сейчас", "just": "просто; только что", "only": "только", "still": "всё ещё", "never": "никогда", "always": "всегда", "something": "что-то", "nothing": "ничего", "nobody": "никто", "everything": "всё", "everybody": "все", "people": "люди", "man": "мужчина", "woman": "женщина",
    "please": "пожалуйста", "sorry": "простите", "okay": "хорошо, ладно", "ok": "хорошо, ладно", "good": "хороший", "bad": "плохой", "right": "правильно; правый", "back": "назад", "away": "прочь", "like": "нравиться; как", "home": "дом (родной)", "room": "комната", "door": "дверь", "doors": "двери", "window": "окно" };
  let popEl = null; const closeGl = () => { if (popEl) { popEl.remove(); popEl = null; } };
  document.addEventListener("click", (e) => {
    const w = e.target.closest(".enw"); if (!w) { closeGl(); return; }
    const box = w.closest("[data-gl]"), G = box ? GLOSS[box.dataset.gl] : null, ph = w.closest(".enph");
    const m = gloss(w.dataset.w, G); closeGl();
    popEl = document.createElement("div"); popEl.className = "pop englpop";
    popEl.innerHTML = `<div class="ttl">${esc(w.textContent)} ${playBtn(w.textContent, 1)}</div><div>${m ? esc(m) : `<span class="muted">Нет в словарике истории.</span>`}</div>${ph && ph.dataset.ru ? `<div class="muted" style="margin-top:6px">Вся фраза: ${esc(ph.dataset.ru)}</div>` : ""}`;
    document.body.appendChild(popEl); const r = w.getBoundingClientRect();
    popEl.style.top = r.bottom + scrollY + 6 + "px"; popEl.style.left = Math.max(12, Math.min(r.left + scrollX, document.documentElement.clientWidth - popEl.offsetWidth - 12)) + "px";
    e.stopPropagation(); logDay({ looks: 1 });
  });
  const GLOSS = {};

  // ---------------------------------------------------------------- плеер сцен (общий для историй и детектива)
  // node — массив событий: ["amb", имя] · ["sfx", имя] · ["gap", сек] · [голос, en, ru, трудная?] · ["clue", id, en, ru]
  //   · ["?", en, ru, [[en, ru, куда], …]] — выбор · ["go", куда] · ["end", id, название по-русски]
  const opt = () => S0().enOpt;
  function optBar(where) {
    const o = opt();
    const seg = (k, vals) => `<span class="seg ensg" data-ok="${k}">${vals.map(([v, t]) => `<button data-ov="${v}" class="${o[k] === v ? "on" : ""}">${t}</button>`).join("")}</span>`;
    return `<div class="card enopts" data-where="${where}"><div class="enoptr"><span class="muted">🇷🇺 Русский:</span>${seg("ru", [["all", "после каждой"], ["hard", "после трудных"], ["off", "без"]])}</div>
      <div class="enoptr"><span class="muted">📝 Текст:</span>${seg("txt", [["show", "сразу"], ["after", "после звука"], ["hide", "скрыт"]])}</div>
      <div class="enoptr"><span class="muted">▶ Режим:</span>${seg("auto", [[false, "по кнопке"], [true, "подряд"]])}</div></div>`;
  }
  document.addEventListener("click", (e) => { const b = e.target.closest(".ensg [data-ov]"); if (!b) return; const k = b.closest("[data-ok]").dataset.ok, raw = b.dataset.ov;
    opt()[k] = raw === "true" ? true : raw === "false" ? false : raw; Store.save(); b.parentElement.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    if (k === "txt") document.querySelectorAll(".enph").forEach((p) => p.classList.toggle("hid", raw === "hide" || (raw === "after" && !p.dataset.heard)));
    if (k === "auto" && raw === "true" && Player.cur) Player.cur.kick(); });

  const Player = { cur: null };
  // el — контейнер ленты; story — {v, gl}; state — {node, i}; hooks: onClue, onChoice(go), onEnd(id, title), onGo(node), save()
  function mountPlayer(el, story, nodes, state, hooks) {
    const me = { busy: false, wait: null, dead: false, token: stopFlag };
    Player.cur = me;
    const feed = el.querySelector(".enfeed"), ctl = el.querySelector(".enctl");
    const alive = () => !me.dead && me.token === stopFlag && feed.isConnected;
    const ev = () => (nodes[state.node] || [])[state.i];
    function addLine(who, en, ru, hard) {
      const name = VNAME[who] || "", o = opt();
      const d = document.createElement("div"); d.className = "enline" + (who === "N" ? " nar" : " say") + (who === "A" ? " radio" : "");
      d.innerHTML = `${name ? `<span class="enwho">${esc(name)}</span>` : ""}<div class="enph${o.txt === "show" ? "" : " hid"}" data-ru="${esc(ru)}">${wordsHTML(en)}</div>
        <div class="enru" hidden>${esc(ru)}</div><div class="enlb"><button class="enrep" title="Повторить">↻</button><button class="enslow" title="Медленнее">🐢</button><button class="enrub" title="Показать перевод">RU</button></div>`;
      d.querySelector(".enrep").onclick = () => sayEn(story.v[who], en);
      d.querySelector(".enslow").onclick = () => sayEn(story.v[who], en, .75);
      d.querySelector(".enrub").onclick = () => { d.querySelector(".enru").hidden = false; d.querySelector(".enph").classList.remove("hid"); logDay({ looks: 1 }); };
      feed.appendChild(d); d.scrollIntoView({ behavior: "smooth", block: "end" });
      return d;
    }
    async function phrase(who, en, ru, hard) {
      const d = addLine(who, en, ru, hard), o = opt();
      await sayEn(story.v[who] || story.v.N, en); if (!alive()) return;
      const ph = d.querySelector(".enph"); ph.dataset.heard = 1; if (o.txt !== "hide") ph.classList.remove("hid");
      logDay({ phrases: 1 });
      if (o.ru === "all" || (o.ru === "hard" && hard)) { await sleep(1800); if (!alive()) return; d.querySelector(".enru").hidden = false; await sayRu(story.v[who] || story.v.N, ru); }
    }
    async function step() {
      if (me.busy || !alive()) return; me.busy = true; ctl.innerHTML = "";
      try {
        while (alive()) {
          const e = ev();
          if (!e) { me.busy = false; return; }
          const [k] = e;
          if (k === "amb") { setAmb(e[1]); state.i++; continue; }
          if (k === "sfx") { await sfx(e[1]); state.i++; continue; }
          if (k === "gap") { await sleep(e[1] * 1000); state.i++; continue; }
          if (k === "go") { state.node = e[1]; state.i = 0; hooks.onGo && hooks.onGo(e[1]); hooks.save(); continue; }
          if (k === "clue") { state.i++; hooks.onClue && hooks.onClue(e[1], e[2], e[3]); const d = document.createElement("div"); d.className = "enclue"; d.innerHTML = `🔎 <b>Улика в блокнот:</b> ${esc(e[3])}`; feed.appendChild(d); hooks.save(); continue; }
          if (k === "end") { state.i++; hooks.save(); await sleep(400); hooks.onEnd && hooks.onEnd(e[1], e[2]); me.busy = false; return; }
          if (k === "?") { showChoice(e); me.busy = false; return; }
          await phrase(k, e[1], e[2], !!e[3]); if (!alive()) return;
          state.i++; hooks.save();
          const nx = ev();
          if (nx && ["amb", "sfx", "gap", "go", "clue"].includes(nx[0])) continue;   // эффекты идут сами
          if (opt().auto && nx && nx[0] !== "?" && nx[0] !== "end") { await sleep(1300); if (!alive()) return; continue; }
          if (nx && nx[0] === "end") continue;
          if (nx && nx[0] === "?") continue;
          ctl.innerHTML = `<button class="btn gold enext">Дальше ▶</button><span class="muted enkb">пробел / Enter</span>`; ctl.querySelector(".enext").onclick = () => step();
          me.busy = false; return;
        }
      } finally { me.busy = false; }
    }
    function showChoice(e) {
      const [, en, ru, opts] = e, o = opt();
      const d = document.createElement("div"); d.className = "card enchoice";
      d.innerHTML = `<div class="k">Твой выбор</div><div class="enph" data-ru="${esc(ru)}"><b>${wordsHTML(en)}</b></div>${o.ru !== "off" ? `<div class="enru">${esc(ru)}</div>` : ""}
        <div class="enchs">${opts.map(([oe, orr], i) => `<button class="btn" data-ch="${i}"><span>${wordsHTML(oe)}</span>${o.ru === "all" ? `<small>${esc(orr)}</small>` : ""}</button>`).join("")}</div>`;
      feed.appendChild(d); d.scrollIntoView({ behavior: "smooth", block: "end" });
      sayEn(story.v.N, en);
      d.querySelector(".enchs").addEventListener("click", (x) => { if (x.target.closest(".enw")) return; const b = x.target.closest("[data-ch]"); if (!b) return;
        const [oe, , go] = opts[+b.dataset.ch]; d.querySelectorAll("[data-ch]").forEach((y) => { y.disabled = true; y.classList.toggle("gold", y === b); });
        logDay({ choices: 1 }); hooks.onChoice && hooks.onChoice(go); state.node = go; state.i = 0; hooks.save(); step(); });
    }
    me.kick = () => { if (!me.busy && !(ev() && ev()[0] === "?")) step(); };
    me.step = step;
    me.kill = () => { me.dead = true; };
    const kb = (x) => { if (!alive()) { document.removeEventListener("keydown", kb); return; } if ((x.key === " " || x.key === "Enter") && !/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) { x.preventDefault(); const b = ctl.querySelector(".enext"); if (b) b.click(); } };
    document.addEventListener("keydown", kb);
    return me;
  }
  // восстановить ленту до текущего места (без звука): все фразы узлов, через которые прошёл игрок
  function replayFeed(feed, story, nodes, path, state) {
    for (const [node, upto] of path) { const N = nodes[node] || [];
      for (let i = 0; i < Math.min(upto, N.length); i++) { const e = N[i];
        if (e[0] === "clue") { const d = document.createElement("div"); d.className = "enclue"; d.innerHTML = `🔎 <b>Улика:</b> ${esc(e[3])}`; feed.appendChild(d); }
        else if (!["amb", "sfx", "gap", "go", "end", "?"].includes(e[0])) { const d = document.createElement("div"); d.className = "enline old" + (e[0] === "N" ? " nar" : " say");
          d.innerHTML = `${VNAME[e[0]] ? `<span class="enwho">${esc(VNAME[e[0]])}</span>` : ""}<div class="enph" data-ru="${esc(e[2])}">${wordsHTML(e[1])}</div><div class="enru">${esc(e[2])}</div>`; feed.appendChild(d); } } }
  }

  // ---------------------------------------------------------------- истории
  const stories = () => window.EN_ST || {};
  const endCount = (St) => Object.values(St.n).flat().filter((e) => e[0] === "end").length;
  function storyPage(args) {
    const id = args[0], St = stories()[id];
    if (!St) { const S = S0();
      return `<div class="k">🇬🇧 Английский · истории</div><h1 class="page">Истории <i>со звуком</i></h1>
        <p class="lead">Слушаешь фразу за фразой: звук, атмосфера, перевод по клику на любое слово. В ключевых местах ты сам решаешь, что делать герою, — и у каждой истории несколько концовок.</p>
        <div class="enstl">${Object.entries(stories()).map(([k, s]) => { const st = S.enSt[k] || {}, ne = Object.keys(st.endings || {}).length, all = endCount(s);
          return `<a class="card enstc" href="#/история/${k}"><span class="enic">${s.ic}</span><div><b>${esc(s.t)}</b><span class="muted">${esc(s.ru)}</span><p>${esc(s.d)}</p>
            <div class="enmeta"><span>${s.lv}</span><span>концовки: ${ne} из ${all}</span><span>≈ ${s.min} мин</span>${st.node && !st.fin ? `<span class="gold">продолжить ▶</span>` : ""}</div></div></a>`; }).join("")}</div>
        <div class="card muted">Совет: в первый раз слушай с русским после каждой фразы. Когда история знакома — пройди её снова «после трудных» или «без русского» и выбери другие решения.</div>`; }
    GLOSS["st:" + id] = St.gl;
    const st = S0().enSt[id] || {}, ends = Object.keys(st.endings || {});
    return `<div class="row c2crumbs"><a class="muted" href="#/история">← Все истории</a><span class="muted">концовки: ${ends.length} из ${endCount(St)}</span></div>
      <div class="k">${St.ic} История · ${St.lv}</div><h1 class="page">${esc(St.t)}</h1><p class="lead">${esc(St.d)}</p>${optBar("st")}
      <div class="enplay" data-gl="st:${id}"><div class="enfeed"></div><div class="enctl"></div></div>`;
  }
  function storyBind(args) {
    const id = args[0], St = stories()[id]; if (!St || !$(".enplay")) return;
    stopAll();
    const S = S0(), rec = S.enSt[id] = S.enSt[id] || {}, el = $(".enplay"), feed = el.querySelector(".enfeed"), ctl = el.querySelector(".enctl");
    const startNew = () => { rec.node = St.start; rec.i = 0; rec.path = []; rec.fin = false; Store.save(); };
    const begin = (resume) => {
      feed.innerHTML = ""; ctl.innerHTML = "";
      if (!resume) startNew(); else replayFeed(feed, St, St.n, (rec.path || []).concat([[rec.node, rec.i]]), rec);
      // восстановить фон текущего узла
      const N = St.n[rec.node] || []; let a = null; for (let i = 0; i < rec.i; i++) if (N[i][0] === "amb") a = N[i][1];
      if (resume) { if (!a) for (const [nd] of (rec.path || []).slice().reverse()) { const M = St.n[nd] || []; for (const e of M) if (e[0] === "amb") a = e[1]; if (a) break; } setAmb(a); }
      const state = { get node() { return rec.node; }, set node(v) { rec.path = (rec.path || []).concat([[rec.node, rec.i]]); rec.node = v; }, get i() { return rec.i; }, set i(v) { rec.i = v; } };
      const P = mountPlayer(el, St, St.n, state, { save: () => Store.save(),
        onEnd: (eid, title) => { rec.endings = rec.endings || {}; const fresh = !rec.endings[eid]; rec.endings[eid] = title; rec.fin = true; Store.save(); setAmb(null);
          if (fresh) { Store.addPoints(15); logDay({ endings: 1 }); }
          const all = Object.values(St.n).flat().filter((e) => e[0] === "end"), got = Object.keys(rec.endings);
          ctl.innerHTML = `<div class="card c2res"><div class="bigstars">🎬</div><h2>Концовка «${esc(title)}»</h2><p>${fresh ? "Новая концовка! +15 очков ✦" : "Эту концовку ты уже находил."} Найдено: <b>${got.length} из ${all.length}</b>.</p>
            <div class="enends">${all.map((e) => `<span class="${rec.endings[e[1]] ? "on" : ""}">${rec.endings[e[1]] ? "🎬 " + esc(e[2]) : "❔ ???"}</span>`).join("")}</div>
            <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap"><button class="btn gold" id="enagain">↻ Пройти снова — другие выборы</button><a class="btn" href="#/слух/st:${id}">👂 Фразы из истории на слух</a><a class="btn" href="#/история">Другие истории</a></div></div>`;
          $("#enagain").onclick = () => begin(false); } });
      if (resume && rec.fin) { P.kill(); ctl.innerHTML = `<button class="btn gold" id="enagain">↻ Пройти снова</button>`; $("#enagain").onclick = () => begin(false); return; }
      if (!resume) P.step();
      else ctl.innerHTML = `<button class="btn gold enext">Продолжить ▶</button>`, ctl.querySelector(".enext").onclick = () => { const e = (St.n[rec.node] || [])[rec.i]; if (e && e[0] === "?") { ctl.innerHTML = ""; P.step(); } else P.step(); };
    };
    if (rec.node && !rec.fin) { ctl.innerHTML = `<div class="card"><b>Ты остановился на середине.</b><div class="row" style="gap:10px;margin-top:10px;justify-content:flex-start"><button class="btn gold" id="enres">Продолжить ▶</button><button class="btn" id="ennew">Начать сначала</button></div></div>`;
      $("#enres").onclick = () => begin(true); $("#ennew").onclick = () => begin(false); }
    else ctl.innerHTML = `<button class="btn gold enext" id="enstart">▶ Начать${rec.fin ? " снова" : ""}</button><span class="muted enkb">надень наушники — так атмосфернее</span>`, $("#enstart").onclick = () => begin(false);
  }

  // ---------------------------------------------------------------- детектив
  const cases = () => window.EN_DET || {};
  function detPage(args) {
    const id = args[0], C = cases()[id], S = S0();
    if (!C) return `<div class="k">🇬🇧 Английский · детектив</div><h1 class="page">Детектив: <i>раскрой дело</i></h1>
      <p class="lead">Слушай вступление, допрашивай подозреваемых в любом порядке, собирай улики в блокнот. Когда поймёшь — назови виновного и объясни по-английски, почему. Понял английский — раскрыл дело.</p>
      <div class="enstl">${Object.entries(cases()).map(([k, c]) => { const r = S.enDet[k] || {};
        return `<a class="card enstc" href="#/детектив/${k}"><span class="enic">${c.ic}</span><div><b>${esc(c.t)}</b><span class="muted">${esc(c.ru)}</span><p>${esc(c.d)}</p>
          <div class="enmeta"><span>${c.lv}</span><span>${r.solved ? "✅ раскрыто" : r.tries ? "попыток: " + r.tries : "не начато"}</span><span>≈ ${c.min} мин</span></div></div></a>`; }).join("")}</div>`;
    GLOSS["det:" + id] = C.gl;
    return `<div class="row c2crumbs"><a class="muted" href="#/детектив">← Все дела</a></div>
      <div class="k">${C.ic} Детектив · ${C.lv}</div><h1 class="page">${esc(C.t)}</h1><p class="lead">${esc(C.d)}</p>${optBar("det")}
      <div class="endet"><div class="enplay" data-gl="det:${id}"><div class="enfeed"></div><div class="enctl"></div></div>
      <aside class="card ennote" data-gl="det:${id}"><div class="k">📓 Блокнот</div><div id="ennotes"></div><div id="enppl"></div></aside></div>`;
  }
  function detBind(args) {
    const id = args[0], C = cases()[id]; if (!C || !$(".endet")) return;
    stopAll();
    const S = S0(), rec = S.enDet[id] = S.enDet[id] || {}, el = $(".enplay"), feed = el.querySelector(".enfeed"), ctl = el.querySelector(".enctl");
    rec.clues = rec.clues || {}; rec.asked = rec.asked || {};
    const notes = () => { $("#ennotes").innerHTML = Object.keys(rec.clues).length ? `<ol>${Object.values(rec.clues).map(([en, ru]) => `<li><span class="enph" data-ru="${esc(ru)}">${wordsHTML(en)}</span><small class="muted">${esc(ru)}</small></li>`).join("")}</ol>` : `<p class="muted">Улики появятся, когда ты их услышишь.</p>`; };
    const people = () => { $("#enppl").innerHTML = rec.intro ? `<div class="k" style="margin-top:12px">Кого допросить</div>${C.people.map((p) => `<button class="btn sm enask${rec.asked[p.id] ? " done" : ""}" data-p="${p.id}">${rec.asked[p.id] ? "✓ " : ""}${esc(p.name)} <small class="muted">${esc(p.ru)}</small></button>`).join("")}
      <button class="btn gold sm" id="ensolve" ${Object.keys(rec.asked).length ? "" : "disabled"}>🔎 Я знаю, кто это сделал</button>` : ""; };
    notes(); people();
    const run = (node, after) => { feed.innerHTML = ""; const state = { node, i: 0 };
      const P = mountPlayer(el, C, C.n, state, { save: () => Store.save(), onClue: (cid, en, ru) => { rec.clues[cid] = [en, ru]; notes(); },
        onEnd: () => { after(); } }); P.step(); };
    const intro = () => run("intro", () => { rec.intro = true; Store.save(); setAmb(null); people(); ctl.innerHTML = `<div class="card muted">Теперь выбери в блокноте, кого допросить. Порядок любой.</div>`; });
    $("#enppl").addEventListener("click", (e) => {
      const b = e.target.closest(".enask"); if (b) { const p = C.people.find((x) => x.id === b.dataset.p); stopAll(); run(p.node, () => { rec.asked[p.id] = 1; Store.save(); setAmb(null); people(); ctl.innerHTML = `<div class="card muted">Допрос окончен. Кого дальше? Или — «Я знаю, кто это сделал».</div>`; }); return; }
      if (e.target.closest("#ensolve")) { stopAll(); solve(); }
    });
    function solve() {
      const F = C.final; feed.innerHTML = ""; setAmb(null);
      ctl.innerHTML = `<div class="card ensolvec"><h2>Кто виноват?</h2><div class="enchs">${C.people.concat(F.extra || []).map((p) => `<button class="btn" data-cul="${p.id}">${esc(p.name)}</button>`).join("")}</div>
        <div id="enwhy" hidden><h3 style="margin-top:16px">${esc(F.q)}</h3><div class="muted">${esc(F.qru)} Ответь по-английски, своими словами — одним-двумя предложениями.</div>
        <div class="row alt-in"><input class="in" id="enwhyin" placeholder="Например: Because…" autocomplete="off" spellcheck="false"><button class="btn gold" id="enwhygo">Проверить</button></div><div id="enwhyfb"></div></div></div>`;
      let cul = null;
      ctl.querySelector(".enchs").onclick = (e) => { const b = e.target.closest("[data-cul]"); if (!b) return; cul = b.dataset.cul; ctl.querySelectorAll("[data-cul]").forEach((x) => x.classList.toggle("gold", x === b)); $("#enwhy").hidden = false; $("#enwhyin").focus(); };
      const check = () => {
        const v = " " + $("#enwhyin").value.toLowerCase().replace(/[^a-z' ]/g, " ") + " ", hits = F.keys.filter((alts) => alts.some((k) => v.includes(k)));
        rec.tries = (rec.tries || 0) + 1; Store.save();
        const okC = cul === F.culprit, okW = hits.length >= (F.need || F.keys.length);
        if (okC && okW) { const fresh = !rec.solved; rec.solved = true; Store.save(); if (fresh) { Store.addPoints(25); logDay({ cases: 1 }); }
          $("#enwhyfb").innerHTML = `<div class="note fixn">✓ Дело раскрыто! ${fresh ? "+25 очков ✦" : ""} Пример ответа: <b>${esc(F.sample)}</b></div>`;
          setTimeout(() => { feed.innerHTML = ""; run("outro", () => { setAmb(null); ctl.innerHTML = `<div class="card c2res"><div class="bigstars">🔎</div><h2>Дело закрыто</h2><p>Попыток: ${rec.tries}.</p><div class="row" style="justify-content:center;gap:10px"><a class="btn gold" href="#/детектив">Другие дела</a><a class="btn" href="#/слух/det:${id}">👂 Фразы из дела на слух</a></div></div>`; }); }, 2200);
          return; }
        $("#enwhyfb").innerHTML = !okC ? `<div class="note unk">Хм, не сходится. Перечитай блокнот — кто-то из подозреваемых говорит неправду. ${rec.tries >= 2 ? "Подсказка: " + esc(F.hint) : ""}</div>`
          : `<div class="note unk">Виновного ты нашёл верно! Но объяснение неполное — в нём должно быть: ${F.keys.map((alts, i) => hits.includes(alts) ? `<b>✓ ${esc(F.keyRu[i])}</b>` : `<b>✗ ${esc(F.keyRu[i])}</b>`).join(", ")}. Пиши по-английски.</div>`;
      };
      ctl.addEventListener("click", (e) => { if (e.target.id === "enwhygo") check(); });
      ctl.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "enwhyin") check(); });
    }
    if (!rec.intro) ctl.innerHTML = `<button class="btn gold enext" id="enstart">▶ Начать расследование</button>`, $("#enstart").onclick = intro;
    else ctl.innerHTML = `<div class="card muted">Вступление прослушано. Выбери в блокноте, кого допросить. <button class="btn sm" id="enreintro">↻ Послушать вступление снова</button></div>`, $("#enreintro").onclick = intro;
  }

  // ---------------------------------------------------------------- тренажёр слуха
  const tok = (s) => String(s).toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean);
  const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
  const near = (x, y) => x === y ? 2 : (x.replace(/'/g, "") === y.replace(/'/g, "") || (y.length >= 4 && lev(x, y) === 1)) ? 1 : 0;
  // сравнение по словам: выравнивание (как diff) — верно / почти / ошибка / пропущено / лишнее
  function diff(typed, right) {
    const a = tok(typed), b = tok(right), n = a.length, m = b.length, D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) D[i][j] = Math.max(D[i + 1][j], D[i][j + 1], near(a[i], b[j]) ? D[i + 1][j + 1] + near(a[i], b[j]) : 0);
    const out = []; let i = 0, j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && near(a[i], b[j]) && D[i][j] === D[i + 1][j + 1] + near(a[i], b[j])) { out.push({ t: near(a[i], b[j]) === 2 ? "ok" : "near", w: b[j], y: a[i] }); i++; j++; }
      else if (j < m && (i >= n || D[i][j + 1] >= D[i + 1][j])) { out.push({ t: "miss", w: b[j] }); j++; }
      else { out.push({ t: "extra", y: a[i] }); i++; }
    }
    // «ошибка» = лишнее + пропущенное рядом
    const res = []; for (let k = 0; k < out.length; k++) { const x = out[k], y = out[k + 1];
      if (x.t === "extra" && y && y.t === "miss") { res.push({ t: "bad", w: y.w, y: x.y }); k++; } else if (x.t === "miss" && y && y.t === "extra") { res.push({ t: "bad", w: x.w, y: y.y }); k++; } else res.push(x); }
    return res;
  }
  // пул фраз: примеры пройденных уроков + все фразы историй и дел (с голосом)
  function earPool(src) {
    const out = [], add = (en, ru, v) => { if (en && !/[«»…]/.test(en) && tok(en).length >= 2 && tok(en).length <= 12) out.push({ en, ru, v }); };
    const fromNodes = (X, nodes) => Object.values(nodes).flat().forEach((e) => { if (e.length >= 3 && X.v[e[0]] && typeof e[1] === "string") add(e[1], e[2], X.v[e[0]]); });
    if (!src || src === "lessons") EN.lessons().filter((l) => EN.done(l.n) && window.EN_C && EN_C[l.n]).forEach((l) => ["sut", "prosto"].forEach((f) => String(EN_C[l.n][f] || "").split("\n").map(EN.exParse).filter(Boolean).forEach((e) => add(e.fr, e.ru, null))));
    if (!src || src === "stories" || /^st:/.test(src)) Object.entries(stories()).forEach(([k, X]) => { if (!/^st:/.test(src || "") || src === "st:" + k) fromNodes(X, X.n); });
    if (!src || src === "det" || /^det:/.test(src)) Object.entries(cases()).forEach(([k, X]) => { if (!/^det:/.test(src || "") || src === "det:" + k) fromNodes(X, X.n); });
    const seen = new Set(); return out.filter((x) => !seen.has(x.en) && seen.add(x.en));
  }
  function earPage(args) {
    const S = S0(), E = S.enEar, src = args[0] || "", d = S.enDay[today()] || {};
    const srcName = { "": "всё вперемешку", lessons: "примеры из уроков", stories: "фразы из историй", det: "фразы из детективов" }[src] || (/^st:/.test(src) ? "фразы из истории «" + ((stories()[src.slice(3)] || {}).t || "") + "»" : /^det:/.test(src) ? "фразы из дела «" + ((cases()[src.slice(4)] || {}).t || "") + "»" : src);
    return `<div class="k">🇬🇧 Английский · тренажёр слуха</div><h1 class="page">Услышал — <i>напиши</i></h1>
      <p class="lead">Фраза звучит — ты печатаешь её по-английски с нуля. Потом видишь по словам: что расслышал верно, что почти (опечатка, апостроф — засчитывается), а что пропустил. Не расслышанные фразы вернутся позже.</p>
      <div class="seg ensrc">${[["", "Всё"], ["lessons", "Из уроков"], ["stories", "Из историй"], ["det", "Из детективов"]].map(([k, t]) => `<a class="${k === src ? "on" : ""}" href="#/слух${k ? "/" + k : ""}">${t}</a>`).join("")}</div>
      <div class="card enearst"><span>Сегодня: <b>${d.ear || 0}</b> фраз, с первого раза <b>${d.ear ? Math.round((d.earOk || 0) / d.ear * 100) : 0}%</b></span><span>Ждут повторения: <b>${E.miss.length}</b></span><span class="muted">${esc(srcName)}</span></div>
      <div id="enear"></div>`;
  }
  function earBind(args) {
    stopAll();
    const S = S0(), E = S.enEar, src = args[0] || "", box = $("#enear"); if (!box) return;
    const go = async () => {
      if (!src || src === "lessons") await Promise.all(EN.lessons().filter((l) => EN.done(l.n)).map((l) => EN.load(l.n).catch(() => null)));
      const pool = earPool(src);
      if (!pool.length) { box.innerHTML = `<div class="card muted">${src === "lessons" ? "Пока нет пройденных уроков — пройди урок 1 или выбери фразы из историй." : "Фраз пока нет."}</div>`; return; }
      // 10 фраз: сначала до 3 «на повтор» (если они из этого источника), остальное — случайные, короткие чаще
      const missHere = E.miss.filter((m) => pool.some((p) => p.en === m)), rep = AltT.shuffle(missHere).slice(0, 3).map((m) => pool.find((p) => p.en === m));
      const rest = AltT.shuffle(pool.filter((p) => !rep.includes(p))).sort((a, b) => tok(a.en).length - tok(b.en).length + (Math.random() - .5) * 6).slice(0, 10 - rep.length);
      const set = AltT.shuffle(rep.concat(rest)); let k = 0, okN = 0;
      const one = () => {
        if (k >= set.length) { box.innerHTML = `<div class="card c2res"><div class="bigstars">👂</div><h2>Серия окончена</h2><p>С первого раза: <b>${okN} из ${set.length}</b>.</p><div class="row" style="justify-content:center;gap:10px"><button class="btn gold" id="enearmore">Ещё 10 фраз ▶</button><a class="btn" href="#/прогресс">📈 Прогресс</a></div></div>`; $("#enearmore").onclick = () => go(); return; }
        const it = set[k], again = E.miss.includes(it.en), sayIt = (r) => it.v ? sayEn(it.v, it.en, r) : (speak(it.en, r), Promise.resolve());
        box.innerHTML = `<div class="card enearc"><div class="row"><b>Фраза ${k + 1} из ${set.length}</b>${again ? `<span class="tag">🔁 повтор</span>` : ""}</div>
          <div class="lsn"><button class="btn gold lsn-play" id="enearp">🔊 Послушать</button><button class="btn sm" id="enears">🐢 Медленнее</button></div>
          <div class="row alt-in"><input class="in" id="enearin" placeholder="Напиши, что услышал…" autocomplete="off" spellcheck="false"><button class="btn gold" id="eneargo">Проверить</button></div>
          <div class="muted" style="margin-top:6px">Не уверен в слове — пиши как слышишь. Слушать можно сколько угодно раз.</div><div id="enearfb"></div></div>`;
        $("#enearp").onclick = () => sayIt(); $("#enears").onclick = () => sayIt(.75);
        setTimeout(() => { if ($("#enearp")) sayIt(); }, 300); $("#enearin").focus();
        const check = () => {
          const v = $("#enearin").value; if (!v.trim()) { toast("Напиши хотя бы то, что расслышал"); return; }
          const D = diff(v, it.en), good = D.filter((x) => x.t === "ok" || x.t === "near").length, total = tok(it.en).length, perfect = good === total && !D.some((x) => x.t === "extra" || x.t === "bad");
          if (perfect) okN++;
          E.seen = (E.seen || 0) + 1; E.miss = E.miss.filter((m) => m !== it.en); if (!perfect) E.miss.push(it.en); if (E.miss.length > 200) E.miss.shift();
          logDay({ ear: 1, earOk: perfect ? 1 : 0, earWords: total, earWordsOk: good }); Store.save();
          const lab = { ok: "", near: "почти", bad: "ошибка", miss: "пропущено", extra: "лишнее" };
          $("#enearfb").innerHTML = `<div class="enediff">${D.map((x) => `<span class="ed ${x.t}" title="${lab[x.t]}">${x.t === "extra" ? `<s>${esc(x.y)}</s>` : esc(x.w)}${x.t === "near" || x.t === "bad" ? `<small>ты: ${esc(x.y)}</small>` : x.t === "miss" ? "<small>не расслышал</small>" : ""}</span>`).join(" ")}</div>
            <div class="note ${perfect ? "fixn" : "unk"}">${perfect ? "✓ Всё расслышал!" : `Расслышал ${good} из ${total} слов — фраза вернётся позже.`} <span class="muted">${esc(it.ru || "")}</span> ${playBtn(it.en, 1)}</div>
            <button class="btn gold" id="enearnx">${k + 1 < set.length ? "Следующая ▶" : "Итог ▶"}</button>`;
          $("#enearin").disabled = true; $("#eneargo").remove(); $("#enearnx").focus(); $("#enearnx").onclick = () => { k++; one(); };
        };
        $("#eneargo").onclick = check; $("#enearin").onkeydown = (e) => { if (e.key === "Enter") check(); };
      };
      one();
    };
    go();
  }

  // ---------------------------------------------------------------- прогресс
  function progPage() {
    const S = S0(), L = EN.lessons(), done = L.filter((l) => EN.done(l.n)), D = S.enDay;
    const words = done.reduce((a, l) => a + ((window.EN_I.words || {})[l.n] || 0), 0);
    const days = [...Array(14)].map((_, i) => { const t = new Date(Date.now() - 7.5 * 3600000 - (13 - i) * 86400000); return t.toISOString().slice(0, 10); });
    const tot = (k) => Object.values(D).reduce((a, d) => a + (d[k] || 0), 0), ear = tot("ear"), earOk = tot("earOk"), ew = tot("earWords"), ewo = tot("earWordsOk");
    const act = (d) => (d.tasks || 0) + (d.ear || 0) * 2 + Math.round((d.phrases || 0) / 3) + (d.endings || 0) * 5 + (d.cases || 0) * 10;
    const mx = Math.max(10, ...days.map((k) => act(D[k] || {})));
    const acc = (k) => { const d = D[k] || {}; return d.earWords ? Math.round(d.earWordsOk / d.earWords * 100) : null; };
    const endsAll = Object.values(stories()).reduce((a, s) => a + endCount(s), 0), endsGot = Object.values(S.enSt).reduce((a, r) => a + Object.keys(r.endings || {}).length, 0);
    const solved = Object.values(S.enDet).filter((r) => r.solved).length;
    const W = 640, H = 170, bw = W / 14;
    const accPts = days.map((k, i) => [i, acc(k)]).filter(([, v]) => v != null);
    return `<div class="k">🇬🇧 Английский · прогресс</div><h1 class="page">Что ты <i>уже умеешь</i></h1>
      <section class="gstats enpst">${[["📖", done.length + "/" + L.length, "уроков пройдено"], ["🔤", words, "слов из уроков"], ["👂", ew ? Math.round(ewo / ew * 100) + "%" : "—", "слов расслышано (всего)"], ["🎯", ear ? Math.round(earOk / ear * 100) + "%" : "—", "фраз с первого раза"], ["🎬", endsGot + "/" + endsAll, "концовок историй"], ["🔎", solved + "/" + Object.keys(cases()).length, "дел раскрыто"], ["🎧", tot("phrases"), "фраз прослушано"], ["🏆", EN.level() ? EN.LV[EN.level() - 1].w : "—", "уровень"]]
        .map(([ic, v, t]) => `<div class="gst"><span class="gi">${ic}</span><div><b>${v}</b><span>${t}</span></div></div>`).join("")}</section>
      <div class="card"><div class="k">Занятия за 14 дней</div>
        <svg class="enchart" viewBox="0 0 ${W} ${H + 26}" role="img" aria-label="Активность по дням">
          ${days.map((k, i) => { const v = act(D[k] || {}), h = Math.round(v / mx * (H - 10)); return `<rect x="${i * bw + 6}" y="${H - h}" width="${bw - 12}" height="${Math.max(h, 1)}" rx="4" class="enbar${k === today() ? " now" : ""}"><title>${k}: уроки ${(D[k] || {}).lesson || 0}, заданий ${(D[k] || {}).tasks || 0}, фраз на слух ${(D[k] || {}).ear || 0}, фраз в историях ${(D[k] || {}).phrases || 0}</title></rect>
            <text x="${i * bw + bw / 2}" y="${H + 18}" text-anchor="middle" class="enax">${+k.slice(8)}</text>`; }).join("")}
          ${accPts.length > 1 ? `<polyline class="enacc" points="${accPts.map(([i, v]) => `${i * bw + bw / 2},${H - v / 100 * (H - 10)}`).join(" ")}"/>` : ""}
          ${accPts.map(([i, v]) => `<circle class="enaccd" cx="${i * bw + bw / 2}" cy="${H - v / 100 * (H - 10)}" r="3.5"><title>расслышано ${v}% слов</title></circle>`).join("")}
        </svg>
        <div class="enleg"><span><i class="b"></i>сколько занимался</span><span><i class="l"></i>сколько слов расслышал на слух, %</span></div></div>
      <div class="card"><div class="k">Чаще всего не расслышиваешь</div>${S.enEar.miss.length ? `<div class="enmiss">${S.enEar.miss.slice(-8).reverse().map((m) => `<div>${playBtn(m, 1)} ${esc(m)}</div>`).join("")}</div><a class="btn sm" href="#/слух">Потренировать ▶</a>` : `<p class="muted">Пока нечего — потренируйся в «Слухе».</p>`}</div>`;
  }
  function progBind() {}

  // ---------------------------------------------------------------- карточки на главной английской оболочки
  function homeCards() {
    const S = S0(), d = S.enDay[today()] || {};
    const sc = Object.entries(stories()), cs = Object.entries(cases());
    return `<div class="enhome">
      <a class="card enhc" href="#/история"><span class="enic">🎧</span><b>Истории</b><span>${sc.length} истории со звуками и концовками · перевод по клику</span></a>
      <a class="card enhc" href="#/детектив"><span class="enic">🔎</span><b>Детектив</b><span>${cs.length} дела: допросы, улики, ответ по-английски</span></a>
      <a class="card enhc" href="#/слух"><span class="enic">👂</span><b>Тренажёр слуха</b><span>сегодня ${d.ear || 0} фраз · услышал — напиши</span></a>
      <a class="card enhc" href="#/прогресс"><span class="enic">📈</span><b>Прогресс</b><span>слова, слух, график по дням</span></a></div>`;
  }
  return { storyPage, storyBind, detPage, detBind, earPage, earBind, progPage, progBind, homeCards, logDay, diff, stopAll, earPool };
})();
