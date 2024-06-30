import Block, {Props} from "../block/block";

import HyperlinkTemplate from "./hyperlink.hbs?raw";

import Router from "../../utils/router";

const RouterInstance = new Router('#app');

class Hyperlink extends Block {
    constructor(props: Props) {
        super("a", props, HyperlinkTemplate);
        this.setProps({
            events:{
                click: (event: Event) => {
                    event.preventDefault(); 
                    RouterInstance.go(this.props.destination as string)
                }
            }
        })
        
      }
}

export default Hyperlink
