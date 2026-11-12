window.EN_C = window.EN_C || {};
EN_C[10] = { n: 10, t: "Где и когда: in, on, at", s: "три маленьких слова, которые путают все",
  words: [["weekend", "выходные", "уи́кэнд"], ["morning", "утро", "мóнинг"], ["evening", "вечер", "и́внинг"], ["corner", "угол", "кóнэ"], ["floor", "этаж; пол", "фло"], ["station", "станция, вокзал", "стэ́йшн"], ["birthday", "день рождения", "бёсдэй"], ["midnight", "полночь", "мúднайт"]],
  sut: "Представь три размера. {{at}} — точка: {{at 6 o'clock}}, {{at the station}}. {{on}} — поверхность, день: {{on the table}}, {{on Monday}}. {{in}} — внутри, большой кусок: {{in the room}}, {{in June}}, {{in 2026}}.",
  rule: `<table class="tbl"><thead><tr><th></th><th>когда</th><th>где</th></tr></thead><tbody>
<tr><td class="fr">at — точка</td><td class="fr">at 7 o'clock · at night · at the weekend</td><td class="fr">at the station · at home · at school</td></tr>
<tr><td class="fr">on — день, поверхность</td><td class="fr">on Monday · on my birthday · on 5 May</td><td class="fr">on the table · on the wall · on the second floor</td></tr>
<tr><td class="fr">in — внутри, долго</td><td class="fr">in the morning · in June · in 2026 · in summer</td><td class="fr">in the room · in London · in the car</td></tr></tbody></table>`,
  prosto: `<p>Время: чем короче отрезок, тем «меньше» слово. Час — at, день — on, месяц/год/часть дня — in.</p>
> See you at six. :: Увидимся в шесть.
> I was born in 2009. :: Я родился в 2009 году.
> We have a test on Friday. :: У нас контрольная в пятницу.
> I usually play in the evening. :: Обычно я играю вечером.
> I can't sleep at night. :: Не могу спать по ночам. — но: in the morning, in the evening!
> I'm at home. :: Я дома.
> Your phone is on the table. :: Твой телефон на столе.
> They live in a small town. :: Они живут в маленьком городе.
> Meet me at the corner. :: Встретимся на углу.
@@pin:en10@@
<h3>Без предлога</h3>
<p>Перед {{today}}, {{tomorrow}}, {{yesterday}}, {{next week}}, {{last night}}, {{every day}} — ничего не ставят: {{See you tomorrow!}}, а не «at tomorrow».</p>
<h3>Частые ошибки</h3>
<p>• «in Monday» → {{on Monday}}. • «at the morning» → {{in the morning}}. • «on next week» → {{next week}}. • «in home» → {{at home}}.</p>`,
  lub: `<p>{{in time}} и {{on time}} — разные! {{on time}} — точно вовремя (поезд пришёл on time). {{in time}} — успеть, пока не поздно: <i>We came just in time.</i> — «Мы пришли как раз вовремя».</p>`,
  pins: [{ id: "en10", t: "in / on / at", html: `<table class="tbl"><tbody><tr><td class="fr">at 6 · at night · at home</td><td>точка</td></tr><tr><td class="fr">on Monday · on the table</td><td>день, поверхность</td></tr><tr><td class="fr">in June · in the morning · in the room</td><td>внутри, долгое</td></tr><tr><td class="fr">tomorrow, next week</td><td>без предлога</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "See you … six o'clock.", opts: ["at", "on", "in"], a: "at", why: "время на часах — at" },
    { k: "choice", q: "We have a test … Friday.", opts: ["at", "on", "in"], a: "on", why: "день — on" },
    { k: "input", lang: "en", q: "Я родился в 2009 году.", a: ["I was born in 2009."], why: "год — in" },
    { k: "fix", lang: "en", q: "I usually play at the evening.", a: ["I usually play in the evening."], why: "in the evening" },
    { k: "input", lang: "en", q: "Твой телефон на столе.", a: ["Your phone is on the table."], why: "поверхность — on" },
    { k: "choice", q: "I'm … home.", opts: ["at", "in", "on"], a: "at", why: "at home" },
    { k: "fix", lang: "en", q: "See you at tomorrow!", a: ["See you tomorrow!", "See you tomorrow."], why: "перед tomorrow — ничего" },
    { k: "listen", say: "I can't sleep at night.", q: "Что прозвучало?", opts: ["Не могу спать по ночам.", "Не могу спать утром.", "Не хочу спать днём."], a: "Не могу спать по ночам.", why: "at night — ночью" },
    { k: "input", lang: "en", q: "Они живут в маленьком городе.", a: ["They live in a small town.", "They live in a small city."], why: "внутри — in" },
    { k: "choice", q: "Поезд пришёл точно вовремя: The train came …", opts: ["on time", "in time", "at time"], a: "on time", why: "точно по расписанию — on time" },
  ] };
