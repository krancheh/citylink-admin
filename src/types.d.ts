import { Position } from "./utils/constants";


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
    role: string;
    createdAt: string;
}

export interface RouteRecordSearchData {
    departureCity?: string;
    destinationCity?: string;
    departureDate?: number;
    pageNumber: number;
    entriesNumber: number;
}

export interface RouteRecordData {
    id: number | string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    duration: number;
    price: number;
}

export interface TicketData extends RouteRecordData {
    id: string;
    passengerId: string;
    seatNo: number;
    purchaseDate: string;
}

export interface RouteData {
    departureCityId: number;
    destinationCityId: number;
    duration: string;
}

export interface Route extends RouteData {
    id: number;
}

export interface RouteRecord extends RouteRecordData {
    departureTime: string;
    arrivalTime: string;
    duration: string;
}

export interface Ticket extends TicketData {
    departureTime: string;
    arrivalTime: string;
    duration: string;
}

export interface City {
    id: number;
    cityName: string;
}

export interface User extends UserData {
    birthdate?: string;
    createdAt: string;
}

export interface Employee {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender?: boolean | string;
    position?: `${Position}`;
    phoneNumber?: number;
    birthDate?: string;
    documentNumber: string;
}

export interface Bus {
    id: number;
    model: string;
    regNumber: string;
    region: string;
    seatsAmount: number;
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


export interface Notification {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
}