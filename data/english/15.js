window.EN_C = window.EN_C || {};
EN_C[15] = { n: 15, t: "Как долго: for и since", s: "I've lived here for two years",
  words: [["for", "в течение (сколько)", "фо"], ["since", "с (какого момента)", "синс"], ["known", "знал (know)", "нóун"], ["had", "имел (have)", "хэд"], ["studied", "учил (study)", "стáдид"], ["worked", "работал (work)", "уёркт"], ["ages", "целую вечность", "э́йджиз"], ["childhood", "детство", "чáйлдхуд"]],
  sut: "Русский говорит «Я живу здесь два года» — в настоящем. Английский — «Я <b>прожил</b> здесь два года (и живу)»: {{I've lived here for two years.}} {{for}} — сколько длится, {{since}} — с какого момента.",
  rule: `<table class="tbl"><thead><tr><th></th><th>for — сколько</th><th>since — с какого момента</th></tr></thead><tbody>
<tr><td>примеры</td><td class="fr">for two years · for a week · for ages</td><td class="fr">since 2020 · since Monday · since I was ten</td></tr>
<tr><td>фраза</td><td class="fr">I've known him for five years.</td><td class="fr">I've known him since school.</td></tr>
<tr><td>вопрос</td><td colspan="2" class="fr">How long have you lived here?</td></tr></tbody></table>
<p>Если действие — процесс, часто берут {{have been + -ing}}: {{I've been waiting for an hour!}} — «Я жду уже час!»</p>`,
  prosto: `<p>Это одна из главных ловушек для русских. Мы говорим «я знаю его пять лет», «я жду час» — в настоящем. Англичанин видит отрезок «от тогда до сейчас» — и берёт Present Perfect.</p>
> I've lived here for two years. :: Я живу здесь два года.
> I've known him since school. :: Я знаю его со школы.
> How long have you studied English? :: Сколько ты учишь английский?
> She's had this phone since 2022. :: У неё этот телефон с 2022 года.
> We haven't seen each other for ages. :: Мы не виделись целую вечность.
> I've been waiting for an hour! :: Я жду уже час!
> He's been playing since morning. :: Он играет с утра.
> I've wanted a dog since my childhood. :: Я хочу собаку с детства.
@@pin:en15@@
<h3>Сравни</h3>
<p>{{I live here.}} — я здесь живу (факт). {{I've lived here for two years.}} — живу уже два года (отрезок до сейчас). {{I lived here for two years.}} — жил два года, но больше не живу!</p>
<h3>Частые ошибки</h3>
<p>• «I live here for two years» → {{I've lived here for two years.}} • «I know him since school» → {{I've known him since school.}} • «since two years» → {{for two years}}. • «How long do you study?» → {{How long have you studied?}}</p>`,
  lub: `<p>{{ago}} (урок 4) и {{for}} легко спутать. {{two years ago}} — точка в прошлом (Past Simple: I came here two years ago). {{for two years}} — отрезок (I've lived here for two years). Одна и та же история — две фразы.</p>`,
  pins: [{ id: "en15", t: "for / since", html: `<table class="tbl"><tbody><tr><td class="fr">I've lived here for 2 years</td><td>живу уже 2 года</td></tr><tr><td class="fr">since 2020 / Monday / school</td><td>с какого момента</td></tr><tr><td class="fr">How long have you…?</td><td>как долго</td></tr><tr><td class="fr">I've been waiting for an hour</td><td>жду уже час (процесс)</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Я живу здесь два года.", a: ["I've lived here for two years.", "I have lived here for two years.", "I've been living here for two years.", "I've lived here for 2 years."], why: "отрезок до сейчас — Present Perfect + for" },
    { k: "choice", q: "I've known him … school.", opts: ["since", "for", "from"], a: "since", why: "с какого момента — since" },
    { k: "choice", q: "We haven't met … ages.", opts: ["since", "for", "ago"], a: "for", why: "сколько — for" },
    { k: "fix", lang: "en", q: "I know him for five years.", a: ["I've known him for five years.", "I have known him for five years."], why: "know → have known" },
    { k: "input", lang: "en", q: "Сколько ты учишь английский?", a: ["How long have you studied English?", "How long have you been studying English?", "How long have you learned English?", "How long have you been learning English?"], why: "How long have you…?" },
    { k: "input", lang: "en", q: "Я жду уже час!", a: ["I've been waiting for an hour!", "I have been waiting for an hour!", "I've been waiting for an hour."], why: "процесс — have been + -ing" },
    { k: "choice", q: "I lived in Moscow for two years. — Это значит:", opts: ["Жил два года, но больше не живу.", "Живу уже два года."], a: "Жил два года, но больше не живу.", why: "Past Simple — закончилось" },
    { k: "listen", say: "She's had this phone since 2022.", q: "Что прозвучало?", opts: ["У неё этот телефон с 2022 года.", "Она купила этот телефон в 2022 году.", "У неё был этот телефон два года."], a: "У неё этот телефон с 2022 года.", why: "since — с" },
    { k: "fix", lang: "en", q: "I've lived here since two years.", a: ["I've lived here for two years.", "I have lived here for two years."], why: "сколько — for" },
    { k: "input", lang: "en", q: "Он играет с утра.", a: ["He's been playing since morning.", "He has been playing since morning.", "He's been playing since the morning."], why: "since morning" },
  ] };
