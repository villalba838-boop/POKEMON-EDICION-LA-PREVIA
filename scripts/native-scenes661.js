/* BEGIN NATIVE661 */
// All frames are rendered by the game. No animated image/video decoder is used.
var nativeAllies661; // Populated from the finale's original trainer/Pokémon roster.
const SCENES661={
 sergio:{title:'Sergio · Acta de la siesta',room:'court',who:'sergio',kind:'stamp',accent:'#f2d16c',lines:['Sergio revisa el acta. Algo no le cuadra…','Un sello, una cabezada y la firma definitiva.','Medalla conseguida. La siesta también cuenta como entrenamiento.']},
 blas:{title:'Blas · La Medalla del Mes',room:'burger',who:'blas',kind:'fries',accent:'#f4c66e',lines:['Blas: «Un momento… estaba por aquí».','Rebusca entre las patatas. ¡Hay algo brillante!','«Toma la medalla. ¡Y que no me toquéis la receta!»']},
 plataMedalla:{title:'Plata · El calentón',room:'alqueria',who:'plata',kind:'fire',mon:'Charizard',accent:'#ff9c63',lines:['Plata parece tranquilo. Parece.','Charizard aviva el ambiente. El calentón ya es oficial.','La medalla brilla entre las chispas.']},
 horte:{title:'Horte · El milagro del 5 %',room:'court',who:'horte',kind:'score',mon:'Psyduck',accent:'#b9a3f5',lines:['El marcador parece imposible: 48–5.','Horte invoca el cinco por ciento. ¡Empieza la remontada!','«¡¡CULORROTOS!! ¡EL CINCO POR CIENTO!»']},
 nachitoPixel:{title:'Nachito · Medalla del Festivern',room:'festival',who:'nachito',kind:'sugar',accent:'#b7ec8b',lines:['Nachito levanta la cabeza de la mesa de azúcar.','Una nube blanca, luces de festival y una medalla.','«Bueno, toma la medalla y vete ya. Que he quedado con un travesti».']},
 plata:{title:'Turís · Medalla Chatarra',room:'scrap',who:'gitano523',kind:'scrap',mon:'Machamp',accent:'#d8b58a',lines:['El gimnasio de Turís guarda piezas de todo tipo.','Entre la chatarra aparece algo que sí tiene valor.','La Medalla Chatarra ya tiene nuevo dueño.']},
 awelo:{title:'Awelo · Medalla del Descanso',room:'bedroom',who:'awelo',kind:'sleep',mon:'Snorlax',accent:'#9ecaf0',lines:['Awelo y Snorlax están en pleno descanso.','La medalla aparece. Awelo abre un ojo.','«Has ganado. Ya puedes dejarme dormir».']},
 roberMedalla:{title:'Rober · La Última Mesa',room:'warehouse',who:'rober',kind:'invoice',accent:'#e8bf75',lines:['Rober despliega el contrato de la Última Mesa.','La firma se borra. La Previa recupera su sitio.','«LA MESA NUNCA SE CANCELA».']},
 aweloMadre:{title:'Awelo · La llamada',room:'bedroom',who:'awelo',kind:'phone',accent:'#a6c9e6',duration:10,lines:['El móvil suena. Awelo se incorpora en la cama.','«¿ESTÁS CONTENTA? ¡AL FINAL LO HAS CONSEGUIDO!»','«¡MIS AMIGOS SE ESTÁN RIENDO DE MÍ!»']},
 teamCierre:{title:'Team Cierre · Última mesa',room:'warehouse',who:'rober',kind:'invoice',accent:'#d7a0bc',lines:['Rober y Jovan preparan los papeles de Cierre S. L.','Una factura, otra firma… y la mesa del jueves en peligro.','Entra al almacén y recupera lo que es de La Previa.']},
 patriPatinete:{title:'Patri · El desafío del patinete',room:'street',who:'patri',kind:'scooter',accent:'#9be5c1',lines:['Se oye un motor. Patri entra con su patinete negro.','Frena, te mira y señala el manillar.','«Si quieres este patinete… ¡primero tendrás que ganarme!»']},
 rober:{title:'Rober y Mewtwo',room:'lab',who:'rober',kind:'villain',mon:'Mewtwo',accent:'#c4a0f9',duration:9,lines:['La máquina del laboratorio empieza a vibrar.','Rober da un paso al frente. Mewtwo abre los ojos.','Una presión psíquica llena la sala. El combate comienza.']},
 capsule:{title:'Mewtwo · La cápsula',room:'lab',kind:'capsule',mon:'Mewtwo',accent:'#c4a0f9',duration:9,lines:['La cápsula se agrieta. Mewtwo está despierto.','¡El cristal estalla! La energía invade el laboratorio.','Mewtwo viene directo hacia ti. ¡Prepárate!']},
 final:{title:'La Previa · Todos a una',room:'lab',kind:'allies',mon:'Mewtwo',accent:'#f3d77f',duration:11,lines:['Los compañeros de La Previa se colocan frente a Mewtwo.','Fuego, agua, electricidad y energía: ¡todos atacan a la vez!','La sala tiembla. La Previa sigue unida.']},
 javi:{title:'Javi Grau · La entrega',room:'street',who:'javi_grau',kind:'stamp',accent:'#f2ce7b',lines:['Javi Grau busca algo en el bolsillo.','Una medalla cruza el aire y queda frente a ti.','Otro recuerdo para la mesa de los jueves.']},
 nachito:{title:'Nachito · Alquimista Brasil',room:'lab',who:'nachito',kind:'potion',accent:'#a8eb91',lines:['Nachito prepara una mezcla de procedencia dudosa.','El matraz brilla. La gorra de Brasil se eleva.','«¡BRASIL NANANANANANA!»']},
 aweloCelebracion:{title:'Awelo · Celebración',room:'street',who:'awelo',kind:'dance',mon:'Snorlax',accent:'#f0cf86',lines:['Awelo asegura que no está cansado.','Da un paso, gira… ¡y hasta Snorlax se apunta!','Un jueves más. Un recuerdo más.']},
 bingo:{title:'Zaragoza · ¡Bingo!',room:'bar',who:'awelo',kind:'bingo',accent:'#f2d37a',lines:['Awelo revisa el cartón. Le falta solo una casilla.','¡TRES EN LÍNEA! Los sellos iluminan el cartón.','«¡BINGO!» El premio ya está anotado en tu partida.']},
 festivernExplosion:{title:'Festivern · Las siete dimensiones',room:'lab',who:'nachito',kind:'explosion',accent:'#acf199',duration:9,lines:['Nachito coloca la Piedra de Cristal entre siete matraces.','¡BOOOOM! El laboratorio se llena de humo y luces.','«¡BRASIL NANANANANANA! ¡ME HE MULTIPLICADO, HOSTIA!»']}
};
const clamp661=x=>Math.max(0,Math.min(1,x));
const ease661=x=>{x=clamp661(x);return x*x*(3-2*x);};
function phase661(t,d){return Math.min(2,Math.floor(clamp661(t/d)*3));}
function seenKey661(i){return 'cine661_badge_'+i;}
function text661(g,s,x,y,size=22,color='#f4e9d0',align='center'){
 g.fillStyle=color;g.font='bold '+size+'px monospace';g.textAlign=align;g.fillText(s,x,y);g.textAlign='left';
}
function rect661(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);}
function glow661(g,x,y,r,c){const f=g.createRadialGradient(x,y,0,x,y,r);f.addColorStop(0,c);f.addColorStop(1,'#0000');g.fillStyle=f;g.fillRect(x-r,y-r,r*2,r*2);}
function actor661(g,who,x,y,t,scale=2,pose='normal'){
 z534Actor(g,who,x,y,0,motionAllowed22?t*4:0,scale,pose);
}
function mon661(g,name,x,y,size=140,t=0){
 g.save();g.translate(x,y+(motionAllowed22?Math.sin(t*3)*5:0));
 const im=monpic(name);if(im.complete&&im.naturalWidth){g.imageSmoothingEnabled=false;g.drawImage(im,-size/2,-size,size,size);}else{
  rect661(g,-size*.23,-size*.7,size*.46,size*.6,'#9b8cbf');text661(g,name,0,18,16);
 }g.restore();
}
function medal661(g,x,y,t,color){
 g.save();g.translate(x+125,y);glow661(g,0,0,115,color+'55');g.scale(.72+.28*Math.abs(Math.cos(t*1.5)),1);
 g.fillStyle='#362d3f';g.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/8,px=Math.cos(a)*43,py=Math.sin(a)*43;i?g.lineTo(px,py):g.moveTo(px,py);}g.closePath();g.fill();
 g.fillStyle=color;g.beginPath();g.arc(0,0,33,0,Math.PI*2);g.fill();g.strokeStyle='#fff0b4';g.lineWidth=4;g.stroke();
 text661(g,'◆',0,12,33,'#79552e');g.restore();
}
function bits661(g,t,color,start=2.4,burst=false){
 if(t<start)return;for(let i=0;i<32;i++){const a=i*2.399,age=(t-start+(i%5)*.17),r=burst?Math.min(420,age*135):60+(i%8)*31;
 const x=480+Math.cos(a+t*.16)*r,y=250+Math.sin(a+t*.16)*r*.6-Math.sin(t*2+i)*13;
 g.globalAlpha=.35+.55*Math.abs(Math.sin(t*2+i));rect661(g,x,y,4+i%4,4+i%4,i%3?color:'#fff3bf');}g.globalAlpha=1;
}
function room661(g,room,t){
 const colors={burger:['#244e42','#98734f'],bedroom:['#30344f','#62576b'],court:['#29494e','#5e8c75'],lab:['#292742','#334455'],warehouse:['#303848','#695653'],festival:['#2d2b4c','#594759'],street:['#3c5966','#657978'],alqueria:['#4c3448','#6f635c'],scrap:['#41464d','#6b645a'],bar:['#372d49','#6b4c5c']};
 const [wall,floor]=colors[room]||colors.lab;rect661(g,0,0,960,540,wall);rect661(g,0,308,960,232,floor);
 for(let y=26;y<307;y+=35)for(let x=(y%70?0:40);x<960;x+=80){rect661(g,x,y,76,31,'#ffffff05');rect661(g,x,y+31,76,2,'#00000014');}
 for(let y=320;y<540;y+=34)rect661(g,0,y,960,2,'#0002');
 for(let x=0;x<960;x+=80){g.strokeStyle='#0002';g.beginPath();g.moveTo(480+(x-480)*.55,308);g.lineTo(x,540);g.stroke();}
 rect661(g,0,303,960,7,'#122b32');glow661(g,480,220,360,'#ffe8af14');
 if(room==='burger'){
  rect661(g,0,32,960,16,'#bfa564');text661(g,"burger l’horta",480,110,38,'#d5dfb4');
  for(const x of [100,860]){rect661(g,x-52,140,104,125,'#183e39');rect661(g,x-44,149,88,107,'#799f91');for(let i=0;i<7;i++)rect661(g,x-34+(i%3)*23,235-(i*19)%90,20,31,'#387761');}
  for(const x of [235,725]){rect661(g,x-3,48,6,62,'#102d2a');rect661(g,x-45,108,90,13,'#c5a368');glow661(g,x,145,120,'#ffdb7d22');}
 }else if(room==='court'){
  rect661(g,75,75,115,80,'#bed1c4');rect661(g,80,80,105,70,'#526d67');g.strokeStyle='#e9d9a6';g.lineWidth=5;g.strokeRect(110,98,45,35);g.strokeRect(110,132,45,13);
  g.strokeStyle='#e3e1b288';g.lineWidth=4;g.strokeRect(130,340,700,165);g.beginPath();g.ellipse(480,420,90,52,0,0,Math.PI*2);g.stroke();
 }else if(room==='bedroom'){
  rect661(g,90,97,162,132,'#151d39');rect661(g,102,107,138,110,'#445e81');text661(g,'☾',170,183,58,'#e7d99e');
  rect661(g,257,310,310,118,'#24283b');rect661(g,245,301,334,100,'#9a6675');rect661(g,262,289,90,43,'#dfd6b8');rect661(g,378,315,190,80,'#777eaf');
 }else if(room==='warehouse'||room==='scrap'){
  for(const [x,y]of [[50,215],[135,260],[762,247],[847,206]]){rect661(g,x,y,67,94,'#99754e');rect661(g,x+4,y+5,59,8,'#bc9563');rect661(g,x+30,y,8,94,'#d5b37b');}
  if(room==='warehouse'){text661(g,'CIERRE S. L.',480,96,32,'#c8b5ad');rect661(g,295,270,370,16,'#b58f65');}
 }else if(room==='lab'){
  for(const x of [75,785]){rect661(g,x,115,100,180,'#18263b');rect661(g,x+9,125,82,79,'#427c82');for(let i=0;i<3;i++)rect661(g,x+17+i*23,229,12,12,['#9addaa','#d6b674','#ba97cf'][i]);}
  for(let i=0;i<6;i++){rect661(g,180+i*110,80,70,5,'#7f8e9a');rect661(g,212+i*110,81,5,37,'#7f8e9a');}
 }else if(room==='festival'||room==='bar'){
  for(let i=0;i<12;i++){const x=45+i*78,y=70+Math.sin(i*.5)*25;rect661(g,x,y,8,12,['#f6cb75','#9eedd0','#c298e6'][i%3]);glow661(g,x,y,55,'#efaa8520');}
  text661(g,room==='bar'?'EL TUBO · ZARAGOZA':'FESTIVERN',480,130,32,'#e6c2e3');
 }else if(room==='street'||room==='alqueria'){
  for(const x of [40,720]){rect661(g,x,84,200,215,'#ac9c7a');rect661(g,x+20,107,50,58,'#315865');rect661(g,x+112,107,50,58,'#315865');rect661(g,x+78,222,55,78,'#735542');}
  rect661(g,0,410,960,18,'#bec2a6');rect661(g,0,428,960,112,'#424f59');for(let x=0;x<960;x+=145)rect661(g,x,477,75,7,'#a8b0a0');
 }
}
function fries661(g,t){
 const lift=ease661((t-2.5)/1.5);rect661(g,337,352,286,17,'#523f37');rect661(g,349,367,13,91,'#463c39');rect661(g,599,367,13,91,'#463c39');
 rect661(g,395,327,170,34,'#ece0bd');rect661(g,407,335,146,20,'#cf6c47');
 for(let i=0;i<14;i++){g.save();g.translate(415+i*10+(i%2?1:-1)*Math.sin(t*4)*lift*9,337-lift*(12+(i%5)*5));g.rotate((i%3-1)*.21);rect661(g,0,-25-(i%4)*6,8,32,'#e4b75a');rect661(g,1,-25-(i%4)*6,2,30,'#ffe49a');g.restore();}
 if(t>2.6)medal661(g,355+lift*125,310-lift*105,t,'#f3cd74');
}
function scooter661(g,x,y,t){
 g.save();g.translate(x,y);g.strokeStyle='#15232e';g.lineWidth=10;g.beginPath();g.moveTo(-68,-12);g.lineTo(54,-12);g.lineTo(42,-106);g.lineTo(19,-106);g.stroke();
 for(const a of [-65,55]){g.fillStyle='#101a25';g.beginPath();g.arc(a,0,17,0,Math.PI*2);g.fill();g.strokeStyle='#879493';g.lineWidth=4;g.stroke();g.strokeStyle='#d7d7ba';g.lineWidth=2;g.beginPath();g.moveTo(a,0);g.lineTo(a+Math.cos(t*8)*10,Math.sin(t*8)*10);g.stroke();}g.restore();
}
function capsule661(g,t){
 const burst=ease661((t-3.1)/1.15),rush=ease661((t-5.4)/2.6),size=150+rush*490;
 glow661(g,480,230,180+burst*160,'#b391e344');
 rect661(g,382,128,196,20,'#8296a9');rect661(g,380,335,200,30,'#8296a9');
 if(burst<.96){rect661(g,395,149,170,186,'#8fcfe526');g.strokeStyle='#b6e4ef';g.lineWidth=4;g.strokeRect(395,149,170,186);}
 mon661(g,'Mewtwo',480,340+rush*160,size,t);
 if(t>1.3&&burst<.8){g.strokeStyle='#e6d9fc';g.lineWidth=4;g.beginPath();g.moveTo(487,157);g.lineTo(455,205);g.lineTo(495,226);g.lineTo(461,275);g.lineTo(503,327);g.stroke();}
 if(burst>0)for(let i=0;i<17;i++){g.save();g.translate(480+Math.cos(i*2.399)*burst*380,245+Math.sin(i*2.399)*burst*220);g.rotate(i+t);rect661(g,-3,-9,8,20,'#bfe5f399');g.restore();}
}
function drawScene661(g,c,t){
 const d=c.duration||7.5,p=clamp661(t/d),m=motionAllowed22?1:0;
 g.save();g.imageSmoothingEnabled=false;rect661(g,0,0,960,540,'#101e2d');
 const shake=['capsule','explosion','allies','fire'].includes(c.kind)&&t>2.8&&t<4.1?m*4:0;
 g.translate(Math.sin(t*41)*shake,Math.cos(t*37)*shake);const zoom=1+.025*ease661(p);g.translate(480,280);g.scale(zoom,zoom);g.translate(-480,-280);
 room661(g,c.room,t);glow661(g,480,260,260,c.accent+'18');
 const jump=t>3&&t<4.2?Math.sin(clamp661((t-3)/1.2)*Math.PI)*m*30:0;
 if(c.kind==='capsule'){capsule661(g,t);}
 else if(c.kind==='allies'){
  const allies=nativeAllies661||[];
  mon661(g,'Mewtwo',480,230,175,t);actor661(g,'rober',650,240,t,1.2);
  allies.forEach((a,i)=>{const row=Math.floor(i/6),x=165+(i%6)*126,y=360+row*137,color=['#f29a63','#80c8eb','#e6d394','#b69be5'][i%4];
   actor661(g,a.who,x-23,y-20,t+i,.68);mon661(g,a.mon,x+10,y,83,t+i);text661(g,a.name,x,y+18,11,'#eddfbd');
   if(t>2+i*.12){const q=ease661((t-2-i*.12)/2);g.globalAlpha=.75;g.strokeStyle=color;g.lineWidth=5+Math.sin(t*8+i)*2;g.beginPath();g.moveTo(x,y-54);g.lineTo(x+(480-x)*q,y-54+(165-(y-54))*q);g.stroke();g.globalAlpha=1;}});
  if(t>5.2)glow661(g,480,181,80+Math.abs(Math.sin(t*4))*70,'#fff2bbaa');
 }else{
  const whoX=c.kind==='scooter'?270+ease661(t/2.7)*210:480;
  const pose=c.kind==='phone'?'angry':c.kind==='sleep'?'seated':c.kind==='dance'?'dance':'normal';
  if(c.who)actor661(g,c.who,whoX,c.room==='bedroom'?343:355-jump,t,2.2,pose);
  if(c.mon)mon661(g,c.mon,c.kind==='villain'?665:745,c.room==='bedroom'?410:385,c.kind==='villain'?200:140,t);
  switch(c.kind){
   case 'fries':fries661(g,t);break;
   case 'stamp':case 'invoice':{
    const x=313+ease661(t/2)*60;rect661(g,x,365,212,113,'#dfd7bb');rect661(g,x+8,373,196,97,'#f2e8ce');
    for(let j=0;j<4;j++)rect661(g,x+24,391+j*16,110-j*12,3,'#6c6d65');
    if(t>2.8){g.save();g.translate(x+161,422);g.rotate(-.18);g.strokeStyle='#a64f58';g.lineWidth=4;g.strokeRect(-36,-24,72,48);text661(g,c.kind==='invoice'?'LIBRE':'OK',0,7,22,'#a64f58');g.restore();}
    if(t>4.2)medal661(g,480,245,t,c.accent);break;
   }
   case 'fire':for(let i=0;i<11;i++){const h=40+Math.abs(Math.sin(t*4+i))*65;rect661(g,170+i*58,430-h,17,h,'#d16a46aa');rect661(g,175+i*58,435-h,7,h*.7,'#f1bf64');}if(t>3.5)medal661(g,480,230,t,c.accent);break;
   case 'score':{
    rect661(g,315,150,330,79,'#162831');text661(g,t<3.2?'48 – 05':'50 – 54',480,203,42,t<3.2?'#e3c578':'#a7edbb');
    if(t>2.3)text661(g,'5 %',230,230+Math.sin(t*3)*13*m,49,c.accent);if(t>4.5)medal661(g,480,291,t,c.accent);break;
   }
   case 'sugar':case 'potion':case 'explosion':{
    rect661(g,320,350,320,18,'#ac9471');rect661(g,342,368,14,95,'#594959');rect661(g,604,368,14,95,'#594959');
    if(c.kind==='sugar'){rect661(g,445,337,73,9,'#eee9d7');if(t>2&&t<4.5){g.globalAlpha=.35;for(let i=0;i<12;i++)rect661(g,460+Math.sin(t+i)*50,320-(t-2)*34-i%4*12,18,14,'#f5eedb');g.globalAlpha=1;}if(t>3.2)medal661(g,480,235,t,c.accent);}
    else {for(let i=0;i<7;i++){const x=348+i*41;rect661(g,x,315,25,32,'#8ab9b799');rect661(g,x+9,296,7,21,'#c4d5bf');rect661(g,x+3,329,19,16,['#b7ec8b','#bca0e8','#8accdf'][i%3]);}
     if(t>2.2){for(let i=0;i<7;i++){const a=i*Math.PI*2/7+t*.4;glow661(g,480+Math.cos(a)*160,240+Math.sin(a)*80,39,['#b6e99a','#bea4ec','#85d9e5'][i%3]+'88');}if(c.kind==='explosion'&&t>3.4)for(let i=0;i<7;i++){g.save();g.globalAlpha=.75;actor661(g,'nachito',130+i*115,250+Math.sin(i+t)*55,t+i,.9);g.restore();}}}
    break;
   }
   case 'scrap':for(let i=0;i<7;i++){g.save();g.translate(245+i*80,426+Math.sin(i)*15);g.rotate(i*.7);rect661(g,-19,-15,38,30,['#919c97','#ad8b6c','#697f8c'][i%3]);g.restore();}if(t>3)medal661(g,480,255,t,c.accent);break;
   case 'sleep':if(t<3.4)text661(g,'Z z z',600,170-Math.sin(t)*9*m,35,c.accent);if(t>2.8)medal661(g,480,240,t,c.accent);break;
   case 'phone':rect661(g,540+Math.sin(t*9)*3*m,224,22,43,'#192c38');rect661(g,544,230,14,28,'#a5d5bd');if(t>2.5)text661(g,'¡!',620,160,70,'#f0cc86');break;
   case 'scooter':scooter661(g,whoX,411,t);if(t<2.6)for(let i=0;i<5;i++)rect661(g,whoX-160-i*35,385+i*8,25,3,'#c5d3be66');break;
   case 'bingo':{
    rect661(g,365,350,230,150,'#e4d4a9');for(let i=0;i<9;i++){const x=389+i%3*66,y=375+Math.floor(i/3)*36;rect661(g,x-5,y-21,53,30,'#f4e9c7');text661(g,String(7+i*9),x+21,y,19,'#655b58');if(i<Math.min(3,Math.floor(t))){text661(g,'✓',x+21,y,26,'#437d60');}}
    if(t>3)text661(g,'¡BINGO!',480,220,54,c.accent);break;
   }
   case 'dance':if(t>3)medal661(g,480,220,t,c.accent);break;
   case 'villain':glow661(g,665,230,160,'#c098ed55');if(t>3)for(let i=0;i<5;i++){g.strokeStyle='#b99beb66';g.lineWidth=4;g.beginPath();g.ellipse(665,220,40+i*25+Math.sin(t)*8,60+i*18,0,0,Math.PI*2);g.stroke();}break;
  }
 }
 bits661(g,t,c.accent,2.4,['capsule','explosion','allies'].includes(c.kind));
 // A single soft flash rather than rapidly flashing full-screen frames.
 if(m&&['capsule','explosion','allies'].includes(c.kind)&&t>3.3&&t<3.7){g.globalAlpha=Math.sin((t-3.3)/.4*Math.PI)*.3;rect661(g,0,0,960,540,'#fff0c8');g.globalAlpha=1;}
 rect661(g,0,0,960,20,'#101c29');rect661(g,0,520,960,20,'#101c29');g.restore();
}
function playScene661(key,title,after){
 if(clip659)return false;const c=SCENES661[key];if(!c){after?.({loaded:true,renderer:'native'});return true;}
 const previous=state.screen,focus=document.activeElement,layer=document.createElement('section');
 layer.className='scene661';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label',c.title);
 const head=document.createElement('header'),label=document.createElement('small'),heading=document.createElement('h2');label.textContent='LA PREVIA · CINEMÁTICA';heading.textContent=title||c.title;head.append(label,heading);
 const stage=document.createElement('div'),canvas=document.createElement('canvas');stage.className='scene661-stage';canvas.width=960;canvas.height=540;canvas.setAttribute('data-renderer','native');canvas.setAttribute('role','img');canvas.setAttribute('aria-label',c.title);stage.append(canvas);
 const caption=document.createElement('p'),status=document.createElement('small'),tools=document.createElement('nav'),pause=document.createElement('button'),replay=document.createElement('button'),next=document.createElement('button');
 caption.className='scene661-caption';caption.setAttribute('aria-live','polite');status.className='scene661-status';tools.setAttribute('aria-label','Controles de la cinemática');pause.textContent='PAUSAR';replay.textContent='REPETIR';next.textContent='SALTAR ESCENA';tools.append(pause,replay,next);layer.append(head,stage,caption,status,tools);
 state.screen='cinematic658';resetJoy27();heldKeys.clear();(document.fullscreenElement||gameShell).append(layer);
 let closed=false,paused=false,time=0,last=performance.now(),raf=0,drawAt=-1,beat=-1,fallbackLogged=false;const born=last,duration=c.duration||7.5,g=canvas.getContext('2d');
 const inputs=()=>[pause,replay,next];
 function close(){if(closed||performance.now()-born<350)return;closed=true;cancelAnimationFrame(raf);document.removeEventListener('keydown',onKey,true);document.removeEventListener('visibilitychange',onVisibility);layer.remove();clip659=null;state.screen=previous;resetJoy27();heldKeys.clear();if(focus?.isConnected)focus.focus();after?.({loaded:true,renderer:'native'});}
 function onVisibility(){if(document.hidden&&!closed&&time<duration){paused=true;pause.textContent='SEGUIR';status.textContent='Escena pausada.';}}
 function onKey(e){if(e.key==='Tab'){const buttons=inputs(),i=buttons.indexOf(document.activeElement);e.preventDefault();e.stopImmediatePropagation();buttons[(i+(e.shiftKey?-1:1)+buttons.length)%buttons.length].focus();return;}if(['Escape','Enter',' ','e','E'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;if(e.key==='Escape')close();else if(document.activeElement===pause)pause.click();else if(document.activeElement===replay)replay.click();else close();}}
 function paint(stamp){if(closed)return;const delta=Math.max(0,(stamp-last)/1000);last=stamp;if(!paused)time=Math.min(duration,time+delta);
  const phase=phase661(time,duration);if(phase!==beat){beat=phase;caption.textContent=c.lines[phase];if(phase===2&&audioOn)beep(784,.12);}
  if(stamp-drawAt>32||drawAt<0){drawAt=stamp;try{drawScene661(g,c,time);canvas.setAttribute('data-seconds',time.toFixed(2));}catch(error){if(!fallbackLogged){console.error('Escena nativa: dibujo alternativo',key,error);fallbackLogged=true;canvas.setAttribute('data-fallback','true');}rect661(g,0,0,960,540,'#203744');text661(g,c.title,480,220,30,c.accent);text661(g,c.lines[phase],480,285,16);}}
  const finished=time>=duration;next.textContent=finished?'CONTINUAR':'SALTAR ESCENA';if(finished){status.textContent='Escena terminada. Puedes repetirla o continuar.';pause.disabled=true;}else if(!paused)status.textContent='Escena '+(phase+1)+' / 3 · Puedes continuar cuando quieras.';
  raf=requestAnimationFrame(paint);
 }
 pause.onclick=()=>{paused=!paused;last=performance.now();pause.textContent=paused?'SEGUIR':'PAUSAR';status.textContent=paused?'Escena pausada.':'Escena en marcha.';};
 replay.onclick=()=>{time=0;beat=-1;paused=false;pause.disabled=false;pause.textContent='PAUSAR';last=performance.now();drawAt=-1;};next.onclick=close;
 clip659={key,close};document.addEventListener('keydown',onKey,true);document.addEventListener('visibilitychange',onVisibility);next.focus();paint(last);return true;
}
// Compatibility entry point for the story's existing callbacks; all media is native.
playGif658=playScene661;
gallery658=function(){state.screen='menu';showModal('<h2>CINEMÁTICAS · LA PREVIA</h2><p>Escenas animadas del juego. Puedes repetirlas sin cambiar tus misiones ni recibir premios otra vez.</p><div class="modal-actions">'+Object.entries(SCENES661).map(([key,c])=>'<button data-scene661="'+key+'" class="secondary">'+escape659(c.title)+'</button>').join('')+'<button id="closeGallery661">VOLVER AL JUEGO</button></div>');modalContent.querySelectorAll('[data-scene661]').forEach(b=>b.onclick=()=>playScene661(b.dataset.scene661,SCENES661[b.dataset.scene661].title,gallery658));$('closeGallery661').onclick=backWorld;};
// Complete the original intro's flags once, without changing portal or reward rules.
const festivalBefore661=f532Cinema;f532Cinema=function(mode='intro'){if(mode!=='intro')return festivalBefore661(mode);return playScene661('festivernExplosion',SCENES661.festivernExplosion.title,()=>{state.flags.fest532IntroSeen=true;save();backWorld();updateObjective();});};
setInterval(()=>{if(state.screen!=='world'||clip659||playing658||!mod.classList.contains('hidden'))return;if(state.flags.z534_lineReward&&!state.flags.cine661_bingo)playScene661('bingo',SCENES661.bingo.title,()=>{state.flags.cine661_bingo=true;save();});},450);
const serialBefore661=serializeState;serializeState=function(){const data=serialBefore661();data.edition='6.61';data.patch='cinematicas-nativas';return data;};
const nativeStyle661=document.createElement('style');nativeStyle661.textContent=`.scene661{position:fixed;inset:0;z-index:100001;box-sizing:border-box;background:#0a1720fa;color:#f4ead2;font-family:system-ui;display:grid;grid-template-rows:auto minmax(0,1fr) auto auto auto;gap:9px;padding:16px max(12px,env(safe-area-inset-left));height:100dvh;overflow:hidden}.scene661 header{text-align:center}.scene661 header small{color:#b7cfbd;font-size:10px;letter-spacing:.2em}.scene661 h2{font-size:clamp(17px,2.6vw,25px);margin:5px 0}.scene661-stage{min-height:0;display:flex;justify-content:center}.scene661 canvas{width:100%;height:100%;max-width:960px;object-fit:contain;image-rendering:pixelated}.scene661-caption{max-width:900px;margin:0 auto;min-height:42px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.4;font-size:clamp(14px,2vw,19px)}.scene661-status{text-align:center;color:#adc8c9;font-size:11px;min-height:14px}.scene661 nav{display:flex;gap:9px;justify-content:center;padding-bottom:env(safe-area-inset-bottom)}.scene661 button{min-height:44px;border:1px solid #d4bc78;border-radius:8px;background:#f5d48c;color:#172e38;font-weight:800;font-size:13px;padding:10px 17px;cursor:pointer}.scene661 button:focus-visible{outline:3px solid white;outline-offset:2px}.scene661 button:disabled{opacity:.5}body:has(.scene661) #world641_btn,body:has(.scene661) #world641_panel,body:has(.scene661) #dev600Launch,body:has(.scene661) button[aria-label="Activar vista técnica de colisiones"]{display:none!important}@media(max-height:500px){.scene661{gap:4px;padding:6px 12px}.scene661 header small,.scene661-status{display:none}.scene661{grid-template-rows:auto minmax(0,1fr) auto auto}.scene661 h2{font-size:16px;margin:0}.scene661-caption{min-height:30px;font-size:12px}.scene661 button{min-height:32px;padding:6px 12px;font-size:11px}}`;document.head.append(nativeStyle661);
document.title='Pokémon La Previa · 6.61';if(releaseBrand658)releaseBrand658.textContent='AVENTURA WEB · 6.61';
if(window.__PREVIA_QA){
 const bar=$('review654');for(const [label,run]of [['Blas · escena nativa',()=>{window.__PREVIA_QA.dev600.select('646_lab');hideModal();state.screen='world';for(const i of state.badges)state.flags[seenKey661(i)]=true;playScene661('blas',SCENES661.blas.title);} ],['Mewtwo · escena nativa',()=>{hideModal();state.screen='world';playScene661('capsule',SCENES661.capsule.title);}]]){const b=document.createElement('button');b.textContent=label;b.onclick=run;bar.append(b);}
}
/* END NATIVE661 */
