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
            // 'user_id' => 'required|exists:users,id',
            // 'number' => 'required|string|max:255',
            // 'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
            'product_id' => 'required|exists:products,id',
            'total' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.unit_price' => 'required|numeric|min:0',
            'shipping_address' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            // 'user_id.required' => 'El Id del usuario es obligatorio.',
            // 'user_id.exists' => 'El usuario especificado no existe.',
            // 'number.required' => 'El número de la orden es obligatorio.',
            // 'number.string' => 'El número de la orden debe ser una cadena de texto.',
            // 'number.max' => 'El número de la orden no puede exceder los 255 caracteres.',
            // 'status.required' => 'El estado de la orden es obligatorio.',
            // 'status.string' => 'El estado de la orden debe ser una cadena de texto.',
            // 'status.in' => 'El estado de la orden debe ser uno de los siguientes: pending, processing, shipped, delivered, cancelled.',
            'total.required' => 'El total de la orden es obligatorio.',
            'total.numeric' => 'El total de la orden debe ser un número.',
            'total.min' => 'El total de la orden no puede ser negativo.',
            'notes.string' => 'Las notas deben ser una cadena de texto.',
            'notes.max' => 'Las notas no pueden exceder los 1000 caracteres.',
            'order_items.required' => 'Los artículos de la orden son obligatorios.',
            'order_items.array' => 'Los artículos de la orden deben ser un arreglo.',
            'order_items.*.product_id.required' => 'El ID del producto es obligatorio en cada artículo de la orden.',
            'order_items.*.product_id.exists' => 'El producto especificado no existe en cada artículo de la orden.',
            'order_items.*.quantity.required' => 'La cantidad es obligatoria en cada artículo de la orden.',
            'order_items.*.quantity.integer' => 'La cantidad debe ser un número entero en cada artículo de la orden.',
            'order_items.*.quantity.min' => 'La cantidad debe ser al menos 1 en cada artículo de la orden.',
            'order_items.*.price.required' => 'El precio es obligatorio en cada artículo de la orden.',
            'order_items.*.price.numeric' => 'El precio debe ser un número en cada artículo de la orden.',
            'order_items.*.price.min' => 'El precio no puede ser negativo en cada artículo de la orden.',
            'shipping_address.required' => 'La dirección de envío es obligatoria.',
            'shipping_address.string' => 'La dirección de envío debe ser una cadena de texto.',
            'shipping_address.max' => 'La dirección de envío no puede exceder 255 caracteres.',
        ];
    }
}
