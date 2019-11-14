/**
 * UI Frameworks:
 - https://ant.disign <-
 - https://material-ui.com
 - https://blueprintjs.com
 - https: semantic-ui.com
 - SASS / styled-components

 * JS библиотеки
 - Redux
 - Redux-thunk
 - Socket.io
 - axios
 - Lodash
 - Formik
 - React Route
 - classnames

 * Server
 - NodeJS (ExpressJS)
 - MongoDB / Mongoose
 - Multer (для загрузки файлов на сервер)
 - PassportJS (организация авторизации, в тч через соц. сети)



 $ create-react-app chat
 $ yarn start

 Удаляем:
 > FILE: /src/App.css
 > FILE: /src/App.test.js
 > FILE: /src/logo.svg
 > FILE: /src/serviceWorker.js

 $ yarn eject

 Frontend https://github.com/Archakov06/react-chat-tutorial
 Backend https://github.com/Archakov06/backend-chat-tutorial
 */


// FILE: /config/webpack.config.js:
/*
...
resolve: {
    modules: ['node_modules'].concat(
    ->
    modules: ['node_modules', 'src'].concat( // для иморта модулей
}
...



    $ yarn add node-sass
    $ yarn add classnames
    $ yarn start


 + FOLDER /src/components/              глобальные компоненты
    + FILE /src/components/index.js

 + FOLDER /src/modules/                 функциональные компоненты
 + FOLDER /src/actions/
 + FOLDER /src/reducers/
 + FOLDER /src/styles/
    + FILE /src/styles/index.scss
 */

// FILE: /src/index.js:
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';

import './styles/index.scss';

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);


/*
    $ yarn add antd
 */


// FILE: /src/styles/index.scss:
/*
    @import "~antd/dist/antd.css"; // стили UI библиотеки ant.disign


*/


/*
    + FOLDER /src/components/Button/
        + FILE /src/components/Button/index.js
        + FILE /src/components/Button/Button.scss
 */


// FILE: /src/components/Button/index.js
import React from "react";
import PropTypes from "prop-types";
import { Button as BaseButton } from "antd";
import classNames from "classnames";

import "./Button.scss";

const Button = props => (
    <BaseButton
        {...props}
        className={classNames("button", props.className, {
            "button--large": props.size === "large"
        })}
    />
);

Button.propTypes = {
    className: PropTypes.string
};

export default Button;


// FILE /src/components/Button/Button.scss
/*
    .button {
        &--large {
            height: 56px !important;
        }
    }
 */


// FILE /src/components/index.js
export {default as Button} from './Button';


/*
    + FOLDER /src/components/Block/
        + FILE /src/components/Block/index.js
        + FILE /src/components/Block/Block.scss
 */


// FILE /src/components/Block/index.js
import React from "react";
import classNames from "classnames";

import "./Block.scss";

const Block = ({ children, className }) => (
    <div className={classNames('block', className)}>
        {children}
    </div>
);

export default Block;


// FILE /src/components/Block/Block.scss
/*
    .block {
        padding: 45px;
        background: #ffffff;
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.4204);
        border-radius: 3px;
    }
 */


// FILE /src/components/index.js
export { default as Button } from './Button';
export { default as Block } from './Block';


// FILE: /src/App.js:
import React, { Component } from "react";
import { Route } from "react-router-dom";

import { Auth } from "pages";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Auth/>
            </div>
        )
    }
}

export default App;


/*
    + FOLDER /src/pages/
        + FOLDER /src/pages/Auth/
            + FILE /src/pages/Auth/index.jsx
            + FILE /src/pages/Auth/Auth.scss

        + FOLDER /src/pages/Home/
            + FILE /src/pages/Home/index.js

        + FILE /src/pages/index.js
 */


// FILE /src/pages/index.js
export { default as Auth } from "./Auth";
export { default as Home } from "./Home";



// FILE /src/pages/Auth/index.jsx
import React from "react";
import { Route } from "react-router-dom";

import { LoginForm, RegisterForm } from "modules";

import "./Auth.scss";

const Auth = () => (
    <section className="auth">
        <div className="auth__content">
            <Route exact path={["/", "/login"]} component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
        </div>
    </section>
);

export default Auth;


