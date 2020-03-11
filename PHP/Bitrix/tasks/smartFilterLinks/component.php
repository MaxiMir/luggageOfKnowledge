<?php
    
    # FILE: /local/components/bitrix/catalog.smart.filter/component.php:
    
    // ...
    
    if ($arParams["SEF_MODE"] == "Y") {
        // ...
        $arResult["JS_FILTER_PARAMS"]["SEF_SET_FILTER_URL"] = $this->makeSmartUrl($url, true);
        
        
        #@ Генерация URNs для фильтра:
        $arResult["SMART_FILTER_URN"] = $this->getSmartURNs($url);
        
        // ИЛИ:
        
        #@ Генерация URNs для фильтра c учетом Sotbit Seo Meta:
        $smartURNsData = $this->getSmartURNs($url);
        $smartURNs = array_values($smartURNsData);
        
        $arResult["SMART_FILTER_URN"] = $smartURNsData;
        $arResult["SMART_FILTER_URN_CHPU"] = $this->getSotbitSmartURNs($smartURNs);
    }