<?php
    
    namespace app\Controllers;
    
    interface DataForJsonInterface
    {
        /**
         * Возвращает данные модели для JSON
         *
         * @return array
         */
        public function getDataForJson(): array;
    }
    