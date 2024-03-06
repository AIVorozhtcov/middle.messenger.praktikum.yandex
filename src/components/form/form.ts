import Block, {Props}  from "../block/block";
import FormTemplate from "./form.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";


class Form extends Block {
    constructor(props: Props) {
        super("form", props, FormTemplate);  
        this.setProps({
            events:{
                submit: (event: Event) => {
                    event.preventDefault(); 
                    let formObject: Record<string, string> = {};
                    let isValidForm = true;                
                    
                    Object.values(this.lists.inputs).forEach(input => {
                    const inputElement = input.children.inputChild.element as HTMLInputElement;   
                    const isValid = validateInput(inputElement.name as ValidationRule, inputElement.value);
                    if (!isValid) {
                        isValidForm = false;
                        input.setProps({
                            validationFailed: true,
                        });

                    }
                    formObject[inputElement.name] = inputElement.value;
                    });
                    
                    if (isValidForm) {
                        console.log(formObject)
                    }
                }
            }
        })      
        
    }

    

  
};

export default Form;
