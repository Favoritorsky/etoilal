// Переводчик русский → Etoilal (1.11.2026). Без сервера: данные (словарь Etoilal с готовыми формами глаголов из кода
// языка, русские словоформы pymorphy3 с короткими граммемами) — в init(data). Работает в браузере и в Node (тесты).
//
// Правила Etoilal: артикль le/lez (после мой/этот/числа — без артикля, мн. число этих слов: +z); прилагательное — после
// существительного; местоимения «кого/кому» — перед глаголом (кто — кого — кому — глагол); «не» → pa после глагола,
// «никогда/ничего/никто» вместо pa; связка eser, где по-русски её нет («я голоден» → je esem afame); «у меня есть» → aver;
// прошедшее: сов. вид → -i- (сделал), несов. → -a- (делал); «бы» → -ri-, «пусть» → -se-, «давай» → форма «мы»;
// слияние le/de/se/ke/je/me перед гласной (l'ami). Чтение русскими буквами — по phon.py (parse + cyr).

let D = null, E = [], RU2E = {}, LEM = [], FORMS = {};
const yo = (s) => s.replace(/ё/g, "е");
const TENSE = ["наст", "прош", "прош.длит", "буд", "скоро", "только что"];
const PERS = ["я", "ты", "он", "мы", "вы", "они"];

let BYLEN = null, GF = null;
const OVR = {};                        // выбор смысла: русская лемма → индекс слова Etoilal; форма → лемма (для «поем»: петь/поесть)
const OVRF = {};
function choose(key, ei) { if (key.startsWith("form:")) OVRF[key.slice(5)] = ei; else OVR[key] = ei; }                      // словоформы по длине — для исправления опечаток
function init(data) {
  D = data; E = data.E; RU2E = data.ru2e; LEM = data.L; FORMS = data.F; BYLEN = null; GF = new Set(data.GF || []); BW = null;
  // смысл по умолчанию для многозначных слов (остальные — в выборе смысла): «счёт, пожалуйста» — в кафе
  for (const [lemma, w] of Object.entries({ счёт: "adisyon", счет: "adisyon" })) {
    const i = E.findIndex((e) => e.w === w);
    if (i >= 0 && RU2E[lemma] !== undefined) { const alt = D.ALT[lemma] || [RU2E[lemma]]; D.ALT[lemma] = [i, ...alt.filter((x) => x !== i)]; RU2E[lemma] = i; }
  }
}

// ------------------------------------------------------------------ исправление опечаток
// Неизвестное слово → ближайшая известная форма (Дамерау — Левенштейн: пропуск, лишняя, замена, перестановка соседних букв).
// Допуск: 1 правка для слов до 5 букв, 2 — для длиннее. Из равных по расстоянию — более частое слово (меньший номер в словаре).
function dl(a, b, max) {
  const n = a.length, m = b.length;
  if (Math.abs(n - m) > max) return max + 1;
  let prev2 = null, prev = Array.from({ length: m + 1 }, (_, j) => j);
  for (let i = 1; i <= n; i++) {
    const cur = [i]; let rowMin = i;
    for (let j = 1; j <= m; j++) {
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur.push(v); rowMin = Math.min(rowMin, v);
    }
    if (rowMin > max) return max + 1;
    prev2 = prev; prev = cur;
  }
  return prev[m];
}
const rankOf = (k) => { const an = FORMS[k] ? analyses(k) : []; return an.length ? Math.min(...an.map((a) => a.e)) : 0; };   // служебные — самые частые
// «по звучанию»: безударные о/а, е/и/я/э, ё, ю/у, сч/щ, ч/ш (што), тьс/тс, ь/ъ — типичные русские ошибки
const sound = (w) => w.replace(/ё/g, "е").replace(/сч|зч|жч/g, "щ").replace(/ться/g, "тся").replace(/[ьъ]/g, "")
  .replace(/о/g, "а").replace(/[еэя]/g, "и").replace(/ю/g, "у").replace(/ч/g, "ш").replace(/щ/g, "ш").replace(/(.)\1/g, "$1");
const SOUND = new Map();
function correct(w) {
  if (!BYLEN) {
    BYLEN = new Map();
    const add = (k) => { const L = k.length; if (!BYLEN.has(L)) BYLEN.set(L, []); BYLEN.get(L).push(k); };
    Object.keys(FORMS).forEach(add);
    [SUBJ, OBJ, DAT, STRESSED, PREP, CONJ, QW, ADV, NUM].forEach((t) => Object.keys(t).forEach(add));
  }
  if (!SOUND.size) {
    const keys = Object.keys(FORMS).concat(...[SUBJ, OBJ, DAT, STRESSED, PREP, CONJ, QW, ADV, NUM].map(Object.keys), ["что", "как", "это", "не", "никогда", "ничего"]);
    for (const k of keys) { const s2 = sound(k); if (!SOUND.has(s2)) SOUND.set(s2, []); SOUND.get(s2).push(k); }
  }
  const same = SOUND.get(sound(w));                                         // совпало по звучанию — из них ближе по буквам, потом частое
  if (same) {
    const score = (k) => [dl(w, k, 4), Math.abs(k.length - w.length), rankOf(k)];
    return same.reduce((b, k) => { const x = score(k), y = score(b); return x[0] < y[0] || (x[0] === y[0] && (x[1] < y[1] || (x[1] === y[1] && x[2] < y[2]))) ? k : b; });
  }
  const max = w.length <= 5 ? 1 : 2;
  let best = null, bd = max + 1, brank = Infinity;
  for (let L = w.length - max; L <= w.length + max; L++) {
    for (const k of BYLEN.get(L) || []) {
      const d = dl(w, k, Math.min(max, bd));
      if (d > max || d > bd) continue;
      const rank = rankOf(k);
      if (d < bd || rank < brank) { best = k; bd = d; brank = rank; }
    }
  }
  return best;
}

// ------------------------------------------------------------------ служебные слова
const SUBJ = { я: ["je", "я"], ты: ["tu", "ты"], он: ["il", "он"], она: ["el", "он"], оно: ["il", "он"], мы: ["nou", "мы"],
  вы: ["vou", "вы"], они: ["ilz", "они"] };
// кого / кому / ударная (после предлога); его/её/их — ещё и «чей»
const OBJ = { меня: ["mo", "moi"], тебя: ["to", "toi"], его: ["lo", "lui"], него: ["lo", "lui"], ее: ["la", "ela"], нее: ["la", "ela"],
  нас: ["no", "nou"], вас: ["vo", "vou"], их: ["loz", "leur"], них: ["loz", "leur"], себя: ["", "soi"] };
const DAT = { мне: ["mey", "moi"], тебе: ["tey", "toi"], ему: ["ley", "lui"], нему: ["ley", "lui"], ей: ["ley", "ela"], ней: ["ley", "ela"],
  нам: ["ney", "nou"], вам: ["vey", "vou"], им: ["leyz", "leur"], ним: ["leyz", "leur"], себе: ["", "soi"] };
const STRESSED = { мной: "moi", мною: "moi", тобой: "toi", тобою: "toi", ими: "leur", нами: "nou", вами: "vou", собой: "soi" };
const POSS_OF = { я: "ma", ты: "ta", он: "sa", мы: "nota", вы: "vota", они: "leura" };
const POSS = [[/^мо(й|я|е|и|его|ей|ему|им|их|ими|ем|ю|ею)$/, "ma"], [/^тво(й|я|е|и|его|ей|ему|им|их|ими|ем|ю|ею)$/, "ta"],
  [/^наш(а|е|и|его|ей|ему|им|их|ими|ем|у)?$/, "nota"], [/^ваш(а|е|и|его|ей|ему|им|их|ими|ем|у)?$/, "vota"],
  [/^сво(й|я|е|и|его|ей|ему|им|их|ими|ем|ю|ею)$/, "@свой"]];
const POSS_PLUR = /^(мои|моих|моим|моими|твои|твоих|твоим|твоими|наши|наших|нашим|нашими|ваши|ваших|вашим|вашими|свои|своих|своим|своими)$/;
const DEM = [[/^(этот|эта|это|эти|этого|этой|этому|этим|этих|этими|этом|эту)$/, "se"], [/^(тот|та|те|того|той|тому|тем|тех|теми|том|ту)$/, "sela"]];
const DEM_PLUR = /^(эти|этих|этим|этими|те|тех|теми)$/;
const PREP = { в: "dans", во: "dans", на: "sur", под: "sou", с: "avek", со: "avek", без: "sans", для: "pour", у: "che", между: "antr",
  после: "apre", до: "juska", перед: "devant", за: "deryer", вокруг: "otour", через: "par", около: "pre", возле: "pre", к: "a", ко: "a",
  из: "de", от: "de", о: "de", об: "de", обо: "de", по: "par", про: "de", среди: "antr", над: "sur", во_время: "pandant" };
const CONJ = { чем: "ke", и: "e", или: "oubyen", но: "me", а: "e", если: "si", хотя: "byenke", значит: "donk", чтобы: "ke" };
const QW = { кто: "ki", где: "ou", куда: "ou", откуда: "dou", когда: "kan", почему: "pourkoi", зачем: "pourkoi", сколько: "konbyen" };
const KEL = /^(какой|какая|какое|какие|какого|какой|какому|каким|каких|какую|каком)$/;
const ADV = { сегодня: "ojourdui", завтра: "demen", вчера: "yer", сейчас: "mentnant", теперь: "mentnant", всегда: "toujour",
  здесь: "isi", тут: "isi", там: "laba", очень: "tre", много: "boku", уже: "deja", еще: "ankor", тоже: "osi", также: "osi",
  только: "seulman", даже: "meme", почти: "preske", вместе: "ansanbl", так: "ensi", потом: "pui", затем: "pui", тогда: "alor",
  конечно: "byensur", везде: "partou", нигде: "nulpar", вот: "voila", спасибо: "mersi", привет: "salu", пожалуйста: "silvouple",
  здравствуй: "bonjour", здравствуйте: "bonjour", да: "oui", нет: "non", хорошо: "byen", плохо: "mal", ну: "",
  поэтому: "donk", намного: "boku", гораздо: "boku", дома: "a le mezon", домой: "a le mezon", вообще: "an jeneral",
  "что-нибудь": "kelkchoz", "что-либо": "kelkchoz", "кто-нибудь": "kelkun", "кто-либо": "kelkun", "когда-нибудь": "un jour",
  "где-нибудь": "kelkpar", "где-то": "kelkpar", "куда-нибудь": "kelkpar", "куда-то": "kelkpar", "кое-что": "kelkchoz", назад: "aryer",
  вперед: "avant", наконец: "anfen", "наконец-то": "anfen", вовремя: "a l'eur", сразу: "tou de suit", вдруг: "sudenman", слишком: "trop", снова: "ankor", опять: "ankor", вместо: "o lyeu de", например: "par egzanpl", кстати: "a propo", правда: "vreman" };
