<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderPaymentRequest extends FormRequest
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
            'transaction_id' => 'required|string|unique:order_payments,transaction_id',
            'status' => 'required|string',
            'order_id' => 'string|exists:orders,id',
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'preference_id' => 'required|string|unique:order_payments,preference_id'
        ];
    }

    public function messages()
    {
        return [
            'transaction_id.required' => 'El ID de la transacción es obligatorio.',
            'transaction_id.string' => 'El ID de la transacción debe ser una cadena de texto.',
            'transaction_id.unique' => 'Ya tienes una transacción con este ID de transacción.',
            'status.required' => 'El estado es obligatorio.',
            'status.string' => 'El estado debe ser una cadena de texto.',
            'order_id.string' => 'El ID del pedido debe ser una cadena de texto.',
            'order_id.exists' => 'El ID del pedido no existe.',
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric' => 'El monto debe ser un número.',
            'payment_method.required' => 'El método de pago es obligatorio.',
            'payment_method.string' => 'El método de pago debe ser una cadena de texto.',
            'preference_id.required' => 'El ID de preferencia es obligatorio.',
            'preference_id.string' => 'El ID de preferencia debe ser una cadena de texto.',
            'preference_id.unique' => 'Ya tienes una transacción con este ID de preferencia.'
        ];
    }
}
