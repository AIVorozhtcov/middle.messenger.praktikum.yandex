import HTTPTransport from '../../utils/fetch';
import { BaseAPI } from '../baseApi';
import { UserInfoInterface,  UserUpdateInterface} from './user.types';
const userHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

class UserApi extends BaseAPI {
    
    updateUserInfo(newInfo: UserUpdateInterface){
        return userHTTPInstance.put('/profile', {data:newInfo}).then(xhr => {
            if (xhr.status === 200) {
                return xhr.responseText;
            }
            throw new Error(`Failed to update user info: ${xhr.status}`);
        });
    }

    updateAvatar(fileData: FormData){
        return userHTTPInstance.put('/profile/avatar', {data: fileData}).then(xhr => {
            if (xhr.status === 200) {
                return xhr.responseText;
            }
            throw new Error(`Failed to update avatar: ${xhr.status}`);
        });
    }

    search(login: string){
        return userHTTPInstance.post('/search', {data:{login}}).then(xhr => {
            if (xhr.status === 200) {
                return xhr.responseText;
            }
            throw new Error(`Failed to find users: ${xhr.status}`);
        });
    }

    changePassword(oldPassword: string, newPassword: string){
        return userHTTPInstance.put('/password', {data:{oldPassword: oldPassword, newPassword: newPassword}}).then(xhr => {
            if (xhr.status === 200) {
                return xhr.responseText;
            }
            throw new Error(`Failed to change password: ${xhr.status}`);
        });
    }

    
}

export default UserApi
