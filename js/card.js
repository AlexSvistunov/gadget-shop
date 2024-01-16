const wrapper = document.querySelector('.wrapper')

async function getElementsFromServer() {
    const response = await fetch('https://shop-frontent.ru/wp-json/wp/v1/products')
    const data = await response.json()

    return data

}

function getUrl(id) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(id)
}

async function renderProduct() {
    const idProduct = getUrl('id')
    const products = await getElementsFromServer()
    const product = products.find(product => product.id === Number(idProduct))
    const {title, shortDesc, image, price, id} = product

    wrapper.insertAdjacentHTML('afterend', `
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

renderProduct()