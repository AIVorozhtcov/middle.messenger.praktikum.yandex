import Block, {Props}  from "../block/block";
import InputTemplate from "./input.hbs?raw";

class Input extends Block {
    constructor(props: Props) {
      super("input", props, InputTemplate);

    }
  
};

export default Input;
