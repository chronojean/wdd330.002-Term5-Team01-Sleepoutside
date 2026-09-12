import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function changeQuantity(index, amount) {
  const cartItems = getLocalStorage("so-cart") || [];
  const currentQuantity = Number(cartItems[index].Quantity) || 1;

  cartItems[index].Quantity = Math.max(1, currentQuantity + amount);

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".quantity-decrease").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(Number(button.dataset.index), -1);
    });
  });

  document.querySelectorAll(".quantity-increase").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(Number(button.dataset.index), 1);
    });
  });
}

function cartItemTemplate(item, index) {
  const quantity = Number(item.Quantity) || 1;
  const itemTotal = (item.FinalPrice * quantity).toFixed(2);

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>

      <div class="cart-card__quantity">
        <button
          class="quantity-decrease"
          data-index="${index}"
          aria-label="Decrease quantity"
          type="button"
        >
          −
        </button>

        <span>Qty: ${quantity}</span>

        <button
          class="quantity-increase"
          data-index="${index}"
          aria-label="Increase quantity"
          type="button"
        >
          +
        </button>
      </div>

      <p class="cart-card__price">$${itemTotal}</p>
    </li>
  `;
}

renderCartContents();