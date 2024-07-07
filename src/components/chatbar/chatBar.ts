import Block, {Props}  from "../block/block";
import ChatbarTemplate from "./chatBar.hbs?raw";

class Chatbar extends Block {
    constructor(props: Props) {
      super("div", props, ChatbarTemplate);
      this.setProps({
        attrs:{
            class: "chatbar"
        }
      })
      
    }

  
};

export default Chatbar;
