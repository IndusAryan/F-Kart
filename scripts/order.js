
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "../data/cart.js";


export let orders = loadOrdersFromStorage();

function loadOrdersFromStorage() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
        return JSON.parse(storedOrders);
    }
    return [];
}


//console.log(orders);
let orderSummaryHTML = '';

if (window.location.pathname.includes("orders.html")) {
// Create a dictionary to group orders by the order date
const ordersByDate = {};
const today = dayjs();
const date = today.format('ddd, MMM D, YYYY');

/*const botToken = '5825522319:AAEjgxVp3-NZ3_Y5ebsDzVPzE-CFp4kYRTQ';
const chatId = '928530282';*/



orders.forEach((orderItem) => {
    const productId = orderItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = orderItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Check if ordersByDate[dateString] exists, if not create an empty array
    if (!ordersByDate[dateString]) {
        ordersByDate[dateString] = [];
    }

    // Add the current orderItem to the array for the specific date
    ordersByDate[dateString].push(orderItem);

/** TELEGRAM RESPONSE **/
    /*const message = `Name - ${matchingProduct.name} - ₹ ${matchingProduct.priceCents}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          chat_id: chatId,
          text: message,
      }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Message sent successfully:', data);
  })
  .catch(error => {
      console.error('Error sending message:', error);
  });*/
  
    //console.log(matchingProduct.name,matchingProduct.priceCents);

});

// Iterate through orders grouped by date
Object.keys(ordersByDate).forEach((dateString) => {
    orderSummaryHTML += '<div class="order-container">';

    // Iterate through orders for the specific date
    ordersByDate[dateString].forEach((orderItem) => {
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
    });

    orderSummaryHTML += '</div>';
    
});
}


document.addEventListener('DOMContentLoaded', () => {
  

    var cartCountinOrder = cart.length;
    document.querySelector('.js-myorders').innerHTML = orderSummaryHTML;
    document.querySelector('.cartQuantityinOrders').innerHTML = cartCountinOrder;

   document.querySelector('.deleteHistory').addEventListener('click',() => {
    deleteOrderHistory();
   });
      
   document.querySelector('.gotohome').addEventListener('click',() => {
    window.open('index.html','_self')
   });
  
});

function deleteOrderHistory() {
  localStorage.removeItem('orders');
  window.location.reload();
}



