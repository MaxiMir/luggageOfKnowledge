<?

	use \Bitrix\Main\{Application, Context, Loader};

	class OffersPropsHandler
	{
		/**
		 * Инициализация обработчика
		 * @param $arFields
		 * @throws Exception
		 */
		public function initBeforeUpdate(&$arFields)
		{
			$prodNamePropID = 1473;
			$request = Context::getCurrent()->getRequest();
			[
				"ID" => $elemID,
				"IBLOCK_ID" => $iBlockID,
				"PROPERTY_VALUES" => [ $prodNamePropID => $newProductNameData ]
			] = $arFields;

			$isSyncWith1C = $request["type"] === "catalog";
			$isOffersUpdate = $iBlockID === OFFERS_I_BLOCK_ID;

			if ($isSyncWith1C && $isOffersUpdate) {
				$newProductName = array_values($newProductNameData)[0]["VALUE"];
				$isNeedUpdateBinding = self::isNeedAddBinding($elemID, $newProductName);

				if ($isNeedUpdateBinding) {
					$productID = getProductIDByName($newProductName);

					if (!$productID) { // товар не существует
						["isError" => $isError, "msg" => $msg, "ID" => $id] = createProduct($newProductName);

						if (!$isError) {
							$productID = $id;
						} else {
							throw new Exception($msg);
						}
					}

					self::addBinding($elemID, $productID);
				}
			}
		}

		/**
		 * Проверяет на необходимость добавления привязки ТП к товару
		 * @param $productID
		 * @param $newProductNameData
		 * @return bool
		 */
		private static function isNeedAddBinding($productID, $newProductNameData)
		{
			$arSelect = ["ID", "PROPERTY_PRODUCT_NAME_FOR_OFFER"];
			$arFilter = ["IBLOCK_ID" => OFFERS_I_BLOCK_ID, "ID" => $productID];
			$offerData = CIBlockElement::Getlist([], $arFilter, false, false, $arSelect)->Fetch();
			$oldValue = $offerData["PROPERTY_PRODUCT_NAME_FOR_OFFER_VALUE"];

			return $oldValue !== $newProductNameData;
		}

		/**
		 * Делает привязку ТП к товару
		 * @param $offerID
		 * @param $productID
		 */
		private static function addBinding($offerID, $productID)
		{
			CIBlockElement::SetPropertyValuesEx($offerID, OFFERS_I_BLOCK_ID, ["CML2_LINK" => $productID]);
		}
	}