<?php

	#@@@ ЗАЛИВКА РЕЗУЛЬТОВ ФОРМЫ: @@@#

	use Bitrix\Main\Loader;

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
	require_once "./helper.php";


	const FORM_RESPONSE_COMPANY_ID = 10;
	const RESPONSES_CSV_FILE = "response.csv";

	Loader::includeModule("form");

	$responsesData = getCSVData(RESPONSES_CSV_FILE);


	[
		'errors' => $errorsResponses,
		'createdCount' => $createdResponsesCount
	] = addAllResponses($responsesData);
?>

<p>Создано отзывов: <b><?= $createdResponsesCount ?></b></p>

<? if ($errorsResponses): ?>
    <p><b>Ошибки:</b></p>
    <p><?= implode("<br>", $errorsResponses) ?> </p>
<? endif; ?>