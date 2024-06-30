import Block, {Props} from "../block/block";
import MessageBlockTemplate from "./messageBlock.hbs?raw";
import ChatController from "../../controllers/chatController";

const ChatControllerInstance = new ChatController();

class MessageBlock extends Block {
    constructor(props: Props) {
      super("div", props, MessageBlockTemplate);
      this.children.messageForm.setProps({
        events: {
            submit: (_event: Event)=>{
                _event.preventDefault();
                const messageElement = this.children.messageForm.lists.inputs[0].children.inputChild.element as HTMLInputElement;
                if (messageElement.value){
                    ChatControllerInstance.sendMessage(messageElement.value as string)
                    messageElement.value = "";
                }
            }
        }
      })
      ChatControllerInstance.setScrollToBottom(this.scrollToBottom.bind(this));
      
    }
    scrollToBottom() {
        const messageContainer = this.element?.querySelector('.message-section');
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }
  
};


export default MessageBlock
