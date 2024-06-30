import Block from "../../components/block/block";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import Input from "../../components/input/input";
import SignupTemplate from "./signup.hbs?raw";
import Form from "../../components/form/form";
import AuthController from "../../controllers/authController";
import Hyperlink from "../../components/hyperlink/hyperlink";
import UserController from "../../controllers/userController";
import { UserRegistrationInterface } from "../../api/auth/auth.types";
import Router from "../../utils/router";

const SignupRouter = new Router('#app');
const UserControllerInstance = new UserController;
const AuthInstance = new AuthController;

const EmailInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 0,
            type: "email",
            name: "email",
        },        
    }),    
    inputTitle: "Почта"
});

const LoginInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 1,
            type: "text",
            name: "login",  
        },      
    }),
    inputTitle: "Логин",
});

const FirstNameInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{
            id: 2,
            type: "text",
            name: "first_name",  
        },              
    }),
    inputTitle: "Имя",
});


const SecondNameInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{            
            id: 3,
            type: "text",
            name: "second_name",  
        }      
    }),
    inputTitle: "Фамилия",
});

const PhoneInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{
            id: 4,
            type: "tel",
            name: "phone", 
        },
               
    }),
    inputTitle: "Телефон",
});

const PasswordInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{
            id: 5,
            name: "password",        
            type: "password",
        },
        
    }),
    inputTitle: "Пароль",
});

const RepeatPasswordInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{
            id: 6,
            type: "password",
            name: "repeat_password",    
        }            
    }),
    inputTitle: "Пароль (еще раз)",
});


const LoginHyperlink = new Hyperlink({    
    destination: "/login",
    hrefText: "Войти",    
    attrs:{
        class: "no-account"
    },
})



const SignupCard = new Card({
    form: new Form<UserRegistrationInterface>({
        title:"Регистрация",
        inputs: [EmailInput, LoginInput, FirstNameInput, SecondNameInput, PhoneInput, PasswordInput, RepeatPasswordInput],
        submitClass: "signup-submit-button",
        submitText: "Зарегистрироваться",   
        attrs:{
            class: "signup-form"
        }
    }, AuthInstance.createUser),
    hyperlink: LoginHyperlink
});

const SignupData ={
    signupCard: SignupCard
};


class Signup extends Block{
    constructor() {
    super("main", {}, SignupTemplate);
    this._checkSignedIn();    

  }

  private async _checkSignedIn(){
    if (await UserControllerInstance.checkUserLoggedIn()){
        SignupRouter.go('/messenger')
    } else {
        this.setProps({attrs:{
            class: "card-canvas"
          }});
        this.setProps(SignupData);
    }
  }
};



export default Signup
