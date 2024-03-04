import Block, {Props}  from "../block/block";
import MessageTemplate from "./message.hbs?raw";

class Message extends Block {
    constructor(props: Props) {
      super("div", props, MessageTemplate);
      
    }

  
};

export default Message;
