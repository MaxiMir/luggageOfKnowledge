# DOCKER #

**Docker** - средство упаковки, доставки и запуска приложения.

**Docker image** - сборка (готовое к запуску приложение) read only!

**Docker container** - РАБОТАЮЩЕЕ приложение, созданное на базе docker image

Реестр docker images: **hub.docker.com**
Пример для поиска: docker hub node

## Пример 1

FILE: index.py:
```python
print('Hello Python')
```

FILE: Dockerfile
```dockerfile
FROM python # базовый образ, с которого начинаем сборку

WORKDIR /app # корневая директория

COPY . . # копируем файлы(в WORKDIR)

CMD ["python", "index.py"] # обращаемся к python и запускаем index.py
```

```shell
docker build . # создание локального docker образа (image)
docker images # вывод локальных images (сборок)
docker run 612db57993bfe # запуск image (612db57993bfe - IMAGE ID отображается в консоли)
docker ps # вывод запущенных контейнеров
docker ps -a # вывод всех контейнеров (по умолчанию показывает запущенные)
docker ps -a -q # вывод только CONTAINER ID всех контейнеров
```

## Пример 2
```shell
docker pull node # забираем последнюю ноду (тк не указали версию)
docker run -it node # -it интерактивная консоль (.exit - выход)
```

## Пример 3
```dockerfile
FROM node

WORKDIR /app # рабочая директория

# благодаря такому порядку Docker будет брать из кэша, когда будет пересобирать образы
COPY package.json /app # копируем package.json в /app

RUN npm install # запускается, когда мы собираем и строим сам образ
#/ 

COPY . . # копируем оставшиеся элементы из корня (где лежит Dockerfile) в место образа (/app - WORKDIR)

ENV PORT 4200 # системная переменная PORT

EXPOSE $PORT # декларирует порт 4200 !не пробрасывает порт

VOLUME ["/app/data"] # путь до данного VOLUME

CMD ['node', 'app.js'] # запускается при запуске образа
```

**Dockerignore**
файлы которые не заносим в образ:
```
node_modules
.git
.idea
Dockerfile
```

```shell
docker build . # создание локального docker образа (image)
docker run 46e6b865f6658 # запуск image (run для работы с images)
docker run -d --rm -p 80:3000 --name logsapp 82529d090fe1 # запуск image -d запуск в фоне | --rm после окончания работы контейнера удалить его | -p локальный порт:порт в докере(EXPOSE) | --name название контейнера logsapp на базе 82529d090fe1
docker start 46e6b865f6658 # для запуска контейнера
docker stop 46e6b865f6658 # остановка контейнера
docker logs 46e6b865f6658 # посмотреть логи, что происходило в контейнере
docker attach 46e6b865f6658 # подключится к контейнеру в консоли
```

FILE: /config/.env
```env
PORT=4200
```

```shell
docker run -d -p 80:4200 --env-file ./config/.env --rm --name logsapp logsapp:env # устанавливаем системные переменные из файла #3 вариант
```

File: Makefile

```Makefile
run: 
  docker run -d -p 80:4200 --env-file ./config/.env --rm --name logsapp logsapp:env 
run-volume: 
  docker -d -p 3000:3000 -v logs:/app/data --rm --name logsapp logsapp:volumes # -v logs:/app/data - logs - имя VOLUME : /app/data - локальный путь
run-dev:
  docker run -d -p 3000:3000 -v "/Users/maxim/WebstormProjets/logs-app:/app" -v /app/node_modules -v logs:/app/data --rm --name logsapp logsapp:volume # -v /app/node_modules анонимный VOLUME
stop:
  docker stop logsapp   
```

```shell
make run # запуск команды из Makefile
make stop 
```

## Пример 4

FOLDER /docker-hello-world
FOLDER /docker-hello-world/venv/ # виртуальная среда Python
FILE: /docker-hello-world/app.py:

```python
import time

while True:
    print("Hello, world!")
    time.sleep(1) # скрипт замирает на 1 секунду
```

FILE /docker-hello-world/Dockerfile:

