# JS: Redux (React) #
Redux — это официальный способ управлять состоянием в нетривиальных React приложениях. 

Несмотря на свою простоту и элегантность, он требует время на вникание. 

Кроме того, вокруг Redux огромная экосистема библиотек, автоматизирующих разные задачи.

#### Введение ####

Несмотря на всю мощь реакта, с ростом приложения довольно быстро появляются некоторые неудобства. Одно из самых раздражающих — подъем состояния наверх через коллбеки, которые нужно прокидывать в самый низ с того самого верхнего уровня. 

Прокидывать приходится не только коллбеки, но и любые данные. 

Получается, что множество промежуточных компонентов выступают в качестве прокси, то есть пропускают сквозь себя данные, которыми не пользуются. Второе — рендеринг и логика мешаются в одном месте, быстро раздувая компоненты и усложняя их понимание. Сюда добавляются неконтролируемые побочные эффекты вперемешку с обновлением данных.

Для решения в том числе этих проблем разработчики фейсбука придумали архитектуру Flux:

Flux архитектура вводит ряд новых понятий, таких как:

> Stores — хранилища, место, в которое загружаются данные и в котором они обновляются. Хотя во Flux хранилища мутабельные, взаимодействовать с внешним миром внутри них нельзя. Никаких AJAX запросов, взаимодействия с DOM и подобных вещей. Менять данные напрямую тоже не получится, только посредством действий. Как видите, во Flux архитектуре менеджмент состояния приложения был вынесен наружу.

> Actions — действия с помощью Dispatcher передаются в хранилища, которые на основе типа действия и данных, пришедших с ним, сами себя обновляют.

> Dispatcher — раскидывает действия по хранилищам.

Flux архитектура позволила разгрузить React и ввела недостающие абстракции. В свое время появилось множество различных реализаций этой архитектуры. Одна из них была официальная и десяток неофициальных.

С тех пор утекло много воды и мир шагнул вперед.

В 2015 году Dan Abramov создал библиотеку под названием Redux, заимствовав идеи из Flux и функционального языка Elm.

Сама по себе Redux очень простая библиотека, предназначенная исключительно для менеджемента состояния. 

Она хоть и была разработана для использования в реакте, но от него не зависит и может использоваться с чем угодно. Для ее связи с реактом понадобится библиотека react-redux, с помощью которой производится необходимая интеграция. В итоге получается структура, крайне напоминающая Flux архитектуру, но со значительными упрощениями и улучшениями.

Кроме тех преимуществ, которые дает Flux, Redux привносит еще кое-что:

> Time traveling. Возможность путешествовать по изменению состояния назад и вперед. Очень полезно при отладке, всегда можно отмотать (это не фигуральное выражение, а действительность) назад.

> Удобная отладка и визуализация. Посредством Middlewares, Redux расширяется инструментарием, который предоставляет крайне удобные средства для отладки и визуализации происходящих внутри процессов. С ними мы познакомимся в ближайшее время, чтобы сразу начать использовать всю мощь Redux.

> Благодаря стандартизации работы с состоянием, которую привнес Redux, стало возможным автоматизировать практически все аспекты работы в React. Работа с формами, роутинг, асинхронность, история и многое другое.

Библиотеки:
reselect.
redux-actions.
redux-forms.
redux-thunk.

По ходу курса мы создадим приложение для работы с задачами и в конце интегрируем его с бекендом.


#### Redux ####

Redux - Predictable state container for JavaScript apps

Redux маленькая и простая библиотека.

Redux - это такая база данных в памяти. Она хранит внутри себя состояние приложения, аналогично тому, как React хранит состояние внутри себя. Ключевых отличия два:

> Redux, с точки зрения кода, это объект внутри которого находится состояние приложения. Он, как правило, один на все приложение, независимо от используемого фреймворка для UI.

> Обновление состояния внутри Redux выполняется не прямым изменением данных (как в React: $this->setState({ key: 'value' })), а через указание "действий". Сам же способ обновления данных описывается внутри объекта Redux.

Пример использования Redux:

```js
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(reducer);
```

По шагам:

> 1. Импортируется функция createStore, которая создает контейнер. Контейнер это и есть наша база данных.

> 2. Далее определяется reducer. Функция, которая принимает на вход state и action. На выходе из функции возвращается новый state. Именно из-за сходства работы этой функции с тем как работает reduce, она имеет название reducer.

> 3. Редьюсер передается в функцию createStore и на выходе мы имеем готовый к использованию контейнер.

* Во время вызова createStore(reducer), происходит вызов самого редьюсера. Вызов выглядит так:

* Благодаря тому, что первым параметром передается undefined, внутри редьюсера значение state
становится равно своему дефолтному значению, то есть 0

* Затем, внутри switch, отрабатывает default ветка, которая возвращает этот state наружу `reducer(undefined, { type: '@@INIT' }); // 0`

* Результат этого вызова запоминается внутри store и считается начальным состоянием. Все дальнейшие изменения идут относительно него.

Теперь использование:

* Функция `subscribe` является частью реализации паттерна Observer.
* Каждый её вызов добавляет в список наблюдателей новую функцию.
* Затем, как только меняются данные в хранилище, вызываются по очереди все наблюдатели.

```js
store.subscribe(() =>
    console.log(store.getState());
);

// Для избежания дублирования и повышения уровня абстракции, вынесем действия в функции
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });

store.dispatch(increment()); // => 1
store.dispatch(increment()); // => 2
store.dispatch(decrement()); // => 1
```

Единственный способ произвести изменения состояния в хранилище — это передать/отправить действие (action) в функцию dispatch. Действие — обычный JS-объект, в котором присутствует минимум одно свойство — type. 

Никаких ограничений на содержимое этого свойства не накладывается, главное, чтобы внутри контейнера был подходящий ему обработчик.

Получается, что сам процесс изменения состояния, описан внутри контейнера, а снаружи мы лишь говорим, какое изменение необходимо выполнить. Этот подход резко отличается от того, как мы делали в React, где чтение состояния и его обновление находится снаружи.

Посмотрим ещё один пример с использованием массива и передачей данных через действие:

```js
// payload - свойство внутри которого хранятся данные
const addUser = (user) => ({ type: 'USER_ADD', payload: { user } });

const reducer = (state = [], action) => { // инициализация состояния
    switch (action.type) {
        case 'USER_ADD': {
            const user = action.payload.user; // данные
            return [...state, user]; // Immutability
        }
        case 'USER_REMOVE': {
            const id = action.payload.id; // данные
            return state.filter(u => u.id !== id); // Immutability
        }
        default:
            return state;
    }
};

const user = /* ... */;
store.dispatch(addUser(user));
```

Несмотря на то, что ключ payload необязательный и можно все данные складывать прямо в само действие, я крайне рекомендую так не делать. 

Мешать в одном объекте статически заданные ключи с динамическими плохая идея. Кроме того, в будущем мы будем использовать библиотеки, которые требуют именно такого способа работы.

#### Устройство Redux ####

Для написания самой простой версии Redux, нужно всего 7 строчек. Вот они:

```js
const createStore = (reducer, initialState) => {
    let state = initialState;

    return {
        dispatch: action => { 
          state = reducer(state, action) 
        },
        getState: () => state,
    }
}
```


#### Три принципа ####

Подведем итог. Что главное в redux:

> Single source of truth — используя Redux, мы работаем только с одним контейнером на приложение. Это одно из ключевых отличий от Flux-архитектуры. Всё состояние в одном месте.

> State is read-only — данные меняются только косвенно, используя функциональный стиль.

> Changes are made with pure functions — внутри хранилища можно использовать только чистые функции. Тут правила даже строже чем во Flux, так как не позволяется использовать даже Date.now() и ему подобные функции, которые хотя и не обладают побочными эффектами, но все же являются недетерминированными. Все подобные вызовы должны делаться до вызова dispatch (подробнее об этом далее).

**Начальное состояние**

Я говорил про то, что начальное состояние задается в определении редьюсера:
`const reducer = (state = 0, action) { /* ... */ }`

Но часто этого недостаточно. Данные могут прийти из бэкенда и их нужно прогрузить в контейнер перед началом работы. Для этого случая в Redux есть особый путь:

```js
const store = createStore(reducer, initState);` // @@redux/INIT
```

Redux посылает специальный Action, который нельзя перехватывать. Если редьюсер реализован правильно и содержит default секцию в switch, то контейнер заполнится данными из initState. Пример:

```js
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(reducer, 100);
```

В коде выше, функция createStore вызовет редьюсер так: reducer(100, '@@redux/INIT'). Затем выполнится ветка default и состоянием контейнера станет число 100.

#### ЗАДАЧА №№№
store.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход начальное состояние, а возвращает store. Store должен обрабатывать действия перечисленные в actions.js.

Структура состояния в store: { [task.id]: task, [task2.id]: task2 }.

Подсказки
Обязательно изучите файл actions.js и тесты. Отследите весь путь движения данных.
Для удаления из объекта воспользуйтесь функцией omit, взятой из библиотеки lodash.

```js
// FILE: /app/store.js:
import { omit } from 'lodash';
import { createStore } from 'redux';

const tasks = (state = {}, action) => {
    switch (action.type) {
        case 'TASK_ADD': {
            const { task } = action.payload;
            
            return { ...state, [task.id]: task };
        }
        case 'TASK_REMOVE': {
            const { id } = action.payload;
            
            return omit(state, id);
        }
        default:
            return state;
    }
};

export default initState => createStore(tasks, initState);


// FILE: /app/actions.js:
export const addTask = task => ({
    type: 'TASK_ADD',
    payload: {
        task,
    },
});

export const removeTask = id => ({
    type: 'TASK_REMOVE',
    payload: {
        id,
    },
});


// FILE: /app/__tests__/test.js:
import generateStore from '../store';
import { addTask, removeTask } from '../actions';


test('Store 1', () => {
    const store = generateStore();
    
    store.dispatch({ type: 'unknown' });
    expect(store.getState()).toEqual({});
});

