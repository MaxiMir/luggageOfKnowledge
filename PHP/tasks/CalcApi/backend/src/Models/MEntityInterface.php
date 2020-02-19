<?php
    
    namespace app\Models;
    
    interface MEntityInterface
    {
        /**
         * Возвращает название таблицы из БД
         *
         * @return string
         */
        public function getTableName(): string;
    
        /**
         * Генерация настроек для выборки элементов
         *
         * @return array
         */
        public function generateFindSettings(): array;
    
        /**
         * Поиск элементов
         *
         * @param array $where
         * @return array
         */
        public function find(array $where): array;
    
        /**
         * Поиск всех элементов с учетом настроек (findSettings)
         * @return array
         */
        public function findAll(): array;
        
        /**
         * Поиск элемента по ID
         *
         * @param $id
         * @return array
         */
        public function findByID($id): array;
    }
    