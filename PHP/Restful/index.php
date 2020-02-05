<?php
    
    # Определяем метод запроса:
    $method = $_SERVER['REQUEST_METHOD'];
    
    # Получаем данные из тела запроса:
    $formData = getFormData($method);
    
    # Разбираем url:
    $urls = getUrls($_GET['q']);
    
    # Определяем роутер и url data:
    
    if (!$urls) {
        # главная страница
    }
    
    $router = array_shift($urls);
    
    # Подключаем файл-роутер и запускаем главную функцию:
    include_once "routers/{$router}.php";
    
    route($method, $urls, $formData);
    
    
    #@ Получение данных из тела запроса @#
    function getFormData($method)
    {
        # GET или POST:
        if ($method === 'GET') {
            return $_GET;
        }
        
        if ($method === 'POST') {
            return $_POST;
        }
        
        # PUT || PATCH || DELETE:
        $data = [];
        $exploded = explode('&', file_get_contents('php://input'));
        
        foreach ($exploded as $pair) {
            [$key, $value] = explode('=', $pair);
            
            if (!isset($key, $value)) {
                continue;
            }
            
            $keyDecode = urldecode($key);
            $valueDecode = urldecode($value);
            
            $data[$keyDecode] = $valueDecode;
        }
        
        return $data;
    }
    
    
    #@ данные по url:
    function getUrls($queryParamUrl)
    {
        return !$queryParamUrl ? '' : explode('/', rtrim($queryParamUrl, '/'));
    }
	
	