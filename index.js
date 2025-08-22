let slider = [
  {
    img: "/images/hero-woman4.jpg",
    title: "New Collection",
    desc: "Shop the latest trends now, Shop the latest trends now, Shop the latest trends now",
    position: { top: "30%", left: "15%" },
  },
  {
    img: "/images/hero-woman2.jpg",
    title: "Summer Sale",
    desc: "Shop the latest trends now, Shop the latest trends now.",
    position: { bottom: "300px", left: "250px" },
  },
  {
    img: "/images/hero-man.jpg",
    title: "Accessories",
    desc: "Shop the latest trends now, Shop the latest trends now.",
    position: { top: "30%", right: "10%", transform: "translateX(-50%)" },
  },

  //   "/images/hero-woman4.jpg",
  //   "/images/hero-woman2.jpg",
  //   "/images/hero-woman1.jpg",
];

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let heroImg = document.querySelector(".hero-img");
let heroTitle = document.querySelector(".hero-title");
let heroDesc = document.querySelector(".hero-desc");
let heroText = document.querySelector(".hero-text");

let index = 0;

function showImage() {
  let slide = slider[index];

  heroImg.style.backgroundImage = `url(${slide.img})`;

  heroTitle.textContent = slide.title;
  heroDesc.textContent = slide.desc;

  heroText.style.top = "";
  heroText.style.bottom = "";
  heroText.style.left = "";
  heroText.style.right = "";
  heroText.style.transform = "";

  for (let prop in slide.position) {
    heroText.style[prop] = slide.position[prop];
  }
}
function nextHero() {
  index++;
  if (index >= slider.length) {
    index = 0;
  }
  showImage();
}
function prevHero() {
  index--;
  if (index < 0) {
    index = slider.length - 1;
  }
  showImage();
}

next.addEventListener("click", nextHero);
prev.addEventListener("click", prevHero);

showImage();

setInterval(function () {
  nextHero();
}, 3000);

async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Carts Data:", data);
    displayProductInBody(data);
  } catch (error) {
    console.error("Error fetching carts:", error);
  }
}

function displayProductInBody(el) {
  const productcard = document.querySelector(".product-cards");
  productcard.innerHTML = "";
  console.log(el);
  const fragment = document.createDocumentFragment();
  el.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-4";
    card.innerHTML = `            <div class="card">
              <div
                class="img-btns position-relative d-flex justify-content-center"
              >
                <img
                  src=${product.images[0]}
                  width="800"
                  height="1034"
                  alt="..."
                />
                <div class="card-button d-flex">
                  <button class="eye bg-transparent">
                    <i class="bi bi-eye"></i>
                  </button>
                 <button 
  onclick="addToCart()" 
  class="border-0 bg-transparent">
  <i class="bi bi-bag-plus"> Add to Cart</i>
</button>
                </div>
              </div>
              <div class="card-body text-start">
                <h5 class="card-title my-2">${product.title}</h5>
                <p class="card-text">${product.price}$</p>
              </div>
            </div>`;

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(
        product.id,
        product.title,
        product.price,
        product.discountPercentage,
        product.description,
        product.brand,
        product.category,
        product.rating
      );
    });

    fragment.append(card);
  });
  productcard.append(fragment);
}

async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayProductInBody(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProductInBody(products) {
  const productcard = document.querySelector(".product-cards");
  productcard.innerHTML = "";

  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-4";

    const imgSrc = product.images?.[0] || "https://via.placeholder.com/300";

    card.innerHTML = `
      <div class="card">
        <div class="img-btns position-relative d-flex justify-content-center">
          <img src="${imgSrc}" width="800" height="1034" alt="${product.title}" />
          <div class="card-button d-flex">
            <button class="eye bg-transparent">
              <i class="bi bi-eye"></i>
            </button>
            <button class="add-to-cart border-0 bg-transparent">
              <i class="bi bi-bag-plus"> Add to Cart</i>
            </button>
          </div>
        </div>
        <div class="card-body text-start">
          <h5 class="card-title my-2">${product.title}</h5>
          <p class="card-text">${product.price}$</p>
        </div>
      </div>
    `;

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(
        product.id,
        product.title,
        product.price,
        product.discountPercentage,
        product.description,
        product.brand,
        product.category,
        product.rating,
        imgSrc
      );
    });

    fragment.append(card);
  });

  productcard.append(fragment);
}

function addToCart(
  id,
  title,
  price,
  discountPercentage,
  description,
  brand,
  category,
  rating,
  imgSrc
) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  let existingProduct = cart.find((el) => el.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id,
      title,
      price,
      discountPercentage,
      description,
      brand,
      category,
      rating,
      quantity: 1,
      imgSrc,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
  updateCartCount();
});