const ALL = /^(все|всё|весь|вся|всех|всем|всеми|всего|всей|всю)$/;
const EACH = /^(каждый|каждая|каждое|каждого|каждой|каждому|каждым|каждом|каждую)$/;
const NUM = { один: 1, одна: 1, одно: 1, два: 2, две: 2, три: 3, четыре: 4, пять: 5, шесть: 6, семь: 7, восемь: 8, девять: 9, десять: 10,
  одиннадцать: 11, двенадцать: 12, тринадцать: 13, четырнадцать: 14, пятнадцать: 15, шестнадцать: 16, семнадцать: 17,
  восемнадцать: 18, девятнадцать: 19, двадцать: 20, тридцать: 30, сорок: 40, пятьдесят: 50, шестьдесят: 60, семьдесят: 70,
  восемьдесят: 80, девяносто: 90, сто: 100, тысяча: 1000, тысячи: 1000, тысяч: 1000, ноль: 0, нуль: 0, миллион: 1000000, миллиона: 1000000, миллионов: 1000000 };
const MULTI = [[["потому", "что"], "pask"], [["так", "как"], "pask"], [["до", "свидания"], "orevoir"], [["доброе", "утро"], "bonjour"],
  [["добрый", "день"], "bonjour"], [["добрый", "вечер"], "bonjour"], [["кто", "то"], "kelkun"], [["что", "то"], "kelkchoz"],
  [["во", "время"], "pandant"], [["как", "дела"], "koman tu ales"], [["как", "у", "тебя", "дела"], "koman tu ales"],
  [["как", "у", "вас", "дела"], "koman vou alez"], [["как", "ты", "?"], "koman tu ales"], [["спасибо", "за"], "mersi pour"], [["сколько", "тебе", "лет"], "konbyen d'an tu aves"],
  [["сколько", "вам", "лет"], "konbyen d'an vou avez"], [["сколько", "ему", "лет"], "konbyen d'an il avet"], [["сколько", "ей", "лет"], "konbyen d'an el avet"], [["в", "мире"], "dans le mond"], [["может", "быть"], "@наверное"]];
const UNITS = ["", "un", "deu", "troi", "katr", "senk", "sis", "set", "uit", "neuf", "dis"];
function numEt(n) {
  if (n === 0) return "zero";
  if (n >= 1000000) { const m = Math.floor(n / 1000000), r = n % 1000000; return (m > 1 ? numEt(m) + " " : "") + "milyon" + (r ? " " + numEt(r) : ""); }
  if (n <= 10) return UNITS[n];
  if (n >= 1000) { const t = Math.floor(n / 1000), r = n % 1000; return (t > 1 ? numEt(t) + " " : "") + "mil" + (r ? " " + numEt(r) : ""); }
  if (n >= 100) { const h = Math.floor(n / 100), r = n % 100; return (h > 1 ? numEt(h) : "") + "sent" + (r ? " " + numEt(r) : ""); }
  const t = Math.floor(n / 10), u = n % 10;
  return (t === 1 ? "dis" : UNITS[t] + "dis") + (u ? " " + UNITS[u] : "");
}

// ------------------------------------------------------------------ разбор
function analyses(w) {
  const s = FORMS[yo(w)];
  if (!s) return [];
  const fit = (a) => { const p = E[a.e] && E[a.e].p; return a.code.startsWith("A") ? p === "a" : a.code.startsWith("N") ? p === "n" : a.code.startsWith("V") ? p === "v" : true; };
  return s.split(";").map((x) => { const [li, code] = x.split("|"); const lemma = LEM[+li]; return { lemma, code, e: RU2E[lemma] }; })
    .sort((a, b) => fit(b) - fit(a) || (b.lemma === yo(w)) - (a.lemma === yo(w)))
    .filter((a) => a.e !== undefined);
}
const isN = (a) => a && a.code.startsWith("N");
const isA = (a) => a && (a.code === "A" || a.code.startsWith("A:"));
const isV = (a) => a && a.code.startsWith("V");

function tokenize(text) {
  const out = [];
  const re = /[А-Яа-яЁё]+(?:-[А-Яа-яЁё]+)*|[A-Za-z]+(?:'[A-Za-z]+)?|\d+(?:[.,]\d+)?|[.!?…]+|[,;:—–-]|"|«|»|\(|\)/g;
  let m;
  while ((m = re.exec(text))) out.push(m[0]);
  return out;
}
const isWord = (t) => /^[А-Яа-яЁёA-Za-z\d]/.test(t);

const TR = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "j", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "ou", ф: "f", х: "kh", ц: "ts", ч: "tch", ш: "ch", щ: "ch", ъ: "", ы: "i", ь: "", э: "e", ю: "u", я: "ya" };
const translit = (w) => { const t = [...w.toLowerCase()].map((c) => TR[c] ?? c).join(""); return t[0].toUpperCase() + t.slice(1); };

// служебное слово (по таблицам) — не глагол, даже если pymorphy видит форму («мой» ← мыть)
function isFunc(low) {
  return low === "это" || /^котор/.test(low) || SUBJ[low] || OBJ[low] || DAT[low] || STRESSED[low] || PREP[low] || CONJ[low] !== undefined || QW[low] ||
    ADV[low] !== undefined || NUM[low] !== undefined || POSS.some(([re]) => re.test(low)) || DEM.some(([re]) => re.test(low)) ||
    ALL.test(low) || EACH.test(low) || KEL.test(low) || ["не", "бы", "ли", "пусть", "давай", "давайте", "что", "как", "никогда", "ничего", "никто"].includes(low);
}

// ------------------------------------------------------------------ перевод предложения
function verbForm(ei, tense, person, mood) {
  const f = E[ei].f;
  if (!f) return E[ei].w;
  if (tense === "inf") return f[55];
  if (tense === "imp") return f[54];
  const p = PERS.indexOf(person) < 0 ? 2 : PERS.indexOf(person);
  if (mood) return f[36 + ["бы", "пусть", "наверное"].indexOf(mood) * 6 + p];
  return f[TENSE.indexOf(tense) * 6 + p];
}
// частые имена людей: с большой буквы даже в начале фразы — имя, а не опечатка («Марк поёт» ≠ «мрак»)
const PERSON = new Set("Марк Тео Анна Аня Иван Ваня Мария Маша Дмитрий Дима Саша Александр Александра Алексей Лёша Андрей Сергей Серёжа Никита Максим Артём Егор Илья Кирилл Михаил Миша Павел Паша Олег Игорь Денис Антон Роман Рома Даниил Даня Тимур Платон Глеб Матвей Лиза Елизавета Катя Екатерина Даша Дарья Настя Анастасия Оля Ольга Таня Татьяна Наташа Наталья Юля Юлия Ксюша Ксения Полина Алина Алиса Вика Виктория Соня София Софья Света Светлана Лена Елена Ира Ирина Марина Карина Ева Пётр Петя Коля Николай Вова Владимир Женя Евгений Леон Лео Ян Яна Тимофей Фёдор Степан Вася Василий Гриша Григорий Вадим Влад Владислав Стас Юра Юрий Костя Константин Боря Борис Арсений Сеня Ярослав Слава Вячеслав Злата Милана Ульяна Варя Варвара Кира Майя Аля Эмма Лилия Лиля Диана Жанна Пол Том Джон Макс".toLowerCase().replace(/ё/g, "е").split(" "));
const BE = () => RU2E["быть"], HAVE = () => RU2E["иметь"];
const lang_an = () => E[RU2E["год"]].w;

