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