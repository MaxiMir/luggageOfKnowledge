<?php

  namespace App\Providers;

  use App\Models\BlogCategory;
  use App\Models\BlogPost;
  use App\Observers\BlogCategoryObserver;
  use App\Observers\BlogPostObserver;
  use Illuminate\Support\Facades\Schema;
  use Illuminate\Support\ServiceProvider;

  class AppServiceProvider extends ServiceProvider
  {
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
      //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      Schema::defaultStringLength(191);

      BlogPost::observe(BlogPostObserver::class);
      BlogCategory::observe(BlogCategoryObserver::class);
    }
  }
