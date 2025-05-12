<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreBrandsRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:brands,name',
            'logo' => [
                'nullable',
                'mimes:jpg,jpeg,png,webp',
                File::image()->max(1024)
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Por favor ingresa el nombre de la marca.',
            'name.string' => 'El nombre de la marca debe ser un texto válido.',
            'name.max' => 'El nombre de la marca no puede exceder los 255 caracteres.',
            'name.unique' => 'Ya existe una marca con ese nombre.',

            'logo.mimes' => 'El logo debe ser una imagen en formato JPG, JPEG, PNG o WEBP.',
            'logo.image' => 'El archivo seleccionado no es una imagen válida.',
            'logo.max' => 'El logo no puede superar 1MB de tamaño.',
        ];
    }
}
