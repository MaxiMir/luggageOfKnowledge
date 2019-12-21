<?php

	#@ ЗАЛИТЬ РАЗДЕЛЫ/ТОВАРЫ:

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

	global $DB;

	//** Файлы для заливки:
	const FILE_CATALOG = 'CATEGORY.csv';
	const FILE_PALETTE = 'CATEGORY_PALETTE.csv';
	const FILE_PRODUCTS = 'NEW_PRODUCTS.csv';
	const FILE_STONES = 'STONES.csv';
	const FILE_META = 'META.csv';

	const CATALOG_IBLOCK_ID = 26;
	const PALETTE_IBLOCK_ID = 27;

	# Читаем файл и генерируем данные по разделам каталога:
	$sectionsCData = getSectionsData(FILE_CATALOG);

	# Читаем файл и генерируем данные по по разделам палитры:
	$sectionsPData = getSectionsData(FILE_PALETTE);

	# Создаем новые разделы Каталог:
	createNewSections($sectionsCData, CATALOG_IBLOCK_ID);

	# Создаем новые разделы Палитра:
	createNewSections($sectionsPData, PALETTE_IBLOCK_ID);

	# Создаем новые камни:
	$createData = createElements(FILE_STONES, 'palitra');

	# Создаем новые товары:
	$createData = createElements(FILE_PRODUCTS);
	$countProducts = $createData['count'];
	$error = is_null($createData['error']) ? 0 : $createData['error'];

	echo "Создано {$countProducts} <br> Ошибки: {$error}";

	# Меты для разделов:
	$seoData = getCSVData(FILE_META);
	updateSections($seoData);
