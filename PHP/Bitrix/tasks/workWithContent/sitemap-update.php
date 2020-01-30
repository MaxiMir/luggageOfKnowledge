<?php
    
    declare(strict_types=1);
    
    define('ROOT', $_SERVER['DOCUMENT_ROOT']);
    define('MAIN_DOMAIN', 'https://some-domain.ru');
    define('XML_REGIONS_FOLDER', ROOT . '/regions/sitemaps/');
    
    $siteMapFile = ROOT . DIRECTORY_SEPARATOR . 'sitemap.xml';
    
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