<?php
    
    #@ Замена значений в свойствах #@
    
    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
    require_once "./helper.php";
    
    #1:
    const SPARES_SECTION_ID = 544;
    const FILE_SPARES = "spares.csv";
    
    $SELECT = ["ID", "NAME", "PROPERTY_*"];
    $FILTER = ["SECTION_ID" => SPARES_SECTION_ID];
    $fileSparesFullPath = __DIR__ . DIRECTORY_SEPARATOR . FILE_SPARES;
    
    $products = getProducts(compact("SELECT", "FILTER"));
    $properties = getIBlockProperties();
    $preparedData = prepareProductDataForCSV($products, $properties);
    
    writeInCSV($preparedData, $fileSparesFullPath);
    
    
    #2:
    $replacePropData = [
        "vysota_mm" => [" мм", ""],
        "dlina_mm" => [" мм", ""],
        "massa_kg" => [" кг", ""],
        "uroven_shuma_db" => [" дБ", ""],
        "chastota_napryazheniya_gts" => [" Гц", ""],
        "shirina_mm" => [" мм", ""],
    ];
    
    replaceInProductsProps($replacePropData);