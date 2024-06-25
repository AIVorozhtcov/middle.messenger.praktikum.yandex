import HTTPTransport from '../utils/fetch';
import { BaseAPI } from './baseApi';
import { UserInfoInterface } from './responseInterfaces';

const authHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
    create() {
      return authHTTPInstance.post('/', {data:{title: 'string'}});
    }

    login(loginData: {}) {
      return authHTTPInstance.post('/signin', {data:loginData});
    }

    getUserInfo() {
        return authHTTPInstance.get('/user').then(xhr => {
            if (xhr.status === 200) {
                return JSON.parse(xhr.responseText) as UserInfoInterface;
            }
            throw new Error(`Failed to fetch user info: ${xhr.status}`);
        });
    }
}

export default AuthAPI
