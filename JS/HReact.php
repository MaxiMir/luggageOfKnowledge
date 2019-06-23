<?
/*
React is a javascript library for building user interfaces

Так характеризуют Реакт его создатели, разработчики компании Facebook. Появившись в 2013 году, Реакт быстро стал набирать обороты и получил широчайшее распространение. На момент создания курса на Гитхабе у проекта более 70 тысяч звезд.

Секрет успеха в том, что Реакт позволил под другим углом посмотреть на процесс создания интерфейсов. Он резко снизил порог входа и сложность получаемых решений. Причем не только по сравнению с ручной работой с ДОМом, но и по сравнению со многими фреймворками.

И хотя Реакт как библиотеку для отрисовки можно встраивать в существующий технологический стек там, где это имеет смысл, он так же способен взять на себя полное управление фронтендом. Правда, в данном случае для эффективной работы придется подключить еще некоторые ключевые дополнения, такие как redux и react-router.

Фундаментальная идея, лежащая в основе работы Реакта, оказалась настолько мощной, что ее расширили далеко за рамки браузера. С Реактом можно работать как на сервере (server-side rendering), так и на мобильных платформах (React Native). Вы не ослышались: сейчас на языке JavaScript можно создавать приложения под мобильные платформы, которые работают почти так же эффективно, как и нативные приложения. Такую ситуацию, когда один подход используется для реализации разных задач (сайт, мобильные приложения) называется "Learn once, Write anywere".

# CodePen
Самый простой способ попрактиковаться с Реактом – это сервис codepen. После регистрации вы сможете создать pen — изолированную среду разработки, подключив туда Реакт. Результаты кода отображаются там же, в соседней панели.

Сodepen позволяет вставлять пены прямо в свой сайт, чем я и буду пользоваться для демонстрации. Вы можете не только проанализировать такой код, но запустить и даже поправить его.


# create-react-app
Разработчики в Фейсбуке, понимая как сложно настроить с нуля экосистему для старта фронтенд проектов, создали проект под названием create-react-app. Это npm-библиотека, которая позволяет стартануть с нулевой конфигурацией:
*/
$ npm install -g create-react-app

$ create-react-app my-app
$ cd my-app/
$ npm start

/*
Дальше просто открывайте localhost:3000 и наслаждайтесь.


# babel-preset-react
Если вы все же решитесь делать все самостоятельно, то не забудьте подключить пресет (preset) babel-preset-react к вашей конфигурации Babel. Реакт расширяет JS и не может работать с Babel без этого пресета.


# Отладка
Так как Реакт отрабатывает на фронтенде, то и ошибки будут появляться там же. Не забывайте всегда держать открытой консоль (например, в developer tools в Хроме) и внимательно читать все, что там написано. Большая часть ошибок будет выводиться именно там.

Также не забудьте поставить React Developer Tools. Это расширение для браузера, которое дает очень удобную панель для анализа происходящего с Реактом в вашем приложении. 
*/



>>>>>> Компоненты <<<<<<

/*
Сразу начнем с примера, который будем разбирать в течение урока:
*/

// HTML
<div id="react-root"></div>


// Babel
class Hello extends React.Component {
  render() {
    return <div>Hello!</div>;
  }
}

const mountNode = document.getElementById('react-root');
ReactDOM.render(<Hello />, mountNode);

/*
Центральное понятие в Реакте - компонент. Более того, это единственная сущность, которую он содержит. Вся остальная функциональность построена вокруг компонентов.

В примере выше создан компонент, который добавляет в DOM на странице <div>Hello!</div>.

Вот как выглядит получившийся html:
*/

<div id="react-root">
  <div>Hello!</div>
</div>


# Импорты
// CodePen импортирует Реакт автоматически (его нужно указать в подключаемых библиотеках), но в своем коде импорты пропускать нельзя:
import React from 'react';
import ReactDOM from 'react-dom';

/*
Из кода и импортов видно, что для работы с Реактом нужно две библиотеки: сам Реакт и ReactDOM. Причина наличия двух зависимостей достаточно проста. Сама библиотека React не связана с DOM напрямую и используется не только в браузере. Поэтому отрисовка конкретно для DOM вынесена в отдельный пакет ReactDOM.
*/


# Компонент
// FILE: Hello.jsx:
export default class Hello extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}


# Очевидные тезисы
/*
1. Компонент Реакта – это класс, который наследуется от класса React.Component (как мы увидим позже, это не единственный способ создать компонент).
2. Функция render возвращает нечто (обсудим позже), что будет отрисовано в браузере. Класс-компонент без функции render существовать не может, это его интерфейс.

Экспорт класса по умолчанию задан не спроста. В JS принято создавать один класс на файл. В отличие от обычных классов, Реакт-компоненты имеют расширение JSX, а значит компонент, определенный выше, должен лежать в файле с именем Hello.jsx.

Обратите внимание: класс все равно проименован, хотя это и не обязательно в случае дефолтного экспорта. Мы действительно можем его не именовать, но тогда в React Dev Tools будет тяжело понять, что же отрисовал React, так как любой безымянный компонент отображается как <ReactComponent>. Поэтому возьмем себе за правило всегда давать компонентам имена.
*/

# Неочевидные тезисы
// Самое поразительное происходит в этой строчке:
<div>Hello</div>;

/*
Здравый смысл подсказывает, что такая запись синтаксически невозможна в JS. И он будет прав. То, что вы видите, называется JSX и является расширением языка (добавляется с помощью Babel). Кардинальное решение для фреймворка, не правда ли? В процессе вы поймете, что это не такая уж и плохая идея.

Главное сейчас запомнить то, что в конечном итоге любой компонент Реакта возвращает кусок DOM (на самом деле – virtual DOM).

Кстати, div – это тоже компонент Реакта, только встроенный. Отличить встроенные компоненты от самописных очень легко. Встроенные всегда начинаются с маленькой буквы, а те, которые не являются частью Реакта, должны начинаться с большой.

Хорошим стилем считается давать расширение .jsx для всех файлов, которые содержат JSX, независимо от того, создается ли компонент в этом файле или нет.
*/


# Mount
const mountNode = document.getElementById('react-root');
ReactDOM.render(<Hello />, mountNode);

/*
Созданный компонент (класс компонента) сам по себе ничего не делает. Чтобы насладиться результатом его работы нужно произвести так называемое монтирование. То есть указать Реакту, куда его вставить в DOM.

Для этой задачи обязательно требуется реальная DOM-нода (узел), к которой и производится монтирование строчкой:
*/
ReactDOM.render(<Hello />, mountNode);

/*
Первым параметром передается наш компонент в синтаксисе jsx, а вторым та самая нода. Подходящей нодой может быть любой узел внутри body. Как правило, если у нас не SPA, то React используется в виде виджетов, подключаемых на странице в разных местах. Причем на одной странице может быть сразу несколько виджетов. Например, на Хекслете все фронтенд-элементы – это как раз виджеты.

# JSX
JSX – это xml-like расширение js, созданное специально для задач Реакта. React из коробки поставляется с набором компонентов, которые полностью повторяют html. По большей части синтаксис и структура jsx и html совпадают, но есть некоторые важные различия:

1. Так как это xml-like синтаксис, одиночные теги в jsx должны быть закрыты: <hr />.
2. Вместо атрибута class в jsx используется имя свойства в DOM: className.

Так же как и в html, из компонентов можно строить композиции, например такую:
*/
const vdom = (
  <div className="card">
    <div className="card-body">
      <h4 className="card-title">Card title</h4>
      <p className="card-text">my text</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
);

/*
И это все валидный код на JS с подключенным расширением для jsx.

То, что каждый компонент Реакта возвращает кусок DOM, является следствием его фундаментальной идеи и архитектуры. В одном из уроков мы рассмотрим эту идею подробнее и я уверен вы проникнитесь ей. Но почему понадобилось вводить jsx?

Нужно понимать, что jsx – расширение языка, а значит это именно код, а не html. А раз jsx транслируется в код, то, следовательно, мы могли бы сразу писать этот код. Верно? Верно, но не совсем:
*/

