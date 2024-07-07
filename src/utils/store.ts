import EventBus from "./eventBus";
import { UserInfoInterface } from "../api/user/user.types";
import {ChatInterface, CurrentChatInterface} from "../api/chat/chat.types";
import { MessageInterface } from "../api/messages/messages.types";

export type AppState = {
    user: null | UserInfoInterface;
    chats: null | ChatInterface[];
    currentChat: null | CurrentChatInterface;
    currentChatId: null | string;
    //chatSocket: WebSocket | null;
    messages: MessageInterface[] | null;
    currentChatUsers: UserInfoInterface[] | null;
};

export enum StoreEvents {
    Updated = 'updated',
}


const initState: AppState = {
    user: null,
    chats: null,
    currentChatId: null,
    currentChat: null,
    messages: null, 
    currentChatUsers: null
  };
  
  class Store extends EventBus {

    
    private state: AppState;

    constructor(defaultState: AppState) {        
        super();
        this.on(StoreEvents.Updated, () => {
            });
        this.state = defaultState;
        this.set(defaultState);
      }

    public getState() {
        return this.state;
    }
    

    public set(newState: Record<string, any>): void{
        this.state = { ...this.state, ...newState };  
        this.emit(StoreEvents.Updated);
    };
  }
  
  export default new Store(initState); 
