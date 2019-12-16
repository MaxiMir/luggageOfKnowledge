<?php

	#@@@ Изменение input: @@@#

	use Bitrix\Main\Context;

	require "{$_SERVER['DOCUMENT_ROOT']}/bitrix/modules/main/include/prolog_before.php";

	const CITY_I_BLOCK_ID = 15;

	$context = Context::getCurrent();
	$request = $context->getRequest();

	if ( ! $request->isPost() && ! $request->getPost("cityName")) {
		return;
	}

	['cityName' => $cityName] = $request->getPostList()->toArray();
	$cityData = getCityDataByName($cityName);

	if ( ! $cityData) {
		return;
	}

	$response = [
		"inTown" => $cityData["PROPERTY_VS_VGOROD_VALUE"],
		"deliveryPrice" => $cityData["PROPERTY_VS_MIN_DELIVERY_PRICE_VALUE"],
		"deliveryTime" => $cityData["PROPERTY_VS_MIN_DELIVERY_VALUE"]
	];

	echo json_encode($response);


	/**
	 * @param $cityName
	 * @return bool || данные по городу
	 */
	function getCityDataByName($cityName)
	{
		$arFilter = [
			"IBLOCK_ID" => CITY_I_BLOCK_ID,
			"PROPERTY_VS_GOROD" => $cityName,
			"ACTIVE" => "Y"
		];

		$arSelect = [
			"ID",
			"IBLOCK_ID",
			"PROPERTY_VS_VGOROD",
			"PROPERTY_VS_MIN_DELIVERY_PRICE",
			"PROPERTY_VS_MIN_DELIVERY"
		];

		$cityDBData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

		return $cityDBData->Fetch();
	}