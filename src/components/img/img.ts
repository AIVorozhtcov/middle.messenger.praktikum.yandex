import Block, {Props}  from "../block/block";
import ImgTemplate from "./img.hbs?raw";

class Img extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("img", props, ImgTemplate);
      
    }

  
    /*render() {
    
    }*/
};

export default Img;
