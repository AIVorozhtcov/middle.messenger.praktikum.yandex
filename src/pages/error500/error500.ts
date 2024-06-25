import Block, {Props} from "../../components/block/block";
import Error500Template from "./error500.hbs?raw";
import Page from "../../components/page/page";

class Error500 extends Block {
    constructor(props: Props) {
          
      super("main", props, Error500Template);
      this.setProps({attrs:{
        class: "error-canvas"
      }});
    }  
};

const error500Layout = new Error500({});



export default Error500
