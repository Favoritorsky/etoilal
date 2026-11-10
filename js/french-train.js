// Тренировки французского (10.11.2026): стоят между уроками, примерно раз в два урока. Не уроки — не входят в дневной лимит.
// В каждой: новые слова + «Запомни», «Мимоходом» (необязательно), текст для чтения + вопросы, диалог на слух (два голоса) + вопросы,
// грамматика, письмо с проверкой; после — пакет частых слов в карточки. Только пройденное: tools/test_french_trains.cjs.
// Данные: data/french/trains.js (FR_TI — список), data/french/tNN.js (FR_T[NN], NN — урок, после которого тренировка),
// data/french/packs.js (FR_PACK[NN] — частые слова в карточки), озвучка: data/fr-audio.js (голос 1) и data/fr-audio2.js (голос 2).
// Прогресс: Store.get().frt[NN] = {best, date, times}, .frtans[NN] — ответы (как у уроков).
const FRP = (() => {
  const S0 = () => { const S = Store.get(); S.frt = S.frt || {}; return S; };
  const list = () => window.FR_TI || [];
  const tinfo = (id) => list().find((t) => t.id === +id);
  const tdone = (id) => !!(S0().frt[id] || {}).best || (S0().frt[id] || {}).times > 0;
  const skippedSec = (k) => !!(Store.get().frSkip || {})[k];
  // открыта: пройден урок, после которого она стоит (или раздел пропущен), и пройдена прошлая тренировка из непропущенного раздела
  function isOpen(id) {
    const T = tinfo(id); if (!T) return false;
    if (skippedSec(T.sec)) return true;
    if (!FR.done(T.id)) return false;
    const prev = list().filter((x) => x.id < T.id && !skippedSec(x.sec)).pop();
    return !prev || tdone(prev.id);
  }
  // ближайшая открытая непройденная тренировка до урока n (для кнопки «Продолжить»)
  const nextBefore = (n) => list().find((t) => t.id < n && !tdone(t.id) && isOpen(t.id) && !skippedSec(t.sec)) || null;
  const load = (id) => { window.FR_T = window.FR_T || {}; if (FR_T[id]) return Promise.resolve(FR_T[id]);
    return new Promise((ok, bad) => { const s = document.createElement("script"); s.src = `data/french/t${id}.js?v=202611102353`;
      s.onload = () => (FR_T[id] ? ok(FR_T[id]) : bad(new Error("нет тренировки"))); s.onerror = () => bad(new Error("нет файла")); document.head.appendChild(s); }); };
  const row = (T, cur) => { const open = isOpen(T.id), d = tdone(T.id);
    return `<${open ? "a" : "div"} class="card lrow frtr${cur ? " cur" : ""}${open ? "" : " lockd"}"${open ? ` href="#/фрт/${T.id}"` : ""}><span class="ln">${open ? "🏋" : "🔒"}</span>
      <span class="lt"><b>Тренировка: ${esc(T.t)}</b><small>${esc(T.s)}</small></span><span class="lst">${d ? "✓" : cur ? "▶" : ""}</span></${open ? "a" : "div"}>`; };
  const after = (n) => list().filter((t) => t.id === n);

  // ---------------------------------------------------------------- озвучка: голос 1 (FR_AUDIO) и голос 2 (FR_AUDIO2), по очереди
  let playing = null;
  const fileOf = (t, v2) => { const M = (v2 ? window.FR_AUDIO2 : window.FR_AUDIO) || {}, lo = t.toLowerCase().trim(); return M[lo] || M[lo.replace(/[.!?]+$/, "")] || M[lo.replace(/\s*[.!?]+$/, "")]; };
  const playOne = (t, v2) => new Promise((ok) => {
    const f = fileOf(t, v2);
    if (f) { const a = new Audio(f); playing = a; a.onended = ok; a.onerror = ok; a.play().catch(ok); return; }
    if (!("speechSynthesis" in window)) return ok();
    const u = new SpeechSynthesisUtterance(t.replace(/'/g, "")); u.lang = "fr-FR"; u.rate = .9; if (v2) u.pitch = .7;
    const v = speechSynthesis.getVoices().find((x) => /^fr/i.test(x.lang)); if (v) u.voice = v; u.onend = ok; u.onerror = ok; speechSynthesis.speak(u);
  });
  let seqId = 0;
  async function playSeq(lines, btn) {
    const my = ++seqId; stopSeq(true); seqId = my;
    if (btn) { btn.dataset.t = btn.dataset.t || btn.textContent; btn.textContent = "■ Стоп"; }
    for (let i = 0; i < lines.length; i++) {
      if (seqId !== my) break;
      document.querySelectorAll(".frln.on").forEach((x) => x.classList.remove("on"));
      const el = document.querySelector(`[data-ln="${lines[i].k}"]`); if (el) el.classList.add("on");
      await playOne(lines[i].fr, lines[i].v2); await new Promise((r) => setTimeout(r, 350));
    }
    if (seqId === my) { document.querySelectorAll(".frln.on").forEach((x) => x.classList.remove("on")); if (btn) btn.textContent = btn.dataset.t; seqId++; }
  }
  function stopSeq(keep) { seqId++; try { playing && playing.pause(); } catch (e) {} try { speechSynthesis.cancel(); } catch (e) {}
    if (!keep) document.querySelectorAll("[data-seq]").forEach((b) => { if (b.dataset.t) b.textContent = b.dataset.t; }); }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-seq]"); if (b) { e.preventDefault(); if (/Стоп/.test(b.textContent)) return stopSeq();
      const W = window.__frpSeq || {}; playSeq(W[b.dataset.seq] || [], b); return; }
    const v = e.target.closest("[data-say2]"); if (v) { e.preventDefault(); e.stopPropagation(); stopSeq(); playOne(v.dataset.say2, true); return; }
    const ln = e.target.closest(".frln"); if (ln && !e.target.closest("button")) ln.classList.toggle("tr");
  });

  // ---------------------------------------------------------------- проверка письма (подсказки, не оценка)
  const dn = (x) => String(x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe");
  const AV = "(?:ai|aime|aimes|aimons|aimez|aiment|habite|habites|écoute|écoutes|étudie|arrive|arrives|appelle|adore|attends|écris|achète|y|en|ouvre|oublie|invite|entre)";
  const ERR = [
    [new RegExp(`\\bje ${AV}\\b`, "i"), "перед гласной je теряет e: <b>j'</b>ai, <b>j'</b>aime, <b>j'</b>habite"],
    [/\b(le|la) [aeiouéèêâîôûœ]/i, "le / la перед гласной сливаются: <b>l'</b>ami, <b>l'</b>école"],
    [/\b(ne|de|que|me|te|se) [aeiouéèêâîôûœy]/i, "ne, de, que, me, te, se перед гласной теряют e: <b>n'</b>est, <b>d'</b>eau, <b>qu'</b>il"],
    [/\b(je suis|tu es|il est|elle est) (\d+|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|dix-sept|dix-huit|vingt|trente)\b/i, "возраст говорят через «иметь»: <b>j'ai</b> 17 ans, а не je suis"],
    [/\btrès beaucoup\b/i, "très beaucoup нельзя — просто <b>beaucoup</b>"],
    [/(^|[^a-zà-ÿ])à le(?![a-zà-ÿ])/i, "à + le = <b>au</b>: je vais au parc"], [/(^|[^a-zà-ÿ])à les(?![a-zà-ÿ])/i, "à + les = <b>aux</b>"], [/\bde le\b/i, "de + le = <b>du</b>"], [/\bde les\b/i, "de + les = <b>des</b>"],
    [/\b(ai|as|a|avons|avez|ont) (allée?s?|venue?s?|partie?s?|arrivée?s?|restée?s?|tombée?s?|née?s?|morte?s?|entrée?s?|sortie?s?|rentrée?s?|revenue?s?|devenue?s?|montée?s?|descendue?s?)(?![a-zà-ÿ])/i, "глаголы движения в прошлом — с <b>être</b>: je <b>suis</b> allé, elle <b>est</b> venue"],
    [/\bsi (je|j'|tu|il|elle|on|nous|vous|ils|elles) \w*(rai|ras|ra|rons|rez|ront)\b/i, "после si не ставят будущее: si il <b>pleut</b>, je resterai"],
    [/\bplus bon\b/i, "«лучше» — <b>meilleur</b>, а не plus bon"], [/\bsi ils?\b/i, "si + il → <b>s'il</b>, si + ils → <b>s'ils</b>"],
  ];
  // \b и \w в JS не считают é, à, ç буквами — заменяем на свои, чтобы «café», «où», «créerai» проверялись правильно
  const L_ = "a-zà-ÿœæ";
  const rx = (re) => new RegExp(re.replace(/\\w/g, `[${L_}0-9_]`).replace(/\\b/g, `(?:(?<=[${L_}0-9])(?![${L_}0-9])|(?<![${L_}0-9])(?=[${L_}0-9]))`), "i");
  function writeCheck(txt, W) {
    const t = txt.replace(/[’]/g, "'").trim(), out = [];
    const sent = t.split(/[.!?]+/).map((x) => x.trim()).filter((x) => x.split(/\s+/).length >= 2);
    if (W.steps) W.steps.forEach(([what, hint, re], i) => out.push(rx(re).test(t) ? `✓ ${i + 1}. ${what}` : `✗ ${i + 1}. ${what} — например: <span class="fr">${esc(hint)}</span>`));
    else { const min = W.min || 3;
      out.push(sent.length >= min ? `✓ Предложений: ${sent.length}` : `✗ Нужно хотя бы ${min} предложения (сейчас ${sent.length})`);
      for (const [re, hint] of W.need || []) out.push(rx(re).test(t) ? `✓ ${hint}` : `✗ ${hint}`); }
    for (const s of sent) if (/\b(ne|n')\b/i.test(s.replace(/n'/gi, "n' ")) && !/\b(pas|jamais|rien|plus|personne)\b/i.test(s)) out.push(`✗ «${esc(s)}»: к <b>ne</b> нужна вторая часть — <b>pas</b> (или jamais, rien)`);
    for (const [re, hint] of ERR) { const m = t.match(re); if (m) out.push(`✗ «${esc(m[0])}»: ${hint}`); }
    // слова, которых нет ни в словаре, ни в формах: возможно, опечатка; без значков — подсказать правильное написание
    if (window.FR_DICT) {
      const D = new Set(FR_DICT.words.map((w) => w[0].toLowerCase())), F = FR_DICT.forms || {}, byN = {};
      for (const w of D) byN[dn(w)] = byN[dn(w)] || w; for (const f of Object.keys(F)) byN[dn(f)] = byN[dn(f)] || f;
      const toks = (t.toLowerCase().replace(/\b(j|l|d|n|m|t|s|c|qu)'/g, " ").match(/[a-zàâäçéèêëîïôöùûüÿœæ-]+/g) || []).filter((w) => w.length > 2);
      const NAMES = /^(paul|anna|léa|lea|tom|max|marie|lucas|emma|hugo|nina|sophie|pierre|julie|marc|paris|moscou|russie|france|london|londres|lyon|nice|marseille)$/;
      // всё, что было в уроках и тренировках, тоже считается словом
      const CT = new Set(); for (const L of Object.values(window.FR_C || {}).concat(Object.values(window.FR_T || {})))
        (JSON.stringify(L).toLowerCase().replace(/\b(j|l|d|n|m|t|s|c|qu)'/g, " ").match(/[a-zàâäçéèêëîïôöùûüÿœæ-]+/g) || []).forEach((x) => CT.add(x));
      const isWord = (w) => {
        if (D.has(w) || w in F || CT.has(w) || NAMES.test(w)) return true;
        if (w.includes("-")) return w.split("-").every((x) => !x || x.length < 3 || isWord(x));
        // формы по правилам: глаголы на -er / -ir / -re, множественное число, женский род
        const V = ["eraient", "erions", "eriez", "erons", "erez", "eront", "erais", "erait", "erai", "eras", "era", "aient", "ions", "iez", "ais", "ait", "ant", "ent", "ons", "ez", "ées", "és", "ée", "é", "es", "e",
          "issaient", "issions", "issiez", "issons", "issez", "issent", "issais", "issait", "isse", "irai", "iras", "ira", "irons", "irez", "iront", "irais", "irait", "is", "it", "ie", "ies", "i"];
        for (const e of V) if (w.endsWith(e) && w.length - e.length >= 2) { const b = w.slice(0, -e.length); if (["er", "ir", "re"].some((x) => D.has(b + x)) || D.has(b.replace(/è/g, "e") + "er") || D.has(b.replace(/ll$/, "l") + "er") || D.has(b.replace(/tt$/, "t") + "er")) return true; }
        for (const b of [w.replace(/s$/, ""), w.replace(/x$/, ""), w.replace(/e?s?$/, ""), w.replace(/aux$/, "al"), w.replace(/(euse|euses)$/, "eux"), w.replace(/(ive|ives)$/, "if"), w.replace(/(enne|ennes)$/, "en"), w.replace(/(ette|ettes)$/, "et")]) if (b !== w && D.has(b)) return true;
        return false;
      };
      // слова с большой буквы не в начале предложения — имена и города (Platon, Moscou): их не проверяем
      const caps = new Set((t.match(/(?<![.!?«]\s*|^)(?<=\s)[A-ZÀ-Ý][a-zà-ÿ-]+/g) || []).map((x) => x.toLowerCase()));
      const bad = [...new Set(toks.filter((w) => !caps.has(w) && !isWord(w)))];
      for (const w of bad.slice(0, 6)) { const r = byN[dn(w)]; out.push(r && r !== w ? `✗ «${esc(w)}» — скорее всего <b class="fr">${esc(r)}</b> (значок над буквой)` : `? «${esc(w)}» — такого слова нет в словаре: проверь написание`); }
    }
    return out;
  }

  // ---------------------------------------------------------------- страница тренировки
  function page(args) {
    const id = +args[0], T = tinfo(id);
    if (!T) return `<div class="card soon"><h2>Такой тренировки нет</h2><a class="btn gold" href="#/французский">К урокам французского</a></div>`;
    if (!isOpen(id)) { const prev = list().filter((x) => x.id < id && !skippedSec(x.sec)).pop(), needP = prev && !tdone(prev.id);
      return `<div class="card soon nokeep"><div class="ic">🔒</div><h2>Тренировка пока закрыта</h2>
        <p class="muted">Она открывается после урока ${FR.num(id)}${needP ? ` и прошлой тренировки «${esc(prev.t)}»` : ""} — в ней только то, что уже пройдено.</p>
        <a class="btn gold" href="${needP && FR.done(id) ? `#/фрт/${prev.id}` : "#/французский"}">${needP && FR.done(id) ? "К прошлой тренировке ▶" : "К урокам"}</a></div>`; }
    return Board.wrap(`<div id="frp"><div class="card muted">Загружаю тренировку…</div></div>`);
  }
  const fix = (t) => Object.assign({ rq: t.why }, t, { lang: t.lang || (t.opts ? "x" : "fr") });
  async function bind(args) {
    const id = +args[0], I = tinfo(id); if (!$("#frp") || !I) return;
    Board.bind();
    let T; try { T = await load(id); await Promise.all(FR_I.lessons.filter((l) => l.n <= id).map((l) => FR.load(l.n).catch(() => null))); }
    catch (e) { $("#frp").innerHTML = `<div class="card">Не удалось загрузить тренировку.</div>`; return; }
    ARate.sec = I.sec;
    const bInfo = { title: "Тренировка: " + I.t, pins: [], html: `<div class="brule"><b class="btitle">Тренировка: ${esc(I.t)}</b><p class="muted">${esc(I.s)}</p></div>`,
      words: (T.words || []).map(([w, m, r]) => `<div class="bw">${playBtn(w, 1)}<b class="fr">${esc(w)}</b> <span class="muted">«${esc(r)}» ${esc(m)}</span></div>`).join(""), ex: "", err: "" };
    Board.setLesson(bInfo); PageHook.onShow = () => { Board.setLesson(bInfo); Board.render(); };
    const D = T.dialog || { lines: [] }, who = Object.assign({ A: "Léa", B: "Tom" }, D.who || {});
    const textSeq = (T.text ? T.text.lines : []).map((l, i) => ({ k: "t" + i, fr: l[0] }));
    const dlgSeq = D.lines.map((l, i) => ({ k: "d" + i, fr: l[1], v2: l[0] === "B" }));
    window.__frpSeq = { text: textSeq, dlg: dlgSeq };
    const pack = ((window.FR_PACK || {})[id] || []);
    const lineT = (l, i) => `<div class="frln" data-ln="t${i}">${playBtn(l[0], 1)}<div><span class="fr">${esc(l[0])}</span><div class="frtr2"><span class="alt-ru">${esc(l[1])}</span> <span class="rd">«${esc(l[2])}»</span></div></div></div>`;
    const lineD = (l, i) => `<div class="frln frd${l[0] === "B" ? " b" : ""}" data-ln="d${i}"><button class="play sm" ${l[0] === "B" ? "data-say2" : "data-say"}="${esc(l[1])}" title="Послушать">▶</button><div><b class="frwho">${esc(who[l[0]])}:</b> <span class="fr">${esc(l[1])}</span><div class="frtr2"><span class="alt-ru">${esc(l[2])}</span> <span class="rd">«${esc(l[3])}»</span></div></div></div>`;
    const sec = FR_I.sections[I.sec];
    $("#frp").innerHTML = `<div class="row c2crumbs"><a class="muted" href="#/французский">← Все уроки</a><span class="muted">Раздел ${I.sec + 1}: ${esc(sec)} · после урока ${FR.num(id)}</span></div>
      <div class="k">🏋 Тренировка · не урок: в дневной лимит не входит</div><h1 class="page">${esc(I.t)}</h1><p class="lead">${esc(I.s)}</p>
      <div class="c2prog"><i id="frpbar"></i></div>
      <h2 class="c2h">🆕 Новые слова <small class="muted">${T.words.length}</small></h2>
      <div class="card c2words">${T.words.map(([w, m, r]) => `<div class="c2w">${playBtn(w, 1)}<div><b class="fr">${esc(w)}</b> <span class="muted">«${esc(r)}»</span><div>${esc(m)}</div></div></div>`).join("")}${C2_AUD_NOTE}</div>
      <h3 class="c2h3">🧠 Запомни</h3><div class="alt-qs" id="frpmem"></div>
      ${T.note ? `<div class="card c2sec frnote"><div class="k">💡 Мимоходом</div>${FR.rich(T.note, { pins: [] })}</div>` : ""}
      ${T.text ? `<h2 class="c2h">📖 Читаем: ${esc(T.text.t || "")}</h2>
      <div class="card frtext"><div class="row" style="justify-content:flex-start;gap:8px;flex-wrap:wrap;margin-bottom:8px"><button class="btn sm gold" data-seq="text">▶ Слушать весь текст</button><button class="btn sm" id="frptall">Показать весь перевод</button></div>
        <div class="muted" style="margin-bottom:8px">Сначала прочитай сам. Не понял фразу — нажми на неё: появятся перевод и чтение.</div>${T.text.lines.map(lineT).join("")}</div>
      <div class="alt-qs" id="frptq"></div>` : ""}
      ${D.lines.length ? `<h2 class="c2h">🎧 Слушаем: ${esc(D.t || "диалог")}</h2>
      <div class="card frdlg"><div class="row" style="justify-content:flex-start;gap:8px;flex-wrap:wrap"><button class="btn sm gold" data-seq="dlg">▶ Слушать диалог</button><button class="btn sm" id="frpdshow">Показать текст</button></div>
        <div class="muted" style="margin-top:8px">Послушай 2–3 раза и ответь на вопросы. Текст — только если совсем не получается.</div><div id="frpdl" hidden>${D.lines.map(lineD).join("")}</div></div>
      <div class="alt-qs" id="frpdq"></div>` : ""}
      <h2 class="c2h">✍ Грамматика</h2><div class="alt-qs" id="frpgr"></div>
      ${T.write ? `<h2 class="c2h">📝 Пишем сами</h2><div class="card frwrite">${T.write.steps ? `<div class="frwgoal"><b>Задача.</b> ${esc(T.write.goal)}</div>
        <div class="muted" style="margin:6px 0 4px">Напиши по одному предложению на каждый пункт (можно больше):</div>
        <ol class="frwsteps">${T.write.steps.map(([w, h]) => `<li>${esc(w)} <span class="muted">— например:</span> <span class="fr">${esc(h)}</span></li>`).join("")}</ol>
        <div class="muted">Подставь своё: своё имя, свою семью, свой город. Образец — внизу, но сначала попробуй сам.</div>` : `<div>${T.write.q}</div>`}
        <textarea class="in" id="frpw" rows="5" spellcheck="false" placeholder="Пиши по-французски… значки над буквами можно не ставить — подскажу"></textarea>
        <div class="row" style="justify-content:flex-start;gap:8px;margin-top:8px"><button class="btn gold sm" id="frpwgo">Проверить</button><button class="btn sm" id="frpwmod">Показать образец</button></div>
        <div id="frpwres"></div></div>` : ""}
      ${pack.length ? `<details class="card c2sec"><summary>🃏 Частые слова: +${pack.length} в карточки после тренировки</summary>
        <div class="muted" style="margin:6px 0">Это самые частые слова французского — их нет в уроках. После тренировки они попадут в «Карточки» (не больше 20 новых в день).</div>
        <div class="frpack">${pack.map(([w, m, r]) => `<span class="tag">${playBtn(w, 1)}<b class="fr">${esc(w)}</b> — ${esc(m)} <span class="muted">«${esc(r)}»</span></span>`).join("")}</div></details>` : ""}
      <div id="frpend"></div>`;
    Board.render();
    if ($("#frptall")) $("#frptall").onclick = () => { const on = !document.querySelector(".frtext.all"); $(".frtext").classList.toggle("all", on); $("#frptall").textContent = on ? "Скрыть перевод" : "Показать весь перевод"; };
    if ($("#frpdshow")) $("#frpdshow").onclick = () => { const h = $("#frpdl"); h.hidden = !h.hidden; $("#frpdshow").textContent = h.hidden ? "Показать текст" : "Скрыть текст"; };
    // ответы сохраняются: frtans[id] = { items: {mem}, a: {mem, tq, dq, gr}, w: текст письма, wok }
    const S = S0(); S.frtans = S.frtans || {};
    const saved = S.frtans[id] && S.frtans[id].items ? S.frtans[id] : null;
    const mem = saved ? saved.items.mem : FR.memItems({ n: id, words: T.words });
    const tq = (T.tq || []).map(fix), dq = (T.dq || []).map(fix), gr = (T.gram || []).map(fix);
    const rec = saved || { items: { mem }, a: { mem: {}, tq: {}, dq: {}, gr: {} } };
    const onTry = (g) => (k, v) => { (rec.a[g] = rec.a[g] || {}); (rec.a[g][k] = rec.a[g][k] || []).push(v); rec.at = new Date().toISOString(); S0().frtans = S0().frtans || {}; S0().frtans[id] = rec; Store.save(); };
    const st = { id, I, total: mem.length + tq.length + dq.length + gr.length + (T.write ? 1 : 0), done: 0, first: 0, finished: false };
    window.__frpCur = { mem, tq, dq, gr, write: T.write };          // для тестов
    const each = (item, first, ok) => { st.done++; if (first && ok) st.first++; const b = $("#frpbar"); if (b) b.style.width = Math.round(st.done / st.total * 100) + "%"; if (st.done >= st.total) finish(st, rec); };
    AltT.mount($("#frpmem"), mem, { onAnswer: each, onTry: onTry("mem"), restore: rec.a.mem, bonus: true });
    if (tq.length) AltT.mount($("#frptq"), tq, { onAnswer: each, onTry: onTry("tq"), restore: rec.a.tq, bonus: true });
    if (dq.length) AltT.mount($("#frpdq"), dq, { onAnswer: each, onTry: onTry("dq"), restore: rec.a.dq, bonus: true });
    AltT.mount($("#frpgr"), gr, { onAnswer: each, onTry: onTry("gr"), restore: rec.a.gr, bonus: true });
    if (T.write) {
      const W = T.write, ta = $("#frpw"); if (rec.w) ta.value = rec.w;
      const showModel = () => { if (!$("#frpwmodel")) $("#frpwres").insertAdjacentHTML("beforeend", `<div class="card frmodel" id="frpwmodel"><div class="k">Образец</div><div class="fr">${esc(W.model)}</div>${W.modelRu ? `<div class="muted">${esc(W.modelRu)}</div>` : ""}<button class="play sm" data-say="${esc(W.model)}">▶</button></div>`); };
      const check = async () => {
        const v = ta.value.trim(); if (!v) { toast("Сначала напиши пару предложений"); return; }
        try { await FRT.dictLoad(); } catch (e) {}
        const res = writeCheck(v, W), bad = res.filter((x) => x[0] === "✗").length;
        $("#frpwres").innerHTML = `<div class="frwres">${res.map((x) => `<div class="${x[0] === "✓" ? "frw-ok" : x[0] === "?" ? "frw-q" : "frw-bad"}">${x}</div>`).join("")}</div>
          <div class="muted" style="margin-top:6px">${bad ? "Поправь отмеченное и проверь ещё раз — или сравни с образцом." : "Отлично! Сравни с образцом — может, найдёшь что взять себе."}</div>`;
        showModel();
        rec.w = v; const first = !rec.wok; if (!rec.wok) { rec.wok = 1; S0().frtans[id] = rec; Store.save(); each(null, first && !bad, !bad); } else { S0().frtans[id] = rec; Store.save(); }
      };
      $("#frpwgo").onclick = check; $("#frpwmod").onclick = showModel;
      if (rec.wok) { st.done++; const b = $("#frpbar"); if (b) b.style.width = Math.round(st.done / st.total * 100) + "%"; if (st.done >= st.total) finish(st, rec); }
    }
    if (saved && st.done && !st.finished) toast("Продолжаешь с того места, где остановился ✦");
  }
  function finish(st, rec) {
    if (st.finished) return; st.finished = true;
    const { id, I } = st, pct = Math.round(st.first / st.total * 100), S = S0(), old = S.frt[id] || { best: 0, times: 0 };
    let pts = 0;
    if (!rec.res) { pts = old.times ? Math.ceil(st.first / 4) : st.first + 10; rec.res = { pts };
      S.frt[id] = { best: Math.max(old.best || 0, pct, 1), times: (old.times || 0) + 1, date: new Date().toISOString().slice(0, 10) };
      S.frtans[id] = rec; Store.addPoints(pts); renderNav("учиться"); } else pts = rec.res.pts;
    const pack = ((window.FR_PACK || {})[id] || []).length;
    const nl = FR.nextOf(id), np = list().find((t) => t.id > id && isOpen(t.id) && !tdone(t.id));
    $("#frpend").innerHTML = `<div class="card c2res"><h2>Тренировка пройдена! 🏋</h2><p>С первой попытки: <b>${st.first} из ${st.total}</b> (${pct}%). ${pts ? `+${pts} очков ✦` : ""}</p>
      ${pack ? `<p class="muted">+${pack} частых слов теперь в <a href="#/карточки">карточках</a>.</p>` : ""}
      <div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap">${np ? `<a class="btn gold" href="#/фрт/${np.id}">Тренировка: ${esc(np.t)} ▶</a>` : nl ? `<a class="btn gold" href="#/фр/${nl.n}">${nl.check ? "Контрольная" : "Урок " + FR.num(nl.n)}: ${esc(nl.t)} ▶</a>` : ""}
      <a class="btn" href="#/французский">Все уроки</a><button class="btn" onclick="FRP.again(${id})">↻ Пройти снова</button></div></div>`;
    $("#frpend").scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function again(id) { const S = S0(); if (S.frtans) delete S.frtans[id]; Store.save(); route(); window.scrollTo(0, 0); }
  // частые слова из пройденных тренировок — для карточек
  const packWords = () => list().filter((t) => tdone(t.id)).flatMap((t) => ((window.FR_PACK || {})[t.id] || []).map(([w, m, r]) => ({ w, m, r, n: 0, pack: t.id })));
  return { rx, list, tinfo, isOpen, done: tdone, nextBefore, row, after, page, bind, again, packWords, writeCheck };
})();
