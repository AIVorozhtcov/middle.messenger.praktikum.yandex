import Block, {Props}  from "../block/block";
import CardTemplate from "./card.hbs?raw";


class Card extends Block {
    constructor(props: Props) {
        super("div", props, CardTemplate);
        this.setProps({attrs:{
            class: "card-container"
        }});
        
    }

    

  
};

export default Card;
