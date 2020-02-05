export default async (widgetSettings) => {
  let state;
  let container;
  let toggleVisibleBtn;
  let delayTimerID;
  
  const {
    key,
    category_id: categoryID,
    product_id: productID,
    addToBasketFn,
    likeFn,
    dislikeFn,
    myClothesFn,
    delay,
    apiBaseUri = 'https://testapi.garderobo.ai/api/v3/widget/',
    parentSelector = 'body'
  } = widgetSettings;
  
  
  // SETTINGS:
  
  /**
   * Проверка на корректность переданных настроек
   *
   * @param storeKey
   * @param checkedFunctions
   * @returns {[]}
   */
  const checkSettings = (storeKey, checkedFunctions) => {
    const errors = [];
    
    if (!storeKey) {
      errors.push('Не передан ключ магазина;');
    }
    
    Object.keys(checkedFunctions).forEach((fnName) => {
      if (checkedFunctions[fnName] && typeof checkedFunctions[fnName]
          !== 'function') {
        errors.push(`В ${fnName} передана не функция;`);
      }
    });
    
    return errors;
  };
  
  /**
   * Выводит ошибки в консоль
   *
   * @param settingsErrors
   */
  const showSettingsError = (settingsErrors) => {
    console.error('В виджет переданы некорректные настройки:');
    
    settingsErrors.forEach((error, index) => {
      console.error(`${index + 1}: ${error}`);
    });
  };
  
  // LOCAL STORAGE:
  
  /**
   * Возвращает из LocalStorage SessionKey
   *
   * @returns {string}
   */
  const getSessionKey = () => localStorage.getItem('_garderoboSessionKey');
  
  /**
   * Сохраняет в LocalStorage SessionKey
   *
   * @param sessionKey
   */
  const saveSessionKey = (sessionKey) => localStorage.setItem(
      '_garderoboSessionKey', sessionKey);
  
  /**
   * Проверяет прошел ли пользователь туториал
   *
   * @returns {boolean}
   */
  const checkOnTutorialIsDone = () => localStorage.getItem(
      '_garderoboAssistantTutorialDone',
  ) === '1';
  
  /**
   * Сохраняет в LocalStorage то, что пользователь прошел tutorial
   */
  const saveTutorialIsDone = () => localStorage.setItem(
      '_garderoboAssistantTutorialDone', '1',
  );
  
  // HELPERS:
  /**
   * Возвращает отформатированную цену
   *
   * @param price
   * @returns {string}
   */
  const formatPrice = price => Number((+ price).toFixed(1)).toLocaleString();
  
  // RESPONSES:
  
  /**
   * Посылает запрос на сервер
   *
   * @param uri
   * @param isGetRequest
   * @param sentData
   * @returns {Promise<any>}
   */
  const getResponseInJson = async (uri, isGetRequest = true, sentData = null) => {
    const {key, sessionKey} = settings;
    const fetchSettings = {
      method: isGetRequest ? 'GET' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': key,
      },
    };
    
    if (sentData) {
      fetchSettings.body = JSON.stringify(sentData);
    }
    
    if (uri !== settings.uriForRequest.authorization) {
      fetchSettings.headers['Authorization'] = `Bearer ${sessionKey}`;
    }
    
    const response = await fetch(uri, fetchSettings);
    return response.json();
  };
  
  /**
   * Отправляет данные пользователя на сервер
   *
   * @param userData
   */
  const sendUserData = (userData) => {
    const uri = settings.uriForRequest.feed;
    getResponseInJson(uri, false, userData);
  };
  
  /**
   * Посылает запрос на сервер для генерации SessionKey
   *
   * @returns {Promise<*>}
   */
  const createSessionKey = async () => {
    const uri = settings.uriForRequest.authorization;
    const {session} = await getResponseInJson(uri, false);
    
    return session;
  };
  
  /**
   * Вставляет в URI search params productID и categoryID
   *
   * @param uri
   * @returns {URL}
   */
  const getURIWithSearchParams = (uri) => {
    const url = new URL(uri);
    
    if (productID) {
      url.searchParams.append('product_id', productID);
    }
    
    if (categoryID) {
      url.searchParams.append('category_id', categoryID);
    }
    
    return url;
  };
  
  /**
   * Посылает запрос для получения данных о следующей странице (вопрос|одежда)
   *
   * @returns {Promise<{pageData: any, pageName: (string)}>}
   */
  const getFeedData = async () => {
    let pageName = "goodsOutOfStock";
    const uri = settings.uriForRequest.feed;
    const uriWithSearchParams = getURIWithSearchParams(uri);
    const pageData = await getResponseInJson(uriWithSearchParams);
    
    if (pageData.type === 1) {
      pageName = 'question';
    }
    
    if (pageData.type === 2) {
      pageName = 'choiceOfClothes';
    }
    
    return {pageName, pageData};
  };
  
  /**
   * Посылает запрос для определения нужно ли показывать виджет
   */
  const checkToShowWidget = async () => {
    const uri = settings.uriForRequest.checkState;
    const uriWithSearchParams = getURIWithSearchParams(uri);
    
    const {show} = await getResponseInJson(uriWithSearchParams);
    
    return show === 1;
  };
  
  // RENDERING:
  
  /**
   * Проверяет есть ли измененения в State
   *
   * @param oldState
   * @param newState
   * @returns {boolean}
   */
  const componentNeedUpdate = (oldState, newState) => {
    const oldStateStringify = JSON.stringify(oldState);
    const newStateStringify = JSON.stringify(newState);
    
    return oldStateStringify !== newStateStringify;
  };
  
  /**
   * Обновление State
   *
   * @param newState
   */
  const setState = (newState) => {
    const {current: currentState} = state;
    const newMergingState = {...currentState, ...newState};
    
    if (!componentNeedUpdate(currentState, newMergingState)) {
      return;
    }
    
    state.current = newMergingState;
    console.log(
        `%cCURRENT: PAGE NAME: "${state.current.pageName}" PAGE DATA: %o`,
        'color: green; font-size: small', state.current.pageData,
    );
  };
  
  /**
   * Привязывает обработчики событий к элементам
   *
   * @param elemHandlers
   */
  const initHandlers = (elemHandlers) => {
    if (!elemHandlers) {
      return;
    }
    
    Object.keys(elemHandlers).forEach((selector) => {
      const cb = elemHandlers[selector];
      const elements = container.querySelectorAll(selector);
      
      elements.forEach((element) => element.addEventListener('click', cb));
    });
  };
  
  /**
   * Рендеринг содержимого виджета
   *
   * @param html
   * @param handlers
   */
  const render = (html, handlers) => {
    const {isOpen} = state.current;
    const containerClassList = container.classList;
    const statusWidget = isOpen ? 'open' : 'closed';
    
    // устанавливаем классы:
    containerClassList.remove(...['open', 'closed']);
    containerClassList.add(statusWidget);
    
    // устанавливаем контент:
    container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', html);
    initHandlers(handlers);
  };
  
  // CHANGE STATE:
  
  /**
   * Открывает/закрывает модальное окно
   *
   * Если была установлена задержка перед показом виджета - убирает ее
   */
  const toggleWidgetVisibility = () => {
    const toggleBtnClassList = toggleVisibleBtn.classList;
    
    if (delayTimerID) {
      clearTimeout(delayTimerID);
    }
    
    if (toggleBtnClassList.contains('with-hint')) {
      toggleBtnClassList.remove('with-hint');
    }
    
    setState({isOpen: !state.current.isOpen});
  };
  
  /**
   * Показывает следующую страницу (вопрос|одежда)
   *
   * @returns {Promise<void>}
   */
  const switchToFeed = async () => {
    let pageData = state.next;
    state.next = null;
    
    if (!pageData) {
      pageData = await getFeedData();
    }
    
    setState(pageData);
  };
  
  /**
   * Показывает страницу "Приветствие":
   */
  const switchToGreeting = () => {
    setState({pageName: 'greeting'});
  };
  
  /**
   * Показывает страницу "Инструкция лайк/дизлайк"
   */
  const switchToDemoActions = () => {
    setState({pageName: 'demoActions'});
  };
  
  /**
   * Показывает страницу "Инструкция Мои вещи"
   */
  const switchToDemoClothes = () => {
    setState({pageName: 'demoClothes'});
  };
  
  /**
   * Показывает страницу "Аккаунт"
   *
   * @returns {Promise<void>}
   */
  const switchToAccount = async () => {
    const pageName = 'account';
    const uri = settings.uriForRequest[pageName];
    const pageData = await getResponseInJson(uri);
    
    await setState({pageName, pageData});
  };
  
  /**
   * Показывает страницу "Мои вещи"
   *
   * @returns {Promise<void>}
   */
  const switchToMyClothes = async () => {
    const pageName = 'myClothes';
    const uri = settings.uriForRequest[pageName];
    const pageData = await getResponseInJson(uri);
    
    await setState({pageName, pageData});
  };
  
  // HTML AND HANDLERS:
  
  /**
   * Вставляет скелет верстки со стилями и обработчиками в DOM
   */
  const generateWidgetCarcass = (parentSelector) => {
    const parentBlock = document.querySelector(parentSelector);
    
    if (!parentBlock) {
      console.error(`Элемент не найден ${parentSelector}`);
    }
    
    parentBlock.insertAdjacentHTML(
        'beforeend',
        `
					<style>
						.ai-block {
						    width: 440px;
						    height: 590px;
						    position: fixed;
						    left: 0;
						    bottom: 0;
						    z-index: 7777;
						    --white: #FFFFFF;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
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
						    width: 100%;
						}
						.ai-wgt__content {
						    width: 280px;
						    height: 420px;
						    border-radius: 10px;
						    position: relative;
						    box-sizing: border-box;
						    background-color: var(--white);
                box-shadow: 0px 14px 32px rgba(0, 0, 0, 0.24);
						}
						.ai-wgt__title {
						    font-size: 18px;
						    line-height: 25px;
						    font-weight: bold;
						    padding: 15px 0;
						}
						.ai-wgt__link {
						    width: 150px;
						    height: 40px;
						    background-color: var(--white);
						    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
						    border-radius: 90px;
						    display: flex;
						    justify-content: center;
						    align-items: center;
						    cursor: pointer;
						    transition: all 0.3s ease-out;
						}
						.ai-wgt__link:hover {
						    transform: scale(1.1);
						}
						.ai-wgt__link--big {
						    box-sizing: border-box;
						    width: 240px;
						    display: flex;
						    justify-content: space-between;
						    padding-left: 45px;
						    padding-right: 25px;
						    font-size: 14px;
						    line-height: 19px;
						}
						.ai-wgt__text {
						    font-size: 14px;
						    line-height: 19px;
						}
						.ai-wgt__next-page {
						    position: absolute;
						    top: 324px;
						    right: -25px;
						    background-color: var(--white);
						    background-image: url(${settings.bgImages.nextPage});
						}
						.ai-wgt__toggle-visible-btn {
						    position: absolute;
						    bottom: 20px;
						    left: 20px;
						    background: var(--white);
						    transition: all 0.3s ease-in-out;
						    animation-delay: 0.3s;
						    border: 1px solid #F8F8F8;
						}
						.ai-wgt__circle--with-plus:after,
						.ai-wgt__circle--with-plus:before {
						    width: 2px;
						    height: 29px;
						    position: absolute;
						    margin-left: auto;
						    margin-right: auto;
						    right: 31px;
						    content: '';
						    background-color: #C4C4C4;
						    bottom: 18px;
						    transition: all 0.3s ease-in-out;
						    animation-delay: 0.3s;
						}
						.ai-wgt__circle--with-plus:before {
						    transform: rotate(45deg);
						}
						.ai-wgt__circle--with-plus:after {
						    transform: rotate(-45deg);
						}
						.ai-wgt__circle--with-plus:hover .ai-wgt__circle--with-plus:after,
						.ai-wgt__circle--with-plus:hover .ai-wgt__circle--with-plus:before {
							margin-left: initial;
							margin-right: initial;
							right: 45px;
						}
						.ai-wgt__toggle-visible-title {
							display: none;
							transform: inherit;
							transition-delay: 1ms;
						}
						.ai-wgt__footer {
						    max-height: 110px;
                width: 100%;
                display: flex;
                justify-content: center;
						}
						/* STATE => STATUS: OPEN */
						.ai-wgt.open {
						    background: rgba(255, 255, 255, 0.6);
						    backdrop-filter: blur(10px);
						    border-radius: 0 15px 0 0;
						    animation: open-modal 0.6s;
						    transform-origin: bottom;
						}
						
						/* STATE => STATUS: CLOSED */
						.ai-wgt.closed .ai-wgt__body,
						.ai-wgt.closed .ai-wgt__my-clothes {
						    display: none;
						}
						.ai-wgt.closed + .ai-wgt__circle--with-plus {
						    transform: scaleX(-1);
						    animation: pulse infinite 1.5s;
						}
						.ai-wgt.closed + .ai-wgt__circle--with-plus:before {
						    transform: rotate(90deg);
						}
						.ai-wgt.closed + .ai-wgt__circle--with-plus:after {
						    transform: rotate(0deg);
						}
						.ai-wgt.closed + .ai-wgt__circle--with-plus.with-hint:hover {
							animation: none;
							width: 282px;
							border-radius: 40px;
						}
						.ai-wgt.closed + .ai-wgt__circle--with-plus.with-hint:hover .ai-wgt__toggle-visible-title {
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							animation:focus-in-expand 0.6s cubic-bezier(.25,.46,.45,.94) both;
						}
						
						/* CSS HELPERS */
						.ai-wgt__circle {
						    width: 64px;
						    height: 64px;
						    border-radius: 50%;
						    cursor: pointer;
						    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
						    background-repeat: no-repeat;
						    background-position: center;
						    transition: all 0.3s ease-out;
						}
						.ai-wgt__circle:hover {
						    transform: scale(1.1);
						}
						.text--big {
						    font-size: 16px;
						    line-height: 22px;
						}
						.text--center {
						    text-align: center;
						}
						.text--bold {
						    font-weight: 600;
            }
						.mb-15 {
						    margin-bottom: 15px;
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
						.mb-50 {
              margin-bottom: 50px;
            }
						.fl-center {
						    display: flex;
						    justify-content: center;
						    align-items: center;
						}
						.fl-column-center {
						    width: 100%;
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
						.bg {
						    background-repeat: no-repeat;
						}
						
						/* ANIMATIONS */
						@keyframes open-modal {
              from,
              60%,
              75%,
              90%,
              to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
              }
            
              0% {
                opacity: 0;
                -webkit-transform: translate3d(-3000px, 0, 0);
                transform: translate3d(-3000px, 0, 0);
              }
            
              60% {
                opacity: 1;
                -webkit-transform: translate3d(25px, 0, 0);
                transform: translate3d(25px, 0, 0);
              }
            
              75% {
                -webkit-transform: translate3d(-10px, 0, 0);
                transform: translate3d(-10px, 0, 0);
              }
              
              90% {
                -webkit-transform: translate3d(5px, 0, 0);
                transform: translate3d(5px, 0, 0);
              }
            
              to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
              }
            }
						@keyframes pulse {
						    0% {
						        -moz-transform: scale(0.9);
						        -ms-transform: scale(0.9);
						        -webkit-transform: scale(0.9);
						        transform: scale(0.9);
						    }
						    70% {
						        -moz-transform: scale(1);
						        -ms-transform: scale(1);
						        -webkit-transform: scale(1);
						        transform: scale(1);
						        box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
						    }
						    100% {
						        -moz-transform: scale(0.9);
						        -ms-transform: scale(0.9);
						        -webkit-transform: scale(0.9);
						        transform: scale(0.9);
						        box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
						    }
						}
						@keyframes focus-in-expand{
							0%{
								letter-spacing: -0.5em;
								-webkit-filter: blur(12px);
								filter: blur(12px);
								opacity: 0;
							}
							100%{
								-webkit-filter: blur(0);
								filter: blur(0);
								opacity: 1;
							}
						}
						
						/* MEDIA */
						@media (max-width: 575px) and (orientation: portrait) {
							.ai-block {
								width: 100vw;
								height: 100vh;
							}
							.ai-wgt {
								padding-top: 0;
								justify-content: center;
							}
							.ai-wgt__body {
								width: calc(100% - 75px);
								height: calc(100% - 65px);
							  max-height: 420px;
							}
							.ai-wgt__content {
							  width: 100%;
                height: 100%;
							}
							.ai-wgt__toggle-visible-btn {
								bottom: 10px;
								left: 10px;
							}
							.ai-wgt__circle {
							  width: 54px;
                height: 54px;
							}
							.ai-wgt__circle--with-plus:after,
							.ai-wgt__circle--with-plus:before {
                height: 27px;
                top: 13px;
                right: 0;
                left: 0;
							}
							.ai-wgt__next-page {
                right: -23px;
                background-size: 25px;
							}
							.mb-15, .mb-20, .mb-25, .mb-50 {
							  margin-bottom: 0.7rem;
							}
						}
						@media (max-height: 450px) and (max-width: 996px) {
							.ai-block {
								width: 100vw;
								height: 100vh;
							}
							.ai-wgt {
								padding: 0;
								display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
							}
							.ai-wgt__next-page {
								top: 70%;
								right: -23px;
                background-size: 25px;
							}
							.ai-wgt__block {
								width: 300px;
							}
							.ai-wgt__body {
								width: calc(100% - 100px);
								height: calc(100% - 80px);
								margin-bottom: 10px;
							}
							.ai-wgt__content {
							  width: 100%;
                height: 100%;
                max-width: 480px;
                max-height: 300px;
							}
							.ai-wgt__footer {
								max-height: 50px;
								align-items: center;
								height: 100%;
							}
							.ai-wgt__toggle-visible-btn {
								bottom: 10px;
								left: 10px;
							}
							.ai-wgt__circle {
							  width: 54px;
                height: 54px;
							}
							.ai-wgt__circle--with-plus:after,
							.ai-wgt__circle--with-plus:before {
                height: 27px;
                top: 13px;
                right: 0;
                left: 0;
							}
							.mb-15, .mb-20, .mb-25, .mb-50 {
							  margin-bottom: 0.7rem;
							}
						}
					</style>
					<div class="ai-block">
					   <div class="ai-block__container">
					       <div class="ai-wgt fl-column-center closed" id="aiWidget">
					           <div class="ai-wgt__body fl-center mb-30">
					               <div class="ai-wgt__content"></div>
					           </div>
					       </div>
					       <div class="ai-wgt__toggle-visible-btn ai-wgt__circle ai-wgt__circle--with-plus with-hint" id="aiWidgetToggleBtn">
					            <div class="ai-wgt__toggle-visible-title">Название виджета</div>
					       </div>
					   </div>
					</div>
          `,
    );
    
    container = document.getElementById('aiWidget');
    toggleVisibleBtn = document.getElementById('aiWidgetToggleBtn');
    
    toggleVisibleBtn.addEventListener('click', toggleWidgetVisibility);
  };
  
  /**
   * Возвращает HTML и обработчики для страницы "Приветствие"
   *
   * @returns {*}
   */
  const getGreetingData = () => {
    const html = `
				<div class="fl-column-center ai-wgt__text">
				<div class="bg bg--greeting mb-20"></div>
					<div class="text--center mb-25">
						Привет. Отличный выбор!
						Я — искусственный интеллект, призванный помочь в выборе одежды.
					</div>
					<div class="text--center mb-25">Мы будем задавать вам вопросы и предлагать вещи, попутно узнавая о ваших предпочтениях все больше и больше.</div>
					<div class="text--center mb-25">На вопросы нет неправильных ответов, поэтому не бойтесь отвечать как вам по душе.</div>
					<div class="ai-wgt__progress">
						<div class="ai-wgt__progress-line"></div>
						<div class="ai-wgt__progress-line"></div>
						<div class="ai-wgt__progress-line"></div>
					</div>
				</div>
				<div class="ai-wgt__next-page ai-wgt__circle"></div>
				<style>
					.ai-wgt__content {
						padding: 20px 25px;
					}
					.bg {
						height: 55px;
					}
					.bg--greeting {
						width: 55px;
						background-image: url(${settings.bgImages.greeting});
					}
					.ai-wgt__progress {
						width: 230px;
						display: flex;
						justify-content: space-between;
						position: absolute;
						bottom: 20px;
						margin: 0 auto;
					}
					.ai-wgt__progress-line {
						width: 70px;
						height: 2px;
						background: #DBDBDB;
						border-radius: 4px;
					}
					.ai-wgt__progress-line:first-child {
						background: #9ABD93;
					}
					@media (max-height: 450px) and (max-width: 996px) {
					  .ai-wgt .ai-wgt__body {
							height: calc(100% - 15px);
					  }
					  .ai-wgt .ai-wgt__content {
							max-width: 420px;
					  }
					}
				</style>
			`;
    
    return {
      html,
      handlers: {'.ai-wgt__next-page': switchToDemoActions},
    };
  };
  
  /**
   * Возвращает HTML и обработчики для страницы "Инструкция лайк/дизлайк"
   *
   * @returns {*}
   */
  const getDemoActionsData = () => {
    const html = `
				<div class="fl-column-center ai-wgt__text">
					<div class="ai-wgt__example-card bg bg--example mb-20">
						<div class="ai-wgt__dislike--medium ai-wgt__circle--medium"></div>
                  <div class="ai-wgt__like--medium ai-wgt__circle--medium"></div>
                  <div class="ai-wgt__purchases-count--medium ai-wgt__circle--medium"></div>
					</div>
					<div class="ai-wgt__block mb-15">
						<div class="ai-wgt__like--small ai-wgt__circle--small"></div>
						Отмечайте “сердечком” вещи, которые вам нравятся
					</div>
					<div class="ai-wgt__block mb-15">
						<div class="ai-wgt__dislike--small ai-wgt__circle--small"></div>
						Ставьте “палец вниз” вещам, которые вам не подходят
					</div>
					<div class="ai-wgt__block mb-15">
						<div class="ai-wgt__purchases-count--small ai-wgt__circle--small"></div>
						Добавляйте в корзину то, что планируете купить
					</div>
					<div class="ai-wgt__progress">
						<div class="ai-wgt__progress-line"></div>
						<div class="ai-wgt__progress-line"></div>
						<div class="ai-wgt__progress-line"></div>
					</div>
				</div>
				<div class="ai-wgt__next-page ai-wgt__circle"></div>
				<style>
					.ai-wgt .ai-wgt__content {
						padding: 20px 25px;
					}
					.bg {
						height: 45px;
					}
					.bg--example {
						width: 214px;
						height: 185px;
						background-image: url(${settings.bgImages.example});
						background-position: center;
					}
					.ai-wgt__example-card {
						position: relative;
						filter: blur(5px);
					}
					.ai-wgt__block {
						position: relative;
						padding-left: 35px;
						font-size: 12px;
						line-height: 16px;
					}
					.ai-wgt__circle--medium {
						width: 38px;
						height: 38px;
						background-size: 20px 19px;
						top: 0;
						bottom: 0;
						margin: auto;
						border-radius: 50%;
						background-repeat: no-repeat;
						background-position: center;
					}
					.ai-wgt__circle--small {
						position: absolute;
						width: 24px;
						height: 24px;
						top: 0;
						bottom: 0;
						left: 5px;
						margin: auto;
						border-radius: 50%;
						background-repeat: no-repeat;
						background-position: center;
					}
					.ai-wgt__like--medium {
						position: absolute;
						left: 5px;
						background-color: #E54243;
						background-image: url(${settings.bgImages.like});
					}
					.ai-wgt__like--small {
						background-size: 12px 12px;
						background-color: #E54243;
						background-image: url(${settings.bgImages.like});
					}
					.ai-wgt__dislike--medium {
						position: absolute;
						right: 5px;
						background-color: #252525;
						background-image: url(${settings.bgImages.dislike});
					}
					.ai-wgt__dislike--small {
						background-size: 12px 13px;
						background-color: #252525;
						background-image: url(${settings.bgImages.dislike});
					}
					.ai-wgt__purchases-count--medium {
						position: absolute;
						top: initial;
						left: 0;
						right: 0;
						bottom: -10px;
						background-color: var(--white);
						background-image: url(${settings.bgImages.purchases});
						background-size: 23px 33px;
					}
					.ai-wgt__purchases-count--small {
						background-size: 12px 15px;
						background-color: #3D4F63;
						background-image: url(${settings.bgImages.purchasesMini});
					}
					.ai-wgt__progress {
						width: 230px;
						display: flex;
						justify-content: space-between;
						position: absolute;
						bottom: 20px;
						margin: 0 auto;
					}
					.ai-wgt__progress-line {
						width: 70px;
						height: 2px;
						background: #DBDBDB;
						border-radius: 4px;
					}
					.ai-wgt__progress-line:nth-child(2) {
						background: #9ABD93;
					}
					@media (max-height: 450px) and (max-width: 996px) {
					  .ai-wgt .ai-wgt__body {
							height: calc(100% - 15px);
					  }
					  .ai-wgt .ai-wgt__content {
							max-width: 420px;
					  }
						.bg--example {
							width: 130px;
                     height: 151px;
						}
					}
			</style>
			`;
    
    return {
      html,
      handlers: {'.ai-wgt__next-page': switchToDemoClothes},
    };
  };
  
  /**
   * Возвращает HTML и обработчики для страницы "Инструкция Мои вещи"
   *
   * @returns {*}
   */
  const getDemoClothesData = () => {
    const html = `
				<div class="fl-column-center ai-wgt__text">
					<div class="bg bg--hanger mb-20"></div>
					<div class="text--center mb-25">Вы всегда можете просмотреть список понравившихся вещей, для этого нажмите кнопку</div>
					<div class="ai-wgt__link--example fl-center mb-30">Мои вещи</div>
					<div class="ai-wgt__call text--big">Ну что, начнем?</div>
					<div class="ai-wgt__progress">
						<div class="ai-wgt__progress-line"></div>
						<div class="ai-wgt__progress-line"></div>
						<div class="ai-wgt__progress-line"></div>
					</div>
				</div>
				<div class="ai-wgt__next-page ai-wgt__circle"></div>
				<style>
					.ai-wgt .ai-wgt__content {
						padding: 20px 25px;
					}
					.bg {
						height: 45px;
					}
					.bg--hanger {
						width: 55px;
						background-image: url(${settings.bgImages.hanger});
					}
					.ai-wgt__progress {
						width: 230px;
						display: flex;
						justify-content: space-between;
						position: absolute;
						bottom: 20px;
						margin: 0 auto;
					}
					.ai-wgt__progress-line {
						width: 70px;
						height: 2px;
						background: #DBDBDB;
						border-radius: 4px;
					}
					.ai-wgt__progress-line:last-child {
						background: #9ABD93;
					}
					.ai-wgt__link--example {
						width: 150px;
						height: 40px;
						background-color: var(--white);
						box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
						border-radius: 90px;
					}
					.ai-wgt__call {
						position: absolute;
						bottom: 53px;
						font-weight: 600;
					}
					@media (max-height: 450px) and (max-width: 996px) {
					  .ai-wgt .ai-wgt__body {
							height: calc(100% - 15px);
					  }
            .ai-wgt .ai-wgt__content {
							max-width: 420px;
					  }
						.ai-wgt__call {
							margin-top: initial;
						}
					}
				</style>
			`;
    
    const nextPageBtnHandler = async () => {
      saveTutorialIsDone();
      
      await switchToFeed();
    };
    
    return {
      html,
      handlers: {'.ai-wgt__next-page': nextPageBtnHandler},
    };
  };
  
  /**
   * Возвращает HTML и обработчики для страницы "Вопрос"
   *
   * @returns {*}
   */
  const getQuestionData = () => {
    const {text, type, id} = state.current.pageData;
    const html = `
            <div class="fl-column-center ai-wgt__text">
              <div class="ai-wgt__header text--big text--center">Пожалуйста,</div>
              <div class="ai-wgt__header text--big text--center mb-15">ответьте на вопрос</div>
              <div class="text--big text--center mb-25">${text}</div>
              <div class="ai-wgt__answers fl-column-center">
                <div class="ai-wgt__answer ai-wgt__link mb-15" data-action="4">Соглашусь</div>
                <div class="ai-wgt__answer ai-wgt__link mb-15" data-action="1">Не про меня</div>
                <div class="ai-wgt__answer ai-wgt__link mb-15" data-action="2">Не знаю</div>
              </div>
            </div>
            <div class="ai-wgt__next-page ai-wgt__circle ai-wgt__circle--mini" data-action="0"></div>
          </div>
        </div>
        <div class="ai-wgt__footer">
          <div class="ai-wgt__link ai-wgt__my-clothes">Мои вещи</div>
        </div>
        <style>
          .ai-wgt__header {
            font-weight: bold;
            color: #000000;
          }
          .ai-wgt .ai-wgt__content {
            padding: 20px 25px;
          }
          .bg {
            height: 45px;
          }
          .bg--hanger {
            width: 55px;
            background-image: url(${settings.bgImages.hanger});
          }
          .ai-wgt__answer:hover {
            background: #74A858;
            color: var(--white);
          }
          .ai-wgt .ai-wgt__link:hover {
              transform: unset;
          }
          .ai-wgt .ai-wgt__next-page {
            position: absolute;
            bottom: 42px;
            right: -22px;
            background-color: var(--white);
            background-image: url(${settings.bgImages.nextPageDisabled});
          }
          .ai-wgt .ai-wgt__circle--mini {
            width: 44px;
            height: 44px;
          }
          .ai-wgt__answers {
            width: 100%;
          }
          @media (max-height: 450px) and (max-width: 996px) {
            .ai-wgt .ai-wgt__answers {
              flex-direction: row;
              justify-content: space-evenly;
            }
            .ai-wgt__answers .ai-wgt__answer {
              width: 100px;
            }
            .ai-wgt__call {
              margin-top: initial;
            }
            .ai-wgt__footer {
              align-items: center;
            }
          }
        </style>
			`;
    
    const answerBtnHandler = ({currentTarget}) => {
      const {action} = currentTarget.dataset;
      const postData = {id, type, action};
      
      sendUserData(postData);
      switchToFeed();
    };
    
    const myClothesBtnHandler = async () => {
      if (myClothesFn) {
        myClothesFn();
      }
      
      await switchToMyClothes();
    };
    
    return {
      html,
      handlers: {
        '.ai-wgt__next-page': answerBtnHandler,
        '.ai-wgt__answer': answerBtnHandler,
        '.ai-wgt__my-clothes': myClothesBtnHandler,
      },
    };
  };
  
  /**
   * HTML и обработчики для страницы "Выбор одежды"
   *
   * @returns {*}
   */
  const getChoiceOfClothesData = () => {
    const { type, id, img_src: imgSrc, price, url } = state.current.pageData;
    const formattedPrice = !price ? null : formatPrice(price);
    
    const html = `
                ${!formattedPrice ? '' : `<div class="ai-wgt__price text--big fl-center">${formattedPrice}&#8381;</div>`}
                <div class="ai-wgt__dislike ai-wgt__circle"></div>
                <div class="ai-wgt__like ai-wgt__circle"></div>
                <div class="stage">
                <div class="ai-wgt__purchases-count ai-wgt__circle horizontal-center" style="display: none"></div>
              </div>
            </div>
          </div>
          <div class="ai-wgt__footer">
            <div class="ai-wgt__link ai-wgt__my-clothes">Мои вещи</div>
          </div>
          <style>
            .ai-wgt__content {
                background-image:url(${imgSrc});
                background-size: cover;
                background-repeat: no-repeat;
                cursor: pointer;
                animation: fade-in 0.3s ease-out both;
            }
            
            .ai-wgt__price {
                position: absolute;
                top: -20px;
                right: -30px;
                width: 96px;
                height: 40px;
                color: #3D4F63;
                background: var(--white);
                box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
                border-radius: 90px;
            }
            .ai-wgt__like {
                position: absolute;
                top: 250px;
                right: -32px;
                background-color: #E54243;
                background-image:url(${settings.bgImages.like});
                background-size: 33px 30px;
            }
            .ai-wgt__dislike {
                position: absolute;
                top: 250px;
                left: -30px;
                background-color: #252525;
                background-image:url(${settings.bgImages.dislike});
                background-size: 33px 30px;
            }
            .ai-wgt__purchases-count {
                position: absolute;
                bottom: -5px;
                background-color: var(--white);
                background-image:url(${settings.bgImages.purchases});
                background-size: 33px 41px;
            }
            
            @keyframes fade-in {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            @keyframes fade-out {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
            
            @media (max-width: 575px) and (orientation: portrait) {
              .ai-wgt__like {
                right: -25px;
              }
              .ai-wgt__dislike {
                left: -25px;
              }
            }
            @media (max-height: 450px) and (max-width: 996px) {
              .ai-wgt__body {
                margin-top: 20px;
              }
              .ai-wgt .ai-wgt__content {
                 width: 200px;
                 height: 250px;
                 min-height: 250px;
                 background-size: cover;
                 background-repeat: no-repeat;
                 background-position: center;
              }
              .ai-wgt__price {
                 top: -12px;
                 height: 25px;
              }
              .ai-wgt .ai-wgt__circle {
                  width: 45px;
                  height: 45px;
              }
              .ai-wgt__like,
              .ai-wgt__dislike {
                top: 150px;
                background-size: 21px 20px;
              }
              .ai-wgt__dislike {
                left: -10px;
              }
              .ai-wgt__purchases-count {
                background-size: 20px 24px;
              }
              .ai-wgt__like {
                right: -10px;
              }
              .horizontal-center {
                 bottom: 5px;
              }
            }
          </style>
         `;
    
    const userActionHandler = (action) => {
      const postData = {type, id, action};
      const contentBlock = container.querySelector('.ai-wgt__content');
      const blockClassList = contentBlock.classList;
      
      if (!blockClassList.contains('ai-wgt__content--changed')) {
        blockClassList.add('ai-wgt__content--changed');
      }
      
      sendUserData(postData);
      switchToFeed();
    };
    
    const bodyLinkHandler = ({currentTarget, target}) => {
      const isBodyClick = Object.is(currentTarget, target);
      const isPriceClick = target.classList.contains("ai-wgt__price");
      
      if (!url) {
        return;
      }
      
      if (isPriceClick || isBodyClick) {
        window.open(url, '_blank');
      }
    };
    
    const myClothesBtnHandler = async () => {
      if (myClothesFn) {
        myClothesFn();
      }
      
      await switchToMyClothes();
    };
    
    const likeBtnHandler = () => {
      const userSelected = likeBtnHandler.clicked || likeBtnHandler.clicked;
      
      if (userSelected) {
        return false;
      }
      
      if (likeFn) {
        likeFn(id);
      }
  
      likeBtnHandler.clicked = true;
      userActionHandler(1);
    };
    
    const dislikeBtnHandler = () => {
      const userSelected = likeBtnHandler.clicked || likeBtnHandler.clicked;
  
      if (userSelected) {
        return false;
      }
      
      if (dislikeFn) {
        dislikeFn(id);
      }
  
      dislikeBtnHandler.clicked = true;
      userActionHandler(2);
    };
    
    const purchasesBtnHandler = () => {
      if (addToBasketFn) {
        addToBasketFn(id);
      }
      
      userActionHandler(3);
    };
    
    const handlers = {
      '.ai-wgt__content': bodyLinkHandler,
      '.ai-wgt__like': likeBtnHandler,
      '.ai-wgt__dislike': dislikeBtnHandler,
      '.ai-wgt__purchases-count': purchasesBtnHandler,
      '.ai-wgt__my-clothes': myClothesBtnHandler,
    };
    
    return { html, handlers };
  };
  
  /**
   * HTML и обработчики для страницы "Товары закончились"
   *
   * @returns {*}
   */
  const getGoodOutOfStock = () => {
    const html = `
                  <div class="fl-column-center ai-wgt__text">
                      <div class="bg bg--no-prod mb-15"></div>
                      <div class="text--center mb-15">В этой категории закончились товары, которые могли бы быть вам интересны.</div>
                      <div class="text--bold text--big mb-15">Не беда!</div>
                      <div class="text--center mb-50">Перейдите в другую категорию сайта или посмотрите еще раз на “Мои вещи” – там есть все товары, которые вам понравились.</div>
                      <div class="text--bold text--center">А еще вы можете оформить заказ на сайте прямо сейчас!</div>
                  </div>
              </div>
            </div>
            <div class="ai-wgt__footer">
              <div class="ai-wgt__link ai-wgt__my-clothes">Мои вещи</div>
            </div>
          </div>
          <style>
            .bg {
              height: 44px;
            }
            .bg--no-prod {
              width: 44px;
              background-image: url(${settings.bgImages.noProd});
            }
            .ai-wgt .ai-wgt__content {
              padding: 40px 25px 48px 25px;
              background-color: #FFF857;
            }
            @media (max-height: 450px) and (max-width: 996px) {
              .ai-wgt .ai-wgt__content {
                padding: 15px;
              }
            }
          </style>
        `;
    
    const myClothesBtnHandler = () => {
      if (myClothesFn) {
        myClothesFn();
      }
      
      switchToMyClothes();
    };
    
    const handlers = {
      '.ai-wgt__my-clothes': myClothesBtnHandler,
    };
    
    return { html, handlers };
  };
  
  /**
   * HTML и обработчики для страницы "Аккаунт"
   */
  const getAccountData = () => {
    const { userName, userProgress, userThingsCount, accountPhoto } = state.current.pageData;
    
    const html = `
					<div class="ai-wgt__account-photo horizontal-center"></div>
					<div class="ai-wgt__title text--center mb-25">${userName}</div>
					<div class="account__pages fl-column-center">
					<div class="ai-wgt__link ai-wgt__link--big mb-20 bg bg--search">
					   Поиск
					</div>
					<div class="ai-wgt__link ai-wgt__link--big mb-20 bg bg--progress">
					   Мои достижения
					   <span>
					       <span class="user-progress">${userProgress}</span class="progress">
					       /
					       <span class="all-progress">10</span>
					   </span>
					</div>
					<div class="ai-wgt__link ai-wgt__link--big mb-20 bg bg--things">
					   Мои вещи
					   <span class="user-things-count">${userThingsCount}</span>
					</div>
					<div class="ai-wgt__link ai-wgt__link--big mb-20 bg bg--bows">
					   Луки звезд
					</div>
				</div>
          <style>
            .ai-wgt__title {
              margin-top: 75px;
            }
            .ai-wgt__content {
                background-color: #EEEEEE;
            }
            .ai-wgt__account-photo {
                position: absolute;
                top: -52px;
                width: 94px;
                height: 94px;
                border-radius: 50%;
                background-color: bisque;
                border: 10px solid var(--white);
                background-size: contain;
                background-image: url(${accountPhoto});
            }
            .bg {
                background-size: 12px 12px;
                background-position: 15px center;
            }
            .bg--search {
                background-image: url(${settings.bgImages.search});
            }
            .bg--progress {
                background-image: url(${settings.bgImages.progress});
            }
            .bg--things {
                background-image: url(${settings.bgImages.things});
            }
            .bg--bows {
                background-image: url(${settings.bgImages.bows});
            }
            @media (max-height: 450px) and (max-width: 996px) {
              .ai-wgt .ai-wgt__title {
                 margin-top: 55px;
                 margin-bottom: 15px;
              }
              .ai-wgt__account-photo {
                top: -30px;
                       width: 60px;
                       height: 60px;
              }
              .ai-wgt .ai-wgt__link {
                margin-bottom: 10px;
              }
            }
          </style>
        `;
    
    return { html };
  };
  
  /**
   * HTML и обработчики для страницы "Мои вещи"
   */
  const getMyClothesData = () => {
    let productsHTML = `
        <div class="mb-20">
            <div class="bg bg--hanger"></div>
        </div>
        <p class='ai-wgt__text text--center mb-20'>
        Вещи, которые вы отметите «сердечком», появятся тут.
        </p>
        <p class='ai-wgt__text text--center mb-20'>
        Для этого нажмите кнопку “Искать еще” и наш ассистент подберет одежду или аксессуары <b>специально для вас</b>.
        </p>
        <p class='ai-wgt__text text--center'>
        Вы обязательно найдете что-нибудь себе по душе!
        </p>
    `;
    const { products } = state.current.pageData;
    
    if (products.length) {
      const productsHTMLData = products.map(product => {
        const { name, img_src: imgSrc, price, old_price: oldPrice, url } = product;
        return `
            <div class="product">
                <a href='${url}' target='_blank' class="product__image" style="background-image: url('${imgSrc}')"></a>
                <div class="product__description">
                    <a href='${url}' target='_blank' class="ai-wgt__text">${name}</a>
                    ${!oldPrice ? '' : `<div class='product__old-price'>${oldPrice} руб.</div>`}
                    <div class="ai-wgt__text product__price">${price} руб.</div>
                </div>
            </div>
        `;
      });
      productsHTML = productsHTMLData.join('\n');
    }
    
    const html = `
          <p class="ai-wgt__title text--center mb-10">Мои вещи</p>
          <div class="products">
              ${productsHTML}
          </div>
        </div>
        </div>
        <div class="ai-wgt__footer">
          <div class="ai-wgt__link ai-wgt__my-clothes">Искать еще</div>
        </div>
        <style>
          .bg {
            height: 45px;
            margin: 0 auto;
          }
          .bg--hanger {
            width: 55px;
            background-image: url(${settings.bgImages.hanger});
          }
          .ai-wgt__content {
            padding: 10px 25px;
          }
          .ai-wgt ::-webkit-scrollbar {
            width: 2px;
          }
          .ai-wgt {
            scrollbar-width: thin;
            scrollbar-color: #90A4AE #CFD8DC;
          }
          .ai-wgt ::-webkit-scrollbar-track {
            background: var(--white);
          }
          .ai-wgt ::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
          }
          .products {
            height: 338px;
            overflow-y: scroll;
            margin: 0 auto;
          }
          .product {
            display: flex;
            width: 100%;
            margin-bottom: 6px;
          }
          .product__image {
            width: 80px;
            height: 80px;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .product__description {
            width: 140px;
            padding-left: 20px;
          }
          .product__old-price {
            font-size: 10px;
            line-height: 14px;
            text-decoration-line: line-through;
          }
          @media (max-height: 450px) and (max-width: 996px) {
            .products {
              height: calc(100% - 90px);
            }
            .ai-wgt__footer {
              align-items: center;
            }
          }
        </style>
      `;
    
    const handlers = {
      '.ai-wgt__my-clothes': switchToFeed
    };
    
    return { html, handlers };
  };
  
  /**
   * Возвращает HTML и обработчики для выбранной страницы
   * @param pageName
   * @returns {*}
   */
  function getPageData(pageName) {
    const wrapStart = `
				<div class="ai-wgt__body fl-center mb-30">
					<div class="ai-wgt__content">
			`;
    const wrapEnd = `
				</div>
			`;
    
    const pageContentFnMap = {
      greeting: getGreetingData,
      demoActions: getDemoActionsData,
      demoClothes: getDemoClothesData,
      account: getAccountData,
      choiceOfClothes: getChoiceOfClothesData,
      goodsOutOfStock:getGoodOutOfStock,
      question: getQuestionData,
      myClothes: getMyClothesData,
    };
    
    const {html, handlers} = pageContentFnMap[pageName]();
    const htmlWithWrapper = `${wrapStart}${html}${wrapEnd}`;
    
    return {
      html: htmlWithWrapper,
      handlers,
    };
  }
  
  /**
   * Инициализация state и обработчиков
   */
  const initState = () => {
    const initialState = {
      current: {isOpen: false},
    };
    
    const handler = {
      set(target, prop, value) {
        const pagesWithNextState = ['question', 'choiceOfClothes'];
        const stateChanged = prop === 'current';
        
        target[prop] = value;
  
        if (!stateChanged) {
          return true;
        }
        
        const {pageName} = value;
        const isPageWithNextState = pagesWithNextState.includes(pageName);
        const isMissingNextState = !target.next;
        const {html, handlers} = getPageData(pageName);
        
        setTimeout(() => render(html, handlers), 0);
        
        if (isPageWithNextState && isMissingNextState) {
          setTimeout(async () => {
            target.next = await getFeedData();
            
            console.log(
                `%cNEXT STATE: %o`,
                'color: orange; font-size: small', target.next,
            );
            
            const isProduct = target.next.pageData.type === 2;
            
            if (isProduct) {
              preloadImage();
            }
          }, 0);
        }
        
        return true;
      },
    };
    
    return new Proxy(initialState, handler);
  };
  
  /**
   * Вставляет в DOM скрытую картинку
   */
  const preloadImage = () => {
    const imgSrc = state.next.pageData['img_src'];
    const image = `<img src="${imgSrc}" alt='' style='opacity: 0; height: 0;'>`;
    
    container.insertAdjacentHTML('beforeend', image);
  };
  
  
  
  const checkedFunctions = {addToBasketFn, likeFn, dislikeFn, myClothesFn};
  
  // Проверка настроек для виджета:
  const settingsErrors = checkSettings(key, checkedFunctions);
  
  if (settingsErrors.length) {
    showSettingsError(settingsErrors);
    return;
  }
  
  const settings = {
    key,
    categoryID,
    productID,
    delay,
    uriForRequest: {
      authorization: `${apiBaseUri}start_session/`,
      checkState: `${apiBaseUri}assistant/check_state/`,
      feed: `${apiBaseUri}assistant/feed/`,
      myClothes: `${apiBaseUri}assistant/feed_history/`,
    },
    bgImages: {
      like: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMyAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzMgOC43NzU0OVYxMS41MjYzQzMyLjk2NyAxMS41OTUxIDMyLjk2NyAxMS42NjM5IDMyLjkzNCAxMS42OTgzQzMyLjgwMTkgMTIuNzk4NiAzMi41MDQ4IDEzLjg2NDYgMzIuMDQyNyAxNC44NjE3QzMxLjAxOTQgMTcuMDI4IDI5LjY2NTkgMTkuMDIyNCAyOC4wNDg0IDIwLjcwNzNDMjQuNzE0MyAyNC4zODY2IDIwLjg1MjEgMjcuMzA5MyAxNi43NTg4IDI5LjkyMjZDMTYuNjI2NyAzMC4wMjU4IDE2LjM5NTYgMzAuMDI1OCAxNi4yNjM2IDI5LjkyMjZDMTIuOTYyNSAyNy44NTk1IDkuODU5NTQgMjUuNDg2OSA3LjAyMDYyIDIyLjgzOTJDNC45NzM5NiAyMC45NDggMy4xOTEzOSAxOC43ODE3IDEuNzM4OTIgMTYuMzc0N0MwLjEyMTM5NyAxMy43MjcgLTAuNDA2NzczIDEwLjQ2MDQgMC4zMTk0NjEgNy40MDAwN0MxLjgwNDk0IDAuNDg4NTY1IDEwLjA5MDYgLTIuMzY1NDQgMTUuMjczMyAyLjI3NjYyQzE1LjcwMjQgMi42NTQ4NiAxNi4wOTg2IDMuMTM2MjYgMTYuNTYwNyAzLjU4MzI3QzE2LjU5MzcgMy41NDg4OCAxNi42MjY3IDMuNDgwMTEgMTYuNjU5NyAzLjQ0NTczQzE4Ljk3MDUgMC43NjM2NSAyMS44NDI0IC0wLjQzOTg0NSAyNS4yNDI1IDAuMTQ0NzFDMjguOTcyNyAwLjgzMjQyMSAzMS40MTU1IDMuMTM2MjYgMzIuNjAzOSA2Ljg4NDI5QzMyLjc2ODkgNy41Mzc2MSAzMi45MDEgOC4xNTY1NSAzMyA4Ljc3NTQ5WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
      dislike: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzNiAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxNS4yMTI4QzAgMTYuMDc0OCAwLjcwOTg1OSAxNi43MzQgMS41MjExMyAxNi43MzRIOS45MzgwM0MxMC4zOTQ0IDE2LjczNCAxMC44NTA3IDE2LjUzMTEgMTEuMTA0MiAxNi4xNzYyQzExLjM1NzcgMTUuOTIyNyAxMS40NTkyIDE1LjU2NzggMTEuNDU5MiAxNS4xNjIxVjIuMjMyNTVDMTEuNDU5MiAyLjA4MDQ0IDExLjQ1OTIgMS45MjgzMyAxMS40MDg1IDEuNzc2MjFDMTEuMjU2MyAxLjE2Nzc2IDEwLjY0NzkgMC43MTE0MjYgOS45MzgwMyAwLjcxMTQyNkgxLjU3MTgzQzAuNzA5ODU5IDAuNzExNDI2IDAgMS40MjEyOSAwIDIuMjMyNTVWMTUuMjEyOFoiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTM0LjYzMTEgMTUuMjYzNUMzNS40OTMxIDE0Ljg1NzkgMzYuMDAwMSAxMy45NDUyIDM2LjAwMDEgMTMuMDMyNUMzNi4wMDAxIDEyLjM3MzQgMzUuNzQ2NiAxMS43NjQ5IDM1LjI5MDIgMTEuMjU3OUMzNS4wMzY3IDExLjAwNDMgMzQuNzMyNSAxMC44MDE1IDM0LjM3NzYgMTAuNjQ5NEMzNC4yMjU1IDEwLjU5ODcgMzQuMTI0IDEwLjQ0NjYgMzQuMDczMyAxMC4yOTQ1QzM0LjAyMjYgMTAuMTQyNCAzNC4wNzMzIDkuOTM5NTUgMzQuMTc0OCA5LjgzODE0QzM0LjUyOTcgOS4zODE4IDM0Ljc4MzIgOC44MjQwNiAzNC43ODMyIDguMjE1NjFDMzQuNzgzMiA3LjU1NjQ1IDM0LjUyOTcgNi45NDggMzQuMDczMyA2LjQ0MDk2QzMzLjYxNyA1Ljk4NDYyIDMyLjk1NzggNS42ODA0IDMyLjI5ODcgNS42ODA0SDMyLjI0OEMzMi4wNDUyIDUuNjgwNCAzMS44OTMxIDUuNTc4OTkgMzEuNzkxNyA1LjM3NjE3QzMxLjY5MDIgNS4xNzMzNSAzMS43NDA5IDQuOTcwNTQgMzEuODQyNCA0LjgxODQyQzMyLjE5NzMgNC4zNjIwOSAzMi40MDAxIDMuODU1MDQgMzIuNDAwMSAzLjI5NzNDMzIuNDAwMSAyLjYzODE0IDMyLjE0NjYgMi4wMjk2OSAzMS42OTAyIDEuNTIyNjVDMzEuMjMzOSAxLjA2NjMxIDMwLjU3NDcgMC43NjIwODUgMjkuOTE1NiAwLjc2MjA4NUgxNC43NTVDMTMuODkzMSAwLjc2MjA4NSAxMy4wODE4IDEuMTE3MDEgMTIuNDczMyAxLjY3NDc2QzEyLjQ3MzMgMS44MjY4NyAxMi41MjQgMS45MjgyOCAxMi41MjQgMi4wODA0VjE1LjAxQzEyLjUyNCAxNS41MTcgMTIuMzcxOSAxNS45NzM0IDEyLjExODQgMTYuMzc5QzEyLjM3MTkgMTYuODg2IDEyLjcyNjkgMTcuNDk0NSAxMy4yMzM5IDE4LjIwNDNMMTguNTA3MSAyNS4zNTM2QzE4LjY1OTMgMjUuNjA3MiAxOC43NjA3IDI1LjkxMTQgMTguNzYwNyAyNi4yMTU2VjMwLjc3OUMxOC43NjA3IDMxLjU5MDMgMTkuNDE5OCAzMi4zMDAxIDIwLjI4MTggMzIuMzAwMUMyMi4xNTc4IDMyLjMwMDEgMjMuNzI5NyAzMC43NzkgMjMuNzI5NyAyOC44NTIyVjIxLjI0NjZDMjMuNzI5NyAyMC45NDI0IDIzLjk4MzIgMjAuNzM5NiAyNC4yMzY3IDIwLjczOTZIMzMuNTE1NkMzNC44ODQ2IDIwLjczOTYgMzYuMDAwMSAxOS42MjQxIDM2LjAwMDEgMTguMjU1QzM2LjAwMDEgMTcuNTk1OSAzNS43NDY2IDE2LjkzNjcgMzUuMjkwMiAxNi40ODA0QzM1LjA4NzQgMTYuMjc3NiAzNC44ODQ2IDE2LjEyNTUgMzQuNjgxOCAxNi4wMjQxQzM0LjQ3OSAxNS45MjI3IDM0LjM3NzYgMTUuNzcwNSAzNC4zNzc2IDE1LjU2NzdDMzQuMzI2OSAxNS41MTcgMzQuNDI4MyAxNS4zMTQyIDM0LjYzMTEgMTUuMjYzNVoiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
      purchases: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzNCA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNzk1MjEgMTFDMy4zOTg5NyAxMS4wMzk2IDMuMTIxNjEgMTEuMzU2NiAzLjA4MTk4IDExLjcxMzJMMC44NzI0ODUgNDAuMjA0NEMwLjgzMjg2MSA0MC42NDAzIDEuMTQ5ODUgNDEuMDM2NSAxLjU4NTcxIDQxLjA3NjJDMS42MjUzMyA0MS4wNzYyIDEuNjI1MzMgNDEuMDc2MiAxLjY2NDk1IDQxLjA3NjJIMzIuNzI5N0MzMy4xNjU2IDQxLjA3NjIgMzMuNTIyMiA0MC43MTk2IDMzLjUyMjIgNDAuMjgzN0MzMy41MjIyIDQwLjI0NDEgMzMuNTIyMiA0MC4yNDQgMzMuNTIyMiA0MC4yMDQ0TDMxLjM1MjMgMTEuNzEzMkMzMS4zMTI3IDExLjMxNyAzMC45NTYxIDExIDMwLjU1OTkgMTFIMy44MzQ4M0gzLjc5NTIxWiIgZmlsbD0iIzNENEY2MyIvPjxwYXRoIGQ9Ik05IDlDOSA0LjU4MTcyIDEyLjU4MTcgMSAxNyAxQzIxLjQxODMgMSAyNSA0LjU4MTcyIDI1IDlWMTNIOVY5WiIgc3Ryb2tlPSIjM0Q0RjYzIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTIuMTkzOCAyNS4xOTM4TDE2Ljk5OTkgMjkuOTk5OUwyMS44MDU5IDI1LjE5MzgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xNyAyOVYxOSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
      purchasesMini: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTYuOTk5NjkgMEM1LjEzNTczIDAgMy42MjQ2OSAxLjUxMTA0IDMuNjI0NjkgMy4zNzVWNS4yNUgxMC4zNzQ3VjMuMzc1QzEwLjM3NDcgMS41MTEwNCA4Ljg2MzY1IDAgNi45OTk2OSAwWk01LjQ5OTY5IDMuNUM1LjcxNTEyIDIuNTcxMDkgNS45OTk2OSAyIDYuOTk5NjkgMkM3Ljk5OTY5IDIgOC4zMTQ4NCAyLjUwOTQ0IDguNDk5NjkgMy41SDUuNDk5NjlaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMS43ODA1IDQuMzkyNDZDMS43OTUzNiA0LjI1ODczIDEuODk5MzcgNC4xMzk4NiAyLjA0Nzk2IDQuMTI1SDEyLjA4NDdDMTIuMjMzMyA0LjEyNSAxMi4zNjcgNC4yNDM4NyAxMi4zODE5IDQuMzkyNDZMMTMuMTk1NiAxNS4wNzY3VjE1LjEwNjRDMTMuMTk1NiAxNS4yNjk4IDEzLjA2MTkgMTUuNDAzNiAxMi44OTg0IDE1LjQwMzZIMS4yMTk0QzEuMDU1OTUgMTUuMzg4NyAwLjkzNzA3OSAxNS4yNDAxIDAuOTUxOTM4IDE1LjA3NjdMMS43ODA1IDQuMzkyNDZaTTguNTM2NjEgOS4xODI1NEw3LjM3NDU2IDEwLjM0NDZWNy4xMjVINi42MjQ1NlYxMC4zNDQ3TDUuNDYyNDMgOS4xODI1NEw0LjkzMjEgOS43MTI4N0w2Ljk5OTUyIDExLjc4MDNMOS4wNjY5NCA5LjcxMjg3TDguNTM2NjEgOS4xODI1NFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
      search: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAAXNSR0IB2cksfwAAAE5QTFRFAAAAz5+f36ej3qei3aeh3aih3KWf16ef3aeh26ef35+f3Kaf3aWh3aah3Kei26Wf3Kef26Of36ef3aeh3aag3Keg26ef35+f3aaf26aftUPhCQAAABp0Uk5TABB/v//PYCDfQBBQgM+/gGBAII/Pv4AfcHCzDfh5AAAAtElEQVR4nKWS2RKDIAxFQSMEUve6/f+PlmgXZZjSTO8buQfIptQurYuihKCqMkallCOsRYSPEK0VE+wjOu+VIjoOWkYYwyG2d3nPzO1M1DUA0SngHEApIzj9S1reR5HfCH2tTkw0DYBzpwBRmI+MaNu9ia9/tOaOdTLiaDMisdv3ibnkCaWGIdqPcYxWJE+wuu7O7jTN87KEC4lFix5NLqOECAxmX8kSz/rW9R+CmW375r+JB6a0C5We5aaGAAAAAElFTkSuQmCC',
      progress: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgBvY9BDQAwCAPLMg+zMifTOCdYQQW8eEMIoa9+mrsSkvks6n2hkNJoI1B591ALafBT5N9GmhsZrmsLc2NdyPkAAAAASUVORK5CYII=',
      things: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFZSURBVHgBlZNBbsIwEEW/nVTd5gjtCZrcgKjqnhsAJ2hZIwQIoS5pTwA3KN22C6cnCJygHCF7knG/IypRKU5hJCujzPj5z3is0GLz/LOjdbikG3NtIRiMknTry9e+wHNubgh6E+BLBCnXO7PNNDeRb0/oC1SQroLej+/Sp+OvbLEzvRDSp/9yESyA3lBNcaqUKiMeUPj2KJxhx96tnH8QJNMkbQTq/0CuRwQZWGRtoLNg1xqP7qus7NpAdY4vcFJa5FQxM64DIrNRcr8+C+YgQRBOrEXMC3iteHNOkbuACnaqtOoxbStSDsfJQ9YIO4F0qGR9sBg2lfUHqphXYca8fQ1zQRtgSUiXKystBr/BNmuCKg7iN2MFS6LsNMOFNs8Ne4uVUti7oY3obICyLrVpg+vNIv+IBarhKZVQKtywqr5a5KbPAZnw743n8ILzdXul4SrwvcvCCmY/lMCmkbWbWV8AAAAASUVORK5CYII=',
      bows: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgBpVLBccIwELwjTPgmFcT55hVVEKggTl78gA6gAqACoAkGPgwd4A6AD1+gA74eZhB3FmBbln0w7Iw90mm1ur07AAF6Wff05v9D4pVAhPYhLLckVlkiAOoG/Q4ireiQbZHQNtq8Hj38mu3zuII1snWFYK9YCOE3XuNPIVUv/TfAyoDWnuO8au0DB2cHOuxENbrUgsV8eAwBifyhmh9SxSbBHgl275LQ0EE1HV63ma5dsluA2yqDrLxQFuNVMpgpNqoJEbEP+ZmMbBGnkFHjIcxBspOpsP1gcggNAjA2vZgUvnOBQcioGl8gG9/TGn2fabuVpn0pK2RscZ1q1JX2LawmPY5FZw57pbQtGk6TuqKLQeYNjrGYPq1v3GdhC50BHhRijJ3ihecAAAAASUVORK5CYII=',
      nextPage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAzNSAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNTU2NiAyTDMxLjU1NjYgMTNMMjAuNTU2NiAyNCIgc3Ryb2tlPSIjOUFCRDkzIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMCAxM0gzMSIgc3Ryb2tlPSIjOUFCRDkzIiBzdHJva2Utd2lkdGg9IjQiLz48L3N2Zz4=',
      nextPageDisabled: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuNDQ1MyAxLjQzNzVMMjEuMDA3OCA5TDEzLjQ0NTMgMTYuNTYyNSIgc3Ryb2tlPSIjREJEQkRCIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMCA5SDIxIiBzdHJva2U9IiNEQkRCREIiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==',
      greeting: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOC4yOTY5OSAzMi41Mjc1QzkuMjk5MzMgMzEuNTkyNiAxMS4wOTQzIDMxLjY0NDUgMTIuMzI5NCAzMi41MzU1TDE4Ljg2ODMgMzYuNjM0NEMyMC4xNzQgMzcuMjA5IDIwLjI5NzcgMzUuNzQ2MSAxOS44MzgzIDM1LjMzNThDMTkuMzc4OSAzNC45MjU2IDkuMTYwNjIgMjUuMjc1NCA5LjE2MDYyIDI1LjI3NTRDOC4wMDQ0IDI0LjMyMDkgNy4yNDI5IDIzLjA0OTQgOC4xOTczNyAyMS44OTMyQzkuMTUxODUgMjAuNzM3IDEwLjY0NjUgMjAuOTAwMSAxMS44MDI4IDIxLjg1NDZDMTEuODAyOCAyMS44NTQ2IDIxLjU2MSAzMC43NzAzIDIyLjgyNzMgMzEuMzc2N0MyNC4wOTM1IDMxLjk4MzEgMjQuMjc0MSAzMS4zMTg1IDIzLjY3MTcgMzAuNTY4NkMyMy4yOTEzIDMwLjA5NDkgMTIuNzEzNCAxOC40NjA5IDEyLjcxMzQgMTguNDYwOUMxMS43MTUgMTcuMzc5NiAxMS4zMzI3IDE1LjkzMzQgMTIuNDE0IDE0LjkzNTFDMTMuNDk1MyAxMy45MzY3IDE0LjcyMjEgMTQuNTc0OCAxNS43MjA0IDE1LjY1NjFDMTUuNzIwNCAxNS42NTYxIDI2LjQzOTQgMjYuNjU3MyAyNy4yMTU4IDI3LjQ2MjNDMjcuOTYwNSAyOC4yMjc4IDI4Ljc3MzkgMjcuNzA0NCAyOC4yMDI2IDI2LjY2OTdDMjcuNjMxNCAyNS42MzUxIDIwLjIzNDkgMTUuNTM2NyAyMC4yMzQ5IDE1LjUzNjdDMTkuMzE1NSAxNC4zOTIgMTkuMDM2MSAxMi45OTMgMjAuMTgwOCAxMi4wNzM2QzIxLjMyNTUgMTEuMTU0MyAyMi42MzEyIDExLjcyODkgMjMuNTUwNiAxMi44NzM2QzIzLjU1MDYgMTIuODczNiAzMS42MTg3IDIyLjc1NzIgMzMuMDI5OCAyNC42NzU4QzM0LjUzNiAyNi43MTI4IDM4LjQxOTkgMzEuNzEwMyAzOS44NDkzIDMwLjgyMkM0MS4xOTk4IDI5Ljk5NzEgNDEuOTIxNCAyNy4wMTQ4IDQxLjcxOTEgMjQuNThDNDEuNTgwNyAyMi41NDgyIDQyLjUzMzMgMjAuNDE5NSA0NC4zODE0IDE5LjMyNDhDNDcuMDgyMyAxNy42NzUgNDcuMTQzNSAyMC43NDI2IDQ2Ljk0NCAyMy44ODk5QzQ2LjQ1OSAzMC42NDMxIDQ3LjE5OTcgMzMuNDI0OSA0Ny41NTUzIDM3LjQyNUM0Ny44MDU1IDQwLjA4MTEgNDcuNDQzNSA0NS4wNDcyIDQyLjQ4NTUgNDguODk5NUMzNS44Njk4IDU0LjA4MzIgMzAuMTc3NiA1NC40MzQyIDIwLjMxMzMgNDMuODUwNEMxOC4xMjY0IDQxLjQ1MSA5Ljg5MTE2IDM1LjA3ODMgOC44NDYyMSAzNC40MjQxQzguNTY5MjggMzQuMzIxOCA3LjY2NTQzIDMzLjAzNDggOC4yOTY5OSAzMi41Mjc1WiIgZmlsbD0iI0ZCQzFCRCIvPjxnIG9wYWNpdHk9IjAuNSI+PHBhdGggZD0iTTI5IDEyLjY1MzNDMzAuNTgyIDEzLjcwNjEgMzQuMDA0NSAxNi41OTQ4IDM1LjAzODQgMTkuNzI3IiBzdHJva2U9ImJsYWNrIi8+PHBhdGggZD0iTTI5LjcwMjEgOC41OTAzM0MzMi4wMTU4IDEwLjI5MDkgMzcuMDI3NSAxNC45NDcxIDM4LjU2NTggMTkuOTY3MyIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGQ9Ik0xNS44NDg2IDQ0LjQxOTRDMTQuMDg2MyA0My43MDg3IDEwLjE0OTkgNDEuNTcyNyA4LjUwMzI1IDM4LjcxNDYiIHN0cm9rZT0iYmxhY2siLz48cGF0aCBkPSJNMTUuOTgzNCA0OC41NEMxMy4zNzM0IDQ3LjM0MyA3LjUyMjgyIDQzLjc5NzggNS4wMDAxNCAzOS4xOTMiIHN0cm9rZT0iYmxhY2siLz48L2c+PC9zdmc+',
      example: 'data:image/png;base64,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',
      hanger: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA1NSA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjcuNDY5NSAwQzIyLjc2OTEgMCAxOC45MjM0IDMuNjQ3MDUgMTguOTIzNCA4LjExNzY0QzE4LjkyMzQgOS4xMTc2NCAxOS43MTcgOS44ODIzNSAyMC43NTQ3IDkuODgyMzVDMjEuNzkyNSA5Ljg4MjM1IDIyLjU4NiA5LjExNzY0IDIyLjU4NiA4LjExNzY0VjguMDU4NzlDMjIuNTg2IDUuNDcwNTYgMjQuNzIyNSAzLjQ3MDU3IDI3LjQ2OTUgMy40NzA1N0MzMC4yMTY0IDMuNDcwNTcgMzIuMzUyOSA1LjUyOTM4IDMyLjM1MjkgOC4wNTg3OUMzMi4zNTI5IDkuNDExNzQgMzEuNzQyNSAxMC41ODgyIDMwLjgyNjkgMTEuNDcwNkMyOS44NTAyIDEyLjIzNTMgMjguOTM0NSAxMi41ODgyIDI3Ljk1NzggMTMuMTE3NkMyNy40Njk1IDEzLjM1MjkgMjYuOTIwMSAxMy43MDU5IDI2LjQzMTcgMTQuMjM1M0MyNS45NDM0IDE0LjgyMzUgMjUuNjM4MiAxNS42NDcgMjUuNjM4MiAxNi40MTE3VjE4LjI5NDFMMy4wNTIxNiAzMC4yMzUzQzEuMjgxOTEgMzEuMTc2NSAwLjA2MTA0MzMgMzIuODgyMyAwIDM0Ljc2NDdDMCAzNy42NDcgMi41MDI3NyAzOS45NDEyIDUuNDkzOSAzOS45NDEySDI0LjQxNzNDMjUuNDU1IDM5Ljk0MTIgMjYuMjQ4NiAzOS4xNzY0IDI2LjI0ODYgMzguMTc2NEMyNi4yNDg2IDM3LjE3NjQgMjUuNDU1IDM2LjQxMTcgMjQuNDE3MyAzNi40MTE3SDI0LjM1NjNINS40OTM5QzQuNDU2MTYgMzYuNDExNyAzLjY2MjYgMzUuNjQ3IDMuNjYyNiAzNC43NjQ3QzMuNjYyNiAzNC4yMzUzIDMuOTY3ODEgMzMuNzA1OSA0Ljc2MTM4IDMzLjI5NDFMMjcuNDY5NSAyMS40MTE3TDUwLjE3NzYgMzMuMzUyOUM1MC45NzExIDMzLjc2NDcgNTEuMjc2NCAzNC4yOTQxIDUxLjI3NjQgMzQuODIzNUM1MS4yNzY0IDM1LjcwNTkgNTAuNTQzOCAzNi40NzA2IDQ5LjQ0NTEgMzYuNDcwNkgzMC41MjE2QzI5LjQ4MzkgMzYuNDcwNiAyOC42OTAzIDM3LjIzNTMgMjguNjkwMyAzOC4yMzUzQzI4LjY5MDMgMzkuMjM1MyAyOS40ODM5IDQwIDMwLjUyMTYgNDBIMzAuNTgyN0g0OS41MDYxQzUyLjQ5NzIgNDAgNTUgMzcuNzA1OSA1NSAzNC44MjM1QzU0LjkzOSAzMi45NDEyIDUzLjc3OTEgMzEuMjM1MyA1MS45NDc4IDMwLjI5NDFMMjkuMzYxOCAxOC4zNTI5VjE2LjUyOTRDMjkuMzYxOCAxNi41Mjk0IDI5LjQ4MzkgMTYuNDExNyAyOS43ODkxIDE2LjI5NDFDMzAuNDYwNiAxNS45NDExIDMxLjgwMzYgMTUuNDExNyAzMy4yNjg2IDE0LjIzNTNMMzMuMzI5NiAxNC4xNzY1QzM1LjAzODggMTIuNzA1OSAzNi4wNzY2IDEwLjUyOTQgMzYuMDc2NiA4LjE3NjQ1QzM2LjAxNTUgMy42NDcwNCAzMi4xNjk4IDAgMjcuNDY5NSAwWiIgZmlsbD0iIzg1RDFCRiIvPjwvc3ZnPg==',
      noProd: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA0NCA0NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4LjUzMTIgMTUuODgyOEMyOC4xODc1IDE1LjUzOTEgMjcuNjcxOSAxNS41MzkxIDI3LjMyODEgMTUuODgyOEwxOS44NTE2IDIzLjI3MzRMMTYuNTg1OSAyMC4wMDc4QzE2LjI0MjIgMTkuNjY0MSAxNS43MjY2IDE5LjY2NDEgMTUuMzgyOCAyMC4wMDc4TDEzLjQwNjIgMjEuOTg0NEMxMy4wNjI1IDIyLjMyODEgMTMuMDYyNSAyMi45Mjk3IDEzLjQwNjIgMjMuMTg3NUwxOS4yNSAyOS4xMTcyQzE5LjUwNzggMjkuNDYwOSAyMC4xMDk0IDI5LjQ2MDkgMjAuNDUzMSAyOS4xMTcyTDMwLjUwNzggMTkuMDYyNUMzMC44NTE2IDE4LjcxODggMzAuODUxNiAxOC4yMDMxIDMwLjUwNzggMTcuODU5NEwyOC41MzEyIDE1Ljg4MjhaTTQ0IDIyLjVDNDQgMTkuNDA2MiA0Mi4zNjcyIDE2LjY1NjIgMzkuOTYwOSAxNS4xMDk0QzQwLjU2MjUgMTIuMjczNCAzOS43MDMxIDkuMTc5NjkgMzcuNTU0NyA2Ljk0NTMxQzM1LjMyMDMgNC43OTY4OCAzMi4yMjY2IDMuOTM3NSAyOS4zOTA2IDQuNTM5MDZDMjcuODQzOCAyLjEzMjgxIDI1LjA5MzggMC41IDIyIDAuNUMxOC44MjAzIDAuNSAxNi4wNzAzIDIuMTMyODEgMTQuNTIzNCA0LjUzOTA2QzExLjY4NzUgMy45Mzc1IDguNTkzNzUgNC43OTY4OCA2LjQ0NTMxIDYuOTQ1MzFDNC4yMTA5NCA5LjE3OTY5IDMuMzUxNTYgMTIuMjczNCAzLjk1MzEyIDE1LjEwOTRDMS41NDY4OCAxNi42NTYyIDAgMTkuNDA2MiAwIDIyLjVDMCAyNS42Nzk3IDEuNTQ2ODggMjguNDI5NyAzLjk1MzEyIDI5Ljk3NjZDMy4zNTE1NiAzMi44MTI1IDQuMjEwOTQgMzUuOTA2MiA2LjQ0NTMxIDM4LjA1NDdDOC41OTM3NSA0MC4yODkxIDExLjY4NzUgNDEuMTQ4NCAxNC41MjM0IDQwLjU0NjlDMTYuMDcwMyA0Mi45NTMxIDE4LjgyMDMgNDQuNSAyMiA0NC41QzI1LjA5MzggNDQuNSAyNy44NDM4IDQyLjk1MzEgMjkuMzkwNiA0MC41NDY5QzMyLjIyNjYgNDEuMTQ4NCAzNS4zMjAzIDQwLjI4OTEgMzcuNTU0NyAzOC4wNTQ3QzM5LjcwMzEgMzUuOTA2MiA0MC41NjI1IDMyLjgxMjUgMzkuOTYwOSAyOS45NzY2QzQyLjM2NzIgMjguNDI5NyA0NCAyNS42Nzk3IDQ0IDIyLjVaTTM0LjYzMjggMjcuODI4MUMzNS40MDYyIDI5LjU0NjkgMzcuMjk2OSAzMi41NTQ3IDM0LjYzMjggMzUuMjE4OEMzMi4yMjY2IDM3LjYyNSAyOS44MjAzIDM2LjQyMTkgMjcuMjQyMiAzNS4yMTg4QzI2LjU1NDcgMzcuMDIzNCAyNS42OTUzIDQwLjM3NSAyMiA0MC4zNzVDMTguMDQ2OSA0MC4zNzUgMTcuMjczNCAzNi43NjU2IDE2LjY3MTkgMzUuMjE4OEMxNC44NjcyIDM2LjA3ODEgMTEuOTQ1MyAzNy43OTY5IDkuMjgxMjUgMzUuMTMyOEM2LjUzMTI1IDMyLjM4MjggOC41OTM3NSAyOS4yODkxIDkuMjgxMjUgMjcuODI4MUM3LjQ3NjU2IDI3LjE0MDYgNC4xMjUgMjYuMjgxMiA0LjEyNSAyMi41QzQuMTI1IDE4LjYzMjggNy43MzQzOCAxNy44NTk0IDkuMjgxMjUgMTcuMjU3OEM4LjUwNzgxIDE1LjUzOTEgNi43MDMxMiAxMi41MzEyIDkuMzY3MTkgOS44NjcxOUMxMi4xMTcyIDcuMTE3MTkgMTUuMjEwOSA5LjE3OTY5IDE2LjY3MTkgOS44NjcxOUMxNy4zNTk0IDguMDYyNSAxOC4yMTg4IDQuNjI1IDIyIDQuNjI1QzI1Ljg2NzIgNC42MjUgMjYuNjQwNiA4LjMyMDMxIDI3LjI0MjIgOS44NjcxOUMyOC45NjA5IDkuMDkzNzUgMzEuOTY4OCA3LjI4OTA2IDM0LjYzMjggOS45NTMxMkMzNy4zODI4IDEyLjcwMzEgMzUuMzIwMyAxNS43OTY5IDM0LjYzMjggMTcuMjU3OEMzNi40Mzc1IDE3Ljk0NTMgMzkuNzg5MSAxOC44MDQ3IDM5Ljc4OTEgMjIuNTg1OUMzOS43ODkxIDI2LjQ1MzEgMzYuMTc5NyAyNy4yMjY2IDM0LjYzMjggMjcuODI4MVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo='
    },
  };
  
  // Авторизация:
  settings.sessionKey = getSessionKey();
  
  if (!settings.sessionKey) {
    settings.sessionKey = await createSessionKey();
    saveSessionKey(settings.sessionKey);
  }
  
  // Определяем нужно ли показывать виджет на странице:
  const isShowWidget = await checkToShowWidget();
  
  if (isShowWidget) {
    return;
  }
  
  state = initState();
  const tutorialIsDone = checkOnTutorialIsDone();
  
  generateWidgetCarcass(parentSelector);
  
  // Если в настройках задано показать виджет через ms:
  if (settings.delay) {
    delayTimerID = setTimeout(toggleWidgetVisibility, +settings.delay);
  }
  
  if (!tutorialIsDone) {
    switchToGreeting();
    return;
  }
  
  await switchToFeed();
};