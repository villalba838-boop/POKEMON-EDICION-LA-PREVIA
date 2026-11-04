
(function(){
  window.__ASSETS = window.__ASSETS || {};
  window.__ASSETS['lp85_building_burger_11x7.png'] = '/assets/2d/2ddbca4678261e210a8afc0f.png';
  window.__ASSETS['lp85_building_house_7x6.png'] = window.__ASSETS["s579_benifaio_casa.png"];
  window.__ASSETS['lp85_building_shop_7x5.png'] = window.__ASSETS["s579_benifaio_tienda.png"];
  window.__ASSETS['lp85_building_taverna_7x5.png'] = '/assets/10/1052f0c0c490fdd876e9496e.webp';
  window.__ASSETS['lp85_building_gym_8x6.png'] = window.__ASSETS["s579_alqueria_gym.png"];
  window.__ASSETS['lp85_lab_interior.png'] = '/assets/01/0198cce99aa13c5172d86eb7.webp';
  window.__ASSETS['lp85_burger_interior.png'] = '/assets/b9/b9768587f6f92402e17f6fa6.webp';
  window.__ASSETS['lp85_casa_beni32.png'] = '/assets/5f/5fe9183e4d613636b77b1753.webp';
  window.__ASSETS['lp85_tienda32.png'] = '/assets/a8/a8e62c998c19084ad0120b81.webp';
  window.__ASSETS['lp85_oficina32.png'] = '/assets/be/be80ea7af683e52bbfde7e10.webp';
  window.__ASSETS['lp85_taller32.png'] = window.__ASSETS["s579_alqueria_taller.png"];
  window.__ASSETS['lp85_biblioteca32.png'] = '/assets/f8/f8a6419ffaf49afc35f1439b.webp';
  window.__ASSETS['lp85_bar_sueca32.png'] = '/assets/60/6089077af02c7d4c978b38b8.webp';
  window.__ASSETS['lp85_vestidor_horte32.png'] = '/assets/61/610a648a22e2c866c586db08.webp';
  window.__ASSETS['lp85_despatx_horte32.png'] = window.__ASSETS["lp85_oficina32.png"];
  window.__ASSETS['lp85_z534_limonero.png'] = '/assets/23/235da188f27c525eb03b0c64.webp';
  window.__ASSETS['lp85_z534_apartment.png'] = window.__ASSETS["lp85_casa_beni32.png"];
  window.__ASSETS['lp85_z534_tubo.png'] = '/assets/4e/4e56b0bcc756de37f13e519a.webp';
  window.__ASSETS['lp85_z534_patio.png'] = '/assets/cc/cc030b93f446564555655cbc.webp';

  const lp85Alias = (to, from) => { if(window.__ASSETS[from]) window.__ASSETS[to] = window.__ASSETS[from]; };
  lp85Alias('building_burger_11x7','lp85_building_burger_11x7.png');
  lp85Alias('building_house_7x6','lp85_building_house_7x6.png');
  lp85Alias('building_house_7x5','lp85_building_house_7x6.png');
  lp85Alias('building_shop_7x5','lp85_building_shop_7x5.png');
  lp85Alias('building_taverna_7x5','lp85_building_taverna_7x5.png');
  lp85Alias('building_gym_8x6','lp85_building_gym_8x6.png');
  lp85Alias('interior_lab_v11','lp85_lab_interior.png');
  lp85Alias('interior_burger_v11','lp85_burger_interior.png');

  const LP85_ROOM_BG = {
    casa_beni32:'lp85_casa_beni32.png',
    tienda32:'lp85_tienda32.png',
    oficina32:'lp85_oficina32.png',
    taller32:'lp85_taller32.png',
    biblioteca32:'lp85_biblioteca32.png',
    bar_sueca32:'lp85_bar_sueca32.png',
    vestidor_horte32:'lp85_vestidor_horte32.png',
    despatx_horte32:'lp85_despatx_horte32.png',
    z534_limonero:'lp85_z534_limonero.png',
    z534_apartment:'lp85_z534_apartment.png',
    z534_tubo:'lp85_z534_tubo.png',
    z534_patio:'lp85_z534_patio.png'
  };

  const LP85_ROOM_SOLIDS = {
    casa_beni32:[[4,7,2,1],[3,9,3,1],[12,9,3,1]],
    tienda32:[[2,4,2,3],[12,4,2,3],[6,6,5,1]],
    oficina32:[[2,4,2,3],[12,4,2,3],[6,6,5,1]],
    taller32:[[2,4,2,3],[12,4,2,3],[6,6,5,1]],
    biblioteca32:[[2,4,2,3],[12,4,2,3],[5,8,3,1],[10,8,3,1]],
    bar_sueca32:[[2,3,12,2],[4,8,2,2],[9,8,2,2],[12,11,2,1]],
    vestidor_horte32:[[2,2,13,2],[4,7,3,1],[10,7,3,1]],
    despatx_horte32:[[5,5,4,2],[12,3,2,3],[2,3,2,3]],
    z534_limonero:[[2,3,20,2],[3,11,3,2],[17,11,4,2]],
    z534_apartment:[[3,4,10,5],[13,4,2,3]],
    z534_tubo:[[2,2,32,2],[6,11,3,2],[14,11,3,2],[22,11,3,2]],
    z534_patio:[[10,4,12,3],[6,12,4,2],[22,12,4,2]]
  };

  const lp85RectHit=(tx,ty,r)=>tx>=r[0]&&tx<r[0]+r[2]&&ty>=r[1]&&ty<r[1]+r[3];
  if(typeof collision==='function'){
    const lp85Collision = collision;
    collision = function(x,y){
      if(lp85Collision(x,y)) return true;
      const tx=Math.floor(x), ty=Math.floor(y), solids=LP85_ROOM_SOLIDS[state.scene]||[];
      for(const r of solids) if(lp85RectHit(tx,ty,r)) return true;
      return false;
    };
  }

  if(typeof drawVillageRoom32==='function'){
    const lp85DrawVillageRoom32 = drawVillageRoom32;
    drawVillageRoom32 = function(r){
      const key = LP85_ROOM_BG[state.scene];
      const img = key && asset(key);
      if(img && img.complete && img.naturalWidth){
        ctx.drawImage(img,0,0,r.w*TILE,r.h*TILE);
        rect(8*TILE,11*TILE,2*TILE,17,'#896247');
        drawSign(7.6*TILE,10*TILE,'SALIDA');
        return;
      }
      return lp85DrawVillageRoom32(r);
    };
  }

  if(typeof drawTownProps==='function'){
    const lp85DrawTownProps = drawTownProps;
    drawTownProps = function(s){
      if(['z534_limonero','z534_apartment','z534_tubo','z534_patio','bar_sueca32','vestidor_horte32','despatx_horte32'].includes(state.scene)){
        const key = LP85_ROOM_BG[state.scene], img = key && asset(key);
        if(img && img.complete && img.naturalWidth){
          ctx.drawImage(img,0,0,s.w*TILE,s.h*TILE);
          if(state.scene==='z534_limonero') drawSign(11.8*TILE,16.1*TILE,'SALIDA');
          if(state.scene==='z534_apartment') drawSign(8.6*TILE,14.1*TILE,'SALIDA');
          if(state.scene==='z534_tubo') drawSign(4.1*TILE,23.1*TILE,'SALIDA');
          if(state.scene==='z534_patio') drawSign(4.1*TILE,18.1*TILE,'SALIDA');
          if(state.scene==='bar_sueca32') drawSign(8.4*TILE,10.4*TILE,'SALIDA');
          if(state.scene==='vestidor_horte32') drawSign(8.4*TILE,10.4*TILE,'SALIDA');
          if(state.scene==='despatx_horte32') drawSign(8.4*TILE,10.4*TILE,'SALIDA');
          return;
        }
      }
      return lp85DrawTownProps(s);
    };
  }

  function lp85AddNpc(scene,npc){
    if(window.SCENES && SCENES[scene] && Array.isArray(SCENES[scene].npcs) && !SCENES[scene].npcs.some(n=>n.id===npc.id)) SCENES[scene].npcs.push(npc);
  }
  lp85AddNpc('ruta2',{id:'lp85_psyduck',who:'Psyduck',x:27,y:12,label:'Psyduck · al canal'});
  lp85AddNpc('ruta3',{id:'lp85_poliwag',who:'Poliwag',x:8,y:18,label:'Poliwag · charco secreto'});
  lp85AddNpc('ruta4',{id:'lp85_bellsprout',who:'Bellsprout',x:23,y:7,label:'Bellsprout · entre cañas'});
  lp85AddNpc('sueca',{id:'lp85_farfetchd',who:'Farfetchd',x:24,y:18,label:'Farfetchd · arrozal vigilante'});
  lp85AddNpc('alqueria',{id:'lp85_magnemite',who:'Magnemite',x:18,y:18,label:'Magnemite · taller eléctrico'});
  lp85AddNpc('silla',{id:'lp85_meowth',who:'Meowth',x:13,y:18,label:'Meowth · grada merodeando'});

  if(window.LORE_POINTS){
    const addPoint=(scene,pt)=>{LORE_POINTS[scene]=LORE_POINTS[scene]||[];if(!LORE_POINTS[scene].some(p=>p.id===pt.id)) LORE_POINTS[scene].push(pt);};
    addPoint('ruta3',{id:'lp85_mirador_note',x:27.5,y:7.5,label:'Mirador del aiguamoll',text:['Desde aquí ves agua, cañas y algún Psyduck con cara de no haber dormido.']});
    addPoint('sueca',{id:'lp85_biblio_note',x:28.5,y:10.5,label:'Biblioteca reformada',text:['La biblioteca ahora tiene un acabado visual nuevo. Mucho más pueblo, mucho más La Previa.']});
  }

  if(typeof updateObjective==='function' && typeof updateScene==='function'){
    try{ updateScene(false); }catch(err){ console.warn('LP85 patch refresh error', err); }
  }
  console.log('La Previa 5.85 visual integrada cargada');
})();
