import Block, {Props}  from "../block/block";
import SpanTemplate from "./span.hbs?raw";

class Span extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("span", props, SpanTemplate);
      
    }

  
    /*render() {
    
    }*/
};

export default Span;
