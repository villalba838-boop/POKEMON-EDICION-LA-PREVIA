/* La Previa 7.1 — panel de verificación local y exportación de respaldo. */
(()=>{'use strict';
let panel=null,previous=null;
const check=()=>{
 const keys=['__PREVIA659','__PREVIA70','__PREVIA70_CHAOS','__PREVIA704_WORLD','__PREVIA706','__PREVIA707'];
 return keys.map(k=>({module:k,ok:!!window[k]}));
};
function close(){if(!panel)return;panel.remove();panel=null;previous?.focus?.();}
function exportBackup(){
 const out={format:'la-previa-71-backup',created:new Date().toISOString(),origin:location.origin,items:{}};
 try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/previa|pokemon|poke|save|partida|trainer/i.test(k))out.items[k]=localStorage.getItem(k);}}
 catch(e){alert('No se pudo leer el almacenamiento: '+e.message);return;}
 const blob=new Blob([JSON.stringify(out,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='La_Previa_7_1_respaldo_'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function open(){if(panel)return;previous=document.activeElement;panel=document.createElement('div');panel.id='previa71-qa';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Diagnóstico de la versión 7.1');panel.style.cssText='position:fixed;inset:0;z-index:2147483645;background:#070a14eb;color:#f5f5ff;display:grid;place-items:center;padding:16px;font:15px system-ui';const box=document.createElement('section');box.style.cssText='width:min(620px,100%);max-height:90vh;overflow:auto;background:#192238;border:2px solid #7b93d8;border-radius:14px;padding:20px';const h=document.createElement('h2');h.textContent='LA PREVIA 7.1 · DIAGNÓSTICO';box.append(h);const p=document.createElement('p');p.textContent='Comprueba la carga de los módulos. Este panel no modifica la partida.';box.append(p);const ul=document.createElement('ul');for(const item of check()){const li=document.createElement('li');li.textContent=(item.ok?'✓ ':'✕ ')+item.module;li.style.color=item.ok?'#a6f0bb':'#ffb5ad';ul.append(li);}box.append(ul);const prog=document.createElement('p');try{const d=window.__PREVIA707?.progress();prog.textContent=d?'Dimensión 404: '+d.found+'/3 fragmentos, '+d.echoes+'/2 ecos, final '+(d.won?'superado':'pendiente'):'Dimensión no disponible';}catch(e){prog.textContent='No se pudo leer el progreso de la dimensión.';}box.append(prog);const b=document.createElement('button');b.textContent='Descargar copia de seguridad';b.onclick=exportBackup;const c=document.createElement('button');c.textContent='Cerrar';c.onclick=close;for(const btn of [b,c]){btn.style.cssText='margin:6px;padding:10px 14px;border-radius:8px;cursor:pointer';box.append(btn);}panel.append(box);panel.addEventListener('click',e=>{if(e.target===panel)close();});(document.fullscreenElement||gameShell).append(panel);c.focus();}
document.addEventListener('keydown',e=>{if(panel&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close();return;}if(e.key==='F9'&&!e.repeat&&!e.ctrlKey&&!e.metaKey){e.preventDefault();if(panel)close();else open();}},true);
window.__PREVIA71={open,close,check,exportBackup};
})();
