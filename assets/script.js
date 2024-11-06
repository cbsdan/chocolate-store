document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // function displaySwal(icon, title, text) {
    //     Swal.fire({
    //         icon: icon,
    //         title: title,
    //         text: text,
    //         showConfirmButton: false,
    //         timer: 2000
    //     });
    // }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let productInCart = cart.find(item => item.id === productId);

            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'The product has been added to your cart.',
                showConfirmButton: false,
                timer: 1000
            });
        });
    });

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const cartItemsContainer = document.querySelector('.cart-items');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCountElement = document.getElementById('itemCount');
            const itemSummaryCount = document.getElementById('itemSummaryCount');
            const itemsTotal = document.getElementById('itemsTotal');
            const shippingSelector = document.getElementById('shippingSelector');
            const totalCostElement = document.getElementById('totalCost');
            const grandTotalElement = document.getElementById('grandTotal');

            // Function to render cart items
            function renderCartItems() {
                if (cartItemsContainer) {
                    cartItemsContainer.innerHTML = ''; // Clear the container
                }
                let totalItems = 0;
                let itemsTotalCost = 0;
            
                cart.forEach(item => {
                    const product = products.find(p => p.id == item.id);
                    if (product) {
                        const totalPrice = product.price * item.quantity;
                        totalItems += 1;
                        itemsTotalCost += totalPrice;
                        const cartItemHTML = `
                            <div class="row mb-2 border-bottom">
                                <div class="col-5 d-flex align-items-center">
                                    <div style="height: 90px; width: 90px;" class="me-3">
                                        <img class="img-fluid" src="${product.image}" style="height: 100%; width: 100%; object-fit: cover;">
                                    </div>
            
                                    <div class="d-flex flex-column">
                                        <h6 class="overflow-hidden text-main" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</h6>
                                        <small class="p-0 m-0 text-warning remove-item" data-id="${product.id}" style="cursor: pointer;">Remove</small>
                                    </div>
                                </div>
                                <div class="col-3 d-flex align-items-center justify-content-center">
                                    <small class="fs-6 decrement" data-id="${product.id}" style="cursor: pointer;">-</small>
                                    <div class="fs-6 quantity" style="display: inline-block; width: 50px; text-align: center;">${item.quantity}</div>
                                    <small class="fs-6 increment" data-id="${product.id}" style="cursor: pointer;">+</small>
                                </div>
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <span class="price">₱${product.price}</span>
                                </div>
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <span class="total">₱${totalPrice}</span>
                                </div>
                            </div>`;
                        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
                    }
                });
            
                if (itemCountElement) {
                    itemCountElement.textContent = `${totalItems} items`;
                }
                if (itemSummaryCount) {
                    itemSummaryCount.textContent = totalItems;
                }
                if (itemsTotal) {
                    itemsTotal.textContent = itemsTotalCost.toFixed(2);
                }
            
                // Add event listeners for remove, increment, and decrement buttons
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', removeItemFromCart);
                });
            
                document.querySelectorAll('.increment').forEach(button => {
                    button.addEventListener('click', incrementQuantity);
                });
            
                document.querySelectorAll('.decrement').forEach(button => {
                    button.addEventListener('click', decrementQuantity);
                });
            
                // Safely update total costs
                updateTotalCost();
            }
            
            // Function to remove item from cart
            function removeItemFromCart() {
                const productId = this.getAttribute('data-id');
                const cartIndex = cart.findIndex(item => item.id == productId);
                if (cartIndex > -1) {
                    cart.splice(cartIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }

            // Function to increment quantity
            function incrementQuantity() {
                const productId = this.getAttribute('data-id');
                const cartItem = cart.find(item => item.id == productId);
                if (cartItem) {
                    cartItem.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }

            // Function to decrement quantity
            function decrementQuantity() {
                const productId = this.getAttribute('data-id');
                const cartItem = cart.find(item => item.id == productId);
                if (cartItem && cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }

            // Function to update total cost
            function updateTotalCost() {
                const itemsTotalCost = parseFloat(itemsTotal.textContent);
                const shippingCost = parseFloat(shippingSelector ? shippingSelector.value : 50);
                let totalCost = itemsTotalCost + shippingCost;

                if (totalCostElement) {
                    totalCostElement.textContent = totalCost.toFixed(2);
                }
                
                if (grandTotalElement) {
                    grandTotalElement.textContent = grandTotal.toFixed(2);
                }
                updateGrandTotal();

            }
            
            // Event listener for shipping selector
            if (shippingSelector)
            shippingSelector.addEventListener('change', updateTotalCost);

            function updateGrandTotal() {
                const itemsTotalCost = parseFloat(totalCostElement.textContent);
                const grandTotal = itemsTotalCost + shippingCost;
                if (grandTotalElement){
                    grandTotalElement.textContent = grandTotal.toFixed(2);
                }
            }

            // Initial render of cart items
            renderCartItems();
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Function to save transaction info to localStorage
    function saveTransactionInfo(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const contactNo = document.getElementById('contactNo').value;
        const address = document.getElementById('address').value;
        const totalCost = parseFloat(document.getElementById('totalCost').textContent);
        const shippingCost = parseFloat(document.getElementById('shippingCost').textContent);
        const grandTotal = totalCost + shippingCost;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const transactionInfo = {
            firstName,
            lastName,
            contactNo,
            address,
            totalCost,
            shippingCost,
            grandTotal,
            cart,
            date: new Date().toISOString()
        };

        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transactionInfo);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        localStorage.removeItem('cart');

        alert('Your order has been placed successfully!'    )
        // displaySwal('success', 'Order Placed', 'Your order has been placed successfully!')

        setTimeout(() => {
            window.location.href = 'orders.php'; 
        }, 2000);
    }

    // Attach event listener to the form
    const userInfoForm = document.getElementById('userInfoForm');
    if (userInfoForm) {
        userInfoForm.addEventListener('submit', saveTransactionInfo);
    }
});
