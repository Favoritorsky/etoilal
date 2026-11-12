window.EN_C = window.EN_C || {};
EN_C[3] = { n: 3, t: "Прямо сейчас: Present Continuous", s: "I'm working — процесс в эту минуту",
  words: [["right now", "прямо сейчас", "райт нáу"], ["at the moment", "в данный момент", "эт зэ мóумэнт"], ["wait", "ждать", "уэйт"], ["rain", "дождь; идёт дождь", "рэйн"], ["sleep", "спать", "слип"], ["listen", "слушать", "лисн"], ["look for", "искать", "лук фо"], ["talk", "разговаривать", "ток"]],
  sut: "То, что происходит <b>прямо сейчас</b>, в процессе: {{I'm playing.}} — «я (есть) играющий». Это am/is/are из урока 1 + глагол с <b>-ing</b>.",
  rule: `<table class="tbl"><thead><tr><th></th><th>сейчас</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">I'm waiting</td></tr><tr><td>он, она</td><td class="fr">she's sleeping</td></tr><tr><td>мы, они</td><td class="fr">they're talking</td></tr>
<tr><td>не</td><td class="fr">I'm not listening</td></tr><tr><td>вопрос</td><td class="fr">Are you sleeping? · What are you doing?</td></tr></tbody></table>`,
  prosto: `<p>Сравни: {{I play games.}} — я вообще играю (это моё хобби). {{I'm playing a game.}} — я играю прямо сейчас, не мешай!</p>
> What are you doing? :: Что ты делаешь (сейчас)?
> I'm waiting for the bus. :: Я жду автобус.
> It's raining. :: Идёт дождь.
> She's sleeping, be quiet! :: Она спит, тише!
> They're talking about the game. :: Они говорят об игре.
> I'm not listening. :: Я не слушаю.
> Are you looking for something? :: Ты что-то ищешь?
> He's working at the moment. :: Сейчас он работает.
@@pin:en3@@
<h3>Как пишется -ing</h3>
<p>Обычно просто +ing: {{play}} → {{playing}}. Немая е на конце пропадает: {{make}} → {{making}}. Короткое слово на «гласная + согласная» удваивает её: {{sit}} → {{sitting}}, {{run}} → {{running}}.</p>
<h3>Частые ошибки</h3>
<p>• «I playing» — пропущено am: {{I'm playing.}} • «What do you do now?» — про сейчас нужно {{What are you doing?}} • «I'm knowing» — некоторые глаголы-«состояния» не бывают с -ing: {{I know}}, {{I like}}, {{I want}}, {{I need}}.</p>`,
  lub: `<p>В английском есть и такое: {{I'm meeting Tom tomorrow.}} — «Завтра встречаюсь с Томом». Present Continuous для планов, которые уже договорены. Ты увидишь это в уроке 5.</p>`,
  pins: [{ id: "en3", t: "Present Continuous", html: `<table class="tbl"><tbody><tr><td class="fr">am / is / are + -ing</td><td>прямо сейчас</td></tr><tr><td class="fr">What are you doing?</td><td>что делаешь?</td></tr><tr><td class="fr">know, like, want, need</td><td>без -ing</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Тише! Малыш спит. — Be quiet! The baby …", opts: ["is sleeping", "sleeps", "sleeping"], a: "is sleeping", why: "сейчас — is + -ing" },
    { k: "input", lang: "en", q: "Что ты делаешь (сейчас)?", a: ["What are you doing?"], why: "What are you doing?" },
    { k: "input", lang: "en", q: "Идёт дождь.", a: ["It's raining.", "It is raining."], why: "про погоду — it's raining" },
    { k: "choice", q: "I … football every Saturday.", opts: ["play", "am playing", "playing"], a: "play", why: "каждую субботу — обычно, Present Simple" },
    { k: "fix", lang: "en", q: "I waiting for the bus.", a: ["I'm waiting for the bus.", "I am waiting for the bus."], why: "пропущено am" },
    { k: "choice", q: "Как правильно?", opts: ["I'm knowing the answer.", "I know the answer."], a: "I know the answer.", why: "know — без -ing" },
    { k: "input", lang: "en", q: "Я жду автобус.", a: ["I'm waiting for the bus.", "I am waiting for the bus."], why: "wait for — ждать кого-то" },
    { k: "listen", say: "Are you looking for something?", q: "Что прозвучало?", opts: ["Ты что-то ищешь?", "Ты что-то слушаешь?", "Ты кого-то ждёшь?"], a: "Ты что-то ищешь?", why: "look for — искать" },
    { k: "input", lang: "en", q: "Я не слушаю.", a: ["I'm not listening.", "I am not listening."], why: "I'm not + -ing" },
    { k: "choice", q: "run → ?", opts: ["runing", "running", "runnning"], a: "running", why: "короткое слово — удваиваем n" },
    { k: "input", lang: "en", q: "Они говорят об игре.", a: ["They're talking about the game.", "They are talking about the game."], why: "talk about — говорить о" },
  ] };
