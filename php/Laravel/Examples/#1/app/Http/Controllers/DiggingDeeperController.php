<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Carbon\Carbon;

class DiggingDeeperController extends Controller
{
    /**
     * Базовая информация:
     * @url https://laravel.com/docs/5.8/collections
     *
     * Справочная информация:
     * @url https://laravel.com/api/5.8/Illuminate/Support/Collection.html
     *
     * Вариант коллекции для моделей eloquent:
     * @url https://laravel.com/api/5.8/Illuminate/Database/Eloquent/Collection.html
     *
     * Билдер запросов - то с чем можно перепутать коллекции:
     * @url https://laravel.com/docs/5.8queries
     */

    public function collections()
    {
      $result = [];

      /**
       * @var \Illuminate\Database\Eloquent\Collection $eloquentCollection
       */
      $eloquentCollection = BlogPost::withoutTrashed()->get(); // withoutTrashed() - получить все данные, включая удаленные

      /**
       * @var \Illuminate\Support\Collection $collection
       */
      // $collection = collect(); // создание пустой коллекции
      $collection = collect($eloquentCollection->toArray());
      $firstElement = $collection->first();
      $lastElement = $collection->last();
      $filterData = $collection
        ->where('category_id', 10)
        ->values() // из выборки берет только значения (без ключей)
        ->keyBy('id'); // id станут ключами массива

      $countElements = $filterData->count();
      $isEmptyCollection = $filterData->isEmpty();
      $isNotEmptyCollection = $filterData->isNotEmpty();
      $firstWhereElement = $collection->firstWhere('created_at', '>', '2019-01-17 01:35:11');
      $filterDataMap = $collection->map(function (array $item) { // не мутирует коллекцию
        $newItem = new \stdClass();
        $newItem->item_id = $item['id'];
        $newItem->item_name = $item['title'];
        $newItem->exists = is_null($item['deleted_at']);

        return $newItem;
      });
      $filterDataMapNotExist = $filterDataMap
        ->where('exists', '=', false)
        ->values();
      $collection->transform(function (array $item) { // коллекция мутирует
        $newItem = new \stdClass();
        $newItem->item_name = $item['title'];
        $newItem->created_at = Carbon::parse($item['created_at']);

        return $newItem;
      });

      $newItem = new \stdClass();
      $newItem->id = 7;

      $newItemSec = new \stdClass();
      $newItemSec->id = 9;

      // Установить элемент в начало коллекции:
      $newItemFirst = $collection->prepend($newItem)->first(); // prepend - вставить в начало коллекции
      $newItemLast = $collection->push($newItem)->last(); // push - вставить в конец коллекции
      $pulledItem = $collection->pull(1); // забрать 1 элемент

      // Фильтрация. Замена orWhere()
      $filtered = $collection->filter(function ($item) {
        $byDay = $item->created_at->isFriday();
        $byDate = $item->created_at->day == 13;

        return $byDay && $byDate;
      });

      $sortedAscCollection = $collection->sortBy('item_id');
      $sortedDescCollection = $collection->sortByDesc('item_id');
      $sortedSimpleCollection = collect([5,2,1,4])->sort()->values();
    }
}
