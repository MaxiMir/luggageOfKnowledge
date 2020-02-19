<?php
    
    namespace app\Models;
    
    class MatTypes extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_MatTypes_';
    
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 600;
    
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
        protected $header = 'Типы материалов';
        
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
            return [];
        }
    }
    