#!/bin/bash

# Удаляем пики
echo Чистка пиков
find $1 -name *.pyc -delete

#Создаем архив
echo Создание архива
catalog=pwd
cd $1
tar -czf $1/dinamica_dance.tar.gz dinamica_dance
cd $catalog

# Копируем исходники на сервак
echo Копирование файлов на сервер
scp $1/dinamica_dance.tar.gz u48649@u48649.netangels.ru:~/buffer/

# Перезапись исходников
echo Распаковка файлов и перезапуск сервера
ssh u48649@u48649.netangels.ru << EOF
rm -rf ~/dinamica.dance/www/dinamica_dance
tar -xf ~/buffer/dinamica_dance.tar.gz -C ~/dinamica.dance/www
rm -rf ~/buffer/*
# Запуск сервера
source ~/python/bin/activate
python ~/dinamica.dance/www/manage.py collectstatic --noinput
pkill -u u48649 -f django-wrapper.fcgi
exit
EOF

#Удаляем архив
rm dinamica_dance.tar.gz

echo Обновление прошло
