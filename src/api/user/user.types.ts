interface UserInfoInterface {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

interface UserUpdateInterface {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
}

interface ChatUserInterface {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
}

interface PasswordChangeInterface {
    old_password: string,
    new_password: string
}

export  { UserInfoInterface, UserUpdateInterface, ChatUserInterface, PasswordChangeInterface }
