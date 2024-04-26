
export enum Position {
    SUPERVISOR = "Руководитель",
    DRIVER = "Водитель",
    MANAGER = "Менеджер",
    ADMIN = "Администратор",
}

export enum Path {
    LOGIN = "/login",
    SIGNUP = "/signup",
    MAIN = "/",
    ROUTE_RECORDS = "/route-records",
    ROUTES = "/routes",
    USERS = "/users",
    CITIES = "/cities",
    TICKETS = "/tickets",
    BUSES = "/buses",
    STAFF = "/staff"
}


export const titleMap: Record<Path, string> = {
    [Path.LOGIN]: "Вход",
    [Path.SIGNUP]: "Регистрация",
    [Path.MAIN]: "Главная",
    [Path.ROUTE_RECORDS]: "Текущие рейсы",
    [Path.ROUTES]: "Маршруты",
    [Path.USERS]: "Пользователи",
    [Path.CITIES]: "Города",
    [Path.TICKETS]: "Забронированные билеты",
    [Path.BUSES]: "Автобусы",
    [Path.STAFF]: "Сотрудники",
}