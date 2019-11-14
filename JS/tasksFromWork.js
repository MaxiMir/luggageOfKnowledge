/*@@@
Дан список слов неограниченной длины. Необходимо максимально быстрым способом найти количество анаграмм этого
слова. 
Пример: слово - "лото".
Список: "тест", "цифра", "отол", "оолт", "кекс" . Результат - 2.
*/

// #1:
const getCountAnagram = (data, origStr) => {
    let counter = 0;

    if (data.length > 0 && origStr.length > 0) {
        const sOrigStr = [...origStr].sort().join();

        data.forEach(currStr => {
            if (origStr.length === currStr.length) {
                const sCurrStr = [...currStr].sort().join();

                if (sCurrStr === sOrigStr) counter++;
            }
        });
    }

    return counter;
};




/* #@ Подзагрузка товаров: @#*/
$(() => {
    const delay = ms => {
        return new Promise(r => setTimeout(() => r(), ms));
    };

    const initReloadingGoods = () => {
               let data = {};
               const paginationBlockUp = $('#yw0');
               const paginationBlockDown = $('#yw1');

               if (paginationBlockDown.length) {
                   const pageNum = +paginationBlockDown.find('.selected a').text();
                   const pagesCount = paginationBlockDown.children('.page').length;
                   const isLastPage = pageNum === pagesCount;

                   data = {pageNum, pagesCount, isLastPage};
               }

               return {
                   getData: () => {
                       return data;
                   },
                   getNextPageURN: nextPageNum => {
                       const urnData = location.pathname.split('/').filter(Boolean);
                       const isRootSection = urnData.length === 2;
                       const isNotPaginationNumInURN = isNaN(+urnData[urnData.length - 1]);

                       if (isRootSection || isNotPaginationNumInURN) {
                           urnData.push(nextPageNum);
                       } else {
                           urnData[urnData.length - 1] = nextPageNum;
                       }

                       return urnData.join('/') + '/';
                   },
                   createShowMoreBtn: (nextPageNum, pagesCount) => {
                       if (nextPageNum > pagesCount) {
                           return;
                       }

                       $(`<div id="loadProductsContainer">\
				                    <div id="loadProductsBtn" data-num="${nextPageNum}" data-count="${pagesCount}">\
				                        Показать еще\
				                    </div>\
				                    <div class="loader">\
				                        <img src="loader.gif" width="300"/>\
				                    </div>\
				                </div>`).insertBefore(paginationBlockDown);
                   },
                   paginationSwitchToNext: (nextPageNum, count) => {
                       if (nextPageNum > count) {
                           return
                       }

	                    for (let paginationBlock of [paginationBlockUp, paginationBlockDown]) {
                           paginationBlock
	                            .children('.page')
	                            .removeClass('selected')
	                            .eq(nextPageNum - 1)
	                            .addClass('selected');
	                    }
                   },
                   initLoading: () => {
                       $('#loadProductsBtn').fadeOut(1000, () => {
                           $('.loader').show()
                       });
                   },
                   endLoading: () => {
                       $('#loadProductsContainer')
                           .fadeOut(1000)
                           .detach();
                   },
                   loadHandler: e => {
                       const loadBtn = $(e.currentTarget);
                       const productContainer = $('#bike-list .items');
                       const {num, count} = loadBtn.data();
                       const nextPageURN = reloadingGoods.getNextPageURN(num);

                       $.ajax({
                           type: 'GET',
                           url: nextPageURN,
                           dataType: 'html',
                           beforeSend: () => reloadingGoods.initLoading(),
                           success: data => {
                               const elements = $(data).find('.wrap-card-it');

                               delay(1500)
                                   .then(() => reloadingGoods.endLoading())
                                   .then(() => productContainer.append(elements))
                                   .then(() => reloadingGoods.createShowMoreBtn(num + 1, count))
                                   .then(() => reloadingGoods.paginationSwitchToNext(num, count));
                           }
                       });
                   }
               }
           };

    const reloadingGoods = initReloadingGoods();
    const reloadingGoodsData = reloadingGoods.getData();

    if (reloadingGoodsData) {
        const {pageNum, pagesCount} = reloadingGoodsData;

        reloadingGoods.createShowMoreBtn(pageNum + 1, pagesCount);
    }

    $(document).on('click', '#loadProductsBtn', reloadingGoods.loadHandler);
});



/* #@ Анимация у счетчиков при скролле до элемента @#*/
const isMainPage = location.pathname === '/';

