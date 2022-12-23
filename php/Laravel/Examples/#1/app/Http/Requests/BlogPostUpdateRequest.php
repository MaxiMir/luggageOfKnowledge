<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;

  class BlogPostUpdateRequest extends FormRequest
  {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
      return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
      // Валидация формы
      return [
        'title' => 'required|min:5|max:200',
        'slug' => 'max:200',
        'excerpt' => 'max:500',
        'content_raw' => 'required|string|min:5|max:10000',
        'parent_id' => 'required|integer|exists:blog_categories,id' // таблица blog_categories поле id
      ];
    }
  }
