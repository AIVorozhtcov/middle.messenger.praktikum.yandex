import Block, {Props}  from "../block/block";
import MixedComponentTemplate from "./MixedComponent.hbs?raw";

class MixedComponent extends Block {
    constructor(props: Props) {
      super("div", props, MixedComponentTemplate);
    }
  
};

export default MixedComponent;
