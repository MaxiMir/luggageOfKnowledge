/*@@@
Дан список слов неограниченной длины. Необходимо максимально быстрым способом найти количество анаграмм этого
слова. Пример: слово - "лото".
Список: "тест", "цифра", "отол", "оолт", "кекс" . Результат - 2.
*/

const getCountAnagram = (data, origStr) => {
    let counter = 0;

    if (data.length > 0 && origStr.length > 0) {
        const sOrigStr = [...origStr].sort().join();

        data.forEach(function(currStr) {
            if (typeof currStr !== 'string') {
                console.log('Ошибка, элемент не строка');
            } else if (origStr.length === currStr.length) {
                const sCurrStr = [...currStr].sort().join();

                if (sCurrStr === sOrigStr) counter++;
            }
        });
    }

    return counter;
};


//@@@ Динамическая вставка в селекты:
const getURN = () => $(location).attr('pathname');

const generateSelects = () => {
    const curURN = getURN();
    const nameData = {
        '/some_URN1/': {
            'title': 'name_1',
            'name1' : ['val1', 'val2', 'val3'],
            'name2' : ['val5', 'val6', 'val7'],
        },
        '/some_URN2/': {
            'title': 'name_2',
            'name1' : ['val11', 'val12', 'val13'],
            'name2' : ['val15', 'val16', 'val17'],
        },
    };

    const generateSelect = (obj) => {
        let service;

        $.each(obj, function (name, data) {
            if (name === 'title') {
                service = data;
            } else {
                const currSelect = $('#' + name + ' .class_item');

                if (currSelect.length > 0) {
                    currSelect.prepend($('<optgroup>', { label: service }));
                    optGroup = currSelect.find(`[label="${service}"]`);

                    const htmlOptions = data.map(function (option) {
                        return '<option value="' + option + '">' + option + '</option>';
                    }).join('\n');

                    optGroup.prepend(htmlOptions);
                }
            }
        });
    };

    if (curUrl in nameData) {
        generateSelect(nameData[curUrl]);
    } else if (curUrl === '/') {
        $.each(nameData, function (url, obj) {
            generateSelect(obj);
        });
    }
};



/* #@@@ Анимация у счетчиков при скролле до элемента @@@#*/
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
                {   
                    Counter: countText 
                },
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


/* #@@@ Lazy Load + подзагрузка товаров @@@#*/
$(() => {
    const imgCollection = $('.lazy');
    const isMainPage = window.location.pathname === '/';
    const loadProducts = $('#loadProducts');
 
 
    // @@@ Lazy Load @@@:
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
 
 
 
    // @@@ Подзагрузка товаров @@@:
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
 
 