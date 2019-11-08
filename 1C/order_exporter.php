<?php
define("NO_AGENT_CHECK", true);
define("NO_KEEP_STATISTIC", true);

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

if (!$GLOBALS['USER']->IsAdmin()) {
    die("Доступно только для администратора.");
}

CModule::IncludeModule('sale');

$arErrors = array();
if (isset($_REQUEST['ORDER_ID']) || isset($_REQUEST['ORDER_ID_TEXT'])) {
    $nOrder = ((int)$_REQUEST['ORDER_ID_TEXT'] > 0 ? (int)$_REQUEST['ORDER_ID_TEXT'] : (int)$_REQUEST['ORDER_ID']);
    if ($nOrder && CSaleOrder::GetByID($nOrder)) {
        ob_end_clean();

        header('Content-Type: text/html; charset=utf-8');
        header('P3P: CP="NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM"');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Cache-Control: post-check=0, pre-check=0', false);
        header('Pragma: no-cache');
        header('Content-transfer-encoding: binary');
        header('Content-Disposition: attachment; filename=order-' . $nOrder . '.xml');
        header('Content-Type: application/x-unknown');

        ob_start();
        CSaleExport::ExportOrders2Xml(array('ID' => $nOrder));
        $sXml = ob_get_clean();

        echo strtr($sXml, array('encoding="windows-1251"' => 'encoding="utf-8"'));
        exit();
    } else {
        $arErrors[] = "Заказ №{$nOrder} не найден.";
    }
}

$arOrdersID = array();
$dbOrders = CSaleOrder::GetList(array("ID" => "DESC"), array(), false, array('nTopCount' => 200),
    array('ID', 'DATE_INSERT'));
while ($arOrder = $dbOrders->Fetch()) {
    $arOrdersID[] = $arOrder;
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Просмотр XML выгрузки для заказа</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
        html, body {
            position: relative;
            height: 100%;
        }

        body {
            background: #f1f1f1;
            padding: 0;
            margin: 0
        }

        .content-table {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .content-cell {
            position: relative;
            text-align: center;
            vertical-align: middle;
        }

        .center-content {
            position: relative;
            box-shadow: 0 0 2px #555;
            padding: 20px;
            border-radius: 4px;
            background: #fff;
            display: inline-block;
            text-align: left;
        }
    </style>
</head>
<body>
<table class="content-table">
    <tr>
        <td class="content-cell">
            <div class="center-content">
                <? //echo '<pre>'.var_export($_REQUEST, 1).'</pre>';?>
                <form action="" method="post" style="line-height: 24px;">
                    Форма генерирует XML файл заказа, такой же как при экспорте
                    <br/>заказов с сайта в 1C, но в кодировке utf-8 для просмотре в браузере
                    <br/><br/>
                    <?

                    if ($arErrors) {
                        // Ошибки
                        echo implode('<br />', $arErrors) . '<br />';
                    }

                    ?>
                    Выберите из списка (200 последних ID):
                    <select name="ORDER_ID" style="cursor: pointer;">
                        <option value="">Выберите номер заказа</option>
                        <?

                        foreach ($arOrdersID as $arOrder) {
                            echo '<option value="' . $arOrder['ID'] . '">' . $arOrder['ID'] . ' (' . $arOrder['DATE_INSERT'] . ')</option>';
                        }

                        ?>
                    </select>
                    <br/>Или введите номер заказа вручную: <input type="text" name="ORDER_ID_TEXT" value=""/>
                    <br/>
                    <button type="submit" name="SUBMIT" value="Y" style="cursor: pointer;">Сгенерировать XML</button>
                    <br/><br/>* Полученный XML файл можно открыть в Google Chrome,
                    <br/>файл будет открыт с XML форматированием.
                </form>
            </div>
        </td>
    </tr>
</table>
</body>
</html>