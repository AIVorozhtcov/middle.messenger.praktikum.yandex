import Block, {Props}  from "../block/block";
import InputBlockTemplate from "../inputBlock/inputBlock.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";



class CardInputBlock extends Block {
    constructor(props: Props) {
      super("div", props, InputBlockTemplate);
      this.children.inputChild.setProps({
        attrs:{
            class: "card-input-field"
        }
      });
      const inputElement = this.children.inputChild.element as HTMLInputElement;      
      this.setProps({
        labelClass: "card-input-title",
        inputId: inputElement.id,
        //inputClass: "card-input-field",
        attrs:{
            class: "card-input-container"
        }
        
    
    
      })
      const self = this;
      this.children.inputChild.setProps({        
        events:{
            blur: (_event: Event) => {
                
                if (!validateInput(inputElement.name as ValidationRule, inputElement.value)){
                    self.setProps({
                        validationFailed: true,
                    })
                } else {
                    self.setProps({
                        validationFailed: false,
                    })
                }
                
            }
        }
      })
    }
  
};

export default CardInputBlock;
