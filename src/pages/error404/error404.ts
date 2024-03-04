import Block, {Props} from "../../components/block/block";
import Error404Template from "./error404.hbs?raw";
import Page from "../../components/page/page";

class Error404 extends Block {
    constructor(props: Props) {
          // Создаём враппер дом-элемент button
      super("div", props, Error404Template);
      this.setProps({attrs:{
        class: "error-canvas"
      }});
    }
  
    /*render() {
    
    }*/
};

const error404Layout = new Error404({});

const error404Page = new Page({pageLayout: error404Layout});

error404Page.mountElement("body");
