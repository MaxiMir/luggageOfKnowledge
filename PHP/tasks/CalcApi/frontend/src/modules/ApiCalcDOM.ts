import ICalcSettings from "./ICalcSettings";
import IContainerElement from "./IContainerElement";
import IElementData from "./IElementData";
import IContainerData from "./IContainerData";
import ApiCalcHelper from "./ApiCalcHelper";

export default class ApiCalcDOM {
    private loaderDeactivated :boolean = false;
    private readonly loader: HTMLElement | null;
    private readonly calcContainer: HTMLElement | null;
    private readonly calcElements: HTMLCollectionOf<Element> | null;

    constructor() {
        const calcSection = document.createElement('div');

        calcSection.classList.add('calc-section');
        calcSection.insertAdjacentHTML('afterbegin', `
            <style>
                .calc-section {
                    width: 100%;
                    padding: 20px;
                    font-family: "Helvetica Neue", Arial, serif;
                }
                
                .calc-main-container {
                    display: flex;
                    flex-wrap: wrap;
                }
                
                .calc-container {
                    min-height: 100px;
                    margin-bottom: 10px;
                    padding: 10px;
                }
                
                .calc-elem {
                    color: #636363;
                    width: 250px;
                    padding: 10px;
                    -moz-transition: border 0.3s ease;
                    -o-transition: border 0.3s ease;
                    -webkit-transition: border 0.3s ease;
                    transition: border 0.3s ease;
                    backface-visibility: hidden;
                    --borderWidth: 3px;
                    background: #ffffff;
                    position: relative;
                    border-radius: var(--borderWidth);
                }
                
                .calc-price {
                    background: none;
                }
                
                .calc-elem:after {
                    content: '';
                    position: absolute;
                    top: calc(-1 * var(--borderWidth));
                    left: calc(-1 * var(--borderWidth));
                    height: calc(100% + var(--borderWidth) * 2);
                    width: calc(100% + var(--borderWidth) * 2);
                    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
                    border-radius: calc(2 * var(--borderWidth));
                    z-index: -1;
                    -webkit-animation: animatedGradient 3s ease alternate infinite;
                    animation: animatedGradient 3s ease alternate infinite;
                    background-size: 300% 300%;
                }
                
                .calc-elem__title {
                    font-size: 1rem;
                    line-height: 32px;
                    font-weight: bold;
                    color: #404040bd;
                    padding: 0 5px;
                    -moz-transition: color 0.3s ease;
                    -o-transition: color 0.3s ease;
                    -webkit-transition: color 0.3s ease;
                    transition: color 0.3s ease;
                }
                
                .calc-price .calc-elem__title {
                    text-align: center;
                    color: #fff;
                }
                
                .calc-elem__title.fade {
                    -webkit-animation: colorFade 0.6s 0s ease both;
                    -moz-animation: colorFade 0.6s 0s ease both;
                    -ms-animation: colorFade 0.6s 0s ease both;
                    -o-animation: colorFade 0.6s 0s ease both;
                    animation: colorFade 0.6s 0s ease both;
                }
                
                .calc-elem.active > .calc-elem__list {
                    display: block;
                }
                
                .calc-elem.hover > .calc-elem__title {
                    color: #b2b2b2;
                }
                
                .calc-elem.open .calc-elem__list {
                    height: 100px;
                    opacity: 1;
                }
                
                .calc-elem__list {
                    display: none;
                    list-style-type: none;
                    font-weight: 200;
                    width: 100%;
                    -moz-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                    padding: 10px 5px 0 0;
                    margin: 15px 0 0;
                }
                
                .calc-elem__link {
                    padding: 5px;
                    text-decoration: none;
                    font-size: 1rem;
                    color: #cbcbcb;
                    font-weight: bold;
                    cursor: pointer;
                    -moz-transition: color 0.3s ease;
                    -o-transition: color 0.3s ease;
                    -webkit-transition: color 0.3s ease;
                    transition: color 0.3s ease;
                }
                
                .calc-elem__link:hover {
                    color: #636363;
                }
                
                .calc-elem__link.active {
                    color: #636363;
                }
                
                .calc-elem__list-elem {
                    padding: 8px 0;
                }
                
                .calc-elem__close {
                    float: right;
                    fill: #cbcbcb;
                    position: relative;
                    top: 4px;
                    -moz-transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                    -moz-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .calc-elem__path {
                    -moz-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                }
                
                .calc-elem__close:hover .calc-elem__path {
                    fill: #404040;
                }
                
                .calc-elem__close.active {
                    -moz-transform: rotate(-135deg);
                    -ms-transform: rotate(-135deg);
                    -webkit-transform: rotate(-135deg);
                    transform: rotate(-135deg);
                }
                
                .calc-elem__close.active .calc-elem__path {
                    fill: #404040;
                }
                
                
                /* @ ANIMATIONS: */
                /* FONT: */
                @-moz-keyframes colorFade {
                    from {
                        color: #404040;
                    }
                    to {
                        color: #cbcbcb;
                    }
                }
                
                @-webkit-keyframes colorFade {
                    from {
                        color: #404040;
                    }
                    to {
                        color: #cbcbcb;
                    }
                }
                
                @keyframes colorFade {
                    from {
                        color: #404040;
                    }
                    to {
                        color: #cbcbcb;
                    }
                }
                
                /* BORDER: */
                @-webkit-keyframes animatedGradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                
                @keyframes animatedGradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            </style>
            <h2>Калькулятор</h2>
            <div class="calc-loader active" id="calcLoader">
                <style>
                    .calc-loader {
                        display: none;
                    }
                    
                    .calc-loader.active {
                        display: block;
                    }
                    
                    /* @ LOADER: */
                    .calc-boxes {
                        margin: 0 auto;
                        --size: 32px;
                        --duration: 800ms;
                        height: calc(var(--size) * 2);
                        width: calc(var(--size) * 3);
                        position: relative;
                        -webkit-transform-style: preserve-3d;
                        transform-style: preserve-3d;
                        -webkit-transform-origin: 50% 50%;
                        transform-origin: 50% 50%;
                        -webkit-transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
                        transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
                    }
                    
                    .calc-boxes .calc-box {
                        width: var(--size);
                        height: var(--size);
                        top: 0;
                        left: 0;
                        position: absolute;
                        -webkit-transform-style: preserve-3d;
                        transform-style: preserve-3d;
                    }
                    
                    .calc-boxes .calc-box:nth-child(1) {
                        -webkit-transform: translate(100%, 0);
                        transform: translate(100%, 0);
                        -webkit-animation: box1 var(--duration) linear infinite;
                        animation: box1 var(--duration) linear infinite;
                    }
                    
                    .calc-boxes .calc-box:nth-child(2) {
                        -webkit-transform: translate(0, 100%);
                        transform: translate(0, 100%);
                        -webkit-animation: box2 var(--duration) linear infinite;
                        animation: box2 var(--duration) linear infinite;
                    }
                    
                    .calc-boxes .calc-box:nth-child(3) {
                        -webkit-transform: translate(100%, 100%);
                        transform: translate(100%, 100%);
                        -webkit-animation: box3 var(--duration) linear infinite;
                        animation: box3 var(--duration) linear infinite;
                    }
                    
                    .calc-boxes .calc-box:nth-child(4) {
                        -webkit-transform: translate(200%, 0);
                        transform: translate(200%, 0);
                        -webkit-animation: box4 var(--duration) linear infinite;
                        animation: box4 var(--duration) linear infinite;
                    }
                    
                    .calc-boxes .calc-box > div {
                        --background: #5c8df6;
                        --top: auto;
                        --right: auto;
                        --bottom: auto;
                        --left: auto;
                        --translateZ: calc(var(--size) / 2);
                        --rotateY: 0deg;
                        --rotateX: 0deg;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: var(--background);
                        top: var(--top);
                        right: var(--right);
                        bottom: var(--bottom);
                        left: var(--left);
                        -webkit-transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
                        transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
                    }
                    
                    .calc-boxes .calc-box > div:nth-child(1) {
                        --top: 0;
                        --left: 0;
                    }
                    
                    .calc-boxes .calc-box > div:nth-child(2) {
                        --background: #145af2;
                        --right: 0;
                        --rotateY: 90deg;
                    }
                    
                    .calc-boxes .calc-box > div:nth-child(3) {
                        --background: #447cf5;
                        --rotateX: -90deg;
                    }
                    
                    .calc-boxes .calc-box > div:nth-child(4) {
                        --background: #dbe3f4;
                        --top: 0;
                        --left: 0;
                        --translateZ: calc(var(--size) * 3 * -1);
                    }
                    
                    @-webkit-keyframes box1 {
                        0%,
                        50% {
                            -webkit-transform: translate(100%, 0);
                            transform: translate(100%, 0);
                        }
                        100% {
                            -webkit-transform: translate(200%, 0);
                            transform: translate(200%, 0);
                        }
                    }
                    
                    @keyframes box1 {
                        0%,
                        50% {
                            -webkit-transform: translate(100%, 0);
                            transform: translate(100%, 0);
                        }
                        100% {
                            -webkit-transform: translate(200%, 0);
                            transform: translate(200%, 0);
                        }
                    }
                    
                    @-webkit-keyframes box2 {
                        0% {
                            -webkit-transform: translate(0, 100%);
                            transform: translate(0, 100%);
                        }
                        50% {
                            -webkit-transform: translate(0, 0);
                            transform: translate(0, 0);
                        }
                        100% {
                            -webkit-transform: translate(100%, 0);
                            transform: translate(100%, 0);
                        }
                    }
                    
                    @keyframes box2 {
                        0% {
                            -webkit-transform: translate(0, 100%);
                            transform: translate(0, 100%);
                        }
                        50% {
                            -webkit-transform: translate(0, 0);
                            transform: translate(0, 0);
                        }
                        100% {
                            -webkit-transform: translate(100%, 0);
                            transform: translate(100%, 0);
                        }
                    }
                    
                    @-webkit-keyframes box3 {
                        0%,
                        50% {
                            -webkit-transform: translate(100%, 100%);
                            transform: translate(100%, 100%);
                        }
                        100% {
                            -webkit-transform: translate(0, 100%);
                            transform: translate(0, 100%);
                        }
                    }
                    
                    @keyframes box3 {
                        0%,
                        50% {
                            -webkit-transform: translate(100%, 100%);
                            transform: translate(100%, 100%);
                        }
                        100% {
                            -webkit-transform: translate(0, 100%);
                            transform: translate(0, 100%);
                        }
                    }
                    
                    @-webkit-keyframes box4 {
                        0% {
                            -webkit-transform: translate(200%, 0);
                            transform: translate(200%, 0);
                        }
                        50% {
                            -webkit-transform: translate(200%, 100%);
                            transform: translate(200%, 100%);
                        }
                        100% {
                            -webkit-transform: translate(100%, 100%);
                            transform: translate(100%, 100%);
                        }
                    }
                    
                    @keyframes box4 {
                        0% {
                            -webkit-transform: translate(200%, 0);
                            transform: translate(200%, 0);
                        }
                        50% {
                            -webkit-transform: translate(200%, 100%);
                            transform: translate(200%, 100%);
                        }
                        100% {
                            -webkit-transform: translate(100%, 100%);
                            transform: translate(100%, 100%);
                        }
                    }                    
                </style>
                <div class="calc-boxes">
                    <div class="calc-box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="calc-box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="calc-box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="calc-box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div id="calcContainer" class="calc-main-container"></div>
        `);

        document.body.appendChild(calcSection);

        this.calcContainer = document.getElementById('calcContainer');
        this.calcElements = document.getElementsByClassName('calc-elem');
        this.loader = document.getElementById('calcLoader');
    }

