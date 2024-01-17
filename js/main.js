const cards = document.querySelector(".cards");



async function getElementsFromServer() {
  const response = await fetch(
    "https://shop-frontent.ru/wp-json/wp/v1/products"
  );
  const data = await response.json();

  return data;
}



async function initialServerElementsToHTML() {
  const products = await getElementsFromServer();
  console.log(products);
  products.forEach((product) => {
    productTemplate(product);
  });
}

export function productTemplate(product) {
  const { title, shortDesc, image, price, id } = product;
  cards?.insertAdjacentHTML(
    "beforeend",
    `
        <div class="product">
            <h3 class="product__title">${
              title === "Xiaomi Робот пылесос Vacuum Mop 3C моющий CN"
                ? "Xiomi Робот"
                : title
            }</h3>
            <img class="product__image" src="${image}">
            <span class="product__price">${price}</span>
            <p class="product__desc">${shortDesc}</p>
            <button class="product__add">Добавить в корзину</button>
            <a class="product__link" href="/card.html?id=${id}">Перейти в карточку товара</a>
            <span class="product__id visually-hidden">${id}</span>
        </div>
    `
  );
}

cards?.addEventListener("click", addToBasketHandler)

export function addToBasketHandler(e) {
  const self = e.target;
  if (self.classList.contains("product__add")) {
    const product = self.closest(".product");
    const productId = product.querySelector(".product__id").textContent;
    const basket = getProductFromLocalStorage();
    if (basket.includes(productId)) return;
    basket.push(productId);
    setProductToLocalStorage(basket);
  } else {return}
}

const basketCount = document.querySelector(".basket__count");
basketCount.textContent = getProductFromLocalStorage().length;

export function setProductToLocalStorage(basket) {
  const basketCount = document.querySelector(".basket__count");
  localStorage.setItem("basket", JSON.stringify(basket));
  basketCount.textContent = basket.length;
}

export function getProductFromLocalStorage() {
  const cartDataJSON = localStorage.getItem("basket");
  return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}


// кнопка посмотреть еще

initialServerElementsToHTML();
