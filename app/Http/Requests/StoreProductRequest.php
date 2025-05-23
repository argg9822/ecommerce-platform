<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:products,name',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'cost' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku',
            'barcode' => 'nullable|string|max:255|unique:products,barcode',
            'is_feature' => 'required|boolean',
            'is_available' => 'required|boolean',
            'relevance' => 'nullable|integer|min:0|max:5',
            'brand_id' => 'exists:brands,id',
            'shipment' => 'nullable|numeric|min:0',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'key_words' => 'nullable|string|max:255',
            'condition' => 'required|in:new,used,refurbished',
            'show_condition' => 'required|boolean',
            'warranty_policy' => 'nullable|string|max:255',
            'disponibility_text' => 'nullable|string|max:255',

            'categories' => 'required|array|exists:categories,id',
            'features' => 'nullable|array',
            'features.*.name' => 'required|string|max:255',
            'features.*.value' => 'required|string|max:255',
            'product_images' => 'nullable|array',
            'product_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            // 'meta_robots' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del producto es obligatorio.',
            'name.unique' => 'El nombre del producto ya está en uso.',
            'description.max' => 'La descripción no puede exceder los 1000 caracteres.',
            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.min' => 'El precio no puede ser negativo.',
            'stock.required' => 'El stock es obligatorio.',
            'stock.integer' => 'El stock debe ser un número entero.',
            'category_id.required' => 'La categoría es obligatoria.',
            'category_id.exists' => 'La categoría seleccionada no es válida.',
            'brand_id.required' => 'La marca es obligatoria.',
            'brand_id.exists' => 'La marca seleccionada no es válida.',
            'sku.unique' => 'El SKU ya está en uso.',
            'sku.max' => 'El SKU no puede exceder los 255 caracteres.',
            'barcode.unique' => 'El código de barras ya está en uso.',
            'barcode.max' => 'El código de barras no puede exceder los 255 caracteres.',
            'features.array' => 'Las características deben ser un arreglo.',
            'features.*.name.required' => 'El nombre de la característica es obligatorio.',
            'features.*.name.max' => 'El nombre de la característica no puede exceder los 255 caracteres.',
            'features.*.value.required' => 'El valor de la característica es obligatorio.',
            'features.*.value.max' => 'El valor de la característica no puede exceder los 255 caracteres.',
            'shipment.numeric' => 'El costo de envío debe ser un número.',
            'shipment.min' => 'El costo de envío no puede ser negativo.',
            'warranty_policy.string' => 'La política de garantía debe ser un texto.',
            'is_feature.required' => 'El campo destacado es obligatorio.',
            'is_feature.boolean' => 'El campo destacado debe ser verdadero o falso.',
            'is_available.required' => 'El campo disponibilidad es obligatorio.',
            'is_available.boolean' => 'El campo disponibilidad debe ser verdadero o falso.',
            'condition.required' => 'El campo condición es obligatorio.',
            'condition.in' => 'La condición seleccionada no es válida.',
            'product_images.array' => 'Las imágenes del producto deben ser un arreglo.',
            'product_images.*.image' => 'Cada imagen debe ser un archivo de imagen.',
            'product_images.*.mimes' => 'Las imágenes deben ser de tipo jpg, jpeg, png o webp.',
            'product_images.*.max' => 'Cada imagen no puede exceder los 2MB.',
            'warranty_policy.max' => 'La política de garantía no puede exceder los 255 caracteres.',
            'show_condition.required' => 'El campo mostrar condición es obligatorio.',
            'show_condition.boolean' => 'El campo mostrar condición debe ser verdadero o falso.',
            'key_words.max' => 'Las palabras clave no pueden exceder los 255 caracteres.',
            'relevance.integer' => 'La relevancia debe ser un número entero.',
            'relevance.min' => 'La relevancia no puede ser negativa.',
            'relevance.max' => 'La relevancia no puede ser mayor a 5.',
            'disponibility_text.max' => 'El texto de disponibilidad no puede exceder los 255 caracteres.',
            'meta_title.max' => 'El título meta no puede exceder los 255 caracteres.',
            'meta_description.max' => 'La descripción meta no puede exceder los 255 caracteres.',
            // 'meta_robots.max' => 'El campo meta robots no puede exceder los 255 caracteres.',
            // 'meta_robots.in' => 'El campo meta robots debe ser noindex, nofollow o index, follow.',
        ];
    }
}
