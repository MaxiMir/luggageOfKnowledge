<?php
    
    if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
        die();
    }
    
    use \Bitrix\Main\Loader;
    
    /**
     * @global CUser $USER
     * @global CMain $APPLICATION
     */
    class CAdvertCatalogSection extends \CBitrixComponent
    {
        private $iBlockID = 28;
        
        function __constructor()
        {
            parent::__constructor();
            
            Loader::includeModule("iblock");
        }
        
        /**
         * @param $arIdProduct
         */
        private function getProducts($arIdProduct)
        {
            $obElement = new CIBlockElement();
            
            $navParams = [
                "bShowAll" => false,
            ];
            
            if ($this->arParams["LIMIT"]) {
                $navParams["nTopCount"] = $this->arParams["LIMIT"];
            }
            
            if ($this->arParams["nPageSize"]) {
                $navParams["nPageSize"] = $this->arParams["nPageSize"];
            }
            
            $dbResElement = $obElement->GetList(
                [],
                [
                    "ID" => $arIdProduct
                ],
                false,
                $navParams,
                [
                    "ID",
                    "NAME",
                    "PREVIEW_PICTURE",
                    "DETAIL_PICTURE",
                    "DETAIL_PAGE_URL",
                    "PROPERTY_MORE_PHOTO",
                ]
            );
            
            while ($arElement = $dbResElement->GetNext()) {
                [
                    "ID" => $elemID,
                    "NAME" => $name
                ] = $arElement;
                
                $arElement["IMG_SRC"] = $this->getProductImage($arElement);
                $arElement["TITLE"] = $this->generateProductTitle($name);
                $arElement["PRICE_DATA"] = $this->getProductPriceData($elemID);
                
                $this->arResult["ITEMS"][$elemID] = $arElement;
            }
            
            $this->arResult["NAV"] = $dbResElement;
        }
        
        /**
         * @param $elemID
         * @return array|void
         */
        public function getProductOffers($elemID)
        {
            $offersData = [];
            
            $productInfo = CCatalogSKU::GetInfoByProductIBlock($this->iBlockID);
            
            if (!is_array($productInfo)) {
                return;
            }
            
            ['IBLOCK_ID' => $iBlockID, 'SKU_PROPERTY_ID' => $skuPropID] = $productInfo;
            
            $arrFilter = ['IBLOCK_ID' => $iBlockID, "PROPERTY_{$skuPropID}" => $elemID];
            $offersDBData = CIBlockElement::GetList([], $arrFilter);
            
            while ($offerData = $offersDBData->GetNext()) {
                $offersData[] = $offerData;
            }
            
            return $offersData;
        }
        
        /**
         * @param $productName
         * @return false|string
         */
        private function generateProductTitle($productName)
        {
            $searchPhrase = $this->arParams["SEARCH_PHRASE"];
            $searchPhraseStart = stripos($productName, $searchPhrase);
            $searchPhraseFinish = strlen($searchPhrase);
            $replacePhrase = substr($productName, $searchPhraseStart, $searchPhraseFinish);
            
            return mb_eregi_replace($searchPhrase, "<b>$replacePhrase</b>", $productName, "i");
        }
        
        /**
         * @param $idImage
         * @return mixed
         */
        public function getMiniImageSrc($idImage)
        {
            $imgData = CFile::ResizeImageGet($idImage, ['width' => 70, 'height' => 70], BX_RESIZE_IMAGE_EXACT, true);
            return $imgData["src"];
        }
        
        /**
         * @param $arElement
         * @return mixed|string|null
         */
        public function getProductImage($arElement)
        {
            $imgSrc = null;
            
            [
                "ID" => $elemID,
                "PREVIEW_PICTURE" => $previewPicture,
                "DETAIL_PICTURE" => $detailPicture,
                "PROPERTY_MORE_PHOTO_VALUE" => $morePhotoData
            ] = $arElement;
            
            if ($previewPicture) {
                $imgSrc = $this->getMiniImageSrc($previewPicture);
            } elseif ($detailPicture) {
                $imgSrc = $this->getMiniImageSrc($detailPicture);
            } elseif ($morePhotoData) {
                $imageID = !is_array($morePhotoData) ? $morePhotoData : $morePhotoData[0];
                $imgSrc = $this->getMiniImageSrc($imageID);
            } else {
                $offersData = $this->getProductOffers($elemID);
                
                foreach ($offersData as ["DETAIL_PICTURE" => $detailImgID, "PREVIEW_PICTURE" => $previewImgID]) {
                    if ($previewImgID) {
                        $imgSrc = $this->getMiniImageSrc($previewImgID);
                        break;
                    }
                    
                    if ($detailImgID) {
                        $imgSrc = $this->getMiniImageSrc($detailImgID);
                        break;
                    }
                }
            }
            
            return $imgSrc ?? "/images/no-photo_150.png";
        }
        
        /**
         * @param $elemID
         * @return array|void
         */
        private function getProductPriceData($elemID)
        {
            $userGroupArray = $GLOBALS["USER"]->GetUserGroupArray();
            
            ["RESULT_PRICE" => $resultPrice] = CCatalogProduct::GetOptimalPrice($elemID, 1, $userGroupArray, 'N');
            
            [
                "DISCOUNT" => $discount,
                "BASE_PRICE" => $basePrice,
                "DISCOUNT_PRICE" => $discountPrice
            ] = $resultPrice;
            
            
            if (!$discountPrice && !$basePrice) {
                return;
            }
            
            $price = $discount ? $discountPrice : $basePrice;
            
            return explode('.', (string)$price);
        }
        
        /**
         * выполняет логику работы компонента
         */
        public function executeComponent()
        {
            try {
                $arElemId = $this->arParams["IDS"];
                
                if ($arElemId) {
                    $this->getProducts($arElemId);
                }
                
                $this->includeComponentTemplate();
            } catch (Exception $e) {
                ShowError($e->getMessage());
            }
        }
    }