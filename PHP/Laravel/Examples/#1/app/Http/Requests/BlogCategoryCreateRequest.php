<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;

  class BlogCategoryCreateRequest extends FormRequest
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
      return [
        'title' => 'required|min:5|max:200',
        'slug' => 'max:200',
        'description' => 'string|min:3|max:500',
        'parent_id' => 'required|integer|exists:blog_categories,id' // таблица blog_categories поле id
      ];
    }
  }
