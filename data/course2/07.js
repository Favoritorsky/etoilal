window.ET_C2 = window.ET_C2 || {};
ET_C2[7] = { n: 7, sec: 1, t: "Много: z", s: "lez, unz — само слово не меняется",
  words: [["pen", "хлеб"], ["fromaj", "сыр"], ["te", "чай"], ["park", "парк"], ["jarden", "сад"], ["chanbr", "комната"]],
  gram: ["unz"],
  sut: "Много = <b>z у маленького слова</b>: le → lez, un → unz. Само существительное не меняется: lez cha — кошки.",
  rule: `<p><span class="et">le cha</span> → <span class="et">lez cha</span> (те кошки)</p><p><span class="et">un cha</span> → <span class="et">unz cha</span> (какие-то кошки)</p><p>Само слово — без изменений. z связывается с гласной: <span class="et">lez ami</span> «лэзами».</p>`,
  prosto: `<p>В русском «много» видно по концу слова: кошка → кошк<b>и</b>, дом → дом<b>а</b>, ребёнок → <b>дети</b>. Сколько правил и исключений! В Etoilal правило <b>одно на весь язык</b>: маленькое слово перед существительным получает <b>z</b>, а само слово не трогаем.</p>
> le cha → lez cha :: кошка → кошки
> un ami → unz ami :: какой-то друг → какие-то друзья
> l'anfan → lez anfan :: ребёнок → дети
> le jarden → lez jarden :: сад → сады
<h3>И глагол тоже: l — они</h3>
<p>Когда предметов много, «быть» говорим как «они» — [[esel]]:</p>
> Lez cha esel isi. :: Кошки здесь.
> Unz chyen esel laba. :: Там какие-то собаки.
> Lez anfan esel eureu. :: Дети счастливы.
<h3>Связка</h3>
<p>Помнишь урок 3? z прилипает к гласной: [[lez anfan]] — «лэзанфан», [[unz ami]] — «юнзами».</p>
<h3>Частые ошибки</h3>
<p>• Добавлять z к самому слову: «lez chaz» → [[lez cha]]. • Забывать z: «le cha esel» (кошки) → [[lez cha esel]]. • Писать «un» при многих: «un ami esel» → [[unz ami esel]].</p>`,
  lub: `<p>Это та же z, что в [[ilz]] и [[elz]] из урока 4. В Etoilal она — «знак множества» для всех служебных слов. Существительное же неизменяемо, как в китайском или вьетнамском. Поэтому язык и считается простым: из всех форм слова нужно знать одну.</p>`,
  tasks: [
    { k: "input", q: "кошки (те самые)", a: ["lez cha"], why: "le + z, слово не меняется" },
    { k: "input", q: "какие-то друзья", a: ["unz ami"], why: "un + z" },
    { k: "choice", q: "«дети»", opts: ["lez anfanz", "lez anfan", "le anfanz"], a: "lez anfan", why: "z только у маленького слова" },
    { k: "input", q: "Кошки здесь.", a: ["Lez cha esel isi."], why: "много → lez + esel" },
    { k: "fix", q: "Lez chyenz esel laba.", a: ["Lez chyen esel laba."], why: "само слово не меняется" },
    { k: "fix", q: "Lez anfan eset eureu.", a: ["Lez anfan esel eureu."], why: "много → l (они)" },
    { k: "tiles", q: "Там какие-то сады.", a: "Unz jarden esel laba", d: ["un", "eset"], why: "unz + esel" },
    { k: "choice", q: "Как звучит lez ami?", opts: ["«лэзами»", "«лэ ами»"], a: "«лэзами»", lang: "x", why: "z связывается с гласной" },
    { k: "choice", q: "Что значит fromaj?", opts: ["сыр", "хлеб", "чай"], a: "сыр", lang: "x", why: "fromaj — сыр" },
    { k: "input", q: "Комнаты там. (те самые)", a: ["Lez chanbr esel laba."], why: "lez chanbr + esel" },
  ] };
