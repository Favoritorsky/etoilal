window.EN_C = window.EN_C || {};
EN_C[25] = { n: 25, t: "Жаль, что…: I wish", s: "I wish I knew — мечты и сожаления",
  words: [["wish", "желать; жаль, что", "уиш"], ["regret", "сожалеть", "ригрэ́т"], ["instead", "вместо этого", "инстэ́д"], ["speak", "говорить (на языке)", "спик"], ["fly", "летать", "флай"], ["taller", "выше (ростом)", "тóлэ"], ["closer", "ближе", "клóузэ"], ["stop", "перестать, прекратить", "стоп"]],
  sut: "{{I wish}} + прошедшее = «жаль, что не…» / «хотел бы». {{I wish I knew English better.}} — «Жаль, что я не знаю английский лучше» (хотел бы знать). Как в «если бы» (урок 24): прошедшее — значит «нереально сейчас».",
  rule: `<table class="tbl"><thead><tr><th>хочу, чтобы сейчас было иначе</th><th>перевод</th></tr></thead><tbody>
<tr><td class="fr">I wish I had a dog.</td><td>Жаль, что у меня нет собаки.</td></tr>
<tr><td class="fr">I wish I could fly.</td><td>Хотел бы я уметь летать.</td></tr>
<tr><td class="fr">I wish I were taller.</td><td>Жаль, что я не выше.</td></tr>
<tr><td class="fr">I wish you would stop!</td><td>Ну перестань же уже! (раздражение)</td></tr></tbody></table>
<p>О прошлом (уже не исправить) — {{had}} + 3-я форма: {{I wish I hadn't said that.}} — «Зря я это сказал».</p>`,
  prosto: `<p>Русское «жаль, что не» и «вот бы» — по-английски одно {{I wish}}. Главное — сдвинуть время назад: «знаю» → {{knew}}, «могу» → {{could}}, «есть» → {{had}}.</p>
> I wish I knew. :: Хотел бы я знать.
> I wish I could speak French. :: Жаль, что я не говорю по-французски.
> I wish it were summer. :: Вот бы сейчас было лето.
> I wish we lived closer. :: Жаль, что мы не живём ближе.
> I wish I hadn't eaten so much. :: Зря я столько съел. — прошлое: hadn't eaten
> I wish you would stop talking! :: Да перестань ты уже болтать!
> If only I had more time! :: Если бы только у меня было больше времени! — if only = сильное I wish
@@pin:en25@@
<h3>wish — и просто «желаю»</h3>
<p>{{I wish you a happy birthday!}} — «Желаю тебе счастливого дня рождения!» {{Best wishes!}} — «Всего наилучшего!» Здесь никакого «жаль».</p>
<h3>Частые ошибки</h3>
<p>• «I wish I know» → {{I wish I knew.}} • «I wish I can» → {{I wish I could.}} • «I wish I didn't say that» (о прошлом) → {{I wish I hadn't said that.}}</p>`,
  lub: `<p>{{I wish}} часто звучит в песнях: <i>I wish you were here</i> — «Жаль, что тебя здесь нет». Теперь ты понимаешь, почему там were, а не are.</p>`,
  pins: [{ id: "en25", t: "I wish", html: `<table class="tbl"><tbody><tr><td class="fr">I wish I knew / had / could</td><td>жаль, что не… (сейчас)</td></tr><tr><td class="fr">I wish I hadn't said…</td><td>зря я… (прошлое)</td></tr><tr><td class="fr">I wish you would stop</td><td>ну перестань же</td></tr><tr><td class="fr">If only…!</td><td>если бы только</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Хотел бы я знать. — I wish I …", opts: ["knew", "know", "will know"], a: "knew", why: "wish + прошедшее" },
    { k: "input", lang: "en", q: "Жаль, что я не говорю по-французски.", a: ["I wish I could speak French.", "I wish I spoke French."], why: "I wish I could speak" },
    { k: "fix", lang: "en", q: "I wish I can fly.", a: ["I wish I could fly."], why: "can → could" },
    { k: "input", lang: "en", q: "Зря я столько съел.", a: ["I wish I hadn't eaten so much.", "I wish I had not eaten so much."], why: "о прошлом — hadn't eaten" },
    { k: "choice", q: "Жаль, что мы не живём ближе.", opts: ["I wish we lived closer.", "I wish we live closer.", "I wish we will live closer."], a: "I wish we lived closer.", why: "live → lived" },
    { k: "input", lang: "en", q: "Вот бы сейчас было лето.", a: ["I wish it were summer.", "I wish it was summer."], why: "I wish it were" },
    { k: "listen", say: "I wish you would stop talking!", q: "Что прозвучало?", opts: ["Да перестань ты уже болтать!", "Хочу, чтобы ты поговорил со мной.", "Жаль, что ты не говоришь."], a: "Да перестань ты уже болтать!", why: "wish you would — раздражение" },
    { k: "choice", q: "I wish you a happy birthday! — это:", opts: ["Желаю тебе счастливого дня рождения!", "Жаль, что у тебя день рождения."], a: "Желаю тебе счастливого дня рождения!", why: "wish кому-то что-то — желать" },
    { k: "fix", lang: "en", q: "I wish I know the answer.", a: ["I wish I knew the answer."], why: "know → knew" },
  ] };
