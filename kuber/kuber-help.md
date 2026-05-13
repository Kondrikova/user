#### Образ приложения в docker
Образ лежит по ссылке - 

#### Запуск
Запуск minikube: `minikube start` \
Создание сущностей deployments, service, ingress: `kubectl apply -f .` \

#### Проверка работы приложения
`curl http://arch.homework/` возвращает `Application is running!` 

#### Описание сущностей:
- deployments - `dp.yaml`
- service - `service.yaml`
- ingress - `ingress.yaml`

#### Очистка после проверок
Удаление всех ресурсов и кластера minikube:`minikube delete` \