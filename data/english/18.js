window.EN_C = window.EN_C || {};
EN_C[18] = { n: 18, t: "Был в процессе: Past Continuous", s: "I was sleeping when the phone rang",
  words: [["while", "пока, в то время как", "уайл"], ["suddenly", "вдруг", "сáднли"], ["rang", "зазвонил (ring)", "рэнг"], ["fell", "упал (fall)", "фэл"], ["noise", "шум", "нойз"], ["shower", "душ", "шáуэ"], ["walk", "идти пешком, гулять", "уок"], ["crash", "авария; разбиться, «вылететь»", "крэш"]],
  sut: "{{was}} / {{were}} + <b>-ing</b> — «был в процессе» в какой-то момент прошлого. Чаще всего — фон для события: {{I was sleeping when the phone rang.}} — «Я спал (процесс), когда зазвонил телефон (событие)».",
  rule: `<table class="tbl"><thead><tr><th></th><th>процесс (фон)</th><th>событие</th></tr></thead><tbody>
<tr><td>форма</td><td class="fr">was / were + -ing</td><td class="fr">Past Simple</td></tr>
<tr><td>пример</td><td class="fr">I was playing</td><td class="fr">when the game crashed.</td></tr>
<tr><td>while</td><td colspan="2" class="fr">While I was walking home, I saw a fox.</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">I / he / she / it was</td><td class="fr">you / we / they were</td></tr><tr><td class="fr">wasn't · weren't</td><td>не</td></tr><tr><td class="fr">What were you doing at 9?</td><td>что ты делал в 9 (в процессе)?</td></tr></tbody></table>`,
  prosto: `<p>В русском разницу передают видом глагола: «читал» (процесс) и «прочитал» (событие). В английском — Past Continuous и Past Simple.</p>
> I was sleeping when the phone rang. :: Я спал, когда зазвонил телефон.
> The game crashed while I was saving. :: Игра вылетела, пока я сохранялся.
> What were you doing at nine last night? :: Что ты делал вчера в девять вечера?
> I was taking a shower. :: Я был в душе. — «принимал душ»
> It was raining all day. :: Весь день шёл дождь.
> While we were walking, we heard a strange noise. :: Пока мы шли, мы услышали странный шум.
> She wasn't listening. :: Она не слушала.
> Suddenly the lights went out. :: Вдруг погас свет. — событие — Past Simple
@@pin:en18@@
<h3>Начало рассказа</h3>
<p>Истории часто начинают с фона: {{It was raining. People were hurrying home.}} — и дальше событие: {{Suddenly I saw…}} Ты это слышал в «The Last Train»!</p>
<h3>Частые ошибки</h3>
<p>• «I was sleep» → {{I was sleeping.}} • «When the phone was ringing, I slept» — наоборот: фон — continuous, событие — simple. • «They was playing» → {{They were playing.}}</p>`,
  lub: `<p>Два процесса одновременно — оба continuous: {{I was cooking while she was cleaning.}} — «Я готовил, а она убиралась».</p>`,
  pins: [{ id: "en18", t: "Past Continuous", html: `<table class="tbl"><tbody><tr><td class="fr">was / were + -ing</td><td>был в процессе</td></tr><tr><td class="fr">I was sleeping when it rang</td><td>фон + событие</td></tr><tr><td class="fr">while I was walking</td><td>пока я шёл</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "I … when the phone rang.", opts: ["was sleeping", "slept", "sleeping"], a: "was sleeping", why: "фон — was + -ing" },
    { k: "input", lang: "en", q: "Игра вылетела, пока я сохранялся.", a: ["The game crashed while I was saving.", "The game crashed when I was saving."], why: "событие crashed + фон was saving" },
    { k: "fix", lang: "en", q: "They was playing football.", a: ["They were playing football."], why: "they → were" },
    { k: "input", lang: "en", q: "Что ты делал вчера в девять вечера?", a: ["What were you doing at nine last night?", "What were you doing at 9 last night?", "What were you doing yesterday at nine?", "What were you doing at nine yesterday evening?"], why: "в процессе в момент — were doing" },
    { k: "choice", q: "Suddenly the lights … out.", opts: ["went", "were going", "go"], a: "went", why: "событие — Past Simple" },
    { k: "input", lang: "en", q: "Весь день шёл дождь.", a: ["It was raining all day."], why: "was raining" },
    { k: "listen", say: "While we were walking, we heard a strange noise.", q: "Что прозвучало?", opts: ["Пока мы шли, мы услышали странный шум.", "Мы шли и шумели.", "Когда мы пришли, был странный шум."], a: "Пока мы шли, мы услышали странный шум.", why: "while — пока" },
    { k: "fix", lang: "en", q: "I was sleep when you called.", a: ["I was sleeping when you called."], why: "was + -ing" },
    { k: "input", lang: "en", q: "Она не слушала.", a: ["She wasn't listening.", "She was not listening."], why: "wasn't + -ing" },
    { k: "choice", q: "I … a shower when you called.", opts: ["was taking", "took", "take"], a: "was taking", why: "фон — was taking" },
  ] };
