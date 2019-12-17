<?php

	/**
	 * В файле есть поле <ГрафикРаботы>, которое в стандартном обмене почему-то не выгружается
	 * Для этого пришлось доработать обмен, а именно:
	 */

	# FILE /local/modules/iblock/classes/general/cml2.php в методо "ImportStores" дописать строчки
	if (isset($arXMLStore[$this->mess["IBLOCK_XML2_STORE_SCHEDULE"]])) {
		$arStore["SCHEDULE"] = $arXMLStore[$this->mess["IBLOCK_XML2_STORE_SCHEDULE"]];
	}

	# FILE: /local/modules/iblock/lang/ru/classes/general/cml2.php добавить:
	$MESS["IBLOCK_XML2_STORE_SCHEDULE"] = "ГрафикРаботы";