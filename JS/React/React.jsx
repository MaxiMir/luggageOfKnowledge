// ################### REACT ###################

/** Преимущества React:

 > МОЛНИЕНОСНЫЙ РЕНДЕРИНГ
 Многие схожие с React библиотеки работают с DOM напрямую.
 А взаимодействие с DOM напрямую негативно отражается на скорости работы приложения. В React решили эту проблему, внедрив концепцию виртуального DOM. Виртуальный DOM — это легковесная копия обычного DOM. Такая работа с DOM оказывается гораздо эффективнее, чем работа из JavaScript напрямую.

 > КОМПОНЕНТНО-ОРИЕНТИРОВАННЫЙ ПОДХОД
 Если говорить простыми словами, то компонент в Реакт — это кусок кода, который представляет какую-то часть на странице (поле для ввода данных, кнопку поиска и т.п.). Из более простых компонентов можно создавать сложные. Созданные в React компоненты вы легко можете переносить из проекта в проект, тем самым ускоряя веб-разработку.

 > УЛУЧШЕННОЕ SEO
 Итоговый HTML, который формируют компоненты, может формироваться как на стороне клиента, так и на стороне сервера, что позволяет создавать так называемые изоморфные приложения. Поисковые системы лучше индексируют страницы таких приложений.

 > ВОЗМОЖНОСТЬ СОЗДАНИЯ МОБИЛЬНЫХ ПРИЛОЖЕНИЙ
 В React за разработку мобильных приложений отвечает платформа React Native. Код, который написан для создания сайта, может быть снова использован для создания мобильного приложения, что значительно сократит время на разработку, если вам нужно и мобильное приложение, и сайт. Библиотека относительно проста в освоении, имеет понятный, лаконичный синтаксис.
 */



/* #@ Компоненты #@ */

// FILE: index.html:
<div id="root1"></div>
<div id="root2"></div>

<script type="text/babel">
    // #1:
    function Car(props) {
        return ( // JSX cинтаксис:
            <div className="car"> // class - зарезервированно
                <h3>{props.name}</h3>
                <p>Year: {props.year}</p>
            </div>
        )
    }

    ReactDOM.render(
        <Car name="Mazda" year="2019"/>, // добавляем компонент + передаем параметры
        document.querySelector('#root2') // место для вставки сгенерированного кода
    )


    // #2:
    const App = (
        <div> // элементы должны быть обернуты в корневой элемент
            <Car name="Ford" year="2019"/>
            <Car name="Mazda" year="2017"/>
        </div>
    )

    ReactDOM.render(
        App, // App содержит JSX код, поэтому его не надо оборачивать в < />
        document.querySelector('#root1') // место для вставки сгенерированного кода
    )
</script>



/* #@ Создание проекта @# */
/*
$ sudo npm install -g create-react-app # установка create-react-app
$ cd WebstormProjects/
$ sudo create-react-app myapp # создание проекта myapp

$ npm run start # запуск версии для разработки приложения (cмотреть package.json ключ scripts)
$ npm run build # для оптимизации приложения (получение статических файлов, которые будут отвечать за функционал всего приложения)
$ npm run test # запуск тестов в React
$ npm run eject # получить доступ к конфигурации для проекта create-react-app

$ npm install -g yarn # file yarn.lock - аналог npm (более оптимизирован для React)
*/


// FILE: /public/manifest.json - превращает приложение в Progressive Web Application


// FILE: /src/index.js:
import React from '/React' // импортируем библиотеку React
import ReactDOM from 'react-dom' // импортируем библиотеку ReactDOM (ядро библиотеки React)
import './index.css' // импортируем стили
import App from './App' // импортируем компонент App
import registerServiceWorker from './registerServiceWorker' // функционал для Progressive Web Application (например кэширование)

ReactDOM.render(<App/>, document.getElementById('root')) // генерируем и вставляем в элемент с ID = root
registerServiceWorker()



/* #@ Cинтаксис JSX + Инлайн стили: @# */

// FILE: /src/App.js:
import React, {Component} from '/React'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Hello world!</h1>
            </div>
        )

        // абстракция <->

        return React.createElement(
            'div', // tag
            { // options:
                className: 'App'
            },
            React.createElement( // children
                'h1', // tag
                null, // options:
                'Hello world!' // text node
            ),
            'Some text...' // text node
        )
    }
}

export default App


// при использовании JSX import React from 'react' обязателен
// if, else, while, for - только вне JSX
// Использовать className вместо class


class App extends Component {
    render() {
        const divStyle = { // создание инлайн стилей
            textAlign: 'center' // ! cвойства в CamelCase
        }

        return (
            <div className="App" style={divStyle}> // инлайн-стили #1
                <h1 style={{color: 'blue', fontSize: '10px'}}>Hello world!</h1> // инлайн-стили #2
            </div>
            <p>Hello</p> // => Ошибка должен возвращаться один корневой элемент (испр. вложить в .App)
        )
    }
}



/* #@ Создание компонентов: @# */

// FOLDER: /src/ cоздаем папку Car и файл Car.js:
import React from '/React' // необходимо импортировать при использовании JSX cинтаксиса

export default () => <h2>This is car component</h2> // Если возвращается несколько строк все оборачиваем в ()


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js' // импортируем компонент Car

class App extends Component {
    render() {
        const divStyle = {
            textAlign: 'center'
        }

        return (
            <div style={divStyle}>
                <h1>Hello world!</h1>
                <Car/> // вставка JSX кода компонента
            </div>
        )
    }
}



/* #@ Вывод динамических данных: @# */

// FILE: /src/Car/Car.js:
import React from '/React'

export default () => (
    <div>
        <p>This is car component</p>
        <p><strong>Number: {Math.round(Math.random() * 100)}</strong></p> // {} - указывает, что внутри JS интерпритация
    </div>
)



/* #@ Передача параметров и контента: @# */

// FILE: /src/Car/Car.js:
import React from '/React'

