<?php
    
    namespace app\Models;
    
    class CalcSettings extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         */
        const KEY = '_CalcSettings_';
    
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 200;
    
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
        protected $header = 'Товары';
    
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'nameControl';
        
        /**
         * Возвращает данные по привязке к другим сущностям
         *
         * @return array
         */
        public function getBindMap(): array
        {
            return [
                PriceName::class => ['awcPGID' => 'awcPGID'],
                MatTypes::class => ['listMatTypeID' => 'ID'],
                Materials::class => ['listMatTypeID' => 'typeID'],
            ];
        }
    }
    