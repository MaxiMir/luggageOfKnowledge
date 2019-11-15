<?
	 
	 use \Bitrix\Main\{Application, Context, Loader};
	 
	 Loader::includeModule("iblock");
	 Loader::includeModule("search");
	 
	 
	 // #@ Параметры:
	 const START_SEARCH_PATH_URI = "/search/?";
	 const CATALOG_I_BLOCK = "iblock_1c_catalog";
	 const CATALOG_I_BLOCK_ID = 28;
	 const HL_FILTER_PROPS_ID = 80;
	 const COMPONENT = "product";
	 
	 $sortedSectionsData = [];
	 $productFilterData = [];
	 
	 
	 $generateURIWithClosure = generateURI();
	 $requestPageData = getRequestPageData();
	 
	 [
		 "searchPhrase" => $searchPhrase,
		 "pageNum" => $pageNum,
		 "viewProductNum" => $viewProductNum,
		 "sortName" => $sortName,
		 "sortData" => $sortData,
		 "filterBrandIDs" => $filterBrandIDs,
		 "filterCategoryID" => $filterCategoryID
	 ] = $requestPageData;
	 
	 
	 $productDBResult = getProductDBData($searchPhrase);
	 [$allProductIDs, $sectionsData, $brandsData] = getPageData($productDBResult, $generateURIWithClosure);
	 
	 if ($allProductIDs) {
		  $sortedSectionsData = sortSectionData($sectionsData, $searchPhrase);
		  $productFilterData = getFilteredProductIDs($allProductIDs, $brandsData, $requestPageData);
	 }
	 
	 /**
	  * @param $requestSort
	  * @return array массив данных для сортировки товаров
	  */
	 function getProductSortArr($requestSort)
	 {
		  $sortArr = ["SORT" => "ASC"];
		  
		  if ($requestSort) {
				if ($requestSort == 'price-desc') {
					 $sortArr = ["CATALOG_PRICE_3" => "DESC", "CATALOG_PRICE_4" => "DESC"];
				} elseif ($requestSort == 'price-asc') {
					 $sortArr = ["CATALOG_PRICE_3" => "ASC", "CATALOG_PRICE_4" => "ASC"];
				}
		  }
		  
		  return $sortArr;
	 }
	 
	 
	 /**
	  * @return array [
	  *   поисковая фраза
	  *   номер страницы
	  *   количество товаров на странице
	  *   название сортировки
	  *   данные по сортировке
	  *   ID фильтровых брендов
	  *   ID фильтрого раздела
	  * ]
	  */
	 function getRequestPageData()
	 {
		  $request = Context::getCurrent()->getRequest();
		  
		  $searchPhrase = $request["q"];
		  $pageNum = $request["PAGEN_1"] ?? 1;
		  $viewProductNum = $request["VIEW"] ?? 12;
		  $sortName = $request["SORT"];
		  $sortData = getProductSortArr($request["SORT"]);
		  $filterBrandIDsString = $request["BRAND"] ?? "";
		  $filterCategoryID = $request["CATEGORY"];
		  
		  $pageNum = (int)$pageNum;
		  $viewProductNum = (int)$viewProductNum;
		  $filterCategoryID = (int)$filterCategoryID;
		  $filterBrandIDs = !$filterBrandIDsString ? [] : explode("-", $filterBrandIDsString);
		  
		  return compact("searchPhrase", "pageNum", "viewProductNum", "sortName", "sortData", "filterBrandIDs",
			  "filterCategoryID");
	 }
	 
	 
	 /**
	  * @return Closure [
	  *   "add" - добавление Query Params в URI
	  *   по дефолту возвращает текущий URI
	  * ]
	  */
	 function generateURI()
	 {
		  $request = Context::getCurrent()->getRequest();
		  $queryData = $request->getQueryList()->toArray();
		  
		  $buildURN = function ($queryData) {
				return array_reduce(array_keys($queryData), function ($acc, $keyData) use ($queryData) {
					 $valueData = $queryData[$keyData];
					 $value = !is_array($valueData) ? $valueData : implode('-', $valueData);
					 
					 return "{$acc}&{$keyData}={$value}";
				}, START_SEARCH_PATH_URI);
		  };
		  
		  return function ($data = [], $fn = null) use ($queryData, $buildURN) {
				switch ($fn) {
					 case "add":
						  $newQueryData = array_merge($queryData, $data);
						  return $buildURN($newQueryData);
					 default:
						  return $buildURN($queryData);
				}
		  };
	 }
	 
	 
	 /**
	  * @param $searchPhrase
	  * @return array - массив найденных ID
	  */
	 function searchItems($searchPhrase)
	 {
		  $foundItems = [];
		  
		  $obSearch = new \CSearch();
		  $obSearch->Search([
			  "QUERY" => $searchPhrase,
			  "SITE_ID" => LANG,
			  "PARAM2" => CATALOG_I_BLOCK_ID,
			  "MODULE_ID" => "iblock",
		  ]);
		  
		  while (["ITEM_ID" => $id] = $obSearch->GetNext()) {
				$foundItems[] = $id;
		  }
		  
		  return $foundItems;
	 }
	 
	 
	 /**
	  * @param $searchPhrase
	  * @return mixed - CDBResult c товарами по поисковой фразе
	  */
	 function getProductDBData($searchPhrase)
	 {
		  $selectedData = ["ID", "IBLOCK_SECTION_ID", "PROPERTY_CML2_MANUFACTURER"];
		  
		  $prodFilter = [
			  "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			  "NAME" => "%{$searchPhrase}%",
			  "SECTION_ACTIVE" => "Y",
			  "ACTIVE" => "Y"
		  ];
		  
		  return CIBlockElement::getList([], $prodFilter, false, false, $selectedData);
	 }
	 
	 
	 /**
	  * @param $allProductIDs
	  * @param $brandsData
	  * @param $requestPageData
	  * @param $withPagination
	  * @return array - массив с отфильтрованными и отсортированными ID товаров
	  */
	 function getFilteredProductIDs($allProductIDs, $brandsData, $requestPageData, $withPagination = true)
	 {
		  $filteredIDs = [];
		  
		  [
			  "sortData" => $sortData,
			  "filterBrandIDs" => $filterBrandIDs,
			  "filterCategoryID" => $filterCategoryID,
			  "pageNum" => $pageNum,
			  "viewProductNum" => $viewProductNum,
		  ] = $requestPageData;
		  
		  $prodFilter = [
			  "IBLOCK_ID" => CATALOG_I_BLOCK_ID
		  ];
		  
		  if ($filterBrandIDs) {
				foreach ($filterBrandIDs as $brandID) {
					 $filterSymbolCode = $brandsData[$brandID]["SYMBOL_CODE"];
					 $prodFilter["PROPERTY_CML2_MANUFACTURER"][$filterSymbolCode] = $brandID;
				}
		  }
		  
		  if ($filterCategoryID) {
				$prodFilter["SECTION_ID"] = $filterCategoryID;
		  }
		  
		  $selectedData = ["ID", "IBLOCK_SECTION_ID"];
		  
		  $productDBResult = CIBlockElement::getList($sortData, $prodFilter, false, false, $selectedData);
		  
		  while (["ID" => $id] = $productDBResult->fetch()) {
				if (in_array($id, $allProductIDs)) {
					 $filteredIDs[] = $id;
				}
		  }
		  
		  if ($withPagination) {
				$filteredIDs = array_slice($filteredIDs, ($pageNum - 1) * $viewProductNum, $viewProductNum);
		  }
		  
		  return ["ITEM_ID" => $filteredIDs];
	 }
	 
	 
	 /**
	  * @param $filterBrandIDs
	  * @return mixed - символный код свойства фильтра из HL блока
	  */
	 function getFilterPropSymbolCode($filterBrandIDs)
	 {
		  ["DATA" => $hlData, "TABLE" => $hlTable] = get_hlblock_data(HL_FILTER_PROPS_ID);
		  
		  $resultData = $hlData::getList([
			  "order" => [],
			  "filter" => ["UF_ID" => $filterBrandIDs],
			  "limit" => false,
			  "select" => ["UF_CODE", "UF_ID"]
		  ]);
		  
		  $resultDBData = new CDBResult($resultData, $hlTable);
		  
		  ["UF_CODE" => $symbolCode] = $resultDBData->Fetch();
		  
		  return $symbolCode;
	 }
	 
	 
	 /**
	  * @param $productDBResult
	  * @param $generateURIWithClosure
	  * @return array [
	  *   [ID товаров]
	  *   [ID раздела => [название, URN, количество товаров]],
	  *   [ID бренда => [название, количество товаров, символьный код]]
	  * ]
	  */
	 function getPageData($productDBResult, $generateURIWithClosure)
	 {
		  $allProductIDs = [];
		  $sectionsData = [];
		  $brandsData = [];
		  
		  if (!$productDBResult || !$productDBResult->SelectedRowsCount()) {
				return [$allProductIDs, $sectionsData, $brandsData];
		  }
		  
		  while ($arItem = $productDBResult->Fetch()) {
				[
					"ID" => $prodID,
					"IBLOCK_SECTION_ID" => $sectionID,
					"PROPERTY_CML2_MANUFACTURER_VALUE" => $brandName,
					"PROPERTY_CML2_MANUFACTURER_ENUM_ID" => $brandID
				] = $arItem;
				
				# данные по товарам:
				$allProductIDs[] = $prodID;
				
				# данные по разделам:
				if (!array_key_exists($sectionID, $sectionsData)) {
					 ["NAME" => $sectionName] = getSectionByID($sectionID);
					 $sectionSearchURN = $generateURIWithClosure(["CATEGORY" => $sectionID], "add");
					 
					 $sectionsData[$sectionID] = [
						 "NAME" => $sectionName,
						 "URN" => $sectionSearchURN,
						 "PRODUCTS_COUNT" => 0,
					 ];
				}
				
				$sectionsData[$sectionID]["PRODUCTS_COUNT"]++;
				
				if (!$brandID || !$brandName) {
					 continue;
				}
				
				# данные по брендам:
				if (!array_key_exists($brandID, $brandsData)) {
					 $brandSymbolCode = getFilterPropSymbolCode($brandID);
					 
					 if (!$brandSymbolCode) {
						  continue;
					 }
					 
					 $brandsData[$brandID] = ["NAME" => $brandName, "COUNT" => 0, "SYMBOL_CODE" => $brandSymbolCode];
				}
				
				$brandsData[$brandID]["COUNT"]++;
		  }
		  
		  return [$allProductIDs, $sectionsData, $brandsData];
	 }
	 
	 
	 /**
	  * @param $sectionID
	  * @return mixed - Данные о разделе
	  */
	 function getSectionByID($sectionID)
	 {
		  $resDB = CIBlockSection::GetByID($sectionID);
		  
		  return $resDB->GetNext();
	 }
	 
	 
	 /**
	  * @param $sectionsData
	  * @param $searchPhrase
	  * @return mixed - отсортированный по ключу NAME и $searchPhrase многомерный массив
	  */
	 function sortSectionData($sectionsData, $searchPhrase)
	 {
		  uasort($sectionsData, function ($first, $second) use ($searchPhrase) {
				return !stristr($first['NAME'], $searchPhrase) && stristr($second['NAME'], $searchPhrase) ? 1 : -1;
		  });
		  
		  return $sectionsData;
	 }
