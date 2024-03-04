import Block, {Props}  from "../block/block";
import CardTemplate from "./card.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";


class Card extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
        super("div", props, CardTemplate);
        this.setProps({attrs:{
            class: "card-container"
        }});
        document.addEventListener('DOMContentLoaded', (event) => {
            const formElement = document.querySelector("form");
            console.log(formElement);
            formElement?.addEventListener('submit', (event: Event) => {
                event.preventDefault(); 
                let formObject: Record<string, string> = {};
                const inputs = this.element?.querySelectorAll('input');
                let isValidForm = true;
                
                inputs?.forEach(input => {
                const isValid = validateInput(input.name as ValidationRule, input.value);
                if (!isValid) {
                    isValidForm = false;
                }
                formObject[input.name] = input.value;
                });
                
                if (isValidForm) {
                console.log(formObject)
                }
        });
        });
        
    }

    

  
    /*render() {
    
    }*/
};

export default Card;
