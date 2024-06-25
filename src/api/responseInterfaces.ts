export interface UserInfoInterface {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: any;
}

export interface ChatInterface {
    id: number;
    title: string;
    avatar: any;
    unread_count: number;
    last_message: {
        user: UserInfoInterface;
        time: string;
        content: string;
    }
}
  