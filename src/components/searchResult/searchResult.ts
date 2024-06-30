import Block, {Props}  from "../block/block";
import SearchResultTemplate from "./searchResult.hbs?raw";
import ChatsController from "../../controllers/chatsController";

const ChatsControllerInstance = new ChatsController();


class SearchResult extends Block {
    constructor(props: Props) {
      super("div", props, SearchResultTemplate);
      this.setProps({
        events:{
            click: () => {
                ChatsControllerInstance.createChat(this.props.login as string, this.props.id as number)
            }
        }
      })
      
    }
    

  
    
};


export default SearchResult;
