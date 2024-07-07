import Block, {Props}  from "../block/block";
import ProfileLineTemplate from "./profileLine.hbs?raw";
import validateInput, { ValidationRule } from "../../utils/validation";
import { ProfileEvents, ProfileEventBus } from "../../pages/profile/profile";
import store, { StoreEvents } from "../../utils/store";

type UserProperty = 'first_name' | 'second_name' | 'display_name' | 'login' | 'email' | 'phone';


class ProfileLine extends Block {
    private _userProperty: UserProperty;
    private _isEditing: boolean;

    constructor(props: Props, userProperty: UserProperty) {
      super("div", props, ProfileLineTemplate);
      this._userProperty = userProperty; 
      this.setProps({
        attrs:{
            class: "profile-line"
        }});
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
      ProfileEventBus.on(ProfileEvents.EditingSwitch, () => {
        this._isEditing = !this._isEditing
        this.children.inputChild.setProps({ 
            attrs:{
                style: this._isEditing? null : "pointer-events: none;"
            },
          })
        
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
