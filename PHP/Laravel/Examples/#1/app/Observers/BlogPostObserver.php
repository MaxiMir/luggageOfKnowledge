<?php

  namespace App\Observers;

  use App\Models\BlogPost;
  use Carbon\Carbon;

  class BlogPostObserver
  {
    /**
     * ОБРАБОТКА ПЕРЕД СОЗДАНИЕМ ЗАПИСИ
     *
     * @param BlogPost $blogPost
     */
    public function creating(BlogPost $blogPost)
    {
      $this->setPublishedAt($blogPost);

      $this->setSlug($blogPost);

      $this->setHtml($blogPost);

      $this->setUser($blogPost);
    }

    /**
     * ОБРАБОТКА ПЕРЕД ОБНОВЛЕНИЕМ ЗАПИСИ
     *
     * @param BlogPost $blogPost
     */
    public function updating(BlogPost $blogPost)
    {
      $blogPost->isDirty(); // проверка - есть ли измененения в модели
      $blogPost->isDirty('is_published'); // проверка на изменение поля is_published
      $blogPost->getAttribute('is_published'); // получение нового значения атрибута
      $blogPost->is_published; // получение нового значения атрибута
      $blogPost->getOriginal('is_published'); // получение старого значения атрибута

      $this->setPublishedAt($blogPost);

      $this->setSlug($blogPost);

      // return false; # отменить обновление
    }

    /**
     * ОБРАБОТКА ПОСЛЕ СОЗДАНИЯ ЗАПИСИ
     *
     * @param \App\Models\BlogPost $blogPost
     * @return void
     */
    public function created(BlogPost $blogPost)
    {
      //
    }

    /**
     * Handle the blog post "updated" event.
     *
     * @param \App\Models\BlogPost $blogPost
     * @return void
     */
    public function updated(BlogPost $blogPost)
    {
      //
    }

    /**
     * Handle the blog post "deleted" event.
     *
     * @param \App\Models\BlogPost $blogPost
     * @return void
     */
    public function deleted(BlogPost $blogPost)
    {
      //
    }

    /**
     * Handle the blog post "restored" event.
     *
     * @param \App\Models\BlogPost $blogPost
     * @return void
     */
    public function restored(BlogPost $blogPost)
    {
      //
    }

    /**
     * Handle the blog post "force deleted" event.
     *
     * @param \App\Models\BlogPost $blogPost
     * @return void
     */
    public function forceDeleted(BlogPost $blogPost)
    {
      //
    }

    /**
     * Если дата публикации не установлена и происходит установка флага - опубликовано,
     * то устанавливаем дату публикации на текущую
     *
     * @param BlogPost $blogPost
     */
    protected function setPublishedAt(BlogPost $blogPost)
    {
      if(empty($blogPost->published_at) && $blogPost->is_published) {
        $blogPost->published_at = Carbon::now();
      }
    }

    /**
     * @param BlogPost $blogPost
     */
    protected function setSlug(BlogPost $blogPost)
    {
      if (empty($blogPost->slug)) {
        $blogPost->slug = \Str::slug($blogPost->title);
      }
    }

    /**
     * Установка значения полю content_html относительно поля content_row
     *
     * @param BlogPost $blogPost
     */
    protected function setHtml(BlogPost $blogPost)
    {
      if ($blogPost->isDirty('content_raw')) {
        // TODO markdown -> html
        $blogPost->content_html = $blogPost->content_raw;
      }
    }

    /**
     * Если не указан user_id, то устанавливаем пользователя по-умолчанию
     *
     * @param BlogPost $blogPost
     */
    protected function setUser(BlogPost $blogPost)
    {
      $blogPost->user_id = auth()->id() ?? BlogPost::UNKNOWN_USER;
    }
  }