export default props => (
    <div>
        <h3>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        {props.children} // вывод контента, переданного в компонент (#props.children)
    </div>
)


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    render() {
        const divStyle = {
            textAlign: 'center'
        }

        return (
            <div style={divStyle}>
                <h1>Hello world!</h1>

                <Car name={'Ford'} year={2016} /> // передаем атрибуты
                <Car name="Audi" year={2012} /> // передаем атрибут в виде обычной строки - {} не нужны

                <Car name={'Mazda'} year={2011}>
                    <p style="{{color: red}}">COLOR</p> // передача контента в компонент (#props.children)
                </Car>
            </div>
        )
    }
}



/* #@ State: @# */

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    state = { // задание State (класс должен наследоваться от Component) - описание состояния данного компонента
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ],
        pageTitle: 'React Cars'
    }

    changeTitleHandler = () => { // функция обработчик (cписок events: reactjs.org/docs/events.html)
        const oldTitle = this.state.pageTitle
        const newTitle = `${oldTitle} (changed)`

        this.setState({ // изменение State (заново вызывает метод render)
            pageTitle: newTitle
        })
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        const cars = this.state.cars // берем данные из State

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1> // выводит pageTitle из State
                <button onClick={this.changeTitleHandler}>Change Title</button> // обработчики в CamelCase и без ()

                <Car
                    name={cars[0].name}
                    year={cars[0].year}
                />
                <Car
                    name={cars[1].name}
                    year={cars[1].name}
                />
                <Car
                    name={cars[2].name}
                    year={cars[2].name}
                />
            </div>
        )
    }
}



/* #@ Передача параметров в функцию: @# */

// FILE: /src/Car/Car.js:
import React from '/React'

export default props => (
    <div>
        <h3>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        <button onClick={props.onChangeTitle}>Click</button> // привязываем переданный обработчик к элементу
    </div>
)


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    state = {
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ],
        pageTitle: 'React Components'
    }

    changeTitleHandler = newTitle => {
        this.setState({
            pageTitle: newTitle
        })
    }

    handleInput = event => { // React передает в функцию событие
        this.setState({
            pageTitle: event.target.value // event.target.value - текущее состояние input
        })
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        const cars = this.state.cars

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>
                <input type="text" onChange={this.handleInput}/> // прослушка изменений в input
                <button
                    onClick={this.changeTitleHandler.bind(this, 'Changed!')} // 1 аргумент - контекст, в котором должна быть вызвана функция, 2 и более параметры для функции
                >
                    Change Title
                </button>

                <Car
                    name={cars[0].name}
                    year={cars[0].year}
                    onChangeTitle={this.changeTitleHandler.bind(this, cars[0].name)} // передача обработчика для кастомного компонента #1 cпособ (БОЛЕЕ ПРАВИЛЬНЫЙ - занимает меньше ресурсов у браузера)
                />
                <Car
                    name={cars[1].name}
                    year={cars[1].name}
                    onChangeTitle={() => this.changeTitleHandler(cars[1].name)} // передача обработчика для кастомного компонента #2 cпособ
                />
                <Car
                    name={cars[2].name}
                    year={cars[2].name}
                    onChangeTitle={() => this.changeTitleHandler(cars[2].name)}
                />
        </div>
    )
    }
}



/* #@ Работа со списком: @# */

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    state = {
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ],
        pageTitle: 'React Components'
    }

    changeTitleHandler = newTitle => {
        this.setState({
            pageTitle: newTitle
        })
    }

    handleInput = event => { // React передает событие event
        this.setState({
            pageTitle: event.target.value // меняем заголовок на введенное значение
        })
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>
                <input type="text" onChange={this.handleInput}/>

                <button
                    onClick={this.changeTitleHandler.bind(this, 'Changed!')}
                >
                    Change Title
                </button>

                {
                    this.state.cars.map((car, index) => { // cоздание списка
                        return (
                            <Car
                                key={index} // для каждого элемента списка необходимо определять уникальный key
                                name={car.name}
                                year={car.year}
                                onChangeTitle={() => this.changeTitleHandler(car.name)}
                            />
                        )
                    })
                }
            </div>
        )
    }
}



/* #@ Работа условными операторами: @# */

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    state = {
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ],
        pageTitle: 'React Components',
        showCars: false // добавляем новое значение в состояние
    }

    changeTitleHandler = pageTitle => {
        // если название аргумента (pageTitle) совпадает с названием поля из state можно записывать в сокр. виде:
        this.setState({pageTitle})
    }

    changeCarsHandler = () => { // меняем состояние showCars (булево значение на противоположное)
        this.setState({
            showCars: !this.state.showCars
        })
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        let cars = null

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <Car
                        key={index}
                        name={car.name}
                        year={car.year}
                        onChangeTitle={() => this.changeTitleHandler(car.name)}
                    />
                )
            })
        }

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>
                <button onClick={this.changeCarsHandler}> // по клику меняем значение showCars в состоянии
                    Tooggle Cars
                </button>
                {cars} // выводим список Сars или null
            </div>
        )
    }
}



/* #@ Динамические списки: @# */

// FILE: /src/Car/Car.js:
import React from '/React'

export default props => (
    <div
        style={{
            border: '1px solid #ccc',
            marginBottom: '10' // px - можно не прописывать
        }}
    >
        <h3>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        <input type="text" onChange={props.onChangeName} value={props.name}/> // добавляем input c обработчиком
        <button onClick={props.onDelete}> // добавляем кнопку с удалением элемента
            Delete
        </button>
    </div>
)


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    state = {
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ],
        pageTitle: 'React Components',
        showCars: false
    }

    changeCarsHandler = () => {
        this.setState({
            showCars: !this.state.showCars
        })
    }

    deleteHandler(index) { // другой вид объявления функции (ОТЛИЧИЕ: стрелочная функция не создает свой собственный контекст)
        // здесь функция создает свой контекст вызова и например, this.setState === undefined.
        // чтобы можно было обратиться к this.setState, ее необходимо вызвать так: this.deleteHandler.bind(this, index)
        // или так: () => this.deleteHandler(value)
        const cars = [...this.state.cars]
        cars.splice(index, 1)

        this.setState({cars})
    }

    onChangeName(name, index) {
        const car = this.state.cars[index]
        car.name = name

        const cars = [...this.state.cars]
        cars[index] = car

        this.setState({
            cars
        })
    }


    render() {
        const divStyle = {
            textAlign: 'center'
        }

        let cars = null

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <Car
                        key={index}
                        name={car.name}
                        year={car.year}
                        onChangeName={event => this.onChangeName(event.target.value, index)} // event - cобытие (автоматически передается React), event.target.value - значение из input, index -берется из map
                        onDelete={this.deleteHandler.bind(this, index)}
                    />
                )
            })
        }

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>
                <button onClick={this.changeCarsHandler}>
                    Tooggle Cars
                </button>
                {cars}
            </div>
        )
    }
}



