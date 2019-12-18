<?php

	#@@@ ЗАЛИВКА СТАТЕЙ: @@@#

	use Bitrix\Main\Loader;

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
	require_once "./helper.php";

	# ФАЙЛЫ: #
	const NEWS_CSV_FILE = "news.csv";
	const NEWS_SECTIONS_CSV_FILE = "news_sections.csv";


	Loader::includeModule("iblock");


	$newsAllData = getCSVData(NEWS_CSV_FILE);
	$newsSectionData = getCSVData(NEWS_SECTIONS_CSV_FILE);
	$newsAssocSectionData = convertToAssocArr($newsSectionData);

	[
		'errors' => $newsErrors,
		'createdCount' => $createdNewsCount,
	] = createAllNews($newsAllData, $newsAssocSectionData);


?>

<p>Создано статей: <b><?= $createdNewsCount ?></b></p>

<? if ($newsErrors): ?>
    <p><b>Ошибки:</b></p>
    <p><?= implode("<br>", $newsErrors) ?> </p>
<? endif; ?>
