<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('category_id')->unsigned(); // поле для связи с blog_categories
            $table->integer('user_id')->unsigned(); // поле для связи с users

            $table->string('slug')->unique();
            $table->string('title');

            $table->text('excerpt')->nullable(); // выдержка статьи

            $table->text('content_raw'); // сырой контент (Markdown)
            $table->text('content_html'); // контент c html (Read only)

            $table->boolean('is_published')->default(false); // опубликована ли статья
            $table->timestamp('published_at')->nullable(); // когда опубликована

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users'); // связываем с таблицей users
            $table->foreign('category_id')->references('id')->on('blog_categories'); // связываем с таблицей blog_categories
            $table->index('is_published'); // делаем индекс для поиска и выборки
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_posts');
    }
}
