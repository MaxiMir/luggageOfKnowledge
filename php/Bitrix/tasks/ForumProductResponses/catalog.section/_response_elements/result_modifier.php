<?
    
    [
        "ITEMS" => $items,
        "SECTION_CODE" => $sectionCode
    ] = $arResult;
    
    [
        "ADDITIONAL_DATA" => [
            "isSortByCount" => $isSortByCount
        ]
    ] = $arParams;
    
    if (!$items) {
        return;
    }
    
    $prodsDataForResponse = getProdsDataForResponse($items);
    $responseDataWithProds = getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode);
    
    $arResult['ITEMS'] = !$isSortByCount ? $responseDataWithProds : sortResponseDataWithProdsByCount($responseDataWithProds);
