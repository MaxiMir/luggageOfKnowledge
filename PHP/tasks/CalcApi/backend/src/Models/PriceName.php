<?php
    
    namespace app\Models;
    
    class PriceName extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_PriceName_';
        
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 300;
    
        /**
         * Название блока
         *
         * @var string
         */
        protected $header = 'Прайс';
        
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'namePrice';
    
        /**
         * Возвращает данные по привязке к другим сущностям
         *
         * @return array
         */
        public function getBindMap(): array
        {
            return [
                PriceCost::class => ['ID' => 'priceNameID'],
            ];
        }
    }
    