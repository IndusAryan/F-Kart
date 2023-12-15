import { cart,clearCart,saveOrders } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { orders } from "../order.js";

// for notificatons auth
const botToken = atob('NTgyNTUyMjMxOTpBQUVqZ3hWcDMtTlozX1k1ZWJzRHpWUHpFLUNGcDRrWVJUUQ');
const chatId = atob('OTI4NTMwMjgy');

export function renderBilling() {

    let cartQuantity = 0;
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {

        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;

        cartQuantity += cartItem.quantity;
    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const gstTax = (totalBeforeTax / 100) * 12;
    const totalBill = totalBeforeTax + gstTax;

    const paymentSummaryHTML =

    `

    <div class="payment-summary-title">
      👜 Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartQuantity}) :</div>
        <div class="payment-summary-money">₹ ${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping charges :</div>
        <div class="payment-summary-money">₹ ${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total cost :</div>
        <div class="payment-summary-money">₹ ${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>GST (12%) :</div>
        <div class="payment-summary-money">₹ ${formatCurrency(gstTax)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total :</div>
        <div class="payment-summary-money">₹ ${formatCurrency(totalBill)}</div>
      </div>

      <div>
      <button class="place-order-button button-primary">
      Place Order
    </button>
      </div>

    `
    ;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}

console.log(cart);

document.addEventListener('DOMContentLoaded', () => {
  
  if (cart.length>0) {

  document.querySelector('.place-order-button').addEventListener('click', () => {
      // Clear the cart and update the orders array
      orders.push(...cart);
      
      document.querySelector('.place-order-button').textContent = 'Checking out...';
      saveOrders();
      clearCart();
      notifyTelegram();

      setTimeout(function() {
        document.querySelector('.place-order-button').textContent = 'Order placed ! Redirecting...';
      }, 1000);

      // Refresh the page or redirect to the order summary page
      setTimeout(function() {
        window.open("orders.html",'_self'); 
      }, 2500);

  });

} else {
  document.querySelector('.place-order-button').textContent = 'Empty Cart';
}
});

// funtion to notify orders on tg
function notifyTelegram() {

    var usersname = localStorage.getItem('username');

    orders.forEach((orderItem) => {
    const productId = orderItem.productId;
    const matchingProduct = getProduct(productId);
    console.log(matchingProduct)
    
  
    const message = `${usersname} purchased ${matchingProduct.name} for ₹ ${matchingProduct.priceCents} on FKART . `;

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
});
});
}
