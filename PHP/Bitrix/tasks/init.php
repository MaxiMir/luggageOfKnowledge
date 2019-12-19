<?php


	use Bitrix\Main\{Loader, Context};
	use Bitrix\Sale\{Basket, Fuser};

	Loader::includeModule("iblock");
	Loader::includeSharewareModule("forum");


	###### @ HELPERS @ ######

	/**
	 * Распечатываем любое количество аргументов
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
	 * Обрезаем строку на заданную длину с добавлением маркера
	 * @param $str
	 * @param int $length
	 * @param string $trimMarker
	 * @return string
	 */
	function getTrimLine($str, $length = 100, $trimMarker = '...')
	{
		return mb_strimwidth($str, 0, $length, $trimMarker);
	}


	/**
	 * Данные из кэша (при истекшем $timeSeconds - добавляет в кэш)
	 * @param $timeSeconds
	 * @param $cacheId
	 * @param $funcName
	 * @param array $arCallbackParams
	 * @return bool
	 */
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


	/**
	 * Массив данных из СSV файла
	 * @param $fileName
	 * @return array
	 */
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

	/**
	 *  CODE раздела || false
	 * @param $urn
	 * @return mixed
	 */
	function getCurrentSection($urn)
	{
		$requestUrnData = explode('/', $urn);
		$urnData = array_filter($requestUrnData, function ($partUrb) {
			return $partUrb != '';
		});

		return end($urnData);
	}


	/**
	 * ID раздела по символьному коду
	 * @param $urn
	 * @return bool
	 */
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


	/**
	 * Проверяет на "искусственный" раздел
	 * @param $sectionID
	 * @return bool
	 */
	function isMadeSection($sectionID)
	{
		return in_array($sectionID, MADE_CATALOG_IDS);
	}


	/**
	 * ID родительского "искусственного" раздела || false
	 * @param $sectionID
	 * @return bool
	 */
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


	/**
	 * Подразделы с учетом "искусственных" разделов
	 * @param $sectionID
	 * @param array $excludedIDs
	 * @return array
	 */
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


	/**
	 * Данные раздела
	 * @param $sectionID
	 * @return mixed
	 */
	function getSectionDataByID($sectionID)
	{
		$sectionDBData = CIBlockSection::GetByID($sectionID);

		return $sectionDBData->GetNext();
	}


	/**
	 * Данные элемента
	 * @param $iBlockID
	 * @param $elementID
	 * @param array $props
	 * @return mixed
	 */
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

	/**
	 * Данные для меню каталога (корневые разделы)
	 * @param bool $isMainMenu
	 * @return mixed
	 */
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


	/**
	 * Привязывает "искусственные" разделы:
	 * @param $catalogLinksData
	 * @return mixed
	 */
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


	/**
	 * Данные для top меню каталога DEPTH 2,3:
	 * @return array
	 */
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


	/**
	 * Данные для top меню каталога DEPTH 3:
	 * @param $sectionID
	 * @param $fromBlock
	 * @return array
	 */
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


	/**
	 * Полные данные для top меню каталога:
	 * @return array
	 */
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


	/**
	 * Данные для left меню каталога DEPTH 2 (без "искусственных" разделов)
	 * @param $linksData
	 * @return array
	 */
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


	/**
	 * Добавляет данные по дочерним разделам
	 * @param $linksData
	 * @param $childLinksData
	 * @return mixed
	 */
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


	/**
	 * Полные данные для left меню каталога
	 * @return mixed
	 */
	function getCatalogLeftMenuLinks()
	{
		$linksData = getMainCatalogLinks(false);
		$childLinksData = getCatalogChildLinks2Lvl($linksData);

		return appendCatalogChild($linksData, $childLinksData);
	}


	/**
	 * Данные по брендам
	 * @return array
	 */
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


	/**
	 * Данные меню по брендам
	 * @return mixed
	 */
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


	/**
	 * Данные меню
	 * @return array
	 */
	function getMenuLinks()
	{
		$aMenuLinksExt = getCatalogTopMenuLinks();
		$brandLinks = getBrandsLinks();

		return array_merge($aMenuLinksExt, $brandLinks);
	}


	/**
	 * Товары выбранного раздела
	 * @param $sectionCode
	 * @return array
	 */
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


	/**
	 * Рейтинг товара
	 * @param $productID
	 * @return false|float|void
	 */
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

	/**
	 * Данные меню из кэша:
	 * @return bool
	 */
	function getMenuLinksFromCache()
	{
		$cacheTime = 3600 * 6;
		$cacheID = "menuLinks";

		return returnResultCache($cacheTime, $cacheID, 'getMenuLinks');
	}


	/**
	 * Данные для left меню из кэша:
	 * @return bool
	 */
	function getCatalogLeftMenuLinksFromCache()
	{
		$cacheTime = 3600 * 6;
		$cacheID = "catalogLeftMenuLinks";

		return returnResultCache($cacheTime, $cacheID, 'getCatalogLeftMenuLinks');
	}


	/**
	 * ID активных складов:
	 * @return array
	 */
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
