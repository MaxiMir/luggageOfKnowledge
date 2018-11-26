<? 

############### HTTP ###############

>>>>> HTTP 1.0 <<<<<<<

telnet google.com 80 // ответ будет содержать IP, который мы затем вводим. для HTTPS TCP-порт - 443
telnet 74.125.21.139 80 
HEAD / HTTP/1.0 
user-agent: google chrome 

/*
Утилиту telnet можно использовать для выполнения HTTP-запросов. Для этого необходимо сначала подключиться к серверу на тот порт, где работает HTTP-сервер. Чаще всего это порт 80, поэтому подключение выполняется командой:

telnet somehost.com 80
Происходит соединение с сервером, а не с сайтом, как многие могут полагать. Если соединение прошло успешно, то можно начать передавать серверу текст запроса.

Вот пример HTTP-запроса, выполненного с помощью утилиты telnet:
*/

battle (master) $ telnet jquery.com 80                                                                                                    // =>                                          
Trying 70.32.120.107...                                                                                                                   
Connected to jquery.com.                                                                                                                  
Escape character is '^]'. 


HEAD /download HTTP/1.1                                                                                                      
HOST: jquery.com  // 2 переноса строки для отправки                                                                                                                                                                

// =>                                                                                                                                   
HTTP/1.1 301 Moved Permanently                                                                                                            
Server: nginx/1.4.7                                                                                                                       
Date: Tue, 08 Jul 2014 18:21:11 GMT                                                                                                       
Content-Type: text/html; charset=UTF-8                                                                                                    
Connection: keep-alive                                                                                                                    
X-Powered-By: PHP/5.3.28-1~dotdeb.0                                                                                                       
X-Pingback: http://jquery.com/xmlrpc.php                                                                                                  
Location: http://jquery.com/download/                                                                                                                                             
                                         
Connection closed by foreign host. // как правило, серверы настроены на 30 секундный интервал (если в это промежуток времени ничего не приходит - сервер закрывает соединение)



battle (master) $ telnet jquery.com 80
// => 
Trying 70.32.120.107...                                                                            
Connected to jquery.com.                                                                                                    
Escape character is '^]'. 


HEAD / HTTP/1.1                                                                         
HOST: jquery.com                                                                                                                          // =>                                                                                                                                    
HTTP/1.1 200 OK                                                                                                                           
Server: nginx/1.4.7                                                                                                                       
Date: Tue, 08 Jul 2014 18:21:30 GMT            
Content-Type: text/html; charset=UTF-8                                                                                                    
Connection: keep-alive                                                                                                                    
Vary: Accept-Encoding                                                           
X-Powered-By: PHP/5.3.28-1~dotdeb.0                                                                                                       
X-Pingback: http://jquery.com/xmlrpc.php                                                                                                  
                                                                                                                                                                                  
^CConnection closed by foreign host.  

battle (master) $ logout   


/*
Полезные ссылки
Простым языком об HTTP http://habrahabr.ru/post/2151	17/
Формат HTTP-запросов http://citforum.ru/internet/cgi_tut/rqst.shtml
Формат HTTP-ответов http://citforum.ru/internet/cgi_tut/spns.shtml
*/



>>>>> HTTP 1.1 <<<<<<<

telnet hexlet.io 8080
HEAD / HTTP/1.1 
HOST: hexlet.io // в 1.1 появились виртуальные хосты 
Content-Type: text/plain // тип контента. Решает проблему с отправкой данных после 2 переводов строк. 
Content-Length: 184 // длина в байтах опционального тела ответа. Благодаря этому заголовку, 2 перевода строки не приводят к отправке данных. После передачи последнего символа соединение закрывается.
Connection: close // ручное отключение keep-alive (соединение TCP не отключается пока не произойдет timeout) *

login=user&password=12345678


// => ...
Connection: keep-alive // соединение не будет закрыто, пока не произойдет timeout или не будет об этом явно сказано (*)

/*
Полезные ссылки
Стандарт HTTP 1.1 https://www.ietf.org/rfc/rfc2616.txt
Википедия / Постоянное HTTP-соединение https://ru.wikipedia.org/wiki/Постоянное_HTTP-соединение	
*/ 

/**
Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080. Параметры запроса: глагол post, страница /upload, протокол http 1.1, тело: my request body. Не забудьте установить заголовки необходимые для отправки body;
**/

telnet hexlet.local 8080
POST /upload HTTP/1.1
Host: hexlet.local
Content-Length: 15
Content-Type: text/plain

my request body



>>>>> Отправка формы <<<<<<<
telnet hexlet.io 8080 
POST /login HTTP/1.1 
HOST: hexlet.io 
Content-Type: application/x-www-form-urlencoded 
Content-Length: 28 
Connection:close 

login=user&password=D12345 


// => ...
login=user&password%3D1234=5 // body; %3D - закодированное =, т.к в пароле содержится так же = 
user[login]=user&user[password]=12345 // как при отправке с формы вида <input name="user[login]">. HTTP не поддерживает такие конструкции 


