enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Data = Record<string, any>;

interface RequestOptions {
    headers?: Record<string, string>;
    data?: Data;
    timeout?: number;
    method?: METHODS
}

function queryStringify(data: Data): string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be an object');
    }

    const resultString = Object.keys(data).map(key => {
        let value = data[key];
        if (Array.isArray(value)) {
            value = value.join(',');
        }
        return `${key}=${value}`;
    }).join('&');

    return `?${resultString}`;
}

class HTTPTransport {
    private _baseUrl: String;

    constructor(baseURL: String){
        this._baseUrl = baseURL;
    }

    get(url: string, options: RequestOptions = { headers: {}, data: {}, timeout: 9000 }): Promise<XMLHttpRequest> {
        url = this._baseUrl + url +queryStringify(options.data || {});
        return this.request(url, { ...options, method: METHODS.GET });
    }

    post(url: string, options: RequestOptions = { headers: {}, data: {} }): Promise<XMLHttpRequest> {
        url = this._baseUrl + url;
        return this.request(url, { ...options, method: METHODS.POST });
    }

    put(url: string, options: RequestOptions = { headers: {}, data: {} }): Promise<XMLHttpRequest> {
        url = this._baseUrl + url +queryStringify(options.data || {});
        return this.request(url, { ...options, method: METHODS.PUT });
    }

    delete(url: string, options: RequestOptions = { headers: {}, data: {} }): Promise<XMLHttpRequest> {
        url = this._baseUrl + url +queryStringify(options.data || {});
        return this.request(url, { ...options, method: METHODS.DELETE });
    }

    request(url: string, options: RequestOptions = { method: METHODS.GET, timeout: 9000 }): Promise<XMLHttpRequest> {
        const { method = METHODS.GET, data, headers = {}, timeout = 9000 } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = true;
            xhr.timeout = timeout;

            Object.keys(headers).forEach(header => {
                xhr.setRequestHeader(header, headers[header]);
            });

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.onload = () => resolve(xhr);

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

export default HTTPTransport;
