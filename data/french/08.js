window.FR_C = window.FR_C || {};
FR_C[8] = { n: 8, kind: "Фразы", t: "Привет! Знакомство", s: "bonjour, merci, je m'appelle…",
  words: [["bonjour", "здравствуй, добрый день", "бонжур"], ["salut", "привет; пока", "салю"], ["merci", "спасибо", "мэрси"], ["oui", "да", "уи"],
    ["non", "нет", "нон"], ["au revoir", "до свидания", "о рёвуар"], ["s'il te plaît", "пожалуйста (тебе)", "силь тё плэ"], ["comment", "как", "коман"]],
  sut: "Первые фразы учат <b>целиком</b>, как одно слово: {{Bonjour !}} — «здравствуй», {{Je m'appelle Anna.}} — «меня зовут Анна», {{Comment ça va ?}} — «как дела?». Разбирать их по кусочкам будем позже.",
  rule: `<table class="tbl"><thead><tr><th>французский</th><th>читается</th><th>значит</th></tr></thead><tbody>
<tr><td class="fr">Bonjour !</td><td>бонжур</td><td>здравствуй(те), добрый день</td></tr>
<tr><td class="fr">Salut !</td><td>салю</td><td>привет! / пока! (друзьям)</td></tr>
<tr><td class="fr">Comment ça va ?</td><td>коман са ва</td><td>как дела?</td></tr>
<tr><td class="fr">Ça va bien.</td><td>са ва бьен</td><td>хорошо (дела идут хорошо)</td></tr>
<tr><td class="fr">Je m'appelle…</td><td>жё мапэль</td><td>меня зовут…</td></tr>
<tr><td class="fr">Merci. — De rien.</td><td>мэрси — дё рьен</td><td>спасибо — не за что</td></tr>
<tr><td class="fr">Au revoir !</td><td>о рёвуар</td><td>до свидания</td></tr></tbody></table>`,
  prosto: `<p>С этих фраз начинается любой разговор. Их не нужно разбирать — просто запомни, как песню.</p>
> Bonjour ! :: Здравствуй! Добрый день! — «бонжур»: так здороваются со всеми
> Salut ! :: Привет! / Пока! — «салю»: t молчит; только с друзьями
> Comment ça va ? :: Как дела? — «коман са ва»
> Ça va bien, merci. :: Хорошо, спасибо. — «са ва бьен, мэрси»
> Je m'appelle Anna. :: Меня зовут Анна. — «жё мапэль ана»
> Comment tu t'appelles ? :: Как тебя зовут? — «коман тю тапэль»
> Oui. Non. :: Да. Нет. — «уи. нон.»
> Merci ! — De rien. :: Спасибо! — Не за что. — «мэрси — дё рьен»
> S'il te plaît. :: Пожалуйста. — «силь тё плэ»: когда просишь
> Au revoir ! :: До свидания! — «о рёвуар»
@@pin:fr8@@
<h3>Ты или вы</h3>
<p>Как и в русском, во французском есть «ты» и вежливое «вы». Друзьям — {{Salut !}} и {{s'il te plaît}}. Незнакомым и старшим — {{Bonjour !}} и {{s'il vous plaît}} «силь ву плэ».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «ты» и «вы», «привет» и «здравствуйте» — та же разница.</p>
<p><b>Не как в русском:</b> «Меня зовут» по-французски буквально «я себя зову» — {{Je m'appelle}}. А «Как дела?» — буквально «Как это идёт?» — {{Comment ça va ?}}. И перед ? и ! французы ставят пробел.</p>
<h3>Частые ошибки</h3>
<p>• {{merci}} читают «мерси» мягко — французское «мэрси» твёрже. • {{Salut}} говорят незнакомым — это только для своих. • Путают {{s'il te plaît}} (тебе) и {{s'il vous plaît}} (вам).</p>`,
  lub: `<p><i>Merci</i> «спасибо» и <i>merci</i> «милость, пощада» — одно и то же слово. А <i>au revoir</i> значит буквально «до нового видения» — до встречи.</p>
<p>Во Франции здороваются почти везде — входя в магазин, в лифт, в автобус: «Bonjour !». Не сказать «bonjour» продавцу — невежливо. А друзья при встрече целуются в щёки — это называется <i>la bise</i>.</p>`,
  pins: [{ id: "fr8", t: "Первые фразы", html: `<table class="tbl"><tbody><tr><td class="fr">Bonjour ! / Salut !</td><td>Здравствуй! / Привет!</td></tr><tr><td class="fr">Comment ça va ?</td><td>Как дела?</td></tr><tr><td class="fr">Ça va bien.</td><td>Хорошо.</td></tr><tr><td class="fr">Je m'appelle…</td><td>Меня зовут…</td></tr><tr><td class="fr">Merci. — De rien.</td><td>Спасибо. — Не за что.</td></tr><tr><td class="fr">S'il te plaît / s'il vous plaît</td><td>Пожалуйста (ты / вы)</td></tr><tr><td class="fr">Au revoir !</td><td>До свидания!</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Как поздороваться с продавцом в магазине?", opts: ["Bonjour !", "Salut !", "Au revoir !"], a: "Bonjour !", why: "незнакомым — Bonjour" },
    { k: "input", lang: "fr", q: "Спасибо!", a: ["Merci !", "Merci"], why: "merci — «мэрси»" },
    { k: "choice", q: "Что значит Comment ça va ?", opts: ["Как дела?", "Как тебя зовут?", "Что это?"], a: "Как дела?", why: "буквально «как это идёт?»" },
    { k: "tiles", lang: "fr", q: "Меня зовут Анна.", a: "Je m'appelle Anna", d: ["tu", "Comment"], why: "je m'appelle — «я себя зову»" },
    { k: "choice", q: "Тебе сказали «Merci !». Что ответить?", opts: ["De rien.", "Oui.", "Salut !"], a: "De rien.", why: "De rien — «не за что»" },
    { k: "input", lang: "fr", q: "До свидания!", a: ["Au revoir !", "Au revoir"], why: "au revoir — «до нового видения»", hint: "«о рёвуар»" },
    { k: "listen", say: "Comment tu t'appelles ?", q: "Что прозвучало?", opts: ["Как тебя зовут?", "Как дела?", "Пожалуйста."], a: "Как тебя зовут?", why: "«коман тю тапэль»" },
    { k: "choice", q: "Как попросить у друга: «Пожалуйста»?", opts: ["s'il te plaît", "s'il vous plaît", "merci"], a: "s'il te plaît", why: "другу — на «ты»: te" },
    { k: "input", lang: "fr", q: "Хорошо, спасибо.", a: ["Ça va bien, merci.", "Ça va bien merci", "Ça va, merci."], why: "ça va bien — «идёт хорошо»", hint: "«са ва бьен, мэрси»" },
    { k: "choice", q: "Что можно сказать другу и при встрече, и при прощании?", opts: ["Salut !", "Bonjour !", "Merci !"], a: "Salut !", why: "salut — и «привет», и «пока»" },
  ] };
