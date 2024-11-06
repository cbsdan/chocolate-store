<div id="checkout" class="d-flex align-items-center justify-content-center py-5">
    <div class="checkout-container row w-100">
        <div class="col-6 row p-4 overflow-auto bg-light d-flex align-items-center flex-column justify-content-between">
            <div class="col-12">
                <div class="d-flex align-items-center justify-content-between border-bottom mb-4">
                    <h4 class="overflow-hidden">Checkout</h4>
                    <h4 class="overflow-hidden" id="itemCount">0 items</h4>
                </div>
                <div>
                    <div class="row mb-2">
                        <div class="col-5">PRODUCT DETAILS</div>
                        <div class="col-3 text-center">QUANTITY</div>
                        <div class="col-2 text-center">PRICE</div>
                        <div class="col-2 text-center">TOTAL</div>
                    </div>
                </div>
                <div class="cart-items">

                </div>
            </div>
        </div>
        <div class="col-6 p-4 bg-grey d-flex flex-column align-items-center justify-content-between">
            <form id="userInfoForm" class="w-100">
                <div class="d-flex align-items-center justify-content-start mb-4 border-bottom">
                    <h4 class="overflow-hidden">User Information</h4>
                </div>
                <div class="mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" required>
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" required>
                </div>
                <div class="mb-3">
                    <label for="contactNo" class="form-label">Contact Number</label>
                    <input type="text" class="form-control" id="contactNo" required>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <textarea class="form-control" id="address" rows="3" required></textarea>
                </div>
                <div class="d-flex align-items-center justify-content-between border-top py-4 mt-5 w-100">
                    <div>Total Cost</div>
                    <div>₱<span id="itemsTotal">0.00</span></div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <div>Shipping Cost</div>
                    <div>₱<span id="shippingCost">50.00</span></div>
                </div>
                <div class="d-flex align-items-center justify-content-between border-top py-4 mt-2 w-100">
                    <div>Grand Total</div>
                    <div>₱<span id="totalCost">0.00</span></div>
                </div>
                <button type="submit" class="mt-2 btn w-100 bg-c-main text-light">Place Order</button>
            </form>
        </div>
    </div>
</div>
