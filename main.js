/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAYA DECORATION — main.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── PAGE SYSTEM ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo(0, 0);
  document.querySelectorAll('.nlinks button').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nb-' + id);
  if (nb) nb.classList.add('active');
  setTimeout(initReveal, 60);
}

function goGallery() {
  showPage('home');
  setTimeout(() => {
    const g = document.getElementById('gallery');
    if (g) g.scrollIntoView({ behavior: 'smooth' });
  }, 120);
}

/* ── CURSOR ── */
const $cur  = document.getElementById('cur');
const $curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  $cur.style.transform  = `translate(${mx - 5}px, ${my - 5}px)`;
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  $curR.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
  requestAnimationFrame(loop);
})();

document.addEventListener('mouseover', e => {
  if (e.target.closest('a, button, .gi, .svc, .pkg, .fb, .xcard')) {
    $curR.style.width = '48px'; $curR.style.height = '48px';
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('a, button, .gi, .svc, .pkg, .fb, .xcard')) {
    $curR.style.width = '32px'; $curR.style.height = '32px';
  }
});

/* ── NAVBAR SCROLL ── */
const $nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  $nav.classList.toggle('sc', scrollY > 80);
}, { passive: true });

/* ── HAMBURGER ── */
const $ham = document.getElementById('ham');
const $mob = document.getElementById('mob');
$ham.addEventListener('click', () => {
  $ham.classList.toggle('open');
  $mob.classList.toggle('open');
});
function closeMob() {
  $ham.classList.remove('open');
  $mob.classList.remove('open');
}

/* ── SCROLL REVEAL ── */
let rvObs;
function initReveal() {
  if (rvObs) rvObs.disconnect();
  rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vs'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.page.active .rv').forEach(el => rvObs.observe(el));
}
initReveal();

/* ── PARALLAX BANNER ── */
window.addEventListener('scroll', () => {
  const pb  = document.getElementById('pb');
  const pbg = document.getElementById('pbg');
  if (pb && pbg) {
    const r = pb.getBoundingClientRect();
    pbg.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * .28}px)`;
  }
}, { passive: true });

/* ── GALLERY FILTER ── */
document.querySelectorAll('.fb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fb').forEach(b => b.classList.remove('act'));
    btn.classList.add('act');
    const f = btn.dataset.f;
    document.querySelectorAll('.gi').forEach(gi => {
      const show = f === 'all' || gi.dataset.cat === f;
      gi.style.opacity      = show ? '1' : '0.18';
      gi.style.pointerEvents = show ? '' : 'none';
      gi.style.transition   = 'opacity .4s';
    });
  });
});

/* ── LIGHTBOX ── */
const $lb     = document.getElementById('lb');
const $lbimg  = document.getElementById('lbimg');
const $lbtit  = document.getElementById('lbtit');
const $lblab  = document.getElementById('lblab');
const $lbdots = document.getElementById('lbdots');
const items   = [...document.querySelectorAll('.gi')];
let curLB = 0;

function buildDots() {
  $lbdots.innerHTML = '';
  items.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'lbdot' + (i === curLB ? ' on' : '');
    d.addEventListener('click', () => openLB(i));
    $lbdots.appendChild(d);
  });
}

function openLB(idx) {
  curLB = idx;
  $lbimg.src          = items[idx].querySelector('img').src;
  $lbtit.textContent  = items[idx].dataset.title;
  $lblab.textContent  = items[idx].dataset.label;
  buildDots();
  $lb.classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeLB() {
  $lb.classList.remove('on');
  document.body.style.overflow = '';
}

items.forEach((item, i) => item.addEventListener('click', () => openLB(i)));
document.getElementById('lbcl').addEventListener('click', closeLB);
document.getElementById('lbp').addEventListener('click',  () => openLB((curLB - 1 + items.length) % items.length));
document.getElementById('lbnx').addEventListener('click', () => openLB((curLB + 1) % items.length));
$lb.addEventListener('click', e => { if (e.target === $lb) closeLB(); });
document.addEventListener('keydown', e => {
  if (!$lb.classList.contains('on')) return;
  if (e.key === 'Escape')     closeLB();
  if (e.key === 'ArrowLeft')  openLB((curLB - 1 + items.length) % items.length);
  if (e.key === 'ArrowRight') openLB((curLB + 1) % items.length);
});

/* ── CONTACT FORM ── */
function doSub(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.fsub');
  btn.innerHTML  = '<span>Sending… ✦</span>';
  btn.style.opacity = '.7';
  setTimeout(() => {
    e.target.reset();
    btn.innerHTML     = '<span>Send Your Enquiry ✦</span>';
    btn.style.opacity = '1';
    const s = document.getElementById('fsuc');
    s.style.display = 'block';
    setTimeout(() => s.style.display = 'none', 5000);
  }, 1500);
}
