<?php
    
    namespace app\Controllers;
    
    use Exception;
    use app\Models\{MEntity, PriceCost};
    
    class CEntity implements CEntityInterface, DataForJsonInterface
    {
        public const ModelsNamespace = 'app\Models\\';
        
        /**
         * Данные по привязкам моделей
         *
         * @var array
         */
        private $bindingMap;
        
        /**
         * Инстанс модели
         *
         * @var MEntity
         */
        private $model;
        
        /**
         * Данные по привязкам текущей модели
         *
         * @var array
         */
        private $bindingDataToSearch;
        
        /**
         * Фильтровые данные для элементов модели
         *
         * @var array
         */
        private $entityDataToSearch;
        
        /**
         * Найденные элементы
         *
         * @var array
         */
        private $elements;
        
        /**
         * CEntity constructor.
         *
         * @param string $modelName
         * @param array $bindingMap
         * @param array|null $entityDataToSearch
         * @throws Exception
         */
        function __construct(string $modelName, array $bindingMap, ?array $entityDataToSearch)
        {
            $this->model = self::getModelInstance($modelName);
            $bindKey = $this->model::KEY;
            $this->bindingMap = $bindingMap;
            $this->bindingDataToSearch = $bindingMap[$bindKey] ?? [];
            $this->entityDataToSearch = $entityDataToSearch ?? [];
            $this->elements = $this->getElements();
        }
        
        /**
         * Возвращает элементы модели
         *
         * @return array
         */
        public function getElements(): array
        {
            $bindingDataToSearch = $this->bindingDataToSearch;
            
            if ($this->model instanceof PriceCost) {
                $bindingDataToSearch = array_merge($this->entityDataToSearch, $bindingDataToSearch);
            }
            
            return !$bindingDataToSearch ?
                $this->model->findAll()
                :
                $this->model->find($bindingDataToSearch);
        }
        
        /**
         * Возвращает данные модели для JSON
         *
         * @return array
         */
        public function getDataForJson(): array
        {
            $dataForJson = $this->model->getDataForJson($this->entityDataToSearch);
            $dataForJson['elements'] = $this->elements;
            
            return $dataForJson;
        }
        
        /**
         * Возвращает элементы для связывания для BindingMap
         *
         * @return array
         */
        public function getElementsForBindingMap(): array
        {
            if ($this->model instanceof PriceCost) {
                return $this->model->find($this->bindingDataToSearch);
            }
            
            if (!$this->entityDataToSearch) {
                return $this->elements;
            }
            
            $fullDataToSearch = array_merge($this->bindingDataToSearch, $this->entityDataToSearch);
            
            return $this->model->find($fullDataToSearch);
        }
        
        /**
         * Возвращает данные по привязкам с учетом текущей модели
         *
         * @return array
         */
        public function getNewBindingMap(): array
        {
            $elementsForBindingMap = $this->getElementsForBindingMap();
            $newBindData = $this->model->findBindingData($elementsForBindingMap);
            
            return array_merge($this->bindingMap, $newBindData);
        }
        
        /**
         * Преобразует часть urn в название модели
         * @param $urnName
         * @return string
         */
        static function urnToModelName($urnName): string
        {
            $entityNameParts = explode('-', $urnName);
            
            return array_reduce($entityNameParts, function ($acc, $namePart) {
                $acc .= ucfirst($namePart);
                
                return $acc;
            }, '');
        }
        
        /**
         * Возвращает инстанс модели
         *
         * @param string $className
         * @return MEntity
         * @throws Exception
         */
        static function getModelInstance(string $className): MEntity
        {
            $modelClass = self::ModelsNamespace . $className;
            
            if (!class_exists($modelClass)) {
                throw new Exception("Class {$className} not found");
            }
            
            return new $modelClass;
        }
        
        /**
         * Преобразует массив в массив с названиями моделей и заполняет данными
         *
         * @param array $parsedBody
         * @return array
         * @throws Exception
         */
        static function convertToModelData(array $parsedBody): array
        {
            $offset = 1;
            $countEntities = sizeof($parsedBody);
            $modelsData = [
                'Services' => [],
                'CalcSettings' => [],
                'PriceName' => [],
                'PriceCost' => [],
                'PriceParam2' => [],
                'PriceParam1' => [],
                'MatTypes' => [],
                'Materials' => [],
                'MatFormats' => [],
            ];
            
            foreach ($parsedBody as $className => $id) {
                if (!array_key_exists($className, $modelsData)) {
                    throw new Exception("Class {$className} not found");
                }
                
                if (!$id) {
                    continue;
                }
                
                $modelsData[$className] = ['ID' => $id];
                
                if ($className === 'PriceParam1') {
                    $modelsData['PriceCost']['param1ID'] = $id;
                }
                
                if ($className === 'PriceParam2') {
                    $modelsData['PriceCost']['param2ID'] = $id;
                }
            }
            
            if (!empty($modelsData['Services'])) { // первый блок выбран
                $offset = $countEntities < 3 ? $countEntities + 1 : $countEntities + 2;
            }
            
            return array_slice($modelsData, 0, $offset, true);
        }
    }