function sentence(toks, opts = {}) {
  // слова в нижнем регистре; многословные выражения сливаются в один токен
  const fixes = [];
  toks = toks.map((t, i) => {
    if (!/^[А-Яа-яЁё]/.test(t) || (/^[А-ЯЁ]/.test(t) && (i > 0 || !opts.first || PERSON.has(yo(t.toLowerCase()))))) return t;   // имя с большой буквы — не трогать
    const low = yo(t.toLowerCase());
    if (isFunc(low) || analyses(low).length || MULTI.some(([seq]) => seq.includes(low)) || /^сам(ый|ая|ое|ые|ого|ому|ым|ом|ой|ую|ых|ыми)$/.test(low)) return t;
    const c = correct(low);
    if (!c || c === low) return t;
    fixes.push([t, c]);
    return /^[А-ЯЁ]/.test(t) ? c[0].toUpperCase() + c.slice(1) : c;
  });
  const W = [];
  for (let i = 0; i < toks.length; i++) {
    const low = yo(toks[i].toLowerCase());
    let hit = null;
    for (const [seq, v] of MULTI) {
      if (seq.every((s, k) => yo((toks[i + k] || "").toLowerCase()) === s || (s === "то" && toks[i + k] === "-" && yo((toks[i + k + 1] || "").toLowerCase()) === "то")))
        { hit = [seq, v]; break; }
    }
    if (hit) { W.push({ raw: hit[0].join(" "), low: hit[0].join(" "), multi: hit[1] }); i += hit[0].length - 1; continue; }
    const mw = (D.MW || []).find(([seq]) => seq.every((x, k) => yo((toks[i + k] || "").toLowerCase()).startsWith(x.slice(0, -2))));
    if (mw) { W.push({ raw: mw[0].join(" "), low: mw[0].join(" "), multi: E[mw[1]].w }); i += mw[0].length - 1; continue; }
    if (/^(кто|что)-то$/.test(low)) { W.push({ raw: toks[i], low, multi: low.startsWith("кто") ? "kelkun" : "kelkchoz" }); continue; }
    W.push({ raw: toks[i], low });
  }
  const question = W.some((w) => w.raw.includes("?"));
  const words = W.filter((w) => isWord(w.raw) || w.multi);
  const st = { subj: null, verbAt: -1, neg: null, mood: null, lets: false, futAux: false, pendingObj: [], afterPrep: false,
    det: null, detPlur: false, adjs: [], afterCopula: !!opts.afterCopula, hasVerb: false };
  // есть ли глагол в части предложения начиная с from (до «потому что / если / но / что …»)
  const BOUND = (w) => w.multi === "pask" || (CONJ[w.low] !== undefined && !["и", "а"].includes(w.low)) || w.low === "что";
  const verbAhead = (from) => { for (let k = from; k < words.length; k++) { const w = words[k]; if (k > from && BOUND(w)) return false;
    if (!w.multi && !isFunc(w.low) && analyses(w.low).some(isV)) return true; } return false; };
  st.hasVerb = verbAhead(0);
  const newClause = (i) => { st.verbAt = -1; st.subj = null; st.hasVerb = verbAhead(i + 1); st.neg = null; st.mood = null; };
  const out = [];                           // {t: текст Etoilal, src: русское, unk}
  const unknown = [];
  const emit = (t, src, extra = {}) => { if (t) { out.push({ t, src, ...(st.alts && src === st.altsSrc ? { alts: st.alts } : {}), ...extra }); } };
  const placeVerb = (t, src, imperative = false) => {
    // местоимения-дополнения — перед глаголом; в приказе — после (как в курсе: Edez mo!)
    if (!imperative) { for (const o of st.pendingObj) emit(o.t, o.src); st.pendingObj = []; }
    emit(t, src); st.verbAt = out.length - 1;
    st.afterCopula = /^es[eiar]/.test(t);                                      // после «быть» — «какой-то»: eset un dokteur
    if (imperative) { for (const o of st.pendingObj) emit(o.t, o.src); st.pendingObj = []; st.imperative = true; }
    if (st.neg) { emit(st.neg, st.negSrc || "не"); st.neg = null; }
  };
  const subjPerson = () => st.subj || "он";
  const copulaIfNeeded = () => {
    if (st.verbAt >= 0 || st.hasVerb) return;
    // «очень, тоже, уже…» стоят перед прилагательным — связку ставим перед ними: El eset tre joli
    let k = out.length;
    while (k > 0 && ["tre", "trop", "vreman", "osi", "deja", "ankor", "toujour", "preske", "ensi", "boku", "seulman", "meme"].includes(out[k - 1].t.toLowerCase())) k--;
    const tail = out.splice(k);
    placeVerb(verbForm(BE(), "наст", subjPerson(), st.mood), "(есть)");
    out.push(...tail);
  };
  const flushNP = (nounT, nounSrc, plural) => {
    let det = st.det;
    if (det === "@art") det = null;
    if (det === null && st.afterCopula && !st.adjs.some((a) => a.t.startsWith("le plu"))) { emit(plural ? "unz" : "un", ""); st.afterCopula = false; }
    else if (det === null) emit(plural ? "lez" : "le", "");
    else if (det !== "") emit(plural && !/^\d|^(un|deu|troi|katr|senk|sis|set|uit|neuf|dis|sent|mil|zero)/.test(det) && !/z$/.test(det) ? det + "z" : det, st.detSrc);
    emit(nounT, nounSrc, { noun: true });
    for (const a of st.adjs) emit(a.t, a.src);
    st.det = null; st.adjs = []; st.detPlur = false;
  };
  const nextNounAhead = (i) => {
    for (let k = i + 1; k < words.length; k++) {
      const an = analyses(words[k].low);
      if (an.some(isN)) return true;
      if (!an.some(isA)) return false;
    }
    return false;
  };

  for (let i = 0; i < words.length; i++) {
    const w = words[i], low = w.low, nxt = words[i + 1] ? words[i + 1].low : "";
    if (w.multi) {
      if (w.multi === "@наверное") { st.mood = "наверное"; continue; }
      emit(w.multi, w.raw); if (w.multi === "pask") newClause(i); continue;
    }
    // «мне грустно / холодно / скучно» → Je esem trist (по-этуальски чувствует сам человек)
    if (DAT[low] && words[i + 1] && /о$/.test(nxt) && analyses(nxt).some(isA) && !analyses(nxt).some(isV) && st.verbAt < 0 && !/^(можно|нужно|надо|нельзя|жалко|жаль)$/.test(nxt)) {
      const pr = { мне: "я", тебе: "ты", ему: "он", ей: "она", нам: "мы", вам: "вы", им: "они" }[low];
      if (pr) {
        const ad = analyses(nxt).find(isA); st.subj = pr === "она" ? "он" : pr;
        emit(pr === "она" ? "el" : SUBJ[pr][0], low); placeVerb(verbForm(BE(), "наст", st.subj, st.mood), "(есть)"); st.hasVerb = true;
        emit(E[ad.e].w, nxt); i += 1; continue;
      }
    }
    // «должен», «мне надо/нужно + глагол» → dever
    if (/^долж(ен|на|но|ны)$/.test(low) && RU2E["должен"] !== undefined) {
      const per = st.subj || (low === "должны" ? "они" : "он");
      placeVerb(verbForm(RU2E["должен"], st.pastMod ? "прош.длит" : "наст", per, st.mood), w.raw); st.hasVerb = true; continue;
    }
    if (DAT[low] && /^(надо|нужно|необходимо)$/.test(nxt) && words[i + 2] && analyses(words[i + 2].low).some((a) => a.code === "V:inf") && RU2E["должен"] !== undefined) {
      const pr = { мне: "я", тебе: "ты", ему: "он", ей: "она", нам: "мы", вам: "вы", им: "они" }[low] || "он";
      st.subj = pr === "она" ? "он" : pr; emit(pr === "она" ? "el" : SUBJ[pr][0], low);
      placeVerb(verbForm(RU2E["должен"], "наст", st.subj, st.mood), nxt); st.hasVerb = true; i += 1; continue;
    }
    // «мне 15 лет» → J'avem 15 an
    if (DAT[low] && (/^\d+$/.test(nxt) || NUM[nxt] !== undefined) && /^(год|года|лет)$/.test(words[i + 2] ? words[i + 2].low : "")) {
      const pr = { мне: "я", тебе: "ты", ему: "он", ей: "он", нам: "мы", вам: "вы", им: "они" }[low] || "он";
      st.subj = pr; emit(SUBJ[pr][0], low); placeVerb(verbForm(HAVE(), "наст", pr, st.mood), "(есть)"); st.hasVerb = true;
      emit(/^\d/.test(nxt) ? nxt : numEt(NUM[nxt]), nxt); emit(lang_an(), "лет"); i += 2; continue;
    }
    // «у меня (есть/был) …» → aver
    const n2_ = words[i + 2] ? words[i + 2].low : "";
    const haveNext = /^(есть|был[аио]?|будет|будут)$/.test(n2_) || !n2_ || analyses(n2_).some((a) => isN(a) || isA(a)) || NUM[n2_] !== undefined || /^\d/.test(n2_) ||
      POSS.some(([re]) => re.test(n2_)) || DEM.some(([re]) => re.test(n2_)) || ALL.test(n2_);
    if (low === "у" && (OBJ[nxt] || nxt === "меня") && words.slice(i + 2, i + 5).some((x) => analyses(x.low).some((a) => isV(a) && /^(получаться|получиться|успеть|выходить|выйти)$/.test(a.lemma)))) {
      const pr = { меня: "я", тебя: "ты", него: "он", нее: "он", нас: "мы", вас: "вы", них: "они" }[nxt] || "он";   // у тебя получается → tu parvenes
      st.subj = pr; emit(SUBJ[pr][0], "у " + nxt); i += 1; continue;
    }
    if (low === "у" && (OBJ[nxt] || nxt === "меня") && !haveNext) {
      emit("che", "у"); emit(({ меня: "moi", тебя: "toi", него: "lui", нее: "ela", нас: "nou", вас: "vou", них: "leur" })[nxt] || "lui", nxt); i += 1; continue;
    }
    if (low === "у" && (OBJ[nxt] || nxt === "меня")) {
      const pr = { меня: "я", тебя: "ты", него: "он", нее: "он", нас: "мы", вас: "вы", них: "они" }[nxt] || "он";
      st.subj = pr; emit(SUBJ[pr][0], "у " + nxt);
      const n2 = words[i + 2] ? words[i + 2].low : "";
      let tense = "наст", skip = 1;
      if (n2 === "есть") skip = 2; else if (/^был[аио]?$/.test(n2)) { tense = "прош.длит"; skip = 2; } else if (/^будет$/.test(n2)) { tense = "буд"; skip = 2; }
      placeVerb(verbForm(HAVE(), tense, pr, st.mood), "есть"); st.hasVerb = true;
      i += skip; continue;
    }
    if (OBJ[low] && nxt === "зовут" && ["меня", "тебя", "его", "ее", "нас", "вас", "их"].includes(low)) {
      const pos = { меня: "ma", тебя: "ta", его: "sa", ее: "sa", нас: "nota", вас: "vota", их: "leura" }[low];
      emit(pos, low); emit("nom", "имя"); placeVerb("eset", "зовут"); i += 1; continue;              // «меня зовут» → ma nom eset
    }
    if (low === "не") {
      // «понял не всё» — глагол уже стоит: pa сразу после него
      if (st.verbAt >= 0 && !analyses(nxt).some(isV) && !(out[st.verbAt + 1] && /^(pa|jame|ryen)$/.test(out[st.verbAt + 1].t))) { out.splice(st.verbAt + 1, 0, { t: "pa", src: "не" }); continue; }
      if (!st.neg) { st.neg = "pa"; st.negSrc = "не"; } continue;
    }
    // «который»: подлежащее → ki, иначе → ke (как во французском)
    if (/^котор(ый|ая|ое|ые)$/.test(low)) { emit("ki", w.raw); newClause(i); continue; }
    if (/^котор(ого|ой|ому|ым|ом|ую|ых|ыми)$/.test(low)) { emit("ke", w.raw); newClause(i); continue; }        // «ничего/никогда не» — остаётся ryen/jame
    if (low === "никогда") { st.neg = "jame"; st.negSrc = "никогда"; if (st.verbAt >= 0) { emit("jame", "никогда"); st.neg = null; } continue; }
    if (low === "ничего") { if (st.verbAt >= 0) emit("ryen", "ничего"); else { st.neg = "ryen"; st.negSrc = "ничего"; } continue; }
    if (low === "никто") { st.subj = "он"; emit("persone", "никто"); st.negLock = true; continue; }
    if (st.negLock && st.neg === "pa") st.neg = null;
    if (low === "бы") { st.mood = "бы"; continue; }
    if (low === "ли") { out.unshift({ t: "eske", src: "ли" }); continue; }
    if (low === "пусть") { st.mood = "пусть"; emit("ke", "пусть"); continue; }
    if (low === "давай" || low === "давайте") { st.lets = true; continue; }
    if (low === "будет" || low === "буду" || low === "будешь" || low === "будем" || low === "будете" || low === "будут") {
      if (analyses(nxt).some((a) => a.code === "V:inf")) { st.futAux = true; st.futPerson = { буду: "я", будешь: "ты", будем: "мы", будете: "вы", будут: "они" }[low] || "он"; continue; }
    }
    const npAhead = nextNounAhead(i) || analyses(nxt).some(isA) || /^сам(ый|ая|ое|ые|ого|ому|ым|ом|ой|ую|ых|ыми)$/.test(nxt) || POSS.some(([re]) => re.test(nxt)) || DEM.some(([re]) => re.test(nxt)) || NUM[nxt] !== undefined;
    if (low === "это" && !st.det && npAhead && i === 0 && !st.hasVerb) {
      emit("se", "это"); st.subj = "он"; placeVerb(verbForm(BE(), "наст", "он", st.mood), "(есть)"); continue;
    }    if (low === "это" && !npAhead && st.verbAt < 0 && !st.subj) { emit("se", "это"); st.subj = "он"; continue; }   // «Это очень красиво» → S'eset tre joli

    if (low === "что") { const q = question && st.verbAt < 0 && out.length < 2; emit(q ? "koi" : "ke", "что"); if (!q) newClause(i); continue; }
    if (low === "как") { emit(question ? "koman" : "kom", "как"); continue; }
    if (QW[low]) { emit(QW[low], w.raw); continue; }
    if (KEL.test(low)) { emit("kel", w.raw); continue; }
    if (CONJ[low] !== undefined && !(low === "значит" && i > 0 && /^(что|это)$/.test(words[i - 1].low))) { emit(CONJ[low], w.raw); if (low !== "и" && low !== "а") newClause(i); continue; }
    if (low === "на" && st.verbAt >= 0 && /^(regard|smotr|repond)/.test(out[st.verbAt].t) && (st.verbAt === out.length - 1 || (st.verbAt === out.length - 2 && /^(pa|jame|ryen)$/.test(out[out.length - 1].t)))) { st.afterPrep = true; continue; }
    if (low === "по" && st.verbAt >= 0 && /^(anui|ennui)/.test(out[st.verbAt].t)) { emit("de", w.raw); st.afterPrep = true; continue; }   // скучаю по друзьям
    if (PREP[low] && !(low === "с" && nxt === "")) { emit(low === "у" ? "pre" : PREP[low], w.raw); st.afterPrep = true; continue; }
    const STRP = { я: "moi", ты: "toi", он: "lui", она: "ela", мы: "nou", вы: "vou", они: "leur" };
    if (STRP[low] && out.length && out[out.length - 1].src === "чем") { emit(STRP[low], w.raw); continue; }   // чем я → ke moi
    if (SUBJ[low] && !(st.afterPrep)) { st.subj = SUBJ[low][1]; emit(SUBJ[low][0], w.raw); continue; }
    if (STRESSED[low]) { emit(STRESSED[low], w.raw); st.afterPrep = false; continue; }
    const CMPP = { меня: "moi", тебя: "toi", его: "lui", ее: "ela", нас: "nou", вас: "vou", их: "leur" };
    if (st.compare && CMPP[low]) { emit("ke", ""); emit(CMPP[low], w.raw); st.compare = false; continue; }   // лучше меня → plu bon ke moi
    if (OBJ[low] || DAT[low]) {
      const [cl, stressed] = OBJ[low] || DAT[low];
      const possessive = ["его", "ее", "их"].includes(low) && (analyses(nxt).some(isN) || analyses(nxt).some(isA));
      if (possessive) { st.det = low === "их" ? "leura" : "sa"; st.detSrc = w.raw; continue; }
      if (st.afterPrep || !cl) { emit(stressed, w.raw); st.afterPrep = false; continue; }
      const o = { t: cl, src: w.raw, dat: !!DAT[low] };
      if (st.verbAt >= 0 && st.imperative) emit(o.t, o.src);                      // «помоги мне» → Ede mey
      else if (st.verbAt >= 0) { out.splice(st.verbAt, 0, o); st.verbAt++; }   // «люблю тебя» → je to emem
      else { st.pendingObj.push(o); st.pendingObj.sort((a, b) => a.dat - b.dat); }
      continue;
    }
    let pm = POSS.find(([re]) => re.test(low));
    if (pm) { st.det = pm[1] === "@свой" ? POSS_OF[subjPerson()] : pm[1]; st.detSrc = w.raw; st.detPlur = POSS_PLUR.test(low); continue; }
    pm = DEM.find(([re]) => re.test(low));
    if (pm && (nextNounAhead(i) || analyses(nxt).some(isA))) { st.det = pm[1]; st.detSrc = w.raw; continue; }
    if (pm && /^(тот|та|те|того|той|тех|теми|тем)$/.test(low)) { emit(DEM_PLUR.test(low) ? "selaz" : "sela", w.raw); continue; }   // «как те» → kom selaz
    if (EACH.test(low)) { st.det = "chak"; st.detSrc = w.raw; continue; }
    if (ALL.test(low)) { emit("tou", w.raw); continue; }
    if (/^\d/.test(low)) {                                                     // цифры — цифрами
      if (nextNounAhead(i)) { st.det = w.raw; st.detSrc = w.raw; } else emit(w.raw, w.raw);
      continue;
    }
    if (/^[a-z]/i.test(w.raw)) { emit(w.raw, w.raw, { latin: true }); continue; }   // латиница (Etoilal, имена) — как есть
    if (NUM[low] !== undefined) {
      const n = NUM[low];
      if (nextNounAhead(i)) { st.det = numEt(n); st.detSrc = w.raw; } else emit(numEt(n), w.raw);
      continue;
    }
    if (ADV[low] !== undefined) { emit(ADV[low], w.raw); continue; }

    // ---------------- полнозначное слово
    let an = analyses(low);
    if (/^сто(ит|ят|ил|ила|ило|или)$/.test(low) && words.some((x) => x.low === "сколько" || x.low === "дорого" || x.low === "дешево"))
      an = analyses(low).filter((a) => a.lemma === "стоить").concat(an.filter((a) => a.lemma === "стоить" ? false : false));
    // имена (страны, города), языки
    const prop = an.find((a) => a.code === "P" || a.code === "L");
    if (prop) {
      const pe = E[prop.e];
      if (prop.code === "P") {
        if (out.length && st.afterPrep && ["dans", "sur"].includes(out[out.length - 1].t)) out[out.length - 1].t = "a";   // в Москве → a Moskou
        emit(pe.w, w.raw, { name: true }); st.afterPrep = false;
        if (!st.subj && st.verbAt < 0) st.subj = "он";
        continue;
      }
      // язык: «русский язык», «на русском», «по-русски» → rus; «русский человек» → прил. после слова
      if (out.length && st.afterPrep && out[out.length - 1].t === "sur") out.pop();
      st.afterPrep = false;
      if (/^язык/.test(nxt)) { emit(pe.w, w.raw + " " + nxt); i += 1; continue; }
      if (analyses(nxt).some(isN)) { st.adjs.push({ t: pe.w, src: w.raw }); continue; }
      emit(pe.w, w.raw); continue;
    }
    // «самый красивый» → le plu joli; «больше времени» → plu de tan
    if (/^сам(ый|ая|ое|ые|ого|ой|ому|ым|ом|ую|ых|ыми)$/.test(low) && words[i + 1] && analyses(words[i + 1].low).some(isA)) { st.superl = true; continue; }
    if (/^(больше|меньше)$/.test(low) && words[i + 1] && analyses(words[i + 1].low).some(isN) && !analyses(words[i + 1].low).some(isA)) {
      emit(low === "больше" ? "plu de" : "mouen de", w.raw); st.det = ""; continue;
    }
    if (/^(больше|меньше)$/.test(low) && st.verbAt >= 0) { emit(low === "больше" ? "plu" : "mouen", w.raw); continue; }   // люблю больше → emem plu
    if (!an.length || (/^[А-ЯЁ]/.test(w.raw) && i > 0 && !an.some((a) => a.code !== "N:s"))) {
      if (/^[А-ЯЁ]/.test(w.raw) && (i > 0 || !opts.first || PERSON.has(low))) {   // имя — латиницей; после предлога — без падежного окончания
        let nm = w.raw;
        if (st.afterPrep && nm.length > 3) nm = nm.replace(/(ом|ем)$/, "").replace(/ой$/, "а").replace(/ей$/, "я").replace(/([бвгдзклмнпрстфхцчшщ])[уеаы]$/, "$1");
        emit(translit(nm), w.raw, { name: true }); st.afterPrep = false; continue;
      }
      emit(w.raw, w.raw, { unk: true }); unknown.push(w.raw); st.afterPrep = false; continue;
    }
    // выбор разбора по соседям
    let pick = null;
    const prevWasPrep = st.afterPrep;
    if ((prevWasPrep || st.det || st.adjs.length) && an.some(isN)) pick = an.find(isN);
    // «Мы любим друга»: подлежащее есть, глагола ещё нет — личная форма глагола важнее краткого прилагательного («любим», «хвалим»)
    else if (st.subj && st.verbAt < 0 && an.some((a) => /^V:(pres|fut|past)/.test(a.code))) pick = an.find((a) => /^V:(pres|fut|past)/.test(a.code));
    else if (an.some(isA) && nextNounAhead(i)) pick = an.find(isA);
    else if ((st.subj || st.lets || st.futAux) && an.some(isV) && st.verbAt < 0) pick = an.find(isV);
    else if (low === "есть" && analyses(nxt).some(isN) && !st.subj) pick = an.find(isV);
    pick = pick || an.find(isV) && !an.some(isN) && an.find(isV) || an.find(isN) || an[0];
    // «Извините!» — без подлежащего это просьба, а не будущее «вы извините»
    if (isV(pick) && !st.subj && st.verbAt < 0 && /^V:fut:2/.test(pick.code)) pick = an.find((a) => /^V:imp/.test(a.code) && a.lemma === pick.lemma) || pick;
    if (OVRF[low] !== undefined) pick = an.find((a) => a.lemma === OVRF[low]) || pick;
    if (OVR[pick.lemma] !== undefined) pick = { ...pick, e: OVR[pick.lemma] };
    const alts = [];                                                          // варианты смысла для интерфейса
    for (const a of an) if (a.lemma !== pick.lemma && !alts.some((x) => x.lemma === a.lemma)) alts.push({ key: "form:" + low, val: a.lemma, w: E[a.e].w, m: a.lemma });
    for (const ei of (D.ALT[pick.lemma] || [])) if (ei !== pick.e) alts.push({ key: pick.lemma, val: ei, w: E[ei].w, m: E[ei].m });
    st.alts = alts.length ? alts : null; st.altsSrc = w.raw;
    const e = E[pick.e];
    if (isN(pick) && an.some((a) => a.code === "N:p") && an.some((a) => a.code === "N:s") && !prevWasPrep) {
      const vb = words.slice(i + 1, i + 4).flatMap((x) => analyses(x.low)).find(isV);
      if (vb && /:(3p|p)(:|$)/.test(vb.code)) pick = an.find((a) => a.code === "N:p");      // «звезды поют» — много
      else {
        // «люблю море и звёзды», «вижу звёзды»: «звезды» = род. ед. только после сущ., числа, «нет/много/мало…»; иначе — много
        const pw = i > 0 ? words[i - 1].low : "";
        const genCtx = (out.length && out[out.length - 1].noun && pw !== "и") || NUM[pw] !== undefined || /^\d+$/.test(pw) ||
          /^(нет|много|мало|сколько|несколько|немного|без)$/.test(pw);
        if (!genCtx && !(vb && /:3s(:|$)/.test(vb.code)) && pick.lemma !== low) pick = an.find((a) => a.code === "N:p");   // «видео», «кафе» не склоняются — не трогаем
      }
    }
    if (isN(pick) && !prevWasPrep && GF && GF.has(low) && out.length && out[out.length - 1].noun && !st.det && !st.adjs.length) {
      emit("de", ""); st.afterPrep = true;                                          // берег реки → le riv de le rivyer
    }
    if (isN(pick)) {
      const plural = pick.code === "N:p" || st.detPlur;
      if (st.compare) { emit("ke", ""); st.compare = false; }
      if (!prevWasPrep && st.verbAt < 0 && !st.subj) st.subj = plural ? "они" : "он";
      flushNP(e.w, w.raw, plural); st.afterPrep = false; continue;
    }
    if (isA(pick)) {
      if (e.p === "v") { emit(e.f ? e.f[55] : e.w, w.raw); continue; }          // причастие без формы — как глагол
      let at = e.w;
      if (st.superl) { at = "le plu " + at; st.superl = false; }
      // «очень красивую картинку» → l'imaj tre joli: наречие степени уходит вместе с прилагательным
      if (nextNounAhead(i) && out.length && ["tre", "trop", "osi", "plu"].includes(out[out.length - 1].t) && out[out.length - 1].src) at = out.pop().t + " " + at;
      if (nextNounAhead(i)) { st.adjs.push({ t: at, src: w.raw }); continue; }
      if (at !== e.w) { copulaIfNeeded(); emit(at, w.raw); continue; }
      // наречие на -о перед глаголом: «отлично получается» → ekselanman
      if (/[^е]о$/.test(low) && words[i + 1] && analyses(words[i + 1].low).some(isV) && !analyses(words[i + 1].low).some(isN)) { emit(e.w + "man", w.raw); continue; }
      // прилагательное-сказуемое или наречие на -о
      if (st.verbAt >= 0 && /о$/.test(low) && !/(ое|ое)$/.test(low)) { emit(e.w + "man", w.raw); continue; }
      copulaIfNeeded(); emit(e.w, w.raw); continue;
    }
    if (pick.code === "ADV") { emit(e.w, w.raw); continue; }
    if (pick.code === "C") { copulaIfNeeded(); emit("plu", ""); emit(e.w, w.raw); st.compare = true; continue; }   // быстрее Х → plu rapid ke Х
    if (isV(pick)) {
      const c = pick.code.split(":");
      let tense = "наст", person = subjPerson(), mood = st.mood;
      if (c[1] === "inf") {
        if (st.futAux) { tense = "буд"; person = st.subj || st.futPerson; st.futAux = false; }
        else if (st.lets) { person = "мы"; st.lets = false; }
        else if (st.verbAt >= 0 || st.det === undefined) tense = "inf";
        else tense = "inf";
        if (tense === "inf") { emit(verbForm(pick.e, "inf"), w.raw); if (st.neg) { emit(st.neg, st.negSrc || "не"); st.neg = null; } continue; }
      } else if (c[1] === "imp") {
        if (c[2] === "p") { tense = "наст"; person = "вы"; } else tense = "imp";
      } else if (c[1] === "past") { tense = c[3] === "pf" ? "прош" : "прош.длит"; if (!st.subj && c[2] === "p") person = "они"; }
      else if (c[1] === "fut") { tense = "буд"; person = st.subj || ({ "1s": "я", "2s": "ты", "3s": "он", "1p": "мы", "2p": "вы", "3p": "они" })[c[2]]; }
      else if (c[1] === "pres") { person = st.subj || ({ "1s": "я", "2s": "ты", "3s": "он", "1p": "мы", "2p": "вы", "3p": "они" })[c[2]]; }
      if (st.lets) { person = "мы"; tense = "наст"; st.lets = false; }
      if (mood === "бы" || mood === "пусть" || mood === "наверное") tense = "наст";
      if (st.verbAt >= 0 && tense !== "inf") { /* второй глагол подряд (хочу петь) — инфинитив уже выше */ }
      placeVerb(verbForm(pick.e, tense, person, mood), w.raw, c[1] === "imp");
      st.subj = st.subj || person;
      continue;
    }
    emit(e.w, w.raw);
  }
  // нет глагола, есть подлежащее-местоимение и что-то после него («Я из России») → связка после подлежащего
  if (st.verbAt < 0 && !st.hasVerb) {
    const j = out.findIndex((o) => Object.values(SUBJ).some(([w]) => w === o.t.toLowerCase()));
    if (j >= 0 && j < out.length - 1 && !["ou", "ki", "koi", "kan"].includes(out[0].t.toLowerCase())) {
      const per = Object.values(SUBJ).find(([w]) => w === out[j].t.toLowerCase())[1];
      out.splice(j + 1, 0, { t: verbForm(BE(), "наст", per), src: "(есть)" }); st.verbAt = j + 1;
    }
  }
  // вопрос без глагола («Где моя куртка?») — связка после вопросительного слова
  if (st.verbAt < 0 && out.length > 1 && ["ou", "ki", "koi", "kan", "dou", "konbyen", "kel"].includes(out[0].t.toLowerCase()) && !out.some((o) => o.unk)) {
    const plur = out.some((o) => o.t === "lez" || /z$/.test(o.t) && ["maz", "taz", "saz", "notaz", "votaz", "leuraz", "sez", "selaz"].includes(o.t));
    out.splice(1, 0, { t: verbForm(BE(), "наст", plur ? "они" : "он"), src: "(есть)" }); st.verbAt = 1;
  }
  if (st.det && st.det !== "@art") emit(st.det, st.detSrc);
  for (const a of st.adjs) emit(a.t, a.src);
  for (const o of st.pendingObj) emit(o.t, o.src);
  return { out, unknown, fixes, hasVerb: st.verbAt >= 0, plural: out.some((o) => o.t === "lez" || ["maz", "taz", "saz", "notaz", "votaz", "leuraz", "sez", "selaz"].includes(o.t)) };
}

