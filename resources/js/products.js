import { Modal } from 'bootstrap'

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
                            <th>Actions</th>
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
                        <td>
                            <button class="btn btn-warning btn-sm edit-button" data-id="${product.id}">Edit</button>
                        </td>
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
    
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-button')) {
            const productId = event.target.getAttribute('data-id');
            try {
                const response = await fetch(`/products/${productId}/edit`);
                const product = await response.json();
    
                openEditModal(product);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
    });

    document.getElementById('save-changes').addEventListener('click', async () => {
        const productId = document.getElementById('edit-id').value;
        const updatedData = {
            name: document.getElementById('edit-name').value,
            quantity_in_stock: document.getElementById('edit-quantity').value,
            price_per_item: document.getElementById('edit-price').value,
        };
    
        try {

            const response = await fetch(`/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(updatedData),
                
            });
    
            if (response.ok) {
                const editModal = Modal.getInstance(document.getElementById('editModal'));
                editModal.hide();
                fetchProducts();
            } else {
                const data = await response.json();
                console.log(data);
                const flashMessages = document.getElementById('flash-messages');
                flashMessages.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${data.message || 'An error occurred while saving the product.'}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    });

    if (window.location.pathname === '/products')
        fetchProducts();

    function openEditModal(product) {
        document.getElementById('edit-id').value = product.id;
        document.getElementById('edit-name').value = product.name;
        document.getElementById('edit-quantity').value = product.quantity_in_stock;
        document.getElementById('edit-price').value = product.price_per_item;
    
        const editModal = new Modal(document.getElementById('editModal'));
        editModal.show();
    }
});
