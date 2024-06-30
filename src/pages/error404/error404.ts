import Block, {Props} from "../../components/block/block";
import Error404Template from "./error404.hbs?raw";
import Hyperlink from "../../components/hyperlink/hyperlink";


const MessengerHyperlink = new Hyperlink({    
  destination: "/messenger",
  hrefText: "Назад к чатам",
  attrs: {
    class: 'error-retreat'
  }
})

class Error404 extends Block {
    constructor(props: Props) {
          
      super("main", props, Error404Template);
      this.setProps({
        hyperlink: MessengerHyperlink,
        attrs:{
          class: "error-canvas"
      }});
    }
  
};

const error404Layout = new Error404({});


export default Error404
