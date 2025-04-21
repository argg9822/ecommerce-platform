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
            'tenant_name' => 'required|string|max:255',
            'domain' => [
                'required',
                'alpha_dash',
                Rule::unique('domains', 'domain')->where(fn ($q) => $q->where('domain', $domainExtension . '.' . $domain)),
            ],
            'domain_extension' => 'required|string|max:255',
            'plan' => 'required|exists:plans,id',
            'tenant_logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'tenant_name.required' => 'El nombre de la tienda es requerido',
            'domain.required' => 'No se ha proporcionado un dominio',
            'domain_extension.required' => 'No se ha proporcionado una extensión de dominio',
            'plan.required' => 'El plan es requerido',
            'plan.string' => 'El plan debe ser una cadena de texto',
            'plan.alpha_dash' => 'El plan solo puede contener letras, números, guiones y guiones bajos',
            'domain.alpha_dash' => 'El dominio solo puede contener letras, números, guiones y guiones bajos',
            'plan.exists' => 'El plan no existe',
            'tenant_logo.image' => 'Logo must be an image',
            'tenant_logo.mimes' => 'El logo debe ser un archivo de tipo: jpeg, png, jpg o webp',
            'tenant_logo.max' => 'El logo no debe exceder los 2MB',
        ];
    }
}
