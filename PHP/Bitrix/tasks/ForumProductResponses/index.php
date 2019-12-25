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
	$additionalData = compact('urn', 'isSortByCount', 'sectionsData');
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
						// ...
						'IBLOCK_ID' => CATALOG_I_BLOCK_ID,
						'SECTION_CODE' => $sectionCode,
						'PAGE_ELEMENT_COUNT' => RESPONSE_CATALOG_COUNT,
						'ADDITIONAL_DATA' => $additionalData
					],
					false,
					["HIDE_ICONS" => "Y"]
				);
			?>
		</section>
	</div>

<?
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
