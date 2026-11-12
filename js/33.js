/* La Previa 7.8: optional nine-character new-game introductions. No save schema changes. */
(function(){
 const scenes={
 marshall:['MARSHALL','¡La mesa nunca se cancela!','Antes de salir, comprueba que llevas las Poké Balls. Yo llevo la reserva.'],
 horte:['HORTE','¡TRIPLE SOBRE LA BOCINA!','Horte lanza desde la puerta del laboratorio. Alfaro pide que no vuelva a hacerlo.'],
 plata:['PLATA','Hoy va a ser un día tranquilo.','Plata ve el mapa de Benifaió y empieza a calentarse antes de dar el primer paso.'],
 awelo:['AWELO','NO AWELO NO.','El Awelo se levanta de mal humor. «¿Quién me ha despertado para esto?»'],
 sergio:['SERGIO','Bienvenido a la franquicia.','Sergio repasa su acta y anuncia que esta aventura tendrá normas.'],
 alfaro:['ALFARO','¡Bienvenido al laboratorio!','Alfaro cierra sus apuntes: «Primero un compañero Pokémon; luego las preguntas».'],
 nachito:['NACHITO','¿Pero esto por dónde se sale?','Nachito entra por la puerta equivocada y decide que igualmente era el camino bueno.'],
 javi_grau:['JAVI GRAU','¿Ya habéis empezado?','Javi Grau aparece de repente. Nadie recuerda haberle visto entrar.'],
 blas:['BLAS','¡LAS PATATAS SON SAGRADAS!','Blas guarda la última patata antes de empezar. Esta vez no piensa compartir.']
 };
 let open=false;
 // The original new-game flow enters intro67 first; only show our scene after it ends.
 const previousIntroEnd=intro67End;
 intro67End=function(){
  const chosen=typeof state!=='undefined'&&state.player?.chosen;
  const wasIntro=typeof intro67!=='undefined'&&!!intro67;
  previousIntroEnd.apply(this,arguments);
  if(wasIntro&&state?.screen==='world'&&scenes[chosen]&&!open)show(chosen);
 };
 function show(id){
  const previousScreen=state.screen;state.screen='trainer80';resetJoy27();heldKeys.clear();open=true;let step=0;const data=scenes[id];
  const layer=document.createElement('section');layer.className='trainer78';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','Presentación de '+data[0]);
  const picture=document.createElement('img');picture.src='assets/seleccion73/'+id+'.png';picture.alt='Retrato de '+data[0];picture.onerror=()=>{picture.onerror=null;picture.src=title65MapSprite(id)};
  layer.innerHTML='<div class="trainer78-top">POKÉMON EDICIÓN LA PREVIA · NUEVA AVENTURA</div><div class="trainer78-spotlight"></div><div class="trainer78-portrait"></div><div class="trainer78-copy"><small>ENTRENADOR ELEGIDO</small><h2></h2><p></p><div class="trainer78-controls"><button type="button" data-skip>SALTAR</button><button type="button" data-next>CONTINUAR ▸</button></div></div>';
  layer.querySelector('.trainer78-portrait').appendChild(picture);(document.fullscreenElement||gameShell).appendChild(layer);
  const title=layer.querySelector('h2'),line=layer.querySelector('p'),next=layer.querySelector('[data-next]');
  function render(){title.textContent=data[0];line.textContent=data[step+1];next.textContent=step===1?'¡A JUGAR!':'CONTINUAR ▸';layer.classList.toggle('trainer78-second',step===1)}
  function close(){if(!open)return;open=false;state.screen=previousScreen;heldKeys.clear();window.removeEventListener('keydown',onKey,true);layer.remove();}
  function advance(){if(step===1)close();else{step=1;render();}}
  function onKey(e){if(!open)return;if(['Enter',' ','Escape'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();e.key==='Escape'?close():advance()}}
  layer.querySelector('[data-skip]').onclick=close;next.onclick=advance;window.addEventListener('keydown',onKey,true);render();
 }
 window.__PREVIA_78={version:'7.8',characters:Object.keys(scenes),preview:(id)=>{if(!open&&scenes[id])show(id)}};
})();
