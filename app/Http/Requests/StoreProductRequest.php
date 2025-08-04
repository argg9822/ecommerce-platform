<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

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
            // Campos básicos
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
            'relevance' => [
                'nullable',
                'integer',
                'between:0,5',  
                Rule::unique('products', 'relevance')->where(function ($query) {
                    return $query->whereBetween('relevance', [1, 5]);
                }),
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
            'new_images' => 'required|array|min:1',
            'new_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            
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
        ];
    }

    public function messages(): array
    {
        return [
            // Generales
            'name.required' => 'El nombre del producto es obligatorio. Por favor, ingresa un nombre descriptivo.',
            'name.unique' => 'Este nombre de producto ya existe. Por favor, elige uno diferente.',
            'description.max' => 'La descripción no puede tener más de 1000 caracteres. Simplifica el texto o divide la información en características.',
            'price.required' => 'Debes establecer un precio para el producto.',
            'price.numeric' => 'El precio debe ser un valor numérico. No incluyas símbolos como $.',
            'price.min' => 'El precio no puede ser menor a cero. Ingresa un valor válido.',
            'stock.required' => 'Debes especificar la cantidad disponible en stock.',
            'stock.integer' => 'El stock debe ser un número entero (no decimal).',
            
            // Imágenes
            'new_images.required' => 'Debes subir al menos una imagen del producto.',
            'new_images.array' => 'El formato de las imágenes no es válido. Intenta subirlas nuevamente.',
            'new_images.min' => 'Se requiere mínimo una imagen para mostrar el producto.',
            'new_images.*.image' => 'Solo se permiten archivos de imagen (JPG, PNG, etc.). El archivo subido no es una imagen válida.',
            'new_images.*.mimes' => 'Formato de imagen no soportado. Usa JPG, JPEG, PNG o WEBP.',
            'new_images.*.max' => 'Cada imagen no debe superar los 2MB. Comprime la imagen antes de subirla.',
            
            // Categorías y marca
            'categories.required' => 'Selecciona al menos una categoría para clasificar el producto.',
            'categories.exists' => 'Una o más categorías seleccionadas no existen, debes añadirlas primero.',
            'brand_id.required' => 'Debes seleccionar una marca para el producto.',
            'brand_id.exists' => 'La marca seleccionada no es válida. Elige una de la lista o agrega una.',
            
            // Inventario
            'sku.unique' => 'Este SKU ya está registrado. Cada producto debe tener un SKU único.',
            'sku.max' => 'El SKU es demasiado largo (máximo 255 caracteres).',
            'barcode.unique' => 'Este código de barras ya está en uso. Verifica el número.',
            'barcode.max' => 'El código de barras excede el límite de 255 caracteres.',
            
            // Envío y garantía
            'shipment.numeric' => 'El costo de envío debe ser un valor numérico.',
            'shipment.min' => 'El costo de envío no puede ser negativo.',
            'warranty_policy.string' => 'La política de garantía debe ser un texto descriptivo.',
            'warranty_policy.max' => 'La política de garantía es demasiado larga (máx. 255 caracteres).',
            
            'is_feature.required' => 'Debes indicar si este producto es destacado.',
            'is_feature.boolean' => 'El campo "destacado" solo acepta Sí o No.',
            'is_available.required' => 'Debes especificar si el producto está disponible para venta.',
            'is_available.boolean' => 'El campo "disponible" solo acepta Sí o No.',
            'show_condition.required' => 'Debes indicar si mostrar la condición del producto o no.',
            'show_condition.boolean' => 'El campo "mostrar condición" solo acepta Sí o No.',
            
            // Condición
            'condition.required' => 'Selecciona el estado del producto (nuevo, usado, etc.).',
            'condition.in' => 'La condición seleccionada no es válida. Opciones: nuevo, usado o reacondicionado.',
            
            // Mensajes para SEO
            'meta_title.max' => 'El título para SEO es demasiado largo (máx. 255 caracteres).',
            'meta_description.max' => 'La descripción para SEO es demasiado larga (máx. 255 caracteres).',
            'key_words.max' => 'Las palabras clave no pueden exceder los 255 caracteres.',
            
            // Relevancia
            'relevance.integer' => 'La relevancia debe ser un número entero (1-5).',
            'relevance.between' => 'La relevancia debe estar entre 1 (mínimo) y 5 (máximo).',
            'relevance.unique' => 'Otro producto ya tiene este nivel de relevancia. Elige otro valor.',
            
            // Variantes
            'variants.required' => 'Debes definir al menos una variante del producto.',
            'variants.array' => 'El formato de las variantes no es válido.',
            'variants.*.price.numeric' => 'El precio de la variante debe ser numérico.',
            'variants.*.price.min' => 'El precio de la variante no puede ser negativo.',
            'variants.*.stock.integer' => 'El stock de la variante debe ser un número entero.',
            'variants.*.stock.min' => 'El stock de la variante no puede ser negativo.',
            'variants.*.variant_attributes.custom.*.name.required' => 'Cada atributo personalizado debe tener un nombre.',
            'variants.*.variant_attributes.custom.*.value.required' => 'Cada atributo personalizado debe tener un valor.',
            'variants.*.variant_attributes.colors.*.value.required' => 'Cada color debe tener un valor identificador.',
            
            // Campos adicionales
            'profit.numeric' => 'La ganancia debe ser un valor numérico.',
            'profit.min' => 'La ganancia no puede ser negativa.',
            'discount.numeric' => 'El descuento debe ser un porcentaje numérico.',
            'discount.between' => 'El descuento debe estar entre 0% y 100%.',
            'currency.required' => 'Debes seleccionar la moneda para los precios.',
            'currency.size' => 'La moneda debe especificarse con 3 caracteres (ej: COP, USD).'
        ];
    }
}
