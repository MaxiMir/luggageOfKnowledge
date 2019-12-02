HTMLFormElement.prototype.initHandler = function (userSettings) {
    const form = this;
    const classError = 'field--error';
    const classSuccess = 'field--success';
    const formResultBlock = form.querySelector('.response-data');
    const formSbmBtn = form.querySelector('[type=submit]');
    const steps = ["form--filled", "form--sending", "form--finish"];
    const settings = {
        postData: {},
        showLoaderTime: 1500,
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
     * @param settings
     * @param formResultBlock
     * @returns {[]}
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
     * @param ms
     * @returns {Promise<unknown>}
     */
    const delay = async ms => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    };


    /**
     * Обновление State
     * @param newState
     */
    const setState = newState => {
        state = {...state, ...newState};
    };


    /**
     * Возвращает { empty [селекторы пустых обязательных полей], completed [селекторы заполненных полей] }
     * @returns {*}
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
     * Рендерит результат заполнения формы
     */
    const showFilingResult = () => {
        const {emptyFields, completedFields} = checkFields();

        setState({isFilledForm: !emptyFields.length, emptyFields, completedFields});

        render(state);
    };


    /**
     * Посылает и записывает в state результат запроса
     * @param sentData
     * @returns {Promise<string>}
     */
    const processPostData = async sentData => {
        return fetch(pathToSend, {method: "POST", body: sentData})
            .then(responseServer => responseServer.text())
            .then(response => {
                    const {result, msg} = response;
                    const isSuccess = result === 'success';

                    setState({message: {text: msg, isError: isSuccess}});
                }
            ).catch(error => {
                console.error(error);
                setState({message: {text: "Возникла ошибка при отправке данных", isError: true}});
            });
    };


    /**
     * Обработчик события клика по кнопке отправить форму
     * @param e
     * @returns {Promise<void>}
     */
    const formSubmitHandler = async e => {
        e.preventDefault();

        showFilingResult();

        if (!state.isFilledForm) {
            return;
        }

        setState({step: steps[1]});
        render(state);

        const formData = new FormData(form);
        const sentData = {...postData, ...formData};

        await processPostData(sentData);
        await delay(showLoaderTime);

        setState({step: steps[2]});
        render(state);
    };


    /**
     * Рендеринг содержимого формы
     */
    const render = state => {
        console.log(state);
        const {isFilledForm, step, emptyFields, completedFields, message: {text, isError}} = state;

        // Добавляем класс для формы с текущим шагом:
        if (!form.classList.contains(step)) {
            for (let stepClass of steps) {
                form.classList.remove(stepClass);
            }

            form.classList.add(step);
        }

        // Добавляем класс для кнопки отправки:
        if (isFilledForm) {
            formSbmBtn.classList.add("button--disabled");
        } else {
            formSbmBtn.classList.remove("button--disabled");
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
        if (!text) {
            formResultBlock.innerText = "";
        } else {
            const addClassResult = isError ? classError : classSuccess;
            const hiddenClassResult = isError ? classSuccess : classError;

            formResultBlock.classList.add(addClassResult);
            formResultBlock.classList.remove(hiddenClassResult);

            formResultBlock.innerText = text;
        }
    };


    const {postData, pathToSend, showLoaderTime} = settings;
    const errors = getErrorsInSettings(settings, formResultBlock);

    if (errors.length > 0) {
        console.error("Ошибки в настройках", errors.join(". "));
        return;
    }

    formSbmBtn.addEventListener('click', formSubmitHandler);
};