// «Справочник» (#/справочник[/спряжение[/глагол] | /числа]) и «О языке» (#/о-языке). Логика — ref-core.js, данные — ET_GRAMMAR, ET_TR (E).
// Подключается ДО app.js; функции вызываются из PAGES в app.js.

const REF_TABS = [["", "📐 Грамматика"], ["спряжение", "🔤 Спряжение"], ["числа", "🔢 Числа"]];
const refHead = (cur) => `<div class="k">Справочник</div><h1 class="page">Вся грамматика <i>под рукой</i></h1>
  <div class="seg reftabs">${REF_TABS.map(([id, t]) => `<a href="#/справочник${id ? "/" + id : ""}" class="${id === cur ? "on" : ""}">${t}</a>`).join("")}</div>`;

function pageRef(args) {
  const tab = args[0] || "";
  if (tab === "спряжение") return refHead(tab) + pageConj();
  if (tab === "числа") return refHead(tab) + pageNums();
  return refHead("") + pageGrammar();
}
function bindRef(args) {
  const tab = args[0] || "";
  if (tab === "спряжение") return bindConj(args[1]);
  if (tab === "числа") return bindNums();
  bindGrammar();
}

// ---------------------------------------------------------------- грамматика с поиском
let gramQ = "";
function pageGrammar() {
  const G = ET_GRAMMAR;
  return `<p class="lead">11 разделов — от звуков до словообразования. Каждый пример можно послушать ▶. Под примером — подстрочник: что значит каждое слово.</p>
  <div class="gram"><aside class="gtoc card"><input class="in" id="gq" placeholder="Поиск: артикль, -ey, вопрос…" value="${esc(gramQ)}" autocomplete="off">
    <div id="gtoc">${G.sections.map((s) => `<a href="#${s.id}" data-g="${s.id}"><span>${s.n}</span>${esc(s.title)}</a>`).join("")}</div>
    <div class="gcnt muted" id="gcnt"></div>
    <div class="gside">Хочешь проверить себя? <a class="et" href="#/проверка">Проверь свой текст</a></div></aside>
  <div class="gbody"><div class="card gintro">${G.intro}</div>
    ${G.sections.map((s) => `<section class="card gsec" id="${s.id}"><h2><span class="gn">${s.n}</span>${esc(s.title)}</h2>${s.html}
      ${s.n === 5 ? `<div class="note fixn">Таблица всех форм любого глагола — во вкладке <a class="et" href="#/справочник/спряжение">«Спряжение»</a>.</div>` : ""}
      ${s.n === 8 ? `<div class="note fixn">Любое число словами и обратно — во вкладке <a class="et" href="#/справочник/числа">«Числа»</a>.</div>` : ""}</section>`).join("")}
    <div class="card muted" id="gnone" hidden>Ничего не нашлось. Попробуй другое слово — или поищи в <a class="et" href="#/словарь">словаре</a>.</div></div></div>`;
}
function markText(root, q) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  let n = 0;
  for (const node of nodes) {
    const t = node.nodeValue, low = t.toLowerCase().replace(/ё/g, "е");
    let i = low.indexOf(q); if (i < 0) continue;
    const frag = document.createDocumentFragment(); let pos = 0;
    while (i >= 0) {
      frag.append(t.slice(pos, i)); const m = document.createElement("mark"); m.textContent = t.slice(i, i + q.length); frag.append(m); n++;
      pos = i + q.length; i = low.indexOf(q, pos);
    }
    frag.append(t.slice(pos)); node.replaceWith(frag);
  }
  return n;
}
function grammarFilter() {
  const q = gramQ.toLowerCase().replace(/ё/g, "е").trim();
  let shown = 0, hits = 0;
  for (const s of ET_GRAMMAR.sections) {
    const el = document.getElementById(s.id), a = $(`#gtoc [data-g="${s.id}"]`);
    el.innerHTML = el.innerHTML.replace(/<\/?mark>/g, "");
    const on = !q || s.text.includes(q);
    el.hidden = !on; a.classList.toggle("off", !on); shown += on;
    if (on && q.length >= 2) hits += markText(el, q);
  }
  $(".gintro").hidden = !!q;
  $("#gnone").hidden = shown > 0;
  $("#gcnt").textContent = q ? (shown ? `Разделов: ${shown}, совпадений: ${hits}` : "Нет совпадений") : "";
  const first = q && document.querySelector(".gsec mark");
  if (first && first.getBoundingClientRect().top > innerHeight * .8 || first && first.getBoundingClientRect().top < 80)
    window.scrollTo({ top: first.getBoundingClientRect().top + scrollY - 140, behavior: "smooth" });
  else if (q && !first) window.scrollTo({ top: 0, behavior: "smooth" });
}
function bindGrammar() {
  let t; $("#gq").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { gramQ = e.target.value; grammarFilter(); }, 150); });
  $("#gtoc").addEventListener("click", (e) => {
    const a = e.target.closest("a"); if (!a) return; e.preventDefault();
    const el = document.getElementById(a.dataset.g); if (el && !el.hidden) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: "smooth" });
  });
  if (gramQ) grammarFilter();
}

