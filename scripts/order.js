
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "../data/cart.js";

function loadOrdersFromStorage() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
        return JSON.parse(storedOrders);
    }
    return [];
}

/*document.addEventListener('DOMContentLoaded', () => {
  // Your code here, including the line with document.querySelector
  var cartCountinOrder = cart.length;
  document.querySelector('.cartQuantityinOrders').innerHTML = cartCountinOrder;
});*/

export let orders = loadOrdersFromStorage();
console.log(orders);
let orderSummaryHTML = '';

orders.forEach((orderItem) => {
    const productId = orderItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = orderItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const date = today.format('ddd, MMM D, YYYY');
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    
    console.log('ProductId:', productId);
    console.log('MatchingProduct:', matchingProduct);
    orderSummaryHTML += `
    <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${date}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Price :</div>
        <div>₹ ${matchingProduct.priceCents}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Product ID:</div>
      <div>${productId}</div>
    </div>
  </div>

  <div class="order-details-grid">
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dateString}
      </div>
      <div class="product-quantity">
        Quantity: 1
      </div>
      
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>

  </div>
</div>
    `;
   
});

document.addEventListener('DOMContentLoaded', () => {
    // Your code here, including the line with document.querySelector
    var cartCountinOrder = cart.length;
    document.querySelector('.js-myorders').innerHTML = orderSummaryHTML;
    document.querySelector('.cartQuantityinOrders').innerHTML = cartCountinOrder;
});




