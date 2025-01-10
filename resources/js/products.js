document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('product-table');
    const productForm = document.getElementById('product-form');

    const fetchProducts = async () => {
        try {
            const response = await fetch('/products/fetch');
            const products = await response.json();

            let totalValueSum = 0;

            let tableHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity in Stock</th>
                            <th>Price per Item</th>
                            <th>Datetime Submitted</th>
                            <th>Total Value</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            products.forEach((product) => {
                const totalValue = product.quantity_in_stock * product.price_per_item;
                totalValueSum += totalValue;

                const formattedDate = new Date(product.submitted_at).toLocaleString('en-US');

                tableHTML += `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity_in_stock}</td>
                        <td>${product.price_per_item.toFixed(2)}</td>
                        <td>${formattedDate}</td>
                        <td>${totalValue.toFixed(2)}</td>
                    </tr>
                `;
            });

            tableHTML += `
                    <tr class="fw-bold">
                        <td colspan="4" class="text-end">Total Value Sum</td>
                        <td>${totalValueSum.toFixed(2)}</td>
                    </tr>
            `;

            tableHTML += `
                    </tbody>
                </table>
            `;

            tableContainer.innerHTML = tableHTML;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(productForm);
        
        try {
            const response = await fetch(productForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            if (response.ok) {
                const data = await response.json();
    
                productForm.reset();

                const flashMessages = document.getElementById('flash-messages');
                flashMessages.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${data.success || 'Product added successfully.'}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

                fetchProducts();
            } else {
                const data = await response.json();
                const flashMessages = document.getElementById('flash-messages');
                flashMessages.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${data.message || 'An error occurred while submitting the form.'}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    });

    if (window.location.pathname === '/products')
        fetchProducts();
});
