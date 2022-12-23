#### Найти от корня все php файлы в содержимом которых есть basket: ####
```shell
find / -name '*.php' -exec grep -l 'basket' {} \;
```

#### Сжать JPEG: ####
```shell
find . -type f \( -name "*.jpeg" -or -name "*.jpg" \) -exec jpegoptim -m70 --strip-all {} \;
```

#### Делаем файл исполняемым: ####

```shell
./date

chmod +x date # Добавить права на исполнение
```
Добавить шебанг в начало файла

```shell
#!/usr/bin/env node
```
