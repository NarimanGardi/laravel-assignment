<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="edit-form">
                    @csrf
                    <input type="hidden" id="edit-id">
                    <div class="mb-3">
                        <label for="edit-name" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="edit-name">
                    </div>
                    <div class="mb-3">
                        <label for="edit-quantity" class="form-label">Quantity in Stock</label>
                        <input type="number" class="form-control" id="edit-quantity">
                    </div>
                    <div class="mb-3">
                        <label for="edit-price" class="form-label">Price per Item</label>
                        <input type="number" step="0.01" class="form-control" id="edit-price">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="save-changes">Save Changes</button>
            </div>
        </div>
    </div>
</div>
