import Block, {Props} from "../../components/block/block";
import Page from "../../components/page/page";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
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
    inputId: 0,
    inputTitle: "Почта",
    inputType: "email",
    inputName: "email",
});

const LoginInput = new CardInputBlock({
    inputId: 1,
    inputTitle: "Логин",
    inputType: "text",
    inputName: "login",
});

const FirstNameInput = new CardInputBlock({
    inputId: 2,
    inputTitle: "Имя",
    inputType: "text",
    inputName: "first_name",
});


const SecondNameInput = new CardInputBlock({
    inputId: 3,
    inputTitle: "Фамилия",
    inputType: "text",
    inputName: "second_name",
});

const PhoneInput = new CardInputBlock({
    inputId: 4,
    inputTitle: "Телефон",
    inputType: "tel",
    inputName: "phone",
});

const PasswordInput = new CardInputBlock({
    inputId: 5,
    inputTitle: "Пароль",
    inputType: "password",
    inputName: "password",
});

const RepeatPasswordInput = new CardInputBlock({
    inputId: 6,
    inputTitle: "Пароль (еще раз)",
    inputType: "password",
    inputName: "repeat_password",
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
