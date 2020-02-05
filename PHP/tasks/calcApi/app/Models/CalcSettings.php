<?php
    
    namespace App\Models;
    
    class CalcSettings extends Entity
    {
        /**
         * @return string
         */
        public function getBindingColumn(): string
        {
            return 'serviceID';
        }
    }