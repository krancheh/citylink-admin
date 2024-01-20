

export interface AuthData {
    phoneNumber: string;
    password: string;
}

export interface TokenData {
    data: {
        token: string;
        name?: string;
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

export interface IErrorMessage {
    response: {
        status: number;
        statusText?: string;
        data: {
            message: string;
        }
    }
}