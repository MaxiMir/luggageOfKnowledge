<?php
    
    /**
     * Запись данных в CSV файл
     * @param $filePath
     * @param $contentData
     * @param $delimiter
     */
    function writeInCSV($filePath, $contentData, $delimiter = ";")
    {
        $file = new SplFileObject($filePath, 'a');;
        
        foreach ($contentData as $fields) {
            $file->fputcsv($fields, $delimiter);
        }
    }
    
    /**
     * Возвращает массив данных из файла CSV
     * @param $fileName
     * @return array
     * @throws Exception
     */
    function getCSVData($fileName)
    {
        $csvData = [];
        
        if (!file_exists($fileName)) {
            throw new Exception('Файл не найден');
        }
        
        $csvFile = new SplFileObject($fileName);
        
        while (!$csvFile->eof()) {
            try {
                $data = $csvFile->fgetcsv(';');
                
                if (empty($data[0])) {
                    continue;
                }
                
                $csvData[] = $data;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }
        
        return $csvData;
    }

    
    
    /**
     * [
     *    'id' => созданной новости || false,
     *    'error' => ошибка при создании || null
     * ]
     * @param $newsData
     * @param $newsSectionData
     * @return array
     */
    function createNews($newsData, $newsSectionData)
    {
        $dirWithImg = implode(DIRECTORY_SEPARATOR, [__DIR__, 'pic']) . DIRECTORY_SEPARATOR;
        
        [$id, $stamp, $time, $date, $title, $text, $img, $imgExt] = $newsData;
        
        $iBlockSection = $newsSectionData[$id] ?? '';
        $previewText = getTrimLine($text, 350);
        $imgDetailPath = "{$dirWithImg}{$stamp}$imgExt";
        $imgPreviewPath = "{$dirWithImg}{$stamp}_{$img}$imgExt";
        
        $el = new CIBlockElement;
        
        $newsData = [
            "IBLOCK_ID" => ARTICLES_I_BLOCK_ID,
            "IBLOCK_SECTION" => $iBlockSection,
            "NAME" => $title,
            "CODE" => $id,
            "ACTIVE" => "Y",
            "PREVIEW_TEXT" => $previewText,
            "PREVIEW_TEXT_TYPE" => 'html',
            "DETAIL_TEXT" => $text,
            "DETAIL_TEXT_TYPE" => 'html'
        ];
        
        if (file_exists($imgDetailPath)) {
            $newsData["DETAIL_PICTURE"] = CFILE::MakeFileArray($imgDetailPath);
        }
        
        if (file_exists($imgPreviewPath)) {
            $newsData["PREVIEW_PICTURE"] = CFILE::MakeFileArray($imgPreviewPath);
        }
        
        if ($newElement = $el->Add($newsData)) {
            return ['id' => $newElement];
        }
        
        return ['error' => $el->LAST_ERROR];
    }
    
    
    
    /**
     * @param $sectionName
     * @param $parentSectionID
     * @param $sectionCODE
     * @param $blockID
     */
    function createSection($sectionName, $parentSectionID, $sectionCODE, $blockID)
    {
        $bSection = new CIBlockSection;
        
        $arFields = [
            "ACTIVE" => "Y",
            "IBLOCK_ID" => $blockID,
            "CODE" => $sectionCODE,
            "NAME" => $sectionName,
        ];
        
        if (!is_null($parentSectionID)) {
            $arFields["IBLOCK_SECTION_ID"] = $parentSectionID;
        }
        
        if (!$bSection->Add($arFields)) {
            die($bSection->LAST_ERROR);
        }
    }
    
    /**
     * @param $data
     */
    function updateSections($data)
    {
        foreach ($data as $itemData) {
            $bs = new CIBlockSection;
            
            [$ID, $NAME, $SECTION_META_TITLE, $SECTION_META_DESCRIPTION] = $itemData;
            $arFields = compact('NAME');
            $arFields["IPROPERTY_TEMPLATES"] = compact('SECTION_META_TITLE', 'SECTION_META_DESCRIPTION');
            
            if (!$bs->Update($ID, $arFields)) {
                echo "Не удалось обновить меты у ID: {$ID} <br>";
            }
        }
    }

    /**
     * @param $data
     * @return array
     */
    function createProduct($data)
    {
        $imgFolder = "{$_SERVER['DOCUMENT_ROOT']}/productUploader/img/products/";
        
        [
            $urn,
            $NAME,
            $listPhotos,
            $PRICE,
            $DETAIL_TEXT,
            $parentSectionID,
            $TITLE,
            $DESCRIPTION,
            $SQUARE,
            $STONE,
            $TERM_OF_PRODUCTION,
            $COLOR,
            $SIZE,
            $WASH_PRICE,
            $ADD_INSTALLED,
            $MATERIAL,
            $SERVICES,
            $SINK_METAL_COST,
            $WASH,
            $WASH_INTEGRATED,
            $GROOVE_FOR_WATER,
            $WASH_INTEGRATED_LIT,
            $EQUIPMENT
        ] = $data;
        
        $element = new CIBlockElement;
        
        
        # свойства элемента:
        $props = compact(
            'PRICE', 'SQUARE', 'TERM_OF_PRODUCTION', 'COLOR', 'SIZE',
            'WASH_PRICE', 'ADD_INSTALLED', 'SERVICES', 'SINK_METAL_COST', 'WASH',
            'WASH_INTEGRATED', 'GROOVE_FOR_WATER', 'WASH_INTEGRATED_LIT', 'EQUIPMENT'
        );
        
        # Детальное изображение + галерея:
        $photos = explode(',', $listPhotos);
        $mainImgName = array_shift($photos);
        $mainImg = "{$imgFolder}{$mainImgName}";
        
        $props["STONE"] = getElementIDByName($STONE, PALETTE_IBLOCK_ID);
        $props["MATERIAL"] = getSectionIDByName($MATERIAL, PALETTE_IBLOCK_ID);
        
        if (!empty($photos)) {
            $props["GALLERY"] = array_reduce(array_keys($photos), function ($acc, $key) use ($photos, $imgFolder) {
                $imgPath = "{$imgFolder}{$photos[$key]}";
                
                $acc["n{$key}"] = [
                    "VALUE" => CFILE::MakeFileArray($imgPath),
                ];
                
                return $acc;
            }, []);
        }
        
        $productData = [
            "IBLOCK_ID" => CATALOG_IBLOCK_ID,
            "IBLOCK_SECTION" => [$parentSectionID],
            "NAME" => $NAME,
            "CODE" => getSymbolCode($urn),
            "PROPERTY_VALUES" => $props,
            "ACTIVE" => "Y",
            "DETAIL_TEXT" => $DETAIL_TEXT,
            "DETAIL_TEXT_TYPE" => 'html',
            "DETAIL_PICTURE" => CFILE::MakeFileArray($mainImg),
            "PREVIEW_PICTURE" => CFILE::MakeFileArray($mainImg),
            "IPROPERTY_TEMPLATES" => [
                "ELEMENT_META_TITLE" => $TITLE,
                "ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
            ],
        ];
        
        if ($PRODUCT_ID = $element->Add($productData)) {
            return ['result' => true, 'error' => null];
        }
        
        return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];
        
    }
    
    /**
     * @param $data
     * @return array
     */
    function createStone($data)
    {
        $imgFolder = "{$_SERVER['DOCUMENT_ROOT']}/productUploader/img/stones/";
        
        [
            $URN,
            $NAME,
            $listPhotos,
            $PRICE,
            $DETAIL_TEXT,
            $PARENT_SECTION_NAME,
            $TITLE,
            $DESCRIPTION,
            $MANUFACTURER,
            $COLOUR,
            $ARTICLE,
            $COLOR_TYPE,
            $POLISHING
        ] = $data;
        
        $element = new CIBlockElement;
        
        $sectionID = getSectionIDByName($PARENT_SECTION_NAME, PALETTE_IBLOCK_ID);
        
        # свойства элемента:
        $props = compact('PRICE', 'MANUFACTURER', 'COLOUR', 'ARTICLE', 'COLOR_TYPE', 'POLISHING');
        
        # Детальное изображение + галерея:
        $photos = explode(',', $listPhotos);
        $mainImgName = array_shift($photos);
        $mainImg = "{$imgFolder}{$mainImgName}";
        
        if (!empty($photos)) {
            $props["GALLERY"] = array_reduce(array_keys($photos), function ($acc, $key) use ($photos, $imgFolder) {
                $imgPath = "{$imgFolder}{$photos[$key]}";
                
                $acc["n{$key}"] = [
                    "VALUE" => CFILE::MakeFileArray($imgPath),
                ];
                
                return $acc;
            }, []);
        }
        
        $productData = [
            "IBLOCK_ID" => PALETTE_IBLOCK_ID,
            "IBLOCK_SECTION" => [$sectionID],
            "NAME" => $NAME,
            "CODE" => getSymbolCode($URN),
            "PROPERTY_VALUES" => $props,
            "ACTIVE" => "Y",
            "DETAIL_TEXT" => $DETAIL_TEXT,
            "DETAIL_TEXT_TYPE" => 'html',
            "DETAIL_PICTURE" => CFILE::MakeFileArray($mainImg),
            "PREVIEW_PICTURE" => CFILE::MakeFileArray($mainImg),
            "IPROPERTY_TEMPLATES" => [
                "ELEMENT_META_TITLE" => $TITLE,
                "ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
            ],
        ];
        
        if ($PRODUCT_ID = $element->Add($productData)) {
            return ['result' => true, 'error' => null];
        } else {
            return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];
        }
    }
    
    /**
     * @param $data
     * @param $fnName
     * @return array
     */
    function createElements($data, $fnName)
    {
        $result = [
            'errors' => [],
            'count' => 0
        ];

        foreach ($data as $key => $data) {
            if (!$key) {
                continue;
            }

            ['error' => $errorCreate] = $fnName($data);

            if ($errorCreate) {
                $result['errors'][] = $errorCreate;
                continue;
            }

            ++$result['count'];
        }

        return $result;
    }


