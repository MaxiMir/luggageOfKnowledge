<?php
    
    #@ Замена значений в свойствах #@
    
    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
    require_once "./helper.php";
    
    #1:
    const SPARES_SECTION_ID = 544;
    const FILE_SPARES = "spares.csv";
    
    $SELECT = ["ID", "NAME", "PROPERTY_*"];
    $FILTER = ["SECTION_ID" => SPARES_SECTION_ID];
    $fileSparesFullPath = __DIR__ . DIRECTORY_SEPARATOR . FILE_SPARES;
    
    $products = getProducts(compact("SELECT", "FILTER"));
    $properties = getIBlockProperties();
    $preparedData = prepareProductDataForCSV($products, $properties);
    
    writeInCSV($preparedData, $fileSparesFullPath);
    
    
    #2:
    $replacePropData = [
        "vysota_mm" => [" мм", ""],
        "dlina_mm" => [" мм", ""],
        "massa_kg" => [" кг", ""],
        "uroven_shuma_db" => [" дБ", ""],
        "chastota_napryazheniya_gts" => [" Гц", ""],
        "shirina_mm" => [" мм", ""],
    ];
    
    replaceInProductsProps($replacePropData);
    
    
    
    
    
    /**
     * Абстракция над GetList
     *
     *
     * @param array $params
     * @return array
     */
    function getProducts(array $params): array
    {
        $products = [];
        $arFilterDefault = [
            "ACTIVE" => "Y",
            "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
            "INCLUDE_SUBSECTIONS" => "Y"
        ];
        
        ["SELECT" => $arSelect, "FILTER" => $arFilter] = $params;
        
        $arSelect = $arSelect ?: ["*"];
        $arFilter = !$arFilter ? $arFilterDefault : array_replace($arFilterDefault, $arFilter);
        
        $productDBData = CIBlockElement::Getlist([], $arFilter, false, false, $arSelect);
        
        while ($product = $productDBData->GetNext()) {
            $products[] = $product;
        }
        
        return $products;
    }
    
    /**
     *
     * @param int $iBlockID
     * @param bool $getAllData
     * @return array
     */
    function getIBlockProperties($iBlockID = CATALOG_I_BLOCK_ID, $getAllData = false)
    {
        $properties = [];
        
        $propertiesDataDB = CIBlockProperty::GetList([], ["IBLOCK_ID" => $iBlockID]);
        
        while ($property = $propertiesDataDB->GetNext()) {
            if ($getAllData) {
                $properties[] = $property;
                continue;
            }
            
            ['CODE' => $CODE, 'NAME' => $NAME, "ID" => $ID] = $property;
            $properties[$ID] = compact("NAME", "CODE");
        }
        
        return $properties;
    }
    
    /**
     * Заменяет содержимое свойства
     * @param $replacePropData
     */
    function replaceInProductsProps($replacePropData)
    {
        foreach ($replacePropData as $propName => [$search, $replace]) {
            $propNameInUpCase = mb_strtoupper($propName);
            
            $SELECT = ["ID", "PROPERTY_{$propNameInUpCase}"];
            $FILTER = ["!PROPERTY_{$propNameInUpCase}" => false];
            
            $products = getProducts(compact("SELECT", "FILTER"));
            
            foreach ($products as $product) {
                ["ID" => $id, "PROPERTY_{$propNameInUpCase}_VALUE" => $propValue] = $product;
                $el = new CIBlockElement;
                
                $newPropValue = str_replace($search, $replace, $propValue);
                
                if ($id && $newPropValue) {
                    $el->SetPropertyValuesEx($id, CATALOG_I_BLOCK_ID, [$propName => $newPropValue]);
                }
            }
        }
    }
    
    /**
     * @param $products
     * @param $properties
     * @return array
     */
    function prepareProductDataForCSV($products, $properties)
    {
        $productsData = [];
        $firstColumnDefaultData = ["ID", "НАЗВАНИЕ"];
        $secondColumnDefaultData = ["ID", "NAME"];
        
        [$firstColumnData, $secondColumnData] = array_reduce($properties, function ($acc, $property) {
            ["CODE" => $code, "NAME" => $name] = $property;
            $acc[0][] = $name;
            $acc[1][] = $code;
            
            return $acc;
        }, [$firstColumnDefaultData, $secondColumnDefaultData]);
        
        $propsCode = array_map(function ($key) {
            return "PROPERTY_{$key}";
        }, array_keys($properties));
        
        foreach ($products as $key => $product) {
            $productsData[$key] = [];
            
            foreach ([$secondColumnDefaultData, $propsCode] as $step => $key) {
                $propValue = $product[$key];
                
                if ($step === 1) {
                    $propValue = !is_array($propValue) ? $propValue : "МАССИВ: " . implode(", ", $propValue);
                }
                
                $productsData[$key][] = $propValue;
            }
        }
        
        return array_merge($firstColumnData, $secondColumnData, ...$productsData);
    }
    
    
    
    
    