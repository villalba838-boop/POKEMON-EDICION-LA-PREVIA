/* La Previa 6.59 — Cuaderno del entrenador. Independiente del guardado del motor. */
(function(){
 'use strict';
 const KEY='la-previa-cuaderno-659';
 const chapters=[
  ['Benifaió','Conoce a Alfaro y consigue tu primer Pokémon.'],
  ['Silla','Investiga el pabellón y consigue la medalla de Sergio.'],
  ['Albal','Explora Burger L’Horta y resuelve el reto de Blas.'],
  ['L’Alqueria','Descubre el desafío de Plata.'],
  ['Sueca','Vive la remontada del 5 % de Horte.'],
  ['Picassent','Sigue las pistas del laboratorio.'],
  ['Zaragoza','Explora El Tubo y el apartamento de Awelo.'],
  ['Final','Prepárate para Team Cierre y Mewtwo.']
 ];
 const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let notes={};try{const obj=JSON.parse(localStorage.getItem(KEY)||'{}');if(obj&&typeof obj==='object'&&!Array.isArray(obj))notes=obj;}catch(e){}
 const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(notes));return true;}catch(e){return false;}};
 function openNotebook(){
  if(typeof state==='undefined'||!['world','start'].includes(state.screen))return;
  if(state.screen==='start'&&typeof closeStart29==='function')closeStart29();
  const badges=Array.isArray(state.badges)?state.badges:[];
  const flags=state.flags||{};
  const progress=chapters.map((c,i)=>i===0?!!flags.starter:i<=5?badges.includes(i-1):i===7?badges.length>=8:false);
  const completed=progress.filter(Boolean).length;
  state.screen='menu';
  showModal(`<div class="eyebrow">LA PREVIA · 6.59</div><h2>Cuaderno del entrenador</h2><p>Tu aventura · ${completed}/${chapters.length} hitos orientativos · ${badges.length}/8 medallas</p><p>Apunta pistas, personajes y cosas que quieras explorar. Las notas se guardan en este navegador y no modifican tu partida.</p><div class="notebook659-list">${chapters.map((c,i)=>`<div class="notebook659-entry"><label for="nb659-${i}"><b>${progress[i]?'✓':'○'} ${escapeHTML(c[0])}</b><small>${escapeHTML(c[1])}</small></label><textarea id="nb659-${i}" maxlength="600" rows="2" placeholder="Mis pistas y notas…">${escapeHTML(String(notes[i]||'').slice(0,600))}</textarea></div>`).join('')}</div><div class="modal-actions"><button type="button" id="nb659-save" class="primary">GUARDAR NOTAS</button><button type="button" id="nb659-export" class="secondary">EXPORTAR NOTAS</button><button type="button" id="nb659-back" class="secondary">VOLVER</button></div>`);
  const collect=()=>{chapters.forEach((_,i)=>{const v=document.getElementById('nb659-'+i)?.value||'';notes[i]=v.slice(0,600);});return persist();};
  document.getElementById('nb659-save').onclick=()=>{const ok=collect();if(typeof toast==='function')toast(ok?'Notas guardadas':'No se pudieron guardar las notas');};
  document.getElementById('nb659-back').onclick=()=>{collect();backWorld();};
  document.getElementById('nb659-export').onclick=()=>{collect();const data={version:1,created:new Date().toISOString(),notes};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='la-previa-cuaderno.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);};
 }
 const menu=document.getElementById('startMenu29');
 if(menu){const btn=document.createElement('button');btn.type='button';btn.dataset.notebook659='1';btn.innerHTML='<span class="start-icon29">✎</span><span>CUADERNO</span><span class="start-arrow29">›</span>';btn.addEventListener('click',openNotebook);const guide=menu.querySelector('[data-aventura658]');if(guide)guide.after(btn);else menu.appendChild(btn);}
 document.addEventListener('keydown',e=>{if(e.key?.toLowerCase()!=='j'||e.repeat||e.altKey||e.ctrlKey||e.metaKey||typeof state==='undefined'||state.screen!=='world'||['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;e.preventDefault();openNotebook();});
 window.__PREVIA659={openNotebook,chapters:chapters.length,getNotes:()=>({...notes})};
})();
