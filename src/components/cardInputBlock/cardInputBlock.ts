import Block, {Props}  from "../block/block";
import InputBlockTemplate from "../inputBlock/inputBlock.hbs?raw";



class CardInputBlock extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, InputBlockTemplate);
      this.children.inputChild.setProps({
        attrs:{
            class: "card-input-field"
        }
      });
      const inputElement = this.children.inputChild.element as HTMLInputElement;      
      this.setProps({
        labelClass: "card-input-title",
        inputId: inputElement.id,
        //inputClass: "card-input-field",
        attrs:{
            class: "card-input-container"
        }
    
      })
    }
  
    /*render() {
    
    }*/
};

export default CardInputBlock;
