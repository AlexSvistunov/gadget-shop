import {
  getProductFromLocalStorage,
  setProductToLocalStorage,
} from "./main.js";
import { productTemplate } from "./main.js";

const productsArray = await getElementsFromServer()

const cartProduct = document.querySelector(".cart");

const basketCount = document.querySelector(".basket__count");
basketCount.textContent = getProductFromLocalStorage().length;

async function getElementsFromServer() {
  const response = await fetch(
    "https://shop-frontent.ru/wp-json/wp/v1/products"
  );
  const data = await response.json();

  return data;
}

async function initialServerElementsToHTML() {
  const products = await getElementsFromServer();
  const cartProducts = products.filter((el) =>
    getProductFromLocalStorage().includes(String(el.id))
  );
  cartProducts.forEach((product) => {
    cartProduct.insertAdjacentHTML(
      "beforeend",
      `
                <div class="cart__product">
                    <div class="cart__img">
                        <img src="${product.image}">
                    </div>
                    <div class="cart__title">${product.title}</div>
                    <div class="cart__del-card">X</div>
                    <div class="cart__price">${product.price}</div>
                    <span class="cart__item-id visually-hidden">${product.id}</span>
                </div>
        `
    );
  });
}

function renderCart() {
  cartProduct.innerHTML = ''
  const products = productsArray
  const cartProductsId = getProductFromLocalStorage()
  const renderArrayCart = products.filter(product => cartProductsId.includes(String(product.id)))
  renderArrayCart.forEach(product => {
    cartProduct.insertAdjacentHTML(
      "beforeend",
      `
                <div class="cart__product">
                    <div class="cart__img">
                        <img src="${product.image}">
                    </div>
                    <div class="cart__title">${product.title}</div>
                    <div class="cart__del-card">X</div>
                    <div class="cart__price">${product.price}</div>
                    <span class="cart__item-id visually-hidden">${product.id}</span>
                </div>
        `
    );
  })
}

function deleteItemFromCart(id) {
  const basket = getProductFromLocalStorage();
  const arrayWithoutDeleted = basket.filter((el) => el !== id);
  const newBasket = arrayWithoutDeleted;
  setProductToLocalStorage(newBasket);
  renderCart()
}
cartProduct.addEventListener("click", (e) => {
  const self = e.target;
  const cartItem = self.closest(".cart__product");
  if (self.classList.contains("cart__del-card")) {
    const id = cartItem.querySelector(".cart__item-id").textContent;
    deleteItemFromCart(id);
  } else return;
});


initialServerElementsToHTML();
