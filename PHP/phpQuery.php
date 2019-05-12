<?php

	header('Content-type:text/html; charset=utf-8');

	require 'phpQuery.php'; // скачать: http://code.google.com/archive/p/phpquery/downloads

	#1:
	$url = 'https://privatbank.ua/';
	$file = file_get_contents($url);

	$doc = phpQuery::newDocument($file);
	$priceBlock = $doc->find('#priceBlock'); // find - поиск элементов в DOM дереве
	$priceBlock = $doc->find('#priceBlock')->text(); // возвращает текстовое содержимое элемента

	#2:
	$url = 'https://kolesa.ru/news';
	$file = file_get_contents($url);

	$doc = phpQuery::newDocument($file);

	foreach ($doc->find('.articles-container . post-excerpt') as $article) {
		$article = pq($article); // оборачиваем DOM element в объект phpQuery
		$imgSrc = $article->find('.img-cont img')->attr('src'); // получаем значение src у картинки
		$text = $article->find('.pd-cont')->html(); // получаем весь HTML код элемента
	}	