<?php
    
    namespace app\Models;
    
    class Materials extends MEntity
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_Materials_';
    
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 700;
    
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
        protected $header = 'Материалы';
        
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'matName';
        
        /**
         * Возвращает данные по привязке к другим сущностям
         *
         * @return array
         */
        public function getBindMap(): array
        {
            return [];
        }
    
        /**
         * Генерация настроек для выборки элементов
         *
         * @return array
         */
        public function generateFindSettings(): array
        {
            $select = [
                "matID as id",
                "{$this->titleColumn} as title",
            ];
        
            foreach ($this->bindMap as $class => $classData) {
                $key = $class::KEY;
            
                foreach ($classData as $column => $aliasName) {
                    $select[] = "{$column} AS {$key}{$aliasName}";
                }
            }
        
            return [
                'select' => $select,
                'where' => $this->dataToSearch,
            ];
        }
    }
    