React.createElement(
  "div",
  { className: "card" },
  React.createElement(
    "div",
    { className: "card-body" },
    React.createElement(
      "h4",
      { className: "card-title" },
      "Card title"
    ),
    React.createElement(
      "p",
      { className: "card-text" },
      "my text"
    ),
    React.createElement(
      "a",
      { href: "#", className: "btn btn-primary" },
      "Go somewhere"
    )
  )
);

/*
Пример кода выше – это как раз то, как бы выглядели функции render компонентов на Реакте. Причем данный пример очень тривиальный и не содержит логику. Если бы у нас появились условные конструкции, то этот код перешел бы все разумные пределы по сложности анализа. К сожалению, или к счастью, собирать древовидные структуры в коде (а DOM – это дерево) – занятие очень тяжелое и беспощадное. Надеюсь, теперь стало чуть понятнее, зачем нужен jsx, и что jsx – это не верстка (как думают некоторые).

! Так как любой jsx в итоге превращается в вызовы React.createElement, то нужно следить за тем, чтобы Реакт был импортирован: import React from 'react'.
*/


/**@@@
src/Card.jsx
Реализуйте компонент Card, возвращающий следующий jsx:
*/
<div className="card">
  <div className="card-body">
    <h4 className="card-title">Card title</h4>
    <p className="card-text">Some quick example text to build on the card</p>
    <button type="button" className="btn btn-primary">Go somewhere</button>
  </div>
</div>


/*
src/index.jsx
Импортируйте Card.jsx и отрисуйте компонент внутри dom элемента с id равным container
*/

// FILE: /app/src/Card.js:
import React from 'react';

export default class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example text to build on the card</p>
          <button type="button" className="btn btn-primary">Go somewhere</button>
        </div>
      </div>
    );
  }
}

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';
import Card from './Card';

ReactDOM.render(
  <Card />,
  document.getElementById('container'),
);


// FILE: /app/public/index.html:
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
  </head>
  <body>
    <div id="container" class="container m-3"></div>
    <script src="/vendors~main.js" ></script>
    <script src="/main.js" ></script>
  </body>
</html>




>>>>>> JSX <<<<<<
/*
С одной стороны, jsx – это такая же простая вещь как и голый html. Нужно запомнить как он собирается, и всё. С другой стороны, он встроен в сам JS и может с ним взаимодействовать. Другими словами, мы получили шаблонизацию прямо в языке программирования (да-да, так работает php). Именно это смешение с JS вызывает больше всего вопросов у новичков. Попробуем с ними разобраться.

Для лучшего понимания происходящего, проверьте во что транслируется код этого урока в онлайн компиляторе https://babeljs.io/repl/

Любой текст, записанный внутри тегов (будем называть их так для простоты), остается просто статическим текстом на выводе. А что делать, если нужно вставить значение переменной? Ответ ниже:
*/

const name = 'Eva';
const cname = 'container';

const vdom1 = <div>Hello, {name}</div>;
const vdom2 = <div>Hello, {name.repeat(3)}</div>;
const vdom3 = <div className={cname}>Hello!</div>;

/*
Как видно, вставка (по сути – интерполяция) происходит за счет использования фигурных скобок, причем внутри них может быть любое выражение. Эта схема работает одинаково как для содержимого тегов, так и для аттрибутов.

Кроме того, сами элементы jsx являются выражениями, то есть мы можем использовать их в любых местах JS-кода, которые работают с выражениями:
*/

const name = 'Mike';
const vdom = block ? <div>hello, {name}</div> : <span>i am span</span>;

// Теперь давайте соберем все вместе. Сам jsx – это выражение, а чтобы встроить выражение на JS внутрь jsx нужно использовать фигурные скобки. Следовательно, мы можем встроить jsx внутрь jsx пока мы пишем jsx:

const vdom = <div>
    {isAdmin ? <p><a href="#">{text}</a></p> : <p>{text}</p>}
    <Hello />
  </div>;

/*
Другими словами, jsx, как и любой язык программирования, имеет рекурсивную структуру. Мы можем вкладывать одни выражения в другие до бесконечности. В этом нет ничего удивительного, ведь jsx – это тот же код на JS, записанный особым образом.

Чтобы окончательно закрепить эту тему, давайте посмотрим на следующий код:
*/

<div id={if (condition) { 'msg' }}>Hello World!</div>  

// Этот код не заработает по очевидной причине. Условная конструкция в JS - инструкция, а не выражение. В результате компиляции предыдущего кода получится:
React.createElement("div", {id: if (condition) { 'msg' }}, "Hello World!");

// И это, вероятно, самое большое неудобство: невозможность использовать условную конструкцию внутри jsx. Хотя мы по-прежнему можем использовать тернарную операцию или, в более сложных случаях, делать так:
let button;
if (loggedIn) {
  button = <LogoutButton />;
} else {
  button = <LoginButton />;
}

return (
  <nav>
    <Home />
    {button}
  </nav>
);

/*
# Композиция
Как мы помним из предыдущего урока, все "теги" Реакта по сути являются встроенными компонентами, которые работают точно так же, как и определенные нами. А значит все, что применимо к самописным компонентам, также применимо и ко встроенным. Обратное тоже верно. На практике это означает, например, возможность комбинирования компонентов:
*/

const vdom = (
  <div>
    <Hello />
    <Hello />
    <AnotherComponent>
      <p>What is love</p>
    </AnotherComponent>
  </div>
  );

/*
В примере выше компоненты, записанные с заглавной буквы – самописные, остальные – встроенные. Это разделение не случайно: Реакт требует, чтобы вновь создаваемые компоненты начинались с большой буквы, что кстати соответствует стандарту именования классов в JS.


# Null
В реальной практике возникают ситуации, когда наличие того или иного компонента в DOM зависит от некоторых условий. Например, если в компонент не передали текст, то и не надо выводить соответствующий кусок. Пример:
*/

const header = text ? <h1>{text}</h1> : null;

const vdom = (
  <div>
    {header}
    <Hello />
  </div>
  );

// либо так:
const vdom = (
  <div>
    {text ? <h1>{text}</h1> : null}
    <Hello />
  </div>
  );  

// То есть null – это допустимое значение, которое рассматривается Реактом как пустой компонент. Точно также интерпретируются false, true и undefined. Поэтому пример выше можно переписать еще короче.
const vdom = (
  <div>
    {text && <h1>{text}</h1>}
    <Hello />
  </div>
);

/*
# Комментарии

JSX не поддерживает комментарии напрямую, но их можно эмулировать, используя JavaScript. Для этого достаточно вставить блок кода, внутри которого многострочный JavaScript комментарий.
*/

{/* A JSX comment */}

// То же самое для многострочного комментария:

{/*
  Multi
  line
  comment
*/}


/**@@@
В этой практике не будет визуальной составляющей, она заключается в том что будет правильно написана функция возвращающая jsx.

src/Card.jsx
Реализуйте функцию и экспортируйте функцию по умолчанию, которая принимает на вход объект со свойствами title и text, и возвращает jsx с подставленными значениями. Пример:
*/

import getCard from '/Card';

getCard({ title: 'hi', text: 'how are you?' });
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">hi</h4>
//     <p className="card-text">how are you?</p>
//   </div>
// </div>

// Если title отсутствует, то соответствующий ему кусок dom не отрисовывается, тоже самое справедливо и для text. Если отсутствуют оба свойства, то из функции необходимо вернуть null.

// FILE: /app/src/Card.jsx:
import React from 'react';

export default ({ title, text }) => {
  if (!title && !text) {
    return null;
  }

  const titleDom = title && <h4 className="card-title">{title}</h4>;
  const textDom = text && <p className="card-text">{text}</p>;

  return (
    <div className="card">
      <div className="card-body">
        {titleDom}
        {textDom}
      </div>
    </div>
  );
};