test('Store 2', () => {
    const task0 = { id: 0 };
    const store = generateStore({ [task0.id]: task0 });
    
    store.dispatch({ type: 'unknown' });
    expect(store.getState()).toEqual({ [task0.id]: task0 });

    const task1 = { id: 1 };
    store.dispatch(addTask(task1));
    expect(store.getState()).toEqual({ [task0.id]: task0, [task1.id]: task1 });

    const task2 = { id: 2 };
    store.dispatch(addTask(task2));
    expect(store.getState()).toEqual({ [task0.id]: task0, [task1.id]: task1, [task2.id]: task2 });

    const task3 = { id: 3 };
    store.dispatch(addTask(task3));
    const result = {
        [task0.id]: task0,
        [task1.id]: task1,
        [task2.id]: task2,
        [task3.id]: task3,
    };
    expect(store.getState()).toEqual(result);

    store.dispatch(removeTask(2));
    expect(store.getState()).toEqual({ [task0.id]: task0, [task1.id]: task1, [task3.id]: task3 });

    store.dispatch(removeTask(10));
    expect(store.getState()).toEqual({ [task0.id]: task0, [task1.id]: task1, [task3.id]: task3 });

    store.dispatch(removeTask(3));
    expect(store.getState()).toEqual({ [task0.id]: task0, [task1.id]: task1 });

    store.dispatch({ type: 'TASK_REMOVE', payload: { id: 1 } });
    expect(store.getState()).toEqual({ [task0.id]: task0 });

    store.dispatch({ type: 'TASK_REMOVE', payload: { id: 0 } });
    expect(store.getState()).toEqual({});
});
```


#### Reducers ####

Все, что хранится в контейнере, мы называем состоянием, но не все состояния одинаково полезны. Вот какую классификацию вводит документация Redux:

> Domain data — данные приложения, которые нужно отображать, использовать и модифицировать. Например, список пользователей, загруженный с сервера.

> App state — данные, определяющие поведение приложения. Например, текущий открытый URL.

> UI state — данные, определяющие то, как выглядит UI. Например, вывод списка в плиточном виде.

Так как контейнер представляет собой ядро приложения, данные внутри него, должны описываться в терминах domain data и app state, но не как дерево компонентов UI. Например, такой способ формирования состояния state.leftPane.todoList.todos — плохая идея. Крайне редко дерево компонентов отражается напрямую на структуру состояния, и это нормально. Представление зависит от данных, а не данные от представления.

Типичная структура состояния выглядит так:
```javascript
{
    domainData1 : {}, // todos
    domainData2 : {}, // comments
    appState1 : {},
    appState2 : {},
    uiState1 : {},
    uiState2 : {},
}
```

Подробнее про работу с состоянием UI будет рассказано в соответствующем уроке.

Как уже говорилось в курсе "JS: React", структура состояния должна напоминать базу данных. Все максимально плоско и нормализованно.

```javascript
{
    todos: [
        { id: 1, name: 'why?' },
        { id: 3, name: 'who?' },
    ],
    comments: [
      { id: 23, todoId: 3, text: 'great!' },
    ],
}
```

С такой структурой крайне легко писать реакцию на действия, обновлять данные, добавлять новые и удалять старые. Вложенность небольшая, всё просто. Но появляется другая проблема (появляется она в любом случае). С ростом количества сущностей, редьюсер становится очень тяжёлым. Огромный кусок кода, который делает всё.

Redux имеет встроенный механизм, позволяющий создавать множественные редьюсеры и комбинировать их друг с другом. Работает это так: для каждого свойства верхнего уровня пишется свой собственный редьюсер, а затем они с помощью функции combineReducers объединяются в корневой (root) редьюсер, который уже используется для создания контейнера.

```javascript
import { combineReducers, createStore } from 'redux';

const todos = (state = {}, action) => {
    // state is todos part
};

const comments = (state = {}, action) => {
    // state is comments
};

const rootReducer = combineReducers({ todos, comments });
const store = createStore(rootReducer);
```

Обратите внимание на то, что если редьюсер именовать так же, как и свойство, то можно написать так: { todos, comments }. В каждый редьюсер приходит state, но это не всё состояние контейнера, а только та часть, которая лежит в соответствующем свойстве. Не забудьте про это.

Редьюсеры могут быть даже вложенными и для этого не нужны никакие специальные средства, обычные функции, принимающие на вход данные и возвращающие новые данные.

С таким подходом появляется одна особенность, которая, по началу, может испугать. Так как каждый редьюсер имеет доступ только к своей части состояния, действия, порождающие изменения сразу в нескольких местах, будут повторяться в разных редьюсерах:

```javascript
const todos = (state = {}, action) => {
    switch (action.type) {
        case 'TODO_REMOVE':
        // ...
    }
};

const comments = (state = {}, action) => {
    switch (action.type) {
        // При удалении ToDo нужно удалить все его комментарии
        case 'TODO_REMOVE':
        // ...
    }
};
```

То есть правильный подход состоит в том, чтобы повторять case часть в нужных редьюсерах, а не в том, чтобы пытаться получить недостающие части состояния.

#### Дополнительные материалы #####

Normalizing State Shape https://redux.js.org/recipes/structuringreducers/normalizingstateshape

#### ЗАДАЧА ####

reducers.js
Реализуйте в Store следующую структуру состояния:
```javascript
{
    comments: {
        1: { id: 1, taskId: 1, body: 'comment 1' },
        2: { id: 2, taskId: 1, body: 'comment 2' },
        5: { id: 5, taskId: 2, body: 'another comment' },
    },
    tasks: {
        1: { id: 1, name: 'first task' },
        2: { id: 2, name: 'second task' },
    },
}
``` 

Store должен уметь обрабатывать перечисленные в файле actions.js действия.

```javascript
// FILE: /app/actions.js:
export const addTask = task => ({
    type: 'TASK_ADD',
    payload: {
        task,
    },
});

export const removeTask = id => ({
    type: 'TASK_REMOVE',
    payload: {
        id,
    },
});

export const addTaskComment = comment => ({
    type: 'TASK_COMMENT_ADD',
    payload: {
        comment,
    },
});

export const removeTaskComment = id => ({
    type: 'TASK_COMMENT_REMOVE',
    payload: {
        id,
    },
});


// FILE /app/reducers.js:
import _ from 'lodash';
import { combineReducers } from 'redux';

const comments = (state = {}, action) => {
    switch (action.type) {
        case 'TASK_COMMENT_ADD': {
            const { comment } = action.payload;
            return { ...state, [comment.id]: comment };
        }
        case 'TASK_COMMENT_REMOVE': {
            return _.omit(state, action.payload.id);
        }
        case 'TASK_REMOVE': {
            const { id } = action.payload;
            return _.omitBy(state, c => c.taskId === id);
        }
        default:
            return state;
    }
};

const tasks = (state = {}, action) => {
    switch (action.type) {
        case 'TASK_ADD': {
            const { task } = action.payload;
            return { ...state, [task.id]: task };
        }
        case 'TASK_REMOVE': {
            const { id } = action.payload;
            return _.omit(state, id);
        }
        default:
            return state;
    }
};

export default combineReducers({
    comments,
    tasks,
});
```

#### Ручная интеграция с React ####

Внедрение Redux в приложение, делает его центральной, корневой частью всего приложения. Причём не имеет значения, используем мы React или нет. Структура контейнера и принцип работы с ним останется неизменным в любой ситуации. Общая схема работы приложения становится такой:

1. Возникает событие. Например, пользователь кликнул по кнопке.
2. Обработчик события выполняет какую-то логику и в конце обновляет контейнер через store.dispatch.
3. Контейнер по очереди вызывает все функции, добавленные через store.subscribe. Эти функции меняют представление на основе нового состояния внутри контейнера. И так по кругу: Событие -> Изменение состояния -> Отрисовка нового состояния.

Реализуем эту логику в связке с React. Для примера возьмём простой компонент счётчик с одной кнопкой, которая отображает текущее количество кликов. Связку с React сделаем в ручном режиме без использования готовой библиотеки. Тогда процесс работы не покажется магическим. Начнём с контейнера:

```javascript
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
};

const store = createStore(reducer);
```

Контейнер ничего не знает про существование DOM, его задача - хранить данные и модифицировать их. Эта мысль очень важна, её нужно прочувствовать. Воспринимайте контейнер как базу данных.

Следующим шагом сделаем компонент в React. Вторая важная мысль, раз мы начинаем использовать внешнее хранилище для данных, то внутренний setState нам больше не нужен. Компоненты получают все необходимые данные через пропсы (props).

В будущих уроках мы рассмотрим ситуации, когда внутреннее управление состоянием всё ещё требуется, несмотря на использование Redux

```jsx
import React from 'react';

export default class Increment extends React.Component {
    static defaultProps = {
        count: 0,
    };

    render() {
        const { count } = this.props;

        return (
            <div>
              <button>{count}</button>
            </div>
        )
    }
}
```
Компонент Increment работает с пропом count. Его имя выбрано произвольно, нам не нужно опираться на структуру контейнера.

Теперь добавим обработчики. Напомню, что каждый обработчик в конце своей работы должен обновить состояние контейнера. С технической точки зрения произойдёт вызов функции store.dispatch и нужного действия. Откуда нам их взять внутри компонента? Всё просто, мы их прокинем как свойства в наш компонент.


```jsx
import React from 'react';

export default class Increment extends React.Component {
    handleClick = (e) => {
        const { dispatch, increment } = this.props;
        dispatch(increment());
    }

    render() {
        const { count } = this.props;

        return (
            <div>
              <button onClick={this.handleClick}>{count}</button>
            </div>
      )
    }
}
```

Остался последний шаг: нужно вызывать перерисовку компонента после изменения содержимого контейнера. В этом нам поможет функция store.subscribe:
````jsx
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

// Импортируем компонент
import Increment from './components/Increment';
// Импортируем редьюсеры
import reducers from './reducers';

// Создаём контейнер. редьюсеры описаны в отдельном файле
const store = createStore(reducers);

// Создаём действие и оборачиваем его в функцию
export const increment = () => ({
    type: 'INCREMENT',
    payload: {},
});

// Элемент для подключения React
const containerElement = document.getElementById('container');

// Подписываемся на изменения состояния внутри контейнера
// На каждое изменение отрисовываем наш компонент заново
store.subscribe(() => {
    const state = store.getState();
    ReactDOM.render(
      <Increment dispatch={store.dispatch} increment={increment} count={state} />,
      containerElement,
    );
});

// Первый раз нужно отрисовать руками
ReactDOM.render(
  <Increment dispatch={store.dispatch} increment={increment} />,
  containerElement,
);
````

Когда все необходимые объекты созданы, происходит первоначальная отрисовка компонента в DOM. В компонент передаются необходимые данные, в нашем случае функция store.dispatch и функция increment. Последняя создаёт действие при своём вызове. Дальше начинает работать последовательность шагов, описанная в начале урока:

1. Пользователь нажимает на кнопку
2. Срабатывает обработчик handleClick, который вызывает dispatch(increment()).
3. Выполняется редьюсер и его ветка INCREMENT. Она увеличивает счетчик на единицу.
4. Контейнер вызывает функции добавленные через subscribe. В нашем случае это одна функция.
5. Эта функция извлекает состояние из контейнера через функцию store.getState.
6. Затем эта же функция перерисовывает компонент в DOM передавая ей новое состояние.

На каждом этапе этого процесса можно вносить различные изменения. Например, нам может понадобится передавать несколько функций создающих действия. Достаточно просто их передать. Некоторые из этих функций могут принимать данные, которые store.dispatch передаст внутрь контейнера:

```jsx
export const increment = (step = 1) => ({
    type: 'INCREMENT',
    payload: { step },
});

// Такой инкремент позволяет менять шаг приращения. Внутри контейнера код поменяется на такой:

case 'INCREMENT':
return state + action.payload.step;

