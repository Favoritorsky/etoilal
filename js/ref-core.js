// Логика «Справочника» без интерфейса (её проверяет tools/test_ref.mjs):
// числа ⇄ слова (как в грамматике: сотни и тысячи раздельно — «troi sent katrdis senk», десятки слитно — «deudis»;
// понимается и слитная запись «troisent»), спряжение любого глагола по готовым формам словаря (E[i].f: 36 времён×лиц,
// 18 наклонений в настоящем, приказ, инфинитив) + наклонения в любом времени и причастия по тем же правилам.
const RefCore = (() => {
  const U = ["", "un", "deu", "troi", "katr", "senk", "sis", "set", "uit", "neuf"];
  const VAL = { un: 1, deu: 2, troi: 3, katr: 4, senk: 5, sis: 6, set: 7, uit: 8, neuf: 9, dis: 10, sent: 100, mil: 1000, milyon: 1000000, zero: 0 };
  const ROOTS = Object.keys(VAL).sort((a, b) => b.length - a.length);
  const MAX = 999999999;

  function tens(r) {
    if (r < 10) return U[r];
    const t = Math.floor(r / 10), u = r % 10;
    return (t === 1 ? "dis" : U[t] + "dis") + (u ? " " + U[u] : "");
  }
  function under1000(n) {
    const h = Math.floor(n / 100), r = n % 100, out = [];
    if (h) out.push(h > 1 ? U[h] + " sent" : "sent");
    if (r) out.push(tens(r));
    return out.join(" ");
  }
  function numToEt(n) {
    n = Math.floor(Number(n));
    if (n === 0) return "zero";
    if (!(n >= 1) || n > MAX) return null;
    if (n >= 1000000) { const m = Math.floor(n / 1000000), r = n % 1000000; return (m > 1 ? under1000(m) + " " : "") + "milyon" + (r ? " " + numToEt(r) : ""); }
    if (n < 1000) return under1000(n);
    const t = Math.floor(n / 1000), r = n % 1000;
    return (t > 1 ? under1000(t) + " " : "") + "mil" + (r ? " " + under1000(r) : "");
  }
  // слово (возможно слитное) → корни; null, если не делится на корни
  function split(tok) {
    const out = []; let i = 0;
    while (i < tok.length) {
      const r = ROOTS.find((x) => tok.startsWith(x, i));
      if (!r) return null;
      out.push(r); i += r.length;
    }
    return out;
  }
  function etToNum(text) {
    const toks = String(text).toLowerCase().replace(/[.,!?;:«»"()]/g, " ").split(/[\s\-]+/).filter(Boolean);
    if (!toks.length) return { n: null };
    const roots = [];
    for (const t of toks) { const s = split(t); if (!s) return { n: null, bad: t }; roots.push(...s); }
    let total = 0, group = 0, pend = null;
    for (const r of roots) {
      const v = VAL[r];
      if (v < 10) { if (pend !== null) group += pend; pend = v; }
      else if (v === 10) { group += (pend ?? 1) * 10; pend = null; }
      else if (v === 100) { group += (pend ?? 1) * 100; pend = null; }
      else { total += (group + (pend ?? 0) || 1) * v; group = 0; pend = null; }
    }
    const n = total + group + (pend ?? 0);
    const canon = numToEt(n);
    return { n, canon, same: canon === toks.join(" ") };
  }

  // ---------------------------------------------------------------- спряжение
  const PL = ["m", "s", "t", "n", "z", "l"];
  const MOODS = { "": "", "бы": "ri", "пусть": "se", "наверное": "pe" };
  function conj(e) {
    const f = e.f, forms = {};
    for (const [m, syl] of Object.entries(MOODS)) {
      forms[m] = [0, 1, 2, 3, 4, 5].map((t) => PL.map((_, p) => {
        const base = f[t * 6 + p];
        return syl ? base.slice(0, -1) + syl + PL[p] : base;      // наклонение — между временем и лицом
      }));
    }
    // причастия: основа + ant / ey; «основа + a» и «основа + e» уже есть в формах (прош.длит / наст «он» без лица)
    const part = [f[14].slice(0, -1) + "nt", f[2].slice(0, -1) + "y"];
    return { forms, imp: f[54], inf: f[55], part };
  }
  const yo = (s) => s.toLowerCase().replace(/ё/g, "е").trim();
  function findVerbs(q, E) {
    q = yo(q); if (!q) return [];
    const res = [];
    const cyr = /[а-я]/.test(q);
    E.forEach((e, i) => {
      if (!e.f) return;
      let s = -1;
      if (cyr) {
        const ms = yo(e.m || "").split(/[,;()]/).map((x) => x.trim());
        if (ms.includes(q)) s = 0; else if (ms.some((m) => m.startsWith(q))) s = 2; else if (ms.some((m) => m.split(" ").includes(q))) s = 3;
      } else {
        if (e.w === q) s = 0; else if (e.f.includes(q)) s = 1; else if (e.w.startsWith(q)) s = 2;
      }
      if (s >= 0) res.push([s, e.der ? 1 : 0, e.w.length, i]);
    });
    return res.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]).map((x) => x[3]);
  }
  return { numToEt, etToNum, conj, findVerbs, MAX };
})();