>>>>>> Props <<<<<<

/*
Компонент Card, который мы писали ранее, на практике бесполезен, так как не позволяет поменять тексты. А создавать на каждый конкретный блок Card свой собственный компонент — не самая хорошая идея. Я уже не говорю о том, что чаще всего такое просто невозможно, ведь данные подставляются динамически.

Передавать данные в компоненты можно, и делается это с помощью механизма props:
*/

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="Jane" />,
  document.getElementById('react-root'),
);

/*
Как видно, снаружи свойства передаются как атрибуты в html, а внутри компонента доступны по свойству (то же самое слово, но обозначает другое) props объекта. Причем такая передача свойств для нас уже не в новинку. Встроенные компоненты точно так же принимают на вход свойства, такие как className и другие.
*/

const vdom = (
  <div className="row">
    <div className="col-6">
      <HelloMessage name="Kate" />
    </div>
    <div className="col-6">
      <HelloMessage name="Mark" />
    </div>
  </div>
);

/*
Props — очень простой механизм передачи данных в компоненты, который, как правило, не вызывает никаких сложностей. Главное что нужно запомнить при работе с props: их нельзя изменять. Во-первых, из-за принципа работы Реакта это просто ни к чему не приведет, во-вторых, для работы с изменяемым состоянием в Реакте предусмотрен совершенно другой механизм, который мы рассмотрим позже.
*/


# Spread
// Работая с props, нередко приходится передавать множество параметров, либо эти параметры присутствуют в коде в виде объекта. В таком случае можно упростить передачу используя механизм spread.

const params = {
  className: 'row',
  title: 'name',
}
const name = 'Eva';
const vdom = <div id="container" {...params}>
	  	Hello, {name}
	</div>;

// Код выше эквивалентен следующему примеру:
const name = 'Eva';
const vdom = <div id="container" className="row" title="name">
  Hello, {name}
</div>;



# Default props
// Другая задача, с которой сталкиваются разработчики - установка значений по умолчанию для props. Проще всего устанавливать их прямо внутри функции render используя такой подход:

const title = this.props.title || 'hi!';

/*
Это сработает, но потенциально может привести к проблемам производительности (в первую очередь). Мы поговорим об этом в одном из последних уроков.

В реакте предусмотрен способ устанавливать значения props по умолчанию. Пример:
*/

class Header extends React.Component {
  static defaultProps = {
    text: 'Hello, world!',
  };

  render() {
    const { text } = this.props;
    return (
      <h1>{text}</h1>
    );
  }
}

/**@@@
src/Card.jsx
Реализуйте и экспортируйте по умолчанию компонент Card, который принимает на вход свойства title и text. И возвращает jsx с подставленными значениями. Пример:
*/

const title = 'title 1';
const text = 'text 1';
ReactDOM.render(<Card title={title} text={text} />);

// вывод
<div className="card">
  <div className="card-body">
    <h4 className="card-title">title 1</h4>
    <p className="card-text">text 1</p>
  </div>
</div>


// FILE: /app/src/Card.jsx:
import React from 'react';

export default class Card extends React.Component {
  render() {
    const { title, text } = this.props; 

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  }
}


// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';
import Card from './Card';

const title = 'Title';
const text = 'Description';

ReactDOM.render(
  <Card title={title} text={text} />,
  document.getElementById('container'),
);



>>>>>> Работа с коллекциями <<<<<<

// В работе с коллекциями элементов в jsx по большей части нет ничего особенного. С другой стороны, задача обработки списков элементов настолько частая, что будет не лишним ее обсудить отдельно.


class List extends React.Component {
  render() {
    const { data } = this.props

    return (
      <ul>
        {data.map(item => <li>{item.name}</li>)}
      </ul>
    );
  }
}

const items = [
  { name: 'first' },
  { name: 'second' }
];

ReactDOM.render(
  <List data={items} />,
  document.getElementById('react-root'),
);

/*
Выше приведен типичный код, в котором коллекция генерируется прямо в том месте, куда и подставляется. Здесь мы снова видим, что внутрь jsx вложено выражение (через {}) внутри которого опять появляется jsx. Как правило, рекурсия на этом заканчивается :). Если нужна более сложная обработка, то имеет смысл вынести генерацию коллекции в метод компонента и вызывать его внутри render, например так:
*/

class List extends React.Component {
  renderList() {
    // ...
  }

  render() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}

/*
# Key
Для повышения эффективности Реакт настоятельно рекомендует идентифицировать каждую строку коллекции, которая генерируется. Связано это с механизмом, который производит изменения в DOM'е. Подробнее мы поговорим об этом позже, а сейчас нужно просто запомнить, что, генерируя коллекцию элементов в jsx, нужно обязательно проставлять уникальное свойство key, которое не меняется при повторной генерации коллекции.

Чаще всего с этой задачей не возникает проблем, так как у любой сущности, с которой мы работаем, есть свой идентификатор (например, primary key из базы данных).
*/

class List extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <ul>
        {data.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    );
  }
}

/*
Как видите, ничего сложного в этом нет. Более того, если по какой-то причине вы забудете указать key в коллекции, то React начнет кидаться warning'ами об этом прямо в консоли браузера. Поэтому пытаться запомнить когда их ставить, когда нет - не надо. В процессе работы вы и так об этом узнаете и сможете легко поправить.

Кстати, key не обрабатывается как обычное свойство и его нельзя получить внутри компонента так: this.props.key. Если вам нужны данные, которые были переданы в key внутри компонента, то просто передайте их отдельным свойством:
*/

const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title}
  />
);


# Root
// Раньше это было не так, но сейчас допустимо из компонента возвращать массив компонентов. Реакт сам правильно вставит их в DOM:
class List extends React.Component {
  render() {
    const { data } = this.props;
    const f = item => <div key={item.id}>{item.name}</div>;

    return data.map(f);
  }
}

// Правда такой способ не удобен, если этот массив приходится формировать руками:
class Article extends React.Component {
  render() {
    const { header, body } = this.props;

    return [
      <h1>{header}</h1>,
      <div>{body}</div>,
    ];
  }
}

// Для решения этой задачи, в реакте ввели специальный компонент <React.Fragment>, которым можно оборачивать любую коллекцию элементов. Его особенность в том, что этот элемент никак не отражается в реальном доме, он существует только на уровне JSX.
class Article extends React.Component {
  render() {
    const { header, body } = this.props;

    return (
      <React.Fragment>
        <h1>{header}</h1>
        <div>{body}</div>
      </React.Fragment>
    );
  }
}

// У этого элемента есть короткая версия <>.
class Article extends React.Component {
  render() {
    const { header, body } = this.props;

    return (
      <>
        <h1>{header}</h1>
        <div>{body}</div>
      </>
    );
  }
}

/*
Допустим ли такой код?
class Component extends React.Component {
  render() {
    return [
      <div>one</div>,
      <div>two</div>
    ];
  }
}
> Да
*/

/**@@@
<dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl>

dl тег, используется при создании списков определений, в которых dt тег содержит название, а dd описание определения.

src/Definitions.js
Реализуйте компонент Definitions, который принимает свойство data следующей структуры:
*/
const definitions = [
  { dt: 'one', dd: 'two' },
  { dt: 'another term', dd: 'another description' },
];

<Definitions data={definitions} />

// Результатом должен быть следующий вывод:
/*
<dl>
  <dt>one</dt>
  <dd>two</dd>
  <dt>another term</dt>
  <dd>another description</dd>
</dl>

Если data это пустой массив, то ничего не должно рендерится
*/

// FILE: /app/src/Definitions.jsx:
import { uniqueId } from 'lodash';
import React from 'react';

export default class Definitions extends React.Component {
  render() {
    const { data } = this.props;
    
    if (data.length === 0) {
      return null;
    }

    const tags = data.map(({ dd, dt }) => (
      <React.Fragment key={uniqueId()}>
        <dt>{dt}</dt>
        <dd>{dd}</dd>
      </React.Fragment>
    ));

    return (
      <dl>
        {tags}
      </dl>
    );
  }
}



