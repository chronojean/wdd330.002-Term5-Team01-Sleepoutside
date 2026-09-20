function productCardTemplate(product) {
  const imagePath = product.Image.replace("../", "");

  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img
          src="${imagePath}"
          alt="${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

 async init() {
  const products = await this.dataSource.getData();
  const featuredIds = ["880RR", "985RF", "985PR", "344YJ"];

  const displayedProducts = featuredIds
    .map((id) => products.find((product) => product.Id === id))
    .filter((product) => product);

  this.renderList(displayedProducts);
}

  renderList(products) {
    this.listElement.innerHTML = products
      .map(productCardTemplate)
      .join("");
  }
}
