import Block from "../block/block";
import MixedComponentTemplate from "./MixedComponent.hbs?raw";

class MixedComponent extends Block {
    constructor(props) {
          // Создаём враппер дом-элемент button
      super("div", props, MixedComponentTemplate);
    }
  
    /*render() {
    
    }*/
};

export default MixedComponent;
