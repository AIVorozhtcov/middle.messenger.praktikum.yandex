import Block, {Props} from "../../components/block/block";
import ProfileLine from "../../components/profileLine/profileLine";
import Page from "../../components/page/page";
import Img from "../../components/img/img";
import Span from "../../components/span/span";
import Button from "../../components/button/button";
import ProfileTemplate from "./profile.hbs?raw";

class Profile extends Block{
    constructor(props: Props) {
    super("div", props, ProfileTemplate);
    
  }
};

const EmailLine = new ProfileLine({
    title: "Почта",
    type: "email",
    name: "email",
    value: "dna@gmail.com"
})

const LoginLine = new ProfileLine({
    title: "Логин",
    type: "text",
    name: "login",
    value: "dna42"
})

const FirstNameLine = new ProfileLine({
    title: "Имя",
    type: "text",
    name: "first_name",
    value: "Douglas"
})

const LastNameLine = new ProfileLine({
    title: "Фамилия",
    type: "text",
    name: "last_name",
    value: "Adams"
})

const DisplayNameLine = new ProfileLine({
    title: "Имя в чате",
    type: "text",
    name: "display_name",
    value: "Doug"
})

const PhoneLine = new ProfileLine({
    title: "Телефон",
    type: "tel",
    name: "phone",
    value: "+42434445"
})

const SidebarButton = new Button({
    childElement: new Img({
        attrs:{
            src: "/src/assets/back_button.svg",
            alt: "Back button"
        }
    }),
    attrs: {
        class: "back-button",
    },
    events: {
        click: _event => {
            location.href='/index.html'
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

const ProfileLayout = new Profile({
    sidebarButton: SidebarButton,
    profilePictureSrc: "/src/assets/undefinedPhoto.jpg",
    displayName: "Doug",
    profileLines: [EmailLine, LoginLine, FirstNameLine, LastNameLine, DisplayNameLine, PhoneLine],
    editDataButton: EditDataButton,
    editPasswordButton: EditPasswordButton,
    exitButton: ExitButton

})


const ProfilePage = new Page({
    pageLayout: ProfileLayout,
});

ProfilePage.mountElement("body");
