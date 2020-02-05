<?php
    
    namespace App\Models;
    
    interface EntityInterface
    {
        function getBindingColumn(): string;
        
        function find(array $settings): array;
        
        function findByID(int $id, array $columns = []): array;
        
        function findAll(): array;
    }