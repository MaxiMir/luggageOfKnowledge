<? 
telnet google.com 80 // ответ будет содержать IP, который мы затем вводим 
telnet 74.125.21.139 80 
HEAD / HTTP/1.0 
user-agent: google chrome 

HEAD / HTTP/1.1 
HOST: hexlet.io // в 1.1 есть виртуальные хосты 
Connection:close // ручное отключение keep-alive (соединение TCP не отключается пока не произойдет timeout) 

Content-Type: text/plain // тип контента. Решает проблему с отправкой данных после 2 переводов строк. 
Content-Length: 184 // длина в байтах опционального тела ответа. Благодаря этому заголовку, 2 перевода строки не приводят к отправке данных. После передачи последнего символа соединение закрывается. 

# Отправка формы: 
HEAD / HTTP/1.1 
HOST: hexlet.io 
Content-Type: application/x-www-form-urlencoded 
Content-Length: 28 
Connection:close 

login=user&password=D12345 

login=user&password%3D1234=5 // body; %3D - закодированное =, т.к в пароле содержится так же = 
user[login]=user&user[password]=12345 // как при отправке с формы вида <input name="user[login]">. HTTP не поддерживает такие конструкции 

# Transfer-Encoding 
Cache-Control: no-cache, np-store 
Transfer-Encoding: chunked // другой способ ответа (вместо Content-Length). В стандартном ответе получаем все body целиком и обрабатываем. В этом способе обрабатываем ответ до его полного получения. 0 с 2 переводами строки в конце ответа означает, что запрос полностью передан. 
Content-Type: image/jpeg; charset=utf-8 


# Query String 
POST /?key=1&val=2 HTTP/1.1 // Передаваемые параметры не имеют никакого отношения к GET. Ограничение 255 символов 
HOST: hexlet.io 
Content-Type: application/x-www-form-urlencoded 
Content-Length: 28 
Connection:close 

login=user&password=D12345 

# Базовая аутентификация 
// В случае введения неверных данных или нажатия на cancel => 
HTTP/1.1 401 Access Denied 
WWW-Authenticate: Basic realm="My Server" 
Content-Length: 0 
// В случаев введения правильного логина и пароля: 
GET /securefiles/ HTTP/1.1 
Host: www.httpwatch.com 
Authorization: Basic aHR0cHdhdGNo0my= // закодированнная base64 фраза из <username>:<password> 

# COOKIE 
curl —head https://ru.hexlet.io