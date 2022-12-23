<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\Eloquent\SoftDeletes;

  /**
   * Class BlogCategory
   *
   * @package App\Models
   *
   * @property-read BlogCategory $parentCategory
   * @property-read string $parentTitle
   */
  class BlogCategory extends Model
  {
    use SoftDeletes;

    /**
     * Id корня
     */
    const ROOT = 1;

    protected $fillable = [ // fill() что можно заполнить
      'title',
      'slug',
      'parent_id',
      'description',
    ];

    /**
     * Получить родительскую категорию
     *
     * @return BlogCategory
     */
    public function parentCategory()
    {
      // посколькку нет foreign key
      return $this->belongsTo(BlogCategory::class, 'parent_id', 'id');
    }

    /**
     * Пример аксесуара (Accessor)
     *
     * @url https://laravel.com/docs/5.8/eloquent-mutators
     *
     * @return string
     */
    public function getParentTitleAttribute() // get...Attribute
    {
      return $this->parentCategory->title
        ?? ($this->isRoot()
          ? 'Корень'
          : '???');
    }

    /**
     * Является ли текущий объект корневым
     *
     * @return bool
     */
    public function isRoot()
    {
      return $this->id === BlogCategory::ROOT;
    }

    /**
     * Пример аксесуара
     *
     * @param string $valueFromObject
     * @return bool|false|string|string[]|null
     */
    public function getTitleAttribute($valueFromObject)
    {
      return mb_strtoupper($valueFromObject);
    }

    /**
     * Пример мутатора
     *
     * @param $incomingValue
     */
    public function setTitleAttribute($incomingValue)
    {
      $this->attributes['title'] = mb_strtoupper($incomingValue);
    }
  }
