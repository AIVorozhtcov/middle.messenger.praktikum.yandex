import Block, {Props}  from "../block/block";
import SpanTemplate from "./span.hbs?raw";

class Span extends Block {
    constructor(props: Props) {
      super("span", props, SpanTemplate);
      
    }

  
};

export default Span;
