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