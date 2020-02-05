<?php
    
    namespace App\DB;
    
    interface SQLOperationInterface
    {
        function toSQL(): string;
    }