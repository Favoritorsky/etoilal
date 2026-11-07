window.FR_C = window.FR_C || {};
FR_C[48] = { n: 48, t: "Который: qui, que, où", s: "связываем две фразы в одну",
  words: [["qui", "который (сам делает)", "ки"], ["que", "который (его / её)", "кё"], ["où", "где, в котором", "у"], ["l'homme qui", "человек, который", "лом ки"],
    ["le pull", "свитер", "лё пюль"], ["le quartier", "район, квартал", "лё картьэ"], ["la chanson que", "песня, которую", "ла шансон кё"], ["le jour où", "день, когда", "лё жур у"]],
  sut: "«Который» во французском — три слова. {{qui}} — если он <b>сам делает</b>: {{l'homme qui chante}} «человек, который поёт». {{que}} — если с ним <b>что-то делают</b>: {{la chanson que j'aime}} «песня, которую я люблю». {{où}} — «где / когда»: {{la ville où j'habite}}.",
  rule: `<table class="tbl"><thead><tr><th>слово</th><th>когда</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">qui</td><td>после — глагол (он сам делает)</td><td class="fr">le garçon qui parle</td></tr>
<tr><td class="fr">que (qu')</td><td>после — кто-то + глагол (его / её делают)</td><td class="fr">le livre que je lis</td></tr>
<tr><td class="fr">où</td><td>место или время</td><td class="fr">la ville où j'habite, le jour où…</td></tr></tbody></table>
<p>Подсказка: после <b>qui</b> сразу глагол, после <b>que</b> — «кто» (je, tu, il…).</p>`,
  prosto: `<p>Вместо двух коротких фраз — «Это человек. Он поёт.» — можно сказать одну: «Это человек, который поёт». Во французском выбор слова зависит от того, <b>что идёт дальше</b>.</p>
> C'est l'homme qui chante. :: Это человек, который поёт. — «сэ лом ки шант»: дальше глагол — qui
> J'ai un ami qui habite à Paris. :: У меня есть друг, который живёт в Париже. — «жэ энами ки абит а пари»
> C'est la chanson que j'aime. :: Это песня, которую я люблю. — «сэ ла шансон кё жэм»: дальше «я» — que
> Le pull que tu as acheté est beau. :: Свитер, который ты купил, красивый. — «лё пюль кё тю а аштэ э бо»
> Le film qu'il regarde est intéressant. :: Фильм, который он смотрит, интересный. — «лё фильм киль рёгард этэнтэрэсан»: que → qu'
> C'est le quartier où j'habite. :: Это район, где я живу. — «сэ лё картьэ у жабит»
> Je me souviens du jour où je t'ai rencontré. :: Я помню день, когда я тебя встретил. — «жё мё сувьен дю жур у жё тэ ранконтрэ»
@@pin:fr48@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «который» связывает две фразы — та же идея.</p>
<p><b>Не как в русском:</b> русское «который» меняется по падежам (который, которого, которую). Французское — по <b>роли</b>: сам делает — {{qui}}, с ним делают — {{que}}. И «где» и «когда» — одно {{où}}: {{le jour où}} «день, когда».</p>
<h3>Частые ошибки</h3>
<p>• «la chanson qui j'aime» — дальше «я» → {{que}}. • «l'homme que chante» — дальше глагол → {{qui}}. • «qui il» сокращают: «qu'il» — это que + il; qui никогда не сокращается: {{qui aime}}.</p>`,
  lub: `<p>Есть ещё {{dont}} «о котором, чей»: <i>le livre dont je parle</i> — «книга, о которой я говорю». Его встретишь в книгах — узнаешь по смыслу.</p>
<p>С que в прошлом с avoir происходит интересное: форма может согласоваться по роду — <i>la chanson que j'ai chantée</i> (с e на конце). На слух разницы нет, это только для письма.</p>`,
  pins: [{ id: "fr48", t: "qui, que, où", html: `<table class="tbl"><tbody><tr><td class="fr">qui + глагол</td><td>сам делает: l'homme qui chante</td></tr><tr><td class="fr">que + je / tu / il…</td><td>его делают: la chanson que j'aime</td></tr><tr><td class="fr">où</td><td>где / когда: la ville où…, le jour où…</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "C'est l'homme … chante.", opts: ["qui", "que", "où"], a: "qui", why: "дальше глагол — qui" },
    { k: "choice", q: "C'est la chanson … j'aime.", opts: ["que", "qui", "où"], a: "que", why: "дальше «я» — que" },
    { k: "input", lang: "fr", q: "Это район, где я живу.", a: ["C'est le quartier où j'habite."], why: "место — où" },
    { k: "tiles", lang: "fr", q: "У меня есть друг, который живёт в Париже.", a: "J'ai un ami qui habite à Paris", d: ["que", "où"], why: "друг сам живёт — qui" },
    { k: "fix", lang: "fr", q: "Le film que est intéressant.", a: ["Le film qui est intéressant."], why: "дальше глагол — qui" },
    { k: "listen", say: "Le pull que tu as acheté est beau.", q: "Что прозвучало?", opts: ["Свитер, который ты купил, красивый.", "Ты купил красивый свитер.", "Свитер, который тебе нравится, красивый."], a: "Свитер, который ты купил, красивый.", why: "que tu as acheté — который ты купил" },
    { k: "choice", q: "le jour … je t'ai rencontré", opts: ["où", "que", "qui"], a: "où", why: "время — où" },
    { k: "input", lang: "fr", q: "Это песня, которую я люблю.", a: ["C'est la chanson que j'aime."], why: "que + j'aime" },
    { k: "choice", q: "Le film … il regarde est intéressant.", opts: ["qu'", "qui", "où"], a: "qu'", why: "дальше il — que → qu'" },
    { k: "choice", q: "Какое слово никогда не сокращается?", opts: ["qui", "que", "je"], a: "qui", why: "qui не сокращается: qui aime" },
  ] };
