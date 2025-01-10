<form action="{{ route('products.store') }}" method="POST" id="product-form">
    @csrf
    <div class="mb-3">
        <label for="name" class="form-label">Product Name</label>
        <input type="text" class="form-control" id="name" name="name" autofocus>
    </div>
    <div class="mb-3">
        <label for="quantity_in_stock" class="form-label">Quantity in Stock</label>
        <input type="number" class="form-control" id="quantity_in_stock" name="quantity_in_stock">
    </div>
    <div class="mb-3">
        <label for="price_per_item" class="form-label">Price per Item</label>
        <input type="number" step="0.01" class="form-control" id="price_per_item" name="price_per_item">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>