<?

	### получаем SECTION_CODE раздела каталога: ###
	function getCurrentSectionCodeInReviews($urn)
	{
		$requestUrnData = explode('/', $urn);
		$urnData = array_filter($requestUrnData, function ($partUrb) {
			return $partUrb != '';
		});
		
		return count($urnData) != 2 ? '' : $urnData[2];
	}
	
	
	###  проверяем на необходимость сортировки по количеству отзывов к товару: ###
	function isSortByCount()
	{
		$request = Context::getCurrent()->getRequest();
		
		return $request->getQuery("sort") === "count";
	}
	
	
	###  все разделы инфоблока: ###
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
	
	
	###  все разделы из кэша: ###
	function getAllSectionsFromCache($params)
	{
		$cacheTime = 3600 * 6;
		$cacheID = "allCatalogSections";
		
		return returnResultCache($cacheTime, $cacheID, 'getAllSections', $params);
	}
	
	
	###  данные товаров в нужном формате для работы с отзывами: ###
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
	
	
	###  данные отзывов с текущими товарами: ###
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
	
	
	###  данные отзывов с текущими товарами из кэша: ###
	function getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode)
	{
		$cacheTime = 3600;
		$cacheID = "responseDataWithProds{$sectionCode}";
		
		return returnResultCache($cacheTime, $cacheID, 'getResponseDataWithProds', $prodsDataForResponse);
	}
	
	
	### отсортированные по убыванию количества отзывов к товарам данные отзывов: ###
	function sortResponseDataWithProdsByCount($itemsData)
	{
		usort($itemsData, function ($a, $b) {
			return $b['responseCount'] - $a['responseCount'];
		});
		
		return $itemsData;
	}
	
	
	### данные отзывов о товаре: ###
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
	
	
	###  количество отзывов к товару: ###
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