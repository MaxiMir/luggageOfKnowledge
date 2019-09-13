// ################### REACT ###################

/** Преимущества React:
 * МОЛНИЕНОСНЫЙ РЕНДЕРИНГ
Многие схожие с React библиотеки работают с DOM напрямую. И взаимодействие с DOM напрямую негативно отражается на скорости работы приложения. В React решили эту проблему, внедрив концепцию виртуального DOM. Виртуальный DOM — это легковесная копия обычного DOM. Такая работа с DOM оказывается гораздо эффективнее, чем работа из JavaScript напрямую.
 * КОМПОНЕНТНО-ОРИЕНТИРОВАННЫЙ ПОДХОД
Если говорить простыми словами, то компонент в Реакт — это кусок кода, который представляет какую-то часть на странице (поле для ввода данных, кнопку поиска и т.п.). Из более простых компонентов можно создавать сложные. Созданные в React компоненты вы легко можете переносить из проекта в проект, тем самым ускоряя веб-разработку.
 * УЛУЧШЕННОЕ SEO
Итоговый HTML, который формируют компоненты, может формироваться как на стороне клиента, так и на стороне сервера, что позволяет создавать так называемые изоморфные приложения. Поисковые системы лучше индексируют страницы таких приложений.
 * ВОЗМОЖНОСТЬ СОЗДАНИЯ МОБИЛЬНЫХ ПРИЛОЖЕНИЙ
В React за разработку мобильных приложений отвечает платформа React Native. Код, который написан для создания сайта, может быть снова использован для создания мобильного приложения, что значительно сократит время на разработку, если вам нужно и мобильное приложение, и сайт. Библиотека относительно проста в освоении, имеет понятный, лаконичный синтаксис.
 */ 


/*@ Компоненты @*/

// file: index.html:
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
        <Car name="Mazda" year="2019" />, // добавляем компонент + передаем параметры
        document.querySelector('#root2') // место для вставки сгенерированного кода
    )


    // #2:
    const App = (
        <div> // элементы должны быть обернуты в корневой элемент
            <Car name="Ford" year="2019" /> 
            <Car name="Mazda" year="2017" />
        </div>
    );

    ReactDOM.render(
        App, // App содержит JSX код, поэтому его не надо оборачивать в "<" "/>"
        document.querySelector('#root1') // место для вставки сгенерированного кода
    )
</script>



/*@ Создание проекта @*/
sudo npm install -g create-react-app // установка create-react-app
cd WebstormProjects/
sudo create-react-app react-theory // создание проекта

npm run start // запуск версии для разработки приложения (cмотреть package.json ключ scripts)
npm run build // для оптимизации приложения (получение статических файлов, которые будут отвечать за функционал всего приложения)
npm run test // запуск тестов в React
npm run eject // получить доступ к конфигурации для проекта create-react-app

npm install -g yarn // file yarn.lock - аналог npm (более оптимизирован для React)



// file: /public/manifest.json - превращает приложение в Progressive Web Application



// file: /src/index.js:
import React from 'react'; // импортируем библиотеку React
import ReactDOM from 'react-dom'; // импортируем библиотеку ReactDOM (ядро библиотеки React)
import './index.css'; // импортируем стили
import App from './App'; // импортируем компонент App
import registerServiceWorker from './registerServiceWorker'; // функционал для Progressive Web Application (например кэширование)


ReactDOM.render(<App />, document.getElementById('root')); // генерируем и вставляем в элемент с ID = root



// file: /src/App.js:
import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Hello world!</h1>
            </div>
        );
        
        // <->
        
        return React.createElement( 
            'div',
            {
                className: 'App'
            },
            React.createElement( // вложенный элемент
                'h1', 
                null,
                'Hello world!'
            ),
            'Some text...' // text node
        );
    }
}

export default App;



/*@ Cинтаксис JSX: @*/

// if, else, while, for - только вне JSX
// ! Использовать className вместо class

class App extends Component {
    render() {
        const divStyle = { // создание инлайн стилей
            textAlign : 'center'
        }
        
        return (
            <div className="App" style={divStyle}> // применение инлайн-стилей #1 cпособ
                <h1 style={{color: 'blue', fontSize: '10px'}}>Hello world!</h1> // применение инлайн-стилей #2 cпособ
            </div>
            <p>Hello</p> // => Ошибка должен возвращаться один корневой элемент (испр. вложить в .App)
        );
    }
}



