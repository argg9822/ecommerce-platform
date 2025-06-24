<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
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
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'title' => 'required|string|max:255',
            'ip_address' => 'nullable|ip',
        ];
    }

    public function messages(): array
    {
        return [
            'rating.required' => 'La calificación es obligatoria.',
            'rating.integer' => 'La calificación debe ser un número entero.',
            'rating.min' => 'La calificación debe ser al menos 1.',
            'rating.max' => 'La calificación no puede ser mayor a 5.',
            'comment.string' => 'El comentario debe ser una cadena de texto.',
            'comment.max' => 'El comentario no puede exceder los 1000 caracteres.',
            'title.required' => 'El título es obligatorio.',
            'title.string' => 'El título debe ser una cadena de texto.',
            'title.max' => 'El título no puede exceder los 255 caracteres.',
            'ip_address.ip' => 'La dirección IP debe ser una dirección IP válida.',
        ];
    }
}