// FILE /src/pages/Auth/Auth.scss
/*
    .auth {
        display: flex;
        justify-content: center;
        align_items: center;\
        height: 100%;

        &__top {
            text-align: center;
            margin-bottom: 50px;
            h2 {
                font-size: 28px;
                margin-bottom: 5px;
            }
            p {
                font-size: 18px;
                line-height: 21px;
                letter-spacing: 0.1px;
                opacity: 0.5;
            }
        }

        &__register-link {
            text-align: center;
            display: block;
            color: #ADADAD;
            font-size: 16px;
            letter-spacing: 0.1px;
        }

        &__success_block {
            dispay: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 400px;
            h3 {
                margin-top: 10px;
            }
            p {
                color: #adadad;
            }
            svg {
                width: 48px;
                height: 48px;
            }
        }

        .button {
            text-transform: uppercase;
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 0.1px;
            weight: 100px;
        }

        .block {
            width: 430px;
        }
    }
*/


// FILE: /src/styles/index.scss
/*
    @import "~antd/dist/antd.css";

    body, html, #root, .wrapper {
        height: 100%;
        color: #202020;
    }
*/

/*
    + FOLDER: /src/modules/
        + FOLDER: /src/modules/LoginForm/
            + FOLDER: /src/modules/LoginForm/containers/
                + FILE: /src/modules/LoginForm/containers/LoginForm.js

            + FOLDER: /src/modules/LoginForm/components/
                + FILE: /src/modules/LoginForm/components/LoginForm.jsx

            + FILE: /src/modules/LoginForm/index.js
 */


// FILE: /src/modules/LoginForm/index.js
import LoginForm from "./containers/LoginForm";

export default LoginForm;


// FILE: /src/modules/LoginForm/components/LoginForm.jsx
import React, {Component} from "react";
import { Form, Icon, Input } from 'antd';
import { Link } from "react-router-dom";

import { Button, Block } from "components";

export default class LoginForm extends Component {
    render() {
        return (
            <div>
                <div className="auth__content">
                    <h2>Войти в аккаунт</h2>
                    <p>Пожалуйста, войдите в свой аккаунт</p>
                </div>
                <Block>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                            >
                                Войти в аккаунт
                            </Button>
                        </Form.Item>
                        <Link to="/register" className="auth__register-link">
                            Зарегистрироваться
                        </Link>
                    </Form>
                </Block>
            </div>
        )
    }
}

export default LoginForm;


// FILE: /src/modules/LoginForm/containers/LoginForm.js
import LoginForm from "./components/LoginForm";

export default LoginForm;



/*
    $ yarn add react-router
    $ yarn add react-router-dom
*/


/*
    + FILE: /src/modules/index.js
*/

// FILE: /src/modules/index.js
export { default as LoginForm } from "./LoginForm";
export { default as RegisterForm } from "./RegisterForm";


/*
    + FOLDER: /src/modules/RegisterForm/
        + FOLDER: /src/modules/RegisterForm/containers/
            + FILE: /src/modules/RegisterForm/containers/RegisterForm.js

        + FOLDER: /src/modules/RegisterForm/components/
            + FILE: /src/modules/RegisterForm/components/RegisterForm.jsx

        + FILE: /src/modules/RegisterForm/index.js
 */


// FILE: /src/modules/RegisterForm/index.js
import RegisterForm from "./containers/RegisterForm";

export default RegisterForm;


// FILE: /src/modules/RegisterForm/components/RegisterForm.jsx
import React, {Component} from "react";
import { Form, Icon, Input } from 'antd';
import { Link } from "react-router-dom";

import { Button, Block } from "components";

export default class RegisterForm extends Component {
    render() {
        const success = false;

        return (
            <div>
                <div className="auth__content">
                    <h2>Регистрация</h2>
                    <p>Для входа в чат, Вам нужно зарегистрироваться</p>
                </div>
                <Block>
                    { success
                        ?
                        <div className="auth_success-block">
                            <div>
                                <Icon type="info-circle" theme="twoTone" />
                            </div>
                            <h2>Подтвердите свой аккаунт</h2>
                            <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                        </div>
                        :
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="E-mail"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Ваше имя"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Ваш пароль"
                                    size="large"
                                />
                            </Form.Item>                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Повторите пароль"
                                size="large"
                            />
                        </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                >
                                    Зарегистрироваться
                                </Button>
                            </Form.Item>
                            <Link to="/login" className="auth__register-link">
                                Войти в аккаунт
                            </Link>
                        </Form>
                    }
                </Block>
            </div>
        )
    }
}

export default RegisterForm;


// FILE: /src/modules/RegisterForm/containers/RegisterForm.js



/*
    + FILE /src/pages/Home/index.jsx
    + FILE /src/pages/Home/Home.scss
 */


// FILE /src/pages/Home/index.jsx
import React from "react";
import { Route } from "react-router-dom";

import "./Home.scss";

const Home = () => (
  <section className="home">
      <h1>Hellp</h1>
  </section>
);

export default Home;

// 15:15dctv