<?php
    
    /**
     * Возвращет ID товара по имени
     *
     * @param string $productName
     * @return null
     */
    function getProductIDByName(string $productName)
    {
        $ID = null;
        $arrProdFilter = [
            "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
            "NAME" => $productName,
        ];
        $arrSelect = [
            "ID"
        ];
        
        $resDB = CIBlockElement::GetList([], $arrProdFilter, false, ['nTopCount' => 1], $arrSelect);
        
        while (["ID" => $prodID] = $resDB->Fetch()) {
            return $prodID;
        }
        
        return $ID;
    }
    
    /**
     * Создание товара в корне
     *
     * @param $productName
     * @return array
     */
    function createProduct(string $productName): array
    {
        $productData = [
            "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
            "NAME" => $productName,
            "IBLOCK_SECTION_ID" => false,
            "ACTIVE" => "Y",
        ];
        
        $element = new CIBlockElement;
        $productID = $element->Add($productData);
        
        return $productID ?
            ["isError" => false, "ID" => $productID]
            :
            [
                "isError" => true,
                "msg" => $element->LAST_ERROR
            ];
    }
    
    
    /**
     * Возвращет ФИО и ID свойства ИМЯ
     *
     * @param $orderID
     * @return array
     */
    function getFullNameData($orderID): array
    {
        $propNameID = null;
        $name = null;
        $lastName = null;
        
        $rsProp = CSaleOrderPropsValue::GetList([], ['ORDER_ID' => $orderID]);
        
        while ($arProp = $rsProp->Fetch()) {
            ['ID' => $propID, 'CODE' => $propCode, 'VALUE' => $propValue] = $arProp;
            
            $isName = $propCode == 'FIO' || $propCode == 'NAME_UR';
            $isLastName = $propCode == 'LAST_NAME' || $propCode == 'LASTNAME_UR';
            
            $propValueTrimmed = trim($propValue);
            
            if ($isLastName) {
                $lastName = $propValueTrimmed;
            } elseif ($isName) {
                $propNameID = $propID;
                $name = $propValueTrimmed;
            }
        }
        
        $fullName = "{$lastName} {$name}";
        
        return compact('fullName', 'propNameID');
    }