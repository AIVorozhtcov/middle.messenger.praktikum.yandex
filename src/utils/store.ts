import EventBus from "./eventBus";

import { AppState } from "./connect";

export enum StoreEvents {
    Updated = 'updated',
}


const initState: AppState = {
    user: null
    /*chats: null,
    currentChatId: null,
    chatSocket: null,
    messages: null,
    currentChatUsers: null,*/
  };
  
  class Store<State extends Record<string, any>> extends EventBus {

    
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
