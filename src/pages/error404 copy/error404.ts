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

const error404Page = new Page({});

error404Page.setProps({pageLayout: error404Layout});

const content = error404Page.getContent();
console.log(error404Layout.getContent());
console.log(error404Page.getContent());
if (content){
    document.querySelector("body")?.appendChild(content);
}

