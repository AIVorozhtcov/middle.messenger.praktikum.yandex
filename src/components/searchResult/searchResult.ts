import Block, {Props}  from "../block/block";
import SearchResultTemplate from "./searchResult.hbs?raw";



class SearchResult extends Block {
    constructor(props: Props, clickFunction: Function) {
      super("div", props, SearchResultTemplate);
      this.setProps({
        events:{
            click: () => {
                clickFunction(this.props.id);
                //ChatsControllerInstance.createChat(this.props.login as string, this.props.id as number)
            }
        }
      })
      
    }
    

  
    
};


export default SearchResult;
