const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
process.chdir(path.join(__dirname, '..'));
const html = fs.readFileSync('index.html', 'utf8');
const data = { window: {} };
vm.runInNewContext(fs.readFileSync('components/experiences-data.js', 'utf8'), data);
const experiences = data.window.PLAYRIUM_EXPERIENCES;
for (const e of experiences) assert.ok(fs.existsSync(e.href), e.href);
const counts = { statExpCount: experiences.length, statCountryCount: new Set(experiences.filter(e => e.country).map(e => e.country)).size, statOriginalsCount: experiences.filter(e => !e.country).length };
for (const [id, value] of Object.entries(counts)) assert.ok(html.includes(`id="${id}">${value}</strong>`), id);
for (const file of fs.readdirSync('.').filter(f => f.endsWith('.html'))) {
  for (const match of fs.readFileSync(file, 'utf8').matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!/src=|application\/ld\+json/.test(match[1])) new vm.Script(match[2], {filename: file});
  }
}
const targets = html.slice(html.indexOf('var CHALLENGE_TARGETS ='), html.indexOf('function playCount'));
const selection = html.slice(html.indexOf('var challengePool ='), html.indexOf('var done = false;', html.indexOf('var challengePool =')));
for (let day = 0; day < 366; day++) {
  const context = { EXPERIENCES: experiences, featuredExp: experiences[day % experiences.length], Date: {now: () => day * 86400000} };
  vm.runInNewContext(targets + '\n(function(){' + selection + '\nthis.selected = challengeExp; this.target = CHALLENGE_TARGETS[challengeExp.href];}).call(this)', context);
  assert.ok(context.target);
  assert.notEqual(context.selected.href, context.featuredExp.href);
  assert.ok(!['cloud-painter','zen-ripple','gravity-playground'].includes(context.selected.slug));
}
const header = fs.readFileSync('components/header.js', 'utf8');
new vm.Script(header);
const elements = new Map();
let document;
function element(id) {
  if (elements.has(id)) return elements.get(id);
  const classes = new Set();
  const e = {id, hidden: id === 'prSearchOverlay', value: '', innerHTML: '', listeners: {}, attrs: {},
    classList: {add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c)},
    setAttribute(k,v){this.attrs[k]=v}, addEventListener(k,fn){this.listeners[k]=fn}, appendChild(){},
    focus(){document.activeElement=this}
  };
  elements.set(id,e); return e;
}
const keyHandlers = {};
document = {readyState:'complete', activeElement:null, head:{appendChild(){}},
  getElementById: id => id === 'pr-header-style' ? null : element(id),
  createElement: () => element('style'), querySelectorAll: () => [],
  addEventListener: (name,fn) => {keyHandlers[name]=fn}
};
vm.runInNewContext(header, {document, window:{PLAYRIUM_EXPERIENCES:experiences}, location:{pathname:'/index.html'}});
const overlay=element('prSearchOverlay'), trigger=element('prNavSearchBtn'), input=element('prSearchInput'), close=element('prSearchClose');
assert.ok(header.includes('.pr-search-overlay[hidden]{display:none;}'));
assert.ok(element('site-header').innerHTML.includes('id="prSearchOverlay" hidden'));
assert.equal(overlay.hidden,true);
trigger.focus(); trigger.listeners.click();
assert.equal(overlay.hidden,false); assert.equal(document.activeElement,input);
let prevented=false;
keyHandlers.keydown({key:'Tab', target:input, preventDefault(){prevented=true}});
assert.ok(prevented); assert.equal(document.activeElement,close);
close.listeners.click();
assert.equal(overlay.hidden,true); assert.equal(document.activeElement,trigger);
trigger.listeners.click(); keyHandlers.keydown({key:'Escape'});
assert.equal(overlay.hidden,true); assert.equal(document.activeElement,trigger);
console.log('PASS: 23 catalogue destinations; static counts; all inline script syntax; 366 daily selections; search open, focus wrap, close, Escape and focus restoration.');
