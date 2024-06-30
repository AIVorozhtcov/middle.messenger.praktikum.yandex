import Block, {Props} from "../../components/block/block";
import ChatsTemplate from "./chats.hbs?raw";
import Page from "../../components/page/page";
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


const ChatsRouter = new Router('#app');
const UserControllerInstance = new UserController;
const ChatsControllerInstance = new ChatsController;
if (await UserControllerInstance.checkUserLoggedIn()){        
    await ChatsControllerInstance.getChats();
}

function mapChats(state: AppState) {
    
    return {
        sidebarChats: state.chats?.map(chat => new Chat({
            id: chat.chat_id,
            chatName: chat.target_display_name,
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


const SearchBar = new Input({
    attrs:{
        type: "text",
        id: "search_bar",
        name: "search_bar",
        placeholder: "Создать чат с пользователем"
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
            ChatsRouter.go('/profile')
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
    
    }, ()=>{});

const SearchSection = new SearchBlock({
    searchButton: SearchButton,
    searchBar: SearchBar,
    profileButton: ProfileButton,
    searchPopup: SearchPopup,
    attrs:{
        class: "search-section"
    }
})

const ConnectedMessageBlock = connect(MessageBlock, mapMessages);

const messageSection = new ConnectedMessageBlock({
    messageForm: messageForm,
    attrs:{
        class:"message-section-container"
    }
});

const ChatsData = {
    messageSection: messageSection,
    searchSection: SearchSection
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
