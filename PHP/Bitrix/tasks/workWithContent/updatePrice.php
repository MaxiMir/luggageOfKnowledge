<?php
    
    declare(strict_types=1);
    
    use Bitrix\Main\Loader;
    
    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
    
    Loader::includeModule('iblock');
    
    
    const CATALOG_I_BLOCK_ID = 2;
    const OFFERS_I_BLOCK_ID = 3;
    
    $select = [
        'ID',
        'IBLOCK_ID',
        'CATALOG_GROUP_1'
    ];
    $filter = [
        [
            "LOGIC" => "AND",
            ["!PROPERTY_PROPERTY_manufacturer_con" => 320], # Royal Canin
            ["!PROPERTY_PROPERTY_manufacturer_con" => 112041], # Karmy
            ["!PROPERTY_PROPERTY_manufacturer_con" => 114115], # Brooksfield
            ["!PROPERTY_PROPERTY_manufacturer_con" => 455], # Monge
            ["!PROPERTY_PROPERTY_manufacturer_con" => 112041], # Karmy
            ["!PROPERTY_PROPERTY_manufacturer_con" => 520], # Grandorf
            ["!PROPERTY_PROPERTY_manufacturer_con" => 517], # NOW
            ["!PROPERTY_PROPERTY_manufacturer_con" => 402], # GO! Natural
        ]
    ];
    
    $settings = compact('select', 'filter');
    $products = getElements($settings);
    $productIDs = array_keys($products);
    $existOffers = getExistOffers($productIDs);
    $splitProducts = splitProducts($products, $existOffers);
    
    #1 БЕЗ ТП:
    $productWithOutOffers = $splitProducts['withoutOffers'];
    
    if ($productWithOutOffers) {
        updateProductsWithOutOffersPrice($productWithOutOffers);
    }
    
    #2 С ТП:
    $productWithOffers = $splitProducts['withOffers'];
    
    if ($productWithOffers) {
        updateProductsWithOffersPrice($productWithOffers);
    }
    
    
    
    
    /**
     * Распечатка для дебага
     *
     * @param mixed ...$args
     */
    function dbg(...$args)
    {
        echo '<pre>';
        
        foreach ($args as $arg) {
            $type = gettype($arg);
            
            echo "TYPE: {$type}<br>";
            print_r($arg);
        }
        
        echo '</pre>';
    }
    
    
    /**
     * Абстракция для выборки элементов ИБ
     *
     * @param array $params
     * @return array
     */
    function getElements(array $params): array
    {
        $elements = [];
        $filterDefault = [
            "ACTIVE" => "Y",
            "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        ];
        
        $select = $params["select"] ?? ["*"];
        $filter = !$params["filter"] ? $filterDefault : array_replace($filterDefault, $params["filter"]);
        $sort = $params["sort"] ?? [];
        $limit = !$params["limit"] ? false : ["nPageSize" => $params["limit"]];
        
        $productDBData = CIBlockElement::Getlist($sort, $filter, false, $limit, $select);
        
        while ($element = $productDBData->Fetch()) {
            $isSingleColumnQuery = sizeof($select) === 1 && $select !== ["*"];
            $elementData = !$isSingleColumnQuery ? $element : $element[$select[0]];
            
            if (isset($element['ID'])) {
                $elements[$element['ID']] = $elementData;
                continue;
            }
            
            $elements[] = $elementData;
        }
        
        return $elements;
    }
    
    
    /**
     * Получает соответствие товара и наличия у него ТП.
     *
     * @param array $productsID
     * @return mixed
     */
    function getExistOffers(array $productsID)
    {
        return CCatalogSKU::getExistOffers($productsID);
    }
    
    /**
     * Разделяет товары на с ТП и без
     *
     * @param array $products
     * @param array $existOffers
     * @return array
     */
    function splitProducts(array $products, array $existOffers): array
    {
        $result = ['withOffers' => [], 'withoutOffers' => []];
        
        foreach ($products as $id => $product) {
            $keyName = $existOffers[$id] ? 'withOffers' : 'withoutOffers';
            $result[$keyName][$id] = $product;
        }
        
        return $result;
    }
    
    /**
     * Обновляет цены товаров без ТП
     *
     * @param $products
     */
    function updateProductsWithOutOffersPrice(array $products)
    {
        foreach ($products as $id => $product) {
            $price = $product["CATALOG_PRICE_1"];
            $currency = $product["CATALOG_CURRENCY_1"];
            
            if (!$price) {
                continue;
            }
            
            $newPrice = $price - ($price * 7 / 100);
            $formatPrice = round($newPrice);
            
            $arFields = [
                "PRODUCT_ID" => $id,
                "CATALOG_GROUP_ID" => 1,
                "PRICE" => $formatPrice,
                "CURRENCY" => $currency
            ];
            
            $res = CPrice::GetList([], [ "PRODUCT_ID" => $id, "CATALOG_GROUP_ID" => 1 ]);
            
            if ($arr = $res->Fetch()) {
                CPrice::Update($arr["ID"], $arFields);
                
                file_put_contents("updatedPriceProductWithOut.txt", "{$id} \n",
                    FILE_APPEND);
            }
        }
    }
    
    /**
     * Обновляет цены торговых предложений
     *
     * @param $products
     */
    function updateProductsWithOffersPrice($products)
    {
        $updatedOffers = [];
        
        $filter = ["IBLOCK_ID" => OFFERS_I_BLOCK_ID, "PROPERTY_CML2_LINK" => array_keys($products)];
        $select = ['ID', "CATALOG_GROUP_1"];
        $settings = compact('filter', 'select');
        $offers = getElements($settings);
        
        foreach ($offers as $offer) {
            $price = $offer["CATALOG_PRICE_1"];
            
            if (!$price || in_array($offer["ID"], $updatedOffers)) {
                continue;
            }
            
            $currency = $offer["CATALOG_CURRENCY_1"];
            $newPrice = $price - ($price * 7 / 100);
            $formatPrice = round($newPrice);
            
            $arFields = [
                "PRODUCT_ID" => $offer["ID"],
                "CATALOG_GROUP_ID" => 1,
                "PRICE" => $formatPrice,
                "CURRENCY" => $currency
            ];
            
            $resPrice = CPrice::GetList(
                [],
                [
                    "PRODUCT_ID" => $offer["ID"],
                    "CATALOG_GROUP_ID" => 1
                ]
            );
            
            if ($arr = $resPrice->Fetch()) {
                CPrice::Update($arr["ID"], $arFields);
                file_put_contents("updatedPriceOffers.txt", "{$offer["ID"]} \n",
                    FILE_APPEND);
            }
        }
    }