// ---------------------------------------------------------------- спряжение
const TENSES = [["наст", "Настоящее", "-e-", "делаю сейчас, делаю вообще"], ["прош", "Прошедшее", "-i-", "сделал однажды, дело сделано"],
  ["прош.длит", "Прошедшее длительное", "-a-", "делал долго, бывало делал"], ["буд", "Будущее", "-re-", "сделаю, буду делать"],
  ["скоро", "Скоро", "-o-", "сейчас сделаю, собираюсь"], ["только что", "Только что", "-u-", "только что сделал"]];
const PRON = [["je", "я"], ["tu", "ты"], ["il / el", "он / она"], ["nou", "мы"], ["vou", "вы"], ["ilz / elz", "они"]];
const MOOD_INFO = { "": ["без наклонения", "", "обычная форма"], "бы": ["бы", "-ri-", "«я сделал бы»: мечта, условие, вежливость"],
  "пусть": ["пусть", "-se-", "«пусть сделает», «чтобы сделал»"], "наверное": ["наверное", "-pe-", "«наверное, делает»: догадка"] };
let conjMood = "", conjVerb = "chanter";
function pageConj() {
  return `<p class="lead">Глагол = <b>основа + время + (наклонение) + лицо</b>. Каждая часть всегда одна и та же — поэтому у любого из 1 200 глаголов все формы строятся одинаково. Найди глагол по-русски или на Etoilal.</p>
  <div class="card cjhead"><div class="dhead" style="margin:0"><input class="in" id="cjq" placeholder="Например: петь, любить, chanter, esim" autocomplete="off">
    <div class="seg" id="cjmood">${Object.entries(MOOD_INFO).map(([m, [t]]) => `<button data-m="${m}" class="${m === conjMood ? "on" : ""}">${t}</button>`).join("")}</div></div>
    <div class="exs" id="cjsug"></div></div>
  <div id="cjout"></div>`;
}
async function conjRender() {
  await trReady();
  const i = E.findIndex((e) => e.w === conjVerb && e.f); if (i < 0) { $("#cjout").innerHTML = `<div class="card muted">Такого глагола нет.</div>`; return; }
  const e = E[i], T = RefCore.conj(e), mi = MOOD_INFO[conjMood], stem = e.w.replace(/er$/, "");
  const ex = (pi, f) => `<button class="cf" data-say="${esc(f)}" title="${esc(PRON[pi][1])} · ${esc(conjMood ? mi[0] : "")}"><span class="pr">${PRON[pi][0]}</span><b>${esc(f)}</b><i>▶</i></button>`;
  $("#cjout").innerHTML = `<div class="card cjverb"><div class="row" style="flex-wrap:wrap"><div><div class="big">${esc(e.w)}</div>
      <div class="rd">«${esc(rd(e.w))}» · ${esc(e.m || "")}${e.der ? ` · образован по правилам от <span class="et">${esc(e.der[0])}</span>` : ""}</div></div>${playBtn(e.w)}</div>
    <div class="cjparts"><span class="tag">основа <b class="et">${esc(stem)}</b></span><span class="tag">лицо: <b>m</b> я · <b>s</b> ты · <b>t</b> он · <b>n</b> мы · <b>z</b> вы · <b>l</b> они</span>
      ${conjMood ? `<span class="tag">наклонение «${mi[0]}» <b>${mi[1]}</b> — ${esc(mi[2])}</span>` : ""}</div></div>
  <div class="cjgrid">${TENSES.map(([, name, part, mean], t) => `<div class="card cjt"><div class="row"><h3>${name}${conjMood ? " + " + mi[0] : ""}</h3><span class="tag">${part}${mi[1]}</span></div>
      <div class="muted cjmean">${esc(mean)}${conjMood === "бы" ? " — бы" : conjMood === "пусть" ? " — пусть" : conjMood === "наверное" ? " — наверное" : ""}</div>
      ${T.forms[conjMood][t].map((f, p) => ex(p, f)).join("")}</div>`).join("")}</div>
  <div class="cjgrid cj3">
    <div class="card cjt"><h3>Приказ</h3><div class="muted cjmean">основа + e; «давай…» — форма «мы»</div>
      ${[[T.imp, "ты: сделай!"], [T.forms[""][0][3], "давай сделаем!"], [T.forms[""][0][4], "сделайте!"]].map(([f, m]) => `<button class="cf" data-say="${esc(f)}"><span class="pr">${m}</span><b>${esc(f)}!</b><i>▶</i></button>`).join("")}</div>
    <div class="card cjt"><h3>Неличные формы</h3><div class="muted cjmean">не меняются по лицам</div>
      ${[[T.inf, "инфинитив"], [T.part[0], "-ant: «-ущий»"], [T.part[1], "-ey: «-нный»"]].map(([f, m]) => `<button class="cf" data-say="${esc(f)}"><span class="pr">${m}</span><b>${esc(f)}</b><i>▶</i></button>`).join("")}</div>
    <div class="card cjt"><h3>Не, никогда, ничего</h3><div class="muted cjmean">одно слово <b>после</b> глагола</div>
      ${[[T.forms[""][0][0] + " pa", "я не …"], [T.forms[""][1][0] + " jame", "я никогда не …"], [T.forms[""][0][2] + " ryen", "он ничего не …"]].map(([f, m]) => `<button class="cf" data-say="${esc(f)}"><span class="pr">${m}</span><b>${esc(f)}</b><i>▶</i></button>`).join("")}</div>
  </div>
  <p class="muted" style="margin-top:12px">Всего у глагола 56 основных форм (6 времён × 6 лиц, 3 наклонения × 6 лиц, приказ, инфинитив), а наклонение можно добавить к любому времени — переключай вверху.</p>`;
}
function conjSuggest(q) {
  const ids = q ? RefCore.findVerbs(q, E).slice(0, 10) : ["chanter", "eser", "aver", "aler", "fezer", "emer", "voiyer", "parler"].map((w) => E.findIndex((e) => e.w === w && e.f)).filter((x) => x >= 0);
  $("#cjsug").innerHTML = ids.length ? ids.map((i) => `<button data-v="${esc(E[i].w)}" class="${E[i].w === conjVerb ? "on" : ""}"><span class="et">${esc(E[i].w)}</span> — ${esc((E[i].m || "").split(",")[0])}</button>`).join("")
    : `<span class="muted">Такого глагола не нашлось. Ищи по инфинитиву («петь») или по форме на Etoilal («chantim»).</span>`;
  return ids;
}
async function bindConj(arg) {
  await trReady();
  if (arg) { const ids = RefCore.findVerbs(arg, E); if (ids.length) conjVerb = E[ids[0]].w; }
  conjSuggest(""); conjRender();
  let t; $("#cjq").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => {
    const ids = conjSuggest(e.target.value.trim());
    if (ids.length && RefCore.findVerbs(e.target.value, E)[0] === ids[0] && e.target.value.trim().length >= 3) { conjVerb = E[ids[0]].w; conjRender(); conjSuggest(e.target.value.trim()); }
  }, 180); });
  $("#cjsug").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; conjVerb = b.dataset.v; conjRender();
    $("#cjsug").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b)); history.replaceState(null, "", "#/справочник/спряжение/" + conjVerb); });
  $("#cjmood").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; conjMood = b.dataset.m;
    $("#cjmood").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b)); conjRender(); });
}

