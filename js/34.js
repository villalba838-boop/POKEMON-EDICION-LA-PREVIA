/* LA PREVIA 8.0 — expansion compatible with existing v:1 saves. */
(()=>{'use strict';
const QUESTS=[
 {id:'benifaio',title:'El recado de Marshall',city:'Benifaió',detail:'Vuelve a recorrer Benifaió y recoge el encargo de Marshall.',scenes:['benifaio','pueblo','inicio'],reward:120},
 {id:'silla',title:'La factura de Team Cierre',city:'Silla',detail:'Encuentra el rastro de la factura en Silla.',scenes:['silla'],reward:160},
 {id:'albal',title:'El pedido imposible',city:'Albal',detail:'Visita Albal y revisa los pedidos de Burger L’Horta.',scenes:['albal','burger'],reward:180},
 {id:'sueca',title:'El milagro del 5 %',city:'Sueca',detail:'Investiga el marcador de la remontada en Sueca.',scenes:['sueca'],reward:220},
 {id:'festivern',title:'La pista de cristal',city:'Festivern',detail:'Busca un rastro de la piedra de cristal.',scenes:['festivern'],reward:260},
 {id:'zaragoza',title:'El bingo imposible',city:'Zaragoza',detail:'Investiga el extraño bingo de Zaragoza.',scenes:['zaragoza'],reward:300}
];
const RIVALS=[{id:'silla',city:'Silla',scene:'silla',level:9},{id:'albal',city:'Albal',scene:'albal',level:15},{id:'sueca',city:'Sueca',scene:'sueca',level:22},{id:'festivern',city:'Festivern',scene:'festivern',level:28},{id:'zaragoza',city:'Zaragoza',scene:'zaragoza',level:35}];
let panel=null,oldFocus=null;
const ready=()=>typeof state!=='undefined'&&!!state.flags?.starter;
const f=key=>!!state.flags['v80_'+key];
const put=key=>{state.flags['v80_'+key]=true;save();};
const scene=()=>String(state.scene||'').toLowerCase();
const match=(id)=>scene().includes(id)||(id==='festivern'&&scene()==='picassent')||(id==='zaragoza'&&scene().startsWith('z534_'));
const currentQuest=q=>q.scenes.some(match);
function safeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function claim(q){if(!ready()||f('quest_'+q.id)||!currentQuest(q)||!f('found_'+q.id))return;const amount=Math.min(q.reward,Math.max(0,9999999-state.money));state.money+=amount;put('quest_'+q.id);toast('¡Misión completada! +'+amount+' monedas');render();}
function event(q){if(!ready()||f('event_'+q.id)||!currentQuest(q))return;const lines={benifaio:'Marshall ha dejado un recado que nadie sabe interpretar.',silla:'El acta de Sergio aparece firmada por un entrenador desconocido.',albal:'Burger L’Horta recibe un pedido con 404 hamburguesas.',sueca:'El marcador vuelve a mostrar 25–44. ¿Se repetirá el milagro?',festivern:'El laboratorio vibra. Algo brilla bajo el suelo.',zaragoza:'El bombo anuncia el número 404 y se detiene.'};close();dialog(null,[lines[q.id],'¡Evento descubierto en '+q.city+'!'],()=>{put('event_'+q.id);backWorld();});}

function duel(r){if(!ready()||!match(r.scene)||f('borxeta_'+r.id))return;if(state.party.every(p=>p.hp<=0)){alert('Cura primero a tu equipo.');return;}close();const picked=state.party[0]?.name;const counter={Bulbasaur:'Charmander',Charmander:'Squirtle',Squirtle:'Bulbasaur'};startBattle(counter[picked]||'Pidgey',r.level,false,'v80:borxeta:'+r.id);}
function bonus404(){const p=window.__PREVIA707?.progress?.();if(!p?.won){alert('Primero completa el desafío original de Dimensión 404.');return;}if(f('bonus404'))return;const amount=Math.min(404,Math.max(0,9999999-state.money));state.money+=amount;put('bonus404');toast('¡Eco estabilizado! +'+amount+' monedas');render();}
function backup(){if(window.__PREVIA71?.exportBackup)window.__PREVIA71.exportBackup();else alert('El módulo de respaldo no está disponible.');}
function status(){const q=QUESTS.filter(x=>f('quest_'+x.id)).length;return q+' / '+QUESTS.length+' recados · '+RIVALS.filter(x=>f('borxeta_'+x.id)).length+' / '+RIVALS.length+' duelos de Borxeta';}
function close(){if(!panel)return;panel.remove();panel=null;state.screen='world';resetJoy27();heldKeys.clear();document.removeEventListener('keydown',key,true);oldFocus?.focus?.();}
function key(e){if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close();}}
function render(){if(!panel)return;const body=panel.querySelector('[data-body]');body.replaceChildren();
 const header=document.createElement('p');header.textContent='Zona actual: '+(typeof SCENES!=='undefined'&&SCENES[state.scene]?.name||state.scene)+' · '+status();body.append(header);
 function section(title,description){const h=document.createElement('h3');h.textContent=title;body.append(h);const p=document.createElement('p');p.textContent=description;p.className='v80-muted';body.append(p);}
 function item(title,detail,label,enabled,action){const row=document.createElement('div');row.className='v80-item';const info=document.createElement('div');const strong=document.createElement('strong');strong.textContent=title;const p=document.createElement('p');p.textContent=detail;info.append(strong,p);const btn=document.createElement('button');btn.textContent=label;btn.disabled=!enabled;btn.onclick=action;row.append(info,btn);body.append(row);}
 section('Misiones secundarias','Descubre cada ciudad y cobra una recompensa sin perder la historia principal.');
 QUESTS.forEach(q=>item(q.title,q.city+' · '+q.detail,f('quest_'+q.id)?'✓ Completada':currentQuest(q)?f('found_'+q.id)?'Completar +'+q.reward:'Busca la pista en el mapa':'Visita '+q.city,!f('quest_'+q.id)&&currentQuest(q)&&f('found_'+q.id),()=>claim(q)));
 section('Eventos por ciudad','Pequeñas escenas narrativas, una por ciudad, sin bloquear misiones.');
 QUESTS.forEach(q=>item('Evento: '+q.city,'Encuentro especial de la zona',f('event_'+q.id)?'✓ Visto':currentQuest(q)?'Descubrir':'No disponible',!f('event_'+q.id)&&currentQuest(q),()=>event(q)));
 item('Primer duelo · Borxeta','Puedes recuperar el duelo del laboratorio si lo dejaste pendiente.',state.flags.borxetaDuelWon?'✓ Vencido':'Combatir nivel 5',!state.flags.borxetaDuelWon,()=>{close();window.__PREVIA_76.duel();});
 section('Borxeta vuelve','Desafíos opcionales con dificultad creciente; una victoria por ciudad.');
 RIVALS.forEach(r=>item('Borxeta · '+r.city,'Combate de nivel '+r.level,f('borxeta_'+r.id)?'✓ Vencido':match(r.scene)?'¡Combatir!':'Busca a Borxeta',!f('borxeta_'+r.id)&&match(r.scene),()=>duel(r)));
 section('Dimensión 404 · Epílogo','Recompensa adicional al terminar el desafío original.');
 const done=!!window.__PREVIA707?.progress?.()?.won;item('El eco estabilizado','Desbloquea 404 monedas después del final de Dimensión 404.',f('bonus404')?'✓ Recuperado':done?'Reclamar':'Final pendiente',done&&!f('bonus404'),bonus404);
 section('Partida y accesibilidad','Herramientas para proteger el progreso y salir de bloqueos.');
 item('Copia de seguridad','Descarga un archivo con los guardados locales.','Exportar respaldo',true,backup);
 item('Recuperación de posición','Te devuelve al punto de aparición del mapa actual; no altera las misiones.','Volver al inicio',true,()=>{if(!confirm('¿Volver al punto de aparición de esta zona?'))return;close();rescue659();});
}
function open(){if(panel||!ready()){if(!ready())alert('Comienza una partida antes de abrir el diario.');return;}if(state.screen==='start')closeStart29();if(state.screen!=='world')return;oldFocus=document.activeElement;state.screen='diary80';resetJoy27();heldKeys.clear();panel=document.createElement('div');panel.id='previa80';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Diario de aventura 8.0');panel.innerHTML='<div class="v80-card"><header><div><small>POKÉMON EDICIÓN LA PREVIA</small><h2>DIARIO DE AVENTURA · 8.0</h2></div><button data-close>CERRAR ×</button></header><div data-body></div></div>';(document.fullscreenElement||gameShell).append(panel);panel.querySelector('[data-close]').onclick=close;panel.addEventListener('click',e=>{if(e.target===panel)close();});document.addEventListener('keydown',key,true);render();panel.querySelector('[data-close]').focus();}
function inject(){const menu=document.getElementById('startMenu29');if(!menu||menu.querySelector('[data-v80]'))return;const b=document.createElement('button');b.type='button';b.dataset.v80='1';b.innerHTML='<span class="start-icon29">📜</span><span>AVENTURA 8.0</span><span class="start-arrow29">›</span>';b.onclick=open;menu.insertBefore(b,menu.querySelector('[data-start29="save"]'));}
const previous=openStart29;openStart29=function(){previous.apply(this,arguments);inject();};
document.addEventListener('keydown',e=>{if(e.key==='j'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.repeat&&!panel&&ready()&&state.screen==='world'){e.preventDefault();open();}},true);
window.__PREVIA80={version:'8.0',open,close,status,quests:QUESTS.map(q=>q.id),rivals:RIVALS.map(r=>r.id)};
})();
