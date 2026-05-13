### Документ содержит описания ДЗ

[Перейти к Инфраструктурные паттерны](#title1)

### <a id="title1">Домашнее задачние на тему Инфраструктурные паттерны</a>

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

### <a id="title2">Домашнее задачние Основы работы с Kubernetes</a>
### Описание ДЗ
#### В этом ДЗ вы научитесь создавать минимальный сервис.
### Шаг 1. Создать минимальный сервис, который
- отвечает на порту 8000
- имеет http-метод
    - GET /health/
    - RESPONSE: {"status": "OK"}

### Шаг 2. Cобрать локально образ приложения в докер.
- Запушить образ в dockerhub

### Шаг 3. Написать манифесты для деплоя в k8s для этого сервиса.
- Манифесты должны описывать сущности: Deployment, Service, Ingress.
- В Deployment могут быть указаны Liveness, Readiness пробы.
- Количество реплик должно быть не меньше 2. Image контейнера должен быть указан с Dockerhub.
- Хост в ингрессе должен быть arch.homework. В итоге после применения манифестов GET запрос на http://arch.homework/health должен отдавать {“status”: “OK”}.

### Шаг 4. На выходе предоставить
1. ссылку на github c манифестами (в виде pull request). Манифесты должны лежать в одной директории, так чтобы можно было их все применить одной командой kubectl apply -f .
2. url, по которому можно будет получить ответ от сервиса (либо тест в postmanе).

### Задание со звездой:
- В Ingress-е должно быть правило, которое форвардит все запросы с `/otusapp/{student name}/*` на сервис с rewrite-ом пути. Где {student name} - это имя студента.
- Например: `curl arch.homework/otusapp/aeugene/health` -> рерайт пути на `arch.homework/health`

### Рекомендации по форме сдачи дз:
- использовать nginx ingress контроллер, установленный через хелм, а не встроенный в миникубик:
    - kubectl create namespace m && helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx/ && helm repo update && helm install nginx ingress-nginx/ingress-nginx --namespace m -f nginx-ingress.yaml (файл по ссылке)
      https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/
    - необходимо в новых версиях nginx добавлять класс ингресса
        - ingressClassName: nginx
- прикладывать к 2 дз урл для проверки: curl http://arch.homework/health или как указано в дз со *.
- К 3 ДЗ и далее прикладывать коллекцию postman и проверять ее работу через newman run имя_коллекции (прикладывать кроме команд разворачивания приложения, команду удаления)
- прописать у себя в /etc/hosts хост arch.homework с адресом своего миникубика (minikube ip), чтобы обращение было по имени хоста в запросах, а не IP.
- Обратите внимание, что при сборке на m1 при запуске вашего контейнера на стандартных платформах будет ошибка такого вида:
  `standard_init_linux.go:228: exec user process caued: exec format error`
    - Для сборки рекомендую указать тип платформы linux/amd64: `docker build --platform linux/amd64 -t tag`