/* #@ Подключение CSS и Динамические классы: @# */

// FOLDER: /src/Car/ создаем файл Car.css:
/*
.Car {
    dispay: block
    border: 1px solid #ccc
    margin-bootom: 10px
    padding: 10px
    transition: border, box-shadow .3s
}

.input {}

.input:active,
.input:focus {
    oputline: none
}

.input.green {
    border: 1px solid green
}

.input.red {
    border: 1px solid red
}

.input.bold {
    border: 2px solid green
    font-weight: bold
}
*/

// FILE: /src/Car/Car.js:
import React from '/React'
import './Car.css' // подключаем файл стилей

export default props => {
    const inputClasses = ['input']
    const secInputClass = props.name === '' ? 'red' : 'green';

    inputClasses.push(secInputClass)

    if (props.name.length > 4) {
        inputClasses.push('bold')
    }

    const currentInputClass = inputClasses.join(' ');

    return (
        <div className="Car"> // указываем класс из файла стилей
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
            <input
                type="text"
                onChange={props.onChangeName}
                value={props.name}
                className={currentInputClass}
            />
            <button onClick={props.onDelete}>Delete</button>
        </div>
    )
}



/* #@ Библиотека Radium: @# */

// $ yarn add radium
// $ yarn start // заново собираем проект


// FILE: /src/Car/Car.js:
import React from '/React'
import Radium from 'radium' // подключаем библиотеку Radium
import './Car.css' // подключаем файл стилей

const Car = props => {
    const inputClasses = ['input']
    const secInputClass = props.name === '' ? 'red' : 'green';

    inputClasses.push(secInputClass)

    if (props.name.length > 4) {
        inputClasses.push('bold')
    }

    const currentInputClass = inputClasses.join(' ');

    const style = {
        border: '1px solid #ccc',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
        ':hover': { // используем библиотеку Radium
            border: '1px solid #aaa',
            boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
            cursor: 'pointer'
        }
    }

    return (
        <div className="Car" style={style}>
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
            <input
                type="text"
                onChange={props.onChangeName}
                value={props.name}
                className={currentInputClass}
            />
            <button onClick={props.onDelete}>
                Delete
            </button>
        </div>
    )
}

export default Radium(Car) // обрачиваем компонент Car в функционал пакета Radium


/* #@ CSS-модули: @# (#css-loader) */
// $ Ctrl+C останавливаем проект
// $ yarn run eject - вызывается для получения доступа от конфигурации сreate-react-app

// FILE: /config/webpack.config.dev.js найти module.exports -> module в нем:
{
    test: /\.css$/,
    use: [
        require.resolve('style-loader'), // преобразовывает в css
        {
            loader: require.resolve('css-loader'), // для загрузки css
            options: {
                importLoaders: 1,
                modules: true, // добавляем
                localIdentName: '[name]__[local]__[hash:base64:5]' // добавляем - какое имя класса будет сгенерировано для каждого компонента; Здесь: Название-класса__Название компонента__рандомный-хэш-из-5-символов
            }
        }
    ]
}

// FILE: /config/webpack.config.prod.js найти module в нем:
{
    test: /\.css$/,
    loader:
    ExtractTextPlugin.extract(
        Object.assign(
            {
                fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                        hmr: false,
                    },
                },
                use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: shouldUseSourceMap,
                            modules: true, // добавляем
                            localIdentName: '[name]__[local]__[hash:base64:5]' // добавляем
                        },
                    },
                ]
            }
        )
    )
}

// $ yarn start // cобираем проект

// После этого стили из файла /src/Car/Car.css пропадут.
// Стили стали локальными, исправляем это:

// FILE: /src/Car/Car.js:
import React from '/React'
import Radium from 'radium'
import classes from './Car.css' // сохраняем CSS классы в переменную

const Car = props => {
    const inputClasses = [classes.input] // добавляем стили .input
    const secInputClass = props.name === '' ? classes.red : classes.green;  // добавляем стили .green или стили .red

    inputClasses.push(secInputClass)

    if (props.name.length > 4) {
        inputClasses.push(classes.bold) // добавляем стили .bold
    }

    const currentInputClass = inputClasses.join(' ');

    const style = {
        border: '1px solid #ccc',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
        ':hover': {
            border: '1px solid #aaa',
            boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
            cursor: 'pointer'
        }
    }

    return (
        <div className="{classes.Car}" style={style}>
            // Конечный вид после преобразования в DOM - class="Car__Car__qfbwz"
            // В CSS: Car__Car__qfbwz {...}
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
            <input
                type="text"
                onChange={props.onChangeName}
                value={props.name}
                className={currentInputClass}
            />
            <button onClick={props.onDelete}>
                Delete
            </button>
        </div>
    )
}



/*@ Препроцессоры: @*/

// $ yarn add node-sass // устанавливаем библиотеку для работы с SCSS


// УСТАРЕВШИЙ СПОСОБ:
// $ yarn add node-sass sass-loader // устанавливаем библиотеку для работы с SCSS

// FILE: /config/webpack.config.dev.js:
{
    test: /\.css$/,
    // ...
},
// добавляем новый loader:
{
    test: /\.scss$/,
    use: [
        require.resolve('style-loader'), // в конце style-loader
        require.resolve('css-loader'), // затем css-loader
        require.resolve('sass-loader'), // вначале будет работать sass-loader
    ]
}

// FILE: /config/webpack.config.prod.js:
{
    test: /\.css$/,
    // ...
}

// добавляем новый loader:
{
    test: /\.scss$/,
    use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        require.resolve('sass-loader'),
    ]
}



// $ yarn start // cобираем проект


// FOLDER: /src/ переименовываем App.css -> App.scss:
/*
.AppButton {
    padding: 8px 10px
    border: 1px solid #ccc
    font-weight: bold

    &:focus, &:active {
        outline: none
    }

    &:hover {
        background: #000
    }
}
*/

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.scss' // импортируем App.scss
import Car from './Car/Car.js'

