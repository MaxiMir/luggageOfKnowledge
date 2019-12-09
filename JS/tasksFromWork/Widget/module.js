;(document => {
    "use strict";


    /**
     * Вставляет в parentSelector верстку и стили виджета
     * @param parentSelector
     */
    const generateWidget = parentSelector => {
        parentSelector.insertAdjacentHTML(
            "beforeend",
            `
            <div class="ai-block">
                <div class="ai-block__container">
                    <div class="ai-wgt fl-column-center open">
                        <div class="ai-wgt__body mb-30">
                            <div class="ai-wgt__content">
                                <div class="ai-wgt__current-data">
                                    <div class="account">
                                        <div class="account__photo horizontal-center"></div>
                                        <div class="ai-title text-center mb-25">Наталия</div>
                                        <div class="account__pages fl-column-center">
                                            <div class="ai-wgt__link ai-wgt__link--big mb-20 bg--search">
                                                Поиск
                                            </div>
                                            <div class="ai-wgt__link ai-wgt__link--big mb-20 bg--progress">
                                                Мои достижения 
                                                <span>
                                                    <span class="user-progress">1</span class="progress">
                                                    /
                                                    <span class="all-progress">10</span>
                                                </span>
                                            </div>
                                            <div class="ai-wgt__link ai-wgt__link--big mb-20 bg--things">
                                                Мои вещи
                                                <span class="user-things-count">8</span>
                                            </div>
                                            <div class="ai-wgt__link ai-wgt__link--big mb-20 bg--bows">
                                                Луки звезд
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 <div class="ai-wgt__next-page circle"></div>
                                <div class="ai-wgt__purchases-count circle horizontal-center"></div>   
                            </div>                  
                        </div>
                        <div class="ai-wgt__footer">
                            <div class="ai-wgt__link ai-wgt__account">Мой аккаунт</div>
                        </div>
                    </div>
                    <div class="ai-status-btn circle" data-next-status="closed"></div>
                </div>
            </div>    
            <style>
                .ai-block {
                    width: 440px;
                    height: 590px;
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    z-index: 7777;
                }
                
                .ai-block__container {
                    height: 100%;
                    position: relative;
                }
                
                .ai-wgt {
                    padding-top: 60px;
                    height: 100%;
                    font-family: Open Sans;
                    font-style: normal;
                    font-weight: normal;
                }
                
                .ai-wgt__body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .ai-wgt__content {
                    width: 280px;
                    height: 420px;
                    background: #EEEEEE;
                    border-radius: 10px;
                    position: relative;
                }
                
                .ai-wgt__current-data > div {
                    display: none;
                }
                
                .ai-title {
                    margin-top: 75px;
                    font-size: 18px;
                    line-height: 25px;
                    font-weight: bold;
                }
                
                .ai-wgt__link {
                    width: 150px;
                    height: 40px;
                    background: #FFFFFF;
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
                    border-radius: 90px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                
                .ai-wgt__link--big {
                    -moz-box-sizing: border-box; 
                    box-sizing: border-box;
                    width: 240px;
                    display: flex;
                    justify-content: space-between;
                    padding-left: 45px;
                    padding-right: 25px;
                    font-size: 14px;
                    line-height: 19px;
                }
                
                .ai-wgt__footer {
                    width: 100%;
                    height: 110px;
                    display: flex;
                    justify-content: center;
                }
                
                .ai-status-btn {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: #FFFFFF;
                    
                    transition: all 0.5s ease-in-out;
                    animation-delay: 0.5s;
                }
                
                .ai-status-btn:after,
                .ai-status-btn:before {
                    width: 2px;
                    height: 29px;
                    position: absolute;
                    margin-left: auto;
                    margin-right: auto;
                    left: 0;
                    right: 0;
                    content: '';
                    background-color: #C4C4C4;
                    bottom: 18px;
                
                    transition: all 0.5s ease-in-out;
                    animation-delay: 1s;
                }
                
                .ai-status-btn:before {
                    transform: rotate(45deg);
                }
                
                .ai-status-btn:after {
                    transform: rotate(-45deg);
                }
                
                /* STATE => STATUS: OPEN */
                .ai-wgt.open {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(10px);
                    border-radius: 0 15px 0 0; 
                    animation: open-modal 0.5s cubic-bezier(1, 0.4, 0.27, 1.55);
                    transform-origin: bottom;
                }
                
                /* STATE => STATUS: CLOSED */
                .ai-wgt.closed .ai-wgt__body,
                .ai-wgt.closed .ai-wgt__account {
                    display: none;
                }
                
                .ai-wgt.closed + .ai-status-btn {
                    -o-transform: scaleX(-1);
                    -ms-transform: scaleX(-1);
                    -moz-transform: scaleX(-1);
                    -webkit-transform: scaleX(-1);
                    transform: scaleX(-1);
                }
                
                .ai-wgt.closed + .ai-status-btn:before {
                    transform: rotate(90deg);
                }
                
                .ai-wgt.closed + .ai-status-btn:after {
                    transform: rotate(0deg);
                }  
                
                /* STATE => PAGE CHANGED */
                .ai-wgt.account .account,
                .ai-wgt.clothes .clothes,
                .ai-wgt.questions .questions {
                    display: block;
                    height: 100%;
                }
                
                /* STATE => PAGE ACCOUNT */
                .account {
                    
                }
                
                .account__photo {
                    position: absolute;
                    top: -52px;
                    width: 94px;
                    height: 94px;
                    border-radius: 50%;
                    background-color: bisque;
                    border: 10px solid #ffff;
                }
                
                .account .ai-wgt__account,
                .account .ai-wgt__next-page,
                .account .ai-wgt__purchases-count {
                    display: none;
                }
              
               /* STATE => PAGE CLOTHES */
                .ai-wgt__purchases-count {
                    position: absolute;
                    bottom: -10px;
                    background-color: #ad998b;
                }
                
                .ai-wgt__next-page {
                    position: absolute;
                    bottom: 32px;
                    right: -32px;
                    background-color: darkgreen;
                }
       
                /* CLASS HELPERS */
                .circle {
                    width: 64px;
                    height: 64px;  
                    border-radius: 50%;
                    cursor: pointer;   
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
                }
                .text-center {
                    text-align: center;
                }
                
                .mb-20 {
                    margin-bottom: 20px;
                }
                
                .mb-25 {
                    margin-bottom: 25px;
                }
                
                .mb-30 {
                    margin-bottom: 30px;
                }
                
                .fl-column-center {
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: column;
                    align-items: center;
                }
                
                .horizontal-center {
                    margin-left: auto;
                    margin-right: auto;
                    left: 0;
                    right: 0;
                }
                              
                /* ANIMATIONS */
                @keyframes open-modal {
                    from {
                        -webkit-transform: scale(0);
                        transform: scale(0);
                    }
                    to {
                        -webkit-transform: scale(1);
                        transform: scale(1);
                    }
                }
            </style>
                `
        );
    };


    /**
     * Инициализация виджета
     */
    const initWidget = () => {
        let state = {
            page: "clothes",
            statusWidget: "open",
        };

        const parentSelector = document.body;


        /**
         * Проверяет есть ли измененения в state
         * @param newState
         * @returns {boolean}
         */
        const componentNeedUpdate = newState => {
            return JSON.stringify(state) !== JSON.stringify(newState);
        };


        /**
         * Обновление State (в случае изменений делает перендеринг):
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
         * Клик по кнопке открыть/закрыть модальное окно:
         * @param e
         */
        const statusBtnHandler = e => {
            const btn = e.currentTarget;
            const statusWidget = btn.dataset.nextStatus;
            setState({statusWidget});

            btn.dataset.nextStatus = statusWidget === "open" ? "closed" : "open";
        };


        /**
         * Показ информации по аккаунту
         */
        const showAccount = () => {
            setState({page: "account"});
        };


        generateWidget(parentSelector);

        const statusChangeBtn = parentSelector.querySelector(".ai-status-btn");
        const showAccountBtn = parentSelector.querySelector(".ai-wgt__account");

        // handlers:
        statusChangeBtn.addEventListener('click', statusBtnHandler);
        showAccountBtn.addEventListener('click', showAccount);
    };


    /**
     * Возвращает Promise с Json
     * @param url
     * @param data
     * @returns {Promise<any>}
     */
    const getResponseInJson = async (url, data = null) => {
        let fetchInit = {
            method: data ? "POST" : "GET",
        };

        if (data) {
            fetchInit = {
                ...fetchInit,
                ...{
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        }

        return fetch(url, fetchInit)
            .then(response => response.json());
    };


    /**
     * Рендеринг содержимого виджета
     * @param state
     * @param data
     */
    const render = (state, data = {}) => {
        const body = window.document.body;
        const container = body.querySelector(".ai-wgt");
        const widgetClasses = ["clothes", "questions", "account", "open", "closed", "loading"];

        container.classList.remove(...widgetClasses);
        container.classList.add(state.page, state.statusWidget);
    };


    // Дожидаемся полной загрузки и инициализируем виджет:
    document.readyState === 'complete' ?
        initWidget() :
        window.addEventListener('load', initWidget, false);

})(document);
