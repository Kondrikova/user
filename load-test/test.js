import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = 'http://arch.homework';

const JSON_PARAMS = { headers: { 'Content-Type': 'application/json' } };

// 404 - это ожидаемый результат негативных сценариев, поэтому такие ответы
// не должны попадать в http_req_failed и портить error rate на дашборде.
const NOT_FOUND_PARAMS = Object.assign({}, JSON_PARAMS, {
    responseCallback: http.expectedStatuses(404),
});

export const options = {
    duration: __ENV.DURATION || '87600h',
    vus: Number(__ENV.VUS || 5),
    noConnectionReuse: true,
    thresholds: {
        checks: ['rate>0.99'],
        http_req_failed: ['rate<0.01'],
    },
};

// При сетевой ошибке k6 возвращает status 0 и пустое тело, а res.json() на нём
// бросает исключение и роняет всю итерацию. Проверки должны это переживать.
function parseJson(res) {
    if (!res.body) {
        return null;
    }
    try {
        return res.json();
    } catch (e) {
        return null;
    }
}

function userPayload(suffix) {
    const uniq = `${__VU}-${__ITER}-${suffix}`;
    return JSON.stringify({
        userName: `loadtest_${uniq}`,
        firstName: 'Load',
        lastName: 'Test',
        email: `loadtest_${uniq}@example.com`,
        phone: '88005553535',
    });
}

export default function () {
    let userId;

    group('POST /user', function () {
        const res = http.post(
            `${BASE_URL}/user`,
            userPayload('create'),
            // name фиксирует имя метрики: без него k6 группирует по полному URL
            Object.assign({ tags: { name: 'POST /user' } }, JSON_PARAMS)
        );
        const body = parseJson(res);
        check(res, {
            'create: status 201': (r) => r.status === 201,
            'create: id присвоен': () => body !== null && body.id > 0,
        });
        userId = res.status === 201 && body !== null ? body.id : null;
    });

    group('GET /users', function () {
        const res = http.get(`${BASE_URL}/users`, { tags: { name: 'GET /users' } });
        check(res, {
            'list: status 200': (r) => r.status === 200,
            'list: массив в ответе': () => Array.isArray(parseJson(res)),
        });
    });

    if (!userId) {
        sleep(1);
        return;
    }

    group('GET /user/{id}', function () {
        const res = http.get(`${BASE_URL}/user/${userId}`, {
            tags: { name: 'GET /user/{id}' },
        });
        check(res, {
            'get: status 200': (r) => r.status === 200,
            'get: тот же id': () => {
                const body = parseJson(res);
                return body !== null && body.id === userId;
            },
        });
    });

    group('PUT /user/{id}', function () {
        const res = http.put(
            `${BASE_URL}/user/${userId}`,
            userPayload('update'),
            Object.assign({ tags: { name: 'PUT /user/{id}' } }, JSON_PARAMS)
        );
        check(res, {
            'update: status 200': (r) => r.status === 200,
            'update: email обновлён': () => {
                const body = parseJson(res);
                return body !== null && String(body.email).includes('update');
            },
        });
    });

    group('DELETE /user/{id}', function () {
        const res = http.del(`${BASE_URL}/user/${userId}`, null, {
            tags: { name: 'DELETE /user/{id}' },
        });
        check(res, { 'delete: status 204': (r) => r.status === 204 });
    });

    group('404 сценарии', function () {
        const missingId = 100000000 + userId;

        const get = http.get(
            `${BASE_URL}/user/${missingId}`,
            Object.assign({ tags: { name: 'GET /user/{id} 404' } }, NOT_FOUND_PARAMS)
        );
        check(get, { 'get несуществующего: 404': (r) => r.status === 404 });

        const put = http.put(
            `${BASE_URL}/user/${missingId}`,
            userPayload('missing'),
            Object.assign({ tags: { name: 'PUT /user/{id} 404' } }, NOT_FOUND_PARAMS)
        );
        check(put, { 'put несуществующего: 404': (r) => r.status === 404 });

        const del = http.del(
            `${BASE_URL}/user/${missingId}`,
            null,
            Object.assign({ tags: { name: 'DELETE /user/{id} 404' } }, NOT_FOUND_PARAMS)
        );
        check(del, { 'delete несуществующего: 404': (r) => r.status === 404 });
    });

    sleep(1);
}
