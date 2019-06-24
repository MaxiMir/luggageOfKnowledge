<?

#################### JS: React ####################
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




>>>>>> Неизменяемость <<<<<<

/*
Неизменяемость состояния - одна из ключевых тем в Реакте. Ее легко придерживаться, работая с примитивными типами данных, но с составными, такими как объекты и массивы, у неподготовленного пользователя могут возникнуть сложности. В этом уроке мы пробежимся по основным способам частичного обновления объектов и массивов.

Кроме примеров на чистом js, я буду демонстрировать примеры с использованием библиотеки immutability-helper, которая создана для облегчения выполнения подобных операций. Она особенно актуальна при выполнении обновлений там, где код на js получается слишком сложным.
*/

### Массивы ###

# Массив: добавление

// Самое простое это добавление в массив:
const items = ['one', 'two', 'three'];
const item = 'four';
const newItems = [...items, item];
// => ['one', 'two', 'three', 'four'];

// Если необходимо добавить элемент в начало, то нужно всего лишь поменять местами элементы массива:
const newItems = [item, ...items];
// => ['four', 'one', 'two', 'three'];


# immutability-helper
import update from 'immutability-helper';

const state1 = ['x'];
const state2 = update(state1, { $push: ['y'] }); // => ['x', 'y']


# Массив: удаление

// Более интересный пример. Чтобы успешно выполнить удаление, нужно знать, что удалять. Это значит, что каждый элемент в коллекции должен иметь идентификатор. Для удаления используется старая добрая фильтрация.

const newItems = items.filter(item => item.id !== id);

// Может возникнуть вопрос: откуда взялся идентификатор внутри обработчика? И здесь нам на помощь приходят замыкания.
class List extends React.Component {
  removeItem = (id) => (e) => {
    e.preventDefault();
    const newItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: newItems });
  };

  constructor(props) {
    super(props);
    const items = [1, 2, 3, 4, 5].map(i => ({ id: i }));
    this.state = { items };
  }
  
  render() {
    return <ul>
      {this.state.items.map(item => this.renderItem(item))}
    </ul>;
  }

  renderItem({ id }) {
    return <li><a href="#" onClick={this.removeItem(id)}>{id}</a></li>;
  }
}

ReactDOM.render(
  <List />,
  document.getElementById('react-root'),
);


// Обратите внимание на способ задания обработчика: removeItem = (id) => (e) => { и его использование onClick={this.removeItem(id)}.

# immutability-helper
const index = 5;
const newItems = update(items, {$splice: [[index, 1]]});

// Удаление на чистом js через фильтр - самый оптимальный способ. С использованием immutabiliy-helper получается сложно.

# Массив: изменение
// К сожалению, без дополнительных инструментов код решения будет слишком громоздким. Я приведу его ниже для ознакомления, но в реальном коде так делать не надо.

const index = items.findIndex((item) => item.id === id);
const newItem = { ...items[index], value: 'another value' };
const newItems = [...items.slice(0, index), newItem, ...items.slice(index + 1)];

// Думаю, мне не придется вас убеждать в том, что это перебор :)

# immutability-helper
const collection = { children: ['zero', 'one', 'two'] };
const index = 1;
const newCollection = update(collection, { children: { [index]: { $set: 1 } } });
// => { children: ['zero', 1, 'two'] }

// Как видно, этот способ значительно проще и чище. Рекомендуется к использованию.


### Объекты ###

# Объект: добавление
// Так же просто, как и с массивом.
const items = { a: 1, b: 2 };
const newItems = { ...items, c: 3 };
// => { a: 1, b: 2, c: 3 }

// Либо, если ключ вычисляется динамически, нужно делать так:
const items = { a: 1, b: 2 };
const key = 'c';
const newItems = { ...items, [key]: 3 };
// => { a: 1, b: 2, c: 3 }

# Объект: удаление
// Решение ниже привожу только для ознакомления. На чистом js нет простого способа удалить ключ в неизменяемом стиле:
Object.keys(myObj)
  .filter(key => key !== deleteKey)
  .reduce((acc, current) => ({ ...acc, [current]: myObj[current] }), {});

# immutability-helper
import update from 'immutability-helper';

const state = { a: 1, c: 3 };
const updatedState = update(state, {
  $unset: ['c'],
});
// => { a: 1 }

# Объект: изменение
// Абсолютно то же самое, что и добавление.
const items = { a: 1, b: 2 };
const newItems = { ...items, a: 3 };
// => { a: 3, b: 2 }

# immutability-helper
const data = { a: 1, b: 2 };
const key = 'a';
const newData = update(data, { [key]: { $set: 3 } });
// => { a: 3, b: 2 }


# Глубокая вложенность

/*
В примерах выше в основном можно обходиться стандартными средствами js, и только в некоторых ситуациях удобнее пользоваться сторонними решениями. В реальном коде все будет также, особенно если учитывать рекомендацию Реакта и держать свой стейт максимально плоским. Но в некоторых ситуациях данные, которые нужно изменить, находятся не на поверхности, а в глубине структур. К сожалению, в этих ситуациях обычный js код будет раздуваться. И тут уже точно не обойтись без дополнительных библиотек.
*/

/*
Аналоги
 - immutability-helper — не единственная библиотека для подобных задач. Вот еще несколько популярных:
 - immutable-js - основана на персистентных данных;
 - updeep - активно использует каррирование.
*/


/**@@@
src/Component.jsx
Реализуйте компонент, который представляет из себя две кнопки и лог событий:

Лог это список значений, каждое из которых получается после нажатия на одну из двух кнопок
Левая кнопка + добавляет в лог строчку с новым значением равным старое + 1
Правая кнопка - добавляет в лог строчку с новым значением равным старое - 1
При клике на запись в логе, она удаляется.

Начальный HTML:
*/ 

<div>
  <div class="btn-group" role="group">
    <button type="button" class="btn hexlet-inc">+</button>
    <button type="button" class="btn hexlet-dec">-</button>
  </div>
</div>


// После нажатия последовательности +, +, -, +:

<div>
  <div class="btn-group" role="group">
    <button type="button" class="btn hexlet-inc">+</button>
    <button type="button" class="btn hexlet-dec">-</button>
  </div>
  <div class="list-group">
    <button type="button" class="list-group-item list-group-item-action">2</button>
    <button type="button" class="list-group-item list-group-item-action">1</button>
    <button type="button" class="list-group-item list-group-item-action">2</button>
    <button type="button" class="list-group-item list-group-item-action">1</button>
  </div>
</div>

// Каждое нажатие кнопки добавляет в лог новую строчку сверху.


// FILE: /app/src/Component.jsx:
import _ from 'lodash';
import React from 'react';

export default class Component extends React.Component {
  state = { items: [] };

  handleCount = (value) => {
    const { items } = this.state;
    const currentValue = _.get(items, [0, 'value'], 0) + value;
    const current = { id: _.uniqueId(), value: currentValue };
    this.setState({ items: [current, ...items] });
  }

  handleDec = () => this.handleCount(-1);

  handleInc = () => this.handleCount(1);

  handleRemove = currentId => () => {
    const { items } = this.state;
    this.setState({ items: items.filter(({ id }) => id !== currentId) });
  }

  renderLog() {
    const { items } = this.state;
    if (items.length === 0) {
      return null;
    }

    return (
      <div className="list-group">
        {items.map(({ id, value }) => (
          <button type="button" className="list-group-item list-group-item-action" key={id} onClick={this.handleRemove(id)}>
            {value}
          </button>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="btn-group" role="group">
          <button type="button" className="btn hexlet-inc" onClick={this.handleInc}>+</button>
          <button type="button" className="btn hexlet-dec" onClick={this.handleDec}>-</button>
        </div>
        {this.renderLog()}
      </div>
    );
  }
}




>>>>>> Вложенные компоненты <<<<<<

/*
В реальных приложениях на Реакте компонентов значительно больше. Часть из них — самостоятельные, часть используется только в составе других.

Один из способов компоновки компонентов мы уже знаем - children. Причем, нет никакой разницы являются ли потомки встроенными в Реакт компонентами, или это отдельно написанные компоненты.
*/

class Alert extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="alert alert-primary">
        {children}
      </div>
    );
  }
}

const vdom = (
  <Alert>
    <p>Paragraph 1</p>
    <hr />
    <p class="mb-0">Paragraph 2</p>
  </Alert>
);

ReactDOM.render(
  vdom,
  document.getElementById('react-root'),
);

/*
В некоторых ситуациях внутрь компонента нужно передавать только определенные, специально созданные под него компоненты. Например, компонент Card до текущего момента мы реализовывали так, что он принимал на вход только свойства. В реальности это решение так себе. Кастомизация отсутствует полностью, можно передать только то, что изначально задумано и то в формате строк. Ни о каком сложном содержимом не может быть и речи. Правильный подход выглядел бы так:
*/

<Card>
  <CardImgTop src="path/to/image" />
  <CardBody>
    <CardTitle>Body</CardTitle>
  </CardBody>
</Card>

// В тех ситуациях, когда композиция не требуется, можно просто брать и использовать любые сторонние компоненты внутри своих.
class Item extends React.Component {
  render() {
    const { value } = this.props;
    return <li><b>{value}</b></li>;
  }
}

class List extends React.Component {
  render() {
    const { items } = this.props;
    return <ul>
      { items.map(i => <Item value={i} />) }
    </ul>;
  }
}

ReactDOM.render(
  <List items={[1, 2, 3, 4, 5]} />,
  document.getElementById('react-root'),
);

