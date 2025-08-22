<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCouponRequest extends FormRequest
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
            'code'             => 'required|string|max:50|unique:coupons,code',
            'discount_type'    => 'required|in:percentage,fixed,free_shipping,bogo',
            'discount_value'   => [
                'required',
                'numeric',
                Rule::when(in_array($this->input('discount_type'), ['percentage', 'fixed']), 'min:1'),
            ],
            'expires_at'       => 'required|date|after:today',
            'only_first_order' => 'boolean',
            'usage_limit'      => 'nullable|integer|min:1',
            'usage_per_user'   => 'nullable|integer|min:1',

            'conditions'           => 'nullable|array',
            'conditions.*.name'    => 'required_with:conditions|in:product,category,client,city,min_amount',

            'conditions.*.value'   => [
                'required_with:conditions.*.name',
                Rule::when(
                    in_array($this->input('conditions.*.name'), ['product', 'category', 'client', 'city']),
                    'array|min:1'
                ),
                Rule::when(
                    $this->input('conditions.*.name') === 'min_amount',
                    'numeric|min:1'
                ),
            ],

            'conditions.*.value.*' => 'integer|min:1',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (in_array($this->discount_type, ['percentage', 'fixed']) && $this->discount_value < 1) {
                $validator->errors()->add('discount_value', 'El valor del descuento debe ser mayor a 1.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'code.required'        => 'El código es obligatorio.',
            'code.string'          => 'El código debe ser una cadena de texto.',
            'code.max'             => 'El código no puede tener más de 50 caracteres.',
            'code.unique'          => 'Ya existe un cupón con este código.',
            'discount_type.in'     => 'El tipo de descuento debe ser "percentage" o "fixed_amount".',
            'expires_at.after'     => 'La fecha de expiración debe ser posterior a hoy.',
            'conditions.*.name.in' => 'La condición debe ser válida (product, category, client, city, min_amount).',
        ];
    }
}
