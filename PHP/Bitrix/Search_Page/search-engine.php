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
	 
	 
	 $request = getRequest();
	 $generateURNWithClosure = generateURN($request);
	 $urnWithoutBrand = $generateURNWithClosure(["BRAND"], "delete");
	 $requestPageData = getRequestPageData($request);
	 
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
	 [$allProductIDs, $sectionsData, $brandsData] = getPageData($productDBResult, $generateURNWithClosure);
	 
	 $sectionsDataWithNames = addSectionNames($sectionsData);
	 $brandsDataWithSymbolCode = addBrandsSymbolCode($brandsData);
	 $countBrandProducts = getBrandProductCount($filterBrandIDs, $brandsDataWithSymbolCode);
	 
	 if ($allProductIDs) {
		  $sortedSectionsData = sortSectionData($sectionsDataWithNames, $searchPhrase);
		  $productFilterData = getFilteredProductIDs($allProductIDs, $brandsDataWithSymbolCode, $requestPageData);
	 }
	 
	 
	 
	 
	 /**
	  * @return mixed возвращает текущий Request
	  */
	 function getRequest(): Bitrix\Main\HttpRequest
	 {
		  return $request = Context::getCurrent()->getRequest();
	 }
	 
	 
	 /**
	  * @param $request
	  * @return Closure [
	  *   "add" - добавление в URN
	  *   "remove" - удаление из URN
	  *   по дефолту возвращает текущий URN
	  * ]
	  */
	 function generateURN(Bitrix\Main\HttpRequest $request): closure
	 {
		  $queryData = $request->getQueryList()->toArray();
		  
		  $buildURN = function ($queryData) {
				return array_reduce(array_keys($queryData), function ($acc, $keyData) use ($queryData) {
					 $valueData = $queryData[$keyData];
					 $value = !is_array($valueData) ? $valueData : implode('-', $valueData);
					 
					 return "{$acc}&{$keyData}={$value}";
				}, START_SEARCH_PATH_URI);
		  };
		  
		  return function (array $data = [], $fnName = null) use ($queryData, $buildURN) {
				switch ($fnName) {
					 case "add":
						  $newQueryData = array_merge($queryData, $data);
						  return $buildURN($newQueryData);
					 case "delete":
						  $newQueryData = array_diff_key($queryData, array_flip($data));
						  return $buildURN($newQueryData);
					 default:
						  return $buildURN($queryData);
				}
		  };
	 }
	 
	 
	 /**
	  * @param $requestSort
	  * @return array массив данных для сортировки товаров
	  */
	 function getProductSortArr($requestSort): array
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
	  * @param $request
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
	 function getRequestPageData(Bitrix\Main\HttpRequest $request): array
	 {
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
	  * @param $searchPhrase
	  * @return mixed - CDBResult c товарами по поисковой фразе
	  */
	 function getProductDBData(string $searchPhrase): CIBlockResult
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
	  * @param $productDBResult
	  * @param $generateURNWithClosure
	  * @return array - [
	  *   [ID товаров]
	  *   [ID раздела => [
	  *       URN => поисковый URN раздела,
	  *       COUNT => количество найденных товаров
	  *   ]],
	  *   [ID бренда => [
	  *       NAME => название бренда,
	  *       COUNT => количество найденных товаров
	  *    ]]
	  * ]
	  */
	 function getPageData(CIBlockResult $productDBResult, closure $generateURNWithClosure): array
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
					 $sectionSearchURN = $generateURNWithClosure(["CATEGORY" => $sectionID], "add");
					 
					 $sectionsData[$sectionID] = [
						 "URN" => $sectionSearchURN,
						 "COUNT" => 0,
					 ];
				}
				
				$sectionsData[$sectionID]["COUNT"]++;
				
				if (!$brandID || !$brandName) {
					 continue;
				}
				
				# данные по брендам:
				if (!array_key_exists($brandID, $brandsData)) {
					 $brandsData[$brandID] = ["NAME" => $brandName, "COUNT" => 0];
				}
				
				$brandsData[$brandID]["COUNT"]++;
		  }
		  
		  return [$allProductIDs, $sectionsData, $brandsData];
	 }
	 
	 
	 /**
	  * @param $sectionsData
	  * @return mixed - добаляет ключ NAME с названием раздела [
	  *    ID раздела => [
	  *       URN => поисковый URN раздела,
	  *       COUNT - количество найденных товаров,
	  *       NAME - название раздела
	  *    ]
	  * ]
	  */
	 function addSectionNames(array $sectionsData): array
	 {
		  $arSort = [];
		  $arSelect = ["ID", "NAME"];
		  $arFilter = ['IBLOCK_ID' => CATALOG_I_BLOCK_ID, "ID" => array_keys($sectionsData)];
		  
		  $dbResult = \CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);
		  
		  while(["ID" => $id, "NAME" => $name] = $dbResult->Fetch()) {
				$sectionsData[$id]["NAME"] = $name;
		  }
		  
		  return $sectionsData;
	 }
	 
	 
	 /**
	  * @param $brandsData
	  * @return mixed добаляет ключ SYMBOL_CODE с кодом бренда [
	  *    ID бренда => [
	  *       NAME => название бренда
	  *       COUNT => количество найденных товаров,
	  *       SYMBOL_CODE => код свойства
	  *    ]
	  * ]
	  */
	 function addBrandsSymbolCode(array $brandsData): array
	 {
		  ["DATA" => $hlData, "TABLE" => $hlTable] = get_hlblock_data(HL_FILTER_PROPS_ID);
		  
		  $resultData = $hlData::getList([
			  "order" => [],
			  "filter" => ["UF_ID" => array_keys($brandsData)],
			  "limit" => false,
			  "select" => ["ID", "UF_CODE", "UF_ID"]
		  ]);
		  
		  $resultDBData = new CDBResult($resultData, $hlTable);
		  
		  while (["UF_ID" => $brandID, "UF_CODE" => $symbolCode] = $resultDBData->Fetch()) {
				$brandsData[$brandID]["SYMBOL_CODE"] = $symbolCode;
		  }
		  
		  return $brandsData;
	 }
	 
	 
	 /**
	  * @param $sectionsData
	  * @param $searchPhrase
	  * @return mixed - отсортированный по ключу NAME и $searchPhrase многомерный массив
	  */
	 function sortSectionData(array $sectionsData, string $searchPhrase): array
	 {
		  uasort($sectionsData, function ($first, $second) use ($searchPhrase) {
				return !stristr($first['NAME'], $searchPhrase) && stristr($second['NAME'], $searchPhrase) ? 1 : -1;
		  });
		  
		  return $sectionsData;
	 }
	 
	 
	 /**
	  * @param $allProductIDs
	  * @param $brandsData
	  * @param $requestPageData
	  * @param $withPagination
	  * @return array - массив с отфильтрованными и отсортированными ID товаров
	  */
	 function getFilteredProductIDs(array $allProductIDs, array $brandsData, array $requestPageData, bool $withPagination = true): array
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
	  * @param $brandsDataWithSymbolCode
	  * @return mixed - возвращает количество товаров отфильтрованных по бренду
	  */
	 function getBrandProductCount(array $filterBrandIDs, array $brandsDataWithSymbolCode): int
	 {
		  return array_reduce($filterBrandIDs, function ($acc, $brandID) use ($brandsDataWithSymbolCode) {
				return $acc + $brandsDataWithSymbolCode[$brandID]["COUNT"];
		  }, 0);
	 }
	 
	 
	 /**
	  * @param $searchPhrase
	  * @return array - массив найденных ID
	  */
	 function searchItems(string $searchPhrase): array
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