/*
Вкладывать можно сколько угодно раз и какие угодно компоненты. Но здесь кроется одна опасность. Желание построить "идеальную архитектуру" толкает разработчиков заранее планировать то, как разбить приложение на компоненты и сразу их реализовать. Важно понимать, что вложенность сама по себе — это усложнение понимания, так как придется постоянно прыгать туда сюда. Кроме того, жесткая структура свяжет вас по рукам и ногам, рефакторинг просто так не сделаешь, и желание его делать сильно поубавится из-за любви к своему решению. Будьте прагматичны. Оптимальный путь добавлять новые компоненты — это следить за моментом, когда вам становится сложно в текущем компоненте из-за объемов и количества переменных, с которыми приходится иметь дело одномоментно. И даже в этом случае часто достаточно выделить дополнительные функции рендеринга внутри самого компонента, например так: renderItem.

# Состояние
Один из самых частых вопросов у тех, кто только начинает знакомиться с Реактом, связан с тем, как распределять состояние по компонентам. Короткий ответ: никак. Почти во всех ситуациях разделение состояния усложнит код и работу с ним. Правильный подход — создать корневой компонент, который содержит все состояние внутри себя, а все нижележащие компоненты получают свои данные как свойства. Само состояние должно быть максимально плоским, как реляционная база данных. Тогда можно спокойно применять нормализацию и безболезненно выполнять обновления.

Иногда могут возникать ситуации, когда необходимые в глубине свойства приходится протаскивать сквозь множество промежуточных компонентов, которые сами эти свойства не используют. Это еще одна причина стараться не увлекаться глубокой вложенностью. С другой стороны, в следующем курсе мы познакомимся с Redux, который во многом решает эту проблему (и много других).

# Колбеки
Из сказанного выше возникает еще одна сложность: что, если событие возникает в глубинном компоненте, у которого нет своего состояния? Без использования Redux выход, по сути, только один. Корневой компонент должен пробрасывать колбеки во внутренние компоненты, а те, в свою очередь, пробрасывают их дальше по необходимости.
*/

class Item extends React.Component {
  render() {
    const { value, onRemove } = this.props;
    return (
      <li>
        <a href="#" onClick={onRemove(value)}>{value}</a>
      </li>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    const { items } = this.props;
    this.state = { items };
  }
  
  handleRemove = (value) => (e) => {
    e.preventDefault();
    const newItems = this.state.items.filter(item => item !== value);
    this.setState({ items: newItems });
  };

  render() {
    const { items } = this.state;
    
    return (
      <ul>
        {items.map(i =>
          <Item onRemove={this.handleRemove} value={i} />
        )}
      </ul>
    );
  }
}

ReactDOM.render(
  <List items={[1, 2, 3, 4, 5]} />,
  document.getElementById('react-root'),
);


/**@@@
Реализуйте простой Todo, с возможностью добавлять и удалять заметки.

src/TodoBox.js
Основной компонент, который выводит форму для добавления новой записи и выводит список заметок на экран.

Начальный HTML:
*/ 

<div>
  <div class="mb-3">
    <form class="todo-form form-inline mx-3">
      <div class="form-group">
        <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
      </div>
      <button type="submit" class="btn btn-primary">add</button>
    </form>
  </div>
</div>

/*
src/Item.jsx
Отрисовывает конкретный элемент списка. Принимает на вход свойства:

task
onRemove
HTML с добавленными заметками:
*/

<div>
  <div class="mb-3">
    <form class="todo-form form-inline mx-3">
      <div class="form-group">
        <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
      </div>
      <button type="submit" class="btn btn-primary">add</button>
    </form>
  </div>
  <div>
    <div class="row">
      <div>
        <form class="todo-remove-item-form" action="">
          <button type="submit" class="btn btn-primary btn-sm">-</button>
        </form>
      </div>
      <div class="col-10">second</div>
    </div>
    <hr>
  </div>
  <div>
    <div class="row">
      <div>
        <form class="todo-remove-item-form" action="">
          <button type="submit" class="btn btn-primary btn-sm">-</button>
        </form>
      </div>
      <div class="col-10">first</div>
    </div>
    <hr>
  </div>
</div>

/*
Добавление элементов происходит в обратном порядке. Новые всегда сверху.

Подсказки
Для получения нового id используйте функцию uniqueId.
*/

// FILE: /app/src/Item.jsx:
import React from 'react';

export default class Item extends React.Component {
  render() {
    const { task, onRemove } = this.props;

    return (
      <div className="row">
        <div>
          <form className="todo-remove-item-form" action="" onSubmit={onRemove}>
            <button type="submit" className="btn btn-primary btn-sm">-</button>
          </form>
        </div>
        <div className="col-10">
          {task.text}
        </div>
      </div>
    );
  }
}

// FILE: /app/src/TodoBox.jsx:
import { uniqueId } from 'lodash';
import React from 'react';
import Item from './Item';

export default class TodoBox extends React.Component {
  state = { newTaskText: '', tasks: [] };

  onChangeTask = ({ target: { value } }) => {
    this.setState({ newTaskText: value });
  }

  onRemoveTask = removingId => (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    
    this.setState({ tasks: tasks.filter(({ id }) => id !== removingId) });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { tasks, newTaskText } = this.state;
    const newTask = { id: uniqueId(), text: newTaskText };
    
    this.setState({ newTaskText: '', tasks: [newTask, ...tasks] });
  }

