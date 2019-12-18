<?php

	#@@@  ОБНОВЛЕНИЕ ПРИВЯЗКИ К РАЗДЕЛАМ @@@#
	
	use Bitrix\Main\Loader;
	use \Bitrix\Iblock\PropertyIndex\Manager;

	/**
	 * @param $productSectionData
	 *
	 * @return array [
	 *   'errors' => ошибки,
	 *   'createdCount' => количество созданных отзывов
	 * ]
	 */
	function updateElementsSection($productSectionData)
	{
		$result = [
			'errors' => [],
			'createdCount' => 0
		];

		foreach ($productSectionData as $key => $productData) {
			if ( ! $key) {
				continue;
			}

			[$prodID, $prodSections] = $productData;

			$prodSectionsData = explode(',', $prodSections);

			if ( ! $prodID || ! $prodSectionsData) {
				continue;
			}

			updateElementSection($prodID, $prodSectionsData);
			++$result['createdCount'];
		}

		return $result;
	}


	/**
	 * @param $prodID
	 * @param $sectionsID
	 * обновляет привязку к разделам у товаров + обновление фасетных индексов
	 */
	function updateElementSection($prodID, $sectionsID)
	{
		CIBlockElement::SetElementSection($prodID, $sectionsID);

		Manager::updateElementIndex(CATALOG_I_BLOCK_ID, $prodID);
	}