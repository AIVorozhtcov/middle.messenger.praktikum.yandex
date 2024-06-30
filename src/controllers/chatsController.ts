import ChatsAPI from "../api/chats/chatsApi";
import ChatInterface from "../api/chat/chat.types";
import store from "../utils/store";
import { ChatUserInterface } from "../api/user/user.types";
import { AvatarURL } from "./userController";

const ChatsApiInstance = new ChatsAPI();


class ChatsController{
    async getChats(){
        const chatsResponse = JSON.parse(await ChatsApiInstance.getChats()) as any[];

        const userId = store.getState().user?.id;
        const mappedChats = await Promise.all(chatsResponse.map(async chat => {
            const usersResponse = JSON.parse(await ChatsApiInstance.getChatUsers(chat.id)) as ChatUserInterface[];
            const targetUser = usersResponse.find(user => user.id !== userId);
            if (targetUser?.avatar){
                targetUser.avatar = AvatarURL + targetUser.avatar;
            }


            return {
                chat_id: chat.id,
                target_display_name: targetUser?.display_name ? targetUser.display_name : targetUser?.login,
                title: chat.title,
                avatar: targetUser?.avatar,
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

    async createChat(targetLogin: string, targetId: number){
        const chatName = store.getState().user?.login + 'and' + targetLogin + 'chat';
        const newChatId = JSON.parse(await ChatsApiInstance.createChat(chatName)).id;
        const fakeArray: number[] = [targetId];
        ChatsApiInstance.addUserToChat(fakeArray, newChatId);        
        this.getChats();
    }
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
