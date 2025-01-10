<?php

namespace App\Http\Controllers;

use SimpleXMLElement;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\Product\StoreProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('pages.products.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();

        $product = Product::create($validatedData);

        $this->saveProductAsJson($product);
        $this->saveProductAsXml($product);

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        abort(404);
    }

    /**
     * Save the product data as a JSON file.
     */
    private function saveProductAsJson(Product $product)
    {
        $fileName = 'product_' . $product->id . '.json';

        $directory = storage_path('app/public/json');

        if (!is_dir($directory))
            mkdir($directory, 0755, true);

        $filePath = $directory . '/' . $fileName;

        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'quantity_in_stock' => $product->quantity_in_stock,
            'price_per_item' => $product->price_per_item,
        ];

        file_put_contents($filePath, json_encode($productData, JSON_PRETTY_PRINT));
    }

    /**
     * Save the product data as an XML file.
     */
    private function saveProductAsXml(Product $product)
    {
        $fileName = 'product-' . $product->id . '.xml';

        $directory = storage_path('app/public/xml');

        if (!is_dir($directory))
            mkdir($directory, 0755, true);

        $filePath = $directory . '/' . $fileName;

        $productXml = new SimpleXMLElement('<product/>');

        $productXml->addChild('id', $product->id);
        $productXml->addChild('name', $product->name);
        $productXml->addChild('quantity_in_stock', $product->quantity_in_stock);
        $productXml->addChild('price_per_item', $product->price_per_item);

        $productXml->asXML($filePath);
    }
}
