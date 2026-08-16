#### Образ приложения в docker
Образ лежит по ссылке - https://hub.docker.com/repository/docker/kseniasharapova/user-app/general

#### Запуск
Запуск minikube: `minikube start` \
Добавляем репозиторий:
`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
`helm repo update`
Устанавливаем kube-prometheus-stack (ставится до чарта приложения, так как приносит CRD ServiceMonitor): \
`helm install prometheus prometheus-community/kube-prometheus-stack \
--set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
--set grafana.enabled=true \
--namespace prometheus --create-namespace`
Убедиться, что CRD уже зарегистрирован: `kubectl get crd servicemonitors.monitoring.coreos.com` \
Установка chart: `helm install user-app ./mychart` \
Установка адреса для ingress: `minikube addons enable ingress` \
Прописать локальный DNS для хоста из Ingress: `echo "127.0.0.1 arch.homework" | sudo tee -a /etc/hosts` \
Проверка статуса подов: `kubectl get pod` \
Проверка наличия адреса для ingress: `kubectl get ingress` \
Запуск (после появления адреса для ingress): `minikube tunnel` \
Запускаем нагрузочный тест в директории load-test: `k6 run load-test/test.js`

#### Проверка работы приложения
`newman run postman/user_api_collection.json` 

#### Проверка 
Открываем Prometheus `minikube service prometheus-kube-prometheus-prometheus -n prometheus`
Получаем пароль пользователя admin в Grafana `kubectl --namespace prometheus get secrets prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo`
Открываем Grafana `minikube service prometheus-grafana -n prometheus`
6DdQoaV5zYXENUoacIZjZ2zdZ3wX3DBd89h9Sszj


#### Описание сущностей:
- deployments - `dp.yaml`
- service - `service.yaml`
- ingress - `ingress.yaml`

#### Очистка после проверок
Удаление всех ресурсов и кластера minikube:`minikube delete` \

#### Полезное
Сборка image: `docker build -t kseniasharapova/user-app:1.0.0 .` \
Логи пода `kubectl logs podName`
