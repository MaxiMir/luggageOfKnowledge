/*@@@
Дан список слов неограниченной длины. Необходимо максимально быстрым способом найти количество анаграмм этого
слова. 
Пример: слово - "лото".
Список: "тест", "цифра", "отол", "оолт", "кекс" . Результат - 2.
*/

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
const app = {
    rating: null,
    getSavedRating: function() {
        return this.rating;
    },
    checkOnSelectedRating: function() {
        return this.rating !== null;
    },
    saveRating: function(starNum) {
        this.rating = starNum;
    },
    setRating: function(starNum) {
        const emptyStarClass = 'star-empty user-rating__star';
        const activeStarClass = 'star-voted user-rating__star';
        const isSelectedRating = this.checkOnSelectedRating();

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

    app.setRating(starNum);

    if (isMouseEnter) {
        return;
    }

    if (isDisplayedError) {
        hideRatingError();
    }

    app.saveRating(starNum);
});


starsElementsBlock.on('mouseleave', () => {
    const savedRating = app.getSavedRating();

    app.setRating(savedRating);
});


formForumResponse.on('submit', () => {
    const rating = app.getSavedRating();
    const isSelectedRating = app.checkOnSelectedRating();

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
            rating
        },
        success: () => {},
        error: () => {
            alert('По техническим причинам сообщение не было отправлено.');
        }
    });
});