// Само состояние внутри контейнера может стать структурой, например объектом.
```


#### ЗАДАЧА ####
src/components/App.jsx
Реализуйте компонент, который показывает форму и хранит ее состояние в Redux. Форма состоит из двух элементов: текстового поля и кнопки "сброс". При вводе текста, он отображается под полем ввода. Если нажать на сброс, то текст очищается.

Интерфейс компонента:
```jsx
<App dispatch={store.dispatch} text="text from store" {...actionCreators} />
```
Начальное состояние:
````html
<div>
  <form>
    <input type="text" value="">
    <button type="button">Reset</button>
  </form>
</div>
````
После ввода текста:
````html
<div>
    <form>
      <input type="text" value="hello">
      <button type="button">Reset</button>
    </form>
    <div>hello</div>
</div>
````

src/index.jsx
Реализуйте интеграцию контейнера с реактом.

src/reducers.js
Добавьте необходимый редьюсер.

src/actions.js
Добавьте необходимые действия.

```jsx
// FILE: /app/src/actions.js:
export const updateText = text => ({
    type: 'TEXT_UPDATE',
    payload: {
        text,
    },
});

export const resetText = () => ({
    type: 'TEXT_RESET',
    payload: {},
});


// FILE: /app/src/components/App.jsx:
import React from 'react';

export default class App extends React.Component {
    static defaultProps = {
        text: '',
    };

    handleChange = (e) => {
        e.preventDefault();
        const { dispatch, updateText } = this.props;
        dispatch(updateText(e.target.value));
    }

    handleReset = (e) => {
        e.preventDefault();
        const { dispatch, resetText } = this.props;
        dispatch(resetText());
    }

    render() {
        const { text } = this.props;

        return (
            <div>
              <form>
                <input type="text" value={text} onChange={this.handleChange} />
                <button type="button" onClick={this.handleReset}>Reset</button>
              </form>
              {text && <div>{text}</div>}
            </div>
        );
    }
}

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';
import * as actionCreators from './actions';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const render = (text) => {
    ReactDOM.render(
      <App dispatch={store.dispatch} text={text} {...actionCreators} />,
      document.getElementById('container'),
    );
};

store.subscribe(() => {
    const { text } = store.getState();
    render(text);
});

render();

// FILE: /app/src/reducers.js:
import { combineReducers } from 'redux';

const text = (state = '', action) => {
    switch (action.type) {
        case 'TEXT_UPDATE': {
            return action.payload.text;
        }
        case 'TEXT_RESET': {
            return '';
        }
        default:
            return state;
    }
};

export default combineReducers({
    text,
});
```


#### Middlewares ####

**Мидлвары** (middlewares) относятся к продвинутым техникам использования Redux. В данном уроке мы посмотрим на них не с точки зрения написания, а исключительно с точки зрения использования. Нам они потребуются для подключения различных библиотек буквально с первого момента использования совместно с React.

Мидлвары — функции, которые последовательно вызываются в процессе обновления контейнера.

Общий принцип работы таков:

1. Мидлвары встраиваются в хранилище при его создании.
2. Во время диспатчинга (отправки действий) данные проходят через них и только затем попадают в редьюсер.

Такая организация библиотеки позволяет её крайне легко расширять новой функциональностью без необходимости переписывать исходный код Redux под конкретную задачу.

Типичные примеры использования включают:

- Логирование.
- Оповещение об ошибках.
- Работа с асинхронным API.
- Маршрутизация.

Посмотрим как их подключить:

```jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    /* preloadedState, */
    applyMiddleware(thunk)
)
```

thunk — это мидлвар, но перед тем как передать его в функцию `createStore`, нужно применить к нему функцию `applyMiddleware`. 

Также обратите внимание на то, что мидлвар мы передаём вторым параметром, хотя в предыдущем уроке вторым параметром шёл `initState`. Объясняется это просто — функция createStore проверяет тип второго параметра и в зависимости от этого понимает, что перед ней. В общем случае она принимает три параметра: редьюсер, начальное состояние и мидлвары.

В случае если мидлвар несколько, придётся воспользоваться ещё одной функцией:

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
    reducer,
    /* preloadedState, */
    compose(
        applyMiddleware(thunk),
        applyMiddleware(logger)
    ),
)
```

В такой ситуации в контейнер передается результат функции `compose`.
Последняя, в свою очередь, принимает на вход мидлвары.

Теперь мы подобрались к главному. 
Для редакса написано специальное браузерное расширение Redux DevTools. 
Установите его в свой браузер.

```javascript
// Ниже код подключения этого экстеншена к хранилищу:
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(
    reducer,
    /* preloadedState, */
    reduxDevtools && reduxDevtools(),
);
```
Обратите внимание на то, что он не требует использования функции `applyMiddleware`.
В будущих уроках вам не придется подключать его руками. 
Мы уже сделали это за вас. Все что нужно — установить расширение и не забывать туда смотреть. Это ваш главный помощник в отладке на протяжении всего курса.

# Дополнительные материалы
Официальная документация ReduxDevTools https://github.com/zalmoxisus/redux-devtools-extension

#### React Redux ####

Переходим к самой ожидаемой части — интеграции редакса с реактом. 
Сразу скажу, что дело это не простое и не всегда понятное. 
Поэтому действовать будем по следующей схеме: я покажу пошагово как скрестить ежа с ужом без погружения в детали, а в дальнейших уроках мы разберемся что да как.

Команда Redux создала библиотеку react-redux https://react-redux.js.org/introduction/quick-start, которая значительно упрощает привязку Redux к React. Далее мы пройдём все этапы по её подключению к React-проекту.

Редьюсеры и действия в этом руководстве не описываются. Их структура не зависит от того, с чем интегрируется Redux.

**Провайдер**

Провайдер — React-компонент, который делает Redux-контейнер доступным для всего приложения. Он находится на верхнем уровне JSX и "оборачивает" в себя все остальные компоненты.

```jsx
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // импорт компонента!
import TasksBox from './components/TasksBox';
import reducers from './reducers'

// Контейнер передается в провайдер
const store = createStore(reducers);

render(
    <Provider store={store}>
      <TasksBox />
    </Provider>,
    document.getElementById('container')
);

```

Провайдер кроме прочего, выполняет подписку через store.subscribe. 
Это значит, что больше не придётся беспокоиться об обновлении приложения при изменении данных внутри контейнера.


**connect**

Пакет react-redux предоставляет функцию connect. Она связывает данные из контейнера со свойствами конкретного компонента.

```jsx
// components/TasksBox.jsx
import React from 'react';
import { connect } from 'react-redux';

class TasksBox extends React.Component {
    render() {
        // Извлекаем задачи из свойств
        const { tasks } = this.props;
        // Отрисовываем задачи
    }
}

// Эта функция, берет нужные данные из контейнера и отдаёт их компоненту
// Компоненту TasksBox нужны задачи
const mapStateToProps = state => {
  const props = {
    tasks: state.tasks,
  }

  return props;
};

// connect соединяет контейнер с текущим компонентом
// Наружу экспортируется компонент, который используется как обычно (пример выше)
export default connect(mapStateToProps)(TasksBox);

```
Самое главное в этой схеме — функция `mapStateToProps`. 
Эта функция принимает на вход состояние из контейнера и должна возвратить объект, свойства которого станут props в подключаемом компоненте (в данном случае `<TasksBox>`). 
В тривиальном случае мы всегда можем реализовывать эту функцию так `state => state`. 
То есть берём и отдаём в компонент всё состояние. 
Но делать так не стоит по многим причинам, начиная от полной просадки производительности, заканчивая тем, что появляется сильная зависимость от структуры состояния и лишние данные там, где их не ждут. 
Более того, всю предварительную обработку данных, подготовленных для вывода, стоит делать именно здесь. В идеале в компоненты должны попадать уже готовые к выводу данные.

**dispatch**
Функция connect пробрасывает в компонент дополнительные свойства. 
Самое важное из них - функция `dispatch`. 
Эта функция работает точь-в-точь как и store.dispatch. 
Ей нужно передать действие, что в свою очередь запустит цепочку вызовов до перерисовки. 
Полный код компонента ниже:
```jsx
// components/TasksBox.jsx
import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';

class TasksBox extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        // dispatch!
        const { dispatch, newTaskText } = this.props;
        dispatch(addTask({ text: newTaskText }));
    };

    render() {
        return <div>{/* logic with this.handleAddTask */}</div>;
    }
}

const mapStateToProps = state => {
  const props = {
    tasks: state.tasks,
  }
  return props;
};

export default connect(mapStateToProps)(TasksBox);
```

**Файловая структура**

Имея такое количество сущностей, возникает закономерный вопрос о том как их раскладывать в файловой системе. Обычно делают так:

* actions/index.js
* components/App.jsx
* reducers/index.js
* index.jsx

Какой механизм практически полностью заменяет Redux в React?

> Менеджмент состояния. setState напрямую либо не используется вообще никогда, либо изредка в случае работы с UI состоянием, изолированным в конкретных компонентах.

Для чего нужен провайдер?

> Для хранения и доставки Store в компоненты-контейнеры

Каким образом в текущей схеме изменяются данные в Store?

> Через вызов функции dispatch, которая передается в props, и передачу ей соответствующего Action

#### ЗАДАЧА ####
Реализуйте приложение "список задач", которое умеет две вещи:

Добавлять задачи в список
Удалять задачи из списка
src/index.jsx
Оберните приложение в провайдер и примонтируйте к элементу с идентификатором container.

src/actions/index.js
Реализуйте необходимые действия.

src/reducers/index.js
Реализуйте необходимую логику.

src/components/App.jsx
Реализуйте компонент <App>

HTML Начальный
```html
<div class="col-5">
    <form action="" class="form-inline">
        <div class="form-group mx-sm-3">
          <input type="text" required value="">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Add</button>
    </form>
</div>
```

HTML после добавления двух задач

```html
<div class="col-5">
    <form action="" class="form-inline">
      <div class="form-group mx-sm-3">
        <input type="text" required value="">
      </div>
      <button type="submit" class="btn btn-primary btn-sm">Add</button>
    </form>
    <div class="mt-3">
        <ul class="list-group">
            <li class="list-group-item d-flex">
                <span className="mr-auto">second Task!</span>
                <button type="button" class="close">
                    <span>&times;</span>
                </button>
          </li> 
          <li class="list-group-item d-flex">
                <span className="mr-auto">first Task!</span>
                <button type="button" class="close">
                    <span>&times;</span>
                </button>
          </li>
        </ul>
    </div>
</div>
```

