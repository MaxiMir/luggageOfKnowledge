<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogCategory extends Model
{
    use SoftDeletes;

    protected $fillable = [ // fill() что можно заполнить0
      'title',
      'slug',
      'parent_id',
      'description'
    ];
}
