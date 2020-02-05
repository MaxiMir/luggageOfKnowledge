<?php
    
    namespace App\DB;
    
    interface DatabaseInterface
    {
        function query(string $sql, bool $isChaining = true);
    
        function toArray(): array;
    }