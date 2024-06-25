import Block, {Props} from "../components/block/block";
import SandboxTemplate from "./sandbox.hbs?raw";
import Page from "../components/page/page";
import SandboxInputBlock from "../components/sandboxComponents/sandboxInputBlock";
import SandboxInput from "../components/sandboxComponents/sandboxInput";
import SandboxForm from "../components/sandboxComponents/sandboxForm";
import SandboxButton from "../components/sandboxComponents/sandboxButton";
import Img from "../components/img/img";

import Signup from "../pages/signup/signup";
import Login from "../pages/login/login";

import AuthAPI from "../api/authApi";
import ChatAPI from "../api/chatApi";
import ChatsAPI from "../api/chatsApi";

import store, {StoreEvents} from "../utils/store";

import Router from "../utils/router";


const authApiInstance = new AuthAPI;
const chatsApiInstance = new ChatsAPI;




const LoginInput = new SandboxInputBlock({
    test: "success1",
    inputChild: new SandboxInput({
        attrs:{                
            id: 0,
            type: "text",
            name: "login",  
        },
        test: "success",
        header: "password",
        events:{
            mouseover: (_event) => {
                //authApiInstance.login();
            },
        }
    }),
    inputTitle: "Логин"
    
});

console.log(LoginInput.children.inputChild.props.test);




const PasswordInput = new SandboxInputBlock({
    inputChild: new SandboxInput({
        attrs:{                
            id: 1,
            type: "password",
            name: "password",  
        }, 
        header:"password"     
    }),
    inputTitle: "Пароль",
});

const LoginForm = new SandboxForm({
    title:"Вход",
    inputs: [LoginInput, PasswordInput],
    submitClass: "login-submit-button",
    submitText: "Авторизоваться",
    attrs:{
        class: "login-form",
    }
});

const chatWS = new ChatAPI();

const RequestButton = new SandboxButton({
    childElement: new Img({
        attrs:{
            src: "/assets/back_button.svg",
            alt: "Back button"
        }
    }),
    userName:"Blamk",
    attrs: {
        class: "back-button",
    },
    events: {
        click: async (_event) => {
            try {
                const userInfo = await authApiInstance.getUserInfo();
                const chatsInfo = await chatsApiInstance.getChats();
                store.set({
                    user: {
                        first_name: userInfo.first_name,
                    }
                })
                await chatWS.connect(chatsInfo[0].id);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        },
        mouseover: (_event) => {
            chatWS.sendMessage('Ура');
        }
    },    
});

const RouterButton = new SandboxButton({
    childElement: new Img({
        attrs:{
            src: "/assets/back_button.svg",
            alt: "Back button"
        }
    }),
    userName:"ignore",
    attrs: {
        class: "back-button",
    },
    events: {
        click: async (_event) => {
          SandboxRouter.go('/signup');  
        },    
    }   
});

const SandboxData = {
    loginInput: LoginInput,
    passwordInput: PasswordInput,
    loginForm: LoginForm,
    requestButton: RequestButton,
    routerButton: RouterButton
};


class Sandbox extends Block {
    constructor() {
          
      super("div", undefined, SandboxTemplate);
      this.setProps({attrs:{
        class: "error-canvas"
      }});
      this.setProps(SandboxData)
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps(store.getState());
    });
    }
  
};
const SandboxLayout = new Sandbox();

SandboxLayout.mountElement('body')

const SandboxPage = new Page({pageLayout: SandboxLayout});





const SandboxRouter = new Router("body");


export default Sandbox
