const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../sungka-streak.html'),'utf8');
const start=source.indexOf('function layoutStations(){');
const end=source.indexOf('\n}\n\nresize();',start)+2;
assert.ok(start>0&&end>start);
for(const W of [320,390,844,1365]){
 const c={W,H:568,PIT_COUNT:7,stations:[]};
 vm.runInNewContext(source.slice(start,end)+';layoutStations();',c);
 assert.equal(c.stations.length,8);
 for(let i=1;i<c.stations.length;i++){
  const previous=c.stations[i-1],next=c.stations[i];
  assert.ok(previous.x+previous.r<next.x-next.r,`${W}px pockets ${i-1}/${i} overlap`);
 }
 const first=c.stations[0],store=c.stations[7];
 assert.ok(first.x-first.r-16>=0,`${W}px board clips left`);
 assert.ok(store.x+store.r+16<=W,`${W}px board clips right`);
}
console.log('PASS: Sungka pockets remain separate and the board fits at 320, 390, 844 and 1365 pixels.');