if (isMainPage) {
    let isNotWorkOutAnimate = true;
    const windowDOM = $(window);
    const counters = $('.counters');

    const countersPos = counters.offset().top;
    const windowHeight = windowDOM.height();
    const scrollDistanceForCounters = countersPos - windowHeight;

    windowDOM.scroll(function() {
        const scrollDistance = $(this).scrollTop();
        const userSeesBlockCounters = scrollDistance > scrollDistanceForCounters;

        if (isNotWorkOutAnimate && userSeesBlockCounters) {
            animateCounters();
            isNotWorkOutAnimate = false;
        }
    });
}

function animateCounters() {
    const counts = $('.counters__num');

    $.each(counts, function () {
        const elem = $(this);
        const countText = elem.text();

        elem.prop('Counter', 0).animate(
            { Counter: countText },
            {
                duration: 1500,
                easing: 'swing',
                step: now => {
                    elem.text(Math.ceil(now));
                },
            },
        );
    });
}
   
/*
<div class="counters">
    <div class="counters__item">
        <span class="counters__num">37</span>
        <span>текст текст</span>
    </div>
    <div class="counters__item">
        <span class="counters__num">137</span>
        <span>текст текст</span>
    </div>
</div>
*/



/* #@ Lazy Load + подзагрузка товаров @#*/
$(() => {
    const imgCollection = $('.lazy');
    const isMainPage = window.location.pathname === '/';
    const loadProducts = $('#loadProducts');
 
 
    // # Lazy Load #:
    if (imgCollection.length) {
       imgCollection.Lazy({
          afterLoad: element => {
             element.removeClass('lazyLoader');
          }
       });
    }
 
    if (isMainPage) {
       delay(1000)
          .then(() => getContent('slider'))
          .then(data => generateSlider(data))
          .catch(error => console.error(error));
    }
 
    
    // # подзагрузка товаров #:
    loadProducts.on('click', e => {
        const productContainer = $('.pr_list');
        const loadProductsBtn = $(e.currentTarget);
        const searchParams = location.search;

        let {id, steps, step = 1} = loadProductsBtn.data();
        const convertedSearchParams = changePaginationInSearchParams(searchParams, step);

        $.ajax({
            url: `/ajax/downloadable-products.php?${convertedSearchParams}`,
            type: 'POST',
            data: { id },
            success: res => {
                const nextStep = step + 1;
                loadProductsBtn.data('step', nextStep);
                productContainer.append(res);

                if (steps === nextStep) {
                    loadProductsBtn.hide();
                }
            },
            error: () => {
                alert('Произошла ошибка при отправке данных!');
            }
        });
    });
    
    
    /**
     *
     * @param ms
     * @returns {Promise<unknown>} промисифицированный setTimeout
     */
    function delay(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }
    
    
    /**
     * Документация по URLSearchParams: https://developer.mozilla.org/ru/docs/Web/API/URLSearchParams
     * @param searchParams
     * @param step
     * @returns {string} строка с измененным значением пагинации в строке запроса
     */
    function changePaginationInSearchParams(searchParams, step) {
        const urlSearchParams = new URLSearchParams(searchParams);
        const isFirstPage = !urlSearchParams.has("p");

        if (isFirstPage) {
            urlSearchParams.append("p", "2");
        } else {
            const newStep = + urlSearchParams.get("p") + step;
            urlSearchParams.set("p", newStep);
        }

        return urlSearchParams.toString();
    }
    
    
    /**
     *
     * @param fileName
     * @returns {Promise<string>} промис с содержимым файла
     */
    function getContent(fileName) {
        return fetch(`/ajax/content/${fileName}.php`)
            .then(response => response.text());
    }
    
        
    function generateSlider(data) {
        const mainSlider = $('#mainSlider');
        const sliderSettings = {
            dots: false,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 5000,
            speed: 600,
        };

        mainSlider
            .append(data)
            .slick(sliderSettings);
    }
 });
  


/* #@ Рейтинг @#*/
const formForumResponse = $('.reviews-form');
const starsElementsBlock = $('.user-rating__stars');
const starsElements = $('.user-rating__star');
const errorResponseText = $('.error--rating');

const initRating = () => {
    let value = null;

    return {
        getSavedValue: () => {
            return value;
        },
        checkOnSelected: () => {
            return value !== null;
        },
        save: starNum => {
            value = starNum;
        },
        set: function(starNum) {
            const emptyStarClass = 'star-empty user-rating__star';
            const activeStarClass = 'star-voted user-rating__star';
            const isSelectedRating = value !== null;
    
            if (!isSelectedRating) {
                starsElements.attr('class', emptyStarClass);
    
                return;
            }
    
            starsElements.each((index, elem) => {
                const classElem = index <= starNum ? activeStarClass : emptyStarClass;
    
                $(elem).attr('class', classElem);
            });
        }
    };
};

