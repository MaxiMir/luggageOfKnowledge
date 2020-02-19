<?php
    
    namespace app\DB;
    
    interface DatabaseInterface
    {
        /**
         * Выполняет запрос к БД
         *
         * @param string $sql
         * @param bool $isChaining
         */
        function query(string $sql, bool $isChaining = true);
    
        /**
         * Возвращает массив с выборкой из БД
         * @return array
         */
        function toArray(): array;
    }
    