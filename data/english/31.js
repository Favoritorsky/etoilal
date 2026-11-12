window.EN_C = window.EN_C || {};
EN_C[31] = { n: 31, t: "Живой английский: связки и разговорное", s: "although, however, gonna, kind of",
  words: [["although", "хотя", "олзóу"], ["however", "однако", "хауэ́вэ"], ["so", "поэтому, так что", "соу"], ["anyway", "в любом случае; короче", "э́ниуэй"], ["actually", "вообще-то, на самом деле", "э́кчуэли"], ["kind of", "типа, вроде, как бы", "кáйнд ов"], ["gonna / wanna", "going to / want to (разг.)", "гóна / уóна"], ["by the way", "кстати", "бай зэ уэй"]],
  sut: "Живая речь держится на связках и «словах-паразитах». Если их узнавать на слух, понимание сразу растёт. Связки: {{although}} — хотя, {{however}} — однако, {{so}} — поэтому. Разговорное: {{gonna}}, {{wanna}}, {{kind of}}, {{actually}}, {{anyway}}.",
  rule: `<table class="tbl"><thead><tr><th>пишут</th><th>говорят (быстро)</th><th>значит</th></tr></thead><tbody>
<tr><td class="fr">going to</td><td class="fr">gonna</td><td>собираюсь</td></tr>
<tr><td class="fr">want to</td><td class="fr">wanna</td><td>хочу</td></tr>
<tr><td class="fr">have got to</td><td class="fr">gotta</td><td>надо</td></tr>
<tr><td class="fr">kind of</td><td class="fr">kinda</td><td>типа, вроде</td></tr>
<tr><td class="fr">don't know</td><td class="fr">dunno</td><td>не знаю</td></tr>
<tr><td class="fr">What do you…</td><td class="fr">Whaddaya…</td><td>что ты…</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">although + фраза</td><td>хотя: Although it was late, we played.</td></tr><tr><td class="fr">However, …</td><td>однако (в начале новой фразы)</td></tr><tr><td class="fr">so · because</td><td>поэтому · потому что</td></tr></tbody></table>`,
  prosto: `<p>Пиши ты нормально: going to, want to. А слушай — с поправкой: носители «съедают» звуки. Это не другой язык, это просто быстро.</p>
> Although it was late, we kept playing. :: Хотя было поздно, мы продолжали играть.
> It's expensive. However, it's really good. :: Это дорого. Однако это реально хорошо.
> I was tired, so I went to bed. :: Я устал, поэтому пошёл спать.
> I'm gonna be late. :: Я опоздаю.
> I don't wanna go. :: Не хочу идти.
> It's kind of weird. :: Это как-то странно.
> Actually, I've never been there. :: Вообще-то я там никогда не был.
> Anyway, let's start. :: Короче, давай начнём.
> By the way, have you seen my phone? :: Кстати, ты не видел мой телефон?
@@pin:en31@@
<h3>Слова, которые ничего не значат</h3>
<p>{{like}}, {{you know}}, {{I mean}} — «типа», «ну, знаешь», «в смысле». <i>It was, like, really cool, you know?</i> Не ищи в них смысл — это паузы, чтобы подумать.</p>
<h3>Частые ошибки</h3>
<p>• «Although…, but…» — в английском не ставят оба: либо although, либо but. • «I gonna» → {{I'm gonna}}. • Не пиши gonna в школьных работах и письмах — только в чатах.</p>`,
  lub: `<p>{{actually}} — ложный друг: это НЕ «актуально», а «на самом деле». «Актуально» — {{relevant}} или {{up to date}}.</p>`,
  pins: [{ id: "en31", t: "Живая речь", html: `<table class="tbl"><tbody><tr><td class="fr">gonna · wanna · gotta · kinda · dunno</td><td>собираюсь · хочу · надо · типа · не знаю</td></tr><tr><td class="fr">although · however · so</td><td>хотя · однако · поэтому</td></tr><tr><td class="fr">actually · anyway · by the way</td><td>вообще-то · короче · кстати</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "«I'm gonna be late» — это:", opts: ["Я опоздаю.", "Я ушёл поздно.", "Я хочу опоздать."], a: "Я опоздаю.", why: "gonna = going to" },
    { k: "input", lang: "en", q: "Я устал, поэтому пошёл спать.", a: ["I was tired, so I went to bed.", "I was tired so I went to bed.", "I was tired, so I went to sleep."], why: "so — поэтому" },
    { k: "input", lang: "en", q: "Хотя было поздно, мы продолжали играть.", a: ["Although it was late, we kept playing.", "Although it was late, we continued playing.", "Although it was late, we continued to play."], why: "although + keep playing" },
    { k: "fix", lang: "en", q: "Although it was cold, but we went out.", a: ["Although it was cold, we went out.", "It was cold, but we went out."], why: "although и but вместе не ставят" },
    { k: "choice", q: "«Actually, I've never been there» — actually значит:", opts: ["вообще-то", "актуально", "аккуратно"], a: "вообще-то", why: "ложный друг" },
    { k: "listen", say: "By the way, have you seen my phone?", q: "Что прозвучало?", opts: ["Кстати, ты не видел мой телефон?", "По дороге ты видел мой телефон?", "Ты нашёл мой телефон?"], a: "Кстати, ты не видел мой телефон?", why: "by the way — кстати" },
    { k: "choice", q: "«I dunno» — это:", opts: ["Я не знаю.", "Я не сделал.", "Я ничего."], a: "Я не знаю.", why: "dunno = don't know" },
    { k: "input", lang: "en", q: "Короче, давай начнём.", a: ["Anyway, let's start.", "Anyway, let's begin.", "Anyway let's start."], why: "anyway — короче" },
    { k: "listen", say: "It's kind of weird.", q: "Что прозвучало?", opts: ["Это как-то странно.", "Это очень добрый.", "Это совсем не странно."], a: "Это как-то странно.", why: "kind of — как-то, типа" },
  ] };
