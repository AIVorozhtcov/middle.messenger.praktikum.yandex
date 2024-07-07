import UserApi from "../api/user/userApi";
import store from "../utils/store";
import { UserInfoInterface, UserUpdateInterface, PasswordChangeInterface } from "../api/user/user.types";
import AuthAPI from "../api/auth/authApi";

const UserApiInstance = new UserApi();
const AuthApiInstance = new AuthAPI();
export const AvatarURL = "https://ya-praktikum.tech/api/v2/resources/";

class UserController {
    async getUserInfo(){
        const UserData = JSON.parse(await AuthApiInstance.getUserInfo()) as UserInfoInterface;
        UserData.avatar = UserData.avatar? AvatarURL + UserData.avatar : "/assets/empty_profile.png";
        store.set({
            user: UserData
        })
        return UserData
    }

    async checkUserLoggedIn(): Promise<boolean> {
        try {
            await AuthApiInstance.checkUserInfo();
            return true;
        } catch (error) {
            if (error.message.includes("401")) {
                console.log("User is not logged in.");
                return false;
            }
            throw new Error(`Failed to check user login status: ${error.message}`);
        }
    }

    async updateUserInfo(newInfo: UserUpdateInterface){
        const confirmedData = JSON.parse(await UserApiInstance.updateUserInfo(newInfo)) as UserInfoInterface;
        if (confirmedData.avatar){
            confirmedData.avatar = AvatarURL + confirmedData.avatar;
        }
        store.set({
            user: confirmedData
        });
        return confirmedData
    }

    async searchUsers(login: string){

        const foundUsers = JSON.parse(await UserApiInstance.search(login)) as UserInfoInterface[];
        return foundUsers
        /*
                Код ниже предполагался для отсечения возможности создания множества чатов с одним и тем же собеседником.
                Так как данная конфигурация позволяет создавать только чаты один-на-один, возможность иметь больше одного такого чата показалась мне излишней
                Но функционал отключен, так как по каким-то причинам обращение к методу GET chats/{id}/common возвращает ошибку No Chat при указании id того пользователя, с которым чат существует

        const foundUsers = JSON.parse(await UserApiInstance.search(login)) as UserInfoInterface[];
        const filteredUsers = [];

        for (const user of foundUsers) {
            const hasCommonChats = await ChatsControllerInstance.hasCommonChats(user.id);
            if (!hasCommonChats) {
               filteredUsers.push(user);
            }
        }

        return filteredUsers; */
    }

    async updateAvatar(newAvatar: File) {        
        const avatarData = new FormData();
        avatarData.append('avatar', newAvatar);
        await UserApiInstance.updateAvatar(avatarData)
        this.getUserInfo();

    }

    async changePassword(passwordObject: PasswordChangeInterface){
        UserApiInstance.changePassword(passwordObject.old_password, passwordObject.new_password)
    }
}

export default UserController
