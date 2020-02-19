<?php
    
    namespace app\Models;
    
    interface DataForJsonInterface
    {
        /**
         * Возвращает данные для JSON
         *
         * @param array|null $entityDataToSearch
         * @return array
         */
        public function getDataForJson(?array $entityDataToSearch): array;
    }
    