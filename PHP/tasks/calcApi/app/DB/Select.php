<?php
    
    namespace App\DB;
    
    class Select implements SQLOperationInterface
    {
        private $table;
        private $select = "*";
        private $where;
        private $database;
        
        public function __construct(string $table, array $sqlParts = [])
        {
            ["select" => $select, "where" => $where] = $sqlParts;
            
            $this->table = $table;
            
            if ($select) {
                $this->select = !is_array($select) ? $select : implode(', ', $select);
            }
            
            if ($where) {
                $this->where = $where;
            }
            
            $this->database = new Database();
        }
        
        /**
         *
         *
         * @return string
         */
        private function buildSelect(): string
        {
            return "SELECT {$this->select}";
        }
        
        /**
         *
         *
         * @return string
         */
        private function buildFrom(): string
        {
            return "FROM {$this->table}";
        }
        
        /**
         *
         *
         * @return string
         */
        private function buildWhere(): string
        {
            if (!$this->where) {
                return '';
            }
            
            $whereData = array_map(function ($column, $columnWhere) {
                return "{$column} = {$columnWhere}";
            }, array_keys($this->where), $this->where);
            
            return 'WHERE ' . implode(' AND ', $whereData);
        }
        
        /**
         *
         *
         * @return string
         */
        public function toSQL(): string
        {
            $sqlParts = [];
            $sqlParts[] = $this->buildSelect();
            $sqlParts[] = $this->buildFrom();
            $sqlParts[] = $this->buildWhere();
            
            return implode(' ', $sqlParts);
        }
        
        /**
         *
         *
         * @return array
         */
        public function all(): array
        {
            $sql = $this->toSQL();
            
            return $this->database->query($sql)->toArray();
        }
    }