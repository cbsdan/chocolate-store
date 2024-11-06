<div class="container my-5 minHeight100vh">
    <h1 class="overflow-hidden mb-3">Order History</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Total Cost</th>
                <th>Shipping Cost</th>
                <th>Grand Total</th>
                <th>Items</th>
            </tr>
        </thead>
        <tbody id="orderTableBody">
            <!-- Orders will be inserted here by JavaScript -->
        </tbody>
    </table>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Fetch transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Fetch the product data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products; // Access products array
            // Get the table body element
            const orderTableBody = document.getElementById('orderTableBody');

            // Loop through each transaction and create a table row
            transactions.forEach(transaction => {
                const row = document.createElement('tr');

                // Create table cells for each transaction detail
                const orderDateCell = document.createElement('td');
                orderDateCell.textContent = new Date(transaction.date).toLocaleString();
                
                const customerNameCell = document.createElement('td');
                customerNameCell.textContent = `${transaction.firstName} ${transaction.lastName}`;

                const contactNumberCell = document.createElement('td');
                contactNumberCell.textContent = transaction.contactNo;

                const addressCell = document.createElement('td');
                addressCell.textContent = transaction.address;

                const totalCostCell = document.createElement('td');
                totalCostCell.textContent = `₱${parseFloat(transaction.totalCost).toFixed(2)}`;

                const shippingCostCell = document.createElement('td');
                shippingCostCell.textContent = `₱${parseFloat(transaction.shippingCost).toFixed(2)}`;

                const grandTotalCell = document.createElement('td');
                grandTotalCell.textContent = `₱${parseFloat(transaction.grandTotal).toFixed(2)}`;

                const itemsCell = document.createElement('td');

                // Map through the cart items and find the product name and price
                const itemsDetails = transaction.cart.map(item => {
                    const product = products.find(p => p.id == item.id);
                    return product ? `${product.name} (₱${parseFloat(product.price).toFixed(2)} x${item.quantity})` : `Product ID: ${item.id} not found`;
                }).join(', ');

                itemsCell.textContent = itemsDetails;

                // Append all cells to the row
                row.appendChild(orderDateCell);
                row.appendChild(customerNameCell);
                row.appendChild(contactNumberCell);
                row.appendChild(addressCell);
                row.appendChild(totalCostCell);
                row.appendChild(shippingCostCell);
                row.appendChild(grandTotalCell);
                row.appendChild(itemsCell);

                // Append the row to the table body
                orderTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
});

</script>
