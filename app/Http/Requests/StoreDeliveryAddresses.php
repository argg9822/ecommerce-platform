<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliveryAddresses extends FormRequest
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
            'recipient_name' => 'required|string|max:255',
            'phone' => 'required|numeric|digits_between:7,20',
            'address_line_1' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'apartment' => 'nullable|string|max:255',
            'indications' => 'nullable|string|max:255',
            'type' => 'nullable|in:home,work,other',
            'country' => 'required|string|max:255',
            'is_default' => 'required|boolean'

        ];
    }

    public function messages(): array
    {
        return [
            'recipient_name.required' => 'Por favor proporciona un nombre para la dirección',
            'recipient_name.string'   => 'Por favor ingresa un nombre vaálido para la dirección',
            'recipient_name.max'      => 'El nombre para la dirección no debe sobrepasar los 255 caracteres',

            'phone.required'          => 'El número de teléfono es obligatorio.',
            'phone.numeric'           => 'El número de teléfono debe contener solo números.',
            'phone.digits_between'    => 'El número de teléfono debe tener entre 7 y 20 dígitos.',

            'address_line_1.required' => 'La dirección principal es obligatoria.',
            'address_line_1.string'   => 'La dirección principal debe ser texto.',
            'address_line_1.max'      => 'La dirección principal no puede superar los 255 caracteres.',

            'city.required'           => 'La ciudad es obligatoria.',
            'city.string'             => 'La ciudad debe ser texto.',
            'city.max'                => 'La ciudad no puede superar los 255 caracteres.',

            'state.string'            => 'El estado/departamento debe ser texto.',
            'state.max'               => 'El estado/departamento no puede superar los 255 caracteres.',

            'apartment.string'        => 'El apartamento debe ser texto.',
            'apartment.max'           => 'El apartamento no puede superar los 255 caracteres.',

            'indications.string'      => 'Las indicaciones deben ser texto.',
            'indications.max'         => 'Las indicaciones no pueden superar los 255 caracteres.',

            'type.in'                 => 'El tipo de dirección debe ser "home", "work" o "other".',

            'country.required'        => 'El país es obligatorio.',
            'country.string'          => 'El país debe ser texto.',
            'country.max'             => 'El país no puede superar los 255 caracteres.',

            'is_default.required'     => 'Debes indicar si la dirección es predeterminada.',
            'is_default.boolean'      => 'El valor de dirección predeterminada debe ser verdadero o falso.',
        ];
    }
}
