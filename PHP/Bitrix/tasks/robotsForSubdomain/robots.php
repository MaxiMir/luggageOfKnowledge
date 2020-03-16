<?php
    
    const ROBOTS_TXT = 'robots-content.txt';
    const MAIN_HOSTS = ['www.foo.ru', 'foo.ru'];
    
    $currentHost = $_SERVER['HTTP_HOST'];
    $fileSize = fileSize(ROBOTS_TXT);
    $timestamp = filemtime(ROBOTS_TXT);
    $tsString = gmdate('D, d M Y H:i:s ', $timestamp) . 'GMT';
    $etag = md5(ROBOTS_TXT . $timestamp);
    $isMainDomain = in_array($currentHost, MAIN_HOSTS);
    $siteMapHost = !$isMainDomain ? $currentHost : MAIN_HOSTS[0];
    $robotsContent = file_get_contents(ROBOTS_TXT);
    
    header('Content-Type: text/plain');
    header("Content-Length: {$fileSize}");
    header("Last-Modified: {$tsString}");
    header("ETag: \"{$etag}\"");
    
    echo "{$robotsContent}\n";
    echo "Sitemap: https://{$siteMapHost}/sitemap.xml";

