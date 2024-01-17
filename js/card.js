import { addToBasketHandler } from "./main.js";
import { getProductFromLocalStorage } from "./main.js";
import { setProductToLocalStorage } from "./main.js"
const wrapper = document.querySelector(".wrapper");

const basketCount = document.querySelector(".basket__count");
basketCount.textContent = getProductFromLocalStorage().length;


async function getElementsFromServer() {
  const response = await fetch(
    "https://shop-frontent.ru/wp-json/wp/v1/products"
  );
  const data = await response.json();
  return data;
}

function getUrl(id) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(id);
}

async function renderProduct() {
  const idProduct = getUrl("id");
  const products = await getElementsFromServer();
  const product = products.find((product) => product.id === Number(idProduct));
  const { title, desc, image, price, id } = product;

  wrapper.insertAdjacentHTML(
    "beforeend",
    `
    <div class="product-self">
            <h3 class="product-self__title">${
              title === "Xiaomi Робот пылесос Vacuum Mop 3C моющий CN"
                ? "Xiomi Робот"
                : title
            }</h3>
            <img class="product-self__image" src="${image}">
            <span class="product-self__price">${price}</span>
            <p class="product-self__desc">${desc}</p>
            <button class="product-self__add">Добавить в корзину</button>
            <a class="product-self__link" href="/card.html?id=${id}">Перейти в карточку товара</a>
            <span class="product-self__id visually-hidden">${id}</span>
        </div>
    `
  );
}

renderProduct();


wrapper.addEventListener("click", (e) => {
    const self = e.target;
    console.log(self)
    if (self.classList.contains("product-self__add")) {
      const product = self.closest(".product-self");
      const productId = product.querySelector(".product-self__id").textContent;
      const basket = getProductFromLocalStorage();
      if (basket.includes(productId)) return;
      basket.push(productId);
      setProductToLocalStorage(basket);
    } else {return}
  }
  
)