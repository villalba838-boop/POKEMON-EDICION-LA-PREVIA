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
r=boot({badges:[0,1],flags:{cine661_badge_0:true}});r.ctx.tick();assert.deepEqual(r.shown,['clip1']);
r=boot(r.saved());r.ctx.tick();assert.deepEqual(r.shown,['clip1']);r.close(true);
r=boot(r.saved());r.ctx.tick();assert.equal(r.shown.length,0);
// Do not cover victory dialogue, a battle, a menu, or another story clip.
for(const screen of ['dialog','battle','menu','start','title','cinematic658']){r=boot({badges:[0],flags:{}});r.ctx.state.screen=screen;r.ctx.tick();assert.equal(r.shown.length,0);r.ctx.state.screen='world';r.ctx.tick();assert.equal(r.shown.length,1);}
r=boot({badges:[0],flags:{}});r.ctx.clip659={};r.ctx.tick();assert.equal(r.shown.length,0);
r=boot({badges:[0],flags:{}});r.ctx.mod.classList.contains=()=>false;r.ctx.tick();assert.equal(r.shown.length,0);
// Failed loads remain unseen without trapping the player in an immediate retry loop.
r=boot({badges:[0],flags:{}});r.ctx.tick();r.close(false);r.ctx.tick();assert.equal(r.shown.length,1);assert.equal(r.ctx.state.flags.cine661_badge_0,undefined);
const recover=boot(r.saved());recover.ctx.tick();assert.equal(recover.shown.length,1);
// Busy player rejection does not consume the medal or permanently block the queue.
r=boot({badges:[0],flags:{}});r.ctx.playGif658=()=>false;r.ctx.tick();assert.equal(r.ctx.playing658,false);
r.ctx.playGif658=()=>true;r.ctx.tick();assert.equal(r.ctx.playing658,true);
// A genuinely loaded save switches to its own seen flags and resets transient failures.
r=boot({badges:[0],flags:{}});r.ctx.tick();r.close(false);r.ctx.applySaveData({badges:[1],flags:{}});r.ctx.tick();assert.deepEqual(r.shown,['clip0','clip1']);
console.log('PASS: eight medals, reload recovery, seen flags, dialogue/overlay gating, failed loads, busy player, save switching.');

// Render every native scene and exercise the real player's lifecycle without media files.
const nativeSource=fs.readFileSync(__dirname+'/../js/17.js','utf8').match(/\/\* BEGIN NATIVE661 \*\/([\s\S]*?)\/\* END NATIVE661 \*\//)[1];
assert(!/\.gif\b|new Image|<video/i.test(nativeSource),'Native playback must not request GIFs/videos');
let clock=1000,rafId=0;const frames=new Map(),listeners=new Map(),monNames=new Set();
const gradient={addColorStop(){}};
const g=new Proxy({createRadialGradient:()=>gradient},{get:(o,k)=>k in o?o[k]:(...args)=>{},set:(o,k,v)=>{o[k]=v;return true;}});
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.isConnected=true;this.disabled=false;}
 append(...items){this.children.push(...items);}
 setAttribute(k,v){this[k]=v;}
 getContext(){return g;}
 focus(){doc.activeElement=this;}
 remove(){this.isConnected=false;}
 click(){this.onclick?.();}
}
const doc={head:new Element('head'),body:new Element('body'),activeElement:null,createElement:t=>new Element(t),addEventListener:(k,fn)=>listeners.set(k,fn),removeEventListener:k=>listeners.delete(k)};
const env={document:doc,gameShell:doc.body,window:{},state:{screen:'world',flags:{}},clip659:null,releaseBrand658:null,motionAllowed22:true,audioOn:false,z534Actor(){},monpic:name=>{monNames.add(name);return {complete:true,naturalWidth:96};},resetJoy27(){},heldKeys:{clear(){}},performance:{now:()=>clock},requestAnimationFrame:fn=>{frames.set(++rafId,fn);return rafId;},cancelAnimationFrame:id=>frames.delete(id),escape659:x=>x,showModal(){},modalContent:{querySelectorAll:()=>[]},backWorld(){},f532Cinema(){},serializeState:()=>({v:1}),setInterval(){},save(){},updateObjective(){},console};
vm.createContext(env);vm.runInContext(nativeSource,env);const native=vm.runInContext('({draw:drawScene661,scenes:SCENES661,play:playScene661,phase:phase661})',env);
assert.equal(Object.keys(native.scenes).length,19);
for(const scene of Object.values(native.scenes))for(const t of [0,1,2.9,3.5,4.8,7.5,11])native.draw(g,scene,t);
assert(monNames.has('Mewtwo'));assert.equal(native.phase(100,7.5),2);
let finished=0;
assert.equal(native.play('blas','Blas',r=>{assert.equal(r.renderer,'native');finished++;}),true);
assert.equal(env.state.screen,'cinematic658');assert.equal(native.play('awelo','Awelo'),false);
let layer=doc.body.children.at(-1),nav=layer.children.at(-1),caption=layer.children[2];
assert.match(caption.textContent,/estaba por aquí/);
function advance(ms){clock+=ms;const entries=[...frames];frames.clear();for(const [,fn]of entries)fn(clock);}
nav.children[0].click();const frozen=caption.textContent;advance(1000);assert.equal(caption.textContent,frozen);
nav.children[1].click();assert.equal(nav.children[0].textContent,'PAUSAR');
for(let i=0;i<80;i++)advance(100);
assert.equal(nav.children[2].textContent,'CONTINUAR');assert.match(caption.textContent,/medalla/);
nav.children[2].click();nav.children[2].click();assert.equal(finished,1);assert.equal(env.state.screen,'world');assert.equal(frames.size,0);assert.equal(listeners.size,0);
env.motionAllowed22=false;for(const scene of Object.values(native.scenes))native.draw(g,scene,3.5);
assert.equal(native.play('capsule','Mewtwo',()=>finished++),true);advance(500);listeners.get('keydown')({key:'Escape',repeat:false,preventDefault(){},stopImmediatePropagation(){}});assert.equal(finished,2);
assert.equal(native.play('blas','Blas',()=>finished++),true);advance(8000);assert.equal(doc.body.children.at(-1).children.at(-1).children[2].textContent,'CONTINUAR','Slow frames must not stretch scene duration');doc.body.children.at(-1).children.at(-1).children[2].click();assert.equal(finished,3);
console.log('PASS: 19 native scenes, render timeline, pause/replay, completion/skip, single callback, cleanup, reduced motion; no GIF/video requests.');

// Fullscreen clips belong inside the element promoted to the browser top layer.
const fullscreenRoot=new Element('fullscreen');doc.fullscreenElement=fullscreenRoot;
assert.equal(native.play('blas','Blas',()=>finished++),true);
assert.equal(fullscreenRoot.children.at(-1).className,'scene661');
advance(800);fullscreenRoot.children.at(-1).children.at(-1).children[2].click();
assert.equal(env.state.screen,'world');assert.equal(finished,4);
assert.equal(frames.size,0);assert.equal(listeners.size,0);
doc.fullscreenElement=null;
console.log('PASS: fullscreen parent, skip, restored game and cleanup.');
