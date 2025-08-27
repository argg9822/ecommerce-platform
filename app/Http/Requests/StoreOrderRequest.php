<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'preference_id' => 'required|string|unique:orders,preference_id',
            'status' => 'required|string|in:pending,paid,processing,ready_to_ship,shipped,out_for_delivery,delivered,cancelled,refunded,failed',
            'payment_type' => 'required|string|in:mercado_pago,contra_entrega',
            
            // Validar productos
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.unit_price' => 'required|numeric|min:0',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.currency' => 'required|string|size:3',
            'products.*.variant_id' => 'nullable|exists:product_variants,id',

            // Validar información de entrega
            'delivery_info.address' => 'required|string|max:255',
            'delivery_info.city' => 'required|string|max:100',
            'delivery_info.province' => 'required|string|max:100',
            'delivery_info.apartment' => 'nullable|string|max:100',
            'delivery_info.phone' => 'required|string|max:20',
            'delivery_info.postalCode' => 'nullable|string|max:20',
            'delivery_info.deliveryType' => 'nullable|string|max:50',
            'delivery_info.deliveryNotes' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'preference_id.required' => 'El ID de preferencia es obligatorio.',
            'preference_id.unique' => 'Ya hay una transacción con este ID de preferencia.',
            'payment_type.in' => 'El tipo de pago debe ser Mercado pago o contraentrega',
            'payment_type.required' => 'El tipo de pago es obligatorio',
            'payment_type.string' => 'El tipo de pago debe ser un string',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser uno de los siguientes: pending, paid, processing, ready_to_ship, shipped, out_for_delivery, delivered, cancelled, refunded, failed.',
            'products.required' => 'Debe proporcionar al menos un producto.',
            'products.*.product_id.required' => 'El ID del producto es obligatorio.',
            'products.*.product_id.exists' => 'El producto proporcionado no existe.',
            'products.*.unit_price.required' => 'El precio unitario es obligatorio.',
            'products.*.unit_price.numeric' => 'El precio unitario debe ser un número.',
            'products.*.quantity.required' => 'La cantidad es obligatoria.',
            'products.*.quantity.integer' => 'La cantidad debe ser un número entero.',
            'products.*.quantity.min' => 'La cantidad debe ser al menos 1.',
            'products.*.currency.required' => 'La moneda es obligatoria.',
            'products.*.currency.size' => 'La moneda debe tener exactamente 3 caracteres.',
            'products.*.variant_id.exists' => 'La variante seleccionada no existe.',

            // Mensajes para la información de entrega
            'delivery_info.address.required' => 'La dirección es obligatoria.',
            'delivery_info.city.required' => 'La ciudad es obligatoria.',
            'delivery_info.province.required' => 'La provincia es obligatoria.',
            'delivery_info.phone.required' => 'El teléfono es obligatorio.',
            'delivery_info.address.max' => 'La dirección no puede exceder los 255 caracteres.',
            'delivery_info.city.max' => 'La ciudad no puede exceder los 100 caracteres.',
            'delivery_info.province.max' => 'La provincia no puede exceder los 100 caracteres.',
            'delivery_info.apartment.max' => 'El apartamento no puede exceder los 100 caracteres.',
            'delivery_info.phone.max' => 'El teléfono no puede exceder los 20 caracteres.',
            'delivery_info.postalCode.max' => 'El código postal no puede exceder los 20 caracteres.',
            'delivery_info.deliveryType.max' => 'El tipo de entrega no puede exceder los 50 caracteres.',
            'delivery_info.deliveryNotes.max' => 'Las notas de entrega no pueden exceder los 255 caracteres.',
        ];
    }
}
