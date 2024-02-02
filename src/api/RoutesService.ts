import { createApiFromPath } from "./index";
import { Route, RouteRecordData, RouteRecordSearchData } from "../types";


interface ICitiesResponse {
    data: {
        cities: {
            id: number,
            cityName: string
        }[] | []
    }
}

class RoutesService {
    static routeApi = createApiFromPath("/routes");
    static async getRouteRecords(searchData: RouteRecordSearchData): Promise<{ data: { routes: RouteRecordData[] } }> {
        return this.routeApi.get("/getRouteRecords", { params: searchData })
    }
    static async getCities(cityName: string): Promise<ICitiesResponse> {
        return this.routeApi.get("/getCities", { params: { cityName } });
    }

    static async getRoutes(): Promise<{ data: { routes: Route[] } }> {
        return this.routeApi.get("/getRoutes");
    }
}


export default RoutesService;