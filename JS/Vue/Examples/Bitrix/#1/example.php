<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
?>

<?php
	\Bitrix\Main\UI\Extension::load('partner.application');
?>

<style type="text/css">
	.root {
		width: 324px;
		min-height: 204px;
		border: 1px solid #020f48;
		padding: 30px 20px;
		box-sizing: border-box;
		margin: 200px
	}
</style>

<div class="root">
	<div id="app"></div>
</div>

<script type="text/javascript">
	PartnerApp = new PartnerPrefix.Application('app');
</script>


<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
?>