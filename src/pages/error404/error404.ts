import Block, {Props} from "../../components/block/block";
import Error404Template from "./error404.hbs?raw";
import Page from "../../components/page/page";

class Error404 extends Block {
    constructor(props: Props) {
          
      super("div", props, Error404Template);
      this.setProps({attrs:{
        class: "error-canvas"
      }});
    }
  
};

const error404Layout = new Error404({});

const error404Page = new Page({pageLayout: error404Layout});

error404Page.mountElement("body");
