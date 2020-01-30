document.addEventListener('DOMContentLoaded', () => {
	const filterBlock = document.getElementById('filterContainer');
	const filterInputs = filterBlock.getElementsByClassName('input-filter');
	const checkboxContainers = filterBlock.getElementsByClassName('input-wrap');
	const isInitContainers = filterBlock.querySelector('input:checked');
	
	/**
	 * Раскрывает контейнер с чекбоксами и удаляет блок "Показать еще"
	 *
	 * @param containerChild
	 */
	const initContainer = containerChild => {
		const container = containerChild.closest('.bx_filter_parameters_box');
		const isContainerInit = container.dataset.init;
		
		if (isContainerInit) {
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
	 * Переключает видимость элемента(ов)
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
	
	/**
	 * Перемещает чекбоксы в конец контейнера
	 *
	 * @param checkboxContainer
	 * @param inputs
	 */
	const dropDownCheckboxes = (checkboxContainer, inputs) => {
		[...inputs].forEach(input => {
			const nextElement = input.nextElementSibling;
			const isLabel = nextElement && nextElement.tagName.toLowerCase() === 'label';
			
			checkboxContainer.append(input);
			
			if (isLabel) {
				checkboxContainer.append(nextElement);
			}
		});
	};
	
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
		initContainer(currentTarget);
	};
	
	/**
	 * Обработчик клика в контейнере
	 *
	 * @param e
	 */
	const checkboxContainerHandler = e => {
		const validTags = ["input", "span"];
		
		const {currentTarget, target} = e;
		const clickedTag = target.tagName.toLowerCase();
		const isChecked = validTags.includes(clickedTag);
		
		if (!isChecked) {
			return;
		}
		
		const restCheckboxContainers = [...checkboxContainers].filter(container => {
			return !Object.is(container, currentTarget)
		});
		
		for (let checkboxContainer of restCheckboxContainers) {
			initContainer(checkboxContainer);
		}
	};
	
	
	for (let filterInput of filterInputs) {
		filterInput.addEventListener('focus', focusInputHandler);
		filterInput.addEventListener('keyup', keyupInputHandler);
	}
	
	for (let checkboxContainer of checkboxContainers) {
		checkboxContainer.addEventListener('click', checkboxContainerHandler);
		
		if (isInitContainers) {
			const inputs = checkboxContainer.querySelectorAll("input.disabled");
			
			if (inputs.length) {
				initContainer(checkboxContainer);
				dropDownCheckboxes(checkboxContainer, inputs);
			}
		}
	}
});