// ---------------------------------------------------------------- числа
function pageNums() {
  const base = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 20, 21, 30, 45, 70, 99, 100, 200], [345, 1000, 2026, 1000000]];
  return `<p class="lead">Корни 1–10 французские, дальше — строго по десяткам: 70 = «семь-десять» (<span class="et">setdis</span>), никаких французских «четыре-двадцать». Сотни и тысячи пишутся отдельно, десятки — слитно.</p>
  <div class="two"><div class="card"><div class="k">Цифры → Etoilal</div>
      <input class="in" id="nnum" inputmode="numeric" placeholder="Например: 345" value="345" autocomplete="off" style="margin-top:10px;font-size:20px">
      <div class="nres" id="nout"></div><button class="btn sm" id="nrand">🎲 Случайное число</button></div>
    <div class="card"><div class="k">Etoilal → цифры</div>
      <input class="in" id="nword" placeholder="Например: deu mil deudis sis" value="setdis senk" autocomplete="off" style="margin-top:10px;font-size:20px">
      <div class="nres" id="nback"></div><div class="muted" style="font-size:13.5px">Можно писать и слитно: <span class="et">troisent</span> — пойму.</div></div></div>
  <div class="card" style="margin-top:16px"><h3>Главные числа</h3><div class="ngrid">${base.flat().map((n) => `<button class="cf" data-say="${esc(RefCore.numToEt(n))}"><span class="pr">${n}</span><b>${esc(RefCore.numToEt(n))}</b><i>▶</i></button>`).join("")}</div></div>
  <div class="card" style="margin-top:16px"><h3>Как это устроено</h3>
    <div class="nhow"><div><b class="et">deu</b> + <b class="et">dis</b> = <b class="et">deudis</b><span class="muted">два + десять → 20 (десятки — слитно)</span></div>
    <div><b class="et">deudis</b> + <b class="et">un</b> = <b class="et">deudis un</b><span class="muted">20 + 1 → 21</span></div>
    <div><b class="et">troi sent</b><span class="muted">три сотни → 300 (сотни — отдельно)</span></div>
    <div><b class="et">deu mil</b><span class="muted">две тысячи → 2000</span></div></div>
    <p class="muted" style="margin:10px 0 0">После числа существительное не меняется и артикль не нужен: <span class="et">troi etoil</span> — три звезды. Ноль — <span class="et">zero</span>, миллион — <span class="et">milyon</span> (от фр. <i>zéro</i> и <i>million</i>): <span class="et">deu milyon</span> — два миллиона. Цифры в тексте Etoilal можно оставлять цифрами.</p></div>`;
}
function numOut(n) {
  const w = RefCore.numToEt(n);
  return `<div class="row"><div class="nbig et">${esc(w)}</div>${playBtn(w)}</div><div class="rd">«${esc(rd(w))}»</div>`;
}
function bindNums() {
  const go = () => {
    const raw = $("#nnum").value.replace(/[\s ]/g, "");
    if (!raw) { $("#nout").innerHTML = ""; return; }
    const n = Number(raw);
    $("#nout").innerHTML = !/^\d+$/.test(raw) ? `<div class="muted">Напиши число цифрами.</div>`
      : n > RefCore.MAX ? `<div class="muted">До 999 999 999 считаю словами, дальше пиши цифрами.</div>` : numOut(n);
  };
  const back = () => {
    const v = $("#nword").value.trim(); if (!v) { $("#nback").innerHTML = ""; return; }
    const r = RefCore.etToNum(v);
    $("#nback").innerHTML = r.n == null ? `<div class="muted">${r.bad ? `Не узнал «${esc(r.bad)}». ` : ""}Числа: zero un deu troi katr senk sis set uit neuf dis sent mil milyon.</div>`
      : `<div class="row"><div class="nbig">${r.n.toLocaleString("ru")}</div>${playBtn(r.canon)}</div>` +
        (r.same ? `<div class="rd">«${esc(rd(r.canon))}»</div>` : `<div class="note fixn">Обычно пишут так: <span class="et">${esc(r.canon)}</span></div>`);
  };
  $("#nnum").addEventListener("input", go); $("#nword").addEventListener("input", back);
  $("#nrand").onclick = () => { const r = Math.random(); $("#nnum").value = String(r < .5 ? 1 + Math.floor(Math.random() * 99) : r < .85 ? 100 + Math.floor(Math.random() * 900) : 1000 + Math.floor(Math.random() * 9000)); go(); };
  trReady().then(() => { go(); back(); });
}

