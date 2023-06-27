//Интерфуйс для типизации дву токенов (access и refresh) которые приходят если пользователь успешно залогинелся.
export interface ITokens {
    access: string;
    refresh: string;
}