// ------------------------------------------------------------------ слияние, регистр, пунктуация
const ELIDE = new Set(["le", "de", "se", "ke", "je", "me"]);
function startsVowel(w) { const p = parse(w.toLowerCase()); return p.length > 0 && "aeioUYQw".includes(p[0]); }   // w = oi («уа»): l'oizo (3.11)
function finish(items, endPunct) {
  const res = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i], nx = items[i + 1];
    if (nx && ELIDE.has(it.t.toLowerCase()) && it.src !== "но" && !nx.unk && startsVowel(nx.t)) { nx.t = it.t.slice(0, -1) + "'" + nx.t; nx.src = (it.src ? it.src + " " : "") + nx.src; continue; }
    res.push(it);
  }
  if (res.length) res[0].t = res[0].t[0].toUpperCase() + res[0].t.slice(1);
  return res;
}

const SLANG = { патамушта: "потому что", потамушта: "потому что", потомучто: "потому что", потомушто: "потому что", патомушта: "потому что",
  щас: "сейчас", счас: "сейчас", ща: "сейчас", чо: "что", че: "что", чё: "что", шо: "что", ваще: "вообще", тока: "только",
  када: "когда", кагда: "когда", спс: "спасибо", пасиб: "спасибо", пасибо: "спасибо", прив: "привет", пжлст: "пожалуйста",
  пож: "пожалуйста", плиз: "пожалуйста", норм: "нормально", ничо: "ничего", ниче: "ничего", никада: "никогда", щя: "сейчас", ктото: "кто-то", чтото: "что-то" };