>>>>>> Различия jsx и html <<<<<<

/*
Хотя jsx и пытается быть похожим на html, у них все же есть некоторые отличия.

В jsx все свойства DOM и аттрибуты (включая обработчики событий) должны быть записаны в camelCase. Например, аттрибут tabindex превращается в tabIndex. Исключением являются aria- и data- аттрибуты, они записываются точно так же, как и в обычном html.
*/

# htmlFor
// Так как for — зарезервированное слово в js, в элементах реакта используется свойство htmlFor.


# Экранирование
/*
Обычный html не очень безопасен. Любой текст, который должен оставаться текстом, необходимо экранировать перед выводом. Иначе если внутри содержится html, то он будет проинтерпретирован. Ситуация может стать опасной, если этот текст на сайт добавляют сами пользователи.

jsx работает по-другому. Все, что выводится обычным способом - безопасно по умолчанию и экранируется автоматически. А вот в тех местах, где этого не требуется, экранирование отключается так:
*/

class Component extends React.Component {
  createMarkup () {
    return { __html: 'First &middot; Second' };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}

ReactDOM.render(
  <Component />,
  document.getElementById('react-root'),
);

// По сути, для вывода без экранирования нужно использовать свойство dangerouslySetInnerHTML.



# Стили
// Совсем по другому работает аттрибут style. Если в html это обычная строка, то в jsx только объект.

class Component extends React.Component {
  render() {
    const divStyle = {
      color: 'blue',
      fontSize: '50px', // camelCase
    };

    return <div style={divStyle}>Hello World!</div>;
  }
}

ReactDOM.render(
  <Component />,
  document.getElementById('react-root'),
);

// Для консистентности с именами аттрибутов в html, имена свойств css также должны использовать camelCase.


# Значение свойств по умолчанию
/*
Если свойство передается в компонент без значения, то оно автоматически становится равным true.
Примеры ниже эквивалентны:
*/

<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />

// При этом предпочтительным является первый вариант.


# Остальное
/*
Более подробно о различиях можно прочитать в официальной документации. Кроме того, в будущих уроках мы будем сталкиваться с этими различиями на практике.

Каким будет результирующий HTML?
const content = '<p>clojure mmm</p>';
const vdom = <div>{content}</div>;
> <div>&lt;p&gt;clojure mmm&lt;/p&gt;</div>

Как правильно задавать стили в JSX?
> <div style={{ width: '100%' }}></div>
*/

/**@@@
src/Progress.js
Реализуйте компонент Progress, который принимает свойство percentage и рисует статический прогресс бар.

Использование:
*/
<Progress percentage={40} />;

// Результат:
<div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%;">
  </div>
</div>

/*
Стиль width - вычисляется динамически
Аттрибут aria-valuenow - вычисляется динамически
*/

// FILE: /app/Makefile:
test:
	npm test -s



// FILE: /app/__tests__/test.jsx
import React from 'react';
import renderer from 'react-test-renderer';
import Progress from '../src/Progress';

test('Progress 1', () => {
  const component = renderer.create(<Progress percentage={25} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Progress 2', () => {
  const component = renderer.create(<Progress percentage={100} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// FILE: /app/__tests__/__snapshots__/test.jsx.snap:
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Progress 1 1`] = `
<div
  className="progress"
>
  <div
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow={25}
    className="progress-bar"
    role="progressbar"
    style={
      Object {
        "width": "25%",
      }
    }
  />
</div>
`;

exports[`Progress 2 1`] = `
<div
  className="progress"
>
  <div
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow={100}
    className="progress-bar"
    role="progressbar"
    style={
      Object {
        "width": "100%",
      }
    }
  />
</div>
`;

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';

import Progress from './Progress';

ReactDOM.render(
  <Progress percentage={40} />,
  document.getElementById('container'),
);

// FILE: /app/src/Progress.jsx:
import React from 'react';

export default class Progress extends React.Component {
  render() {
    return (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${this.props.percentage}%` }}
          aria-valuenow={this.props.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    );
  }
}



>>>>>> Обработка имен классов <<<<<<

/*
Интерактивные элементы UI имеют более одного состояния отображения. Например, модальное окно может быть открыто или закрыто, а переключатель включен или выключен. Общепринято менять эти состояния классами.

Работая напрямую с dom, можно использовать classList, который содержит удобные методы для добавления и удаления классов. В Реакте из коробки нет никаких удобств. Свойство className — это всего лишь строка со всеми вытекающими последствиями.
*/

class Button extends React.Component {
  render () {
    const { isPressed, isHovered, label } = this.props;
    let btnClass = 'btn';

    if (isPressed) {
      btnClass += ' btn-pressed';
    } else if (isHovered) {
      btnClass += ' btn-over';
    }

    return <button className={btnClass}>{label}</button>;
  }
};

/*
Для решения этой задачи создатели Реакта рекомендуют использовать пакет classnames. Принцип его работы прост: вместо манипулирования строчкой напрямую нужно сформировать правильный объект, который уже будет преобразован в строку.
*/
import cn from 'classnames'

class Button extends React.Component {
  render () {
    const { isPressed, isHovered, label } = this.props;
    const btnClass = cn({
      	btn: true,
		'btn-pressed': isPressed,
		'btn-over': !isPressed && isHovered,
    });
    return <button className={btnClass}>{label}</button>;
  }
};

// Иногда имя класса генерируется динамически, тогда можно использовать следующий код:
const buttonType = 'primary';
const btnClass = cn({
  [`btn-${buttonType}`]: true,
});


/**@@@
src/Alert.js
Реализуйте компонент Alert, который отрисовывает алерт бутстрапа. Компонент принимает на вход два свойства:

text - отображаемый текст
type - тип алерта, может принимать одно из следующих значений: primary, secondary, success, danger, warning, info, light, dark;
Пример использования:
*/

<Alert type="warning" text="what is love?" />;

// Вывод:

<div class="alert alert-warning" role="alert">what is love?</div>

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';

import Alert from './Alert';

ReactDOM.render(
  <Alert type="warning" text="what is love?" />,
  document.getElementById('container'),
);

// FILE: /app/src/:
import cn from 'classnames';
import React from 'react';

export default class Alert extends React.Component {
  render() {
    const { type, text } = this.props;

    const alertClass = cn({
      alert: true,
      [`alert-${type}`]: true,
    });
    return (
      <div className={alertClass} role="alert">
        {text}
      </div>
    );
  }
}


>>>>>> Children <<<<<<

// UI-элементы имеют иерархическую структуру. Например, компонент card в Бутстрапе:

<div class="card">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

/*
Блок карточки может содержать внутри себя картинку и тело. Тело, в свою очередь, может состоять из заголовка и текста, а текст может быть чем угодно. Не удивлюсь, если в теле карты получится разместить другие карты.

То же самое применимо как к самым простым элементам самого html, например, тегу div, так и к остальным компонентам Бутстрапа, таким как модальные окна и навигация.

Html соответствует природе ui и естественным образом позволяет строить композиции элементов за счет вкладывания тегов друг в друга. Точно так же работает и jsx. Пока мы использовали этот факт только для встроенных компонентов. Теперь пришла пора попробовать реализовать подобное поведение в самописных компонентах. Возьмем alert из bootstrap.
*/

<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>

// В примере выше обязательной частью является только основной div. Содержимое зависит от конкретной ситуации. Подставляется оно с помощью свойства children.

class Alert extends React.Component {
  render() {
    return (<div className="alert alert-primary">
      {this.props.children}
    </div>);
  }
}

const vdom = <Alert>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr />
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</Alert>;

ReactDOM.render(
  vdom,
  document.getElementById('react-root'),
);

// Обратите внимание на то, что компонент стал использоваться как парный тег в jsx:
const vdom = <Alert>
  <p>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</Alert>;

/*
! Все, что находится между открывающим и закрывающим тегом, попадает внутрь свойства children.

Но будьте бдительны: тип данных свойства children зависит от содержимого. В простейшем случае, когда тег используется как одиночный <div />, это свойство будет равно undefined.

Если этим содержимым является строчка, то именно она окажется внутри children. Правда, после некоторой обработки. JSX удаляет концевые пробелы и пустые строки. Следующие примеры будут отображены одинаково:

<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>

/*
Любой одиночный дочерний компонент также будет представлен сам собой в children. Во всех остальных случаях children будет содержать массив.

Если внимательно посмотреть на документацию Реакта, то можно увидеть следующее определение children: "children are an opaque data structure" (свойство children - непрозрачная структура данных). Другими словами, нельзя однозначно полагаться на тип этого свойства, так как снаружи можно передать все что угодно.

Реакт предоставляет набор функций, предназначенных для манипулирования свойством children. Все они доступны в React.Children.
*/
class IgnoreFirstChild extends React.Component {
  render() {
    const children = this.props.children;
    return (<div>
        {React.Children.map(children, (child, i) => {
          // Ignore the first child
          if (i < 1) return

          return child
        })}
      </div>);
  }
}

const vdom = <IgnoreFirstChild>
  <h1>First</h1>
  <h1>Second</h1>
</IgnoreFirstChild>;

ReactDOM.render(
  vdom,
  document.getElementById('react-root'),
);

/*
Точно так же во избежание конфузов для определения количества элементов внутри children нужно пользоваться специализированной функцией Реакта. Например, у children со значением "Hello World!" длина будет 12. Совсем не то что мы ожидали.
*/

class ChildrenCounter extends React.Component {
  render() {
    return <p>{React.Children.count(this.props.children)}</p>
  }
}

// Renders "1"
<ChildrenCounter>
  Second!
</ChildrenCounter>

// Renders "2"
<ChildrenCounter>
  <p>First</p>
  <ChildComponent />
</ChildrenCounter>

// Renders "3"
<ChildrenCounter>
  {() => <h1>First!</h1>}
  Second!
  <p>Third!</p>
</ChildrenCounter>

/*
Кроме перечисленного выше, бывает необходимо обработать детей перед выводом, изменив часть свойств. 
Конечно же, напрямую этого сделать нельзя, ведь свойства неизменяемы. 
! Такого поведения можно добиться, клонируя элементы функцией React.cloneElement.

Как правильно обойти children для отрисовки?
> React.Children.map(this.props.children, ...)
*/

/**@@@src/ListGroup.js
Реализуйте компонент ListGroup, который отрисовывает переданных детей, оборачивая их в список.

Пример использования:
*/

<ListGroup>
  <p>one</p>
  <p>two</p>
</ListGroup>;

// Результат:

<ul class="list-group">
  <li class="list-group-item"><p>one</p></li>
  <li class="list-group-item"><p>two</p></li>
</ul>


// FILE: /app/src/ListGroup.js:
import React from 'react';

export default class ListGroup extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {React.Children.map(this.props.children, item =>
          <li className="list-group-item">{item}</li>)}
      </ul>
    );
  }
}


