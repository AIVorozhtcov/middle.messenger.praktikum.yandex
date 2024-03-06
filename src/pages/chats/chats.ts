import Block, {Props} from "../../components/block/block";
import ChatsTemplate from "./chats.hbs?raw";
import Page from "../../components/page/page";
import Message from "../../components/message/message";
import Chat from "../../components/chat/chat";
import Form from "../../components/form/form";
import Input from "../../components/input/input";
import CardInputBlock from "../../components/cardInputBlock/cardInputBlock";

class Chats extends Block {
    constructor(props: Props) {
      super("div", props, ChatsTemplate);
      this.setProps({attrs:{
        class: "error-canvas"
      }});
    }
  
};

const messageForm= new Form({
    inputs: [new CardInputBlock({
        inputChild: new Input({
            attrs:{
                type: "text",
                id: "message",
                name: "message",
                placeholder: "Type your message here..."
            }
        }),
        inputTitle: "",}),
        ],
    submitText: "Отправить",   
    
});

const Chat1 = new Chat({
    chatName: "Chatster",
    chatText: "Testing messages!"
})

const Chat2 = new Chat({
    chatName: "Chatster",
    chatText: "Testing messages!"
})

const Chat3 = new Chat({
    chatName: "Chatster",
    chatText: "Testing messages!"
})

const Chat4 = new Chat({
    chatName: "Chatster",
    chatText: "Testing messages!"
})

const Message1 = new Message({
    text: "Привет!"
})


const Message2 = new Message({
    text: "И тебе привет!"
})

const Message3 = new Message({
    text: "Как дела?"
})

const chatsLayout = new Chats({
    sidebarChats: [Chat1, Chat2, Chat3, Chat4],
    messages: [Message1, Message2, Message3],
    messageForm: messageForm
});

const chatsPage = new Page({pageLayout: chatsLayout});

chatsPage.mountElement("body");
