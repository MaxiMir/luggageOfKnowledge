# @ Найти от корня все php файлы в содержимом которых есть basket:
$ find / -name '*.php' -exec grep -l 'basket' {} \;

# @ Сжать JPEG:
$ find . -type f \( -name "*.jpeg" -or -name "*.jpg" \) -exec jpegoptim -m70 --strip-all {} \;


# @ ДЕЛАЕМ ФАЙЛ ИСПОЛНЯЕМЫМ:
$ ./date

<<comment
  Добавить права на исполнение: chmod +x date.
  Добавить шебанг в начало файла:
  #!/usr/bin/env node
comment
