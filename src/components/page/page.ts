import Block, {Props} from "../block/block";
import PageTemplate from "./page.hbs?raw";

//На данный момент этот компонент выполняет роль заглушки, так как на данном спринте все еще используется навигация по страницам через <a> теги

class Page extends Block {
    constructor(props: Props) {
          
        super("main", props, PageTemplate);
    }
  
};

export default Page;
