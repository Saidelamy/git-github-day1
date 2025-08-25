let slider = [
  {
    img: "/images/Groceries.png",
    title: "Groceries",
    desc: "Vel quo asperiores impedit fuga iure aut minima reiciendis earum, saepe ullam et dolorum dicta itaque placeat esse tempora ipsam neque cum.",
  },
  {
    img: "/images/Furniture.png",
    title: "Furniture",
    desc: "Shop the latest trends now, Shop the latest trends now.",
  },
  {
    img: "/images/clothes.png",
    title: "Clothes",
    desc: "Vel quo asperiores impedit fuga iure aut minima reiciendis earum, saepe ullam et dolorum dicta itaque placeat esse tempora ipsam neque cum",
  },
  {
    img: "/images/fragrances.png",
    title: "Fragrances",
    desc: "Vel quo asperiores impedit fuga iure aut minima reiciendis earum, saepe ullam et dolorum dicta itaque placeat esse tempora ipsam neque cum",
  },
];

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let heroImg = document.querySelector(".hero-img");
let heroTitle = document.querySelector(".hero-title");
let heroDesc = document.querySelector(".hero-desc");
let heroText = document.querySelector(".hero-text");
let cartIcon = document.querySelector(".cart-icon");
let login = document.querySelector(".login");
let register = document.querySelector(".register");
let logout = document.querySelector(".logout");

let index = 0;

function showImage() {
  let slide = slider[index];

  heroImg.setAttribute("src", slide.img);
  heroTitle.textContent = slide.title;
  heroDesc.textContent = slide.desc;

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

    const imgSrc = product.images?.[0];

    card.innerHTML = `
      <div class="card">
        <div class="img-btns position-relative d-flex justify-content-center">
          <img src="${imgSrc}" width="800" height="1034" alt="${product.title}" />
          <div class="card-button d-flex">
            <button class="eye bg-transparent view-details">
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

    // navigate navbar
    card.querySelector(".view-details").addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "Product/index.html";
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
  swal("add successfully!", "المنتج اتضاف للعربة بنجاح", "success", {
    button: "done!",
  });
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

// navigate navbar

cartIcon.addEventListener("click", () => {
  window.location.href = "Cart/index.html";
});

login.addEventListener("click", () => {
  window.location.href = "login/index.html";
});
register.addEventListener("click", () => {
  window.location.href = "register/index.html";
});
logout.addEventListener("click", () => {
  window.location.href = "login/index.html";
});
