#### Образ приложения в docker
Образ лежит по ссылке - 

#### Запуск
Запуск minikube: `minikube start` \
Создание сущностей deployments, service, ingress: `kubectl apply -f .` \
`helm dependency update ./mychart`
#### Проверка работы приложения
`curl http://arch.homework/` возвращает `Application is running!` 

#### Описание сущностей:
- deployments - `dp.yaml`
- service - `service.yaml`
- ingress - `ingress.yaml`

#### Очистка после проверок
Удаление всех ресурсов и кластера minikube:`minikube delete` \

helm install my-database bitnami/postgresql -f my-values.yaml -n databases

kubectl describe pod user-app-6b8c47c775-rgrrp
kubectl get pod

kubectl logs user-app-58cc694f44-695b6

команда установки БД из helm, вместе с файлом values.yaml.
команда применения первоначальных миграций
команда kubectl apply -f, которая запускает в правильном порядке манифесты кубернетеса

коллекцию newman run коллекция_постман

helm install my-database bitnami/postgresql -f my-values.yaml -n databases
helm install <имя_релиза> <название_чарта> -f values.yaml -n <пространство_имен>
<имя_релиза> — ваше название для устанавливаемой базы данных (например, my-db).
<название_чарта> — путь к локальному чарту или имя из удаленного репозитория (например, bitnami/postgresql).
-f values.yaml (или --values) — путь к вашему файлу с настройками, который задает пароли, размеры хранилища, ресурсы и другие параметры.-n 
<пространство_имен> — namespace в Kubernetes, куда будет установлена БД. Если пространства имен еще нет, можно добавить флаг --create-namespace.

helm install my-app Chart -f values.yaml

helm install my-app ./mychart

helm dependency update ./mychart

