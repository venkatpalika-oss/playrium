/**
 * Playrium — Shared Site Footer Component
 * Mount point: <footer id="site-footer"></footer> (auto-created at end of <body> if absent)
 * Single source of truth for footer links. Do not duplicate footer markup on individual pages.
 */
(function () {
  function injectStyle() {
    if (document.getElementById('pr-footer-style')) return;
    var css = ''
      + '.pr-footer{position:relative;z-index:1;width:100%;background:rgba(8,8,16,.94);border-top:1px solid rgba(244,240,230,.14);padding:1.6rem 1.4rem;text-align:center;font-family:var(--font-display,system-ui,sans-serif);}'
      + '.pr-footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:1.1rem;margin:0 0 .8rem;}'
      + '.pr-footer-links a{color:rgba(244,240,230,.72);text-decoration:none;font-size:.85rem;transition:color .2s ease;}'
      + '.pr-footer-links a:hover{color:#f4f0e6;}'
      + '.pr-footer p{color:rgba(244,240,230,.5);font-size:.85rem;margin:0;}';
    var style = document.createElement('style');
    style.id = 'pr-footer-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMount() {
    var el = document.getElementById('site-footer');
    if (el) return el;
    el = document.createElement('footer');
    el.id = 'site-footer';
    document.body.appendChild(el);
    return el;
  }

  function isIndexPage() {
    var p = location.pathname;
    return /\/index\.html$/.test(p) || /\/$/.test(p) || p === '';
  }

  function homeHref() { return (window.PLAYRIUM_HOME && window.PLAYRIUM_HOME.href) || 'index.html'; }
  function anchor(hash) { return isIndexPage() ? hash : homeHref() + hash; }

  function render() {
    injectStyle();
    var mount = getMount();
    mount.className = 'pr-footer';
    mount.innerHTML =
      '<div class="pr-footer-links">' +
      '<a href="' + anchor('#top') + '">About</a>' +
    '<a href="experiences.html">Explore</a>' +
      '<a href="' + anchor('#top') + '">Countries</a>' +
      '<a href="' + anchor('#originals-panel') + '">Playrium Originals</a>' +
      '<a href="mailto:hello@playrium.fun?subject=Suggest%20an%20Experience">Suggest Experience</a>' +
      '<a href="' + anchor('#top') + '">Privacy</a>' +
      '<a href="mailto:hello@playrium.fun">Contact</a>' +
      '</div>' +
      '<p>Playrium</p>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
