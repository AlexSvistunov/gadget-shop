
const cards = document.querySelector('.cards')

async function getElementsFromServer() {
    const response = await fetch('https://shop-frontent.ru/wp-json/wp/v1/products')
    const data = await response.json()

    return data

}

async function initialServerElementsToHTML() {
    const products = await getElementsFromServer()
    console.log(products)
    products.forEach(product => {     
        productTemplate(product)      
    })   

}

function productTemplate(product) {

    const {title, shortDesc, image, price, id} = product
    cards.insertAdjacentHTML('beforeend', `
        <div class="product">
            <h3 class="product__title">${title === 'Xiaomi Робот пылесос Vacuum Mop 3C моющий CN' ? 'Xiomi Робот' : title}</h3>
            <img class="product__image" src="${image}">
            <span class="product__price">${price}</span>
            <p class="product__desc">${shortDesc}</p>
            <button class="product__add">Добавить в корзину</button>
            <a class="product__link" href="/card.html?id=${id}">Перейти в карточку товара</a>
            <span class="product__id visually-hidden">${id}</span>
        </div>
    `)

}

let storageArray = []


cards.addEventListener('click', (e) => {
    const self = e.target;
    // добавить если это не нужная нам кнопка через функцию которую я не помню
    const product = self.closest('.product')
    const productId = product.querySelector('.product__id').textContent
    setProductToLocalStorage(product, productId)
    document.querySelector('.basket__count').textContent = storageArray.length
    
})
let amountOfLocalStorage = 0;


function setProductToLocalStorage(product, id) {
    storageArray.push(id)
    amountOfLocalStorage++
    localStorage.setItem('basket', storageArray)
}


function getProductFromLocalStorage() {
    
}


console.log(localStorage.getItem('basket'))

// кнопка посмотреть еще

initialServerElementsToHTML()

