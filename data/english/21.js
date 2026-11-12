window.EN_C = window.EN_C || {};
EN_C[21] = { n: 21, t: "Фразовые глаголы", s: "get up, find out, give up, turn on",
  words: [["get up", "вставать (с кровати)", "гет ап"], ["find out", "узнать, выяснить", "файнд áут"], ["give up", "сдаться, бросить", "гив ап"], ["turn on / off", "включить / выключить", "тёрн он / оф"], ["look for", "искать", "лук фо"], ["figure out", "разобраться, понять", "фúгэ áут"], ["come back", "вернуться", "кам бэк"], ["run out of", "закончиться (у кого-то)", "ран áут ов"]],
  sut: "Глагол + маленькое слово (up, out, on, off, back) = <b>новый смысл</b>. {{give}} — давать, а {{give up}} — сдаться. Их не переводят по частям — учат целиком, как отдельные слова.",
  rule: `<table class="tbl"><thead><tr><th>глагол</th><th>значит</th><th>пример</th></tr></thead><tbody>
<tr><td class="fr">get up</td><td>вставать</td><td class="fr">I get up at 7.</td></tr>
<tr><td class="fr">find out</td><td>узнать</td><td class="fr">I found out the truth.</td></tr>
<tr><td class="fr">give up</td><td>сдаться, бросить</td><td class="fr">Don't give up!</td></tr>
<tr><td class="fr">turn on / off</td><td>включить / выключить</td><td class="fr">Turn off the light.</td></tr>
<tr><td class="fr">figure out</td><td>разобраться</td><td class="fr">I can't figure it out.</td></tr>
<tr><td class="fr">come back</td><td>вернуться</td><td class="fr">Come back soon!</td></tr>
<tr><td class="fr">run out of</td><td>закончиться</td><td class="fr">We've run out of milk.</td></tr></tbody></table>`,
  prosto: `<p>В разговорах, играх и фильмах фразовых глаголов очень много — именно из-за них живая речь кажется непонятной: все слова знакомые, а смысла нет.</p>
> I usually get up at seven. :: Обычно я встаю в семь.
> Don't give up! :: Не сдавайся!
> I found out that he was lying. :: Я узнал, что он врал.
> Can you turn on the light? :: Можешь включить свет?
> Turn it off, please. :: Выключи его, пожалуйста. — it стоит в середине: turn it off
> I can't figure out this level. :: Не могу разобраться с этим уровнем.
> He came back home at midnight. :: Он вернулся домой в полночь.
> We've run out of time. :: У нас закончилось время.
@@pin:en21@@
<h3>Где стоит «это»</h3>
<p>Если вместо предмета — {{it}} или {{them}}, они встают <b>в середину</b>: {{Turn it on.}}, {{Figure it out.}} Нельзя «turn on it».</p>
<h3>Частые ошибки</h3>
<p>• «I gave up to smoke» → {{I gave up smoking.}} • «Turn on it» → {{Turn it on.}} • «get up» ≠ «wake up»: {{wake up}} — проснуться, {{get up}} — встать с кровати.</p>`,
  lub: `<p>У одного фразового глагола бывает много смыслов. {{pick up}}: поднять (с пола), забрать (кого-то на машине), взять трубку, быстро научиться (I picked up some French). Смотри по ситуации.</p>`,
  pins: [{ id: "en21", t: "Фразовые глаголы", html: `<table class="tbl"><tbody><tr><td class="fr">get up · wake up</td><td>встать · проснуться</td></tr><tr><td class="fr">find out · figure out</td><td>узнать · разобраться</td></tr><tr><td class="fr">give up · come back</td><td>сдаться · вернуться</td></tr><tr><td class="fr">turn on/off · run out of</td><td>вкл/выкл · закончиться</td></tr><tr><td class="fr">turn it on</td><td>it — в середину</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Не сдавайся!", a: ["Don't give up!", "Don't give up."], why: "give up — сдаться" },
    { k: "choice", q: "Can you turn … the light? (включить)", opts: ["on", "off", "up"], a: "on", why: "turn on — включить" },
    { k: "fix", lang: "en", q: "Turn off it, please.", a: ["Turn it off, please."], why: "it — в середину" },
    { k: "input", lang: "en", q: "Я узнал, что он врал.", a: ["I found out that he was lying.", "I found out he was lying."], why: "find out — узнать" },
    { k: "choice", q: "Не могу разобраться с этим уровнем.", opts: ["I can't figure out this level.", "I can't find this level.", "I can't give up this level."], a: "I can't figure out this level.", why: "figure out — разобраться" },
    { k: "input", lang: "en", q: "Обычно я встаю в семь.", a: ["I usually get up at seven.", "I usually get up at 7."], why: "get up — вставать" },
    { k: "listen", say: "We've run out of time.", q: "Что прозвучало?", opts: ["У нас закончилось время.", "Мы убежали вовремя.", "У нас много времени."], a: "У нас закончилось время.", why: "run out of — закончиться" },
    { k: "input", lang: "en", q: "Он вернулся домой в полночь.", a: ["He came back home at midnight.", "He came home at midnight."], why: "come back — вернуться" },
    { k: "choice", q: "Я бросил курить.", opts: ["I gave up smoking.", "I gave up to smoke.", "I gave smoking up to."], a: "I gave up smoking.", why: "give up + -ing" },
  ] };
