const whatsapp = "919848337316";
const products = [
  {name:"Marble Elegance",brand:"RAK Ceramics",cat:"Floor Tiles",size:"600 × 1200 mm",finish:"Glossy",price:"Get Price",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"},
  {name:"Modern Stone",brand:"Somany",cat:"Wall Tiles",size:"600 × 1200 mm",finish:"Matt",price:"Get Price",img:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"},
  {name:"Urban Luxe",brand:"RAK Ceramics",cat:"Large Slabs",size:"1200 × 2400 mm",finish:"Matt",price:"Get Price",img:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80"},
  {name:"Bathroom Collection",brand:"Somany",cat:"Bathroom Tiles",size:"600 × 600 mm",finish:"Anti-slip",price:"Get Price",img:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80"},
  {name:"Premium Sanitary",brand:"RAK Ceramics",cat:"Sanitary Ware",size:"Premium Range",finish:"Gloss",price:"Get Price",img:"https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80"},
  {name:"Floor Sheet Collection",brand:"BIZZOTTOCERAMICS",cat:"Floor Sheets",size:"Multiple Sizes",finish:"Premium",price:"Get Price",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"}
];
const grid=document.getElementById("productGrid"), filters=document.getElementById("filters");
const cats=["All",...new Set(products.map(p=>p.cat))];
filters.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
function render(cat="All"){
  grid.innerHTML=products.filter(p=>cat==="All"||p.cat===cat).map(p=>{
    const msg=encodeURIComponent(`Hi BIZZOTTOCERAMICS, I am interested in ${p.name} (${p.size}). Please share the latest price and availability.`);
    return `<article class="product"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="product-body"><h3>${p.name}</h3><div class="meta">${p.brand} • ${p.size} • ${p.finish}</div><div class="product-actions"><a class="small-btn" href="#contact">View Details</a><a class="small-btn wa" target="_blank" rel="noopener" href="https://wa.me/${whatsapp}?text=${msg}">WhatsApp</a></div></div></article>`
  }).join("");
}
filters.addEventListener("click",e=>{if(e.target.classList.contains("filter")){document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");render(e.target.dataset.cat)}});
document.querySelector(".menu-btn").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));
render();
