const initInputHandler = input => {
    const stepClasses = ["initial", "forbiddenLength", "correctValue"];
    const regCleanSigns = /[^\d\.\,]/g;
    const regMarks = /[\.\,)]/g;
    const maxInputValueLength = 4;

    let state = {
        stepClass: stepClasses[0],
        valueData: {
            isIntegerVal: null,
            typeValue: null,
            reducedValue: null
        }
    };

    /**
     * Обрезает и удаляет лишние символы
     * @param inputValue
     */
    const bringInputValueToValid = inputValue => {
        const searchDoubleSigns = inputValue.match(regMarks);
        const isIssetDoubleMark = !searchDoubleSigns ? false : searchDoubleSigns.length > 1;
        const isValidInputValue = !isIssetDoubleMark && inputValue.length <= 4 && !inputValue.match(regCleanSigns);

        if (isValidInputValue) {
            return;
        }

        let isCreatedDoubleMark = false;
        const substrString = input.value.substr(0, maxInputValueLength);

        input.value = [...substrString].reduce((acc, sign) => {
            const isMark = sign.match(regMarks);
            const isValidSign = !sign.match(regCleanSigns);

            if (!isMark && isValidSign) {
                acc += sign;
            }

            if (isMark && !isCreatedDoubleMark) {
                acc += sign;

                if (!isCreatedDoubleMark) {
                    isCreatedDoubleMark = true;
                }
            }

            return acc;
        }, "");
    };


    /**
     * Преобразует введенное значение во float или int и возвращает данные о нем.
     * @returns {{reducedValue: *, isIntegerVal: *, typeValue: *}}
     */
    const getTransformedValue = userValue => {
        let reducedValue;
        let valueData = {reducedValue: null, isIntegerVal: null, typeValue: null};

        if (userValue === "") {
            return valueData;
        }

        const isIntegerVal = !userValue.match(regMarks);
        const typeValue = isIntegerVal ? "integer" : "float";

        if (isIntegerVal) {
            reducedValue = parseInt(userValue);
        } else {
            const userValueWithoutComma = userValue.replace(",", ".");
            reducedValue = parseFloat(userValueWithoutComma);
        }

        return {reducedValue, isIntegerVal, typeValue};
    };


    /**
     * => Проверяет на доступную длину
     * @param inputValue
     * @returns {boolean}
     */
    const isNotForbiddenLength = inputValue => {
        const minValue = {integer: 1, float: 0.45};
        const maxValue = {integer: 6, float: 6.5};
        const {typeValue, reducedValue} = getTransformedValue(inputValue);

        if (!reducedValue) {
            return false;
        }

        return minValue[typeValue] <= reducedValue && reducedValue <= maxValue[typeValue];
    };


    /**
     * Обработчик события
     */
    const changeInputHandler = () => {
        let stepClass = stepClasses[2];

        if (!input.value.length) {
            stepClass = stepClasses[0];
        } else {
            bringInputValueToValid(input.value);

            if (!isNotForbiddenLength(input.value)) {
                stepClass = stepClasses[1];
            }
        }

        const valueData = getTransformedValue(input.value);
        setState({stepClass, valueData});
    };


    /**
     * Проверяет есть ли измененения в state
     * @param newState
     * @returns {boolean}
     */
    const componentNeedUpdate = newState => {
        return JSON.stringify(state) !== JSON.stringify(newState);
    };


    /**
     * Обновление State и в случае изменений запускает перерендеринг компонента:
     * @param newState
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
     * Рендиринг компонента
     * @param stepClass
     */
    const render = ({stepClass}) => {
        input.classList.remove(...stepClasses);
        input.classList.add(stepClass);
    };

    input.addEventListener("keyup", changeInputHandler);
};



const lengthInput = document.querySelector(".roof-length__input");
initInputHandler(lengthInput);