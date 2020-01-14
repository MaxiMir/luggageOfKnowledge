<?php

	#@ УДАЛЕНИЕ ДУБЛЕЙ ТОВАРОВ + РЕДИРЕКТЫ:

	use h2o\Redirect\RedirectTable;

	require_once "{$_SERVER["DOCUMENT_ROOT"]}/bitrix/modules/main/include/prolog_before.php";
	
	[$origElementsWithDoubles, $doublesElements, $doubleElemCodes] = getCatalogDoublesData();

	[
		'toDel' => $toDelProducts,
		'toSave' => $toSaveProducts
	] = splitCatalogDoublesData($origElementsWithDoubles, $doublesElements, $doubleElemCodes);


	['errors' => $redirectError] = addRedirectsForCatalogDoubles($toDelProducts, $toSaveProducts, $doubleElemCodes);

	if ($redirectError) {
		echo "Error add redirect: <br>" . implode("<br>", $redirectError);
	}

	['errors' => $deleteErrors] = deleteCatalogDoubles($toDelProducts);

	if ($deleteErrors) {
		echo "Error delete elements: <br>" . implode("<br>", $deleteErrors);
	}

	if ( ! $redirectError && ! $deleteErrors) {
		echo 'Success';
	}
    
    /**
     * [
     *    данные по товарам, имеющими дубли,
     *    данные по дублями,
     *    символьные кода товаров
     * ]
     * @return array
     */
    function getCatalogDoublesData()
    {
        $origElements = [];
        $doublesElements = [];
        $arSort = [];
        $arFilter = [
            "IBLOCK_ID" => CATALOG_IBLOCK_ID,
            "ACTIVE" => "Y",
        ];
        $arSelect = [
            "ID",
            "NAME",
            "CODE",
            "DETAIL_PAGE_URL",
        ];
        
        $dbResElements = CIBlockElement::GetList($arSort, $arFilter, false, false, $arSelect);
        
        while ($elemData = $dbResElements->GetNext()) {
            [
                "ID" => $id,
                "NAME" => $name,
                "CODE" => $code,
                "DETAIL_PAGE_URL" => $urn,
            ] = $elemData;
            
            $isOrigElem = !array_key_exists($code, $origElements);
            $depth = substr_count($urn, '/') - 2;
            $elemData = compact('id', 'name', 'urn', 'depth');
            
            if ($isOrigElem) {
                $origElements[$code] = $elemData;
                continue;
            }
            
            $doublesElements[$code] = $elemData;
        }
        
        $doubleElemCodes = array_keys($doublesElements);
        $origElementsWithDoubles = array_filter($origElements, function ($key) use ($doubleElemCodes) {
            return in_array($key, $doubleElemCodes);
        }, ARRAY_FILTER_USE_KEY);
        
        return [$origElementsWithDoubles, $doublesElements, $doubleElemCodes];
    }
    
    /**
     * [
     *    'toDel' => данные товаров для удаления,
     *    'toSave' => данные товаров, которые оставляем
     * ] (исходя из глубины вложенности товара)
     * @param $origElementsWithDoubles
     * @param $doublesElements
     * @param $doubleElemCodes
     * @return mixed
     */
    function splitCatalogDoublesData($origElementsWithDoubles, $doublesElements, $doubleElemCodes)
    {
        return array_reduce($doubleElemCodes, function ($acc, $code) use ($origElementsWithDoubles, $doublesElements) {
            $origElement = $origElementsWithDoubles[$code];
            $doubleElement = $doublesElements[$code];
            ['depth' => $depthOrig] = $origElement;
            ['depth' => $depthDouble] = $doubleElement;
            
            $acc['toDel'][$code] = $depthOrig > $depthDouble ? $origElement : $doubleElement;
            $acc['toSave'][$code] = $depthOrig < $depthDouble ? $origElement : $doubleElement;;
            
            return $acc;
        }, ['toDel' => [], 'toSave' => []]);
    }
    
    /**
     * [
     * 'redirects' => данные по проставленным редиректам
     * 'errors' => не добавленные редиректы
     * ]
     * @param $toDelProducts
     * @param $toSaveProducts
     * @param $doubleElemCodes
     * @return array
     */
    function addRedirectsForCatalogDoubles($toDelProducts, $toSaveProducts, $doubleElemCodes)
    {
        $result = [
            'errors' => [],
            'redirects' => []
        ];
        
        foreach ($doubleElemCodes as $code) {
            ['urn' => $redirectFrom] = $toDelProducts[$code];
            ['urn' => $redirectTo] = $toSaveProducts[$code];
            
            if ($redirectFrom == $redirectTo) {
                continue;
            }
            
            $result['redirects'][] = "FROM: {$redirectFrom} TO: {$redirectTo}";
            
            $dbResAdd = h2o\Redirect\RedirectTable::add([
                "ACTIVE" => "Y",
                "REDIRECT_FROM" => $redirectFrom,
                "REDIRECT_TO" => $redirectTo,
                "IS_REGEXP" => "N",
            ]);
            
            $keyData = $dbResAdd ? 'redirects' : 'errors';
            
            $result[$keyData][] = "FROM: {$redirectFrom} TO: {$redirectTo}";
        }
        
        return $result;
    }
    
    /**
     * [
     * 'deletedIDs' => удаленные ID
     * 'errors' => не удаленные ID
     * ]
     * @param $toDelProducts
     * @return array
     */
    function deleteCatalogDoubles($toDelProducts)
    {
        $result = [
            'errors' => [],
            'deletedIDs' => []
        ];
        
        foreach ($toDelProducts as $delProduct) {
            ['id' => $id] = $delProduct;
            
            $resDel = CIBlockElement::Delete($id);
            $keyData = $resDel ? 'deletedIDs' : 'errors';
            
            $result[$keyData][] = $id;
        }
        
        return $result;
    }