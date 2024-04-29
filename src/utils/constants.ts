
export enum Position {
    SUPERVISOR = "Руководитель",
    DRIVER = "Водитель",
    MANAGER = "Менеджер",
    ADMIN = "Администратор",
}

// Статус маршрута
export enum Status {
    "Ожидает",
    "В пути",
    "Завершен",
}

export enum Path {
    MAIN = "/",
    LOGIN = "/login",
    SIGNUP = "/signup",
    ROUTE_RECORDS = "/route-records",
    ROUTES = "/routes",
    USERS = "/users",
    CITIES = "/cities",
    TICKETS = "/tickets",
    BUSES = "/buses",
    STAFF = "/staff"
}


export const titleMap: Record<Path, string> = {
    [Path.MAIN]: "Главная",
    [Path.LOGIN]: "Вход",
    [Path.SIGNUP]: "Регистрация",
    [Path.ROUTE_RECORDS]: "Текущие рейсы",
    [Path.ROUTES]: "Маршруты",
    [Path.USERS]: "Пользователи",
    [Path.CITIES]: "Города",
    [Path.TICKETS]: "Забронированные билеты",
    [Path.BUSES]: "Автобусы",
    [Path.STAFF]: "Сотрудники",
}


export const cityNameValidation = /^[а-яА-Я]+(?:-[а-яА-Я]+)*$/; // регулярное выражение для названия города