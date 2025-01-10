document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');

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

                // TODO: Fetch products again to update the list

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
});
