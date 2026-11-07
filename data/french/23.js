window.FR_C = window.FR_C || {};
FR_C[23] = { n: 23, kind: "Слова", t: "Числа 11–100 и цены", s: "onze… cent; soixante-dix = 60 + 10",
  words: [["onze", "одиннадцать", "онз"], ["vingt", "двадцать", "вэн"], ["trente", "тридцать", "трант"], ["cinquante", "пятьдесят", "сэнкант"],
    ["soixante", "шестьдесят", "суасант"], ["cent", "сто", "сан"], ["l'euro", "евро", "лёро"], ["coûter", "стоить", "кутэ"]],
  sut: "До 60 французский счёт обычный: vingt-deux «двадцать два», trente-cinq. А дальше — <b>счёт двадцатками</b>: 70 = <b>60 + 10</b> {{soixante-dix}}, 80 = <b>4 × 20</b> {{quatre-vingts}}, 90 = <b>4 × 20 + 10</b> {{quatre-vingt-dix}}.",
  rule: `<table class="tbl"><tbody>
<tr><td>11–16</td><td class="fr">onze, douze, treize, quatorze, quinze, seize</td><td>онз, дуз, трэз, каторз, кэнз, сэз</td></tr>
<tr><td>17–19</td><td class="fr">dix-sept, dix-huit, dix-neuf</td><td>дисэт, дизюит, дизнёф</td></tr>
<tr><td>20–60</td><td class="fr">vingt, trente, quarante, cinquante, soixante</td><td>вэн, трант, карант, сэнкант, суасант</td></tr>
<tr><td>70</td><td class="fr">soixante-dix</td><td>60 + 10</td></tr>
<tr><td>80</td><td class="fr">quatre-vingts</td><td>4 × 20</td></tr>
<tr><td>90</td><td class="fr">quatre-vingt-dix</td><td>4 × 20 + 10</td></tr>
<tr><td>100</td><td class="fr">cent</td><td>сан</td></tr></tbody></table>
<p>21, 31, 41… — с <span class="fr">et</span>: <span class="fr">vingt et un</span>. Остальные — через чёрточку: <span class="fr">vingt-deux</span>.</p>`,
  prosto: `<p>Числа до 69 устроены как в русском: «двадцать» + «два».</p>
> vingt-deux :: двадцать два — «вэнтдё»
> trente-cinq :: тридцать пять — «трантсэнк»
> vingt et un :: двадцать один — «вэнтээн»: с «и» — et
> cinquante :: пятьдесят — «сэнкант»
<p>А с 70 начинается старинный счёт <b>двадцатками</b>. Французы считают: шестьдесят-десять, четыре-двадцать, четыре-двадцать-десять.</p>
> soixante-dix :: семьдесят — «суасантдис»: 60 + 10
> soixante-quinze :: семьдесят пять — «суасанткэнз»: 60 + 15
> quatre-vingts :: восемьдесят — «катрёвэн»: 4 × 20
> quatre-vingt-dix :: девяносто — «катрёвэндис»: 4 × 20 + 10
> cent :: сто — «сан»
<p>Цены:</p>
> Ça coûte combien ? :: Сколько это стоит? — «са кут комбьен»
> Ça coûte vingt euros. :: Это стоит двадцать евро. — «са кут вэнтёро»
@@pin:fr23@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> до 69 — «десятки + единицы»: vingt-deux = двадцать два.</p>
<p><b>Не как в русском:</b> 70, 80, 90 считают через 20: «четыре двадцатки» = 80. Зато в Бельгии и Швейцарии говорят проще: <i>septante</i> (70), <i>nonante</i> (90).</p>
<h3>Частые ошибки</h3>
<p>• 70 говорят «septante» во Франции — там это {{soixante-dix}}. • В {{vingt}} читают t — «вэнт»; отдельно t молчит: «вэн». • Забывают et в 21, 31: надо {{vingt et un}}.</p>`,
  lub: `<p>Счёт двадцатками — наследство кельтов, древних жителей Франции, которые считали на пальцах рук и ног. Отсюда и английское <i>score</i> «двадцать». В XVII веке французская академия закрепила quatre-vingts, а в Бельгии оставили septante и nonante.</p>
<p>{{cent}} «сто» и {{sans}} «без» звучат одинаково: «сан». Отличишь по смыслу.</p>`,
  pins: [{ id: "fr23", t: "Числа 11–100", html: `<table class="tbl"><tbody><tr><td>11–16</td><td class="fr">onze douze treize quatorze quinze seize</td></tr><tr><td>20…60</td><td class="fr">vingt trente quarante cinquante soixante</td></tr><tr><td>70 · 80 · 90</td><td class="fr">soixante-dix · quatre-vingts · quatre-vingt-dix</td></tr><tr><td>100</td><td class="fr">cent</td></tr><tr><td>21, 31…</td><td class="fr">vingt et un</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Как будет 70?", opts: ["septante", "soixante-dix", "sept-dix"], a: "soixante-dix", why: "во Франции: 60 + 10" },
    { k: "choice", q: "quatre-vingts — это…", opts: ["40", "80", "24"], a: "80", why: "4 × 20" },
    { k: "input", lang: "fr", q: "двадцать один", a: ["vingt et un"], why: "21 — с et" },
    { k: "choice", q: "Как будет 90?", opts: ["quatre-vingt-dix", "neuf-vingts", "nonante-dix"], a: "quatre-vingt-dix", why: "4 × 20 + 10" },
    { k: "input", lang: "fr", q: "Сколько это стоит? (через coûter)", a: ["Ça coûte combien ?", "Ça coûte combien", "Combien ça coûte ?"], why: "ça coûte combien" },
    { k: "listen", say: "Ça coûte vingt euros.", q: "Сколько стоит?", opts: ["20 евро", "12 евро", "100 евро"], a: "20 евро", why: "vingt — 20" },
    { k: "choice", q: "cinquante — это…", opts: ["15", "50", "5"], a: "50", why: "cinquante — 50" },
    { k: "input", lang: "fr", q: "сто", a: ["cent"], why: "cent — «сан»" },
    { k: "choice", q: "soixante-quinze — это…", opts: ["65", "75", "615"], a: "75", why: "60 + 15" },
    { k: "input", lang: "fr", q: "тридцать пять", a: ["trente-cinq"], why: "через чёрточку" },
  ] };
