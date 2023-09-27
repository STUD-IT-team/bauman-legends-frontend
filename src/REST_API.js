export default class REST_API {
    post(path, data = {}) {
        return this.request('POST', path, data);
    }

    put(path, data = {}) {
        return this.request('PUT', path, data);
    }

    delete(path, data = {}) {
        return this.request('DELETE', path, data);
    }

    get(path, data = {}) {
        let query = Object.entries(data).reduce((query, [key, value]) => query + `${key}=${value}&`, '?');
        query = query.replace(/&$/, '');
        return this.request('GET', path + query);
    }

    async request(method, path, data) {
        const response = await fetch(
            path,
            {
                method: method,
                body: JSON.stringify(data),
            }
        );
        return {
            data: response.body,
            code: response.code,
            ok: response.ok,
        };
    }
}
