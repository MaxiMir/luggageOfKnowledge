<?php
	
	$iBlockID = $arParams["IBLOCK_ID"];
	[
		"VARIABLES" => [
			"SECTION_ID" => $sectionID,
			"SMART_FILTER_PATH" => $filterPath,
		]
	] = $arResult;
	
	#@ FILTER SECTION DATA: @#
	$brandsFullPath = "";
	$sectionWithBrands = [];
	$popularSubSections = getPopularSubSectionsID($sectionID);
	
	if ($popularSubSections && $filterPath) {
		$brandsFilterPath = getBrandsFilterPath($filterPath);
		$filterNames = getFilterNames($brandsFilterPath);
		$brandsID = getBrandIDByName($filterNames);
		$sectionWithBrands = getSectionsWithBrands($popularSubSections, $brandsID);
		$brandsFullPath = getBrandsFilterFullPath($brandsFilterPath);
	}
	
	$filterData = compact("brandsFullPath", "sectionWithBrands");
	
	$APPLICATION->IncludeComponent(
		"bitrix:catalog.section.list",
		"front_sections",
		[
			// ..
			"_FILTER_DATA" => $filterData
		],
		$component
	);