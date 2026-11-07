window.FR_C = window.FR_C || {};
FR_C[42] = { n: 42, t: "Туда и этого: y и en", s: "j'y vais, j'en veux",
  words: [["y", "туда, там; об этом", "и"], ["en", "этого, из этого; оттуда", "ан"], ["penser à", "думать о", "пансэ а"], ["avoir besoin de", "нуждаться в", "авуар бёзуэн дё"],
    ["assez", "достаточно, довольно", "асэ"], ["la bouteille", "бутылка", "ла бутэй"], ["le gâteau", "торт, пирожное", "лё гато"], ["la boîte", "коробка", "ла буат"]],
  sut: "Два коротких слова экономят целые фразы. {{y}} заменяет «туда / там» (à + место): {{J'y vais.}} — «я туда иду». {{en}} заменяет «этого / из этого» (de + что-то): {{J'en veux.}} — «я хочу этого (немного)». Оба стоят перед глаголом.",
  rule: `<table class="tbl"><thead><tr><th>было</th><th>стало</th><th>значит</th></tr></thead><tbody>
<tr><td class="fr">Je vais à Paris.</td><td class="fr">J'y vais.</td><td>Я туда еду.</td></tr>
<tr><td class="fr">Je pense à mon travail.</td><td class="fr">J'y pense.</td><td>Я об этом думаю.</td></tr>
<tr><td class="fr">Je veux du gâteau.</td><td class="fr">J'en veux.</td><td>Я его хочу (немного).</td></tr>
<tr><td class="fr">J'ai deux frères.</td><td class="fr">J'en ai deux.</td><td>У меня их двое.</td></tr>
<tr><td class="fr">Je viens de Paris.</td><td class="fr">J'en viens.</td><td>Я оттуда.</td></tr></tbody></table>`,
  prosto: `<p>Чтобы не повторять «в Париж», «о работе», «торта», французы заменяют их одним словом. {{y}} — вместо «à + что-то» (обычно место), {{en}} — вместо «de / du / des + что-то» (обычно количество).</p>
> Tu vas à la plage ? — Oui, j'y vais. :: Ты идёшь на пляж? — Да, иду (туда). — «уи, жи вэ»
> Il y a du pain ? — Oui, il y en a. :: Хлеб есть? — Да, есть. — «иль ян я»
> Tu veux du gâteau ? — Oui, j'en veux. :: Хочешь торта? — Да, хочу. — «жан вё»
> Combien de bouteilles ? — J'en ai trois. :: Сколько бутылок? — У меня их три. — «жанэ труа»
> J'y pense souvent. :: Я часто об этом думаю. — «жи панс сувэн»
> Tu en as besoin ? :: Тебе это нужно? — «тю ан а бёзуэн»
> Je n'en veux pas. :: Я этого не хочу. — «жё нан вё па»
> J'en ai assez ! :: С меня хватит! — «жанэ асэ»: буквально «у меня этого достаточно»
@@pin:fr42@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «туда», «там», «оттуда» — похожие слова-заменители.</p>
<p><b>Не как в русском:</b> {{en}} заменяет «этого, их» при количестве: «у меня их три» — {{j'en ai trois}}. Без en французы так не скажут: «J'ai trois» — неполная фраза.</p>
<h3>Частые ошибки</h3>
<p>• Ставят после глагола: «Je vais y» — надо {{J'y vais.}} • «J'ai trois» про бутылки — надо {{J'en ai trois.}} • Путают {{en}} «этого» и {{en}} «в» ({{en ville}}) — пишутся одинаково, работают по-разному.</p>`,
  lub: `<p>{{J'en ai assez !}} и {{Ça y est !}} «Готово! Всё!» — два очень частых разговорных выражения с этими словами. А {{Allez-y !}} — «Давайте! Вперёд!» (буквально «идите туда»).</p>
<p>y пришло из латинского <i>ibi</i> «там», en — из <i>inde</i> «оттуда». Тот же корень, что в русском книжном «инде» («кое-где»).</p>`,
  pins: [{ id: "fr42", t: "y и en", html: `<table class="tbl"><tbody><tr><td class="fr">y</td><td>вместо à + место / что-то: <span class="fr">J'y vais. J'y pense.</span></td></tr><tr><td class="fr">en</td><td>вместо de + что-то, количество: <span class="fr">J'en veux. J'en ai trois.</span></td></tr><tr><td>место</td><td>перед глаголом: <span class="fr">Je n'en veux pas.</span></td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Ты идёшь на пляж? — Да, … vais.", opts: ["j'y", "j'en", "je le"], a: "j'y", why: "à + место → y" },
    { k: "choice", q: "Хочешь торта? — Да, … veux.", opts: ["j'en", "j'y", "je le"], a: "j'en", why: "du gâteau → en" },
    { k: "input", lang: "fr", q: "Сколько бутылок? — У меня их три.", a: ["J'en ai trois."], why: "количество — en" },
    { k: "fix", lang: "fr", q: "Je vais y.", a: ["J'y vais."], why: "y — перед глаголом" },
    { k: "tiles", lang: "fr", q: "Я часто об этом думаю.", a: "J'y pense souvent", d: ["en", "le"], why: "penser à → y" },
    { k: "listen", say: "J'en ai assez !", q: "Что прозвучало?", opts: ["С меня хватит!", "У меня есть немного.", "Я туда иду!"], a: "С меня хватит!", why: "j'en ai assez — «у меня этого достаточно»" },
    { k: "input", lang: "fr", q: "Я этого не хочу.", a: ["Je n'en veux pas."], why: "ne + en + глагол + pas" },
    { k: "choice", q: "Хлеб есть? — Да, есть.", opts: ["Oui, il y en a.", "Oui, il y a.", "Oui, il en y a."], a: "Oui, il y en a.", why: "il y a + en → il y en a" },
    { k: "input", lang: "fr", q: "Тебе это нужно?", a: ["Tu en as besoin ?"], why: "avoir besoin de → en" },
    { k: "choice", q: "Je pense à mon travail → J'… pense.", opts: ["y", "en", "le"], a: "y", why: "penser à → y" },
  ] };
