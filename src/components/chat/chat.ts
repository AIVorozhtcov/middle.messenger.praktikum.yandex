import Block, {Props}  from "../block/block";
import ChatTemplate from "./chat.hbs?raw";
import ChatController from "../../controllers/chatController";
import ChatsController from "../../controllers/chatsController";

const chatControllerInstance = new ChatController();
const chatsControllerInstance = new ChatsController();

class Chat extends Block {
    constructor(props: Props) {
      super("div", props, ChatTemplate);
      this.setProps({
        events:{
          click: async () => {
            await chatsControllerInstance.getChatUsers(this.props.id as number);
            await chatControllerInstance.connectToChat(this.props.id as number, this.props.chatName as string, this.props.avatar as string);            
          }
        }
      })
      
    }
    

  
};


export default Chat;