/**
Выполните авторизацию на сайте hexlet.local (расположен на localhost:8080). Для этого отправьте следующие данные формы: username со значением admin, password со значением secret на урл /session/new. Используйте глагол post и тип application/x-www-form-urlencoded;
**/
telnet hexlet.local
POST /session/new HTTP/1.1
Host: hexlet.local
Content-Type: application/x-www-form-urlencoded
Content-Length: 30

username=admin&password=secret



>>>>> Transfer-Encoding <<<<<<<

Cache-Control: no-cache, no-store 
Transfer-Encoding: chunked // другой способ ответа (вместо Content-Length). В стандартном ответе получаем все body целиком и обрабатываем. В этом способе обрабатываем ответ до его полного получения. Каждый chunk начинается с числа, указывающий на его размер. 0 с 2 переводами строки в конце ответа означает, что запрос полностью передан. Доступен только начиная с HTTP версии 1.1
Content-Type: image/jpeg; charset=utf-8 

/*
Формат сообщений
Для отделения записей размеров блоков (частей) от их содержания используется разделитель CRLF (как строка: «\r\n»; как байты в формате HEX: 0x0D, 0x0A). Длина блока — это размер содержания блока, разделители CRLF не учитываются.

Схематическое представление: <длина блока в HEX><CRLF><содержание блока><CRLF>
Последний блок строится по той же схеме, потому имеет следующий вид по причине отсутствия содержания: 0<CRLF><CRLF>

Полезные ссылки
Ссылка на изображение, передаваемое с помощью chunks (пример из видео) http://www.httpwatch.com/httpgallery/chunked/chunkedimage.aspx
Chunked transfer encoding / Википедия https://ru.wikipedia.org/wiki/Chunked_transfer_encoding
*/

>>>>>  Query String <<<<<<<

telnet hexlet.io 8080
POST /?key=1&val=2 HTTP/1.1 // Передаваемые параметры не имеют никакого отношения к GET. Ограничение 255 символов 
HOST: hexlet.io 
Content-Type: application/x-www-form-urlencoded 
Content-Length: 28 
Connection:close 

login=user&password=D12345 


// В одном запросе можно передавать данные и в body, и в request line с помощью query string

/*
Полезные ссылки
Query String / Wikipedia https://en.wikipedia.org/wiki/Query_string
RFC 3986 (соответствующий стандарт) https://tools.ietf.org/html/rfc3986
*/

/**
Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080. Передайте в строке запроса следующие параметры: key равный value и another_key равный another_value. Параметры запроса: глагол get, страница /, протокол http 1.1;
**/

telnet hexlet.local
GET /?key=value&another_key=another_value HTTP/1.1
HOST: hexlet.local



>>>>> Базовая аутентификация <<<<<<<
// В случае введения неверных данных или нажатия на cancel => 
HTTP/1.1 401 Access Denied 
WWW-Authenticate: Basic realm="My Server" 
Content-Length: 0 

// В случаев введения правильного логина и пароля: 
GET /securefiles/ HTTP/1.1 
Host: www.httpwatch.com 
Authorization: Basic aHR0cHdhdGNo0my= // закодированнная base64 фраза из <username>:<password> 

/*
Полезные ссылки
Basic access authentication / Wikipedia https://en.wikipedia.org/wiki/Basic_access_authentication
*/

/**
Используя telnet авторизуйтесь на hexlet.local:8080 (расположен на localhost). Параметры запроса: глагол get, страница /admin, протокол http 1.1, имя пользователя Aladdin, пароль open sesame;

Для кодирования логина и пароля используйте следующую команду в терминале: printf 'Aladdin:open sesame' | base64
**/

GET /admin HTTP/1.1
HOST: hexlet.local
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==



>>>>> COOKIE <<<<<<<

/*
Протокол HTTP является stateless протоколом - каждая пара «HTTP-запрос + ответ» независимая, и протокол не «помнит» ничего о прошлых запросах
Персистентные куки (persistent cookies) и сессионные куки (session cookies)
*/

$ curl —head https://ru.hexlet.io

// В куки есть такой фрагмент: domain = .yandex.ru. Для yandex.ru и всех поддоменов вида x.yandex.ru будет использоваться этот куки.

/*
Дополнительные материалы
HTTP Cookie / Mozilla https://developer.mozilla.org/ru/docs/Web/HTTP/Куки
HTTP Куки / Википедия https://ru.wikipedia.org/wiki/HTTP_cookie
RFC 6265: стандарт, описывающий cookie http://tools.ietf.org/html/rfc6265
*/


/**
Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080. Параметры запроса: глагол get, страница /account, протокол http 1.1, куки name со значением user и secret со значением secret_hash;
**/

GET /account HTTP/1.1
Host: hexlet.local
Cookie: name=user; secret=secret_hash