import Block from "../block/block";
import ButtonTemplate from "./button.hbs?raw";

class Button extends Block {
    constructor(props) {
          // Создаём враппер дом-элемент button
      super("button", props, ButtonTemplate);
    }
  
    /*render() {
    
    }*/
};

export default Button;
