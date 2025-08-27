import { navAndFooter } from "../utils/navAndFooter.js";

navAndFooter();

window.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const printContainer = document.getElementById("printContainer");

  if (cart.length === 0) {
    printContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  console.log(cart);

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  printContainer.innerHTML = `
    <table class="table table-bordered mt-3">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(
          (item, index) => `
            <tr class=""row>
              <td class="col-1"><img class="" src="${item.imgSrc}"/></td>
              <td class="">${item.title}</td>
              <td class="">${item.quantity}</td>
              <td class="">$${item.price}</td>
               <td class="">$${(item.price * item.quantity).toFixed(2)}</td>
             </tr>`
        )}
        <tr class="fw-bold">
          <td colspan="4" class="text-end">Grand Total</td>
          <td>$${total.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <button onclick="window.print()" class="print-btn mt-3">Print</button>
  `;

  // localStorage.removeItem("cart");
});
