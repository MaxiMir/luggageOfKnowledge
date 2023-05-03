HTMLFormElement.prototype.initHandler = function (userSettings) {
	const form = this;
	const classError = 'field--error';
	const classSuccess = 'field--success';
	const formResultBlock = form.querySelector('.response-data');
	const formSbmBtn = form.querySelector('[type=submit]');
	const steps = ["form--filled", "form--sending", "form--error", "form--finish"];
	const settings = {
		postData: {},
		showLoaderTime: 3000,
		...userSettings
	};

	let state = {
		step: steps[0],
		isFilledForm: false,
		emptyFields: [],
		completedFields: [],
		message: {
			text: null, isError: false
		}
	};


	/**
	 * Проверяет на валидность переданные настройки и данные формы
	 */
	const getErrorsInSettings = (settings, formResultBlock) => {
		const errors = [];
		const {pathToSend} = settings;

		if (!pathToSend) {
			errors.push("Отсутствует путь для отправки данных");
		}

		if (!formResultBlock) {
			errors.push("Отсутствует блок для вывода сообщений");
		}

		return errors;
	};


	/**
	 * Создает промисифицированную задержку в ms
	 */
	const delay = async ms => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, ms)
		});
	};


	/**
	 * Проверяет есть ли измененения в state
	 */
	const componentNeedUpdate = newState => {
		return JSON.stringify(state) !== JSON.stringify(newState);
	};


	/**
	 * Обновление State и в случае изменений запускает перерендеринг компонента:
	 */
	const setState = newState => {
		const newMergingState = {...state, ...newState};

		if (!componentNeedUpdate(newMergingState)) {
			return;
		}

		state = newMergingState;
		setTimeout(() => render(state), 0);
	};


	/**
	 * Возвращает { empty [селекторы пустых обязательных полей], completed [селекторы заполненных полей] }
	 */
	const checkFields = () => {
		const fieldsData = {emptyFields: [], completedFields: []};
		const fields = form.querySelectorAll("input, textarea, select, file, radio");

		return [...fields].reduce((acc, field) => {
			const isRequired = field.hasAttribute("required");
			const isEmpty = !field.value.trim();

			if (isRequired && isEmpty) {
				acc["emptyFields"].push(field);
			} else if (!isEmpty) {
				acc["completedFields"].push(field);
			}

			return acc;
		}, fieldsData);
	};


	/**
	 * Сохраняет в state результат заполнения формы:
	 */
	const showFilingResult = () => {
		const {emptyFields, completedFields} = checkFields();

		setState({isFilledForm: !emptyFields.length, emptyFields, completedFields});
	};


	/**
	 * Посылает и записывает в state результат запроса:
	 */
	const processPostData = async sentData => {
		const request = new XMLHttpRequest();

		request.open("POST", pathToSend, true);
		request.responseType = "json";
		request.onreadystatechange = () => {
			let isError = true;
			let text = "Не удалось отправить данные";

			if (request.status === 200) {
				try {
					const {result, msg} = request.response;
					text = msg;
					isError = result === 'error';
				} catch (e) {
				}
			}

			const step = isError ? steps[2] : steps[3];
			setState({step, message: {text, isError}});
		};

		request.send(sentData);
	};


	/**
	 * Обработчик события клика по кнопке отправить форму:
	 */
	const formSubmitHandler = async e => {
		e.preventDefault();

		showFilingResult();

		if (!state.isFilledForm) {
			return;
		}

		setState({step: steps[1]});

		const formData = new FormData(form);

		if (postData) {
			formData.append("secondData", JSON.stringify(postData));
		}

		await delay(showLoaderTime);
		await processPostData(formData);
	};


	/**
	 * Рендеринг содержимого компонета:
	 */
	const render = state => {
		const {step, emptyFields, completedFields, message: {text, isError}} = state;

		// Добавляем класс для формы с текущим шагом:
		if (!form.classList.contains(step)) {
			for (let stepClass of steps) {
				form.classList.remove(stepClass);
			}

			form.classList.add(step);
		}

		// Добавляем классы для незаполненных обязательных полей:
		for (let emptyField of emptyFields) {
			emptyField.classList.add(classError);
			emptyField.classList.remove(classSuccess);
		}

		// Добавляем классы для заполненных полей:
		for (let completedField of completedFields) {
			completedField.classList.add(classSuccess);
			completedField.classList.remove(classError);
		}

		// Скрываем/Выводим сообщение:
		formResultBlock.innerText = !text ? "" : text;
	};


	const {postData, pathToSend, showLoaderTime} = settings;
	const errors = getErrorsInSettings(settings, formResultBlock);

	if (errors.length > 0) {
		console.error("Ошибки в настройках", errors.join(". "));
		return;
	}

	formSbmBtn.addEventListener('click', formSubmitHandler);
};
