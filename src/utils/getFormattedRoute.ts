import {RouteRecord, RouteRecordData} from "../types";


export const getFormattedRoute = (route: RouteRecordData) => {
    const date = new Date(route.departureDate);
    const departureTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    date.setHours(date.getHours() + route.duration);
    const arrivalTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    const departureDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const formattedRoute: RouteRecord = {
        id: route.id,
        departureCity: route.departureCity,
        destinationCity: route.destinationCity,
        departureTime,
        arrivalTime,
        duration: route.duration.toString() + "ч",
        departureDate,
        price: route.price,
    }

    return formattedRoute;
}