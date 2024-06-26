import ChatsAPI from "../api/chatsApi";
import { ChatInterface } from "../api/responseInterfaces";

const ChatsApiInstance = new ChatsAPI

class ChatsControler{
   async getChats(){
        return JSON.parse(await ChatsApiInstance.getChats()) as ChatInterface[];
    }
}

export default ChatsControler
