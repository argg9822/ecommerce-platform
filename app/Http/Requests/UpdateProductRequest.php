<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            $newImages = $this->file('new_images', []);
            $dropImages = $this->input('drop_images', []);
            $currentImages = $this->input('current_images', []);

            $remainingImages = array_diff($currentImages, $dropImages);

            if (count($newImages) === 0 && count($remainingImages) === 0) {
                $validator->errors()->add('new_images', 'Debes subir al menos una imagen si eliminaste todas las actuales.');
            }
        });
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required', 
                'string',
                'max:255',
                Rule::unique('products', 'name')->ignore($this->route('id'))
            ],
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'cost' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'sku' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'sku')->ignore($this->route('id'))
            ],
            'barcode' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'barcode')->ignore($this->route('id'))
            ],
            'is_feature' => 'required|boolean',
            'is_available' => 'required|boolean',
            'relevance' => [
                'nullable',
                'integer',
                'between:0,5',  
                Rule::unique('products', 'relevance')->where(function ($query) {
                    return $query->whereBetween('relevance', [1, 5]);
                })->ignore($this->route('id')),
            ],
            'brand_id' => 'required|exists:brands,id',
            'shipment' => 'nullable|numeric|min:0',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'key_words' => 'nullable|string|max:255',
            'condition' => 'required|in:new,used,refurbished',
            'show_condition' => 'required|boolean',
            'warranty_policy' => 'nullable|string|max:255',
            'disponibility_text' => 'nullable|string|max:255',
            'profit' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'currency' => 'required|string|size:3',

            // Relaciones
            'categories' => 'required|array|exists:categories,id',
            
            // Imágenes
            'new_images' => 'nullable|array',
            'new_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            'drop_images' => 'nullable|array',
            'drop_images.*' => 'integer|exists:product_images,id',

            // Variantes
            'variants' => 'required|array',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.currency_price' => 'required|string|size:3',
            'variants.*.compare_price' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'nullable|integer|min:0',
            'variants.*.shipment' => 'nullable|numeric|min:0',
            'variants.*.is_available' => 'required|boolean',

            // Atributos de variantes
            'variants.*.variant_attributes.custom' => 'nullable|array',
            'variants.*.variant_attributes.custom.*.name' => 'required|string|max:255',
            'variants.*.variant_attributes.custom.*.value' => 'required|string|max:255',
            
            'variants.*.variant_attributes.dimensions' => 'nullable|array',
            'variants.*.variant_attributes.dimensions.length' => 'nullable|array',
            'variants.*.variant_attributes.dimensions.length.value' => 'required_with:variants.*.variant_attributes.dimensions.length|numeric|min:0',
            'variants.*.variant_attributes.dimensions.length.unit' => 'required_with:variants.*.variant_attributes.dimensions.length|string|max:10',
            'variants.*.variant_attributes.dimensions.width' => 'nullable|array',
            'variants.*.variant_attributes.dimensions.width.value' => 'required_with:variants.*.variant_attributes.dimensions.width|numeric|min:0',
            'variants.*.variant_attributes.dimensions.width.unit' => 'required_with:variants.*.variant_attributes.dimensions.width|string|max:10',
            'variants.*.variant_attributes.dimensions.height' => 'nullable|array',
            'variants.*.variant_attributes.dimensions.height.value' => 'required_with:variants.*.variant_attributes.dimensions.height|numeric|min:0',
            'variants.*.variant_attributes.dimensions.height.unit' => 'required_with:variants.*.variant_attributes.dimensions.height|string|max:10',
            'variants.*.variant_attributes.dimensions.weight' => 'nullable|array',
            'variants.*.variant_attributes.dimensions.weight.value' => 'required_with:variants.*.variant_attributes.dimensions.weight|numeric|min:0',
            'variants.*.variant_attributes.dimensions.weight.unit' => 'required_with:variants.*.variant_attributes.dimensions.weight|string|max:10',
            
            'variants.*.variant_attributes.colors' => 'nullable|array',
            'variants.*.variant_attributes.colors.*.value' => 'required|string|max:50',
            'variants.*.variant_attributes.colors.*.color' => 'required|string|max:50',
            'variants.*.variant_attributes.colors.*.selected' => 'required|boolean',

            // Campos adicionales
            'profit.numeric' => 'La ganancia debe ser un valor numérico.',
            'profit.min' => 'La ganancia no puede ser negativa.',
            'discount.numeric' => 'El descuento debe ser un porcentaje numérico.',
            'discount.between' => 'El descuento debe estar entre 0% y 100%.',
            'currency.required' => 'Debes seleccionar la moneda para los precios.',
            'currency.size' => 'La moneda debe especificarse con 3 caracteres (ej: COP, USD).'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del producto es obligatorio.',
            'name.unique' => 'Ya existe un producto con este nombre.',
            'description.max' => 'La descripción no puede exceder los 1000 caracteres.',
            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un valor numérico.',
            'compare_price.numeric' => 'El precio de comparación debe ser un valor numérico.',
            'cost.required' => 'El costo es obligatorio.',
            'stock.required' => 'El stock es obligatorio.',
            'sku.unique' => 'Ya existe un producto con este SKU.',
            'barcode.unique' => 'Ya existe un producto con este código de barras.',
            'is_feature.required' => 'Debes indicar si el producto es destacado.',
            'is_available.required' => 'Debes indicar si el producto está disponible.',
            'relevance.between' => 'La relevancia debe estar entre 1 y 5.',
            'brand_id.required' =>  'La marca es obligatoria.',
            'brand_id.exists' => 'La marca seleccionada no es válida.',
            'shipment.numeric' => 'El costo de envío debe ser un valor numérico.',
            'meta_title.max' => 'El título meta no puede exceder los 255 caracteres.',
            'meta_description.max' => 'La descripción meta no puede exceder los 255 caracteres.',
            'key_words.max' => 'Las palabras clave no pueden exceder los 255 caracteres.',
            'condition.required' => 'Debes seleccionar una condición para el producto.',
            'show_condition.required' => 'Debes indicar si se debe mostrar la condición del producto.',
            'warranty_policy.max' => 'La política de garantía no puede exceder los 255 caracteres.',
            'disponibility_text.max' => 'El texto de disponibilidad no puede exceder los 255 caracteres.',
            'profit.numeric' => 'La ganancia debe ser un valor numérico.',
            'profit.min' => 'La ganancia no puede ser negativa.',
            'discount.numeric' => 'El descuento debe ser un porcentaje numérico.',
            'discount.between' => 'El descuento debe estar entre 0% y 100%.',
            'currency.required' => 'Debes seleccionar la moneda para los precios.',
            'currency.size' => 'La moneda debe especificarse con 3 caracteres (ej: COP, USD).',
            'categories.required' => 'Debes seleccionar al menos una categoría.',
            'categories.exists' => 'Una o más categorías seleccionadas no son válidas.',
            'new_images.array' => 'Las nuevas imágenes deben ser un arreglo.',
            'new_images.*.image' => 'Cada nueva imagen debe ser un archivo de imagen válido.',
            'new_images.*.mimes' => 'Las nuevas imágenes deben ser de tipo jpg, jpeg, png o webp.',
            'new_images.*.max' => 'Cada nueva imagen no puede exceder los 2MB.',
            'drop_images.array' => 'Las imágenes a eliminar deben ser un arreglo.',
            'drop_images.*.integer' => 'Cada imagen a eliminar debe ser un ID válido.',
            'drop_images.*.exists' => 'Una o más imágenes a eliminar no son válidas.',
            'variants.required' => 'Debes definir al menos una variante del producto.',
            'variants.*.price.numeric' => 'El precio de la variante debe ser un valor numérico.',
            'variants.*.currency_price.required' => 'La moneda del precio de la variante es obligatoria.',
            'variants.*.currency_price.size' => 'La moneda del precio de la variante debe especificarse con 3 caracteres (ej: COP, USD).',
            'variants.*.compare_price.numeric' => 'El precio de comparación de la variante debe ser un valor numérico.',
            'variants.*.stock.integer' => 'El stock de la variante debe ser un número entero.',
            'variants.*.is_available.required' => 'Debes indicar si la variante está disponible.',
            // Validaciones para atributos de variantes
            'variants.*.variant_attributes.custom.array' => 'Los atributos personalizados de la variante deben ser un arreglo.',
            'variants.*.variant_attributes.custom.*.name.required' => 'El nombre del atributo personalizado es obligatorio.',
            'variants.*.variant_attributes.custom.*.name.max' => 'El nombre del atributo personalizado no puede exceder los 255 caracteres.',
            'variants.*.variant_attributes.custom.*.value.required' => 'El valor del atributo personalizado es obligatorio.',
            'variants.*.variant_attributes.custom.*.value.max' => 'El valor del atributo personalizado no puede exceder los 255 caracteres.',
            'variants.*.variant_attributes.dimensions.array' => 'Las dimensiones de la variante deben ser un arreglo.',
            'variants.*.variant_attributes.dimensions.length.array' => 'La longitud debe ser un arreglo.',
            'variants.*.variant_attributes.dimensions.length.value.required_with' => 'La longitud es obligatoria si se especifica.',
            'variants.*.variant_attributes.dimensions.length.value.numeric' => 'La longitud debe ser un valor numérico.',
            'variants.*.variant_attributes.dimensions.length.unit.required_with' => 'La unidad de longitud es obligatoria si se especifica.',
            'variants.*.variant_attributes.dimensions.length.unit.max' => 'La unidad de longitud no puede exceder los 10 caracteres.',
            'variants.*.variant_attributes.dimensions.width.array' => 'El ancho debe ser un arreglo.',
            'variants.*.variant_attributes.dimensions.width.value.required_with' => 'El ancho es obligatorio si se especifica.',
            'variants.*.variant_attributes.dimensions.width.value.numeric' => 'El ancho debe ser un valor numérico.',
            'variants.*.variant_attributes.dimensions.width.unit.required_with' => 'La unidad de ancho es obligatoria si se especifica.',
            'variants.*.variant_attributes.dimensions.width.unit.max' => 'La unidad de ancho no puede exceder los 10 caracteres.',
            'variants.*.variant_attributes.dimensions.height.array' => 'La altura debe ser un arreglo.',
            'variants.*.variant_attributes.dimensions.height.value.required_with' => 'La altura es obligatoria si se especifica.',
            'variants.*.variant_attributes.dimensions.height.value.numeric' => 'La altura debe ser un valor numérico.',
            'variants.*.variant_attributes.dimensions.height.unit.required_with' => 'La unidad de altura es obligatoria si se especifica.',
            'variants.*.variant_attributes.dimensions.height.unit.max' => 'La unidad de altura no puede exceder los 10 caracteres.',
            'variants.*.variant_attributes.dimensions.weight.array' => 'El peso debe ser un arreglo.',
            'variants.*.variant_attributes.dimensions.weight.value.required_with' => 'El peso es obligatorio si se especifica.',
            'variants.*.variant_attributes.dimensions.weight.value.numeric' => 'El peso debe ser un valor numérico.',
            'variants.*.variant_attributes.dimensions.weight.unit.required_with' => 'La unidad de peso es obligatoria si se especifica.',
            'variants.*.variant_attributes.dimensions.weight.unit.max' => 'La unidad de peso no puede exceder los 10 caracteres.',
            'variants.*.variant_attributes.colors.array' => 'Los colores de la variante deben ser un arreglo.',
            'variants.*.variant_attributes.colors.*.value.required' => 'El valor del color es obligatorio.',
            'variants.*.variant_attributes.colors.*.value.max' => 'El valor del color no puede exceder los 50 caracteres.',
            'variants.*.variant_attributes.colors.*.color.required' => 'El nombre del color es obligatorio.',
            'variants.*.variant_attributes.colors.*.color.max' => 'El nombre del color no puede exceder los 50 caracteres.',
            'variants.*.variant_attributes.colors.*.selected.required' => 'Debes indicar si el color está seleccionado.'
        ];
    }
}