```jsx
// FILE: /app/src/actions/index.js:
export const updateNewTaskText = text => ({
    type: 'TEXT_UPDATE',
    payload: {
        text,
    },
});


export const addTask = task => ({
    type: 'TASK_ADD',
    payload: {
        task,
    },
});

export const removeTask = id => ({
    type: 'TASK_REMOVE',
    payload: {
        id,
    },
});



// FILE: /app/src/components/App.jsx:
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateNewTaskText, addTask, removeTask } from '../actions';

class App extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        const { dispatch, text } = this.props;
        const task = { id: _.uniqueId(), text };
        dispatch(addTask(task));
    };

    handleRemoveTask = id => () => {
        const { dispatch } = this.props;
        dispatch(removeTask(id));
    };

    handleUpdateNewTaskText = (e) => {
        const { dispatch } = this.props;
        dispatch(updateNewTaskText(e.target.value));
    };

    renderTasks = (tasks) => {
        if (tasks.length === 0) {
            return null;
        }
        
        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text }) => (
                        <li key={id} className="list-group-item d-flex">
                          <span className="mr-auto">{text}</span>
                          <button type="button" className="close" onClick={this.handleRemoveTask(id)}>
                            <span>&times;</span>
                          </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    render() {
        const { tasks, text } = this.props;

        return (
            <div className="col-5">
              <form action="" className="form-inline" onSubmit={this.handleAddTask}>
                  <div className="form-group mx-sm-3">
                    <input type="text" required value={text} onChange={this.handleUpdateNewTaskText} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">Add</button>
              </form>
              {this.renderTasks(tasks)}
            </div>
      );
    }
}

const mapStateToProps = ({ tasks, text }) => {
  const props = { tasks, text };
  return props;
};

export default connect(mapStateToProps)(App);


// FILE: /app/src/index.jsx:
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
);


// FILE: /app/src/reducers/index.js:
import { combineReducers } from 'redux';

const text = (state = '', action) => {
    switch (action.type) {
        case 'TEXT_UPDATE': {
            return action.payload.text;
        }
        case 'TASK_ADD': {
            return '';
        }
        default:
            return state;
    }
};

const tasks = (state = [], action) => {
    switch (action.type) {
        case 'TASK_ADD': {
            return [action.payload.task, ...state];
        }
        case 'TASK_REMOVE': {
            return state.filter(t => t.id !== action.payload.id);
        }
        default:
            return state;
    }
};

export default combineReducers({
    text,
    tasks,
});
```

#### Передача действий ####

Функция connect позволяет обходиться без явного вызова dispatch. Общий принцип работы такой: в файл с компонентом импортируются необходимые действия и передаются вторым параметром в функцию connect.

```jsx
// components/TasksBox.jsx
import React from 'react';
import { connect } from 'react-redux';
// Импортируем нужные действия
import * as actions from '../actions';

class TasksBox extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        const { addTask, newTaskText } = this.props;
        addTask({ text: newTaskText });
    };

    render() {
        const { tasks } = this.props;
        // Отрисовываем задачи
        return <div>{/* logic with this.handleAddTask */}</div>;
    }
}

const mapStateToProps = state => {
  const props = {
    tasks: state.tasks,
  }

  return props;
};

// Формируем объект с действиями
const actionCreators = {
  addTask: actions.addTask,
};
```

Как видите, ничего не надо импортировать, всё есть в props. Технически действия оборачиваются в другие функции таким образом, что интерфейс работы остаётся прежним.


#### ЗАДАЧА ####
Реализуйте компонент <Panel />, который добавит в наше приложение две кнопки:

* Generate - создает 5 новых (и случайных) задач взамен уже добавленных

* Clean - очищает текущий список задач

actions/index.js
Реализуйте необходимые действия.

reducers/index.js
Реализуйте необходимые обработчики.

components/Panel.js
Реализуйте необходимую логику.

Для создания новой задачи используйте такую конструкцию:

`{ id: _.uniqueId(), text: faker.lorem.sentence() };`

```html
<div class="col-5">
    <form action="" class="form-inline">
      <div class="form-group mx-sm-3">
        <input type="text" required="" value="">
      </div>
      <input type="submit" class="btn btn-primary btn-sm" value="Add">
    </form>
    <div class="py-3">
      <button type="button" data-test="clean" class="btn btn-warning btn-sm mr-3">Clean</button>
      <button type="button" data-test="generate" class="btn btn-primary btn-sm">Generate</button>
    </div>
    <div class="mt-3">
      <ul class="list-group">
          <li class="list-group-item d-flex">
            <span class="mr-auto">Quia voluptatem quia et vel assumenda rerum quas.</span>
            <button type="button" class="close"><span>×</span></button>
          </li>
      </ul>
    </div>
</div>
```

```js
// FILE: /src/actions/index.js
export const updateNewTaskText = (text) => ({
    type: 'TEXT_UPDATE',
    payload: {
        text,
    },
});

export const addTask = (task) => ({
    type: 'TASK_ADD',
    payload: {
        task,
    },
});

export const removeTask = (id) => ({
    type: 'TASK_REMOVE',
    payload: {
        id,
    },
});

export const cleanTasks = () => ({
    type: 'TASK_CLEAN',
    payload: {},
});

export const replaceTasksBy = (tasks) => ({
    type: 'TASK_REPLACE',
    payload: {
        tasks,
    },
});


// FILE: /src/components/Panel.jsx
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import faker from '../faker';
import * as actions from '../actions';

const actionCreators = {
    cleanTasks: actions.cleanTasks,
    replaceTasksBy: actions.replaceTasksBy,
};

class NewTaskForm extends React.Component {
    handleCleanTasks = () => {
        const { cleanTasks } = this.props;
        cleanTasks();
    };

    handleGenerateSamples = () => {
        const { replaceTasksBy } = this.props;
        const getNewTask = () => ({ id: _.uniqueId(), text: faker.lorem.sentence() });
        const newTasks = _.times(5, getNewTask);
        replaceTasksBy(newTasks);
    };

    render() {
        return (
            <div className="py-3">
                <button
                    type="button"
                    data-test="clean"
                    className="btn btn-warning btn-sm mr-3"
                    onClick={this.handleCleanTasks}
                >
                  Clean
                </button>
                <button
                    type="button"
                    data-test="generate"
                    className="btn btn-primary btn-sm"
                    onClick={this.handleGenerateSamples}
                >
                  Generate
                </button>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);


// FILE: src/components/Tasks.jsx
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask(id);
    };

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text }) => (
                      <li key={id} className="list-group-item d-flex">
                        <span className="mr-auto">{text}</span>
                        <button type="button" className="close" onClick={this.handleRemoveTask(id)}>
                          <span>&times;</span>
                        </button>
                      </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  const { tasks } = state;

  return { tasks };
};

const actionCreators = {
  removeTask: actions.removeTask,
};

export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /src/reducers/index.js
import { combineReducers } from 'redux';

const text = (state = '', action) => {
    switch (action.type) {
        case 'TEXT_UPDATE': {
            return action.payload.text;
        }
        case 'TASK_ADD': {
            return '';
        }
        default:
            return state;
    }
};

const tasks = (state = [], action) => {
    switch (action.type) {
        case 'TASK_ADD': {
            return [action.payload.task, ...state];
        }
        case 'TASK_REMOVE': {
            return state.filter((t) => t.id !== action.payload.id);
        }
        // BEGIN (write your solution here)
        case 'TASK_CLEAN': {
            return [];
        }
        case 'TASK_REPLACE': {
            return action.payload.tasks;
        }
        // END
        default:
            return state;
    }
};

export default combineReducers({
    text,
    tasks,
});
```


#### Redux Actions ####
Типичный Action выглядит так:
```js
{
    type: 'TODO_ADD',
    payload: {
        /* data */
    }
}
```

Даже в небольших приложениях на js действий десятки, а то и сотни. 
В итоге появляется множество одинакового кода. К тому же есть проблема: если ошибиться с именем в редьюсере или даже при формировании действия, то система ничего не скажет и придется отлаживать такую ситуацию руками.

По этой причине появились библиотеки-хелперы, помогающие сократить код. 
Самой популярной является redux-actions. Она включает в себя два аспекта:
Определение действий.
Определение хранилища.

Начнем с действий:
```js
import { createAction } from 'redux-actions';

export const addUser = createAction('USER_ADD');
export const updateUser = createAction('USER_UPDATE');
```

Функция `createAction` формирует новую функцию, которая при вызове возвращает действие (объект { type: ... }). Эта функция принимает на вход данные, которые попадают в свойство payload.

Подразумевается, что сгенерированные функции экспортируются наружу и используются при вызовах `store.dispatch()`.

```js
import { addUser } from './actions'
import reducers from './reducers'

const user = /* get user from somewhere */;
const store = createStore(reducers);

store.dispatch(addUser({ user }));
```
Теперь посмотрим редьюсеры:

```js
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const users = handleActions({
    [actions.addUser](state, { payload: { user } }) {
        return { ...state, [user.id]: user };
    },
}, {});

export default combineReducers({
    users,
});
```
На первый взгляд может показаться что кода прибавилось, но на самом деле его столько же. Но появились и плюшки:

> Каждый обработчик теперь отдельная функция, а значит их окружения не пересекаются, как в случае switch.

> Не нужно описывать поведение по умолчанию, когда возвращается сам state.

> Стало невозможным диспатчить неправильное действие, так как каждая функция обработчик формируется на основании функций, генерирующих действия.

В остальном все остается по-прежнему. Эта библиотека не делает ничего кардинально нового, но позволяет сократить код и упростить отладку.


#### ЗАДАЧА ####
Допишите добавление и удаление задач используя redux-actions

src/actions/index.js
Реализуйте необходимые действия

src/reducers/index.js
Реализуйте редьюсеры

src/components/NewTaskForm.jsx
Реализуйте необходимые обработчики

src/components/Tasks.jsx
Реализуйте необходимые обработчики

```js
// FILE: /app/src/actions/index.js:
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const updateNewTaskText = createAction('TEXT_UPDATE');


// FILE: /app/src/components/NewTaskForm.jsx:
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewTaskForm extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        const { addTask, text } = this.props;
        const task = { text, id: _.uniqueId() };
        addTask({ task });
    };

    handleUpdateNewTaskText = (e) => {
        const { updateNewTaskText } = this.props;
        updateNewTaskText({ text: e.target.value });
    };

    render() {
        const { text } = this.props;

        return (
            <form action="" className="form-inline" onSubmit={this.handleAddTask}>
              <div className="form-group mx-sm-3">
                <input
                    type="text"
                    required
                    value={text}
                    onChange={this.handleUpdateNewTaskText}
                />
              </div>
              <input type="submit" className="btn btn-primary btn-sm" value="Add" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);


// FILE: /app/src/components/Tasks.jsx:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
    const { tasks } = state;
    return { tasks };
};

const actionCreators = {
    removeTask: actions.removeTask,
};

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text }) => (
                        <li key={id} className="list-group-item d-flex">
                            <span className="mr-auto">{text}</span>
                            <button type="button" className="close" onClick={this.handleRemoveTask(id)}>
                              <span>&times;</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /app/src/reducers/index.js:
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        return [task, ...state];
    },
    [actions.removeTask](state, { payload: { id } }) {
        return state.filter(t => t.id !== id);
    },
}, []);

const text = handleActions({
    [actions.updateNewTaskText](state, { payload: { text } }) {
        return text
    },
    [actions.addTask](state) {
        return '';
    },
}, '');

export default combineReducers({
    text,
    tasks,
});


// FILE: /app/src/components/App.jsx:
import React from 'react';
import NewTaskForm from './NewTaskForm';
import Tasks from './Tasks';

const App = () => (
    <div className="col-5">
      <NewTaskForm />
      <Tasks />
    </div>
);

export default App;
```


#### Структура состояния ####

