import Block, {Props}  from "../block/block";
import ChatTemplate from "./chat.hbs?raw";

class Chat extends Block {
    constructor(props: Props) {
      super("div", props, ChatTemplate);
      
    }

  
};

export default Chat;