const BRANDS = [[/^тикток/i, "TikTok"], [/^ютуб/i, "YouTube"], [/^инстаграм|^инст[аеу]?$/i, "Instagram"], [/^телеграм/i, "Telegram"],
  [/^дискорд/i, "Discord"], [/^суно/i, "Suno"], [/^элевенлабс/i, "ElevenLabs"], [/^майнкрафт/i, "Minecraft"], [/^гугл/i, "Google"],
  [/^вконтакт|^вк$/i, "VK"], [/^ватсап|^вотсап/i, "WhatsApp"], [/^роблокс/i, "Roblox"], [/^блендер/i, "Blender"], [/^годот/i, "Godot"],
  [/^стим/i, "Steam"], [/^виндовс/i, "Windows"], [/^линукс/i, "Linux"], [/^айфон/i, "iPhone"], [/^андроид/i, "Android"], [/^нетфликс/i, "Netflix"],
  [/^спотифа/i, "Spotify"], [/^чатгпт|^чат-гпт/i, "ChatGPT"]];
const PREFIX = [[/(^|[^А-Яа-яЁё])(я|ты|он|она|мы|вы|они)\s+(прав|права|правы)(?![А-Яа-яЁё])/gi, "$1$2 $3ильный"],
  [/(^|[^А-Яа-яЁё])рад(?![А-Яа-яЁё])/gi, "$1доволен"], [/(^|[^А-Яа-яЁё])рада(?![А-Яа-яЁё])/gi, "$1довольна"], [/(^|[^А-Яа-яЁё])рады(?![А-Яа-яЁё])/gi, "$1довольны"],
  [/дн(ём|ем|е|ю|я)\s+рождения/gi, (m, e) => ({ я: "годовщины", ю: "годовщине", е: "годовщине", ем: "годовщиной", ём: "годовщиной" })[e.toLowerCase()]],
  [/день\s+рождения/gi, "годовщина"]];
