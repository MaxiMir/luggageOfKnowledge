<?

	/**
	 * Получаем SECTION_CODE раздела каталога на странице отзывы
	 * @param $urn
	 * @return mixed|string
	 */
	function getCurrentSectionCodeInReviews($urn)
	{
		$requestUrnData = explode('/', $urn);
		$urnData = array_filter($requestUrnData, function ($partUrb) {
			return $partUrb != '';
		});
		
		return count($urnData) != 2 ? '' : $urnData[2];
	}
	

	/**
	 * Проверяем на необходимость сортировки по количеству отзывов к товарам
	 * @return bool
	 */
	function isSortByCount()
	{
		$request = Context::getCurrent()->getRequest();
		
		return $request->getQuery("sort") === "count";
	}
	

	/**
	 * Все разделы ИБ
	 * @param $params
	 * @return array
	 * @throws Exception
	 */
	function getAllSections($params)
	{
		$sectionsData = [];
		$arSort = [];
		$functionName = __FUNCTION__;
		
		[
			"iBlockID" => $iBlockID,
			"arSelect" => $arSelect,
		] = $params;
		
		if (!$iBlockID) {
			throw new Exception("Необходимо передать iBlockID в {$functionName}!");
		}
		
		$arSelect = $arSelect ?: ["ID", "NAME", "SECTION_PAGE_URL"];
		
		$arFilter = [
			"IBLOCK_ID" => $iBlockID,
			"GLOBAL_ACTIVE" => "Y",
		];
		
		$sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);
		
		while ($sectionData = $sectionsDBData->Fetch()) {
			$sectionsData[] = $sectionData;
		}
		
		return $sectionsData;
	}
	

	/**
	 * Все разделы ИБ из кэша
	 * @param $params
	 * @return bool
	 */
	function getAllSectionsFromCache($params)
	{
		$cacheTime = 3600 * 6;
		$cacheID = "allCatalogSections";
		
		return returnResultCache($cacheTime, $cacheID, 'getAllSections', $params);
	}
	

	/**
	 * Данные товаров в нужном формате для работы с отзывами
	 * @param $itemsData
	 * @return mixed
	 */
	function getProdsDataForResponse($itemsData)
	{
		return array_reduce($itemsData, function ($acc, $item) {
			[
				'ID' => $id,
				'NAME' => $name,
				'DETAIL_PAGE_URL' => $urn,
				'PREVIEW_PICTURE' => ['SRC' => $src],
			] = $item;
			
			$acc[$id] = compact('id', 'name', 'urn', 'src');
			
			return $acc;
		}, []);
	}
	

	/**
	 * Данные отзывов с текущими товарами
	 * @param $itemsData
	 * @return array
	 */
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
			] = $responseData;
			
			if (!array_key_exists($id, $responsesData)) {
				$responsesData[$id] = [];
				$responsesData[$id]['product'] = $itemsData[$id];
				$responsesData[$id]['response'] = compact('author', 'message', 'postDate');
				$responsesData[$id]['responseCount'] = -1;
			}
			
			$responsesData[$id]['responseCount']++;
		}
		
		return $responsesData;
	}
	

	/**
	 * Данные отзывов с текущими товарами из кэша
	 * @param $prodsDataForResponse
	 * @param $sectionCode
	 * @return bool
	 */
	function getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode)
	{
		$cacheTime = 3600;
		$cacheID = "responseDataWithProds{$sectionCode}";
		
		return returnResultCache($cacheTime, $cacheID, 'getResponseDataWithProds', $prodsDataForResponse);
	}
	

	/**
	 * отсортированные по убыванию количества отзывов к товарам данные отзывов
	 * @param $itemsData
	 * @return mixed
	 */
	function sortResponseDataWithProdsByCount($itemsData)
	{
		usort($itemsData, function ($a, $b) {
			return $b['responseCount'] - $a['responseCount'];
		});
		
		return $itemsData;
	}
	

	/**
	 * Данные отзывов о товаре
	 * @param $productID
	 * @return array
	 */
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
	

	/**
	 * Количество отзывов к товару
	 * @param $productID
	 * @return mixed
	 */
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