>>>>>> Состояние <<<<<<

class Counter extends React.Component {
  state = { count: 0 };

  onClick = () => {
    const count = this.state.count;
    this.setState({ count: count + 1 });
  };
  
  render() {
    return <button onClick={this.onClick}>
      count: {this.state.count}
    </button>;
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('react-root'),
);

/*
Компоненты, которые мы создавали раньше, были stateless, то есть не содержали никакого состояния и могли только отрисовывать переданные свойства. Компонент в примере выше является stateful, так как сохраняет внутри себя состояние счетчика. По порядку:

1. Внутри компонента определяется начальное состояние state = { count: 0 }, с которым будет инициализирован компонент после отрисовки. Единственное требование к состоянию, которое предъявляет Реакт - тип данных: он должен быть объектом. То, что хранится внутри, определяется самим приложением.

Альтернативный (и эквивалентный) способ задания начального состояния выглядит так:
*/

class Component extends React.Component {
  constructor(props) {
    super(props); // всегда обязательно
    this.state = { count: 0 };
  }
}

// Обратите внимание на то, что это единственное место, где state может изменяться напрямую (точнее, создаваться). Во всех остальных местах this.state должен использоваться только для чтения! 

/*
2. Функция render использует данные из state для отрисовки. Здесь никаких сюрпризов.

3. На кнопку вешается обработчик на клик. В отличие от html, в свойство onClick передается функция и она вызовется автоматически в момент срабатывания события. Внутри обработчика читается текущее значение счетчика, к нему прибавляется единица и далее идет установка нового состояния. Повторюсь: крайне важно не изменять state напрямую. Для установки нового состояния в реакте предусмотрена функция setState. Именно ее вызов приводит к тому, что компонент, в конце концов, перерисуется. Происходит это не сразу, то есть setState работает асинхронно и внутренняя магия пытается оптимизировать процесс рисования.

Еще один важный момент заключается в том, как определена функция onClick. Так как мы работаем с классом, то логично было бы использовать такой стиль определения:
*/

class Counter extends React.Component {
  onClick() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };
}

/*
Но такой подход плохо работает в Реакте по двум причинам:

Первая заключается в том, что обработчики вызываются асинхронно, а методы в классах — это обычные функции с поздним связыванием. Поэтому мы не можем просто так повесить обработчик, так как он потеряет this. С таким определением придется постоянно писать подобный код: onClick={this.onClick.bind(this)} либо такой onClick={() => this.onClick()}.

Вторая причина связана с производительностью. Оба предыдущих примера передачи обработчика порождают при каждом вызове функции render новые обработчики (так как функции сравниваются по ссылкам, а не по содержимому), а для Реакта это критично. Поэтому правильный способ определения - стрелочная функция:
*/

class Counter extends React.Component {
  onClick = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };
}

/*
По большому счету, описанный выше механизм открывает практически все двери. Теперь вы с легкостью можете создавать интерактивные компоненты и оживлять ваш UI. Все остальное — это тонкости, предусмотренные для различных ситуаций.


# Инициализация

Предположим, что в компоненте, созданном выше, нужно инициализировать счетчик со свойством count, переданным снаружи. И только в его отсутствие ставить 0. Для решения этой задачи нужно добавить две вещи:

1. Использовать свойство count как начальное значение счетчика.
2. Добавить значение по умолчанию для свойства count.
*/

class Counter extends React.Component {
  static defaultProps = {
    count: 0,
  };
    
  constructor(props) {
    super(props);
    this.state = { count: this.props.count }
  }

  onClick = () => {
    const count = this.state.count;
    this.setState({ count: count + 1 });
  };
  
  render() {
    return <button onClick={this.onClick}>
      count: {this.state.count}
    </button>;
  }
}

const vdom = <div>
  <Counter />
  <Counter count={5} />
</div>;

ReactDOM.render(
  vdom,
  document.getElementById('react-root'),
);

# setState
// Усложним компонент и реализуем две кнопки, каждая их которых управляет своим состоянием.
class Buttons extends React.Component {
  state = { count: 1, primary: false };

  onIncrement = () => {
    const count = this.state.count;
    this.setState({ count: count + 1 });
  };

  onChangeClass = () => {
    const primary = this.state.primary;
    this.setState({ primary: !primary });
  };
  
  render() {
    const buttonClass = classNames({
      btn: true,
      'btn-primary': this.state.primary,
    });

    return <div>
      <button className="btn btn-default m-3" onClick={this.onIncrement}>
        count: {this.state.count}
      </button>
      <button className={buttonClass} onClick={this.onChangeClass}>
        button
      </button>
    </div>;
  }
}

ReactDOM.render(
  <Buttons />,
  document.getElementById('react-root'),
);

