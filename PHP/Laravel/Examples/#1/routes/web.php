<?php

  Route::get('/', function () {
    return view('welcome');
  });

  # Маршрут с Rest контроллером ('/rest')
  Route::resource('test', 'RestTestController')->names('restTest');

  Auth::routes();

  Route::get('/home', 'HomeController@index')->name('home');

  Route::group(['namespace' => 'Blog', 'prefix' => 'blog'], function () {
    Route::resource('posts', 'PostController')->names('blog.posts');
  });

  # Админка Блога:
  $groupData = [
    'namespace' => 'Blog\Admin',
    'prefix' => 'admin\blog',
  ];

  Route::group($groupData, function () {
    # BlogCategory
    $methods = ['index', 'edit', 'update', 'create', 'store'];
    Route::resource('categories', 'CategoryController')
      ->only($methods) // для каких методов создать маршруты
      ->names('blog.admin.categories'); // имя маршрута

    # BlogPost
    Route::resource('posts', 'PostController')
      ->except(['show']) // все кроме show
      ->names('blog.admin.posts');
  });
