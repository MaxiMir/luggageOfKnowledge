<?php

	class CSaleHandlers
	{
		/**
		 * @param $ID
		 * @param $arFields
		 */
		public static function OnSaleComponentOrderOneStepCompleteHandler($ID, $arFields)
		{
			$namePersonData = [
				"1" => "FIO", # физическое лицо
				"2" => "NAME_UR" # юридическое лицо
			];

			[
				'ID' => $orderID,
				'USER_ID' => $userID,
				'PERSON_TYPE_ID' => $personTypeID
			] = $arFields;

			if (!isset($orderID, $userID, $personTypeID)) {
				return;
			}

			$nameCode = $namePersonData[(string) $personTypeID];

			['fullName' => $fullName, 'propNameID' => $propNameID] = getFullNameData($orderID);

			if (!$fullName && !$propNameID) {
				return;
			}

			CSaleOrderPropsValue::Update($propNameID, ["CODE" => $nameCode, "VALUE" => $fullName]);
		}
	}