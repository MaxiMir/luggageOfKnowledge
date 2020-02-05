<?php
    
    namespace App\Controllers;
    
    use App\Models\{Services, CalcSettings, PriceName};
    
    class Entity
    {
        const ModelsNamespace = 'App\Models\\';
        
        /**
         *
         * @param string $urnName
         * @return string
         */
        static function getClass(string $urnName): string
        {
            $entityNameParts = explode('-', $urnName);
            $entityNameData = array_reduce($entityNameParts, function ($acc, $namePart) {
                if ($namePart) {
                    $acc[] = ucfirst($namePart);
                }
            
                return $acc;
            }, [ self::ModelsNamespace ]);
        
            return implode('', $entityNameData);
        }
    
        /**
         *
         *
         * @param $urnData
         * @return array
         * @throws Exception
         */
        static function transformToEntities(array $urnData): array
        {
            $entitiesData = [];
        
            foreach ($urnData as $urnName => $urnValue) {
                $entityClass = self::getClass($urnName);
            
                if (!class_exists($entityClass)) {
                    throw new Exception("Class {$entityClass} not found");
                }
            
                $entityInstance = new $entityClass();
                
                if (!$urnValue) {
                    $entitiesData[$entityClass] = $entityInstance->findAll();
                    continue;
                }
            
                $entitiesData[$entityClass] = $entityInstance->findByBindingColumn($urnValue);
            
                if ($entityInstance instanceof Services) {
                    $calcSettings = new CalcSettings();
                    $calcSettingsData = $calcSettings->findByBindingColumn($urnValue);
                    $entitiesData[CalcSettings::class] = $calcSettingsData;
                }
                
            }
        
            return $entitiesData;
        }
    }