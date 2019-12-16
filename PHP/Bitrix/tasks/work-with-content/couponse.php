<?php

	#@@@ ЗАГРУЗКА КУПОНОВ: @@@#
	use Bitrix\Main\Loader;
	use Bitrix\Sale\Internals\DiscountCouponTable;

	require "{$_SERVER['DOCUMENT_ROOT']}/bitrix/modules/main/include/prolog_before.php";

	# ФАЙЛЫ: #
	const DISCOUNT_CARDS_FILE = "discountCardsFile.csv";

	Loader::includeModule('sale');

	$discountCardsData = getCSVData(DISCOUNT_CARDS_FILE);
	[
		'errors' => $errorsCreateCoupons,
		'createdCount' => $countCreatedCoupons
	] = addCoupons($discountCardsData);

	/**
	 * @param $discountCardsData
	 * @return array [
	 *    'errors' => ошибки при создании купонов,
	 *    'createdCount' => количество созданных купонов
	 * ]
	 */
	function addCoupons($discountCardsData)
	{
		$result = [
			'errors' => [],
			'createdCount' => 0
		];

		foreach ($discountCardsData as $key => $discountCardData) {
			if ( ! $key) {
				continue;
			}

			['error' => $errorCreate] = createCoupon($discountCardData);

			if ($errorCreate) {
				$result['errors'][] = $errorCreate;
				continue;
			}

			++$result['createdCount'];
		}

		return $result;
	}

	/**
	 * @param $discountCardData
	 * @return array [
	 *   'couponCode' => код купона ||
	 *   'error' => ошибку, возникшую при создании
	 * ]
	 */
	function createCoupon($discountCardData)
	{
		[$coupon, $fullName, $phone, $city] = $discountCardData;

		$phoneForDesc = ! $phone ? 'отсутствует' : $phone;
		$cityForDesc = ! $city ? 'отсутствует' : $city;

		$description = "ИМЯ: {$fullName}, ТЕЛЕФОН: {$phoneForDesc}, ГОРОД: {$cityForDesc}";


		$addCouponDb = DiscountCouponTable::add(
			[
				'DISCOUNT_ID' => VIP_ID_BASKET_RULES,
				'COUPON' => $coupon, // DiscountCouponTable::generateCoupon(true)
				'TYPE' => DiscountCouponTable::TYPE_MULTI_ORDER,
				'MAX_USE' => 0,
				'USER_ID' => 0,
				'DESCRIPTION' => $description
			]
		);

		if ($addCouponDb->isSuccess()) {
			return ['couponCode' => $coupon];
		}

		$error = $addCouponDb->getErrorMessages();

		return ['error' => $error];
	}