window.FR_T = window.FR_T || {};
FR_T[20] = {
  words: [["le vélo", "велосипед", "лё вэло"], ["la piscine", "бассейн", "ла писин"], ["le restaurant", "ресторан", "лё рэсторан"],
    ["la promenade", "прогулка", "ла промнад"], ["le stade", "стадион", "лё стад"], ["le centre-ville", "центр города", "лё сантрёвиль"],
    ["la neige", "снег", "ла нэж"], ["il neige", "идёт снег", "иль нэж"]],
  note: `<p>Многие занятия во французском — тоже через <b>faire</b> «делать»:</p>
> faire du vélo :: кататься на велосипеде — «фэр дю вэло»
> faire une promenade :: гулять — «фэр юн промнад»
> faire la cuisine :: готовить — «фэр ла кюизин»
<p>А у дождя и снега — свои глаголы: {{il pleut}} «идёт дождь», {{il neige}} «идёт снег».</p>`,
  text: { t: "Выходные Поля и Анны", lines: [
    ["Il fait beau. Paul va au parc.", "Хорошая погода. Поль идёт в парк.", "иль фэ бо. поль ва о парк"],
    ["Il fait du vélo.", "Он катается на велосипеде.", "иль фэ дю вэло"],
    ["Anna va à la piscine.", "Анна идёт в бассейн.", "ана ва а ла писин"],
    ["Le soir, ils vont au restaurant.", "Вечером они идут в ресторан.", "лё суар, иль вон о рэсторан"],
    ["Paul fait la cuisine ? Non ! Il déteste faire la cuisine.", "Поль готовит? Нет! Он терпеть не может готовить.", "поль фэ ла кюизин? нон! иль дэтэст фэр ла кюизин"],
    ["Il pleut ! Paul et Anna vont au musée.", "Идёт дождь! Поль и Анна идут в музей.", "иль плё! поль э ана вон о мюзэ"],
    ["Ils font une promenade au centre-ville.", "Они гуляют в центре города.", "иль фон юн промнад о сантрёвиль"],
  ] },
  tq: [
    { k: "choice", q: "Что делает Поль в парке?", opts: ["катается на велосипеде", "бегает", "читает"], a: "катается на велосипеде", why: "Il fait du vélo" },
    { k: "choice", q: "Куда идёт Анна?", opts: ["в бассейн", "в музей", "в парк"], a: "в бассейн", why: "Anna va à la piscine" },
    { k: "choice", q: "Что Поль терпеть не может?", opts: ["готовить", "кататься на велосипеде", "музеи"], a: "готовить", why: "Il déteste faire la cuisine" },
  ],
  dialog: { t: "Куда идёшь?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Salut, Tom ! Tu vas au stade ?", "Привет, Том! Идёшь на стадион?", "салю, том! тю ва о стад"],
    ["B", "Non, je vais à la piscine. Il fait chaud !", "Нет, я иду в бассейн. Жарко!", "нон, жё вэ а ла писин. иль фэ шо"],
    ["A", "Moi, je vais chez Nina.", "А я иду к Нине.", "муа, жё вэ шэ нина"],
    ["B", "Vous faites du sport ?", "Будете заниматься спортом?", "ву фэт дю спор"],
    ["A", "Non, nous faisons la cuisine. Et le soir, nous allons au cinéma.", "Нет, мы готовим. А вечером идём в кино.", "нон, ну фёзон ла кюизин. э лё суар, ну залон о синэма"],
    ["B", "J'adore le cinéma !", "Обожаю кино!", "жадор лё синэма"],
    ["A", "Tu vas au cinéma aussi ?", "Пойдёшь в кино тоже?", "тю ва о синэма оси"],
    ["B", "Oui ! Merci, Léa !", "Да! Спасибо, Леа!", "уи! мэрси, леа"],
  ] },
  dq: [
    { k: "choice", q: "Куда идёт Том?", opts: ["в бассейн", "на стадион", "к Нине"], a: "в бассейн", why: "je vais à la piscine" },
    { k: "choice", q: "Что Леа и Нина будут делать днём?", opts: ["готовить", "заниматься спортом", "плавать"], a: "готовить", why: "nous faisons la cuisine" },
    { k: "choice", q: "Куда они пойдут вечером?", opts: ["в кино", "в ресторан", "в парк"], a: "в кино", why: "le soir, nous allons au cinéma" },
  ],
  gram: [
    { k: "choice", q: "Je vais ___ parc.", opts: ["au", "à le", "à la"], a: "au", why: "à + le = au" },
    { k: "choice", q: "Elles ___ à la plage.", opts: ["vont", "vas", "allons"], a: "vont", why: "ils / elles vont" },
    { k: "fix", lang: "fr", q: "Je vais à le musée.", a: ["Je vais au musée."], why: "à + le сливаются в au" },
    { k: "input", lang: "fr", q: "Мы занимаемся спортом.", a: ["Nous faisons du sport.", "On fait du sport."], why: "faire du sport; nous faisons («фёзон»)" },
    { k: "choice", q: "Как сказать «идёт дождь»?", opts: ["Il pleut.", "Il fait pluie.", "Il est pluie."], a: "Il pleut.", why: "у дождя свой глагол: il pleut" },
  ],
  write: { goal: "Напиши другу, как пройдут твои выходные.",
    steps: [
      ["Какая погода", "Il fait beau. / Il pleut.", "\\b(il fait|il pleut|il neige)\\b"],
      ["Куда ты идёшь", "Je vais au parc. / Je vais à la piscine.", "\\bje vais (au|à la|à l'|aux|chez)"],
      ["Что ты там делаешь", "Je fais du vélo.", "\\b(je fais|nous faisons|on fait)\\b"]],
    model: "Il fait beau. Je vais au parc et je fais du vélo. Le soir, je vais chez un copain.",
    modelRu: "Хорошая погода. Я иду в парк и катаюсь на велосипеде. Вечером я иду к приятелю." },
};
