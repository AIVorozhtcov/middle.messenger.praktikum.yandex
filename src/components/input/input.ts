import Block, {Props}  from "../block/block";
import InputTemplate from "./input.hbs?raw";
import validateInput, {ValidationRule} from "../../utils/validation";

class Input extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("input", props, InputTemplate);

      this.setProps({        
        events:{
            blur: (event: Event) => {
                const inputElement = this.element as HTMLInputElement;
                if (!inputElement) return; 
                const isValid = validateInput(inputElement.name as ValidationRule, inputElement.value);
                
            }
        }
      })
    }
  
    /*render() {
    
    }*/
};

export default Input;
