import Block, {Props}  from "../block/block";
import InputBlockTemplate from "./inputBlock.hbs?raw";

class InputBlock extends Block {
    constructor(props: Props) {
      super("div", props, InputBlockTemplate);
      
      
    }

    
  
};

export default InputBlock;
