window.FR_T = window.FR_T || {};
FR_T[43] = {
  words: [["le pique-nique", "пикник", "лё пикник"], ["la salade", "салат", "ла салад"], ["le jus", "сок", "лё жю"], ["le panier", "корзина", "лё панье"],
    ["l'herbe", "трава", "лэрб"], ["le verre", "стакан", "лё вэр"], ["apporter", "приносить", "апортэ"]],
  note: `<p>{{y}} и {{en}} экономят слова: не надо повторять место или предмет.</p>
> Tu vas au parc ? — Oui, j'y vais. :: Идёшь в парк? — Да, иду туда. — «уи, жи вэ»
> Tu as du jus ? — Oui, j'en ai. :: У тебя есть сок? — Да, есть. — «уи, жан нэ»
<p>y — «туда / там» (вместо à + место), en — «этого» (вместо du, de la, des + что-то).</p>`,
  text: { t: "Пикник", lines: [
    ["Dimanche, Hugo et ses amis font un pique-nique au parc.", "В воскресенье Юго и его друзья устраивают пикник в парке.", "диманш, юго э сэ зами фон эн пикник о парк"],
    ["Nina prépare une salade.", "Нина готовит салат.", "нина прэпар юн салад"],
    ["Max a besoin de jus : il en apporte trois bouteilles.", "Нужен сок — Макс приносит три бутылки.", "макс а бёзуэн дё жю: иль ан напорт труа бутэй"],
    ["Hugo va au parc avec eux, mais sans le panier !", "Юго идёт в парк с ними, но без корзины!", "юго ва о парк авэк ё, мэ сан лё панье"],
    ["Il l'a oublié chez lui.", "Он забыл её дома.", "иль ла ублийе шэ люи"],
    ["Il y va seul en vélo.", "Он едет туда один на велосипеде.", "иль и ва сёль ан вэло"],
    ["Ils mangent ensemble dans l'herbe.", "Они едят все вместе на траве.", "иль манж ансамбль дан лэрб"],
    ["Du gâteau ? Oui, il y en a assez !", "Торт? Да, его хватает!", "дю гато? уи, иль ян а асэ"],
  ] },
  tq: [
    { k: "choice", q: "Что готовит Нина?", opts: ["салат", "торт", "сок"], a: "салат", why: "Nina prépare une salade" },
    { k: "choice", q: "Сколько бутылок сока приносит Макс?", opts: ["три", "две", "одну"], a: "три", why: "il en apporte trois bouteilles — en = «сока»" },
    { k: "choice", q: "Что забыл Юго?", opts: ["корзину", "сок", "велосипед"], a: "корзину", why: "sans le panier ! Il l'a oublié chez lui" },
  ],
  dialog: { t: "Идёшь на праздник?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, tu vas à la fête de Nina ?", "Том, ты идёшь на праздник к Нине?", "том, тю ва а ла фэт дё нина"],
    ["B", "Oui, j'y vais. Tu viens avec moi ?", "Да, иду. Пойдёшь со мной?", "уи, жи вэ. тю вьен авэк муа"],
    ["A", "Oui ! Il faut apporter du jus ?", "Да! Надо принести сок?", "уи! иль фо апортэ дю жю"],
    ["B", "Non, Nina en a. Mais il faut des verres.", "Нет, у Нины он есть. Но нужны стаканы.", "нон, нина ан на. мэ иль фо дэ вэр"],
    ["A", "Des verres ? J'en ai à la maison.", "Стаканы? У меня дома есть.", "дэ вэр? жан нэ а ла мэзон"],
    ["B", "D'accord. Je viens chez toi à six heures.", "Договорились. Я зайду к тебе в шесть.", "дакор. жё вьен шэ туа а сизёр"],
    ["A", "Et ton frère ? Il vient avec nous ?", "А твой брат? Пойдёт с нами?", "э тон фрэр? иль вьен авэк ну"],
    ["B", "Non, il reste chez lui. Il est malade.", "Нет, он останется дома. Он болеет.", "нон, иль рэст шэ люи. иль э малад"],
  ] },
  dq: [
    { k: "choice", q: "С кем Леа идёт на праздник?", opts: ["с Томом", "с братом Тома", "одна"], a: "с Томом", why: "Tu viens avec moi ? — Oui !" },
    { k: "choice", q: "Что нужно принести?", opts: ["стаканы", "сок", "торт"], a: "стаканы", why: "il faut des verres" },
    { k: "choice", q: "Почему брат Тома не идёт?", opts: ["он болеет", "он занят", "он не любит праздники"], a: "он болеет", why: "Il est malade" },
  ],
  gram: [
    { k: "choice", q: "Tu vas au parc ? — Oui, j'___ vais.", opts: ["y", "en", "le"], a: "y", why: "туда — y: j'y vais" },
    { k: "choice", q: "Tu as du pain ? — Oui, j'___ ai.", opts: ["en", "y", "le"], a: "en", why: "«этого» (du pain) — en: j'en ai" },
    { k: "input", lang: "fr", q: "Он идёт со мной.", a: ["Il va avec moi.", "Il vient avec moi."], why: "после avec — moi, toi, lui…" },
    { k: "fix", lang: "fr", q: "C'est pour il.", a: ["C'est pour lui."], why: "после pour, avec, chez — lui, а не il" },
    { k: "choice", q: "Как сказать «мне нужна вода»?", opts: ["J'ai besoin d'eau.", "J'ai besoin de l'eau.", "Je besoin d'eau."], a: "J'ai besoin d'eau.", why: "avoir besoin de + слово без артикля: d'eau" },
    { k: "tiles", lang: "fr", q: "Мы идём туда вместе.", a: "Nous y allons ensemble", d: ["en", "avec"], why: "туда — y, перед глаголом" },
  ],
  write: { q: "Напиши 3–4 предложения о встрече с друзьями: куда вы идёте (<i>j'y vais</i>), с кем (<i>avec moi, avec eux</i>), что нужно (<i>on a besoin de…, j'en ai…</i>).",
    need: [["\\b(j'y|y va|y vont|y allons)", "есть y (туда)"], ["\\b(j'en|en a|en ai|en apporte)", "есть en (этого)"], ["\\bavec (moi|toi|lui|elle|nous|vous|eux|elles)\\b", "есть avec + moi / toi / eux…"]],
    model: "Samedi, je vais au parc. Mes amis y vont avec moi. On a besoin de jus : j'en apporte deux bouteilles. On mange ensemble dans l'herbe.",
    modelRu: "В субботу я иду в парк. Друзья идут туда со мной. Нужен сок: я приношу две бутылки. Мы едим все вместе на траве.", min: 3 },
};
