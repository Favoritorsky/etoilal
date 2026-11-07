window.FR_C = window.FR_C || {};
FR_C[28] = { n: 28, t: "Это и есть: c'est, il y a", s: "c'est — «это», il y a — «есть, имеется»",
  words: [["c'est", "это (есть)", "сэ"], ["ce sont", "это (много)", "сё сон"], ["il y a", "есть, имеется", "иль я"], ["la chambre", "комната (спальня)", "ла шамбр"],
    ["le lit", "кровать", "лё ли"], ["la cuisine", "кухня", "ла кюизин"], ["le magasin", "магазин", "лё магазэн"], ["la rue", "улица", "ла рю"]],
  sut: "{{c'est}} — «это (есть)»: {{C'est mon ami.}} «Это мой друг». Если предметов много — {{ce sont}}. А «есть, имеется» (что-то где-то находится) — {{il y a}}: {{Il y a un lit dans la chambre.}} «В комнате есть кровать».",
  rule: `<table class="tbl"><tbody>
<tr><td class="fr">C'est un livre.</td><td>Это книга.</td></tr>
<tr><td class="fr">Ce sont des livres.</td><td>Это книги.</td></tr>
<tr><td class="fr">C'est beau !</td><td>Это красиво!</td></tr>
<tr><td class="fr">Il y a un magasin dans la rue.</td><td>На улице есть магазин.</td></tr>
<tr><td class="fr">Il n'y a pas de lit.</td><td>Кровати нет.</td></tr>
<tr><td class="fr">Qu'est-ce qu'il y a ?</td><td>Что случилось? (что там есть?)</td></tr></tbody></table>`,
  prosto: `<p>Два очень частых выражения. {{c'est}} показывает: «это — вот что». {{il y a}} сообщает: «где-то что-то есть».</p>
> C'est mon ami Paul. :: Это мой друг Поль. — «сэ мон ами поль»
> Ce sont mes parents. :: Это мои родители. — «сё сон мэ паран»
> C'est intéressant ! :: Это интересно! — «сэтэнтэрэсан»
> Il y a un lit dans la chambre. :: В комнате есть кровать. — «иль я эн ли дан ла шамбр»
> Il y a beaucoup de magasins dans la rue. :: На улице много магазинов. — «иль я боку дё магазэн дан ла рю»
> Il n'y a pas de pain. :: Хлеба нет. — «иль ни я па дё пэн»
> Qu'est-ce qu'il y a ? :: Что случилось? — «кэскиля»
@@pin:fr28@@
<h3>c'est или il est?</h3>
<p>{{C'est}} — перед «кто / что это» с артиклем: {{C'est un étudiant.}} {{Il est}} — перед «какой» или профессией без артикля: {{Il est étudiant.}} Оба переводятся «он студент», но первое — «это студент» (показываем).</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «это книга», «в комнате есть кровать» — те же фразы.</p>
<p><b>Не как в русском:</b> «есть» у французов — три слова {{il y a}}, буквально «оно там имеет». И «это» меняется на «много»: {{ce sont}}.</p>
<h3>Частые ошибки</h3>
<p>• «Il est un livre» — о предметах надо {{C'est un livre.}} • «Il y a pas de pain» — на письме нужно ne: {{Il n'y a pas de pain.}} • Путают «есть» {{il y a}} и «у меня есть» {{j'ai}}.</p>`,
  lub: `<p>{{il y a}} значит ещё и «назад» о времени: <i>il y a deux ans</i> — «два года назад». Тот же оборот: «есть два года (с тех пор)».</p>
<p>В разговоре французы глотают звуки: <i>il y a</i> звучит как «йа», <i>il n'y a pas</i> — как «япа». Если слышишь «япа» — это «нету».</p>`,
  pins: [{ id: "fr28", t: "c'est и il y a", html: `<table class="tbl"><tbody><tr><td class="fr">C'est un livre. / Ce sont des livres.</td><td>Это книга. / Это книги.</td></tr><tr><td class="fr">Il y a… / Il n'y a pas de…</td><td>Есть… / Нет…</td></tr><tr><td class="fr">C'est un étudiant. / Il est étudiant.</td><td>показываем / какой он</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Это книга.", opts: ["C'est un livre.", "Il est un livre.", "Il y a un livre."], a: "C'est un livre.", why: "показываем — c'est" },
    { k: "input", lang: "fr", q: "Это мои родители.", a: ["Ce sont mes parents."], why: "много — ce sont" },
    { k: "tiles", lang: "fr", q: "В комнате есть кровать.", a: "Il y a un lit dans la chambre", d: ["c'est", "est"], why: "есть, имеется — il y a" },
    { k: "fix", lang: "fr", q: "Il y a pas de pain.", a: ["Il n'y a pas de pain."], why: "на письме — n'y a pas" },
    { k: "choice", q: "Что значит Qu'est-ce qu'il y a ?", opts: ["Что случилось?", "Что это?", "Что ты делаешь?"], a: "Что случилось?", why: "«что там есть?» — что случилось" },
    { k: "listen", say: "Il y a beaucoup de magasins dans la rue.", q: "Что прозвучало?", opts: ["На улице много магазинов.", "Магазин на улице.", "На улице нет магазинов."], a: "На улице много магазинов.", why: "il y a beaucoup de…" },
    { k: "input", lang: "fr", q: "Это интересно!", a: ["C'est intéressant !", "C'est intéressant"], why: "c'est + прилагательное" },
    { k: "choice", q: "Он студент. (какой он)", opts: ["Il est étudiant.", "C'est étudiant.", "Il y a étudiant."], a: "Il est étudiant.", why: "профессия без артикля — il est" },
    { k: "input", lang: "fr", q: "Хлеба нет.", a: ["Il n'y a pas de pain."], why: "il n'y a pas de" },
    { k: "choice", q: "«Это книги»:", opts: ["Ce sont des livres.", "C'est des livre.", "Ils sont des livres."], a: "Ce sont des livres.", why: "много — ce sont" },
  ] };
