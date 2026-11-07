window.FR_C = window.FR_C || {};
FR_C[24] = { n: 24, kind: "Слова", t: "Время и дни недели", s: "quelle heure est-il ? lundi, mardi…",
  words: [["l'heure", "час; время (на часах)", "лёр"], ["et demie", "с половиной", "э дёми"], ["et quart", "с четвертью", "э кар"], ["midi", "полдень", "миди"],
    ["le matin", "утро", "лё матэн"], ["le soir", "вечер", "лё суар"], ["la semaine", "неделя", "ла сёмэн"], ["aujourd'hui", "сегодня", "ожурдюи"]],
  sut: "«Который час?» — {{Quelle heure est-il ?}} Ответ: {{Il est trois heures.}} — «Три часа» (буквально «оно есть три часа»). Половина — {{et demie}}, четверть — {{et quart}}. Дни недели пишут с маленькой буквы и без артикля: {{lundi}}.",
  rule: `<table class="tbl"><tbody>
<tr><td class="fr">Il est une heure.</td><td>Час.</td></tr><tr><td class="fr">Il est trois heures.</td><td>Три часа.</td></tr>
<tr><td class="fr">Il est trois heures et demie.</td><td>Половина четвёртого (3:30).</td></tr><tr><td class="fr">Il est trois heures et quart.</td><td>3:15.</td></tr>
<tr><td class="fr">Il est midi.</td><td>Полдень.</td></tr></tbody></table>
<p>Дни: <span class="fr">lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche</span> — «лэнди, марди, мэркрёди, жёди, вандрёди, самди, диманш».</p>`,
  prosto: `<p>Время во французском — через {{il est}} «оно есть» и слово {{heure}} «час».</p>
> Quelle heure est-il ? :: Который час? — «кэлёр этиль»
> Il est deux heures. :: Два часа. — «илэ дёзёр»
> Il est dix heures et demie. :: Половина одиннадцатого. — «илэ дизёр э дёми»
> Il est midi. :: Полдень. — «илэ миди»
> à huit heures du soir :: в восемь вечера — «а юитёр дю суар»
<p>Дни недели — без le: просто {{lundi}} «в понедельник».</p>
> Aujourd'hui, c'est lundi. :: Сегодня понедельник. — «ожурдюи, сэ лэнди»
> Je travaille le samedi. :: Я работаю по субботам. — «жё травай лё самди»: с le — «каждую субботу»
> Le dimanche, je fais du sport. :: По воскресеньям я занимаюсь спортом. — «лё диманш жё фэ дю спор»
@@pin:fr24@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «половина», «четверть», «утро», «вечер» — те же понятия.</p>
<p><b>Не как в русском:</b> по-русски «половина четвёртого» (считаем вперёд), а французы — «три часа и половина»: {{trois heures et demie}}. И с днём недели: {{lundi}} — «в понедельник (этот)», {{le lundi}} — «по понедельникам».</p>
<h3>Частые ошибки</h3>
<p>• «Il est trois heure» — с 2 и больше: heure<b>s</b>. • Пишут дни с большой буквы: «Lundi» — надо {{lundi}}. • Путают «в понедельник» {{lundi}} и «по понедельникам» {{le lundi}}.</p>`,
  lub: `<p>Дни недели названы по планетам и богам: <i>lundi</i> — день Луны (lune), <i>mardi</i> — Марса, <i>mercredi</i> — Меркурия, <i>jeudi</i> — Юпитера, <i>vendredi</i> — Венеры, <i>samedi</i> — субботы (шаббат), <i>dimanche</i> — день Господа (лат. <i>dies dominica</i>).</p>
<p>В расписаниях французы пишут время по 24 часам: <i>20 h 30</i> — «vingt heures trente».</p>`,
  pins: [{ id: "fr24", t: "Время и дни", html: `<table class="tbl"><tbody><tr><td class="fr">Quelle heure est-il ?</td><td>Который час?</td></tr><tr><td class="fr">Il est trois heures (et demie / et quart).</td><td>3:00 (3:30 / 3:15)</td></tr><tr><td class="fr">lundi mardi mercredi jeudi</td><td>пн вт ср чт</td></tr><tr><td class="fr">vendredi samedi dimanche</td><td>пт сб вс</td></tr><tr><td class="fr">lundi / le lundi</td><td>в понедельник / по понедельникам</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "fr", q: "Который час?", a: ["Quelle heure est-il ?", "Quelle heure est-il"], why: "quelle heure est-il" },
    { k: "choice", q: "Два часа. — Il est deux …", opts: ["heure", "heures", "heurs"], a: "heures", why: "больше одного — heures" },
    { k: "tiles", lang: "fr", q: "Половина одиннадцатого.", a: "Il est dix heures et demie", d: ["quart", "midi"], why: "10 часов и половина" },
    { k: "choice", q: "Je travaille le samedi. значит…", opts: ["Я работаю по субботам.", "Я работал в субботу.", "Я работаю в эту субботу."], a: "Я работаю по субботам.", why: "le + день — каждую неделю" },
    { k: "choice", q: "Какой день — mercredi?", opts: ["среда", "понедельник", "пятница"], a: "среда", why: "mercredi — среда (день Меркурия)" },
    { k: "listen", say: "Il est midi.", q: "Что прозвучало?", opts: ["Полдень.", "Полночь.", "Час дня."], a: "Полдень.", why: "midi — полдень" },
    { k: "input", lang: "fr", q: "Сегодня понедельник.", a: ["Aujourd'hui, c'est lundi.", "Aujourd'hui c'est lundi."], why: "c'est + день, с маленькой буквы" },
    { k: "fix", lang: "fr", q: "Il est trois heure.", a: ["Il est trois heures."], why: "три часа — heures" },
    { k: "choice", q: "3:15 — Il est trois heures …", opts: ["et quart", "et demie", "moins"], a: "et quart", why: "четверть — et quart" },
    { k: "input", lang: "fr", q: "воскресенье", a: ["dimanche"], why: "dimanche — «диманш»" },
  ] };