    /**
     * Скрывает блок c loader
     */
    deactivateLoader(): void {
        if (this.loader && !this.loaderDeactivated) {
            this.toggleElementClass(this.loader, 'active');
            this.loaderDeactivated = true;
        }
    }

    /**
     * Выводит ошибку
     *
     * @param {string} msg
     */
    showError(msg: string): void {
        if (this.calcContainer) {
            this.calcContainer.innerHTML = `<p>${msg}</p>`;
        }
    }


    /**
     * Переключает класс у элемента
     *
     * @param {HTMLElement|null} element
     * @param {string} className
     * @returns {void}
     */
    toggleElementClass(element: HTMLElement | null, className: string): void {
        if (!element) {
            return;
        }

        element.classList.toggle(className);
    };

    /**
     * Переключает класс у элементов
     *
     * @param elements
     * @param {string} className
     */
     toggleElementsClass(elements: HTMLElement[] | HTMLCollection, className: string): void {
        const elementsList = elements instanceof Array ? elements : [...elements] as HTMLElement[];

        elementsList.forEach(element => {
            this.toggleElementClass(element, className);
        });
    };

    /**
     * Обработчик клика по закрытию выпадающего списка
     *
     * @param {Event} e
     * @returns {void}
     */
    closeIconClickHandler (e: Event): void {
        const currentTarget = e.currentTarget as HTMLElement;
        const container = currentTarget.closest('.calc-elem') as HTMLElement || null;

        this.toggleElementsClass([container, currentTarget], 'active');
    };

