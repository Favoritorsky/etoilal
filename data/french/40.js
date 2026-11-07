window.FR_C = window.FR_C || {};
FR_C[40] = { n: 40, t: "Кого: le, la, les перед глаголом", s: "je le vois — я его вижу",
  words: [["connaître", "знать (кого-то)", "конэтр"], ["chercher", "искать", "шэршэ"], ["appeler", "звать; звонить", "аплэ"], ["croire", "верить", "круар"],
    ["me, te", "меня, тебя", "мё, тё"], ["le, la, les", "его, её, их", "лё, ла, ле"], ["nous, vous", "нас, вас", "ну, ву"]],
  sut: "«Его, её, их» во французском — те же маленькие слова {{le}}, {{la}}, {{les}}, но они встают <b>перед глаголом</b>: {{Je le vois.}} — «я его вижу». «Меня, тебя» — {{me}}, {{te}}. Перед гласной: {{je l'aime}}, {{il m'appelle}}.",
  rule: `<table class="tbl"><thead><tr><th>кого</th><th>слово</th><th>пример</th></tr></thead><tbody>
<tr><td>меня · тебя</td><td class="fr">me (m') · te (t')</td><td class="fr">Il me voit. Je t'aime.</td></tr>
<tr><td>его · её</td><td class="fr">le (l') · la (l')</td><td class="fr">Je le connais. Je la cherche.</td></tr>
<tr><td>нас · вас</td><td class="fr">nous · vous</td><td class="fr">Il nous appelle.</td></tr>
<tr><td>их</td><td class="fr">les</td><td class="fr">Je les vois.</td></tr></tbody></table>
<p>«Не»: <span class="fr">Je ne le vois pas.</span> Прошлое: <span class="fr">Je l'ai vu.</span> С двумя глаголами — перед вторым: <span class="fr">Je veux le voir.</span></p>`,
  prosto: `<p>По-русски мы говорим «я вижу его» или «я его вижу» — как удобно. Во французском место одно: <b>перед глаголом</b>.</p>
> Je le vois. :: Я его вижу. — «жё лё вуа»
> Tu la connais ? :: Ты её знаешь? — «тю ла конэ»
> Je les cherche. :: Я их ищу. — «жё ле шэрш»
> Je t'aime. :: Я тебя люблю. — «жё тэм»
> Il m'appelle ce soir. :: Он мне позвонит сегодня вечером. — «иль мапэль сё суар»: французы «зовут кого», а не «кому»
> Tu me crois ? :: Ты мне веришь? — «тю мё круа»
> Je ne le connais pas. :: Я его не знаю. — «жё нё лё конэ па»
> Je l'ai vu hier. :: Я видел его вчера. — «жё лэ вю йер»
> Je veux la voir. :: Я хочу её увидеть. — «жё вё ла вуар»
@@pin:fr40@@
<h3>Где стоит, если глаголов два или есть «не»</h3>
<p>Маленькое слово прилипает к тому глаголу, к которому относится: {{Je veux le voir.}} — «хочу его видеть» (видеть его). В прошлом — перед avoir: {{Je l'ai vu.}} С «не» — внутри рамки: {{Je ne le vois pas.}}</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я его вижу» — местоимение перед глаголом тоже можно.</p>
<p><b>Не как в русском:</b> у нас есть выбор, у французов — нет: «Je vois le» — ошибка. И некоторые глаголы требуют «кого», хотя у нас «кому»: {{appeler}} — «позвонить кому» = «позвать кого»: {{je l'appelle}}.</p>
<h3>Частые ошибки</h3>
<p>• «Je vois le» — надо {{Je le vois.}} • «Je le ai vu» — перед гласной {{l'}}: {{Je l'ai vu.}} • «Je le veux voir» — к второму глаголу: {{Je veux le voir.}}</p>`,
  lub: `<p>{{le}}, {{la}}, {{les}} выглядят как артикли — и это не случайно: и те и другие выросли из латинского <i>ille</i> «тот». Только артикль стоит перед существительным, а это слово — перед глаголом.</p>
<p>«Je t'aime» — пожалуй, самая известная французская фраза в мире. Теперь ты знаешь, как она устроена: je + te (тебя) + aime (люблю).</p>`,
  pins: [{ id: "fr40", t: "Кого: me, te, le, la…", html: `<table class="tbl"><tbody><tr><td>кого</td><td class="fr">me · te · le / la · nous · vous · les</td></tr><tr><td>место</td><td>перед глаголом: <span class="fr">Je le vois.</span></td></tr><tr><td>«не» / прошлое</td><td class="fr">Je ne le vois pas. · Je l'ai vu.</td></tr><tr><td>два глагола</td><td class="fr">Je veux le voir.</td></tr></tbody></table>` }],
  tasks: [
    { k: "tiles", lang: "fr", q: "Я его вижу.", a: "Je le vois", d: ["la", "lui"], why: "le — перед глаголом" },
    { k: "choice", q: "Ты её знаешь?", opts: ["Tu la connais ?", "Tu connais la ?", "Tu le connais ?"], a: "Tu la connais ?", why: "её — la, перед глаголом" },
    { k: "input", lang: "fr", q: "Я тебя люблю.", a: ["Je t'aime."], why: "te → t' перед гласной" },
    { k: "fix", lang: "fr", q: "Je cherche les.", a: ["Je les cherche."], why: "les — перед глаголом" },
    { k: "input", lang: "fr", q: "Я его не знаю.", a: ["Je ne le connais pas."], why: "ne + le + глагол + pas" },
    { k: "choice", q: "Я видел его вчера.", opts: ["Je l'ai vu hier.", "Je le ai vu hier.", "J'ai le vu hier."], a: "Je l'ai vu hier.", why: "перед avoir, l' перед гласной" },
    { k: "listen", say: "Tu me crois ?", q: "Что прозвучало?", opts: ["Ты мне веришь?", "Ты меня ищешь?", "Ты меня знаешь?"], a: "Ты мне веришь?", why: "croire — верить; me — мне" },
    { k: "choice", q: "Я хочу её увидеть.", opts: ["Je veux la voir.", "Je la veux voir.", "Je veux voir la."], a: "Je veux la voir.", why: "la — перед вторым глаголом" },
    { k: "input", lang: "fr", q: "Он мне позвонит сегодня вечером. (настоящее)", a: ["Il m'appelle ce soir."], why: "appeler — кого: m'appelle" },
    { k: "choice", q: "Я их ищу. — Je … cherche.", opts: ["les", "leur", "la"], a: "les", why: "их (кого) — les" },
  ] };
