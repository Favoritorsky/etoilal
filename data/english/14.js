window.EN_C = window.EN_C || {};
EN_C[14] = { n: 14, t: "Уже, только что, ещё нет", s: "already, just, yet",
  words: [["already", "уже", "олрэ́ди"], ["just", "только что", "джаст"], ["yet", "ещё (не); уже? (в вопросе)", "е́т"], ["finished", "закончил (finish)", "фúништ"], ["arrived", "прибыл (arrive)", "эрáйвд"], ["broken", "сломал (break)", "брóукэн"], ["left", "ушёл, уехал (leave)", "лэфт"], ["found", "нашёл (find)", "фáунд"]],
  sut: "Present Perfect — когда важен <b>результат сейчас</b>. {{I've lost my keys.}} — «Я потерял ключи» (и сейчас их нет!). Три слова-друга: {{just}} — только что, {{already}} — уже, {{yet}} — ещё не / уже? (в конце фразы).",
  rule: `<table class="tbl"><thead><tr><th>слово</th><th>где стоит</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">just</td><td>между have и глаголом</td><td class="fr">I've just arrived.</td></tr>
<tr><td class="fr">already</td><td>между have и глаголом</td><td class="fr">She's already left.</td></tr>
<tr><td class="fr">yet</td><td>в конце: с «не» и в вопросе</td><td class="fr">I haven't finished yet. · Have you finished yet?</td></tr></tbody></table>`,
  prosto: `<p>Думай о картинке «сейчас». {{The train has left.}} — поезда на платформе нет. {{I've broken my phone.}} — телефон сейчас сломан. Когда именно это случилось — неважно.</p>
> I've just arrived. :: Я только что приехал.
> She's already left. :: Она уже ушла.
> I haven't finished yet. :: Я ещё не закончил.
> Have you done your homework yet? :: Ты уже сделал домашку?
> Oh no, I've broken my phone! :: О нет, я разбил телефон!
> Someone has taken my seat. :: Кто-то занял моё место.
> They've just found the answer. :: Они только что нашли ответ.
> The game hasn't started yet. :: Игра ещё не началась.
@@pin:en14@@
<h3>Новости</h3>
<p>Новости почти всегда начинают с Present Perfect: {{A new game has come out!}} — «Вышла новая игра!» А подробности — уже в Past Simple: {{It came out yesterday.}}</p>
<h3>Частые ошибки</h3>
<p>• «I already have finished» → {{I've already finished.}} • «I didn't finish yet» → {{I haven't finished yet.}} • «Have you finished already?» — можно, но звучит удивлённо: «Ты что, уже?!»</p>`,
  lub: `<p>В американском английском часто говорят {{Did you eat yet?}} вместо {{Have you eaten yet?}} — так проще. В британском так звучит неправильно. Ты будешь слышать оба варианта.</p>`,
  pins: [{ id: "en14", t: "just / already / yet", html: `<table class="tbl"><tbody><tr><td class="fr">I've just arrived</td><td>только что</td></tr><tr><td class="fr">She's already left</td><td>уже</td></tr><tr><td class="fr">I haven't finished yet · …yet?</td><td>ещё не · уже? (в конце)</td></tr><tr><td class="fr">результат сейчас</td><td>Present Perfect</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Я только что приехал.", a: ["I've just arrived.", "I have just arrived.", "I've just come."], why: "have + just + arrived" },
    { k: "choice", q: "I haven't finished …", opts: ["yet", "already", "just"], a: "yet", why: "с «не» в конце — yet" },
    { k: "fix", lang: "en", q: "She already has left.", a: ["She has already left.", "She's already left."], why: "already — между has и глаголом" },
    { k: "input", lang: "en", q: "Ты уже сделал домашку?", a: ["Have you done your homework yet?", "Have you done your homework already?", "Have you already done your homework?"], why: "Have you done … yet?" },
    { k: "choice", q: "О нет, я разбил телефон! — Oh no, I've … my phone!", opts: ["broke", "broken", "breaked"], a: "broken", why: "break — broke — broken" },
    { k: "fix", lang: "en", q: "I didn't finish yet.", a: ["I haven't finished yet."], why: "yet — с Present Perfect" },
    { k: "input", lang: "en", q: "Игра ещё не началась.", a: ["The game hasn't started yet.", "The game has not started yet."], why: "hasn't started yet" },
    { k: "listen", say: "Someone has taken my seat.", q: "Что прозвучало?", opts: ["Кто-то занял моё место.", "Я занял чьё-то место.", "Кто-то нашёл моё место."], a: "Кто-то занял моё место.", why: "has taken — занял (и сейчас занято)" },
    { k: "choice", q: "Поезда на платформе нет: The train …", opts: ["has left", "leaves", "is leaving"], a: "has left", why: "результат сейчас" },
    { k: "input", lang: "en", q: "Она уже ушла.", a: ["She's already left.", "She has already left.", "She's already gone.", "She has already gone."], why: "has already left" },
  ] };
