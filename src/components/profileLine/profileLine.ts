import Block, {Props}  from "../block/block";
import ProfileLineTemplate from "./profileLine.hbs?raw";

class ProfileLine extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("p", props, ProfileLineTemplate);
      this.setProps({attrs:{
        class: "profile-line"
      }});
    }

  
    /*render() {
    
    }*/
};

export default ProfileLine;
