import Block, {Props} from "../../components/block/block";
import Page from "../../components/page/page";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import LoginTemplate from "./login.hbs?raw";

class Login extends Block{
    constructor(props: Props) {
        // Создаём враппер дом-элемент button
    super("div", props, LoginTemplate);
    this.setProps({attrs:{
        class: "card-canvas"
      }});
  }
};


const LoginInput = new CardInputBlock({
    inputId: 0,
    inputTitle: "Логин",
    inputType: "text",
    inputName: "login",
});


const PasswordInput = new CardInputBlock({
    inputId: 1,
    inputTitle: "Пароль",
    inputType: "password",
    inputName: "password",
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
