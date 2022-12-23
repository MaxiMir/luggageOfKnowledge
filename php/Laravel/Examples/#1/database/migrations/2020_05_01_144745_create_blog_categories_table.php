<?php

  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;

  class CreateBlogCategoriesTable extends Migration
  {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('blog_categories', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->bigInteger('parent_id')->unsigned()->default(1); // unsigned >= 0

        $table->string('slug')->unique();
        $table->string('title');
        $table->text('description')->nullable(); // nullable - необязательное

        $table->timestamps(); // CREATED AT + UPDATED AD
        $table->softDeletes(); // при удалении остается запись в БД (в модели прописать trait use SoftDeletes)
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropIfExists('blog_categories');
    }
  }
