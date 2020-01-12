// #@ Табы: @#
/**
<div class="container">
    <ul class="acco">
        <li class="acco__item">
            <a href="#" class="acco__triger">
                Пункт 1
            </a>
            <div class="acco__content">
                    <div class="acco__content-text">
                        TEXT TEXT TEXT
                    </div>
            </div>
        </li>
        <li class="acco__item">
            <a href="#" class="acco__triger">
                Пункт 2
            </a>
            <div class="acco__content">
                <div class="acco__content-text">
                    TEXT TEXT TEXT
                </div>
            </div>
        </li>
        <li class="acco__item">
            <a href="#" class="acco__triger">
                Пункт 3
            </a>
            <div class="acco__content">
                <div class="acco__content-text">
                    TEXT TEXT TEXT
                </div>
            </div>
        </li>
    </ul>
</div>

<style>
    ...
    .acco__content {
        height: 0;
        overflow: hidden;
        transition: height .3s;
    }
</style>
 */


const items = document.querySelectorAll('.acco_item');

for (let item of items) {
	item.addEventListener('click', e => handleAccoOpening);
}

function handleAccoOpening(e) {
	const curItem = e.currentTarget; // ссылается на элемент, на который повесили обработчик
	// e.target - фактический элемент, на котором сработало событие
	const isClosedItem = curItem.classList.contains('active');
	
	if (isClosedItem) {
		closeItemsAndRemoveActive(items);
	} else {
		closeItemsAndRemoveActive(items);
		openItem(curItem)
	}
}

function closeItemsAndRemoveActive(items) {
	Array.from(items).forEach(elem => {
		elem.classList.remove('active');
		elem.querySelector('acco__content').style.height = 0;
	});
}

function openItem(item) {
	const content = item.querySelector('.acco__content');
	const textBlock = content.firstElementChild; // первый потомок
	const reqHeight = textBlock.getBoundingClientRect().height; // getBoundingClientRect - размер элемента + его позиция отн. окна
	
	item.classList.add('active');
	content.style.height = `${reqHeight}px`;
}




// @ Cлайдер:
/**
<div class="container">
    <div class="slider-container">
        <a href="#" class="arrow" id="left"><-</a>
        <div class="slider">
            <div class="items" id="items">
                <div class="item">1</div>
                <div class="item">2</div>
                <div class="item">3</div>
            </div>
        </div>
    </div>
    <a href="#" class="arrow" id="right">-></a>
</div>
 */

const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const item = document.querySelector('#items');
const step = items.firstElementChild.getBoundingClientRect().width;
const slidesInView = 3;
const maxRight = (items.children.length - slidesInView) * step;
const minRight = 0;
let currentRight = 0;

rightBtn.addEventListener('click', e => {
	if (currentRight < maxRight) {
		currentRight += step;
		item.style.right = `${currentRight}px`;
	} else { // зацикливаем
		currentRight = 0;
		items.style.right = 0;
	}
});

leftBtn.addEventListener('click', e => {
	if (currentRight > minRight) {
		currentRight -= step;
		item.style.right = `${currentRight}px`;
	} else { // зацикливаем
		currentRight = maxRight;
		items.style.right = maxRight + 'px';
	}
});




// @ Модальное окно:
/**
<button id="showModal">Show Modal</button>

<script type="template" id="#modal">
    <div class="overlay">
        <div class="popup__container">
            <a href="#" class="popup__close"></a>
            <div class="popup__content">
                <h1>Header</h1>
            </div>
        </div>
    </div>
</script>
 */

const button = document.querySelector('#showModal');
const template = document.querySelector('#modal-template').innerHTML;
const modal = createModal();

button.addEventListener('click', e => {
	modal.setContent('Hello world');
	modal.open();
	
	setTimeout(() => {
		modal.close();
	}, 3000);
});

function createModal() {
	const container = document.createElement('div');
	container.className = 'popup';
	container.innerHTML = template;
	
	const contentBlock = container.querySelector('.popup__content');
	
	const closeBtn = container.querySelector('.popup__close');
	
	closeBtn.addEventListener('click', e => {
		document.body.removeChild(container);
	});
	
	const overlay = container.querySelector('.overlay');
	
	overlay.addEventListener('click', e => {
		if (e.target === overlay) {
			closeBtn.click();
		}
	});
	
	return {
		open() {
			document.body.appendChild(container);
		},
		close() {
			closeBtn.click();
		},
		setContent(content) {
			contentBlock.innerHTML = content;
		}
	};
}