export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) { cart = [] }
    /*cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}*/

checkoutItemCount();

export function checkoutItemCount () {

    if (cart.length > 0) {

        var totalItems = cart.length;
    
        //console.log(totalItems);
    
        // Check if the element exists before manipulating it
        var returnToHomeLink = document.querySelector('.return-to-home-link');
        if (returnToHomeLink !== null) {
            returnToHomeLink.innerHTML = totalItems + ' Products';
        }
    }
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {

    let sameItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            sameItem = cartItem;
        }
    });

    if (sameItem) {
        sameItem.quantity += 1;
    }
    else {

        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {

    const newCart = [];

    cart.forEach((cartItem)=>{
        if (cartItem.productId !== productId) {

            newCart.push(cartItem);
            
        }
    });

    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {

    let sameItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            sameItem = cartItem;
        }
    });

    sameItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
   
}

export function clearCart() {
    cart = [];
    saveToStorage();
}

