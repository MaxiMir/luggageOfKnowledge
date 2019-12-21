;(widgetSettings => {
	"use strict";
	
	/**
	 * Инициализация виджета
	 */
	const initWidget = async () => {
		let container;
		let currentDataBlock;
		let settings = {
			keyMagazine: null,
			sessionKey: null
		};
		let state = {
			isOpen: false,
			tutorialDone: localStorage.getItem("_garderoboAssistantTutorialDone")
		};
		const uriForRequest = {
			authorization: "https://slim.xppx.ru/ai.php?page=authorization", // "https://api.garderobo.ai/api/v3/widget/start_session/"
			checkState: "https://slim.xppx.ru/ai.php?page=check-state", // https://api.garderobo.ai/api/v3/widget/assistant/check_state/
			clothes: "https://slim.xppx.ru/ai.php?page=clothes",
			account: "https://slim.xppx.ru/ai.php?page=account",
		};
		const bgImages = {
			like: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAYAAACiyHcXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFQSURBVHgBzZeNbYMwEEY/M0FGIBvQCeoRukEZwRswQpoJ2k0gE8AG7gbJBte72lEpDcK4Mc6TTkYWdp7/yBm4ARGVHA1Hz3Emh5QtR82xm2m34zD+vXE76ecg/WIJ38mBlrEiM2mrff0S77MyfvQhnYxpfNuG1mFvitB6gSstxWHJL2txHQkXJeLQiKPkMPKg/LRY5OHCsZeZ0MiHLIcRiVfk5VkkSuSlkj1ByEyBB0AkLsiMSAzIyyASJ+TlJBId8vJRKKU65BPp+PcHJU98SjUXLbZnzxKf30fUz8YR23IUgV815BKanrbB0ig7UxORkose7o8lFfJdevozCxMRTWmpEAK5ZDYFNdaQQKRGDNzwhX5S91jO0QIjkYrik2BLoXsgQCTmOmAp5LKzUkS+I2+BAvJeumNO7po3t0+k3mALZpanvfv0B8oYL/Ov0X8BUUJjCwLQCPAAAAAASUVORK5CYII=",
			dislike: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFQSURBVHgB7ZjhUYNAEIXfOf6XEighJcQKtAStwHQQrSBJB1qB6QCsQK1AOhArON/q4RBmDHdwN7c/8s08IBmOeSx7twvGWlsAWGCcxhjTyIEbU1IFpvN3vQN48cr6s6SuqU8bh83Qzxm1hD9yrkRzTmT6rOQmMTCUm4Oby22opd76f2iI0IKPrex+5DYkj+uZqjpTGiIklNRWDrQYEi5ko8nQk2w0GfqZ/ufQw4aJrSpCwlqbIXUR2omhNmBAg3iFdcgD25F7Sepb6s5jwDu1p66QhjWT+sMgENcuVEhDG5xDDGvN3Q5pKIIj1MFIvcKv9Q3hcY6hkjsxNZbkNfx4gSuwk6Gpm5GeOVWuHTW11WaokOkay9DslZqzThbWS4QtsP8SpXS4F74oS0HMWlYjAqdqP0ZqQ18IJLWhPXLh1qP+V5EVciP1zf5+spncxH0DULw5HsfWQ+4AAAAASUVORK5CYII=",
			purchasesCount: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAqCAYAAADWFImvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKXSURBVHgBzZg/b9NAFMDfsxOJDSNQ1a3uN2jXKJWcPaIRXyBBgRUywMbQSmywlImhFeYbuKg7Ea1Qt/YjeEQIpIyI9nzcnX31n6S5O0N8/KTTXeKX+Jfn83tyEGrQ7Y8CdN0hAA0A0OfvIcAlZQMIOT49CSMwBE2Cg8HIJ9T9wJeK0PgKSe88CmPQxNEN7AxGW0ziIpWgM4q4f4XtzdPjI+SDoLMNSB+zYzGL8dsstjN4uqX7/VoZyTLBJTyg8NF1yGQahbNbYr3rxN1DhOfs5YxlZlsnMy3QgEl85hKUwsHZp6PJsthMcLLzcOyxnzlsp5eyBwqUl2anPx6wyecpbzlkDzThWWMTlwq6/SeBKl69R1zYFTPC/m2XYxE8liI9EB916VAVrxRht6TYcASSSzCkBUmYLQNVrFIEM5GvUWgsMs03qa+K1b59V81/I1KqI93d8YW8FE1ACfbOTg6nfO1UrBqT4CSY+HJ9I8IrIjSMgzAvArx8Nw715kSuNW6xfw2icxeqIlagcA+qIkgcHxqGdegNqIokbvN7hBb2ZZ6RpJ7Il+hQjJosEAHqQ/PMi9DCDm6SzqPxRkkErdSRnDwjlkSc37hZEsFClVvG+toDMeoeryL7TaGgoa/6ED/Bu9cv2Xix8GSq48sQIqYNLz1h+WRSYn3tPpggG5/MiJbIt+8/4NmrN2z+eSMjkRJpzFsx65FuCSFi0vCqMpJ6Ennjq9X0ijLl98wkBFnjEyJ1Gl5RprYE5I1PPHJStmGM/haoyMh1HWT90nr2Vcn8JflmtdTw5kVsNTwJb3xZRuw2PE6aEdudlzU+mREfLIIt6hmV+FVBCBOx8YRXhTc+mRHtf4JWAToQi4LKs/IL7ljLzHn0Pv4DnlL2bqlu2NYAAAAASUVORK5CYII=",
			search: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAAXNSR0IB2cksfwAAAE5QTFRFAAAAz5+f36ej3qei3aeh3aih3KWf16ef3aeh26ef35+f3Kaf3aWh3aah3Kei26Wf3Kef26Of36ef3aeh3aag3Keg26ef35+f3aaf26aftUPhCQAAABp0Uk5TABB/v//PYCDfQBBQgM+/gGBAII/Pv4AfcHCzDfh5AAAAtElEQVR4nKWS2RKDIAxFQSMEUve6/f+PlmgXZZjSTO8buQfIptQurYuihKCqMkallCOsRYSPEK0VE+wjOu+VIjoOWkYYwyG2d3nPzO1M1DUA0SngHEApIzj9S1reR5HfCH2tTkw0DYBzpwBRmI+MaNu9ia9/tOaOdTLiaDMisdv3ibnkCaWGIdqPcYxWJE+wuu7O7jTN87KEC4lFix5NLqOECAxmX8kSz/rW9R+CmW375r+JB6a0C5We5aaGAAAAAElFTkSuQmCC",
			progress: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgBvY9BDQAwCAPLMg+zMifTOCdYQQW8eEMIoa9+mrsSkvks6n2hkNJoI1B591ALafBT5N9GmhsZrmsLc2NdyPkAAAAASUVORK5CYII=",
			things: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFZSURBVHgBlZNBbsIwEEW/nVTd5gjtCZrcgKjqnhsAJ2hZIwQIoS5pTwA3KN22C6cnCJygHCF7knG/IypRKU5hJCujzPj5z3is0GLz/LOjdbikG3NtIRiMknTry9e+wHNubgh6E+BLBCnXO7PNNDeRb0/oC1SQroLej+/Sp+OvbLEzvRDSp/9yESyA3lBNcaqUKiMeUPj2KJxhx96tnH8QJNMkbQTq/0CuRwQZWGRtoLNg1xqP7qus7NpAdY4vcFJa5FQxM64DIrNRcr8+C+YgQRBOrEXMC3iteHNOkbuACnaqtOoxbStSDsfJQ9YIO4F0qGR9sBg2lfUHqphXYca8fQ1zQRtgSUiXKystBr/BNmuCKg7iN2MFS6LsNMOFNs8Ne4uVUti7oY3obICyLrVpg+vNIv+IBarhKZVQKtywqr5a5KbPAZnw743n8ILzdXul4SrwvcvCCmY/lMCmkbWbWV8AAAAASUVORK5CYII=",
			bows: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgBpVLBccIwELwjTPgmFcT55hVVEKggTl78gA6gAqACoAkGPgwd4A6AD1+gA74eZhB3FmBbln0w7Iw90mm1ur07AAF6Wff05v9D4pVAhPYhLLckVlkiAOoG/Q4ireiQbZHQNtq8Hj38mu3zuII1snWFYK9YCOE3XuNPIVUv/TfAyoDWnuO8au0DB2cHOuxENbrUgsV8eAwBifyhmh9SxSbBHgl275LQ0EE1HV63ma5dsluA2yqDrLxQFuNVMpgpNqoJEbEP+ZmMbBGnkFHjIcxBspOpsP1gcggNAjA2vZgUvnOBQcioGl8gG9/TGn2fabuVpn0pK2RscZ1q1JX2LawmPY5FZw57pbQtGk6TuqKLQeYNjrGYPq1v3GdhC50BHhRijJ3ihecAAAAASUVORK5CYII=",
			nextPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAaCAYAAAA9rOU8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEISURBVHgBzddLDoIwEAbgoSBxo/EIHIErsPQYLllyEhYuTNxwBJeuTK/gETgHr9pRI9HE2A4z6p80ARLoF1qGDIBAdscywQGeCYA5iAjjmcbjvmmzfF3UrveyYkaISe6Pr31AChgTxlE5QjDminNdMlbMTHUb+67Pz1fdQex7ptLlqjWRBgPpy1Qfl4wdMwUkgqGCxDAUkCjGFySO8QEF+9PWwE8zgv4AAw8Qa9GjZwCYM1dgWkzdqz7LM7tM8IVUB7uBF/YHGpj0HQTP5D9tR4g4xgciivGFiGEoEBEMFcKOmQLBsNaZZhlVVAg7ZlBdgZMDAYLhb1W07RCG8NaqeEDEgiAc4JkLJD3tVPVsZEMAAAAASUVORK5CYII=",
		};
		const statefulClasses = ["greeting", "clothes", "question", "account", "open", "closed", "loading", "error"];
		
		
		/**
		 * Возвращает из LocalStorage SessionKey
		 * @returns {string}
		 */
		const getSessionKey = () => localStorage.getItem("_garderoboSessionKey");
		
		/**
		 * Сохраняет в LocalStorage SessionKey
		 * @param sessionKey
		 */
		const saveSessionKey = sessionKey => localStorage.setItem("_garderoboSessionKey", sessionKey);
		
		/**
		 * Посылает запрос на сервер для генерации SessionKey
		 * @returns {Promise<*>}
		 */
		const createSessionKey = async () => {
			const uri = uriForRequest.authorization;
			const {session} = await getResponseInJson(uri, false);
			
			return session;
		};
		
		/**
		 * Посылает запрос для определения нужно ли показывать виджет
		 */
		const checkToShowWidget = async () => {
			const uri = new URL(uriForRequest.checkState);
			
			const {product_id, category_id} = settings;
			
			if (product_id) {
				uri.searchParams.append("product_id", product_id);
			} else if (category_id) {
				uri.searchParams.append("category_id", category_id);
			}
			
			const {show} = await getResponseInJson(uri);
			
			return show === 1;
		};
		
		/**
		 * Вставляет верстку, стили и обработчики виджета в DOM
		 */
		const generateWidget = () => {
			document.body.insertAdjacentHTML(
			"beforeend",
			`
					<div class="ai-block">
					   <div class="ai-block__container">
					       <div class="ai-wgt fl-column-center closed">
					           <div class="ai-wgt__body mb-30">
					               <div class="ai-wgt__content">
					                   <div class="ai-wgt__current-data"></div>
					                   <div class="ai-wgt__dislike ai-wgt__circle"></div>
					                   <div class="ai-wgt__like ai-wgt__circle"></div>
					                   <div class="ai-wgt__next-page ai-wgt__circle"></div>
					                   <div class="ai-wgt__purchases-count ai-wgt__circle horizontal-center"></div>
					               </div>
					           </div>
					           <div class="ai-wgt__footer">
					               <div class="ai-wgt__link ai-wgt__account">Мой аккаунт</div>
					           </div>
					       </div>
					       <div class="ai-wgt__toggle-visible-btn ai-wgt__circle">
					            <div class="ai-wgt__toggle-visible-title"></div>
					       </div>
					       
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
						    border-radius: 10px;
						    position: relative;
						}
						
						.ai-wgt__title {
						    margin-top: 75px;
						    font-size: 18px;
						    line-height: 25px;
						    font-weight: bold;
						}
						
						.ai-wgt__link {
						    width: 150px;
						    height: 40px;
						    background-color: #FFFFFF;
						    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
						    border-radius: 90px;
						    display: flex;
						    justify-content: center;
						    align-items: center;
						    cursor: pointer;
						    transition: all 1s ease-out;
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
						
						.ai-wgt__like,
						.ai-wgt__dislike,
						.ai-wgt__purchases-count,
						.ai-wgt__account {
							display: none;
						}
						
						.ai-wgt__footer {
						    width: 100%;
						    height: 110px;
						    display: flex;
						    justify-content: center;
						}
						
						.ai-wgt__toggle-visible-btn {
						    position: absolute;
						    bottom: 20px;
						    left: 20px;
						    background: #FFFFFF;
						
						    transition: all 0.5s ease-in-out;
						    animation-delay: 0.5s;
						}
						
						.ai-wgt__toggle-visible-btn:after,
						.ai-wgt__toggle-visible-btn:before {
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
						
						.ai-wgt__toggle-visible-btn:before {
						    transform: rotate(45deg);
						}
						
						.ai-wgt__toggle-visible-btn:after {
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
						
						.ai-wgt.closed + .ai-wgt__toggle-visible-btn {
						    transform: scaleX(-1);
						    animation: pulse infinite 1.5s;
						}
						
						.ai-wgt.closed + .ai-wgt__toggle-visible-btn:before {
						    transform: rotate(90deg);
						}
						
						.ai-wgt.closed + .ai-wgt__toggle-visible-btn:after {
						    transform: rotate(0deg);
						}
						
						.ai-wgt.closed + .ai-wgt__toggle-visible-btn:hover {
							animation: none;
							width: 282px;
                     border-radius: 40px;
						}
						
						.ai-wgt__toggle-visible-btn:hover .ai-wgt__toggle-visible-btn:after,
						.ai-wgt__toggle-visible-btn:hover .ai-wgt__toggle-visible-btn:before {
							margin-left: initial;
							margin-right: initial;
							right: 45px;
						}
						
						/* CSS HELPERS */
						.ai-wgt__circle {
						    width: 64px;
						    height: 64px;
						    border-radius: 50%;
						    cursor: pointer;
						    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
						    background-size: 33px 30px;
						    background-repeat: no-repeat;
						    background-position: center;
						    transition: all 1s ease-out;
						}
						
						.ai-wgt__circle:hover {
						    transform: scale(1.1);
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
						        transform: scale(0);
						    }
						    to {
						        transform: scale(1);
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
					</style>
             `
			);
			
			container = document.querySelector(".ai-wgt");
			currentDataBlock = document.querySelector(".ai-wgt__current-data");
			const toggleVisibleBtn = document.querySelector(".ai-wgt__toggle-visible-btn");
			const showAccountBtn = document.querySelector(".ai-wgt__account");
			
			// Обработчики:
			toggleVisibleBtn.addEventListener('click', toggleVisibleHandler);
			showAccountBtn.addEventListener('click', showAccount);
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
		 * Обновление State (в случае изменений делает перендеринг):
		 * @param newState
		 */
		const setState = newState => {
			const newMergingState = {...state, ...newState};
			
			if (!componentNeedUpdate(newMergingState)) {
				return;
			}
			console.log(state);
			state = newMergingState;
			
			setTimeout(() => render(state), 0);
		};
		
		/**
		 *
		 * @param url
		 * @param isGetRequest
		 * @param sentData
		 * @returns {Promise<any>}
		 */
		const getResponseInJson = async (url, isGetRequest = true, sentData = null) => {
			let settings = {
				method: isGetRequest ? "GET" : "POST",
				headers: {
					'Accept': 'application/json',
					//'HTTP_X_API_KEY': settings.keyMagazine,
					//'HTTP_AUTHORIZATION': "Bearer <ключ сессии>"
				}
			};
			
			if (sentData) {
				settings = {
					...settings,
					body: JSON.stringify(sentData)
				}
			}
			
			if (url !== uriForRequest.authorization) {
				//settings.headers["HTTP_AUTHORIZATION"] = settings.sessionKey;
			}
			
			const response = await fetch(url, settings);
			return await response.json();
		};
		
		/**
		 * Рендеринг содержимого виджета
		 * @param state
		 */
		const render = async state => {
			const {page, isOpen} = state;
			const statusWidget = isOpen ? "open" : "closed";
			
			// устанавливаем классы:
			container.classList.remove(...statefulClasses);
			container.classList.add(page, statusWidget);
			
			// устанавливаем контент:
			try {
				const pageHTML = await getPageHTML(page);
				currentDataBlock.innerHTML = "";
				currentDataBlock.insertAdjacentHTML("afterbegin", pageHTML);
			} catch (error) {
				setState({page: "error"});
			}
		};
		
		/**
		 * Рендеринг открыть/закрыть модальное окно:
		 */
		const toggleVisibleHandler = () => {
			setState({isOpen: !state.isOpen});
		};
		
		/**
		 * Рендеринг "Приветствие":
		 * @param tutorialStep
		 */
		const showTutorial = (tutorialStep = 1) => {
			setState({page: "tutorial", tutorialStep});
		};
		
		/**
		 * Рендеринг страницы "Выбор одежды"
		 */
		const showClothes = () => {
			setState({page: "clothes"});
		};
		
		/**
		 * Рендеринг страницы "Аккаунт"
		 */
		const showAccount = () => {
			setState({page: "account"});
		};
		
		/**
		 * @param page
		 * @returns {*} Возвращает HTML для страницы
		 */
		const getPageHTML = async page => {
			let data;
			
			if (page in uriForRequest) {
				const uri = uriForRequest[page];
				data = await getResponseInJson(uri);
			}
			
			const pageContentMap = {
				tutorial: getTutorialHTML,
				account: getAccountHTML,
				clothes: getClothesHTML,
				question: getQuestionHTML
			};
			
			if (!data) {
				return pageContentMap[page]();
			}
			
			return pageContentMap[page](data);
		};
		
		/**
		 * HTML для страниц "Приветствие":
		 */
		const getTutorialHTML = () => {
			let html;
			const step = state.tutorialStep;
			
			if (step === 1) {
				html = `
					<div class="fl-column-center">
						<div class=""></div>
						<div class="text-center">
							Привет. Отличный выбор!
							Я — искусственный интеллект, призванный помочь в выборе одежды.
						</div class="text-center">
						<div class="text-center">Мы будем задавать вам вопросы и предлагать вещи, попутно узнавая о ваших предпочтениях все больше и больше.</div>
						<div class="text-center">На вопросы нет неправильных ответов, поэтому не бойтесь отвечать как вам по душе.</div>
					</div>
					`;
			}
			
			if (step === 2) {
			
			}
			
			if (step === 3) {
			}
			
			html += `
				<style>
					.ai-wgt__content {
						background-color: #FFFFFF;
						box-shadow: 0px 14px 32px rgba(0, 0, 0, 0.24);
					}
					
					.ai-wgt__next-page {
						position: absolute;
						top: 324px;
						right: -32px;
						background-color: #FFFFFF;
						background-image:url(${bgImages.nextPage});
					}
					
					div {
						font-size: 14px;
						line-height: 19px;
					}
				</style>
			`;
			
			const nextPageBtn = document.querySelector(".ai-wgt__next-page");
			
			// const nextPage = step === 3 ? showClothes: showTutorial(step + 1);
			// nextPageBtn.addEventListener('click', );
			
			return html;
		};
		
		/**
		 * @param data HTML для страницы "Аккаунт":
		 */
		const getAccountHTML = data => {
			const {userName, userProgress, userThingsCount, accountPhoto} = data;
			
			return `
            <div class="account">
                <div class="ai-wgt__account-photo horizontal-center"></div>
                <div class="ai-wgt__title text-center mb-25">${userName}</div>
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
            </div>
            <style>
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
					    border: 10px solid #ffff;
					    background-size: contain;
					    background-image: url(${accountPhoto});
					}
					
					.bg {
					    background-size: 12px 12px;
					    background-repeat: no-repeat;
					    background-position: 15px center
					}
					
					.bg--search {
					    background-image: url(${bgImages.search});
					}
					
					.bg--progress {
					    background-image: url(${bgImages.progress});
					}
					
					.bg--things {
					    background-image: url(${bgImages.things});
					}
					
					.bg--bows {
					    background-image: url(${bgImages.bows});
					}
					
					.ai-wgt .ai-wgt__account,
					.ai-wgt .ai-wgt__next-page,
					.ai-wgt .ai-wgt__purchases-count,
					.ai-wgt .ai-wgt__like,
					.ai-wgt .ai-wgt__dislike {
					    display: none;
					}
            </style>
        `;
		};
		
		/**
		 * @param data HTML для страницы "Выбор одежды":
		 */
		const getClothesHTML = data => {
			const {mainImage} = data;
			
			return `
            <style>
					.ai-wgt__content {
					    background-image:url(${mainImage});
					}
					
					.ai-wgt__like,
					.ai-wgt__dislike,
					.ai-wgt__purchases-count {
						display: block;
					}
					
					.ai-wgt__like {
					    position: absolute;
					    top: 250px;
					    right: -32px;
					    background-color: #E54243;
					    background-image:url(${bgImages.like});
					}
					
					.ai-wgt__dislike {
					    position: absolute;
					    top: 250px;
					    left: -32px;
					    background-color: #252525;
					    background-image:url(${bgImages.dislike});
					}
					
					.ai-wgt__purchases-count {
					    position: absolute;
					    bottom: -10px;
					    background-color: #FFFFFF;
					    background-image:url(${bgImages.purchasesCount});
					    background-size: 33px 41px;
					}
					
					.ai-wgt__next-page {
					    display: none;
					}
            </style>
            `;
			
			
		};
		
		/**
		 * @param data HTML для страницы "Цвет настроения"
		 */
		const getColorsHTML = data => {
			return "";
		};
		
		/**
		 * @param data HTML для страницы "Вопросы"
		 */
		const getQuestionHTML = data => {
			return `
				<style>
					.ai-wgt__next-page {
               	position: absolute;
                  bottom: 32px;
                  right: -32px;
                  background-color: darkgreen;
                }
				</style>
			`;
		};
		
		
		
		// Переданные данные для виджета:
		const {key: keyMagazine, category_id = null, product_id = null, delay = 15000} = widgetSettings;
		
		if (!keyMagazine) {
			console.error("Не передан ключ магазина!");
			return;
		}
		
		// Авторизация:
		settings.sessionKey = getSessionKey();
		
		if (!settings.sessionKey) {
			settings.sessionKey = createSessionKey();
			saveSessionKey(settings.sessionKey);
		}
		
		settings = {...settings, keyMagazine, category_id, product_id, delay};
		
		// Определяем нужно ли показывать виджет на странице:
		const isShowWidget = await checkToShowWidget();
		
		if (isShowWidget) {
			generateWidget();
		}
		
		const prepareFirstPage = state.tutorialDone ? showClothes : showTutorial;
		prepareFirstPage();
		
		// Если в настройках задано показать виджет через ms:
		if (settings.delay) {
			setTimeout(toggleVisibleHandler, + settings.delay);
		}
	};
	
	
	// Дожидаемся полной загрузки и инициализируем виджет:
	document.readyState === 'complete' ?
		initWidget()
		:
		window.addEventListener('load', initWidget, false);
	
})({'key': 1, 'category_id': 777});
