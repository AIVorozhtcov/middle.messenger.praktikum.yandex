import Block, {Props} from "../../components/block/block";
import Page from "../../components/page/page";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import LoginTemplate from "./login.hbs?raw";
import Input from "../../components/input/input";

class Login extends Block{
    constructor(props: Props) {
    super("div", props, LoginTemplate);
    this.setProps({attrs:{
        class: "card-canvas"
      }});
  }
};


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

const LoginCard = new Card({
    title:"Вход",
    inputs: [LoginInput, PasswordInput],
    submitClass: "login-submit-button",
    submitText: "Авторизоваться",
    formClass: "login-form",
    hrefAddress: "/src/pages/signup/signup.html",
    hrefText: "Нет аккаунта?"
});


const LoginLayout = new Login({
    loginCard: LoginCard
});


const LoginPage = new Page({
    pageLayout: LoginLayout,
});

LoginPage.mountElement("body");