    /**
     *  Обработчик наведения на иконку закрытия выпадающего списка
     *
     * @param {Event} e
     * @returns {void}
     */
    closeIconHoverHandler (e: Event): void {
        const target = e.currentTarget as HTMLElement;
        const container: HTMLElement | null = target.closest('.calc-elem');

        this.toggleElementClass(container, 'hover');
    };

    /**
     * Возвращает данные для отправки на сервер
     *
     * @param {HTMLElement} container
     * @returns {object}
     */
    getDataForResponse (container: HTMLElement): ICalcSettings|void {
        if (!this.calcElements) {
            return;
        }

        const calcElementsData = [...this.calcElements];
        const slicedIndex = calcElementsData.indexOf(container) + 1;
        const containers = calcElementsData.slice(0, slicedIndex);

        return containers.reduce((acc, container: IContainerElement) => {
            const {table, checkedId} = container.dataset;
            acc[table] = checkedId;

            return acc;
        }, {});
    };

    /**
     * Обновляет заголовок у блока
     *
     * @param {HTMLElement|null} titleElement
     * @param {HTMLElement} target
     * @returns {void}
     */
    updateContainerTitle (titleElement: HTMLElement | null, target: HTMLElement): void {
        if (!titleElement) {
            return;
        }

        titleElement.innerHTML = target.innerText;

        this.toggleElementClass(titleElement, 'fade');

        setTimeout(() => {
            this.toggleElementClass(titleElement, 'fade');
        }, 800);
    };

