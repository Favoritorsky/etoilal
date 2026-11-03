// «Альтернативное обучение» v2 (3.11.2026): подробные объяснения к главам (more — дописывается в конец главы, та же разметка, что body),
// задания в конце каждой главы (ex), задания после текстов (textEx[номер]), новые тексты и загадки. Формат заданий — js/alt-tasks.js.
(() => {
const A = window.ET_ALT;
const ch = (id) => A.cheat.find((c) => c.id === id);
const more = {}, ex = {};

// ================================================================ 1. Звуки
more.zvuki = `
<h3>Почему так устроено</h3>
<p>Во французском, откуда взяты корни, пишут одно, а читают другое: <i>beaucoup</i> читается «боку», половина букв немые. В Etoilal это убрано: слова записаны <b>так, как звучат</b>. Поэтому Etoilal <b>пишется</b> не как французский: французское <i>beaucoup</i> здесь — [[boku]], <i>soleil</i> — [[soley]], <i>étoile</i> — [[etoil]].</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «и» смягчает согласную ([[livr]] — «ливр»); «ю» и «ё» — как в «люк» и «тётя»; «р» можно русское.</p>
<p><b>Не как в русском:</b></p>
<p>1) <b>e — всегда «э».</b> В русском «е» смягчает согласную («лес» — [л’]ес), а в Etoilal [[le]] — «лэ», [[mer]] — «мэр», согласная твёрдая.</p>
<p>2) <b>Нет «аканья».</b> Русские говорят «малако», хотя пишут «молоко». В Etoilal [[soley]] — «со-лэй», «о» звучит как «о».</p>
<p>3) <b>Нет оглушения.</b> По-русски «дуб» звучит «дуп». В Etoilal [[nej]] — «нэж», [[rev]] — «рэв».</p>
<p>4) <b>Ударение всегда в конце,</b> а не где угодно, как в русском («мАма», «окнО»).</p>
<h3>Ударение подробнее</h3>
<p>Считай слоги по гласным: [[mezon]] — мэ-<b>зон</b>, [[chanson]] — шан-<b>сон</b>, [[etoil]] — э-<b>туаль</b> (oi — один слог), [[soley]] — со-<b>лэй</b>. Ударный — всегда последний. В длинной фразе ударение звучит только на последнем слоге группы, а остальные слоги ровные.</p>
> Bonjour, ma ami! :: Здравствуй, мой друг! — «бонжУр, ма амИ»: две группы — два ударения
<h3>Слияние и связка — ещё примеры</h3>
<p>Слияние бывает только у <b>шести</b> коротких слов на -e: le, de, se, ke, je, me. Другие слова (ma, tu, la…) не сливаются: [[ma ami]] — «ма ами», без апострофа.</p>
> l'anfan :: ребёнок (le + anfan)
> j'avem :: я имею (je + avem)
> d'etoil :: о звёздах (de + etoil)
> Je savem k'il chantet. :: Я знаю, что он поёт. (ke + il)
<p>Перед согласной слияния нет: [[le soley]], [[je chantem]].</p>
<h3>Частые ошибки</h3>
<p>• Читать <b>u</b> как «у»: [[lun]] — «люн», не «лун». • Читать <b>ou</b> как две буквы: [[jour]] — «жур». • Забыть апостроф: <s>le ami</s> → [[l'ami]]. • Делать паузу между [[lez]] и [[ami]] — надо слитно «лэзами».</p>`;
ex.zvuki = [
  { k: "choice", q: "Как читается jour (день)?", opts: ["жоур", "жур", "джур"], a: "жур", why: "ou — всегда «у», j — «ж»", lang: "x" },
  { k: "choice", q: "Как читается lun (луна)?", opts: ["лун", "люн", "люун"], a: "люн", why: "u — всегда «ю»", lang: "x" },
  { k: "input", lang: "rd", q: "Как читается keur (сердце)? Напиши русскими буквами.", a: ["кёр"], why: "eu — «ё»", hint: "eu — это один звук" },
  { k: "input", lang: "rd", q: "Как читается chak (каждый)?", a: ["шак"], why: "ch — «ш»", hint: "ch — не «ч»" },
  { k: "choice", q: "Где ударение в слове mezon (дом)?", opts: ["МЭзон", "мэзОн"], a: "мэзОн", why: "ударение всегда на последнем слоге", lang: "x" },
  { k: "input", q: "Соедини правильно: le + ami", a: ["l'ami"], why: "le перед гласной теряет e: l'ami", hint: "короткое слово на -e перед гласной теряет свою e" },
  { k: "input", q: "Соедини правильно: je + emem (я люблю)", a: ["j'emem"], why: "je перед гласной → j'" },
  { k: "choice", q: "Как звучит lez ami (друзья)?", opts: ["«лэз» — пауза — «ами»", "«лэзами» — слитно"], a: "«лэзами» — слитно", why: "z прилипает к следующей гласной", lang: "x" },
  { k: "listen", say: "soley", opts: ["soley", "solay", "sole"], a: "soley", why: "ey — «эй»: «солэй»" },
  { k: "listen", say: "etoil", q: "Послушай и напиши слово", a: ["etoil"], why: "«этуаль»: э + oi (уа) + ль", hint: "«уа» пишется oi" },
];

// ================================================================ 2. Существительное
more.sush = `
<h3>Почему так</h3>
<p>В русском у слова «звезда» двенадцать форм (звезда, звезды, звезде, звездой… звёздам, звёздами…). В Etoilal — <b>одна</b>: [[etoil]]. Всё остальное делают маленькие слова вокруг: артикль показывает «один / много» и «известный / новый», предлог — «где, куда, с чем».</p>
> Je voiyem l'etoil. :: Я вижу звезду. (по-русски «звезду», здесь — та же etoil)
> Je pansem a l'etoil. :: Я думаю о звезде.
> avek lez etoil :: со звёздами
<h3>le или un?</h3>
<p>В русском артиклей нет, поэтому сначала непривычно. Простое правило: <b>un</b> — когда говоришь о чём-то <b>впервые</b> («какой-то, один»), <b>le</b> — когда уже понятно, о чём речь («тот самый, этот»).</p>
> Un cha dormet. Le cha eset joli. :: (Какая-то) кошка спит. (Эта) кошка красивая.
<h3>Как в русском, а как нет</h3>
<p>«Много» в русском показывает окончание слова (звезда → звёзд<b>ы</b>), а в Etoilal — <b>z у маленького слова перед ним</b>, само слово не трогаем. Если перед словом стоит число — z нигде не нужна: [[troi etoil]].</p>
<h3>Частые ошибки</h3>
<p>• Добавлять z к самому слову: <s>lez etoilz</s> → [[lez etoil]]. • Забывать z у «мой, этот»: <s>ma ami</s> (когда друзей много) → [[maz ami]]. • Ставить артикль после числа: <s>troi lez etoil</s> → [[troi etoil]].</p>`;
ex.sush = [
  { k: "input", q: "звёзды (те самые)", a: ["lez etoil"], why: "le + z, слово не меняется", hint: "много — z у маленького слова" },
  { k: "input", q: "какие-то друзья", a: ["unz ami"], why: "un + z" },
  { k: "choice", q: "«мои братья» — как правильно?", opts: ["ma frerz", "maz frer", "maz frerz"], a: "maz frer", why: "z только у маленького слова, frer не меняется" },
  { k: "input", q: "три звезды", a: ["troi etoil"], why: "после числа артикль не нужен, слово не меняется" },
  { k: "fix", q: "Lez etoilz briyel.", a: ["Lez etoil briyel."], why: "само слово не получает z", hint: "посмотри на само слово «звезда»" },
  { k: "tiles", q: "Дом моего брата", a: "le mezon de ma frer", d: ["lez", "a"], why: "чьё — через de" },
  { k: "choice", q: "Как сказать «подруга»?", opts: ["ami", "amiela", "amiz"], a: "amiela", why: "женский род живых — -ela" },
  { k: "input", q: "(какая-то) кошка", a: ["un cha"], why: "un — о чём-то новом" },
  { k: "fix", q: "Le ami chantet.", a: ["L'ami chantet."], why: "le перед гласной → l'" },
];

// ================================================================ 3. Местоимения
more.mest = `
<h3>Почему такой порядок</h3>
<p>В русском можно сказать «я тебе его даю», «я его тебе даю», «даю я его тебе». В Etoilal порядок <b>один</b>, поэтому никогда не нужно думать: <b>кто → кого → кому → глагол</b>. Это как формула.</p>
> Je lo tey donem. :: Я его тебе даю.
> Tu la mey donis. :: Ты мне её дал.
> Il lo ney donret. :: Он нам его даст. (нам — ney, а не no: no — это «нас»)
<h3>Как запомнить таблицу</h3>
<p>• «кого»: я — <b>mo</b>, ты — <b>to</b>, он — <b>lo</b>, она — <b>la</b> (все на -o / -a). • «кому»: <b>mey, tey, ley</b> (все на -ey), мы — <b>ney</b>, вы — <b>vey</b>, они — <b>leyz</b>. • «чей»: <b>ma, ta, sa</b>, много — с z: <b>maz, taz, saz</b>.</p>
<h3>Как в русском, а как нет</h3>
<p>В русском «его» стоит после глагола («люблю его»), в Etoilal — <b>перед</b>: [[Je lo emem.]] Как во французском <i>je l'aime</i>, только без слияния: [[lo]] кончается на -o, а не на -e.</p>
<p><b>ma</b> «мой» не меняется по роду: [[ma frer]] — мой брат, [[ma seur]] — моя сестра.</p>
<h3>Частые ошибки</h3>
<p>• Ставить «его» после глагола: <s>Je emem lo</s> → [[Je lo emem.]] • Путать «кого» и «кому»: <s>Je mo donem</s> (я меня даю) → [[Il lo mey donet.]] (он его мне даёт).</p>`;
ex.mest = [
  { k: "input", q: "Я тебя люблю.", a: ["Je to emem."], why: "кого (to) — перед глаголом" },
  { k: "input", q: "Он меня любит.", a: ["Il mo emet."], why: "mo — меня" },
  { k: "tiles", q: "Я тебе его даю.", a: "Je lo tey donem", d: ["mey", "to"], why: "кто → кого → кому → глагол" },
  { k: "fix", q: "Je emem lo.", a: ["Je lo emem."], why: "«его» стоит перед глаголом", hint: "где стоит «его»?" },
  { k: "choice", q: "«мои друзья»", opts: ["ma ami", "maz ami", "mey ami"], a: "maz ami", why: "чей + z, когда много" },
  { k: "choice", q: "«ей» (кому?)", opts: ["la", "ley", "ela"], a: "ley", why: "кому — на -ey" },
  { k: "input", q: "Ты мне её дал.", a: ["Tu la mey donis."], why: "la (её) → mey (мне) → donis" },
  { k: "choice", q: "«А я — мечтаю»", opts: ["Moi, je revem.", "Mo, je revem.", "Mey, je revem."], a: "Moi, je revem.", why: "выделенное «я» — moi" },
  { k: "input", q: "наш дом", a: ["nota mezon"], why: "наш — nota" },
];

// ================================================================ 4. Прилагательные
more.pril = `
<h3>Почему прилагательное после</h3>
<p>Так звучит красиво и по-французски: главное слово — сначала, его описание — потом. Но если поставить прилагательное <b>перед</b> словом, оно начинает звучать как в стихах — с чувством. Одно правило для всех прилагательных, никаких списков.</p>
> un mezon gran :: большой дом (просто размер)
> un gran mezon :: великий, величественный дом (с чувством)
> un ami bon :: хороший друг (просто факт)
> un bon ami :: добрый, верный друг
<h3>Как в русском, а как нет</h3>
<p>В русском прилагательное меняется: «большой дом, большая звезда, большие звёзды». В Etoilal [[gran]] — всегда [[gran]]: [[le mezon gran]], [[l'etoil gran]], [[lez etoil gran]].</p>
<p>«Лучше, хуже, больше» в русском — отдельные слова. В Etoilal — всегда <b>plu</b> + прилагательное: «лучше» = [[plu bon]], «больше» = [[plu gran]].</p>
> Se livr eset plu bon ke sela. :: Эта книга лучше той.
> Ma seur eset le plu jeun. :: Моя сестра — самая младшая.
<h3>Частые ошибки</h3>
<p>• Менять прилагательное: <s>lez etoil granz</s> → [[lez etoil gran]]. • Забывать ke: <s>plu gran moi</s> → [[plu gran ke moi]]. • «чем» по-русски часто пропускают («выше брата»), здесь [[ke]] обязателен.</p>`;
ex.pril = [
  { k: "input", q: "большая собака (просто размер)", a: ["un chyen gran"], why: "прилагательное после — факт" },
  { k: "choice", q: "«давний друг» (с чувством)", opts: ["un ami vyeu", "un vyeu ami"], a: "un vyeu ami", why: "перед словом — образно" },
  { k: "input", q: "Луна прекраснее солнца.", a: ["Le lun eset plu bo ke le soley."], why: "plu + прилагательное + ke", hint: "более прекрасная, чем…" },
  { k: "input", q: "самая красивая звезда", a: ["le plu joli etoil", "l'etoil le plu joli"], why: "le plu = самый" },
  { k: "fix", q: "Lez etoil granz briyel.", a: ["Lez etoil gran briyel."], why: "прилагательное не меняется" },
  { k: "input", q: "быстро (наречие от rapid)", a: ["rapidman"], why: "+ man" },
  { k: "tiles", q: "Он меньше быстрый, чем я.", a: "Il eset mouen rapid ke moi", d: ["plu", "a"], why: "mouen — менее" },
  { k: "choice", q: "«лучше»", opts: ["plu bon", "meyeur", "bonplu"], a: "plu bon", why: "всё через plu, исключений нет" },
];

// ================================================================ 5. Глагол
more.glag = `
<h3>Почему кусочки</h3>
<p>В русском у глагола десятки окончаний, и они разные у разных глаголов (пишу, пишешь / сижу, сидишь / хочу, хочешь…). В Etoilal <b>одна схема для всех</b>. Выучив 6 букв «кто» и 6 кусочков «когда», ты знаешь <b>все</b> формы <b>всех</b> глаголов.</p>
<h3>Разбор на примере</h3>
> chant-i-ri-m :: петь + было + бы + я = «я бы спел (тогда)»
> dans-re-pe-n :: танцевать + будет + наверное + мы = «мы, наверное, будем танцевать»
> manj-u-s :: есть + только что + ты = «ты только что поел»
<p>Читай слово <b>с конца</b>: последняя буква — кто, перед ней (если есть) ri/se/pe, перед ними — время, а всё остальное — основа.</p>
<h3>i или a — подробнее</h3>
<p>Спроси себя: <b>«что сделал?»</b> (один раз, закончено) — <b>i</b>; <b>«что делал?»</b> (долго, привычка, фон) — <b>a</b>.</p>
> Yer je lizim un livr. :: Вчера я прочитал книгу. (дочитал)
> Le soir je lizam. :: По вечерам я читал. (привычка)
> Je lizam kan tu venis. :: Я читал, когда ты пришёл. (читал — фон, пришёл — событие)
<h3>re, o и u</h3>
<p><b>re</b> — просто будущее («спою, буду петь»). <b>o</b> — «вот-вот, сейчас начну»: [[Je partom!]] «Я ухожу (уже на пороге)». <b>u</b> — «только что»: [[Il venut.]] «Он только что пришёл». В русском для этого нужны отдельные слова, здесь — одна буква.</p>
<h3>Как в русском, а как нет</h3>
<p>В русском прошедшее меняется по роду («пел / пела»), здесь — нет: [[chantit]] — и «он спел», и «она спела». Зато «кто» видно всегда, даже в прошедшем: [[chantim]] — я спел, [[chantis]] — ты спел.</p>
<h3>Частые ошибки</h3>
<p>• Забыть «кто»: <s>chanti</s> → [[chantit]]. • Перепутать порядок: <s>chantrie</s>, <s>chantmi</s> — порядок всегда основа → время → (ri/se/pe) → кто. • Писать будущее с e: <s>chanterem</s> — это «пел бы», а «спою» — [[chantrem]].</p>`;
ex.glag = [
  { k: "input", q: "петь · было (раз) · я → «я спел»", a: ["chantim"], why: "chant + i + m" },
  { k: "input", q: "танцевать · будет · мы", a: ["dansren"], why: "dans + re + n" },
  { k: "input", q: "есть (пищу) · только что · ты", a: ["manjus"], why: "manj + u + s" },
  { k: "choice", q: "Что значит chantal?", opts: ["они пели (долго)", "они споют", "он пел"], a: "они пели (долго)", why: "a — было долго, l — они", lang: "x" },
  { k: "choice", q: "Что значит dansepes?", opts: ["ты, наверное, танцуешь", "пусть ты танцуешь", "ты танцевал бы"], a: "ты, наверное, танцуешь", why: "pe — наверное, s — ты", lang: "x" },
  { k: "input", q: "я пел бы (сейчас)", a: ["chanterim"], why: "chant + e + ri + m" },
  { k: "fix", q: "Il chanti un chanson.", a: ["Il chantit un chanson."], why: "в конце всегда буква «кто»" },
  { k: "input", q: "Пой!", a: ["Chante!"], why: "приказ: основа + e" },
  { k: "input", q: "Давай споём!", a: ["Chanten!"], why: "«давай» — форма «мы»" },
  { k: "choice", q: "«спетый»", opts: ["chantant", "chantey", "chantet"], a: "chantey", why: "-ey — «-нный, -тый»; -ant — «-ущий»" },
];

// ================================================================ 6. Быть, иметь
more.byt = `
<h3>Почему «быть» нельзя пропускать</h3>
<p>В русском говорят «Он учитель», «Я дома», пропуская «есть». В Etoilal глагол всегда на месте: [[Il eset metr.]] (он есть учитель). Зато он совершенно обычный — меняется по той же схеме, что и все.</p>
> J'esem isi. :: Я здесь.
> Tu eses eureu? :: Ты счастлив?
> Nou esren ansanbl. :: Мы будем вместе.
<h3>«У меня есть» = «я имею»</h3>
<p>В русском «у меня есть брат», а в Etoilal, как во французском, — «я имею брата»: [[J'avem un frer.]] Возраст тоже «имеют»: [[J'avem deudis an.]] — мне двадцать лет.</p>
<h3>Частые ошибки</h3>
<p>• Пропустить «быть»: <s>Il metr.</s> → [[Il eset metr.]] • Сказать «у меня» дословно: <s>Che moi eset un frer</s> → [[J'avem un frer.]] • Забыть слияние: <s>je esem</s> → [[j'esem]].</p>`;
ex.byt = [
  { k: "input", q: "Он учитель.", a: ["Il eset metr.", "Il eset un metr."], why: "«быть» нельзя пропускать" },
  { k: "input", q: "Я здесь.", a: ["J'esem isi."], why: "je + esem → j'esem" },
  { k: "input", q: "У меня есть брат.", a: ["J'avem un frer."], why: "«у меня есть» = «я имею»" },
  { k: "fix", q: "Je esem eureu.", a: ["J'esem eureu."], why: "je перед гласной → j'" },
  { k: "choice", q: "«Мы были (долго) дома / вместе»", opts: ["Nou esan ansanbl.", "Nou esin ansanbl.", "Nou esren ansanbl."], a: "Nou esan ansanbl.", why: "a — было долго" },
  { k: "input", q: "Сколько тебе лет?", a: ["Konbyen d'an tu aves?"], why: "сколько лет ты имеешь" },
  { k: "tiles", q: "Мои друзья здесь.", a: "Maz ami esel isi", d: ["eset", "ma"], why: "много друзей → maz, esel (они)" },
  { k: "fix", q: "Il metr.", a: ["Il eset metr.", "Il eset un metr."], why: "нужен глагол «быть»" },
];

// ================================================================ 7. Отрицание
more.ne = `
<h3>Почему «не» после глагола</h3>
<p>Так короче и ровнее звучит: сначала говоришь действие, а потом — «нет». Как в разговорном французском <i>je sais pas</i>. И одно слово вместо двух: в русском «никто <b>не</b> поёт», «ничего <b>не</b> вижу» — два отрицания, здесь одно.</p>
> Je chantem pa. :: Я не пою.
> Je chantim pa. :: Я не спел.
> Je lo voiyem pa. :: Я его не вижу. (lo — перед глаголом, pa — после)
> Persone venit. :: Никто не пришёл.
<h3>Вопросы подробнее</h3>
<p>Вопросительное слово ставь в начало, а дальше — обычный порядок: [[Ou tu ales?]] «Куда ты идёшь?», [[Kan tu partres?]] «Когда ты уйдёшь?». С <b>eske</b> можно превратить в вопрос любое утверждение, ничего не переставляя.</p>
<h3>Частые ошибки</h3>
<p>• Ставить pa перед глаголом, как русское «не»: <s>Je pa savem</s> → [[Je savem pa.]] • Добавлять второе «не»: <s>Persone chantet pa</s> → [[Persone chantet.]]</p>`;
ex.ne = [
  { k: "input", q: "Я не знаю.", a: ["Je savem pa."], why: "pa — после глагола" },
  { k: "fix", q: "Je pa savem.", a: ["Je savem pa."], why: "pa — после глагола" },
  { k: "input", q: "Он никогда не поёт.", a: ["Il chantet jame."], why: "jame — после глагола" },
  { k: "input", q: "Ничего не вижу.", a: ["Je voiyem ryen.", "Voiyem ryen."], why: "ryen — после глагола" },
  { k: "choice", q: "«Никто не поёт»", opts: ["Persone chantet.", "Persone chantet pa.", "Chantet persone pa."], a: "Persone chantet.", why: "второе «не» не нужно" },
  { k: "input", q: "Где ты живёшь?", a: ["Ou tu vives?"], why: "вопросительное слово — в начало" },
  { k: "tiles", q: "Ты его любишь? (с частицей)", a: "Eske tu lo emes", d: ["pa", "mo"], why: "eske в начале" },
  { k: "choice", q: "«почему»", opts: ["koman", "pourkoi", "kan"], a: "pourkoi", why: "koman — как, kan — когда" },
  { k: "input", q: "Я его не вижу.", a: ["Je lo voiyem pa."], why: "lo — перед глаголом, pa — после" },
];

// ================================================================ 8. Предлоги и союзы
more.mal = `
<h3>Почему без падежей хватает предлогов</h3>
<p>Русские падежи сами говорят «где, куда, с чем» (в доме, к дому, с домом). В Etoilal слово не меняется, поэтому эту работу делают предлоги — их чуть больше, и каждый значит одно.</p>
> dans le mezon :: в доме
> a le mezon :: к дому, в дом (куда)
> avek ma frer :: с моим братом
> sans toi :: без тебя
> sou le tabl :: под столом
<h3>«чтобы» и «который»</h3>
<p>«Чтобы» = [[ke]] + глагол с кусочком <b>se</b>: [[Je voulem ke tu chanteses.]] — «Я хочу, чтобы ты пел». <b>ki</b> / <b>ke</b> для «который»: если «который» сам что-то делает — [[ki]]; если с ним что-то делают — [[ke]].</p>
> l'anfan ki dormet :: ребёнок, который спит
> le chanson ke je chantem :: песня, которую я пою
<h3>Частые ошибки</h3>
<p>• Использовать dans для «куда»: «иду в школу» — [[a l'ekol]], а «в школе» — [[dans l'ekol]]. • Путать ki и ke: <s>le chanson ki je chantem</s> → [[le chanson ke je chantem]].</p>`;
ex.mal = [
  { k: "input", q: "под столом", a: ["sou le tabl"], why: "sou — под" },
  { k: "input", q: "с моим братом", a: ["avek ma frer"], why: "avek — с (вместе)" },
  { k: "choice", q: "«без тебя»", opts: ["sans toi", "sans to", "sans tu"], a: "sans toi", why: "после предлога — выделенное toi" },
  { k: "choice", q: "«песня, которую я пою»", opts: ["le chanson ki je chantem", "le chanson ke je chantem"], a: "le chanson ke je chantem", why: "с песней что-то делают → ke" },
  { k: "choice", q: "«ребёнок, который спит»", opts: ["l'anfan ki dormet", "l'anfan ke dormet"], a: "l'anfan ki dormet", why: "ребёнок сам спит → ki" },
  { k: "input", q: "Я хочу, чтобы ты пел.", a: ["Je voulem ke tu chanteses."], why: "ke + кусочек se" },
  { k: "tiles", q: "Я пою, потому что я счастлив.", a: "Je chantem pask j'esem eureu", d: ["si", "ke"], why: "pask — потому что" },
  { k: "input", q: "Если бы ты пришёл, я бы спел.", a: ["Si tu veniris, je chantirim."], why: "si + форма с ri в обеих частях" },
  { k: "choice", q: "«хотя»", opts: ["byenke", "pask", "donk"], a: "byenke", why: "pask — потому что, donk — значит" },
];

// ================================================================ 9. Числа
more.chis = `
<h3>Почему по десяткам</h3>
<p>Во французском 70 — «шестьдесят-десять», 80 — «четыре-двадцать», 90 — «четыре-двадцать-десять». В Etoilal всё как в таблице умножения: <b>число десятков + dis</b>.</p>
> setdis :: 70 (семь-десять)
> uitdis :: 80 (восемь-десять)
> neufdis :: 90 (девять-десять)
<h3>Как в русском, а как нет</h3>
<p>В русском после числа слово меняется: «одна звезда, две звезды, пять звёзд». В Etoilal — никогда: [[un etoil]], [[deu etoil]], [[senk etoil]].</p>
<h3>Разбор большого числа</h3>
<p>Читай по частям, как в русском: тысячи → сотни → десятки → единицы. 1984 = [[mil neuf sent uitdis katr]]. Десятки пишутся слитно (uitdis), всё остальное — раздельно.</p>
<h3>Частые ошибки</h3>
<p>• Писать десятки раздельно: <s>deu dis</s> → [[deudis]]. • Ставить z после числа: <s>troi etoilz</s> → [[troi etoil]].</p>`;
ex.chis = [
  { k: "input", q: "20", a: ["deudis"], why: "два-десять, слитно" },
  { k: "input", q: "15", a: ["dis senk"], why: "десять, потом пять — раздельно" },
  { k: "input", q: "70", a: ["setdis"], why: "семь-десять" },
  { k: "input", q: "100", a: ["sent"], why: "sent — сто" },
  { k: "input", q: "342", a: ["troi sent katrdis deu"], why: "сотни — десятки — единицы" },
  { k: "choice", q: "Что значит neufdis neuf?", opts: ["99", "909", "81"], a: "99", why: "девять-десять девять", lang: "x" },
  { k: "input", q: "пять звёзд", a: ["senk etoil"], why: "после числа слово не меняется" },
  { k: "input", q: "2000", a: ["deu mil"], why: "два + тысяча" },
];

// ================================================================ 10. Слова из кусочков
more.slova = `
<h3>Почему это удобно</h3>
<p>Знаешь одно слово — знаешь целую семью. От [[chanter]] «петь»: [[chanteur]] певец, [[chanteurela]] певица, [[chantant]] поющий, [[chantey]] спетый. От [[mezon]] «дом»: [[mezonou]] домик, [[mezonach]] домище, [[mezonik]] домашний.</p>
<h3>Как в русском</h3>
<p>Очень похоже на русские суффиксы: дом → дом<b>ик</b> → дом<b>ище</b> → дом<b>ашний</b>. Только в русском их много и они капризные (домик, но котёнок, книжка), а в Etoilal для «маленького» всегда <b>-ou</b>: [[mezonou]], [[chaou]], [[livrou]].</p>
<h3>Можно склеить несколько</h3>
<p>Кусочки можно ставить друг за другом: [[chant]] → [[chanteur]] (певец) → [[chanteurela]] (певица). [[danseur]] (танцор) → [[danseurela]] (танцовщица).</p>
<h3>Частые ошибки</h3>
<p>• Ставить -ela к вещам: -ela только для живых. • Путать -ou и -ach: -ou — маленький, милый; -ach — большой, грубый.</p>`;
ex.slova = [
  { k: "input", q: "mezon — дом. А «домик»?", a: ["mezonou"], why: "-ou — маленький" },
  { k: "input", q: "mezon — дом. А «домище»?", a: ["mezonach"], why: "-ach — большой" },
  { k: "input", q: "danseur — танцор. А «танцовщица»?", a: ["danseurela"], why: "-ela — женский род" },
  { k: "choice", q: "Что значит chanteur?", opts: ["певец", "песня", "поющий"], a: "певец", why: "-eur — тот, кто делает", lang: "x" },
  { k: "choice", q: "Что значит syelik?", opts: ["небесный", "небо", "небушко"], a: "небесный", why: "-ik — относящийся к", lang: "x" },
  { k: "input", q: "dous — мягкий. А «мягко»?", a: ["dousman"], why: "-man — наречие" },
  { k: "input", q: "cha — кошка. А «котёнок»?", a: ["chaou"], why: "-ou — маленький, ласковый" },
  { k: "choice", q: "Что значит relizer?", opts: ["перечитывать", "читатель", "нечитаемый"], a: "перечитывать", why: "re- — снова", lang: "x" },
];

// ================================================================ 11. Частые слова
more.obih = `
<h3>Где ставить слова «когда»</h3>
<p>[[ojourdui]], [[demen]], [[yer]] обычно стоят в начале или в конце фразы — как в русском: [[Demen nou alren a le park.]] «Завтра мы пойдём в парк».</p>
<p>[[tre]] «очень» — перед прилагательным: [[tre bo]]. [[boku]] «много»: [[Il travayet boku.]] — он много работает.</p>
<h3>Вежливость</h3>
> Bonjour! Koman tu ales? :: Здравствуй! Как дела?
> Mersi, tre byen. :: Спасибо, очень хорошо.
> Un kafe, silvouple. :: Кофе, пожалуйста.
> Orevoir! :: До свидания!`;
ex.obih = [
  { k: "input", q: "спасибо", a: ["mersi"], why: "mersi" },
  { k: "input", q: "завтра", a: ["demen"], why: "demen" },
  { k: "choice", q: "«вчера»", opts: ["yer", "demen", "ojourdui"], a: "yer", why: "demen — завтра, ojourdui — сегодня" },
  { k: "choice", q: "«очень красивый»", opts: ["tre bo", "boku bo", "bo tre"], a: "tre bo", why: "tre — перед прилагательным" },
  { k: "input", q: "Как дела?", a: ["Koman tu ales?"], why: "как ты идёшь" },
  { k: "input", q: "пожалуйста", a: ["silvouple"], why: "silvouple" },
  { k: "choice", q: "«здесь»", opts: ["isi", "laba", "ensi"], a: "isi", why: "laba — там" },
  { k: "input", q: "Кофе, пожалуйста.", a: ["Un kafe, silvouple."], why: "un kafe" },
];

// ================================================================ 12. Стили
more.stil = `
<h3>Когда какой</h3>
<p>Разговорный — для переписки, разговоров, дневника. Высокий — для песен, легенд, торжественных слов. Ошибки нет ни там, ни там: [[Tu chantes?]] и [[Chantes tu?]] — обе формы правильные.</p>
> Ou tu ales? :: Куда идёшь? (разговорный)
> Ou ales tu? :: Куда идёшь ты? (высокий)`;
ex.stil = [
  { k: "choice", q: "Какой вопрос — высокого стиля?", opts: ["Tu chantes?", "Chantes tu?"], a: "Chantes tu?", why: "глагол вперёд — высокий стиль" },
  { k: "choice", q: "«мрачная (страшная) ночь» — образно", opts: ["un nui sonbr", "un sonbr nui"], a: "un sonbr nui", why: "прилагательное перед словом — образно" },
  { k: "input", q: "Вижу звёзды. (без «я»)", a: ["Voiyem lez etoil."], why: "в разговорной речи подлежащее можно опустить" },
  { k: "input", q: "Куда идёшь ты? (высокий стиль)", a: ["Ou ales tu?"], why: "глагол вперёд" },
];

// ================================================================ 13. Итог
ex.itog = [
  { k: "input", q: "Я тебя люблю.", a: ["Je to emem."], why: "кто → кого → глагол", ref: "mest" },
  { k: "input", q: "Мы не поём.", a: ["Nou chanten pa."], why: "pa — после глагола", ref: "ne" },
  { k: "input", q: "мои звёзды", a: ["maz etoil"], why: "ma + z", ref: "sush" },
  { k: "input", q: "они споют", a: ["chantrel"], why: "chant + re + l", ref: "glag" },
  { k: "input", q: "Соедини: le + etoil", a: ["l'etoil"], why: "слияние", ref: "zvuki" },
  { k: "input", q: "70", a: ["setdis"], why: "семь-десять", ref: "chis" },
  { k: "choice", q: "Как читается soir?", opts: ["сойр", "суар", "соир"], a: "суар", why: "oi — «уа»", ref: "zvuki", lang: "x" },
  { k: "input", q: "Он, наверное, спит.", a: ["Il dormepet."], why: "pe — наверное", ref: "glag" },
  { k: "input", q: "Луна прекраснее солнца.", a: ["Le lun eset plu bo ke le soley."], why: "plu … ke", ref: "pril" },
  { k: "input", q: "У меня есть брат.", a: ["J'avem un frer."], why: "я имею", ref: "byt" },
];

for (const c of A.cheat) { if (more[c.id]) c.more = more[c.id]; c.ex = (ex[c.id] || []).map((x) => ({ ref: c.id, ...x })); }

// ================================================================ задания после текстов (номер текста → задания)
A.textEx = {
  1: [{ k: "choice", q: "Что значит vivem?", opts: ["я живу", "мы живём", "он живёт"], a: "я живу", why: "m — я", lang: "x", ref: "glag" },
      { k: "input", q: "Мой брат работает.", a: ["Ma frer travayet."], why: "t — он", ref: "glag" },
      { k: "tiles", q: "Вечером мы гуляем в парке.", a: "Le soir nou promnen dans le park", d: ["promnem", "a"], why: "n — мы", ref: "glag" },
      { k: "choice", q: "Кем работает брат Лео?", opts: ["учитель", "певец", "врач"], a: "учитель", why: "Il eset metr", lang: "x" },
      { k: "listen", say: "Je vivem dans un vil gran.", opts: ["Je vivem dans un vil gran.", "Je vives dans un vil gran.", "Nou viven dans un vil gran."], a: "Je vivem dans un vil gran.", why: "vivem — «я живу»" }],
  2: [{ k: "input", q: "Дети поют.", a: ["Lez anfan chantel."], why: "lez + l (они)", ref: "sush" },
      { k: "choice", q: "Где спит кошка?", opts: ["на столе", "в саду", "под столом"], a: "на столе", why: "sur le tabl", lang: "x" },
      { k: "input", q: "наш дом", a: ["nota mezon"], why: "nota — наш", ref: "mest" },
      { k: "fix", q: "Maz amiz esel isi.", a: ["Maz ami esel isi."], why: "само слово не меняется", ref: "sush" },
      { k: "tiles", q: "Большая собака играет.", a: "Le chyen gran jouet", d: ["granz", "jouel"], why: "прилагательное после", ref: "pril" }],
  3: [{ k: "choice", q: "voiyim — это…", opts: ["я увидел (раз)", "я видел (долго)", "я увижу"], a: "я увидел (раз)", why: "i — один раз", lang: "x", ref: "glag" },
      { k: "input", q: "Мы поели вместе.", a: ["Nou manjin ansanbl."], why: "i — было, n — мы", ref: "glag" },
      { k: "choice", q: "«птицы пели» (фон, долго)", opts: ["lez oizo chantil", "lez oizo chantal"], a: "lez oizo chantal", why: "a — длилось", ref: "glag" },
      { k: "input", q: "Моя сестра спела песню.", a: ["Ma seur chantit un chanson."], why: "chant + i + t", ref: "glag" },
      { k: "input", q: "Когда я был ребёнком…", a: ["Kan j'esam anfan"], why: "esam — был (долго)", ref: "byt" }],
  4: [{ k: "input", q: "Мы пойдём к бабушке.", a: ["Nou alren che ma granmer."], why: "re — будет", ref: "glag" },
      { k: "choice", q: "venut — это…", opts: ["только что пришла", "придёт", "сейчас придёт"], a: "только что пришла", why: "u — только что", lang: "x", ref: "glag" },
      { k: "input", q: "Я сейчас (вот-вот) поем.", a: ["Je manjom."], why: "o — вот-вот", ref: "glag" },
      { k: "input", q: "Они будут петь вместе.", a: ["Ilz chantrel ansanbl.", "Elz chantrel ansanbl."], why: "re + l", ref: "glag" },
      { k: "listen", say: "Je partom!", q: "Послушай и напиши", a: ["Je partom!"], why: "part + o + m" }],
  5: [{ k: "input", q: "Я не люблю снег.", a: ["J'emem pa le nej."], why: "pa после глагола", ref: "ne" },
      { k: "fix", q: "Je pa emem le plui.", a: ["J'emem pa le plui."], why: "pa после глагола + слияние", ref: "ne" },
      { k: "input", q: "Где ты живёшь?", a: ["Ou tu vives?"], why: "ou — где", ref: "ne" },
      { k: "choice", q: "Il revnit jame — это…", opts: ["Он так и не вернулся", "Он всегда возвращался", "Он вернётся"], a: "Он так и не вернулся", why: "jame — никогда", lang: "x" },
      { k: "tiles", q: "Да, я его люблю.", a: "Oui je lo emem", d: ["pa", "la"], why: "lo — перед глаголом", ref: "mest" }],
  6: [{ k: "input", q: "Он меня любит.", a: ["Il mo emet."], why: "mo — меня", ref: "mest" },
      { k: "tiles", q: "Я тебе её даю.", a: "Je la tey donem", d: ["to", "mey"], why: "кого → кому → глагол", ref: "mest" },
      { k: "input", q: "Мой брат мне её (книгу) дал.", a: ["Ma frer lo mey donit."], why: "о вещах — lo (он)", ref: "mest" },
      { k: "choice", q: "«А я не читаю» — первое слово", opts: ["Moi", "Mo", "Mey"], a: "Moi", why: "выделенное — moi", ref: "mest" },
      { k: "fix", q: "Je donem lo tey.", a: ["Je lo tey donem."], why: "кого и кому — перед глаголом", ref: "mest" }],
  7: [{ k: "input", q: "У меня три брата.", a: ["J'avem troi frer."], why: "я имею три брата", ref: "byt" },
      { k: "input", q: "Мне двадцать лет.", a: ["J'avem deudis an."], why: "я имею двадцать лет", ref: "chis" },
      { k: "input", q: "Он больше меня.", a: ["Il eset plu gran ke moi."], why: "plu … ke", ref: "pril" },
      { k: "choice", q: "Сколько братьев у героя?", opts: ["3", "2", "21"], a: "3", why: "troi frer", lang: "x" },
      { k: "tiles", q: "Луна прекраснее солнца.", a: "Le lun eset plu bo ke le soley", d: ["mouen", "a"], why: "plu — более", ref: "pril" }],
  8: [{ k: "input", q: "Он, наверное, спит.", a: ["Il dormepet."], why: "pe — наверное", ref: "glag" },
      { k: "input", q: "Пусть спит!", a: ["Il dormeset!", "Dormeset!"], why: "se — пусть", ref: "glag" },
      { k: "input", q: "Если бы ты пришёл, я бы спел.", a: ["Si tu veniris, je chantirim."], why: "i + ri: «бы» про прошлое", ref: "glag" },
      { k: "choice", q: "manjipet — это…", opts: ["наверное, съела", "пусть съест", "съела бы"], a: "наверное, съела", why: "i — было, pe — наверное", lang: "x" },
      { k: "input", q: "Я хочу, чтобы ты пел.", a: ["Je voulem ke tu chanteses."], why: "ke + se", ref: "mal" }],
  9: [{ k: "choice", q: "«друг, который поёт»", opts: ["l'ami ki chantet", "l'ami ke chantet"], a: "l'ami ki chantet", why: "сам делает — ki", ref: "mal" },
      { k: "input", q: "книга, которую я читаю", a: ["le livr ke je lizem"], why: "с ней делают — ke", ref: "mal" },
      { k: "input", q: "Я пою, потому что я счастлив.", a: ["Je chantem pask j'esem eureu."], why: "pask — потому что", ref: "mal" },
      { k: "input", q: "Песня была спета ребёнком.", a: ["Le chanson esit chantey par l'anfan."], why: "быть + -ey + par", ref: "glag" },
      { k: "tiles", q: "Хотя идёт дождь, мы гуляем.", a: "Byenke le plui tonbet nou promnen", d: ["pask", "si"], why: "byenke — хотя", ref: "mal" }],
  10: [{ k: "choice", q: "Кто пел в сказке?", opts: ["звезда", "ребёнок", "луна"], a: "звезда", why: "un etoil chantat", lang: "x" },
       { k: "input", q: "Ребёнок засмеялся.", a: ["L'anfan rizit."], why: "riz + i + t", ref: "glag" },
       { k: "input", q: "Я пою для тебя.", a: ["Je chantem pour toi."], why: "pour toi", ref: "mal" },
       { k: "choice", q: "regardat — это…", opts: ["смотрел (долго)", "посмотрел (раз)", "смотрит"], a: "смотрел (долго)", why: "a — длилось", lang: "x", ref: "glag" },
       { k: "listen", say: "Ki chantet?", q: "Послушай и напиши", a: ["Ki chantet?"], why: "«Кто поёт?»" }],
};

// ================================================================ новые тексты 11–15
A.texts.push(
{ t: "На кухне", s: "приказ: пой! давай! идите!", hint: "new", note: "Приказ — основа + e (одному), форма «мы» — «давай», форма «вы» — «идите, сделайте».", lines: [
  ["Maman, vene isi!", "Мама, иди сюда!", "Maman ven-e isi", "мама прийти-приказ здесь"],
  ["Prepare le soup, silvouple.", "Приготовь суп, пожалуйста.", "Prepar-e le soup silvouple", "готовить-приказ тот суп пожалуйста"],
  ["Lez anfan, lavez lez pom!", "Дети, помойте яблоки!", "Le-z anfan lav-e-z le-z pom", "тот-много ребёнок мыть-приказ-вы тот-много яблоко"],
  ["Manjen ansanbl!", "Давайте поедим вместе!", "Manj-e-n ansanbl", "есть-приказ-мы вместе"],
  ["Ekoute, le kafe eset cho.", "Слушай, кофе горячий.", "Ekout-e le kafe es-e-t cho", "слушать-приказ тот кофе быть-сейчас-он горячий"]] },
{ t: "Где что?", s: "предлоги", hint: "new", note: "Слово не меняется — «где» показывает предлог: sur на, sou под, dans в, deryer за, pre возле.", lines: [
  ["Le cha dormet sou le tabl.", "Кошка спит под столом.", "Le cha dorm-e-t sou le tabl", "тот кошка спать-сейчас-она под тот стол"],
  ["Le livr eset sur le tabl.", "Книга на столе.", "Le livr es-e-t sur le tabl", "тот книга быть-сейчас-она на тот стол"],
  ["Le boulanjri eset deryer le park.", "Пекарня за парком.", "Le boulanjri es-e-t deryer le park", "тот пекарня быть-сейчас-она за тот парк"],
  ["Ma ekol eset pre ma mezon.", "Моя школа возле моего дома.", "Ma ekol es-e-t pre ma mezon", "мой школа быть-сейчас-она возле мой дом"],
  ["Lez oizo volel otour l'arbr.", "Птицы летают вокруг дерева.", "Le-z oizo vol-e-l otour l'+arbr", "тот-много птица летать-сейчас-они вокруг тот+дерево"],
  ["Je partem avek ma frer, me sans ma seur.", "Я ухожу с братом, но без сестры.", "Je part-e-m avek ma frer me sans ma seur", "я уходить-сейчас-я с мой брат но без мой сестра"]] },
{ t: "Котёнок", s: "слова из кусочков", hint: "none", note: "-ou — маленький, -ach — большой, -ela — женский род, -eur — тот, кто делает, -man — «как».", lines: [
  ["Dans le mezonou vivet un chaou.", "В домике живёт котёнок.", "Dans le mezon-ou viv-e-t un cha-ou", "в тот дом-маленький жить-сейчас-он какой_то кошка-маленький"],
  ["Le chaou dormet dousman.", "Котёнок мягко (сладко) спит.", "Le cha-ou dorm-e-t dous-man", "тот кошка-маленький спать-сейчас-он мягкий-как"],
  ["Ma seur eset chanteurela.", "Моя сестра — певица.", "Ma seur es-e-t chant-eur-ela", "мой сестра быть-сейчас-она петь-тот_кто-женщина"],
  ["El chantet pour le chaou.", "Она поёт для котёнка.", "El chant-e-t pour le cha-ou", "она петь-сейчас-она для тот кошка-маленький"],
  ["Le mezonach de ma granmer eset laba.", "Огромный дом моей бабушки — вон там.", "Le mezon-ach de ma granmer es-e-t laba", "тот дом-большой из мой бабушка быть-сейчас-он там"]] },
{ t: "В кафе", s: "быт: заказать, спросить, заплатить", hint: "none", note: "Вежливые слова: silvouple — пожалуйста, mersi — спасибо. Счёт — adisyon, меню — kart.", lines: [
  ["Bonjour! Le kart, silvouple.", "Здравствуйте! Меню, пожалуйста.", "Bonjour Le kart silvouple", "здравствуйте тот меню пожалуйста"],
  ["Je voulem un kafe e un pen.", "Я хочу кофе и хлеб.", "Je voul-e-m un kafe e un pen", "я хотеть-сейчас-я какой_то кофе и какой_то хлеб"],
  ["Vou avez le te?", "У вас есть чай?", "Vou av-e-z le te", "вы иметь-сейчас-вы тот чай"],
  ["Le kafe eset tre bon!", "Кофе очень хороший!", "Le kafe es-e-t tre bon", "тот кофе быть-сейчас-он очень хороший"],
  ["L'adisyon, silvouple. Mersi e orevoir!", "Счёт, пожалуйста. Спасибо и до свидания!", "L'+adisyon silvouple Mersi e orevoir", "тот+счёт пожалуйста спасибо и до_свидания"]] },
{ t: "Песня ночи", s: "высокий стиль", hint: "none", note: "Высокий стиль: прилагательные перед словом (образно), вопрос — глагол вперёд.", lines: [
  ["Ou ales tu, dous etoil?", "Куда идёшь ты, нежная звезда?", "Ou al-e-s tu dous etoil", "куда идти-сейчас-ты ты нежный звезда"],
  ["Le sonbr nui chantet pour toi.", "Мрачная ночь поёт для тебя.", "Le sonbr nui chant-e-t pour toi", "тот мрачный ночь петь-сейчас-она для тебя"],
  ["Je revem d'un bo jour.", "Я мечтаю о прекрасном дне.", "Je rev-e-m d'+un bo jour", "я мечтать-сейчас-я о+какой_то прекрасный день"],
  ["Ma keur danset avek le lun.", "Моё сердце танцует с луной.", "Ma keur dans-e-t avek le lun", "мой сердце танцевать-сейчас-он с тот луна"],
  ["Demen, le soley revnret.", "Завтра солнце вернётся.", "Demen le soley revn-re-t", "завтра тот солнце вернуться-будет-он"]] },
);
Object.assign(A.textEx, {
  11: [{ k: "input", q: "Иди сюда!", a: ["Vene isi!"], why: "приказ: основа + e", ref: "glag" },
       { k: "input", q: "Давай поедим!", a: ["Manjen!"], why: "форма «мы»", ref: "glag" },
       { k: "input", q: "Помойте яблоки!", a: ["Lavez lez pom!"], why: "форма «вы»", ref: "glag" },
       { k: "choice", q: "Ekoute! — это…", opts: ["Слушай!", "Слушаю", "Слушайте!"], a: "Слушай!", why: "основа + e — приказ одному", lang: "x" },
       { k: "listen", say: "Prepare le soup, silvouple.", opts: ["Prepare le soup, silvouple.", "Preparem le soup, silvouple.", "Preparez le soup, silvouple."], a: "Prepare le soup, silvouple.", why: "приказ одному" }],
  12: [{ k: "input", q: "под столом", a: ["sou le tabl"], why: "sou — под", ref: "mal" },
       { k: "input", q: "Книга на столе.", a: ["Le livr eset sur le tabl."], why: "sur — на", ref: "mal" },
       { k: "choice", q: "«за парком»", opts: ["deryer le park", "devant le park", "pre le park"], a: "deryer le park", why: "devant — перед, pre — возле", ref: "mal" },
       { k: "input", q: "без моей сестры", a: ["sans ma seur"], why: "sans — без", ref: "mal" },
       { k: "tiles", q: "Птицы летают вокруг дерева.", a: "Lez oizo volel otour l'arbr", d: ["sou", "volet"], why: "otour — вокруг", ref: "mal" }],
  13: [{ k: "input", q: "котёнок", a: ["chaou"], why: "-ou", ref: "slova" },
       { k: "input", q: "певица", a: ["chanteurela"], why: "chant + eur + ela", ref: "slova" },
       { k: "choice", q: "mezonach — это…", opts: ["огромный дом", "домик", "домашний"], a: "огромный дом", why: "-ach — большой", lang: "x", ref: "slova" },
       { k: "input", q: "мягко", a: ["dousman"], why: "-man", ref: "slova" },
       { k: "input", q: "домик", a: ["mezonou"], why: "-ou", ref: "slova" }],
  14: [{ k: "input", q: "Меню, пожалуйста.", a: ["Le kart, silvouple."], why: "kart — меню", ref: "obih" },
       { k: "input", q: "Счёт, пожалуйста.", a: ["L'adisyon, silvouple."], why: "adisyon — счёт; слияние", ref: "obih" },
       { k: "input", q: "Я хочу кофе.", a: ["Je voulem un kafe."], why: "voul + e + m", ref: "glag" },
       { k: "input", q: "У вас есть чай?", a: ["Vou avez le te?", "Eske vou avez le te?"], why: "«у вас есть» = «вы имеете»", ref: "byt" },
       { k: "choice", q: "«очень хороший»", opts: ["tre bon", "boku bon", "bon tre"], a: "tre bon", why: "tre — перед прилагательным", ref: "obih" }],
  15: [{ k: "choice", q: "Ou ales tu? — какой стиль?", opts: ["высокий", "разговорный"], a: "высокий", why: "глагол вперёд", lang: "x", ref: "stil" },
       { k: "input", q: "Я мечтаю о прекрасном дне.", a: ["Je revem d'un bo jour."], why: "de + un → d'un", ref: "zvuki" },
       { k: "choice", q: "le sonbr nui — это…", opts: ["мрачная ночь (образно)", "тёмная ночь (просто)"], a: "мрачная ночь (образно)", why: "прилагательное перед словом", lang: "x", ref: "pril" },
       { k: "input", q: "Завтра солнце вернётся.", a: ["Demen, le soley revnret."], why: "re — будет", ref: "glag" },
       { k: "listen", say: "Ma keur danset avek le lun.", q: "Послушай и напиши", a: ["Ma keur danset avek le lun."], why: "«Моё сердце танцует с луной»" }],
});

// ================================================================ новые загадки 11–18
A.puzzles.push(
{ t: "Приказ", s: "пой! давай! пойте!", rule: "Приказ одному — основа + e; «давай» — форма «мы»; «сделайте» — форма «вы».",
  ex: [["Chante!", "Пой!"], ["Danse!", "Танцуй!"], ["Chanten!", "Давай споём!"], ["Chantez!", "Пойте!"], ["Ekoute!", "Слушай!"]],
  q: [["Танцуйте!", ["Dansez!"], "форма «вы»"], ["Давай потанцуем!", ["Dansen!"], "форма «мы»"], ["Слушайте!", ["Ekoutez!"], "форма «вы»"], ["Говори!", ["Parle!"], "основа + e"]] },
{ t: "Слияние", s: "le ami → l'ami", rule: "le, de, se, ke, je, me перед гласной теряют e и пишутся с апострофом.",
  ex: [["le soley", "солнце"], ["l'etoil", "звезда (le + etoil)"], ["je chantem", "я пою"], ["j'emem", "я люблю (je + emem)"], ["de mezon", "из дома"], ["d'etoil", "о звёздах (de + etoil)"]],
  q: [["le + anfan", ["l'anfan"], "anfan начинается с гласной"], ["je + avem", ["j'avem"], "avem начинается с гласной"], ["le + mezon", ["le mezon"], "mezon начинается с согласной — слияния нет"], ["ke + il", ["k'il"], "ke перед гласной → k'"]] },
{ t: "-ant и -ey", s: "поющий и спетый", rule: "-ant — «-ущий, -ющий» (кто делает сейчас), -ey — «-нный, -тый» (что сделали).",
  ex: [["chantant", "поющий"], ["chantey", "спетый"], ["dansant", "танцующий"], ["lizey", "прочитанный"]],
  q: [["танцующий → ?", ["dansant"], "-ant"], ["станцованный", ["dansey"], "-ey"], ["прочитанный", ["lizey"], "-ey"], ["читающий", ["lizant"], "-ant"]] },
{ t: "Сравнение", s: "plu, mouen, le plu", rule: "plu — более, mouen — менее, le plu — самый, «чем» — ke.",
  ex: [["plu gran", "больше"], ["mouen gran", "менее большой"], ["le plu gran", "самый большой"], ["plu gran ke moi", "больше меня"]],
  q: [["быстрее", ["plu rapid"], "plu + rapid"], ["самый быстрый", ["le plu rapid"], "le plu"], ["менее красивый", ["mouen joli"], "mouen"], ["красивее тебя", ["plu joli ke toi"], "ke + toi"]] },
{ t: "Который: ki или ke", s: "кто делает", rule: "ki — «который» сам делает действие; ke — с ним что-то делают.",
  ex: [["l'anfan ki chantet", "ребёнок, который поёт"], ["le chanson ke l'anfan chantet", "песня, которую поёт ребёнок"], ["l'ami ki dormet", "друг, который спит"], ["le livr ke je lizem", "книга, которую я читаю"]],
  q: [["Какое слово: «звезда, ___ светит»?", ["ki"], "звезда сама светит", ["ki", "ke"]], ["Какое слово: «песня, ___ я пою»?", ["ke"], "песню поют", ["ki", "ke"]], ["друг, который читает", ["l'ami ki lizet"], "сам читает → ki"]] },
{ t: "У меня есть", s: "aver — иметь", rule: "«У меня есть X» = «я имею X» — aver; возраст тоже «имеют».",
  ex: [["J'avem un cha.", "У меня есть кошка."], ["Tu aves un frer.", "У тебя есть брат."], ["Il avet deudis an.", "Ему двадцать лет."], ["Nou aven un mezon.", "У нас есть дом."]],
  q: [["У меня есть собака.", ["J'avem un chyen."], "j'avem"], ["У тебя есть кошка?", ["Tu aves un cha?", "Eske tu aves un cha?"], "tu aves"], ["Ей тридцать лет.", ["El avet troidis an."], "el avet"]] },
{ t: "Вопросительные слова", s: "кто, где, когда…", rule: "Вопросительное слово — в начало, дальше обычный порядок: Ou tu ales?",
  ex: [["Ki chantet?", "Кто поёт?"], ["Ou tu vives?", "Где ты живёшь?"], ["Kan tu partes?", "Когда ты уходишь?"], ["Pourkoi tu rizes?", "Почему ты смеёшься?"], ["Koman tu ales?", "Как дела?"]],
  q: [["Где ты работаешь?", ["Ou tu travayes?"], "ou + обычный порядок"], ["Когда ты поёшь?", ["Kan tu chantes?"], "kan — когда"], ["Почему ты спишь?", ["Pourkoi tu dormes?"], "pourkoi — почему"], ["Кто танцует?", ["Ki danset?"], "ki — кто"]] },
{ t: "Звуки на слух", s: "что звучит — то и пишется", rule: "Каждый звук пишется всегда одинаково: «у» — ou, «ю» — u, «ё» — eu, «уа» — oi, «ш» — ch, «ж» — j, «й» — y.",
  ex: [["jour", "«жур»"], ["lun", "«люн»"], ["feu", "«фё»"], ["soir", "«суар»"], ["chak", "«шак»"], ["soley", "«солэй»"]],
  q: [["Как написать «амур» (любовь)?", ["amour"], "«у» — ou"], ["Как написать «нюи» (ночь)?", ["nui"], "«ю» — u"], ["Как написать «кёр» (сердце)?", ["keur"], "«ё» — eu"], ["Как написать «вуа» (голос)?", ["voi"], "«уа» — oi"]] },
);
})();