class App extends Component {
    // ...

    render() {
        // ...

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>

                <button
                    className={'AppButton'} // добавляем кнопке класс AppButton
                    onClick={this.changeCarsHandler}
                >
                    Tooggle Cars
                </button>
                {cars}
            </div>
        )
    }
}



/* CSS (SCSS) модули (! create-react-app)*/

// RENAME FILE: App.scss -> App.module.scss
import './App.scss';
// ->
import classes from './App.module.scss';
/*
classes; // классы с хэшами ->
{
    "App": 'App_App__15LN' //
    "App-header": 'App_App-header__3nnPn'
}
*/

function App() {
    return (
        <div className={classes.App}>
            <header className={classes['App-header']}>

            </header>
        </div>
    )
}


/* #@ Передача параметров в компонент: @# */

// FILE: /src/index.js:
import React from '/React'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import serviceWorker from './serviceWorker'

ReactDOM.render(<App title={'I am from props'}/>, document.getElementById('root')) // передаем параметр title


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    // ...

    render() {
        // ...

        return (
            <div style={divStyle}>
                <h1>{this.props.title}</h1> // выводим переданный в App компонент параметр (! в классах через this)
                <button onClick={this.changeCarsHandler}>
                    Tooggle Cars
                </button>
                {cars}
            </div>
        )
    }
}



/* #@ Ининициализация State: @# */

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'

class App extends Component {
    constructor(props) { // в props попадают переданные параметры
        super(props) // вызов родительского конструктора

        this.state = { // инициализируем State
            cars: [
                {name: 'Ford', year: 2018},
                {name: 'Audi', year: 2012},
                {name: 'Mazda', year: 2011}
            ],
            pageTitle: 'React Components',
            showCars: false
        }
    }

    // ...
}



/* #@ Базовый жизненный цикл: @# */

// ! доступны для классов наследников от базового класса (Component)

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'


class App extends Component {
    // ...

    constructor(props) { // вызывается до жизнненых циклов компонента
        super(props)
    }

    componentWillMount() { // 1 жизненный цикл - вызывается при инициализации React компонента.

    }

    componentDidMount() { // 3 жизненный цикл - HTML в React готов

    }

    render() { // 2 жизненный цикл - формирует конечный JSX, который в конечном итоге будет представлен в HTML. Может вызываться несколько раз
        // ...
    }
}



/* #@ Создание Stateful компонента: @# */

// Stateful компонент имеет доступ к жизненным циклам

// FILE: /src/Car/Car.js:
import React from '/React'
import Radium from 'radium'
import classes from './Car.css'

// ! cтараться избегать частого создания компонентов наследников React.Component - лучше функциональные компоненты React

class Car extends React.Component { // если import React,{Component} from 'react' -> extends Component
    render() {
        const inputClasses = [classes.input]

        if (this.props.name != '') { // если class у props прописываем this
            inputClasses.push(classes.green)
        } else {
            inputClasses.push(classes.red)
        }

        if (this.props.name.length > 4) {
            inputClasses.push(classes.bold)
        }

        const style = {
            border: '1px solid #ccc',
            boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
            ':hover': {
                border: '1px solid #aaa',
                boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
                cursor: 'pointer'
            }
        }

        return (
            <div className="{classes.Car}" style={style}>
                <h3>Car name: {this.props.name}</h3>
                <p>Year: <strong>{this.props.year}</strong></p>
                <input
                    type="text"
                    onChange={this.props.onChangeName}
                    value={this.props.name}
                    className={inputClasses.join(' ')}
                />
                <button onClick={this.props.onDelete}>Delete</button>
            </div>
        )
    }
}

export default Radium(Car)



/* #@ Жизненный цикл изменения/удаления: @# */

// FILE: /src/Car/Car.js:
import React from '/React'
import Radium from 'radium'
import classes from './Car.css'

class Car extends React.Component {

    componentWillReceiveProps(nextProps) { // #1 для синхронизации локального State с входящими свойствами (version < 16.3)

    }

    shouldComponentUpdate(nextProps, nextState) { // #2 если возвращает true - необходимо перерисовывать компонент, false - нет
        // единственный из жизненных циклов, который что-то должен вернуть
        return nextProps.name.trim() !== this.props.name.trim()
    }

    componentWillUpdate(nextProps, nextState) { // #3 подготавливаемся к изменению компонента, например, синхронизировать локальный State с входящими свойствами (version < 16.3)

    }

    static getDerivedStateFromProps(nextProps, prevState) { // <-> componentWillUpdate, но запрещает изменение State напрямую (исп. без componentWillReceiveProps и componentWillUpdate) (version > 16.3)
        return { // возвращаем результирующий State, который будет смержен с основным State

        }
    }

    componentDidUpdate() { // #5

    }

    getSnapshotBeforeUpdate() { // вызывается после Car render и перед componentDidUpdate - позволяет получить неизменное до обновления DOM дерево (version > 16.3)

    }

    componentWillUnmount() { // вызывается, когда идет разрушение компонента и он удаляется из DOM дерева

    }

    render() { // #4
        // ...
    }
}

export default Radium(Car)



/* #@ ErrorBoundary (version > 16): @# */

// В /src/ создаем FOLDER ErrorBoundary, а в нем FILE ErrorBoundary.js:
import React, {Component} from '/React'

export default class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error, info) { // отлавливает Exception у детей
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{color: 'red'}}>Something went wrong</h1>
        }

        return this.props.children  // иначе показываем сам компонент
    }
}


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary.js' // импортируем компонент


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cars: [
                {name: 'Ford', year: 2018},
                {name: 'Audi', year: 2012},
                {name: 'Mazda', year: 2011}
            ],
            pageTitle: 'React Components',
            showCars: false
        }
    }

    onChangeName(name, index) {
        const car = this.state.cars[index]
        car.name = name

        const cars = [...this.state.cars]
        cars[index] = car

        this.setState({
            cars
        })
    }

    deleteHandler(index) {
        const cars = [...this.state.cars]
        cars.splice(index, 1)

        this.setState({cars})
    }

    render() {
        if (Math.random() > 0.7) { // генерация случайной ошибки
            throw new Error('Car random failed')
        }

        const divStyle = {
            textAlign: 'center'
        }

        const cars = this.state.cars

        let cars = null

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <ErrorBoundary key={index}> // оборачиваем компонент Car в ErrorBoundary + переносим key из Car в
                    ErrorBoundary, тк он является корневым
                        <Car
                            name={car.name}
                            year={car.year}
                            onChangeName={event => this.onChangeName(event.target.value, index)} // event - cобытие (автоматически передается React), event.target.value - значение из input, index -берется из map
                            onDelete={this.deleteHandler.bind(this, index)}
                        />
                    </ErrorBoundary>
                )
            })
        }

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>
                <button onClick={this.changeCarsHandler}>
                Tooggle Cars
                </button>
                {cars}
            </div>
        )
    }
}



