// ========== Debug (MOBILE system): press "D" to toggle ==========
(function () {
  const KEY = 'debug.v2';
  const root = document.documentElement;

  function isOn() { return root.getAttribute('data-debug') === '1'; }
  function set(on) {
    if (on) root.setAttribute('data-debug','1'); else root.removeAttribute('data-debug');
    localStorage.setItem(KEY, on ? '1' : '0');
    ensureLegend(on);
  }
  function ensureLegend(on) {
    let el = document.getElementById('debugLegend');
    if (!on) { if (el) el.remove(); return; }
    if (el) return;
    el = document.createElement('div');
    el.id = 'debugLegend';
    el.innerHTML = `
      <div class="row"><span class="sw blue"></span> Sections</div>
      <div class="row"><span class="sw green"></span> Containers / Cards</div>
      <div class="row"><span class="sw purple"></span> Measures / Gutters</div>
      <div class="row"><span class="sw orange"></span> Interactive</div>
      <div class="muted">Press “D” to toggle</div>
    `;
    document.body.appendChild(el);
  }

  // init from storage
  set(localStorage.getItem(KEY) === '1');

  // keyboard toggle
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 'd') return;
    set(!isOn());
  }, { passive: true });
})();

// ========== Theme Handling (Light/Dark toggle only) ==========
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const THEME_KEY = 'theme-mode';

// Detect system preference once (used if no saved choice)
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(mode) {
  root.setAttribute('data-theme', mode);
  if (toggle) toggle.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
}
function getCurrentTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return systemPrefersDark ? 'dark' : 'light';
}
function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}
if (toggle) {
  toggle.addEventListener('click', toggleTheme);
  applyTheme(getCurrentTheme());
} else {
  applyTheme(getCurrentTheme());
}

// ========== Placeholder Mounts ==========
function mountAnimationDemo() {
  const el = document.getElementById('animationMount');
  if (!el) return;
  el.innerHTML = '';
  const dot = document.createElement('div');
  dot.style.width = '16px';
  dot.style.height = '16px';
  dot.style.borderRadius = '50%';
  dot.style.background = 'var(--accent)';
  dot.style.position = 'relative';
  dot.style.left = '0';
  dot.style.transition = 'left 400ms linear';
  el.appendChild(dot);

  let dir = 1;
  setInterval(() => {
    const max = el.clientWidth - 16;
    const current = parseFloat(dot.style.left) || 0;
    let next = current + dir * 24;
    if (next <= 0 || next >= max) dir *= -1;
    dot.style.left = Math.max(0, Math.min(max, next)) + 'px';
  }, 450);
}
function mountExperienceDemo() {
  const el = document.getElementById('experienceMount');
  if (!el) return;
  el.innerHTML = `
    <ul style="margin:0; padding-left: 18px;">
      <li>Place your experience module here</li>
      <li>Swap this list for a timeline, cards, etc.</li>
    </ul>
  `;
}

// ========== Header text fitting (fills target width) ==========
(function fitHeader() {
  const measureEl = document.querySelector('#header .header-measure');
  const textEl = document.getElementById('headerText');
  if (!measureEl || !textEl) return;

  textEl.style.whiteSpace = 'nowrap';
  textEl.style.display = 'inline-block';
  textEl.style.width = 'auto';

  function targetWidth() { return measureEl.clientWidth; }

  function fit() {
    const maxW = targetWidth();
    if (maxW <= 0) return;

    textEl.style.fontSize = '50px';
    let low = 6, high = 2400;
    for (let i = 0; i < 22; i++) {
      const mid = (low + high) / 2;
      textEl.style.fontSize = mid + 'px';
      const w = textEl.scrollWidth;
      if (w > maxW) high = mid; else low = mid;
    }
    textEl.style.fontSize = (low - 0.5) + 'px';
  }

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(fit);
    ro.observe(measureEl);
  } else {
    window.addEventListener('resize', fit, { passive: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  } else {
    setTimeout(fit, 0);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) fit();
  });

  fit();
})();

// ========== Subhead: line-by-line text fitting within the box ==========
(function fitSubhead() {
  const box = document.querySelector('#subhead .subhead-box');
  const lines = document.querySelectorAll('#subhead .subhead-line');
  if (!box || lines.length === 0) return;

  function paddingX(el) {
    const cs = getComputedStyle(el);
    return (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
  }

  function fitLine(line, maxWidth) {
    line.style.display = 'inline-block';
    line.style.whiteSpace = 'nowrap';

    let low = 6, high = 320; // safe bounds for subhead
    for (let i = 0; i < 18; i++) {
      const mid = (low + high) / 2;
      line.style.fontSize = mid + 'px';
      const w = line.scrollWidth;
      if (w > maxWidth) high = mid; else low = mid;
    }
    line.style.fontSize = (low - 0.5) + 'px';
  }

  function fitAll() {
    const maxW = box.clientWidth - paddingX(box);
    if (maxW <= 0) return;
    lines.forEach(line => fitLine(line, maxW));
  }

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(fitAll);
    ro.observe(box);
  } else {
    window.addEventListener('resize', fitAll, { passive: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitAll);
  } else {
    setTimeout(fitAll, 0);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) fitAll();
  });

  fitAll();
})();

// ========== Mount demos on DOM ready ==========
document.addEventListener('DOMContentLoaded', () => {
  mountAnimationDemo();
  mountExperienceDemo();

  // Make the SUBHEAD ARROW act as the theme toggle (click/keyboard)
  const arrow = document.querySelector('#subhead .subhead-arrow');
  if (arrow) {
    arrow.setAttribute('role', 'button');
    arrow.setAttribute('tabindex', '0');
    arrow.setAttribute('aria-label', 'Toggle theme (Light/Dark)');
    arrow.addEventListener('click', toggleTheme);
    arrow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
});
