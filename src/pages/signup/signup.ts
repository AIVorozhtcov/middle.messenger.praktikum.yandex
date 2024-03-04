import Block, {Props} from "../../components/block/block";
import Page from "../../components/page/page";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import Input from "../../components/input/input";
import SignupTemplate from "./signup.hbs?raw";

class Signup extends Block{
    constructor(props: Props) {
        // Создаём враппер дом-элемент button
    super("div", props, SignupTemplate);
    this.setProps({attrs:{
        class: "card-canvas"
      }});
  }
};
/*
{> card-input/card-input input-id="0" input-name="email" input-title="Почта" input-type="email"}}
            {{> card-input/card-input input-id="1" input-name="login" input-title="Логин" input-type="text"}}
            {{> card-input/card-input input-id="2" input-name="first_name" input-title="Имя" input-type="text"}}
            {{> card-input/card-input input-id="3" input-name="second_name" input-title="Фамилия" input-type="text"}}
            {{> card-input/card-input input-id="4" input-name="phone" input-title="Телефон" input-type="tel"}}
            {{> card-input/card-input input-id="5" input-name="password" input-title="Пароль" input-type="password"}}
            {{> card-input/card-input input-id="5" input-name="repeat_password" input-title="Пароль (еще раз)" input-type="password"}}
*/

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

const SignupCard = new Card({
    title:"Регистрация",
    inputs: [EmailInput, LoginInput, FirstNameInput, SecondNameInput, PhoneInput, PasswordInput, RepeatPasswordInput],
    submitClass: "signup-submit-button",
    submitText: "Зарегистрироваться",    
    formClass: "signup-form",
    hrefAddress: "/src/pages/login/login.html",
    hrefText: "Войти"
});


const SignupLayout = new Signup({
    signupCard: SignupCard
});


const SignupPage = new Page({
    pageLayout: SignupLayout,
});

SignupPage.mountElement("body");
