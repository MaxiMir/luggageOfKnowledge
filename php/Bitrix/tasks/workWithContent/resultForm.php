<?php
    
    #@@@ ЗАЛИВКА РЕЗУЛЬТОВ ФОРМЫ: @@@#
    
    use Bitrix\Main\Loader;
    
    require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
    
    Loader::includeModule("form");
    
    $responsesData = getCSVData(RESPONSES_CSV_FILE);
    
    [
        'errors' => $errorsResponses,
        'createdCount' => $createdResponsesCount,
    ] = addAllResponses($responsesData);
    
    /**
     * [
     *   'errors' => ошибки,
     *   'createdCount' => количество созданных отзывов
     * ]
     * @param $responsesData
     * @return array
     */
    function addAllResponses($responsesData)
    {
        $result = [
            'errors' => [],
            'createdCount' => 0
        ];
        
        foreach ($responsesData as $key => $responseData) {
            if (!$key) {
                continue;
            }
            
            $resultAdd = addResponseFormResult($responseData);
            
            if (!$resultAdd) {
                $result['errors'][] = "Не удалось создать отзыв с данными со строки: {$key}";
                continue;
            }
            
            ++$result['createdCount'];
            
        }
        
        return $result;
    }
    
    /**
     * Создание отзыва с обновленной датой
     * @param $data
     * @return bool
     */
    function addResponseFormResult($data)
    {
        global $DB;
        
        [$name, $email, $date, $response] = $data;
        
        $formData = [
            "form_text_47" => $name,
            "form_email_48" => $email,
            "form_textarea_49" => $response
        ];
        
        if (!$resultFID = CFormResult::Add(FORM_RESPONSE_COMPANY_ID, $formData, "N")) {
            return false;
        }
        
        $DB->PrepareFields("b_form_result");
        
        $dbData = [
            "DATE_CREATE" => "'{$date}'"
        ];
        
        return $DB->Update("b_form_result", $dbData, "WHERE ID='{$resultFID}'") === 1;
    }
?>

    <p>Создано отзывов: <b><?= $createdResponsesCount ?></b></p>

<? if ($errorsResponses): ?>
    <p><b>Ошибки:</b></p>
    <p><?= implode("<br>", $errorsResponses) ?> </p>
<? endif; ?>