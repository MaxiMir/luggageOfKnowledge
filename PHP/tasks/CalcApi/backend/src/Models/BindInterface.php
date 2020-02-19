<?php
    
    namespace app\Models;
    
    interface BindInterface
    {
        /**
         * Возвращает данные по привязке к другим сущностям
         *
         * @return array
         */
        public function getBindMap(): array;
    
        /**
         * Возвращает данные для связки с другими сущностями (указанными в bindMap)
         *
         * @param array $elementsData
         * @return array
         */
        public function findBindingData(array $elementsData): array;
    }