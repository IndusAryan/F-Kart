import { cart } from "./cart.js";

export function renderCheckoutCount() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    });
  
    const checkoutHeaderHTML = `
    <div class="checkout-header">
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="index.html">
          <img class="fkart-logo" src="images/flipkart-logo-svgrepo-com(1).svg">
          <img class="fkart-mobile-logo" src="images/flipkart-logo-svgrepo-com(2).svg">
        </a>
      </div>
  
      <div class="checkout-header-middle-section">
        Checkout -<p class="return-to-home-link">${cartQuantity + ' items'}</p>
      </div>
  
      <div class="checkout-header-right-section">
        <p>👜</p>
      </div>
    </div>
    `;
  
    document.querySelector('.js-checkout-header')
      .innerHTML = checkoutHeaderHTML;
  }