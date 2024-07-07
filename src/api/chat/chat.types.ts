
interface ChatInterface {
    chat_id: number;
    target_display_name: string;
    title: string;
    avatar: any;
    unread_count: number;
    last_message: {
        user_login: string;
        user_avatar: any,
        time: string;
        content: string;
    }
}

interface CurrentChatInterface {
    chat_id: number;
    name: string;
    avatar: string;
    socket: WebSocket;
}

export {ChatInterface, CurrentChatInterface}
