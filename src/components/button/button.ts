import Block, {Props} from "../block/block";
import ButtonTemplate from "./button.hbs?raw";

class Button extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("button", props, ButtonTemplate);
    }
  
    /*render() {
    
    }*/
};

export default Button;