function translate(text) {
  for (const [re, to] of PREFIX) text = text.replace(re, to);
  text = text.replace(/[А-Яа-яЁё]+(?:-[А-Яа-яЁё]+)?/g, (w) => { const b = BRANDS.find(([re]) => re.test(w)); return b && !/^стимул|^стил/i.test(w) ? b[1] : w; });
  // «лучший» = «самый хороший» (в Etoilal нет особых форм: le plu bon); лучшая → самая хорошая, лучшего → самого хорошего
  const BEST = { ий: ["ый", "ий"], ая: ["ая", "ая"], ее: ["ое", "ее"], ие: ["ые", "ие"], его: ["ого", "его"], ему: ["ому", "ему"], им: ["ым", "им"],
    ем: ["ом", "ем"], ей: ["ой", "ей"], ую: ["ую", "ую"], их: ["ых", "их"], ими: ["ыми", "ими"] };
  text = text.replace(/(^|[^А-Яа-яЁё])([Лл])учш(ий|ая|ее|ие|его|ему|им|ем|ей|ую|их|ими)(?![А-Яа-яЁё])/g,
    (_, pre, l, e) => pre + (l === "Л" ? "С" : "с") + "ам" + BEST[e][0] + " хорош" + BEST[e][1]);
  text = text.replace(/[А-Яа-яЁё]+/g, (w) => { const r = SLANG[w.toLowerCase().replace(/ё/g, "е")] || SLANG[w.toLowerCase()]; return r ? (w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase() ? r[0].toUpperCase() + r.slice(1) : r) : w; });
  const parts = [], unknownAll = [], fixesAll = [];
  // предложения — по . ! ? …; запятые остаются внутри
  const sents = text.split(/(?<=[.!?…])\s+|\n+/).filter((s) => s.trim());
  for (const s of sents) {
    const toks = tokenize(s);
    if (!toks.length) continue;
    const end = (s.trim().match(/[.!?…]+$/) || ["."])[0];
    // запятые: переводим кусками, сохраняя знак
    const chunks = []; let cur = [];
    for (const t of toks) { if (/^[,;:—–]$/.test(t)) { chunks.push([cur, t]); cur = []; } else if (!/^[.!?…"«»()]+$/.test(t)) cur.push(t); }
    chunks.push([cur, ""]);
    let items = [], pred = false, first = true;
    for (const [c, p] of chunks) {
      if (!c.length) continue;
      const INTERJ = { короче: "bref", блин: "zut", ладно: "dakor", окей: "oke", ок: "oke", вау: "wa", ого: "oh", эх: "ah", ой: "oi", ура: "oura", ну: "be", итак: "alor" };
      if (c.length === 1 && INTERJ[c[0].toLowerCase()] && p) { items.push({ t: INTERJ[c[0].toLowerCase()], src: c[0], punct: p }); first = false; continue; }
      const r = sentence(c.concat(end.includes("?") ? ["?"] : []), { afterCopula: pred, first });
      first = false;
      pred = false;
      unknownAll.push(...r.unknown); fixesAll.push(...r.fixes);
      if (!r.out.length) continue;
      items.push(...r.out);
      if (p === "—" && !r.hasVerb) { items.push({ t: r.plural ? "esel" : "eset", src: "—" }); pred = true; }   // «Мой брат — врач» → … eset un dokteur
      else if (p) items[items.length - 1] = { ...items[items.length - 1], punct: p === "—" ? " —" : p };
    }
    items = finish(items, end);
    parts.push({ items, end });
  }
  return { parts, unknown: [...new Set(unknownAll)], fixes: fixesAll };
}

function render(res) {
  return res.parts.map((p) => p.items.map((it) => it.t + (it.punct || "")).join(" ") + p.end).join(" ");
}

// ------------------------------------------------------------------ чтение русскими буквами (порт phon.parse + phon.cyr)
const VOW = "aeioUYQ";
function parse(lat) {
  const s = lat.toLowerCase(); const out = []; let i = 0;
  const pairs = [["you", "Y"], ["yo", "Q"], ["ou", "U"], ["eu", "Q"], ["oi", "wa"], ["yi", "i"], ["ch", "S"], ["gn", "N"], ["u", "Y"], ["j", "Z"], ["y", "j"]];
  while (i < s.length) {
    let done = false;
    for (const [a, b] of pairs) {
      if (s.startsWith(a, i)) {
        if ((a === "you" || a === "yo") && !(out.length && VOW.includes(out[out.length - 1].slice(-1)))) continue;
        out.push(b); i += a.length; done = true; break;
      }
    }
    if (!done) { out.push(s[i]); i++; }
  }
  return out.join("");
}
const CYRM = { a: "а", e: "э", i: "и", o: "о", U: "у", Y: "ю", Q: "ё", p: "п", b: "б", t: "т", d: "д", k: "к", g: "г", f: "ф", v: "в",
  s: "с", z: "з", S: "ш", Z: "ж", m: "м", n: "н", r: "р", j: "й", w: "у" };
function cyr(ph) {
  const o = []; let p = ph.split("");
  for (let i = 0; i < p.length; i++) {
    const c = p[i], nx = p[i + 1] || "";
    if (c === "l") o.push(nx && (VOW + "jw").includes(nx) ? "л" : "ль");
    else if (c === "N") { const m = { a: "ня", e: "нье", o: "ньо", U: "ню", i: "ни" }[nx]; o.push(m || "нь"); if (m) p[i + 1] = "_"; }
    else if (c === "_") continue;
    else o.push(CYRM[c] ?? c);
  }
  return o.join("");
}
function reading(text) {
  return text.replace(/[A-Za-z']+/g, (w) => cyr(parse(w.replace(/'/g, ""))).replace(/([бвгдзклмнпрстфх])йэ/g, "$1ье")).toLowerCase();
}

// ================================================================== Etoilal → русский (для чтения ответов)
// Разбор: слияние (l', j'…) → служебные слова (grammar.FUNC, числа) → формы глагола (основа + время + наклонение + лицо из
// готовых форм словаря) → слова словаря (сущ., прил., производные, имена). Сборка русского: «pa/jame/ryen» → «не/никогда/
// ничего не» перед глаголом, прил. после сущ. → перед ним, артикли опускаются, мн. число — по lez/unz/maz/числу; русский
// глагол спрягается по формам pymorphy (сделал — сов. вид, делал — несов.; будущее несов. — «буду» + инф.).
let BW = null, E2RU = null, LF = null;
const RU_PERS_CODE = { я: "1s", ты: "2s", он: "3s", мы: "1p", вы: "2p", они: "3p" };
const FN_RU = { je: "я", tu: "ты", il: "он", el: "она", nou: "мы", vou: "вы", ilz: "они", elz: "они", on: "люди",
  mo: "меня", to: "тебя", lo: "его", la: "её", no: "нас", vo: "вас", loz: "их", laz: "их", mey: "мне", tey: "тебе", ley: "ему",
  ney: "нам", vey: "вам", leyz: "им", moi: "я", toi: "ты", lui: "он", ela: "она", leur: "они", soi: "себя",
  ma: "мой", ta: "твой", sa: "его", nota: "наш", vota: "ваш", leura: "их", se: "этот", sela: "тот",
  ki: "кто", koi: "что", ou: "где", dou: "откуда", kan: "когда", koman: "как", pourkoi: "почему", konbyen: "сколько", kel: "какой",
  eske: "", e: "и", oubyen: "или", me: "но", ke: "что", si: "если", pask: "потому что", kom: "как", donk: "значит",
  a: "в", de: "из", dans: "в", sur: "на", sou: "под", avek: "с", sans: "без", pour: "для", che: "у", antr: "между", apre: "после",
  avant: "до", devant: "перед", deryer: "за", otour: "вокруг", par: "через", kontr: "против", depui: "с", juska: "до", pre: "возле",
  pandant: "во время", selon: "по", plu: "более", mouen: "менее", oui: "да", non: "нет", persone: "никто",
  ojourdui: "сегодня", demen: "завтра", yer: "вчера", mentnant: "сейчас", toujour: "всегда", isi: "здесь", laba: "там", tre: "очень",
  boku: "много", deja: "уже", ankor: "ещё", osi: "тоже", seulman: "только", meme: "даже", preske: "почти", ansanbl: "вместе",
  tou: "всё", chak: "каждый", ensi: "так", pui: "потом", alor: "тогда", byensur: "конечно", kelkun: "кто-то", kelkchoz: "что-то",
  partou: "везде", nulpar: "нигде", byenke: "хотя", tanke: "пока", voila: "вот", mersi: "спасибо", salu: "привет",
  silvouple: "пожалуйста", orevoir: "до свидания", bonjour: "здравствуйте", byen: "хорошо", mal: "плохо", trop: "слишком",
  aryer: "назад", kelkpar: "где-то", vreman: "правда", parfoi: "иногда", souvan: "часто", deja: "уже", ankor: "ещё", olyeude: "вместо" };
const ARTS = new Set(["le", "lez", "un", "unz"]);
const PLUR_DET = new Set(["lez", "unz", "maz", "taz", "saz", "notaz", "votaz", "leuraz", "sez", "selaz"]);
const ET_NUM = { un: 1, deu: 2, troi: 3, katr: 4, senk: 5, sis: 6, set: 7, uit: 8, neuf: 9, dis: 10, sent: 100, mil: 1000, zero: 0, milyon: 1000000 };

function backInit() {
  BW = new Map(); E2RU = new Map(); LF = new Map();
  const add = (w, x) => { const k = w.toLowerCase(); if (!BW.has(k)) BW.set(k, []); BW.get(k).push(x); };
  E.forEach((e, i) => {
    if (e.f) e.f.forEach((f, k) => add(f, { i, k })); else add(e.w, { i });
  });
  for (const [form, lst] of Object.entries(FORMS)) for (const x of lst.split(";")) { if (!LF.has(x)) LF.set(x, form); }
  // слово Etoilal → русская лемма (несов. и сов. вид отдельно; первое значение словаря — в приоритете)
  const CORE = new Set(D.CORE || []);
  for (const [lemma, i] of Object.entries(RU2E)) {
    const cur = E2RU.get(i) || {};
    if (CORE.size && !CORE.has(lemma) && (cur.core || [...CORE].length === 0)) continue;
    if (CORE.has(lemma) && !cur.core) { cur.core = true; delete cur.pf; delete cur.ipf; delete cur.any; }
    if (cur.core && !CORE.has(lemma)) continue;
    const first = (E[i].m || "").split(/[,(;]/)[0].trim().toLowerCase().replace(/ё/g, "е");
    const li = LEM.indexOf(lemma);
    if (E[i].p === "v" && li >= 0 && !LF.has(li + "|V:inf")) continue;           // «начало» — не глагол «начинать»
    const pf = li >= 0 && (LF.has(li + "|V:past:s:pf") || LF.has(li + "|V:fut:1s"));
    const slot = pf ? "pf" : "ipf";
    if (!cur[slot] || lemma === first || (cur[slot] !== first && lemma.length < cur[slot].length)) cur[slot] = lemma;
    if (!cur.any || lemma === first) cur.any = lemma;
    E2RU.set(i, cur);
  }
}
const ruForm = (lemma, code) => { const li = LEM.indexOf(lemma); return li >= 0 ? LF.get(li + "|" + code) : null; };

function backVerb(i, k) {
  const r = E2RU.get(i) || {}, t = TENSE[Math.floor(k / 6)], person = PERS[k % 6], pc = RU_PERS_CODE[person];
  const ipf = r.ipf || r.any, pf = r.pf || r.ipf || r.any;
  if (!ipf) return (E[i].m || E[i].w).split(/[,(]/)[0];
  if (k === 55) return ruForm(ipf, "V:inf") || ipf;
  if (k === 54) return ruForm(pf, "V:imp:s") || ruForm(ipf, "V:imp:s") || ipf;
  const num = pc.endsWith("p") ? "p" : "s";
  if (k >= 36) {                                                          // бы / пусть / наверное
    const m = ["бы", "пусть", "наверное"][Math.floor((k - 36) / 6)];
    if (m === "бы") return (ruForm(ipf, `V:past:${num}:ipf`) || ruForm(ipf, `V:past:${num}:pf`) || ipf) + " бы";
    return m + " " + (ruForm(ipf, `V:pres:${pc}`) || ruForm(pf, `V:fut:${pc}`) || ipf);
  }
  if (i === BE() && t === "наст") return "";                               // «есть» в настоящем по-русски опускается
  if (t === "наст" || t === "скоро") return (t === "скоро" ? "сейчас " : "") + (ruForm(ipf, `V:pres:${pc}`) || ruForm(ipf, `V:fut:${pc}`) || ipf);
  if (t === "прош" || t === "только что") return (t === "только что" ? "только что " : "") + (ruForm(pf, `V:past:${num}:pf`) || ruForm(pf, `V:past:${num}:ipf`) || ruForm(ipf, `V:past:${num}:ipf`) || pf);
  if (t === "прош.длит") return ruForm(ipf, `V:past:${num}:ipf`) || ruForm(ipf, `V:past:${num}:pf`) || ipf;
  if (t === "буд") { const f = r.pf && ruForm(r.pf, `V:fut:${pc}`); if (f) return f;
    return ({ я: "буду", ты: "будешь", он: "будет", мы: "будем", вы: "будете", они: "будут" })[person] + " " + (ruForm(ipf, "V:inf") || ipf); }
  return ipf;
}

// падежи: «в Москве», «с другом», «для мамы»; прилагательные и «мой, этот» — по роду, числу и падежу существительного
const CASES = ["nom", "gen", "dat", "acc", "ins", "loc"];
function nounCase(lemma, cas, pl) {
  if (cas === "nom") return pl ? ruForm(lemma, "N:p") || lemma : lemma;
  const row = ((D.CS || {})[lemma] || "").split(";")[pl ? 1 : 0];
  const f = row ? row.split(",")[CASES.indexOf(cas) - 1] : "";
  return f || (pl ? ruForm(lemma, "N:p") || lemma : lemma);
}
const isAnim = (lemma, pl) => { const r = ((D.CS || {})[lemma] || "").split(";")[pl ? 1 : 0]; if (!r) return false; const [g, , a] = r.split(","); return g && g === a; };
function adjDecl(a, g, cas, anim) {
  if (cas === "nom") return g === "m" ? a : ruForm(a, "A:" + g) || a;
  const m = a.match(/^(.*?)(ый|ий|ой)$/); if (!m) return a;
  const st = m[1], last = st.slice(-1);
  const soft = m[2] === "ий" && !/[кгхжшчщ]$/.test(st), sib = /[жшчщ]$/.test(st) && m[2] !== "ой", vel = /[кгхжшчщ]$/.test(st);
  const y = vel || soft ? "и" : "ы", o = soft || sib ? "е" : "о";
  if (cas === "acc" && (g === "m" || g === "p")) cas = anim ? "gen" : "nom";
  if (cas === "nom") return g === "p" ? st + (soft ? "ие" : y + "е") : g === "m" ? a : ruForm(a, "A:" + g) || a;
  const T = {
    m: { gen: o + "го", dat: o + "му", ins: y + "м", loc: o + "м" },
    n: { gen: o + "го", dat: o + "му", acc: o + "е", ins: y + "м", loc: o + "м" },
    f: { gen: o + "й", dat: o + "й", acc: soft ? "юю" : "ую", ins: o + "й", loc: o + "й" },
    p: { gen: y + "х", dat: y + "м", ins: y + "ми", loc: y + "х" } };
  return st + (T[g][cas] || m[2]);
}
const PD = {                                                            // мой/твой/наш/ваш/этот/тот/каждый по падежам
  мой: { m: "мой,моего,моему,-,моим,моём", f: "моя,моей,моей,мою,моей,моей", n: "моё,моего,моему,моё,моим,моём", p: "мои,моих,моим,-,моими,моих" },
  твой: { m: "твой,твоего,твоему,-,твоим,твоём", f: "твоя,твоей,твоей,твою,твоей,твоей", n: "твоё,твоего,твоему,твоё,твоим,твоём", p: "твои,твоих,твоим,-,твоими,твоих" },
  наш: { m: "наш,нашего,нашему,-,нашим,нашем", f: "наша,нашей,нашей,нашу,нашей,нашей", n: "наше,нашего,нашему,наше,нашим,нашем", p: "наши,наших,нашим,-,нашими,наших" },
  ваш: { m: "ваш,вашего,вашему,-,вашим,вашем", f: "ваша,вашей,вашей,вашу,вашей,вашей", n: "ваше,вашего,вашему,ваше,вашим,вашем", p: "ваши,ваших,вашим,-,вашими,ваших" },
  этот: { m: "этот,этого,этому,-,этим,этом", f: "эта,этой,этой,эту,этой,этой", n: "это,этого,этому,это,этим,этом", p: "эти,этих,этим,-,этими,этих" },
  тот: { m: "тот,того,тому,-,тем,том", f: "та,той,той,ту,той,той", n: "то,того,тому,то,тем,том", p: "те,тех,тем,-,теми,тех" },
  весь: { m: "весь,всего,всему,-,всем,всём", f: "вся,всей,всей,всю,всей,всей", n: "всё,всего,всему,всё,всем,всём", p: "все,всех,всем,-,всеми,всех" },
  каждый: { m: "каждый,каждого,каждому,-,каждым,каждом", f: "каждая,каждой,каждой,каждую,каждой,каждой", n: "каждое,каждого,каждому,каждое,каждым,каждом", p: "каждые,каждых,каждым,-,каждыми,каждых" } };
function possDecl(base, g, cas, anim) {
  const row = PD[base][g].split(",");
  let k = CASES.indexOf(cas);
  if (row[k] === "-") k = anim ? 1 : 0;
  return row[k];
}
// предлог Etoilal → русский предлог и падеж; a/dans/sur после глаголов движения — винительный («еду во Францию»)
const PREPC = { avek: ["с", "ins"], sans: ["без", "gen"], pour: ["для", "gen"], che: ["у", "gen"], sou: ["под", "ins"], apre: ["после", "gen"],
  avant: ["до", "gen"], devant: ["перед", "ins"], deryer: ["за", "ins"], otour: ["вокруг", "gen"], antr: ["между", "ins"], par: ["через", "acc"],
  kontr: ["против", "gen"], depui: ["с", "gen"], juska: ["до", "gen"], pre: ["возле", "gen"], pandant: ["во время", "gen"], selon: ["по", "dat"],
  dans: ["в", "loc"], sur: ["на", "loc"], a: ["в", "loc"], de: ["из", "gen"] };
const MOTION = /^(ид|иду|ид[её]|шел|шла|шли|пойд|пош|ед|еха|по[её]х|бег|беж|лет|полет|возвращ|верн|приход|приш|уход|уш|путешеств|ход|прие|уе|отправ|попад|переез)/;
const ABOUT = /^(говор|сказ|расска|дума|мечта|пе|спе|пис|напис|зна|слыш|чита|спраш|спрос)/;
const STR_C = { moi: "меня,мне,меня,мной,мне", toi: "тебя,тебе,тебя,тобой,тебе", lui: "него,нему,него,ним,нём", ela: "неё,ней,неё,ней,ней",
  nou: "нас,нам,нас,нами,нас", vou: "вас,вам,вас,вами,вас", leur: "них,ним,них,ними,них", soi: "себя,себе,себя,собой,себе" };

const BACK_MULTI = [[/\bkoman tu ales\b/gi, "как дела"], [/\bkoman vou alez\b/gi, "как у вас дела"], [/\bkonbyen d'an tu aves\b/gi, "сколько тебе лет"],
  [/\bkonbyen d'an vou avez\b/gi, "сколько вам лет"], [/\bmersi pour\b/gi, "спасибо за"], [/\bun jour\b/gi, "однажды"], [/\ba le mezon\b/gi, "дома"],
  [/\bpar egzanpl\b/gi, "например"], [/\ba propo\b/gi, "кстати"], [/\ban jeneral\b/gi, "вообще"], [/\btou de suit\b/gi, "сразу"], [/\bo lyeu de\b/gi, "вместо"]];
function back(text) {
  if (!BW) backInit();
  for (const [re, to] of BACK_MULTI) text = text.replace(re, to);
  const out = [];
  const sents = text.split(/(?<=[.!?…])\s+|\n+/).filter((x) => x.trim());
  for (const snt of sents) {
    const toks = snt.match(/[А-Яа-яЁё]+(?:-[А-Яа-яЁё]+)?|[A-Za-z]+(?:'[A-Za-z]+)?|\d+|[.!?…,;:—–-]/g) || [];
    const res = []; let plural = false, lastVerb = -1, lastNoun = -1, pendNeg = null, afterCopula = false, subjNoun = -1, prep = null, lastArt = null, subjG = "m", superl = false;
    for (let t of toks) {
      if (/^[.!?…,;:—–-]$/.test(t)) { res.push({ p: t }); plural = false; prep = null; continue; }
      if (/^\d+$/.test(t)) { res.push({ w: t }); plural = +t > 1; continue; }
      if (/^[А-Яа-яЁё]/.test(t)) { res.push({ w: t, fn: "ru" }); continue; }                  // уже по-русски (обороты)
      let low = t.toLowerCase();
      const el = low.match(/^(l|j|d|s|k|m)'(.+)$/);                         // слияние: l'ami → le ami
      const parts = el ? [{ l: "le", j: "je", d: "de", s: "se", k: "ke", m: "me" }[el[1]], el[2]] : [low];
      for (const w of parts) {
        if (w === "un" && res.length && res[res.length - 1].acc) { const a = res[res.length - 1].acc; if (a.pend !== null) a.grp += a.pend; a.pend = 1; const pr = res[res.length - 1]; pr.num = a.tot + a.grp + 1; pr.w = String(pr.num); continue; }   // deudis un → 21
        if (ARTS.has(w)) { plural = w.endsWith("z"); lastArt = w; continue; }
        if (w === "pa" || w === "jame" || w === "ryen") {
          const neg = w === "pa" ? "не" : w === "jame" ? "никогда не" : "ничего не";
          if (lastVerb >= 0) res[lastVerb].w = neg + " " + res[lastVerb].w; else pendNeg = neg;
          continue;
        }
        const prevArt = lastArt; lastArt = null;
        if (w === "pour" && res.length && /^спасибо$/i.test(res[res.length - 1].w)) { prep = res.length; res.push({ w: "за", fn: "pour", prep: "pour", cas: "acc" }); continue; }
        if (PREPC[w]) {                                                     // предлог: падеж решится на существительном
          const it = { w: PREPC[w][0], fn: w, prep: w };
          if (w === "de" && lastNoun >= 0 && lastNoun === res.length - 1) it.w = "";          // le nom de le profil → имя аккаунта
          else if (w === "de" && lastVerb >= 0 && ABOUT.test(res[lastVerb].w.replace(/^(не|никогда не) /, ""))) { it.w = "о"; it.cas = "loc"; }
          else if (w === "a" && lastVerb >= 0 && /^(дума|мечта|подума|помечта|скуча)/.test(res[lastVerb].w.replace(/^(не|никогда не) /, ""))) { it.w = "о"; it.cas = "loc"; }
          prep = res.length; res.push(it); continue;
        }
        if (STR_C[w] && prep !== null && prep === res.length - 1) {          // «с тобой», «для меня», «к нему»
          const pr = res[prep]; let cas = pr.cas || PREPC[pr.prep][1];
          if (pr.prep === "a" && !pr.cas) { pr.w = "к"; cas = "dat"; }
          res.push({ w: STR_C[w].split(",")[CASES.indexOf(cas) - 1] }); prep = null; continue;
        }
        if (FN_RU[w] !== undefined || (PLUR_DET.has(w) && FN_RU[w.slice(0, -1)])) {
          const base = FN_RU[w] !== undefined ? w : w.slice(0, -1);
          const PL = { maz: "мои", taz: "твои", notaz: "наши", votaz: "ваши", sez: "эти", selaz: "те", saz: "его" };
          if (PLUR_DET.has(w)) plural = true;
          let ru = PL[w] || FN_RU[base];
          if (base === "ke" && res.slice(-3).some((x) => x.fn === "plu" || x.cmp)) ru = "чем";      // plu rapid ke … → быстрее, чем
          if (base === "plu") {                                                // le plu joli → самый красивый; plu bon → лучше
            if (prevArt === "le" || prevArt === "lez") {                           // превосходная: «самый» — перед словом, к которому относится
              const it = { w: "самый", adj: true, lemma: "самый" };
              if (lastNoun >= 0 && lastNoun === res.length - 1) { res.splice(lastNoun, 0, it); lastNoun++; } else res.push(it);
              superl = true; continue;
            }
            res.push({ w: "более", fn: "plu", cmpPend: true }); continue;
          }
          if (base === "tou") { res.push({ w: "всё", fn: "tou", poss: "весь" }); continue; }
          if (base === "pour" && res.length && /^спасибо$/i.test(res[res.length - 1].w)) { prep = res.length; res.push({ w: "за", fn: "pour", prep: "pour", cas: "acc" }); continue; }
          if (base === "el") subjG = "f"; else if (["je", "tu", "il"].includes(base)) subjG = "m";
          if (ru) res.push({ w: ru, fn: base, poss: { мои: "мой", твои: "твой", наши: "наш", ваши: "ваш", эти: "этот", те: "тот" }[ru] || (PD[ru] ? ru : null) });
          continue;
        }
        if (ET_NUM[w] !== undefined || /^(deu|troi|katr|senk|sis|set|uit|neuf)dis$/.test(w)) {
          const n = ET_NUM[w] !== undefined ? ET_NUM[w] : ET_NUM[w.replace(/dis$/, "")] * 10, prev = res[res.length - 1];
          // подряд идущие числительные — одно число: sisdis senk → 65, deu sent → 200, troi milyon → 3000000
          const a = prev && prev.acc ? prev.acc : { tot: 0, grp: 0, pend: null };
          if (n < 10) { if (a.pend !== null) a.grp += a.pend; a.pend = n; }
          else if (n < 100) { a.grp += (n === 10 ? (a.pend ?? 1) * 10 : n + (a.pend ?? 0)); a.pend = null; }
          else if (n === 100) { a.grp += (a.pend ?? 1) * 100; a.pend = null; }
          else { const g = a.grp + (a.pend ?? 0) || 1; a.tot += g * n; a.grp = 0; a.pend = null; }
          const val = a.tot + a.grp + (a.pend ?? 0);
          if (prev && prev.acc) { prev.num = val; prev.w = String(val); }
          else res.push({ w: String(val), num: val, acc: a });
          plural = n > 1; continue;
        }
        const cand = BW.get(w);
        if (!cand) { res.push({ w: t, unk: !/^[A-Z]/.test(t) }); continue; }           // с большой буквы — имя
        const v = cand.find((c) => c.k !== undefined && c.k < 56);
        const nonV = cand.filter((c) => c.k === undefined);
        const wantAdj = lastNoun === res.length - 1 && lastNoun >= 0 || afterCopula;
        const capName = /^[A-Z]/.test(t) && nonV.find((c) => E[c.i].p === "name");
        const n = capName || (wantAdj && nonV.find((c) => E[c.i].p === "a")) || nonV.find((c) => E[c.i].p === "n") || nonV[0];
        if (v && (!n || !["n", "a", "name"].includes(E[n.i].p))) {
          let vw = backVerb(v.i, v.k);
          // форма «вы» без vou — просьба: Pardonez! → Простите!
          if (v.k === 4 && !toks.slice(0, toks.indexOf(t)).some((x) => /^vou$/i.test(x))) { const im = backVerb(v.i, 54); if (im && /[иьй]$/.test(im)) vw = im + "те"; }
          if (!vw && !pendNeg) {                                                // «есть» опущено; дальше — сказуемое
            const nounPred = (() => { for (const x of toks.slice(toks.indexOf(t) + 1)) { if (/^[.!?,;:]$/.test(x)) return false; const lx = x.toLowerCase().replace(/^[ljdskm]'/, "");
              if (ARTS.has(lx) || PLUR_DET.has(lx) || ["ma", "ta", "sa", "nota", "vota", "leura", "se", "sela", "tre", "trop", "osi", "deja", "toujour"].includes(lx)) continue;
              const c = BW.get(lx);   // решает первое значимое слово после связки
              return !!(c && c.some((q) => q.k === undefined && ["n", "name"].includes(E[q.i].p)) && !c.some((q) => q.k === undefined && E[q.i].p === "a")); } return false; })();
            const pv = res[res.length - 1];
            if (nounPred && pv && (pv.n || (pv.w && /^[A-ZА-ЯЁ]/.test(pv.w) && !pv.fn))) res.push({ w: "—" });
            subjNoun = lastNoun; lastNoun = -1; afterCopula = true; continue;
          }
          let vf = vw;
          if (/л(ся)?$/.test(vf) && !/(^| )(бы)$/.test(vf) && TENSE[Math.floor(v.k / 6)] !== "буд" && v.k % 6 < 3) {   // она сделала, нейросеть нарисовала
            vf = subjG === "f" ? vf.replace(/л(ся)?$/, (m, z) => (z ? "лась" : "ла")) : subjG === "n" ? vf.replace(/л(ся)?$/, (m, z) => (z ? "лось" : "ло")) : vf;
          }
          vf = vf.replace(/л бы$/, subjG === "f" ? "ла бы" : "л бы");
          res.push({ w: (pendNeg ? pendNeg + " " : "") + vf, v: true, be: v.i === BE() }); pendNeg = null; lastVerb = res.length - 1; prep = null; continue;
        }
        const e = E[n.i], r = E2RU.get(n.i) || {};
        let lemma = r.any || (e.m || e.w).split(/[,(;:]/)[0].trim();
        const isName = e.p === "name";
        if (isName || e.p === "lang") lemma = e.m.split(" (")[0].toLowerCase().replace(/ё/g, "е");
        if (e.p === "a" || e.p === "lang") {
          const pv = res[res.length - 1];
          if (superl && lastNoun >= 0) { superl = false; const it = { w: lemma, adj: true, lemma }; res.splice(lastNoun, 0, it); lastNoun++; continue; }
          if (pv && pv.cmpPend) {
            const c = ruForm(lemma, "C");
            if (c) { pv.w = c; pv.cmpPend = false; pv.cmp = true; const pp = res[res.length - 2]; if (pp && pp.w === "много") pp.w = "намного"; afterCopula = false; continue; }
          }
          const it = { w: lemma, adj: true, lemma, pred: afterCopula ? subjNoun : -1 };
          if (lastNoun >= 0 && lastNoun === res.length - 1 && !afterCopula) { res.splice(lastNoun, 0, it); lastNoun++; continue; }   // прил. после сущ. → перед
          res.push(it); afterCopula = false; continue;
        }
        // существительное: падеж от предлога, иначе — дополнение после глагола (вин.), иначе именительный
        let cas = "nom";
        const between = (from) => res.slice(from + 1).every((x) => x.adj || x.poss || x.num);
        if (prep !== null && between(prep)) {
          const pr = res[prep]; cas = pr.cas || PREPC[pr.prep][1];
          if (["a", "dans", "sur"].includes(pr.prep) && lastVerb >= 0 && MOTION.test(res[lastVerb].w.replace(/^(не|никогда не) /, ""))) cas = "acc";
          if (pr.prep === "a" && !isName && isAnim(lemma, plural)) { pr.w = "к"; cas = "dat"; }
          if (pr.prep === "de" && cas === "gen" && pr.w === "из" && isAnim(lemma, plural)) pr.w = "от";
          prep = null;
        } else if (lastVerb >= 0 && !res[lastVerb].be && !res[lastVerb].obj && between(lastVerb)) { cas = "acc"; res[lastVerb].obj = true; }
        let ru = nounCase(lemma, cas, plural);
        if (isName) ru = ru.split(/([ -])/).map((x) => x.replace(/^./, (c) => c.toUpperCase())).join("");
        res.push({ w: ru, n: true, pl: plural, lemma, cas, anim: isAnim(lemma, plural) });
        if (cas === "nom" && lastVerb < 0) subjG = plural ? "p" : (D.GEN || {})[lemma] || "m";
        lastNoun = res.length - 1; plural = false; afterCopula = false;
      }
    }
    // согласование слов перед существительным (прил., «мой», «этот») по роду, числу и падежу
    for (let k = res.length - 1; k >= 0; k--) {
      if (!res[k].n) continue;
      const g = res[k].pl ? "p" : (D.GEN || {})[res[k].lemma] || "m";
      for (let j = k - 1; j >= 0 && (res[j].adj || res[j].poss || res[j].num) && !(res[j].adj && res[j].pred >= 0); j--) {
        if (res[j].poss) res[j].w = possDecl(res[j].poss, g, res[k].cas, res[k].anim);
        else if (res[j].adj) res[j].w = adjDecl(res[j].lemma, g, res[k].cas, res[k].anim);
      }
    }
    for (const x of res) if (x.adj && x.pred >= 0 && res[x.pred] && res[x.pred].n) {   // сказуемое: «Ночь тихая»
      const g = res[x.pred].pl ? "p" : (D.GEN || {})[res[x.pred].lemma] || "m";
      x.w = adjDecl(x.lemma, g, "nom", false);
    }
    const DATV = /^(не |никогда не |ничего не )?(да|дал|даю|дае|дад|даст|дади|говор|сказ|скаж|пиш|писа|напис|показ|помог|помога|дар|подар|звон|позвон|отвеч|ответ|объясн|рассказ|рассказыв|советов|посоветов|обещ|пообещ|отправ|посыла|присыл|присла|нрав|понрав|верн|принос|принес|покуп|куп|улыба|меша|разреш|запрещ)/;
    const TODAT = { меня: "мне", тебя: "тебе", его: "ему", её: "ей", нас: "нам", вас: "вам", их: "им" };
    for (let k = 0; k < res.length; k++) if (res[k].v && DATV.test(res[k].w)) {
      const hasObj = res.slice(k + 1).some((x) => x.n);
      for (let j = k - 1; j >= 0 && TODAT[res[j].w] !== undefined; j--) if (hasObj || /^(не )?(нрав|понрав|помог|звон|позвон|отвеч|ответ|меша|улыба)/.test(res[k].w)) res[j].w = TODAT[res[j].w];
    }
    let str = res.filter((x) => x.p || x.w).map((x) => (x.p ? x.p : " " + x.w)).join("").trim().replace(/\s+([,.!?;:…])/g, "$1").replace(/\s+/g, " ");
    str = str.replace(/(^|\s)с (мной)(?=$|[\s,.!?])/gi, "$1со мной").replace(/(^|\s)к (мне)(?=$|[\s,.!?])/gi, "$1ко мне")
      .replace(/(^|\s)в (мне|Франци|Флоренци|Вене|Вашингтон|вторник|воде|власти)/g, "$1во $2");
    if (str) str = str[0].toUpperCase() + str.slice(1);
    out.push({ text: str, unknown: res.filter((x) => x.unk).map((x) => x.w) });
  }
  return { text: out.map((x) => x.text).join(" "), unknown: [...new Set(out.flatMap((x) => x.unknown))] };
}

if (typeof module !== "undefined") module.exports = { init, translate, render, reading, choose, back, _dbg: (i) => { if (!BW) backInit(); return E2RU.get(i); } };
