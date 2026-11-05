// Звёздное небо на фоне (дизайн «Сетка», 5.11.2026): одинаковая россыпь при каждом заходе, мягкое мерцание.
// ~20 кадров в секунду; стоит на месте, если вкладка скрыта или в системе включено «уменьшить движение».
(function () {
  const c = document.getElementById("sky"); if (!c || !c.getContext) return;
  const x = c.getContext("2d"); let S = [], W = 0, H = 0, last = 0;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function init() {
    const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    let a = 7; const r = () => (a = (a * 16807) % 2147483647) / 2147483647;
    S = []; const n = Math.round(W * H / 2600);
    for (let i = 0; i < n; i++) S.push({ x: r() * W, y: r() * H, z: r() < 0.08 ? 1.5 : r() * 0.9 + 0.3, p: r() * 6.28, v: 0.4 + r() });
    draw(performance.now());
  }
  function draw(t) {
    x.clearRect(0, 0, W, H); x.fillStyle = getComputedStyle(document.body).getPropertyValue("--star").trim() || "#fff";
    for (const s of S) { x.globalAlpha = still ? 0.6 : 0.3 + 0.5 * Math.sin(t / 1600 * s.v + s.p) ** 2; x.beginPath(); x.arc(s.x, s.y, s.z, 0, 6.283); x.fill(); }
  }
  function loop(t) { if (!document.hidden && t - last > 50) { last = t; draw(t); } requestAnimationFrame(loop); }
  addEventListener("resize", init); init(); if (!still) requestAnimationFrame(loop);
})();
