import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
             ${product.name}
          </div>

          <div class="product-rating-container">
          <p class="product-rating-stars">
              ${product.rating.stars.toFixed(1)+'★'}</p>
            <!--<img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">-->
            <div class="product-rating-count link-primary">
              ${'('+product.rating.count+' Ratings)'}
            </div>
          </div>

          <div class="product-price">
          ₹ ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <div class="cartlove">
          <button class="add-to-cart-button button-primary addToCart" data-product-id = "${product.id}">
            Add to Cart
          </button>
          <button class="heart">❤</button>
          </div>
        </div>`;
});

document.querySelector('.js-productsGrid').innerHTML = productsHTML;

export function updateCartQuantity() {
  
    let cartQuantity = 0;

    // Retrieve cart data from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];


    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })
    
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;

    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

    return cartQuantity;
}


document.querySelectorAll('.addToCart').forEach((button) => {
    button.addEventListener('click', () => {
        
        const productId = button.dataset.productId;
        showSnackbar();
        addToCart(productId);
        updateCartQuantity();

    });
});

// updates cart quantity on homepage load
updateCartQuantity();

function showSnackbar() {
  // when adding products to cart
  var snackbar = document.getElementById("snackbar");

  snackbar.style.display = "block";

  setTimeout(function(){
    snackbar.style.display = "none";
  }, 2000);
}

// username stuff
function getAndStoreUsername() {
  
  var storedUsername = localStorage.getItem('username');

  if (!storedUsername) {
    
    var username = prompt("Please set a username 😊 :");

    if (username) {
     
      localStorage.setItem('username', username);
     
    } else {
      alert("Please set a username first 😔. Refresh the page and try again.");
    }
  }
}

getAndStoreUsername();