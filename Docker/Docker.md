# DOCKER #

**Docker** - средство упаковки, доставки и запуска приложения.
**Docker image** - сборка (готовое к запуску приложение) read only!
**Docker container** - работающее приложение, созданное на базе docker image

Реестр docker images: hub.docker.com

```shell
docker images # вывод локальных images (сборок)
docker rmi mongo # удаление image (сборки)
docker rmi $(docker images -q) # удаление всех images (сборок)

docker ps # вывод запущенных контейнеров
docker ps -a # вывод всех контейнеров
```

# Пример 1

FILE: index.py:
```python
print('Hello Python')
```

FILE: Dockerfile
```dockerfile
FROM python # базовый образ, с которого начинаем сборку

WORKDIR /app # корневая директория

COPY . . # копируем файлы

CMD ["python", "index.py"] # обращаемся к python и запускаем index.py
```

```shell
docker build . # создание локального docker образа
docker run 612db57993bfe # запуск контейнера (612db57993bfe - IMAGE ID отображается в консоли)
docker images # список images
docker ps --all # список всех контейнеров (по умолч. показывает запущенные)
```

# Пример 2

Пример для поиска: docker hub node

```shell
docker pull node # забираем последнюю ноду (тк не указали версию)
docker run -it node # -it интерактивная консоль
```

# Пример 3

FILE: Dockerfile:

```dockerfile
FROM node

WORKDIR /app # рабочая директория

COPY . . # копируем все из корня(где лежит Dockerfile) в место образа app(тк указано в WORKDIR)

RUN npm install # запускается, когда мы собираем и строим сам образ

EXPOSE 3000 # порт для приложения

CMD ['node', 'app.js'] # запускается, когда запускаем образ
```

```shell
docker build .
docker run 46e6b865f6658
docker start 46e6b865f6658 # для повторного запуска
```

# Пример 4

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

# Еще пример:
RUN chmod a+x ./run.sh # даем разрешение на запуск файла
ENTRYPOINT ["./run.sh"] # выполняется без shell
```

```shell
docker build -t hello-world . # создание локального docker образа; -t название образа; . - путь до исходников (текущая директория)

docker run hello-world # запуск контейнера hello-world -> Hello, world!
docker run -d --rm --name hello hello-world # запуск контейнера hello на базе hello-world | -d запуск в фоне | --rm после окончания работы контейнера удалить его

docker rm 1eoc7cd00041 # удаление контейнера (передавать CONTAINER ID или NAMES)

docker ps -a -q # вывод только CONTAINER ID всех контейнеров
docker rm $(docker ps -qa) # удаляем все контейнеры
docker container prine # удаляем все остановленные и неиспользованные контейнеры

docker stop hello # остановить контейнер (передавать CONTAINER ID или NAMES)
```

# Пример 5

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


docker run --rm --name web -p 8080:8080 -e TZ=Europe/Moscow -v /Users/Maxim/PycharmProjects/youtube/docker/web-hello-world/resources:/usr/src/app/resources/ web-hello # -v монтируем папку к контейнеру - абсолютный путь на хостовой машине:абсолютный внутри контейнера ##1 вариант

docker volume ls # просмотр текущих volume
docker volume create web # создание volume
docker run --rm --name web -p 8080:8080 -v web:/usr/src/app/resources web-hello ## 2 вариант
```


# Пример 6
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


#### DOCKER COMPOSE (настройка над docker) ####
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



#### DEPLOY (Хостинг vscale) ####
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
```dockerfile
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
