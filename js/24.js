(function(){'use strict';
let active=null;
const variants=['warp','giant','explosion','burger','rainbow','ghost','shuffle'];
const map={piedra:'warp',mew:'explosion',bocata:'burger',disco:'rainbow',espejo:'ghost',gato:'ghost',pintura:'rainbow',patatas2:'burger',teletransporte:'shuffle',globo:'giant',sombrero:'giant',pato:'shuffle'};
const reduce=()=>window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function stop(){if(!active)return;const a=active;active=null;cancelAnimationFrame(a.raf);a.layer.remove();a.hud.remove();}
function play(item){stop();const canvas=document.getElementById('game');if(!canvas||!canvas.getBoundingClientRect){return;}const kind=map[item.id]||variants[Math.abs([...item.id].reduce((n,c)=>n+c.charCodeAt(0),0))%variants.length];const rect=canvas.getBoundingClientRect();if(rect.width<1||rect.height<1)return;
const layer=document.createElement('canvas');layer.width=canvas.width;layer.height=canvas.height;layer.setAttribute('aria-hidden','true');layer.style.cssText='position:fixed;pointer-events:none;z-index:99990;';const hud=document.createElement('div');hud.style.cssText='position:fixed;z-index:99991;pointer-events:none;background:#160b32dd;color:white;border:1px solid #d2b8ff;border-radius:10px;padding:8px 12px;font:700 13px system-ui;max-width:85vw;text-align:center;';hud.textContent=({warp:'EL MAPA YA NO RECUERDA SU FORMA',giant:'¡TE ESTÁS HACIENDO GIGANTE!',explosion:'¡LOS POKÉMON HAN EXPLOTADO! (¿O NO?)',burger:'¡UNA HAMBURGUESA SE HA COMIDO EL MUNDO!',rainbow:'LOS PERSONAJES CAMBIAN DE COLOR',ghost:'HAY ALGUIEN MÁS EN EL MAPA',shuffle:'¿QUIÉN ESTÁ CONTROLANDO A TU PERSONAJE?'})[kind];document.body.append(layer,hud);
const ctx=layer.getContext('2d');const started=performance.now();const duration=reduce()?2200:6500;const a={layer,hud,raf:0};active=a;
function tick(now){if(active!==a)return;const r=canvas.getBoundingClientRect();if(r.width<1||r.height<1){stop();return;}layer.style.left=r.left+'px';layer.style.top=r.top+'px';layer.style.width=r.width+'px';layer.style.height=r.height+'px';hud.style.left=Math.max(8,r.left+8)+'px';hud.style.top=Math.max(8,r.top+8)+'px';const t=(now-started)/1000;ctx.clearRect(0,0,layer.width,layer.height);const w=layer.width,h=layer.height;
try{ctx.save();if(kind==='warp'){ctx.translate(w/2,h/2);ctx.rotate(Math.sin(t*3)*.12);const z=1+.13*Math.sin(t*5);ctx.scale(z,z);ctx.translate(-w/2,-h/2);ctx.filter=`hue-rotate(${t*140}deg) saturate(2)`;ctx.drawImage(canvas,0,0);}
else if(kind==='giant'){ctx.drawImage(canvas,0,0);const z=1+Math.min(2,t*.42);ctx.translate(w/2,h*.60);ctx.scale(z,z);ctx.translate(-w/2,-h*.60);ctx.globalAlpha=.83;ctx.drawImage(canvas,0,0);}
else if(kind==='shuffle'){ctx.drawImage(canvas,0,0);for(let i=0;i<3;i++){ctx.globalAlpha=.3;ctx.drawImage(canvas,Math.sin(t*5+i)*30,Math.cos(t*4+i)*22);}}
else if(kind==='rainbow'){ctx.filter=`hue-rotate(${t*125}deg) saturate(2.8)`;ctx.drawImage(canvas,0,0);ctx.filter='none';for(let i=0;i<8;i++){ctx.fillStyle=`hsla(${t*120+i*45},100%,60%,.35)`;ctx.fillRect((i*139+t*37)%w,(i*83)%h,28,50);}}
else if(kind==='ghost'){ctx.drawImage(canvas,0,0);ctx.globalAlpha=.42;ctx.filter='hue-rotate(240deg)';ctx.drawImage(canvas,Math.sin(t*2)*45,Math.cos(t*3)*18);ctx.filter='none';ctx.globalAlpha=.9;ctx.font='64px system-ui';ctx.fillText('👤',w*.52+Math.sin(t*2)*w*.17,h*.60);}
else if(kind==='burger'){ctx.drawImage(canvas,0,0);ctx.textAlign='center';ctx.font=`${Math.round(80+Math.min(t,3)*85)}px system-ui`;ctx.fillText('🍔',w/2,h*.52);ctx.font='28px system-ui';ctx.fillText('¡ÑAM!',w*.5,h*.8);}
else if(kind==='explosion'){ctx.drawImage(canvas,0,0);ctx.textAlign='center';for(let i=0;i<7;i++){const x=w*(.12+(i%4)*.24),y=h*(.22+Math.floor(i/4)*.46);const phase=Math.max(0,t-i*.25);ctx.font=`${Math.round(30+Math.min(phase,1)*65)}px system-ui`;ctx.globalAlpha=Math.max(.1,1-phase/3);ctx.fillText(phase<.7?'⚡':phase<1.8?'💥':'✨',x,y);}}ctx.restore();}catch(e){ctx.restore();stop();return;}
if(now-started>=duration){stop();return;}a.raf=requestAnimationFrame(tick);}
a.raf=requestAnimationFrame(tick);}
window.__PREVIA704_WORLD={play,stop};
window.addEventListener('pagehide',stop);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active)stop();});
})();
