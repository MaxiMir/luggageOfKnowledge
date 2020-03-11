<?php
    
    # FILE: /local/components/bitrix/catalog.smart.filter/class.php
    
    class CBitrixCatalogSmartFilter extends CBitrixComponent
    {
        // ...
        
        /**
         * Возвращает ЧПУшные URN
         *
         * @param $url
         * @return array
         */
        public function getSmartURNs(string $url): array
        {
            $smartParts = [];
            
            foreach ($this->arResult["ITEMS"] as $arItem) {
                ['ID' => $id, 'VALUES' => $values, 'CODE' => $code, 'PRICE' => $price] = $arItem;
                
                if ($price || !$values) {
                    continue;
                }
                
                foreach ($values as ['URL_ID' => $urlID, 'CONTROL_ID' => $controlID]) {
                    $smartPartData = [];
                    $smartPartData[] = $code ? toLower($code) : $id;
                    $smartPartData[] = $urlID;
                    
                    $encSmartPart = implode('-is-', $smartPartData);
                    $filterURN = str_replace("#SMART_FILTER_PATH#", $encSmartPart, $url);
                    $smartParts[$controlID] = $filterURN;
                }
            }
            
            return $smartParts;
        }
        
        /**
         * Возвращает ЧПУшные URN из Sotbit Seo Meta (если установлен)
         * @param array $filterURNs
         * @return array
         */
        public function getSotbitSmartURNs(array $filterURNs): array
        {
            $sotbitURNs = [];
            $filterURNsList = '"' . implode('","', $filterURNs) . '"';
            
            $connection = Application::getConnection();
            $sql = "SELECT `REAL_URL`, `NEW_URL` FROM `air-vint.ru`.`b_sotbit_seometa_chpu` WHERE `REAL_URL` IN({$filterURNsList})";
            $dbData = $connection->query($sql);
            
            while (['REAL_URL' => $realURL, 'NEW_URL' => $newURL] = $dbData->fetch()) {
                $sotbitURNs[$realURL] = $newURL;
            }
            
            return $sotbitURNs;
        }
    }