// ---------------------------------------------------------------- О языке
function pageAbout() {
  const P = [["🌊", "Льётся, как ручей", "Ударение — в конце смысловой группы, слоги ровные, слова сливаются: <span class='et'>le ami → l'ami</span>, <span class='et'>lez ami</span> звучит «лэзами».", "Lez etoil chantel dans le nui."],
    ["🧱", "Ноль исключений", "Ни падежей, ни рода у вещей, ни неправильных глаголов. Выучил правило — оно работает всегда.", "Je chantem, tu chantes, il chantet."],
    ["🔤", "Как пишется, так и читается", "Одна буква или сочетание — всегда один звук. Немых букв нет. Нет и трудных звуков: ни носовых, ни «х»; «р» — любое.", "Bonjour, ma ami!"],
    ["⭐", "Множественное число одним правилом", "Существительное не меняется. Число показывает слово перед ним: <span class='et'>le → lez</span>, <span class='et'>ma → maz</span> — у всех просто +z.", "Maz ami eset isi."],
    ["⏳", "Глагол из кирпичиков", "Основа + время + наклонение + лицо. Лицо — один звук: m я, s ты, t он… Шесть времён, включая «скоро» и «только что».", "Je chantum. Il chantot."],
    ["🎨", "Прилагательное с настроением", "После слова — просто факт, перед словом — образно: <span class='et'>un nui sonbr</span> «тёмная ночь», <span class='et'>un sonbr nui</span> «мрачная, страшная ночь».", "Un sonbr nui."]];
  const facts = [["5 700", "слов в словаре"], ["9 000+", "слов с производными"], ["6", "времён глагола"], ["0", "исключений"], [String(ET_TOC.length), "уроков в курсе"], ["8", "песен"]];
  const cmp = [["я пою / ты поёшь / он поёт", "je chantem / tu chantes / il chantet", "окончание — одна буква лица"],
    ["звезда / звёзды / звёздам", "l'etoil / lez etoil / a lez etoil", "слово не меняется, меняется артикль"],
    ["я не знаю", "je savem pa", "«не» — одно слово после глагола"], ["я тебя люблю", "je to emem", "«кого» — перед глаголом, как в русском"],
    ["я голоден", "je esem afame", "связка «быть» нужна всегда"], ["если бы ты пришёл, я бы спел", "si tu veniris, je chantirim", "«бы» — слог -ri- внутри глагола"]];
  return `<div class="about"><div class="ahero card"><div class="k">О языке</div><h1 class="page">Etoil<i>al</i> — язык звёзд</h1>
    <p class="lead" style="font-size:18px;max-width:760px">Этуалаль («звёздный», от <span class="et">etoil</span> — звезда) — придуманный язык с красотой французского и простотой конструктора. Корни слов почти французские, но звуки лёгкие для русского уха, а грамматика — без единого исключения. На нём пишут песни, сказки и стихи.</p>
    <div class="row" style="justify-content:flex-start;flex-wrap:wrap"><button class="btn gold" data-say="Etoilal eset le langaj de lez etoil.">▶ Послушать, как звучит</button><a class="btn" href="#/учиться">Начать учить</a><a class="btn" href="#/справочник">Грамматика</a></div>
    <div class="ph" style="margin-top:16px">Etoilal eset le langaj de lez etoil.</div><div class="rd">«${esc(rd("Etoilal eset le langaj de lez etoil."))}» — «Этуалаль — язык звёзд».</div></div>
  <div class="afacts">${facts.map(([n, t]) => `<div class="card"><b>${n}</b><span>${t}</span></div>`).join("")}</div>
  <h2 style="margin-top:26px">Чем он особенный</h2>
  <div class="aprin">${P.map(([ic, t, d, ex]) => `<div class="card"><div class="ic">${ic}</div><h3>${t}</h3><p class="muted">${d}</p><div class="row"><span class="et">${esc(ex)}</span>${playBtn(ex, 1)}</div></div>`).join("")}</div>
  <h2 style="margin-top:26px">По-русски и на Etoilal</h2>
  <div class="card"><div class="tblw"><table class="tbl acmp"><thead><tr><th>по-русски</th><th>на Etoilal</th><th>в чём правило</th></tr></thead><tbody>
    ${cmp.map(([r, e, w]) => `<tr><td>${esc(r)}</td><td><span class="et">${esc(e)}</span> ${playBtn(e, 1)}</td><td class="muted">${esc(w)}</td></tr>`).join("")}</tbody></table></div></div>
  <h2 style="margin-top:26px">Как он появился</h2>
  <div class="card atime">
    <div><b>Звучание</b><span>Сначала — 26 вариантов звучания: от парижского до «эльфийского». Победил умеренно-парижский, но без носовых, с «ю/ё» вместо ü/ö и с любым «р».</span></div>
    <div><b>Анкета</b><span>Девять раундов вопросов: каждое правило выбиралось так, чтобы язык остался красивым, но не стал трудным. Если правило грозило простоте — его упрощали.</span></div>
    <div><b>Слова</b><span>6 000 понятий получили слова из французских корней, подстроенных под звуки языка. Омонимов нет: если два слова совпали по звучанию, одно берёт латинскую или старофранцузскую форму корня.</span></div>
    <div><b>Имя</b><span>30 октября 2026 года язык назвали Etoilal — «звёздный».</span></div>
    <div><b>Курс, песни, переводчик</b><span>Дальше появились самоучитель, озвучка, песни с караоке, переводчик с русского и обратно и этот сайт.</span></div></div>
  <div class="card anext"><div><h3>С чего начать?</h3><p class="muted" style="margin:0">Пройди первый урок — за 10 минут научишься здороваться и говорить о себе.</p></div><a class="btn gold" href="#/учиться">Начать урок ▶</a></div></div>`;
}
