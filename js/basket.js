import { getProductFromLocalStorage } from "./main.js";
import { productTemplate } from "./main.js";

const cartProduct = document.querySelector(".cart-products");

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
  console.log(cartProducts);
  cartProducts.forEach((product) => {
    cartProduct.insertAdjacentHTML(
      "beforeend",
      `
            <div class="cart">
                <div class="cart__product">
                    <div class="cart__img">
                        <img src="${product.image}">
                    </div>
                    <div class="cart__title">${product.title}</div>
                    <div class="cart__del-card">X</div>
                    <div class="cart__price">${product.price}</div>
                </div>
            </div>
        `
    );
  });
}

initialServerElementsToHTML();
