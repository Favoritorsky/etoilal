window.FR_C = window.FR_C || {};
FR_C[43] = { n: 43, t: "Выделенные: moi, toi + с, для, у", s: "avec moi, pour toi, chez lui",
  words: [["avec", "с", "авэк"], ["pour", "для", "пур"], ["sans", "без", "сан"], ["moi, toi", "я, ты (выделенные)", "муа, туа"],
    ["lui, elle", "он, она (выделенные)", "люи, эль"], ["eux, elles", "они (выделенные)", "ё, эль"], ["ensemble", "вместе", "ансамбль"], ["seul", "один, одинокий", "сёль"]],
  sut: "После <b>с, для, без, у</b> и для <b>выделения</b> французы берут «сильные» формы: {{moi}}, {{toi}}, {{lui}}, {{elle}}, {{nous}}, {{vous}}, {{eux}}, {{elles}}. {{avec moi}} — «со мной», {{pour toi}} — «для тебя», {{Moi, je suis russe.}} — «А я — русский».",
  rule: `<table class="tbl"><thead><tr><th>обычное</th><th>выделенное</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">je</td><td class="fr">moi</td><td class="fr">avec moi</td></tr><tr><td class="fr">tu</td><td class="fr">toi</td><td class="fr">pour toi</td></tr>
<tr><td class="fr">il · elle</td><td class="fr">lui · elle</td><td class="fr">chez lui, sans elle</td></tr><tr><td class="fr">nous · vous</td><td class="fr">nous · vous</td><td class="fr">avec nous</td></tr>
<tr><td class="fr">ils · elles</td><td class="fr">eux · elles</td><td class="fr">pour eux</td></tr></tbody></table>
<p>Ещё: <span class="fr">C'est moi. Moi aussi. Et toi ?</span></p>`,
  prosto: `<p>Слова {{je}}, {{tu}}, {{il}} «слабые» — они не могут стоять одни или после предлога. Для этого есть «сильные» формы.</p>
> Tu viens avec moi ? :: Пойдёшь со мной? — «тю вьен авэк муа»
> C'est pour toi. :: Это для тебя. — «сэ пур туа»
> Je vais chez lui. :: Я иду к нему (домой). — «жё вэ шэ люи»
> Nous partons sans elle. :: Мы уезжаем без неё. — «ну партон сан эль»
> Je travaille pour eux. :: Я работаю на них (для них). — «жё травай пур ё»
> Moi, je suis russe. Et toi ? :: А я русский. А ты? — «муа, жё сюи рюс. э туа»
> Qui est là ? — C'est moi. :: Кто там? — Это я. — «сэ муа»
> On mange ensemble ? :: Поедим вместе? — «он манж ансамбль»
> Il habite seul. :: Он живёт один. — «иль абит сёль»
@@pin:fr43@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «со мной», «для тебя», «без неё» — у нас тоже особые формы после предлогов.</p>
<p><b>Не как в русском:</b> «Это я» — не «C'est je», а {{C'est moi.}} А для выделения французы повторяют: {{Moi, je…}} — «Я-то…», «А я…».</p>
<h3>Частые ошибки</h3>
<p>• «avec je» — после предлога: {{avec moi}}. • «C'est je» — надо {{C'est moi.}} • «pour ils» — «для них»: {{pour eux}}.</p>`,
  lub: `<p>{{chez}} + выделенное — очень частое: {{chez moi}} «у меня дома», {{chez toi}} «у тебя», {{chez eux}} «у них». Французы так и говорят «пойдём ко мне» — <i>on va chez moi</i>.</p>
<p>{{ensemble}} «вместе» — отсюда русское «ансамбль»: группа, играющая вместе.</p>`,
  pins: [{ id: "fr43", t: "Выделенные: moi, toi…", html: `<table class="tbl"><tbody><tr><td class="fr">moi · toi · lui · elle</td><td>я · ты · он · она</td></tr><tr><td class="fr">nous · vous · eux · elles</td><td>мы · вы · они · они</td></tr><tr><td>после</td><td class="fr">avec, pour, sans, chez · C'est moi · Moi, je…</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Пойдёшь со мной? — Tu viens avec …?", opts: ["moi", "je", "me"], a: "moi", why: "после avec — moi" },
    { k: "input", lang: "fr", q: "Это для тебя.", a: ["C'est pour toi."], why: "pour + toi" },
    { k: "choice", q: "Кто там? — Это я.", opts: ["C'est moi.", "C'est je.", "Je suis."], a: "C'est moi.", why: "c'est + moi" },
    { k: "tiles", lang: "fr", q: "Мы уезжаем без неё.", a: "Nous partons sans elle", d: ["la", "lui"], why: "sans + elle" },
    { k: "fix", lang: "fr", q: "Je travaille pour ils.", a: ["Je travaille pour eux."], why: "«для них» — pour eux" },
    { k: "listen", say: "Je vais chez lui.", q: "Что прозвучало?", opts: ["Я иду к нему.", "Я иду с ним.", "Я иду без него."], a: "Я иду к нему.", why: "chez lui — к нему домой" },
    { k: "input", lang: "fr", q: "А я русский. А ты?", a: ["Moi, je suis russe. Et toi ?"], why: "выделение — moi, je" },
    { k: "choice", q: "Поедим вместе? — On mange …?", opts: ["ensemble", "seul", "avec"], a: "ensemble", why: "ensemble — вместе" },
    { k: "input", lang: "fr", q: "Он живёт один.", a: ["Il habite seul."], why: "seul — один" },
    { k: "choice", q: "у них (дома)", opts: ["chez eux", "chez ils", "chez leur"], a: "chez eux", why: "chez + eux" },
  ] };
