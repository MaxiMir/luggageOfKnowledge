<?
    declare(strict_types=1);
    
    define('ROOT', $_SERVER['DOCUMENT_ROOT']);
    define('MAIN_DOMAIN', 'https://some-domain.ru');
    define('XML_REGIONS_FOLDER', ROOT . '/regions/sitemaps/');
    
    $siteMapFile = ROOT . DIRECTORY_SEPARATOR . 'sitemap.xml';
    
    // Обновление файлов:
    try {
        if (isNeedUpdateLastMode($siteMapFile)) {
            $siteMapsFiles = getSiteMapXMLFiles($siteMapFile);
            $siteMapRegionFiles = glob(XML_REGIONS_FOLDER . "*");
            $allXMLFiles = array_merge($siteMapsFiles, $siteMapRegionFiles);
            
            changeServerNameInFiles($siteMapRegionFiles);
            changeLastModeInFiles($allXMLFiles);
        }
    } catch (Exception $e) {}
    
    /**
     * Изменяет loc в файлах
     *
     * @param array $siteMapsFiles
     * @return bool
     */
    function changeServerNameInFiles(array $siteMapsFiles): bool
    {
        foreach ($siteMapsFiles as $siteMapFile) {
            $fileNameData = explode('_', basename($siteMapFile, ".xml"));
            $newServerName = end($fileNameData);
            
            if (!changeServerName($siteMapFile, $newServerName)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Изменяет lastMode в файлах на текущее время
     *
     * @param array $siteMapsFiles
     * @return bool
     */
    function changeLastModeInFiles(array $siteMapsFiles): bool
    {
        $currentDate = date('c');
        
        foreach ($siteMapsFiles as $siteMapsFile) {
            if (!changeTagsValue($siteMapsFile, 'lastmod', $currentDate)) {
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
            $file = str_replace(MAIN_DOMAIN, ROOT, $locFile);
            
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
    function changeTagsValue(string $file, string $tag, string $value): bool
    {
        $content = file_get_contents($file);
        $newContent = preg_replace("|<{$tag}>(.*)</{$tag}>|isU", "<{$tag}>{$value}</{$tag}>", $content);
        
        return file_put_contents($file, $newContent, LOCK_EX) !== false;
    }
    
    /**
     * Меняет значение в loc в файле
     *
     * @param string $file
     * @param string $value
     * @return bool
     */
    function changeServerName(string $file, string $value) :bool
    {
        $content = file_get_contents($file);
        $newContent = str_replace(MAIN_DOMAIN, $value, $content);
        
        return file_put_contents($file, $newContent, LOCK_EX) !== false;
    }