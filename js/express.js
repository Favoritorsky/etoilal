// Экспресс-курс (#/экспресс[/номер экрана]): 10 экранов «минимум, чтобы заговорить». Данные — data/express.js (ET_EXPRESS);
// на каждом экране — объяснение, фразы с ▶ и мини-вопрос. Прогресс — Store.get().express (сколько экранов пройдено).
function pageExpress(args) {
  const X = ET_EXPRESS.screens, N = X.length;
  const k = Math.max(0, Math.min(N, (+args[0] || 1) - 1));
  const S = Store.get(), done = S.express || 0;
  const dots = X.map((s, i) => `<a href="#/экспресс/${i + 1}" class="${i < done ? "d" : ""}${i === k ? " c" : ""}" title="${esc(s.title)}">${i < done ? "✓" : i + 1}</a>`).join("") +
    `<a href="#/экспресс/${N + 1}" class="${k === N ? "c" : ""}" title="Финиш">★</a>`;
  const head = `<div class="k">Экспресс-курс</div><h1 class="page">Минимум, <i>чтобы заговорить</i></h1>
    <p class="lead">10 коротких экранов — 15 минут. Послушай каждую фразу ▶ и повтори вслух.</p><div class="aud-note" style="margin:-10px 0 12px">🔊 Аудио синтезировано — возможны неточности</div><div class="dots xdots">${dots}</div>`;
  if (k === N) return head + `<div class="card xcard xfin"><div class="ic">🌟</div><h2>Ты знаешь минимум!</h2>
    <p class="muted">Здороваться, представляться, говорить «я голоден», «не понимаю», спрашивать «где?» и просить повторить. Дальше — настоящий курс: там всё это подробно, с диалогами и заданиями.</p>
    <div class="row" style="justify-content:center;flex-wrap:wrap"><a class="btn gold" href="#/урок/1">Урок 1 ▶</a><a class="btn" href="#/учиться">Все уроки</a><a class="btn" href="#/экспресс/1">С начала</a></div></div>`;
  const s = X[k];
  const txt = esc(s.text).replace(/\*\*(.+?)\*\*/g, (_, x) => /[А-Яа-яЁё]/.test(x) ? `<b>${x}</b>` : `<b class="et say" data-say="${x}">${x}</b>`);
  return head + `<div class="card xcard"><div class="row" style="justify-content:flex-start"><div class="xic">${s.icon}</div><div><div class="k">Экран ${k + 1} из ${N}</div><h2 style="margin:2px 0 0">${esc(s.title)}</h2></div></div>
    <p class="xtxt">${txt}</p>
    <div class="xph">${s.phrases.map(([et, ru]) => `<div class="lex">${playBtn(et, 1)}<div><div class="row1"><span class="et">${esc(et)}</span> <span class="ru">— ${esc(ru)}</span></div><div class="rd">«${esc(rd(et))}»</div></div></div>`).join("")}</div>
    <div class="xquiz"><div class="k">Проверь себя</div><div class="tq" style="margin:6px 0 10px">${esc(s.quiz.q)}</div>
      <div class="topts" id="xq">${s.quiz.options.map((o, i) => `<button class="topt" data-i="${i}">${/[А-Яа-яЁё]/.test(o) ? esc(o) : `<span class="et">${esc(o)}</span>`}</button>`).join("")}</div></div></div>
  <div class="lnav">${k ? `<a class="btn" href="#/экспресс/${k}">← Назад</a>` : "<span></span>"}<a class="btn gold" id="xnext" href="#/экспресс/${k + 2}">${k + 1 === N ? "Финиш ★" : "Дальше ▶"}</a></div>`;
}
function bindExpress(args) {
  const X = ET_EXPRESS.screens, k = Math.max(0, Math.min(X.length, (+args[0] || 1) - 1));
  if (k === X.length) { const S = Store.get(); if ((S.express || 0) < X.length) { S.express = X.length; Store.addPoints(20); toast("✦ +20 очков за экспресс-курс"); renderNav("учиться"); } return; }
  const order = [...$("#xq").children].sort(() => Math.random() - .5); order.forEach((b) => $("#xq").appendChild(b));   // варианты вперемешку
  $("#xq").addEventListener("click", (e) => {
    const b = e.target.closest(".topt"); if (!b || $("#xq").dataset.done) return;
    const ok = +b.dataset.i === X[k].quiz.right;
    $("#xq").querySelectorAll(".topt").forEach((x) => x.classList.add(+x.dataset.i === X[k].quiz.right ? "good" : x === b ? "bad" : "dim"));
    $("#xq").dataset.done = 1; toast(ok ? "Верно!" : "Запомни правильный ответ");
    const S = Store.get(); if (ok && (S.express || 0) < k + 1) { S.express = k + 1; Store.save(); }
    const right = X[k].quiz.options[X[k].quiz.right]; if (!/[А-Яа-яЁё]/.test(right)) speak(right);
  });
}
