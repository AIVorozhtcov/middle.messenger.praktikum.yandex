import Block, {Props}  from "../block/block";
import ChatTemplate from "./chat.hbs?raw";
import ChatController from "../../controllers/chatController";

const chatControllerInstance = new ChatController();

class Chat extends Block {
    constructor(props: Props) {
      super("div", props, ChatTemplate);
      this.setProps({
        events:{
          click: () => {
            chatControllerInstance.connectToChat(this.props.id as number);            
          }
        }
      })
      
    }
    

  
};


export default Chat;
