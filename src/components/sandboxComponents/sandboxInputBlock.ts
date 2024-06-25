import Block, {Props}  from "../block/block";
import SandboxInputBlockTemplate from "./sandboxInputBlock.hbs?raw";

class SandboxInputBlock extends Block {
    constructor(props: Props) {
      super("div", props, SandboxInputBlockTemplate);
      
      
    }

    
  
};

export default SandboxInputBlock;