```dockerfile
FROM python:3.6 # базовый образ, с которого начинаем сборку

RUN mkdir -p /usr/src/app/ # определяет какую команду выполнить (здесь создание папки)
WORKDIR /usr/src/app/ # указываем в какой директории работаем

COPY . /usr/src/app/ # переносим все с текущей директории (нашего хоста) в созданную директорию контейнера /usr/src/app/

CMD ["python", "app.py"] # что выполняем при старте (здесь python app.py), выполяется в shell

RUN chmod a+x ./run.sh # даем разрешение на запуск файла
ENTRYPOINT ["./run.sh"] # выполняется без shell
```

```shell
docker build -t hello-world . # создание локального docker образа; -t название образа (можно добавлять теги hello-world:exec -> TAG = exec); . - путь до исходников (текущая директория)
docker run hello-world # запуск контейнера hello-world -> Hello, world!
docker run -d --rm --name hello hello-world # запуск контейнера hello на базе hello-world | -d запуск в фоне | --rm после окончания работы контейнера удалить его

docker stop hello # остановить контейнер (передавать CONTAINER ID или NAMES)

docker rmi mongo # удаление image (сборки)
docker rmi $(docker images -q) # удаление всех images (сборок)

docker rm 1eoc7cd00041 # удаление контейнера (передавать CONTAINER ID или NAMES)
docker rm $(docker ps -qa) # удаляем все контейнеры
docker container prune # удаляем все остановленные и неиспользованные контейнеры

docker tag logsapp maximir/logsapp # создает новый image из logsapp maximir/logsapp
```

## Пример 5

FOLDER /web-hello-world
FOLDER /web-hello-world/venv/ # виртуальная среда Python
FILE: /web-hello-world/resources/response.json:
```json
{
    "payload": "Hello, World!"
}
```

FILE: /web-hello-world/requirements.txt:
```text
flask==1.1.1
```
ИСПОЛЬЗОВАНИЕ ЧЕРЕЗ bash: `pip install -r requirements.txt` # устанавливаем зависимости из файла

FILE: /web-hello-world/app.py:

```python
import os
import json
import datetime
from flask import Flask

app = Flask(__name__)

BASE_FOLDER = os.path.dirname(os.path.abspath(__file__))
RESOURCE_DIR = os.path.join(BASE_FOLDER, "resources")

@app.route('/')
def hello_world():
    with opne(os.path.join(RESOURCE_DIR, "response.json")) as f:
        return "%s - %s" % (json.loads(f.read().get("payload"), datetime.datatime.now().strftime("%d.%m.%Y %H:%M.%S"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
```

FILE /docker-hello-world/Dockerfile:
````dockerfile
FROM python:3.6

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY . /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt # устанавливаем зависимости из файла

EXPOSE 8080 # декларирует порт 8080 !не пробрасывает порт

ENV TZ Europe/Moscow # устанавливаем переменную окружения #1 вариант

CMD ["python", "app.py"]
````

```shell
docker build -t web-hello .
docker run --rm --name web -p 8080:8080 -e TZ=Europe/Moscow web-hello # -p указываем порты - порт на текущей машине:порт внутри докер контейнера | -e устанавливаем переменную окружения #2 вариант


docker run --rm --name web -p 8080:8080 -e TZ=Europe/Moscow -v /Users/Maxim/PycharmProjects/youtube/docker/web-hello-world/resources:/usr/src/app/resources/ web-hello # -v монтируем папку к контейнеру - абсолютный путь на хостовой машине:абсолютный внутри контейнера #1 вариант

docker volume ls # просмотр текущих volume
docker volume create web # создание volume
docker volume rm web # удаление volume
docker run --rm --name web -p 8080:8080 -v web:/usr/src/app/resources web-hello # 2 вариант
```

## Пример 6
FILE: /web-hello-world/app.py:
```python
# ...

storage = MongodbService.get_instance()

for _ in range(5):
    dto = {
        "_id": str(uuid4()),
        "payload": str(uuid4()),
    }
    storage.save_data(dto)

for data in storage.get_data():
    print(data)

comment
```

```shell
docker run --rm -d -p 27017:27017 mongo # запускаем отдельный контейнер с mongo; 27017 - прописанный порт у mongodb. тк локально mongodb не установлена, она установится из dockerhub
```


#### DOCKER COMPOSE (надстройка над docker) ####
FILE: docker-compose.yaml

