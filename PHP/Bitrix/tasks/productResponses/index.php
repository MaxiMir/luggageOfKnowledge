<?php

	#@ СВЯЗКА ОТЗЫВОВ С ФОРУМА И ТОВАРОВ:

	// FILE: /responses/index.php:
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

	$APPLICATION->SetTitle("Последние отзывы о товарах");


	$urn = $APPLICATION->GetCurPage();
	$sectionParams = [
		"iBlockID" => CATALOG_I_BLOCK_ID,
		"arSelect" => ["NAME", "CODE"]
	];

	$sectionCode = getCurrentSectionCodeInReviews($urn);
	$isSortByCount = isSortByCount();
	$sectionsData = getAllSectionsFromCache($sectionParams);

	$GLOBALS['FORUM_RESPONSE'] = ['!PROPERTY_FORUM_MESSAGE_CNT' => false];

	$APPLICATION->IncludeComponent(
		"bitrix:catalog.section",
		"_response_elements",
		[
			'IBLOCK_TYPE' => 'catalog',
			'IBLOCK_ID' => CATALOG_I_BLOCK_ID,
			'SECTION_ID' => '',
			'SECTION_CODE' => $sectionCode,
			'FILTER_NAME' => 'FORUM_RESPONSE',
			// ..
			'ADDITIONAL_DATA' => compact('urn', 'isSortByCount', 'sectionsData')
		],
		false,
		["HIDE_ICONS" => "Y"]
	);