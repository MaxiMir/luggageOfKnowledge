<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;

  class BlogPostCreateRequest extends FormRequest
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
        'title' => 'required|min:5|max:200|unique:blog_posts', // unique:blog_posts - должна быть уникальной по полю title в таблице blog_posts
        'slug' => 'max:200',
        'content_raw' => 'required|string|min:5|max:10000',
        'category_id' => 'required|integer|exists:blog_categories,id' // таблица blog_categories поле id
      ];
    }

    /**
     * @return array|string[]
     */
    public function messages()
    { // сообщение ошибках
      return [
        'title.required' => 'Введите заголовок статьи',
        'content_raw.min' => 'Минимальная длина статьи [:min] символов',
      ];
    }

    public function attributes()
    {
      return [
        'title' => 'Заголовок', // заменяет title на Заголовок в сообщениях о ошибках
      ];
    }
  }
