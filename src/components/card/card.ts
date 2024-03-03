import Block, {Props}  from "../block/block";
import CardTemplate from "./card.hbs?raw";

class Card extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, CardTemplate);
      this.setProps({attrs:{
        class: "card-container"
      }});
    }

  
    /*render() {
    
    }*/
};

export default Card;
