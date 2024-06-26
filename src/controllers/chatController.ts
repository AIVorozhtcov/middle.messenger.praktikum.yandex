import ChatAPI from "../api/chatApi";
import store from "../utils/store";
import UserController from "./userController";
import ChatsControler from "./chatsController";

const chatApiInstance = new ChatAPI;
const userControllerInstance = new UserController;
const chatsControllerInstance = new ChatsControler;

class ChatController {

    private _chatSocket: WebSocket;

    async getFirstChat(){
        const Chats = await chatsControllerInstance.getChats();
        return Chats[0]
    }

    async connect(){
        const chatId = (await this.getFirstChat()).id;
        const userID = (await userControllerInstance.getUserInfo()).id;
        const wsToken = await JSON.parse(await chatApiInstance.getWsToken(chatId)).token;
        this._chatSocket = await chatApiInstance.connect(chatId, userID, wsToken)
        this._chatSocket.addEventListener('open', () => {
            console.log('Соединение установлено');
          
            this._chatSocket.send(JSON.stringify({
                content: 'Connected',
                type: 'message',
            }));
        });
        this._chatSocket.addEventListener('close', (event: any) => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }
          
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });

    }

    sendMessage(message: string){
        this._chatSocket.send(JSON.stringify({
            content: message,
            type: 'message',
          }));
    }
}

export default ChatController
