import AuthAPI from "../api/auth/authApi";
import { UserInfoInterface } from "../api/user/user.types";
import { UserRegistrationInterface, UserLoginInterface } from "../api/auth/auth.types";
import store from "../utils/store";
import UserController from "./userController";

const AuthApiInstance = new AuthAPI;
const UserControllerInstance = new UserController;

class AuthController {
    async createUser(formData: UserRegistrationInterface){
        await AuthApiInstance.logout();
        const createdID = JSON.parse(await AuthApiInstance.createUser(formData)).data.id;
        store.set({
            user:{
                id: createdID,
            }
        })
        UserControllerInstance.getUserInfo();

    }
    async loginUser(loginData: UserLoginInterface){
        await AuthApiInstance.login(loginData);        
        UserControllerInstance.getUserInfo();
    }

    async logoutUser(){
        await AuthApiInstance.logout();
    }

}

export default AuthController
