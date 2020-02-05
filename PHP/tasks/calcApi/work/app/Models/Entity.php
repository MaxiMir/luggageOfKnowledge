<?php
    
    namespace App\Models;
    
    use App\DB\Select;
    
    abstract class Entity implements EntityInterface
    {
        protected $entity;
        
        function __construct()
        {
            $namespace = get_class($this);
            $namespaceData = explode('\\', $namespace);
            
            $this->entity = array_pop($namespaceData);
        }
        
        /**
         *
         * @return string
         */
        public function getBindingColumn(): string
        {
            return 'ID';
        }
        
        /**
         *
         *
         * @param array $settings
         * @return array
         */
        public function find(array $settings): array
        {
            $services = new Select($this->entity, $settings);
            
            return $services->all();
        }
        
        /**
         *
         *
         * @param int $id
         * @param array $columns
         * @return array
         */
        public function findByID(int $id, array $columns = []): array
        {
            $settings = ['where' => ['ID' => $id]];
            
            if ($columns) {
                $settings['select'] = $columns;
            }
            
            $services = new Select($this->entity, $settings);
            
            return $services->all();
        }
        
        /**
         *
         *
         * @param string $value
         * @return array
         */
        public function findByBindingColumn(string $value): array
        {
            $bindingColumn = $this->getBindingColumn();
            
            return $this->find(['where' => [$bindingColumn => $value]]);
        }
        
        /**
         *
         *
         * @return array
         */
        public function findAll(): array
        {
            $services = new Select($this->entity);
            
            return $services->all();
        }
    }