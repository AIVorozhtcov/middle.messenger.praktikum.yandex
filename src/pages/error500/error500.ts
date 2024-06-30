import Block, {Props} from "../../components/block/block";
import Error500Template from "./error500.hbs?raw";
import Hyperlink from "../../components/hyperlink/hyperlink";


const MessengerHyperlink = new Hyperlink({    
  destination: "/messenger",
  hrefText: "Назад к чатам",
  attrs: {
    class: 'error-retreat'
  }
})

class Error500 extends Block {
    constructor(props: Props) {
          
      super("main", props, Error500Template);
      this.setProps({        
        hyperlink: MessengerHyperlink,
        attrs:{
          class: "error-canvas"
      }});
    }  
};

const error500Layout = new Error500({});



export default Error500
