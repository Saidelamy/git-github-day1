function productDetailsFun() {
  const productDetailsContainer = document.getElementById("product-details");

  console.log(productDetailsContainer);

  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  console.log(product.images);

  if (product) {
    productDetailsContainer.innerHTML = `
              <div class="row">
        <div class="col-5">
          <div class="imgs-conatiner row">
            <div class="col-9"><img id="main-img" src="${
              product.thumbnail
            }" alt="" /></div>
            <div class="col-3 d-flex flex-column justify-content-between">
              ${product.images
                .map(
                  (img, i) => `
                  <img src="${img}" alt="thumb-${i}" class="thumb-img mb-2" style="cursor:pointer;"/>
                `
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="col-7 d-flex flex-column justify-content-around gap-4">
          <div>
            <h1>${product.title}</h1>
            <p>${product.description}</p>
            <p>Price : <span>$${product.price}</span></p>
            <p>total in the stock : <span>${product.stock}</span></p>
            <p>brand name : <span>${product.brand}</span></p>
            <p>Category : <span>${product.category.toUpperCase()}</span></p>
          </div>
          <button class="product-cart add-to-cart">
            <i class="bi bi-bag-plus"> Add to Cart</i>
          </button>
        </div>
      </div>
      `;

    const mainImg = document.getElementById("main-img");
    const thumbnails = document.querySelectorAll(".thumb-img");

    thumbnails.forEach((thumb) => {
      thumb.addEventListener("mouseenter", () => {
        mainImg.src = thumb.src;
      });
    });

    document.querySelector(".add-to-cart").addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((el) => el.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      swal("add successfully!", "المنتج اتضاف للعربة بنجاح", "success", {
        button: "done!",
      });
    });
  } else {
    productDetailsContainer.innerHTML = `<p>No product found</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  productDetailsFun();
});
