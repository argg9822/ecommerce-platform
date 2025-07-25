<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class StoreCategoryRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:categories,name',
            'image' => [
                'nullable',
                'mimes:jpg,png,jpeg,webp',
                File::image()->max(1024)
                    // ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
            'description' => 'nullable|string',
            'parent_id' => 'integer|exists:categories,id|nullable'
        ];
    }

    public function messages () : array
    {
        return [
            'name.unique' => 'Ya existe una categoría con este nombre',
            'name.required' => 'Por favor ingrese el nombre de la categoría',
            'name.string' => 'Ingrese un nombre de categoría válido',
            'name.max' => 'El nombre de la categoría no puede exceder los 255 caracteres',
            'image.mimes' => 'El archivo debe ser una imagen válida (jpg, jpeg, png, webp)',
            'image.image' => 'El archivo debe ser una imagen',
            'image.max' => 'La imagen no debe pesar más de 1MB',
            'description.string' => 'Ingrese una descripción válida',
            'parent_id.integer' => 'Seleccione una categoría válida',
            'parent_id.exists' => 'La categoría no existe'
            // 'image.dimensions' => 'La imagen debe tener como máximo 1000px de ancho y 500px de alto',
        ];
    }
}
