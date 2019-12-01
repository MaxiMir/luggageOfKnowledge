;(document => {
    "use strict";

    /**
     * Вставляет в placeToInsert верстку и стили виджета
     * @param placeToInsert
     */
    const generateWidget = placeToInsert => {
        const styles = `
                .art-widget {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 440px;
                    height: 590px;
                    z-index: 7777;
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(10px);
                    border-radius: 0 15px 0 0;
                    opacity: 0;
                    display: none;
                    -webkit-transition: opacity 1.6s;
                    animation: opacity 1.6;
                    display: flex;
                    flex-direction: column;
                    font-family: Open Sans;
                    font-style: normal;
                    font-weight: normal;
                }
                
                .art-widget.open {
                    opacity: 1;
                    display: block;
                }
                
                .art-widget__body {
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   height: 480px;
                }
                
                .art-widget__content {
                    width: 280px;
                    height: 420px;
                    background: #EEEEEE;   
                    border-radius: 10px;
                    position: relative;
                }
                
                .art-widget__next-step,
                .art-widget__purchases-count,
                .art-widget__close {
                    width: 64px;
                    height: 64px;
                    position: absolute;
                    background: #FFFFFF;
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
                    border-radius: 50%;
                    cursor: pointer;
                }
                
                .art-widget__purchases-count { 
                    bottom: -10px;
                    margin-left: auto;
                    margin-right: auto;
                    left: 0;
                    right: 0;
                    text-align: center;
                }
                
                .art-widget__next-step {
                    bottom: 32px;
                    right: -32px;
                }
                
                .art-widget__next-step:before {
                
                }
                
                .art-widget__footer {
                    position: relative;
                    height: 110px;
                    display: flex;
                    justify-content: center;
                }
                
                .art-widget__close {
                    bottom: 20px;
                    left: 20px;
                }
                
                .art-widget__close:after,
                .art-widget__close:before {
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
                }
                
                .art-widget__close:before {
                    transform: rotate(45deg);
                }
                
                .art-widget__close:after {
                    transform: rotate(-45deg);
                }
                
                .art-widget__account {
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
            `;

        placeToInsert.insertAdjacentHTML(
            "beforeend",
            `
                    <div class="art-widget open">
                        <div class="art-widget__body">
                            <div class="art-widget__content">
                                <div class="art-widget__current-data">
                                </div>
                                 <div class="art-widget__next-step"></div>
                                <div class="art-widget__purchases-count"></div>   
                            </div>                  
                        </div>
                        <div class="art-widget__footer">
                            <div class="art-widget__close"></div>
                            <div class="art-widget__account">Мой аккаунт</div>
                        </div>
                    </div>
                    <style>
                        ${styles}
                    </style>
                `
        );
    };


    /**
     * Инициализация виджета
     */
    const initWidget = () => {
        let state = {
            isOpen: true,
            step: "clothes"
        };
        const placeToInsert = document.body;


        /**
         * Обновление State
         * @param newState
         */
        const setState = (newState) => {
            state = {...state, ...newState}
        };


        /**
         * Открытие виджета
         */
        const openWidget = () => {
            setState({ isOpen: true });
            render(state);
        };


        /**
         * Закрытие виджета
         */
        const closeWidget = () => {
            setState({ isOpen: false });
            render(state);
        };


        /**
         * Показ информации по аккаунту
         */
        const showAccount = () => {
            setState({ step: "account" });
            render(state);
        };


        generateWidget(placeToInsert);

        const container = placeToInsert.querySelector(".art-widget");
        const closeBtn = container.querySelector(".art-widget__close");
        const showAccountBtn = container.querySelector(".art-widget__account");

        // handlers:
        closeBtn.addEventListener('click', closeWidget);
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

        const container = body.querySelector(".art-widget");

        if (state.isOpen && !container.classList.contains("open")) {
            container.classList.add("open");
        }

        if (!state.isOpen && container.classList.contains("open")) {
            container.classList.remove("open");
        }
    };


    // Дожидаемся полной загрузки и инициализируем виджет:
    document.readyState === 'complete' ?
        initWidget() :
        window.addEventListener('load', initWidget, false);

})(document);
