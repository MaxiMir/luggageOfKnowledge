<?php

	use Bitrix\Main\Config\Option;

	class OffersHandler
	{
		/**
		 * Инициализация обработчика
		 * @param $arParams
		 * @param $arFields
		 */
		public function initBeforeSuccess($arParams, $arFields)
		{
			$errorMessages = "";
			$isOffers = strpos($_REQUEST['filename'], 'offers') !== false;

			if (!$isOffers) {
				return;
			}

			$groupOffersExBinding = self::getGroupOffersExBinding();

			[
				"isError" => $isErrorAddProdID,
				"data" => $groupOffers,
				"errors" => $errorsAddProdID
			] = self::addProdIDInGroupOffers($groupOffersExBinding);

			if ($isErrorAddProdID) {
				$errorMessages .= implode("\n", $errorsAddProdID);
			}

			[
				"isError" => $isErrorUpd,
				"errors" => $errorsUpd
			] = self::updateBindingForGroupOffers($groupOffers);

			if ($isErrorUpd) {
				$errorMessages .= implode("\n", $errorsUpd);
			}

			echo $errorMessages ? "failure\n{$errorMessages}" : "success\nПривязка ТП к товарам прошла успешно";

			exit;
		}


		/**
		 * @return array [
		 *    название товара => [
		 *       "OFFERS_ID" => ID ТП без CML2_LINK
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
		 * @param $groupOffersExBinding
		 * @return array [
		 *    isError => завершено с ошибками,
		 *    errors => масссив с ошибками,
		 *    data => название товара => [
		 *          "OFFERS_ID" => ID ТП без CML2_LINK
		 *          "PRODUCT_ID" => ID товара, к которому привязываем ТП
		 *    ]
		 * ]
		 */
		private static function addProdIDInGroupOffers($groupOffersExBinding)
		{
			$result = [
				"errors" => [],
			];
			$arFilter = [
				'NAME' => array_keys($groupOffersExBinding),
				'IBLOCK_ID' => CATALOG_I_BLOCK_ID
			];
			$arSelect = ["ID", "NAME"];

			$resDB = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

			while (['NAME' => $name, "ID" => $productID] = $resDB->Fetch()) {
				$groupOffersExBinding[$name]["PRODUCT_ID"] = $productID;
			}

			foreach ($groupOffersExBinding as $prodName => ["PRODUCT_ID" => $productID]) {
				if ($productID) {
					continue;
				}

				["isError" => $isError, "msg" => $msg, "ID" => $newProductID] = createProduct($name);

				if ($isError) {
					$result["errors"][] = $msg;
					continue;
				}

				$groupOffersExBinding[$name]["PRODUCT_ID"] = $newProductID;
			}

			$result["data"] = $groupOffersExBinding;
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
		private static function updateBindingForGroupOffers($groupOffers)
		{
			$result = [
				"errors" => []
			];

			foreach ($groupOffers as $productName => ["PRODUCT_ID" => $productID, "OFFERS_ID" => $offersID]) {
				["isError" => $isError, "msg" => $msg] = self::updateOffersBinding($offersID, $productID);

				if ($isError) {
					$result["errors"][] = $msg;
				}
			}

			$result["isError"] = !empty($result["msg"]);

			return $result;
		}


		/**
		 * Обновляет свойство CML2_LINK у выбранных ТП
		 * @param $offersID
		 * @param $productID
		 * @return array [
		 *    isError => результат обновления,
		 *    msg => ошибка || null
		 * ]
		 */
		private static function updateOffersBinding($offersID, $productID)
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