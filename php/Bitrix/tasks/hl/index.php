<?php
    
    declare(strict_types=1);
    
    use Bitrix\Main\Loader;
    
    Loader::includeModule("highloadblock");
    
    use Bitrix\Highloadblock as HL;
    use Bitrix\Main\Entity;
    
    /**
     * Возвращает класс сущности для дальнейшей работы
     *
     * @param int $hlBlockID
     * @return string
     */
    function getEntityDataClass(int $hlBlockID): string
    {
        $hlBlock = HL\HighloadBlockTable::getById($hlBlockID)->fetch();
        $entity = HL\HighloadBlockTable::compileEntity($hlBlock);
        
        return $entity->getDataClass();
    }
    
    /**
     * Массив с данными фильтровых страниц
     *
     * @param array $filter
     * @param array|null $select
     * @return array
     */
    function findFilterBrandPages(array $filter, ?array $select = null): array
    {
        $brandsPageData = [];
        $selectColumns = $select ?? ["ID", "UF_H1", "UF_TITLE", "UF_DESCRIPTION", "UF_TEXT", "UF_SECTION_ID"];
        
        $entityDataClass = getEntityDataClass(HL_BRANDS_FILTER_PAGE);
        
        $rsData = $entityDataClass::getList([
            "order" => [],
            "filter" => $filter,
            "limit" => false,
            "select" => $selectColumns
        ]);
        
        while($brandPageData = $rsData->Fetch()){
            $brandsPageData[] = $brandPageData;
        }
        
        return $brandsPageData;
    }
    
    /**
     * Поиск фильтровой страницы по коду бренда и ее символьному коду
     *
     * @param string $brandName
     * @param string $symbolCode
     * @return array
     */
    function findFilterPageByCodeAndBrand(string $brandName, string $symbolCode): array
    {
        $filter = ["UF_CODE" => $symbolCode, "UF_BRAND_NAME" => $brandName];
        
        return findFilterBrandPages($filter);
    }
    
    
    /**
     * Возвращает массив фильтровых страниц с названиями и ссылками
     *
     * @param array $brandNames
     * @param string $sectionID
     * @return array
     */
    function getFilterBrandLinks(array $brandNames, string $sectionID): array
    {
        $links = [];
        $filter = ['UF_BRAND_NAME' => $brandNames, 'UF_SECTION_ID' => $sectionID];
        $select = ['UF_CODE', 'UF_BRAND_NAME', 'UF_LINK_NAME'];
        
        $brandPages = findFilterBrandPages($filter, $select);
        
        foreach ($brandPages as $brandPage) {
            ['UF_CODE' => $code, 'UF_BRAND_NAME' => $brandCode, 'UF_LINK_NAME' => $linkName] = $brandPage;
            
            $links[$linkName] = "/brands/{$brandCode}/{$code}";
        }
        
        return $links;
    }