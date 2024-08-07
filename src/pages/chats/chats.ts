import Block, {Props} from "../../components/block/block";
import ChatsTemplate from "./chats.hbs?raw";
import Message from "../../components/message/message";
import Chat from "../../components/chat/chat";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Img from "../../components/img/img";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";
import { AppState } from "../../utils/store";
import connect from "../../utils/connect";
import MessageBlock from "../../components/messageBlock/messageBlock";
import SearchBlock from "../../components/searchBlock/searchBlock";
import Popup from "../../components/popup/popup";
import Router from "../../utils/router";
import UserController from "../../controllers/userController";
import ChatsController from "../../controllers/chatsController";
import { CreateChatInterface } from "../../api/chats/chats.types";
import SearchResult from "../../components/searchResult/searchResult";
import Chatbar from "../../components/chatbar/chatBar";


const ChatsRouter = new Router('#app');
const UserControllerInstance = new UserController();
const ChatsControllerInstance = new ChatsController();

async function initialize() {
    if (await UserControllerInstance.checkUserLoggedIn()) {
      await ChatsControllerInstance.getChats();
    }
  }
  
initialize();

function mapChats(state: AppState) {
    
    return {
        sidebarChats: state.chats?.map(chat => new Chat({
            id: chat.chat_id,
            chatName: chat.title,
            chatText: chat.last_message? chat.last_message.content : "Напишите первое сообщение",
            avatar: chat.avatar? chat.avatar : "/assets/empty_profile.png",
            unreadMessage: chat.unread_count,
            targetAvatar: chat.last_message? chat.last_message.user_avatar : null,
            attrs: {
                class: "chat-item"
            }
        }))
    };
}

function mapMessages(state: AppState) {
    return {
        messageElements: state.messages?.map(message => new Message({
            id: message.id,
            time: message.time,
            user_id: message.user_id,
            content: message.content,
            my_message: message.my_message,
        })),
        test: state.messages? state.messages[state.messages.length - 1].time : "well"
    }
}

const AddChatForm = new Form<CreateChatInterface>({
    inputs: [new CardInputBlock({
        inputChild: new Input({
            attrs:{
                type: "text",
                id: "chat_name",
                name: "title",
                placeholder: "Введите название чата"
            }
        }),
        inputTitle: "Название чата",}),
        ],
    submitText: "Создать",      
}, ChatsControllerInstance.createChat);

const AddChatPopup = new Popup({
    popupChild: AddChatForm,
})

const AddChatButton = new Button({
    childElement: new Img({
        attrs:{
            src: "/assets/plus_button.svg",
            alt: "add chat",            
            class: "add-chat-icon",
        }
    }),
    attrs: {
        class: "add-chat-button"
    },
    events:{
        click: (_event: Event) => {
            _event.preventDefault();
            AddChatPopup.appear();
        }
    }
});

const SearchButton = new Button({
    childElement: new Img({
        attrs:{
            src: "/assets/search_button.svg",
            alt: "Search button",            
            class: "search-icon",
        }
    }),
    attrs: {
        class: "search-button"
    }
});

const SearchPopup = new Popup({
})


function mapElementVisibility(state: AppState){
    return {
        attrs:{
            style: state.currentChat? "" : "display: none"
        }
    }
}

const ConnectedButton = connect(Button, mapElementVisibility);

const RemoveUsersButton = new ConnectedButton({
    childElement: new Img({
        attrs:{
            src: "/assets/more_button.svg",
            alt: "remove users",            
            class: "remove-users-icon",
        }
    })
});


function mapChatbar(state: AppState) {
    return {
        chatAvatar: new Img({
            attrs:{
                src: state.currentChat?.avatar,
                alt: "Chat avatar",
                class: state.currentChat?.avatar? "profile-icon" : "hidden"
            }
        }),
        chatName: state.currentChat?.name? state.currentChat.name : "",        
        removeUsersPopup: new Popup({
            popupChild: state.currentChatUsers?.map(user => new SearchResult({
                id: user.id,
                login: user.login,
                display_name: user.display_name
            }, ChatsControllerInstance.removeUserFromChat))
        }, RemoveUsersButton)
    }
}


const ConnectedChatBar = connect(Chatbar, mapChatbar)


const SearchBar = new Input({
    attrs:{
        type: "text",
        id: "search_bar",
        name: "search_bar",
        placeholder: "Добавить пользователя в чат"
    }
})

const ProfileButton = new Button({
    childElement: new Img({
        attrs:{
            src: "/assets/settings_button.svg",
            alt: "Go to profile",
            class: "profile-icon"
        }
    }),
    attrs: {
        class: "profile-button",
    },
    events: {
        click: (_event: Event) => {
            _event.preventDefault();
            ChatsRouter.go('/settings')
        }
    },    
})

const messageForm= new Form({
    inputs: [new CardInputBlock({
        inputChild: new Input({
            attrs:{
                type: "text",
                id: "message",
                name: "chat_message",
                placeholder: "Введите сообщение"
            }
        }),
        inputTitle: "",}),
        ],
    submitText: "Отправить",   
    
    }, () => {});


const ConnectedSearchBlock = connect(SearchBlock, mapElementVisibility); 

const SearchSection = new ConnectedSearchBlock({
    searchButton: SearchButton,
    searchBar: SearchBar,
    searchPopup: SearchPopup,
    attrs: {
      class: "search-section"
    }
  }, ChatsControllerInstance.addUserToChat);

const ConnectedMessageBlock = connect(MessageBlock, mapMessages);

const messageSection = new ConnectedMessageBlock({
    messageForm: messageForm,
    attrs:{
        class:"message-section-container"
    }
});


const CurrentChatBar = new ConnectedChatBar({
    searchSection: SearchSection,
    removeUsersButton: RemoveUsersButton,
    profileButton: ProfileButton
})


const ChatsData = {
    messageSection: messageSection,
    chatbar: CurrentChatBar,
    addChatButton: AddChatButton,
    addChatPopup: AddChatPopup
};

class Chats extends Block {
    constructor(props: Props) {
      super("main", props, ChatsTemplate); 
      this._checkSignedIn();
    }

    private async _checkSignedIn(){
        if (await UserControllerInstance.checkUserLoggedIn()){
            await ChatsControllerInstance.getChats();
            this.setProps(ChatsData)
            this.setProps({
              attrs:{
                class: "chats-page"
              }
            })
        } else {
            ChatsRouter.go('/login')
        }
    }
  
};


export default connect(Chats, mapChats);
