<?php


	use Bitrix\Main\{Loader, Context};
	use Bitrix\Sale\{Basket, Fuser};

	Loader::includeModule("iblock");
	Loader::includeSharewareModule("forum");


	###### @ HELPERS @ ######

	### распечатываем любое количество аргументов ###
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


	### обрезаем строку на заданную длину с добавлением маркера ###
	function getTrimLine($str, $length = 100, $trimMarker = '...')
	{
		return mb_strimwidth($str, 0, $length, $trimMarker);
	}


	###  данные из кэша (при истекшем $timeSeconds - добавляет в кэш): ###
	function returnResultCache($timeSeconds, $cacheId, $funcName, $arCallbackParams = [])
	{
		$result = false;
		$obCache = new CPHPCache();
		$cachePath = '/' . SITE_ID . '/' . $cacheId;

		if ($obCache->InitCache($timeSeconds, $cacheId, $cachePath)) {
			$vars = $obCache->GetVars();
			$result = $vars['result'];
		} elseif ($obCache->StartDataCache()) {
			$result = $funcName($arCallbackParams);
			$obCache->EndDataCache(['result' => $result]);
		}

		return $result;
	}

	### массив данных из СSV файла: ###
	function getCSVData($fileName)
	{
		$csvData = [];

		if ( ! file_exists($fileName)) {
			die('Файл не найден');
		}

		$csvFile = new SplFileObject($fileName);

		while ( ! $csvFile->eof()) {
			try {
				$data = $csvFile->fgetcsv(';');

				if (empty($data[0])) {
					continue;
				}

				$csvData[] = $data;
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}

		return $csvData;
	}


	###### @ BREADCRUMBS @ ######

	###  CODE раздела || false: ###
	function getCurrentSection($urn)
	{
		$requestUrnData = explode('/', $urn);
		$urnData = array_filter($requestUrnData, function ($partUrb) {
			return $partUrb != '';
		});

		return end($urnData);
	}


	###  ID раздела по символьному коду: ###
	function getSectionIDByUrn($urn)
	{
		$code = getCurrentSection($urn);

		if ( ! $code) {
			return false;
		}

		$arSort = [];
		$arFilter = [
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			"CODE" => $code,
			"ACTIVE" => "Y",
		];

		$sectionDBData = CIBlockSection::GetList($arSort, $arFilter);

		if ($sectionData = $sectionDBData->Fetch()) {
			return $sectionData["ID"];
		}

		return false;
	}


	### проверяет на "искусственный" раздел: ###
	function isMadeSection($sectionID)
	{
		return in_array($sectionID, MADE_CATALOG_IDS);
	}


	###  ID родительского "искусственного" раздела || false: ###
	function getParentMadeSectionID($sectionID)
	{
		$arSort = [];
		$arSelect = [
			"ID",
			"UF_SHOW_IN_SECT_MENU",
		];
		$arFilter = [
			"ID" => $sectionID,
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			"GLOBAL_ACTIVE" => "Y",
		];

		$sectionDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

		if ($arSection = $sectionDBData->GetNext()) {
			return $arSection["UF_SHOW_IN_SECT_MENU"];
		}

		return false;
	}


	### подразделы с учетом "искусственных" разделов: ###
	function getSubsectionsData($sectionID, $excludedIDs = [])
	{
		$sectionsData = [];
		$isMadeSection = isMadeSection($sectionID);
		$keyFilterParentSection = $isMadeSection ? "UF_SHOW_IN_SECT_MENU" : "SECTION_ID";

		$arSort = [];
		$arSelect = [
			"ID",
			"NAME",
			"SECTION_PAGE_URL",
			"IBLOCK_SECTION_ID"
		];
		$arFilter = [
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			"GLOBAL_ACTIVE" => "Y",
			$keyFilterParentSection => $sectionID,
		];

		if ($excludedIDs) {
			$arFilter['!ID'] = $excludedIDs;
		}

		$sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

		while ($sectionData = $sectionsDBData->GetNext()) {
			$sectionsData[] = $sectionData;
		}

		return $sectionsData;
	}


	### данные раздела: ###
	function getSectionDataByID($sectionID)
	{
		$sectionDBData = CIBlockSection::GetByID($sectionID);

		return $sectionDBData->GetNext();
	}


	### данные элемента: ###
	function getElementDataByID($iBlockID, $elementID, $props = [])
	{
		if ( ! $props) {
			$elementDBData = CIBlockElement::GetByID($elementID);

			return $elementDBData->GetNext();
		}

		$arSelect = array_merge($props, ["ID", "IBLOCK_ID", "NAME"]);

		$arFilter = [
			"IBLOCK_ID" => $iBlockID,
			"ACTIVE" => "Y",
			"ID" => $elementID
		];

		$prodDBData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

		return $prodDBData->GetNext();
	}


	###### @ MAIN MENU AND LEFT MENU @ ######

	### данные для меню каталога (корневые разделы): ###
	function getMainCatalogLinks($isMainMenu = true)
	{
		global $APPLICATION;

		$arFilter = [
			"ACTIVE" => "Y",
		];

		if ($isMainMenu) {
			$arFilter["!UF_SHOW_MENU_CHILDS"] = false;
		}

		$isGetAssocArr = $isMainMenu ? false : true;

		$menuSectionsData = $APPLICATION->IncludeComponent(
			"adpro:menu.sections",
			"",
			[
				"AR_FILTER" => $arFilter,
				"IS_SEF" => "Y",
				"SEF_BASE_URL" => "/categories/",
				"SECTION_PAGE_URL" => "#SECTION_CODE_PATH#/",
				"DETAIL_PAGE_URL" => "#SECTION_CODE_PATH#/#ELEMENT_CODE#",
				"IBLOCK_TYPE" => "category",
				"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
				"CACHE_TYPE" => "A",
				"CACHE_TIME" => "1800",
				"GET_ASSOC_ARR" => $isGetAssocArr,
			],
			false
		);

		return $isMainMenu ? $menuSectionsData : linkCatalogLinks($menuSectionsData);
	}


	### привязывает "искусственные" разделы: ###
	function linkCatalogLinks($catalogLinksData)
	{
		return array_reduce($catalogLinksData, function ($acc, $linkData) {
			["ID" => $id, "UF_SHOW_IN_SECT_MENU" => $parentID] = $linkData;

			if ( ! $parentID) {
				if ( ! isset($acc[$id])) {
					$acc[$id] = [];
				}

				$acc[$id]["DATA"] = $linkData;
			} else {
				if ( ! isset($acc[$parentID])) {
					$acc[$parentID] = [];
					$acc[$parentID]['CHILD'] = [];
				}

				$acc[$parentID]['CHILD'][] = $linkData;
			}

			return $acc;
		}, []);
	}


	### данные для top меню каталога DEPTH 2,3: ###
	function getMadeCatalogChildLinks()
	{
		$menuData = [];
		$fromIBlockMap = [];
		$counter = 0;
		$arSort = [];
		$arSelect = [
			"ID",
			"NAME",
			"SECTION_PAGE_URL",
			"UF_SHOW_IN_SECT_MENU",
		];
		$arFilter = [
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			"!UF_SHOW_IN_SECT_MENU" => false,
			"GLOBAL_ACTIVE" => "Y",
			"ACTIVE" => "Y"
		];

		$sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

		while ($sectionData = $sectionsDBData->GetNext()) {
			[
				"ID" => $id,
				"NAME" => $name,
				"SECTION_PAGE_URL" => $sectionPageURL,
				"UF_SHOW_IN_SECT_MENU" => $parentSectionID,
			] = $sectionData;

			if ( ! isset($menuData[$parentSectionID])) {
				$menuData[$parentSectionID] = [];
				$fromIBlockMap[$parentSectionID] = ++$counter;
			}

			$fromBlock = $fromIBlockMap[$parentSectionID];

			$menuData[$parentSectionID][] = [
				$name,
				$sectionPageURL,
				[$sectionPageURL],
				[
					"FROM_IBLOCK" => $fromBlock,
					"IS_PARENT" => "",
					"DEPTH_LEVEL" => 2,
				],
			];

			$catalogLink3lvl = getMadeCatalogChildLinks3Lvl($id, $fromBlock);
			array_push($menuData[$parentSectionID], ...$catalogLink3lvl);
		}

		return $menuData;
	}


	### данные для top меню каталога DEPTH 3: ###
	function getMadeCatalogChildLinks3Lvl($sectionID, $fromBlock)
	{
		$menuData = [];
		$arSort = [];
		$arSelect = [
			"NAME",
			"SECTION_PAGE_URL",
		];
		$arFilter = [
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			"SECTION_ID" => $sectionID,
			"GLOBAL_ACTIVE" => "Y",
			"ACTIVE" => "Y"
		];

		$sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

		while ($sectionData = $sectionsDBData->GetNext()) {
			[
				"NAME" => $name,
				"SECTION_PAGE_URL" => $sectionPageURL,
			] = $sectionData;

			$menuData[] = [
				$name,
				$sectionPageURL,
				[$sectionPageURL],
				[
					"FROM_IBLOCK" => $fromBlock,
					"IS_PARENT" => "",
					"DEPTH_LEVEL" => 3,
				],
			];
		}

		return $menuData;
	}


	### полные данные для top меню каталога: ###
	function getCatalogTopMenuLinks()
	{
		$menuLinks = [];
		$catalogMainLinks = getMainCatalogLinks();
		$catalogSecondLinks = getMadeCatalogChildLinks();

		foreach ($catalogMainLinks as $linkData) {
			$sectionID = end($linkData);
			$menuLinks[] = $linkData;

			if ( ! array_key_exists($sectionID, $catalogSecondLinks)) {
				continue;
			}

			$childLinkData = $catalogSecondLinks[$sectionID];
			array_push($menuLinks, ...$childLinkData);
		}

		return $menuLinks;
	}


	### данные для left меню каталога DEPTH 2 (без "искусственных" разделов): ###
	function getCatalogChildLinks2Lvl($linksData)
	{
		$menuData = [];

		foreach ($linksData as $sectionID => $sectionData) {
			if ( ! isMadeSection($sectionID)) {
				$menuData[$sectionID] = getSubsectionsData($sectionID);
			}
		}

		return $menuData;
	}


	### добавляет данные по дочерним разделам: ###
	function appendCatalogChild($linksData, $childLinksData)
	{

		foreach ($childLinksData as $parentID => $childData) {
			if ( ! isset($linksData[$parentID])) {
				continue;
			}

			$linksData[$parentID]['CHILD'] = $childData;
		}

		return $linksData;
	}

	### полные данные для left меню каталога: ###
	function getCatalogLeftMenuLinks()
	{
		$linksData = getMainCatalogLinks(false);
		$childLinksData = getCatalogChildLinks2Lvl($linksData);

		return appendCatalogChild($linksData, $childLinksData);
	}


	### данные по брендам: ###
	function getBrands()
	{
		$brands = [];

		$arFilter = [
			"IBLOCK_ID" => BRAND_I_BLOCK_ID,
			'ACTIVE' => 'Y',
		];
		$arSelect = [
			'NAME',
			'DETAIL_PAGE_URL',
		];

		$res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

		while ($arFields = $res->GetNext()) {
			['NAME' => $NAME, 'DETAIL_PAGE_URL' => $DETAIL_PAGE_URL] = $arFields;

			$brands[] = compact('NAME', 'DETAIL_PAGE_URL');
		}

		return $brands;
	}


	### данные меню по брендам: ###
	function getBrandsLinks()
	{
		$brandLink = [
			[
				"Бренды",
				"/vendors/",
				["/vendors/"],
				[
					"FROM_IBLOCK" => 2,
					"IS_PARENT" => 1,
					"DEPTH_LEVEL" => 1,
				],
			],
		];

		$brands = getBrands();

		return array_reduce($brands, function ($acc, $linkData) {
			$acc[] = [
				$linkData['NAME'],
				$linkData['DETAIL_PAGE_URL'],
				[$linkData['DETAIL_PAGE_URL']],
				[
					"FROM_IBLOCK" => 2,
					"IS_PARENT" => "",
					"DEPTH_LEVEL" => 2,
				],
			];

			return $acc;
		}, $brandLink);
	}


	### данные меню: ###
	function getMenuLinks()
	{
		$aMenuLinksExt = getCatalogTopMenuLinks();
		$brandLinks = getBrandsLinks();

		return array_merge($aMenuLinksExt, $brandLinks);
	}


	###### @ REVIEWS @ ######

	### получаем SECTION_CODE раздела каталога: ###
	function getCurrentSectionCodeInReviews($urn)
	{
		$requestUrnData = explode('/', $urn);
		$urnData = array_filter($requestUrnData, function ($partUrb) {
			return $partUrb != '';
		});

		return count($urnData) != 2 ? '' : $urnData[2];
	}


	###  проверяем на необходимость сортировки по количеству отзывов к товару: ###
	function isSortByCount()
	{
		$request = Context::getCurrent()->getRequest();

		return $request->getQuery("sort") === "count";
	}


	###  товары выбранного раздела ###
	function getSectionProducts($sectionCode)
	{
		$productsData = [];

		$arFilter = [
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			'ACTIVE' => 'Y',
			"SECTION_CODE" => $sectionCode
		];
		$arSelect = [
			'ID',
			'NAME',
			'DETAIL_PAGE_URL',
			'PREVIEW_PICTURE',
		];

		$res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

		while ($prodData = $res->GetNext()) {
			[
				'ID' => $id,
				'NAME' => $name,
				'DETAIL_PAGE_URL' => $urn,
				'PREVIEW_PICTURE' => ['SRC' => $src],
			] = $prodData;

			$productsData[$id] = compact('id', 'name', 'urn', 'src');
		}

		return $productsData;
	}


	###  все разделы инфоблока: ###
	function getAllSections($params)
	{
		$sectionsData = [];
		$arSort = [];
		$functionName = __FUNCTION__;

		[
			"iBlockID" => $iBlockID,
			"arSelect" => $arSelect,
		]
			= $params;

		if ( ! $iBlockID) {
			throw new Exception("Необходимо передать iBlockID в {$functionName}!");
		}

		$arSelect = $arSelect ?? ["ID", "NAME", "SECTION_PAGE_URL"];

		$arFilter = [
			"IBLOCK_ID" => $iBlockID,
			"GLOBAL_ACTIVE" => "Y",
			"ACTIVE" => "Y"
		];

		$sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

		while ($sectionData = $sectionsDBData->Fetch()) {
			$sectionsData[] = $sectionData;
		}

		return $sectionsData;
	}


	###  данные товаров в нужном формате для работы с отзывами: ###
	function getProdsDataForResponse($itemsData)
	{
		return array_reduce($itemsData, function ($acc, $item) {
			[
				'ID' => $id,
				'NAME' => $name,
				'DETAIL_PAGE_URL' => $urn,
				'PREVIEW_PICTURE' => ['SRC' => $src],
			]
				= $item;

			$acc[$id] = compact('id', 'name', 'urn', 'src');

			return $acc;
		}, []);
	}


	###  данные отзывов с текущими товарами: ###
	function getResponseDataWithProds($itemsData)
	{
		$responsesData = [];
		$arSort = ["ID" => "DESC"];
		$productsID = array_keys($itemsData);
		$arFilter = [
			"FORUM_ID" => FORUM_ID,
			"APPROVED" => "Y",
			"@PARAM2" => $productsID,
		];

		$responseDBData = CForumMessage::GetListEx($arSort, $arFilter);

		while ($responseData = $responseDBData->Fetch()) {
			[
				"PARAM2" => $id,
				"AUTHOR_NAME" => $author,
				"POST_MESSAGE_HTML" => $message,
				"POST_DATE" => $postDate,
			]
				= $responseData;

			if ( ! array_key_exists($id, $responsesData)) {
				$responsesData[$id] = [];
				$responsesData[$id]['product'] = $itemsData[$id];
				$responsesData[$id]['response'] = compact('author', 'message', 'postDate');
				$responsesData[$id]['responseCount'] = -1;
			}

			$responsesData[$id]['responseCount']++;
		}

		return $responsesData;
	}


	### отсортированные по убыванию количества отзывов к товарам данные отзывов: ###
	function sortResponseDataWithProdsByCount($itemsData)
	{
		usort($itemsData, function ($a, $b) {
			return $b['responseCount'] - $a['responseCount'];
		});

		return $itemsData;
	}


	###  количество отзывов к товару: ###
	function getProductResponseCount($productID)
	{
		$arSort = [];
		$arFilter = [
			"FORUM_ID" => FORUM_ID,
			"APPROVED" => "Y",
			"@PARAM2" => $productID,
		];

		return CForumMessage::GetListEx($arSort, $arFilter, true);
	}


	### данные отзывов о товаре: ###
	function getProductResponseData($productID)
	{
		$prodResponses = [];
		$arSelect = [
			"ID",
			"IBLOCK_ID",
			"NAME",
			"PREVIEW_TEXT",
			"PROPERTY_USER_ID",
			"PROPERTY_USER_NAME",
			"PROPERTY_RATING",
			"PROPERTY_PRODUCT",
			"PROPERTY_CATALOG_SECTION"
		];
		$arFilter = [
			"IBLOCK_ID" => RESPONSE_I_BLOCK_ID,
			"ACTIVE" => "Y",
			"PROPERTY_PRODUCT" => $productID
		];

		$prodResponseDBData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

		while ($prodResponse = $prodResponseDBData->GetNext()) {
			$prodResponses[] = $prodResponse;
		}

		return $prodResponses;
	}


	### рейтинг товара: ###
	function getProductRating($productID)
	{
		$productResponseData = getProductResponseData($productID);
		$countResponses = sizeof($productResponseData);

		if ( ! $countResponses) {
			return;
		}

		$sumRating = array_reduce($productResponseData, function ($acc, $responseData) {
			['PROPERTY_RATING_VALUE' => $rating] = $responseData;

			return $acc + (int)$rating;
		}, 0);

		return round($sumRating / $countResponses, 2);
	}


	### @ FUNCTIONS WITH CACHE @ ###

	### данные меню из кэша: ###
	function getMenuLinksFromCache()
	{
		$cacheTime = 3600 * 6;
		$cacheID = "menuLinks";

		return returnResultCache($cacheTime, $cacheID, 'getMenuLinks');
	}

	### данные для left меню из кэша: ###
	function getCatalogLeftMenuLinksFromCache()
	{
		$cacheTime = 3600 * 6;
		$cacheID = "catalogLeftMenuLinks";

		return returnResultCache($cacheTime, $cacheID, 'getCatalogLeftMenuLinks');
	}


	###  все разделы из кэша: ###
	function getAllSectionsFromCache($params)
	{
		$cacheTime = 3600 * 6;
		$cacheID = "allCatalogSections";

		return returnResultCache($cacheTime, $cacheID, 'getAllSections',
			$params);
	}


	###  данные отзывов с текущими товарами из кэша: ###
	function getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode)
	{
		$cacheTime = 3600;
		$cacheID = "responseDataWithProds{$sectionCode}";

		return returnResultCache($cacheTime, $cacheID, 'getResponseDataWithProds', $prodsDataForResponse);
	}

	###  ID активных складов: ###
	function getStoresIDs()
	{
		$storesID = [];
		$arSelect = ["ID"];
		$arFilter = ["ACTIVE" => "Y"];
		$resStore = CCatalogStore::GetList([], $arFilter, false, false, $arSelect);

		while ($storeData = $resStore->Fetch()) {
			$storesID[] = $storeData['ID'];
		}

		return $storesID;
	}


	/**
	 * @param $productName
	 * @return null || ID товара
	 */
	function getProductIDByName($productName)
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
			$ID = $prodID;
		}

		return $ID;
	}

	/**
	 * Создание товара в корне
	 * @param $productName
	 * @return mixed ID товара в случае успеха || false
	 */
	function createProduct($productName)
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
	 * Пересчитывает корзину пользователя
	 */
	function saveBasket()
	{
		try {
			$basket = Basket::loadItemsForFUser(
				Fuser::getId(),
				Context::getCurrent()->getSite()
			);

			$basket->save();
		} catch (Exception $ex) {

		}
	}
