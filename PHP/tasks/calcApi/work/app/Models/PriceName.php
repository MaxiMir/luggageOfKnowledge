<?php
    
    namespace App\Models;
    
    
    class PriceName extends Entity
    {
        
        /**
         * @return string
         */
        public function getBindingColumn(): string
        {
            return 'awcPGID';
        }
    }