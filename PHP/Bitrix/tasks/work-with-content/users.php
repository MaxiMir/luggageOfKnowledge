<?php


	#@@@ ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ: @@@#

	/**
	 * @param $usersData
	 * @return array [
	 *    'errors' => ошибки при создании пользователей,
	 *    'createdCount' => количество созданных пользователей
	 * ]
	 */
	function createUsers($usersData)
	{
		$result = [
			'errors' => [],
			'createdCount' => 0
		];

		foreach ($usersData as $key => $userData) {
			if ( ! $key) {
				continue;
			}

			['error' => $errorCreate] = createUser($userData);


			if ($errorCreate) {
				$result['errors'][] = $errorCreate;
				continue;
			}

			++$result['createdCount'];
		}

		return $result;
	}

	/**
	 * @param $userData
	 * @return array [
	 *   'id' => ID нового пользователя ||
	 *   'error' => ошибку, возникшую при создании
	 * ]
	 */
	function createUser($userData)
	{
		$LID = "ru";
		$ACTIVE = "Y";
		$personalNotesData = [];
		$GROUP_ID = [AUTH_USERS_GROUP];
		$PASSWORD = $CONFIRM_PASSWORD = "toBeStrong"; // randString(COUNT_SIGNS)
		$fieldsName = [
			"LOGIN",
			"LAST_NAME",
			"NAME",
			"SECOND_NAME",
			"PERSONAL_MOBILE",
			"EMAIL",
			"PERSONAL_GENDER",
			"PERSONAL_STREET",
			"GROUP_ID",
			"PASSWORD",
			"CONFIRM_PASSWORD",
			"ACTIVE",
			"LID",
			"PERSONAL_NOTES",
			"UF_WHOLESALE_BUYER",
			"UF_CREAT_UN_TIME"
		];

		[
			$LOGIN,
			$LAST_NAME,
			$NAME,
			$SECOND_NAME,
			$isMale,
			$delivery_time,
			$PERSONAL_MOBILE,
			$EMAIL,
			$regDate,
			$metro,
			$PERSONAL_STREET,
			$op,
		] = $userData;


		if ($metro) {
			$personalNotesData[] = "МЕТРО: {$metro};";
		}

		if ($delivery_time) {
			$personalNotesData[] = "ВРЕМЯ ДОСТАВКИ: {$delivery_time};";
		}

		$PERSONAL_GENDER = $isMale ? "M" : "";
		$PERSONAL_NOTES = implode($personalNotesData);
		$UF_CREAT_UN_TIME = (int)$regDate;
		$UF_WHOLESALE_BUYER = $op ? true : false;

		$user = new CUser;
		$arUserFields = compact(...$fieldsName);

		if ($newUserID = $user->Add($arUserFields)) {
			return ['id' => $newUserID];
		}

		return ['error' => $user->LAST_ERROR];
	}