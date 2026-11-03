window.ET_C2 = window.ET_C2 || {};
ET_C2[12] = { n: 12, sec: 1, t: "Числа 1–10 и «иметь»", s: "у меня есть = я имею",
  words: [["aver", "иметь"], ["an", "год"], ["moiz", "месяц"], ["semene", "неделя"], ["konbyen", "сколько"]],
  gram: ["de", "zero", "un", "deu", "troi", "katr", "senk", "sis", "set", "uit", "neuf", "dis"],
  sut: "1–10: <b>un, deu, troi, katr, senk, sis, set, uit, neuf, dis</b>. «У меня есть» = «я имею» — <b>aver</b>: j'avem un frer. После числа слово не меняется: troi cha.",
  rule: `<table class="tbl"><tbody><tr><td>1 <span class="et">un</span></td><td>2 <span class="et">deu</span></td><td>3 <span class="et">troi</span></td><td>4 <span class="et">katr</span></td><td>5 <span class="et">senk</span></td></tr><tr><td>6 <span class="et">sis</span></td><td>7 <span class="et">set</span></td><td>8 <span class="et">uit</span></td><td>9 <span class="et">neuf</span></td><td>10 <span class="et">dis</span></td></tr></tbody></table><p><span class="et">j'avem</span> — у меня есть (я имею)</p>`,
  prosto: `<h3>Числа</h3>
@@pin:num@@
<p>После числа артикль не нужен, и слово <b>не меняется</b> — в отличие от русского «одна кошка, две кошки, пять кошек»:</p>
> troi cha :: три кошки
> senk ami :: пять друзей
> dis an :: десять лет
<p>0 — [[zero]]: [[zero kle]] — «ноль ключей».</p>
<h3>«У меня есть» = «я имею»</h3>
<p>В русском «у меня есть брат». В Etoilal, как во французском, «я имею брата»: глагол [[aver]] (основа av).</p>
> J'avem un frer. :: У меня есть брат.
> Tu aves deu seur. :: У тебя две сестры.
> Nou aven un cha. :: У нас есть кошка.
<h3>Возраст тоже «имеют»</h3>
> J'avem dis an. :: Мне десять лет.
> Konbyen d'an tu aves? :: Сколько тебе лет? (дословно «сколько лет ты имеешь?»)
<p>[[konbyen]] — «сколько». После него — [[de]] («из»), а перед гласной [[de]] сливается: [[d'an]].</p>
<h3>Частые ошибки</h3>
<p>• Ставить z после числа: «troi chaz» → [[troi cha]]. • Говорить «у меня» дословно — надо [[j'avem]]. • Забывать слияние: «je avem» → [[j'avem]].</p>`,
  lub: `<p>Дальше 10 числа строятся как таблица умножения: 20 — «два-десять» (deudis), 70 — «семь-десять» (setdis). Никаких французских «четыре-двадцать» для 80! Это будет в уроке 37.</p>`,
  pins: [{ id: "num", t: "Числа 0–10", html: `<table class="tbl"><tbody><tr><td>0</td><td class="et">zero</td><td>6</td><td class="et">sis</td></tr><tr><td>1</td><td class="et">un</td><td>7</td><td class="et">set</td></tr><tr><td>2</td><td class="et">deu</td><td>8</td><td class="et">uit</td></tr><tr><td>3</td><td class="et">troi</td><td>9</td><td class="et">neuf</td></tr><tr><td>4</td><td class="et">katr</td><td>10</td><td class="et">dis</td></tr><tr><td>5</td><td class="et">senk</td><td></td><td></td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "3", a: ["troi"], why: "3 — troi" },
    { k: "input", q: "7", a: ["set"], why: "7 — set" },
    { k: "choice", q: "Что значит uit?", opts: ["8", "9", "1"], a: "8", lang: "x", why: "uit — 8, neuf — 9" },
    {"k": "input", "q": "три друга", "a": ["troi ami"], "why": "после числа слово не меняется"},
    {"k": "input", "q": "У меня есть сестра.", "a": ["J'avem un seur."], "why": "«у меня есть» = j'avem"},
    { k: "fix", q: "Je avem deu seur.", a: ["J'avem deu seur."], why: "je + avem → j'avem" },
    {"k": "input", "q": "Мне семь лет.", "a": ["J'avem set an."], "why": "возраст «имеют»"},
    {"k": "input", "q": "Сколько у тебя братьев?", "a": ["Konbyen de frer tu aves?"], "why": "konbyen + de + слово; de перед согласной не сливается"},
    { k: "tiles", q: "У нас есть три кошки.", a: "Nou aven troi cha", d: ["chaz", "avem"], why: "aven — мы имеем" },
    { k: "choice", q: "Что значит semene?", opts: ["неделя", "месяц", "год"], a: "неделя", lang: "x", why: "semene — неделя, moiz — месяц, an — год" },
  ] };
