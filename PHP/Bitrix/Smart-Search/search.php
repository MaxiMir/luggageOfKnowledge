<?
	 // FILE: /ajax/search.php:
	 use Bitrix\Main\{Loader, Context};
	 
	 require_once "{$_SERVER["DOCUMENT_ROOT"]}/bitrix/modules/main/include/prolog_before.php";
	 
	 const CATALOG_I_BLOCK_ID = 28;
	 const LIMIT_SECTIONS_IN_SEARCH_LIST = 3;
	 const LIMIT_ELEMENT_IN_SEARCH_LIST = 20;
	 
	 $context = Context::getCurrent();
	 $request = $context->getRequest();
	 
	 
	 ['q' => $searchPhrase, "action" => $action] = $request->getQueryList()->toArray();
	 
	 if (!$searchPhrase && $action !== "AJAX_SEARCH") {
		  return;
	 }
	 
	 Loader::includeModule("iblock");
	 
	 [$sectionsData, $sectionCount] = getSectionsData($searchPhrase);
	 $productIDs = getProductsID($searchPhrase);
	 $productCount = sizeof($productIDs);
	 
	 
	 $APPLICATION->IncludeComponent(
		 "adpro:catalog.section",
		 "ajax",
		 [
			 "IDS" => $productIDs,
			 "PRODUCT_COUNT" => $productCount,
			 "SECTIONS_DATA" => $sectionsData,
			 "SECTIONS_COUNT" => $sectionCount,
			 "SEARCH_PHRASE" => $searchPhrase,
			 "LIMIT" => LIMIT_ELEMENT_IN_SEARCH_LIST,
		 ]
	 );
	 
	 
	 /**
	  * @param $searchPhrase
	  * @return array
	  */
	 function getSectionsData($searchPhrase)
	 {
		  $arSections = [];
		  
		  $obSection = new CIBlockSection();
		  
		  $dbRes = $obSection->GetList(
			  [],
			  [
				  "NAME" => "%{$searchPhrase}%",
				  "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
				  "ACTIVE" => "Y"
			  ],
			  false,
			  [
				  "ID",
				  "NAME",
				  "SECTION_PAGE_URL"
			  ]
		  );
		  
		  while ($sectionData = $dbRes->GetNext()) {
				$arSections[] = $sectionData;
		  }
		  
		  $countSections = sizeof($arSections);
		  $returnSections = array_slice($arSections, 0, LIMIT_SECTIONS_IN_SEARCH_LIST);
		  
		  return [
			  $returnSections,
			  $countSections
		  ];
	 }
	 
	 /**
	  * @param $searchPhrase
	  * @return array
	  */
	 function getProductsID($searchPhrase)
	 {
		  $arElements = [];
		  
		  $obElement = new CIBlockElement();
		  
		  $dbRes = $obElement->GetList(
			  [],
			  [
				  "NAME" => "%{$searchPhrase}%",
				  "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
				  "ACTIVE" => "Y"
			  ],
			  false,
			  false,
			  [
				  "ID"
			  ]
		  );
		  
		  while (["ID" => $elemID] = $dbRes->Fetch()) {
				$arElements[] = $elemID;
		  }
		  
		  return $arElements;
	 }