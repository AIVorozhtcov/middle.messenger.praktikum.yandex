import HTTPTransport from '../utils/fetch';
import { BaseAPI } from './baseApi';

const authHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
    create() {
      return authHTTPInstance.post('/', {data:{title: 'string'}});
    }

    login(loginData: {}) {
      return authHTTPInstance.post('/signin', {data:loginData});
    }

    
}

export default AuthAPI
