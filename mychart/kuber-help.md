#### Образ приложения в docker
Образ лежит по ссылке - https://hub.docker.com/repository/docker/kseniasharapova/user-app/general

#### Запуск
1. Запуск minikube: `minikube start`
2. Включить ingress **до** установки chart (и дождаться Ready у контроллера):
   ```bash
   minikube addons enable ingress
   kubectl wait --namespace ingress-nginx \
     --for=condition=ready pod \
     --selector=app.kubernetes.io/component=controller \
     --timeout=120s
   ```
3. Установка chart: `helm install user-app ./mychart`
4. Прописать локальный DNS для хоста из Ingress (обязательно!):
   ```bash
   echo "127.0.0.1 arch.homework" | sudo tee -a /etc/hosts
   ```
   Без этой строки `newman`/`curl`/`браузер` не смогут разрешить имя `arch.homework`.
5. Проверка статуса подов: `kubectl get pod`
6. Проверка Ingress: `kubectl get ingress` — в колонке `ADDRESS` должен появиться адрес (обычно `127.0.0.1` после tunnel)
7. Запуск tunnel в **отдельном** терминале и оставить его работающим:
   ```bash
   minikube tunnel
   ```
   (может запросить sudo; без работающего tunnel внешний доступ на `:80` не появится)

#### Проверка работы приложения
```bash
# быстрая проверка резолва и ответа
ping -c 1 arch.homework
curl -i http://arch.homework/users

newman run postman/user_api_collection.json
```

#### Типичные проблемы
| Симптом | Причина | Что сделать |
|---|---|---|
| `ENOTFOUND arch.homework` / `Could not get any response` | нет записи в `/etc/hosts` | добавить `127.0.0.1 arch.homework` |
| `Connection refused` / timeout | не запущен `minikube tunnel` | запустить tunnel и не закрывать терминал |
| у Ingress пустой `ADDRESS` | tunnel ещё не поднят или ingress-addon не Ready | `kubectl get ingress`, дождаться ADDRESS |
| поды `CrashLoopBackOff` / `ImagePullBackOff` | образ/БД не поднялись | `kubectl describe pod ...`, `kubectl logs ...` |

#### Описание сущностей:
- deployments - `dp.yaml`
- service - `service.yaml`
- ingress - `ingress.yaml`

#### Очистка после проверок
Удаление всех ресурсов и кластера minikube:`minikube delete`

#### Полезное
Сборка image: `docker build -t kseniasharapova/user-app:1.0.0 .`
Логи пода `kubectl logs podName`
