<?php
    
    # FILE: /local/templates/**/components/bitrix/catalog.smart.filter/**/template.php:
    
    
    // ! Без Sotbit Seo Meta:
    
    $filterURNs = $arResult["SMART_FILTER_URN"];
    
    // ...
    
    ["CONTROL_ID" => $id, "VALUE" => $value, "ELEMENT_COUNT" => $count] = $ar;
?>

<a href="<?=$filterURNs[$id]?>">
    <span class="bx_filter_param_text" title="<?= $value; ?>"><?= $value; ?>
        <? if ($arParams["DISPLAY_ELEMENT_COUNT"] !== "N" && isset($count) && !$isSize): ?>
            (<span data-role="count_<?= $id ?>"><?= $count; ?></span>)
        <? endif; ?>
    </span>
</a>


<?php
    // ! C Sotbit Seo Meta:
    
    ["SMART_FILTER_URN" => $filterURNs, "SMART_FILTER_URN_CHPU" => $chpuUrns] = $arResult;
    
    // ...
?>

<span class="bx_filter_input_checkbox">
    <?php
        ["CONTROL_ID" => $id, "VALUE" => $value, "ELEMENT_COUNT" => $count] = $ar;
        $filterUrn = $filterURNs[$id];
        $urn = $chpuUrns[$filterUrn] ?: $filterUrn;
    ?>
    <a href="<?=$urn?>">
        <span class="bx_filter_param_text" title="<?= $value; ?>"><?= $value; ?>
            <?php if ($arParams["DISPLAY_ELEMENT_COUNT"] !== "N" && isset($count) && !$isSize): ?>
                (<span data-role="count_<?= $id ?>"><?= $count; ?></span>)
            <?php endif; ?>
        </span>
    </a>
</span>