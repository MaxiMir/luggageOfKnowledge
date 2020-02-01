<?php
    
    # FILE: /local/components/bitrix/catalog.smart.filter/class.php
    
    class CBitrixCatalogSmartFilter extends CBitrixComponent
    {
        // ...
        
        /**
         * @param $url
         * @return array
         */
        public function getSmartURNs(string $url): array
        {
            $smartParts = [];
        
            foreach ($this->arResult["ITEMS"] as $arItem) {
                ['ID' => $id, 'VALUES' => $values, 'CODE' => $code, 'PRICE' => $price] = $arItem;
            
                if ($price || !$values) {
                    continue;
                }
            
                foreach ($values as ['URL_ID' => $urlID, 'CONTROL_ID' => $controlID]) {
                    $smartPartData = [];
                    $smartPartData[] = $code ? toLower($code) : $id;
                    $smartPartData[] = $urlID;
                
                    $encSmartPart = implode('-is-', $smartPartData);
                    $filterURN = str_replace("#SMART_FILTER_PATH#", $encSmartPart, $url);
                    $smartParts[$controlID] = $filterURN;
                }
            }
        
            return $smartParts;
        }
    }
    
    
    # FILE: /local/components/bitrix/catalog.smart.filter/component.php:
    if ($arParams["SEF_MODE"] == "Y") {
        #@ Генерация URNs для фильтра:
        $arResult["SMART_FILTER_URN"] = $this->getSmartURNs($url);
    }
    
    # FILE: /local/templates/aspro_next/components/bitrix/catalog.smart.filter/main/template.php:
    // ...
    $filterURNs = $arResult["SMART_FILTER_URN"];
    ["CONTROL_ID" => $id, "VALUE" => $value, "ELEMENT_COUNT" => $count] = $ar;
?>

    <a href="<?=$filterURNs[$id]?>">
        <span class="bx_filter_param_text" title="<?= $value; ?>"><?= $value; ?>
            <? if ($arParams["DISPLAY_ELEMENT_COUNT"] !== "N" && isset($count) && !$isSize): ?>
                (<span data-role="count_<?= $id ?>"><?= $count; ?></span>)
            <? endif; ?>
        </span>
    </a>