// В данном примере объект состояния включает два свойства: count для одной кнопки и primary для другой. Основная хитрость этого примера заключается в процессе обновления состояния:

// первая кнопка
this.setState({ count: count + 1 });

// вторая кнопка
this.setState({ primary: !primary });

/*
Функция setState не просто принимает на вход новое состояние. Она заменяет значения ключей в предыдущем состоянии на значения этих же ключей в новом состоянии. То, что передано не было - не трогается. То есть, в нашем случае мы передавали только то, что изменяли. На практике это поведение крайне удобно, иначе пришлось бы каждый раз выполнять работу по слиянию старого состояния с новым руками.
*/

# Структура объекта состояния

// Существует множество способов организации данных внутри состояния. Скорее всего, вы захотите хранить их как-то так:
const blogPosts = [
  {
    id : "post1",
    author : {username : "user1", name : "User 1"},
    body : "......",
    comments : [
      {
        id : "comment1",
        author : {username : "user2", name : "User 2"},
        comment : ".....",
      },
      {
        id : "comment2",
        author : {username : "user3", name : "User 3"},
        comment : ".....",
      }
    ]
  },
  {
    id : "post2",
    author : {username : "user2", name : "User 2"},
    body : "......",
    comments : [
      {
        id : "comment3",
        author : {username : "user3", name : "User 3"},
        comment : ".....",
      },
    ]
  }
  // and repeat many times
]

/*
При таком подходе сущности, зависимые от других, находятся внутри. Если брать пример выше то это означает что каждый пост содержит внутри себя как автора, так и список комментариев, а каждый комментарий, в свою очередь, содержит внутри свои связанные сущности того же автора. При таком подходе получается что состояние представляет из себя дерево зависимостей. Хотя этот способ организации кажется вполне естественным, работать с ним крайне тяжело. Во-первых, одни и те же данные начнут дублироваться в разных местах и вам придется синхронизировать изменения в них, что создает космические проблемы на пустом месте. Во-вторых, обновления таких данных (особенно в иммутабельном стиле) становятся сложными и многословными. В-третьих, так как все состояние это один большой кусок, то любое обновление приведет к его полному копированию, что может быть дорогой операцией (в зависимости от размера состояния и количества обновлений в единицу времени).

Общая рекомендация, которую дают разработчики Реакта, это делать структуру максимально плоской, похожей на то, как мы храним данные в базе данных. Причем, желательно, в хорошо нормализованном виде. Другими словами, не нужно дублировать данные в состоянии. Пример того как правильно это делать:
*/

const state = {
  articles: [/*...*/],
  comments: [/*...*/],
}

/**@@@
src/BtnGroup.js
Реализуйте компонент BtnGroup, который отрисовывает две кнопки. Нажатие на любую из кнопок делает ее активной, а другую неактивной. При первой загрузке ни одна из кнопок не нажата.

Пример использования:
*/
<BtnGroup />

// Результат:

<div class="btn-group" role="group">
  <button type="button" class="btn btn-secondary left">Left</button>
  <button type="button" class="btn btn-secondary right">Right</button>
</div>

// После нажатия на левую кнопку, добавляется класс active. В результате список классов выглядит так: btn btn-secondary left active. У правой кнопки поведение соответствующее.

// FILE: /app/src/BtnGroup.jsx: 
import cn from 'classnames';
import React from 'react';

export default class BtnGroup extends React.Component {
  state = { active: null };

  selectLeft = () => this.setActive('left');

  selectRight = () => this.setActive('right');

  setActive = (active) => {
    this.setState({ active });
  }

  render() {
    const { active } = this.state;

    const sharedClasses = {
      btn: true,
      'btn-secondary': true,
    };

    const leftButtonClass = {
      ...sharedClasses,
      left: true,
      active: active === 'left',
    };

    const rightButtonClass = {
      ...sharedClasses,
      right: true,
      active: active === 'right',
    };

    return (
      <div className="btn-group" role="group">
        <button type="button" onClick={this.selectLeft} className={cn(leftButtonClass)}>Left</button>
        <button type="button" onClick={this.selectRight} className={cn(rightButtonClass)}>Right</button>
      </div>
    );
  }
}


// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';
import BtnGroup from './BtnGroup';

ReactDOM.render(
  <BtnGroup />,
  document.getElementById('container'),
);



>>>>>> События <<<<<<<

/*
На первый взгляд может показаться, что в Реакте используются обычные браузерные события, но это не так. Реакт самостоятельно перехватывает все события, возникающие в DOM, и транслирует их во внутреннюю систему.

В любой обработчик события при вызове передается объект типа SyntheticEvent, кроссбраузерный враппер (обертка) над нативным объектом события. Интерфейсно он не отличается от нативного, кроме того, что работает одинаково во всех браузерах.
*/

class Component extends React.Component {
  onClick = (event) => {
    console.log(event); // => nullified object.
    console.log(event.type); // => "click"
    const eventType = event.type; // => "click"
  }

  // ...
}

// Правда, в целях оптимизации вместо порождения нового объекта на новое событие, Реакт переиспользует старый объект. Значит код ниже работать верно не будет:
class Component extends React.Component {
  onClick = (event) => {
    this.setState({clickEvent: event});
  }

  // ...
}

/*
Поэтому правильно сохранять в стейте не сам объект события, а его свойства.

Как правило, само событие используется не часто. Например, при кликах обычно важен сам факт клика, а не его параметры, такие как координаты места возникновения. С другой стороны, событие нужно часто для предотвращения действия по умолчанию. Действительно, если ничего не предпринимать, то после клика страница будет перезагружена. В этом смысле ничего нового. И без Реакта все работает так же. Ниже правильный способ обработки такой ситуации:
*/

class Component extends React.Component {
  state = { count: 0 };

  onClick = (e) => {
    e.preventDefault();
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <a href="#" onClick={this.onClick}>click {this.state.count}</a>;
  }
}

ReactDOM.render(
  <Component />,
  document.getElementById('react-root'),
);

/*

В обычном html подобное поведение можно получить и другим способом. Для этого достаточно вернуть false из обработчика. В Реакте такой вариант не пройдет.

Точно так же нужно поступать при необходимости предотвратить всплытие события. Только вместо preventDefault вызывается функция stopPropagation.

В курсе JS DOM я говорил, что при работе с HTML предпочтительно использовать addEventListener. Одна из главных причин заключается в том, что такой способ позволяет повесить множество обработчиков, чем и пользуются многие JS дополнения. В React такой способ работы просто не нужен, так как управление потоком событий всегда явное. Никто не может подключиться к Реакту со стороны и навесить туда своих обработчиков.

Второй момент, который может пугать разработчиков, это навешивание обработчиков прямо в JSX. Не лишний раз будет напомнить, что JSX — это JS-код, а не HTML. Поэтому нет никакой проблемы. Как вы увидите позже, такой код очень просто читать, потому что все находится в одном месте.

React нормализует события так, что они имеют консистентные свойства в различных браузерах. Кроме того, в формах добавляется событие onChange, которое ведет себя в соответствии со своим названием и сильно упрощает работу.
*/

/**@@@
src/Carousel.jsx
Реализуйте компонент, эмулирующий работу слайдера. Компонент принимает на вход свойство images, в котором находится список путей до картинок. Компонент отображает их и позволяет с помощью стрелок "вперёд" и "назад" осуществлять переход по ним. Сам переход зациклен. Ниже описано поведение:

 - Если выбрана последняя картинка, то next ведёт на первую. Тоже самое происходит и prev, но в обратную сторону.
 - Первая картинка становится активной. Порядок картинок и их отображение должны сохраняться.
 - Начальная вёрстка с данными, которые прогружаются в файле src/index.jsx:
*/
 <div id="carousel" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img alt="" class="d-block w-100" src="/images/first.jpeg">
    </div>
    <div class="carousel-item">
      <img alt="" class="d-block w-100" src="/images/second.jpeg">
    </div>
    <div class="carousel-item">
      <img alt="" class="d-block w-100" src="/images/third.jpeg">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

