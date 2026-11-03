window.ET_C2 = window.ET_C2 || {};
ET_C2[20] = { n: 20, sec: 3, t: "Кого: mo, to, lo, la…", s: "меня, тебя, его — и всегда перед глаголом",
  words: [["atander", "ждать"], ["prener", "брать"], ["oublier", "забывать"], ["konprener", "понимать"], ["kroiyer", "верить"]],
  gram: ["mo", "to", "lo", "la", "no", "vo", "loz", "laz"],
  sut: "Меня — <b>mo</b>, тебя — <b>to</b>, его — <b>lo</b>, её — <b>la</b>, нас — <b>no</b>, вас — <b>vo</b>, их — <b>loz / laz</b>. Ставятся <b>перед</b> глаголом: Je to emem — я тебя люблю.",
  rule: `<table class="tbl"><tbody><tr><td>меня</td><td class="et">mo</td><td>нас</td><td class="et">no</td></tr><tr><td>тебя</td><td class="et">to</td><td>вас</td><td class="et">vo</td></tr><tr><td>его</td><td class="et">lo</td><td>их</td><td class="et">loz</td></tr><tr><td>её</td><td class="et">la</td><td>их (ж.)</td><td class="et">laz</td></tr></tbody></table><p>Перед глаголом: <span class="et">Je to emem.</span></p>`,
  prosto: `<p>«Я люблю <b>тебя</b>», «он ждёт <b>меня</b>» — это слова «кого?». В Etoilal у них свои формы:</p>
@@pin:kogo@@
<h3>Перед глаголом!</h3>
<p>Главное: эти слова стоят <b>перед</b> глаголом, а не после, как часто в русском:</p>
> Je to emem. :: Я тебя люблю.
> Il mo atandet. :: Он меня ждёт.
> Tu lo konprenes? :: Ты его понимаешь?
> Nou la kroiyen. :: Мы ей верим. (дословно «верим её»)
> Ilz no oubliel jame. :: Они нас никогда не забывают.
<h3>Как запомнить</h3>
<p>Все «кого» кончаются на <b>-o</b> или <b>-a</b>: m<b>o</b>, t<b>o</b>, l<b>o</b>, l<b>a</b>, n<b>o</b>, v<b>o</b>. Много — снова <b>z</b>: lo → [[loz]], la → [[laz]].</p>
<h3>О вещах — тоже lo</h3>
<p>У вещей рода нет, поэтому про книгу, ключ, хлеб — всё [[lo]]:</p>
> Ou eset le kle? Je lo cherchem. :: Где ключ? Я его ищу.
> Le livr? Je lo prenim. :: Книга? Я её взял.
<h3>С отрицанием</h3>
<p>«кого» — перед глаголом, [[pa]] — после: [[Je lo voiyem pa.]] — «Я его не вижу».</p>
<h3>Частые ошибки</h3>
<p>• Ставить после глагола: «Je emem to» → [[Je to emem.]] • Путать с «я»: [[je]] — я (кто), [[mo]] — меня (кого).</p>`,
  lub: `<p>Во французском так же: <i>je t'aime</i>, <i>il me voit</i> — местоимения перед глаголом. Но там они сливаются (<i>t', m', l'</i>), а в Etoilal — нет: они кончаются на -o/-a, и слияния не бывает. Лингвисты называют такие короткие безударные слова <b>клитиками</b>.</p>`,
  pins: [{ id: "kogo", t: "Кого: mo, to, lo…", html: `<table class="tbl"><tbody><tr><td>меня</td><td class="et">mo</td><td>нас</td><td class="et">no</td></tr><tr><td>тебя</td><td class="et">to</td><td>вас</td><td class="et">vo</td></tr><tr><td>его (и вещь)</td><td class="et">lo</td><td>их</td><td class="et">loz</td></tr><tr><td>её</td><td class="et">la</td><td>их (только женщин)</td><td class="et">laz</td></tr></tbody></table><p>Всегда <b>перед</b> глаголом: <span class="et">Je to emem.</span></p>` }],
  tasks: [
    {"k": "input", "q": "Я тебя жду.", "a": ["Je to atandem."], "why": "to — перед глаголом"},
    {"k": "input", "q": "Она меня ждёт.", "a": ["El mo atandet."], "why": "mo — меня"},
    {"k": "fix", "q": "Je atandem to.", "a": ["Je to atandem."], "why": "«кого» — перед глаголом"},
    { k: "choice", q: "«Ты его понимаешь?»", opts: ["Tu lo konprenes?", "Tu konprenes lo?", "Lo tu konprenes?"], a: "Tu lo konprenes?", why: "кто → кого → глагол" },
    {"k": "input", "q": "Где книга? Я её ищу.", "a": ["Ou eset le livr? Je lo cherchem."], "why": "о вещах — lo"},
    {"k": "input", "q": "Я её не понимаю.", "a": ["Je la konprenem pa."], "why": "la перед глаголом, pa после"},
    {"k": "tiles", "q": "Мы их никогда не забываем.", "a": "Nou loz oublien jame", "d": ["lo", "pa"], "why": "loz — их; jame после глагола"},
    { k: "choice", q: "«нас» (кого?)", opts: ["nou", "no", "ney"], a: "no", why: "nou — мы, no — нас" },
    {"k": "input", "q": "Мы ему верим.", "a": ["Nou lo kroiyen."], "why": "lo — его"},
    {"k": "input", "q": "Ключ? Я его взял.", "a": ["Le kle? Je lo prenim."], "why": "вещь — lo; i — было"},
  ] };
