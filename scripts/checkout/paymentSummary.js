import { cart,clearCart,saveOrders } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { orders } from "../order.js";

console.log(orders);

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

    /*console.log(productPriceCents);
    console.log(shippingPriceCents);
    console.log(totalBeforeTax);
    console.log(gstTax);
    console.log(totalBill);*/

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

      <button class="place-order-button button-primary">
        Place Order
      </button>

    `
    ;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}

document.addEventListener('DOMContentLoaded', () => {
  // Your code here, including the event listener
  document.querySelector('.place-order-button').addEventListener('click', () => {
      // Clear the cart and update the orders array
      orders.push(...cart);
      console.log(orders);
      saveOrders();
      clearCart();
      // Refresh the page or redirect to the order summary page
      window.open("orders.html",'_blank'); // You might want to replace this with a proper page redirection
  });
});
