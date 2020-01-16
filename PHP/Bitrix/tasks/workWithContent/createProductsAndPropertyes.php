<?php
    
    /**
     * Возвращает ID последнего добавленного товара
     *
     * @return mixed
     */
    function getLastAddProductID()
    {
        $select = ["ID"];
        $sort = ["id" => "DESC"];
        $limit = 1;
        $elementsSettings = compact("select", "sort", "limit");
        
        return getElements($elementsSettings)[0];
    }
    
    /**
     * Возвращает массив c ID свойства и его значениями
     *
     * @param $propCode
     * @param int $iBlockID
     * @return array
     */
    function getListPropData(string $propCode, int $iBlockID = IBLOCK_ID_CATALOG): array
    {
        $propID = false;
        $data = [];
        
        $prodID = getLastAddProductID();
        
        if ($prodID) {
            $resDB = CIBlockPropertyEnum::GetList([], ["IBLOCK_ID" => $iBlockID, "CODE" => $propCode]);
            
            while (['ID' => $id, 'PROPERTY_ID' => $propertyID, 'VALUE' => $value] = $resDB->Fetch()) {
                if (!$propID) {
                    $propID = $propertyID;
                }
                
                $data[$value] = $id;
            }
        }
        
        return compact("propID", "data");
    }
    
    /**
     * Создает новые значения свойств
     *
     * @param $propName
     * @param $newPropValues
     * @return int
     * @throws Exception
     */
    function createPropertiesValues(string $propName, array $newPropValues): int
    {
        $countNewProps = 0;
        ["propID" => $propID, "data" => $currentPropData] = getListPropData($propName);
        
        if (!$propID) {
            throw new Exception("Свойство {$propName} не найдено");
        }
        
        foreach ($newPropValues as $newPropValue) {
            if (!array_key_exists($newPropValue, $currentPropData)) {
                $newPropID = createPropertyValue($propID, $newPropValue);
                
                if (!$newPropID) {
                    throw new Exception("Свойство {$newPropValue} не было создано в: {$propName}");
                }
                
                $currentPropValues[$newPropValue] = $newPropID;
                ++$countNewProps;
            }
        }
        
        return $countNewProps;
    }
    
    /**
     *
     * @param $propID
     * @param $propValue
     * @return mixed
     */
    function createPropertyValue($propID, $propValue)
    {
        $ciBlockProp = new CIBlockPropertyEnum;
        
        return $ciBlockProp->Add(['PROPERTY_ID' => $propID, 'VALUE' => $propValue]);
    }
    
    /**
     * @param $elementsData
     * @return int
     * @throws Exception
     */
    function createProducts($elementsData)
    {
        $countNewProduct = 0;
        
        $propNameData = getListPropData("_NAME");
        $propAppData = getListPropData("APPLICABILITY");
        
        foreach ($elementsData as $elementData) {
            ['error' => $error] = createProduct($elementData, $propNameData, $propAppData);
            
            if ($error) {
                throw new Exception($error);
            }
            
            ++$countNewProduct;
        }
        
        return $countNewProduct;
    }
    
    /**
     * Создает товара
     *
     * @param $elementData
     * @param $propNameData
     * @param $propAppData
     * @return array
     */
    function createProduct($elementData, $propNameData, $propAppData)
    {
        $BRAND = 267;
        $sectionID = 544;
        
        ["data" => $propNames] = $propNameData;
        ["data" => $propApps] = $propAppData;
        [$PRODUCT_CODE, $name, $propName, $applicabilityList, $unused, $price] = $elementData;
        
        
        $code = transliterate($name);
        $_NAME = $propNames[$propName];
        $APPLICABILITY = _getApplicabilityIDs($applicabilityList, $propApps);
        
        $props = compact("PRODUCT_CODE", "BRAND", "_NAME", "APPLICABILITY");
        
        $productData = [
            "IBLOCK_ID" => IBLOCK_ID_CATALOG,
            "IBLOCK_SECTION" => $sectionID,
            "NAME" => $name,
            "CODE" => $code,
            "PROPERTY_VALUES" => $props,
            "ACTIVE" => "Y",
        ];
        
        $element = new CIBlockElement;
        
        if (!$prodID = $element->Add($productData)) {
            return ['isSuccess' => false, 'error' => "Error with {$name}:" . $element->LAST_ERROR];
        }
        
        $isPriceSet = setProductPrice($prodID, $price, "EUR");
        
        if (!$isPriceSet) {
            return ['isSuccess' => false, 'error' => "Error with {$name}: цена не была установлена"];
        }
        
        $isSetProductCount = setProductCount($prodID, 1);
        
        if (!$isSetProductCount) {
            return ['isSuccess' => false, 'error' => "Error with {$name}: количество товара не установлено"];
        }
        
        return ['isSuccess' => true, 'error' => null];
    }
    
    /**
     * Устанавливает цену товара
     *
     * @param $prodID
     * @param $price
     * @param string $currency
     * @return mixed
     */
    function setProductPrice($prodID, $price, $currency = "RUB")
    {
        $arFieldsPrice = [
            "PRODUCT_ID" => $prodID,
            "CATALOG_GROUP_ID" => 1,
            "PRICE" => $price,
            "CURRENCY" => $currency,
        ];
        
        return CPrice::Add($arFieldsPrice);
    }
    
    /**
     * Устанавливает количество товара
     *
     * @param $prodID
     * @param $prodCount
     * @return mixed
     */
    function setProductCount($prodID, $prodCount)
    {
        $arFields = [
            "ID" => $prodID,
            "QUANTITY" => $prodCount,
        ];
        
        return CCatalogProduct::Add($arFields);
    }
    
    /**
     * Возвращает транслит значения
     *
     * @param $value
     * @return mixed
     */
    function transliterate($value)
    {
        $params = [
            "max_len" => "100",
            "change_case" => "L",
            "replace_space" => "_",
            "replace_other" => "_",
            "delete_repeat_replace" => "true",
            "use_google" => "false",
        ];
        
        return $itemCode = CUtil::translit($value, "ru", $params);
    }
    
    
    //  @ HELPERS:
    function _getApplicabilityIDs($applicabilityList, $propApps)
    {
        $applicabilityData = explode("; ", $applicabilityList);
        
        return array_reduce($applicabilityData, function($acc, $name) use ($propApps) {
            $id = $propApps[$name];
            
            if (!in_array($id, $acc)) {
                $acc[] = $id;
            }
            
            return $acc;
        }, []);
    }
    