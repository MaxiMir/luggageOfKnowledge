<?php
    
    #@@@ СОЗДАНИЕ ОТЗЫВОВ и ОБНОВЛЕНИЕ СВОЙСТВА ЭЛЕМЕНТА #@@@
    
    use Bitrix\Main\{Application, Context, Loader};
    
    require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
    require_once "./helper.php";
    
    Loader::includeModule("iblock");
    
    $connection = Application::getConnection();
    $context = Context::getCurrent();
    $request = $context->getRequest();
    
    if (!$request->isPost()) {
        return;
    }
    
    
    $postData = $request->getPostList()->toArray();
    $fullName = getUserFullName();
    $prodID = $postData["prodID"];
    
    ['error' => $errorCreate] = createResponse($postData, $fullName);
    
    if (!$errorCreate) {
        increasePropCountResponse($prodID);
        updateRatingProduct($prodID);
    }
    
    
    /**
     * Возвращает NAME и LAST_NAME пользователя
     * @return string
     */
    function getUserFullName()
    {
        global $USER;
        
        $userID = $USER->GetID();
        $userData = CUser::GetByID($userID)->Fetch();
        
        ["NAME" => $name, "LAST_NAME" => $lastName] = $userData;
        
        return "{$name} {$lastName}";
    }
    
    /**
     * ID созданного отзыва || ошибку
     * @param $responseData
     * @param $userFullName
     * @return array|void
     */
    function createResponse($responseData, $userFullName)
    {
        [
            "prodID" => $prodID,
            "sectionID" => $sectionID,
            "responseHTML" => $responseHTML,
            "rating" => $rating,
        ] = $responseData;
        
        if (!isset($prodID, $sectionID, $responseHTML, $rating)) {
            return;
        }
        
        $el = new CIBlockElement;
        
        $props = [
            'USER_NAME' => $userFullName,
            'RATING' => $rating,
            'PRODUCT' => $prodID,
            'CATALOG_SECTION' => $sectionID,
        ];
        
        
        $responseData = [
            "IBLOCK_ID" => RESPONSE_I_BLOCK_ID,
            "NAME" => $userFullName,
            "ACTIVE" => "Y",
            "PREVIEW_TEXT" => $responseHTML,
            "PREVIEW_TEXT_TYPE" => 'html',
            "PROPERTY_VALUES" => $props,
        ];
        
        
        if ($newElement = $el->Add($responseData)) {
            return ['id' => $newElement];
        }
        
        return ['error' => $el->LAST_ERROR];
    }
    
    /**
     * Обновление количества отзывов о товаре
     * @param $prodID
     */
    function increasePropCountResponse($prodID)
    {
        $responseCount = getProductResponseCount($prodID);
        $responseCountValue = !$responseCount ? 1 : ++$responseCount;
        
        CIBlockElement::SetPropertyValuesEx($prodID, false, ["vote_count" => $responseCountValue]);
    }
    
    /**
     * Обновление рейтинга товара
     * @param $prodID
     */
    function updateRatingProduct($prodID)
    {
        $productRating = getProductRating($prodID);
        
        CIBlockElement::SetPropertyValuesEx($prodID, false, ["rating" => $productRating]);
    }