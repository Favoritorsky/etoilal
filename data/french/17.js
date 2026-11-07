window.FR_C = window.FR_C || {};
FR_C[17] = { n: 17, t: "Мой, твой, его: mon, ma, mes", s: "«мой» зависит от рода предмета, а не хозяина",
  words: [["mon, ma, mes", "мой, моя, мои", "мон, ма, мэ"], ["ton, ta, tes", "твой, твоя, твои", "тон, та, тэ"], ["son, sa, ses", "его / её", "сон, са, сэ"],
    ["notre, nos", "наш, наши", "нотр, но"], ["votre, vos", "ваш, ваши", "вотр, во"], ["leur, leurs", "их", "лёр"], ["la famille", "семья", "ла фамий"], ["le père et la mère", "отец и мать", "лё пэр э ла мэр"]],
  sut: "«Мой» меняется по роду и числу <b>предмета</b>: {{mon frère}}, {{ma sœur}}, {{mes amis}}. А «его» и «её» — одно и то же слово: {{son livre}} — и «его книга», и «её книга». Род тут смотрят у книги, а не у хозяина.",
  rule: `<table class="tbl"><thead><tr><th></th><th>«он»</th><th>«она»</th><th>много</th></tr></thead><tbody>
<tr><td>мой</td><td class="fr">mon</td><td class="fr">ma</td><td class="fr">mes</td></tr>
<tr><td>твой</td><td class="fr">ton</td><td class="fr">ta</td><td class="fr">tes</td></tr>
<tr><td>его / её</td><td class="fr">son</td><td class="fr">sa</td><td class="fr">ses</td></tr>
<tr><td>наш</td><td colspan="2" class="fr">notre</td><td class="fr">nos</td></tr>
<tr><td>ваш</td><td colspan="2" class="fr">votre</td><td class="fr">vos</td></tr>
<tr><td>их</td><td colspan="2" class="fr">leur</td><td class="fr">leurs</td></tr></tbody></table>
<p>Перед гласной вместо ma, ta, sa — <span class="fr">mon, ton, son</span>: <span class="fr">mon amie</span> «монами».</p>`,
  prosto: `<p>Слова «мой, твой, его» стоят вместо le / la — и так же меняются по роду и числу предмета.</p>
> mon frère :: мой брат — «мон фрэр»
> ma sœur :: моя сестра — «ма сёр»
> mes amis :: мои друзья — «мэзами»
> ta famille :: твоя семья — «та фамий»
> son livre :: его книга / её книга — «сон ливр»
> sa voiture :: его машина / её машина — «са вуатюр»
> notre maison :: наш дом — «нотр мэзон»
> leurs enfants :: их дети — «лёрзанфан»
> mon amie :: моя подруга — «монами»: перед гласной — mon
@@pin:fr17@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «мой — моя — мои» меняются по предмету: мой брат, моя сестра.</p>
<p><b>Не как в русском:</b> в русском «его» и «её» разные — по хозяину. Во французском одно и то же: {{sa voiture}} — и «его машина», и «её машина». Кто хозяин — понятно из разговора. А «своего» отдельного слова нет: «я люблю свою маму» — {{j'aime ma mère}}.</p>
<h3>Частые ошибки</h3>
<p>• Выбирают son/sa по хозяину: «она любит sa père» — надо {{son père}} (père — «он»). • «ma amie» — перед гласной надо {{mon amie}}. • Путают {{ses}} «сэ» (его, её — много) и {{ces}} «сэ» (эти) — звучат одинаково.</p>`,
  lub: `<p>{{mon amie}} звучит как «мон ами» — и на слух не понять, подруга это или друг. Французы иногда шутят про это недопонимание. На письме разница видна: amie с e — подруга.</p>
<p>У {{notre}} и {{votre}} нет рода: notre père, notre mère — одинаково. А во множественном — nos, vos, с немой s, которая просыпается перед гласной: {{nos amis}} «нозами».</p>`,
  pins: [{ id: "fr17", t: "Мой, твой, его", html: `<table class="tbl"><tbody><tr><td>мой</td><td class="fr">mon · ma · mes</td></tr><tr><td>твой</td><td class="fr">ton · ta · tes</td></tr><tr><td>его / её</td><td class="fr">son · sa · ses</td></tr><tr><td>наш · ваш · их</td><td class="fr">notre/nos · votre/vos · leur/leurs</td></tr></tbody></table><p>Род — по предмету. Перед гласной: mon amie.</p>` }],
  tasks: [
    { k: "choice", q: "… sœur (моя сестра)", opts: ["mon", "ma", "mes"], a: "ma", why: "sœur — «она»: ma" },
    { k: "choice", q: "Она любит своего отца: Elle aime … père.", opts: ["sa", "son", "ses"], a: "son", why: "père — «он»: son (хозяин не важен)" },
    { k: "input", lang: "fr", q: "мои друзья", a: ["mes amis"], why: "много — mes", hint: "«мэзами»" },
    { k: "tiles", lang: "fr", q: "наш дом", a: "notre maison", d: ["nos", "ma"], why: "один предмет — notre" },
    { k: "fix", lang: "fr", q: "ma amie", a: ["mon amie"], why: "перед гласной — mon" },
    { k: "choice", q: "Что значит sa voiture?", opts: ["его или её машина", "только её машина", "их машина"], a: "его или её машина", why: "son / sa — и «его», и «её»" },
    { k: "listen", say: "leurs enfants", q: "Что прозвучало?", opts: ["их дети", "его дети", "наши дети"], a: "их дети", why: "«лёрзанфан» — leurs" },
    { k: "input", lang: "fr", q: "твоя семья", a: ["ta famille"], why: "famille — «она»: ta" },
    { k: "choice", q: "… livres (ваши книги)", opts: ["votre", "vos", "leurs"], a: "vos", why: "много — vos" },
    { k: "input", lang: "fr", q: "его книга", a: ["son livre"], why: "livre — «он»: son" },
  ] };
