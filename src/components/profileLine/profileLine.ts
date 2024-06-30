import Block, {Props}  from "../block/block";
import ProfileLineTemplate from "./profileLine.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";
import { ProfileEvents } from "../../pages/profile/profile";
import { ProfileEventBus } from "../../pages/profile/profile";
import { AppState } from "../../utils/store";
import { StoreEvents } from "../../utils/store";
import store from "../../utils/store";

type UserProperty = 'first_name' | 'second_name' | 'display_name' | 'login' | 'email' | 'phone';


class ProfileLine extends Block {
    private _userProperty: UserProperty;

    constructor(props: Props, userProperty: UserProperty) {
      super("div", props, ProfileLineTemplate);
      this._userProperty = userProperty; 
      this.setProps({
        attrs:{
            class: "profile-line"
        },
        isEditing: false});
      const inputElement = this.children.inputChild.element as HTMLInputElement; 
      const self = this;
      this.children.inputChild.setProps({ 
        attrs:{
            class: "profile-right-text",
            style: "pointer-events: none;"
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
      ProfileEventBus.on(ProfileEvents.EditingSwitch, () =>{
        if (this.children.inputChild.props.attrs?.style){
            this.children.inputChild.setProps({
                attrs:{  
                    style: null                  
                }
            })
        } else {
            this.children.inputChild.setProps({
                attrs:{
                    style: "pointer-events: none;"
                }
            })
        }
        
      })
      store.on(StoreEvents.Updated, () => {
        const userValue = (store.getState().user as any)[this._userProperty];
        this.children.inputChild.setProps({
            attrs:{                    
                value: userValue
            }
        });
      });
    }
    

  
    
};


export default ProfileLine;
