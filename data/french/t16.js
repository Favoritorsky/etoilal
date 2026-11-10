window.FR_T = window.FR_T || {};
FR_T[16] = {
  words: [["le grand-père", "дедушка", "лё гранпэр"], ["la grand-mère", "бабушка", "ла гранмэр"], ["le cousin", "двоюродный брат", "лё кузэн"],
    ["la cousine", "двоюродная сестра", "ла кузин"], ["l'animal", "животное (домашнее)", "ланималь"], ["les cheveux", "волосы", "ле шёвё"],
    ["blond, blonde", "светловолосый, блондин(ка)", "блон, блонд"], ["sympa", "славный, классный (о человеке)", "сэмпа"]],
  note: `<p>В числах перед <b>ans</b> слова сливаются — немая буква на конце оживает:</p>
> trois ans :: три года — «труазан»
> dix ans :: десять лет — «дизан»
> deux ans :: два года — «дёзан»
<p>{{sympa}} — разговорное «славный, классный», и оно одинаковое для «он» и «она»: il est sympa, elle est sympa.</p>`,
  text: { t: "Семья Нины", lines: [
    ["Nina a dix ans.", "Нине десять лет.", "нина а дизан"],
    ["Elle a un frère et une sœur.", "У неё есть брат и сестра.", "эль а эн фрэр э юн сёр"],
    ["Le frère est petit : il a trois ans.", "Брат маленький: ему три года.", "лё фрэр э пёти: иль а труазан"],
    ["La sœur est grande et blonde.", "Сестра высокая и светловолосая.", "ла сёр э гранд э блонд"],
    ["Nina a aussi un cousin. Il est très sympa.", "А ещё у Нины есть двоюродный брат. Он очень классный.", "нина а оси эн кузэн. иль э трэ сэмпа"],
    ["La grand-mère est vieille, mais elle est heureuse.", "Бабушка старенькая, но она счастлива.", "ла гранмэр э вьей, мэ эль э ёрёз"],
    ["Ils ont un animal : un petit chien noir.", "У них есть животное: маленькая чёрная собака.", "иль зон эн анималь: эн пёти шьен нуар"],
  ] },
  tq: [
    { k: "choice", q: "Сколько лет брату Нины?", opts: ["три", "десять", "пять"], a: "три", why: "il a trois ans" },
    { k: "choice", q: "Какая сестра?", opts: ["высокая блондинка", "маленькая", "старая"], a: "высокая блондинка", why: "La sœur est grande et blonde" },
    { k: "choice", q: "Какое у них животное?", opts: ["маленькая чёрная собака", "кошка", "рыбка"], a: "маленькая чёрная собака", why: "un petit chien noir" },
  ],
  dialog: { t: "Братья и сёстры", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, tu as un frère ?", "Том, у тебя есть брат?", "том, тю а эн фрэр"],
    ["B", "Oui, j'ai un frère et deux sœurs.", "Да, у меня брат и две сестры.", "уи, жэ эн фрэр э дё сёр"],
    ["A", "Deux sœurs ! Elles sont jeunes ?", "Две сестры! Они маленькие?", "дё сёр! эль сон жён"],
    ["B", "Oui. Une sœur a sept ans et une sœur a dix ans.", "Да. Одной семь лет, а другой десять.", "уи. юн сёр а сэтан э юн сёр а дизан"],
    ["A", "Et tu as un animal ?", "А у тебя есть животное?", "э тю а эн анималь"],
    ["B", "Non, je n'ai pas d'animal.", "Нет, у меня нет животных.", "нон, жё нэ па данималь"],
    ["A", "J'ai un chat ! Il est vieux, mais il est très sympa.", "А у меня есть кот! Он старый, но очень классный.", "жэ эн ша! иль э вьё, мэ иль э трэ сэмпа"],
  ] },
  dq: [
    { k: "choice", q: "Сколько сестёр у Тома?", opts: ["две", "одна", "ни одной"], a: "две", why: "j'ai un frère et deux sœurs" },
    { k: "choice", q: "Сколько лет младшей сестре?", opts: ["семь", "десять", "три"], a: "семь", why: "une sœur a sept ans" },
    { k: "choice", q: "У кого есть кот?", opts: ["у Леа", "у Тома", "ни у кого"], a: "у Леа", why: "Леа: J'ai un chat !" },
  ],
  gram: [
    { k: "choice", q: "J'___ un frère.", opts: ["ai", "as", "a"], a: "ai", why: "j'ai — у меня есть" },
    { k: "choice", q: "Как сказать «мне десять лет»?", opts: ["J'ai dix ans.", "Je suis dix ans.", "J'ai dix."], a: "J'ai dix ans.", why: "возраст — через avoir, и ans обязательно" },
    { k: "input", lang: "fr", q: "Она маленькая.", a: ["Elle est petite."], why: "у «она» прилагательное получает -e: petite" },
    { k: "fix", lang: "fr", q: "Un chat noire.", a: ["Un chat noir."], why: "chat — он, поэтому noir без -e" },
    { k: "tiles", lang: "fr", q: "У нас маленький дом.", a: "Nous avons une petite maison", d: ["petit", "sommes"], why: "maison — она: une petite maison" },
  ],
  write: { goal: "Расскажи о своей семье — или придумай семью.",
    steps: [
      ["Кто у тебя есть", "J'ai un frère et une sœur.", "\\bj'ai (un|une|deux|trois|quatre)\\b"],
      ["Сколько кому-то лет", "Le frère a dix ans.", "\\ba \\w+(-\\w+)? ans\\b"],
      ["Какой он или она", "La sœur est grande et sympa.", "\\b(est|sont) (tr[èe]s )?(grande?s?|petite?s?|jeunes?|vieux|vieille|sympa|blonde?|jolie?|heureux|heureuse|noire?)\\b"]],
    model: "J'ai un frère et une sœur. Le frère a dix ans. La sœur est grande et très sympa.",
    modelRu: "У меня есть брат и сестра. Брату десять лет. Сестра высокая и очень классная." },
};
