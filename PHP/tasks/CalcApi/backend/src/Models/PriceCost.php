<?php
    
    namespace app\Models;
    
    class PriceCost extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_PriceCost_';
        
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 9999;
    
        /**
         * Тип блока
         *
         * @var string
         */
        protected $type = 'price';

    
        /**
         * Название блока
         *
         * @var string
         */
        protected $header = 'Цена';
    
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'cost';
    
        /**
         * Возвращает данные по привязке к другим сущностям
         *
         * @return array
         */
        public function getBindMap(): array
        {
            return [
                PriceParam1::class => ['param1ID' => 'ID', 'priceNameID' => 'priceNameID'],
                PriceParam2::class => ['param2ID' => 'ID']
            ];
        }
    }
    