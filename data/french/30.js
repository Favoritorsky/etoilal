window.FR_C = window.FR_C || {};
FR_C[30] = { n: 30, t: "Скоро: je vais chanter", s: "aller + глагол — «собираюсь сделать»",
  words: [["demain", "завтра", "дёмэн"], ["bientôt", "скоро", "бьенто"], ["ce soir", "сегодня вечером", "сё суар"], ["le week-end", "выходные", "лё уикэнд"],
    ["voyager", "путешествовать", "вуаяжэ"], ["visiter", "осматривать, посещать", "визитэ"], ["inviter", "приглашать", "энвитэ"], ["prochain", "следующий", "прошэн"]],
  sut: "Самое простое будущее: <b>aller + глагол целиком</b>. {{Je vais manger.}} — «я буду есть / сейчас поем» (буквально «я иду есть»). Ты уже знаешь все формы aller — значит, уже умеешь говорить о будущем.",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>aller + глагол</th><th>значит</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je vais chanter</td><td>я буду петь / спою</td></tr><tr><td>ты</td><td class="fr">tu vas chanter</td><td>ты споёшь</td></tr>
<tr><td>он</td><td class="fr">il va chanter</td><td>он споёт</td></tr><tr><td>мы</td><td class="fr">nous allons chanter</td><td>мы споём</td></tr>
<tr><td>вы</td><td class="fr">vous allez chanter</td><td>вы споёте</td></tr><tr><td>они</td><td class="fr">ils vont chanter</td><td>они споют</td></tr></tbody></table>
<p>«Не»: <span class="fr">Je ne vais pas chanter.</span> — ne … pas вокруг aller.</p>`,
  prosto: `<p>По-русски мы говорим «я собираюсь в кино» или «сейчас буду есть». Французы — «я иду есть»: {{je vais}} + глагол целиком. Так говорят о том, что случится <b>скоро</b> или <b>точно</b>.</p>
> Je vais manger. :: Я сейчас поем. — «жё вэ манжэ»
> Tu vas voyager cet été ? :: Ты будешь путешествовать этим летом? — «тю ва вуаяжэ сэтэтэ»
> Il va pleuvoir. :: Будет дождь. — «иль ва плёвуар»
> Nous allons visiter Paris. :: Мы будем осматривать Париж. — «нузалон визитэ пари»
> Vous allez venir ce soir ? :: Вы придёте сегодня вечером? — «вузалэ вёнир сё суар»
> Ils vont inviter leurs amis. :: Они пригласят своих друзей. — «иль вонтэнвитэ лёрзами»
> Demain, je vais partir. :: Завтра я уеду. — «дёмэн жё вэ партир»
> Je ne vais pas travailler le week-end. :: Я не буду работать в выходные. — «жё нё вэ па травайе лё уикэнд»
@@pin:fr30@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я <b>буду</b> работать» — тоже два слова: вспомогательное + глагол целиком.</p>
<p><b>Не как в русском:</b> вместо «буду» — «иду»: {{je vais travailler}}. Это будущее французы используют в разговоре чаще всего.</p>
<h3>Частые ошибки</h3>
<p>• Меняют второй глагол: «je vais mange» — надо {{je vais manger}}. • Ставят pas после второго глагола: «je vais manger pas» — надо {{je ne vais pas manger}}. • Путают «я иду на пляж» ({{je vais à la plage}}) и «я сейчас поплаваю» ({{je vais nager}}).</p>`,
  lub: `<p>Такое будущее есть и в английском: <i>I'm going to sing</i> — «я собираюсь петь». И в испанском: <i>voy a cantar</i>. Видимо, мысль «иду делать» = «скоро сделаю» приходит в голову всем народам.</p>
<p>{{prochain}} «следующий» стоит после слова: {{la semaine prochaine}} «на следующей неделе», {{l'été prochain}} «следующим летом».</p>`,
  pins: [{ id: "fr30", t: "Скоро: aller + глагол", html: `<table class="tbl"><tbody><tr><td class="fr">je vais · tu vas · il va</td><td rowspan="2">+ глагол целиком: <span class="fr">chanter, partir, faire</span></td></tr><tr><td class="fr">nous allons · vous allez · ils vont</td></tr><tr><td class="fr">Je ne vais pas…</td><td>не буду…</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я сейчас поем. — Je … manger.", opts: ["vais", "va", "suis"], a: "vais", why: "je vais + глагол" },
    { k: "input", lang: "fr", q: "Мы будем осматривать Париж.", a: ["Nous allons visiter Paris."], why: "nous allons + visiter" },
    { k: "fix", lang: "fr", q: "Il va pleut.", a: ["Il va pleuvoir."], why: "после aller — глагол целиком: pleuvoir" },
    { k: "tiles", lang: "fr", q: "Они пригласят своих друзей.", a: "Ils vont inviter leurs amis", d: ["invitent", "sont"], why: "ils vont + inviter" },
    { k: "input", lang: "fr", q: "Я не буду работать в выходные.", a: ["Je ne vais pas travailler le week-end."], why: "ne … pas вокруг aller" },
    { k: "choice", q: "Ты будешь путешествовать этим летом?", opts: ["Tu vas voyager cet été ?", "Tu va voyager cet été ?", "Tu vas voyages cet été ?"], a: "Tu vas voyager cet été ?", why: "tu vas + voyager" },
    { k: "listen", say: "Demain, je vais partir.", q: "Что прозвучало?", opts: ["Завтра я уеду.", "Завтра я приду.", "Сегодня я уеду."], a: "Завтра я уеду.", why: "demain — завтра, partir — уезжать" },
    { k: "input", lang: "fr", q: "Вы придёте сегодня вечером?", a: ["Vous allez venir ce soir ?"], why: "vous allez + venir" },
    { k: "choice", q: "на следующей неделе", opts: ["la semaine prochaine", "la prochaine semaine", "la semaine prochain"], a: "la semaine prochaine", why: "prochain после слова; semaine — «она»: prochaine" },
    { k: "input", lang: "fr", q: "Будет дождь.", a: ["Il va pleuvoir."], why: "il va + pleuvoir" },
  ] };
