<?php
    
    namespace App\Models;
    
    class Services extends Entity
    {
        /**
         * @return string
         */
        public function getBindingColumn(): string
        {
            return 'ID';
        }
    }