// Хотя вёрстка и не тривиальная, единственное, что меняется в ней — класс active.

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';

import Carousel from './Carousel';

const images = ['/images/first.jpeg', '/images/second.jpeg', '/images/third.jpeg'];

ReactDOM.render(
  <Carousel images={images} />,
  document.getElementById('container'),
);

// FILE: /app/src/Carousel.jsx:
import React from 'react';
import cn from 'classnames';

export default class Carousel extends React.Component {
  state = { currentIdx: 0 };

  setNext = (e) => {
    e.preventDefault();
    const { images } = this.props;
    const { currentIdx } = this.state;
    const nextIdx = ((currentIdx + 1) % images.length);
    this.setState({ currentIdx: nextIdx });
  }

  setPrev = (e) => {
    e.preventDefault();
    const { images } = this.props;
    const { currentIdx } = this.state;
    const prevIdx = ((currentIdx + (images.length - 1)) % images.length);
    this.setState({ currentIdx: prevIdx });
  }

  renderItems() {
    const { currentIdx } = this.state;
    const { images } = this.props;
    return images.map((url, id) => {
      const classes = cn({
        'carousel-item': true,
        active: currentIdx === id,
      });
      return (
        <div key={url} className={classes}>
          <img alt="" className="d-block w-100" src={url} />
        </div>
      );
    });
  }

  render() {
    return (
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {this.renderItems()}
        </div>
        <a href="#carousel" className="carousel-control-prev" onClick={this.setPrev} role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" />
          <span className="sr-only">Previous</span>
        </a>
        <a href="#carousel" className="carousel-control-next" onClick={this.setNext} role="button" data-slide="next">
          <span className="carousel-control-next-icon" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}




>>>>>> Автоматное программирование <<<<<<

/*
Тема конечных автоматов занимает центральную роль во фронтенд разработке. Интерактивные элементы всегда вовлечены в процессы, связанные с изменением состояний. Модальные окна бывают открытые и скрытые, кнопка нажата, отжата или заблокирована (например, во время ajax-запроса). Примеров бесконечное множество. Нередко эти автоматы зависят друг от друга, что порождает иерархию автоматов. Например, возможность взаимодействовать с элементом на экране может появляться только после нажатия кнопки "редактировать".

В Реакте работа с автоматами проста до безобразия и в большинстве случаев не требует использования специальных библиотек. Возьмем, к примеру, кнопку, которая отвечает за показ куска текста. Ее состояния можно описать так:

1. По умолчанию текст скрыт (состояние hidden).
2. Клик по кнопке отображает текст (состояние shown).
3. Повторный клик прячет текст (hidden).

В данном случае у кнопки два состояния, поэтому можно упростить задачу и использовать флаг как индикатор состояния. Назовем его как isShown.

Я очень не рекомендую так делать в бекенде, когда состояние хранится в базе. Цена изменения автомата слишком высока (изменение типа колонки с boolean на string), поэтому даже в случае бинарной логики лучше делать полноценный автомат с именованными состояниями. Другими словами, для хранения состояния используйте не булево поле (с true/false), а текстовое поле, в котором будет содержаться полное название состояния. Например, если статья может находиться в двух состояниях, Опубликована или Не опубликована, то нужно делать не поле 'published: bool' со значениями true и false, а поле 'publishing_state' со значениями 'published' и 'unpublished'`
*/

class Help extends React.Component {
  state = { isShown: false };

  toggleText = () => {
    this.setState({ isShown: !this.state.isShown });
  };

  render() {
    const isShown = this.state.isShown;
    
    return <div>
      <button onClick={this.toggleText}>{ isShown ? 'hide' : 'show' }</button>
      {isShown ? <p>help me!</p> : null }
      </div>;
  }
}

ReactDOM.render(
  <Help />,
  document.getElementById('react-root'),
);

/*
Большая часть кода в Реакте (как и во всем фронтенде) выглядит именно так, как в примере выше. События порождают изменения состояния в данных, на основе которых, в свою очередь, меняется представление. Количество конечных автоматов во фронтенд приложениях растет с астрономической скоростью, главное их видеть и выделять явно.

# Структура состояния

Данные, с которыми работает Реакт, как правило, приходят из бекенда. И эти данные тоже участвуют в разных процессах и находятся в разных состояниях. Например, статья может быть опубликована, а может быть и нет. И в зависимости от того, в каком она состоянии, рисуется UI. И здесь начинается самое интересное. Конкретно состояние опубликованности статьи не является частью UI, но UI использует это состояние, а при изменениях оно синхронизируется на фронтенде и бекенде. Но в UI часто появляются состояния, которые отвечают исключительно за внешний вид, но не являются частью данных.

Если предположить, что данные, пришедшие с бекенда, внутри нашего объекта-состояния хранятся как список под ключом items, то возникает вопрос: куда записывать данные, отвечающие за состояние UI? То есть те самые стейты, которые появляются только при взаимодействии с пользователем и не используются на серверной стороне?

Поясню на примере. К нам приходит статья такой структуры: { id: 3, name: 'How to programm', state: 'published' }. Мы отправляем ее в items. А в UI есть возможность зайти в ее редактирование и для этого используется флаг (состояние) isEditing, который существует только на экране. Вопрос: где хранить эту переменную?

Самый простой вариант: изменить саму статью внутри items так, чтобы она имела такой вид: { id: 3, name: 'How to programm', state: 'published', isEditing: true }. Хотя, на первый взгляд, он и кажется разумным, проблем он привносит больше, чем пользы. В основном эти проблемы связаны с задачами синхронизации. Иногда бывает нужно отправить всю статью на сервер (после изменений), а иногда перечитать ее заново с бекенда. В такой ситуации нужно будет либо извлекать только нужные данные, либо постоянно делать мердж (слияние), чтобы не потерять состояние UI. Практика показала, что гораздо проще добавлять отдельный список исключительно под задачи хранения состояния UI. То есть в нашем стейте появится список под названием itemUIStates, и для нашей статьи в него добавится элемент { articleId: 3, isEditing: true }.
*/

/**@@@
src/Collapse.jsx
Реализуйте компонент <Collapse>, который по клику на ссылке отображает свое содержимое и при повторном - прячет. Содержимое передается в компонент через свойство text. За начальное состояние открытости, отвечает свойство opened, которое по умолчанию равно true.
*/

const text = 'collapse me';
<Collapse text={text} opened={false} />;
<div>
  <p>
    <a class="btn btn-primary" href="#">Link with href</a>
  </p>
  <div class="collapse">
    <div class="card card-body">
      collapse me
    </div>
  </div>
</div>

/*
Единственное что меняется в HTML после клика, к классу collapse элемента <div> добавляется класс show.

Подсказки
Collapse
*/

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';

import Collapse from './Collapse';

const text = 'collapse me';

ReactDOM.render(
  <Collapse text={text} />,
  document.getElementById('container'),
);


// FILE: /app/src/Collapse.jsx:
import React from 'react';
import cn from 'classnames';

export default class Collapse extends React.Component {
  static defaultProps = {
    opened: true,
  };

  constructor(props) {
    super(props);
    const { opened } = props;
    this.state = { opened };
  }

  handleToggle = (e) => {
    e.preventDefault();
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  render() {
    const { opened } = this.state;
    const { text } = this.props;
    const classes = cn({
      collapse: true,
      show: opened,
    });

    return (
      <div>
        <p>
          <a className="btn btn-primary" onClick={this.handleToggle} href="#">
            Link with href
          </a>
        </p>
        <div className={classes}>
          <div className="card card-body">
            {text}
          </div>
        </div>
      </div>
    );
  }
}




>>>>>> Формы <<<<<<

/*
Формы в HTML работают немного не так, как формы в Реакте. Это связано с тем, что в HTML они имеют свое внутреннее состояние - место, в котором хранятся значения форм, тексты, выбранные опции и тому подобное.
*/

<form action="">
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>

/*
Форма выше при каждом изменении поля name изменяет свое внутреннее состояние, которое будет отправлено по нужному адресу при сабмите.

В отличие от прямой работы с DOM (даже через jQuery), в Реакте источником правды является состояние, а не DOM. Формы не являются исключением. Любое изменение в форме, посимвольно, если это ввод, должно быть перенесено в состояние. А элементы форм, чьи данные хранятся в стейте Реакта, называются "controlled components".
*/

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.text };
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    alert(`A name was submitted: ${this.state.text}`);
  };
  
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };
  
  render() {
    return <form onSubmit={this.handleSubmit}>
      <input onChange={this.handleChange} value={this.state.text} />
      <input type='submit' value='Submit' />
    </form>;
  }
}

