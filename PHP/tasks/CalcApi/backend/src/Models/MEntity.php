<?php
    
    namespace app\Models;
    
    use app\DB\Select;
    
    abstract class MEntity implements MEntityInterface, BindInterface, DataForJsonInterface
    {
        /**
         * Префикс для алиасов колонок
         * Ключ в bindingMap
         */
        public const KEY = '_NAME_';
        
        /**
         * Индекс для сортировки
         *
         * @var int
         */
        protected $sort = 100;
    
        /**
         * Тип блока
         *
         * @var string
         */
        protected $type = 'section';
        
        /**
         * Название блока
         *
         * @var string
         */
        protected $header = 'Название блока';
        
        /**
         * Название таблицы в БД
         *
         * @var string
         */
        protected $tableName;
        
        /**
         * Название колонки в БД с названием элементов
         *
         * @var string
         */
        protected $titleColumn = 'name';
        
        /**
         * Данные для фильтрации элементов из БД
         *
         * @var array
         */
        protected $dataToSearch;
        
        /**
         * Настройки выборки элементов из БД
         *
         * @var array
         */
        protected $findSettings;
        
        /**
         * Данные по привязкам для других сущностей
         *
         * @var array
         */
        protected $bindMap;
        
        /**
         * MEntity constructor.
         * @param array $dataToSearch
         */
        function __construct($dataToSearch = [])
        {
            $this->dataToSearch = $dataToSearch;
            $this->tableName = $this->getTableName();
            $this->bindMap = $this->getBindMap();
            $this->findSettings = $this->generateFindSettings();
        }
        
        /**
         * Возвращает название таблицы из БД
         *
         * @return string
         */
        public function getTableName(): string
        {
            $namespace = get_class($this);
            $namespaceData = explode('\\', $namespace);
            
            return end($namespaceData);
        }
        
        /**
         * Возвращает данные для JSON
         *
         * @param array|null $entityDataToSearch
         * @return array
         */
        public function getDataForJson(?array $entityDataToSearch): array
        {
            return [
                'sort' => $this->sort,
                'header' => $this->header,
                'table' => $this->tableName,
                'checkedID' => $entityDataToSearch['ID'] ?? null,
                'type' => $this->type,
            ];
        }
        
        /**
         * Поиск элементов
         *
         * @param array $where
         * @return array
         */
        public function find(array $where = []): array
        {
            $settings = $this->findSettings;
            
            if ($where) {
                $settings['where'] = array_merge($settings['where'], $where);
            }
            
            $modelData = new Select($this->tableName, $settings);
            
            return $modelData->all();
        }
        
        /**
         * Поиск всех элементов с учетом настроек (findSettings)
         * @return array
         */
        public function findAll(): array
        {
            $modelData = new Select($this->tableName, $this->findSettings);
            
            return $modelData->all();
        }
        
        /**
         * Поиск элемента по ID
         *
         * @param $id
         * @return array
         */
        public function findByID($id): array
        {
            $where = ['ID' => $id];
            
            return $this->find($where);
        }
        
        /**
         * Генерация настроек для выборки элементов
         *
         * @return array
         */
        public function generateFindSettings(): array
        {
            $select = [
                "ID as id",
                "{$this->titleColumn} as title",
            ];
            
            foreach ($this->bindMap as $entityClass => $classData) {
                $classKey = $entityClass::KEY;
                
                foreach ($classData as $column => $aliasName) {
                    $select[] = "{$column} AS {$classKey}{$aliasName}";
                }
            }
            
            return [
                'select' => $select,
                'where' => $this->dataToSearch,
            ];
        }
        
        /**
         * Возвращает данные для связки с другими сущностями (указанными в bindMap)
         *
         * @param array $elementsData
         * @return array
         */
        public function findBindingData(array $elementsData): array
        {
            $bindingData = [];
            
            foreach ($this->bindMap as $entityClass => $classBindData) {
                $classKey = $entityClass::KEY;
                $bindingData[$classKey] = [];
                
                foreach ($classBindData as $bindColumn) {
                    $bindValues = [];
                    $keyName = $classKey . $bindColumn;
                    
                    foreach ($elementsData as [$keyName => $bindValue]) {
                        if ($bindValue && !in_array($bindValue, $bindValues)) {
                            $bindValues[] = $bindValue;
                        }
                    }
                    
                    $bindingData[$classKey][$bindColumn] = $bindValues;
                }
            }
            
            return $bindingData;
        }
    }
    