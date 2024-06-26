import HTTPTransport from '../utils/fetch';
import { BaseAPI } from './baseApi';
import { UserInfoInterface } from './responseInterfaces';

const userHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class UserApi extends BaseAPI {
    getUserInfo() {
        return userHTTPInstance.get('/user').then(xhr => {
            if (xhr.status === 200) {
                return xhr.responseText;
            }
            throw new Error(`Failed to fetch user info: ${xhr.status}`);
        });
    }
}

export default UserApi
