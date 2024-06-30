import Block, {Props} from "../../components/block/block";
import Page from "../../components/page/page";
import Card from "../../components/card/card";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import LoginTemplate from "./login.hbs?raw";
import Input from "../../components/input/input";
import Form from "../../components/form/form";
import AuthController from "../../controllers/authController";
import Hyperlink from "../../components/hyperlink/hyperlink";

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
    destination: "/signup",
    hrefText: "Нет аккаунта?"
})

const LoginCard = new Card({
    form: new Form({
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
    super("main", {} ,LoginTemplate);
    this.setProps({attrs:{
        class: "card-canvas"
      }});
    this.setProps(LoginData)
  }
};

const LoginLayout = new Login();





export default Login
