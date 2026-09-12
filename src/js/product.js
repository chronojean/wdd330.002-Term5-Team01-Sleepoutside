import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Create the data source
const dataSource = new ProductData("tents");

// 2. Get the product ID from the URL
const productID = getParam("product");

// 3. Create the ProductDetails instance and initialize it
const product = new ProductDetails(productID, dataSource);
product.init();

// function addProductToCart(product) {
//   const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
//   cartItems.push(product);
//   setLocalStorage("so-cart", cartItems);
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
