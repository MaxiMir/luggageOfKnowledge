<?php
	
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	$APPLICATION->SetPageProperty("title", "Последние отзывы");
	$APPLICATION->SetTitle("Последние отзывы о товарах");
	
	
	$urn = $APPLICATION->GetCurPage();
	$sectionParams = [
		"iBlockID" => CATALOG_I_BLOCK_ID,
		"arSelect" => ["NAME", "CODE"]
	];
	
	$sectionCode = getCurrentSectionCodeInReviews($urn);
	$isSortByCount = isSortByCount();
	$sectionsData = getAllSectionsFromCache($sectionParams);
?>


<? #@@@ отзывы о товарах в reviews: @@@# ?>
	<div class="maxwidth-theme">
		<section id="responses">
			<?
				$GLOBALS['FORUM_RESPONSE'] = ['!PROPERTY_FORUM_MESSAGE_CNT' => false];
				
				$APPLICATION->IncludeComponent(
					"bitrix:catalog.section",
					"_response_elements",
					[
						'IBLOCK_TYPE' => 'aspro_next_catalog',
						'IBLOCK_ID' => CATALOG_I_BLOCK_ID,
						'SECTION_ID' => '',
						'SECTION_CODE' => $sectionCode,
						'TABS_CODE' => '',
						'SECTION_USER_FIELDS' => [],
						'ELEMENT_SORT_FIELD' => 'sort',
						'ELEMENT_SORT_ORDER' => 'asc',
						'ELEMENT_SORT_FIELD2' => 'id',
						'ELEMENT_SORT_ORDER2' => 'desc',
						'FILTER_NAME' => 'FORUM_RESPONSE',
						'INCLUDE_SUBSECTIONS' => 'N',
						'SHOW_ALL_WO_SECTION' => 'Y',
						'HIDE_NOT_AVAILABLE' => 'N',
						'PAGE_ELEMENT_COUNT' => RESPONSE_CATALOG_COUNT,
						'LINE_ELEMENT_COUNT' => "",
						'PROPERTY_CODE' => [],
						'OFFERS_LIMIT' => '0',
						'SECTION_URL' => '',
						'DETAIL_URL' => '',
						'BASKET_URL' => '/basket/',
						'ACTION_VARIABLE' => 'action',
						'PRODUCT_ID_VARIABLE' => 'id',
						'PRODUCT_QUANTITY_VARIABLE' => 'quantity',
						'PRODUCT_PROPS_VARIABLE' => 'prop',
						'SECTION_ID_VARIABLE' => 'SECTION_ID',
						'AJAX_MODE' => 'N',
						'AJAX_OPTION_JUMP' => 'N',
						'AJAX_OPTION_STYLE' => 'Y',
						'AJAX_OPTION_HISTORY' => 'N',
						'CACHE_TYPE' => 'A',
						'CACHE_TIME' => '36000000',
						'CACHE_GROUPS' => 'N',
						'CACHE_FILTER' => 'N',
						'META_KEYWORDS' => '-',
						'META_DESCRIPTION' => '-',
						'BROWSER_TITLE' => '-',
						'ADD_SECTIONS_CHAIN' => 'N',
						'DISPLAY_COMPARE' => 'Y',
						'SET_TITLE' => 'N',
						'SET_STATUS_404' => 'N',
						'PRICE_CODE' => [
							0 => 'BASE',
							1 => 'OPT',
						],
						'USE_PRICE_COUNT' => 'Y',
						'SHOW_PRICE_COUNT' => '1',
						'PRICE_VAT_INCLUDE' => 'Y',
						'PRODUCT_PROPERTIES' => [],
						'USE_PRODUCT_QUANTITY' => 'N',
						'CONVERT_CURRENCY' => 'N',
						'DISPLAY_TOP_PAGER' => 'N',
						'DISPLAY_BOTTOM_PAGER' => 'Y',
						'PAGER_TITLE' => 'Товары',
						'PAGER_SHOW_ALWAYS' => 'Y',
						'PAGER_TEMPLATE' => '.default',
						'PAGER_DESC_NUMBERING' => 'N',
						'PAGER_DESC_NUMBERING_CACHE_TIME' => '36000',
						'PAGER_SHOW_ALL' => 'N',
						'DISCOUNT_PRICE_CODE' => '',
						'AJAX_OPTION_ADDITIONAL' => '',
						'SHOW_ADD_FAVORITES' => 'Y',
						'SECTION_NAME_FILTER' => '',
						'SECTION_SLIDER_FILTER' => '21',
						'COMPONENT_TEMPLATE' => 'main',
						'OFFERS_FIELD_CODE' => [
							0 => 'ID',
							1 => '',
							2 => 'DETAIL_PAGE_URL',
							3 => 'NAME',
						],
						'OFFERS_PROPERTY_CODE' => [],
						'OFFERS_SORT_FIELD' => 'sort',
						'OFFERS_SORT_ORDER' => 'asc',
						'OFFERS_SORT_FIELD2' => 'id',
						'OFFERS_SORT_ORDER2' => 'desc',
						'SHOW_MEASURE' => 'Y',
						'OFFERS_CART_PROPERTIES' => [],
						'DISPLAY_WISH_BUTTONS' => 'Y',
						'SHOW_DISCOUNT_PERCENT' => 'N',
						'SHOW_OLD_PRICE' => 'Y',
						'SHOW_RATING' => 'Y',
						'SALE_STIKER' => 'SALE_TEXT',
						'SHOW_DISCOUNT_TIME' => 'N',
						'STORES' => [
							0 => '2',
						],
						'STIKERS_PROP' => 'HIT',
						'SET_SKU_TITLE' => 'Y',
						'DISPLAY_TYPE' => 'block',
						'USE_PERMISSIONS' => '',
						'GROUP_PERMISSIONS' => [
							0 => '1',
						],
						'OFFER_TREE_PROPS' => [],
						'USE_REGION' => 'Y',
						'PROP_CODE' => 'HIT',
						'FILTER_HIT_PROP' => 'HIT',
						'USE_FILTER' => 'Y',
						'ADDITIONAL_DATA' => compact('urn', 'isSortByCount', 'sectionsData')
					],
					false,
					["HIDE_ICONS" => "Y"]
				);
			?>
		</section>
	</div>


<?
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