ReactDOM.render(
  <TextInput text="initial text" />,
  document.getElementById('react-root'),
);

/*
В коде выше на каждое изменение в элементе input происходит извлечение содержимого через e.target.value и запись его в Реакт. Последующий сабмит не нуждается в самой форме, так как все данные в стейте. Поэтому при отправке формы достаточно взять нужный стейт и отправить его, например, на сервер. Обратите внимание: наш элемент формы становится контролируемым (controlled components) только когда происходит подстановка его значения из Реакта: <input value={this.state.text} />.

Один из множества плюсов контролируемых компонентов в том, что становится крайне легко проводить фильтрацию или валидацию. Например, если мы хотим, чтобы данные вводились в верхнем регистре (например, при вводе данных карты), то сделать это можно так:
*/

handleChange = (e) => {
  this.setState({ value: e.target.value.toUpperCase() });
}

# Textarea
// В HTML значение <textarea> устанавливается как его содержимое:
<textarea>
  Like this
</textarea>

// В Реакте для этого используется атрибут value:
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.text };
  }
  
  onChange = (e) => {
    this.setState({ text: e.target.value });
  };
  
  render() {
    return <textarea onChange={this.onChange} value={this.state.text} />;
  }
}

ReactDOM.render(
  <Editor text="initial text" />,
  document.getElementById('react-root'),
);

/*
Стоит отметить, что событие onChange в Реакте работает так, как ожидается, в отличие от onChange в HTML, который срабатывает только когда элемент теряет фокус. Поэтому мы гарантировано получаем срабатывание события на каждое изменение. При этом данные из элемента формы извлекаются обычным способом через e.target.value. Ну а дальше все по старой схеме — данные обновляются в стейте.
*/

# Select

// В HTML текущий элемент выбирается с помощью атрибута selected, проставленного на нужном option.

<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>

// Реакт предлагает другой, более простой и удобный способ. Достаточно проставить атрибут value компонента select в нужное значение.
class FlavorForm extends React.Component {
  state = { value: '' };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your favorite flavor is: ${this.state.value}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('react-root'),
);


# checkbox & radio
// Оба этих типа поддерживают атрибут checked. Если он выставлен, то элемент отмечается выбранным.
<input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />


# Шаблонный код

/*
Работа с формами в Реакте — довольно трудоемкая задача. С одной стороны все крайне просто, с другой — появляется много однотипного кода. Поэтому для Реакта создано множество библиотек, позволяющих автоматизировать сохранение состояния формы. В основном эти библиотеки нацелены на работу через redux. Подробнее — в соответствующем курсе.

# Дополнительные материалы
Формы https://reactjs.org/docs/forms.html
*/

/**@@@
src/MyForm.jsx
Реализуйте компонент <MyForm> отображающий форму из шести элементов:

 - email - текстовый инпут
 - password - инпут типа password
 - address - textarea
 - city - текстовый инпут
 - country - select со следующими значениями: argentina, russia, china.
 - Accept Rules - checkbox
После сабмита формы, появляется таблица в которой показываются значения всех полей. Из этой формы можно вернуться в редактирование по кнопке Back. При этом все данные должны оказаться на своих местах.

# Форма
*/

<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4" class="col-form-label">Email</label>
      <input type="email" name="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4" class="col-form-label">Password</label>
      <input type="password" name="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress" class="col-form-label">Address</label>
    <textarea type="text" class="form-control" name="address" id="inputAddress" placeholder="1234 Main St"></textarea>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity" class="col-form-label">City</label>
      <input type="text" class="form-control" name="city" id="inputCity">
    </div>
    <div class="form-group col-md-6">
      <label for="inputCountry" class="col-form-label">Country</label>
      <select id="inputCountry" name="country" class="form-control">
        <option>Choose</option>
        <option value="argentina">Argentina</option>
        <option value="russia">Russia</option>
        <option value="china">China</option>
      </select>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <label class="form-check-label" for="rules">
        <input id="rules" type="checkbox" name="acceptRules" class="form-check-input">
        Accept Rules
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>

// После отправки формы:

<div>
  <button type="button">Back</button>
  <table class="table">
    <tbody>
      <tr>
        <td>acceptRules</td>
        <td>true</td>
      </tr>
      <tr>
        <td>address</td>
        <td>lenina street</td>
      </tr>
      <tr>
        <td>city</td>
        <td>moscow</td>
      </tr>
      <tr>
        <td>country</td>
        <td>russia</td>
      </tr>
      <tr>
        <td>email</td>
        <td>my@email.com</td>
      </tr>
      <tr>
        <td>password</td>
        <td>qwerty</td>
      </tr>
    </tbody>
  </table>
</div>

// Строки сортируются в алфавитном порядке по именам в первом столбце. В вашем случае результирующая таблица может отличаться, все зависит от того какие данные выбраны.

// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';

import MyForm from './MyForm';

ReactDOM.render(
  <MyForm />,
  document.getElementById('container'),
);



// FILE: /app/src/MyForm.jsx:
import React from 'react';

export default class MyForm extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
      city: '',
      country: '',
      address: '',
      acceptRules: false,
    },
    submittingState: 'fillingForm',
  };

  handleChangeField = ({ target }) => {
    const { form } = this.state;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ form: { ...form, [target.name]: value } });
  }

  handleBackToForm = () => {
    this.setState({ submittingState: 'fillingForm' });
  }

  handleSubmitForm = () => {
    this.setState({ submittingState: 'submitted' });
  }

  renderRow = (key) => {
    const { form } = this.state;
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{form[key].toString()}</td>
      </tr>
    );
  };

  renderResult() {
    const { form } = this.state;
    const keys = Object.keys(form).sort();
    return (
      <div>
        <button type="button" onClick={this.handleBackToForm}>Back</button>
        <table key="fieldsValues" className="table">
          <tbody>
            {keys.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    );
  }

  renderForm() {
    const { form } = this.state;

    return (
      <form onSubmit={this.handleSubmitForm}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4" className="col-form-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChangeField}
              value={form.email}
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4" className="col-form-label">Password</label>
            <input
              type="password"
              onChange={this.handleChangeField}
              value={form.password}
              name="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress" className="col-form-label">Address</label>
          <textarea type="text" name="address" value={form.address} onChange={this.handleChangeField} className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity" className="col-form-label">City</label>
            <input type="text" name="city" onChange={this.handleChangeField} value={form.city} className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputCountry" className="col-form-label">Country</label>
            <select id="inputCountry" name="country" onChange={this.handleChangeField} className="form-control" value={form.country}>
              <option>Choose</option>
              <option value="argentina">Argentina</option>
              <option value="russia">Russia</option>
              <option value="china">China</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <label className="form-check-label" htmlFor="rules">
              <input id="rules" name="acceptRules" className="form-check-input" onChange={this.handleChangeField} type="checkbox" checked={form.acceptRules} />
              Accept Rules
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }

  render() {
    const { submittingState } = this.state;
    switch (submittingState) {
      case 'fillingForm':
        return this.renderForm();
      case 'submitted':
        return this.renderResult();
      default:
        throw new Error(`'${submittingState}' - unknown state`);
    }
  }
}