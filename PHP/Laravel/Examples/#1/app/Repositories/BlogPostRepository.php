<?php

  namespace App\Repositories;

  use App\Models\BlogPost as Model;
  use Illuminate\Pagination\LengthAwarePaginator;

  /**
   * Class BlogCategoryRepository
   *
   * @package App\Repositories
   */
  class BlogPostRepository extends CoreRepository
  {
    /**
     * @return string
     */
    protected function getModelClass()
    {
      return Model::class;
    }


    /**
     * Получить список статей для вывода в списке
     * (Админка)
     *
     * @return LengthAwarePaginator
     */
    public function getAllWithPaginate()
    {
      $columns = [
        'id',
        'title',
        'slug',
        'is_published',
        'published_at',
        'user_id',
        'category_id',
      ];

      return $this->startConditions()
        ->select($columns)
        ->orderBy('id', 'DESC')
        ->with([
          'category',
          'user',
        ]) // LAZY LOAD (Жадная загрузка) загрузка других отношений (ключ relations) | внешние ключи должны быть в $columns
//        ->with([
//          // Можно так:
//          'category' => function ($query) {
//            $query->select(['id', 'title']);
//          },
//          // или так:
//          'user:id,name',
//        ])
        ->paginate(25);
    }

    /**
     * Получить модель для редактирования в админке
     *
     * @param $id
     * @return mixed
     */
    public function getEdit($id)
    {
      return $this->startConditions()->find($id);
    }
  }
