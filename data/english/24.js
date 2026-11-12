window.EN_C = window.EN_C || {};
EN_C[24] = { n: 24, t: "Если бы: if + would", s: "If I had money, I would buy it",
  words: [["would", "бы", "вуд"], ["rich", "богатый", "рич"], ["famous", "знаменитый", "фэ́ймэс"], ["superpower", "суперсила", "сýпэпауэ"], ["invisible", "невидимый", "инвúзэбл"], ["island", "остров", "áйлэнд"], ["were", "был бы (if I were)", "уё"], ["in your place", "на твоём месте", "ин ё плэйс"]],
  sut: "Нереальное или маловероятное: «если бы…, то бы…». После {{if}} — <b>прошедшее</b> (had, knew, were), во второй половине — {{would}} + глагол. {{If I had a million, I would buy an island.}}",
  rule: `<table class="tbl"><thead><tr><th>если бы (прошедшее)</th><th>то бы (would)</th></tr></thead><tbody>
<tr><td class="fr">If I had more time,</td><td class="fr">I would learn Japanese.</td></tr>
<tr><td class="fr">If I knew the answer,</td><td class="fr">I'd tell you.</td></tr>
<tr><td class="fr">If I were you,</td><td class="fr">I wouldn't do it.</td></tr></tbody></table>
<p>{{I'd}} = I would. {{wouldn't}} = would not. С be после if часто говорят {{were}} для всех: {{If I were rich…}}, {{If he were here…}}</p>`,
  prosto: `<p>Сравни с прошлым уроком: {{If I win, I'll buy a pizza.}} — реально может случиться. {{If I won a million, I'd buy an island.}} — мечта, вряд ли. Прошедшее время после if здесь не про прошлое, а про «нереальность».</p>
> If I had a superpower, I would be invisible. :: Если бы у меня была суперсила, я был бы невидимым.
> If I were you, I'd talk to her. :: На твоём месте я бы с ней поговорил.
> What would you do if you were rich? :: Что бы ты делал, если бы был богатым?
> If I knew his number, I'd call him. :: Если бы я знал его номер, я бы ему позвонил.
> I wouldn't do that if I were you. :: Я бы на твоём месте этого не делал.
> If we lived by the sea, we'd swim every day. :: Если бы мы жили у моря, мы бы плавали каждый день.
> It would be great! :: Было бы классно!
@@pin:en24@@
<h3>Вежливое would</h3>
<p>{{Would you like some tea?}} — «Хотите чаю?» {{I'd like a coffee, please.}} — «Мне, пожалуйста, кофе». Это вежливее, чем want.</p>
<h3>Частые ошибки</h3>
<p>• «If I would have money» → {{If I had money.}} — would не ставят после if. • «If I was you» — так говорят в разговоре, но правильнее {{If I were you}}. • «I would to go» → {{I would go.}}</p>`,
  lub: `<p>Есть и третий вид: о прошлом, которое уже не изменить. {{If I had known, I would have come.}} — «Если бы я знал, я бы пришёл (но не знал и не пришёл)». Это уровень повыше — пока просто узнавай на слух «would have».</p>`,
  pins: [{ id: "en24", t: "if + would", html: `<table class="tbl"><tbody><tr><td class="fr">If I had…, I would…</td><td>если бы…, то бы</td></tr><tr><td class="fr">If I were you, I'd…</td><td>на твоём месте я бы</td></tr><tr><td class="fr">I'd like · Would you like…?</td><td>вежливо: хотел бы</td></tr><tr><td class="fr">после if — без would</td><td></td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "If I … more time, I would learn Japanese.", opts: ["had", "have", "would have"], a: "had", why: "если бы — прошедшее" },
    { k: "input", lang: "en", q: "На твоём месте я бы с ней поговорил.", a: ["If I were you, I'd talk to her.", "If I were you, I would talk to her.", "If I was you, I'd talk to her.", "If I was you, I would talk to her."], why: "If I were you, I'd…" },
    { k: "fix", lang: "en", q: "If I would know his number, I'd call him.", a: ["If I knew his number, I'd call him.", "If I knew his number, I would call him."], why: "после if — knew" },
    { k: "input", lang: "en", q: "Что бы ты делал, если бы был богатым?", a: ["What would you do if you were rich?", "What would you do if you was rich?"], why: "What would you do if…" },
    { k: "choice", q: "Если я выиграю (реально) — или если бы я выиграл (мечта)? «If I won a million…»", opts: ["мечта, вряд ли", "реально может быть"], a: "мечта, вряд ли", why: "прошедшее после if — нереально" },
    { k: "input", lang: "en", q: "Было бы классно!", a: ["It would be great!", "It would be great.", "That would be great!", "That would be great.", "It'd be great!"], why: "would be" },
    { k: "listen", say: "If we lived by the sea, we'd swim every day.", q: "Что прозвучало?", opts: ["Если бы мы жили у моря, мы бы плавали каждый день.", "Мы живём у моря и плаваем каждый день.", "Если мы поедем на море, будем плавать."], a: "Если бы мы жили у моря, мы бы плавали каждый день.", why: "lived … we'd — если бы" },
    { k: "choice", q: "Вежливо: «Мне, пожалуйста, кофе».", opts: ["I'd like a coffee, please.", "I want coffee.", "Give coffee."], a: "I'd like a coffee, please.", why: "I'd like — вежливо" },
    { k: "fix", lang: "en", q: "I would to buy an island.", a: ["I would buy an island.", "I'd buy an island."], why: "would + глагол без to" },
  ] };