  renderForm() {
    const { newTaskText } = this.state;
    return (
      <form onSubmit={this.onSubmitForm} className="todo-form form-inline mx-3">
        <div className="form-group">
          <input
            type="text"
            onChange={this.onChangeTask}
            value={newTaskText}
            required
            className="form-control mr-3"
            placeholder="I am going..."
          />
        </div>
        <button type="submit" className="btn btn-primary">add</button>
      </form>
    );
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <div className="mb-3">
          {this.renderForm()}
        </div>
        {tasks.map(task => (
          <div key={task.id}>
            <Item task={task} onRemove={this.onRemoveTask(task.id)} />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}




>>>>>> Функциональные компоненты <<<<<<

// Для создания компонентов Реакта не обязательно использовать классы. В тех случаях, когда у компонента нет состояния, гораздо проще использовать альтернативный способ.

const List = (props) => {
  return (<ul>
    {props.items.map(v => <li>{v}</li>)}
  </ul>);
}

ReactDOM.render(
  <List items={[1, 2, 3]} />,
  document.getElementById('react-root'),
);

/*
Компоненты, созданные как функции, называются функциональными. Они принимают объект со свойствами как первый аргумент, и так же начинаются с большой буквы.

На вопрос "когда их стоит использовать?" ответ очень простой. Всегда, когда компонент не хранит в себе состояние. Другими словами, большинство компонентов в проекте должно быть именно функциональными.

В остальном они ведут себя точно так же, как и компоненты на классах.
*/

# Неймспейсы

// Вспомним пример из прошлого урока, связанный с использованием компонентов-потомков, созданных специально для родительского компонента.

<Card>
  <CardTitle>Title</CardTitle>
  <CardBody>
    <b>Body</b>
  </CardBody>
</Card>

/*
Следуя сказанному выше компоненты <CardTitle> и <CardBody> должны быть реализованы как функциональные.

Но это еще не все, можно пойти дальше и реализовать такую структуру:
*/
import Card from './Card.jsx';

<Card>
  <Card.Body>
    <Card.Title>Title</Card.Title>
  </Card.Body>
</Card>

/*
JSX поддерживает механизм неймспейсов. Не сказать, что без него нельзя жить, но он довольно удобен. Во-первых, достаточно импортировать только компонент верхнего уровня, а остальное доступно уже через него, что довольно логично, если смотреть на JSX как на js код. Во-вторых, так лучше задается семантика.

Реализуется подобный механизм через статические свойства.
*/

const Title = (props) => <div className="card-title">{props.children}</div>;
const Body = (props) => <div className="card-body">{props.children}</div>;

class Card extends React.Component {
  static Body = Body;
  static Title = Title;

  render() {
    return <div className="card card-block">{this.props.children}</div>;
  }
}

const vdom = (<Card>
  <Card.Body>
    <Card.Title>What is love?</Card.Title>
  </Card.Body>
</Card>);

ReactDOM.render(
  vdom,
  document.getElementById('react-root'),
);

// Такой способ компоновки не требует того, чтобы все компоненты были созданы в одном файле. Структура может быть любой, для остального есть импорты.

/**@@@
src/Card.jsx
Реализуйте компонент <Card> так чтобы можно составлять такую структуру:
*/

<Card>
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Text>Text</Card.Text>
  </Card.Body>
</Card>

// Получившийся HTML:
<div class="card">
  <div class="card-body">
    <h4 class="card-title">Title</h4>
    <p class="card-text">Text</p>
  </div>
</div>


// FILE: /app/src/Card.jsx:
import React from 'react';

const Body = ({ children }) => <div className="card-body">{children}</div>;
const Title = ({ children }) => <h4 className="card-title">{children}</h4>;
const Text = ({ children }) => <p className="card-text">{children}</p>;

export default class Card extends React.Component {
  static Body = Body;

  static Title = Title;

  static Text = Text;

  render() {
    const { children } = this.props;
    return <div className="card">{children}</div>;
  }
}




>>>>>> Virtual Dom <<<<<<

/*

В предыдущем курсе мы впервые столкнулись c изменением DOM в процессе взаимодействия со страницей. Этот способ резко отличается от того, который мы использовали в курсе JS: DOM API. Важнейшее отличие связано с тем, как происходит изменение состояния отрисованного экрана. Напомню вкратце, что при прямом манипулировании DOM нам нужно сделать следующее:

1. Удалить из DOM то, что стало неактуально для следующего состояния.
2. Изменить, если надо, те элементы, которые присутствуют на экране и должны остаться в новом.
3. Добавить новые элементы на страницу (точечно).
Другими словами, чтобы перейти в новое состояние, нужно изменить старое. Значит про него надо знать.

В Реакте все совсем по-другому. После любого изменения и вызова setState Реакт создает новое состояние и отрисовывает все компоненты так, как будто это происходит с нуля. На самом деле отрисовка действительно происходит с нуля. Нам не важно, что было до этого момента на экране и как оно располагалось. Любое изменение в Реакте приводит к тому что приложение отрисовывается заново.

Создатели React называют этот подход one-way data flow:
1. Действия пользователя приводят к изменению состояния приложения (через setState).
2. Реакт запускает цикл отрисовки. Начиная от того компонента, в котором было изменено состояние (как правило, корневой компонент), через props данные постепенно распространяются от компонентов более высокого уровня до самых глубинных компонентов.
3. Получившийся html интегрируется в страницу.

Те, кто хорошо знаком с функциональным подходом, могут увидеть прямую связь. Реакт действительно делает мир неизменяемым (immutable). Самый простой способ реализовать подобное поведение - использовать mountElement.innerHTML, который заменяет html целиком после вызова setState. Хотя на практике этот подход сопряжен с кучей сложностей (я реализовывал подобную схему), он позволяет в 200 строк построить библиотеку, которая будет работать как React.

Главная проблема при использовании innerHTML связана с производительностью. Сказать что это медленно — ничего не сказать. Поэтому создатели React пошли другим путем.
*/

# Virtual Dom Tree

/*
Когда я говорил, что компоненты отрисовываются, то немного лукавил. В реальности после того, как отработает их рендеринг (вызов функции render для всего дерева компонентов), создается так называемый виртуальный DOM. Это просто js-объект определенной структуры, который отражает состояние экрана. Далее React сравнивает новый virtual dom tree со старым и строит дифф (объект, описывающий разницу между старым и новым состоянием). И только в этот момент начинается отрисовка нового состояния в реальный DOM. Здесь уже должно быть понятно, что Реакт умнее, чем кажется на первый взгляд, и вносит изменения в реальный DOM настолько эффективно, насколько это возможно, ведь он знает КАК его надо изменить.

Из описанного выше есть важное следствие. Тот реальный DOM, который находится под контролем Реакта (это все потомки элемента, в который мы рендерим корневой компонент), не может изменяться никем снаружи Реакта. Если подобное произойдет, то Реакт не сможет нормально функционировать, ведь ему приходится трекать (отслеживать) текущее состояние DOM для того, чтобы производить вычисления диффа. Когда подобное происходит, Реакт ругается и говорит, что ему мешают работать.

Обращаю ваше внимание на то, что виртуальный DOM — не самоцель Реакта, как многие думают. Это просто эффективный способ реализовать идею one-way data flow. Если бы работал вариант с innerHTML, то никто бы не делал виртуальный DOM.

И хотя построение js объекта — это гораздо более дешевая операция, чем работа с реальным DOM, все равно могут возникать ситуации, когда процесс вычисления занимает много времени, и это тормозит приложение. Об этом мы поговорим в одном из следующих уроков.

Выберите верное утверждение
> React хранит предыдущую версию Virtual Dom для того, чтобы сравнивать его с новым

С какого компонента начинается перерисовка дерева компонента после вызова setState?
> С того, в котором был вызван setState, так как это изменение может повлиять только на потомков и никогда на предков

Что означает фраза "one-way data flow"?
> Распространение изменений идет в одну сторону. Меняются данные в стейте, перерисовывается приложение
*/

/**@@@
src/Modal.jsx
Реализуйте компонент <Modal> (Модальное окно)

Использование:
*/

export default class Component extends React.Component {
  state = { modal: false };

  toggle = (e) => {
    e.preventDefault();

    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <button type="button" className="modal-open-button btn btn-danger" onClick={this.toggle}>Open</button>
        <Modal isOpen={this.state.modal}>
          <Modal.Header toggle={this.toggle}>Modal title</Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="modal-close-button btn btn-default" onClick={this.toggle}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// HTML закрытого состояния:

<div>
  <button type="button" class="modal-open-button btn btn-danger">Open</button>
  <div class="modal" style="display: none;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">Modal title</div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <p class="modal-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <p class="modal-footer">
          <button type="button" class="modal-close-button btn btn-default">Cancel</button>
        </p>
      </div>
    </div>
  </div>
</div>

/*
В открытом состоянии строчка: <div class="modal" style="display: none;"> заменяется на <div class="modal fade show" style="display: block;">

У открытого модального окна две кнопки закрывающие его: крестик справа вверху и кнопка Cancel справа внизу.
*/

// FILE: /app/src/Component.jsx:
import React from 'react';
import Modal from './Modal';

export default class Component extends React.Component {
  state = { modal: false };

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  render() {
    const { modal } = this.state;
    return (
      <div>
        <button type="button" className="modal-open-button btn btn-danger" onClick={this.toggle}>Open</button>
        <Modal isOpen={modal}>
          <Modal.Header toggle={this.toggle}>Modal title</Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="modal-close-button btn btn-default" onClick={this.toggle}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


// FILE: /app/src/index.jsx:
import ReactDOM from 'react-dom';
import React from 'react';

import Component from './Component.jsx';

ReactDOM.render(
  <Component />,
  document.getElementById('container'),
);



// FILE /app/src/Modal.jsx:
import cn from 'classnames';
import React from 'react';

const Header = ({ children, toggle }) => (
  <div className="modal-header">
    <div className="modal-title">
      {children}
    </div>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggle}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);
const Body = ({ children }) => <p className="modal-body">{children}</p>;
const Footer = ({ children }) => <p className="modal-footer">{children}</p>;

export default class Modal extends React.Component {
  static defaultProps = {
    isOpen: false,
  };

  static Header = Header;

  static Body = Body;

  static Footer = Footer;

  render() {
    const { isOpen, children } = this.props;

    const classes = cn({
      modal: true,
      fade: isOpen,
      show: isOpen,
    });

    const style = {
      display: isOpen ? 'block' : 'none',
    };

    return (
      <div className={classes} style={style}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}



>>>>>> Тестирование <<<<<<

/*
Тестирование фронтенда — сложная задача, и создатели фреймворков всячески пытаются ее упростить. Реакт в этом плане, как мне кажется, продвинулся дальше всех, и не последнюю роль здесь сыграло то, что тестовый фреймворк jest также разрабатывается Фейсбуком. Соответственно, уровень поддержки фронтенд тестирования и конкретно Реакта крайне высок.
*/

# JSDOM

/*
jsdom - реализация DOM API на чистом js для использования в Node.js. Основной целью библиотеки является эмуляция подмножества функций браузера, достаточных для тестирования и парсинга сайтов. jsdom встроен в jest и не требует абсолютно никакой настройки. В этом легко убедиться, если открыть тесты Хекслета в любой практике, работающей с браузером. С точки зрения использования это выглядит так, что прямо в тесте у нас доступен document и window.
*/

test('normalize', () => {
  const expected = '<p class="row">Text</p>';
  document.documentElement.innerHTML = expected;
  normalize(document);
  expect(document.body.innerHTML).toEqual(expected);
});

/*
Возникает вопрос: зачем использовать jsdom, когда есть драйверы, работающие с настоящими браузерами. Ответов несколько:

1. Скорость работы jsdom значительно выше, что не удивительно, ведь это просто библиотека на js (к тому же, headless), в отличие от браузера.
2. jsdom потребляет значительно меньше памяти для работы.
3. Самое главное: jsdom и код нашего приложения работают в рамках одного интерпретатора Node.js. На практике это приводит к тому, что любые ошибки внутри кода приложения будут проявляться так, как мы бы этого и хотели, с возникновением исключения и отображением стектрейса.

Единственный серьезный недостаток (он же и плюс) заключается в том, что jsdom — это не браузер. Другими словами, тесты на jsdom могут вполне работать, а код в браузере нет, и наоборот. Кроме того, jsdom сильно отстает в развитии от тех же браузеров. Новые фичи в нем появляются сильно позже, да и старые работают не все. Во многом эта проблема нивелируется использованием полифиллов, но если вы используете что-то уж совсем экзотическое, то, возможно, придется отказаться. По своей практике скажу, что с этим всем можно жить и полифиллы действительно спасают.
*/

# react-test-renderer

/*
Так как Реакт генерирует виртуальный DOM, этим можно воспользоваться. Пакет react-test-renderer предоставляет возможность отрендерить компонент Реакта без необходимости взаимодействия с браузером.
*/

import reactTestRenderer from 'react-test-renderer';

const renderer = reactTestRenderer.create(
  <a href="https://www.facebook.com/">Facebook</a>
);

console.log(renderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }

// С этим пакетом легко использовать снепшот-тестирование в jest. Достаточно передать в expect результат вызова функции toJSON.


# Enzyme

// Библиотека, разработанная программистами Airbnb для полноценного тестирования приложений на Реакте.



>>>>>> Асинхронная обработка <<<<<<

// Работа с асинхронным кодом в Реакт не отличается ничем особо примечательным по сравнению с тем, что мы уже проходили, но для проформы стоит пробежаться.

class Loader extends React.Component {
  state = { url: null };

  handleClick = async () => {
    const res = await axios.get('/images/random');
    this.setState({ url: res.data });
  }

  render() {
    const { url } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Load Random Image</button>
        {url && <img src={url} />}
      </div>
    );
  }
}

/*
Выше видно, что мы легко можем делать обработчик асинхронным, а дальше все как обычно.

Единственный момент, выделяющий Реакт - это обработка событий в асинхронном коде. Как я уже упоминал, объект события в Реакте постоянно переиспользуется. Попытка работать с ним в асинхронном коде к хорошему не приведет:
*/

onClick = (event) => {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(() => {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}

// Выходов из этой ситуации два: предпочтительный - взять из объекта события только то, что нужно, и использовать, другой - вызывать event.persist(), тогда Реакт не будет его больше трогать.

/**@@@
src/Autocomplete.jsx
Реализуйте компонент <Autocomplete />, который представляет собой текстовое поле с автодополнением списка стран.

Список стран можно получить сделав запрос:
*/

const res = await axios.get('/countries', { params: { term: 'al' } });
console.log(res.data); // => ["Albania","Algeria"]

/*
Где term это начало слова (любое количество символов введенное пользователем)
Начальный HTML:
*/

<div>
  <form>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter Country">
    </div>
  </form>
</div>

// HTML после выбора "al":

<div>
  <form>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter Country">
    </div>
  </form>
  <ul>
    <li>Albania</li>
    <li>Algeria</li>
  </ul>
</div>

// В качестве key для элементов списка используйте название страны.

// FILE: /app/src/index.jsx:
import '@babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import Autocomplete from './Autocomplete';

ReactDOM.render(
  <Autocomplete />,
  document.getElementById('container'),
);


// FILE: /app/src/Autocomplete.jsx
import axios from 'axios';
import React from 'react';


export default class Autocomplete extends React.Component {
  state = { countries: [], text: '' };

  handleChangeText = async ({ target: { value } }) => {
    if (value === '') {
      this.setState({ text: '', countries: [] });
      return;
    }
    this.setState({ text: value });
    const res = await axios.get('/countries', { params: { term: value } });
    this.setState({ countries: res.data });
  }

  renderCountries() {
    const { countries } = this.state;
    return (
      <ul>
        {countries.map(c => <li key={c}>{c}</li>)}
      </ul>
    );
  }

  render() {
    const { countries, text } = this.state;

    return (
      <div>
        <form>
          <div className="form-group">
            <input type="text" onChange={this.handleChangeText} value={text} className="form-control" placeholder="Enter Country" />
          </div>
        </form>
        { countries.length > 0 && this.renderCountries() }
      </div>
    );
  }
}



>>>>>> Component Lifecycle <<<<<<

// При правильном использовании реакта, большая часть компонентов состоит из метода render и обработчиков событий:

class ArticleItem extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    const { onClick } = this.props.onClick;
    onClick();
  }
  render() {
    const { name, description, link } = this.props;
    return (
      <div>
        <a href="{link}" onClick={this.handleClick}>{name}</a><br />
        <div>{description}</div>
      </div>
    );
  }
}


// Но не все задачи решаются так просто. Представьте себе компонент <Clock />, имитирующий цифровые часы в формате чч:мм:сс. Создадим каркас:

class Clock extends React.Component {
  render() {
    const currentTime = new Date();
    return (
      <div>{currentTime.toLocaleTimeString()}</div>
    );
  }
}

/*
Этот компонент отображает текущее время. Теперь подумаем как его обновлять. Часы, в отличие от обычных компонентов, не ожидают действий от пользователя. Они обновляются каждую секунду самостоятельно. Возникает цепочка: возникает событие => меняется текущее время => реакт вызывает render и меняет DOM. Начнем с состояния, добавим туда текущее время:
*/

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    const { date } = this.state;
    return (
      <div>{date.toLocaleTimeString()}</div>
    );
  }
}

/*
Компонент, по прежнему, показывает лишь текущее время, но теперь он готов к изменению. Время относится к периодическим событиям, для которых используются таймеры. Для <Clock /> подойдет setInterval. Мы должны установить таймер сразу после отрисовки часов и очистить таймер при удалении компонента из дерева элементов.
*/

setInterval(() => this.setState({ date: new Date() }), 1000);

/*
Где запускать таймер? render вызывается на каждое изменение состояния, а значит он не подходит. Ведь тогда, <Clock /> будет запускать новый таймер каждую секунду. Конструктор, кажется, более подходящим местом, но здесь нас ожидает сюрприз. Вызов конструктора и отрисовка часов в DOM дереве, в общем случае, два независимых события. Посмотрите на код:
*/

// Вызывается конструктор
const clock = <Clock />;

// Что-то долго делаем еще

// Отрисовываем
reactDOM.render(
  clock,
  document.getElementById('root')
);

/*
Эти часы еще не находятся в DOM дереве, но уже во всю работают и обновляются. Стоит ли об этом беспокоиться? Да, такое поведение крайне неожиданно, оно мешает тестированию и расходует процессорное время. Кроме того, конструктор никак не помогает с удалением таймера.

Каждый компонент Реакта, проходит несколько стадий в процессе своей жизни: он создается, затем добавляется в DOM, получает пропсы, и, наконец, удаляется из дерева. Этот процесс называют жизненным циклом компонента (Component Lifecycle). Реакт предоставляет набор методов, которые позволяют встроиться в этот процесс. Например, запуск часов логичнее всего сделать сразу после их отрисовки. В этом нам поможет метод componentDidMount. Он вызывается сразу после отрисовки компонента. Происходит это ровно один раз.
*/

class Clock extends React.Component {
  constructor() {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    // Сохраняем идентификатор таймера
    this.timerId = setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  render() {
    const { date } = this.state;
    return (
      <div>{date.toLocaleTimeString()}</div>
    );
  }
}

/*
Обратите внимание на то, как мы сохраняем таймер внутри объекта. Он не участвует в представлении, поэтому нет необходимости использовать состояние.

Теперь выполним очистку таймера. Для этого подойдет метод componentWillUnmount, который выполняется прямо перед удалением компонента из DOM.
*/

class Clock extends React.Component {
  constructor() {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { date } = this.state;
    return (
      <div>{date.toLocaleTimeString()}</div>
    );
  }
}

/*
Часы приобрели законченный вид.

Мы рассмотрели два метода, позволяющих встраиваться в жизненный цикл компонента, но их значительно больше. Они делятся на три независимые группы:

# Монтирование (Mounting)

Эти методы вызываются во время создания объекта и вставки его в DOM.

 - constructor()
 - static getDerivedStateFromProps()
 - render()
 - componentDidMount()


# Обновление (Updating)

Обновление может происходить при изменении свойств или состояния. Эти методы вызываются во время перерисовки.

 - static getDerivedStateFromProps()
 - shouldComponentUpdate()
 - render()
 - getSnapshotBeforeUpdate()
 - componentDidUpdate()

# Удаление или Демонтирование (Unmount)

В эту группу входит один метод. Он вызывается во время удаления компонента из DOM.

 - componentWillUnmount()

Такое количество методов, объясняется сложностью реальной разработки. Но, на практике, лишь некоторые используются регулярно. К таким методам относится componentDidMount. С его помощью устанавливают таймеры, выполняют AJAX запросы, меняется DOM в обход реакта. Последнее бывает нужно при интеграции со сторонними библиотеками.

# Дополнительные материалы
Lifecycle Methods https://reactjs.org/docs/react-component.html
*/

/**@@@
В этом упражнении необходимо реализовать записную книжку, которая взаимодействует с бекендом по следующим урлам:

 * GET /tasks - получить список задач.
 	- Формат ответа - [{"id":1,"text":"asdf","state":"finished"},{"id":2,"text":"asdasd","state":"active"}]
 * POST /tasks - создать новую задачу.
 	- Формат запроса - {"text": "new task"}
 	- Формат ответа - {"id":4,"text":"new task","state":"active"}
 * PATCH /tasks/:id/finish - завершить задачу.
	- Формат ответа - {"id":1,"text":"asdf","state":"finished"}
 * PATCH /tasks/:id/activate - переоткрыть завершенную задачу - {"id":1,"text":"asdf","state":"active"}	

Начальный HTML: 
*/
<div>
  <div class="mb-3">
    <form class="todo-form form-inline mx-3">
      <div class="form-group">
        <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
      </div>
      <button type="submit" class="btn btn-primary">add</button>
    </form>
  </div>
</div>

// HTML после того как добавлены последовательно три задачи "first task", "second task" и "another task". На последнюю был совершен клик, который перевел задачу в выполненные:

<div>
  <div class="mb-3">
    <form class="todo-form form-inline mx-3">
      <div class="form-group">
        <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
      </div>
      <button type="submit" class="btn btn-primary">add</button>
    </form>
  </div>
  <div class="todo-active-tasks">
    <div class="row">
      <div class="col-1">2</div>
      <div class="col">
        <a href="#" class="todo-task">second task</a>
      </div>
    </div>
    <div class="row">
      <div class="col-1">1</div>
      <div class="col">
        <a href="#" class="todo-task">first task</a>
      </div>
    </div>
  </div>
  <div class="todo-finished-tasks">
    <div class="row">
      <div class="col-1">3</div>
      <div class="col">
        <s><a href="#" class="todo-task">another task</a></s>
      </div>
    </div>
  </div>
</div>

/*
src/TodoBox.jsx
Реализуйте компонент <TodoBox>.

Первоначальная подгрузка задач с сервера, должна происходит сразу после монтирования компонента в DOM.

src/Item.jsx
Реализуйте компонент <Item> отвечающий за вывод конкретной записи.

Подсказки
Для генерации урлов в файле routes.js созданы специальные хелперы
*/

// FILE: /app/src/index.jsx:
import '@babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import TodoBox from './TodoBox';

ReactDOM.render(
  <TodoBox />,
  document.getElementById('container'),
);

// FILE: /app/src/routes.js:
const host = '';

export default {
  tasksPath: () => [host, 'tasks'].join('/'), // get tasks list
  taskPath: id => [host, 'tasks', id].join('/'),
  finishTaskPath: id => [host, 'tasks', id, 'finish'].join('/'),
  activateTaskPath: id => [host, 'tasks', id, 'activate'].join('/'),
};


// FILE: /app/src/Item.jsx:
import React from 'react';

export default ({ task, onClick }) => {
  const link = <a href="#" className="todo-task" onClick={onClick}>{task.text}</a>;

  return (
    <div className="row">
      <div className="col-1">
        {task.id}
      </div>
      <div className="col">
        {task.state === 'finished' ? <s>{link}</s> : link}
      </div>
    </div>
  );
};


// FILE: /app/src/TodoBox.jsx:
import axios from 'axios';
import React from 'react';
import update from 'immutability-helper';
import Item from './Item';
import routes from './routes';

export default class TodoBox extends React.Component {
  state = { newTaskText: '', tasks: [] };

  componentDidMount() {
    this.resetTasks();
  }

  handleChangeText = ({ target: { value } }) => {
    this.setState({ newTaskText: value });
  }

  handleFinishTask = id => async () => {
    await axios.patch(routes.finishTaskPath(id));
    const { tasks } = this.state;
    const index = tasks.findIndex(t => t.id === id);
    const updatedTasks = update(tasks, { [index]: { $merge: { state: 'finished' } } });
    this.setState({ tasks: updatedTasks });
  }

  handleActivateTask = id => async () => {
    await axios.patch(routes.activateTaskPath(id));
    const { tasks } = this.state;
    const index = tasks.findIndex(t => t.id === id);
    const updatedTasks = update(tasks, { [index]: { $merge: { state: 'active' } } });
    this.setState({ tasks: updatedTasks });
  }

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { newTaskText } = this.state;
    const response = await axios.post(routes.tasksPath(), { text: newTaskText });
    const { tasks } = this.state;
    this.setState({ newTaskText: '', tasks: [response.data, ...tasks] });
  }

  resetTasks = async () => {
    const response = await axios.get(routes.tasksPath());
    this.setState({ tasks: response.data });
  }

  renderFinishedTasks(tasks) {
    return (
      <div className="todo-finished-tasks">
        {tasks.map(task => <Item key={task.id} task={task} onClick={this.handleActivateTask(task.id)} />)}
      </div>
    );
  }

  renderActiveTasks(tasks) {
    return (
      <div className="todo-active-tasks">
        {tasks.map(task => <Item key={task.id} task={task} onClick={this.handleFinishTask(task.id)} />)}
      </div>
    );
  }

  renderForm() {
    const { newTaskText } = this.state;
    return (
      <form onSubmit={this.handleSubmitForm} className="todo-form form-inline mx-3">
        <div className="form-group">
          <input
            type="text"
            onChange={this.handleChangeText}
            value={newTaskText}
            required
            className="form-control mr-3"
            placeholder="I am going..."
          />
        </div>
        <button type="submit" className="btn btn-primary">add</button>
      </form>
    );
  }

  render() {
    const { tasks } = this.state;
    const activeTasks = tasks.filter(t => t.state === 'active');
    const finishedTasks = tasks.filter(t => t.state === 'finished');

    return (
      <div>
        <div className="mb-3">
          {this.renderForm()}
        </div>
        {activeTasks.length > 0 && this.renderActiveTasks(activeTasks)}
        {finishedTasks.length > 0 && this.renderFinishedTasks(finishedTasks)}
      </div>
    );
  }
}


// FILE: /app/__tests__/test.jsx:
import nock from 'nock';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import timeout from 'timeout-then';
import TodoBox from '../src/TodoBox';

Enzyme.configure({ adapter: new Adapter() });
axios.defaults.adapter = httpAdapter;
nock.disableNetConnect();

const host = 'http://localhost';

test('TodoBox 1', async () => {
  nock(host)
    .get('/tasks')
    .reply(200, []);

  const wrapper = mount(<TodoBox />);
  const input = wrapper.find('input');
  const form = wrapper.find('form');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();
  input.simulate('change', { target: { value: 'new task' } });

  nock(host)
    .post('/tasks', {
      text: 'new task',
    })
    .reply(200, { id: 1, state: 'active', text: 'new task' });
  form.simulate('submit');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();
});

test('TodoBox 2', async () => {
  const tasks = [
    { id: 2, text: 'task 2', state: 'finished' },
    { id: 1, text: 'task 1', state: 'active' },
  ];
  nock(host)
    .get('/tasks')
    .reply(200, tasks);

  const wrapper = mount(<TodoBox />);

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();

  wrapper.update();

  const activeTask = wrapper.find('.todo-active-tasks .todo-task');
  nock(host)
    .patch(`/tasks/${tasks[1].id}/finish`)
    .reply(200, { ...tasks[1], state: 'finished' });
  activeTask.simulate('click');

  await timeout(100);

  wrapper.update();

  expect(wrapper.render()).toMatchSnapshot();

  const finishedTask = wrapper.find('.todo-task').at(0);
  nock(host)
    .patch(`/tasks/${tasks[0].id}/activate`)
    .reply(200, { ...tasks[0], state: 'active' });
  finishedTask.simulate('click');

  await timeout(100);

  wrapper.update();

  expect(wrapper.render()).toMatchSnapshot();
});




>>>>>> Производительность <<<<<<

/*
Преждевременная оптимизация - корень всех зол.

Перед тем, как рассуждать о производительности, я настоятельно рекомендую прочитать Optimization.guide.

Для начала вспомним, что Virtual Dom — это уже оптимизация, которая позволяет Реакту из коробки работать достаточно быстро, чтобы мы могли вообще не задумываться о производительности долгое время. Многим проектам этого хватает за глаза на протяжении всей жизни.

Напомню, что Реакт работает так:

1. Маунт вызывает рендеринг приложения.
2. Получившийся DOM вставляется в реальный DOM целиком, так как там еще ничего нет. А виртуальный DOM, в свою очередь, сохраняется внутри Реакта для последующего обновления.
3. Изменение состояния приводит к вычислению нового виртуального DOM.
4. Вычисляется разница между старым виртуальным DOM и новым.
5. Разница применяется к реальному DOM.
*/

# Reconciliation

/*
Каждый раз, когда происходит изменение в состоянии компонента, запускается механизм, вычисляющий дифф между прошлым состоянием и новым. С алгоритмической точки зрения происходит поиск отличий в двух деревьях. В общем случае алгоритм, выполняющий это вычисление, работает со сложностью O(n3).

Если события генерируются часто, а виртуальное дерево стало большим, то можно начать замечать лаги невооруженным глазом.

Для решения этой проблемы Реакт настоятельно просит для всех элементов списков использовать аттрибут key, который не меняется для конкретного элемента списка. Подобное требование позволяет оптимизировать работу алгоритма, уменьшив сложность до О(n).

Требование проставлять ключи проверяется самим Реактом. Он сам будет выдавать варнинги (предупреждения), если увидит, что вы их не используете.
*/

# Rendering

/*
На практике рендеринг всего приложения (виртуального дома) на любое изменение — дорогое удовольствие. Представьте, что в приложении используется поле для текстового ввода. Это означает, что во время набора на любое нажатие происходит генерация виртуального дома целиком и с нуля. Хорошим примером является вопросы и ответы на Хекслете, где мы столкнулись именно с этой проблемой. В форуме достаточно большое виртуальное дерево, и его полный рендеринг занимает определенное время.

В ReactDevTools есть специальная галочка, нажав на которую можно увидеть те компоненты, которые рендерятся во время событий. Отображается все визуально, то есть после каждого события отрендеренные компоненты подсвечиваются рамочкой.

Легко заметить, что для приложения, в котором ничего специально не делалось, на любое событие будет рендерится вообще все. Но события, как правило, меняют только небольшую часть DOM. Ввод текста часто вообще не приводит к изменению в DOM.

Реакт позволяет избежать перерисовки тех компонентов, которые не изменились. Из условий — нужно соблюдать чистоту, другими словами, компонент должен, по сути, представлять из себя чистую функцию.

Напомню, что обновление компонентов запускает следующую цепочку функций:

1. componentWillReceiveProps(nextProps)
2. shouldComponentUpdate(nextProps, nextState)
3. componentWillUpdate(nextProps, nextState)
4. render()
5. componentDidUpdate(prevProps, prevState)

Остановить перерисовку можно благодаря наличию коллбек-функции shouldComponentUpdate(). Если эта функция вернет false, то компонент не будет рендерится вообще. А так как мы подразумеваем, что компонент ведет себя как чистая функция, то достаточно внутри этой функции проверить, что не изменился props и state. Выглядит это примерно так:
*/

shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps)
    || !shallowEqual(this.state, nextState);
}

/*
Shallow означает, что сравнивается только верхний уровень объектов. Иначе эта операция была бы слишком дорогой. Кстати, здесь становится видно, почему изменения состояния нельзя делать in-place: this.state.mydata.key = 'value'. Так как объекты сравниваются по ссылкам, то изменение объекта будет показывать, что объект тот же самый, хотя его содержимое поменялось.

Поскольку большинство компонентов в типичных приложениях действительно ведут себя как чистые функции, а состояние хранится в общем корневом компоненте, подобную технику можно применять повсеместно, и Реакт нам в этом активно помогает. До сих пор в классах мы наследовались только от React.Component, но можно наследоваться и от React.PureComponent, в котором за нас правильно реализовали shouldComponentUpdate.
*/

class App extends React.Component {
  state = { number: Math.random() };

  handleClick = () => {
    this.setState({ number: Math.random() });
  };

  render() {
    return <div>
      <button onClick={this.handleClick}>Click</button>
      <div>app {this.state.number}</div>
      <Nested />
    </div>;
  }
}

class Nested extends React.PureComponent {
  render() {
    return <div>nested {Math.random()}</div>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-root'),
);

/*
Если нажимать кнопку, то видно, что корневой компонент перерендеривается, а вложенный нет.

Но не все так просто. Очень легко незаметно для самого себя сломать работу PureComponent.
*/

# Default Props
// Первая засада ожидает нас при неправильной работе со свойствами по умолчанию:

class Table extends React.Component {
  render() {
    const { options } = this.props;
    return (
      <div>
        {this.props.items.map(i =>
          <Cell data={i} options={options || []} />
         )}
       </div>
     );
  }
}

/*
Казалось бы, безобидный код, но вызов [] каждый раз генерирует новый объект (при условии что options false). Проверяется это легко: [] === [] ложно. То есть данные не поменялись, но <Cell> будет отрисован заново.

Вывод: используйте встроенный механизм для свойств по умолчанию.
*/

# Callbacks

class App extends React.PureComponent {
  render() {
    return <MyInput
      onChange={e => this.props.update(e.target.value)} />;
  }
}

/*
Проблема в коде выше точно такая же: на каждый вызов функции render генерируется новая функция-обработчик, что ломает эффективное обновление. Выход мы уже знаем: определять обработчики как свойства на уровне класса.
*/

# Immutable.js

/*
Еще один интересный способ решить проблему перерендеринга приложения - использовать персистентные структуры данных, а конкретно библиотеку immutable.js. Это отдельная тема, рассмотрение которой находится за рамками текущего курса.

# Дополнительные материалы
Продуманная оптимизация http://optimization.guide/
*/


>>>>>> Refs <<<<<<

/*
Реакт по своей природе изолирует нас от прямой работы с DOM на 100%. Но нередко при интеграции сторонних не-Реакт компонентов возникает задача по прямому доступу к DOM. Также подобный механизм нужен для выделения текста, фокусов и проигрывания медиа.

Реакт позволяет сделать это с помощью ref. Перед тем, как мы начнем его разбирать, хочу предупредить, что в нормальной ситуации он не нужен и следует максимально избегать его использования.

Рассмотрим задачу по фокусировке на поле ввода:
*/

class CustomTextInput extends React.Component {
  handleFocusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    console.log(this.textInput);
    this.textInput.current.focus();
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleFocusTextInput}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <CustomTextInput />,
  document.getElementById('react-root'),
);

/*
ref — это свойство компонента, значением которого должен быть объект, созданный в конструкторе через функцию React.createRef(). Этот объект, в отличие от остальных данных, которые находятся в props или state, хранится как обычное свойство объекта. Имя свойства можно выбрать произвольно. Свойство current этого объекта дает доступ к элементу DOM, именно его можно использовать в componentDidMount или componentDidUpdate.

this.<имя свойства>.current хранит внутри себя DOM элемент того компонента, для которого был установлен ref. В примере выше это input: <input ref={this.textInput} />. DOM элемент попадает туда (внутрь current) уже после того, как текущий компонент будет встроен в реальный DOM, а значит воспользоваться им можно только в указанных выше колбеках componentDidUpdate и componentDidMount.

Ниже приведен пример создания компонента обертки над популярным JQuery плагином Chosen https://harvesthq.github.io/chosen/.
*/

class Chosen extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }
  componentDidMount() {
    $(this.selectRef.current).chosen();
  }
  
  render() {
    return <select ref={this.selectRef}>
      {this.props.items.map(i => <option>{i}</option>)}
    </select>;
  }
}

const items = ['Document', 'Window', 'Body'];

ReactDOM.render(
  <Chosen items={items} />,
  document.getElementById('react-root'),
);

/*
ref так же может использоваться и на самописных компонентах, реализованных как классы.

Функциональные компоненты не поддерживают аттрибут ref, так как у них нет инстанса. Если вам нужна работа с DOM, то придется конвертировать такой компонент в класс.
*/

# Использование в реальном мире

/*
С Реактом удобно и легко работать до тех пор, пока мы остаемся в рамках самого Реакта, но большая часть существующих js библиотек взаимодействует с домом напрямую, что фактически нивелирует преимущества реакта при их использовании напрямую. Например:
*/

// https://github.com/kylefox/jquery-modal
$('#login-form').modal();

/*
Включение в проект таких библиотек неизбежно приведет к активному использованию lifecycle методов и сделает код сложным. По этой причине принято создавать так называемые врапперы, компоненты-обертки, которые скрывают внутри себя все взаимодействие с домом и наружу выставляют стандартный интерфейс реакта, а именно пропсы. Одной из таких задач является ресайз контейнера. Один из вариантов решения — компонент react-resizable. Посмотрите на работу этого компонента:
*/

const Resizable = require('react-resizable').Resizable; // or,
const ResizableBox = require('react-resizable').ResizableBox;

// ES6
import { ResizableBox } from 'react-resizable';

// ...
render() {
  return (
    <ResizableBox width={200} height={200} minConstraints={[100, 100]} maxConstraints={[300, 300]}>
      <span>Contents</span>
    </ResizableBox>
  );
}

/*
Ничего в этом коде не напоминает о реальном доме. Все сводится к тому, что мы оборачиваем наш компонент в ResizableBox, который скрывает всю работу внутри себя. По такому же принципу устроены сотни и, может быть, тысячи других компонентов, которые доступны на гитхабе. Вот некоторые из них:

react-hotkeys https://github.com/greena13/react-hotkeys
react-stripe-elements (платежный шлюз) https://github.com/stripe/react-stripe-elements
*/

/**@@@
src/MarkdownEditor.jsx
Реализуйте компонент <MarkdownEditor />, который является React оберткой jquery-плагина bootstrap-markdown https://github.com/toopay/bootstrap-markdown. Этот плагин позволяет встроить в страницу Markdown-редактор.
*/

$(element).markdown({
  iconlibrary: 'fa', // правильная библиотека иконок
  onChange: (e) => {
    const content = e.getContent();
    // код который вызовется при изменении содержимого редактора
  },
});

/*
Компонент принимает на вход функцию как свойство onContentChange, которая вызывается при каждом изменении в редакторе. Функция принимает на вход содержимое редактора. Его использование видно в файле src/index.jsx.

Посмотреть пример работы редактора можно на Хекслете. Когда вы пишете топик в обсуждениях или комментариях к нему, то там используется именно этот редактор.
*/

// FILE: /app/src/MarkdownEditor.jsx:
import $ from 'jquery';
import React from 'react';

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.rootElement = React.createRef();
  }

  componentDidMount() {
    $(this.rootElement.current).markdown({
      iconlibrary: 'fa',
      onChange: this.onChange,
    });
  }

  onChange = (e) => {
    this.props.onContentChange(e.getContent());
  }

  render() {
    return <div data-provide="markdown-editable" ref={this.rootElement} />;
  }
}


// FILE: /app/src/index.jsx:
import 'bootstrap-markdown/js/bootstrap-markdown';
import 'bootstrap-markdown/css/bootstrap-markdown.min.css';

import ReactDOM from 'react-dom';
import React from 'react';

import MarkdownEditor from './MarkdownEditor.jsx';

ReactDOM.render(
  <MarkdownEditor onContentChange={console.log} />,
  document.getElementById('container'),
);



#################### JS: Redux (React) ####################
/*
Redux — это официальный способ управлять состоянием в нетривиальных React приложениях. Несмотря на свою простоту и элегантность, он требует время на вникание. Кроме того, вокруг Redux огромная экосистема библиотек, автоматизирующих разные задачи. Этот курс посвящен в том числе самым популярным библиотекам.
*/

>>>>>> Введение <<<<<<

/*
Несмотря на всю мощь реакта, с ростом приложения довольно быстро появляются некоторые неудобства. Одно из самых раздражающих — подъем состояния наверх через коллбеки, которые нужно прокидывать в самый низ с того самого верхнего уровня. Прокидывать приходится не только коллбеки, но и любые данные. Получается, что множество промежуточных компонентов выступают в качестве прокси, то есть пропускают сквозь себя данные, которыми не пользуются. Второе — рендеринг и логика мешаются в одном месте, быстро раздувая компоненты и усложняя их понимание. Сюда добавляются неконтролируемые побочные эффекты вперемешку с обновлением данных.

Для решения в том числе этих проблем разработчики фейсбука придумали архитектуру Flux:

Flux архитектура вводит ряд новых понятий, таких как:

- Stores — хранилища, место, в которое загружаются данные и в котором они обновляются. Хотя во Flux хранилища мутабельные, взаимодействовать с внешним миром внутри них нельзя. Никаких AJAX запросов, взаимодействия с DOM и подобных вещей. Менять данные напрямую тоже не получится, только посредством действий. Как видите, во Flux архитектуре менеджмент состояния приложения был вынесен наружу.
- Actions — действия с помощью Dispatcher передаются в хранилища, которые на основе типа действия и данных, пришедших с ним, сами себя обновляют.
- Dispatcher — раскидывает действия по хранилищам.

Flux архитектура позволила разгрузить React и ввела недостающие абстракции. В свое время появилось множество различных реализаций этой архитектуры. Одна из них была официальная и десяток неофициальных.

С тех пор утекло много воды и мир шагнул вперед. В 2015 году Dan Abramov создал библиотеку под названием Redux, заимствовав идеи из Flux и функционального языка Elm http://elm-lang.org/.

Несмотря на всю мощь реакта, с ростом приложения довольно быстро появляются некоторые неудобства. Одно из самых раздражающих — подъем состояния наверх через коллбеки, которые нужно прокидывать в самый низ с того самого верхнего уровня. Прокидывать приходится не только коллбеки, но и любые данные. Получается, что множество промежуточных компонентов выступают в качестве прокси, то есть пропускают сквозь себя данные, которыми не пользуются. Второе — рендеринг и логика мешаются в одном месте, быстро раздувая компоненты и усложняя их понимание. Сюда добавляются неконтролируемые побочные эффекты вперемешку с обновлением данных.

Для решения в том числе этих проблем разработчики фейсбука придумали архитектуру Flux.

Flux архитектура вводит ряд новых понятий, таких как:

- Stores — хранилища, место, в которое загружаются данные и в котором они обновляются. Хотя во Flux хранилища мутабельные, взаимодействовать с внешним миром внутри них нельзя. Никаких AJAX запросов, взаимодействия с DOM и подобных вещей. Менять данные напрямую тоже не получится, только посредством действий. Как видите, во Flux архитектуре менеджмент состояния приложения был вынесен наружу.
- Actions — действия с помощью Dispatcher передаются в хранилища, которые на основе типа действия и данных, пришедших с ним, сами себя обновляют.
- Dispatcher — раскидывает действия по хранилищам.

Flux архитектура позволила разгрузить React и ввела недостающие абстракции. В свое время появилось множество различных реализаций этой архитектуры. Одна из них была официальная и десяток неофициальных.

С тех пор утекло много воды и мир шагнул вперед. В 2015 году Dan Abramov создал библиотеку под названием Redux, заимствовав идеи из Flux и функционального языка Elm.

Сама по себе Redux очень простая библиотека, предназначенная исключительно для менеджемента состояния. Она хоть и была разработана для использования в реакте, но от него не зависит и может использоваться с чем угодно. Для ее связи с реактом понадобится библиотека react-redux, с помощью которой производится необходимая интеграция. В итоге получается структура, крайне напоминающая Flux архитектуру, но со значительными упрощениями и улучшениями.

Кроме тех преимуществ, которые дает Flux, Redux привносит еще кое-что:

- Time traveling. Возможность путешествовать по изменению состояния назад и вперед. Очень полезно при отладке, всегда можно отмотать (это не фигуральное выражение, а действительность) назад.

- Удобная отладка и визуализация. Посредством Middlewares, Redux расширяется инструментарием, который предоставляет крайне удобные средства для отладки и визуализации происходящих внутри процессов. С ними мы познакомимся в ближайшее время, чтобы сразу начать использовать всю мощь Redux.

- Благодаря стандартизации работы с состоянием, которую привнес Redux, стало возможным автоматизировать практически все аспекты работы в React. Работа с формами, роутинг, асинхронность, история и многое другое.

В этом курсе мы пройдем по основным возможностям редакса и интегрируем в создаваемое приложение множество разных библиотек. Мы не сможем копнуть в них глубоко, так как объем документации каждой библиотеки тянет на целую книгу, но разберем базовые варианты использования.

Основные темы:
Redux.
Middlewares.
Containers.
Actions (Async).
Redux & React.

Библиотеки:
reselect.
redux-actions.
redux-forms.
redux-thunk.

По ходу курса мы создадим приложение для работы с задачами и в конце интегрируем его с бекендом.
*/



>>>>>> Redux <<<<<<

/*
Redux - Predictable state container for JavaScript apps

Redux маленькая и простая библиотека. Первые несколько уроков мы набьем руку по работе с ним, а уже после начнем интегрироваться с React.

Redux - это такая база данных в памяти. Она хранит внутри себя состояние приложения, аналогично тому, как React хранит состояние внутри себя. Ключевых отличия два:

1. Redux, с точки зрения кода, это объект внутри которого находится состояние приложения. Он, как правило, один на все приложение, независимо от используемого фреймворка для UI.
2. Обновление состояния внутри Redux выполняется не прямым изменением данных (как в React: $this->setState({ key: 'value' })), а через указание "действий". Сам же способ обновления данных описывается внутри объекта Redux.

Пример использования Redux:
*/

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

/*
По шагам:

1. Импортируется функция createStore, которая создает контейнер. Контейнер это и есть наша база данных.
2. Далее определяется reducer. Функция, которая принимает на вход state и action. На выходе из функции возвращается новый state. Именно из-за сходства работы этой функции с тем как работает reduce, она имеет название reducer.
3. Редьюсер передается в функцию createStore и на выходе мы имеем готовый к использованию контейнер.

Во время вызова createStore(reducer), происходит вызов самого редьюсера. Вызов выглядит так:
*/

// благодаря тому, что первым параметром передается undefined, внутри редьюсера значение state
// становится равно своему дефолтному значению, то есть 0
// затем, внутри switch, отрабатывает default ветка, которая возвращает этот state наружу
reducer(undefined, { type: '@@INIT' }); // 0

/*
Результат этого вызова запоминается внутри store и считается начальным состоянием. Все дальнейшие изменения идут относительно него.

Теперь использование:
*/

// Функция `subscribe` является частью реализации паттерна Observer.
// Каждый ее вызов, добавляет в список наблюдателей новую функцию.
// Затем, как только меняются данные в хранилище, вызываются, по очереди, все наблюдатели.
store.subscribe(() =>
  console.log(store.getState());
);
const increment = () => ({ type: 'INCREMENT' });
store.dispatch(increment());
// => 1

store.dispatch(increment());
// => 2

const decrement = () => ({ type: 'DECREMENT' });
store.dispatch(decrement());
// => 1

/*
Единственный способ произвести изменения состояния в хранилище — это передать Action в функцию dispatch. Action является обычным js объектом, в котором присутствует минимум одно свойство — type. Никаких ограничений на содержимое этого свойства не накладывается, главное, чтобы внутри контейнера был подходящий ему обработчик.

Получается, что сам процесс изменения состояния, описан внутри контейнера, а снаружи мы лишь говорим, какое изменение необходимо выполнить. Этот подход резко отличается от того как мы делали в React, где чтение состояния и его обновление находится снаружи.

Посмотрим еще один пример, с использованием массива и передачей данных через Action:
*/

// payload - свойство внутри которого хранятся данные
const addUser = (user) => ({ type: 'USER_ADD', payload: { user } });

const user = /* ... */;
store.dispatch(addUser(user));

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

/*
Несмотря на то, что ключ payload не обязательный и можно все данные складывать прямо в сам Action, я крайне рекомендую так не делать. Мешать в одном объекте статически заданные ключи с динамическими плохая идея. Кроме того, в будущем мы будем использовать библиотеки, которые требуют именно такого способа работы.
*/

# Устройство Redux

// Для написания самой простой версии Redux, нужно всего 7 строчек. Вот они:

const createStore = (reducer, initialState) {
  let state = initialState
  return {
    dispatch: action => { state = reducer(state, action) },
    getState: () => state,
  }
}

# Three Principles

/*
Подведем итог. Что главное в redux:

- Single source of truth — используя редакс, мы работаем только с одним контейнером на приложение. Это одно из ключевых отличий от Flux архитектуры. Все состояние в одном месте.
- State is read-only — данные меняются только косвенно, используя функциональный стиль.
- Changes are made with pure functions — внутри хранилища можно использовать только чистые функции. Тут правила даже строже чем во Flux, так как не позволяется использовать даже Date.now() и ему подобные функции, которые хотя и не обладают побочными эффектами, но все же являются недетерминированными. Все подобные вызовы должны делаться до вызова dispatch (подробнее об этом далее).
*/

# Начальное состояние
// Я говорил про то, что начальное состояние задается в определении редьюсера:
const reducer = (state = 0, action) { /* ... */ }

// Но часто этого недостаточно. Данные могут прийти из бекенда и их нужно прогрузить в контейнер перед началом работы. Для этого случая в Redux есть особый путь:
const store = createStore(reducer, initState);
// @@redux/INIT

// Redux посылает специальный Action, который нельзя перехватывать. Если редьюсер реализован правильно и содержит default секцию в switch, то контейнер заполнится данными из initState. Пример:

// const reducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// };
const store = createStore(reducer, 100);

// В коде выше, функция createStore вызовет редьюсер так: reducer(100, '@@redux/INIT'). Затем выполнится ветка default и состоянием контейнера станет число 100.

/**@@@
store.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход начальное состояние, а возвращает store. Store должен обрабатывать действия перечисленные в actions.js.

Структура состояния в store: { [task.id]: task, [task2.id]: task2 }.

Подсказки
Обязательно изучите файл actions.js и тесты. Отследите весь путь движения данных.
Для удаления из объекта воспользуйтесь функцией omit, взятой из библиотеки lodash.
*/


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




>>>>>> Reducers <<<<<<

/*
Все, что хранится в контейнере, мы называем состоянием, но не все состояния одинаково полезны. Вот какую классификацию вводит документация Redux:

- Domain data — данные приложения, которые нужно отображать, использовать и модифицировать. Например, список пользователей, загруженный с сервера.
- App state — данные, определяющие поведение приложения. Например, текущий открытый URL.
- UI state — данные, определяющие то, как выглядит UI. Например, вывод списка в плиточном виде.

Так как контейнер представляет собой ядро приложения, данные внутри него, должны описываться в терминах domain data и app state, но не как дерево компонентов UI. Например, такой способ формирования состояния state.leftPane.todoList.todos — плохая идея. Крайне редко дерево компонентов отражается напрямую на структуру состояния и это нормально. Представление зависит от данных, а не данные от представления.

Типичная структура состояния выглядит так:
*/
{
    domainData1 : {}, // todos
    domainData2 : {}, // comments
    appState1 : {},
    appState2 : {},
    uiState1 : {}
    uiState2 : {},
}

/*
Подробнее про работу с состоянием UI будет рассказано в соответствующем уроке.

Как уже говорилось в курсе "JS: React", структура состояния должна напоминать базу данных. Все максимально плоско и нормализованно.
*/

{
  todos: [
    { id: 1, name: 'why?' },
    { id: 3, name: 'who?' },
  ],
  comments: [
    { id: 23, todoId: 3, text: 'great!' },
  ],
}

/*
С такой структурой крайне легко писать реакцию на действия, обновлять данные, добавлять новые и удалять старые. Вложенность небольшая, все просто. Но появляется другая проблема (появляется она в любом случае). С ростом количества сущностей редьюсер становится очень тяжелым. Огромный кусок кода, который делает все.

Redux имеет встроенный механизм, позволяющий создавать множественные редьюсеры и комбинировать их друг с другом. Работает это так: для каждого свойства верхнего уровня пишется свой собственный редьюсер, а затем они с помощью функции combineReducers объединяются в корневой (root) редьюсер, который уже используется для создания контейнера.
*/

import { combineReducers, createStore } from 'redux';

const todos = (state = {}, action) => {
  // state is todos part
};

const comments = (state = {}, action) => {
  // state is comments
};

const rootReducer = combineReducers({ todos, comments });
const store = createStore(rootReducer);

/*
Обратите внимание на то, что если редьюсер именовать так же, как и свойство, то можно написать так: { todos, comments }. В каждый редьюсер приходит state, но это не все состояние контейнера, а только та часть, которая лежит в соответствующем свойстве. Не забудьте про это.

Редьюсеры могут быть даже вложенными и для этого не нужны никакие специальные средства, обычные функции, принимающие на вход данные и возвращающие новые данные.

С таким подходом появляется одна особенность, которая, по началу, может испугать. Так как каждый редьюсер имеет доступ только к своей части состояния, действия, порождающие изменения сразу в нескольких местах, будут повторяться в разных редьюсерах:
*/

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

/*
То есть правильный подход состоит в том, чтобы повторять case часть в нужных редьюсерах, а не в том, чтобы пытаться получить недостающие части состояния.

# Дополнительные материалы
Normalizing State Shape https://redux.js.org/recipes/structuringreducers/normalizingstateshape
*/

/**@@@
reducers.js
Реализуйте в Store следующую структуру состояния:
*/
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

// Store должен уметь обрабатывать перечисленные в файле actions.js действия.


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





>>>>>> Ручная интеграция с реактом <<<<<<

/*
Внедрение Redux в приложение, делает его центральной, корневой частью всего приложения. Причём не имеет значения, используем мы реакт или нет. Структура контейнера и принцип работы с ним останется неизменным в любой ситуации. Общая схема работы приложения становится такой:

1. Возникает событие. Например, пользователь кликнул по кнопке.
2. Обработчик события выполняет какую-то логику и, в конце, обновляет контейнер через store.dispatch.
3. Контейнер по очереди вызывает все функции добавленные, через store.subscribe. Эти функции меняют представление на основе нового состояния внутри контейнера. И так по кругу. Событие -> Изменение состояния -> Отрисовка нового состояния.

Реализуем эту логику в связке с реактом. Для примера возьмем простой компонент счетчик с одной кнопкой, которая отображает текущее количество кликов. Связку с реактом сделаем в ручном режиме без использования готовой библиотеки. Тогда процесс работы не покажется магическим. Начнем с контейнера:
*/
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

/*
Контейнер ничего не знает про существование DOM, его задача - хранить данные и модифицировать их. Эта мысль очень важна, ее нужно прочувствовать. Воспринимайте контейнер как базу данных.

Следующим шагом сделаем компонент в реакте. Вторая важная мысль, раз мы начинаем использовать внешнее хранилище для данных, то внутренний setState нам больше не нужен. Компоненты получают все необходимые данные через props.

В будущих уроках мы рассмотрим ситуации, когда внутренний менеджмент состояния все же нужен, несмотря на использование редакса
*/

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

/*
Компонент Increment работает со свойством count. Его имя выбрано произвольно, нам не нужно опираться на структуру контейнера.

Теперь добавим обработчики. Напомню, что каждый обработчик в конце своей работы должен обновить состояние контейнера. С технической точки зрения произойдёт вызов функции store.dispatch и нужного действия. Откуда нам их взять внутри компонента? Все просто, мы их прокинем как свойства в наш компонент.
*/
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

// Остался последний шаг, нужно вызывать перерисовку компонента после изменения содержимого контейнера. В этом нам поможет функция store.subscribe:

import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

// Импортируем компонент
import App from './components/App';
// Импортируем редьюсеры
import reducers from './reducers';

// Создаем контейнер. Редьюсеры описаны в отдельном файле
const store = createStore(reducers);

// Создаем Action и оборачиваем его в функцию
export const increment = () => ({
  type: 'INCREMENT',
  payload: {},
});

// Элемент для подключения реакта
const containerElement = document.getElementById('container'),

// Подписываемся на изменения состояния внутри контейнера
// На каждое изменение отрисовываем наш компонент заново
store.subscribe(() => {
  const state = store.getState();
  ReactDOM.render(
    <App dispatch={store.dispatch} count={state} increment={increment} />,
    containerElement,
  );
});


// Первый раз нужно отрисовать руками
ReactDOM.render(
  <App dispatch={store.dispatch} increment={increment} />,
  containerElement,
);

/*
Когда все необходимые объекты созданы, происходит первоначальная отрисовка компонента в DOM. В компонент передаются необходимые данные, в нашем случае функция store.dispatch и функция increment. Последняя создает действие при своем вызове. Дальше начинает работать последовательность шагов, описанная в начале урока:

1. Пользователь нажимает на кнопку
2. Срабатывает обработчик handleClick, который вызывает dispatch(increment()).
3. Выполняется редьюсер и его ветка INCREMENT. Она увеличивает счетчик на единицу.
4. Контейнер вызывает функции добавленные через subscribe. В нашем случае это одна функция.
5. Эта функция извлекает состояние из контейнера через функцию store.getState.
6. Затем эта же функция перерисовывает компонент в DOM передавая ей новое состояние.

На каждом этапе этого процесса можно вносить различные изменения. Например нам может понадобится передавать несколько функций создающих действия. Достаточно просто их передать. Некоторые из этих функций могут принимать данные, которые store.dispatch передаст внутрь контейнера:
*/

export const increment = (step = 1) => ({
  type: 'INCREMENT',
  payload: { step },
});

// Такой инкремент позволяет менять шаг приращения. Внутри контейнера код поменяется на такой:

case 'INCREMENT':
  return state + action.payload.step;

// Само состояние внутри контейнера может стать структурой, например объектом.


/**@@@
src/components/App.jsx
Реализуйте компонент, который показывает форму и хранит ее состояние в Redux. Форма состоит из двух элементов: текстового поля и кнопки "сброс". При вводе текста, он отображается под полем ввода. Если нажать на сброс, то текст очищается.

Интерфейс компонента:
*/
<App dispatch={store.dispatch} text="text from store" {...actionCreators} />

// Начальное состояние:
<div>
  <form>
    <input type="text" value="">
    <button type="button">Reset</button>
  </form>
</div>

// После ввода текста:

<div>
  <form>
    <input type="text" value="hello">
    <button type="button">Reset</button>
  </form>
  <div>hello</div>
</div>

/*
src/index.jsx
Реализуйте интеграцию контейнера с реактом.

src/reducers.js
Добавьте необходимый редьюсер.

src/actions.js
Добавьте необходимые действия.
*/

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



>>>>>> Middlewares <<<<<<

/*
Middlewares относятся к продвинутым техникам использования Redux. В данном уроке мы посмотрим на них не с точки зрения написания, а исключительно с точки зрения использования. Нам они потребуются для подключения различных библиотек буквально с первого момента использования совместно с React.

Мидлвары - функции, которые последовательно вызываются в процессе обновления контейнера.

Общий принцип работы таков:

1. Мидлвары встраиваются в хранилище при его создании.
2. Во время диспатчинга данные проходят через них и только затем попадают в редьюсер.

Такая организация библиотеки позволяет ее крайне легко расширять новой функциональностью без необходимости переписывать исходный код redux под конкретную задачу.

Типичные примеры использования включают:

- Логирование.
- Оповещение об ошибках.
- Работа с асинхронным API.
- Роутинг.

Посмотрим как их подключить:
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  /* preloadedState, */
  applyMiddleware(thunk)
)


/*
thunk — это мидлвара, но перед тем как передать ее в функцию createStore, нужно применить к ней функцию applyMiddleware. Также обратите внимание на то, что мидлвару мы передаем вторым параметром, хотя в предыдущем уроке вторым параметром шел initState. Объясняется это просто, функция createStore проверяет тип второго параметра и в зависимости от этого понимает, что перед ней. В общем случае она принимает три параметра: редьюсер, начальный стейт и мидлвары.

В случае если мидлвар несколько, придется воспользоваться еще одной функцией:
*/
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

/*
В такой ситуации в контейнер передается результат функции compose. Последняя, в свою очередь, принимает на вход мидлвары.

Теперь мы подобрались к главному. Для редакса написано специальное браузерное расширение Redux DevTools. Установите его в свой браузер.
*/

// Ниже код подключения этого экстеншена к хранилищу:
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(
   reducer,
   /* preloadedState, */
    reduxDevtools && reduxDevtools(),
);

/*
Обратите внимание на то, что он не требует использования функции applyMiddleware.

В будущих уроках вам не придется подключать его руками. Мы уже сделали это за вас. Все что нужно — установить расширение и не забывать туда смотреть. Это ваш главный помощник в отладке на протяжении всего курса.

# Дополнительные материалы
Официальная документация ReduxDevTools https://github.com/zalmoxisus/redux-devtools-extension
*/



>>>>>> React Redux <<<<<<