/*@ Создание компонентов: @*/

// folder: /src/ cоздаем папку для компонента Car и файл Car.js:
import React from 'react'; // необходимо импортировать при использовании JSX cинтаксиса

function car() { 
    return (
        <h2>This is car component</h2>
    )
}

export default car;

// <-> Используя синтаксис ES 6: 

// #1:
сonst car = () => <h2>This is car component</h2> // Если возвращается несколько строк все оборачиваем в ()

export default car;

// #2:
export default () => <h2>This is car component</h2>



// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; // импортируем компонент


class App extends Component {
    render() {
        const divStyle = { 
            textAlign : 'center'
        }
        
        return (
            <div style={divStyle}> 
                <h1>Hello world!</h1> 
                
                <Car /> // вставка JSX кода компонента
            </div>
        
        );
    }
}



/*@ Вывод динамических данных: @*/

// file: /src/Car/Car.js:
import React from 'react'; 

export default () => (
    <div>
        <p>This is car component</p>
        <p><strong>Number: {Math.round(Math.random() * 100)}</strong></p> // {} указывает, что внутри простая JS интрепритация
        
    </div>
)



/*@ Передача параметров и контента: @*/

// file: /src/Car/Car.js:
import React from 'react'; 

export default props => ( // 1 параметр (props) - в скобочки можно не оборачивать
    <div>
        <h3>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        {props.children} // обработка контента
    </div>
)


// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 

class App extends Component {
    render() {
        const divStyle = { 
            textAlign : 'center'
        }
        
        return (
            <div style={divStyle}> 
                <h1>Hello world!</h1> 
            
                <Car name={'Ford'} year={2016} /> 
                <Car name="Audi" year={2012} /> // передаем атрибут в виде обычной строки - {} не нужны
                <Car name={'Mazda'} year={2011}> // ! без закрывающего /
                    <p style="{{color: red}}">COLOR</p> // передача контента в компонент
                </Car> 
            </div>
        
        );
    }
}



/*@ State: @*/

// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 

class App extends Component {
    state = { // задание State (если класс наследник Component) - описание состояния данного компонента
        cars : [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ], 
        pageTitle: 'React Components'
    } 
    
    changeTitleHandler = () => { // функция обработчик (cписок events: reactjs.org/docs/events.html)
        const oldTitle = this.state.pageTitle;
        const newTitle = oldTitle + ' (changed)';
    
        this.setState({ // изменение состояния внутри компонента (заново вызывает метод render)
            pageTitle: newTitle
        }) 
    }
    
    
    render() {
        const divStyle = { 
            textAlign : 'center'
        }
        
        const cars = this.state.cars
        
        return (
            <div style={divStyle}> 
                <h1>{this.state.PageTitle}</h1> // выводит pageTitle из State
                
                <button onClick={this.changeTitleHandler}>Change Title</button> // обработчики в Camel Case и без ()
                
                // передаем данные из State: 
                <Car name={cars[0].name} year={cars[0].year} /> 
                <Car name={cars[1].name} year={cars[1].name} /> 
                <Car name={cars[2].name} year={cars[2].name} /> 
            </div>
        
        );
    }
}



/*@ Передача параметров в функцию: @*/

// file: /src/Car/Car.js:
import React from 'react'; 

export default props => ( // 1 параметр (props) - в скобочки можно не оборачивать
    <div>
        <h3>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        <button onClick={props.onChangeTitle}>Click</button> // привязываем переданный обработчик к элементу
    </div>
)


// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 


