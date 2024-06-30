import ChatAPI from "../api/chat/chatApi";
import store from "../utils/store";
import UserController from "./userController";
import MessagesAPI from "../api/messages/messagesApi";

import { MessageInterface } from "../api/messages/messages.types";

const ChatApiInstance = new ChatAPI;
const MessageApiInstance = new MessagesAPI;
const UserControllerInstance = new UserController;

class ChatController {
    
    static __instance: ChatController | undefined;
    private scrollToBottom: () => void;

    constructor() {
        if (ChatController.__instance) {
            return ChatController.__instance;
        }

        ChatController.__instance = this;
    }

    private _chatSocket: WebSocket;
    private _offsetCounter: number = 0;

   

    async connectToChat(chat_id: number){
        const userID = (await UserControllerInstance.getUserInfo()).id;
        const wsToken = await JSON.parse(await ChatApiInstance.getWsToken(chat_id)).token;        
        this._chatSocket = await ChatApiInstance.connect(chat_id, userID, wsToken)
        this._chatSocket.addEventListener('open', () => {
            
            this.getOldMessages();
            

        });
        this._chatSocket.addEventListener('close', (event: any) => {
            clearInterval(pingInterval);
            this._offsetCounter = 0;
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }
          
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });
        this._chatSocket.addEventListener('message', (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
                const reversedMessages = data.reverse();
                const filteredMessages = this.filterMessages(reversedMessages);
                if (filteredMessages.length > 0) {
                    const currentMessages = store.getState().messages || [];
                    store.set({ messages: [...filteredMessages, ...currentMessages] });                    
                    if (this.scrollToBottom) this.scrollToBottom();
                }
                if (filteredMessages.length == 20){
                        this._offsetCounter+=20;
                        this.getOldMessages();
                }                
            } else {
                const message = this.mapMessage(data);
                if (message) {
                    const currentMessages = store.getState().messages || [];
                    store.set({ messages: [...currentMessages, message] });                    
                    if (this.scrollToBottom) this.scrollToBottom();
                }
            }
        });
        if (store.getState().chatSocket){
            store.getState().chatSocket?.close();
        }
        let pingInterval = setInterval(() => {
            this._chatSocket.send(JSON.stringify({ type: 'ping' }));
        }, 30000);
        store.set({
            messages: null
        });
        store.set({
            currentChatId: chat_id,
        })
        store.set({
            socket: this._chatSocket
        })

    }

    getOldMessages(){
        MessageApiInstance.getMessages(this._chatSocket, this._offsetCounter.toString());
    }

    sendMessage(message: string){
        MessageApiInstance.sendMessage(this._chatSocket, message);
    }

    setScrollToBottom(scrollFunction: () => void) {
        this.scrollToBottom = scrollFunction;
    }

    private mapMessage(data: any): MessageInterface | null {
        if (data.type === 'message') {
            return {
                id: data.id,
                time: data.time,
                user_id: data.user_id,
                content: data.content,
                my_message: data.user_id == store.getState().user?.id
            };
        }
        return null;
    }

    private filterMessages(data: any[]): MessageInterface[] {
        return data
            .filter(message => message.type === 'message')
            .map(message => this.mapMessage(message)) as MessageInterface[];
    }
}

export default ChatController
