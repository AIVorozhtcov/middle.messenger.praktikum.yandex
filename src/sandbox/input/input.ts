import Block, {Props}  from "../block/block";
import InputTemplate from "./input.hbs?raw";

class Input extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, InputTemplate);
    }
  
    /*render() {
    
    }*/
};

export default Input;
