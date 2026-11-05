// Прогресс ученика: хранится в браузере (localStorage), можно выгрузить в файл и загрузить обратно.
const Store = (() => {
  const KEY = "etoilal-progress-v1";
  const blank = () => ({ points: 0, chests: 0, days: [], lessons: {}, cards: {}, senses: {}, myWords: [], created: new Date().toISOString() });
  let S = blank();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
  if (S.courseV !== 2) { if (Object.keys(S.lessons || {}).length) S.lessonsOld = S.lessons; S.lessons = {}; S.courseV = 2; }   // новый самоучитель (3.11.2026)
  // 5.11.2026: буква k заменена на q — переводим сохранённые слова, карточки и ответы уроков (один раз; и для данных из облака)
  function migQ(o) {
    if (!o || o.qV) return o;
    const fx = (v) => typeof v === "string" ? v.replace(/[A-Za-zÀ-ÿ]*[kK][A-Za-zÀ-ÿ]*/g, (w) => w.replace(/k/g, "q").replace(/K/g, "Q"))
      : Array.isArray(v) ? v.map(fx) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "k" ? x : fx(x)])) : v;
    if (Array.isArray(o.myWords)) o.myWords = o.myWords.map(fx);
    if (o.cards) o.cards = Object.fromEntries(Object.entries(o.cards).map(([w, c]) => [fx(w), c]));
    if (o.c2ans) o.c2ans = fx(o.c2ans);
    o.qV = 1; return migExam(o);
  }
  // 5.11.2026: новые контрольные (таймер, без подсказок, уровни) — ранее сданные контрольные надо пересдать.
  // Старый результат не теряется: S.checksOld[N]. Остальной прогресс (уроки, очки, карточки) остаётся.
  function migExam(o) {
    if (!o || o.examV) return o;
    const checks = (window.ET_C2I ? ET_C2I.lessons.filter((l) => l.check).map((l) => l.n) : [13, 19, 26, 33, 40]);
    o.checksOld = o.checksOld || {};
    for (const n of checks) {
      if (o.lessons && o.lessons[n]) { o.checksOld[n] = o.lessons[n]; delete o.lessons[n]; }
      if (o.c2ans && o.c2ans[n]) delete o.c2ans[n];
    }
    o.examV = 1; return o;
  }
  migQ(S); migExam(S);
  let hook = null;                                       // js/cloud.js: отправить прогресс в облако (с задержкой)
  const monday = () => { const d = new Date(); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d.toISOString().slice(0, 10); };
  const write = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const save = () => {
    const w = monday();                                  // очки за неделю (для топа): base — очки на начало недели
    if (!S.week || S.week.w !== w) S.week = { w, base: S.week ? S.week.last : S.points };
    else if (S.points < S.week.last) S.week.base -= S.week.last - S.points;   // покупки не уменьшают очки недели
    S.week.last = S.points; S.updated = new Date().toISOString();
    write(); if (hook) hook();
  };
  const today = () => new Date().toISOString().slice(0, 10);
  function touchDay() { const d = today(); if (!S.days.includes(d)) { S.days.push(d); S.days = S.days.slice(-400); save(); } }
  function streak() {                                   // дней подряд, включая сегодня (или вчера, если сегодня ещё не занимался)
    const set = new Set(S.days); let n = 0; const d = new Date();
    if (!set.has(today())) d.setDate(d.getDate() - 1);
    while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  return {
    get: () => S, save, touchDay, streak, monday, migQ: (o) => migExam(migQ(o)),
    setHook(f) { hook = f; },
    load(obj) {                                          // без hook: так облако подставляет объединённый прогресс
      const n = migExam(migQ(Object.assign(blank(), obj)));             // на месте — у открытой страницы ссылка на S остаётся верной
      for (const k of Object.keys(S)) delete S[k];
      Object.assign(S, n); write();
    },
    weekPoints() { return S.week && S.week.w === monday() ? Math.max(0, S.points - S.week.base) : 0; },
    addPoints(n) { S.points += n; touchDay(); save(); },
    setSense(k, v) { S.senses[k] = v; save(); }, clearSenses() { S.senses = {}; save(); },
    toggleWord(w) { const i = S.myWords.indexOf(w); if (i >= 0) S.myWords.splice(i, 1); else { S.myWords.push(w); this.daily().words++; } save(); return i < 0; },
    hasWord: (w) => S.myWords.includes(w),
    today,
    // задание дня: счётчики за сегодня (cards — повторено карточек, lessons — пройдено уроков, words — добавлено слов)
    daily() { const d = today(); if (!S.daily || S.daily.date !== d) S.daily = { date: d, cards: 0, lessons: 0, words: 0, claimed: false }; return S.daily; },
    bump(k, n = 1) { this.daily()[k] += n; save(); },
    // карточка: упрощённый SM-2. q: 0 не помню, 3 трудно, 4 помню, 5 легко → новая дата повторения
    review(word, q) {
      const c = S.cards[word] || { ef: 2.5, iv: 0, reps: 0, lapses: 0 };
      if (q < 3) { c.reps = 0; c.iv = 0; c.lapses++; }
      else { c.reps++; c.iv = c.reps === 1 ? (q === 5 ? 3 : 1) : c.reps === 2 ? (q === 5 ? 6 : 3) : Math.round(c.iv * c.ef * (q === 5 ? 1.3 : q === 3 ? 0.8 : 1)); }
      c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      const due = new Date(); due.setDate(due.getDate() + c.iv); c.due = due.toISOString().slice(0, 10); c.last = today();
      S.cards[word] = c; S.cardLog = S.cardLog || {}; S.cardLog[today()] = (S.cardLog[today()] || 0) + 1;
      this.daily().cards++; touchDay(); save(); return c;
    },
    // урок пройден: звёзды и лучший процент — максимум из попыток; очки — полностью за первый раз, дальше только за улучшение
    finishLesson(n, stars, pct, correct) {
      const old = S.lessons[n] || { stars: 0, best: 0, times: 0 };
      const pts = old.times ? Math.max(0, stars - old.stars) * 5 + Math.ceil(correct / 3) : correct + stars * 5 + 10;
      const chest = stars === 3 && old.stars < 3;
      S.lessons[n] = { stars: Math.max(old.stars, stars), best: Math.max(old.best, pct), times: old.times + 1, date: today() };
      S.points += pts; if (chest) S.chests++; this.daily().lessons++;
      touchDay(); save();
      return { pts, chest, first: !old.times };
    },
    exportFile() {
      const b = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "etoilal-прогресс-" + today() + ".json"; a.click();
    },
    importText(t) { S = migExam(migQ(Object.assign(blank(), JSON.parse(t)))); save(); },
  };
})();
