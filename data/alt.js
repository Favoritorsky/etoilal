// «Альтернативное обучение» (#/альтернатива): шпаргалка по всему языку → тексты с подсказками → загадки.
// Разметка глав: строка «> Etoilal :: русский» — пример с ▶ и чтением; [[слово]] — слово Etoilal (нажми — послушать);
// «@@verb@@» — конструктор глагола, «@@reader@@» — «прочитай сам», «@@sounds@@» — таблица звуков.
// Тексты: g — слова, разрезанные на кусочки (кусочки через «-», слияние через «+»), r — подсказка к каждому кусочку
// («_» = пробел внутри подсказки). Проверка: node tools/test_alt.cjs (кусочки сходятся с текстом, все фразы без ошибок).
window.ET_ALT = {
// ---------------------------------------------------------------- звуки
sounds: [
  // буквы, как звучит, на что похоже / ошибка, примеры
  ["a", "а", "всегда чёткое «а»", "ami gran qafe"],
  ["e", "э", "всегда твёрдое «э», как в «этот»: le — «лэ», а не «ле». Никогда не «е» и не «и»", "le mer frer"],
  ["i", "и", "как русское «и»; согласную перед собой смягчает, как в русском", "isi livr vil"],
  ["o", "о", "всегда «о», даже без ударения — никакого «аканья»: mezon — «мэзон», не «мэзан»", "bo mezon soley"],
  ["ou", "у", "две буквы — один звук «у». Не «оу»!", "jour amour nou"],
  ["u", "ю", "как «ю» в слове «люк»: согласную перед собой смягчает. Не «у»!", "lun nui tu"],
  ["eu", "ё", "две буквы — один звук «ё», как в «тётя». Не «эу»!", "qeur feu bleu"],
  ["oi", "уа", "две буквы — «уа», быстро, в один слог: etoil — «э-туаль». Не «ой»!", "etoil soir voi"],
  ["y", "й", "«й» — и перед гласной, и после неё. Не «ы» и не «у»!", "yer soley syel"],
  ["ch", "ш", "две буквы — «ш». Не «ч»!", "cha chanson chaq"],
  ["j", "ж", "всегда «ж». Не английское «дж»", "jour je jarden"],
  ["gn", "нь", "две буквы — мягкое «нь», как в «Испания». Не «гн»!", "montagn"],
  ["q", "к", "всегда «к»", "qafe qan"],
  ["g", "г", "всегда «г» (твёрдое, даже перед e и i)", "gran gar"],
  ["s", "с", "всегда «с», даже между гласными (никогда не «з»)", "sel syel isi"],
  ["z", "з", "всегда «з»", "oizo lez rizer"],
  ["r", "р", "любое «р» правильно: русское, английское или французское картавое (в записях на сайте — французское). Смысл не меняется", "rev frer mer"],
  ["l", "л", "мягкое европейское «л» — посередине между русскими «л» и «ль». На конце слова и перед согласной звучит как «ль»", "lun sel vil"],
  ["you / yo", "ю / ё", "только после гласной: «й» + «у» / «й» + «о»", "reyounyon"],
],
// ---------------------------------------------------------------- шпаргалка: главы
cheat: [
{ id: "zvuki", ic: "🔊", t: "Звуки и чтение", s: "буквы, ударение, мелодия, слияние, ошибки", body: `
<p>Главный закон: <b>одна буква или сочетание букв — всегда один и тот же звук</b>. Немых букв нет — всё написанное читается. Если ты один раз выучил таблицу ниже, ты прочитаешь любое слово языка без ошибки.</p>
<p>Букв <b>c, h, q, w, x</b> в языке нет. <b>b d f m n p t v</b> — как русские б д ф м н п т в.</p>
@@sounds@@
<h3>Сочетания, которые легко перепутать</h3>
<p>Читай <b>сначала двухбуквенное сочетание</b>, а не отдельные буквы: [[ou]] = у, [[eu]] = ё, [[oi]] = уа, [[ch]] = ш, [[gn]] = нь.</p>
> lun :: луна — «люн»: u = ю
> jour :: день — «жур»: ou = у
> qeur :: сердце — «кёр»: eu = ё
> soir :: вечер — «суар»: oi = уа
> chyen :: собака — «шйэн»: ch = ш, y = й
> montagn :: гора — «монтань»: gn = нь
<p><b>y рядом с гласной</b> — всегда «й»: [[soley]] «солэй» (солнце), [[syel]] «сьель» (небо), [[travayer]] «травайэр» (работать). <b>ey</b> = «эй», <b>ay</b> = «ай», <b>oy</b> = «ой».</p>
<p><b>u после гласной</b> тоже «ю», но мягкость не к чему приложить: [[nui]] «нюи» (ночь) — тут «ю» смягчает «н».</p>
<h3>Ударение</h3>
<p>Ударение всегда на <b>последний слог</b> — исключений нет: [[ami]] — «амИ», [[mezon]] — «мэзОн», [[etoil]] — «этуАль».</p>
<p>Но по-настоящему ударение слышно только <b>в конце смысловой группы</b> — перед запятой или точкой. Внутри группы все слоги почти ровные, как бусины на нитке. Это и делает язык похожим на французский.</p>
> Le soley briyet. :: Солнце светит. — слоги ровные «лэ-со-лэй-бри-йЭт», ударение слышно только на самом последнем
<p>Не дави на первый слог, как в русском «мАма»: в Etoilal ударение никогда не бывает в начале слова (кроме односложных).</p>
<h3>Мелодия фразы</h3>
<p>Фраза течёт ровно и <b>чуть поднимается в конце каждой группы</b>, а в самом конце утверждения — опускается. В вопросе без <b>esqe</b> голос в конце <b>поднимается</b> — только так и понятно, что это вопрос.</p>
> Tu chantes. :: Ты поёшь. — в конце голос вниз
> Tu chantes? :: Ты поёшь? — в конце голос вверх
<h3>Гласные не «съедаются»</h3>
<p>В русском безударные гласные ослабевают: «молоко» звучит как «малако». В Etoilal <b>каждая гласная звучит чисто и полностью</b>, где бы она ни стояла: [[mezon]] — «мэ-зон», а не «мизон»; [[soley]] — «со-лэй», а не «салэй».</p>
<h3>Звонкие не оглушаются</h3>
<p>Русские привыкли говорить «дуп» вместо «дуб». В Etoilal (как во французском) звонкая согласная на конце слова <b>остаётся звонкой</b>: [[nej]] — «нэж», а не «нэш»; [[rouj]] — «руж», [[rev]] — «рэв», а не «рэф».</p>
<h3>Слияние (апостроф)</h3>
<p>Короткие слова <b>le, de, se, qe, je, me</b> перед гласной теряют свою «e» и прилипают к следующему слову. Это правило <b>обязательное и без исключений</b> — на письме ставится апостроф:</p>
> l'ami :: друг (le + ami)
> j'emem :: я люблю (je + emem)
> d'etoil :: о звёздах (de + etoil)
> q'il :: что он (qe + il)
<h3>Связка через z</h3>
<p>Во множественном числе маленькие слова получают <b>z</b>. Эта z <b>прилипает к следующей гласной</b>, и два слова звучат как одно:</p>
> lez ami :: друзья — «лэзами»
> unz etoil :: какие-то звёзды — «юнзэтуаль»
<h3>Сцепление слов</h3>
<p>Конечная согласная слова, если дальше идёт гласная, произносится <b>вместе со следующим словом</b>, без паузы: [[il eset]] звучит «и-лэ-сэт», [[nou alen]] — «ну-а-лэн». Речь не рубится на отдельные слова, а «льётся ручьём» — это главная красота языка. Не делай пауз между словами внутри группы.</p>
<h3>Типичные ошибки русскоговорящих</h3>
<table class="tbl"><thead><tr><th>Пишется</th><th>Неправильно</th><th>Правильно</th></tr></thead><tbody>
<tr><td><span class="et">le</span></td><td>«ле» (мягко)</td><td>«лэ» — e всегда твёрдое</td></tr>
<tr><td><span class="et">mezon</span></td><td>«мизан» (аканье)</td><td>«мэзон» — все гласные чисто</td></tr>
<tr><td><span class="et">jour</span></td><td>«жоур»</td><td>«жур» — ou = у</td></tr>
<tr><td><span class="et">lun</span></td><td>«лун»</td><td>«люн» — u = ю</td></tr>
<tr><td><span class="et">feu</span></td><td>«фэу»</td><td>«фё» — eu = ё</td></tr>
<tr><td><span class="et">soir</span></td><td>«сойр»</td><td>«суар» — oi = уа</td></tr>
<tr><td><span class="et">chaq</span></td><td>«чак»</td><td>«шак» — ch = ш</td></tr>
<tr><td><span class="et">montagn</span></td><td>«монтагн»</td><td>«монтань» — gn = нь</td></tr>
<tr><td><span class="et">nej</span></td><td>«нэш» (оглушение)</td><td>«нэж»</td></tr>
<tr><td><span class="et">isi</span></td><td>«изи»</td><td>«иси» — s всегда «с»</td></tr>
<tr><td><span class="et">ami</span></td><td>«Ами» (ударение в начале)</td><td>«амИ» — ударение в конце</td></tr>
</tbody></table>
<h3>Прочитай сам</h3>
<p>Напиши любое слово или фразу — покажу, как это читается русскими буквами, и прочитаю вслух.</p>
@@reader@@` },

{ id: "sush", ic: "📦", t: "Слова-предметы и артикли", s: "одна форма, много = z, род только у живых", body: `
<p>Существительное <b>никогда не меняется</b>: ни падежей («звезда, звезды, звезде…»), ни окончаний множественного числа. Всё, что нужно, показывают <b>маленькие слова перед ним</b>.</p>
<table class="tbl"><thead><tr><th></th><th>один</th><th>много</th></tr></thead><tbody>
<tr><td>тот самый, известный</td><td><span class="et">le</span> (перед гласной <span class="et">l'</span>)</td><td><span class="et">lez</span></td></tr>
<tr><td>какой-то, новый</td><td><span class="et">un</span></td><td><span class="et">unz</span></td></tr></tbody></table>
<p><b>le</b> — как английское <i>the</i>: о чём-то известном. <b>un</b> — как <i>a</i>: о чём-то новом, «какой-то, один».</p>
> l'etoil :: звезда (та самая)
> lez etoil :: звёзды
> un ami :: какой-то друг
> unz ami :: какие-то друзья
<p><b>Одно правило множественного числа на весь язык:</b> все маленькие слова перед существительным получают <b>-z</b> — артикль, «мой», «этот»: le → lez, un → unz, ma → maz, se → sez. Само слово остаётся как было.</p>
> maz frer :: мои братья
> sez nui :: эти ночи
<p><b>После числа</b> артикль не нужен, и слово тоже не меняется: [[troi etoil]] — три звезды, [[zero ereur]] — ноль ошибок.</p>
<p><b>Чьё-то:</b> через <b>de</b> «из, от» — [[le mezon de ma frer]] «дом моего брата».</p>
<h3>Род</h3>
<p>Род есть <b>только у живых</b>. Женский — суффикс <b>-ela</b>: [[ami]] друг → [[amiela]] подруга, [[om]] человек, мужчина → [[omela]] женщина, [[lou]] волк → [[louela]] волчица. Артикли и прилагательные от рода <b>не меняются</b>. О вещах и животных без пола говорят «он» — <b>il</b>.</p>` },

{ id: "mest", ic: "👤", t: "Местоимения", s: "я, меня, мне, мой; порядок перед глаголом", body: `
<table class="tbl"><thead><tr><th></th><th>кто</th><th>кого</th><th>кому</th><th>выделенное</th><th>чей (один / много)</th></tr></thead><tbody>
<tr><td>я</td><td class="et">je</td><td class="et">mo</td><td class="et">mey</td><td class="et">moi</td><td class="et">ma / maz</td></tr>
<tr><td>ты</td><td class="et">tu</td><td class="et">to</td><td class="et">tey</td><td class="et">toi</td><td class="et">ta / taz</td></tr>
<tr><td>он / она</td><td class="et">il / el</td><td class="et">lo / la</td><td class="et">ley</td><td class="et">lui / ela</td><td class="et">sa / saz</td></tr>
<tr><td>мы</td><td class="et">nou</td><td class="et">no</td><td class="et">ney</td><td class="et">nou</td><td class="et">nota / notaz</td></tr>
<tr><td>вы, Вы</td><td class="et">vou</td><td class="et">vo</td><td class="et">vey</td><td class="et">vou</td><td class="et">vota / votaz</td></tr>
<tr><td>они</td><td class="et">ilz / elz</td><td class="et">loz / laz</td><td class="et">leyz</td><td class="et">leur</td><td class="et">leura / leuraz</td></tr>
</tbody></table>
<p><b>Заметь систему:</b> «кого» кончается на <b>-o</b> (mo, to, lo), «кому» — на <b>-ey</b> (mey, tey, ley), «они» — это «он» + z (il → ilz, el → elz). Опять та же z!</p>
<p><b>Порядок всегда один:</b> кто → кого → кому → глагол. Не как в русском, где можно по-разному.</p>
> Je to emem. :: Я тебя люблю.
> Je lo tey donem. :: Я тебе его даю. (я → его → тебе → даю)
> Il la mey donit. :: Он мне её дал.
<p><b>Выделенное</b> (moi, toi…) — когда хочешь подчеркнуть, или после предлога: [[Moi, je revem.]] «А я — мечтаю», [[pour toi]] «для тебя».</p>
<p><b>Подлежащее можно не говорить</b> — по концу глагола и так ясно, кто делает: [[Voiyem lez etoil.]] «Вижу звёзды».</p>
<p><b>vou</b> — и «вы» многим, и вежливое «Вы» одному. <b>soi</b> — «себя» для всех: [[Il soi lavet.]] «Он моется». <b>on</b> — «люди, кто-то» (как «говорят» без «кто»).</p>
<p><b>Этот / тот:</b> [[se]] этот (много — [[sez]]), [[sela]] тот (много — [[selaz]]).</p>` },

{ id: "pril", ic: "🎨", t: "Прилагательные и сравнение", s: "после слова — факт, перед — образ; plu, le plu", body: `
<p>Прилагательное <b>не меняется</b> (ни по роду, ни по числу) и обычно стоит <b>после</b> слова: [[un chyen gran]] — большая собака.</p>
<p>Можно поставить <b>перед</b> словом — тогда смысл становится <b>образным, чувственным</b>. Правило работает для любого прилагательного:</p>
> un nui sonbr :: тёмная ночь (просто без света)
> un sonbr nui :: мрачная, страшная ночь (образно)
> un ami vyeu :: пожилой друг
> un vyeu ami :: давний, старый друг
<h3>Сравнение — без исключений</h3>
<p><b>plu</b> «более», <b>mouen</b> «менее», <b>le plu</b> «самый», <b>qe</b> «чем». Никаких «лучше / хуже» отдельными словами — всё через plu.</p>
> Le lun eset plu bo qe le soley. :: Луна прекраснее солнца.
> Il eset mouen rapid qe moi. :: Он менее быстрый, чем я.
> le plu bo etoil :: самая прекрасная звезда
<h3>Наречие</h3>
<p>Из любого прилагательного: + <b>-man</b>. [[rapid]] быстрый → [[rapidman]] быстро, [[dous]] мягкий → [[dousman]] мягко.</p>` },

{ id: "glag", ic: "⚙", t: "Глагол — конструктор", s: "основа + время + (бы/пусть/наверное) + кто", body: `
<p>Это сердце языка. Любой глагол собирается из кусочков, и <b>каждый кусочек всегда одинаковый</b>. Неправильных глаголов нет — ни одного.</p>
<p style="font-size:19px;text-align:center"><b class="mo-b">основа</b> + <b class="mo-t">время</b> + <b class="mo-m">(наклонение)</b> + <b class="mo-p">кто</b></p>
<p>В словаре глагол стоит с <b>-er</b> на конце: [[chanter]] «петь». Отрежь <b>-er</b> — получишь основу <b>chant</b>.</p>
<h3>Кто делает — одна буква в конце</h3>
<table class="tbl"><tbody><tr><td class="et">m</td><td>я</td><td class="et">s</td><td>ты</td><td class="et">t</td><td>он, она</td></tr>
<tr><td class="et">n</td><td>мы</td><td class="et">z</td><td>вы</td><td class="et">l</td><td>они</td></tr></tbody></table>
<h3>Когда — кусочек в середине</h3>
<table class="tbl"><thead><tr><th>кусочек</th><th>время</th><th>пример</th></tr></thead><tbody>
<tr><td class="et">e</td><td>сейчас</td><td><span class="et">chantem</span> — пою</td></tr>
<tr><td class="et">i</td><td>было, один раз, дело сделано</td><td><span class="et">chantim</span> — спел</td></tr>
<tr><td class="et">a</td><td>было долго или много раз, «бывало»</td><td><span class="et">chantam</span> — пел, певал</td></tr>
<tr><td class="et">re</td><td>будет</td><td><span class="et">chantrem</span> — спою, буду петь</td></tr>
<tr><td class="et">o</td><td>вот-вот, сейчас начну</td><td><span class="et">chantom</span> — сейчас спою</td></tr>
<tr><td class="et">u</td><td>только что</td><td><span class="et">chantum</span> — только что спел</td></tr></tbody></table>
<p><b>i или a?</b> Русский делает это видом глагола: «спел» (i — один раз, закончено) и «пел» (a — длилось, повторялось, было фоном). Например: «Солнце светило (a), и вдруг я увидел (i) море».</p>
<h3>Наклонение — по желанию, между временем и «кто»</h3>
<table class="tbl"><tbody>
<tr><td class="et">ri</td><td>бы</td><td><span class="et">chanterim</span> — я пел бы · <span class="et">chantirim</span> — я спел бы (тогда)</td></tr>
<tr><td class="et">se</td><td>пусть, чтобы</td><td><span class="et">chanteset</span> — пусть поёт</td></tr>
<tr><td class="et">pe</td><td>наверное</td><td><span class="et">chantepet</span> — наверное, поёт · <span class="et">chantipet</span> — наверное, спел</td></tr></tbody></table>
<p>Наклонение сочетается с <b>любым</b> временем — это просто ещё один кусочек.</p>
<h3>Собери сам</h3>
@@verb@@
<h3>Приказ</h3>
<p>Основа + <b>e</b>: [[Chante!]] «Пой!». «Давай споём!» — форма «мы»: [[Chanten!]]. «Пойте!» — форма «вы»: [[Chantez!]].</p>
<h3>Причастия</h3>
<p><b>-ant</b> — «-ущий»: [[chantant]] поющий. <b>-ey</b> — «-нный, -тый»: [[chantey]] спетый.</p>
<p><b>Страдательный оборот:</b> «быть» + причастие на -ey, а кем — через <b>par</b>:</p>
> Le chanson esit chantey par l'anfan. :: Песня была спета ребёнком.
<h3>Мелочь: две одинаковые гласные</h3>
<p>Если основа кончается на ту же гласную, что и кусочек времени, между ними встаёт <b>й</b> (пишется y или you/yo) — чтобы гласные не слиплись. Таких глаголов немного, и переводчик сайта знает их формы.</p>` },

{ id: "byt", ic: "✦", t: "Быть, иметь и другие частые", s: "eser, aver — обычные глаголы", body: `
<p><b>«Быть»</b> — совершенно обычный глагол <b>eser</b> с основой <b>es</b>. В отличие от русского, его <b>нельзя пропускать</b>: «Он учитель» = «Он есть учитель».</p>
> J'esem Leo. :: Я Лео.
> Il eset metr. :: Он учитель.
> Maz ami esel isi. :: Мои друзья здесь.
> Qan j'esam anfan… :: Когда я был ребёнком…
<p>Формы: сейчас — esem, eses, eset, esen, esez, esel; было — esim / esam…; будет — esrem…</p>
<p><b>«Иметь»</b> — <b>aver</b> (основа <b>av</b>). «У меня есть» = «я имею»:</p>
> J'avem troi frer. :: У меня три брата.
> Qonbyen d'an tu aves? :: Сколько тебе лет? (сколько лет ты имеешь)
> J'avem deudis un an. :: Мне двадцать один год.
<p>Другие частые глаголы — все по той же схеме: [[aler]] идти, [[vener]] приходить, [[fezer]] делать, [[dizer]] сказать, [[voiyer]] видеть, [[saver]] знать, [[vouler]] хотеть, [[pouver]] мочь, [[parler]] говорить, [[manjer]] есть, [[buver]] пить, [[dormer]] спать, [[emer]] любить, [[doner]] давать, [[lizer]] читать, [[eqriver]] писать.</p>` },

{ id: "ne", ic: "🚫", t: "Не, никогда и вопросы", s: "одно слово после глагола; esqe", body: `
<p><b>Отрицание — одно слово ПОСЛЕ глагола.</b> Это главное отличие от русского: не «я не знаю», а «я знаю не».</p>
<table class="tbl"><tbody><tr><td class="et">pa</td><td>не</td></tr><tr><td class="et">jame</td><td>никогда</td></tr><tr><td class="et">ryen</td><td>ничего</td></tr><tr><td class="et">persone</td><td>никто — стоит на месте «кто»</td></tr></tbody></table>
> Je savem pa. :: Я не знаю.
> Il revnit jame. :: Он так и не вернулся.
> Voiyem ryen. :: Ничего не вижу.
> Persone chantet. :: Никто не поёт.
<p>Второе «не» не нужно: в русском «никто не поёт», а в Etoilal просто «никто поёт».</p>
<h3>Вопрос «да или нет»</h3>
<p>Три способа, все правильные:</p>
> Tu chantes? :: Ты поёшь? — просто голосом (голос вверх в конце)
> Esqe tu chantes? :: Ты поёшь? — с частицей esqe в начале
> Chantes tu? :: Поёшь ли ты? — высокий стиль: глагол вперёд
<p>Ответ: <b>oui</b> да, <b>non</b> нет.</p>
<h3>Вопросительные слова</h3>
<table class="tbl"><tbody>
<tr><td class="et">qi</td><td>кто</td><td class="et">qoi</td><td>что</td><td class="et">ou</td><td>где, куда</td></tr>
<tr><td class="et">dou</td><td>откуда</td><td class="et">qan</td><td>когда</td><td class="et">qoman</td><td>как</td></tr>
<tr><td class="et">pourqoi</td><td>почему</td><td class="et">qonbyen</td><td>сколько</td><td class="et">qel</td><td>какой</td></tr></tbody></table>
> Ou tu vives? :: Где ты живёшь?
> Qel livr tu lizes? :: Какую книгу ты читаешь?
> Qoman tu ales? :: Как дела? (как ты идёшь)` },

{ id: "mal", ic: "🔗", t: "Маленькие слова: предлоги и союзы", s: "в, на, с, и, но, если, который", body: `
<h3>Предлоги</h3>
<table class="tbl"><tbody>
<tr><td class="et">a</td><td>к, в (куда)</td><td class="et">de</td><td>из, от, о; чей</td></tr>
<tr><td class="et">dans</td><td>в, внутри</td><td class="et">sur</td><td>на</td></tr>
<tr><td class="et">sou</td><td>под</td><td class="et">aveq</td><td>с (вместе)</td></tr>
<tr><td class="et">sans</td><td>без</td><td class="et">pour</td><td>для, ради</td></tr>
<tr><td class="et">che</td><td>у (кого-то), к (кому-то)</td><td class="et">antr</td><td>между</td></tr>
<tr><td class="et">apre</td><td>после</td><td class="et">avant</td><td>до (по времени)</td></tr>
<tr><td class="et">devant</td><td>перед</td><td class="et">deryer</td><td>за, позади</td></tr>
<tr><td class="et">otour</td><td>вокруг</td><td class="et">par</td><td>через, по; кем</td></tr>
<tr><td class="et">qontr</td><td>против</td><td class="et">depui</td><td>с (какого времени)</td></tr>
<tr><td class="et">jusqa</td><td>до (куда, когда)</td><td class="et">pre</td><td>возле</td></tr>
<tr><td class="et">pandant</td><td>во время</td><td class="et">selon</td><td>согласно</td></tr></tbody></table>
> Le cha dormet sur le tabl. :: Кошка спит на столе.
> Demen nou alren che ma granmer. :: Завтра мы пойдём к бабушке.
<h3>Союзы</h3>
<table class="tbl"><tbody>
<tr><td class="et">e</td><td>и</td><td class="et">oubyen</td><td>или</td><td class="et">me</td><td>но</td></tr>
<tr><td class="et">qe</td><td>что, чтобы, чем</td><td class="et">si</td><td>если</td><td class="et">pasq</td><td>потому что</td></tr>
<tr><td class="et">qan</td><td>когда</td><td class="et">qom</td><td>как</td><td class="et">donq</td><td>значит</td></tr>
<tr><td class="et">byenqe</td><td>хотя</td><td class="et">tanqe</td><td>пока</td><td></td><td></td></tr></tbody></table>
> Je savem qe tu reves. :: Я знаю, что ты мечтаешь.
> Je chantem pasq j'esem eureu. :: Я пою, потому что я счастлив.
> Byenqe le plui tonbet, nou promnen. :: Хотя идёт дождь, мы гуляем.
<p><b>«Чтобы»</b> — qe + глагол с <b>se</b> («пусть»): [[Je voulem qe tu chanteses.]] «Я хочу, чтобы ты пел».</p>
<h3>«Который»</h3>
<p><b>qi</b> — если «который» сам делает действие, <b>qe</b> — если действие делают с ним.</p>
> L'ami qi chantet eset ma frer. :: Друг, который поёт, — мой брат.
> Le livr qe je lizem eset bo. :: Книга, которую я читаю, прекрасна.` },

{ id: "chis", ic: "🔢", t: "Числа", s: "1–10 и дальше строго по десяткам", body: `
<table class="tbl"><tbody>
<tr><td>0</td><td class="et">zero</td><td>1</td><td class="et">un</td><td>2</td><td class="et">deu</td><td>3</td><td class="et">troi</td></tr>
<tr><td>4</td><td class="et">qatr</td><td>5</td><td class="et">senq</td><td>6</td><td class="et">sis</td><td>7</td><td class="et">set</td></tr>
<tr><td>8</td><td class="et">uit</td><td>9</td><td class="et">neuf</td><td>10</td><td class="et">dis</td><td>100</td><td class="et">sent</td></tr>
<tr><td>1000</td><td class="et">mil</td><td>1 000 000</td><td class="et">milyon</td><td></td><td></td><td></td><td></td></tr></tbody></table>
<p><b>Десятки</b> пишутся слитно: «сколько» + dis. 20 = [[deudis]] («два-десять»), 70 = [[setdis]] («семь-десять»), 90 = [[neufdis]]. Никаких французских «четыре-двадцать».</p>
<p><b>Единицы</b> после десятка — отдельным словом: 11 = [[dis un]], 21 = [[deudis un]], 99 = [[neufdis neuf]].</p>
<p><b>Сотни и тысячи</b> — раздельно: 345 = [[troi sent qatrdis senq]], 2026 = [[deu mil deudis sis]], 2 000 000 = [[deu milyon]].</p>
<p>После числа слово не меняется и артикль не нужен: [[troi etoil]] — три звезды. На сайте в справочнике есть переводчик чисел.</p>` },

{ id: "slova", ic: "🧩", t: "Новые слова из кусочков", s: "суффиксы и приставки", body: `
<p>Из одного слова можно сделать много других — каждый кусочек имеет <b>одно значение</b> и работает без исключений.</p>
<table class="tbl"><thead><tr><th>кусочек</th><th>значение</th><th>примеры</th></tr></thead><tbody>
<tr><td class="et">-ou</td><td>маленький, ласковый</td><td><span class="et">mezonou</span> домик, <span class="et">chaou</span> котёнок, <span class="et">livrou</span> книжка</td></tr>
<tr><td class="et">-ach</td><td>большой, грубый</td><td><span class="et">mezonach</span> домище, <span class="et">poisonach</span> рыбина</td></tr>
<tr><td class="et">-ela</td><td>женский род (только живые)</td><td><span class="et">amiela</span> подруга, <span class="et">omela</span> женщина, <span class="et">chanteurela</span> певица</td></tr>
<tr><td class="et">-eur</td><td>тот, кто делает</td><td><span class="et">chanteur</span> певец, <span class="et">danseur</span> танцор</td></tr>
<tr><td class="et">-ite</td><td>свойство («-ость, -ота»)</td><td><span class="et">qourite</span> краткость, <span class="et">froiite</span> холод(ность)</td></tr>
<tr><td class="et">-iq</td><td>относящийся к («-ный, -ский»)</td><td><span class="et">mezoniq</span> домашний, <span class="et">syeliq</span> небесный, <span class="et">jouriq</span> дневной</td></tr>
<tr><td class="et">-man</td><td>наречие («-о»)</td><td><span class="et">rapidman</span> быстро, <span class="et">dousman</span> мягко</td></tr>
<tr><td class="et">-aj</td><td>действие, процесс («-ние»)</td><td><span class="et">lavaj</span> мытьё</td></tr>
<tr><td class="et">-ri</td><td>место, мастерская</td><td><span class="et">boulanjri</span> пекарня</td></tr>
<tr><td class="et">-abl</td><td>«можно …-ть»</td><td>редкий кусочек — можно образовывать самому</td></tr>
<tr><td class="et">-eu</td><td>полный чего-то («-истый»)</td><td>редкий кусочек</td></tr>
<tr><td class="et">-ant / -ey</td><td>«-ущий» / «-нный»</td><td><span class="et">chantant</span> поющий, <span class="et">chantey</span> спетый</td></tr>
<tr><td class="et">in-</td><td>не-</td><td><span class="et">inutil</span> бесполезный, <span class="et">inbon</span> нехороший</td></tr>
<tr><td class="et">re-</td><td>снова, обратно, пере-</td><td><span class="et">relizer</span> перечитывать, <span class="et">refezer</span> переделывать</td></tr>
<tr><td class="et">de-</td><td>обратное действие («раз-»)</td><td><span class="et">delyer</span> развязывать (lyer — связывать)</td></tr>
<tr><td class="et">qontr-</td><td>против</td><td>редкий кусочек</td></tr></tbody></table>
<p><b>Важное правило языка:</b> ни одно слово не совпадает с формой глагола. Поэтому суффиксы подобраны так, чтобы не кончаться на «гласная + m, s, t, n, z, l» — иначе их можно было бы спутать с «кто делает».</p>` },

{ id: "obih", ic: "💬", t: "Частые слова", s: "сегодня, здесь, очень, спасибо…", body: `
<table class="tbl"><tbody>
<tr><td class="et">oui / non</td><td>да / нет</td><td class="et">mersi</td><td>спасибо</td></tr>
<tr><td class="et">salu</td><td>привет</td><td class="et">bonjour</td><td>здравствуй(те)</td></tr>
<tr><td class="et">orevoir</td><td>до свидания</td><td class="et">silvouple</td><td>пожалуйста</td></tr>
<tr><td class="et">ojourdui</td><td>сегодня</td><td class="et">demen</td><td>завтра</td></tr>
<tr><td class="et">yer</td><td>вчера</td><td class="et">mentnant</td><td>сейчас, теперь</td></tr>
<tr><td class="et">toujour</td><td>всегда</td><td class="et">deja</td><td>уже</td></tr>
<tr><td class="et">anqor</td><td>ещё</td><td class="et">pui</td><td>потом</td></tr>
<tr><td class="et">alor</td><td>тогда</td><td class="et">isi / laba</td><td>здесь / там</td></tr>
<tr><td class="et">tre</td><td>очень</td><td class="et">boqu</td><td>много</td></tr>
<tr><td class="et">osi</td><td>тоже</td><td class="et">seulman</td><td>только</td></tr>
<tr><td class="et">meme</td><td>даже</td><td class="et">presqe</td><td>почти</td></tr>
<tr><td class="et">ansanbl</td><td>вместе</td><td class="et">tou</td><td>все, всё, весь</td></tr>
<tr><td class="et">chaq</td><td>каждый</td><td class="et">ensi</td><td>так</td></tr>
<tr><td class="et">byensur</td><td>конечно</td><td class="et">voila</td><td>вот</td></tr></tbody></table>
> Qoman tu ales? Tre byen, mersi! :: Как дела? Очень хорошо, спасибо!` },

{ id: "stil", ic: "🎭", t: "Два стиля", s: "разговорный и высокий", body: `
<p>Грамматика одна, но звучать можно по-разному.</p>
<p><b>Разговорный стиль:</b> вопросы голосом, «я / ты» часто опускаются, прилагательные после слова.</p>
> Voiyem lez etoil. :: Вижу звёзды.
<p><b>Высокий стиль</b> (песни, легенды, стихи): в вопросах глагол вперёд, прилагательные чаще перед словом (образно), старинные слова вроде [[isl]] «остров», [[ost]] «гость».</p>
> Chantes tu? :: Поёшь ли ты?
> un sonbr nui :: мрачная ночь` },

{ id: "itog", ic: "⭐", t: "Весь язык на одном экране", s: "итоговая сводка", body: `
<table class="tbl"><tbody>
<tr><td><b>Чтение</b></td><td>1 буква/сочетание = 1 звук; ou=у, u=ю, eu=ё, oi=уа, ch=ш, j=ж, gn=нь, y=й; ударение в конце</td></tr>
<tr><td><b>Существительное</b></td><td>не меняется; le/lez, un/unz; много = +z у всех слов перед ним</td></tr>
<tr><td><b>Род</b></td><td>только у живых: -ela</td></tr>
<tr><td><b>Прилагательное</b></td><td>не меняется; после — факт, перед — образ; plu / mouen / le plu … qe</td></tr>
<tr><td><b>Глагол</b></td><td>основа + e/i/a/re/o/u + (ri/se/pe) + m/s/t/n/z/l; приказ: основа + e</td></tr>
<tr><td><b>Местоимения</b></td><td>кто → кого → кому → глагол: Je lo tey donem</td></tr>
<tr><td><b>Отрицание</b></td><td>pa / jame / ryen после глагола; persone — вместо «кто»</td></tr>
<tr><td><b>Вопрос</b></td><td>голосом, esqe в начале или глагол вперёд</td></tr>
<tr><td><b>Слияние</b></td><td>le, de, se, qe, je, me перед гласной → l', d', s', q', j', m'</td></tr>
<tr><td><b>Числа</b></td><td>1–10 + dis/sent/mil/milyon: 70 = setdis</td></tr>
<tr><td><b>Исключения</b></td><td>нет</td></tr></tbody></table>` },
],
// ---------------------------------------------------------------- тексты
// hint: "all" — подсказки под всеми словами; "new" — только под новыми; "none" — по нажатию
texts: [
{ t: "Лео", s: "сейчас: я, он, мы", hint: "all", note: "Посмотри на глаголы: последняя буква — кто делает (m — я, t — он, n — мы), а e перед ней — «сейчас».", lines: [
  ["Bonjour! J'esem Leo.", "Привет! Я Лео.", "Bonjour J'+es-e-m Leo", "здравствуй я+быть-сейчас-я Лео"],
  ["Je vivem dans un vil gran.", "Я живу в большом городе.", "Je viv-e-m dans un vil gran", "я жить-сейчас-я в какой_то город большой"],
  ["Le maten, je buvem le qafe e lizem un livr.", "Утром я пью кофе и читаю книгу.", "Le maten je buv-e-m le qafe e liz-e-m un livr", "тот утро я пить-сейчас-я тот кофе и читать-сейчас-я какой_то книга"],
  ["Ma frer travayet dans un eqol.", "Мой брат работает в школе.", "Ma frer travay-e-t dans un eqol", "мой брат работать-сейчас-он в какой_то школа"],
  ["Il eset metr.", "Он учитель.", "Il es-e-t metr", "он быть-сейчас-он учитель"],
  ["Le soir, nou promnen dans le parq.", "Вечером мы гуляем в парке.", "Le soir nou promn-e-n dans le parq", "тот вечер мы гулять-сейчас-мы в тот парк"]] },
{ t: "Дома", s: "много: z; прилагательные", hint: "all", note: "Слово (anfan, ami, etoil) не меняется — «много» показывает z у маленького слова впереди. Прилагательное стоит после слова: chyen gran.", lines: [
  ["Nota mezon eset peti, me joli.", "Наш дом маленький, но красивый.", "Nota mezon es-e-t peti me joli", "наш дом быть-сейчас-он маленький но красивый"],
  ["Le cha dormet sur le tabl.", "Кошка спит на столе.", "Le cha dorm-e-t sur le tabl", "тот кошка спать-сейчас-она на тот стол"],
  ["Le chyen gran jouet dans le jarden.", "Большая собака играет в саду.", "Le chyen gran jou-e-t dans le jarden", "тот собака большой играть-сейчас-он в тот сад"],
  ["Lez anfan chantel ansanbl.", "Дети поют вместе.", "Le-z anfan chant-e-l ansanbl", "тот-много ребёнок петь-сейчас-они вместе"],
  ["Maz ami esel isi.", "Мои друзья здесь.", "Ma-z ami es-e-l isi", "мой-много друг быть-сейчас-они здесь"],
  ["Le nui, unz etoil briyel dans le syel.", "Ночью в небе светят звёзды.", "Le nui un-z etoil briy-e-l dans le syel", "тот ночь какой_то-много звезда светить-сейчас-они в тот небо"]] },
{ t: "Вчера", s: "было: i и a", hint: "all", note: "i — сделал один раз, дело закончено («спел»). a — длилось или повторялось, было фоном («пел, бывало пел»).", lines: [
  ["Yer, je voiyim le mer.", "Вчера я увидел море.", "Yer je voiy-i-m le mer", "вчера я видеть-было-я тот море"],
  ["Le soley briyat, e lez oizo chantal.", "Солнце светило, и птицы пели.", "Le soley briy-a-t e le-z oizo chant-a-l", "тот солнце светить-бывало-он и тот-много птица петь-бывало-они"],
  ["Nou manjin ansanbl.", "Мы поели вместе.", "Nou manj-i-n ansanbl", "мы есть-было-мы вместе"],
  ["Ma seur chantit un chanson.", "Моя сестра спела песню.", "Ma seur chant-i-t un chanson", "мой сестра петь-было-она какой_то песня"],
  ["Qan j'esam anfan, je revam d'etoil.", "Когда я был ребёнком, я мечтал о звёздах.", "Qan j'+es-a-m anfan je rev-a-m d'+etoil", "когда я+быть-бывало-я ребёнок я мечтать-бывало-я о+звезда"]] },
{ t: "Завтра", s: "будет, вот-вот, только что", hint: "new", note: "re — будет, o — вот-вот, сейчас начну, u — только что. Подсказки теперь только под новыми словами — остальные открываются нажатием.", lines: [
  ["Demen nou alren che ma granmer.", "Завтра мы пойдём к бабушке.", "Demen nou al-re-n che ma granmer", "завтра мы идти-будет-мы к мой бабушка"],
  ["Ma seur venut.", "Моя сестра только что пришла.", "Ma seur ven-u-t", "мой сестра прийти-только_что-она"],
  ["Tu manjus?", "Ты только что поел?", "Tu manj-u-s", "ты есть-только_что-ты"],
  ["Non, me je manjom!", "Нет, но сейчас поем!", "Non me je manj-o-m", "нет но я есть-вот_вот-я"],
  ["Elz chantrel ansanbl.", "Они (девушки) будут петь вместе.", "El-z chant-re-l ansanbl", "она-много петь-будет-они вместе"],
  ["Je partom!", "Я ухожу!", "Je part-o-m", "я уходить-вот_вот-я"]] },
{ t: "Нет и вопросы", s: "pa, jame, ryen, esqe", hint: "new", note: "«Не» стоит после глагола: emem pa — «люблю не». Вопрос — голосом или с esqe в начале.", lines: [
  ["Esqe tu emes le nej?", "Ты любишь снег?", "Esqe tu em-e-s le nej", "(вопрос) ты любить-сейчас-ты тот снег"],
  ["Oui, je lo emem.", "Да, я его люблю.", "Oui je lo em-e-m", "да я его любить-сейчас-я"],
  ["J'emem pa le plui.", "Я не люблю дождь.", "J'+em-e-m pa le plui", "я+любить-сейчас-я не тот дождь"],
  ["Ou tu vives?", "Где ты живёшь?", "Ou tu viv-e-s", "где ты жить-сейчас-ты"],
  ["Voiyem ryen!", "Ничего не вижу!", "Voiy-e-m ryen", "видеть-сейчас-я ничего"],
  ["Il revnit jame.", "Он так и не вернулся.", "Il revn-i-t jame", "он вернуться-было-он никогда"]] },
{ t: "Кто кому", s: "местоимения перед глаголом", hint: "new", note: "Порядок всегда один: кто → кого → кому → глагол.", lines: [
  ["Je to emem.", "Я тебя люблю.", "Je to em-e-m", "я тебя любить-сейчас-я"],
  ["Il mo emet?", "Он меня любит?", "Il mo em-e-t", "он меня любить-сейчас-он"],
  ["Voila le livr. Je lo tey donem.", "Вот книга. Я тебе её даю.", "Voila le livr Je lo tey don-e-m", "вот тот книга я его тебе давать-сейчас-я"],
  ["Ma frer lo mey donit.", "Мой брат мне её дал.", "Ma frer lo mey don-i-t", "мой брат его мне давать-было-он"],
  ["Moi, je lizem pa.", "А я не читаю.", "Moi je liz-e-m pa", "а_я я читать-сейчас-я не"]] },
{ t: "Сравнения и числа", s: "plu, le plu; avem", hint: "new", note: "«У меня есть» = «я имею» (aver). Сравнение — plu … qe.", lines: [
  ["J'avem troi frer.", "У меня три брата.", "J'+av-e-m troi frer", "я+иметь-сейчас-я три брат"],
  ["Qonbyen d'an tu aves?", "Сколько тебе лет?", "Qonbyen d'+an tu av-e-s", "сколько из+год ты иметь-сейчас-ты"],
  ["J'avem deudis un an.", "Мне двадцать один год.", "J'+av-e-m deu-dis un an", "я+иметь-сейчас-я два-десять один год"],
  ["Il eset plu gran qe moi.", "Он больше меня.", "Il es-e-t plu gran qe moi", "он быть-сейчас-он более большой чем я"],
  ["Le lun eset plu bo qe le soley.", "Луна прекраснее солнца.", "Le lun es-e-t plu bo qe le soley", "тот луна быть-сейчас-она более прекрасный чем тот солнце"]] },
{ t: "Бы, пусть, наверное", s: "ri, se, pe", hint: "none", note: "Подсказок больше нет — нажми на слово, если нужна помощь.", lines: [
  ["Il dormepet.", "Он, наверное, спит.", "Il dorm-e-pe-t", "он спать-сейчас-наверное-он"],
  ["Il dormeset!", "Пусть спит!", "Il dorm-e-se-t", "он спать-сейчас-пусть-он"],
  ["Si tu veniris, je chantirim.", "Если бы ты пришёл, я бы спел.", "Si tu ven-i-ri-s je chant-i-ri-m", "если ты прийти-было-бы-ты я петь-было-бы-я"],
  ["Si j'averim le tan, j'aprenerim lez lang.", "Если бы у меня было время, я бы учил языки.", "Si j'+av-e-ri-m le tan j'+apren-e-ri-m le-z lang", "если я+иметь-сейчас-бы-я тот время я+учить-сейчас-бы-я тот-много язык"],
  ["Le cha manjipet le poison.", "Кошка, наверное, съела рыбу.", "Le cha manj-i-pe-t le poison", "тот кошка есть-было-наверное-она тот рыба"],
  ["Je voulem qe tu chanteses.", "Я хочу, чтобы ты пел.", "Je voul-e-m qe tu chant-e-se-s", "я хотеть-сейчас-я что ты петь-сейчас-пусть-ты"]] },
{ t: "Который, потому что, хотя", s: "сложные предложения", hint: "none", note: "qi — «который» сам делает; qe — с ним делают.", lines: [
  ["L'ami qi chantet eset ma frer.", "Друг, который поёт, — мой брат.", "L'+ami qi chant-e-t es-e-t ma frer", "тот+друг кто петь-сейчас-он быть-сейчас-он мой брат"],
  ["Le livr qe je lizem eset bo.", "Книга, которую я читаю, прекрасна.", "Le livr qe je liz-e-m es-e-t bo", "тот книга что я читать-сейчас-я быть-сейчас-она прекрасный"],
  ["Je chantem pasq j'esem eureu.", "Я пою, потому что я счастлив.", "Je chant-e-m pasq j'+es-e-m eureu", "я петь-сейчас-я потому_что я+быть-сейчас-я счастливый"],
  ["Byenqe le plui tonbet, nou promnen.", "Хотя идёт дождь, мы гуляем.", "Byenqe le plui tonb-e-t nou promn-e-n", "хотя тот дождь падать-сейчас-он мы гулять-сейчас-мы"],
  ["Le chanson esit chantey par l'anfan.", "Песня была спета ребёнком.", "Le chanson es-i-t chant-ey par l'+anfan", "тот песня быть-было-она петь-нный через тот+ребёнок"]] },
{ t: "Звёздная сказка", s: "всё вместе", hint: "none", note: "Целая история без подсказок. Прочитай вслух, следя за мелодией: голос поднимается к концу каждой группы.", lines: [
  ["Un nui, un anfan regardat le syel.", "Однажды ночью ребёнок смотрел на небо.", "Un nui un anfan regard-a-t le syel", "какой_то ночь какой_то ребёнок смотреть-бывало-он тот небо"],
  ["Unz etoil briyal, e un etoil chantat.", "Звёзды светили, а одна звезда пела.", "Un-z etoil briy-a-l e un etoil chant-a-t", "какой_то-много звезда светить-бывало-они и какой_то звезда петь-бывало-она"],
  ["L'anfan demandit: «Qi chantet?»", "Ребёнок спросил: «Кто поёт?»", "L'+anfan demand-i-t Qi chant-e-t", "тот+ребёнок спросить-было-он кто петь-сейчас-он"],
  ["L'etoil dizit: «Moi! Je chantem pour toi.»", "Звезда сказала: «Я! Я пою для тебя».", "L'+etoil diz-i-t Moi Je chant-e-m pour toi", "тот+звезда сказать-было-она я! я петь-сейчас-я для тебя"],
  ["L'anfan rizit e chantit ansanbl aveq l'etoil.", "Ребёнок засмеялся и спел вместе со звездой.", "L'+anfan riz-i-t e chant-i-t ansanbl aveq l'+etoil", "тот+ребёнок смеяться-было-он и петь-было-он вместе с тот+звезда"],
  ["Depui se nui, il regardet le syel chaq soir.", "С той ночи он смотрит на небо каждый вечер.", "Depui se nui il regard-e-t le syel chaq soir", "с этот ночь он смотреть-сейчас-он тот небо каждый вечер"]] },
],
// ---------------------------------------------------------------- загадки
// ex — примеры [Etoilal, перевод]; q — [вопрос, [принимаемые ответы], пояснение]; choice — варианты (тогда ответ — один из них)
puzzles: [
{ t: "Как это читается?", s: "звуки", rule: "ou = у, u = ю, eu = ё, oi = уа, ch = ш, j = ж, gn = нь, y = й; e — всегда «э»; ударение в конце.",
  ex: [["jour", "«жур» — день"], ["lun", "«люн» — луна"], ["qeur", "«кёр» — сердце"], ["soir", "«суар» — вечер"], ["chaq", "«шак» — каждый"], ["montagn", "«монтань» — гора"], ["soley", "«солэй» — солнце"]],
  q: [["Как читается amour (любовь)?", ["амур"], "ou — всегда «у»", ["амоур", "амур", "эмур"]],
      ["Как читается nui (ночь)?", ["нюи"], "u — всегда «ю»", ["нуи", "нюи", "ний"]],
      ["Как читается feu (огонь)?", ["фё"], "eu — всегда «ё»", ["фэу", "фу", "фё"]],
      ["Как читается etoil (звезда)?", ["этуаль"], "oi — «уа»", ["этойль", "этуаль", "этоиль"]],
      ["Как читается jarden (сад)?", ["жардэн"], "j — «ж», e — твёрдое «э»", ["джарден", "жардэн", "жарден"]],
      ["Как читается syel (небо)?", ["сьель"], "y после согласной смягчает её, как русское «ь»; l на конце — «ль»", ["сыэль", "сьель", "суэль"]]] },
{ t: "Кто делает?", s: "последняя буква глагола", rule: "Последняя буква — кто делает: m я, s ты, t он/она, n мы, z вы, l они.",
  ex: [["chantem", "я пою"], ["chantes", "ты поёшь"], ["chantet", "он поёт"], ["dansem", "я танцую"], ["dansez", "вы танцуете"], ["chantel", "они поют"], ["dansen", "мы танцуем"]],
  q: [["ты танцуешь", ["danses"], "s — «ты»"], ["она танцует", ["danset"], "t — «он» и «она»"], ["мы поём", ["chanten"], "n — «мы»"], ["они танцуют", ["dansel"], "l — «они»"], ["вы поёте", ["chantez"], "z — «вы»"]] },
{ t: "Когда?", s: "кусочек в середине", rule: "e сейчас, i было (раз), a было (долго), re будет, o вот-вот, u только что.",
  ex: [["chantem", "я пою"], ["chantim", "я спел"], ["chantam", "я пел (долго, бывало)"], ["chantrem", "я спою"], ["chantom", "я сейчас спою (вот-вот)"], ["chantum", "я только что спел"], ["dansis", "ты станцевал"], ["dansrel", "они станцуют"]],
  q: [["я станцевал", ["dansim"], "i — было, один раз"], ["ты споёшь", ["chantres"], "re — будет"], ["мы танцевали (долго)", ["dansan"], "a — было долго"], ["он только что станцевал", ["dansut"], "u — только что"], ["я вот-вот станцую", ["dansom"], "o — вот-вот"]] },
{ t: "Один или много?", s: "z у маленьких слов", rule: "Много = z у всех маленьких слов перед существительным (le → lez, un → unz, ma → maz, se → sez). Само слово не меняется.",
  ex: [["l'etoil", "звезда"], ["lez etoil", "звёзды"], ["un ami", "какой-то друг"], ["unz ami", "какие-то друзья"], ["ma frer", "мой брат"], ["maz frer", "мои братья"], ["se nui", "эта ночь"], ["sez nui", "эти ночи"]],
  q: [["мои звёзды", ["maz etoil"], "ma + z, etoil не меняется"], ["эти друзья", ["sez ami"], "se + z"], ["какие-то ночи", ["unz nui"], "un + z"], ["(те самые) братья", ["lez frer"], "le + z"]] },
{ t: "Нет и вопрос", s: "pa после глагола", rule: "pa (не), jame (никогда), ryen (ничего) — после глагола. Вопрос: esqe в начале или просто голосом.",
  ex: [["Je savem.", "Я знаю."], ["Je savem pa.", "Я не знаю."], ["Il chantet pa.", "Он не поёт."], ["Il chantet jame.", "Он никогда не поёт."], ["Voiyem ryen.", "Ничего не вижу."], ["Esqe tu danses?", "Ты танцуешь?"]],
  q: [["я не танцую", ["je dansem pa", "dansem pa"], "pa — после глагола"], ["он ничего не поёт", ["il chantet ryen", "chantet ryen"], "ryen — после глагола, второе «не» не нужно"], ["ты никогда не танцуешь", ["tu danses jame", "danses jame"], "jame — после глагола"], ["ты поёшь? (с частицей)", ["esqe tu chantes"], "esqe — в начале"]] },
{ t: "Его, тебе", s: "порядок местоимений", rule: "Порядок: кто → кого (mo, to, lo, la) → кому (mey, tey, ley) → глагол.",
  ex: [["Je to emem.", "Я тебя люблю."], ["Il mo emet.", "Он меня любит."], ["Tu lo emes.", "Ты его любишь."], ["Je lo tey donem.", "Я тебе его даю."], ["Il la mey donit.", "Он мне её дал."]],
  q: [["я его люблю", ["je lo emem"], "lo — его, перед глаголом"], ["ты меня любишь", ["tu mo emes"], "mo — меня"], ["он тебя любит", ["il to emet"], "to — тебя"], ["я тебе её дал", ["je la tey donim"], "кого (la) → кому (tey) → глагол; i — было"]] },
{ t: "Бы, пусть, наверное", s: "ri, se, pe", rule: "Между временем и «кто»: ri — бы, se — пусть, pe — наверное.",
  ex: [["chantem", "я пою"], ["chanterim", "я пел бы"], ["chanteset", "пусть он поёт"], ["chantepet", "он, наверное, поёт"], ["dansepel", "они, наверное, танцуют"], ["chantirim", "я спел бы (тогда)"]],
  q: [["я танцевал бы", ["danserim"], "dans + e + ri + m"], ["ты, наверное, танцуешь", ["dansepes"], "dans + e + pe + s"], ["пусть они поют", ["chantesel"], "chant + e + se + l"], ["он спел бы (тогда)", ["chantirit"], "chant + i + ri + t"]] },
{ t: "Слова из кусочков", s: "суффиксы", rule: "-ou маленький, -ach большой, -ela женский род, -eur тот, кто делает, -man наречие.",
  ex: [["chanter", "петь"], ["chanteur", "певец"], ["chanteurela", "певица"], ["danseur", "танцор"], ["mezon", "дом"], ["mezonou", "домик"], ["mezonach", "домище"], ["rapid → rapidman", "быстрый → быстро"]],
  q: [["танцовщица", ["danseurela"], "danseur + ela"], ["ami — друг. А «подруга»?", ["amiela"], "ami + ela"], ["dous — мягкий. А «мягко»?", ["dousman"], "dous + man"], ["livr — книга. А «книжечка»?", ["livrou"], "livr + ou"]] },
{ t: "Прилагательное: где стоит?", s: "после и перед", rule: "Прилагательное после слова — просто факт; перед словом — образно, с чувством.",
  ex: [["un nui sonbr", "тёмная ночь (без света)"], ["un sonbr nui", "мрачная, страшная ночь"], ["un ami vyeu", "пожилой друг"], ["un vyeu ami", "давний друг"]],
  q: [["Как сказать «давний друг»?", ["un vyeu ami"], "перед словом — образно", ["un ami vyeu", "un vyeu ami"]],
      ["Как сказать «ночь без света» (просто факт)?", ["un nui sonbr"], "после слова — факт", ["un nui sonbr", "un sonbr nui"]],
      ["«самая прекрасная звезда»", ["le plu bo etoil"], "le plu + прилагательное"]] },
{ t: "Числа", s: "по десяткам", rule: "Десятки слитно: «сколько» + dis (20 = deudis). Единицы — отдельным словом (21 = deudis un).",
  ex: [["dis", "10"], ["deudis", "20"], ["deudis un", "21"], ["setdis", "70"], ["sent", "100"], ["troi sent qatrdis senq", "345"]],
  q: [["30", ["troidis"], "troi + dis"], ["44", ["qatrdis qatr"], "qatr + dis, потом qatr"], ["99", ["neufdis neuf"], "neuf + dis, потом neuf"], ["200", ["deu sent"], "сотни — раздельно"]] },
],
};