/* #@ Фрагменты: @# */

// в /src/ создаем папку Counter, а в нем FILE Сounter.js:
import React, {Component} from '/React'

export default class Counter extends Component {
    state = {
        counter: 0
    }

    addCounter = () => {
        // this.setState({
        //     counter: this.state.counter + 1
        // })

        this.setState(prevState => { // БОЛЕЕ ПРАВИЛЬНЫЙ И БЕЗОПАСНЫЙ: защита от асинхронных изменений state
            return {
                counter: prevState.counter + 1
            }
        });
    }

    render() {
        // #1
        return (
            <div>
                <h2>Counter {this.state.counter}</h2>
                <button onClick={this.addCounter}>+</button>
                <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button> // изменение State в JSX
            </div>
        )

        // #2 без корневого элемента (version > 16)
        return [
            <h2 key={'1'}>Counter {this.state.counter}</h2>,
            <button
                key={'2'}
                onClick={this.addCounter}
            >
                +
            </button>,
            <button
                key={'3'}
                onClick={() => this.setState({counter: this.state.counter - 1})}
            >
                -
            </button>
        ]

        // #3 НАИБОЛЕЕ ВАЛИДНЫЙ СПОСОБ:
        return (
            <React.Fragment> // скоро появится <></>
                <h2>Counter {this.state.counter}</h2>
                <button onClick={this.addCounter}>+</button>
                <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
            </React.Fragment>
        )
    }
}

// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'
import Counter from './Counter/Counter.js' // импортируем компонент

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cars: [
                {name: 'Ford', year: 2018},
                {name: 'Audi', year: 2012},
                {name: 'Mazda', year: 2011}
            ],
            pageTitle: 'React Components',
            showCars: false
        }
    }

    onChangeName(name, index) {
        const car = this.state.cars[index]
        car.name = name

        const cars = [...this.state.cars]
        cars[index] = car

        this.setState({
            cars
        })
    }

    deleteHandler(index) {
        const cars = [...this.state.cars]
        cars.splice(index, 1)

        this.setState({cars})
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        let cars = null

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <Car
                        name={car.name}
                        year={car.year}
                        onChangeName={event => this.onChangeName(event.target.value, index)}
                        onDelete={this.deleteHandler.bind(this, index)}
                    />
                )
            })
        }

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>
                <Counter/> // вставляем компонент
                <button
                    style={{marginTop: 10}}
                    className={'AppButton'}
                    onClick={this.changeCarsHandler}
                >
                    Tooggle Cars
                </button>
                {cars}
            </div>
        )
    }
}


// в /src/ создаем папку hoc (high order components), а в нем FILE Auxiliary.js:
import React from '/React'

const Auxiliary = props => {
    return props.children
}

export default Auxiliary


// FILE Сounter.js:
import React, {Component} from '/React'
import Auxiliary from '..hoc/Auxiliary'

export default class Counter extends Component {
    state = {
        counter: 0
    }

    addCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <Auxiliary> // через свой компонент
                <h2>Counter {this.state.counter}</h2>
                <button onClick={this.addCounter}>+</button>
                <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
            </Auxiliary>
        )
    }
}


/* #@ Компоненты высшего порядка HIGH ORDER COMPONENTS: @# */
/* #@ Валидация параметров с PropTypes: @# */
/* #@ Референции: @# */

// $ yarn add prop-types // устанавливаем пакет (c version 15.5 стала отдельным пакетом)
// $ yarn start

// FOLDER: /src/hoc/ создаем файл withClass.js:
import React from '/React'

const withClass = (Component, className) => { // оборачивает Component в section c классом className
    return props => {
        return (
            <section className={className}>
                <Component {...props} /> // передаем в Component опции из App компонента
            </section>
        )
    }
}

export default withClass


// FILE: /src/Car/Car.js:
import React from '/React'
import classes from './Car.css'
import PropTypes from 'prop-types'
import withClass from '../hoc/withClass'

class Car extends React.Component {
    constructor(props) {
        super(props)

        // C VERSION 16 фокус:
        this.inputRef = React.createRef()
    }

    componentDidMount() { // элемент зарендерен
        // До VERSION < 16 фокус через референции:
        this.inputRef.focus() // так будем фокусироваться на последнем input

        /* для фокуса на первом input в App.js в Сar передаем index:
        <Car
            name={car.name}
            year={car.year}
            index={index}
            ...
        />

        А здесь:
        */
        if (this.props.index === 0) {
            this.inputRef.focus()
        }


        // C VERSION 16:
        if (this.props.index === 0) {
            this.inputRef.current.focus() // current - для оптимизации
        }
    }


    render() {
        const inputClasses = [classes.input]

        if (this.props.name != '') {
            inputClasses.push(classes.green)
        } else {
            inputClasses.push(classes.red)
        }

        if (this.props.name.length > 4) {
            inputClasses.push(classes.bold)
        }

        return (
            <React.Fragment>
                <h3>Car name: {this.props.name}</h3>
                <p>Year: <strong>{this.props.year}</strong></p>
                <input
                    ref={inputRef => this.inputRef = inputRef} // До VERSION < 16: записываем в свойство ref на элемент; атрибут не виден в HTML.
                    ref={this.inputRef} // C VERSION 16
                    type="text"
                    onChange={this.props.onChangeName}
                    value={this.props.name}
                    className={inputClasses.join(' ')}
                />
                <button onClick={this.props.onDelete}>
                    Delete
                </button>
            </React.Fragment>
        )
    }
}

