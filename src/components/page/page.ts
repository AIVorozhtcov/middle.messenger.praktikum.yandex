import Block, {Props} from "../block/block";
import PageTemplate from "./page.hbs?raw";

class Page extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
        super("main", props, PageTemplate);
    }
  
    /*render() {
    
    }*/
};

export default Page;
