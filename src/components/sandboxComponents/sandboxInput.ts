import Block, {Props}  from "../block/block";
import SandboxInputTemplate from "./sandboxInput.hbs?raw";

class SandboxInput extends Block {
    constructor(props: Props) {
      super("input", props, SandboxInputTemplate);

    }
  
};

export default SandboxInput;
