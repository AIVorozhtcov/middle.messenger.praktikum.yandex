import Block from "../../components/block/block";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import LoginTemplate from "./login.hbs?raw";
import Input from "../../components/input/input";
import Form from "../../components/form/form";
import AuthController from "../../controllers/authController";
import Hyperlink from "../../components/hyperlink/hyperlink";
import UserController from "../../controllers/userController";
import { UserLoginInterface } from "../../api/auth/auth.types";
import Router from "../../utils/router";

const UserControllerInstance = new UserController;
const LoginRouter = new Router('#app');
const AuthInstance = new AuthController;


const LoginInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 0,
            type: "text",
            name: "login",  
        },      
    }),
    inputTitle: "Логин",
});




const PasswordInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 1,
            type: "password",
            name: "password",  
        },      
    }),
    inputTitle: "Пароль",
});

const SignupHyperlink = new Hyperlink({    
    destination: "/sign-up",
    hrefText: "Нет аккаунта?",    
    attrs:{
        class: "no-account"
    },
})

const LoginCard = new Card({
    form: new Form<UserLoginInterface>({
        title:"Вход",
        inputs: [LoginInput, PasswordInput],
        submitClass: "login-submit-button",
        submitText: "Авторизоваться",
        attrs:{
            class: "login-form",
        }
    }, AuthInstance.loginUser),
    hyperlink: SignupHyperlink
});
 const LoginData = {
    loginCard: LoginCard
};


class Login extends Block{
    constructor() {
        super("main", {}, LoginTemplate);
        this._checkSignedIn();
        
    }
    private async _checkSignedIn(){
        if (await UserControllerInstance.checkUserLoggedIn()){
            LoginRouter.go('/messenger')
        } else {
            this.setProps({attrs:{
                class: "card-canvas"
            }});
            this.setProps(LoginData)
        }
    }

};





export default Login
