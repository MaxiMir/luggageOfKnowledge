let timerId;
const filterBrandInputs = document.querySelectorAll('.brand-filter__input');
const filterCounter = document.getElementById('filterCounter');
const filterCounterText = document.getElementById('filterCounterText');
const filterSbmBtn = document.getElementById('brandFilterSbmBtn');


/**
 * @param ms
 * Задержка в ms
 */
const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
};

/**
 * Возвращает следующую страницу по пагинации
 */
const getNextPageURN = () => {
    const currentPaginationBtn = document.querySelector(".block-pagination .pagination nav a.active");

    return currentPaginationBtn.nextElementSibling.getAttribute("href");
};

/**
 * Показывает/скрывает анимацию загрузки
 */
const toggleLoader = () => {
    const loaders = document.querySelectorAll('.loader');

    loaders.forEach(element => element.classList.toggle('opened'));
};


/**
 * парсит текст и возвращает HTML для товаров и пагинации
 * @param text
 */
const getProductsAndPaginationFromText = text => {
    let result = [];

    if (!text) {
        return result;
    }

    try {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");

        const productsHTML = htmlDoc.querySelector("#productContainer");
        const paginationHTML = htmlDoc.querySelector("#paginationContainer");

        result = [productsHTML, paginationHTML];
    } catch (e) {
        console.error(`Ошибка ${e.name}: ${e.message}\n ${e.stack}`);
    }

    return result;
};


/**
 * Обработчик события клика по input
 */
const loadMoreHandler = async e => {
    const productContainer = document.getElementById('productContainer');
    const paginationContainer = document.getElementById('paginationContainer');

    e.preventDefault();

    const nextPage = getNextPageURN();
    const nextPageWithAjax = `${nextPage}&AJAX=true`;

    toggleLoader();

    await delay(1500);
    const response = await fetch(nextPageWithAjax, {mode: 'no-cors'});
    const text = await response.text();

    const [productsHTML, paginationHTML] = getProductsAndPaginationFromText(text);

    if (productsHTML && paginationHTML) {
        productContainer.append(productsHTML);
        paginationContainer.innerHTML = "";
        paginationContainer.append(paginationHTML);
    }

    toggleLoader();
};

/**
 * Возвращает склонененное слово для цифры
 * @param num
 * @param textOptions
 * @returns {boolean|*}
 */
const wordNumDeclension = (num, textOptions) => {
    if (textOptions.length !== 3) {
        return false;
    }

    const restFrom100 = Math.abs(num) % 100;

    if (restFrom100 > 10 && restFrom100 < 20)
        return textOptions[2];

    const restFrom10 = num % 10;

    if (restFrom10 > 1 && restFrom10 < 5)
        return textOptions[1];

    if (restFrom10 === 1)
        return textOptions[0];

    return textOptions[2];
};


/**
 * Возвращает текущее количество отмеченных товаров в фильтре
 */
const getCurrentFilterProdCount = () => {
    return [...filterBrandInputs]
        .filter(input => input.checked)
        .reduce((acc, input) => acc + +input.dataset.count, 0);
};


/**
 * Возвращает количество всех товаров на странице
 */
const getFilterAllProdCount = () => +filterCounter.dataset.all;


/**
 * Возвращает последнее сохраненное количество отмеченных товаров в фильтре
 */
const getLastSavedFilterProdCount = () => +filterCounter.dataset.last;


/**
 * Записывает текущее количество отмеченных товаров в фильтре
 */
const saveFilterProdCount = newValue => {
    filterCounter.dataset.last = newValue;
};


/**
 * Показывает и скрывает блок фильтра с количеством товаров c анимацией
 */
const showAndHideFilterProdCount = indexNum => {
    const upHeight = 50;

    const prevCount = getLastSavedFilterProdCount();
    let newCount = getCurrentFilterProdCount();

    if (!newCount) {
        newCount = getFilterAllProdCount();
    }

    saveFilterProdCount(newCount);

    const newText = wordNumDeclension(newCount, ['товар', 'товара', 'товаров']);

    filterCounter.style.top = `${upHeight * indexNum + 20}px`;
    filterCounterText.innerText = newText;
    filterCounter.classList.add("active");

    animateFilterProdCount(prevCount, newCount);

    clearTimeout(timerId);
    timerId = setTimeout(hideFilterProdCount, 3000);
};


/**
 * Скрывает блок фильтра с количеством товаров
 */
const hideFilterProdCount = () => {
    filterCounter.classList.remove('active');
};


/**
 * Анимация увеличения/уменьшения цены
 * @param oldProductNum
 * @param newProductNum
 */
const animateFilterProdCount = (oldProductNum, newProductNum) => {
    const $filterCount = $("#filterCounterCount");

    $({numberValue: oldProductNum}).animate(
        {numberValue: newProductNum},
        {
            duration: 500,
            easing: "linear",
            step: val => {
                $filterCount.html(Math.ceil(val));
            }
        }
    );
};


/**
 * Возвращает массив с отмеченными ID брендов
 */
const getCheckedBrandIDs = () => {
    return [...filterBrandInputs]
        .filter(input => input.checked)
        .reduce((acc, input) => {
            acc.push(input.value);
            return acc;
        }, []);
};


/**
 * Обработчик события клика по input
 * @param e
 */
const inputBrandClickHandler = e => {
    const input = e.currentTarget;
    const indexNum = +input.dataset.index;

    showAndHideFilterProdCount(indexNum);
};


/**
 * Обработчик события клика по "применить фильтры"
 * @param e
 */
const formBrandSubmitHandler = e => {
    let brandURNPart = "";

    e.preventDefault();

    const urn = filterSbmBtn.dataset.urn;
    const brandsIDs = getCheckedBrandIDs();

    if (brandsIDs.length) {
        brandURNPart = `&BRAND=${brandsIDs.join('-')}`;
    }

    document.location.href = `${urn}${brandURNPart}`;
};


// # Вешаем обработчики:
for (let filterBrandInput of filterBrandInputs) {
    filterBrandInput.addEventListener('click', inputBrandClickHandler)
}

if (filterSbmBtn) {
    filterSbmBtn.addEventListener('click', formBrandSubmitHandler);
}

if (filterCounter) {
    filterCounter.addEventListener('click', formBrandSubmitHandler);
}


document.addEventListener('click', e => {
    if(e.target.id === "loadMore") {
        loadMoreHandler(e);
    }
});