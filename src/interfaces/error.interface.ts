export interface IError {
    detail?: string
}
//Интерфейс для типизации ошибки которая может вернуться из API при добавлении нового авто.

export interface IErrorAuth extends IError {
    username: string[]
}
//Далее мы унасслежуемся от предидущего interface IError и добавляем в него дополнительное поле username которое будет массивом
// строчек. (string[])