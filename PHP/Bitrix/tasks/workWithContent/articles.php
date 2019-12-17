<?php

	#@@@ ЗАЛИВКА СТАТЕЙ: @@@#
	use Bitrix\Main\Loader;

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

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


	/**
	 * @param $data
	 * @return mixed ассоциативный массив из массивов с 2 элементами
	 */
	function convertToAssocArr($data)
	{
		return array_reduce($data, function ($acc, $sectionData) {
			[$key, $value] = $sectionData;
			$acc[$key] = $value;

			return $acc;
		}, []);
	}

	/**
	 * @param       $newsAllData
	 * @param array $newsSectionData
	 *
	 * @return array [
	 *   'errors' => массив с ошибками,
	 *   'createdCount' => количество созданных новостей
	 * ]
	 */
	function createAllNews($newsAllData, $newsSectionData = [])
	{
		$result = [
			'errors' => [],
			'createdCount' => 0,
		];

		foreach ($newsAllData as $key => $newsData) {
			if ( ! $key) {
				continue;
			}

			['error' => $error] = createNews($newsData, $newsSectionData);

			if ($error) {
				$result['errors'][] = "Строка CSV: {$key}<br>Ошибка: {$error}";
				continue;
			}

			++$result['createdCount'];
		}

		return $result;
	}

	/**
	 * @param $newsData
	 * @param $newsSectionData
	 *
	 * @return array [
	 *    'id' => созданной новости || false,
	 *    'error' => ошибка при создании || null
	 * ]
	 */
	function createNews($newsData, $newsSectionData)
	{
		$dirWithImg = implode(DIRECTORY_SEPARATOR, [__DIR__, 'pic']) . DIRECTORY_SEPARATOR;

		[$id, $stamp, $time, $date, $title, $text, $img, $imgExt] = $newsData;

		$iBlockSection = $newsSectionData[$id] ?? '';
		$previewText = getTrimLine($text, 350);
		$imgDetailPath = "{$dirWithImg}{$stamp}$imgExt";
		$imgPreviewPath = "{$dirWithImg}{$stamp}_{$img}$imgExt";

		$el = new CIBlockElement;

		$newsData = [
			"IBLOCK_ID" => ARTICLES_I_BLOCK_ID,
			"IBLOCK_SECTION" => $iBlockSection,
			"NAME" => $title,
			"CODE" => $id,
			"ACTIVE" => "Y",
			"PREVIEW_TEXT" => $previewText,
			"PREVIEW_TEXT_TYPE" => 'html',
			"DETAIL_TEXT" => $text,
			"DETAIL_TEXT_TYPE" => 'html'
		];

		if (file_exists($imgDetailPath)) {
			$newsData["DETAIL_PICTURE"] = CFILE::MakeFileArray($imgDetailPath);
		}

		if (file_exists($imgPreviewPath)) {
			$newsData["PREVIEW_PICTURE"] = CFILE::MakeFileArray($imgPreviewPath);
		}

		if ($newElement = $el->Add($newsData)) {
			return ['id' => $newElement];
		}

		return ['error' => $el->LAST_ERROR];
	}

?>

    <p>Создано статей: <b><?= $createdNewsCount ?></b></p>

<? if ($newsErrors): ?>
    <p><b>Ошибки:</b></p>
    <p><?= implode("<br>", $newsErrors) ?> </p>
<? endif; ?>