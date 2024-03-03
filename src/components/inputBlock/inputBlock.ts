import Block, {Props}  from "../block/block";
import InputBlockTemplate from "./inputBlock.hbs?raw";

class InputBlock extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, InputBlockTemplate);
    }
  
    /*render() {
    
    }*/
};

export default InputBlock;
