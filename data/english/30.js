window.EN_C = window.EN_C || {};
EN_C[30] = { n: 30, t: "doing или to do?", s: "I enjoy playing, I want to play",
  words: [["enjoy", "получать удовольствие", "инджóй"], ["avoid", "избегать", "эвóйд"], ["decide", "решить", "дисáйд"], ["hope", "надеяться", "хóуп"], ["mind", "быть против", "майнд"], ["keep", "продолжать (keep doing)", "кип"], ["plan", "планировать", "плэн"], ["agree", "соглашаться", "эгри́"]],
  sut: "После одних глаголов — {{-ing}}: {{I enjoy playing.}} После других — {{to}}: {{I want to play.}} Правила нет — запоминай пары. Подсказка: «to» часто смотрит в будущее (хочу, решил, надеюсь), а -ing — про сам процесс (нравится, закончил, продолжаю).",
  rule: `<table class="tbl"><thead><tr><th>+ -ing</th><th>+ to</th></tr></thead><tbody>
<tr><td class="fr">enjoy · finish · stop · keep · mind · avoid</td><td class="fr">want · decide · hope · plan · agree · need · learn</td></tr>
<tr><td class="fr">I enjoy reading.</td><td class="fr">I want to read.</td></tr>
<tr><td class="fr">Stop talking!</td><td class="fr">I decided to stay.</td></tr>
<tr><td class="fr">Do you mind waiting?</td><td class="fr">I hope to see you soon.</td></tr></tbody></table>
<p>После предлогов (about, of, for, at, without…) — всегда {{-ing}}: {{I'm good at drawing.}}, {{Thanks for helping!}}</p>`,
  prosto: `<p>Эта тема — из тех, что «слушаешь и запоминаешь». Через пару недель {{I enjoy to play}} начнёт звучать для тебя криво — это и есть знание.</p>
> I enjoy playing games with friends. :: Мне нравится играть с друзьями.
> I want to learn English. :: Я хочу выучить английский.
> Have you finished eating? :: Ты доел?
> We decided to stay at home. :: Мы решили остаться дома.
> Keep going! :: Продолжай! / Не останавливайся!
> Do you mind if I open the window? :: Ничего, если я открою окно?
> I hope to see you soon. :: Надеюсь скоро тебя увидеть.
> Thanks for helping me! :: Спасибо, что помог! — после for — -ing
> I'm thinking about buying a new PC. :: Я думаю о покупке нового компьютера.
@@pin:en30@@
<h3>stop + to и stop + -ing</h3>
<p>{{He stopped smoking.}} — бросил курить. {{He stopped to smoke.}} — остановился, чтобы покурить. Смысл разный!</p>
<h3>Частые ошибки</h3>
<p>• «I enjoy to play» → {{I enjoy playing.}} • «I want playing» → {{I want to play.}} • «Thanks for help me» → {{Thanks for helping me.}} • {{like}} и {{love}} можно и так, и так: {{I like playing}} = {{I like to play}}.</p>`,
  lub: `<p>{{Keep calm and carry on}} — «Сохраняй спокойствие и продолжай» — знаменитый британский плакат. carry on = продолжать, как keep going.</p>`,
  pins: [{ id: "en30", t: "-ing или to", html: `<table class="tbl"><tbody><tr><td class="fr">enjoy finish stop keep mind avoid + -ing</td><td>процесс</td></tr><tr><td class="fr">want decide hope plan agree need + to</td><td>в будущее</td></tr><tr><td class="fr">for / about / at / without + -ing</td><td>после предлога</td></tr><tr><td class="fr">like / love</td><td>и так, и так</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "I enjoy … games.", opts: ["playing", "to play", "play"], a: "playing", why: "enjoy + -ing" },
    { k: "choice", q: "I want … English.", opts: ["to learn", "learning", "learn"], a: "to learn", why: "want + to" },
    { k: "input", lang: "en", q: "Мы решили остаться дома.", a: ["We decided to stay at home.", "We decided to stay home."], why: "decide + to" },
    { k: "fix", lang: "en", q: "Thanks for help me!", a: ["Thanks for helping me!", "Thanks for helping me.", "Thank you for helping me!"], why: "после for — -ing" },
    { k: "input", lang: "en", q: "Ты доел?", a: ["Have you finished eating?", "Did you finish eating?"], why: "finish + -ing" },
    { k: "choice", q: "He stopped smoking. — Это:", opts: ["Он бросил курить.", "Он остановился, чтобы покурить."], a: "Он бросил курить.", why: "stop + -ing — прекратить" },
    { k: "input", lang: "en", q: "Надеюсь скоро тебя увидеть.", a: ["I hope to see you soon."], why: "hope + to" },
    { k: "listen", say: "I'm thinking about buying a new PC.", q: "Что прозвучало?", opts: ["Я думаю о покупке нового компьютера.", "Я купил новый компьютер.", "Я хочу продать компьютер."], a: "Я думаю о покупке нового компьютера.", why: "about + -ing" },
    { k: "fix", lang: "en", q: "I enjoy to read books.", a: ["I enjoy reading books."], why: "enjoy + -ing" },
    { k: "input", lang: "en", q: "Продолжай! (не останавливайся)", a: ["Keep going!", "Keep going.", "Carry on!", "Go on!"], why: "keep + -ing" },
  ] };
