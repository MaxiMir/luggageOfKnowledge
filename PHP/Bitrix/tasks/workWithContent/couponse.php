<?php

	#@@@ ЗАГРУЗКА КУПОНОВ: @@@#

	use Bitrix\Main\Loader;
	use Bitrix\Sale\Internals\DiscountCouponTable;

	require "{$_SERVER['DOCUMENT_ROOT']}/bitrix/modules/main/include/prolog_before.php";
	require_once "./helper.php";

	# ФАЙЛЫ: #
	const DISCOUNT_CARDS_FILE = "discountCardsFile.csv";

	Loader::includeModule('sale');

	$discountCardsData = getCSVData(DISCOUNT_CARDS_FILE);
	[
		'errors' => $errorsCreateCoupons,
		'createdCount' => $countCreatedCoupons
	] = addCoupons($discountCardsData);

