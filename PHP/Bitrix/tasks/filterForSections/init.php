<?php
    
    declare(strict_types=1);
    
    /**
     * Абстракция для выборки элементов ИБ
     *
     * @param array $params
     * @return array
     */
    function getElements(array $params): array
    {
        $elements = [];
        $filterDefault = [
            "ACTIVE" => "Y",
            "IBLOCK_ID" => IBLOCK_ID_CATALOG,
        ];
        
        ["select" => $selectProduct, "filter" => $filterProduct, "sort" => $sortProduct, "limit" => $limit] = $params;
        
        $select = $selectProduct ?? ["*"];
        $filter = !$filterProduct ? $filterDefault : array_replace($filterDefault, $filterProduct);
        $sort = $sortProduct ?? [];
        $limitElements = !$limit ? false : ["nPageSize" => $limit];
        
        $productDBData = CIBlockElement::Getlist($sort, $filter, false, $limitElements, $select);
        
        while ($element = $productDBData->GetNext()) {
            $isSingleColumnQuery = sizeof($select) === 1 && $select !== ["*"];
            $elementData = !$isSingleColumnQuery ? $element : $element[$select[0]];
    
            if (isset($element['ID'])) {
                $elements[$element['ID']] = $elementData;
                continue;
            }
    
            $elements[] = $elementData;
        }
        
        return $elements;
    }
    
    /**
     * Абстракция для выборки разделов ИБ
     *
     * @param array $params
     * @return array
     */
    function getSections(array $params): array
    {
        $sections = [];
        $filterDefault = [
            "ACTIVE" => "Y",
            "IBLOCK_ID" => IBLOCK_ID_CATALOG,
        ];
        
        ["select" => $selectSection, "filter" => $filterSection, "sort" => $sortSection] = $params;
        
        $select = $selectSection ?: ["*"];
        $filter = !$filterSection ? $filterDefault : array_replace($filterDefault, $filterSection);
        $sort = $sortSection ?? [];
        
        $productDBData = CIBlockSection::Getlist($sort, $filter, false, $select);
        
        while ($section = $productDBData->GetNext()) {
            $isSingleColumnQuery = sizeof($select) === 1 && $select !== ["*"];
            
            $sections[] = !$isSingleColumnQuery ? $section : $section[$select[0]];
        }
        
        return $sections;
    }
    
    /**
     * Возвращает популярные подразделы для выбранного раздела
     *
     * @param $sectionID
     * @return array
     */
    function getPopularSubSectionsID($sectionID): array
    {
        $select = ["ID"];
        $filter = [
            "SECTION_ID" => $sectionID,
            "!UF_POPULAR" => false
        ];
        $queryParams = compact("select", "filter");
        
        return getSections($queryParams);
    }
    
    /**
     * Возвращает ID разделов, в которых есть товары с переданными брендами
     *
     * @param array $sectionIDs
     * @param array $brandIDs
     * @return array
     */
    function getSectionsWithBrands(array $sectionIDs, array $brandIDs): array
    {
        if (!$sectionIDs || !$brandIDs) {
            return [];
        }
        
        $select = ["IBLOCK_SECTION_ID"];
        $filter = [
            "SECTION_ID" => $sectionIDs,
            "PROPERTY_BRAND" => $brandIDs,
        ];
        
        $queryParams = compact("select", "filter");
        $selectedSectionIDs = getElements($queryParams);
        
        return array_reduce($sectionIDs, function ($acc, $sectionID) use ($selectedSectionIDs) {
            if (in_array($sectionID, $selectedSectionIDs)) {
                $acc[] = $sectionID;
            }
            
            return $acc;
        }, []);
    }
    
    /**
     * Возвращает ID брендов по названию бренда
     *
     * @param array $brandNames
     * @return array
     */
    function getBrandIDByName(array $brandNames): array
    {
        if (!$brandNames) {
            return [];
        }
        
        $select = ["ID"];
        $filter = ["IBLOCK_ID" => IBLOCK_ID_BRAND, "NAME" => $brandNames, "ACTIVE" => "Y"];
        $queryParams = compact("select", "filter");
        
        return getElements($queryParams);
    }
    
    /**
     * Возвращает часть URN c фильтром по брендам
     *
     * @param string $smartFilterPath
     * @return string
     */
    function getBrandsFilterPath(string $smartFilterPath): string
    {
        if (!$smartFilterPath) {
            return "";
        }
        
        $paths = explode("/", $smartFilterPath);
        
        $brandsPathData = array_filter($paths, function ($path) {
            return strpos($path, "brand-is") !== false;
        });
        
        return $brandsPathData[0] ?: "";
    }
    
    /**
     * Возвращает названия брендов из фильтровой части URN
     *
     * @param string $brandsFilterPath
     * @return array
     */
    function getFilterNames(string $brandsFilterPath): array
    {
        if (!$brandsFilterPath) {
            return [];
        }
        
        $rawBrandsData = explode("or", $brandsFilterPath);
        
        return array_reduce($rawBrandsData, function ($acc, $path) {
            if ($path) {
                $filterNameInLower = str_replace(["brand-is-", "-", "_"], ["", "", " "], $path);
                $acc[] = ucwords($filterNameInLower);
            }
            
            return $acc;
        }, []);
    }
    
    /**
     * Возвращает полный путь для фильтрации по брендам
     *
     * @param string $brandsPath
     * @return string
     */
    function getBrandsFilterFullPath(string $brandsPath): string
    {
        return "filter/{$brandsPath}/apply";
    }
    
    /**
     * Возвращает полную часть URN для фильтра и ID подразделов с брендовыми товарами
     *
     * @param $sectionID
     * @param $filterPath
     * @return array
     */
    function getFilterData($sectionID, $filterPath): array
    {
        $brandsFullPath = "";
        $sectionWithBrands = [];
        
        $popularSubSections = getPopularSubSectionsID($sectionID);
        
        if ($popularSubSections && $filterPath) {
            $brandsFilterPath = getBrandsFilterPath($filterPath);
            $filterNames = getFilterNames($brandsFilterPath);
            $brandsID = getBrandIDByName($filterNames);
            $sectionWithBrands = getSectionsWithBrands($popularSubSections, $brandsID);
            $brandsFullPath = getBrandsFilterFullPath($brandsFilterPath);
        }
        
        return compact("brandsFullPath", "sectionWithBrands");
    }
