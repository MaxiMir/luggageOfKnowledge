<?php

	const CATALOG_I_BLOCK_ID = 19;


	/**
	 * Распечатывает любое количество аргументов
	 * @param mixed ...$args
	 */
	function dbg(...$args)
	{
		echo '<pre>';

		foreach ($args as $arg) {
			$varType = gettype($arg);

			echo "VAR TYPE: {$varType} <br>";
			print_r($arg);
		}

		echo '</pre>';
	}


	/**
	 * @param array $params
	 * @return array
	 */
	function getProducts($params)
	{
		$products = [];
		$arFilterDefault = [
			"ACTIVE" => "Y",
			"IBLOCK_ID" => CATALOG_I_BLOCK_ID,
			"INCLUDE_SUBSECTIONS" => "Y"
		];

		["SELECT" => $arSelect, "FILTER" => $arFilter] = $params;

		$arSelect = $arSelect ?: ["*"];
		$arFilter = ! $arFilter ? $arFilterDefault : array_replace($arFilterDefault, $arFilter);

		$productDBData = CIBlockElement::Getlist([], $arFilter, false, false, $arSelect);

		while ($product = $productDBData->GetNext()) {
			$products[] = $product;
		}

		return $products;
	}


	/**
	 * @param int $iBlockID
	 * @param bool $getAllData
	 * @return array
	 */
	function getIBlockProperties($iBlockID = CATALOG_I_BLOCK_ID, $getAllData = false)
	{
		$properties = [];

		$propertiesDataDB = CIBlockProperty::GetList([], ["IBLOCK_ID" => $iBlockID]);

		while ($property = $propertiesDataDB->GetNext()) {
			if ($getAllData) {
				$properties[] = $property;
				continue;
			}

			['CODE' => $CODE, 'NAME' => $NAME, "ID" => $ID] = $property;
			$properties[$ID] = compact("NAME", "CODE");
		}

		return $properties;
	}

	/**
	 * @param $products
	 * @param $properties
	 * @return array
	 */
	function prepareProductDataForCSV($products, $properties)
	{
		$productsData = [];
		$firstColumnDefaultData = ["ID", "НАЗВАНИЕ"];
		$secondColumnDefaultData = ["ID", "NAME"];

		[$firstColumnData, $secondColumnData] = array_reduce($properties, function ($acc, $property) {
			["CODE" => $code, "NAME" => $name] = $property;
			$acc[0][] = $name;
			$acc[1][] = $code;

			return $acc;
		}, [$firstColumnDefaultData, $secondColumnDefaultData]);

		$propsCode = array_map(function ($key) {
			return "PROPERTY_{$key}";
		}, array_keys($properties));

		foreach ($products as $key => $product) {
			$productsData[$key] = [];

			foreach ([$secondColumnDefaultData, $propsCode] as $step => $key) {
				$propValue = $product[$key];

				if ($step === 1) {
					$propValue = ! is_array($propValue) ? $propValue : "МАССИВ: " . implode(", ", $propValue);
				}

				$productsData[$key][] = $propValue;
			}
		}

		return array_merge($firstColumnData, $secondColumnData, ...$productsData);
	}


	/**
	 * Запись данных в CSV файл
	 * @param $filePath
	 * @param $contentData
	 * @param $delimiter
	 */
	function writeInCSV($filePath, $contentData, $delimiter = ";")
	{
		$file = new SplFileObject($filePath, 'a');;

		foreach ($contentData as $fields) {
			$file->fputcsv($fields, $delimiter);
		}
	}

	/**
	 * Возвращает массив данных из файла CSV
	 * @param $fileName
	 * @return array
	 * @throws Exception
	 */
	function getCSVData($fileName)
	{
		$csvData = [];

		if (!file_exists($fileName)) {
			throw new Exception('Файл не найден');
		}

		$csvFile = new SplFileObject($fileName);

		while (!$csvFile->eof()) {
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


	/**
	 * Заменяет содержимое свойства
	 * @param $replacePropData
	 */
	function replaceInProductsProps($replacePropData)
	{
		foreach ($replacePropData as $propName => [$search, $replace]) {
			$propNameInUpCase = mb_strtoupper($propName);

			$SELECT = ["ID", "PROPERTY_{$propNameInUpCase}"];
			$FILTER = ["!PROPERTY_{$propNameInUpCase}" => false];

			$products = getProducts(compact("SELECT", "FILTER"));

			foreach ($products as $product) {
				["ID" => $id, "PROPERTY_{$propNameInUpCase}_VALUE" => $propValue] = $product;
				$el = new CIBlockElement;

				$newPropValue = str_replace($search, $replace, $propValue);

				if ($id && $newPropValue) {
					$el->SetPropertyValuesEx($id, CATALOG_I_BLOCK_ID, [$propName => $newPropValue]);
				}
			}
		}
	}


	/**
	 * @return array [
	 *    данные по товарам, имеющими дубли,
	 *    данные по дублями,
	 *    символьные кода товаров
	 * ]
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

			$isOrigElem = ! array_key_exists($code, $origElements);
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
	 * @param $origElementsWithDoubles
	 * @param $doublesElements
	 * @param $doubleElemCodes
	 * @return mixed * @return mixed [
	 *    'toDel' => данные товаров для удаления,
	 *    'toSave' => данные товаров, которые оставляем
	 * ] (исходя из глубины вложенности товара)
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
	 * @param $toDelProducts
	 * @param $toSaveProducts
	 * @param $doubleElemCodes
	 * @return array [
	 * 'redirects' => данные по проставленным редиректам
	 * 'errors' => не добавленные редиректы
	 * ]
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
	 * @param $toDelProducts
	 * @return array [
	 * 'deletedIDs' => удаленные ID
	 * 'errors' => не удаленные ID
	 * ]
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


	/**
	 * @param $data
	 * @return mixed ассоциативный массив из массивов с 2 элементами
	 */
	function convertToAssocArr($data)
	{
		return array_reduce($data, function ($acc, $sectionData) {
			[$key, $value] = $sectionData;
			$acc[$key] = $value;

			return $acc;
		}, []);
	}

	/**
	 * @param       $newsAllData
	 * @param array $newsSectionData
	 *
	 * @return array [
	 *   'errors' => массив с ошибками,
	 *   'createdCount' => количество созданных новостей
	 * ]
	 */
	function createAllNews($newsAllData, $newsSectionData = [])
	{
		$result = [
			'errors' => [],
			'createdCount' => 0,
		];

		foreach ($newsAllData as $key => $newsData) {
			if ( ! $key) {
				continue;
			}

			['error' => $error] = createNews($newsData, $newsSectionData);

			if ($error) {
				$result['errors'][] = "Строка CSV: {$key}<br>Ошибка: {$error}";
				continue;
			}

			++$result['createdCount'];
		}

		return $result;
	}

	/**
	 * @param $newsData
	 * @param $newsSectionData
	 *
	 * @return array [
	 *    'id' => созданной новости || false,
	 *    'error' => ошибка при создании || null
	 * ]
	 */
	function createNews($newsData, $newsSectionData)
	{
		$dirWithImg = implode(DIRECTORY_SEPARATOR, [__DIR__, 'pic']) . DIRECTORY_SEPARATOR;

		[$id, $stamp, $time, $date, $title, $text, $img, $imgExt] = $newsData;

		$iBlockSection = $newsSectionData[$id] ?? '';
		$previewText = getTrimLine($text, 350);
		$imgDetailPath = "{$dirWithImg}{$stamp}$imgExt";
		$imgPreviewPath = "{$dirWithImg}{$stamp}_{$img}$imgExt";

		$el = new CIBlockElement;

		$newsData = [
			"IBLOCK_ID" => ARTICLES_I_BLOCK_ID,
			"IBLOCK_SECTION" => $iBlockSection,
			"NAME" => $title,
			"CODE" => $id,
			"ACTIVE" => "Y",
			"PREVIEW_TEXT" => $previewText,
			"PREVIEW_TEXT_TYPE" => 'html',
			"DETAIL_TEXT" => $text,
			"DETAIL_TEXT_TYPE" => 'html'
		];

		if (file_exists($imgDetailPath)) {
			$newsData["DETAIL_PICTURE"] = CFILE::MakeFileArray($imgDetailPath);
		}

		if (file_exists($imgPreviewPath)) {
			$newsData["PREVIEW_PICTURE"] = CFILE::MakeFileArray($imgPreviewPath);
		}

		if ($newElement = $el->Add($newsData)) {
			return ['id' => $newElement];
		}

		return ['error' => $el->LAST_ERROR];
	}




	### NAME и LAST_NAME пользователя ###
	function getUserFullName()
	{
		global $USER;

		$userID = $USER->GetID();
		$userData = CUser::GetByID($userID)->Fetch();

		["NAME" => $name, "LAST_NAME" => $lastName] = $userData;

		return "{$name} {$lastName}";
	}


	### ID созданного отзыва || ошибку ###
	function createResponse($responseData, $userFullName)
	{
		[
			"prodID" => $prodID,
			"sectionID" => $sectionID,
			"responseHTML" => $responseHTML,
			"rating" => $rating
		] = $responseData;

		if ( ! isset($prodID, $sectionID, $responseHTML, $rating)) {
			return;
		}

		$el = new CIBlockElement;

		$props = [
			'USER_NAME' => $userFullName,
			'RATING' => $rating,
			'PRODUCT' => $prodID,
			'CATALOG_SECTION' => $sectionID
		];


		$responseData = [
			"IBLOCK_ID" => RESPONSE_I_BLOCK_ID,
			"NAME" => $userFullName,
			"ACTIVE" => "Y",
			"PREVIEW_TEXT" => $responseHTML,
			"PREVIEW_TEXT_TYPE" => 'html',
			"PROPERTY_VALUES" => $props,
		];


		if ($newElement = $el->Add($responseData)) {
			return ['id' => $newElement];
		}

		return ['error' => $el->LAST_ERROR];
	}


	### обновление количества отзывов о товаре: ###
	function increasePropCountResponse($prodID)
	{
		$responseCount = getProductResponseCount($prodID);
		$responseCountValue = ! $responseCount ? 1 : ++$responseCount;

		CIBlockElement::SetPropertyValuesEx($prodID, false, ["vote_count" => $responseCountValue]);
	}


	### обновление рейтинга товара: ###
	function updateRatingProduct($prodID)
	{
		$productRating = getProductRating($prodID);

		CIBlockElement::SetPropertyValuesEx($prodID, false, ["rating" => $productRating]);
	}


	/**
	 * @param $responsesData
	 * @return array [
	 *   'errors' => ошибки,
	 *   'createdCount' => количество созданных отзывов
	 * ]
	 */
	function addAllResponses($responsesData)
	{
		$result = [
			'errors' => [],
			'createdCount' => 0
		];

		foreach ($responsesData as $key => $responseData) {
			if ( ! $key) {
				continue;
			}

			$resultAdd = addResponseFormResult($responseData);

			if ( ! $resultAdd) {
				$result['errors'][] = "Не удалось создать отзыв с данными со строки: {$key}";
				continue;
			}

			++$result['createdCount'];

		}

		return $result;
	}

	/**
	 * @param $data
	 * @return bool - создан отзыв с обновленной датой
	 */
	function addResponseFormResult($data)
	{
		global $DB;

		[$name, $email, $date, $response] = $data;

		$formData = [
			"form_text_47" => $name,
			"form_email_48" => $email,
			"form_textarea_49" => $response
		];

		if ( ! $resultFID = CFormResult::Add(FORM_RESPONSE_COMPANY_ID, $formData, "N")) {
			return false;
		}

		$DB->PrepareFields("b_form_result");

		$dbData = [
			"DATE_CREATE" => "'{$date}'"
		];

		return $DB->Update("b_form_result", $dbData, "WHERE ID='{$resultFID}'") === 1;
	}


	//**@@ Разделы:
	function getSectionsData($fileName)
	{
		$sectionsData = [];

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

				[$urn, $sectionName1, $sectionName2, $sectionName3] = $data;

				$clearPartsUrn = getURNData($urn);
				$nesting = count($clearPartsUrn);

				if ($nesting === 1) {
					$sectionName = $sectionName1;
				} elseif ($nesting === 2) {
					$sectionName = $sectionName2;
				} else {
					$sectionName = $sectionName3;
				}

				$urn = implode('/', $clearPartsUrn) . '/';
				$sectionCODE = array_pop($clearPartsUrn);
				$parentSectionCODE = $nesting == 1 ? null : array_pop($clearPartsUrn);

				if ( ! array_key_exists($sectionName, $sectionsData)) {
					$sectionsData[$sectionName] = compact("parentSectionCODE", "sectionCODE", "urn", "nesting");
				}
			} catch (Exception $e) {
				die($e->getMessage());
			}
		}

		return sortByNested($sectionsData); // сортировка по вложенности раздела
	}

	function createNewSections($sectionsData, $blockID)
	{
		foreach ($sectionsData as $sectionName => $sectionData) {
			[
				'parentSectionCODE' => $parentSectionCODE,
				'sectionCODE' => $sectionCODE,
				'nesting' => $nesting
			] = $sectionData;

			$parentSectionID = getSectionIDByCode($parentSectionCODE, $nesting, $blockID);

			if ( ! isSectionExists($parentSectionID, $sectionCODE, $blockID)) {
				createSection($sectionName, $parentSectionID, $sectionCODE, $blockID);
			}
		}
	}

	function getSectionIDByCode($sectionCODE, $nesting, $blockID)
	{

		if ( ! isset($sectionCODE, $blockID)) {
			return;
		}

		$arPSFilter = ['IBLOCK_ID' => $blockID, "CODE" => $sectionCODE, 'DEPTH_LEVEL' => $nesting];
		$arPSSelect = ["ID"];

		$rsSections = CIBlockSection::GetList([], $arPSFilter, false, $arPSSelect);

		if ($arSection = $rsSections->GetNext()) {
			return $arSection["ID"];
		}

		return false;
	}

	function getSectionIDByName($name, $blockID)
	{
		if ( ! isset($name, $blockID)) {
			return;
		}

		$arFilter = [
			'IBLOCK_ID' => $blockID,
			'NAME' => $name,
		];

		$arSelect = [
			'ID',
		];

		return CIBlockSection::GetList([], $arFilter, false, false, $arSelect)->GetNext()["ID"];
	}

	function isSectionExists($sectionID, $sectionCODE, $blockID)
	{
		$arSFilter = ["IBLOCK_ID" => $blockID, "CODE" => $sectionCODE];

		if ( ! is_null($sectionID)) {
			$arSFilter["SECTION_ID"] = $sectionID;
		}

		return CIBlockSection::GetCount($arSFilter);
	}

	function createSection($sectionName, $parentSectionID, $sectionCODE, $blockID)
	{
		$bSection = new CIBlockSection;

		$arFields = [
			"ACTIVE" => "Y",
			"IBLOCK_ID" => $blockID,
			"CODE" => $sectionCODE,
			"NAME" => $sectionName,
		];

		if ( ! is_null($parentSectionID)) {
			$arFields["IBLOCK_SECTION_ID"] = $parentSectionID;
		}

		if ( ! $bSection->Add($arFields)) {
			die($bSection->LAST_ERROR);
		}
	}

	function updateSections($data)
	{
		foreach ($data as $itemData) {
			$bs = new CIBlockSection;

			[$ID, $NAME, $SECTION_META_TITLE, $SECTION_META_DESCRIPTION] = $itemData;
			$arFields = compact('NAME');
			$arFields["IPROPERTY_TEMPLATES"] = compact('SECTION_META_TITLE', 'SECTION_META_DESCRIPTION');

			if ( ! $bs->Update($ID, $arFields)) {
				echo "Не удалось обновить меты у ID: {$ID} <br>";
			}
		}
	}


