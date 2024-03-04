import Block, {Props}  from "../block/block";
import MessageFormTemplate from "./messageForm.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";


class MessageForm extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
        super("div", props, MessageFormTemplate);
        
        document.addEventListener('DOMContentLoaded', (_event) => {
            const formElement = this.element?.querySelector("form");
            const messageInput = this.element?.querySelector("input");
            console.log(formElement);
            formElement?.addEventListener('submit', (event: Event) => {
                event.preventDefault(); 
                let isValid = false;
                if (messageInput){
                        
                    isValid = validateInput("message" as ValidationRule, messageInput.value);
                }
                
                
                if (isValid) {
                    console.log("Отправлено сообщение " + messageInput?.value)
                    }
                
                
        });
        });
        
    }

    

  
    /*render() {
    
    }*/
};

export default MessageForm;
