// «Проверь свой текст»: находит ошибки в тексте на Etoilal, объясняет и предлагает исправление.
// Опирается на данные переводчика (translator.js: E, BW/backInit, FN_RU, ARTS, PLUR_DET, ET_NUM, dl, startsVowel, BE).
// Каждая находка: { a, b (позиции в тексте), kind, title, why, fix (замена для куска a..b), lesson (№ урока с темой) }.
const Checker = (() => {
  const SUBJ = { je: 0, j: 0, tu: 1, il: 2, el: 2, on: 2, nou: 3, vou: 4, ilz: 5, elz: 5 };
  const OBJ = new Set(["mo", "to", "lo", "la", "no", "vo", "loz", "laz", "mey", "tey", "ley", "ney", "vey", "leyz", "m", "t", "l"]);
  const NEG = new Set(["pa", "jame", "ryen"]);
  const NAMES = new Set(["Teo", "Mark", "Ana", "Lila"]);                // имена персонажей курса и текстов — не «опечатки» даже в начале фразы
  const DEG = new Set(["tre", "trop", "osi", "si", "plu", "mouen", "deja", "toujour", "anqor"]);   // «очень, слишком…» перед прилагательным
  const POSS = new Set(["ma", "ta", "sa", "nota", "vota", "leura", "se", "sela"]);
  const EXTRA = new Set(["zut", "bref", "daqor", "oqe", "wa", "oh", "ah", "oi", "oura", "be", "esqe", "qi", "qe", "qoi", "ou", "qan", "qoman", "pourqoi", "qonbyen", "qel", "si", "e", "me", "oubyen", "pasq", "qom", "donq", "a", "de", "dans", "sur",
    "aveq", "sans", "pour", "che", "oui", "non", "mersi", "salu", "bonjour", "orevoir", "silvouple", "byen", "mal", "tre", "boqu", "peu", "deja", "anqor", "osi", "toujour", "jame",
    "isi", "laba", "ojourdui", "demen", "yer", "mentnant", "un", "z"]);
  const PERS_RU = ["я", "ты", "он/она", "мы", "вы", "они"];
  const TENSES_RU = ["настоящее", "прошедшее (сделал)", "прошедшее (делал)", "будущее", "скоро", "только что"];
  let KNOWN = null, BYLEN2 = null, STEMS = null;
  // составные формы глагола: основа + время (e, i, a, re, o, u) + наклонение (ri «бы», se «пусть», pe «наверное») + лицо (m s t n z l);
  // причастия: основа + ant («поющий»), + ey («спетый»)
  function parseVerb(low) {
    if (!STEMS) { STEMS = new Map(); E.forEach((e, i) => { if (e.p === "v" && /er$/.test(e.w)) STEMS.set(e.w.slice(0, -2), i); }); }
    let m = low.match(/^(.+?)(ant|ey)$/);
    if (m && STEMS.has(m[1])) return { i: STEMS.get(m[1]), part: m[2] };
    m = low.match(/^(.+?)(re|e|i|a|o|u)(ri|se|pe)?([msntzl])$/);
    if (m && STEMS.has(m[1])) return { i: STEMS.get(m[1]), p: "mstnzl".indexOf(m[4]), tense: m[2], mood: m[3] || "" };
    return null;
  }

  function info(w) {                                       // что это за слово: глагол (формы), прил., сущ., служебное
    const low = w.toLowerCase(), c = BW.get(low) || [];
    const verb = c.find((x) => x.k !== undefined && x.k < 56 && E[x.i].p === "v");
    const pv = !c.length ? parseVerb(low) : null;
    return { low, pv, known: c.length > 0 || !!pv || /^(deu|troi|qatr|senq|sis|set|uit|neuf)dis$/.test(low) || FN_RU[low] !== undefined || ARTS.has(low) || PLUR_DET.has(low) || ET_NUM[low] !== undefined || NEG.has(low) || EXTRA.has(low) || /^\d/.test(low),
      verb, adj: c.some((x) => x.k === undefined && E[x.i].p === "a"), noun: c.some((x) => x.k === undefined && ["n", "name"].includes(E[x.i].p)),
      onlyAdj: c.length > 0 && c.every((x) => x.k === undefined && E[x.i].p === "a"), onlyNoun: c.length > 0 && c.every((x) => x.k === undefined && ["n", "name"].includes(E[x.i].p)) };
  }
  function known() {
    if (KNOWN) return;
    if (!BW) backInit();
    KNOWN = new Set([...BW.keys(), ...Object.keys(FN_RU), ...ARTS, ...PLUR_DET, ...Object.keys(ET_NUM), ...NEG, ...EXTRA]);
    BYLEN2 = {}; for (const k of KNOWN) (BYLEN2[k.length] = BYLEN2[k.length] || []).push(k);
  }
  function suggest(w) {                                    // ближайшее известное слово (до 2 правок), частые — первыми
    known(); const low = w.toLowerCase(), max = low.length <= 4 ? 1 : 2, out = [];
    for (let L = low.length - max; L <= low.length + max; L++) for (const k of BYLEN2[L] || []) {
      const d = dl(low, k, max); if (d <= max) { const c = BW.get(k); out.push([d, c ? Math.min(...c.map((x) => x.i)) : 0, k]); }
    }
    out.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return out.slice(0, 3).map((x) => x[2]);
  }
  const keepCase = (orig, w) => (/^[A-Z]/.test(orig) ? w[0].toUpperCase() + w.slice(1) : w);

  function check(text) {
    if (!BW) backInit(); known();
    const issues = [];
    // токены: слова со слиянием (l'ami → l' + ami), знаки конца предложения
    const T = []; const re = /([A-Za-z]+)'([A-Za-z]+)|[A-Za-z]+|\d+|[.!?…]+|[,;:—–-]/g; let m;
    while ((m = re.exec(text))) {
      if (m[1]) { T.push({ s: m[1] + "'", a: m.index, b: m.index + m[1].length + 1, el: m[1].toLowerCase() }); T.push({ s: m[2], a: m.index + m[1].length + 1, b: m.index + m[0].length }); }
      else T.push({ s: m[0], a: m.index, b: m.index + m[0].length, p: /^[.!?…,;:—–-]+$/.test(m[0]), end: /^[.!?…]+$/.test(m[0]) });
    }
    const W = (t) => t && !t.p;
    const low = (t) => (t.el ? ({ l: "le", j: "je", d: "de", s: "se", q: "qe", m: "me", t: "to" })[t.el] || t.el : t.s.toLowerCase());
    let sentStart = true;
    for (let i = 0; i < T.length; i++) {
      const t = T[i]; if (t.p) { if (t.end) sentStart = true; continue; }
      const lw = low(t), I = t.el ? { known: true } : info(t.s);
      // 1) большая буква в начале предложения
      if (sentStart && /^[a-z]/.test(t.s)) issues.push({ a: t.a, b: t.a + 1, kind: "case", title: "Большая буква", why: "Предложение начинается с большой буквы.", fix: t.s[0].toUpperCase() });
      const wasStart = sentStart; sentStart = false;
      // 2) неизвестное слово → ближайшее
      if (!I.known && !(/^[A-Z]/.test(t.s) && !wasStart) && !NAMES.has(t.s)) {
        const sg = suggest(t.s);
        issues.push({ a: t.a, b: t.b, kind: "spell", title: "Нет такого слова", why: sg.length ? `Может быть, ты имел в виду «${sg.join("», «")}»?` : "Такого слова нет в словаре. Проверь написание.",
          fix: sg.length ? keepCase(t.s, sg[0]) : null, alts: sg.map((x) => keepCase(t.s, x)), lesson: 2 });
        continue;
      }
      // 3) слияние: le ami → l'ami
      const nx = T[i + 1];
      if (!t.el && ELIDE.has(lw) && W(nx) && !nx.el && nx.a === t.b + 1 && startsVowel(nx.s) && /^[a-z]/i.test(nx.s)) {
        issues.push({ a: t.a, b: nx.b, kind: "elision", title: "Нужно слияние", why: `Перед гласной «${lw}» теряет «e» и пишется через апостроф: так фраза течёт, а не спотыкается.`,
          fix: keepCase(t.s, lw.slice(0, -1)) + "'" + nx.s, lesson: 3 });
      }
      // 4) подлежащее-местоимение → согласование глагола, место «pa», пропущенная связка
      if (SUBJ[lw] !== undefined && !t.el || (t.el === "j")) {
        const p = SUBJ[lw] ?? 0;
        let j = i + 1; while (W(T[j]) && OBJ.has(low(T[j]))) j++;          // je to emem — дополнения перед глаголом
        const v = T[j];
        if (!W(v)) continue;
        const lv = low(v);
        // «pa» перед глаголом: Je pa savem → Je savem pa
        if (NEG.has(lv) && W(T[j + 1]) && info(T[j + 1].s).verb) {
          const vb = T[j + 1];
          issues.push({ a: v.a, b: vb.b, kind: "neg", title: "«" + lv + "» ставится после глагола", why: `В Etoilal отрицание идёт после глагола: «je savem ${lv}» — «я не знаю». По-русски «не» стоит раньше, поэтому так легко ошибиться.`,
            fix: vb.s + " " + v.s, lesson: 9 });
          continue;
        }
        const vi = info(v.s);
        if (vi.verb) {
          const k = vi.verb.k;
          if (k < 54) {                                              // личная форма: проверить лицо
            const tense = k < 36 ? Math.floor(k / 6) : -1, pp = k < 36 ? k % 6 : (k - 36) % 6;
            const all = (BW.get(lv) || []).filter((x) => x.k !== undefined && x.k < 54 && x.i === vi.verb.i).map((x) => (x.k < 36 ? x.k % 6 : (x.k - 36) % 6));
            if (!all.includes(p)) {
              const right = E[vi.verb.i].f[k - pp + p];
              issues.push({ a: v.a, b: v.b, kind: "agree", title: "Глагол не того лица", why: `Подлежащее «${t.s}» — это «${PERS_RU[p]}», а «${v.s}» — форма для «${PERS_RU[pp]}». Окончание лица: -m (я), -s (ты), -t (он/она), -n (мы), -z (вы), -l (они)` +
                (tense >= 0 ? `; время — ${TENSES_RU[tense]}.` : "."), fix: keepCase(v.s, right), lesson: 7 });
            }
          }
        } else if (vi.pv && vi.pv.p !== undefined && vi.pv.p !== p) {
          const right = lv.slice(0, -1) + "mstnzl"[p];
          issues.push({ a: v.a, b: v.b, kind: "agree", title: "Глагол не того лица", why: `Подлежащее «${t.s}» — это «${PERS_RU[p]}», а «${v.s}» кончается на «${lv.slice(-1)}» — это «${PERS_RU[vi.pv.p]}». Последняя буква глагола — лицо: -m (я), -s (ты), -t (он/она), -n (мы), -z (вы), -l (они).`,
            fix: keepCase(v.s, right), lesson: 7 });
        } else if (DEG.has(lv) && W(T[j + 1]) && info(T[j + 1].s).onlyAdj) {   // Il tre joli → Il eset tre joli
          const be = E[BE()].f[p];
          issues.push({ a: v.a, b: v.b, kind: "copula", title: "Пропущена связка eser", why: `По-русски «он очень красивый» говорят без глагола, а в Etoilal связка «быть» нужна всегда: «${t.s} ${be} ${v.s} ${T[j + 1].s}».`,
            fix: be + " " + v.s, lesson: 5 });
        } else if (vi.onlyAdj && !NEG.has(lv)) {                     // Il joli → Il eset joli
          const be = E[BE()].f[p];
          issues.push({ a: v.a, b: v.b, kind: "copula", title: "Пропущена связка eser", why: `По-русски «он красивый» говорят без глагола, а в Etoilal связка «быть» нужна всегда: «${t.s} ${be} ${v.s}».`,
            fix: be + " " + v.s, lesson: 5 });
        }
      }
      // 5) прилагательное перед существительным: le joli fleur → le fleur joli
      if (!t.el && (ARTS.has(lw) || PLUR_DET.has(lw) || POSS.has(lw)) && W(nx) && W(T[i + 2])) {
        const a = info(nx.s), n = info(T[i + 2].s);
        if (a.onlyAdj && n.onlyNoun && !nx.el) {
          issues.push({ a: nx.a, b: T[i + 2].b, kind: "order", soft: true, title: "Обычно прилагательное — после слова", why: `В обычной речи прилагательное стоит после существительного: «${lw} ${T[i + 2].s} ${nx.s}». Перед словом его ставят только в стихах и песнях — для красоты. Если это стих — оставь как есть.`,
            fix: T[i + 2].s + " " + nx.s, lesson: 5 });
        }
      }
      // 6) множественное: lez/числа + «ma» → «maz»; «ma ami» перед глаголом на -l (они) → maz
      if (!t.el && POSS.has(lw) && W(nx) && info(nx.s).noun) {
        const after = T[i + 2]; const prev = T[i - 1];
        const plurVerb = W(after) && info(after.s).verb && info(after.s).verb.k < 36 && info(after.s).verb.k % 6 === 5;
        const plurNum = W(prev) && (ET_NUM[low(prev)] > 1 || /^\d+$/.test(prev.s) && +prev.s > 1);
        if (plurVerb || plurNum) issues.push({ a: t.a, b: t.b, kind: "plural", title: "Нужно «z» — их много", why: `Когда предметов много, «${lw}» получает «z»: «${lw}z ${nx.s}». Существительное при этом не меняется.`, fix: t.s + "z", lesson: 4 });
      }
    }
    // перекрывающиеся находки — оставить первую
    issues.sort((x, y) => x.a - y.a); const out = []; let lastB = -1;
    for (const it of issues) { if (it.a >= lastB) { out.push(it); lastB = it.b; } }
    return out;
  }
  function apply(text, list) {                             // применить исправления (с конца, чтобы позиции не съехали)
    let s = text; for (const it of [...list].sort((x, y) => y.a - x.a)) if (it.fix != null) s = s.slice(0, it.a) + it.fix + s.slice(it.b); return s;
  }
  return { check, apply };
})();
if (typeof module !== "undefined") module.exports = Checker;
