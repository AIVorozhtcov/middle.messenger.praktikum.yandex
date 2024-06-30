import AuthAPI from "../api/auth/authApi";
import { UserRegistrationInterface, UserLoginInterface } from "../api/auth/auth.types";
import store from "../utils/store";
import UserController from "./userController";
import Router from "../utils/router";

const AuthRouter = new Router('#app');
const AuthApiInstance = new AuthAPI();
const UserControllerInstance = new UserController();

class AuthController {
    async createUser(formData: UserRegistrationInterface){
        const createdID = JSON.parse(await AuthApiInstance.createUser(formData)).id;
        store.set({
            user:{
                id: createdID,
            }
        })
        UserControllerInstance.getUserInfo();        
        AuthRouter.go('/messenger')

    }
    async loginUser(loginData: UserLoginInterface){
        await AuthApiInstance.login(loginData);        
        UserControllerInstance.getUserInfo();
        AuthRouter.go('/messenger')
    }

    async logoutUser(){
        await AuthApiInstance.logout();
    }

}

export default AuthController
