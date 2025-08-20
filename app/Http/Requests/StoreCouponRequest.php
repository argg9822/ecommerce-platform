<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'code' => 'required|string|max:255',
            'type' => 'required|string|in:percentage,fixed,free_shipping,bogo',
            'amount' => 'required|numeric|min:1',
            'expiration_date' => 'required|date|after:today',
            'conditions' => 'required|array',
            'conditions.*.name' => 'required|string',
            'conditions.*.value' => 'required|array',
            'usage_limit' => 'required|integer|min:1',
            'usage_per_user' => 'required|integer|min:1',
        ];
    }
}
