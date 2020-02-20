"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
((window) => {
    'use strict';
    const calcWidget = window.calcWidget = {};
    calcWidget.init = (calcSettings) => __awaiter(void 0, void 0, void 0, function* () {
        let calcContainer;
        const uri = 'https://slim.xppx.ru/work/src/';
        const calcElements = document.getElementsByClassName('calc-elem');
        const closeIcons = document.getElementsByClassName('calc-elem__close');
        const listElements = document.getElementsByClassName('calc-elem__list');
        const sortContainers = (containersData) => {
            if (containersData.length > 1) {
                containersData.sort((a, b) => {
                    return a.sort - b.sort;
                });
            }
            return containersData;
        };
        const getTitle = (elements, header, checkedID) => {
            if (!checkedID) {
                return header;
            }
            const checkedElement = elements.filter(item => item.id === checkedID)[0];
            return checkedElement.title;
        };
        const updateContainerID = (container, target) => {
            const { id } = target.dataset;
            container.dataset.checkedId = id;
        };
        const toggleElementClass = (element, className) => {
            if (!element) {
                return;
            }
            element.classList.toggle(className);
        };
        const toggleElementsClass = (elements, className) => {
            const elementsList = elements instanceof Array ? elements : [...elements];
            elementsList.forEach(element => {
                toggleElementClass(element, className);
            });
        };
        const updateContainerTitle = (titleElement, target) => {
            if (!titleElement) {
                return;
            }
            titleElement.innerHTML = target.innerText;
            toggleElementClass(titleElement, 'fade');
            setTimeout(() => {
                toggleElementClass(titleElement, 'fade');
            }, 800);
        };
        const getResponse = (uri, isPost = false, data) => __awaiter(void 0, void 0, void 0, function* () {
            const settings = {
                method: isPost ? 'POST' : 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            };
            const fetchResponse = yield fetch(uri, settings);
            return yield fetchResponse.json();
        });
        const getDataForResponse = (container) => {
            if (!calcElements) {
                return {};
            }
            const calcElementsData = [...calcElements];
            const slicedIndex = calcElementsData.indexOf(container) + 1;
            const containers = calcElementsData.slice(0, slicedIndex);
            return containers.reduce((acc, container) => {
                const { table, checkedId } = container.dataset;
                acc[table] = checkedId;
                return acc;
            }, {});
        };
        const updateContainers = (calcSettings) => __awaiter(void 0, void 0, void 0, function* () {
            const { isSuccess, data, msg } = yield getResponse(uri, true, calcSettings);
            if (!isSuccess) {
                render('error', msg);
                return;
            }
            const containersData = sortContainers(data);
            render('show-calc-containers', containersData);
        });
        const generateCalcCarcase = () => {
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
            <div id="calcContainer" class="calc-main-container"></div>
        `);
            document.body.appendChild(calcSection);
            calcContainer = document.getElementById('calcContainer');
        };
        const getLoaderHTML = () => {
            return `
            <style>
                .calc-loader {
                    display: none;
                    margin: 0 auto;
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
                .calc-box {
                    width: var(--size);
                    height: var(--size);
                    top: 0;
                    left: 0;
                    position: absolute;
                    -webkit-transform-style: preserve-3d;
                    transform-style: preserve-3d;
                }
                .calc-box:nth-child(1) {
                    -webkit-transform: translate(100%, 0);
                    transform: translate(100%, 0);
                    -webkit-animation: box1 var(--duration) linear infinite;
                    animation: box1 var(--duration) linear infinite;
                }
                .calc-box:nth-child(2) {
                    -webkit-transform: translate(0, 100%);
                    transform: translate(0, 100%);
                    -webkit-animation: box2 var(--duration) linear infinite;
                    animation: box2 var(--duration) linear infinite;
                }
                .calc-box:nth-child(3) {
                    -webkit-transform: translate(100%, 100%);
                    transform: translate(100%, 100%);
                    -webkit-animation: box3 var(--duration) linear infinite;
                    animation: box3 var(--duration) linear infinite;
                }
                .calc-box:nth-child(4) {
                    -webkit-transform: translate(200%, 0);
                    transform: translate(200%, 0);
                    -webkit-animation: box4 var(--duration) linear infinite;
                    animation: box4 var(--duration) linear infinite;
                }
                .calc-box > div {
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
                .calc-box > div:nth-child(1) {
                    --top: 0;
                    --left: 0;
                }
                .calc-box > div:nth-child(2) {
                    --background: #145af2;
                    --right: 0;
                    --rotateY: 90deg;
                }
                .calc-box > div:nth-child(3) {
                    --background: #447cf5;
                    --rotateX: -90deg;
                }
                .calc-box > div:nth-child(4) {
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
            <div class="calc-loader active" id="calcLoader">
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
        `;
        };
        const getErrorHTML = (msg) => {
            return `
          <style>
              .calc-error {
                  color: red;
              }
          </style>
          <p class="calc-error">${msg}</p>
      `;
        };
        const getElementsListHTML = (elementsData, checkedID) => {
            const preparedID = !checkedID ? null : +checkedID;
            const elementListHTML = elementsData.map(({ id, title }) => {
                const isChecked = preparedID && id === preparedID;
                const elemClass = !isChecked ? 'calc-elem__link' : 'calc-elem__link active';
                return `
              <li class="${elemClass}" data-id="${id}">${title}</li>
            `;
            });
            return elementListHTML.join('\n');
        };
        const getPriceContainer = (containerData) => {
            const { elements } = containerData;
            const isShowPrice = elements.length === 1;
            if (!isShowPrice) {
                return '';
            }
            const { title } = elements[0];
            return `
        <div class="calc-container">
          <div class="calc-price calc-price">
            <p class="calc-elem__title">Цена:</p>
            <p class="calc-elem__title">${title}</p>
          </div>
        </div>
      `;
        };
        const getContainerHTML = (containerData) => {
            const { table, title, id, checkedID, elements } = containerData;
            const elementsHTML = getElementsListHTML(elements, checkedID);
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
        const getContainersHTML = (containersData) => {
            const containersHtmlData = [];
            Object.values(containersData).forEach((containerData) => {
                const { header, type, elements, checkedID } = containerData;
                containerData.checkedID = !checkedID ? null : +checkedID;
                containerData.title = getTitle(elements, header, containerData.checkedID);
                const typeMapFn = {
                    'section': getContainerHTML,
                    'price': getPriceContainer
                };
                const containerHTML = typeMapFn[type](containerData);
                containersHtmlData.push(containerHTML);
            });
            return containersHtmlData.join('\n');
        };
        const closeIconClickHandler = (e) => {
            const currentTarget = e.currentTarget;
            if (!currentTarget) {
                return;
            }
            const container = currentTarget.closest('.calc-elem');
            if (!container) {
                toggleElementClass(currentTarget, 'active');
                return;
            }
            toggleElementsClass([container, currentTarget], 'active');
        };
        const closeIconHoverHandler = (e) => {
            const currentTarget = e.currentTarget;
            if (!currentTarget) {
                return;
            }
            const container = currentTarget.closest('.calc-elem');
            toggleElementClass(container, 'hover');
        };
        const listElementsClickHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
            const target = e.target;
            const currentTarget = e.currentTarget;
            const isListElement = target !== currentTarget;
            if (!target || !isListElement) {
                return;
            }
            const container = target.closest('.calc-elem');
            if (!container) {
                return;
            }
            const activeElement = container.querySelector('.calc-elem__link.active');
            const titleElement = container.querySelector('.calc-elem__title');
            if (activeElement) {
                toggleElementClass(activeElement, 'active');
            }
            if (titleElement) {
                updateContainerTitle(titleElement, target);
            }
            updateContainerID(container, target);
            toggleElementClass(target, 'active');
            toggleElementClass(container, 'active');
            const dataForResponse = getDataForResponse(container);
            yield updateContainers(dataForResponse);
        });
        const bindElementsHandlers = () => {
            if (closeIcons.length) {
                [...closeIcons].forEach(closeIcon => {
                    closeIcon.addEventListener('click', closeIconClickHandler);
                    closeIcon.addEventListener('mouseenter', closeIconHoverHandler);
                    closeIcon.addEventListener('mouseover', closeIconHoverHandler);
                });
            }
            if (listElements.length) {
                [...listElements].forEach(listElements => {
                    listElements.addEventListener('click', listElementsClickHandler);
                });
            }
        };
        const render = (state, data = null) => {
            const cb = () => {
                if (!calcContainer) {
                    return;
                }
                const htmlMapFn = {
                    'loader': getLoaderHTML,
                    'error': getErrorHTML,
                    'show-calc-containers': getContainersHTML,
                };
                const handlersMapFn = {
                    'show-calc-containers': bindElementsHandlers,
                };
                calcContainer.innerHTML = !data ? htmlMapFn[state]() : htmlMapFn[state](data);
                if (handlersMapFn[state]) {
                    handlersMapFn[state]();
                }
            };
            setTimeout(cb, 0);
        };
        generateCalcCarcase();
        render('loader');
        yield updateContainers(calcSettings);
    });
})(window);
