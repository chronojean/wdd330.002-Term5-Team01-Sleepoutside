import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  const category = getParam("category") || "tents";
  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list");

  const categoryNames = {
    tents: "Tents",
    backpacks: "Backpacks",
    "sleeping-bags": "Sleeping Bags",
    hammocks: "Hammocks",
  };

  document.querySelector("#category-title").textContent =
    categoryNames[category] || "Products";

  const productList = new ProductList(
    category,
    dataSource,
    listElement,
  );

  await productList.init();
}

init();