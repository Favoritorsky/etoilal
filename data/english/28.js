window.EN_C = window.EN_C || {};
EN_C[28] = { n: 28, t: "Он сказал, что…", s: "He said he was tired — косвенная речь",
  words: [["said", "сказал (say)", "сэд"], ["told", "сказал кому-то (tell)", "тоулд"], ["asked", "спросил (ask)", "аскт"], ["explained", "объяснил", "иксплэ́йнд"], ["whether", "ли", "уэ́зэ"], ["the truth", "правда", "зэ трус"], ["lie", "врать; ложь", "лай"], ["joke", "шутить; шутка", "джоук"]],
  sut: "Пересказываешь чужие слова — время <b>сдвигается назад</b>: Tom: «I'm tired.» → {{Tom said he was tired.}} В русском так не делают («Том сказал, что устал»), а в английском — обычно да.",
  rule: `<table class="tbl"><thead><tr><th>сказал</th><th>пересказ</th></tr></thead><tbody>
<tr><td class="fr">"I'm tired."</td><td class="fr">He said he was tired.</td></tr>
<tr><td class="fr">"I like it."</td><td class="fr">She said she liked it.</td></tr>
<tr><td class="fr">"I'll come."</td><td class="fr">He said he would come.</td></tr>
<tr><td class="fr">"I can help."</td><td class="fr">She said she could help.</td></tr>
<tr><td class="fr">"I saw it." / "I've seen it."</td><td class="fr">He said he had seen it.</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">say (что)</td><td class="fr">He said that…</td></tr><tr><td class="fr">tell (кому)</td><td class="fr">He told me that…</td></tr><tr><td class="fr">ask (вопрос)</td><td class="fr">She asked if / whether I was OK. · She asked where I lived.</td></tr></tbody></table>`,
  prosto: `<p>Две главные вещи: сдвинуть время и поменять «я» на «он/она». А {{that}} можно не говорить: {{He said (that) he was tired.}}</p>
> He said he was tired. :: Он сказал, что устал.
> She told me she liked the game. :: Она сказала мне, что ей понравилась игра.
> They said they would come. :: Они сказали, что придут.
> I told you I couldn't go! :: Я же тебе говорил, что не могу пойти!
> She asked me if I was OK. :: Она спросила, всё ли у меня в порядке.
> He asked where I lived. :: Он спросил, где я живу. — в пересказе вопроса — обычный порядок слов!
> I knew he was lying. :: Я знал, что он врёт.
> He told me to wait. :: Он сказал мне подождать. — просьба: told + to
@@pin:en28@@
<h3>Вопрос в пересказе</h3>
<p>Прямой вопрос: {{Where do you live?}} В пересказе — как обычная фраза, без do: {{He asked where I lived.}} Да/нет-вопрос — через {{if}}: {{She asked if I was hungry.}}</p>
<h3>Частые ошибки</h3>
<p>• «He said me» → {{He told me}} или {{He said to me}}. • «He asked where did I live» → {{He asked where I lived.}} • «She told to wait» — кому? {{She told me to wait.}}</p>`,
  lub: `<p>Если сказанное правда до сих пор, время можно не сдвигать: {{He said he lives in London.}} — значит, он и сейчас там живёт. В разговоре это нормально.</p>`,
  pins: [{ id: "en28", t: "Он сказал, что…", html: `<table class="tbl"><tbody><tr><td class="fr">am → was · like → liked · will → would · can → could</td><td>время — на шаг назад</td></tr><tr><td class="fr">said that · told me that</td><td>сказал · сказал мне</td></tr><tr><td class="fr">asked if… · asked where I lived</td><td>спросил ли · где (без do)</td></tr><tr><td class="fr">told me to wait</td><td>просьба</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Tom: «I'm tired.» → Tom said he … tired.", opts: ["was", "is", "be"], a: "was", why: "am → was" },
    { k: "input", lang: "en", q: "Они сказали, что придут.", a: ["They said they would come.", "They said that they would come.", "They said they'd come."], why: "will → would" },
    { k: "fix", lang: "en", q: "He said me he was busy.", a: ["He told me he was busy.", "He told me that he was busy.", "He said to me he was busy."], why: "кому — told me" },
    { k: "fix", lang: "en", q: "He asked where did I live.", a: ["He asked where I lived."], why: "в пересказе — без did" },
    { k: "input", lang: "en", q: "Она спросила, всё ли у меня в порядке.", a: ["She asked me if I was OK.", "She asked if I was OK.", "She asked me if I was okay.", "She asked if I was okay.", "She asked me whether I was OK."], why: "asked if" },
    { k: "choice", q: "«I can help.» → She said she … help.", opts: ["could", "can", "will"], a: "could", why: "can → could" },
    { k: "listen", say: "He told me to wait.", q: "Что прозвучало?", opts: ["Он сказал мне подождать.", "Он сказал, что подождёт.", "Он попросил меня уйти."], a: "Он сказал мне подождать.", why: "told me to — просьба" },
    { k: "input", lang: "en", q: "Я знал, что он врёт.", a: ["I knew he was lying.", "I knew that he was lying."], why: "сдвиг: is lying → was lying" },
    { k: "choice", q: "«I've seen it.» → He said he … it.", opts: ["had seen", "has seen", "saw"], a: "had seen", why: "have seen → had seen" },
  ] };
