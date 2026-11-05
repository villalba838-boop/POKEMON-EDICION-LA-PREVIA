/* Pokémon Edición La Previa — 6.44 (acceso inicial a Alfaro + recursos)
 * Parche aditivo: no cambia el guardado ni los requisitos de las rutas.
 */
(()=>{
  if(typeof SCENES==='undefined'||typeof state==='undefined'||typeof getNearby!=='function'||typeof collision!=='function')return;
  const labDoor=()=>{
    const b=SCENES.benifaio?.buildings?.find(o=>o.type==='lab'||/LAB\.? ALFARO|LABORATORIO/i.test(o.label||''));
    const [x,y]=b?.door||[11,11];return {x:x+.5,y:y+.8,tx:Math.floor(x),ty:Math.floor(y)};
  };
  // Entrar al laboratorio sin un Pokémon es el primer objetivo, no un bloqueo.
  const nearbyBefore=getNearby;
  getNearby=function(){
    const old=nearbyBefore();
    // Al terminar la intro en la sede de Marshall, la puerta de salida
    // debe funcionar aun cuando la mochila sigue sin Pokémon.
    if(state.screen==='world'&&state.scene==='casa_beni32'&&!state.flags.starter&&typeof PORTALS!=='undefined'){
      const exit=(PORTALS.casa_beni32||[]).find(p=>p.to==='benifaio');
      if(exit){const d=Math.hypot(state.player.x-exit.x,state.player.y-exit.y);
        if(d<1.55)return {kind:'lore',point:{id:'portal',portal:exit,label:exit.label||'SALIR A BENIFAIÓ'},dist:d};}
    }
    if(state.screen!=='world'||state.scene!=='benifaio'||!SCENES.lab)return old;
    const d=labDoor(),dist=Math.hypot(state.player.x-d.x,state.player.y-d.y);
    if(dist<=1.6)return {kind:'door',scene:'lab',spawn:SCENES.lab.spawn||[8,11],dist,label:'LABORATORIO DE ALFARO'};
    return old;
  };
  const collisionBefore=collision;
  collision=function(x,y){
    if(state.screen==='world'&&state.scene==='benifaio'){
      const d=labDoor();if(Math.floor(x)===d.tx&&Math.floor(y)===d.ty)return false;
    }
    return collisionBefore(x,y);
  };
  // Reutiliza solo PNG con transparencia real presentes en el repositorio.
  // Ancla visual independiente de la huella bloqueante en la cuadrícula de 48px.
  const objects=[
    {id:'beni_banco_huerta',scene:'benifaio',asset:'world_bench25',custom:'/assets/benifaio652/banco_madera_53.png',x:4,y:25,w:1.65,h:.9,foot:[4,25,2,1],solid:true},
    {id:'beni_naranjo',scene:'benifaio',asset:'world_tree25',custom:'/assets/benifaio652/arbol_kanto.png',x:2.5,y:4,w:2.3,h:2.4,foot:[3,6,1,1],solid:false},
    {id:'beni_maceta',scene:'benifaio',asset:'world_roundplanter',x:37,y:22,w:.9,h:.9,foot:[37,22,1,1],solid:false},
    {id:'albal_banco_terraza',scene:'albal',asset:'world_bench25',x:3,y:21,w:1.65,h:.9,foot:[3,21,2,1],solid:true},
    {id:'albal_maceta',scene:'albal',asset:'world_roundplanter',x:30,y:21,w:.9,h:.9,foot:[30,21,1,1],solid:false},
    {id:'sueca_banco',scene:'sueca',asset:'world_bench25',custom:'/assets/benifaio652/banco_madera_53.png',x:4,y:23,w:1.65,h:.9,foot:[4,23,2,1],solid:true}
  ];
  const colBefore=collision;
  collision=function(x,y){
    if(colBefore(x,y))return true;
    if(state.screen!=='world')return false;
    const a=Math.floor(x),b=Math.floor(y);
    return objects.some(o=>o.solid&&o.scene===state.scene&&a>=o.foot[0]&&a<o.foot[0]+o.foot[2]&&b>=o.foot[1]&&b<o.foot[1]+o.foot[3]);
  };
  if(typeof drawTownProps==='function'&&typeof asset==='function'&&typeof ctx!=='undefined'){
    const townBefore=drawTownProps;
    const customCache={};
    drawTownProps=function(s){
      townBefore(s);
      for(const o of objects){if(o.scene!==state.scene)continue;
        if(o.custom&&!customCache[o.custom]){customCache[o.custom]=new Image();customCache[o.custom].src=o.custom;}
        const preferred=customCache[o.custom];
        const im=preferred?.complete&&preferred.naturalWidth?preferred:asset(o.asset);
        if(im?.complete&&im.naturalWidth)ctx.drawImage(im,o.x*TILE,o.y*TILE,o.w*TILE,o.h*TILE);
      }
    };
  }
  window.__PREVIA_PACK_644={tile:48,version:'6.44',objects,
    labDoor:labDoor,sanCucufato:['cucu_prop_cucu_estatua','cucu_prop_cucu_campana','cucu_prop_cucu_banco','cucu_prop_cucu_cofre','cucu_prop_cucu_vela','cucu_prop_cucu_reliquias_autenticas'],
    check:()=>({scene:state.scene,starter:!!state.flags.starter,near:getNearby()})};
  if(window.__PREVIA_QA)window.__PREVIA_QA.pack644=window.__PREVIA_PACK_644;
})();
