import HTTPTransport from '../utils/fetch';
import { BaseAPI } from './baseApi';
import { ChatInterface } from './responseInterfaces';

const chatsHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

class ChatsAPI extends BaseAPI {
    createChat(chatName: string) {
      return chatsHTTPInstance.post('/', {data:{title: chatName}}).then(xhr => {
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
        throw new Error(`Failed to create chat: ${xhr.status}`);
      });
    }


    getChats()  {
      return chatsHTTPInstance.get('/').then(xhr => {
        if (xhr.status === 200) {
            return xhr.responseText
        }
        throw new Error(`Failed to fetch chats: ${xhr.status}`);
      });
    };

    request() {
      return chatsHTTPInstance.get('/full');
  }
}

export default ChatsAPI
