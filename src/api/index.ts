import axios from "axios";
import { IErrorMessage } from "../types";

const $api = axios.create({
    baseURL: "http://localhost:7000/api",
    withCredentials: true
})


$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token") || localStorage.getItem("token")}`;
    return config;
})

$api.interceptors.response.use(
    (response) => {
        if (response.data?.hasOwnProperty("role")) {
            if (response.data.role !== "admin") throw new Error("Недостаточно прав");
        }
        return response;
    },
    (error: IErrorMessage) => {
        if (error.response?.data?.message) {
            const { message } = error.response.data;
            throw new Error(message);
        }

        throw new Error("Неизвестная ошибка");
    })

export const createApiFromPath = (basePath: string) => ({
    get: (path: string, ...args: any[]) => $api.get(`${basePath}/${path}`, ...args),
    post: (path: string, ...args: any[]) => $api.post(`${basePath}/${path}`, ...args),
    put: (path: string, ...args: any[]) => $api.put(`${basePath}/${path}`, ...args),
    delete: (path: string, ...args: any[]) => $api.delete(`${basePath}/${path}`, ...args),
    patch: (path: string, ...args: any[]) => $api.patch(`${basePath}/${path}`, ...args),
})

export default $api;