# DRAG AND DROP #

```html
 <!-- Не забываем атрибут draggable="true" -->
<div id="elem" draggable="true">abcde</div>
<div id="parent"></div>

<!-- СОБЫТИЯ:
    dragstart 	  - начало перетягивания
    drag 		  - в момент перетягивания		
    dragend		  - окончание перетягивания		

    dragenter	  - появление в элементе курсора с перетягиваемым элементом
    dragleave	  - курсор с перетягиваемым элементом покинул элемент
    dragover	  - в момент перетягивания + курсор с перетягиваемым элементом в элементе		 
    drop 		  - отпустили курсор с перетягиваемым элементом в элементе		
-->

<style>
    #elem {
        width: 100px;
        height: 100px;
        border: 1px solid red;
    }

    #parent {
        width: 200px;
        height: 200px;
        border: 1px solid black;
        margin-top: 100px;
    }
</style>

<script>
    let elem = document.getElementById('elem');
    let parent = document.getElementById('parent');
    let img = new Image();
    img.src = 'image.jpg';

    // Функция для перетаскивания элемента:
    elem.ondragstart = ev => { // ev.target - наш элемент
        ev.dataTransfer.setData("id", ev.target.id); // event.dataTransfer - для хранения данных, перетаскиваемых мышью во время операции drag and drop
        ev.dataTransfer.setData("content", ev.target.textContent);
        ev.dataTransfer.setDragImage(img, ev.offsetX, ev.offsetY); // вместо картинки можно указать - ev.target; 2, 3 параметр - местоположение курсора при перетягивании
    }

    // ! Разрешение кинуть элемент, стандартная функция не дает кидать элемент без этого:
    parent.ondragover = ev => {
        ev.preventDefault();
        event.dataTransfer.dropEffect = 'copy'; // меняем курсор, другие значения move (по умолч.)| link | none (событие drop не срабатывает)
    }

    // Функция, когда уже кинули элемент:
    parent.ondrop = function(ev) {
        //Получаем наш элемент по id, когда кидаем:
        let data = ev.dataTransfer.getData("id");
        let elem = document.getElementById(data);

        this.appendChild(elem);

        //Получаем текст элемента и закидываем его в наше поле.
        this.innerHTML = ev.dataTransfer.getData("content");
        this.style.borderColor = "blue";
    }
</script>
```

### Перемещение элемента по окну браузера/в элемент

```html
<div id="elem" draggable="true">abcde</div>
<div id="parent"></div>

<style>
    #elem {
        width: 100px;
        height: 100px;
        border: 1px solid red;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    #parent {
        width: 200px;
        height: 200px;
        border: 1px solid black;
        margin-top: 100px;
        position: relative;
    }
</style>    

<script>
    let elem = document.getElementById('elem');
    let parent = document.getElementById('parent');
    let offsetX;
    let offsetY;

    // ! Разрешение кинуть элемент, стандартная функция не дает кидать элемент без этого:
    parent.ondragover = ev => {
        ev.preventDefault();
    }

    // окончание перетягивания:
    elem.dragend = event => {
        elem.style.top = (event.pageY - offsetY) + 'px'; // event.pageY - координаты перемещаемого элемента по оси Y
        elem.style.let = (event.pageX - offsetX) + 'px'; // event.pageX - координаты перемещаемого элемента по оси X
    }

    // отпустили курсор с перетягиваемым элементом в элементе:
    parent.ondrop = function(ev) { // Перемещение элемента в другой элемент
        this.appendChild(elem);
    }
</script> 
```

### Перетягивание блока с элементами в другой блок

```html
<div id="panel">
    <div class="elem" draggable="true">
        1 блок
    </div>
    <div class="elem" draggable="true">
        2 блок
    </div>		
    <div class="elem" draggable="true">
        3 блок
    </div>		
</div>	

<style>
    #panel {
        width: 300px;
        height: 100px;
        border: 1px solid green;

        display: flex;
        align-items: center;
    }

    #elem {
        width: 50px;
        height: 50px;
        border: 1px solid red;

        position: absolute;
        margin-left: 10px;	
    }

    #parent {
        display: flex;
        flex-wrap: wrap;
        width: 200px;
        height: 200px;
        border: 1px solid black;
        margin-top: 100px;
    }
</style>  

<script>
    let elems = document.getElementById('elem');
    let parent = document.getElementById('parent');
    let current;

    elems.forEach(function (elem, index) {
        elem.ondragstart = function (event) {
            // #1 
            current = this; // в current сохраняем ссылку на перетаскиваемый элемент

            // #2
            event.dataTransfer.setData('index', index); // event.dataTransfer - для хранения данных, перетаскиваемых мышью во время операции drag and drop
        }	
    });

    parent.ondragover = function (ev) {
        ev.preventDefault();
    }

    parent.ondrop = function (ev) { // без current не сможем определить какой элемент перетянули
        // #1:	
        this.appendChild(current);

        // #2:
        let index = event.dataTransfer.getData('index'); // получаем данные по ключу        		
        this.appendChild(elems[index]);
    }
</script>  
```

