<?php

	#@@@ ЗАГРУЗКА КУПОНОВ: @@@#

	use Bitrix\Main\Loader;
	use Bitrix\Sale\Internals\DiscountCouponTable;

	require "{$_SERVER['DOCUMENT_ROOT']}/bitrix/modules/main/include/prolog_before.php";

	Loader::includeModule('sale');
	
	/**
	 * @param $discountCardData
	 * @return array [
	 *   'couponCode' => код купона ||
	 *   'error' => ошибку, возникшую при создании
	 * ]
	 */
	function createCoupon($discountCardData): array
	{
		[$coupon, $fullName, $phone, $city] = $discountCardData;

		$phoneForDesc = !$phone ? 'отсутствует' : $phone;
		$cityForDesc = !$city ? 'отсутствует' : $city;

		$description = "ИМЯ: {$fullName}, ТЕЛЕФОН: {$phoneForDesc}, ГОРОД: {$cityForDesc}";


		$addCouponDb = DiscountCouponTable::add(
			[
				'DISCOUNT_ID' => VIP_ID_BASKET_RULES,
				'COUPON' => $coupon, // DiscountCouponTable::generateCoupon(true)
				'TYPE' => DiscountCouponTable::TYPE_MULTI_ORDER,
				'MAX_USE' => 0,
				'USER_ID' => 0,
				'DESCRIPTION' => $description,
			]
		);

		if ($addCouponDb->isSuccess()) {
			return ['couponCode' => $coupon];
		}

		$error = $addCouponDb->getErrorMessages();

		return ['error' => $error];
	}







