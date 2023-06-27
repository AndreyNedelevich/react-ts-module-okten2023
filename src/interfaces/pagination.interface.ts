
// Так как ответ на cars мы имеем погинованный ответ  в виде объекта с следующими полями. Для типизации данного ответа
//создаем interface IPagination и в его джейнери будем передавать типизацию массива с объектами которая будет приходить в поле
// items.
export interface IPagination<T> {
    total_items: number;
    total_pages: number;
    prev: string;
    next: string;
    items: T;
}