Данный урок базируется на статье https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape официальной документации

Большинство приложений работают с данными, которые имеют вложенную структуру. Например, у постов в блоге есть автор и комментарии. У комментариев тоже есть авторы и могут быть лайки.
```js
const blogPosts = [
    {
        id: 'post1',
        author: { username: 'user1', name: 'User 1' },
        body: '......',
        comments: [
            {
                id: 'comment1',
                author: { username: 'user2', name: 'User 2' },
                comment: '.....'
            },
            {
                id: 'comment2',
                author: { username: 'user3', name: 'User 3' },
                comment: '.....'
            }
        ]
    },
];
```

Работать с такой структурой напрямую тяжело по нескольким причинам:
> Внутри неё дублируются данные, например, author. Из-за этого резко усложняется обновление.

> Логика редьюсеров становится тем сложнее, чем больше вложенность

Правильный подход при работе с Redux — воспринимать его как реляционную базу данных. 
Данные внутри контейнера должны быть нормализованы. 
При таком взгляде, каждый редьюсер может восприниматься как отдельная таблица в базе данных.

Основные принципы организации данных в контейнере:

> Каждая сущность хранится в своём редьюсере.

> Коллекция сущностей одного типа хранится в виде объекта, где ключи — идентификаторы объектов, а значения — сами объекты.

> Порядок данных в этом объекте, задаётся отдельным массивом состоящим только из идентификаторов.

> Данные ссылаются друг на друга только по идентификаторам

```js
{
    posts : {
        byId : {
            "post1" : {
                id : "post1",
                    author : "user1",
                    body : "......",
            },
            "post2" : {
                id : "post2",
                    author : "user2",
                    body : "......",
            }
        },
        allIds : ["post1", "post2"]
    },
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                    author : "user2",
                    comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                    author : "user3",
                    comment : ".....",
            }
        },
        allIds : ["comment1", "comment2"]
    },
    users : {
        byId : {
            "user1" : {
                username : "user1",
                    name : "User 1",
            },
            "user2" : {
                username : "user2",
                    name : "User 2",
            },
            "user3" : {
                username : "user3",
                    name : "User 3",
            }
        },
        allIds : ["user1", "user2", "user3"]
    }
}
```

Теперь данные нормализованы. Каждая сущность хранится в своём собственном редьюсере. 
Объект byId хранит сами сущности, а allIds - идентификаторы. Какие преимущества мы получили?

> Данные не повторяются, а значит достаточно поменять только одно место при их изменении

> Редьюсеры не имеют вложенности

> Данные в таком виде легко извлекать и модифицировать


#### ЗАДАЧА ####
Продолжаем улучшать наш todo. Добавим в него возможность изменять состояние завершенности задачи по клику. Если задача завершена, то она перечеркивается.

src/reducers/index.js
Реализуйте редьюсеры используя подход, описанный в теории

src/components/Tasks.jsx
Реализуйте функцию mapStateToProps

```js
// FILE: /app/src/reducers/index.js:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    handleToggleTaskState = id => () => {
        const { toggleTaskState } = this.props;
        toggleTaskState({ id });
    };

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text, state }) => (
                        <li key={id} className="list-group-item d-flex">
                            <span className="mr-auto">
                                <a href="#" data-test="task-toggle-state" onClick={this.handleToggleTaskState(id)}>
                                  {state === 'active' ? text : <s>{text}</s>}
                                </a>
                            </span>
                            <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                              <span>&times;</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  const { tasks: { byId, allIds } } = state;
  const tasks = allIds.map(id => byId[id]);

  return { tasks };
};

const actionCreators = {
  removeTask: actions.removeTask,
  toggleTaskState: actions.toggleTaskState,
};

export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /app/src/components/Tasks.jsx:
import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        const { byId, allIds } = state;
        return {
            byId: { ...byId, [task.id]: task },
            allIds: [task.id, ...allIds],
        };
    },
    [actions.removeTask](state, { payload: { id } }) {
        const { byId, allIds } = state;
        return {
            byId: _.omit(byId, id),
            allIds: _.without(allIds, id),
        };
    },
    [actions.toggleTaskState](state, { payload: { id } }) {
        const task = state.byId[id];
        const newState = task.state === 'active' ? 'finished' : 'active';
        const updatedTask = { ...task, state: newState };
        return {
            ...state,
            byId: { ...state.byId, [task.id]: updatedTask },
        };
    },
}, { byId: {}, allIds: [] });

const text = handleActions({
    [actions.addTask]() {
        return '';
    },
    [actions.updateNewTaskText](state, { payload }) {
        return payload.text;
    },
}, '');

export default combineReducers({
    tasks,
    text,
});

// FILE: /app/src/actions/index.js:
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');


// FILE: /app/src/components/App.jsx:
import React from 'react';
import NewTaskForm from './NewTaskForm';
import Tasks from './Tasks';

const App = () => (
    <div className="col-5">
        <NewTaskForm />
        <Tasks />
    </div>
);
export default App;


// FILE: /app/src/components/NewTaskForm.jsx:
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewTaskForm extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        const { addTask, text } = this.props;
        const task = { text, id: _.uniqueId(), state: 'active' };
        addTask({ task });
    };

    handleUpdateNewTaskText = (e) => {
        const { updateNewTaskText } = this.props;
        updateNewTaskText({ text: e.target.value });
    };

    render() {
        const { text } = this.props;

        return (
          <form action="" className="form-inline" onSubmit={this.handleAddTask}>
            <div className="form-group mx-sm-3">
              <input
                type="text"
                required
                value={text}
                onChange={this.handleUpdateNewTaskText}
              />
            </div>
            <input type="submit" className="btn btn-primary btn-sm" value="Add"/>
          </form>
    );
    }
}

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};


export default connect(mapStateToProps, actionCreators)(NewTaskForm);


// FILE: /app/src/components/Tasks.jsx:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    handleToggleTaskState = id => () => {
        const { toggleTaskState } = this.props;
        toggleTaskState({ id });
    };

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
          <div className="mt-3">
            <ul className="list-group">
              {tasks.map(({id, text, state}) => (
                <li key={id} className="list-group-item d-flex">
                  <span className="mr-auto">
                    <a href="#" data-test="task-toggle-state" onClick={this.handleToggleTaskState(id)}>
                      {state === 'active' ? text : <s>{text}</s>}
                    </a>
                  </span>
                  <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                    <span>&times;</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>            
        );
    }
}

const mapStateToProps = (state) => {
  const { tasks: { byId, allIds } } = state;
  const tasks = allIds.map(id => byId[id]);
  return { tasks };
};

const actionCreators = {
  removeTask: actions.removeTask,
  toggleTaskState: actions.toggleTaskState,
};

export default connect(mapStateToProps, actionCreators)(Tasks);

// FILE: /app/src/reducers/index.jsx:
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
```


#### UI State ####

UI State отличается от остальных видов состояния тем, что относится только к UI и не влияет на остальные части приложения. 
Например, всплывающая подсказка при наведении мышкой на элемент.
В таких ситуациях бывает полезно хранить состояние не в Redux, а внутри компонентов, отвечающих за соответствующий вывод на экран. 
Преимущества очень простые: не надо создавать действий, не надо задействовать весь механизм диспетчеризации.
К тому же перерисовка коснется только небольшой части виртуального дома (скорее всего).

Практика показывает, что довольно часто нельзя провести четкую грань между app state и ui state. 
Начнем с того, что отображение на экране зависит вообще от всего.
Например, в todo приложениях завершенный todo, как правило, отображается зачеркнутым. В данном случае зачеркнутость определяется тем какое значение в свойстве state у соответствующего todo. 
Текущий выбранный элемент может быть исключительно элементом UI, а может влиять на поведение программы, например, определенных кнопок, позволяющих выполнять действий в стиле "удалить все выбранное". 
Вот лишь некоторые примеры, которые можно отнести либо к одной, либо к другой части состояния:

* Подсвеченный текущий элемент.
* Элемент в режиме редактирования.
* Отфильтрованный список.
* Отображение в три колонки.

Так где хранить UI State?
А вот что говорят по этому поводу разработчики React:
The rule of thumb is: do whatever is less awkward.

Другими словами, делайте так, как наименее тяжело и затратно.
По умолчанию исходите из предположения, что все хранится в Redux. 
В своей практике я припомню лишь несколько случаев, когда использовался локальный стейт. 
В основном такое бывает у сторонних компонентов или в самописных виджетах. 
Не забывайте что локальный стейт не участвует в процессе диспетчеризации, а значит его не так легко отлаживать. 
Он не видим в DevTools редакса.

Но чего не стоит делать однозначно, так это примешивать app state и ui state в domain data.

```js
const state = {
    tasks: {
        byIds: { 1: { ui: `'opened'` } },
    },
};
```

Обычно, данные приходят с сервера в чистом виде. UI состояние появляется позже, во время взаимодействия с пользователем. 
Соединяя UI-состояние с самими данными, мы получаем сразу несколько проблем:
1. Все новые данные придется обрабатывать, добавляя в них UI-состояние.
2. Все что отправляется на сервер, придется чистить от UI-состояния.

Ниже приводится пример правильного разделения:
```js
const state = {
    tasks: {
        byIds: { 1: { /* ... */ } },
    },
    tasksUIState: {
        1: { state: 'editing' },
    }
};
```

#### ЗАДАЧА ####
src/components/Tasks.jsx
Реализуйте компонент <Tasks />, добавив в него логику переключения "темы". Тема определяет классы, применяемые к конкретной задаче. По умолчанию используется светлая тема light. При клике на задачу она должна поменяться на dark. Классы для тем описаны в самом компоненте.

Задача со светлой темой:

```html
<li class="list-group-item d-flex bg-light text-dark">
  <span class="mr-auto">
    <a href="#">light</a>
  </span>
</li>
```

Задача с темной темой:

```html
    <li class="list-group-item d-flex bg-dark text-light">
      <span class="mr-auto">
        <a href="#">dark</a>
      </span>
    </li>
```

src/actions/index.js
Реализуйте действие(-я) необходимое для смены темы

src/reducers/index.js
Реализуйте редьюсер для обработки UI состояния

