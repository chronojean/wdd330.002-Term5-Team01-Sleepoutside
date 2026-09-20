// Wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Add touch and click listeners
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}

// Get a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

// Update the number shown on the cart
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const cart = document.querySelector(".cart");

  if (!cart) return;

  let cartCount = cart.querySelector(".cart-count");

  if (!cartCount) {
    cartCount = document.createElement("span");
    cartCount.classList.add("cart-count");
    cart.appendChild(cartCount);
  }

  cartCount.textContent = cartItems.length;
  cartCount.hidden = cartItems.length === 0;
}

// Render one HTML template
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// Load an HTML template
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();

  return template;
}

// Load the shared header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(
    headerTemplate,
    headerElement,
    null,
    updateCartCount,
  );

  renderWithTemplate(footerTemplate, footerElement);
}