<?php
    
    namespace app\DB;
    
    class Select implements SQLOperationInterface
    {
        private $table;
        private $select = "*";
        private $where;
        private $operator;
        private $database;
        
        public function __construct(string $table, array $sqlParts = [], $operator = 'AND')
        {
            ["select" => $select, "where" => $where] = $sqlParts;
            
            $this->database = new Database();
            $this->table = $table;
            
            if ($select) {
                $this->select = !is_array($select) ? $select : implode(', ', $select);
            }
            
            if ($where) {
                $this->where = $where;
            }
            
            $this->operator = $operator;
        }
        
        /**
         * Генерирует SELECT
         *
         * @return string
         */
        private function buildSelect(): string
        {
            return "SELECT {$this->select}";
        }
        
        /**
         * Генерирует FROM
         *
         * @return string
         */
        private function buildFrom(): string
        {
            return "FROM {$this->table}";
        }
    
        /**
         * Генерирует WHERE
         *
         * @return string
         */
        private function buildWhere(): string
        {
            if (!$this->where) {
                return '';
            }
            
            $whereData = array_map(function ($column, $columnWhere) {
                if (!is_array($columnWhere)) {
                    return "{$column}={$columnWhere}";
                }
                
                $listColumns = implode(', ', $columnWhere);
                
                return "{$column} IN ({$listColumns})";
            }, array_keys($this->where), $this->where);
            
            return 'WHERE ' . implode(" {$this->operator} ", $whereData);
        }
        
        /**
         * Возвращает запрос в виде строки
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
         * Выполняет запрос и возвращает массив элементов
         * @return array
         */
        public function all(): array
        {
            $sql = $this->toSQL();
            
            return $this->database->query($sql)->toArray();
        }
    }

    