```js
// FILE: /app/src/components/Tasks.jsx:
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = (state) => {
    const { tasks: { byId, allIds }, tasksUIState } = state;
    const tasks = allIds.map(id => byId[id]);
    return { tasks, tasksUIState };
};

const actionCreators = {
    inverseTaskTheme: actions.inverseTaskTheme,
};

class Tasks extends React.Component {
    handleInverseTaskTheme = task => (e) => {
        e.preventDefault();
        const { inverseTaskTheme } = this.props;
        inverseTaskTheme({ task });
    };

    renderTask = (task) => {
        const { tasksUIState } = this.props;

        const themeToClasses = {
            dark: 'bg-dark text-light',
            light: 'bg-light text-dark',
        };


        const currentThemeClass = themeToClasses[tasksUIState[task.id].theme];

        const classes = cn({
            'list-group-item d-flex': true,
            [currentThemeClass]: true,
        });

        return (
            <li key={task.id} className={classes}>
            <span className="mr-auto">
            <a href="#" onClick={this.handleInverseTaskTheme(task)}>{task.text}</a>
            </span>
            </li>
    );
    }

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
            <ul className="list-group">
            {tasks.map(this.renderTask)}
            </ul>
            </div>
    );
    }
    // END
}

export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /app/src/actions/index.js:
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const inverseTaskTheme = createAction('TASK_INVERSE_THEME');

// FILE: /app/src/reducers/index.js:
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        const { byId, allIds } = state;
        return {
            byId: { ...byId, [task.id]: task },
            allIds: [task.id, ...allIds],
        };
    },
}, { byId: {}, allIds: [] });

const tasksUIState = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        return { ...state, [task.id]: { theme: 'light' } };
    },
    [actions.inverseTaskTheme](state, { payload: { task } }) {
        const currentTheme = state[task.id].theme;
        const mapping = {
            dark: 'light',
            light: 'dark',
        };
        return { ...state, [task.id]: { theme: mapping[currentTheme] } };
    },
}, {});

const text = handleActions({
    [actions.addTask]() {
        return '';
    },
    [actions.updateNewTaskText](state, { payload }) {
        return payload.text;
    },
}, '');

export default combineReducers({
    tasks,
    tasksUIState,
    text,
});




// FILE: /app/src/index.jsx:
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);


// FILE: /app/src/components/App.jsx:
import React from 'react';
import NewTaskForm from './NewTaskForm';
import Tasks from './Tasks';

const App = () => (
    <div className="col-5">
      <NewTaskForm />
      <Tasks />
    </div>
);

export default App;


// FILE: /app/src/components/NewTaskForm.jsx:
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewTaskForm extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        const { addTask, text } = this.props;
        const task = { text, id: _.uniqueId(), state: 'active' };
        addTask({ task });
    };

    handleUpdateNewTaskText = (e) => {
        const { updateNewTaskText } = this.props;
        updateNewTaskText({ text: e.target.value });
    };

    render() {
        const { text } = this.props;

        return (
            <form action="" className="form-inline" onSubmit={this.handleAddTask}>
              <div className="form-group mx-sm-3">
                <input
                    type="text"
                    required
                    value={text}
                    onChange={this.handleUpdateNewTaskText}
                />
              </div>
              <input type="submit" className="btn btn-primary btn-sm" value="Add" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);
```


#### Reselect ####

Еще одна задача, которую решают контейнеры — оптимизация. 
Они автоматически отслеживают то, что возвращается из `mapStateToProps`, и если ничего не изменилось с предыдущего рендеринга, то перерисовки не будет. 
По сути, контейнер ведет себя как `PureComponent`.
Из этого есть несколько следствий:

* Нужно стараться передавать как можно меньше данных (но не меньше, чем нужно).
  
* Нужно избегать изменений в `mapStateToProps`.

Но не забывайте, что сама функция `mapStateToProps` выполняется всегда, даже если данные не изменились. 
Это приводит к ненужным, и иногда тяжелым, вычислениям.

Последнее рассмотрим подробнее. 
Напомню наш код из практики:

```js
const mapStateToProps = ({ tasks }) => {
    const props = {
        tasks: Object.values(tasks),
    };
    return props;
};
```

На первый взгляд в коде все нормально, но, на самом деле, Object.values создает каждый раз новый объект, даже если tasks остались прежними. А значит ни о какой эффективности не может быть и речи. Очевидным решением будет перенести эту логику внутрь компонента, но тогда теряется одно из главных преимуществ маппинга. 
Компоненты завязываются на структуру состояния и выполняют работу по подготовке данных, которая, кстати, начнет дублироваться.

Для решения этой задачи создан пакет reselect. 
Он позволяет создавать специальные функции "селекторы", которые выполняют мемоизацию результата. 
То есть если данные не поменялись, то и результат работы функции будет тем же самым значением или объектом в случае составных данных.

Отмечу, что reselect не связан ни с Redux, ни с React. Нет никакого слоя интеграции. Селекторы сами по себе и их легко использовать в контейнерах без конфигурации.

```js
import { createSelector } from 'reselect';

// Обычная функция извлекающая нужный срез данных из состояния
const getTasks = state => state.tasks;

// селектор на основе функции
const publishedTasksSelector = createSelector(
    getTasks,
    tasks => (console.log('selector'), tasks.filter(t => t.state === 'published')),
);

const state = {
    tasks: [
        { name: 'buy milk', state: 'archived' },
        { name: 'rise money', state: 'published' },
    ]
};

console.log(publishedTasksSelector(state));
// => [{ name: 'rise money', state: 'published' }]

// Повторный вызов не производит вычислений
console.log(publishedTasksSelector(state));
```

Перед тем как создать первый селектор, нужно написать функцию, которая принимает на вход состояние и возвращает нужный срез данных. 
В нашем случае используется функция getTasks. Затем с помощью функции createSelector создается селектор. В примере выше в функцию createSelector передается наша исходная функция и вторая функция, которая производит фильтрацию данных, полученных первой функцией.

Посмотрите на этот код:

```js
const getTasks = state => Object.values(state.tasks);

const mapStateToProps = (state) => {
    const props = {
        tasks: getTasks(state),
    };
    return props;
};

```

В коде выше сразу две ошибки. 
Во-первых, функция, извлекающая getTask, не селектор, хотя без нее селектор не сделаешь. 
То есть никакой мемоизации не будет. 
Во-вторых, ни в коем случае нельзя делать преобразования данных на этом этапе. 
Именно эту функцию используют селекторы, чтобы узнать, а изменились ли данные. 
Если функция содержит обработку, то данные всегда будут новые и смысл селектора пропадает. Хотя технически в коде он останется.

```js
import { createSelector } from 'reselect';

const getTasks = state => state.tasks;

const tasksSelector = createSelector(
    getTasks,
    tasks => Object.values(tasks),
);

const mapStateToProps = (state) => {
    const props = {
        tasks: tasksSelector(state),
    };
    return props;
};
```

Хорошая новость в том, что селекторы можно соединять:

```js
import { createSelector } from 'reselect';

const getTasks = state => state.tasks;

const tasksSelector = createSelector(
    getTasks,
    tasks => Object.values(tasks),
);

const publishedTasksSelector = createSelector(
    tasksSelector,
    tasks => tasks.filter(t => t.state === 'published'),
);

const percentOfFinishedTasksSelector = createSelector(
    tasksSelector,
    publishedTasksSelector,
    (tasks, publishedTasks) => (publishedTasks.length / tasks.length) * 100,
)

const mapStateToProps = (state) => {
    const props = {
        tasks: tasksSelector(state),
        publishedTasks: publishedTasksSelector(state),
        percentOfFinishedTasks: percentOfFinishedTasksSelector(state),
    };
    return props;
};
```
Как это работает:
* Селектор вызывает все переданные ему селекторы (которые в свою очередь делают тоже самое и так до самого дна) и собирает результаты их вызовов в массив results.
  
* Селектор вызывает последнюю переданную функцию как f(...results). Другими словами, количество аргументов в последней переданной функции селектору равно количеству селекторов, переданных перед этой функцией.
  
* То, что получилось, и есть результат, который вернет селектор (а заодно сохранит внутри).

Хотя по началу такая комбинаторика может пугать, в реальности селекторы очень простая вещь. Кроме мемоизации, они позволяют переиспользовать выборки в разных компонентах. 
В файловой системе рекомендуется размещать их по пути `selectors/index.js`.

Когда стоит использовать селекторы, а когда нет? 
Большинству приложений они не понадобятся. 
Фронтенд приложения редко оперируют большим количеством данных одновременно. 
Разнообразные списки или формы хранят в себя максимум сотни или тысячу элементов. Более того. 
Оптимизировать код имеет смысл только тогда, когда приложение уже начало тормозить и мы точно убедились, что проблема в пересчете внутри mapStateToProps. 
До этого момента, лучше про оптимизацию и селекторы не вспоминать.

Можно ли создать селектор на основе другого селектора?
> Селекторы можно комбинировать в любом количестве и с любой вложенностью друг в друга

Можно ли переиспользовать селекторы в разных компонентах?
> Конечно, селектор - чистая функция

Для чего нужны селекторы?
> Возврат тех же самых данных (в том числе по ссылке)
> Уменьшение повторных вычислений на неизменившихся данных

#### ЗАДАЧА ####
src/components/Filter.jsx
Реализуйте компонент <Filter />, добавив в него логику фильтрации.

Логика включает в себя три состояния: all, active, finished.

src/components/Tasks.jsx
Реализуйте функцию mapStateToProps.

src/selectors/index.js
Реализуйте необходимые селекторы

HTML
Только фильтр:
```html
<div class="mt-3 d-flex justify-content-around">
  All Tasks
  <button type="button" class="btn btn-link border-0 p-0" data-test="task-filter-active">Active Tasks</button>
  <button type="button" class="btn btn-link border-0 p-0" data-test="task-filter-finished">Finished Tasks</button>
</div>
```
При смене фильтра, в списке задач остается только то что ему соответствует. Пример верстки при выбранном фильтре Active Tasks:

```html
<div class="mt-3 d-flex justify-content-around">
  <button type="button" class="btn btn-link border-0 p-0" data-test="task-filter-all">All Tasks</button>
  Active Tasks
  <button type="button" class="btn btn-link border-0 p-0" data-test="task-filter-finished">Finished Tasks</button>
</div>
```

