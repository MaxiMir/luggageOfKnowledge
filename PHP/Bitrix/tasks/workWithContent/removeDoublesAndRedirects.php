<?php

	#@ УДАЛЕНИЕ ДУБЛЕЙ ТОВАРОВ + РЕДИРЕКТЫ:

	use h2o\Redirect\RedirectTable;

	require_once "{$_SERVER["DOCUMENT_ROOT"]}/bitrix/modules/main/include/prolog_before.php";
	require_once "./helper.php";

	const CATALOG_IBLOCK_ID = 17;


	[$origElementsWithDoubles, $doublesElements, $doubleElemCodes] = getCatalogDoublesData();

	[
		'toDel' => $toDelProducts,
		'toSave' => $toSaveProducts
	] = splitCatalogDoublesData($origElementsWithDoubles, $doublesElements, $doubleElemCodes);


	['errors' => $redirectError] = addRedirectsForCatalogDoubles($toDelProducts, $toSaveProducts, $doubleElemCodes);

	if ($redirectError) {
		echo "Error add redirect: <br>" . implode("<br>", $redirectError);
	}

	['errors' => $deleteErrors] = deleteCatalogDoubles($toDelProducts);

	if ($deleteErrors) {
		echo "Error delete elements: <br>" . implode("<br>", $deleteErrors);
	}

	if ( ! $redirectError && ! $deleteErrors) {
		echo 'Success';
	}


