import dayjs from 'dayjs';
import { RouteRecordData } from "../types";


export const getFormattedRoute = <DataType extends RouteRecordData>(route: DataType) => {
    const date = dayjs(route.departureDate);
    const departureTime = date.format("HH:mm");
    const departureDate = date.format("DD.MM.YYYY");
    const arrivalTime = date.add(route.duration, "hours").format("HH:mm");

    const formattedRoute = {
        ...route,
        departureTime,
        arrivalTime,
        duration: route.duration.toString() + "ч",
        departureDate,
    }

    return formattedRoute;
}