class App extends Component {
    state = { 
        cars : [
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
    
    handleInput = (event) => { // React передает в функцию событие 
        this.setState({ 
            pageTitle: event.target.value // event.target.value - текущее состояние input
        }) 
    }
    
    render() {
        const divStyle = { 
            textAlign : 'center'
        }
        
        const cars = this.state.cars
        
        return (
            <div style={divStyle}> 
                <h1>{this.state.PageTitle}</h1> 
                
                <input type="text" onChange={this.handleInput} /> // прослушка изменений в input
                
                <button onClick={this.changeTitleHandler.bind(this, 'Changed!')}> // bind - вызов функции в контексте
                    Change Title
                </button> 
                
            
                <Car 
                    name={cars[0].name}
                    year={cars[0].year} 
                    onChangeTitle = {this.changeTitleHandler.bind(this, cars[0].name)} // передача обработчика для кастомного компонента #1 cпособ (БОЛЕЕ ПРАВИЛЬНЫЙ)
                /> 
                <Car 
                    name={cars[1].name}
                    year={cars[1].name} 
                    onChangeTitle = {() => this.changeTitleHandler(cars[1].name)} // передача обработчика для кастомного компонента #2 cпособ
                /> 
                <Car 
                    name={cars[2].name}
                    year={cars[2].name}
                    onChangeTitle = {() => this.changeTitleHandler(cars[2].name)}
                />     
            </div>
        
        );
    }
}



/*@ Работа со списком: @*/

// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 


class App extends Component {
    state = { 
        cars : [
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
    
    handleInput = (event) => {
        this.setState({ 
            pageTitle: event.target.value 
        }) 
    }
    
    render() {
        const divStyle = { 
            textAlign : 'center'
        }
        
        const cars = this.state.cars
        
        return (
            <div style={divStyle}> 
                <h1>{this.state.PageTitle}</h1> 
                
                <input type="text" onChange={this.handleInput} /> 
                
                <button onClick={this.changeTitleHandler.bind(this, 'Changed!')}> 
                    Change Title
                </button> 
                
                { this.state.cars.map((car, index) => { // cоздание списка 
                    return (
                        <Car
                            key={index} // для каждого элемента списка необходимо определять уникальный key
                            name={car.name}
                            year={car.year}
                            onChangeTitle={() => this.changeTitleHandler(car.name)}
                        />
                    )
                }) }
            </div>    
        );
    }
}



/*@ Работа условными операторами: @*/

// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 


class App extends Component {
    state = { 
        cars : [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2012},
            {name: 'Mazda', year: 2011}
        ], 
        pageTitle: 'React Components',
        showCars: false // добавляем новое значение в состояние
    } 
    
    changeTitleHandler = pageTitle => {
        // если название аргумента (pageTitle) совпадает с названием значения (pageTitle) из состояния можно записывать в сокр. виде:
        this.setState({pageTitle}) 
    }
    
    changeCarsHandler = () => { // меняем состояние showCars (булево значение на противоположное)
        this.setState({ 
            showCars: !this.state.showCars
        }) 
    }
    
    render() {
        const divStyle = { 
            textAlign : 'center'
        }
        
        const cars = this.state.cars
        
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
            }
        }
        
        return (
            <div style={divStyle}> 
                <h1>{this.state.PageTitle}</h1> 
                
                <button onClick={this.changeCarsHandler}> // по клику меняем значение showCars в состоянии
                    Tooggle Cars
                </button> 
                
                { cars } // выводим список Сars или null
            </div>    
        );
    }
}



/*@ Динамические списки: @*/

// file: /src/Car/Car.js:
import React from 'react'; 

export default props => ( 
    <div style={{
        border: '1px solid #ccc',
        marginBottom: '10' // px - можно не прописывать
    }}>
        <h3>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        <input type="text" onChange={props.onChangeName} value={props.name} /> // добавляем input c обработчиком и со значением по умолчанию
        <button onClick={props.onDelete}>Delete</button> // добавляем кнопку с удалением элемента
    </div>
)


// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 


class App extends Component {
    state = { 
        cars : [
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
            textAlign : 'center'
        }
        
        const cars = this.state.cars
        
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
            }
        }
        
        return (
            <div style={divStyle}> 
                <h1>{this.state.PageTitle}</h1> 
                
                <button onClick={this.changeCarsHandler}> 
                    Tooggle Cars
                </button> 
                
                { cars } 
            </div>    
        );
    }
}



/*@ Подключение CSS и Динамические классы: @*/

// folder: /src/Car/ создаем файл Car.css:
.Car {
    dispay: block;
    border: 1px solid #ccc;
    margin-bootom: 10px;
    padding: 10px;
    transition: border, box-shadow .3s;
}

