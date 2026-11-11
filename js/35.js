/* 8.0 audit: world clues, fullscreen overlays, final bindings and release identity. */
(()=>{'use strict';
const clues=[
 ['benifaio','benifaio','El recado de Marshall','Marshall ha perdido la lista de la mesa. En el reverso pone: «El jueves, donde siempre».'],
 ['silla','silla','La factura de Team Cierre','Una factura arrugada lleva el sello de Sergio. El turno termina después de la siesta.'],
 ['albal','albal','El pedido imposible','El pedido dice: 404 hamburguesas, cero servilletas. Blas sospecha de Rober.'],
 ['sueca','sueca','El marcador del 5 %','Bajo el marcador encuentras la última jugada: confianza, una ayuda y un triple.'],
 ['festivern','picassent','La pista de cristal','Un brillo violeta apunta al laboratorio. Nachito ha olvidado apagar la máquina.'],
 ['zaragoza','zaragoza','El bingo imposible','El Limonero ha anotado el 404 en una casilla que no existe.']
];
for(const [id,scene,title,line] of clues){const sc=SCENES[scene];if(!sc)continue;const oldScene=state.scene;state.scene=scene;const sp=sc.spawn||[sc.w/2,sc.h/2];let at=null;
 for(let radius=1;radius<5&&!at;radius+=.5)for(let i=0;i<16&&!at;i++){const x=Math.round((sp[0]+Math.cos(i*Math.PI/8)*radius)*2)/2,y=Math.round((sp[1]+Math.sin(i*Math.PI/8)*radius)*2)/2;if(x>1&&y>1&&x<sc.w-1&&y<sc.h-1&&!collision(x,y)&&getSceneNpcs().every(n=>Math.hypot(n.x-x,n.y-y)>1.1))at=[x,y];}
 state.scene=oldScene;if(at)(LORE_POINTS[scene]||(LORE_POINTS[scene]=[])).push({id:'v80clue_'+id,x:at[0],y:at[1],who:'alfaro',label:'📜 '+title,title:'📜 '+title,lines:[line]});
}
const talk=landmarkTalk;landmarkTalk=function(p){if(!p?.id?.startsWith('v80clue_'))return talk(p);const id=p.id.slice(8),q=clues.find(x=>x[0]===id);if(!q)return;if(!state.flags.starter)return toast('Primero elige tu compañero con Alfaro.');dialog(null,[q[3],'Pista registrada. Reclama el recado en START → Aventura 8.0.'],()=>{state.flags['v80_found_'+id]=true;save();backWorld();});};
const profile=getProfile;getProfile=function(id){return profile(id==='borxeta_intro'||id?.startsWith('v80:borxeta:')?'borxeta':id);};
const serialize=serializeState;serializeState=function(){const d=serialize();d.edition='8.0';d.patch='revision-auditada-1';return d;};
// Add the diary to the main menu; retain every optional action in Extras.
const start=openStart29;openStart29=function(){start();const menu=$('startMenu29'),extra=$('startExtras662');if(!menu||!extra)return;for(const b of [...menu.querySelectorAll('button')]){if(b.dataset.v80){menu.insertBefore(b,menu.querySelector('[data-start29="save"]'));continue;}if(!b.dataset.start29&&b.id!=='help659Start')extra.append(b);}};
const newGame=title64StartNew;title64StartNew=function(id){newGame(id);state.flags.v80_dim_imported=true;state.flags.v80_dim_echoes=0;state.flags.v80_dim_won=false;};
$('intro67Skip').onclick=()=>intro67End();
const titleFrame=title64Frame;title64Frame=function(){titleFrame.apply(this,arguments);const label=title64Layer.querySelector('.title64-footer span');if(label)label.textContent='EDICIÓN LA PREVIA · WEB 8.0 · REVISIÓN';};
document.title='Pokémon La Previa · 8.0 · Revisión';if(releaseBrand658)releaseBrand658.textContent='AVENTURA WEB · 8.0';
if(window.__PREVIA_QA)Object.assign(window.__PREVIA_QA,{getState:()=>state,serializeState:()=>serializeState(),validSave:o=>validSave(o),setState:o=>applySaveData(o),save:()=>save(),startBattle:(...a)=>startBattle(...a),winBattle:()=>winBattle(),landmarkTalk:p=>landmarkTalk(p),npcTalk:n=>npcTalk(n),openStart29:()=>openStart29(),starterModal:()=>starterModal(),title64StartNew:id=>{title64ConfirmNew=true;title64StartNew(id)},intro67End:()=>intro67End(),getScenes:()=>SCENES,clues80:()=>clues.map(q=>({id:q[0],scene:q[1],point:(LORE_POINTS[q[1]]||[]).find(p=>p.id==='v80clue_'+q[0])})),nativeScenes:()=>Object.keys(SCENES661),playNative:(id)=>playScene661(id),finishEntry:()=>finishEntry54(),finishDialog:()=>{let n=0;while(state.screen==='dialog'&&n++<30)(dialogInputReadyAt=0,$('nextDialog')?.onclick?.());},visit:(scene)=>{hideModal();state.screen='world';changeScene(scene);},rescue:rescue659});
})();
