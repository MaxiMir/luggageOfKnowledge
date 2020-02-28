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
        $el = new CIblockElement();
        updateProductsWithOffersPrice($productWithOffers, $el);
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
            
            $res = CPrice::GetList([], ["PRODUCT_ID" => $id, "CATALOG_GROUP_ID" => 1]);
            
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
     * @param $el
     * @param $iBlockID
     */
    function updateProductsWithOffersPrice($products, $el)
    {
        $updatedOffers = [];
        
        $res = $el->GetList(
            [],
            [
                "IBLOCK_ID" => OFFERS_I_BLOCK_ID,
                "PROPERTY_CML2_LINK" => array_keys($products)
            ],
            false,
            false,
            [
                "ID",
                "CATALOG_GROUP_1"
            ]
        );
        
        while ($offer = $res->Fetch()) {
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
    