import Block, {Props} from "../block/block";
import SandboxButtonTemplate from "./sandboxButton.hbs?raw";
import connect from "../../utils/connect";

import { AppState } from "../../utils/store";

class SandboxButton extends Block {
    constructor(props: Props) {
      super("button", props, SandboxButtonTemplate);
      
    }
  
};

function mapUser(state: AppState) {
    return {
        userName: state.user?.first_name
    };
}

export default connect(SandboxButton, mapUser);
