<?php

  namespace App\Observers;

  use App\Models\BlogCategory;

  class BlogCategoryObserver
  {
    /**
     * Handle the blog category "created" event.
     *
     * @param \App\Models\BlogCategory $blogCategory
     * @return void
     */
    public function created(BlogCategory $blogCategory)
    {
      # ПОПАДАЕМ ПОСЛЕ СОЗДАНИЯ ЗАПИСИ
    }

    /**
     * @param BlogCategory $blogCategory
     */
    public function creating(BlogCategory $blogCategory)
    {
      $this->setSlug($blogCategory);
    }

    /**
     * Если поле slug пустое, то заполним его конвертацией заголовка
     *
     * @param BlogCategory $blogCategory
     */
    protected function setSlug(BlogCategory $blogCategory)
    {
      if (empty($blogCategory->slug)) {
        $blogCategory->slug = \Str::slug($blogCategory->title);
      }
    }

    /**
     * Handle the blog category "updated" event.
     *
     * @param \App\Models\BlogCategory $blogCategory
     * @return void
     */
    public function updated(BlogCategory $blogCategory)
    {
      # ПОПАДАЕМ ПОСЛЕ ОБНОВЛЕНИЯ ЗАПИСИ
    }

    /**
     * @param BlogCategory $blogCategory
     */
    public function updating(BlogCategory $blogCategory)
    {
      $this->setSlug($blogCategory);
    }

    /**
     * Handle the blog category "deleted" event.
     *
     * @param \App\Models\BlogCategory $blogCategory
     * @return void
     */
    public function deleted(BlogCategory $blogCategory)
    {
      # ПОПАДАЕМ ПОСЛЕ УДАЛЕНИЯ ЗАПИСИ (softDeleted)
    }

    /**
     * Handle the blog category "restored" event.
     *
     * @param \App\Models\BlogCategory $blogCategory
     * @return void
     */
    public function restored(BlogCategory $blogCategory)
    {
      # ПОПАДАЕМ ПОСЛЕ ВОССТАНОВЛЕНИЯ ЗАПИСИ
    }

    /**
     * Handle the blog category "force deleted" event.
     *
     * @param \App\Models\BlogCategory $blogCategory
     * @return void
     */
    public function forceDeleted(BlogCategory $blogCategory)
    {
      # ПОПАДАЕМ ПОСЛЕ ПРЯМОГО УДАЛЕНИЯ ЗАПИСИ
    }
  }
