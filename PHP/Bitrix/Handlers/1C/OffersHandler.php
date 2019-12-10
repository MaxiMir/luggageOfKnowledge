<?php

	use Bitrix\Main\Config\Option;

	class OffersHandler
	{
		public function init()
		{
			$errorMessages = "";

			$isOffers = strpos($_REQUEST['filename'], 'offers') !== false;

			if (!$isOffers) {
				return;
			}

			$groupOffersExCML2LINK = self::getGroupOffersExBinding();

			[
				"isError" => $isErrorAddProdID,
				"data" => $groupOffers,
				"errors" => $errorsAddProdID
			] = self::addProdIDInGroupOffers($groupOffersExCML2LINK);

			if ($isErrorAddProdID) {
				$errorMessages .= implode("\n", $errorsAddProdID);
			}

			[
				"isError" => $isErrorUpd,
				"errors" => $errorsUpd
			] = self::updateCML2LINKForGroupOffers($groupOffers);

			if ($isErrorUpd) {
				$errorMessages .= implode("\n", $errorsUpd);
			}

			echo $errorMessages ? "failure\n{$errorMessages}" : "success\nПривязка ТП к товарам прошла успешно";

			exit;
		}


		/**
		 * @return array [
		 *    название товара => [
		 *       "OFFERS_ID" => ID-шники ТП без CML2_LINK
		 *    ],
		 * ]
		 */
		private static function getGroupOffersExBinding()
		{
			$resultData = [];

			$arFilter = [
				'IBLOCK_ID' => OFFERS_I_BLOCK_ID,
				'ACTIVE' => 'Y',
				'PROPERTY_CML2_LINK' => false,
				'!PROPERTY_PRODUCT_NAME_FOR_OFFER' => false
			];

			$res = CIBlockElement::GetList([], $arFilter, false, false, ["ID", "PROPERTY_PRODUCT_NAME_FOR_OFFER"]);

			while (['ID' => $id, "PROPERTY_PRODUCT_NAME_FOR_OFFER_VALUE" => $productName] = $res->Fetch()) {
				if (!array_key_exists($productName, $resultData)) {
					$resultData[$productName] = ["OFFERS_ID" => []];
				}

				$resultData[$productName]["OFFERS_ID"][] = $id;
			}

			return $resultData;
		}

		/**
		 * @param $groupOffersExCML2LINK
		 * @return array [
		 *    isError => завершено с ошибками,
		 *    errors => масссив с ошибками,
		 *    data => название товара => [
		 *          "OFFERS_ID" => ID-шники ТП без CML2_LINK
		 *          "PRODUCT_ID" => ID товара || null
		 *    ]
		 * ]
		 */
		private static function addProdIDInGroupOffers($groupOffersExCML2LINK)
		{
			$result = [
				"errors" => [],
			];
			$arFilter = [
				'IBLOCK_ID' => OFFERS_I_BLOCK_ID,
				'NAME' => array_keys($groupOffersExCML2LINK),
			];

			$resDB = CIBlockElement::GetList([], $arFilter, false, false, ["NAME", "PROPERTY_CML2_LINK"]);

			while (['NAME' => $name, "PROPERTY_CML2_LINK_VALUE" => $productID] = $resDB->Fetch()) {
				if (!$productID) { // привязка к товару не проставлена
					$productID = self::getProductIDByName($name);

					if (!$productID) { // товар не существует
						["isError" => $isError, "msg" => $msg, "ID" => $id] = self::createProduct($name);

						if (!$isError) {
							$productID = $id;
						} else {
							$result["errors"][] = $msg;
						}
					}
				}

				$groupOffersExCML2LINK[$name]["PRODUCT_ID"] = $productID;
			}

			$result["data"] = $groupOffersExCML2LINK;
			$result["isError"] = !empty($result["errors"]);

			return $result;
		}

		/**
		 * @param $groupOffers
		 * @return array [
		 *    isError => завершено с ошибками
		 *    errors => массив с ошибками
		 * ]
		 */
		private static function updateCML2LINKForGroupOffers($groupOffers)
		{
			$result = [
				"errors" => []
			];

			foreach ($groupOffers as $productName => ["PRODUCT_ID" => $productID, "OFFERS_ID" => $offersID]) {
				["isError" => $isError, "msg" => $msg] = self::updateOffersCML2LINK($offersID, $productID);

				if ($isError) {
					$result["errors"][] = $msg;
				}
			}

			$result["isError"] = !empty($result["msg"]);

			return $result;
		}

		private static function getProductIDByName($productName)
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
		private static function createProduct($productName)
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
		 * Обновляет CML2LINK у выбранных ТП
		 * @param $offersID
		 * @param $productID
		 * @return array [
		 *    isError => результат обновления,
		 *    msg => ошибка || null
		 * ]
		 */
		private static function updateOffersCML2LINK($offersID, $productID)
		{
			if (!$productID) {
				$offersIDList = implode(", ", $offersID);
				return ["isError" => true, "msg" => "Для ТП {$offersIDList} не была создана привязка к товару"];
			}

			foreach ($offersID as $offerID) {
				CIBlockElement::SetPropertyValuesEx($offerID, OFFERS_I_BLOCK_ID, ["CML2_LINK" => $productID]);
			}

			return ["isError" => false];
		}
	}