Car.propTypes = { // указываем типы данных для свойств только для statefull компонентов (class + extends Component)
    name: PropTypes.string.isRequired, // обязательное свойство + тип строка
    year: PropTypes.number,
    index: PropTypes.number,
    onChangeName: PropTypes.func,
    OnDelete: PropTypes.func

  // todos: PropTypes.arrayOf(PropTypes.object) // массив c объектами
}

export default withClass(Car, classes.Car); // используем hoc withClass

// Референции используются при работе с svg, canvas, html5 (audio, video), обертка плагина



/* #@ Context API: @# */
// + FILE /src/Counter2/Сounter2.js:
import React from '/React'
import {ClickedContext} from '../App'

export default props => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                width: 200,
                margin: '0 auto'
            }}
        >
            <h3>Counter 2</h3>
            <ClickedContext.Consumer>
                {clicked => clicked ? <p>Clicked</p> : null}
            </ClickedContext.Consumer>
        </div>
    )
}


// FILE: /src/Counter/Counter.js:
import React, {Component} from '/React'
import Auxiliary from '..hoc/Auxiliary'
import Counter2 from '../Counter2/Counter2'

export default class Counter extends Component {
    state = {
        counter: 0
    }

    addCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <Auxiliary>
                <h2>Counter {this.state.counter}</h2>
                <Counter2 />
                <button onClick={this.addCounter}>+</button>
                <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
            </Auxiliary>
        )
    }
}


// FILE /src/App.js:
import React, {Component} from '/React'
import './App.css'
import Car from './Car/Car.js'
import Counter from './Counter/Counter.js'

export const ClickedContext = React.createContext(false); // создаем контекст cо значением по умолчанию

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clicked: false,
            cars: [
                {name: 'Ford', year: 2018},
                {name: 'Audi', year: 2012},
                {name: 'Mazda', year: 2011}
            ],
            pageTitle: 'React Components',
            showCars: false
        }
    }

    onChangeName(name, index) {
        const car = this.state.cars[index]
        car.name = name

        const cars = [...this.state.cars]
        cars[index] = car

        this.setState({
            cars
        })
    }

    deleteHandler(index) {
        const cars = [...this.state.cars]
        cars.splice(index, 1)

        this.setState({cars})
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        let cars = null

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <Car
                        name={car.name}
                        year={car.year}
                        onChangeName={event => this.onChangeName(event.target.value, index)}
                        onDelete={this.deleteHandler.bind(this, index)}
                    />
                )
            })
        }

        return (
            <div style={divStyle}>
                <h1>{this.state.PageTitle}</h1>

                <ClickedContext.Provider value="this.state.clicked">
                    <Counter/> // оборачиваем компонент, в который необходимо передать ClickedContext
                </ClickedContext.Provider>

                <button
                    style={{marginTop: 10}}
                    className={'AppButton'}
                    onClick={this.changeCarsHandler}
                >
                    Tooggle Cars
                </button>

                <button onClick={() => this.setState({clicked: true})}>
                    Changed clicked
                </button>
                {cars}
            </div>
        )
    }
}



/* #@ ПРАКТИКА: @# */

/* #@ Создание проекта: @# */
// $ cd WebstormProjects/
// $ create-react-app react-quiz
// $ yarn eject # для того чтобы пользоваться различными конфигурациями webpack (нативный в сreate-react-app) и css модулями
// $ yarn install # обновить список зависимостей
// $ yarn start # запусить проект

/** DROP:
 * /src/App.test.js
 * /src/logo.svg
 * /src/App.css
 */


// FILE /src/App.js:
import React, {Component} from '/React'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz.js'

class App extends Component {
    render() {
        return (
            <Layout>
                <Quiz/>
            </Layout>
        )
    }
}

export default App



/* #@ Создание Layout: @# */
// + FOLDER /src/hoc/Layout/  + FILE /src/hoc/Layout.js:
import React, {Component} from '/React'
import classes from './Layout.css'

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout


// FOLDER /src/hoc/Layout/ создаем FILE Layout.js:
/*
.Layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.Layout main {
    display: flex;
    flex-direction: column;
    flex-grow: 1; // main - будет занимать всю доступную высоту
}
*/


// Настраиваем сss loader (#css-loader)


/* #@ Создание главной страницы: @# */
/* #@ Компонент активного вопроса @# */

// + FOLDER /src/containers/ - здесь будут хранится компоненты со cвоим state
// + FOLDER /src/components/ - здесь будут хранится функциональные компоненты

// + FOLDER /src/containers/Quiz/
// + FILE /src/containers/Quiz/Quiz.js:
import React, {Component} from '/React'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success error} - для всех вопросов
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' || 'error'}
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо',
                rightAnswerId: '2',
                answers: [
                    {id: 1, text: 'Черный'},
                    {id: 2, text: 'Синий'},
                    {id: 3, text: 'Красный'},
                    {id: 4, text: 'Зеленый'},
                ]
            },
            {
                id: 2,
                question: 'В каком году основали Санкт-Петербург',
                rightAnswerId: '3',
                answers: [
                    {id: 1, text: '1700'},
                    {id: 2, text: '1702'},
                    {id: 3, text: '1703'},
                    {id: 4, text: '1803'},
                ]
            },
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) { // исправление бага с двойным кликом
            const key = Object.keys(this.state.answerState)[0]

            if (this.state.answerStatep[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId !== answerId) {
            results[question.id] = 'error'

            this.setState({
                results,
                answerState: {[answerId]: 'error'}
            })
        } else {
            if (!results[question.id]) { // на вопрос еще не отвечали
                results[question.id] = 'success'
            }

            this.setState({
                results,
                answerState: {[answerId]: 'success'}
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null // обнуляем answerState для следующего вопроса
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => { // чтобы не терять контекст
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                            ?   <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}
                                />
                            :   <ActiveQuiz
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    onAnswerClick={this.onAswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz

// + FILE /src/containers/Quiz/Quiz.css:
/*
.Quiz {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    flex-grow: 1;
    width: 100%;
    background: linear-gradient(90 deg, #5041b2 0%, #7969e6 100%);
}

.Quiz h1 {
    color: #fff;
    margin-left: 10px;
}

.QuizWrapper {
    width: 600px;
}
*/


// + FOLDER /src/components/ActiveQuiz/ + FILE /src/components/ActiveQuiz.js:
import React from '/React'
import classes from './ActiveQuiz.css'
import AnswersList from './AnsersList/AnsersList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>

        <AnsersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAswerClick}
        />
    </div>
)

export default ActiveQuiz

// FOLDER /src/ActiveQuiz/ создаем FILE ActiveQuiz.css:
/*
.ActiveQuiz {
    padding: 20px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 5px;
    margin: 0 10px;
    box-sizing: border-box;
}

.Question {
    display: flex;
    jusctify-content:space-between;
}
*/


/* #@ Список вопросов: @# */
/* #@ Обработка клика: @# */
/* #@ Вывод результатов: @# */

// + FOLDER /src/components/ActiveQuiz/AnswersList/
// + FILE /src/components/ActiveQuiz/AnswersList/AnswersList.js
 import React from '/React'
import classes from './AnwersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnwersList = props => (
    <ul className={classes.AnwersList}>
        {
            props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        state={!props.state ? null : props.state[answer.id]}
                    />
                )
            })
        }
    </ul>
)

