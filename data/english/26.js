window.EN_C = window.EN_C || {};
EN_C[26] = { n: 26, t: "Это сделано: is made, was built", s: "когда неважно, кто сделал",
  words: [["built", "построен (build)", "билт"], ["made", "сделан (make)", "мэйд"], ["sold", "продан (sell)", "соулд"], ["invented", "изобретён (invent)", "инвэ́нтид"], ["stolen", "украден (steal)", "стóулэн"], ["spoken", "на нём говорят (speak)", "спóукэн"], ["by", "(кем) — by Shakespeare", "бай"], ["fixed", "починен (fix)", "фикст"]],
  sut: "Когда важно не «кто сделал», а «что случилось с вещью»: {{The house was built in 1900.}} — «Дом был построен в 1900». Формула: {{am / is / are / was / were}} + третья форма.",
  rule: `<table class="tbl"><thead><tr><th></th><th>форма</th><th>пример</th></tr></thead><tbody>
<tr><td>сейчас / обычно</td><td class="fr">is / are + 3-я форма</td><td class="fr">English is spoken everywhere.</td></tr>
<tr><td>в прошлом</td><td class="fr">was / were + 3-я форма</td><td class="fr">My bike was stolen.</td></tr>
<tr><td>Present Perfect</td><td class="fr">has / have been + 3-я форма</td><td class="fr">The bug has been fixed.</td></tr>
<tr><td>будущее</td><td class="fr">will be + 3-я форма</td><td class="fr">It will be sold.</td></tr>
<tr><td>кем</td><td class="fr">by</td><td class="fr">written by Tolkien</td></tr></tbody></table>`,
  prosto: `<p>По-русски часто говорят «они»: «Мой велосипед украли». По-английски — «мой велосипед был украден»: {{My bike was stolen.}} Это обычный разговорный английский, не книжный.</p>
> My bike was stolen yesterday. :: Вчера у меня украли велосипед.
> English is spoken all over the world. :: На английском говорят по всему миру.
> This phone is made in China. :: Этот телефон сделан в Китае.
> The bridge was built in 1932. :: Мост построили в 1932 году.
> The game was made by three people. :: Игру сделали три человека. — by — кем
> The bug has been fixed. :: Баг исправлен.
> Were you invited? :: Тебя пригласили?
> The tickets will be sold online. :: Билеты будут продаваться онлайн.
@@pin:en26@@
<h3>Где это нужно</h3>
<p>Новости, инструкции, патчноуты игр: {{A new level has been added.}}, {{Your account has been blocked.}}, {{Shaken, not stirred.}} — везде пассив.</p>
<h3>Частые ошибки</h3>
<p>• «The house built in 1900» — пропущено was: {{was built}}. • «My bike was stealed» → {{was stolen}}. • «I was born» — тоже пассив! «Я был рождён» — {{I was born in 2009.}}</p>`,
  lub: `<p>В разговоре вместо be иногда говорят {{get}}: {{He got fired.}} — «Его уволили». {{I got hit by a ball.}} — «В меня попали мячом». Звучит живее и эмоциональнее.</p>`,
  pins: [{ id: "en26", t: "Пассив", html: `<table class="tbl"><tbody><tr><td class="fr">is / was + 3-я форма</td><td>сделан, был сделан</td></tr><tr><td class="fr">has been fixed · will be sold</td><td>исправлен · будет продан</td></tr><tr><td class="fr">by</td><td>кем</td></tr><tr><td class="fr">I was born</td><td>я родился</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Вчера у меня украли велосипед.", a: ["My bike was stolen yesterday.", "Yesterday my bike was stolen.", "My bicycle was stolen yesterday."], why: "was stolen" },
    { k: "choice", q: "English … all over the world.", opts: ["is spoken", "speaks", "is speaking"], a: "is spoken", why: "на нём говорят — is spoken" },
    { k: "fix", lang: "en", q: "The bridge built in 1932.", a: ["The bridge was built in 1932."], why: "пропущено was" },
    { k: "input", lang: "en", q: "Баг исправлен.", a: ["The bug has been fixed.", "The bug was fixed.", "The bug is fixed."], why: "has been fixed" },
    { k: "choice", q: "The game was made … three people.", opts: ["by", "from", "with"], a: "by", why: "кем — by" },
    { k: "input", lang: "en", q: "Тебя пригласили?", a: ["Were you invited?", "Have you been invited?"], why: "Were you invited?" },
    { k: "fix", lang: "en", q: "My phone was stealed.", a: ["My phone was stolen."], why: "steal — stole — stolen" },
    { k: "listen", say: "The tickets will be sold online.", q: "Что прозвучало?", opts: ["Билеты будут продаваться онлайн.", "Билеты продали онлайн.", "Я продам билеты онлайн."], a: "Билеты будут продаваться онлайн.", why: "will be sold" },
    { k: "input", lang: "en", q: "Этот телефон сделан в Китае.", a: ["This phone is made in China.", "This phone was made in China."], why: "is made in" },
    { k: "choice", q: "Я родился в 2009.", opts: ["I was born in 2009.", "I born in 2009.", "I am born in 2009."], a: "I was born in 2009.", why: "was born" },
  ] };
