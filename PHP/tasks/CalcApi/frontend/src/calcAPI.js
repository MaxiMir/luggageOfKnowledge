const uri = 'https://slim.xppx.ru/work/src/';

const calcContainer = document.getElementById('calcContainer');
const calcElements = document.getElementsByClassName('calc-elem');
const loader = document.getElementById('calcLoader');

/**
 * Переключает класс у элемента
 *
 * @param {HTMLElement} element
 * @param {string} className
 * @returns {void}
 */
const toggleElementClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

/**
 * Обработчик клика по закрытию выпадающего списка
 *
 * @param {HTMLElement} target
 * @returns {void}
 */
const closeIconClickHandler = ({currentTarget}) => {
  const container = currentTarget.closest('.calc-elem');
  
  toggleElementClass(container, 'active');
  toggleElementClass(currentTarget, 'active');
};

/**
 *  Обработчик наведения на иконку закрытия выпадающего списка
 *
 * @param {HTMLElement} target
 * @returns {void}
 */
const closeIconHoverHandler = ({target}) => {
  const container = target.closest('.calc-elem');
  
  toggleElementClass(container, 'hover');
};

/**
 * Возвращает данные для отправки на сервер
 *
 * @param {HTMLElement} container
 * @returns {object}
 */
const getDataForResponse = (container) => {
  const calcElementsData = [...calcElements];
  const slicedIndex = calcElementsData.indexOf(container) + 1;
  const containers = calcElementsData.slice(0, slicedIndex);
  
  return containers.reduce((acc, container) => {
    const {table, checkedId} = container.dataset;
    acc[table] = checkedId;
    
    return acc;
  }, {});
};

/**
 * Обновляет заголовок у блока
 *
 * @param {HTMLElement} titleElement
 * @param {HTMLElement} target
 * @returns {void}
 */
const updateTitle = (titleElement, target) => {
  titleElement.innerHTML = target.innerText;
  
  toggleElementClass(titleElement, 'fade');
  
  setTimeout(() => {
    toggleElementClass(titleElement, 'fade');
  }, 800);
};

/**
 * Изменяет активный класс у элементов списка
 *
 * @param {HTMLElement} activeElement
 * @param {HTMLElement} newActiveElement
 * @returns {void}
 */
const setNewActiveElement = (activeElement, newActiveElement) => {
  if (activeElement) {
    toggleElementClass(activeElement, 'active');
  }
  
  toggleElementClass(newActiveElement, 'active');
};

/**
 * Обновляет data-id у блока
 *
 * @param {HTMLElement} container
 * @param {HTMLElement} target
 * @returns {void}
 */
const updateContainerID = (container, target) => {
  const {id} = target.dataset;
  
  container.dataset.checkedId = id;
};

/**
 * Обработчик клика по списку
 *
 * @param {HTMLElement} target
 * @param {HTMLElement} currentTarget
 * @returns {boolean|null}
 */
const listElementsClickHandler = ({target, currentTarget}) => {
  const container = target.closest('.calc-elem');
  const activeElement = container.querySelector('.calc-elem__link.active');
  const titleElement = container.querySelector('.calc-elem__title');
  const isNotListElement = target === currentTarget;
  
  if (isNotListElement) {
    return false;
  }
  
  updateContainerID(container, target);
  setNewActiveElement(activeElement, target);
  updateTitle(titleElement, target);
  toggleElementClass(container, 'active');
  
  const dataForResponse = getDataForResponse(container);
  
  initCalc(dataForResponse);
};

/**
 * Отправляет запрос на сервер
 *
 * @param {string} uri
 * @param {boolean} isPost
 * @param {object} data
 * @returns {Promise}
 */
const getResponse = async (uri, isPost = false, data) => {
  const settings = {
    method: isPost ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };
  
  const fetchResponse = await fetch(uri, settings);
  
  return await fetchResponse.json();
};

/**
 * Возвращает название для блока
 *
 * @param {array} elements
 * @param {string} header
 * @param {int|null} checkedID
 * @returns {string}
 */
const getTitle = (elements, header, checkedID) => {
  if (!checkedID) {
    return header;
  }
  
  const checkedElement = elements.filter(item => item.id === checkedID)[0];
  
  return checkedElement.title;
};

/**
 * Возвращает HTML для списка элементов
 *
 * @param {array} elementsData
 * @param {int|null} checkedID
 * @returns {string}
 */
