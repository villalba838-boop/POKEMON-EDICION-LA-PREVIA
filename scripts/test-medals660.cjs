const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync(__dirname+'/../js/17.js','utf8').match(/\/\* BEGIN UPDATE660 \*\/([\s\S]*?)\/\* END UPDATE660 \*\//)[1];
function boot(data={badges:[],flags:{}}){
 const shown=[];let finish;let saves=0;
 const ctx={state:structuredClone({...data,screen:'world'}),badgeGifs658:Object.fromEntries(Array.from({length:8},(_,i)=>[i,'clip'+i])),BADGES:Array.from({length:8},(_,i)=>['badge'+i]),playing658:false,clip659:null,mod:{classList:{contains:()=>true}},save:()=>saves++,applySaveData:d=>{ctx.state=structuredClone({...d,screen:'world'});return true;},serializeState:()=>structuredClone(ctx.state),playGif658:(key,title,after)=>{shown.push(key);finish=after;return true;},setInterval:fn=>{ctx.tick=fn;},document:{title:''},releaseBrand658:null,window:{},console};
 vm.createContext(ctx);vm.runInContext(source,ctx);
 return {ctx,shown,close:loaded=>finish({loaded}),saved:()=>structuredClone(ctx.state),saves:()=>saves};
}
// Every medal is discovered without relying on a save or a specific award handler.
let r=boot();r.ctx.state.badges=[0,1,2,3,4,5,6,7];
for(let i=0;i<8;i++){r.ctx.tick();assert.equal(r.shown.at(-1),'clip'+i);r.ctx.tick();assert.equal(r.shown.length,i+1);r.close(true);}
r.ctx.tick();assert.equal(r.shown.length,8);assert.equal(r.saves(),8);
// Reload before viewing restores the pending medal; completed scenes stay completed.
r=boot({badges:[0,1],flags:{cine660_badge_0:true}});r.ctx.tick();assert.deepEqual(r.shown,['clip1']);
r=boot(r.saved());r.ctx.tick();assert.deepEqual(r.shown,['clip1']);r.close(true);
r=boot(r.saved());r.ctx.tick();assert.equal(r.shown.length,0);
// Do not cover victory dialogue, a battle, a menu, or another story clip.
for(const screen of ['dialog','battle','menu','start','title','cinematic658']){r=boot({badges:[0],flags:{}});r.ctx.state.screen=screen;r.ctx.tick();assert.equal(r.shown.length,0);r.ctx.state.screen='world';r.ctx.tick();assert.equal(r.shown.length,1);}
r=boot({badges:[0],flags:{}});r.ctx.clip659={};r.ctx.tick();assert.equal(r.shown.length,0);
r=boot({badges:[0],flags:{}});r.ctx.mod.classList.contains=()=>false;r.ctx.tick();assert.equal(r.shown.length,0);
// Failed loads remain unseen without trapping the player in an immediate retry loop.
r=boot({badges:[0],flags:{}});r.ctx.tick();r.close(false);r.ctx.tick();assert.equal(r.shown.length,1);assert.equal(r.ctx.state.flags.cine660_badge_0,undefined);
const recover=boot(r.saved());recover.ctx.tick();assert.equal(recover.shown.length,1);
// Busy player rejection does not consume the medal or permanently block the queue.
r=boot({badges:[0],flags:{}});r.ctx.playGif658=()=>false;r.ctx.tick();assert.equal(r.ctx.playing658,false);
r.ctx.playGif658=()=>true;r.ctx.tick();assert.equal(r.ctx.playing658,true);
// A genuinely loaded save switches to its own seen flags and resets transient failures.
r=boot({badges:[0],flags:{}});r.ctx.tick();r.close(false);r.ctx.applySaveData({badges:[1],flags:{}});r.ctx.tick();assert.deepEqual(r.shown,['clip0','clip1']);
console.log('PASS: eight medals, reload recovery, seen flags, dialogue/overlay gating, failed loads, busy player, save switching.');
