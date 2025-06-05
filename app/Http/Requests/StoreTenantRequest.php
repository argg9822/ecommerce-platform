<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTenantRequest extends FormRequest
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
        $domainExtension = $this->input('domain_extension');
        $domain = $this->input('domain');
        return [
            'name' => 'required|string|max:255|unique:tenants,name',
            'domain' => [
                'required',
                'alpha_dash',
                Rule::unique('domains', 'domain')->where(fn ($q) => $q->where('domain', $domainExtension . '.' . $domain)),
            ],
            'user_email' => 'required|string|max:255|unique:users,email',
            'user_name' => 'required|string|max:255',
            'user_phone' => 'required|numeric|digits_between:7,20',
            'domain_extension' => 'required|string|max:255',
            'plan' => 'required|exists:plans,id',
            'tenant_logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del comercio es obligatorio.',
            'name.string' => 'El nombre del comercio debe ser un texto válido.',
            'name.max' => 'El nombre del comercio no debe exceder los 255 caracteres.',
            'name.unique' => 'Este nombre de comercio ya está registrado.',

            'domain.required' => 'El dominio es obligatorio.',
            'domain.alpha_dash' => 'El dominio solo puede contener letras, números, guiones y guiones bajos.',
            'domain.unique' => 'Este dominio ya está en uso. Intenta con otro.',

            'user_email.required' => 'El correo electrónico del usuario es obligatorio.',
            'user_email.string' => 'El correo electrónico debe ser un texto válido.',
            'user_email.max' => 'El correo electrónico no debe exceder los 255 caracteres.',
            'user_email.unique' => 'Este correo electrónico ya está registrado.',

            'user_name.required' => 'El nombre del usuario es obligatorio.',
            'user_name.string' => 'El nombre del usuario debe ser un texto válido.',
            'user_name.max' => 'El nombre del usuario no debe exceder los 255 caracteres.',

            'user_phone.required' => 'El número de teléfono es obligatorio.',
            'user_phone.numeric' => 'El número de teléfono debe contener solo números.',
            'user_phone.digits_between' => 'El número de teléfono debe tener entre 7 y 20 dígitos.',

            'domain_extension.required' => 'La extensión del dominio es obligatoria.',
            'domain_extension.string' => 'La extensión del dominio debe ser un texto válido.',
            'domain_extension.max' => 'La extensión del dominio no debe exceder los 255 caracteres.',

            'plan.required' => 'El plan seleccionado es obligatorio.',
            'plan.exists' => 'El plan seleccionado no es válido.',

            'tenant_logo.image' => 'El archivo del logo debe ser una imagen.',
            'tenant_logo.mimes' => 'El logo debe estar en formato jpeg, png, jpg o webp.',
            'tenant_logo.max' => 'El logo no debe superar los 2MB de tamaño.',
        ];
    }
}