const generateElementsList = (elementsData, checkedID) => {
  const preparedID = !checkedID ? null : +checkedID;
  const elementListHTML = elementsData.map((elementData) => {
    const {id, title} = elementData;
    const isChecked = preparedID && id === preparedID;
    const elemClass = !isChecked ? 'calc-elem__link' : 'calc-elem__link active';
    
    return `
      <li class="${elemClass}" data-id="${id}">${title}</li>
    `;
  });
  
  return elementListHTML.join('\n');
};

/**
 * Возвращает HTML для контейнера с элементами
 *
 * @param settings
 * @returns {string}
 */
const generateContainer = settings => {
  const {table, title, id, checkedID, elements} = settings;
  
  const elementsHTML = generateElementsList(elements, checkedID);
  
  return `
    <div class="calc-container">
      <div class="calc-elem" id="${id}" data-table="${table}" data-checked-id="${checkedID}">
        <svg
            version="1.1"
            class="calc-elem__close"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px"
            width="25px"
            viewBox="0 0 42 42"
            enable-background="new 0 0 42 42"
            xml:space="preserve"
        >
            <path
                    class="calc-elem__path one"
                    fill="#cbcbcb"
                    d="M42,21L42,21c0,1.1-0.9,2-2,2H2c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2H40C41.1,19,42,19.9,42,21z" cx="0"
                    cy="0"
            />
            <path
                    class="calc-elem__path two"
                    fill="#cbcbcb"
                    d="M21,42L21,42c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2V40C23,41.1,22.1,42,21,42z" cx="10"
                    cy="10"
            />
        </svg>
        <span class="calc-elem__title">${title}</span>
        <ul class="calc-elem__list">${elementsHTML}</ul>
      </div>
    </div>
  `;
};

/**
 * Возвращает HTML для контейнера с ценой
 *
 * @param settings
 * @returns {string}
 */
const generatePriceContainer = settings => {
  const {elements} = settings;
  const isShowPrice = elements.length === 1;
  
  if (!isShowPrice) {
    return '';
  }
  
  const {title} = elements[0];
  
  return `<div class="calc-container">
      <div class="calc-elem calc-price">
        <p class="calc-elem__title">Цена:</p>
        <p class="calc-elem__title">${title}</p>
      </div>
    </div>
  `;
};

/**
 * Добавляет обработчики для элементов контейнера
 *
 * @param {string} id
 * @returns {boolean|void}
 */
const createContainerHandlers = id => {
  const container = document.getElementById(id);
  
  if (!container) {
    return false;
  }
  
  const closeIcon = container.querySelector('.calc-elem__close');
  const listElements = container.querySelector('.calc-elem__list');
  
  closeIcon.addEventListener('click', closeIconClickHandler);
  closeIcon.addEventListener('mouseenter', closeIconHoverHandler);
  closeIcon.addEventListener('mouseover', closeIconHoverHandler);
  listElements.addEventListener('click', listElementsClickHandler);
};

/**
 *
 * @param containerData
 */
const createContainer = (containerData) => {
  const {header, table, type, elements, checkedID} = containerData;
  const id = `container${table}`;
  const prepareCheckedID = !checkedID ? null : +checkedID;
  const isSection = type === 'section';
  
  const typeMap = {
    section: generateContainer,
    price: generatePriceContainer,
  };
  
  const title = getTitle(elements, header, prepareCheckedID);
  const settings = {title, table, id, elements, checkedID};
  const container = typeMap[type](settings);
  
  calcContainer.insertAdjacentHTML('beforeend', container);
  
  if (isSection) {
    createContainerHandlers(id);
  }
};

/**
 * Возвращает отсортированный по ключу массив
 *
 * @param {array} containersData
 * @param {string} sortKey
 * @returns {array}
 */
const sortContainers = (containersData, sortKey = 'sort') => {
  if (containersData.length > 1) {
    containersData.sort((a, b) => {
      return a[sortKey] - b[sortKey];
    });
  }
  
  return containersData;
};

/**
 * Создает контейнеры с элементами
 *
 * @param {object} containersData
 * @returns {void}
 */
const createContainers = (containersData) => {
  Object.values(containersData).forEach(containerData => {
    setTimeout(() => createContainer(containerData), 0);
  });
};

/**
 * Инициализирует калькулятор
 *
 * @param {object} settings
 * @returns {void}
 */
const initCalc = (settings) => {
  try {
    getResponse(uri, true, settings).then(({isSuccess, data}) => {
      if (isSuccess) {
        calcContainer.innerHTML = '';
        loader.classList.remove('active');
        const containersData = sortContainers(data);
        createContainers(containersData);
      }
    });
  } catch (e) {
  
  }
};

const initSettings = {
  Services: '2152',
  CalcSettings: '5143',
  PriceName: '1394',
};

initCalc(initSettings);
