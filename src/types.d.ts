

export interface AuthData {
    phoneNumber: string;
    password: string;
}

export interface TokenData {
    data: {
        token: string;
        name: string;
        role: string;
    }
}

export interface UserData {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: string;
    documentNumber?: number;
    ticketsAmount?: number;
    email?: string;
    gender?: boolean;
    birthDate?: number;
    favouriteCity?: string;
    favouriteCityCount?: number;
}

export interface RouteRecordSearchData {
    departureCity?: string;
    destinationCity?: string;
    departureDate?: number;
}

export interface RouteRecordData {
    id: number;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    duration: number;
    price: number;
}

export interface RouteRecord extends RouteRecordData {
    departureTime: string;
    arrivalTime: string;
    duration: string;
}

export interface IErrorMessage {
    response: {
        status: number;
        statusText?: string;
        data: {
            message: string;
        }
    }
}