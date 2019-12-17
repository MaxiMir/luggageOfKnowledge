<?php

	#@ ЗАЛИТЬ РАЗДЕЛЫ/ТОВАРЫ:
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

	global $DB;

	//** Файлы для заливки:
	const FILE_CATALOG = 'CATEGORY.csv';
	const FILE_PALETTE = 'CATEGORY_PALETTE.csv';
	const FILE_PRODUCTS = 'NEW_PRODUCTS.csv';
	const FILE_STONES = 'STONES.csv';
	const FILE_META = 'META.csv';

	const CATALOG_IBLOCK_ID = 26;
	const PALETTE_IBLOCK_ID = 27;

	//**@@ Читаем файл и генерируем данные по разделам каталога:
	$sectionsCData = getSectionsData(FILE_CATALOG);

	//**@@ Читаем файл и генерируем данные по по разделам палитры:
	$sectionsPData = getSectionsData(FILE_PALETTE);

	//**@@ Создаем новые разделы Каталог:
	createNewSections($sectionsCData, CATALOG_IBLOCK_ID);

	//**@@ Создаем новые разделы Палитра:
	createNewSections($sectionsPData, PALETTE_IBLOCK_ID);

	//**@@ Создаем новые камни:
	$createData = createElements(FILE_STONES, 'palitra');

	//**@@ Создаем новые товары:
	$createData = createElements(FILE_PRODUCTS);
	$countProducts = $createData['count'];
	$error = is_null($createData['error']) ? 0 : $createData['error'];
	echo "Создано {$countProducts} <br> Ошибки: {$error}";

	//**@@ Меты для разделов:
	$seoData = getCSVData(FILE_META);
	updateSections($seoData);




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