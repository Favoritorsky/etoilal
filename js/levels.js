// Уровни (5.11.2026): 6 разделов самоучителя = 6 уровней «Путь человека». Уровень раздела даёт сданная контрольная раздела
// (≥ 80 %); у раздела 1 «Звуки» контрольной нет — elev даётся за прохождение уроков 1–3.
// Строгий порядок: урок/контрольная открывается, только если пройдены ВСЕ уроки и контрольные до него.
// Режим контрольной: пока идёт контрольная, переводчик и «Проверь текст» закрыты (и в других вкладках — через localStorage).
const LEVELS = [
  { w: "elev", ru: "Ученик", ic: "🌱" }, { w: "voiyajeur", ru: "Путник", ic: "🧭" }, { w: "pelren", ru: "Странник", ic: "🌙" },
  { w: "artizan", ru: "Мастер", ic: "🛠" }, { w: "filozof", ru: "Мудрец", ic: "📜" }, { w: "etoil", ru: "Звезда", ic: "✦" },
];
const Lv = (() => {
  const PASS = 80, RETRY_MIN = 60, EXAM_KEY = "etoilal-exam";
  const done = (n, S = Store.get()) => !!(S.lessons[n] && S.lessons[n].stars > 0);
  const secLessons = (k) => ET_C2I.lessons.filter((l) => l.sec === k);
  // уровень раздела k получен: раздел 0 — все уроки пройдены; остальные — сдана контрольная раздела
  function secPassed(k, S = Store.get()) {
    const L = secLessons(k), chk = L.find((l) => l.check);
    return chk ? done(chk.n, S) : L.every((l) => done(l.n, S));
  }
  // текущий уровень: число подряд полученных уровней (0 — ещё нет; 1 — elev …)
  function level(S = Store.get()) { let k = 0; while (k < LEVELS.length && secPassed(k, S)) k++; return k; }
  const levelOf = (k) => (k > 0 ? LEVELS[k - 1] : null);
  // первый не пройденный урок; всё, что после него, закрыто
  const firstOpen = (S = Store.get()) => (ET_C2I.lessons.find((l) => !done(l.n, S)) || null);
  function isOpen(n, S = Store.get()) { const f = firstOpen(S); return !f || n <= f.n || done(n, S); }
  // пересдача контрольной — не чаще раза в час
  function retryLeft(n, S = Store.get()) {
    const t = (S.examLast || {})[n]; if (!t) return 0;
    return Math.max(0, Math.ceil((Date.parse(t) + RETRY_MIN * 60000 - Date.now()) / 60000));
  }
  // контрольная идёт (в этой или другой вкладке)
  function examActive() {
    try { const x = JSON.parse(localStorage.getItem(EXAM_KEY) || "null"); return x && Date.now() < x.until ? x : null; } catch (e) { return null; }
  }
  function examStart(n, minutes) { try { localStorage.setItem(EXAM_KEY, JSON.stringify({ n, until: Date.now() + minutes * 60000 })); } catch (e) {} }
  function examStop() { try { localStorage.removeItem(EXAM_KEY); } catch (e) {} }
  const badge = (k) => { const L = levelOf(k); return L ? `<span class="lvb" title="Уровень ${k}: ${L.ru}">${L.ic} <b class="et">${L.w}</b></span>` : ""; };
  // закрытая страница (переводчик / «Проверь текст») во время контрольной
  function lockedPage(what) {
    const x = examActive();
    return `<div class="card soon"><div class="ic">⏳</div><h2>${what} закрыт на время контрольной</h2>
      <p class="muted">Идёт контрольная (урок ${x ? x.n : ""}). Подсказки, переводчик и проверка текста откроются, когда ты её закончишь.</p>
      ${x ? `<a class="btn gold" href="#/урок/${x.n}">Вернуться к контрольной</a>` : ""}</div>`;
  }
  return { PASS, RETRY_MIN, done, secLessons, secPassed, level, levelOf, firstOpen, isOpen, retryLeft, examActive, examStart, examStop, badge, lockedPage };
})();
