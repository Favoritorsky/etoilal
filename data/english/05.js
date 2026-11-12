window.EN_C = window.EN_C || {};
EN_C[5] = { n: 5, t: "Будущее: will и going to", s: "решил сейчас — will; уже план — going to",
  words: [["tomorrow", "завтра", "тэмóроу"], ["next week", "на следующей неделе", "нэкст уик"], ["soon", "скоро", "сун"], ["maybe", "может быть", "мэ́йби"], ["probably", "наверное, вероятно", "прóбэбли"], ["promise", "обещать", "прóмис"], ["help", "помогать", "хэлп"], ["call", "звонить", "кол"]],
  sut: "Два главных будущих. {{will}} — когда решаешь прямо сейчас, обещаешь, предполагаешь: {{I'll help you!}} {{going to}} — когда план уже есть: {{I'm going to buy a laptop.}}",
  rule: `<table class="tbl"><thead><tr><th></th><th>will</th><th>going to</th></tr></thead><tbody>
<tr><td>когда</td><td>решил сейчас, обещаю, думаю что</td><td>уже решил раньше, план</td></tr>
<tr><td>да</td><td class="fr">I'll call you.</td><td class="fr">I'm going to call him.</td></tr>
<tr><td>не</td><td class="fr">I won't forget.</td><td class="fr">I'm not going to buy it.</td></tr>
<tr><td>вопрос</td><td class="fr">Will you help me?</td><td class="fr">Are you going to play?</td></tr></tbody></table>
<p>{{won't}} = will not. После will и going to глагол обычный: {{will go}}, {{going to go}}.</p>`,
  prosto: `<p>Представь: звонит телефон. «Я отвечу!» — решил только что: {{I'll get it!}} А «Завтра я иду к врачу» — это давно решено: {{I'm going to see a doctor tomorrow.}}</p>
> I'll help you. :: Я тебе помогу.
> I promise, I won't tell anybody. :: Обещаю, никому не скажу.
> It will probably rain tomorrow. :: Завтра, наверное, будет дождь.
> I'm going to buy a new laptop. :: Я собираюсь купить новый ноутбук.
> We're going to watch the match. :: Мы будем смотреть матч. — уже решили
> Are you going to play tonight? :: Ты будешь сегодня вечером играть?
> Maybe I'll call you later. :: Может, позвоню тебе позже.
> Look at the sky! It's going to rain. :: Посмотри на небо! Сейчас пойдёт дождь. — видишь признаки — going to
@@pin:en5@@
<h3>Как в русском, а как нет</h3>
<p>По-русски «будущее» одно: «помогу», «буду смотреть». В английском выбор зависит от того, <b>когда ты решил</b>. Не страшно перепутать — тебя поймут. Но носитель слышит разницу.</p>
<h3>Частые ошибки</h3>
<p>• «I will to go» — после will без to: {{I will go.}} • «I going to buy» — пропущено am: {{I'm going to buy.}} • В живой речи going to звучит как «гóна» — {{gonna}}. Пишут так только в переписке.</p>`,
  lub: `<p>{{Shall}} — старое слово для будущего с I и we. Сейчас его почти слышно только в вопросах-предложениях: {{Shall we go?}} — «Пойдём?»</p>`,
  pins: [{ id: "en5", t: "will / going to", html: `<table class="tbl"><tbody><tr><td class="fr">I'll · I won't</td><td>решил сейчас, обещание, «наверное»</td></tr><tr><td class="fr">I'm going to + глагол</td><td>план, уже решил</td></tr><tr><td class="fr">It's going to rain</td><td>видно, что сейчас будет</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Звонит телефон: «Я отвечу!»", opts: ["I'll get it!", "I'm going to get it!", "I get it!"], a: "I'll get it!", why: "решил сейчас — will" },
    { k: "input", lang: "en", q: "Я тебе помогу.", a: ["I'll help you.", "I will help you."], why: "обещание — will" },
    { k: "input", lang: "en", q: "Я собираюсь купить новый ноутбук.", a: ["I'm going to buy a new laptop.", "I am going to buy a new laptop."], why: "план — going to" },
    { k: "fix", lang: "en", q: "I will to call you.", a: ["I will call you.", "I'll call you."], why: "после will — без to" },
    { k: "choice", q: "I promise, I … tell anybody.", opts: ["won't", "don't", "am not"], a: "won't", why: "won't = will not" },
    { k: "input", lang: "en", q: "Ты будешь сегодня вечером играть? (план)", a: ["Are you going to play tonight?"], why: "Are you going to…?" },
    { k: "choice", q: "Небо чёрное! — Look! It … rain.", opts: ["is going to", "will", "goes to"], a: "is going to", why: "видны признаки — going to" },
    { k: "listen", say: "Maybe I'll call you later.", q: "Что прозвучало?", opts: ["Может, позвоню тебе позже.", "Я позвонил тебе позже.", "Позвони мне позже."], a: "Может, позвоню тебе позже.", why: "maybe — может быть" },
    { k: "fix", lang: "en", q: "She going to watch the match.", a: ["She's going to watch the match.", "She is going to watch the match."], why: "пропущено is" },
    { k: "input", lang: "en", q: "Завтра, наверное, будет дождь.", a: ["It will probably rain tomorrow.", "It'll probably rain tomorrow.", "Tomorrow it will probably rain."], why: "предположение — will probably" },
  ] };