export default AnwersList



// + FILE /src/ActiveQuiz/AnswersList/AnswersList.css:
/*
.AnswersList {
    list-style: none;
    masrgin: 0;
    padding: 0;
}
*/



// + FOLDER /src/ActiveQuiz/AnswersList/AnswerItem/
// + FILE /src/ActiveQuiz/AnswersList/AnswerItem/AnswerItem.js:
import React from '/React'
import classes from './AnswerItem.css'

const AnswerItem = props => {
    const cls = [classes.AnswerItem]

    if (props.state) {
        cls.push(classes[props.state]) // в classes[props.state] success || error
    }

    const clsList = cls.join(' ');

    return (
        <li
            className={clsList}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem


// FOLDER /src/ActiveQuiz/AnswersList/AnswerItem/ создаем FILE AnswerItem.css:
/*
.AnswerItem {
    boder: 1px solid #fff;
    border-radius: 5px;
    padding: 5px 10px;
    margin-bottom: 5px;
    cursor: pointer;
}

.AnswerItem:hover {
    background: rgba(255, 255, 255,.2);
    transition: background .3s ease-in-out;
}

.AnswerItem.success {
    background: rgba(161, 240, 69, .7);
}

.AnswerItem.error {
    background: rgba(240, 87, 108, .7);
}
*/


// + FOLDER: /src/components/FinishedQuiz/
// + FILE: /src/components/FinishedQuiz/FinishedQuiz.js:
import React from '/React'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div classes={classess.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizItem.id]]
                        ]

                        return (
                            <li
                                key={index}
                            >
                                <strong>{index + 1}</strong>. &nbsp;
                                {quizItem.question}
                                <i className={cls.join('')}/>
                            </li>
                        )
                    })
                }
            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button
                    onClick={props.onRetry}
                    type="primary"
                >
                    Повторить
                </Button>
                <Button
                    type="success"
                >
                    Перейти в список тестов
                </Button>
            </div>
        </div>
    )
}

export default FinishedQuiz


// + FILE /src/components/FinishedQuiz/FinishedQuiz.css:
/*
.FinishedQuiz {
    padding: 20px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0 10px;
}

.FinishedQuiz ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.FinishedQuiz ul li i {
    margin-left: 10px;
}

.success {
    color: rgba(161, 240, 69, .7);
}

.error {
    color: rgba(240, 87, 108, .7);
}
*/


// FOLDER: /src/components/ создаем FOLDER UI, затем FOLDER Button, а в нем Button.js:
import React from '/React'
import classes from './Button.css'

const Button = props => {
    const cls = [
        classes.Button,
        classes[props.type]
    ]
    const clsList = cls.join(' ')

    return (
        <button
            onClick={props.onClick}
            className={clsList}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}


// FOLDER: /src/components/UI/Button/ создаем Button.css:
/*
.Button {
    display: inline-block
    padding: 10px 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #000;
    margin-right: 15px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
}

.Button:focus {
    outline: none;
}

.Button:active {
    box-shadow: inset 2px 2px 1px rgba(0,0,0,.3);
}

.Button:disabled {
    background: #ccc;
    color: #000;
    cursor:not-allowed;
}

.success {
    color: rgba(161, 240, 69, 1);
}

.error {
    color: rgba(240, 87, 108, 1);
}

.primary {
    background: #2883f6;
    color: #fff;
}
*/




/* #@ Кнопка переключения меню: @# */
// FOLDER: /src/components/ создаем FOLDER Navigation, затем FOLDER MenuToggle а в нем FILE: MenuToggle.js:
import React from '/React'
import classes from './MenuToggle.css'

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
        'fa',
    ]

    if (!props.isOpen) {
        cls.push('fa-bars')
    } else {
        cls.push('fa-times')
        cls.push(classes.open)
    }

    const clsList = cls.join(' ')

    return (
        <i
            className={clsList}
            onClick={props.onToggle}
        />
    )
}

export default MenuToggle

// FOLDER: /src/components/Navigation/MenuToggle/ создаем FILE: MenuToggle.css:
/*
.MenuToggle {
    position: fixed;
    top: 40px;
    left: 40px;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
    transition: opacity, left .22s ease-in;
    z-index: 100;
}

.MenuToggle:hover {
    opacity: .7;
}

.MenuToggle.open {
    left: 320px;
}
*/

// FOLDER /src/hoc/Layout/Layout.js:

import React, {Component} from '/React'
import classes from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                    <Drawer
                        isOpen={this.state.menu}
                        onClose={this.menuCloseHandler}
                    />

                    <MenuToggle
                        onToggle={this.toggleMenuHandler}
                        isOpen={this.state.menu}
                    />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout



// + FOLDER: /src/components/Navigation/Drawer/
// + FILE: /src/components/Navigation/Drawer/Drawer.js:
import React, {Component} from '/React'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends Component {
    const links = [
        1, 2, 3
    ]

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    Link {link}
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const clsList = cls.join(' ')

        return (
            <ReactFragment>
                <nav className={clsList}>
                    <ul>
                        <a>{ this.renderLinks()}</a>
                    </ul>
                </nav>
                { !this.props.isOpen ? null : <Backdrop onClick={props.onClose} /> }
            </ReactFragment>
        )
    }
}

