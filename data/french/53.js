window.FR_C = window.FR_C || {};
FR_C[53] = { n: 53, t: "Союзы: но, поэтому, потому что", s: "mais, donc, parce que, pourtant, alors, quand",
  words: [["mais", "но", "мэ"], ["donc", "поэтому, значит", "донк"], ["pourtant", "однако, и всё же", "пуртан"], ["alors", "тогда; ну так", "алор"],
    ["comme", "так как; как", "ком"], ["d'abord", "сначала", "дабор"], ["ensuite", "затем, потом", "ансюит"], ["enfin", "наконец", "анфэн"]],
  sut: "Союзы склеивают фразы в рассказ: {{mais}} «но», {{donc}} «поэтому», {{parce que}} «потому что», {{comme}} «так как», {{pourtant}} «и всё же», {{quand}} «когда». А {{d'abord}} — {{ensuite}} — {{enfin}} выстраивают порядок: «сначала — потом — наконец».",
  rule: `<table class="tbl"><tbody>
<tr><td class="fr">mais</td><td>но</td><td class="fr">C'est cher, mais c'est beau.</td></tr>
<tr><td class="fr">donc · alors</td><td>поэтому · так что</td><td class="fr">Il pleut, donc je reste.</td></tr>
<tr><td class="fr">parce que · comme</td><td>потому что · так как</td><td class="fr">Comme il pleut, je reste.</td></tr>
<tr><td class="fr">pourtant</td><td>и всё же, однако</td><td class="fr">Il est riche, pourtant il est triste.</td></tr>
<tr><td class="fr">quand</td><td>когда</td><td class="fr">Quand je suis fatigué, je dors.</td></tr>
<tr><td class="fr">d'abord · ensuite · enfin</td><td>сначала · потом · наконец</td><td></td></tr></tbody></table>`,
  prosto: `<p>Без союзов речь — набор коротких фраз. С ними — рассказ. Эти восемь слов встречаются в каждом французском тексте.</p>
> C'est cher, mais c'est beau. :: Это дорого, но красиво. — «сэ шэр, мэ сэ бо»
> Il pleut, donc je reste chez moi. :: Идёт дождь, поэтому я дома. — «иль плё, донк жё рэст шэ муа»
> Comme il fait froid, je prends un pull. :: Так как холодно, я беру свитер. — «ком иль фэ фруа, жё пран эн пюль»
> Il est riche, pourtant il n'est pas heureux. :: Он богат, и всё же он несчастлив. — «илэ риш, пуртан иль нэ па ёрё»
> Alors, on y va ? :: Ну что, идём? — «алор, он и ва»
> D'abord, je me lève. Ensuite, je prends le petit-déjeuner. Enfin, je pars. :: Сначала я встаю. Потом завтракаю. Наконец ухожу. — «дабор… ансюит… анфэн…»
> Quand j'ai le temps, je lis. :: Когда у меня есть время, я читаю. — «кан жэ лё тан, жё ли»
@@pin:fr53@@
<h3>parce que или comme?</h3>
<p>Оба — «потому что / так как». {{parce que}} — в середине фразы, объясняет после: {{Je reste parce qu'il pleut.}} {{comme}} — в начале, причина сначала: {{Comme il pleut, je reste.}}</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> те же связки: но, поэтому, так как, когда, сначала, потом.</p>
<p><b>Не как в русском:</b> {{alors}} в разговоре — как русское «ну» или «итак»: {{Alors, on y va ?}} А после {{quand}} о будущем французы ставят будущее: <i>Quand je serai grand…</i> — «Когда я вырасту…».</p>
<h3>Частые ошибки</h3>
<p>• «Comme» в конце: «Je reste comme il pleut» — в середине надо {{parce que}}. • «parce que il» — перед гласной {{parce qu'il}}. • Путают {{donc}} (поэтому, вывод) и {{mais}} (но, противопоставление).</p>`,
  lub: `<p>Знаменитая фраза Декарта: <i>Je pense, donc je suis</i> — «Я мыслю, следовательно, я существую». Тут {{donc}} — «значит, следовательно».</p>
<p>{{enfin}} бывает и раздражённым «ну наконец-то!» или «ну в общем…» — всё зависит от интонации.</p>`,
  pins: [{ id: "fr53", t: "Союзы", html: `<table class="tbl"><tbody><tr><td class="fr">mais · pourtant</td><td>но · и всё же</td></tr><tr><td class="fr">donc · alors</td><td>поэтому · так что, ну</td></tr><tr><td class="fr">parce que · comme</td><td>потому что (в середине) · так как (в начале)</td></tr><tr><td class="fr">quand</td><td>когда</td></tr><tr><td class="fr">d'abord · ensuite · enfin</td><td>сначала · потом · наконец</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Это дорого, но красиво. — C'est cher, … c'est beau.", opts: ["mais", "donc", "comme"], a: "mais", why: "но — mais" },
    { k: "choice", q: "Идёт дождь, поэтому я дома. — Il pleut, … je reste chez moi.", opts: ["donc", "mais", "pourtant"], a: "donc", why: "поэтому — donc" },
    { k: "input", lang: "fr", q: "Так как холодно, я беру свитер.", a: ["Comme il fait froid, je prends un pull."], why: "причина в начале — comme" },
    { k: "tiles", lang: "fr", q: "Он богат, и всё же он несчастлив.", a: "Il est riche pourtant il n'est pas heureux", d: ["donc", "comme"], why: "и всё же — pourtant" },
    { k: "fix", lang: "fr", q: "Je reste comme il pleut.", a: ["Je reste parce qu'il pleut."], why: "в середине — parce que" },
    { k: "listen", say: "Alors, on y va ?", q: "Что прозвучало?", opts: ["Ну что, идём?", "Тогда мы идём туда.", "Мы уже пришли?"], a: "Ну что, идём?", why: "alors — «ну», on y va — идём (туда)" },
    { k: "choice", q: "сначала — потом — наконец", opts: ["d'abord — ensuite — enfin", "enfin — ensuite — d'abord", "alors — donc — mais"], a: "d'abord — ensuite — enfin", why: "порядок действий" },
    { k: "input", lang: "fr", q: "Когда у меня есть время, я читаю.", a: ["Quand j'ai le temps, je lis."], why: "quand — когда" },
    { k: "choice", q: "Je reste … il pleut.", opts: ["parce qu'", "parce que", "comme"], a: "parce qu'", why: "перед il — parce qu'" },
    { k: "choice", q: "Je pense, … je suis. (Декарт)", opts: ["donc", "mais", "alors"], a: "donc", why: "следовательно — donc" },
  ] };
