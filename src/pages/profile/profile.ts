import Block, {Props} from "../../components/block/block";
import ProfileLine from "../../components/profileLine/profileLine";
import Page from "../../components/page/page";
import Img from "../../components/img/img";
import Span from "../../components/span/span";
import Button from "../../components/button/button";
import ProfileTemplate from "./profile.hbs?raw";
import Input from "../../components/input/input";

import ProfilePageTemplate from "./profilePage.hbs?raw";

import Router from "../../utils/router";



const EmailLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "email",
            name: "email",              
            value: "dna@gmail.com"
        },      
    }),
    title: "Почта",
})

const LoginLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "login",              
            value: "dna42"
        },      
    }),
    title: "Логин",
})

const FirstNameLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "first_name",              
            value: "Douglas"
        },      
    }),    
    title: "Имя"
})

const LastNameLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "last_name",              
            value: "Adams"
        },      
    }),
    title: "Фамилия"
})

const DisplayNameLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "display_name",              
            value: "Doug"
        },      
    }),
    title: "Имя в чате"
})

const PhoneLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "tel",
            name: "phone",              
            value: "+42434445"
        },      
    }),    
    title: "Телефон"
})

const SidebarButton = new Button({
    childElement: new Img({
        attrs:{
            src: "/assets/back_button.svg",
            alt: "Back button"
        }
    }),
    attrs: {
        class: "back-button",
    },
    events: {
        click: _event => {
            const ProfileRouter = new Router('body');
            ProfileRouter.back();

        }
    },    
});


const EditDataButton = new Button({
    childElement: new Span({
        text: "Изменить данные",
        attrs:{
            class: "options-left-text"
        }
    }),
    attrs: {
        class: "profile-line editing-option",
    },
})

const EditPasswordButton = new Button({
    childElement: new Span({
        text: "Изменить пароль",
        attrs:{
            class: "options-left-text"
        }
    }),
    attrs: {
        class: "profile-line editing-option",
    },
})

const ExitButton = new Button({
    childElement: new Span({
        text: "Выйти",
        attrs:{
            class: "exit-left-text"
        }
    }),
    attrs: {
        class: "profile-line editing-option",
    },
})

const ProfileData = {    
    sidebarButton: SidebarButton,
    profilePictureSrc: "/assets/undefinedPhoto.jpg",
    displayName: "Doug",
    profileLines: [EmailLine, LoginLine, FirstNameLine, LastNameLine, DisplayNameLine, PhoneLine],
    editDataButton: EditDataButton,
    editPasswordButton: EditPasswordButton,
    exitButton: ExitButton
}

class Profile extends Block{
    constructor(props: Props) {
    super("div", props, ProfileTemplate);
    this.setProps(ProfileData);    
  }
};


const ProfileLayout = new Profile(ProfileData)

class ProfilePage extends Block{
    constructor(){
        super('main', {}, ProfilePageTemplate)
        this.setProps({
            profileLayout: ProfileLayout,
        })
    }
}

const ProfilePageInstance = new ProfilePage();




export default ProfilePage
