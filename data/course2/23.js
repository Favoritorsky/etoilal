window.ET_C2 = window.ET_C2 || {};
ET_C2[23] = { n: 23, sec: 3, t: "Выделенные: moi, toi + для, с, у", s: "pour toi, avek moi, che lui",
  words: [["ost", "гость"], ["kuizinye", "повар"], ["sinema", "кино"], ["mone", "деньги"], ["travay", "работа"]],
  gram: ["moi", "toi", "lui", "ela", "leur", "pour", "avek", "che"],
  sut: "После предлогов и для выделения — особые формы: <b>moi, toi, lui, ela, nou, vou, leur</b>. Pour toi — для тебя, avek moi — со мной, che lui — у него.",
  rule: `<table class="tbl"><tbody><tr><td>я</td><td class="et">moi</td><td>мы</td><td class="et">nou</td></tr><tr><td>ты</td><td class="et">toi</td><td>вы</td><td class="et">vou</td></tr><tr><td>он / она</td><td class="et">lui / ela</td><td>они</td><td class="et">leur</td></tr></tbody></table><p><span class="et">pour</span> для · <span class="et">avek</span> с · <span class="et">che</span> у (кого-то), к</p>`,
  prosto: `<p>После предлога короткие mo, tey не ставят — нужны «полные» формы:</p>
@@pin:moi@@
> Le kado eset pour toi. :: Подарок — для тебя.
> El danset avek lui. :: Она танцует с ним.
> Nou esen che ela. :: Мы у неё (дома).
> Le mone eset pour leur. :: Деньги — для них.
<h3>Для выделения</h3>
<p>Ещё эти формы ставят в начало, чтобы подчеркнуть: «а я…», «а ты…»:</p>
> Moi, je travayem. Toi, tu dormes. :: Я работаю, а ты спишь.
<h3>che — у кого-то, к кому-то</h3>
<p>[[che]] значит «у (кого-то дома)» и «к (кому-то)»: [[che moi]] — у меня, ко мне.</p>
> Lez ost esel che moi. :: Гости у меня.
<h3>Частые ошибки</h3>
<p>• Ставить после предлога je, mo: «pour mo» → [[pour moi]]. • «nou» и «vou» не меняются: [[avek nou]] — с нами, [[pour vou]] — для вас.</p>`,
  lub: `<p>Во французском — то же самое: <i>moi, toi, lui, elle, nous, vous, eux</i>. Лингвисты называют их <b>ударными</b> местоимениями: на них может падать ударение, а на je, mo, tey — нет.</p>`,
  pins: [{ id: "moi", t: "Выделенные: moi, toi…", html: `<table class="tbl"><tbody><tr><td>я</td><td class="et">moi</td><td>мы</td><td class="et">nou</td></tr><tr><td>ты</td><td class="et">toi</td><td>вы</td><td class="et">vou</td></tr><tr><td>он</td><td class="et">lui</td><td>они</td><td class="et">leur</td></tr><tr><td>она</td><td class="et">ela</td><td></td><td></td></tr></tbody></table><p>После предлогов: <span class="et">pour toi</span>, <span class="et">avek moi</span>, <span class="et">che lui</span></p>` }],
  tasks: [
    { k: "input", q: "для тебя", a: ["pour toi"], why: "после предлога — toi" },
    {"k": "input", "q": "Он танцует с ней.", "a": ["Il danset avek ela."], "why": "avek ela"},
    { k: "fix", q: "Le kado eset pour mo.", a: ["Le kado eset pour moi."], why: "после предлога — moi" },
    {"k": "input", "q": "Мы у него.", "a": ["Nou esen che lui."], "why": "che — у (кого-то)"},
    { k: "choice", q: "«для них»", opts: ["pour leur", "pour loz", "pour leyz"], a: "pour leur", why: "после предлога — leur" },
    {"k": "input", "q": "Ты читаешь, а я сплю.", "a": ["Toi, tu lizes. Moi, je dormem."], "why": "toi, moi — выделение"},
    {"k": "tiles", "q": "Друзья у нас.", "a": "Lez ami esel che nou", "d": ["no", "avek"], "why": "che nou — у нас"},
    {"k": "input", "q": "с ними", "a": ["avek leur"], "why": "после предлога — leur"},
    { k: "choice", q: "Что значит kuizinye?", opts: ["повар", "кухня", "гость"], a: "повар", lang: "x", why: "kuizinye — повар" },
    { k: "input", q: "Деньги — для работы.", a: ["Le mone eset pour le travay."], why: "pour + le travay" },
  ] };
