<?php
    
    declare(strict_types=1);
    
    define('ROOT', $_SERVER['DOCUMENT_ROOT']);
    define('DOMAIN', 'https://www.air-vint.ru');
    
    $siteMapFile = ROOT . DIRECTORY_SEPARATOR . 'sitemap.xml';
    
    
    try {
        if (isNeedUpdateLastMode($siteMapFile)) {
            $siteMapsFiles = getSiteMapXMLFiles($siteMapFile);
            echo updateLastModeInFiles($siteMapsFiles);
        }
    } catch (Exception $e) {
    
    }
    
    
    /**
     * Меняет lastMode в файлах на текущее время
     *
     * @param array $siteMapsFiles
     * @return bool
     */
    function updateLastModeInFiles(array $siteMapsFiles): bool
    {
        $currentDate = date('c');
        
        foreach ($siteMapsFiles as $siteMapsFile) {
            if (!updateTagsValue($siteMapsFile, 'lastmod', $currentDate)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Возвращает массив с XML файлами (включая текущий)
     *
     * @param string $file
     * @return array
     */
    function getSiteMapXMLFiles(string $file): array
    {
        $files = [$file];
        $xmlObj = simplexml_load_file($file);
        
        foreach ($xmlObj->sitemap as $sitemap) {
            $locFile = (string) $sitemap->loc;
            $file = str_replace(DOMAIN, ROOT, $locFile);
            
            if (file_exists($file)) {
                $files[] = $file;
            }
        }
        
        return $files;
    }
    
    
    /**
     * Проверяет на то что прошла неделя с последних изменений в файле
     *
     * @param string $file
     * @return bool
     * @throws Exception
     */
    function isNeedUpdateLastMode(string $file): bool
    {
        $currTime = new DateTime();
        $lastUpdate = new DateTime(date('Y-m-d H:i:s P', filemtime($file)));
        $dateDiff = date_diff($currTime, $lastUpdate)->days;
        
        return $dateDiff >= 7;
    }
    
    
    /**
     * Меняет значение в тегах в файле
     *
     * @param string $file
     * @param string $tag
     * @param string $value
     * @return bool
     */
    function updateTagsValue(string $file, string $tag, string $value): bool
    {
        $content = file_get_contents($file);
        $newContent = preg_replace("|<{$tag}>(.*)</{$tag}>|isU", "<{$tag}>{$value}</{$tag}>", $content);
        
        return file_put_contents($file, $newContent, LOCK_EX) !== false;
    }