.input {
    
}

.input:active,
.input:focus {
    oputline: none;
}

.input.green {
    border: 1px solid green;
}

.input.red {
    border: 1px solid red;
}

.input.bold {
    border: 2px solid green;
    font-weight: bold;
}


// file: /src/Car/Car.js:
import React from 'react'; 
import './Car.css'; // подключаем файл стилей

export default props => {
    const inputClasses = ['input']
    
    if (props.name != '') {
        inputClasses.push('green');
    } else {
        inputClasses.push('red');
    }
    
    if (props.name.length > 4) {
        inputClasses.push('bold');
    }
    
    return ( 
        <div className="Car">
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
            <input 
                type="text"
                onChange={props.onChangeName}
                value={props.name} 
                className={inputClasses.join(' ')}
            /> 
            <button onClick={props.onDelete}>Delete</button> 
        </div>
    )
}



/*@ Библиотека Radium: @*/

yarn add radium
yarn start // заново собираем проект


// file: /src/Car/Car.js:
import React from 'react'; 
import Radium from 'radium'; // подключаем библиотеку Radium
import './Car.css'; // подключаем файл стилей

const Car = props => {
    const inputClasses = ['input']
    
    if (props.name != '') {
        inputClasses.push('green');
    } else {
        inputClasses.push('red');
    }
    
    if (props.name.length > 4) {
        inputClasses.push('bold');
    }
    
    const style = {
        border: '1px solid #ccc',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)'
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
                className={inputClasses.join(' ')}
            /> 
            <button onClick={props.onDelete}>Delete</button> 
        </div>
    )
}

export default Radium(Car) // обрачиваем компонент Car в функционал пакета Radium



/*@ CSS-модули: @*/
Ctrl+C // останавливаем проект
yarn run eject 

// file: /config/webpack.config.dev.js найти module.exports -> module в нем:
{
    test: /\.css$/,
    use: [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
                modules: true, // добавляем
                localIdentName: '[name]__[local]__[hash:base64:5]' // конфигурируем модули
            }
        }
    ]
}

// file: /config/webpack.config.prod.js найти module -> test: /\.css$/, в нем:
{
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
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
                            localIdentName: '[name]__[local]__[hash:base64:5]' // конфигурируем модули
                        },
                    },
                ]
            }
        )
    )
},


yarn start // cобираем проект


// После этого стили из файла /src/Car/Car.css пропадут.
// Стили стали локальными:

// file: /src/Car/Car.js:
import React from 'react'; 
import Radium from 'radium'; 
import classes from './Car.css'; // сохраняем CSS классы в переменную

const Car = props => {
    const inputClasses = [classes.input] // добавляем стили .input
    
    if (props.name != '') {
        inputClasses.push(classes.green); // добавляем стили .green
    } else {
        inputClasses.push(classes.red); // добавляем стили .red
    }
    
    if (props.name.length > 4) {
        inputClasses.push(classes.bold); // добавляем стили .bold
    }
    
    const style = {
        border: '1px solid #ccc',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)'
        ':hover': { 
            border: '1px solid #aaa',
            boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
            cursor: 'pointer'
        }
    }
    
    return ( 
        <div className="{classes.Car}" style={style}> // применяем стили .Car
            // Конечный вид после преобразования в DOM - class="Car__Car__qfbwz"
            // В CSS: Car__Car__qfbwz {...}
            <h3>Car name: {props.name}</h3>
            <p>Year: <strong>{props.year}</strong></p>
            <input 
                type="text"
                onChange={props.onChangeName}
                value={props.name} 
                className={inputClasses.join(' ')}
            /> 
            <button onClick={props.onDelete}>Delete</button> 
        </div>
    )
}



/*@ Препроцессоры: @*/

yarn add node-sass sass-loader // устанавливаем библиотеку для работы с SCSS

// file: /config/webpack.config.dev.js:
{
    test: /\.css$/,
    // ...
},
{ // добавляем новый loader:
    test: /\.scss$/,
    use: [
        require.resolve('style-loader'), // в конце style-loader
        require.resolve('css-loader'), // затем css-loader
        require.resolve('sass-loader'), // вначале будет работать sass-loader
    ]
},


