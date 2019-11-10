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
import React from "./React";
import ReactDOM from "react-dom";

import App from './App';

import './styles/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));


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
import { Button as BaseButton} from "antd";
import classNames from 'classnames';

import './Button.scss';

const Button = props => (
    <BaseButton {...props } className={classNames('button', props.className, {
        "button--large": props.size === 'large'
    })} />
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
export { default as Button } from './Button';




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
        { children }
    </div>
);

export default Block;


// FILE FILE /src/components/Block/Block.scss
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
import { Auth } from "pages";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Auth />
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
export { default as Auth } from './Auth';


// FILE /src/pages/Auth/index.jsx
import React from 'react';
import { Form, Icon, Input, Checkbox } from 'antd';
import { Button, Block } from "components";

import "./Auth.scss";



class Auth extends  React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <section className="auth">
                <div className="auth__content">
                    <div className="auth__content">
                        <h2>Войти в аккаунт</h2>
                        <p>Пожалуйста, войдите в свой аккаунт</p>
                    </div>
                    <Block>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                >
                                    Войти в аккаунт
                                </Button>
                            </Form.Item>
                            <a href="#" className="auth__register-link">
                                Зарегистрироваться
                            </a>
                        </Form>
                        );
                    </Block>
                </div>
            </section>
        );
    }
}


const Auth = props => {



}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Auth);

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