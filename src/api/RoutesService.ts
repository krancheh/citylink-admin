import { createApiFromPath } from "./index";
import { City, Route, RouteData, RouteRecordData, RouteRecordSearchData, TicketData } from "../types";


class RoutesService {
    static routeApi = createApiFromPath("/routes");

    static async getRouteRecords(searchData: RouteRecordSearchData): Promise<{ data: { routes: RouteRecordData[], countRecords: number } }> {
        return this.routeApi.get("/getRouteRecords", { params: searchData })
    }

    static async getCities(cityName: string): Promise<{ data: { cities: City[] } }> {
        return this.routeApi.get("/getCities", { params: { cityName } });
    }
    static async addCity(cityName: string): Promise<{ data: { result: City } }> {
        return this.routeApi.post("/addCity", { cityName });
    }

    static async getRoutes(): Promise<{ data: { routes: Route[] } }> {
        return this.routeApi.get("/getRoutes");
    }

    static async addRoute(newRoute: RouteData): Promise<{ data: { route: Route } }> {
        return this.routeApi.post("/addRoute", newRoute);
    }

}


export default RoutesService;