

/* 5.86 - solo arte de los minijuegos, no cambia las mecánicas ni el guardado. */
(()=>{
const art = {"2":"/assets/82/8246e946c8caeeac3141abd0.webp","3":"/assets/0b/0b73cbc0dfd20ee2d8739cc4.webp","6":"/assets/9a/9a32630b3aa2083dd5e4791a.webp","9":"/assets/37/37fb8a01338b1537817396fb.webp","11":"/assets/0e/0edf907ff9b0cfb5cc60015d.webp","14":"/assets/bc/bcf659d2cf91bba385aa53cb.webp","17":"/assets/51/51d1a22a9cc8330c58187ca4.webp","21":"/assets/45/4588bd9e85b782a5efa03301.webp","27":"/assets/b7/b7f763f999b2684eaef18638.webp","30":"/assets/c5/c52916c26fe7ae808054ae4d.webp"};
window.__PREVIA_MG_ART=art;
const names = {"2": "La silla del Awelo", "3": "Mayonesa de Alfaro", "6": "87 hamburguesas", "9": "Patinete de Patri", "11": "La siesta de Sergio", "14": "87 comparativas", "17": "Procesión Santo Par", "21": "Contrabandista de naranjas", "27": "Puerta de Nachito", "30": "Torneo 3x3"};
const css = `
.mg586Illustration{width:100%;height:clamp(116px,21vw,184px);object-fit:cover;object-position:center center;display:block;image-rendering:pixelated;border:2px solid #7c9989;border-radius:12px;box-shadow:0 5px 12px #122b2636;margin:8px 0 12px;pointer-events:none;user-select:none}
@media (max-width:480px){.mg586Illustration{height:112px;margin:6px 0 9px;border-radius:9px}}
@media (prefers-reduced-motion:reduce){.mg586Illustration{transition:none}}
`;
const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
const card=document.getElementById('modalContent');
if(!card) return;
function sync(){
 const brow=card.querySelector('.eyebrow');
 if(!brow||!brow.textContent.includes('RECREATIVOS'))return;
 const match=brow.textContent.match(/N[ºo°]\s*(\d+)/);
 if(!match)return;
 const id=match[1],src=art[id];
 if(!src||card.querySelector('img.mg586Illustration'))return;
 const h2=card.querySelector('h2');
 if(!h2)return;
 const where=h2.nextElementSibling&&h2.nextElementSibling.matches('p.subtle')?h2.nextElementSibling:h2;
 const img=document.createElement('img');
 img.className='mg586Illustration';img.src=src;img.alt='Decoración pixel art del minijuego '+(names[id]||id);
 img.loading='eager';img.decoding='async';img.draggable=false;
 where.insertAdjacentElement('afterend',img);
}
const observer=new MutationObserver(()=>sync());
observer.observe(card,{subtree:false,childList:true});
sync();
})();



