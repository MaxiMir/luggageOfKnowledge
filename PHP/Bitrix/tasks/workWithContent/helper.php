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