    /**
     * Обновляет data-id у блока
     *
     * @param {HTMLElement} container
     * @param {HTMLElement} target
     * @returns {void}
     */
    updateContainerID (container: HTMLElement, target: HTMLElement): void {
        const {id} = target.dataset;

        container.dataset.checkedId = id;
    };

    /**
     * Обработчик клика по списку
     *
     * @param e
     * @returns {boolean|void}
     */
    listElementsClickHandler(e: Event): boolean | void {
        const target = e.target as HTMLElement;
        const currentTarget = e.currentTarget as HTMLElement;

        const isNotListElement = target === currentTarget;
        const container: HTMLElement | null = target.closest('.calc-elem');

        if (isNotListElement || !container) {
            return false;
        }

        const activeElement: HTMLElement | null = container.querySelector('.calc-elem__link.active');
        const titleElement: HTMLElement | null = container.querySelector('.calc-elem__title');

        this.updateContainerID(container, target);
        this.toggleElementClass(activeElement, 'active');
        this.toggleElementClass(target, 'active');
        this.updateContainerTitle(titleElement, target);
        this.toggleElementClass(container, 'active');

        const {isSuccess, data, msg} = this.getDataForResponse(container);
        if (!isSuccess) {
            this.showError(msg);
        }

        const containersData = ApiCalcHelper.sortContainers(data);
        this.createContainers(containersData);
    };

    /**
     * Возвращает HTML для списка элементов
     *
     * @param {array} elementsData
     * @param {int|null} checkedID
     * @returns {string}
     */
    generateElementsList(elementsData: IElementData[], checkedID: number | null){
        const preparedID = !checkedID ? null : +checkedID;

        const elementListHTML = elementsData.map((IElementData) => {
            const {id, title} = IElementData;
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
    generateContainer(settings: IContainerData): string {
        const {table, title, id, checkedID, elements} = settings;

        const elementsHTML = this.generateElementsList(elements, checkedID);

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
     * @param containerData
     * @returns {string}
     */
    generatePriceContainer(containerData: IContainerData) {
        const {elements} = containerData;
        const isShowPrice = elements.length === 1;

        if (!isShowPrice) {
            return '';
        }

        const {title} = elements[0];

        return `<div class="calc-container">
      <div class="calc-price calc-price">
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
    createContainerHandlers(id: string): boolean | void {
        const container = document.getElementById(id);

        if (!container) {
            return false;
        }

        const closeIcon: HTMLElement | null = container.querySelector('.calc-elem__close');
        const listElements: HTMLElement | null = container.querySelector('.calc-elem__list');

        if (listElements) {
            listElements.addEventListener('click', this.listElementsClickHandler);
        }

        if (closeIcon) {
            closeIcon.addEventListener('click', this.closeIconClickHandler);
            closeIcon.addEventListener('mouseenter', this.closeIconHoverHandler);
            closeIcon.addEventListener('mouseover', this.closeIconHoverHandler);
        }
    };

    /**
     * Создает контейнер с элементами
     *
     * @param containerData
     */
    createContainer (containerData: IContainerData) {
        const {header, table, type, elements, checkedID} = containerData;
        const id = `container${table}`;
        const prepareCheckedID = !checkedID ? null : +checkedID;
        const isSection = type === 'section';

        const typeMap = {
            section: this.generateContainer,
            price: this.generatePriceContainer,
        };

        const title = ApiCalcHelper.getContainerTitle(elements, header, prepareCheckedID);
        const settings = {id, title, table, elements, checkedID};
        const container = typeMap[type](settings);

        if (this.calcContainer) {
            this.calcContainer.insertAdjacentHTML('beforeend', container);
        }

        if (isSection) {
            this.createContainerHandlers(id);
        }
    };

    /**
     * Создает контейнеры с элементами
     *
     * @param {object} containersData
     * @returns {void}
     */
    createContainers(containersData: IContainerData[]): void {
        setTimeout(() => {
            // @ts-ignore
            Object.values(containersData).forEach((containerData: IContainerData) => {
                this.createContainer(containerData);
            });
        }, 0);
    }
}