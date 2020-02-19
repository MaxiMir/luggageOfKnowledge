<?php
    
    namespace app\Controllers;
    
    interface CEntityInterface
    {
        /**
         * Возвращает элементы модели
         *
         * @return array
         */
        public function getElements(): array;
        
        /**
         * Возвращает элементы для связывания для BindingMap
         *
         * @return array
         */
        public function getElementsForBindingMap(): array;
        
        /**
         * Возвращает данные по привязкам с учетом текущей модели
         *
         * @return array
         */
        public function getNewBindingMap(): array;
    }
    