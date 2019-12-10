<?php

	// Обработчик вызывающийся в самом конце импорта с 1С (перед отдачей строки success):
	AddEventHandler(
		'catalog',
		'OnSuccessCatalogImport1C',
		["OffersHandler", "init"]
	);