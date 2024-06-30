import HTTPTransport from '../../utils/fetch';
import { BaseAPI } from '../baseApi';

const chatsHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

class ChatsAPI extends BaseAPI {
    createChat(chatName: string) {
      return chatsHTTPInstance.post('/', {data:{title: chatName}}).then(xhr => {
        if (xhr.status === 200) {
            return xhr.responseText;
        }
        throw new Error(`Failed to create chat: ${xhr.status}`);
      });
    }

    addUserToChat(userIds: number[], chatId: number){
      return chatsHTTPInstance.put('/users', {data:{users: userIds, chatId: chatId}}).then(xhr => {
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

    getChatUsers(chatId: number) {
      return chatsHTTPInstance.get('/' + chatId + '/users').then(xhr => {
        if (xhr.status === 200) {
            return xhr.responseText
        }
        throw new Error(`Failed to fetch chat users: ${xhr.status}`);
      });
    }
    getCommonChats(targetId: string){
      return chatsHTTPInstance.get('/' + targetId + '/common').then(xhr => {
        if (xhr.status === 200) {
            return xhr.responseText;
        } else if (xhr.status === 400) {
            throw new Error(`400: No common chats`);
        }
        throw new Error(`Failed to get common chats: ${xhr.status}`);
    });
    }

  }


export default ChatsAPI
