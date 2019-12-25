<?php
    
    $iBlockID = $arParams["IBLOCK_ID"];
    [
        "VARIABLES" => [
            "SECTION_ID" => $sectionID,
            "SMART_FILTER_PATH" => $filterPath,
        ]
    ] = $arResult;
    
    #@ FILTER SECTION DATA: @#
    $filterData = getFilterData($sectionID, $filterPath);
    
    $APPLICATION->IncludeComponent(
        "bitrix:catalog.section.list",
        "front_sections",
        [
            // ..
            "_FILTER_DATA" => $filterData
        ],
        $component
    );