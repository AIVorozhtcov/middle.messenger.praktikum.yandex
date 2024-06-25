import Block, {Props} from "../../components/block/block";
import Page from "../../components/page/page";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import Input from "../../components/input/input";
import SignupTemplate from "./signup.hbs?raw";
import Form from "../../components/form/form";



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
    form: new Form({
        title:"Регистрация",
        inputs: [EmailInput, LoginInput, FirstNameInput, SecondNameInput, PhoneInput, PasswordInput, RepeatPasswordInput],
        submitClass: "signup-submit-button",
        submitText: "Зарегистрироваться",   
        attrs:{
            class: "signup-form"
        }
    }),
    hrefAddress: "/pages/login/login.html",
    hrefText: "Войти"
});

const SignupData ={
    signupCard: SignupCard
};


class Signup extends Block{
    constructor() {
    super("main", {}, SignupTemplate);
    this.setProps({attrs:{
        class: "card-canvas"
      }});
    this.setProps(SignupData);
  }
};

const SignupLayout = new Signup();


const SignupPage = new Page({
    pageLayout: SignupLayout,
});


export default Signup
