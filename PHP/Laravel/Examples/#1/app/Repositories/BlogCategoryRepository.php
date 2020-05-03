<?php

  namespace App\Repositories;

  use App\Models\BlogCategory as Model;
  use Illuminate\Database\Eloquent\Collection;

  /**
   * Class BlogCategoryRepository
   * @package App\Repositories
   */
  class BlogCategoryRepository extends CoreRepository
  {
    /**
     * Получить модель для редактирования в админке
     *
     * @param $id
     * @return Model
     */
    public function getEdit($id)
    {
      return $this->startConditions()->find($id);
    }

    /**
     * Получить список категорий для вывода в выпадающем списке
     *
     * @return Collection
     */
    public function getForComboBox()
    {
      // $result = $this->startConditions()->all();

      $columns = implode(',', [
        'id',
        'CONCAT (id, ". ", title) as id_title',
      ]);

      $result = $this
        ->startConditions()
        ->selectRaw($columns)
        ->toBase() // не нужно агрегировать полученные данные в объекты класса BaseCategory -> StdClass
        ->get();

      /*
        ->selectRaw($columns)
        <->
        ->select('blog_categories.*', \DB::raw('CONCAT (id, ". ", title) as id_title'))
      */

      return $result;
    }

    /**
     * @return string
     */
    protected function getModelClass()
    {
      return Model::class;
    }

    /**
     * Получить категории для вывода пагинатором
     *
     * @param int|null $perPage
     * @return mixed
     */
    public function getAllWithPaginate($perPage = null)
    {
      $columns = ['id', 'title', 'parent_id'];

      return $this
        ->startConditions()
        ->select($columns)
        ->paginate($perPage);
    }
  }
