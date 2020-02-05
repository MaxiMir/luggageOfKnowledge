<?php
    
    namespace App\DB;
    
    class Database implements DatabaseInterface
    {
        private $connection;
        private $stmt;
        
        function __construct()
        {
            $serverName = '194.48.96.165\sqlexpress, 1433';
            $connectionInfo = [
                'UID' => 'PerfectCRMWebUser',
                'PWD' => 'PerfectCRMWebUser1234',
                'Database' => 'PerfectCRM',
                'Encrypt' => false,
            ];
            
            $this->connection = sqlsrv_connect($serverName, $connectionInfo);
            
            if (!$this->connection) {
                $errorsList = implode('<br>', sqlsrv_errors());
                
                die("Connection could not be established.<br />{$errorsList}");
            }
        }
        
        function __destruct()
        {
            sqlsrv_close($this->connection);
        }
    
        /**
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
    
        /**
         * @param string $table
         * @return array
         */
        public function getTableColumns(string $table): array
        {
            $sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '{$table}'";
            
            return $this->query($sql)->toArray();
        }
    
        /**
         * @param string $table
         * @return array
         */
        public function getTableData(string $table): array
        {
            $sql = "SELECT * FROM {$table}";
            
            return $this->query($sql)->toArray();
        }
    }
