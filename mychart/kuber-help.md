#### Образ приложения в docker
Образ лежит по ссылке - https://hub.docker.com/repository/docker/kseniasharapova/user-app/general

#### Запуск
Запуск minikube: `minikube start` \
Установка chart: `helm install user-app ./mychart` \
Установка адреса для ingress: `minikube addons enable ingress` \
Прописать локальный DNS для хоста из Ingress: `echo "127.0.0.1 arch.homework" | sudo tee -a /etc/hosts` \
Проверка статуса подов: `kubectl get pod` \
Проверка наличия адреса для ingress: `kubectl get ingress` \
Запуск (после появления адреса для ingress): `minikube tunnel`

#### Проверка работы приложения
`newman run postman/user_api_collection.json` 

#### Описание сущностей:
- deployments - `dp.yaml`
- service - `service.yaml`
- ingress - `ingress.yaml`

#### Очистка после проверок
Удаление всех ресурсов и кластера minikube:`minikube delete` \

#### Полезное
Сборка image: `docker build -t kseniasharapova/user-app:1.0.0 .`
Логи пода `kubectl logs podName`