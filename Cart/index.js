function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartItems = document.querySelector(".cart-items");
  const cartBody = document.querySelector(".checkout");
  console.log(cartItems);

  cartItems.innerHTML = "";
  let total = 0;
  if (cart.length <= 0) {
    cartItems.innerHTML = `<p class="text-black">no item yet in cart, go to check our product</p>`;
  } else {
    cart.forEach((item) => {
      const row = document.createElement("tr");

      const itemTotal = (item.price * item.quantity).toFixed(2);
      total += parseFloat(itemTotal);
      console.log(cart.length);

      row.innerHTML = `<div class="row align-items-center">
        <div class="col-2">
          <img src="${item.imgSrc || item.thumbnail}" alt="" />
        </div>
        <div class="col-10">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>${item.title}</h5>
              <h6>${item.category.toUpperCase()}</h6>
              <p>${item.brand || ""}</p>
            </div>
<div class="d-flex gap-5 align-items-center">            <div class="d-flex gap-3 cart-button">
              <button class="increase"><i class="bi bi-plus-lg"></i></button>
              <span class="mx-2">${item.quantity}</span>
              <button class="decrease"><i class="bi bi-dash"></i></button>
            </div>
            <div class="d-flex justify-content-end align-items-center gap-3">
              <p class="text-center m-0 ">${itemTotal}$</p>
              <button class="btn btn-sm btn-danger remove"><i class="bi bi-trash"></i></button>
            </div></div>
          </div>

        </div>
      </div>`;

      row.querySelector(".increase").addEventListener("click", () => {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });

      row.querySelector(".decrease").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          const index = cart.indexOf(item);
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });

      row.querySelector(".remove").addEventListener("click", () => {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });

      cartItems.appendChild(row);
    });

    cartBody
      .querySelector(".compelete-checkout")
      .addEventListener("click", () => {
        window.location.href = "../checkout/index.html";
      });

    let totalPriceForAll = cart.reduce(
      (acc, el) => acc + el.price * el.quantity,
      0
    );
    if (totalPriceForAll <= 0) {
      document.getElementById("cart-total").textContent = 0 + "$";
    } else {
      document.getElementById("cart-total").textContent =
        totalPriceForAll.toFixed(2) + "$";
    }
  }
}

document.addEventListener("DOMContentLoaded", renderCart);
