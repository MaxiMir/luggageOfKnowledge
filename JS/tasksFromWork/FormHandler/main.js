document.addEventListener("DOMContentLoaded", () => {
    const makeOrderBtn = document.querySelector(".form-calc__submit");

    /**
     * Получаем заполненные опции в форме:
     */
    const getOptionsData = () => {
        const optionsBlocks = document.querySelectorAll('.modal__option');

        return [...optionsBlocks].reduce((acc, optionBlock) => {
            const [optionNameBlock, optionValueBlock] = optionBlock.children;
            const name = optionNameBlock.innerText;
            const value = optionValueBlock.innerText;

            if (name && value) {
                acc[name] = value;
            }

            return acc;
        }, {});
    };


    makeOrderBtn.addEventListener("click", () => {
        const formCalc = document.querySelector('#buyForm');
        const postData = getOptionsData();
        const formSettings = {
            postData,
            pathToSend: "/includes/request.php"
        };

        formCalc.initHandler(formSettings);
    });
});