import Block, {Props} from "../../components/block/block";
import Error500Template from "./error500.hbs?raw";
import Page from "../../components/page/page";

class Error500 extends Block {
    constructor(props: Props) {
          
      super("div", props, Error500Template);
      this.setProps({attrs:{
        class: "error-canvas"
      }});
    }  
};

const error500Layout = new Error500({});

const error500Page = new Page({});

error500Page.setProps({pageLayout: error500Layout});

error500Page.mountElement("body");

