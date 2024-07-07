import HTTPTransport from '../../utils/fetch';
import { BaseAPI } from '../baseApi';
import { UserRegistrationInterface, UserLoginInterface } from './auth.types';

const authHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
    createUser(registrationData: UserRegistrationInterface) {
      return authHTTPInstance.post('/signup', {data:registrationData}).then(xhr => {
        if (xhr.status === 200) {
            return xhr.responseText;
        }
        throw new Error(`Failed to register: ${xhr.status}`);
      });
    }

    getUserInfo() {
      return authHTTPInstance.get('/user').then(xhr => {
          if (xhr.status === 200) {
              return xhr.responseText;
          }
          throw new Error(`Failed to fetch user info: ${xhr.status}`);
      });
    }

    async checkUserInfo() {
      return authHTTPInstance.get('/user').then(xhr => {
          if (xhr.status === 200) {
              return xhr.responseText;
          } else if (xhr.status === 401) {
              throw new Error(`401 Unauthorized`);
          }
          throw new Error(`Failed to fetch user info: ${xhr.status}`);
      });
    }
    

    login(loginData: UserLoginInterface) {
      
      return authHTTPInstance.post('/signin', {data:loginData}).then(xhr => {
        if (xhr.status === 200) {
            return xhr.responseText;
        }
        throw new Error(`Failed to log in: ${xhr.status}`);
      });
    }

    logout() {
       authHTTPInstance.post('/logout', {}).then(xhr => {
        if (xhr.status === 200) {
          return xhr.responseText;
        }
        throw new Error(`Failed to register: ${xhr.status}`);
      });
    }



    
}

export default AuthAPI
