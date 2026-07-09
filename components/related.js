/**
 * Playrium — Related Experiences Component
 * Requires: components/experiences-data.js loaded first.
 * Reads: window.PAGE_META = { slug: '...', relatedCount?: number }
 * Optional mount point: <div id="pr-related"></div> (auto-created before end of <body> if absent)
 */
(function () {
  function injectStyle() {
    if (document.getElementById('pr-related-style')) return;
    var css = '.pr-related{max-width:1200px;margin:0 auto;padding:2.6rem 1.5rem;font-family:var(--font-display,system-ui,sans-serif);}'
      + '.pr-related h2{color:var(--chalk,#f4f0e6);font-size:1.4rem;margin:0 0 1.2rem;}'
      + '.pr-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;}'
      + '.pr-related-card{display:block;text-decoration:none;border-radius:1.2rem;padding:1.2rem;'
      + 'background:rgba(244,240,230,.06);border:1px solid rgba(244,240,230,.14);transition:transform .25s ease,border-color .25s ease;}'
      + '.pr-related-card:hover{transform:translateY(-4px);border-color:rgba(244,240,230,.35);}'
      + '.pr-related-icon{font-size:1.8rem;display:block;margin-bottom:.5rem;}'
      + '.pr-related-title{color:var(--chalk,#f4f0e6);font-weight:600;display:block;margin-bottom:.3rem;font-family:var(--font-display,system-ui,sans-serif);}'
      + '.pr-related-tagline{color:var(--chalk-dim,#9a97a8);font-size:.85rem;display:block;}';
    var style = document.createElement('style');
    style.id = 'pr-related-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMount() {
    var el = document.getElementById('pr-related');
    if (el) return el;
    el = document.createElement('section');
    el.id = 'pr-related';
    document.body.appendChild(el);
    return el;
  }

  function score(current, candidate) {
    var s = 0;
    if (candidate.country === current.country) s += 3;
    var tags = current.tags || [];
    (candidate.tags || []).forEach(function (t) { if (tags.indexOf(t) !== -1) s += 2; });
    return s;
  }

  function render() {
    var meta = window.PAGE_META || {};
    var exp = meta.slug ? window.PLAYRIUM_getExperience(meta.slug) : null;
    if (!exp) return;
    var count = meta.relatedCount || 4;
    var others = window.PLAYRIUM_EXPERIENCES.filter(function (e) { return e.slug !== exp.slug; });
    others.forEach(function (o) { o.__score = score(exp, o); });
    others.sort(function (a, b) { return b.__score - a.__score; });
    var picks = others.slice(0, count);
    if (!picks.length) return;

    injectStyle();
    var mount = getMount();
    mount.classList.add('pr-related');
    var html = '<h2>Related Experiences</h2><div class="pr-related-grid">';
    picks.forEach(function (p) {
      html += '<a class="pr-related-card" href="' + p.href + '">'
        + '<span class="pr-related-icon">' + p.icon + '</span>'
        + '<span class="pr-related-title">' + p.title + '</span>'
        + '<span class="pr-related-tagline">' + p.tagline + '</span>'
        + '</a>';
    });
    html += '</div>';
    mount.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
