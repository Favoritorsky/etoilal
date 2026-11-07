window.FR_C = window.FR_C || {};
FR_C[32] = { n: 32, t: "Прошлое: j'ai chanté", s: "avoir + форма на -é",
  words: [["hier", "вчера", "йер"], ["acheter", "покупать", "аштэ"], ["oublier", "забывать", "ублиэ"], ["trouver", "находить", "трувэ"],
    ["perdre", "терять", "пэрдр"], ["attendre", "ждать", "атандр"], ["la clé", "ключ", "ла клэ"], ["le cadeau", "подарок", "лё кадо"]],
  sut: "Главное прошлое французов — из двух слов: <b>avoir + особая форма глагола</b>. У глаголов на -er она кончается на <b>-é</b>: {{J'ai chanté.}} — «я спел» (буквально «я имею спетым»). На -ir — <b>-i</b> ({{j'ai fini}}), на -re — <b>-u</b> ({{j'ai attendu}}).",
  rule: `<table class="tbl"><thead><tr><th>глагол</th><th>форма</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">-er: chanter</td><td class="fr">chanté «шантэ»</td><td class="fr">j'ai chanté</td></tr>
<tr><td class="fr">-ir: finir</td><td class="fr">fini «фини»</td><td class="fr">j'ai fini</td></tr>
<tr><td class="fr">-re: attendre</td><td class="fr">attendu «атандю»</td><td class="fr">j'ai attendu</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">j'ai · tu as · il a</td><td rowspan="2">+ chanté</td></tr><tr><td class="fr">nous avons · vous avez · ils ont</td></tr>
<tr><td>«не»</td><td class="fr">Je n'ai pas chanté.</td></tr></tbody></table>`,
  prosto: `<p>Это прошлое французы используют постоянно: «я купил», «ты забыл», «мы нашли». Берёшь {{avoir}} в нужной форме и добавляешь глагол с окончанием <b>-é</b> (для -er).</p>
> J'ai chanté. :: Я спел. — «жэ шантэ»
> Hier, j'ai acheté un cadeau. :: Вчера я купил подарок. — «йер жэ аштэ эн кадо»
> Tu as oublié la clé ? :: Ты забыл ключ? — «тю а ублиэ ла клэ»
> Il a trouvé un chat. :: Он нашёл кота. — «иль а трувэ эн ша»
> Nous avons fini. :: Мы закончили. — «нузавон фини»
> Vous avez perdu ? :: Вы проиграли (потеряли)? — «вузавэ пэрдю»
> Ils ont attendu le bus. :: Они ждали автобус. — «ильзон атандю лё бюс»
> Je n'ai pas mangé. :: Я не поел. — «жё нэ па манжэ»
@@pin:fr32@@
<h3>«Не» — вокруг avoir</h3>
<p>ne … pas обнимает <b>avoir</b>, а не второй глагол: {{Je n'ai pas mangé.}} «Я не ел». Вопрос — как обычно: {{Tu as mangé ?}}</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я <b>купил</b>» — одно действие в прошлом, закончено.</p>
<p><b>Не как в русском:</b> в русском прошлое — одно слово, и меняется по роду: купил, купила. Во французском — два слова, и с avoir форма по роду <b>не меняется</b>: {{il a acheté}}, {{elle a acheté}}.</p>
<h3>Частые ошибки</h3>
<p>• Пропускают avoir: «Je chanté» — надо {{J'ai chanté.}} • Пишут «j'ai chanter» — нужна форма на -é: {{chanté}} (звучат одинаково «шантэ»!). • Ставят pas после второго глагола: «J'ai mangé pas» — надо {{Je n'ai pas mangé.}}</p>`,
  lub: `<p>Французы называют это время <i>passé composé</i> — «составное прошедшее». Есть и «простое прошедшее» одним словом (<i>il chanta</i>), но его встретишь только в книгах и сказках — в разговоре его нет совсем.</p>
<p>{{chanter}} и {{chanté}} звучат одинаково — «шантэ». Французы проверяют себя так: заменяют глаголом на -re (vendre / vendu). Если подходит «vendu» — пиши -é, если «vendre» — пиши -er.</p>`,
  pins: [{ id: "fr32", t: "Прошлое: avoir + -é", html: `<table class="tbl"><tbody><tr><td class="fr">j'ai, tu as, il a, nous avons, vous avez, ils ont</td><td>+ форма</td></tr><tr><td class="fr">-er → -é</td><td class="fr">chanté</td></tr><tr><td class="fr">-ir → -i</td><td class="fr">fini</td></tr><tr><td class="fr">-re → -u</td><td class="fr">attendu, perdu</td></tr><tr><td>«не»</td><td class="fr">Je n'ai pas chanté.</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я спел. — J'… chanté.", opts: ["ai", "suis", "as"], a: "ai", why: "прошлое — avoir: j'ai" },
    { k: "input", lang: "fr", q: "Вчера я купил подарок.", a: ["Hier, j'ai acheté un cadeau.", "Hier j'ai acheté un cadeau.", "J'ai acheté un cadeau hier."], why: "j'ai + acheté" },
    { k: "choice", q: "Ils ont … le bus. (ждали)", opts: ["attendu", "attendé", "attendre"], a: "attendu", why: "-re → -u" },
    { k: "fix", lang: "fr", q: "Je chanté.", a: ["J'ai chanté."], why: "прошлое — с avoir" },
    { k: "tiles", lang: "fr", q: "Ты забыл ключ?", a: "Tu as oublié la clé", d: ["oublier", "es"], why: "tu as + oublié" },
    { k: "input", lang: "fr", q: "Я не поел.", a: ["Je n'ai pas mangé."], why: "ne … pas вокруг avoir" },
    { k: "listen", say: "Il a trouvé un chat.", q: "Что прозвучало?", opts: ["Он нашёл кота.", "Он ищет кота.", "Он найдёт кота."], a: "Он нашёл кота.", why: "il a trouvé — прошлое" },
    { k: "choice", q: "Nous avons … (закончили)", opts: ["fini", "finé", "finu"], a: "fini", why: "-ir → -i" },
    { k: "input", lang: "fr", q: "Она купила подарок.", a: ["Elle a acheté un cadeau."], why: "с avoir форма по роду не меняется: acheté" },
    { k: "choice", q: "Как отличить chanter и chanté на слух?", opts: ["никак — оба «шантэ»", "chanter — «шантэр»", "chanté — «шанте́ть»"], a: "никак — оба «шантэ»", why: "r молчит, звучат одинаково" },
  ] };
