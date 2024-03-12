import { RouteRecordData } from "../types";
import { getFormattedDate } from "./getFormattedDate";


export const getFormattedRoute = <DataType extends RouteRecordData>(route: DataType) => {
    const date = new Date(route.departureDate);
    const departureTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    const departureDate = getFormattedDate(route.departureDate);
    date.setHours(date.getHours() + route.duration);
    const arrivalTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

    const formattedRoute = Object.assign(route, {
        departureTime,
        arrivalTime,
        duration: route.duration.toString() + "ч",
        departureDate,
    })

    return formattedRoute;
}