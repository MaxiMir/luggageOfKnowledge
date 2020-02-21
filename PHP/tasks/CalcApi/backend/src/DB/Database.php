<?php
    
    namespace app\DB;
    
    class Database implements DatabaseInterface
    {
        private $connection;
        private $stmt;
    
        /**
         * Database constructor.
         */
        function __construct()
        {
            $serverName = '199.99.99.999\sqlexpress, 1433';
            $connectionInfo = [
                'UID' => '****',
                'PWD' => '****',
                'Database' => 'PerfectCRM',
                'Encrypt' => false,
            ];
            
            $this->connection = sqlsrv_connect($serverName, $connectionInfo);
            
            if (!$this->connection) {
                die("Connection could not be established.<br />");
            }
        }
        
        function __destruct()
        {
            sqlsrv_close($this->connection);
        }
    
        /**
         * Выполняет запрос к БД
         *
         * @param string $sql
         * @param bool $isChaining
         * @return Database|false|resource
         */
        public function query(string $sql, bool $isChaining = true)
        {
            $this->stmt = sqlsrv_query($this->connection, $sql);
            
            return $isChaining ? $this : $this->stmt;
        }
    
        /**
         * Возвращает массив с выборкой из БД
         *
         * @return array
         */
        public function toArray(): array
        {
            $data = [];
            
            if ($this->stmt) {
                while ($row = sqlsrv_fetch_array($this->stmt, SQLSRV_FETCH_ASSOC)) {
                    $data[] = $row;
                }
            }
            
            return $data;
        }
    }
