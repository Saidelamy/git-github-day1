import { navAndFooter } from "./utils/navAndFooter.js";

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
let spinner = document.getElementById("spinner");
let productContainer = document.querySelector(".product-container");

let index = 0;

function showImage() {
  let slide = slider[index];

  heroImg.setAttribute("src", slide.img);
  heroTitle.textContent = slide.title;
  heroDesc.textContent = slide.desc;
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

let allProducts = [];
async function getProducts() {
  try {
    spinner.style.display = "block";
    const response = await fetch("https://dummyjson.com/products?limit=192");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    allProducts = data.products;
    displayProductInBody(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    spinner.style.display = "none";
  }
}

// make pagination
let currentPage = 1;
const productsPerPage = 12;
let filteredProducts = [];

function displayProductInBody(products) {
  const productcard = document.querySelector(".product-cards");

  productcard.innerHTML = "";

  filteredProducts = products;

  renderPage();
}

function renderPage() {
  const productcard = document.querySelector(".product-cards");
  productcard.innerHTML = "";

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;

  const paginatedProducts = filteredProducts.slice(start, end);

  if (paginatedProducts.length === 0) {
    productcard.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4 class="text-muted">No products match your filters</h4>
      </div>
    `;
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  const fragment = document.createDocumentFragment();

  // عرض المنتجات
  paginatedProducts.forEach((product) => {
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

    card.querySelector(".view-details").addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "Product/index.html";
    });

    fragment.append(card);
  });

  productcard.append(fragment);
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.classList.add("prev-btn");
  prevBtn.addEventListener("click", () => {
    currentPage--;
    renderPage();
  });
  pagination.appendChild(prevBtn);
  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.classList.add("pagination-btn");
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderPage();
    });
    pagination.appendChild(pageBtn);
  }

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.classList.add("next-btn");
  nextBtn.addEventListener("click", () => {
    currentPage++;
    renderPage();
  });
  pagination.appendChild(nextBtn);
}
function applyFilter() {
  let filtered = [...allProducts];

  // checkbox category
  const categoryChecks = document.querySelectorAll(".filter-category:checked");
  const selectedCategories = Array.from(categoryChecks).map(
    (checkBox) => checkBox.value
  );
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  // filter by price
  const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("max-price").value) || Infinity;
  filtered = filtered.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  // rating filter
  const ratingChecks = document.querySelectorAll(".filter-rating:checked");
  const ratingValues = Array.from(ratingChecks).map((checkBox) =>
    Number(checkBox.value)
  );
  if (ratingValues.length > 0) {
    const minRating = Math.max(...ratingValues);
    filtered = filtered.filter((product) => product.rating >= minRating);
  }
  // discount filter

  const discountChecks = document.querySelectorAll(".filter-discount:checked");
  const discountValues = Array.from(discountChecks).map((checkBox) =>
    Number(checkBox.value)
  );
  if (discountValues.length > 0) {
    const minDiscount = Math.min(...discountValues);
    filtered = filtered.filter(
      (product) => product.discountPercentage >= minDiscount
    );
  }

  // ✅ Sort
  const sort = document.getElementById("sort").value;
  if (sort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating-high") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "discount-high") {
    filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
  }

  if (filtered.length === 0) {
    const productcard = document.querySelector(".product-cards");
    productcard.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4 class="text-muted">No products match your filters</h4>
      </div>
    `;
    return;
  }

  displayProductInBody(filtered);
}
document
  .querySelectorAll(".filter-category, .filter-rating, .filter-discount")
  .forEach((cb) => cb.addEventListener("change", applyFilter));

document.getElementById("min-price").addEventListener("input", applyFilter);
document.getElementById("max-price").addEventListener("input", applyFilter);
document.getElementById("sort").addEventListener("change", applyFilter);

document.getElementById("clear-filters").addEventListener("click", () => {
  document
    .querySelectorAll(".filters input[type=checkbox]")
    .forEach((cb) => (cb.checked = false));
  document.getElementById("min-price").value = "";
  document.getElementById("max-price").value = "";
  document.getElementById("sort").value = "";
  displayProductInBody(allProducts);
});

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
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    swal(
      "Login required!",
      "Please login before adding products to cart.",
      "warning",
      {
        button: "Go to Login",
      }
    ).then(() => {
      window.location.href = "login/index.html";
    });
    return;
  }

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

// footer and navbar
navAndFooter();
