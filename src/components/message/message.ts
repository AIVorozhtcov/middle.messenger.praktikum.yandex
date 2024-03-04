import Block, {Props}  from "../block/block";
import MessageTemplate from "./message.hbs?raw";

class Message extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, MessageTemplate);
      
    }

  
    /*render() {
    
    }*/
};

export default Message;
