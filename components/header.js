/**
 * Playrium — Shared Site Header Component
 * Requires: components/experiences-data.js loaded first.
 * Mount point: <header id="site-header"></header> (auto-created at top of <body> if absent)
 * Single source of truth for site navigation, search, and random discovery.
 * Do not duplicate nav markup on individual pages — include this script and let it render.
 */
(function () {
  function injectStyle() {
    if (document.getElementById('pr-header-style')) return;
    var css = ''
      + '.pr-header{position:relative;z-index:50;width:100%;background:rgba(8,8,16,.94);border-bottom:1px solid rgba(244,240,230,.14);}'
      + '.pr-nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.8rem;padding:.9rem 1.4rem;max-width:1400px;margin:0 auto;font-family:var(--font-display,system-ui,sans-serif);}'
      + '.pr-nav-logo{color:#f4f0e6;font-weight:700;font-size:1.15rem;text-decoration:none;letter-spacing:-.01em;}'
      + '.pr-nav-links{display:flex;align-items:center;gap:1.3rem;flex-wrap:wrap;}'
      + '.pr-nav-links a{color:rgba(244,240,230,.72);text-decoration:none;font-size:.88rem;font-weight:500;transition:color .2s ease;}'
      + '.pr-nav-links a:hover{color:#f4f0e6;}'
      + '.pr-nav-btn{font-family:var(--font-display,system-ui,sans-serif);background:none;border:none;color:rgba(244,240,230,.72);font-size:.88rem;font-weight:500;cursor:pointer;padding:0;}'
      + '.pr-nav-btn:hover{color:#f4f0e6;}'
      + '.pr-search-overlay{position:fixed;inset:0;z-index:90;display:flex;align-items:flex-start;justify-content:center;background:rgba(5,5,10,.86);opacity:0;pointer-events:none;transition:opacity .3s ease;padding-top:8vh;}'
      + '.pr-search-overlay.active{opacity:1;pointer-events:auto;}'
      + '.pr-search-box{width:92%;max-width:560px;background:rgba(20,20,28,.96);border:1px solid rgba(244,240,230,.16);border-radius:1.2rem;padding:1.4rem;box-shadow:0 30px 70px rgba(0,0,0,.5);max-height:70vh;display:flex;flex-direction:column;}'
      + '.pr-search-input{width:100%;font-family:var(--font-display,system-ui,sans-serif);font-size:1.05rem;padding:.9rem 1.1rem;border-radius:.8rem;border:1px solid rgba(244,240,230,.16);background:rgba(255,255,255,.06);color:#f4f0e6;outline:none;box-sizing:border-box;}'
      + '.pr-search-results{margin-top:1rem;overflow-y:auto;display:flex;flex-direction:column;gap:.4rem;}'
      + '.pr-search-result-item{display:flex;align-items:center;gap:.7rem;padding:.7rem .8rem;border-radius:.7rem;text-decoration:none;color:#f4f0e6;}'
      + '.pr-search-result-item:hover{background:rgba(255,255,255,.07);}'
      + '.pr-search-result-icon{font-size:1.3rem;}'
      + '.pr-search-result-title{font-weight:600;font-size:.95rem;}'
      + '.pr-search-result-meta{color:rgba(244,240,230,.6);font-size:.8rem;}'
      + '.pr-search-empty{color:rgba(244,240,230,.6);text-align:center;padding:1rem;}'
      + '@media (max-width:640px){ .pr-nav-links{gap:.8rem;} .pr-nav{justify-content:flex-start;} }';
    var style = document.createElement('style');
    style.id = 'pr-header-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMount() {
    var el = document.getElementById('site-header');
    if (el) return el;
    el = document.createElement('header');
    el.id = 'site-header';
    document.body.insertBefore(el, document.body.firstChild);
    return el;
  }

  function isIndexPage() {
    var p = location.pathname;
    return /\/index\.html$/.test(p) || /\/$/.test(p) || p === '';
  }

  function homeHref() { return (window.PLAYRIUM_HOME && window.PLAYRIUM_HOME.href) || 'index.html'; }
  function countriesHref() { return isIndexPage() ? '#top' : homeHref() + '#top'; }
  function originalsHref() {
    var full = (window.PLAYRIUM_ORIGINALS_HUB && window.PLAYRIUM_ORIGINALS_HUB.href) || 'index.html#originals-panel';
    var hashIdx = full.indexOf('#');
    var frag = hashIdx > -1 ? full.slice(hashIdx) : '';
    return isIndexPage() ? frag : full;
  }
  function relaxHref() { return isIndexPage() ? '#relax-panel' : homeHref() + '#relax-panel'; }
function exploreHref() { return 'experiences.html'; }

  function experiences() { return window.PLAYRIUM_EXPERIENCES || []; }

  function playCount(href) { try { return parseInt(localStorage.getItem('play_' + href) || '0', 10); } catch (e) { return 0; } }
  function bumpPlayCount(href) {
    try {
      localStorage.setItem('play_' + href, String(playCount(href) + 1));
      localStorage.setItem('last_' + href, String(Date.now()));
    } catch (e) {}
  }

  function matchesQuery(e, q) {
    q = q.toLowerCase();
    var countryLabel = e.country || 'Playrium Originals';
    if (e.title.toLowerCase().indexOf(q) > -1) return true;
    if (countryLabel.toLowerCase().indexOf(q) > -1) return true;
    if (e.tags && e.tags.some(function (t) { return t.toLowerCase().indexOf(q) > -1; })) return true;
    if (e.moods && e.moods.some(function (m) { return m.toLowerCase().indexOf(q) > -1; })) return true;
    return false;
  }

  function renderSearchResults(q) {
    var resultsEl = document.getElementById('prSearchResults');
    resultsEl.innerHTML = '';
    if (!q) return;
    var matches = experiences().filter(function (e) { return matchesQuery(e, q); }).slice(0, 12);
    if (matches.length === 0) {
      resultsEl.innerHTML = '<p class="pr-search-empty">No experiences found.</p>';
      return;
    }
    matches.forEach(function (e) {
      var a = document.createElement('a');
      a.className = 'pr-search-result-item';
      a.href = e.href;
      a.addEventListener('click', function () { bumpPlayCount(e.href); });
      var countryLabel = e.country || 'Playrium Originals';
      a.innerHTML = '<span class="pr-search-result-icon">' + e.icon + '</span><span><span class="pr-search-result-title">' + e.title + '</span><br><span class="pr-search-result-meta">' + countryLabel + '</span></span>';
      resultsEl.appendChild(a);
    });
  }

  function openSearch() {
    document.getElementById('prSearchOverlay').classList.add('active');
    document.getElementById('prSearchOverlay').setAttribute('aria-hidden', 'false');
    var input = document.getElementById('prSearchInput');
    input.value = '';
    document.getElementById('prSearchResults').innerHTML = '';
    setTimeout(function () { input.focus(); }, 50);
  }

  function closeSearch() {
    document.getElementById('prSearchOverlay').classList.remove('active');
    document.getElementById('prSearchOverlay').setAttribute('aria-hidden', 'true');
  }

  function isTypingTarget(el) {
  var tag = el && el.tagName ? el.tagName.toLowerCase() : '';
  return tag === 'input' || tag === 'textarea' || (el && el.isContentEditable);
}

function goToRandom() {
  var list = experiences();
  if (!list.length) return;
  var pick = list[Math.floor(Math.random() * list.length)];
  bumpPlayCount(pick.href);
  window.location.href = pick.href;
}

function wireEvents() {
  document.getElementById('prSearchInput').addEventListener('input', function () { renderSearchResults(this.value); });
  document.getElementById('prSearchOverlay').addEventListener('click', function (ev) { if (ev.target === this) closeSearch(); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { closeSearch(); return; }
    if (isTypingTarget(ev.target)) return;
    if (ev.key === '/') { ev.preventDefault(); openSearch(); return; }
    if (ev.key === 'r' || ev.key === 'R') { goToRandom(); }
  });
  document.getElementById('prNavRandomBtn').addEventListener('click', goToRandom);
}

function render() {
    injectStyle();
    var mount = getMount();
    mount.className = 'pr-header';
    mount.setAttribute('role', 'banner');
    mount.innerHTML =
      '<nav class="pr-nav" id="mainNav">' +
      '<a class="pr-nav-logo" href="' + homeHref() + '">Playrium</a>' +
      '<div class="pr-nav-links">' +
      '<a href="' + homeHref() + '">Home</a>' +
      '<a href="' + exploreHref() + '">Explore</a>' +
      '<a href="' + countriesHref() + '">Countries</a>' +
      '<a href="' + originalsHref() + '">Playrium Originals</a>' +
      '<a href="' + relaxHref() + '">Relax &amp; Satisfy</a>' +
      '<button class="pr-nav-btn" id="prNavRandomBtn" type="button">Random</button>' +
      '</div>' +
      '</nav>' +
      '<div class="pr-search-overlay" id="prSearchOverlay" aria-hidden="true" role="dialog" aria-label="Search experiences">' +
      '<div class="pr-search-box">' +
      '<input class="pr-search-input" id="prSearchInput" type="text" placeholder="Search by title, country, tag, or mood…" autocomplete="off">' +
      '<div class="pr-search-results" id="prSearchResults"></div>' +
      '</div>' +
      '</div>';
    wireEvents();
  }

  function init() {
    if (!window.PLAYRIUM_EXPERIENCES) return;
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