// file: /config/webpack.config.prod.js:
{
    test: /\.css$/,
    // ...
},
{ // добавляем новый loader:
    test: /\.scss$/,
    use: [
        require.resolve('style-loader'), 
        require.resolve('css-loader'), 
        require.resolve('sass-loader'), 
    ]
},


yarn start // cобираем проект

// folder: /src/ переименовываем App.css -> App.scss:
.AppButton {
    padding: 8px 10px;
    border: 1px solid #ccc;
    font-weight: bold;
    
    &:focus, &:active {
        outline: none;
    }
    
    &:hover {
        background: #000;
    }
}


// file /src/App.js:
import React, {Component} from 'react';
import './App.scss'; // импортируем App.scss
import car from './Car/Car.js'; 

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
                >Tooggle Cars</button> 
                
                { cars } 
            </div>    
        );
    }
}



/*@ Передача параметров в компонент: @*/

// file: /src/index.js:
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css'; 
import App from './App'; 
import * as serviceWorker from './serviceWorker'; 

ReactDOM.render(<App title={'I am from props'} />, document.getElementById('root')); // передаем параметр title 


// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 


class App extends Component {
    // ...
    
    render() {
        // ...
        
        return (
            <div style={divStyle}> 
                <h1>{this.props.title}</h1> // выводим переданный в App компонент параметр (!здесь через this) 
                
                <button onClick={this.changeCarsHandler}> 
                    Tooggle Cars
                </button> 
                
                { cars } 
            </div>    
        );
    }
}



/*@ Ининициализация State: @*/

// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 

class App extends Component {
    constructor(props) { // в props попадают переданные параметры
        super(props) // вызов родительского конструктора
        
        this.state = { // инициализируем State
            cars : [
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



/*@ Базовый жизненный цикл: @*/

// доступны для классов наследников от базового класса

// file /src/App.js:
import React, {Component} from 'react';
import './App.css';
import car from './Car/Car.js'; 


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



/*@ Создание Stateful компонента: @*/

// file: /src/Car/Car.js:
import React from 'react'; 
import Radium from 'radium'; 
import classes from './Car.css'; 

// cтараться избегать частого создания компонентов наследников React.Component - лучше функциональные компоненты React
class Car extends React.Component { 
    render() {
        const inputClasses = [classes.input] 
    
        if (this.props.name != '') { // если class у props прописываем this
            inputClasses.push(classes.green); 
        } else {
            inputClasses.push(classes.red);
        }
        
        if (this.props.name.length > 4) { 
            inputClasses.push(classes.bold); 
        }
        
        const style = {
            border: '1px solid #ccc',
            boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)'
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



/*@ Жизненный цикл изменения/удаления: @*/

// file: /src/Car/Car.js:
import React from 'react'; 
import Radium from 'radium'; 
import classes from './Car.css'; 

class Car extends React.Component { 
    
    componentWillReceiveProps(nextProps) { // #1 для синхронизации локального State с входящими свойствами
        
    }
    
    shouldComponentUpdate(nextProps, nextState) { // #2 если возвращает true - необходимо перерисовывать компонент, false - нет
        // единственный из жизненных циклов, который что-то должен вернуть
        return nextProps.name.trim() !== this.props.name.trim()
    }
    
    componentWillUpdate(nextProps, nextState) { // #3 подготавливаемся к изменению компонента, например, синхронизировать локальный State с входящими свойствами
        
    }
    
    static getDerivedStateFromProps(nextProps, prevState) { // version > 16.3 <-> componentWillUpdate, но запрещает изменение State напрямую (исп. без componentWillReceiveProps и componentWillUpdate)
        return { // возвращаем результирующий State, который будет смержен с основным State
            
        }
    }
    
    componentDidUpdate() { // #5
        
    }
    
    getSnapshotBeforeUpdate() { // вызывается после Car render и перед componentDidUpdate - позволяет получить неизменное до обновления DOM дерево
        
    }
    
    componentWillUnmount() { // вызывается, когда идет разрушение компонента и он удаляется из DOM дерева
        
    }
    
    render() { // #4
        // ...
    }
}

export default Radium(Car)



/*@ ErrorBoundary (version > 16): @*/