export default Drawer



// FOLDER: /src/components/Navigation/Drawer/ создаем FILE Drawer.css:
/*
.Drawer {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80%;
    max-width: 300px;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #fff;
    transform: translateX(0px);
    transition: transform .22s ease-in;
    z-index: 90;
}

.Drawer.close {
    transform: translateX(-300px);
}

.Drawer ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.Drawer ul li {
    margin-bottom: 15px;
}

.Drawer ul li a {
    color: #363d54;
    font-size: 30px;
    text-decoration: none;
    background: #fff;
    position: relative;
    padding: 0 20px 10px 20px;
    transition: opacity .3s;
}

.Drawer ul li a:hover,
.active {
    opacity: .7;
}
*/




/* #@ Компонент затемнения: @# */
// + FOLDER /src/components/UI/Backdrop/
// + FILE /src/components/UI/Backdrop/Backdrop.js:
import React from '/React'
import classes from './Backdrop.css'

const Backdrop = props => <div className={classes.Backdrop} onClick={this.props.onClick} />

export default Backdrop

// FOLDER: /src/components/UI/Backdrop/ создаем FILE Backdrop.css:
/*
.Backdrop {
    z-index: 50;
    background: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

}
 */




/* #@ React Router: @# */
// Ctrl+C
// $ yarn add react-router-dom
// $ yarn start


// FILE: /src/index.js:
import React from '/React'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom' // импортируем компонент для роутинга
import registerServiceWorker from './registerServiceWorker'

сonst app = (
    <BrowserRouter> // оборачиваем App в компонент роутинга
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()



// FILE /src/App.js:
import React, {Component} from '/React'
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom' // Switch - позволяет загружать 1 нужный роут
import Quiz from './containers/Quiz/Quiz.js'

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/auth" component={Quiz} />
                    <Route path="/quiz-creator" component={Quiz} />
                    <Route path="/quiz/:id" component={Quiz} />
                    <Route path="/" component={Quiz} />
                </Switch>
            </Layout>
        )
    }
}

export default App















/* #@ React Router: @# */
// Ctrl+C
// $ yarn add react-router-dom
// $ yarn start


// FILE: /src/index.js:
import React from '/React'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom' // импортируем компонент для роутинга
import registerServiceWorker from './registerServiceWorker'

сonst app = (
    <BrowserRouter> // оборачиваем App в компонент роутинга
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()



// FILE: /src/App.js:
import React, {Component} from '/React'
import './App.sccs'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom' // импортируем компонент для регистрации роутов + компонент для навигации + компонент для переключения по роутам + компонент редирект
import About from './About/About'
import Cars from './Cars/Cars'
import CarDetail from './CarDetail/CarDetail' // импортируем компонент

class App extends Component {
    render() {
        state = {
            isLoggedIn: false
        }

        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                exact
                                activeClassName={'wfm-active'}
                                activeStyle={{
                                    color: 'blue'
                                }}
                            >
                                Home
                            </NavLink> // навигация без перезагрузки страницы
                        </li>
                        <li>
                            <NavLink
                                to={{
                                    pathname: '/about',
                                    search: '?a=1&b=2',
                                    hash: 'wfm-hash'
                                }}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cars">Cars</NavLink>
                        </li>
                    </ul>
                </nav>

                <hr />

                <div style={{textAlign: 'center'}}>
                    <h3>Is logged in {this.state.isLoggedIn ? 'TRUE' : 'FALSE'}</h3>
                    <button onClick={() => this.setState({isLoggedIn: true})}>Login</button>
                </div>

                <hr />

                <Switch> // показывает 1-й компонент, который попался в списке

                    <Route path="/" exact render={() => <h1>Home Page</h1>} /> // регистрируем роут для домашней страницы; exact - рендерить при полном совпадении с путем

                    { !this.state.isLoggedIn ? null : <Route path="/about" exact component={About} />} // добавление роута по условию; регистрируем роут + указываем какой компонент рендерить

                    <Route path="/cars/:name" component={CarDetail} /> // динамический роут

                    <Route path="/cars" component={Cars} />

                    <Redirect to={'/'} /> // редирект на главную

                    <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} /> // страница 404

                </Switch>
            </div>
        )
    }
}

export default App


// FILE: /src/App.scss:
/*
    .nav {
        a.active, a.wfm-active {
            font-weight: bold;
        }
    }
*/


// FILE: /src/Cars/Cars.js:
import React, {Component} from '/React'
import Car from './Car/Car.js'

export default class Cars extends Component {
    state = {
        cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2016},
            {name: 'Mazda', year: 2010}
        ]
    }

    goToHomePage = () => {
        this.props.history.push('/') // #1
        this.props.history.push({ // #2
            pathname: '/'
        })
    }

    render() {
        return (
            <div style={{
                width: 400,
                margin: 'auto',
                paddingTop: 20
            }}>
                <button onClick={this.goToHomePage}>Go to homepage</button> // по клику переход на главную
                {
                    this.state.cars.map((car, index) => { // cоздание списка
                        return (
                            <Car
                                key={index} // для каждого элемента списка необходимо определять уникальный key
                                name={car.name}
                                year={car.year}
                                onChangeTitle={() => this.changeTitleHandler(car.name)}
                            />
                        )
                    })
                }
            </div>
        )
    }
}


// FILE: /src/Cars/Car/Car.js:
import React from '/React'
import './Car.scss'
import {withRouter} from 'react-router-dom' // импортируем компонент

const Car = props => {
    return (
        <div
            className={'Car'}
            onClick={() => props.history.push('/cars/' + props.name.toLowerCase())}
        > // по клику переход на страницу с машиной
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
        </div>
    )
}

export default withRouter(Car) // оборачиваем функциональный компонент в withRouter (добавляет параметры от роута, например history)



// + FOLDER /src/CarDetail/
// + FILE /src/CarDetail/CarDetail.js:
import React from '/React'

export default class CarDetail extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>{this.props.match.params.name}</h1>  // должно совпадать с /cars/:/name
            </div>
        )
    }
}