```yaml
version: "3"

volumes:
  mongodb_volume #mongodb_volume

services:
  youtube_statistic:
    build: StatisticManager/ # путь
    restart: always # после рестарта VM Docker автоматически поднимет контейнер
    environment: # переменные окружения
      - TZ=Europe/Moscow
      - YOUTUBE_CHANEL_ID=
      - YOUTUBE_API_KEY=
      - DAYS_STATISTICS_SEND_TIME=09:00
      - WEEK_STATISTICS_SEND_TIME=23:00
      - MONGO_DB_ADDR=mongodb #mongodb
      - MONGO_DB_PORT=27017
      - RESPONSE_DELAY=120
      - NOTIFICATION_SERVICE_URL=
      - NOTIFICATION_SERVICE_CLIENT_ID=
      - NOTIFICATION_SERVICE_MODE=prod
      - STORAGE_SERVICE_IMPL=MongodbService
      - LANGUAGE=RU
      - BASE_REPORT_URL=http:/yt.maxim-cloud.run

    web_service:
      build: WebService/
      restart: always
      ports:
        - 8080:8080
      environment:
        - TZ=Europe/Moscow
        - MONGO_DB_ADDR=mongodb #mongodb
        - MONGO_DB_PORT=27017
        - STORAGE_SERVICE_IMPL=MongodbService
        - LOG_MODE=dev

    mongodb: #mongodb ссылается сюда
      image: mongo:latest
      volumes:
        - mongodb_volume:/data/db #mongodb_volume монтируем папку
      restart: always
```



#### DEPLOY (Хостинг vscale)
**Генерируем PUBLIC-KEY:**
```shell
cd ~/.ssh
mkdir erkapharm
cd erkapharm
ssh-keygen -t rsa
# > Enter file in which to save the key: gitlab
ssh-add -K ~/.ssh/erkapharm/gitlab
eval $(ssh-agent -s) # start the ssh-agent in the background
cat gitlab.pub | pbcopy # pbcopy - в macos вывод копирует в буфер обмена
# or
clip < ~/.ssh/id_rsa.pub # для windows

cd .ssh
vim config # заносим ->
```
```text
Host vs
  hostname 79.143.29.148 # прописан на хостинге
  user root
  IdentityFile ~/.ssh/youtube-docker/vscale # путь до ключа (созданного выше)

Host github.com
  IdentityFile ~/.ssh/youtube-docker/github # путь до ключа (созданного аналогично)
```

```shell
ssh vs

# INSTALL DOCKER:
# https://www.digitalocean.com/community/tutorials/docker-ubuntu-18-04-1-ru
sudo apt update
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd=64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt install docker-ce

# INSTALL DOCKER-COMPOSE:
# https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-ru
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

docker-compose up -d # -d контейнеры запустить в фоне
docker-compose down # остановить все контейнеры


cd StatisticManager
docker build -t maxmprojects/statistic-manager . # maximprojects - ID пользователя
docker login # авторизуемся
docker push maximprojects/statistic-manager # пушим в docker hub

# аналогично и для WebService

# на сервере:
mkdir yt
cd yt/
vim docker-compose.yaml # сюда вставляем
```

```yaml
version: "3"

volumes:
  mongodb_volume

services:
  youtube_statistic:
    image maximprojects/statistic-manager # заменяем build на это
    restart: always
    environment:
      - TZ=Europe/Moscow
      - YOUTUBE_CHANEL_ID=#заполнить
      - YOUTUBE_API_KEY=#заполнить
      - DAYS_STATISTICS_SEND_TIME=09:00
      - WEEK_STATISTICS_SEND_TIME=23:00
      - MONGO_DB_ADDR=mongodb
      - MONGO_DB_PORT=27017
      - RESPONSE_DELAY=120
      - NOTIFICATION_SERVICE_URL=#заполнить
      - NOTIFICATION_SERVICE_CLIENT_ID=#заполнить
      - NOTIFICATION_SERVICE_MODE=prod
      - STORAGE_SERVICE_IMPL=MongodbService
      - LANGUAGE=RU
      - BASE_REPORT_URL=http:/yt.maxim-cloud.run

    web_service:
      image maximprojects/web-service # заменяем build на это
      restart: always
      ports:
        - 8080:8080
      environment:
        - TZ=Europe/Moscow
        - MONGO_DB_ADDR=mongodb
        - MONGO_DB_PORT=27017
        - STORAGE_SERVICE_IMPL=MongodbService
        - LOG_MODE=dev

    mongodb:
      image: mongo:latest
      volumes:
        - mongodb_volume:/data/db
      restart: always
```
