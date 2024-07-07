import ChatsAPI from "../api/chats/chatsApi";
import { ChatInterface } from "../api/chat/chat.types";
import store from "../utils/store";
import { CreateChatInterface } from "../api/chats/chats.types";
import { AvatarURL } from "./userController";
import { UserInfoInterface } from "../api/user/user.types";

const ChatsApiInstance = new ChatsAPI();


class ChatsController{
    getChats = async () => {
        const chatsResponse = JSON.parse(await ChatsApiInstance.getChats()) as any[];
        const mappedChats = await Promise.all(chatsResponse.map(async chat => {
            


            return {
                chat_id: chat.id,
                title: chat.title,
                avatar: chat.avatar ? AvatarURL + chat.avatar : "/assets/empty_profile.png",
                unread_count: chat.unread_count,
                last_message: chat.last_message ? {
                    user_login: chat.last_message.user.login,
                    user_avatar: chat.last_message.user.avatar,
                    time: chat.last_message.time,
                    content: chat.last_message.content
                } : null
            } as ChatInterface;
        }));

        store.set({ chats: mappedChats });
        return mappedChats;
    }

    createChat = async (creationData: CreateChatInterface) => {
        await ChatsApiInstance.createChat(creationData);
        await this.getChats();
    }

    addUserToChat = async (userId: number, chatId: number = store.getState().currentChat?.chat_id as number) => {  
            const fakeArray: number[] = [userId];
            await ChatsApiInstance.addUserToChat(fakeArray, chatId);
            await this.getChatUsers(chatId)
        }        

    getChatUsers = async (chatId: number) => {
        const chatUsers = JSON.parse(await ChatsApiInstance.getChatUsers(chatId)) as UserInfoInterface[];
        const currentUser = store.getState().user;

        if (currentUser) {
            chatUsers.filter(user => user.id !== currentUser.id);
        }
        store.set({
            currentChatUsers: chatUsers
        })
    }

    removeUserFromChat = async (userId: number, chatId: number = store.getState().currentChat?.chat_id as number) => {       
            const fakeArray: number[] = [userId];
            await ChatsApiInstance.deleteUserFromChat(fakeArray, chatId);
            await this.getChatUsers(chatId)
        }        

    /*async create1On1Chat(targetLogin: string, targetId: number){
        const chatName = store.getState().user?.login + 'and' + targetLogin + 'chat';
        const newChatId = JSON.parse(await ChatsApiInstance.createChat(chatName)).id;
        const fakeArray: number[] = [targetId];
        ChatsApiInstance.addUserToChat(fakeArray, newChatId);        
        this.getChats();
    } */

    async hasCommonChats(targetId: number) {
        try {
            const response = await ChatsApiInstance.getCommonChats(targetId.toString());
            const commonChats = JSON.parse(response);
            return commonChats.length > 0;
        } catch (error) {
            if (error.message.includes("400")) {
                return false;
            } else {
                console.error(`Failed to get common chats`, error);
                throw error;
            }
        }
    }
}

export default ChatsController
