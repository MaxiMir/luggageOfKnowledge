<?php
    
    namespace app\Models;
    
    class PriceParam2 extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_PriceParam2_';
    
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 400;
    
        /**
         * Тип блока
         *
         * @var string
         */
        protected $type = 'section';
    
        /**
         * Название блока
         *
         * @var string
         */
        protected $header = 'Формат';
        
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'name';
        
        /**
         * Возвращает данные по привязке к другим сущностям
         *
         * @return array
         */
        public function getBindMap(): array
        {
            return [
                MatFormats::class => ['matFormatID' => 'ID'],
            ];
        }
    }
    