import HTTPTransport from '../../utils/fetch';
import { BaseAPI } from '../baseApi';


const chatHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

class ChatAPI extends BaseAPI {
    

    async connect(chatId: number, userId: number, wsToken: string){
        return new WebSocket('wss://ya-praktikum.tech/ws/chats/' +  userId + '/' + chatId + '/' + wsToken);
        
        
    }

    getWsToken(chatId: number){
        return chatHTTPInstance.post('/token/' + chatId, {data:{title: 'string'}}).then(xhr => {
            if (xhr.status === 200) {
                return xhr.responseText;
            }
            throw new Error(`Failed to get ws token: ${xhr.status}`);
          }).catch(error => {
                console.error(error);
                throw error;
            });
    }

    
}

export default ChatAPI