const showRatingError = () => {
    starsElementsBlock.addClass('user-rating__stars-error');
    errorResponseText.removeClass('hidden');
};


const hideRatingError = () => {
    starsElementsBlock.removeClass('user-rating__stars-error');
    errorResponseText.addClass('hidden');
};


starsElements.on('click mouseenter', e => {
    const isMouseEnter = e.type === 'mouseenter';
    const currStar = $(e.currentTarget);
    const starNum = currStar.index();
    const isDisplayedError = starsElementsBlock.hasClass('user-rating__stars-error');
    const rating = initRating();
    
    rating.set(starNum);

    if (isMouseEnter) {
        return;
    }

    if (isDisplayedError) {
        hideRatingError();
    }

    rating.save(starNum);
});


starsElementsBlock.on('mouseleave', () => {
    const rating = initRating();
    const savedRating = rating.getSavedValue();

    rating.set(savedRating);
});


formForumResponse.on('submit', () => {
    const rating = initRating();
    const ratingValue = rating.getSavedValue();
    const isSelectedRating = rating.checkOnSelected();

    if (!isSelectedRating) {
        return;
    }

    const prodID = $('[name="ELEMENT_ID"]').val();
    const sectionID = $('[name="SECTION_ID"]').val();
    const responseHTML = $('.bx-editor-iframe')
        .contents()
        .find('body')
        .html();

    $.ajax({
        url: '/ajax/adpro/addResponse.php',
        type: 'POST',
        cache: false,
        data: {
            prodID,
            sectionID,
            responseHTML,
            ratingValue
        },
        success: () => {},
        error: () => {
            alert('По техническим причинам сообщение не было отправлено.');
        }
    });
});






// #@ Набросок логики для формы: @# */
window.addEventListener('load', () => {
    const formCalc = document.querySelector('.modal-request');
    const btnSbm = formCalc.querySelector('.form-modal__submit');


    /**
     * Получаем заполненные опции
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


    /**
     * Посылает POST запрос с данными
     * @param urn
     * @param data
     */
    const sendPostRequest = (urn, data) => {
        return fetch(urn, {
            method: 'POST',
            body: data
        });
    };


    /**
     * Возвращает [
     *  количество пустых полей,
     *  массив с пустыми полями
     * ]
     * @param requiredFields
     */
    const checkFormFields = requiredFields => {
        const emptyFields = requiredFields.filter(field => field.value.trim());
        const isFilledForm = emptyFields.length === 0;

        return [
            isFilledForm,
            emptyFields
        ];
    };


    /**
     * Отображает ошибки у незаполненных полей
     * @param form
     * @param errorFields
     */
    const showFormErrors = (form, errorFields) => {
        for (let errorField of errorFields) {
            errorField.classList.add('error');
        }

        showFormMessage(form, 'Не заполнены обязательные поля. Помеченные *');
    };


    /**
     * Показывает сообщения у формы
     * @param form
     * @param msg
     * @param isError
     */
    const showFormMessage = (form, msg, isError = true) => {
        const formResultBlock = form.querySelector('.result-data');
        const addClass = isError ? 'error' : 'success';
        const hiddenClass = isError ? 'success' : 'error';

        if (!formResultBlock.classList.contains(addClass)) {
            formResultBlock.classList.add(addClass);
        }

        if (!formResultBlock.classList.contains(hiddenClass)) {
            formResultBlock.classList.remove(hiddenClass);
        }

        formResultBlock.innerText = msg
    };


    /**
     * Обработчик события клика по кнопке отправить форму
     */
    btnSbm.addEventListener('click', e => {
        const pathToSend = "/ajax/form-handler.php";
        const requiredFields = [
            document.querySelector('.form-modal__name'),
            document.querySelector('.form-modal__phone'),
        ];

        e.preventDefault();

        const [isFilledForm, emptyFields] = checkFormFields(requiredFields);

        if (!isFilledForm) {
            showFormErrors(formCalc, emptyFields);
            return;
        }

        const optionsData = getOptionsData();

        sendPostRequest(pathToSend, optionsData)
            .then(responseServer => responseServer.text())
            .then(
                response => {
                    const {result, msg} = response;
                    const isSuccess = result === 'success';
                    showFormMessage(formCalc, msg, isSuccess);
                }
            )
            .catch(error => {
                console.error(error);
                showFormMessage(formCalc, "Возникла ошибка при отправке данных");
            });
    });
});