document.addEventListener('DOMContentLoaded', () => {
	const filterInputs = document.getElementsByClassName('input-filter');
	
	/**
	 * Обработчик ввода текста в input
	 *
	 * @param currentTarget
	 */
	const filterInputHandler = ({ currentTarget }) => {
		const { filterId } = currentTarget.dataset;
		const value = currentTarget.value;
		const preparedValue = value.trim().toLowerCase();
		const checkboxesContainer = currentTarget.nextElementSibling;
		const labels = checkboxesContainer.getElementsByClassName('bx_filter_param_label');
		const noResultBlock = document.getElementById(`noResult${filterId}`);
		
		if (!preparedValue) {
			toggleElementsVisibility(labels);
			return;
		}
		
		const { elementsToShow, elementsToHide } = splitCheckboxesByHidden(labels, preparedValue);
		
		toggleElementsVisibility(elementsToShow);
		toggleElementsVisibility(elementsToHide, false);
		
		if (noResultBlock) {
			noResultBlock.hidden = elementsToShow.length > 0;
		}
	};
	
	/**
	 * Возвращает массивы с чекбосами для скрытия и показа
	 *
	 * @param labels
	 * @param value
	 * @returns {{elementsToShow: [], elementsToHide: []}}
	 */
	const splitCheckboxesByHidden = (labels, value) => {
		const elementsToHide = [];
		const elementsToShow = [];
		
		[...labels].forEach(label => {
			const span = label.querySelector('.bx_filter_param_text');
			const spanPrepareText = span.innerText.toLowerCase();
			const data = ~spanPrepareText.indexOf(value) ? elementsToShow : elementsToHide;
			data.push(label);
		});
		
		return { elementsToShow, elementsToHide };
	};
	
	/**
	 * Переключает видимость элементов
	 *
	 * @param collection
	 * @param isShow
	 */
	const toggleElementsVisibility = (collection, isShow = true) => {
		const display = isShow ? 'block' : 'none';
		
		if (!collection.length) {
			return;
		}
		
		[...collection].forEach(elem => elem.style.display = display);
	};
	
	
	if (filterInputs) {
		for (let filterInput of filterInputs) {
			filterInput.addEventListener('keyup', filterInputHandler);
		}
	}
});
