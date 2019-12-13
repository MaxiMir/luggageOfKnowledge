<head>
	<!-- Добавляем подлючение скрипта + обработчик -->
	<script src="https://www.google.com/recaptcha/api.js?render=#YOUR_RECAPTCHA_SITE_KEY#"></script>
</head>
<body>
	<form>
		<!-- .... -->
		<!-- Добавляем скрытое поле -->
		<input type="hidden" name="recaptcha_response" id="recaptchaResponse">
	</form>
	<script>
		document.readyState = () => {
            grecaptcha.ready(function () {
                grecaptcha.execute('#YOUR_RECAPTCHA_SITE_KEY#', { action: 'contact' }).then(function (token) {
                    const recaptchaResponse = document.getElementById('recaptchaResponse');
                    recaptchaResponse.value = token;
                });
            });
		};
	</script>
</body>

<?
	$isUser = false;

	if (!empty($_POST['recaptcha_response'])) {
		$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
		$recaptcha_secret = '#YOUR_RECAPTCHA_SECRET_KEY#';
		$recaptcha_response = $_POST['recaptcha_response'];
		$URI = "{$recaptcha_url}?secret={$recaptcha_secret}&response={$recaptcha_response}";


		$recaptcha = file_get_contents($URI);
		$recaptcha = json_decode($recaptcha);


		if ($recaptcha->score >= 0.5) {
			$isUser = true;
		}
	}

