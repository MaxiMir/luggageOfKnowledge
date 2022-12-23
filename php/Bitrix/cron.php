<?php


	#@@ Выполнение всех агентов на cron @@#

	# полностью отключим выполнение агентов на хите:
	COption::SetOptionString("main", "agents_use_crontab", "N");
	echo COption::GetOptionString("main", "agents_use_crontab", "N");

	COption::SetOptionString("main", "check_agents", "N");
	echo COption::GetOptionString("main", "check_agents", "Y");


	# в файле /bitrix/php_interface/dbconn.php заменяем:
	define("BX_CRONTAB_SUPPORT", true);
	define("BX_CRONTAB", true);
	// на:
	if ( ! (defined("CHK_EVENT") && CHK_EVENT === true)) {
		define("BX_CRONTAB_SUPPORT", true);
	}

	# Создаем /bitrix/php_interface/cron_events.php:
	$_SERVER["DOCUMENT_ROOT"] = realpath(dirname(__FILE__) . "/../..");
	$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];

	define("NO_KEEP_STATISTIC", true);
	define("NOT_CHECK_PERMISSIONS", true);
	define('BX_NO_ACCELERATOR_RESET', true);
	define('CHK_EVENT', true);
	define('BX_WITH_ON_AFTER_EPILOG', true);


	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

	@set_time_limit(0);
	@ignore_user_abort(true);

	CAgent::CheckAgents();
	define("BX_CRONTAB_SUPPORT", true);
	define("BX_CRONTAB", true);
	CEvent::CheckEvents();

	if (CModule::IncludeModule('sender')) {
		\Bitrix\Sender\MailingManager::checkPeriod(false);
		\Bitrix\Sender\MailingManager::checkSend();
	}

	require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/modules/main/tools/backup.php");
	CMain::FinalActions();

	# добавляем данный скрипт в cron
	// $ */5 * * * * /usr/bin/php -f /var/www/x.ru/okfit/bitrix/admin/cron_events.php

	/**
	После этого все агенты и отправка системных событий будут обрабатывается из под cron, раз в 5 минут.
	Чтобы не увеличивалась очередь отправки почтовых сообщений, изменяем параметр отвечающий за количество почтовых событий обрабатываемых за раз.
	Для этого:
	*/

	COption::SetOptionString("main", "mail_event_bulk", "20");
	echo COption::GetOptionString("main", "mail_event_bulk", "5");