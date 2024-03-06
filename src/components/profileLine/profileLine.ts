import Block, {Props}  from "../block/block";
import ProfileLineTemplate from "./profileLine.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";

class ProfileLine extends Block {
    constructor(props: Props) {
      super("div", props, ProfileLineTemplate);
      this.setProps({attrs:{
        class: "profile-line"
      }});
      const inputElement = this.children.inputChild.element as HTMLInputElement; 
      const self = this;
      this.children.inputChild.setProps({ 
        attrs:{
            class: "profile-right-text",
        },
        events:{
            blur: (_event: Event) => {
                
                if (!validateInput(inputElement.name as ValidationRule, inputElement.value)){
                    self.setProps({
                        attrs:{
                            class: "profile-line error-mode"
                        }
                    })
                } else {
                    self.setProps({
                        attrs:{
                            class: "profile-line"
                        }
                    })
                }
                
            }
        }
      })
    }
    

  
    
};

export default ProfileLine;
