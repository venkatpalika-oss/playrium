const fs = require('node:fs');
const assert = require('node:assert/strict');
const xml = fs.readFileSync('sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length);
for (const url of urls) {
  const u = new URL(url);
  assert.equal(u.origin, 'https://www.playrium.fun');
  assert(!u.pathname.endsWith('.html'));
  const file = u.pathname === '/' ? 'index.html' : u.pathname.slice(1) + '.html';
  const html = fs.readFileSync(file, 'utf8');
  assert(html.includes('rel="canonical" href="' + url + '"'), file + ': canonical mismatch');
  assert(html.includes('property="og:url" content="' + url + '"'), file + ': OG mismatch');
  assert(!/content="noindex/i.test(html), file + ': noindex');
  assert(/<title>[^<]+<\/title>/.test(html), file + ': title');
  assert(/name="description" content="[^"]+"/.test(html), file + ': description');
}
assert.equal(urls.length, 45);
assert(fs.readFileSync('404.html', 'utf8').includes('content="noindex"'));
assert(fs.readFileSync('robots.txt', 'utf8').includes('Sitemap: https://www.playrium.fun/sitemap.xml'));
console.log('SEO checks passed: 45 canonical pages, metadata, sitemap, robots and 404.');
