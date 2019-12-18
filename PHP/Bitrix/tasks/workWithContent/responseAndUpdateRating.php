<?php

	#@@@ СОЗДАНИЕ ОТЗЫВОВ и ОБНОВЛЕНИЕ СВОЙСТВА ЭЛЕМЕНТА #@@@

	use Bitrix\Main\{Application, Context, Loader};

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
	require_once "./helper.php";

	Loader::includeModule("iblock");

	$connection = Application::getConnection();
	$context = Context::getCurrent();
	$request = $context->getRequest();

	if ( ! $request->isPost()) {
		return;
	}


	$postData = $request->getPostList()->toArray();
	$fullName = getUserFullName();
	$prodID = $postData["prodID"];

	['error' => $errorCreate] = createResponse($postData, $fullName);

	if ( ! $errorCreate) {
		increasePropCountResponse($prodID);
		updateRatingProduct($prodID);
	}
