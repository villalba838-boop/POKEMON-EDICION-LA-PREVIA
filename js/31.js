/* 7.4 - Animación de elección: no altera el guardado hasta terminar. */
(function(){
 const previous=starterModal;
 const info={Bulbasaur:{type:'PLANTA · VENENO',color:'#71dc9d',line:'¡Un compañero tranquilo y resistente!'},Charmander:{type:'FUEGO',color:'#ffae65',line:'¡Una pequeña llama para una gran aventura!'},Squirtle:{type:'AGUA',color:'#81cfff',line:'¡Preparado para salpicar a toda la región!'}};
 starterModal=function(){
  previous.apply(this,arguments);
  const grid=modalContent.querySelector('.choice-grid');if(!grid)return;
  grid.querySelectorAll('[data-starter]').forEach(btn=>{
   const name=btn.dataset.starter;
   btn.addEventListener('click',()=>{
    const confirm=modalContent.querySelector('.title73-confirm');if(!confirm)return;
    const yes=confirm.querySelector('.yes');if(!yes)return;
    const commit=yes.onclick;
    yes.onclick=(event)=>{
     event.preventDefault();
     if(state.flags?.starter)return;
     const p=info[name];
     const layer=document.createElement('div');layer.className='starter74-layer';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','Presentación de '+name);
     layer.style.setProperty('--starter-glow',p.color);
     layer.innerHTML='<div class="starter74-stars" aria-hidden="true"></div><div class="starter74-top">LABORATORIO ALFARO · PROTOCOLO INICIAL</div><div class="starter74-capsule"><div class="starter74-glass"></div><div class="starter74-sprite"><img alt="'+name+'" src="'+media22('mon22_'+name.toLowerCase()+'_front.png')+'"></div><div class="starter74-base"></div></div><h2>¡'+name.toUpperCase()+'!</h2><p>'+p.line+'</p><small>'+p.type+' · NIVEL 5</small><div class="starter74-actions"><button type="button" class="starter74-skip">SALTAR ANIMACIÓN</button><button type="button" class="starter74-next" disabled>CONTINUAR</button></div>';
     (document.fullscreenElement||gameShell).appendChild(layer);
     let finished=false;
     const finish=()=>{if(finished)return;finished=true;clearTimeout(timer);window.removeEventListener('keydown',keys,true);layer.remove();commit.call(yes,event);if(state.flags?.starter&&window.__previaBorxetaIntro)window.__previaBorxetaIntro(name);};
     const keys=e=>{if(!layer.isConnected)return;if(['Escape','Enter',' ','Spacebar'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();finish();}};
     window.addEventListener('keydown',keys,true);
     layer.querySelector('.starter74-skip').onclick=finish;
     layer.querySelector('.starter74-next').onclick=finish;
     const timer=setTimeout(()=>{if(!layer.isConnected)return;layer.classList.add('starter74-ready');layer.querySelector('.starter74-next').disabled=false;},2100);
    };
   });
  });
 };
 if(window.__PREVIA_QA)Object.assign(window.__PREVIA_QA,{starter74:true});
})();
