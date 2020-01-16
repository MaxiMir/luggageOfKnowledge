document.addEventListener('DOMContentLoaded', () => {
	const filterInputs = document.getElementsByClassName('input-filter');
	const checkboxContainers = document.getElementsByClassName('input-wrap');
	
	
	
	
	/**
	 * Обработчик ввода текста в input
	 *
	 * @param currentTarget
	 */
	const keyupInputHandler = ({ currentTarget }) => {
		const value = currentTarget.value;
		const preparedValue = value.trim().toLowerCase();
		
		const container = currentTarget.closest('.bx_filter_parameters_box');
		const labels = container.getElementsByClassName('bx_filter_param_label');
		const noResultBlock = container.querySelector('.no-result');
		
		if (!preparedValue) {
			toggleVisibility(labels);
			return;
		}
		
		const { elementsToShow, elementsToHide } = splitCheckboxesByHidden(labels, preparedValue);
		
		toggleVisibility(elementsToShow);
		toggleVisibility(elementsToHide, false);
		
		noResultBlock.hidden = elementsToShow.length > 0;
	};
	
	/**
	 * Обработчик фокуса на input
	 *
	 * @param currentTarget
	 */
	const focusInputHandler = ({ currentTarget }) => {
		const container = currentTarget.closest('.bx_filter_parameters_box');
		
		initContainer(container);
	};
	
	/**
	 *
	 * @param container
	 */
	const initContainer = container => {
		const isNotInitContainer = !container.dataset.init;
		
		if (!isNotInitContainer) {
			return;
		}
		
		const hiddenCheckboxContainer = container.querySelector(".hidden_values");
		const expandBlock = container.querySelector(".inner_expand_text");
		
		if (hiddenCheckboxContainer) {
			showHiddenCheckboxes(hiddenCheckboxContainer);
		}
		
		if (expandBlock) {
			expandBlock.remove();
		}
		
		container.dataset.init = "true";
	};
	
	const checkboxContainerHandler = ({currentTarget}) => {
		for (let checkboxContainer of checkboxContainers) {
			const isCurrentContainer = Object.is(checkboxContainer, currentTarget);
			
			if (isCurrentContainer) {
				continue;
			}
			
			const labels = checkboxContainer.querySelectorAll('.bx_filter_param_label.disabled');
			
			if (!labels.length) {
				continue;
			}
			
			const container = checkboxContainer.closest('.bx_filter_parameters_box');
			
			initContainer(container);
			sortLabelsByActive(checkboxContainer, labels);
		}
	};
	
	const sortLabelsByActive = (checkboxContainer, collection) => {
		collection.forEach(label => {
			const prevElement = label.previousElementSibling;
			const isInput = prevElement && prevElement.tagName.toLowerCase() === 'input';
			
			if (isInput) {
				//checkboxContainer.append(prevElement);
			}
			
			//checkboxContainer(label);
			
		});
	};
	
	/**
	 * Показывает скрытые чекбоксы
	 *
	 * @param hiddenCheckboxContainer
	 */
	const showHiddenCheckboxes = hiddenCheckboxContainer => {
		const containerClassList = hiddenCheckboxContainer.classList;
		
		if (!hiddenCheckboxContainer || containerClassList.contains("active")) {
			return;
		}
		
		containerClassList.add("active");
		toggleVisibility(hiddenCheckboxContainer, false);
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
			const data = ~spanPrepareText.indexOf(value)
					? elementsToShow
					: elementsToHide;
			
			data.push(label);
		});
		
		return { elementsToShow, elementsToHide };
	};
	
	/**
	 * Переключает видимость элементов
	 *
	 * @param elements
	 * @param isShow
	 */
	const toggleVisibility = (elements, isShow = true) => {
		const display = isShow ? 'block' : 'none';
		
		if (!elements.length) {
			return;
		}
		
		if (elements instanceof HTMLElement) {
			elements.style.display = display;
		}
		
		[...elements].forEach(elem => elem.style.display = display);
	};
	
	if (filterInputs) {
		for (let filterInput of filterInputs) {
			filterInput.addEventListener('focus', focusInputHandler);
			filterInput.addEventListener('keyup', keyupInputHandler);
		}
		
		for (let checkboxContainer of checkboxContainers) {
			checkboxContainer.addEventListener('click', checkboxContainerHandler);
		}
	}
});