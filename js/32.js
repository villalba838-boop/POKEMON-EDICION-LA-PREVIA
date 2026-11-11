/* 7.6: Borxeta intro + optional real battle; avoids changing quest Blas. */
(function(){
 let active=false;
 const portrait='/assets/ba/ba8a1f80a7449f5bb2ba21e3.webp';
 const scene='/assets/ae/ae191997443528952ce23a10.png';
 const steps=[
  ['NARRADOR','Una voz interrumpe el momento más importante del laboratorio...'],
  ['BORXETA','ESTIC BÉ ACÍ????'],
  ['ALFARO','¡Borxeta! ¡Aparta de las cápsulas!'],
  ['BORXETA','Vale, vale... ¿pero yo contra quién juego?'],
  ['BORXETA','¡Te reto a un combate! ¿O también tengo que preguntar dónde estoy?']
 ];
 function duel(){
  if(typeof state==='undefined'||!state.flags?.starter||state.screen!=='world'||typeof startBattle!=='function'){
   if(typeof toast==='function')toast('Termina la elección antes de combatir.');return;
  }
  if(state.flags.borxetaDuelWon){if(typeof toast==='function')toast('Ya has ganado el duelo de Borxeta.');return;}
  const picked=state.party?.[0]?.name || ''; // flags.starter is boolean, not the Pokemon name
  const counter={Bulbasaur:'Charmander',Charmander:'Squirtle',Squirtle:'Bulbasaur'};
  const enemy=counter[picked]||'Pidgey';
  startBattle(enemy,5,false,'borxeta_intro');
 }
 window.__previaBorxetaIntro=function(starter){
  if(active||!document.body)return;if(state.screen==='dialog'){const flags=state.flags;setTimeout(()=>{if(state.flags===flags&&state.flags.starter)window.__previaBorxetaIntro(starter);},250);return;}if(state.screen!=='world')return;
  if(typeof state!=='undefined'&&state.flags?.borxetaIntroSeen)return; const previousScreen=state.screen;state.screen='rival80';resetJoy27();heldKeys.clear();active=true;let index=0;
  const layer=document.createElement('section');layer.className='borxeta75';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','Presentación de Borxeta');
  layer.innerHTML='<div class="borxeta75-top"><span>LA PREVIA · PRIMER RIVAL</span><button type="button" data-skip>SALTAR ESCENA ×</button></div><div class="borxeta75-stage"><img class="borxeta75-back" alt="Escena de Borxeta" src="'+scene+'"><div class="borxeta75-aura"></div><img class="borxeta75-face" alt="Retrato de Borxeta" src="'+portrait+'"><div class="borxeta75-banner">¡APARECE BORXETA!</div></div><div class="borxeta75-dialog"><strong data-speaker></strong><p data-line></p><div class="borxeta75-bottom"><span data-progress></span><button type="button" data-next>SIGUIENTE ▸</button></div></div>';
  (document.fullscreenElement||gameShell).appendChild(layer);
  const nextButton=layer.querySelector('[data-next]');
  function render(){layer.querySelector('[data-speaker]').textContent=steps[index][0];layer.querySelector('[data-line]').textContent=steps[index][1];layer.querySelector('[data-progress]').textContent=(index+1)+' / '+steps.length;if(index===steps.length-1){nextButton.textContent='¡COMBATIR!';let later=layer.querySelector('[data-later]');if(!later){later=document.createElement('button');later.type='button';later.dataset.later='';later.textContent='AHORA NO';later.style.marginLeft='8px';later.onclick=()=>end(false);nextButton.after(later);}}else nextButton.textContent='SIGUIENTE ▸';}
  function end(fight){if(!active)return;active=false;state.screen=previousScreen;heldKeys.clear();if(typeof state!=='undefined'&&state.flags){state.flags.borxetaIntroSeen=true;if(typeof save==='function')save();}window.removeEventListener('keydown',keys,true);layer.remove();if(fight)duel();}
  function next(){if(index>=steps.length-1)end(true);else{index++;render();}}
  function keys(e){if(!active)return;if(['Enter',' ','Spacebar','Escape'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();e.key==='Escape'?end(false):next();}}
  layer.querySelector('[data-skip]').onclick=()=>end(false);nextButton.onclick=next;
  window.addEventListener('keydown',keys,true);render();
 };
 window.__PREVIA_76={version:'7.7',duel,preview:()=>window.__previaBorxetaIntro('Charmander')};
})();
