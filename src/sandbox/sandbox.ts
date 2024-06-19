import Block, {Props} from "../components/block/block";
import SandboxTemplate from "./Sandbox.hbs?raw";
import Page from "../components/page/page";
import CardInputBlock from "../components/cardInputBlock/cardInputBlock";
import Input from "../components/input/input";



class Sandbox extends Block {
    constructor(props: Props) {
          
      super("div", props, SandboxTemplate);
      this.setProps({attrs:{
        class: "error-canvas"
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
        events:{
            hover:() => {
                console.log('oops')
            }
        }      
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

const SandboxLayout = new Sandbox({
    loginInput: LoginInput,
    passwordInput: PasswordInput
});

const SandboxPage = new Page({pageLayout: SandboxLayout});

SandboxPage.mountElement("body");
