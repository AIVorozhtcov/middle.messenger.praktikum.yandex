import Block, {Props}  from "../block/block";
import MessageFormTemplate from "./messageForm.hbs?raw";


class MessageForm extends Block {
    constructor(props: Props) {
        super("div", props, MessageFormTemplate);
        
        
    }

    

  
};

export default MessageForm;