//**@@ Элементы:
	function createElements($fileName, $type = 'catalog')
	{
		$counter = 0;

		if ( ! file_exists($fileName)) {
			return ['count' => $counter, 'error' => "Файл не найден {$fileName}"];
		}

		$csvFile = new SplFileObject($fileName);

		while ( ! $csvFile->eof()) {
			try {
				$data = $csvFile->fgetcsv(';');

				if (empty($data[0])) {
					continue;
				}

				switch ($type) {
					case 'palitra':
						$createData = createStone($data);
						break;

					default:
						$createData = createProduct($data);
				}

				if ( ! $createData['result']) {
					return ['count' => $counter, 'error' => $createData['error']];
				}

				$counter++;
			} catch (Exception $e) {
				return ['count' => $counter, 'error' => $e->getMessage()];
			}
		}

		return ['count' => $counter, 'error' => 0];
	}

	function createProduct($data)
	{
		$imgFolder = "{$_SERVER['DOCUMENT_ROOT']}/productUploader/img/products/";

		[
			$urn,
			$NAME,
			$listPhotos,
			$PRICE,
			$DETAIL_TEXT,
			$parentSectionID,
			$TITLE,
			$DESCRIPTION,
			$SQUARE,
			$STONE,
			$TERM_OF_PRODUCTION,
			$COLOR,
			$SIZE,
			$WASH_PRICE,
			$ADD_INSTALLED,
			$MATERIAL,
			$SERVICES,
			$SINK_METAL_COST,
			$WASH,
			$WASH_INTEGRATED,
			$GROOVE_FOR_WATER,
			$WASH_INTEGRATED_LIT,
			$EQUIPMENT
		] = $data;

		$element = new CIBlockElement;


		# свойства элемента:
		$props = compact(
			'PRICE', 'SQUARE', 'TERM_OF_PRODUCTION', 'COLOR', 'SIZE',
			'WASH_PRICE', 'ADD_INSTALLED', 'SERVICES', 'SINK_METAL_COST', 'WASH',
			'WASH_INTEGRATED', 'GROOVE_FOR_WATER', 'WASH_INTEGRATED_LIT', 'EQUIPMENT'
		);

		# Детальное изображение + галерея:
		$photos = explode(',', $listPhotos);
		$mainImgName = array_shift($photos);
		$mainImg = "{$imgFolder}{$mainImgName}";

		$props["STONE"] = getElementIDByName($STONE, PALETTE_IBLOCK_ID);
		$props["MATERIAL"] = getSectionIDByName($MATERIAL, PALETTE_IBLOCK_ID);

		if ( ! empty($photos)) {
			$props["GALLERY"] = array_reduce(array_keys($photos), function ($acc, $key) use ($photos, $imgFolder) {
				$imgPath = "{$imgFolder}{$photos[$key]}";

				$acc["n{$key}"] = [
					"VALUE" => CFILE::MakeFileArray($imgPath),
				];

				return $acc;
			}, []);
		}

		$productData = [
			"IBLOCK_ID" => CATALOG_IBLOCK_ID,
			"IBLOCK_SECTION" => [$parentSectionID],
			"NAME" => $NAME,
			"CODE" => getSymbolCode($urn),
			"PROPERTY_VALUES" => $props,
			"ACTIVE" => "Y",
			"DETAIL_TEXT" => $DETAIL_TEXT,
			"DETAIL_TEXT_TYPE" => 'html',
			"DETAIL_PICTURE" => CFILE::MakeFileArray($mainImg),
			"PREVIEW_PICTURE" => CFILE::MakeFileArray($mainImg),
			"IPROPERTY_TEMPLATES" => [
				"ELEMENT_META_TITLE" => $TITLE,
				"ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
			],
		];

		if ($PRODUCT_ID = $element->Add($productData)) {
			return ['result' => true, 'error' => null];
		}

		return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];

	}

	function createStone($data)
	{
		$imgFolder = "{$_SERVER['DOCUMENT_ROOT']}/productUploader/img/stones/";

		[
			$URN,
			$NAME,
			$listPhotos,
			$PRICE,
			$DETAIL_TEXT,
			$PARENT_SECTION_NAME,
			$TITLE,
			$DESCRIPTION,
			$MANUFACTURER,
			$COLOUR,
			$ARTICLE,
			$COLOR_TYPE,
			$POLISHING
		] = $data;

		$element = new CIBlockElement;

		$sectionID = getSectionIDByName($PARENT_SECTION_NAME, PALETTE_IBLOCK_ID);

		# свойства элемента:
		$props = compact('PRICE', 'MANUFACTURER', 'COLOUR', 'ARTICLE', 'COLOR_TYPE', 'POLISHING');

		# Детальное изображение + галерея:
		$photos = explode(',', $listPhotos);
		$mainImgName = array_shift($photos);
		$mainImg = "{$imgFolder}{$mainImgName}";

		if ( ! empty($photos)) {
			$props["GALLERY"] = array_reduce(array_keys($photos), function ($acc, $key) use ($photos, $imgFolder) {
				$imgPath = "{$imgFolder}{$photos[$key]}";

				$acc["n{$key}"] = [
					"VALUE" => CFILE::MakeFileArray($imgPath),
				];

				return $acc;
			}, []);
		}

		$productData = [
			"IBLOCK_ID" => PALETTE_IBLOCK_ID,
			"IBLOCK_SECTION" => [$sectionID],
			"NAME" => $NAME,
			"CODE" => getSymbolCode($URN),
			"PROPERTY_VALUES" => $props,
			"ACTIVE" => "Y",
			"DETAIL_TEXT" => $DETAIL_TEXT,
			"DETAIL_TEXT_TYPE" => 'html',
			"DETAIL_PICTURE" => CFILE::MakeFileArray($mainImg),
			"PREVIEW_PICTURE" => CFILE::MakeFileArray($mainImg),
			"IPROPERTY_TEMPLATES" => [
				"ELEMENT_META_TITLE" => $TITLE,
				"ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
			],
		];

		if ($PRODUCT_ID = $element->Add($productData)) {
			return ['result' => true, 'error' => null];
		} else {
			return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];
		}
	}

	function getElementIDByName($name, $blockID)
	{
		if ( ! isset($name, $blockID)) {
			return;
		}

		$arFilter = [
			'IBLOCK_ID' => $blockID,
			'NAME' => $name,
		];

		$arSelect = [
			'ID',
		];

		return CIBlockElement::GetList([], $arFilter, $arSelect)->GetNext()["ID"];
	}



	//**@@ HELPERS:
	function getURNData($urn)
	{
		$partsURN = explode('/', $urn);

		return array_filter($partsURN, function ($key) use ($partsURN) {
			return $partsURN[$key] && $key != count($partsURN) - 2;
		}, ARRAY_FILTER_USE_KEY);
	}

	function sortByNested($sectionsData)
	{
		uasort($sectionsData, function ($a, $b) {
			return $a['nesting'] < $b['nesting'] ? -1 : 1;
		});

		return $sectionsData;
	}

	function getSymbolCode($urn)
	{
		$urnData = explode('/', $urn);

		return $urnData[count($urnData) - 2];
	}



	/**
	 * @param $usersData
	 * @return array [
	 *    'errors' => ошибки при создании пользователей,
	 *    'createdCount' => количество созданных пользователей
	 * ]
	 */
	function createUsers($usersData)
	{
		$result = [
			'errors' => [],
			'createdCount' => 0
		];

		foreach ($usersData as $key => $userData) {
			if ( ! $key) {
				continue;
			}

			['error' => $errorCreate] = createUser($userData);


			if ($errorCreate) {
				$result['errors'][] = $errorCreate;
				continue;
			}

			++$result['createdCount'];
		}

		return $result;
	}


	/**
	 * @param $userData
	 * @return array [
	 *   'id' => ID нового пользователя ||
	 *   'error' => ошибку, возникшую при создании
	 * ]
	 */
	function createUser($userData)
	{
		$LID = "ru";
		$ACTIVE = "Y";
		$personalNotesData = [];
		$GROUP_ID = [AUTH_USERS_GROUP];
		$PASSWORD = $CONFIRM_PASSWORD = "toBeStrong"; // randString(COUNT_SIGNS)
		$fieldsName = [
			"LOGIN",
			"LAST_NAME",
			"NAME",
			"SECOND_NAME",
			"PERSONAL_MOBILE",
			"EMAIL",
			"PERSONAL_GENDER",
			"PERSONAL_STREET",
			"GROUP_ID",
			"PASSWORD",
			"CONFIRM_PASSWORD",
			"ACTIVE",
			"LID",
			"PERSONAL_NOTES",
			"UF_WHOLESALE_BUYER",
			"UF_CREAT_UN_TIME"
		];

		[
			$LOGIN,
			$LAST_NAME,
			$NAME,
			$SECOND_NAME,
			$isMale,
			$delivery_time,
			$PERSONAL_MOBILE,
			$EMAIL,
			$regDate,
			$metro,
			$PERSONAL_STREET,
			$op,
		] = $userData;


		if ($metro) {
			$personalNotesData[] = "МЕТРО: {$metro};";
		}

		if ($delivery_time) {
			$personalNotesData[] = "ВРЕМЯ ДОСТАВКИ: {$delivery_time};";
		}

		$PERSONAL_GENDER = $isMale ? "M" : "";
		$PERSONAL_NOTES = implode($personalNotesData);
		$UF_CREAT_UN_TIME = (int)$regDate;
		$UF_WHOLESALE_BUYER = $op ? true : false;

		$user = new CUser;
		$arUserFields = compact(...$fieldsName);

		if ($newUserID = $user->Add($arUserFields)) {
			return ['id' => $newUserID];
		}

		return ['error' => $user->LAST_ERROR];
	}



	/**
	 * @param $discountCardsData
	 * @return array [
	 *    'errors' => ошибки при создании купонов,
	 *    'createdCount' => количество созданных купонов
	 * ]
	 */
	function addCoupons($discountCardsData)
	{
		$result = [
			'errors' => [],
			'createdCount' => 0
		];

		foreach ($discountCardsData as $key => $discountCardData) {
			if ( ! $key) {
				continue;
			}

			['error' => $errorCreate] = createCoupon($discountCardData);

			if ($errorCreate) {
				$result['errors'][] = $errorCreate;
				continue;
			}

			++$result['createdCount'];
		}

		return $result;
	}

	/**
	 * @param $discountCardData
	 * @return array [
	 *   'couponCode' => код купона ||
	 *   'error' => ошибку, возникшую при создании
	 * ]
	 */
	function createCoupon($discountCardData)
	{
		[$coupon, $fullName, $phone, $city] = $discountCardData;

		$phoneForDesc = ! $phone ? 'отсутствует' : $phone;
		$cityForDesc = ! $city ? 'отсутствует' : $city;

		$description = "ИМЯ: {$fullName}, ТЕЛЕФОН: {$phoneForDesc}, ГОРОД: {$cityForDesc}";


		$addCouponDb = DiscountCouponTable::add(
			[
				'DISCOUNT_ID' => VIP_ID_BASKET_RULES,
				'COUPON' => $coupon, // DiscountCouponTable::generateCoupon(true)
				'TYPE' => DiscountCouponTable::TYPE_MULTI_ORDER,
				'MAX_USE' => 0,
				'USER_ID' => 0,
				'DESCRIPTION' => $description
			]
		);

		if ($addCouponDb->isSuccess()) {
			return ['couponCode' => $coupon];
		}

		$error = $addCouponDb->getErrorMessages();

		return ['error' => $error];
	}