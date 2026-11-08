const $=s=>document.querySelector(s);
$('.menu-btn').onclick=()=>$('.nav').classList.toggle('open');
document.querySelectorAll('.nav a').forEach(a=>a.onclick=()=>$('.nav').classList.remove('open'));
document.querySelectorAll('.tilt').forEach(el=>{
  const mv=e=>{const t=e.touches?e.touches[0]:e,r=el.getBoundingClientRect(),x=(t.clientX-r.left)/r.width-.5,y=(t.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03)`};
  el.addEventListener('mousemove',mv);
  el.addEventListener('touchmove',mv,{passive:true});
  ['mouseleave','touchend'].forEach(v=>el.addEventListener(v,()=>el.style.transform=''));
});
const qs=$('.sticky');
if(qs)qs.innerHTML='<h2>Double charge tiles</h2><p>More strength. More elegance.</p><ul class="layers"><li class="l1"><b>Glazed surface</b>Rich finish.</li><li class="l2"><b>Design layer</b>Stunning looks.</li><li class="l3"><b>Double charge</b>Extra strength.</li><li class="l4"><b>Strong body</b>Long life.</li></ul>';

/* Showroom hero: your picture with working buttons, zooms in as you scroll */
const home=$('#home');
if(home){
  home.className='walk';
  home.innerHTML=`<div class="stage">
   <div class="shot" style="background:url('./images/Bizzotto%20Ceramics%20Luxury%20Showroom%20(1).png') center/100% 100% no-repeat">
      <a class="hs" style="left:29.5%;top:3.2%;width:8.4%;height:4.4%" href="#home" aria-label="Our showroom"></a>
      <a class="hs" style="left:40.2%;top:3.2%;width:8.9%;height:4.4%" href="#products" aria-label="Tile collections"></a>
      <a class="hs" style="left:51.3%;top:3.2%;width:3.9%;height:4.4%" href="#brands" aria-label="Brands"></a>
      <a class="hs" style="left:57.5%;top:3.2%;width:4.8%;height:4.4%" href="#quality" aria-label="About us"></a>
      <a class="hs" style="left:64.7%;top:3.2%;width:4.6%;height:4.4%" href="#contact" aria-label="Contact"></a>
      <a class="hs go" style="left:4.8%;top:86.5%;width:15.1%;height:6.4%" href="#products" aria-label="Start walkthrough"></a>
      <a class="hs" style="left:77.6%;top:90.2%;width:15.1%;height:5.4%" href="#products" aria-label="Explore our collections"></a>
    </div>
    <div class="shade"></div>
    <div class="cap c1"><h1>Walk into the floor you want.</h1><p>Tiles, sanitary ware and complete building solutions. Official partner of RAK Ceramics, Hayathnagar.</p><a class="btn b1" href="tel:+919848337316">Call 98483 37316</a><a class="btn b2" target="_blank" rel="noopener" href="https://wa.me/919848337316?text=Hi%20BIZZOTTOCERAMICS%2C%20I%20would%20like%20to%20enquire.">Chat on WhatsApp</a></div>
    <div class="cap c2"><h2>RAK Ceramics, Somany and more under one roof.</h2></div>
    <div class="cap c3"><h2>Double charge tiles. More strength, more elegance.</h2><a class="btn b1" href="#products">Explore our collections</a></div>
    <div class="feat"><span>Premium quality</span><span>High durability</span><span>Elegant finish</span><span>Wide range</span></div>
    <div class="hint">Scroll to walk in</div>
  </div>`;
  const shot=home.querySelector('.shot'),caps=[...home.querySelectorAll('.cap')],hint=home.querySelector('.hint'),feat=home.querySelector('.feat');
  const go=home.querySelector('.go');
  go.onclick=e=>{e.preventDefault();scrollBy({top:innerHeight*1.2,behavior:'smooth'})};
  const upd=()=>{
    const d=innerWidth>=900&&innerWidth/innerHeight>1.3;
    const r=home.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(home.offsetHeight-innerHeight)));
    document.body.classList.toggle('desk',d);
    document.body.classList.toggle('hdr-off',d&&p<.06);
    const base=d?1:1.38;
    const zoom = base + (2.2 - base) * p;
const rotate = (p - 0.5) * -3;

shot.style.transform = `
  translate(-50%, -50%)
  scale(${zoom})
  rotateX(${rotate}deg)
`;
    const i=d?(p<.1?-1:p<.4?0:p<.72?1:2):(p<.33?0:p<.7?1:2);
    caps.forEach((c,j)=>c.classList.toggle('on',j===i));
    feat.style.opacity=d&&p<.1?0:1;
    hint.style.opacity=!d&&p<.05?1:0;
  };
  addEventListener('scroll',upd,{passive:true});
  addEventListener('resize',upd);
  upd();
}

/* CINEMATIC 3D SHOWROOM EXPERIENCE */

.walk {
  perspective: 1200px;
}

.stage {
  perspective: 1200px;
  transform-style: preserve-3d;
}

.shot {
  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
  box-shadow: 0 25px 80px rgba(0,0,0,.25);
}

.shade {
  background: linear-gradient(
    90deg,
    rgba(5,15,30,.65),
    rgba(5,15,30,.05)
  );
}

.cap {
  text-shadow: 0 3px 15px rgba(0,0,0,.4);
}
