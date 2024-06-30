import { BlockType } from "../components/block/block";
import { Props } from "../components/block/block";
import store, {StoreEvents} from "./store";
import isEqual from "./isEqual";
import { AppState } from "./store";



function connect(Component: BlockType, mapStateToProps: (state: AppState) => {},) {
  return class extends Component {
    constructor(props: Props = {}) {
      super({...props, ...mapStateToProps(store.getState())});
      let state = mapStateToProps(store.getState());
      

    store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
            this.setProps({...newState});            
            state = newState;
        }
        });
    }
  } 
} 

export default connect
