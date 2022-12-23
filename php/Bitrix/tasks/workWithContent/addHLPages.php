<?php

  require_once "{$_SERVER["DOCUMENT_ROOT"]}/bitrix/modules/main/include/prolog_before.php";
  require_once "./helper.php";

  const HL_FILTER_PAGES = 8;
  const CSV_FILE = 'data.csv';

  try {
    $data = getCSVData(CSV_FILE);
    $entity_data_class = GetEntityDataClass(HL_FILTER_PAGES);

    foreach ($data as $item) {
      $keys = [
        'UF_H1',
        'UF_TITLE',
        'UF_DESCRIPTION',
        'UF_LINK_NAME',
        'UF_SECTION_ID',
        'UF_BRAND_ID',
        'UF_BRAND_NAME',
        'UF_CODE',
        'UF_SERIES'
      ];

      $itemData = array_combine($keys, $item);
      $result = $entity_data_class::add($itemData);
    }
  } catch (Exception $e) {
    throw $e;
  }





