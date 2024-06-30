import Block, {Props}  from "../block/block";
import ImgTemplate from "./img.hbs?raw";

class Img extends Block {
    constructor(props: Props) {
      super("img", props, ImgTemplate);
      
    }

  
};

export default Img;
