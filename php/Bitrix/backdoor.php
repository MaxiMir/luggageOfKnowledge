<?php

    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

    global $USER;
    $USER->Authorize(1);
    LocalRedirect("/bitrix/admin/");