```js

// FILE: /app/src/actions/index.js:
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');
export const setTasksFilter = createAction('TASK_FILTER_SET');


// FILE: /app/src/components/App.jsx:
import React from 'react';
import NewTaskForm from './NewTaskForm';
import Tasks from './Tasks';
import Filter from './Filter';

const App = () => (
    <div className="col-5">
      <NewTaskForm />
      <Filter />
      <Tasks />
    </div>
);
export default App;


// FILE: /app/src/components/Filter.jsx:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const filters = [['all', 'All Tasks'], ['active', 'Active Tasks'], ['finished', 'Finished Tasks']];

class Filter extends React.Component {
    handleSetTasksFilter(filterName) {
        const { setTasksFilter } = this.props;
        setTasksFilter({ filterName });
    }

    renderFilter = ([state, name]) => {
        const { currentFilterName } = this.props;
        
        if (currentFilterName === state) {
            return name;
        }
        
        return (
            <button
                type="button"
                key={state}
                className="btn btn-link border-0 p-0"
                data-test={`task-filter-${state}`}
                onClick={() => this.handleSetTasksFilter(state)}
            >
                {name}
            </button>
        );
    }

    render() {
        return (
            <div className="mt-3 d-flex justify-content-around">
              {filters.map(this.renderFilter)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  const { tasks: { currentFilterName } } = state;
  return { currentFilterName };
};

const actionCreators = {
  setTasksFilter: actions.setTasksFilter,
};

export default connect(mapStateToProps, actionCreators)(Filter);


// FILE: /app/src/components/NewTaskForm.jsx:
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewTaskForm extends React.Component {
    handleAddTask = (e) => {
        e.preventDefault();
        const { addTask, text } = this.props;
        const task = { text, id: _.uniqueId(), state: 'active' };
        addTask({ task });
    };

    handleUpdateNewTaskText = (e) => {
        const { updateNewTaskText } = this.props;
        updateNewTaskText({ text: e.target.value });
    };

    render() {
        const { text } = this.props;

        return (
            <form action="" className="form-inline" onSubmit={this.handleAddTask}>
                <div className="form-group mx-sm-3">
                    <input
                        type="text"
                        required
                        value={text}
                        onChange={this.handleUpdateNewTaskText}
                    />
                </div>
                <input type="submit" className="btn btn-primary btn-sm" value="Add" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);


// FILE: /app/src/components/Tasks.jsx:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { filteredTasksSelector } from '../selectors';

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    handleToggleTaskState = id => () => {
        const { toggleTaskState } = this.props;
        toggleTaskState({ id });
    };

    renderTasks() {
        const { tasks } = this.props;

        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text, state }) => (
                        <li key={id} className="list-group-item d-flex">
                            <span className="mr-auto">
                                <button type="button" data-test="task-toggle-state" className="btn btn-link" onClick={this.handleToggleTaskState(id)}>
                                    {state === 'active' ? text : <s>{text}</s>}
                                </button>
                            </span>
                            <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                                <span>&times;</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
                {this.renderTasks()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  const tasks = filteredTasksSelector(state);
  return { tasks };
};

const actionCreators = {
  removeTask: actions.removeTask,
  toggleTaskState: actions.toggleTaskState,
};

export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /app/src/reducers/index.js:
import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        const { byId, allIds } = state;
        return {
            ...state,
            byId: { ...byId, [task.id]: task },
            allIds: [task.id, ...allIds],
        };
    },
    [actions.removeTask](state, { payload: { id } }) {
        const { byId, allIds } = state;
        return {
            ...state,
            byId: _.omit(byId, id),
            allIds: _.without(allIds, id),
        };
    },
    [actions.toggleTaskState](state, { payload: { id } }) {
        const task = state.byId[id];
        const newState = task.state === 'active' ? 'finished' : 'active';
        const updatedTask = { ...task, state: newState };
        return {
            ...state,
            byId: { ...state.byId, [task.id]: updatedTask },
        };
    },
    [actions.setTasksFilter](state, { payload: { filterName } }) {
        return {
            ...state,
            currentFilterName: filterName,
        };
    },
}, { byId: {}, allIds: [], currentFilterName: 'all' });

const text = handleActions({
    [actions.addTask]() {
        return '';
    },
    [actions.updateNewTaskText](state, { payload }) {
        return payload.text;
    },
}, '');

export default combineReducers({
    tasks,
    text,
});


// FILE: /app/src/selectors/index.js:
import { createSelector } from 'reselect';

export const getTasksById = state => state.tasks.byId;
export const getTaskIds = state => state.tasks.allIds;
export const getCurrentFilterName = state => state.tasks.currentFilterName;

export const tasksSelector = createSelector(
    [getTasksById, getTaskIds],
    (byId, allIds) => allIds.map(id => byId[id]),
);

export const filteredTasksSelector = createSelector(
    [tasksSelector, getCurrentFilterName],
    (tasks, filterName) => (filterName === 'all' ? tasks : tasks.filter(t => t.state === filterName)),
);


// FILE: /app/src/index.jsx:
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container'),
);
```

#### Библиотека Redux Forms ####

Еще одно место, напрашивающееся на автоматизацию — формы. Работа с формами в React настоящая головная боль. Каждый новый элемент требует синхронизации с состоянием и написанием дополнительного кода на всех уровнях.

```jsx
import React from 'react';

class Form extends React.Component {
    updateNewTaskText = e => this.props.updateNewTaskText({ text: e.target.value });

    render() {
        const { newTaskText } = this.props;

        return (
            <form action="" className="form-inline">
                <div className="form-group mx-sm-3">
                    <input type="text" required value={newTaskText} onChange={this.updateNewTaskText} />
                </div>
            </form>;
        )
    }
}
```
Этого можно избежать, подключив библиотеку наподобие redux-form. Документация этого пакета поистинне огромна. Множество вариантов использования и способов кастомизации. Чтобы не сойти с ума в уроке мы рассмотрим только базовые возможности этой библиотеки.

Как и в случае с самим Redux, подключить ReduxForm целая история. Начнем по порядку:

1. Автоматизация синхронизации с контейнером подразумевает наличие специального редьюсера:

```jsx
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer,
    /* ... */
});

// 2. Теперь под каждую форму нужно выделять отдельный компонент и оборачивать его в компонент ReduxForm.

import { reduxForm } from 'redux-form';

class NewTaskForm extends React.Component {
    // ...
}

export default reduxForm({
    form: 'newTask',
})(NewTaskForm);

// Обратите внимание на свойство form, оно задает имя ключа, под которым данные текущей формы будут храниться в Redux.

// 3. Вместо использования стандартных компонентов реакта для элементов формы, ReduxForm поставляется со своими механизмами. Потребность вполне понятная, иначе не сделать автоматическую синхронизацию.

import  { Field } from 'redux-form';

// ...

render() {
    return (
        <form className="form-inline">
            <div className="form-group mx-3">
                <Field name="text" required component="input" type="text" />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Add</button>
        </form>;
    )
}

/*
Эта часть ReduxForm очень сильно кастомизируется. За подробностями прошу в официальную документацию.
4. Остался последний шаг — отправка формы и работа с ее данными.
*/

class NewTaskForm extends React.Component {
    addTask = (values) => {
        this.props.addTask({ task: values });
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.addTask)}>
                {/* ... */}
                <button type="submit" className="btn btn-primary btn-sm">Add</button>
            </form>;
        )
    }
}
```

ReduxForm прокидывает в формы целую россыпь различных свойств. Главное из них — функция handleSubmit. Ее необходимо вызвать на onSubmit формы, передав туда свой собственный обработчик. После отправки формы в этот обработчик попадут все значения из формы в виде объекта, где свойство — это имя элемента формы.

Теперь расширение и изменение любой формы станет настоящим праздником. Достаточно изменить саму форму и волшебным образом в обработчик начнут приходить новые данные.

А дальше начинаются нюансы:

- Как очистить форму после отправки? В обработчике отправки можно вызывать функцию this.props.reset() и форма будет сброшена в первоначальный вид.

- Как задать параметры по умолчанию? Достаточно передать в компонент свойство initialValues.

**Дополнительные материалы**
redux-form https://redux-form.com/

#### ЗАДАЧА ####
src/components/NewTaskForm.jsx
Реализуйте недостающие части компонента <NewTaskForm />.

src/reducers/index.js
Подключите редьюсер библиотеки redux-form

```jsx
// FILE: /app/src/components/NewTaskForm.jsx:
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class NewTaskForm extends React.Component {
    handleSubmit = (values) => {
        const { addTask, reset } = this.props;
        const task = { ...values, id: _.uniqueId(), state: 'active' };
        addTask({ task });
        reset();
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="form-group mx-3">
                    <Field name="text" required component="input" type="text" />
                </div>
                <input type="submit" className="btn btn-primary btn-sm" value="Add" />
            </form>
        );
    }
}

const mapStateToProps = () => {
    const props = {};
    return props;
};

const actionCreators = {
    addTask: actions.addTask,
};


const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(NewTaskForm);

export default reduxForm({
    form: 'newTask',
})(ConnectedNewTaskForm);


// FILE: /app/src/reducers/index.js:
import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        const { byId, allIds } = state;
        return {
            byId: { ...byId, [task.id]: task },
            allIds: [task.id, ...allIds],
        };
    },
    [actions.removeTask](state, { payload: { id } }) {
        const { byId, allIds } = state;
        return {
            byId: _.omit(byId, id),
            allIds: _.without(allIds, id),
        };
    },
    [actions.toggleTaskState](state, { payload: { id } }) {
        const task = state.byId[id];
        const newState = task.state === 'active' ? 'finished' : 'active';
        const updatedTask = { ...task, state: newState };
        return {
            ...state,
            byId: { ...state.byId, [task.id]: updatedTask },
        };
    },
}, { byId: {}, allIds: [] });

export default combineReducers({
    tasks,
    form: formReducer,
});


// FILE: /app/src/actions/index.js:
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');


// FILE: /app/src/actions/components/App.jsx:
import React from 'react';
import NewTaskForm from './NewTaskForm';
import Tasks from './Tasks';

const App = () => (
    <div className="col-5">
        <NewTaskForm />
        <Tasks />
    </div>
);

export default App;


// FILE: /app/src/actions/Tasks.jsx:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    handleToggleTaskState = id => () => {
        const { toggleTaskState } = this.props;
        toggleTaskState({ id });
    };

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text, state }) => (
                        <li key={id} className="list-group-item d-flex">
                            <span className="mr-auto">
                                <a href="#" data-test="task-toggle-state" onClick={this.handleToggleTaskState(id)}>
                                    {state === 'active' ? text : <s>{text}</s>}
                                </a>
                            </span>
                            <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                                <span>&times;</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { tasks: { byId, allIds } } = state;
    const tasks = allIds.map(id => byId[id]);
    return { tasks };
};

const actionCreators = {
    removeTask: actions.removeTask,
    toggleTaskState: actions.toggleTaskState,
};


export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /app/src/selectors/index.js:
import { createSelector } from 'reselect';

export const getTasks = state => state.tasks;
export const tasksSelector = createSelector(
    getTasks,
    tasks => Object.values(tasks),
);


// FILE: /app/src/index.jsx:
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container'),
);
```


#### Асинхронные действия ####

В отличие от синхронных запросов, которые выполняются здесь и сейчас, асинхронные растянуты во времени. Каждый асинхронный запрос можно представить конечным автоматом с тремя состояниями "something requested", "answer received" или "request failed". Почему это важно? Как минимум нам важно знать когда запрос был выполнен, чтобы оповестить пользователя и произвести необходимые изменения. Но также важно знать когда запрос начался.

Предположим, что пользователь заполнил форму создания новой задачи и нажал "создать", а потом быстро нажал "создать" ещё раз до того, как запрос успел выполниться. Такая ситуация нередко встречается и с обычными формами без JS. Она приводит к тому, что на сервере создаются две одинаковые сущности, либо выскакивают ошибки, связанные с валидацией. Правильное решение в подобной ситуации связано с необходимостью менять интерфейс так, чтобы повторная отправка стала невозможной. Как правило, всё сводится к блокированию кнопки отправки с крутящимся спинером. Соответственно, после окончания запроса кнопку необходимо разблокировать или, если того требует UI, вообще убрать форму. То же самое нужно делать не только в случае успеха, но и в случае провала, иначе может получиться ситуация, что пользовательский запрос провалился, а кнопка осталась заблокирована навсегда (до перезагрузки страницы).

С точки зрения нашего React-Redux приложения автомат будет состоять из состояния в контейнере и трёх событий:

> TASK_UPDATE_REQUEST.
> TASK_UPDATE_SUCCESS.
> TASK_UPDATE_FAILURE.

