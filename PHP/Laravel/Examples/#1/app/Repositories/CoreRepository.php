<?php

  namespace App\Repositories;

  use Illuminate\Database\Eloquent\Model;

  /**
   * Class CoreRepository
   *
   * @package App\Repositories
   *
   *
   * Репозиторий работы с сущностью
   * Может выдавать выборку данных
   * Не может создавать/изменять сущности
   */
  class CoreRepository
  {
    /**
     * @var Model
     */
    protected $model;

    /**
     * CoreRepository constructor.
     */
    public function __construct()
    {
      $this->model = app($this->getModelClass());
    }

    /**
     * @return mixed
     */
    abstract protected function getModelClass();

    /**
     * @return \Illuminate\Contracts\Foundation\Application|Model|mixed
     */
    protected function startConditions()
    {
      // состояние не сохранится
      return clone $this->model;
    }
  }
