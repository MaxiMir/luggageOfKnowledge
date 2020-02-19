<?php
    
    namespace app\Models;
    
    class MatFormats extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_MatFormats_';
    
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 800;
    
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
        protected $header = 'Формат материалов';
        
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'formatName';
        
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
    