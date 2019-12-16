<?php

	require_once "OffersHandler/OffersHandler.php";
	require_once "OffersPropsHandler/OffersPropsHandler.php";
	require_once "CSaleHandlers/CSaleHandlers.php";
	require_once "IBlockSectionUpdate/IBlockSectionUpdate.php";
	require_once "helper.php";

	// Обработчик вызывающийся перед обновлением элементов каталога:
	AddEventHandler(
		'iblock',
		'OnBeforeIBlockElementUpdate',
		["OffersPropsHandler", "initBeforeUpdate"]
	);

	// Обработчик вызывающийся в самом конце импорта с 1С (перед отдачей строки success):
	AddEventHandler(
		'catalog',
		'OnSuccessCatalogImport1C',
		["OffersHandler", "initBeforeSuccess"]
	);


	// Обработчик события после создания заказа: @#
	AddEventHandler(
		'sale',
		'OnSaleComponentOrderOneStepComplete',
		['CSaleHandlers', 'OnSaleComponentOrderOneStepCompleteHandler']
	);


	// Обработчик события до обновления раздела: @#
	AddEventHandler(
		"iblock",
		"OnBeforeIBlockSectionUpdate",
		["IBlockSectionUpdate", "OnBeforeIBlockSectionUpdate"]
	);

