const $=s=>document.querySelector(s);
$('.menu-btn').onclick=()=>$('.nav').classList.toggle('open');
document.querySelectorAll('.nav a').forEach(a=>a.onclick=()=>$('.nav').classList.remove('open'));

/* Cards and visiting card tilt toward finger or mouse */
document.querySelectorAll('.tilt').forEach(el=>{
  const mv=e=>{const t=e.touches?e.touches[0]:e,r=el.getBoundingClientRect(),x=(t.clientX-r.left)/r.width-.5,y=(t.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03)`};
  el.addEventListener('mousemove',mv);
  el.addEventListener('touchmove',mv,{passive:true});
  ['mouseleave','touchend'].forEach(v=>el.addEventListener(v,()=>el.style.transform=''));
});

/* 3D showroom: tiles drop in, camera walks through, end tile splits into layers */
(function(){
  const cv=$('#tile3d');
  if(!window.THREE||!cv)return;
  let R;
  try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){cv.style.display='none';return}
  R.setPixelRatio(Math.min(devicePixelRatio,1.5));
  R.setSize(innerWidth,innerHeight);
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,60);
  sc.fog=new THREE.Fog(0xf7f4ee,6,26);
  sc.add(new THREE.AmbientLight(0xffffff,.8));
  const sun=new THREE.DirectionalLight(0xffffff,.8);sun.position.set(3,8,4);sc.add(sun);
  const glow=new THREE.PointLight(0xffffff,1,10);sc.add(glow);

  /* Three rooms along the walk: living (beige), bathroom (blue), kitchen (terracotta) */
  const F=[[0xeee6d8,0xd3c3a6],[0xffffff,0x0095d9],[0xf3eadc,0xc4432b]];
  const W=[[0xe9dfcd,0xf5efe4],[0xdff1fb,0xb9e0f3],[0xf6ede1,0xe3cdb0]];
  const st=1.46,rows=22,it=[];
  for(let r=0;r<rows;r++){
    const z=5-r*st,n=Math.min(2,r/7|0),d=r*.07;
    for(let c=0;c<4;c++)it.push({x:(c-1.5)*st,y:0,z,d:d+Math.random()*.4,p:F[n][(r+c)%2]});
    for(const s of[-1,1])for(let h=0;h<3;h++)it.push({x:s*3,y:.75+h*st,z,d:d+Math.random()*.4,p:W[n][(r+h)%2],w:1});
  }
  const mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(1.4,.12,1.4),new THREE.MeshStandardMaterial({roughness:.18,metalness:.12}),it.length),o=new THREE.Object3D();
  it.forEach((t,i)=>mesh.setColorAt(i,new THREE.Color(t.p)));
  sc.add(mesh);

  const ease=x=>1-Math.pow(1-x,3);
  const t0=performance.now();
  let intro=true;
  function place(sec){
    let done=true;
    it.forEach((t,i)=>{
      const e=ease(Math.min(1,Math.max(0,(sec-t.d)/.9)));
      if(e<1)done=false;
      o.position.set(t.x,t.y+(1-e)*10,t.z);
      o.rotation.set(0,(1-e)*1.5,t.w?Math.PI/2:0);
      o.scale.setScalar(.3+.7*e);
      o.updateMatrix();
      mesh.setMatrixAt(i,o.matrix);
    });
    mesh.instanceMatrix.needsUpdate=true;
    return done;
  }

  /* End of the walk: one tile splits into glaze, body and base */
  const ex=new THREE.Group();
  [[0x0095d9,.1],[0xe3d3bb,.35],[0xa52a2a,.15]].forEach(([c,h])=>{
    ex.add(new THREE.Mesh(new THREE.BoxGeometry(2.6,h,2.6),new THREE.MeshStandardMaterial({color:c,roughness:.2,metalness:.1})));
  });
  ex.position.set(0,1.7,-26.5);ex.rotation.x=.9;
  sc.add(ex);

  let tgt=0,cur=0;
  const sp=()=>{const m=document.documentElement.scrollHeight-innerHeight;tgt=m>0?scrollY/m:0};
  addEventListener('scroll',sp);sp();
  addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();R.setSize(innerWidth,innerHeight)});

  (function loop(){
    requestAnimationFrame(loop);
    const t=performance.now()/1000;
    cur+=(tgt-cur)*.07;
    if(intro)intro=!place((performance.now()-t0)/1000-.2);
    const z=7-cur*26.5;
    cam.position.set(Math.sin(t*.4+cur*6)*.25,1.7-.3*Math.sin(cur*3),z);
    cam.lookAt(0,1.4,z-7);
    glow.position.set(0,2.5,z-2);
    const e=Math.min(1,Math.max(0,(cur-.7)/.22));
    ex.children.forEach((m,i)=>m.position.y=[1,0,-1][i]*(.25+e*1.4));
    ex.rotation.y=cur*5;
    R.render(sc,cam);
  })();
})();
