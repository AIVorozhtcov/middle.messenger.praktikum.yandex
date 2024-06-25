import HTTPTransport from '../utils/fetch';
import { BaseAPI } from './baseApi';

import AuthAPI from './authApi';

const chatHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

const authApiInstance = new AuthAPI;

const userInfo = await authApiInstance.getUserInfo();

class ChatAPI extends BaseAPI {
    private _chatSocket: any;
    

    async connect(chatId: number){
        const wsToken = await this.getWsToken(chatId);
        this._chatSocket = new WebSocket('wss://ya-praktikum.tech/ws/chats/' +  userInfo.id + '/' + chatId + '/' + wsToken);
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

    getWsToken(chatId: number){
        return chatHTTPInstance.post('/token/' + chatId, {data:{title: 'string'}}).then(xhr => {
            if (xhr.status === 200) {
                return JSON.parse(xhr.responseText).token;
            }
            throw new Error(`Failed to get ws token: ${xhr.status}`);
          });
    }

    sendMessage(message: string){
        this._chatSocket.send(JSON.stringify({
            content: message,
            type: 'message',
          }));
    }
}

export default ChatAPI
