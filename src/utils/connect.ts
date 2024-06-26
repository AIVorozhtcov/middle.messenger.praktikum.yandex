import Block from "../components/block/block";
import { BlockType } from "../components/block/block";
import { Props } from "../components/block/block";
import store, {StoreEvents} from "./store";
import isEqual from "./isEqual";
import { UserInfoInterface as User } from "../api/responseInterfaces";

export type AppState = {
    user: null | User;
    /*chats: null | Chat[];
    currentChatId: null | string;
    chatSocket: ChatWebsocket | null;
    messages: Message[] | null;
    currentChatUsers: User[] | null;*/
};


function connect(Component: BlockType, mapStateToProps: (state: AppState) => {},) {
  return class extends Component {
    constructor(props: Props = {}) {
      super({...props, ...mapStateToProps(store.getState())});
      let state = mapStateToProps(store.getState());

    store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        console.log(newState);
        if (!isEqual(state, newState)) {
            this.setProps({...newState});            
            state = newState;
        }
        });
    }
  } 
} 

export default connect
