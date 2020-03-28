:<<comment
Утилита Make: https:#www.youtube.com/watch?v=pK9mF5aK05Q
Утилита для автоматизации сборки исполняемых программ и библиотек из исходного кода
comment

# Makefile пример куска кода (процесс комплиляции):
program: main.o lib.o
	cc -o program main.o lib.o
	main.o lib.o: defines.h


:<<comment
Особенности:
* Появилась в 1977 году.
* Включена в большинство *nix дистрибутивов
* Повсеместно используется для сборки ПО из исходников.

Зачем?
Универсальная автоматизация часто повторяющихся задач.
comment

$ make start
$ sudo service webserver restart
webserver stop/waiting
webserver start/running, process 11909
$ sudo service activejob restart

# Примеры использования:

make install # установка зависимостей
make test # запуск тестов
make start # запуск проекта
make deploy # развертывание
make docs # генерация документации
make dump_restore # развертывание дампа

:<<comment
А существующая автоматизация?
 ruby: rake, foreman
 javascript: gulp, grant, npm script
 php: composer, phing
 python: fabric, pydpoi
 java: grandle, ant, maven

Польза
* Унификация в гетерогенной среде.
* Зависимости между задачами.
* Самодокументирование.
* Автоматизация cli задач.
* Межпроектная станадатизация.

Примеры Хекслета:
comment

#Makefile

install:
	bundle install -j2
	npm install

start:
	sudo service webserver restart
	sudo service nginx restart

logs:
	sudo tail -f /var/log/upstart/webserver.log

retry:
	for i in {1..5}; do $(CMD) && break \
	|| sleep 3; done


# Инструкция по применению:

#Makefile

test:
	RAILS_ENV=test make frontend
	bin/rake test

deploy: test
	ansible-playbook deploy.yml -i $(E) -u $(U) -v


# Bash

make test

make deploy E=production U=ubuntu # подставляются в $() в коде выше


# PHONY

# Makefile
test:
	echo 'run tests...'

# Bash
	$ ls
	test

	make test
	make: `test` is up to date

# Makefile last line
.PHONY: test log # указываем имена файлов, которые совпадают с именами задач
