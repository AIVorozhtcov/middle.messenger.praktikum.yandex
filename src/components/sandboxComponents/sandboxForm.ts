import Block, {Props}  from "../block/block";
import SandboxFormTemplate from "./sandboxForm.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";
import AuthAPI from "../../api/authApi";

const AuthApiInstance = new AuthAPI;

class SandboxForm extends Block {
    constructor(props: Props) {
        super("form", props, SandboxFormTemplate);  
        this.setProps({
            events:{
                submit: (event: Event) => {
                    event.preventDefault(); 
                    let formObject: Record<string, string> = {};
                    let isValidForm = true;                
                    
                    Object.values(this.lists.inputs).forEach(input => {
                    const inputElement = input.children.inputChild.element as HTMLInputElement;   
                    
                    formObject[inputElement.name] = inputElement.value;
                    });
                    
                    if (isValidForm) {
                        console.log(formObject)
                    }

                    AuthApiInstance.login(formObject);
                }
            }
        })      
        
    }

    

  
};

export default SandboxForm;
