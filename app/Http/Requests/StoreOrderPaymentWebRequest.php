<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderPaymentWebRequest extends FormRequest
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
            'status' => 'required|string',
            'order_id' => 'string|exists:orders,id',
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'status.required' => 'El estado del pago es obligatorio.',
            'status.string' => 'El estado del pago debe ser una cadena de texto.',
            'order_id.string' => 'El ID de la orden debe ser una cadena de texto.',
            'order_id.exists' => 'La orden especificada no existe.',
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric' => 'El monto debe ser un número.',
            'payment_method.required' => 'El método de pago es obligatorio.',
            'payment_method.string' => 'El método de pago debe ser una cadena de texto.',
        ];
    }
}
