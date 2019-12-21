<?php
	 declare(strict_types=1);

	 use \Bitrix\Main\{Application, Context, Loader};
	 
	 Loader::includeModule("iblock");
	 Loader::includeModule("search");
	 
	 const CATALOG_I_BLOCK_ID = 28;
	 const OFFERS_I_BLOCK_ID = 29;
	 const HL_FILTER_PROPS_ID = 80;
	 
	 
	 /**
	  * Возвращает текущий Request
	  * @return mixed
	  */
	 function getRequest(): Bitrix\Main\HttpRequest
	 {
		  return $request = Context::getCurrent()->getRequest();
	 }
	 
	 
	 /**
	  *   Возвращает замыкание для дальнейшей работы с URN
	  *   $fnName:
	  *   "add" - добавление в URN
	  *   "remove" - удаление из URN
	  *   по дефолту возвращает текущий URN
	  *
	  * @param $request
	  * @return Closure
	  */
	 function generateURN(Bitrix\Main\HttpRequest $request): closure
	 {
		  $queryData = $request->getQueryList()->toArray();
		  $initialValue = $request->getRequestedPageDirectory() . "/?";
		  $currentData = $queryData;
		  
		  $buildURN = function ($currentData) use ($initialValue) {
				$currentData = array_reduce(array_keys($currentData), function ($acc, $keyData) use ($currentData) {
					 $valueData = $currentData[$keyData];
					 
					 if ($valueData) {
						  $value = !is_array($valueData) ? $valueData : implode('-', $valueData);
						  $acc[] = "{$keyData}={$value}";
					 }
					 
					 return $acc;
				}, []);
				
				return $initialValue . implode("&", $currentData);
		  };
		  
		  return function (array $data = [], $fnName = null) use ($currentData, $buildURN) {
				switch ($fnName) {
					 case "add":
						  $newQueryData = array_merge($currentData, $data);
						  return $buildURN($newQueryData);
					 case "delete":
						  $newQueryData = array_diff_key($currentData, array_flip($data));
						  return $buildURN($newQueryData);
					 default:
						  return $buildURN($currentData);
				}
		  };
	 }
	 
	 
	 /**
	  * Массив данных для сортировки товаров
	  * @param $requestSort
	  * @return array
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
	  * [
	  *   поисковая фраза
	  *   номер страницы
	  *   количество товаров на странице
	  *   название сортировки
	  *   данные по сортировке
	  *   ID фильтровых брендов
	  *   ID фильтрого раздела
	  * ]
	  * @param $request
	  * @return array
	  */
	 function getRequestPageData(Bitrix\Main\HttpRequest $request): array
	 {
		  $searchPhrase = $request["q"];
		  $pageNum = $request["PAGEN_2"] ?? 1;
		  $viewProductNum = $request["VIEW"] ?? 12;
		  $sortName = $request["SORT"];
		  $sortData = getProductSortArr($request["SORT"]);
		  $filterBrandIDsString = $request["BRAND"] ?? "";
		  $filterCategoryID = $request["CATEGORY"];
		  $isAjax = $request["AJAX"];
		  
		  $pageNum = (int) $pageNum;
		  $viewProductNum = (int) $viewProductNum;
		  $filterCategoryID = (int) $filterCategoryID ?: null;
		  $filterBrandIDs = !$filterBrandIDsString ? [] : explode("-", $filterBrandIDsString);
		  
		  return compact(
			  "searchPhrase", "pageNum", "viewProductNum", "sortName",
			  "sortData", "filterBrandIDs", "filterCategoryID", "isAjax"
		  );
	 }
	 
	 
	 /**
	  * CDBResult c товарами по поисковой фразе с учетом фильтров
	  * @param $requestPageData
	  * @return mixed
	  */
	 function getProductDBData($requestPageData): CIBlockResult
	 {
		  [
			  "searchPhrase" => $searchPhrase,
			  "filterBrandIDs" => $filterBrandIDs,
			  "filterCategoryID" => $filterCategoryID,
		  ] = $requestPageData;
		  
		  $selectedData = ["ID", "IBLOCK_SECTION_ID", "PROPERTY_CML2_MANUFACTURER"];
		  
		  $prodFilter = [
			  "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			  "NAME" => "%{$searchPhrase}%",
			  "SECTION_ACTIVE" => "Y",
			  "ACTIVE" => "Y"
		  ];
		  
		  # фильтрация по разделу:
		  if ($filterCategoryID) {
				$prodFilter["SECTION_ID"] = $filterCategoryID;
		  }
		  
		  # фильтрация по брендам:
		  if ($filterBrandIDs) {
				$prodFilter["PROPERTY_CML2_MANUFACTURER"] = array_flip(getBrandsSymbolCode($filterBrandIDs));
		  }
		  
		  return CIBlockElement::getList([], $prodFilter, false, false, $selectedData);
	 }
	 
	 
	 /**
	  * [
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
	  * @param $productDBResult
	  * @param $generateURNWithClosure
	  * @return array
	  */
	 function getPageData(CIBlockResult $productDBResult, closure $generateURNWithClosure): array
	 {
		  $productIDs = [];
		  $sectionsData = [];
		  $brandsData = [];
		  
		  if (!$productDBResult || !$productDBResult->SelectedRowsCount()) {
				return [$productIDs, $sectionsData, $brandsData];
		  }
		  
		  while ($arItem = $productDBResult->Fetch()) {
				[
					"ID" => $prodID,
					"IBLOCK_SECTION_ID" => $sectionID,
					"PROPERTY_CML2_MANUFACTURER_VALUE" => $brandName,
					"PROPERTY_CML2_MANUFACTURER_ENUM_ID" => $brandID
				] = $arItem;
				
				# данные по товарам:
				$productIDs[] = $prodID;
				
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
		  
		  return [$productIDs, $sectionsData, $brandsData];
	 }
	 
	 
	 /**
	  * Массив c ID и символьным кодом брендов
	  * @param $brandsID
	  * @param $inArray
	  * @return mixed
	  */
	 function getBrandsSymbolCode(array $brandsID, $inArray = true)
	 {
		  ["DATA" => $hlData, "TABLE" => $hlTable] = get_hlblock_data(HL_FILTER_PROPS_ID);
		  
		  $resultData = $hlData::getList([
			  "order" => [],
			  "filter" => ["UF_ID" => $brandsID],
			  "limit" => false,
			  "select" => ["ID", "UF_CODE", "UF_ID"]
		  ]);
		  
		  $cdbResult = new CDBResult($resultData, $hlTable);
		  
		  if (!$inArray) {
				return $cdbResult;
		  }
		  
		  $brandsData = [];
		  
		  while (["UF_ID" => $brandID, "UF_CODE" => $symbolCode] = $cdbResult->Fetch()) {
				$brandsData[$brandID] = $symbolCode;
		  }
		  
		  return $brandsData;
	 }
	 
	 
	 /**
	  * добаляет ключ NAME с названием раздела [
	  *    ID раздела => [
	  *       URN => поисковый URN раздела,
	  *       COUNT - количество найденных товаров,
	  *       NAME - название раздела
	  *    ]
	  * ]
	  * @param $sectionsData
	  * @return mixed
	  */
	 function addSectionNames(array $sectionsData): array
	 {
		  $arSort = [];
		  $arSelect = ["ID", "NAME"];
		  $sectionsID = array_keys($sectionsData);
		  $arFilter = ['IBLOCK_ID' => CATALOG_I_BLOCK_ID, "ID" => $sectionsID];
		  
		  $dbResult = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);
		  
		  while (["ID" => $id, "NAME" => $name] = $dbResult->Fetch()) {
				$sectionsData[$id]["NAME"] = $name;
		  }
		  
		  return $sectionsData;
	 }
	 
	 
	 /**
	  * Добаляет ключ SYMBOL_CODE с кодом бренда [
	  *    ID бренда => [
	  *       NAME => название бренда
	  *       COUNT => количество найденных товаров,
	  *       SYMBOL_CODE => код свойства
	  *    ]
	  * ]
	  * @param $brandsData
	  * @return mixed
	  */
	 function addBrandsSymbolCode(array $brandsData): array
	 {
		  $brandsID = array_keys($brandsData);
		  $resultDBData = getBrandsSymbolCode($brandsID, false);
		  
		  while (["UF_ID" => $brandID, "UF_CODE" => $symbolCode] = $resultDBData->Fetch()) {
				$brandsData[$brandID]["SYMBOL_CODE"] = $symbolCode;
		  }
		  
		  return $brandsData;
	 }
	 
	 
	 /**
	  * Возвращает отсортированный по ключу NAME и $searchPhrase многомерный массив
	  * @param $sectionsData
	  * @param $searchPhrase
	  * @return mixed
	  */
	 function sortSectionData(array $sectionsData, string $searchPhrase): array
	 {
		  if (!$sectionsData) {
				return $sectionsData;
		  }
		  
		  uasort($sectionsData, function ($first, $second) use ($searchPhrase) {
				return !stristr($first['NAME'], $searchPhrase) && stristr($second['NAME'], $searchPhrase) ? 1 : -1;
		  });
		  
		  return $sectionsData;
	 }
	 
	 
	 /**
	  * Возвращает количество товаров отфильтрованных по бренду и разделам
	  * @param $filterBrandIDs
	  * @param $brandsDataWithSymbolCode
	  * @return mixed
	  */
	 function getBrandProductCount(array $filterBrandIDs, array $brandsDataWithSymbolCode): int
	 {
		  return array_reduce($filterBrandIDs, function ($acc, $brandID) use ($brandsDataWithSymbolCode) {
				return $acc + $brandsDataWithSymbolCode[$brandID]["COUNT"];
		  }, 0);
	 }
	 
	 /**
	  * Возвращает стоимость 1 EUR
	  */
	 function getEurPrice()
	 {
		  ["AMOUNT" => $amount] = CCurrency::GetByID('EUR');
		  return $amount;
	 }
	 
	 
	 /**
	  * Возвращает отсортированные данные товаров c ТП для текущей страницы
	  * @param $productID
	  * @param $requestPageData
	  * @return array
	  */
	 function getProductDataForCurrPage($productID, $requestPageData)
	 {
		  $arrProducts = [];

		  [
			  "sortData" => $sortData,
			  "pageNum" => $pageNum,
			  "viewProductNum" => $viewProductNum,
		  ] = $requestPageData;

		  // some logic...

		  return $arrProducts;
	 }
	 
	 
	 /**
	  * Возвращает массив найденных ID элементов по поисковой фразе
	  * @param $searchPhrase
	  * @return array
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
	 
	 
	 /**
	  * Возвращает относительный путь до изображения ТП || false
	  * @param $prodID
	  * @return mixed
	  */
	 function getOfferImage(string $prodID)
	 {
		  $offerImageSrc = false;
		  $imageSettings = [
			  ['width' => 400, 'height' => 400],
			  BX_RESIZE_IMAGE_EXACT,
			  true
		  ];
		  
		  $result_offers = CIBlockElement::GetList(
			  ["propertysort_DEFAULT" => "DESC", "CATALOG_PRICE_3" => "ASC", "CATALOG_PRICE_4" => "ASC"],
			  [
				  "IBLOCK_ID" => OFFERS_I_BLOCK_ID,
				  "ACTIVE" => "Y",
				  "PROPERTY_CML2_LINK" => $prodID,
				  "!DETAIL_PICTURE" => false
			  ],
			  false,
			  ["nTopCount" => 1],
			  ["*"]
		  );
		  
		  if (["DETAIL_PICTURE" => $offerDetailImage] = $result_offers->GetNext()) {
				["src" => $offerImageSrc] = CFile::ResizeImageGet($offerDetailImage, ...$imageSettings);
		  }
		  
		  return $offerImageSrc;
	 }
	 
	 
	 /**
	  * Возвращает относительный путь до изображения товара
	  * @param array $arItem
	  * @return string
	  */
	 function getProductImage(array $arItem): string
	 {
		  $imageSrc = false;
		  $imageSettings = [
			  ['width' => 400, 'height' => 400],
			  BX_RESIZE_IMAGE_EXACT,
			  true
		  ];
		  
		  [
			  "ID" => $prodID,
			  "DETAIL_PICTURE" => $detailImage,
		  ] = $arItem;
		  
		  if ($detailImage) {
				["src" => $imageSrc] = CFile::ResizeImageGet($detailImage, ...$imageSettings);
		  }
		  
		  if (!$imageSrc) {
				$imageSrc = getOfferImage($prodID);
		  }
		  
		  return $imageSrc ?: '/upload/images/no-photo.png';
	 }