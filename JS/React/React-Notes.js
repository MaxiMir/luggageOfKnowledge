// https://tproger.ru/translations/react-hooks/


// #@ React Context #@
/**
 #  Создание Context
 // FILE: index.js:
 Вначале нужно сделать так, чтобы всё приложение имело доступ к Context. Для этого в index.js нужно обернуть всё приложение в ThemeContext.Provider.
 Ещё стоит передать ему свойство value. В нём будет храниться состояние: день или ночь.
 */
import React from "KNOWLEDGE/JS/React/React";
import ReactDOM from "react-dom";
import { ThemeContextProvider } from "./themeContext";

import App from "./App";

ReactDOM.render(
    <ThemeContextProvider>
        <App />
    </ThemeContextProvider>,
    document.getElementById("root")
);


// # Получение свойств от Context через contextType
// FILE: App.js:
import React from "KNOWLEDGE/JS/React/React";
import Image from "./Image";

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Image />
            </div>
        );
    }
}

export default App;

/**
 Нам нужно с помощью Context менять className в Image.js с Day на Night и обратно.
 Для этого нужно добавить к компоненту статическое свойство ContextType. Потом, используя интерполяцию строки, нужно передать это свойство в className в объекте <Image />.

 Теперь свойство className содержит строку из value:

 // FILE: Image.js:
 */

import React from "KNOWLEDGE/JS/React/React";
import Button from "./Button";
import ThemeContext from "./themeContext";

class Image extends React.Component {
    render() {
        const theme = this.context;
        return (
            <div className={`${theme}-image image`}>
                <div className={`${theme}-ball ball`} />
                <Button />
            </div>
        );
    }
}

Image.contextType = ThemeContext;



/**
 # Получение свойств из Context

 К сожалению, способ выше работает только с классовыми компонентами. Но благодаря хукам с помощью функциональных компонентов теперь можно сделать всё что угодно. Так что для полноты картины нужно конвертировать имеющиеся компоненты в функциональные и использовать ThemeContext.Consumer, чтобы передать информацию между ними.

 ! Это можно сделать, обернув элементы в экземпляр <ThemeContext.Consumer>. Внутри него нужно предоставить функцию, возвращающую элементы. В данном случае будет использоваться паттерн «render props», который позволяет передать компоненту в качестве children любую функцию, которая возвращает JSX код.

 // FILE: Image.js:
 */

import React from "KNOWLEDGE/JS/React/React";
import Button from "./Button";
import ThemeContext from "./themeContext";

function Image(props) {
    // Это больше не нужно
    // const theme = this.context

    return (
        <ThemeContext.Consumer>
            {theme => (
                <div className={`${theme}-image image`}>
                    <div className={`${theme}-ball ball`} />
                    <Button />
                </div>
            )}
        </ThemeContext.Consumer>
    );
}

// Это больше не нужно
// Image.contextType = ThemeContext;

export default Image;


// <Button /> тоже нужно обернуть в <ThemeContext.Consumer> — в будущем это добавит функциональности кнопке.

// FILE: Button.js:
import React from "KNOWLEDGE/JS/React/React";
import ThemeContext from "./themeContext";

function Button(props) {
    return (
        <ThemeContext.Consumer>
            {context => (
                <button className="button">
                    Switch
                    <span role="img" aria-label="sun">
            🌞
          </span>
                    <span role="img" aria-label="moon">
            🌚
          </span>
                </button>
            )}
        </ThemeContext.Consumer>
    );
}

export default Button;



/**
 # Вынесение свойств из Context

 На текущем этапе в приложении передаётся заранее прописанное значение, но наша цель — переключать день и ночь кнопкой. Для этого нужно переместить <Provider> в отдельный файл и обернуть его в собственный компонент ThemeContextProvider.

 // FILE: themeContext.js:
 */

import React, { Component } from "KNOWLEDGE/JS/React/React";
const { Provider, Consumer } = React.createContext();

class ThemeContextProvider extends Component {
    render() {
        return <Provider value={"Day"}>{this.props.children}</Provider>;
    }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };


/**
 Теперь свойство value обрабатывается и в новом файле ThemeContext.js, поэтому обработку этого значения из файла index.js нужно убрать.

 // FILE: index.js
 */
import React from "KNOWLEDGE/JS/React/React";
import Button from "./Button";
import { ThemeContextConsumer } from "./themeContext";

function Image(props) {
    return (
        <ThemeContextConsumer>
            {context => (
                <div className={`${context.theme}-image image`}>
                    <div className={`${context.theme}-ball ball`} />
                    <Button />
                </div>
            )}
        </ThemeContextConsumer>
    );
}

Image.contextType = ThemeContextConsumer;

export default Image;



// # Изменение Context
// Чтобы подвязать кнопку, сначала нужно добавить состояния state в ThemeContextProvider:
// FILE: ThemeContextProvider.js
import React, { Component } from "KNOWLEDGE/JS/React/React";
const { Provider, Consumer } = React.createContext();

// Примечание: ещё вы можете использовать хуки, чтобы определять состояние
// и преобразовывать его в функциональный компонент
class ThemeContextProvider extends Component {
    state = {
        theme: "Day"
    };

    render() {
        return <Provider value={"Day"}>{this.props.children}</Provider>;
    }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };





// FILE: ThemeContextProvider.js
import React, { Component } from "KNOWLEDGE/JS/React/React";
const { Provider, Consumer } = React.createContext();

class ThemeContextProvider extends Component {
    state = {
        theme: "Day"
    };

    // Потом нужно добавить метод переключения между днём и ночью:
    toggleTheme = () => {
        this.setState(prevState => {
            return {
                theme: prevState.theme === "Day" ? "Night" : "Day"
            };
        });
    };

    render() {
        return (
            // Теперь нужно изменить value на объект, содержащий {theme: this.state.theme, toggleTheme: this.toggleTheme}, а также заменить использование value на получение поля theme из объекта. То есть нужно каждое theme заменить на context, а каждую ссылку на theme — на context.theme.
            <Provider
                value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };


/**
 И под конец на кнопку нужно повесить слушатель события onClick. При нажатии кнопки должен вызываться context.toggleTheme — в таком случае будут обновляться Consumer’ы, которые используют состояние от Provider’ов. Код кнопки будет выглядеть примерно так:
 */

import React from "KNOWLEDGE/JS/React/React";
import { ThemeContextConsumer } from "./themeContext";

function Button(props) {
    return (
        <ThemeContextConsumer>
            {context => (
                <button onClick={context.toggleTheme} className="button">
                    Switch
                    <span role="img" aria-label="sun">
            🌞
          </span>
                    <span role="img" aria-label="moon">
            🌚
          </span>
                </button>
            )}
        </ThemeContextConsumer>
    );
}

export default Button;


/**
 # Рекомендации
 1 Не используйте Context, если он заменяет пробрасывание всего на один-два уровня. Этот инструмент — отличный способ, если нужно распространить состояние на множество компонентов, находящихся в «дереве» далеко друг от друга. Но если вам нужно просто опуститься или подняться на пару уровней, то пробрасывание будет легче и быстрее.
 2. Постарайтесь не использовать Context для сохранения локального состояния. Например, если вам нужно сохранить введённые в форму данные, то лучше использовать локальное свойство.
 3. Всегда оборачивайте родителя в Provider’а на как можно более низком уровне — не стоит использовать самую верхушку «дерева».
 4. Наконец, если вы решили пересылать свойства таким способом, важно помнить про наблюдение за производительностью и рефакторингом. Но это скорее всего не понадобится, если просадки в производительности не будут сильно заметны.
 */