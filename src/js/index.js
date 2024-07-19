const productItem = document.getElementById("product-item");
const categoryItem = document.getElementById("category-item");
const BASEURL = "http://localhost:3000/";

fetch(`${BASEURL}category`).then(response => response.json()).then(data => {
    categoryItem.innerHTML = data.map(item => {
        return `
            <div class="col-lg-2 col-sm-4 col-sm-6 p-0 card-item">
                <div class=" p-4 rounded-2 me-2">
                    <img alt="" class="w-100 h-100" src=${item.image}>
                    <h6 class="pt-4">${item.name}</h6>
                </div>
            </div>
        `;
    }).join('');
}).catch(error => console.error('Error fetching the categories:', error));

fetch(`${BASEURL}product`)
    .then(response => response.json())
    .then(data => {
        productItem.innerHTML = data.map(item => {
            return `
                <div class="col-lg-4 col-md-6 border border-1 p-3 card-item">
                    <div class="card-product pb-3">
                        <div class="">
                            <img src=${item.image} class="img-card" alt="...">
                        </div>
                        <p class="fw-medium bg-danger text-white rounded-2 p-2 position-absolute top-0 start-0">Sale ${item.sale}%</p>
                        <div class="card-body position-relative">
                            <h6 class="card-title fs-6 fw-light">${item.category}</h6>
                            <h6 class="card-title fw-bold fs-5">${item.name}</h6>
                            <p class="card-text fs-5 m-0">$${item.price} <span class="text-decoration-line-through" style="color: grey;">$${item.price}</span></p>
                            <i id="cartId" class="fa-sharp fa-thin fa-cart-plus icon-product fs-4 p-3 rounded-circle position-absolute end-5" data-id="${item.id}" style="top: 40px !important; cursor: pointer" onclick="updateCartNumber(this ,${item.price})" ></i>
                            <div class="text-start star">
                            <p>
                            ${ratingStar(item.rating)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    })
    .catch(error => console.error('Error fetching the products:', error));

const cartNumberSpan = document.getElementById("cartNumber");
const priceTotalSpan = document.getElementById("priceTotal");

function updateCartNumber(element, price) {
    const clicked = element.getAttribute('data-clicked') === 'true';
    let currentNumber = parseInt(cartNumberSpan.innerHTML) || 0
    let totalPrice = parseFloat(priceTotalSpan.innerHTML) || 0;

    if (!clicked) {
        cartNumberSpan.innerHTML = currentNumber + 1;
        totalPrice += price;
        element.setAttribute('data-clicked', 'true');
        element.style.backgroundColor = "#66bf3c"
        element.style.color = "white";

    } else {
        cartNumberSpan.innerHTML = Math.max(currentNumber - 1, 0);
        totalPrice -= price;
        element.setAttribute('data-clicked', 'false');
        element.style.backgroundColor = "";
        element.style.color = "";
    }
    priceTotalSpan.innerHTML = totalPrice;
}

function ratingStar(rate) {
    let star = '';
    for (let i = 0; i < rate; i++) {
        star += '    <i class="fa-sharp fa-solid fa-star"></i>';
    }
    return star
}