Именование в стиле request, success и failure — рекомендация самого Redux. Желательно всегда придерживаться именно её в случаях когда состояния три. Большинство запросов укладываются именно в эту схему.

```js
export const updateTaskRequest = createAction('TASK_UPDATE_REQUEST');
export const updateTaskSuccess = createAction('TASK_UPDATE_SUCCESS');
export const updateTaskFailure = createAction('TASK_UPDATE_FAILURE');
```

Действия, описанные выше, по сути, синхронны. А где тогда выполняется сам запрос?

Для этого вводится понятие асинхронные действия (async actions). И если в React для работы с асинхронными вызовами ничего дополнительно делать не нужно, то Redux из коробки это не умеет. Наиболее простой способ начать выполнять запросы на сервер — подключить библиотеку redux-thunk. Она представляет из себя мидлвар, который нужно не забыть подключить:

```jsx
import thunk from 'redux-thunk';

const store = createStore(
    reducers,
    /* ... */,
    applyMiddleware(thunk),
);

// На этом интеграция заканчивается. Следующим шагом создаются сами действия:
export const updateTask = (id, values) => async (dispatch) => {
    dispatch(updateTaskRequest());
    try {
        const response = await axios.patch(routes.taskUrl(id), { task: values });
        dispatch(updateTaskSuccess({ task: response.data }));
    } catch (e) {
        // Обязательно выводите ошибку, иначе вы не узнаете что пошло не так при отладке
        console.log(e);
        dispatch(updateTaskFailure());
    }
};
```
В отличие от синхронных действий, асинхронное — функция, даже две функции. Внешняя функция принимает те параметры, которые нам нужны, а вот внутренняя, асинхронная, принимает на вход функцию dispatch. Кстати, эту внутреннюю функцию вызывать не придется, вся грязная работа делается автоматически за счет проброса действий через контейнер. Работа этого действия для нашей ситуации описывается так:

1. Уведомляем Redux о начале внешнего запроса.
2. Выполняем внешний запрос.
3. Если запрос выполнился удачно, уведомляем Redux и передаем туда полученные данные (если есть).
4. Если запрос выполнился неудачно, уведомляем Redux.

Этот паттерн встречается в реальных приложениях крайне часто.
Посмотрим, как в коде React вызывается обработчик, выполняющий наше действие:

```jsx
class EditTaskForm extends React.Component {
    handleUpdateTask = (values) => {
        const { updateTask, task } = this.props;
        updateTask(task.id, values);
    }

    render() {
        const { taskCreatingState } = this.props;
        const disabled = taskCreatingState === 'requested';

        return (
            <form action="" className="form-inline" onSubmit={this.props.handleSubmit(this.handleUpdateTask)}>
                <div className="form-group mx-3">
                    <Field name="text" required component="input" type="text" />
                </div>
                <button type="submit" disabled={disabled} className="btn btn-primary btn-sm">Update</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'editTask',
})(EditTaskForm);
```

Из кода выше видно, что действие вызывается как обычно.

Библиотека redux-thunk всего лишь один из многих способов работы с асинхронными действиями в Redux. Существуют и другие пакеты, дающие больший контроль и больший уровень автоматизации. Но, как правило, они сложнее в понимании.

```jsx
export default reduxForm({
    form: 'editTask',
})(EditTaskForm);
```

#### ЗАДАЧА ####
Реализуйте взаимодействие с бекендом для создания задач.

Доступные урлы описаны в файле routes.js

src/actions/index.js
Реализуйте необходимые действия

src/components/NewTaskForm.jsx
Реализуйте вывод формы и ее обработчик. Учтите следующие моменты:

Поле для ввода должно быть заблокировано во время отправки формы.
Кнопка должна быть заблокирована во время отправки и до начала каких-либо действий с формой.
Вам не нужно отслеживать эти состояния руками. Для этого redux_form передает соответствующие пропсы:

submitting
pristine
src/index.jsx
Подключите мидлвару thunk.

src/reducers/index.js
Добавьте редьюсер для отслеживания состояния удаления

HTML Начальный вариант формы

```html
<form class="form-inline">
    <div class="form-group mx-3">
        <input name="text" required="" type="text" value="">
    </div>
    <input type="submit" disabled="" class="btn btn-primary btn-sm" value="Add">
</form>
```
После ввода данных
```html
<form class="form-inline">
    <div class="form-group mx-3">
        <input name="text" required="" type="text" value="new taks">
    </div>
    <input type="submit" class="btn btn-primary btn-sm" value="Add">
</form>
```
```jsx
// FILE: /app/src/actions/index.js:
import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');
export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');

export const addTask = ({ task }) => async (dispatch) => {
    const response = await axios.post(routes.tasksUrl(), { task });
    dispatch(addTaskSuccess({ task: response.data }));
};

export const removeTask = task => async (dispatch) => {
    dispatch(removeTaskRequest());
    try {
        const url = routes.taskUrl(task.id);
        await axios.delete(url);
        dispatch(removeTaskSuccess({ id: task.id }));
    } catch (e) {
        dispatch(removeTaskFailure());
        throw e;
    }
};

export const fetchTasks = () => async (dispatch) => {
    dispatch(fetchTasksRequest());
    try {
        const url = routes.tasksUrl();
        const response = await axios.get(url);
        dispatch(fetchTasksSuccess({ tasks: response.data }));
    } catch (e) {
        dispatch(fetchTasksFailure());
        throw e;
    }
};


// FILE: /app/src/components/NewTaskForm.jsx
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

class NewTaskForm extends React.Component {
    handleSubmit = async (values) => {
        const { addTask, reset } = this.props;
        const task = { ...values, id: _.uniqueId(), state: 'active' };
        try {
            await addTask({ task });
        } catch (e) {
            throw new SubmissionError({ _error: e.message });
        }
        reset();
    }


    render() {
        const {
            handleSubmit, submitting, pristine, error,
        } = this.props;
        return (
            <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="form-group mx-3">
                    <Field name="text" required disabled={submitting} component="input" type="text" />
                </div>
                <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Add" />
                {error && <div className="ml-3">{error}</div>}
            </form>
        );
    }
}


const mapStateToProps = (state) => {
    const props = {
        text: state.text,
    };
    return props;
};

const actionCreators = {
    addTask: actions.addTask,
};

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(NewTaskForm);

export default reduxForm({
    form: 'newTask',
})(ConnectedNewTaskForm);


// FILE: /app/src/index.jsx:
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';
import { fetchTasks } from './actions';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        devtoolMiddleware,
    ),
);

store.dispatch(fetchTasks());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container'),
);


// FILE: /app/src/reducers/index.js:
import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const taskRemovingState = handleActions({
    [actions.removeTaskRequest]() {
        return 'requested';
    },
    [actions.removeTaskFailure]() {
        return 'failed';
    },
    [actions.removeTaskSuccess]() {
        return 'finished';
    },
}, 'none');

const tasksFetchingState = handleActions({
    [actions.fetchTasksRequest]() {
        return 'requested';
    },
    [actions.fetchTasksFailure]() {
        return 'failed';
    },
    [actions.fetchTasksSuccess]() {
        return 'finished';
    },
}, 'none');

const tasks = handleActions({
    [actions.fetchTasksSuccess](state, { payload }) {
        return {
            byId: _.keyBy(payload.tasks, 'id'),
            allIds: payload.tasks.map(t => t.id),
        };
    },
    [actions.addTaskSuccess](state, { payload: { task } }) {
        const { byId, allIds } = state;
        return {
            byId: { ...byId, [task.id]: task },
            allIds: [task.id, ...allIds],
        };
    },
    [actions.removeTaskSuccess](state, { payload: { id } }) {
        const { byId, allIds } = state;
        return {
            byId: _.omit(byId, id),
            allIds: _.without(allIds, id),
        };
    },
}, { byId: {}, allIds: [] });

export default combineReducers({
    taskRemovingState,
    tasksFetchingState,
    tasks,
    form: formReducer,
});


// FILE: /app/src/App.jsx:
import React from 'react';
import NewTaskForm from './NewTaskForm';
import Tasks from './Tasks';

const App = () => (
    <div className="col-5">
    <NewTaskForm />
    <Tasks />
    </div>
);
export default App;


// FILE: /app/src/components/Tasks.jsx:
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Tasks extends React.Component {
    handleRemoveTask = id => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    render() {
        const { tasks, tasksFetchingState } = this.props;

        if (tasksFetchingState === 'requested') {
            return (
                <div className="spinner-border m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
        }
        if (tasksFetchingState === 'failed') {
            return (
            <span>Please, reload page!</span>
        );
        }

        if (tasks.length === 0) {
            return null;
        }

        return (
            <div className="mt-3">
                <ul className="list-group">
                    {tasks.map(({ id, text }) => (
                        <li key={id} className="list-group-item d-flex">
                            <span className="mr-auto">{text}</span>
                            <button type="button" data-test="task-remove" className="close" onClick={this.handleRemoveTask(id)}>
                                <span>&times;</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { tasksFetchingState, tasks: { byId, allIds } } = state;
    const tasks = allIds.map(id => byId[id]);
    return { tasks, tasksFetchingState };
};

const actionCreators = {
    removeTask: actions.removeTask,
};

export default connect(mapStateToProps, actionCreators)(Tasks);


// FILE: /app/__tests__/test.jsx:
import timeout from 'timeout-then';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import thunk from 'redux-thunk';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import App from '../src/components/App';
import reducers from '../src/reducers';

Enzyme.configure({ adapter: new Adapter() });

axios.defaults.adapter = httpAdapter;
nock.disableNetConnect();

const host = 'http://localhost';

test('Store', async () => {
    const store = createStore(
        reducers,
        applyMiddleware(thunk),
    );

    const vdom = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    
    const wrapper = mount(vdom);
    expect(wrapper.render()).toMatchSnapshot();

    const newTaskInput = wrapper.find('input[type="text"]');
    const newTaskSubmit = wrapper.find('input[type="submit"]');

    newTaskInput.simulate('change', { target: { value: 'na-na' } });
    expect(wrapper.render()).toMatchSnapshot();

    nock(host)
        .post('/tasks')
        .reply(201, (uri, body) => {
            const data = JSON.parse(body);
            const response = { ...data.task, state: 'active', id: 1 };
            return response;
        });

    newTaskSubmit.simulate('submit');
    await timeout(100);
    expect(wrapper.render()).toMatchSnapshot();

    newTaskInput.simulate('change', { target: { value: 'another task' } });
    expect(wrapper.render()).toMatchSnapshot();

    nock(host).post('/tasks')
        .reply(201, (uri, body) => {
            const data = JSON.parse(body);
            const response = { ...data.task, state: 'active', id: 2 };
            return response;
        });

    newTaskSubmit.simulate('submit');
    await timeout(100);
    expect(wrapper.render()).toMatchSnapshot();

    const links = wrapper.find('[data-test="task-remove"]');
    nock(host).delete('/tasks/1')
        .reply(204);
    links.last().simulate('click');
    await timeout(100);
    expect(wrapper.render()).toMatchSnapshot();
});
```
