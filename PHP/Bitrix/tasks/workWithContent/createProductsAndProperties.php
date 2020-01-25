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
    function getListProp(string $propCode, int $iBlockID = IBLOCK_ID_CATALOG): array
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
    function createPropertyValues(string $propName, array $newPropValues): int
    {
        $countNewProps = 0;
        ["propID" => $propID, "data" => $currentPropData] = getListProp($propName);
        
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
        
        $propNameData = getListProp("_NAME");
        $propAppData = getListProp("APPLICABILITY");
        
        foreach ($elementsData as $elementData) {
            $prodCount = 1;
            $imgPathData = [__DIR__, 'img'];
            
            ["data" => $propNames] = $propNameData;
            ["data" => $propApps] = $propAppData;
            [$imgName, $PRODUCT_CODE, $name, $propName, $applicabilityList, $BRAND, $price, $sectionList] = $elementData;
            
            // Картинка
            $imgPathData[] = $imgName;
            $imgPath = implode(DIRECTORY_SEPARATOR, $imgPathData);
            $imgData = CFILE::MakeFileArray($imgPath);
            
            // Символьный код:
            $code = transliterate($name);
            
            // Разделы
            $sectionIDs = explode("|", $sectionList);
            
            // Свойства:
            $_NAME = $propNames[$propName];
            $APPLICABILITY = _getPropIDs($applicabilityList, $propApps);
            $props = compact("PRODUCT_CODE", "BRAND", "_NAME", "APPLICABILITY");
            
            $mainData = [
                "ACTIVE" => "Y",
                "IBLOCK_ID" => IBLOCK_ID_CATALOG,
                "IBLOCK_SECTION" => $sectionIDs,
                "NAME" => $name,
                "CODE" => $code,
                "PROPERTY_VALUES" => $props,
                "DETAIL_PICTURE" => $imgData,
                "PREVIEW_PICTURE" => $imgData,
            ];
            
            ['error' => $error] = createProduct($mainData, $prodCount, $price);
            
            if ($error) {
                throw new Exception($error);
            }
            
            ++$countNewProduct;
        }
        
        return $countNewProduct;
    }
    
    /**
     * Создает товар
     *
     * @param $mainData
     * @param int $prodCount
     * @param null $price
     * @return array
     */
    function createProduct($mainData, $prodCount = 1, $price = null)
    {
        $errors = [];
        ["NAME" => $name] = $mainData;
        
        $element = new CIBlockElement;
        
        if (!$prodID = $element->Add($mainData)) {
            return ['isSuccess' => false, 'error' => "Ошибка с {$name}:" . $element->LAST_ERROR];
        }
        
        if ($price && !setProductPrice($prodID, $price, "EUR")) {
            $errors[] = "Ошибка с {$name}: цена не была установлена";
        }
        
        if ($prodCount && !setProductCount($prodID, 1)) {
            $errors[] = "Ошибка с {$name}: количество товара не установлено";
        }
        
        return ['isSuccess' => empty($errors), 'error' => implode('<br>', $errors)];
    }
    
    /**
     * Возвращает код ценового предложения
     * @param $prodID
     * @param $priceTypeID
     * @return mixed
     */
    function getPriceOfferCode($prodID, $priceTypeID)
    {
        $priceDB = CPrice::GetList(
            [],
            ["PRODUCT_ID" => $prodID, "CATALOG_GROUP_ID" => $priceTypeID]
        );
        
        ['ID' => $id] = $priceDB->Fetch();
        
        return $id;
    }
    
    /**
     * Устанавливает|Обновляет цену товара
     *
     * @param $prodID
     * @param $price
     * @param string $currency
     * @param bool $isAdd
     * @return mixed
     */
    function setProductPrice($prodID, $price, $currency = "RUB", $isAdd = true)
    {
        $catalogGroupID = 1;
        
        $formattedPrice = str_replace(',', '.', $price);
        
        $arFieldsPrice = [
            "PRODUCT_ID" => $prodID,
            "CATALOG_GROUP_ID" => $catalogGroupID,
            "PRICE" => $formattedPrice,
            "CURRENCY" => $currency,
        ];
        
        if ($isAdd) {
            return CPrice::Add($arFieldsPrice);
        }
        
        $priceOfferCode = getPriceOfferCode($prodID, $catalogGroupID);
        
        return CPrice::Update($priceOfferCode, $arFieldsPrice);
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
            "max_len" => "110",
            "change_case" => "L",
            "replace_space" => "-",
            "replace_other" => "_",
            "delete_repeat_replace" => "true",
            "use_google" => "false",
        ];
        
        return $itemCode = CUtil::translit($value, "ru", $params);
    }
    
    
    //  @ HELPERS:
    function _accumulateValues($elementsData, $propNum, $delimiter = '|')
    {
        $props = array_reduce($elementsData, function ($acc, $elementData) use ($propNum, $delimiter) {
            $propList = explode($delimiter, $elementData[$propNum]);
            array_push($acc, ...$propList);
            
            return $acc;
        }, []);
        
        return array_unique($props);
    }
    
    function _getPropIDs($propList, $propApps, $delimiter = '|')
    {
        $propValues = explode($delimiter, $propList);
        
        return array_reduce($propValues, function ($acc, $name) use ($propApps) {
            $id = $propApps[$name];
            
            if (!in_array($id, $acc)) {
                $acc[] = $id;
            }
            
            return $acc;
        }, []);
    }
    
    