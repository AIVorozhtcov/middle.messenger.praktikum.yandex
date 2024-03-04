import Block, {Props}  from "../block/block";
import InputTemplate from "./input.hbs?raw";
import validateInput, {ValidationRule} from "../../utils/validation";

class Input extends Block {
    constructor(props: Props) {
      super("input", props, InputTemplate);

      this.setProps({        
        events:{
            blur: (_event: Event) => {
                const inputElement = this.element as HTMLInputElement;
                if (!inputElement) return; 
                validateInput(inputElement.name as ValidationRule, inputElement.value);
                
            }
        }
      })
    }
  
};

export default Input;
