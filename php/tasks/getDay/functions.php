<?php
    
    /**
     * @param string $uri
     * @return string
     */
    function getRequest(string $uri): string
    {
        $ch = curl_init($uri);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        
        return $output;
    }
    
    /**
     * @param string $currDate
     * @return bool
     * @throws Exception
     */
    function checkOnWorkTime(string $currDate): bool
    {
        $startWorkDay = new DateTime("$currDate 09:00:00");
        $now = new DateTime("now");
        $endWorkDay = new DateTime("$currDate 17:00:00");
        
        return $startWorkDay < $now && $endWorkDay > $now;
    }
    
    /**
     * @param array $data
     */
    function echoJsonEncode(array $data): void
    {
        header('Content-type: application/json');
        echo json_encode($data);
    }