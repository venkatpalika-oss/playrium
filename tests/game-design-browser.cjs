const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const {chromium}=require(process.env.PLAYRIUM_PLAYWRIGHT || 'playwright');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'components/experiences-data.js'),'utf8'),context);
(async()=>{
 const helper=process.env.PLAYRIUM_CHROMIUM_HELPER ? (await import(process.env.PLAYRIUM_CHROMIUM_HELPER)).default : null;
 const server=http.createServer((req,res)=>{
  let filename=path.join(root,decodeURIComponent(req.url.split('?')[0]));
  if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(filename.endsWith(path.sep))filename+='index.html';
  if(!fs.existsSync(filename)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',filename.endsWith('.js')?'text/javascript':filename.endsWith('.css')?'text/css':filename.endsWith('.png')?'image/png':'text/html');res.end(fs.readFileSync(filename));
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYRIUM_CHROMIUM,args:helper?helper.args.filter(a=>!['--disable-web-security','--allow-running-insecure-content','--disable-site-isolation-trials'].includes(a)):[]});
 const results=[];fs.mkdirSync('/tmp/playrium-redesign-qa',{recursive:true});
 try {
  for(const viewport of [{width:1365,height:900},{width:390,height:844},{width:320,height:568}]){
   const ctx=await browser.newContext({viewport,hasTouch:viewport.width<500,isMobile:viewport.width<500,deviceScaleFactor:viewport.width<500?2:1});
   const page=await ctx.newPage();page.setDefaultTimeout(10000);
   await page.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
   for(const e of context.window.PLAYRIUM_EXPERIENCES){
    const errors=[];const handler=error=>errors.push(error.message);page.on('pageerror',handler);
    await page.goto(`http://127.0.0.1:${server.address().port}/${e.href}`,{waitUntil:'domcontentloaded'});
    await page.locator('.pr-game-intro').waitFor();
    await page.getByRole('button',{name:'How to play',exact:true}).click();
    assert.equal(await page.locator('.pr-game-help').evaluate(e=>e.open),true);
    await page.keyboard.press('Escape');assert.equal(await page.locator('.pr-game-help').evaluate(e=>e.open),false);
    assert.equal(await page.getByRole('button',{name:'How to play',exact:true}).evaluate(e=>e===document.activeElement),true);
    await page.getByRole('button',{name:'Play area ↓',exact:true}).click();
    const stage=page.locator('#hero,#stageWrap');
    await page.screenshot({animations:'disabled',path:`/tmp/playrium-redesign-qa/${e.slug}-${viewport.width}.png`});
    const geometry=await page.evaluate(()=>({retina:(()=>{const c=document.querySelector('canvas#game');return !c||c.width===Math.round(innerWidth*Math.min(devicePixelRatio,2))})(),overflow:document.documentElement.scrollWidth>innerWidth+1,dupes:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i),card:(()=>{const e=document.querySelector('#overlay');if(!e)return null;const r=e.getBoundingClientRect();return {left:r.left,right:r.right,bottom:r.bottom,top:r.top}})()}));
    const start=page.locator('#startBtn,#playBtn,#playMarbleWrap,#playBalloonWrap').first();
    let started=false;
    if(await start.count() && await start.isVisible()){
      await start.click();started=true;
      await page.screenshot({animations:'disabled',path:`/tmp/playrium-redesign-qa/${e.slug}-${viewport.width}-playing.png`});
    }
    results.push({slug:e.slug,width:viewport.width,...geometry,started,errors});
    page.off('pageerror',handler);console.log(`${viewport.width} ${e.slug}: ${errors.length?'FAIL':'OK'}`);
   }
  }
 } finally {await browser.close();server.close();fs.writeFileSync('/tmp/playrium-redesign-qa/results.json',JSON.stringify(results,null,2));}
 console.log(JSON.stringify(results.filter(r=>r.overflow||r.errors.length||r.dupes.length),null,2));
 console.log(`Checked ${results.length} page/viewport combinations including help focus and Escape.`);
 assert.ok(results.every(r=>!r.overflow&&r.retina&&!r.errors.length&&!r.dupes.length),'See /tmp/playrium-redesign-qa/results.json');
})().catch(e=>{console.error(e);process.exitCode=1});
