<?php
    
    declare(strict_types=1);
    
    /**
     * Проверяет на то что прошла неделя с последних изменений в файле
     *
     * @param string $file
     * @return bool
     * @throws Exception
     */
    function isNeedUpdateLastMode(string $file): bool
    {
        if (!file_exists($file)) {
            throw new Exception("File not found: {$file}");
        }
        
        $currTime = new DateTime();
        $lastUpdate = new DateTime(date('Y-m-d H:i:s P', filemtime($file)));
        $dateDiff = date_diff($currTime, $lastUpdate)->days;
        
        return $dateDiff >= 7;
    }
    
    /**
     * Изменяет lastMode в файлах на текущее время
     *
     * @param array $siteMapsFiles
     * @return bool
     * @throws Exception
     */
    function changeLastModeInFiles(array $siteMapsFiles): bool
    {
        $currentDate = date('c');
        
        foreach ($siteMapsFiles as $siteMapsFile) {
            if (!changeTagsValueInFile($siteMapsFile, 'lastmod', $currentDate)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Возвращает массив с XML файлами (включая текущий)
     *
     * @param string $mainHostWithProto
     * @param string $root
     * @param string $mainSiteMapFile
     * @return array
     * @throws Exception
     */
    function getSiteMapXMLFiles(string $mainHostWithProto, string $root, string $mainSiteMapFile): array
    {
        if (!file_exists($mainSiteMapFile)) {
            throw new Exception("File not found: {$mainSiteMapFile}");
        }
        
        $siteMapFiles = [$mainSiteMapFile];
        $xmlObj = simplexml_load_file($mainSiteMapFile);
        
        foreach ($xmlObj->sitemap as $sitemap) {
            $locFile = (string) $sitemap->loc;
            $file = str_replace($mainHostWithProto, $root, $locFile);
            
            if (file_exists($file)) {
                $siteMapFiles[] = $file;
            }
        }
        
        return $siteMapFiles;
    }
    
    /**
     * Меняет значение в тегах
     *
     * @param string $file
     * @param string $tag
     * @param string $value
     * @return string
     * @throws Exception
     */
    function changeTagsValue(string $file, string $tag, string $value): string
    {
        if (!file_exists($file)) {
            throw new Exception("File not found: {$file}");
        }
        
        $content = file_get_contents($file);
        return preg_replace("|<{$tag}>(.*)</{$tag}>|isU", "<{$tag}>{$value}</{$tag}>", $content);
    }
    
    /**
     * Меняет значение в тегах в файле
     *
     * @param string $file
     * @param string $tag
     * @param string $value
     * @return bool
     * @throws Exception
     */
    function changeTagsValueInFile(string $file, string $tag, string $value): bool
    {
        $newContent = changeTagsValue($file, $tag, $value);
        return file_put_contents($file, $newContent, LOCK_EX) !== false;
    }
    
    /**
     * Возвращает sitemap для текущего домена
     *
     * @param string $mainHost
     * @param string $currentHost
     * @param string $requestedSiteMap
     * @return string|bool
     * @throws Exception
     */
    function generateSiteMapContent(string $mainHost, string $currentHost, string $requestedSiteMap)
    {
        $isSubDomain = $currentHost != $mainHost;
        
        if (!file_exists($requestedSiteMap)) {
            throw new Exception("File not found: {$requestedSiteMap}");
        }
        
        $siteMapContent = file_get_contents($requestedSiteMap);
        
        if (!$siteMapContent) {
            throw new Exception("Failed to read file: {$requestedSiteMap}");
        }
        
        if (!$isSubDomain) {
            return $siteMapContent;
        }
        
        return str_replace($mainHost, $currentHost, $siteMapContent);
    }
