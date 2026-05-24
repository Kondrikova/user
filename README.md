### Документ содержит описания ДЗ

[Перейти к Инфраструктурные паттерны](#title1)

### <a id="title1">Домашнее задание на тему Инфраструктурные паттерны</a>

### Описание ДЗ
#### Приложение в docker-образ и запушить его на Dockerhub

### Цель:
В этом ДЗ вы сможете обернуть приложение в docker-образ и запушить его на Dockerhub.

### Шаг 1. Создать минимальный сервис, который
- отвечает на порту 8000
- имеет http-метод:
    - GET /health/
    - RESPONSE: {"status": "OK"}

### Шаг 2. Cобрать локально образ приложения в докер контейнер под архитектуру AMD64.
- Запушить образ в dockerhub

### На выходе необходимо предоставить
- имя репозитория и тэг на Dockerhub
- ссылку на github c Dockerfile, либо приложить Dockerfile в ДЗ

### Важно!
Обратите внимание, что при сборке на m1 при запуске вашего контейнера на стандартных платформах будет ошибка такого вида:
`standard_init_linux.go:228: exec user process caued: exec format error`

Для сборки рекомендую указать тип платформы **linux/amd64**: \
`docker build --platform linux/amd64 -t tag`

#### Полезные заметки
Сборка image: `docker build -t health-app .` \
Запуск контейнера: `docker run health-app` \
Запуск контейнера в режиме detach: `docker run -d health-app` \
Запуск контейнера на определенном порту: `docker run -d -p 8000:8080 health-app`

Посмотреть все images: `docker images` \
Посмотреть все контейнеры: `docker ps` \
Остановить контейнер: `docker stop nameContainer` \
Удалить контейнер: `docker rm nameContainer` \
Посмотреть логи контейнера: `docker logs nameContainer`