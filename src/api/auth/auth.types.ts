interface UserRegistrationInterface {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

interface UserLoginInterface {
    login: string,
    password: string
}

export {UserRegistrationInterface, UserLoginInterface}
