window.EN_C = window.EN_C || {};
EN_C[29] = { n: 29, t: "Который: who, which, that, where", s: "the man who…, the place where…",
  words: [["who", "который (о людях)", "ху"], ["which", "который (о вещах)", "уич"], ["that", "который (обо всём)", "зэт"], ["where", "где (в котором)", "уэа"], ["whose", "чей", "хуз"], ["neighbour", "сосед", "нэ́йбэ"], ["remember", "помнить", "римэ́мбэ"], ["place", "место", "плэйс"]],
  sut: "«Который» в английском зависит от того, о ком речь: люди — {{who}}, вещи — {{which}}, и то, и другое — {{that}}. Место — {{where}}. Пример: {{the girl who lives next door}} — «девушка, которая живёт по соседству».",
  rule: `<table class="tbl"><thead><tr><th>о ком</th><th>слово</th><th>пример</th></tr></thead><tbody>
<tr><td>люди</td><td class="fr">who / that</td><td class="fr">the man who called you</td></tr>
<tr><td>вещи, животные</td><td class="fr">which / that</td><td class="fr">the game which I bought</td></tr>
<tr><td>место</td><td class="fr">where</td><td class="fr">the town where I was born</td></tr>
<tr><td>чей</td><td class="fr">whose</td><td class="fr">the boy whose dog is lost</td></tr></tbody></table>
<p>Если «который» — не тот, кто действует, его часто выбрасывают: {{the game (that) I bought}} — «игра, которую я купил».</p>`,
  prosto: `<p>По-русски «который» меняется по падежам: который, которую, которому… В английском — одно слово. Зато надо выбрать: человек или вещь.</p>
> The girl who lives next door is a programmer. :: Девушка, которая живёт по соседству, — программист.
> This is the game that I told you about. :: Это та игра, про которую я тебе говорил.
> I lost the phone which you gave me. :: Я потерял телефон, который ты мне подарил.
> That's the station where I saw her. :: Это та станция, где я её увидел.
> Do you remember the guy we met yesterday? :: Помнишь парня, которого мы вчера встретили? — who/that выброшен
> He's the friend whose brother is a pilot. :: Это друг, у которого брат — пилот.
> The film I watched last night was amazing. :: Фильм, который я смотрел вчера, был потрясающим.
@@pin:en29@@
<h3>Когда нельзя выбросить</h3>
<p>Если «который» сам делает действие — оставляем: {{the man who called}} (он позвонил). Если с ним что-то делают — можно убрать: {{the man (who) I called}} (я ему позвонил).</p>
<h3>Частые ошибки</h3>
<p>• «the man which» → {{the man who}}. • «the town which I was born» → {{the town where I was born}}. • «the game that I bought it» — лишнее it: {{the game that I bought}}.</p>`,
  lub: `<p>С запятыми — дополнительная информация, и там that нельзя: {{My brother, who lives in Moscow, is a doctor.}} — «Мой брат (кстати, он живёт в Москве) — врач».</p>`,
  pins: [{ id: "en29", t: "who / which / that / where", html: `<table class="tbl"><tbody><tr><td class="fr">who</td><td>люди</td></tr><tr><td class="fr">which</td><td>вещи</td></tr><tr><td class="fr">that</td><td>и то, и другое</td></tr><tr><td class="fr">where · whose</td><td>где · чей</td></tr><tr><td class="fr">the game I bought</td><td>«который» можно выбросить</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "The girl … lives next door is a programmer.", opts: ["who", "which", "where"], a: "who", why: "люди — who" },
    { k: "choice", q: "That's the town … I was born.", opts: ["where", "which", "who"], a: "where", why: "место — where" },
    { k: "input", lang: "en", q: "Это та игра, про которую я тебе говорил.", a: ["This is the game that I told you about.", "This is the game I told you about.", "This is the game which I told you about.", "That's the game I told you about.", "It's the game I told you about."], why: "the game (that) I told you about" },
    { k: "fix", lang: "en", q: "The man which called you is my uncle.", a: ["The man who called you is my uncle.", "The man that called you is my uncle."], why: "человек — who" },
    { k: "input", lang: "en", q: "Я потерял телефон, который ты мне подарил.", a: ["I lost the phone which you gave me.", "I lost the phone that you gave me.", "I lost the phone you gave me.", "I've lost the phone you gave me.", "I've lost the phone that you gave me."], why: "which / that / без слова" },
    { k: "choice", q: "He's the friend … brother is a pilot.", opts: ["whose", "who", "which"], a: "whose", why: "чей — whose" },
    { k: "listen", say: "Do you remember the guy we met yesterday?", q: "Что прозвучало?", opts: ["Помнишь парня, которого мы вчера встретили?", "Ты встретил вчера парня?", "Помнишь, где мы вчера встретились?"], a: "Помнишь парня, которого мы вчера встретили?", why: "the guy (who) we met" },
    { k: "fix", lang: "en", q: "This is the game that I bought it.", a: ["This is the game that I bought.", "This is the game I bought."], why: "лишнее it" },
    { k: "input", lang: "en", q: "Это та станция, где я её увидел.", a: ["That's the station where I saw her.", "This is the station where I saw her.", "That is the station where I saw her."], why: "where" },
  ] };
