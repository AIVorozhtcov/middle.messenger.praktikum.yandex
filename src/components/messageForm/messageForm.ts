import Block, {Props}  from "../block/block";
import MessageFormTemplate from "./messageForm.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";


class MessageForm extends Block {
    constructor(props: Props) {
        super("div", props, MessageFormTemplate);
        
        
    }

    

  
};

export default MessageForm;
