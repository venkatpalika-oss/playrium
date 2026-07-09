/**
 * Playrium — JSON-LD Structured Data Component
 * Requires: components/experiences-data.js loaded first.
 * Reads: window.PAGE_META = { slug: '...' }
 * Injects a <script type="application/ld+json"> into <head>. Produces no visible output.
 */
(function () {
  function getMetaTag(name, isProperty) {
    var sel = isProperty ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = document.querySelector(sel);
    return el ? el.getAttribute('content') : null;
  }

  function render() {
    var meta = window.PAGE_META || {};
    var exp = meta.slug ? window.PLAYRIUM_getExperience(meta.slug) : null;
    if (!exp) return;

    var url = location.origin + '/' + exp.href;
    var image = getMetaTag('og:image', true) || (location.origin + '/favicon.png');
    var description = getMetaTag('description', false) || exp.tagline;

    var breadcrumbItems = [
      { name: window.PLAYRIUM_HOME.title, item: location.origin + '/' + window.PLAYRIUM_HOME.href }
    ];
    var hub = window.PLAYRIUM_getHub(exp.country);
    if (hub) breadcrumbItems.push({ name: hub.title, item: location.origin + '/' + hub.href });
    breadcrumbItems.push({ name: exp.title, item: url });

    var breadcrumbList = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map(function (b, i) {
        return { '@type': 'ListItem', position: i + 1, name: b.name, item: b.item };
      })
    };

    var gameEntity = {
      '@type': 'Game',
      name: exp.title,
      description: description,
      url: url,
      image: image,
      genre: exp.tags,
      isFamilyFriendly: true,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: 'Playrium', url: location.origin + '/' }
    };

    var graph = { '@context': 'https://schema.org', '@graph': [gameEntity, breadcrumbList] };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(graph);
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
