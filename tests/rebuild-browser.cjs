const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {configs}=require('../components/rebuild-core');const {chromium}=require(process.env.PLAYRIUM_PLAYWRIGHT||'playwright');const root=path.resolve(__dirname,'..'),out=process.env.PLAYRIUM_QA_OUTPUT||'/tmp/playrium-rebuild-qa';
(async()=>{
 const helper=(await import(process.env.PLAYRIUM_CHROMIUM_HELPER)).default;
 const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)||!fs.existsSync(f)){res.writeHead(404).end();return;}res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(f));});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.PLAYRIUM_CHROMIUM,headless:true,args:helper.args.filter(a=>!['--disable-web-security','--allow-running-insecure-content','--disable-site-isolation-trials'].includes(a))});const results=[];fs.mkdirSync(out,{recursive:true});
 try{for(const width of (process.env.PLAYRIUM_REBUILD_SMOKE?[390]:[1365,390,320])){const context=await browser.newContext({viewport:{width,height:width===320?568:900},hasTouch:width<500,isMobile:width<500,deviceScaleFactor:width<500?2:1});const page=await context.newPage();await page.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
 for(const [slug,c] of Object.entries(configs)){
  const errors=[];const listener=e=>errors.push(e.message);page.on('pageerror',listener);await page.goto(`http://127.0.0.1:${server.address().port}/${slug}.html`);
  const use=async loc=>width<500?loc.tap():loc.click();await use(page.locator('#rb-start'));await page.clock.runFor(150);
  assert.equal(await page.locator('#rb-cover').isHidden(),true);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  assert.equal(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return new Set(ids).size===ids.length;}),true);
  if(process.env.PLAYRIUM_REBUILD_SMOKE){
   const url=page.url();await page.locator('#rb-canvas').focus();await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowRight');assert.equal(page.url(),url,'game arrows must not navigate');
   const bounds=await page.locator('#rb-canvas').boundingBox();await page.touchscreen.tap(bounds.x+bounds.width*.4,bounds.y+bounds.height*.5);await page.clock.runFor(120);
   await page.locator('.rb-board').screenshot({path:`${out}/${slug}-${width}.png`});assert.deepEqual(errors,[]);results.push({slug,width,passed:true,keyboardNavigationSafe:true,touchScene:true});console.log(`Final smoke ${slug}: PASS`);page.off('pageerror',listener);continue;
  }
  await use(page.locator('#rb-pause'));assert.equal(await page.locator('#rb-cover-title').textContent(),'Take your time');const before=await page.locator('#rb-progress').textContent();await page.clock.runFor(3000);assert.equal(await page.locator('#rb-progress').textContent(),before);await use(page.locator('#rb-start'));
  if(c.kind==='gravity'){await use(page.locator('#rb-action'));await page.clock.runFor(100);assert.equal(await page.locator('#rb-progress').textContent(),'0 / 5');await use(page.getByRole('button',{name:'Gravity',exact:true}));await use(page.getByRole('button',{name:'Reset orb',exact:true}));await page.clock.runFor(50);assert.equal(await page.locator('#rb-progress').textContent(),'0 / 5');}
  if(c.kind==='balance'){await page.clock.runFor(2000);assert.notEqual(await page.locator('#rb-score').textContent(),'0');}
  await use(page.locator('#rb-how'));assert.equal(await page.locator('#rb-help').evaluate(d=>d.open),true);await page.keyboard.press('Escape');await use(page.locator('#rb-start'));
  await use(page.locator('#rb-restart'));await page.clock.runFor(50);assert.equal(await page.locator('#rb-cover').isHidden(),true);
  if(['strike','sow','dance'].includes(c.kind)){
   await page.clock.runFor(c.kind==='strike'?650:1650);await use(page.locator('#rb-action'));await page.clock.runFor(35);
   if(c.kind==='sow'){await use(page.getByRole('button',{name:'Bank stash'}));await page.clock.runFor(35);}
   assert.ok(Number(await page.locator('#rb-score').textContent())>0,slug+' real input scores');
   await page.clock.runFor(10000);assert.equal(await page.locator('#rb-cover').isVisible(),true);assert.ok(Number(await page.locator('#rb-best').textContent())>0);const best=await page.locator('#rb-best').textContent();await page.reload();assert.equal(await page.locator('#rb-best').textContent(),best);await use(page.locator('#rb-start'));
  }
  await page.clock.runFor(100);await page.locator('.rb-board').screenshot({path:`${out}/${slug}-${width}.png`});assert.deepEqual(errors,[]);results.push({slug,width,passed:true});console.log(`${width} ${slug}: PASS`);page.off('pageerror',listener);
 }
 }}finally{await browser.close();server.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));}
 console.log(`PASS ${results.length} game/viewport cases`);
})().catch(e=>{console.error(e);process.exitCode=1});
