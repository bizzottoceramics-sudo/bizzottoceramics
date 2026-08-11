const whatsapp = "919848337316";

const products = [
  {
    name: "Fantasy Crema",
    brand: "BIZZOTTOCERAMICS",
    cat: "4 × 6 Tiles",
    size: "4 × 6",
    finish: "Premium",
    price: "₹100 / sq.ft",
    img: "PASTE_FANTASY_CREMA_IMAGE_URL"
  },
  {
    name: "Onyx Pearl",
    brand: "BIZZOTTOCERAMICS",
    cat: "4 × 6 Tiles",
    size: "4 × 6",
    finish: "Glossy",
    price: "₹100 / sq.ft",
    img: "PASTE_ONYX_PEARL_IMAGE_URL"
  },
  {
    name: "Burberry Crema",
    brand: "BIZZOTTOCERAMICS",
    cat: "4 × 6 Tiles",
    size: "4 × 6",
    finish: "Premium",
    price: "₹100 / sq.ft",
    img: "PASTE_BURBERRY_CREMA_IMAGE_URL"
  },
  {
    name: "Nuvola Grey",
    brand: "BIZZOTTOCERAMICS",
    cat: "4 × 6 Tiles",
    size: "4 × 6",
    finish: "Glossy",
    price: "₹100 / sq.ft",
    img: "PASTE_NUVOLA_GREY_IMAGE_URL"
  },
  {
    name: "Statuario Eminence",
    brand: "BIZZOTTOCERAMICS",
    cat: "4 × 6 Tiles",
    size: "4 × 6",
    finish: "Glossy",
    price: "₹100 / sq.ft",
    img: "PASTE_STATUARIO_EMINENCE_IMAGE_URL"
  }
];

const grid = document.getElementById("productGrid");
const filters = document.getElementById("filters");

const cats = ["All", ...new Set(products.map(p => p.cat))];

filters.innerHTML = cats.map((c, i) =>
  `<button class="filter ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`
).join("");

function render(cat = "All") {
  grid.innerHTML = products
    .filter(p => cat === "All" || p.cat === cat)
    .map(p => {
      const msg = encodeURIComponent(
        `Hi BIZZOTTOCERAMICS, I am interested in ${p.name} (${p.size}). Price: ${p.price}. Please share availability.`
      );

      return `
        <article class="product">
          <img src="${p.img}" alt="${p.name}" loading="lazy">

          <div class="product-body">
            <h3>${p.name}</h3>

            <div class="meta">
              ${p.brand} • ${p.size} • ${p.finish}
            </div>

            <div class="price">
              ${p.price}
            </div>

            <div class="product-actions">
              <a class="small-btn" href="#contact">View Details</a>
              <a class="small-btn wa"
                 target="_blank"
                 rel="noopener"
                 href="https://wa.me/${whatsapp}?text=${msg}">
                 WhatsApp
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

filters.addEventListener("click", e => {
  if (e.target.classList.contains("filter")) {
    document.querySelectorAll(".filter")
      .forEach(x => x.classList.remove("active"));

    e.target.classList.add("active");
    render(e.target.dataset.cat);
  }
});

document.querySelector(".menu-btn")
  ?.addEventListener("click", () =>
    document.querySelector(".nav")?.classList.toggle("open")
  );

document.querySelectorAll(".nav a")
  .forEach(a =>
    a.addEventListener("click", () =>
      document.querySelector(".nav")?.classList.remove("open")
    )
  );

render();
