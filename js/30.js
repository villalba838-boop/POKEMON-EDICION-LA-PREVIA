/* 7.3: original nine trainer capsules + original three Pokemon choice.
   This is a visual enhancement only. Existing new-game and starter save handlers remain authoritative. */
(function(){
const trainerIds=['marshall','horte','plata','awelo','sergio','alfaro','nachito','javi_grau','blas'];
const oldCharacters=title64Characters;
title64Characters=function(){
 oldCharacters.apply(this,arguments);
 const panel=title64Layer.querySelector('.title64-panel');if(!panel)return;
 const grid=panel.querySelector('.title64-trainer-grid');if(!grid)return;
 panel.classList.add('title73-lab');
 const heading=panel.querySelector('.title64-panel-head');if(heading){heading.textContent='ELIGE TU PERSONAJE · 9 CÁPSULAS';heading.classList.add('title73-heading');}
 for(const card of [...grid.querySelectorAll('[data-char64]')]){
  const id=card.dataset.char64;
  if(!trainerIds.includes(id)){card.remove();continue;}
  const pic=card.querySelector('img');if(pic){pic.src='assets/seleccion73/'+id+'.png';pic.onerror=()=>{pic.onerror=null;pic.src=title65MapSprite(id)};}
  card.setAttribute('aria-label','Seleccionar '+(CHARS[id]?.name||id));
 }
 const preview=panel.querySelector('.title64-trainer-preview > img');if(preview){preview.src='assets/seleccion73/'+title64Selected+'.png';preview.onerror=()=>{preview.onerror=null;preview.src=title65MapSprite(title64Selected)}}
 const sub=document.createElement('div');sub.className='title73-subtitle';sub.textContent='Las cápsulas contienen los personajes del juego. Elige uno para recorrer Benifaió.';
 grid.before(sub);
};
const oldStarter=starterModal;
starterModal=function(){
 oldStarter.apply(this,arguments);
 const grid=modalContent.querySelector('.choice-grid');if(!grid)return;
 grid.classList.add('title73-pokemon');
 const h=modalContent.querySelector('h2');if(h)h.textContent='LABORATORIO ALFARO · ELIGE TU POKÉMON';
 const desc=modalContent.querySelector('p');if(desc)desc.textContent='Tres cápsulas, tres compañeros. Elige con calma: tu decisión quedará guardada en esta partida.';
 const types={Bulbasaur:'PLANTA · VENENO',Charmander:'FUEGO',Squirtle:'AGUA'};
 for(const btn of grid.querySelectorAll('[data-starter]')){
  const name=btn.dataset.starter,span=btn.querySelector('span');if(span)span.textContent=types[name]+' · NIVEL 5';
  const original=btn.onclick;
  btn.onclick=function(ev){
   ev.preventDefault();
   if(modalContent.querySelector('.title73-confirm'))modalContent.querySelector('.title73-confirm').remove();
   const confirm=document.createElement('div');confirm.className='title73-confirm';
   const label=document.createElement('p');label.textContent='¿Comenzar la aventura con '+name+'? Esta elección no se puede cambiar.';
   const yes=document.createElement('button');yes.className='yes';yes.textContent='SÍ, ¡A LA AVENTURA!';
   const no=document.createElement('button');no.className='no';no.textContent='VOLVER A ELEGIR';
   yes.onclick=()=>original.call(btn,ev);no.onclick=()=>{confirm.remove();btn.focus()};
   confirm.append(label,yes,no);grid.after(confirm);yes.focus();
  };
 }
};
if(window.__PREVIA_QA)Object.assign(window.__PREVIA_QA,{selection73:true,selection73TrainerIds:trainerIds});
})();
