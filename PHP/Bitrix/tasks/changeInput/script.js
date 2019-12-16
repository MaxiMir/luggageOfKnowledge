
$(document).on('DOMSubtreeModified', e => {
	const currElem = $(e.target);
	const isCityInput = currElem.hasClass('bx-ui-sls-fake');
	
	if (!isCityInput) {
		return;
	}
	
	const deliveryInfo = $('.delivery-info');
	const loaderBlock = $('.delivery-loader');
	const cityName = currElem.val();
	const isMskCity = cityName === "Москва";
	
	const delay = ms => new Promise(r => setTimeout(() => r(), ms));
	const showDeliveryInfo = () => deliveryInfo.show();
	const hideDeliveryInfo = () => deliveryInfo.hide();
	const showLoader = () => loaderBlock.fadeIn();
	const hideLoader = () => loaderBlock.fadeOut();
	
	if (isMskCity) {
		hideDeliveryInfo();
		return;
	}
	
	$.post({
		url: '/ajax/getCityData.php',
		cache: false,
		data: {cityName},
		beforeSend: () => {
			hideDeliveryInfo();
			showLoader();
		},
		success: data => {
			if (!data) {
				delay(2000)
					.then(hideLoader);
				return;
			}
			
			const {inTown, deliveryPrice, deliveryTime} = JSON.parse(data);
			
			$('.inTown').text(inTown);
			$('.deliveryPrice').text(deliveryPrice);
			$('.deliveryTime').text(deliveryTime);
			
			delay(2000)
				.then(hideLoader)
				.then(showDeliveryInfo);
		},
		error: (jqXHR, exception) => {
			let errorInfo = '';
			
			if (jqXHR.status === 0) {
				errorInfo = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				errorInfo = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				errorInfo = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				errorInfo = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				errorInfo = 'Time out error.';
			} else if (exception === 'abort') {
				errorInfo = 'Ajax request aborted.';
			} else {
				errorInfo = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			
			console.error(errorInfo);
		}
	});
});