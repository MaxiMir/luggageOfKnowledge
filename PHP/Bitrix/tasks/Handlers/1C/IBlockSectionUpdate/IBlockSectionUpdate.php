<?php

	use \Bitrix\Main\{Application, Context, Loader};

	class IBlockSectionUpdate
	{
		public function OnBeforeIBlockSectionUpdate(&$arFields)
		{
			$request = Context::getCurrent()->getRequest();

			// #1:
			if ($request["type"] === "catalog") { // обновление TIMESTAMP у раздела после 1С
				$sectionID = $arFields["IBLOCK_SECTION_ID"];

				$ciSection = new CIBlockSection;
				$arFields = ['TIMESTAMP_X' => date("d.m.Y H:m:s", time())];
				$ciSection->Update($sectionID, $arFields);
			}

			// #2:
			if ($request["type"] === "catalog") { // обновление только определенных полей 1С
				$fieldsLeft = [
					"ACTIVE",
					"NAME",
					"IBLOCK_SECTION_ID"
				];

				$arFields = array_filter($arFields, function ($key) use ($fieldsLeft) {
					return in_array($key, $fieldsLeft);
				}, ARRAY_FILTER_USE_KEY);
			}

		}
	}