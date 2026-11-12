window.EN_C = window.EN_C || {};
EN_C[8] = { n: 8, t: "Сколько: much, many, a lot of", s: "some, any, a few, a little",
  words: [["money", "деньги", "мáни"], ["time", "время", "тайм"], ["water", "вода", "уóтэ"], ["people", "люди", "пипл"], ["a few", "несколько (штук)", "э фью"], ["a little", "немного (чего-то)", "э литл"], ["enough", "достаточно", "инáф"], ["too many / too much", "слишком много", "ту мэ́ни / ту мач"]],
  sut: "Есть то, что считают поштучно ({{friends}}, {{games}}) — с ними {{many}}, {{a few}}. И то, что не считают ({{money}}, {{time}}, {{water}}) — с ними {{much}}, {{a little}}. А {{a lot of}} подходит ко всему.",
  rule: `<table class="tbl"><thead><tr><th></th><th>считаемое: friends, games</th><th>несчитаемое: money, time</th></tr></thead><tbody>
<tr><td>много</td><td class="fr">many friends · a lot of friends</td><td class="fr">much time · a lot of time</td></tr>
<tr><td>немного</td><td class="fr">a few friends</td><td class="fr">a little time</td></tr>
<tr><td>сколько?</td><td class="fr">How many games?</td><td class="fr">How much money?</td></tr>
<tr><td>слишком много</td><td class="fr">too many people</td><td class="fr">too much water</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">some</td><td>немного, какие-то — в обычных фразах</td></tr><tr><td class="fr">any</td><td>в вопросах и с «не»: any questions? I don't have any</td></tr></tbody></table>`,
  prosto: `<p>Совет: в обычной фразе «много» почти всегда говорят {{a lot of}} — не ошибёшься. А {{much}} и {{many}} живут в вопросах и с «не».</p>
> I have a lot of friends. :: У меня много друзей.
> I don't have much time. :: У меня мало времени. — буквально «не много»
> How many people were there? :: Сколько там было людей?
> How much is it? :: Сколько это стоит?
> I need a few minutes. :: Мне нужно несколько минут.
> Can I have a little water? :: Можно немного воды?
> There are too many people here. :: Здесь слишком много людей.
> Do you have any questions? :: У вас есть вопросы?
> We don't have enough money. :: У нас недостаточно денег. — enough стоит перед словом
@@pin:en8@@
<h3>Как в русском, а как нет</h3>
<p>«Деньги» по-русски — много штук. А {{money}} в английском — одно «вещество», как вода: {{much money}}, {{The money is on the table.}} (is, не are). Так же {{information}}, {{advice}}, {{news}}.</p>
<h3>Частые ошибки</h3>
<p>• «many money» → {{much money}} или {{a lot of money}}. • «a lot friends» — нужен of: {{a lot of friends}}. • «I don't have some» → {{I don't have any.}}</p>`,
  lub: `<p>{{few}} без «a» звучит грустно: {{I have few friends.}} — «у меня мало друзей (а хотелось бы больше)». А {{a few}} — нейтрально: «есть несколько».</p>`,
  pins: [{ id: "en8", t: "much / many", html: `<table class="tbl"><tbody><tr><td class="fr">many · a few</td><td>штуки: friends, games</td></tr><tr><td class="fr">much · a little</td><td>не считаем: money, time</td></tr><tr><td class="fr">a lot of</td><td>много — для всего</td></tr><tr><td class="fr">some / any</td><td>обычно / вопрос и «не»</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "How … money do you have?", opts: ["much", "many", "lot"], a: "much", why: "money не считают — much" },
    { k: "input", lang: "en", q: "У меня много друзей.", a: ["I have a lot of friends.", "I have many friends.", "I've got a lot of friends."], why: "a lot of — для всего" },
    { k: "choice", q: "There are too … people here.", opts: ["much", "many", "little"], a: "many", why: "people — считаем" },
    { k: "fix", lang: "en", q: "I don't have some money.", a: ["I don't have any money."], why: "с «не» — any" },
    { k: "input", lang: "en", q: "Мне нужно несколько минут.", a: ["I need a few minutes."], why: "minutes — штуки: a few" },
    { k: "input", lang: "en", q: "Сколько это стоит?", a: ["How much is it?", "How much does it cost?"], why: "How much is it?" },
    { k: "choice", q: "Can I have … water?", opts: ["a few", "a little", "many"], a: "a little", why: "вода не считается — a little" },
    { k: "listen", say: "We don't have enough money.", q: "Что прозвучало?", opts: ["У нас недостаточно денег.", "У нас слишком много денег.", "У нас нет времени."], a: "У нас недостаточно денег.", why: "enough — достаточно" },
    { k: "fix", lang: "en", q: "I have a lot friends.", a: ["I have a lot of friends."], why: "a lot of" },
    { k: "input", lang: "en", q: "У меня мало времени (не много).", a: ["I don't have much time.", "I do not have much time.", "I haven't got much time."], why: "don't have much time" },
  ] };
