<?php
    
    require_once "functions.php";
    
    $days = [
        "Tue" => "Вторник",
        "Wed" => "Среда",
        "Thu" => "Четверг",
        "Fri" => "Пятница",    
    ];
    
    try {
        $currDate = date('Ymd');
        $uriCurrDate = "https://isdayoff.ru/{$currDate}";
        $isWorkingDay = getRequest($uriCurrDate) == '0';
        $isWorkingTime = checkOnWorkTime($currDate);
    
        $answerDay = $isWorkingTime ? 'сегодня' : 'завтра';
    
        $nextDate = date('Ymd', strtotime("$currDate +1 day"));
        $uriNextDay = "https://isdayoff.ru/{$nextDate}";
        $isWorkingNextDay = getRequest($uriNextDay) == '0';
        $countNextDays = $isWorkingTime ? '1' : '2';
        $nameNextDay = date("D", strtotime("+{$countNextDays} day"));
        $answerNextDay = $isWorkingNextDay ? $days[$nameNextDay] : 'Понедельник';
    
        echoJsonEncode([$answerDay, $answerNextDay]);
    } catch (Exception $e) {
    
    }
    
