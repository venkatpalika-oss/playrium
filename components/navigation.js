/**
 * Playrium — Navigation Component ("Continue Exploring")
 * Requires: components/experiences-data.js loaded first.
 * Reads: window.PAGE_META = { slug: '...' }
 * Optional mount point: <div id="pr-continue-exploring"></div> (auto-created before end of <body> if absent)
 * Renders: Previous / Next experience, Random Experience, Country link, Category links, Share links.
 */
(function () {
  function injectStyle() {
    if (document.getElementById('pr-nav-style')) return;
    var css = '.pr-continue{max-width:1200px;margin:0 auto;padding:1rem 1.5rem 3rem;font-family:var(--font-display,system-ui,sans-serif);color:var(--chalk,#f4f0e6);}'
      + '.pr-continue h2{font-size:1.4rem;margin:0 0 1.2rem;}'
      + '.pr-prevnext{display:flex;align-items:stretch;justify-content:space-between;gap:.8rem;flex-wrap:wrap;margin-bottom:1.5rem;}'
    + '.pr-random-center{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;font-size:1.3rem;background:rgba(244,240,230,.06);border:1px solid rgba(244,240,230,.14);border-radius:1rem;padding:.6rem 1rem;color:var(--chalk,#f4f0e6);cursor:pointer;font-family:inherit;transition:border-color .2s ease,transform .2s ease;}'
    + '.pr-random-center span{font-size:.72rem;font-family:var(--font-display,system-ui,sans-serif);color:var(--chalk-dim,#9a97a8);}'
    + '.pr-random-center:hover{border-color:rgba(244,240,230,.35);transform:translateY(-2px);}'
      + '.pr-prevnext a{flex:1;min-width:200px;text-decoration:none;color:var(--chalk,#f4f0e6);'
      + 'background:rgba(244,240,230,.06);border:1px solid rgba(244,240,230,.14);border-radius:1rem;padding:.9rem 1.2rem;'
      + 'display:block;transition:border-color .2s ease;}'
      + '.pr-prevnext a:hover{border-color:rgba(244,240,230,.35);}'
      + '.pr-prevnext small{display:block;color:var(--chalk-dim,#9a97a8);font-size:.75rem;margin-bottom:.3rem;}'
      + '.pr-pills{display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:1.2rem;}'
      + '.pr-pill{display:inline-flex;align-items:center;gap:.4rem;text-decoration:none;color:var(--chalk,#f4f0e6);'
      + 'background:rgba(244,240,230,.06);border:1px solid rgba(244,240,230,.14);border-radius:999px;padding:.5rem 1.1rem;font-size:.85rem;'
      + 'cursor:pointer;transition:border-color .2s ease;font-family:inherit;}'
      + '.pr-pill:hover{border-color:rgba(244,240,230,.35);}'
      + '.pr-share{display:flex;gap:.6rem;flex-wrap:wrap;}';
    var style = document.createElement('style');
    style.id = 'pr-nav-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMount() {
    var el = document.getElementById('pr-continue-exploring');
    if (el) return el;
    el = document.createElement('section');
    el.id = 'pr-continue-exploring';
    document.body.appendChild(el);
    return el;
  }

  function buildShareLinks(exp) {
    var pageUrl = encodeURIComponent(location.origin + '/' + exp.href);
    var text = encodeURIComponent(exp.title + ' \u2014 ' + exp.tagline);
    return [
      { label: 'Share on X', href: 'https://twitter.com/intent/tweet?text=' + text + '&url=' + pageUrl },
      { label: 'Share on Facebook', href: 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl },
      { label: 'Share on WhatsApp', href: 'https://wa.me/?text=' + text + '%20' + pageUrl }
    ];
  }

  function render() {
    var meta = window.PAGE_META || {};
    var exp = meta.slug ? window.PLAYRIUM_getExperience(meta.slug) : null;
    if (!exp) return;

    var list = window.PLAYRIUM_EXPERIENCES;
    var idx = -1;
    for (var i = 0; i < list.length; i++) { if (list[i].slug === exp.slug) { idx = i; break; } }
    if (idx === -1) return;

    var prev = list[(idx - 1 + list.length) % list.length];
    var next = list[(idx + 1) % list.length];

    injectStyle();
    var mount = getMount();
    mount.classList.add('pr-continue');

    var html = '<h2>Continue Exploring</h2>';
  html += '<div class="pr-prevnext">';
  html += '<a href="' + prev.href + '"><small>\u2190 Previous</small>' + prev.icon + ' ' + prev.title + '</a>';
  html += '<button type="button" class="pr-random-center" id="pr-random-btn" aria-label="Random Experience"><span aria-hidden="true">\uD83C\uDFB2</span><span>Random</span></button>';
  html += '<a href="' + next.href + '"><small>Next \u2192</small>' + next.icon + ' ' + next.title + '</a>';
  html += '</div>';

  html += '<div class="pr-pills">';
  var hub = window.PLAYRIUM_getHub(exp.country);
  if (hub) {
    html += '<a class="pr-pill" href="' + hub.href + '">' + hub.flag + ' More ' + hub.title + '</a>';
  }
  (exp.tags || []).forEach(function (t) {
    html += '<a class="pr-pill" href="index.html#categories">#' + t + '</a>';
  });
  html += '</div>';

  html += '<div class="pr-share">';
  buildShareLinks(exp).forEach(function (s) {
    html += '<a class="pr-pill" target="_blank" rel="noopener" href="' + s.href + '">' + s.label + '</a>';
  });
  html += '</div>';

  mount.innerHTML = html;

    var randomBtn = document.getElementById('pr-random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', function () {
      var others = list.filter(function (e) { return e.slug !== exp.slug; });
      var pick = others[Math.floor(Math.random() * others.length)];
      if (pick) location.href = pick.href;
    });
  }

  function isTypingTarget(el) {
    var tag = el && el.tagName ? el.tagName.toLowerCase() : '';
    return tag === 'input' || tag === 'textarea' || (el && el.isContentEditable);
  }
  document.addEventListener('keydown', function (ev) {
    if (isTypingTarget(ev.target)) return;
    if (ev.key === 'ArrowLeft') { location.href = prev.href; }
    else if (ev.key === 'ArrowRight') { location.href = next.href; }
  });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
