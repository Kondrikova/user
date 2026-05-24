#### Образ приложения в docker
Образ лежит по ссылке - https://hub.docker.com/repository/docker/kseniasharapova/user-app/general

#### Запуск
Запуск minikube: `minikube start` \
Установка chart: `helm install user-app ./mychart` \
Установка адреса для ingress: `minikube addons enable ingress` \
Проверка статуса подов: `kubectl get pod` \
Проверка наличия адреса для ingress: `kubectl get ingress` \
Запуск : `minikube tunnel`

#### Проверка работы приложения
`curl http://arch.homework/user` возвращает `Application is running!`

#### Описание сущностей:
- deployments - `dp.yaml`
- service - `service.yaml`
- ingress - `ingress.yaml`

#### Очистка после проверок
Удаление всех ресурсов и кластера minikube:`minikube delete` \

#### Полезное


