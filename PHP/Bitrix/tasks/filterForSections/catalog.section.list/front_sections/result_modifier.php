<?php
	
	["brandsFullPath" => $brandsFullPath, "sectionWithBrands" => $sectionWithBrands] = $arParams["_FILTER_DATA"];
	
	if ($brandsFullPath && $sectionWithBrands) {
		$sections = array_map(function ($section) use ($brandsFullPath, $sectionWithBrands) {
			["ID" => $sectionID, "SECTION_PAGE_URL" => $sectionURN] = $section;
			
			if (in_array($sectionID, $sectionWithBrands)) {
				$section["SECTION_PAGE_URL"] = $sectionURN . $brandsFullPath;
			}
			
			return $section;
		}, $arResult["SECTIONS"]);
		
		$arResult["SECTIONS"] = $sections;
	}