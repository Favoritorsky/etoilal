window.EN_C = window.EN_C || {};
EN_C[13] = { n: 13, t: "Опыт: Have you ever…?", s: "have been, have seen — было ли в жизни",
  words: [["ever", "когда-нибудь (в жизни)", "э́вэ"], ["been", "был, бывал (be)", "бин"], ["seen", "видел (see)", "син"], ["done", "сделал (do)", "дан"], ["eaten", "ел (eat)", "итн"], ["tried", "пробовал (try)", "трайд"], ["once / twice", "один раз / два раза", "уанс / туайс"], ["abroad", "за границей", "эбрóд"]],
  sut: "Present Perfect — «есть в моём опыте». {{I have been to London.}} — «Я бывал в Лондоне» (когда — неважно). Строится так: {{have}} / {{has}} + <b>третья форма</b> глагола: {{seen}}, {{been}}, {{done}}.",
  rule: `<table class="tbl"><thead><tr><th></th><th>I / you / we / they</th><th>he / she / it</th></tr></thead><tbody>
<tr><td>да</td><td class="fr">I've seen it.</td><td class="fr">She's seen it.</td></tr>
<tr><td>не, никогда</td><td class="fr">I haven't seen it. · I've never seen it.</td><td class="fr">He hasn't seen it.</td></tr>
<tr><td>вопрос</td><td class="fr">Have you ever seen it?</td><td class="fr">Has she ever seen it?</td></tr></tbody></table>
<table class="tbl"><thead><tr><th>глагол</th><th>прошлое</th><th>третья форма</th></tr></thead><tbody>
<tr><td class="fr">be</td><td class="fr">was / were</td><td class="fr">been</td></tr><tr><td class="fr">see</td><td class="fr">saw</td><td class="fr">seen</td></tr><tr><td class="fr">do</td><td class="fr">did</td><td class="fr">done</td></tr><tr><td class="fr">eat</td><td class="fr">ate</td><td class="fr">eaten</td></tr><tr><td class="fr">go</td><td class="fr">went</td><td class="fr">gone / been</td></tr><tr><td class="fr">play, try</td><td class="fr">played, tried</td><td class="fr">played, tried</td></tr></tbody></table>`,
  prosto: `<p>В русском нет отдельного времени для «опыта». «Ты видел этот фильм?» может значить «вчера» или «вообще в жизни». В английском «вообще в жизни» — это Present Perfect. Слово-подсказка — {{ever}} «когда-нибудь».</p>
> Have you ever been to Paris? :: Ты когда-нибудь был в Париже?
> I've never seen snow. :: Я никогда не видел снега.
> She's tried sushi twice. :: Она пробовала суши два раза.
> Have you ever played this game? :: Ты когда-нибудь играл в эту игру?
> We've never been abroad. :: Мы никогда не были за границей.
> He's done it before. :: Он уже делал это раньше.
> I haven't eaten anything today. :: Я сегодня ничего не ел. — «сегодня» ещё не кончилось
> It's the best film I've ever seen. :: Это лучший фильм, который я когда-либо видел.
@@pin:en13@@
<h3>been или gone?</h3>
<p>{{He has been to Paris.}} — он бывал в Париже (и вернулся). {{He has gone to Paris.}} — он уехал в Париж (и сейчас там).</p>
<h3>Частые ошибки</h3>
<p>• «Did you ever see?» — про опыт лучше {{Have you ever seen…?}} • «I have saw» → {{I have seen.}} • «She have been» → {{She has been.}} • Нельзя с точным временем: «I have seen it yesterday» — неправильно (это урок 16).</p>`,
  lub: `<p>{{I've}} и {{she's}} в речи звучат очень коротко — «айв», «шиз». А {{she's}} может быть и «she is», и «she has»: понимают по следующему слову. {{She's tired}} — is, {{She's seen it}} — has.</p>`,
  pins: [{ id: "en13", t: "Present Perfect: опыт", html: `<table class="tbl"><tbody><tr><td class="fr">have / has + 3-я форма</td><td>есть в опыте</td></tr><tr><td class="fr">Have you ever…? · I've never…</td><td>когда-нибудь · никогда</td></tr><tr><td class="fr">been seen done eaten gone</td><td>3-я форма</td></tr><tr><td class="fr">been to ≠ gone to</td><td>бывал ≠ уехал</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Ты когда-нибудь был в Париже?", a: ["Have you ever been to Paris?"], why: "опыт — Have you ever been" },
    { k: "choice", q: "I've never … snow.", opts: ["saw", "seen", "see"], a: "seen", why: "have + 3-я форма: seen" },
    { k: "fix", lang: "en", q: "She have tried sushi.", a: ["She has tried sushi.", "She's tried sushi."], why: "she → has" },
    { k: "input", lang: "en", q: "Я никогда не видел снега.", a: ["I've never seen snow.", "I have never seen snow."], why: "never seen" },
    { k: "choice", q: "Он уехал в Лондон (и сейчас там).", opts: ["He has gone to London.", "He has been to London."], a: "He has gone to London.", why: "gone — уехал" },
    { k: "input", lang: "en", q: "Мы никогда не были за границей.", a: ["We've never been abroad.", "We have never been abroad."], why: "never been abroad" },
    { k: "choice", q: "eat → третья форма:", opts: ["ate", "eaten", "eated"], a: "eaten", why: "eat — ate — eaten" },
    { k: "listen", say: "She's tried sushi twice.", q: "Что прозвучало?", opts: ["Она пробовала суши два раза.", "Она никогда не пробовала суши.", "Она ест суши сейчас."], a: "Она пробовала суши два раза.", why: "twice — два раза" },
    { k: "input", lang: "en", q: "Ты когда-нибудь играл в эту игру?", a: ["Have you ever played this game?"], why: "Have you ever played" },
    { k: "fix", lang: "en", q: "I have saw this film.", a: ["I have seen this film.", "I've seen this film."], why: "see — saw — seen" },
    { k: "input", lang: "en", q: "Это лучший фильм, который я когда-либо видел.", a: ["It's the best film I've ever seen.", "This is the best film I've ever seen.", "It's the best film I have ever seen.", "This is the best film I have ever seen.", "It's the best movie I've ever seen."], why: "the best … I've ever seen" },
  ] };
