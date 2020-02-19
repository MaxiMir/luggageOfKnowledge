<?php
    
    namespace app\DB;
    
    interface SQLOperationInterface
    {
        /**
         * Возвращает запрос в виде строки
         *
         * @return string
         */
        function toSQL(): string;
    }
    