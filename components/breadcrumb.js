/**
 * Playrium — Breadcrumb Component
 * Requires: components/experiences-data.js loaded first.
 * Reads: window.PAGE_META = { slug: '...' }
 * Optional mount point: <div id="pr-breadcrumb"></div> (auto-created at top of <body> if absent)
 */
(function () {
  function injectStyle() {
    if (document.getElementById('pr-breadcrumb-style')) return;
    var css = '.pr-breadcrumb{font-family:var(--font-display,system-ui,sans-serif);'
      + 'font-size:.85rem;color:var(--chalk-dim,#9a97a8);padding:1rem 1.5rem 0;max-width:1200px;margin:0 auto;}'
      + '.pr-breadcrumb ol{display:flex;flex-wrap:wrap;gap:.4rem;list-style:none;margin:0;padding:0;}'
      + '.pr-breadcrumb li{display:flex;align-items:center;gap:.4rem;}'
      + '.pr-breadcrumb li+li::before{content:"\203A";opacity:.5;margin-right:.4rem;}'
      + '.pr-breadcrumb a{color:var(--chalk-dim,#9a97a8);text-decoration:none;transition:color .2s ease;}'
      + '.pr-breadcrumb a:hover{color:var(--chalk,#f4f0e6);}'
      + '.pr-breadcrumb span[aria-current]{color:var(--chalk,#f4f0e6);}';
    var style = document.createElement('style');
    style.id = 'pr-breadcrumb-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMount() {
    var el = document.getElementById('pr-breadcrumb');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'pr-breadcrumb';
    document.body.insertBefore(el, document.body.firstChild);
    return el;
  }

  function render() {
    var meta = window.PAGE_META || {};
    var exp = meta.slug ? window.PLAYRIUM_getExperience(meta.slug) : null;
    if (!exp) return;
    injectStyle();
    var mount = getMount();
    mount.classList.add('pr-breadcrumb');
    mount.setAttribute('role', 'navigation');
    mount.setAttribute('aria-label', 'Breadcrumb');

    var crumbs = [{ title: window.PLAYRIUM_HOME.title, href: window.PLAYRIUM_HOME.href }];
    var hub = window.PLAYRIUM_getHub(exp.country);
    if (hub) crumbs.push({ title: hub.title, href: hub.href });
    crumbs.push({ title: exp.title, href: null });

    var html = '<ol>';
    crumbs.forEach(function (c) {
      if (c.href) {
        html += '<li><a href="' + c.href + '">' + c.title + '</a></li>';
      } else {
        html += '<li><span aria-current="page">' + c.title + '</span></li>';
      }
    });
    html += '</ol>';
    mount.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
