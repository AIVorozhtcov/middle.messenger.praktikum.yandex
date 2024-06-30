import Block, {Props} from "../components/block/block";
import SandboxTemplate from "./sandbox.hbs?raw";
import Page from "../components/page/page";
import SandboxInputBlock from "../components/sandboxComponents/sandboxInputBlock";
import SandboxInput from "../components/sandboxComponents/sandboxInput";
import SandboxForm from "../components/sandboxComponents/sandboxForm";
import SandboxButton from "../components/sandboxComponents/sandboxButton";
import Img from "../components/img/img";

import Form from "../components/form/form";
import Popup from "../components/popup/popup";

import Signup from "../pages/signup/signup";
import Login from "../pages/login/login";

import ChatsControler from "../controllers/chatsController";
import UserController from "../controllers/userController";
import ChatController from "../controllers/chatController";

import store, {StoreEvents} from "../utils/store";

import Router from "../utils/router";


const chatsInstance = new ChatsControler;
const userInstance = new UserController;

await userInstance.getUserInfo();




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

const chatWS = new ChatController;

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
            chatsInstance.getChats();
            try {
                const userInfo = await userInstance.getUserInfo;
                await chatWS.connectToChat(12);
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

const AvatarInput = new SandboxInputBlock({
    inputChild: new SandboxInput({
        attrs:{                
            id: 1,
            type: "file",
            name: "avatar",  
        }, 
        header:"image"     
    }),
    inputTitle: "Новый аватар",
});

const AvatarForm = new Form({
    title:"Новый Аватар",
    inputs: [AvatarInput],
    submitClass: "login-submit-button",
    submitText: "Авторизоваться",
    attrs:{
        class: "login-form",
    }
}, ()=>{});

const AvatarPopup = new Popup({
    popupChild: AvatarForm
})

const PopupButton = new SandboxButton({
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
            AvatarPopup.setProps({
                attrs:{
                    class: "popup-overlay show",
                }
            })  
        },    
    }   
});

const Avatar = new Img({
    attrs:{
        src: store.getState().user?.avatar ?store.getState().user?.avatar : "/assets/empty_profile.png",
        alt: "Back button"
    }
})



const SandboxData = {
    avatar: Avatar,
    loginInput: LoginInput,
    passwordInput: PasswordInput,
    loginForm: LoginForm,
    requestButton: RequestButton,
    routerButton: RouterButton,
    popupButton: PopupButton,
    avatarPopup: AvatarPopup
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





const SandboxRouter = new Router('#app');


export default Sandbox
