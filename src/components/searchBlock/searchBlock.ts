import Block, {Props} from "../block/block";
import SearchBlockTemplate from "./searchBlock.hbs?raw";
import UserController from "../../controllers/userController";
import SearchResult from "../searchResult/searchResult";

const UserControllerInstance = new UserController;

class SearchBlock extends Block {


    constructor(props: Props) {
      super("div", props, SearchBlockTemplate);
      this.setProps({
        class: "search-blocksade"
      })
      this.children.searchButton.setProps({
        events: {
            click: async (_event: Event) => {
                _event.preventDefault();
                this.children.searchPopup.setProps({
                    attrs:{
                        class: "popup-overlay show",
                    }
                })
                const searchTextElement = this.children.searchBar.element as HTMLInputElement;
                const searchText = searchTextElement.value;
                if (searchText){
                    const foundUsers = await UserControllerInstance.searchUsers(searchText);
                    const mappedUsers = foundUsers.map(user => new SearchResult({
                        id: user.id,
                        login: user.login,
                        display_name: user.display_name
                    }));
                    this.children.searchPopup.setProps({
                        popupChild: mappedUsers,
                        attrs:{
                            class: "popup-overlay show",
                        }
                    })
                    
                }
            }
        }
        })

      
    }
  
};


export default SearchBlock
