import Block, {Props}  from "../block/block";
import FormTemplate from "./form.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";
import UserController from "../../controllers/userController";

const UserControllerInstance = new UserController;


class Form<T> extends Block {
    constructor(props: Props, submitAction: (data: T) => void) {
        super("form", props, FormTemplate);  
        this.setProps({
            events:{
                submit: (event: Event) => {
                    event.preventDefault(); 
                    let formObject: Record<string, string> = {};
                    let isValidForm = true;                
                    
                    Object.values(this.lists.inputs).forEach(input => {
                    const inputElement = input.children.inputChild.element as HTMLInputElement;   
                    if (inputElement.name === "avatar" && inputElement.files){
                        UserControllerInstance.updateAvatar(inputElement.files[0]);
                    }
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
                        submitAction(formObject as T)
                    }
                }
            }
        })      
        
    }

    

  
};

export default Form;
