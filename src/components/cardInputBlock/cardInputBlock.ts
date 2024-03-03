import Block, {Props}  from "../block/block";
import InputBlockTemplate from "../inputBlock/inputBlock.hbs?raw";

class CardInputBlock extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, InputBlockTemplate);
      this.setProps({
        labelClass: "card-input-title",
        inputClass: "card-input-field",
        attrs:{
            class: "card-input-container"
        }
      })
    }
  
    /*render() {
    
    }*/
};

export default CardInputBlock;
