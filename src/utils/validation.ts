export type ValidationRule = 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone' | 'message';

const validationRules = {
    first_name: /^[A-ZА-Я][a-zа-я-]*$/,
    second_name: /^[A-ZА-Я][a-zа-я-]*$/,
    login: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
    email: /^[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/,
    phone: /^(\+)?\d{10,15}$/,
    message: /\S+/
};

function validateInput(inputName: ValidationRule, value: string): boolean {
    const rule = validationRules[inputName];
    if (!rule) return true;
    return rule.test(value);
}

export default validateInput
