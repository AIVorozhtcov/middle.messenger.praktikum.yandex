import UserApi from "../api/userApi";
import store from "../utils/store";
import { UserInfoInterface } from "../api/responseInterfaces";

const userApiInstance = new UserApi;

class UserController {
    async getUserInfo(){
        const UserData = JSON.parse(await userApiInstance.getUserInfo()) as UserInfoInterface;
        store.set({
            user: UserData
        })
        return UserData
    }
}

export default UserController
