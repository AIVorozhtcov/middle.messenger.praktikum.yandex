import Block, {Props} from "../block/block";
import ButtonTemplate from "./button.hbs?raw";

class Button extends Block {
    constructor(props: Props) {
      super("button", props, ButtonTemplate);
    }
  
};

export default Button;
