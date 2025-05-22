<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

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
            'shipment' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'image' => [
                'nullable',
                'mimes:jpg,jpeg,png,webp',
                File::image()->max(2048) // 2MB
            ],
            'sku' => 'nullable|string|max:255|unique:products,sku',
            'barcode' => 'nullable|string|max:255|unique:products,barcode',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'is_feature' => 'required|boolean',
            'is_available' => 'required|boolean',
            'condition' => 'required|in:new,used,refurbished',
            'warranty_policy' => 'nullable|string|max:255',
            'show_condition' => 'required|boolean',
            'key_words' => 'nullable|string|max:255',
            // 'meta_title' => 'nullable|string|max:255',
            // 'meta_description' => 'nullable|string|max:255',
            // 'meta_keywords' => 'nullable|string|max:255',
            // 'meta_robots' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Por favor ingresa el nombre de la marca.',
            'name.string' => 'El nombre de la marca debe ser un texto válido.',
            'name.max' => 'El nombre de la marca no puede exceder los 255 caracteres.',
            'name.unique' => 'Ya existe una marca con ese nombre.',

            'logo.mimes' => 'El logo debe ser una imagen en formato JPG, JPEG, PNG o WEBP.',
            'logo.image' => 'El archivo seleccionado no es una imagen válida.',
            'logo.max' => 'El logo no puede superar 1MB de tamaño.',
        ];
    }
}
