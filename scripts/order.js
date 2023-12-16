import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { cart } from "../data/cart.js";

export function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrdersFromStorage() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
        return JSON.parse(storedOrders);
    }
    return [];
}
export let orders = loadOrdersFromStorage();





let orderSummaryHTML = '';

console.log(orders);

function loadOrdersPage() {



//console.log(orderSummaryHTML);

const today = dayjs();
const date = today.format('ddd, MMM D, YYYY');

orders.forEach((orderItem) => {
    
    const deliveryOptionId = orderItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    //console.log(orderSummaryHTML);
    
        const productId = orderItem.productId;
        const matchingProduct = getProduct(productId);

        orderSummaryHTML += `
        <div class="order-container">
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

        </div>
    
        <div class="product-actions">
         
            <!--<button class="track-package-button button-secondary">
              Track package
            </button>-->
        </div>
      </div>
    </div>
        `;

        document.querySelector('.js-myorders').innerHTML = orderSummaryHTML;
        console.log(orderSummaryHTML);
      });
}




document.addEventListener('DOMContentLoaded', () => {

  var cartCountinOrder = cart.length;
 // var myOrdersElement = document.querySelector('.js-myorders');
  var cartQuantityElement = document.querySelector('.cartQuantityinOrders');

  if (/*myOrdersElement && */cartQuantityElement) {
     // myOrdersElement.innerHTML = orderSummaryHTML;
      cartQuantityElement.innerHTML = cartCountinOrder;

      document.querySelector('.deleteHistory').addEventListener('click', () => {
          deleteOrderHistory();
      });

      document.querySelector('.gotohome').addEventListener('click', () => {
          window.open('index.html', '_self');
      });
  } else {
      console.error('One or both of the elements not found.');
  }
});



function deleteOrderHistory() {
  localStorage.removeItem('orders');
  window.location.reload();
}

if (window.location.pathname.includes("orders.html" || "orders")) {

  loadOrdersPage();

}

