import Block, {Props}  from "../block/block";
import ChatTemplate from "./chat.hbs?raw";

class Chat extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, ChatTemplate);
      
    }

  
    /*render() {
    
    }*/
};

export default Chat;
