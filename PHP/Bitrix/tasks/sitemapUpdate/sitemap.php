<?php
    
    header('Content-Type: application/xml; charset=utf-8');
    
    require_once "sitemap-functions.php";
    
    ['DOCUMENT_ROOT' => $root, 'HTTP_HOST' => $currentHost, 'REQUEST_URI' => $requestUri] = $_SERVER;
    $mainHost = 'spb-elektromontazh.ru';
    $mainHostWithProto = "https://{$mainHost}";
    $siteMapFile = $root . DIRECTORY_SEPARATOR . 'sitemap.xml';
    $isSubDomain = $currentHost != $mainHost;
    $requestedSiteMap = $root . $requestUri;
    
    try {
        # Обновление <lastmode> каждую неделю:
        if (isNeedUpdateLastMode($siteMapFile)) {
            $siteMapsFiles = getSiteMapXMLFiles($mainHostWithProto, $root, $siteMapFile);
            changeLastModeInFiles($siteMapsFiles);
        }
        
        # Вывод запрашиваемого sitemap файла для текущего домена:
        echo generateSiteMapContent($mainHost, $currentHost, $requestedSiteMap);
    } catch (Exception $e) {
        #echo $e->getMessage();
    }