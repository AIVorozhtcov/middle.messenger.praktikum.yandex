import Block, {Props} from "../../components/block/block";
import ProfileLine from "../../components/profileLine/profileLine";
import Img from "../../components/img/img";
import Span from "../../components/span/span";
import Button from "../../components/button/button";
import ProfileTemplate from "./profile.hbs?raw";
import Input from "../../components/input/input";
import EventBus from "../../utils/eventBus";
import UserController from "../../controllers/userController";
import Popup from "../../components/popup/popup";
import Form from "../../components/form/form";
import AuthController from "../../controllers/authController";

import store, { AppState, StoreEvents } from "../../utils/store";

import validateInput, {ValidationRule} from "../../utils/validation";
import ProfilePageTemplate from "./profilePage.hbs?raw";

import Router from "../../utils/router";
import isEqual from "../../utils/isEqual";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import { PasswordChangeInterface } from "../../api/user/user.types";

export enum ProfileEvents {
    EditingSwitch = 'editingSwitched'
}

const ProfileEventBus = new EventBus();

const UserControllerInstance = new UserController();

async function initialize() {
    if (await UserControllerInstance.checkUserLoggedIn()){    
        await UserControllerInstance.getUserInfo();
    }
  }
  
initialize();



const AuthControllerInstance = new AuthController();


const ProfileRouter = new Router('#app');

export {ProfileEventBus};



const AvatarInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 0,
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
    submitText: "Обновить аватар",
    attrs:{
        class: "login-form",
    }
}, () => {});

const AvatarPopup = new Popup({
    popupChild: AvatarForm
})



const PasswordOldInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 1,
            type: "password",
            name: "old_password",  
        },      
    }),
    inputTitle: "Старый пароль",
});

const PasswordNewInput = new CardInputBlock({
    inputChild: new Input({
        attrs:{                
            id: 2,
            type: "password",
            name: "new_password",  
        },      
    }),
    inputTitle: "Новый пароль",
});

const PasswordForm = new Form<PasswordChangeInterface>({
    title:"Вход",
    inputs: [PasswordOldInput, PasswordNewInput],
    submitClass: "login-submit-button",
    submitText: "Поменять пароль",
    attrs:{
        class: "login-form",
    }
}, UserControllerInstance.changePassword)

const PasswordPopup = new Popup({
    popupChild: PasswordForm
})


const EmailLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "email",
            name: "email",              
            value: store.getState().user?.email
        },      
    }),
    title: "Почта",
}, "email")

const LoginLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "login",            
            value: store.getState().user?.login
        },      
    }),
    title: "Логин",
}, "login")

const FirstNameLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "first_name",          
            value: store.getState().user?.first_name
        },      
    }),    
    title: "Имя"
}, "first_name")

const LastNameLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "second_name", 
            value: store.getState().user?.second_name
        },      
    }),
    title: "Фамилия"
}, "second_name")

const DisplayNameLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "text",
            name: "display_name",
            value: store.getState().user?.display_name
        },      
    }),
    title: "Имя в чате"
}, "display_name")

const PhoneLine = new ProfileLine({
    inputChild: new Input({
        attrs:{      
            type: "tel",
            name: "phone",        
            value: store.getState().user?.phone
        },      
    }),    
    title: "Телефон"
}, "phone")

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
            ProfileRouter.go('/messenger');

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
    events:{
        click:() => {
            ProfileEventBus.emit(ProfileEvents.EditingSwitch)
        }
    }
})

const SaveDataButton = new Button({
    childElement: new Span({
        text: "Сохранить данные",
        attrs:{
            class: "options-left-text"
        }
    }),
    attrs: {
        class: "profile-line editing-option",
    }
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
    events:{
        click:(_event: Event) => {
            _event.preventDefault();
            PasswordPopup.setProps({
                attrs:{
                    class: "popup-overlay show",
                }
            })
        }
    }
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
    events: {
        click: (_event: Event) => {
            _event.preventDefault();
            AuthControllerInstance.logoutUser();
            ProfileRouter.go('/login');            
        }
    }
})

const ProfileData = {    
    sidebarButton: SidebarButton,
    profilePictureSrc: store.getState().user?.avatar ?store.getState().user?.avatar : "/assets/empty_profile.png",
    displayName: store.getState().user?.display_name as string,
    profileLines: [EmailLine, LoginLine, FirstNameLine, LastNameLine, DisplayNameLine, PhoneLine],
    editDataButton: EditDataButton,
    saveDataButton: SaveDataButton,
    editPasswordButton: EditPasswordButton,
    exitButton: ExitButton,
    passwordPopup: PasswordPopup,
    avatarPopup: AvatarPopup
}


function mapDisplayNameAndAvatar(state: AppState) {
    return {
        displayName: state.user?.display_name,
        avatarButton: new Button({
            childElement: new Img({
                attrs:{
                    src: state.user?.avatar ?state.user?.avatar : "/assets/empty_profile.png",
                    alt: "Profile picture"
                }
            }),
            attrs: {
                class: "image-circle",
            },
            events: {
                click: (_event: Event) => {
                    _event.preventDefault();
                    AvatarPopup.setProps({
                        attrs:{
                            class: "popup-overlay show",
                        }
                    })
                }
            },    
        })
    };
}
/* eslint-disable max-classes-per-file */
class Profile extends Block{
    constructor(props: Props) {
    super("div", props, ProfileTemplate);
    this.setProps(ProfileData);
    this.setProps({
        isEditing: false
    });
    ProfileEventBus.on(ProfileEvents.EditingSwitch, () => {
        this.setProps({
            isEditing: !this.props.isEditing
        })
    });
    let state = mapDisplayNameAndAvatar(store.getState());
    store.on(StoreEvents.Updated, () => {
        const newState = mapDisplayNameAndAvatar(store.getState());
        if (newState&&!isEqual(state, newState)) {
            this.setProps({...newState});            
            state = newState;
        }
        });
    this.children.saveDataButton.setProps({
        events:{
            click: (event: Event) => {
                event.preventDefault(); 
                let formObject: Record<string, string> = {};
                let isValidForm = true;                
                
                
                Object.values(this.lists.profileLines).forEach(input => {
                    
                
                    const inputElement = input.children.inputChild.element as HTMLInputElement;   
                    const isValid = validateInput(inputElement.name as ValidationRule, inputElement.value);
                    if (!isValid) {
                        isValidForm = false;
                        input.setProps({
                            validationFailed: true,
                        });

                    }
                    formObject[inputElement.name] = inputElement.value;
                });
                
                if (isValidForm) {
                    UserControllerInstance.updateUserInfo(formObject as any)                    
                    ProfileEventBus.emit(ProfileEvents.EditingSwitch)                    
                }
            }
        }
    })    
  }
};


const ProfileLayout = new Profile(ProfileData)
/* eslint-disable max-classes-per-file */
class ProfilePage extends Block{
    constructor(){
        super('main', {}, ProfilePageTemplate);
        this._checkSignedIn();
        
    }

    private async _checkSignedIn(){
        if (await UserControllerInstance.checkUserLoggedIn()){
            await UserControllerInstance.getUserInfo();
            this.setProps({
                profileLayout: ProfileLayout,
                attrs:{
                    class:"profile-page",
                }
            })
        } else {
            ProfileRouter.go('/login')
        }
    }
    
}





export default ProfilePage
