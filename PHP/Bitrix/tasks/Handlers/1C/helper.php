<?php

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
	 * @param $orderID
	 * @return array ['fullName' => value, 'propNameID' => value]
	 */
	function getFullNameData($orderID)
	{
		$propNameID = null;

		$fullNameData = [
			"NAME" => "",
			"LAST_NAME" => ""
		];

		$rsProp = CSaleOrderPropsValue::GetList([], ['ORDER_ID' => $orderID]);

		while ($arProp = $rsProp->Fetch()) {
			['ID' => $propID, 'CODE' => $propCode, 'VALUE' => $propValue] = $arProp;

			$isName = $propCode == 'FIO' || $propCode == 'NAME_UR';
			$isLastName = $propCode == 'LAST_NAME' || $propCode == 'LASTNAME_UR';

			$propValueTrimmed = trim($propValue);

			if ($isLastName) {
				$fullNameData['LAST_NAME'] = $propValueTrimmed;
			} elseif ($isName) {
				$propNameID = $propID;
				$fullNameData['NAME'] = $propValueTrimmed;
			}
		}

		$fullName = "{$fullNameData['LAST_NAME']} {$fullNameData['NAME']}";

		return compact('fullName', 'propNameID');
	}