import { createApiFromPath } from "../index";
import { Route, RouteData } from "../../types";

interface UpdateRouteData {
    routeId: number;
    departureCityId?: number;
    destinationCityId?: number;
    duration?: number;
}

class RoutesService {
    static api = createApiFromPath("/routes");

    static async getRoutes(): Promise<{ data: { routes: Route[] } }> {
        return this.api.get("/getRoutes");
    }

    static async addRoute(newRoute: RouteData): Promise<{ data: { route: Route } }> {
        return this.api.post("/addRoute", newRoute);
    }
    static async updateRoute(newRoute: UpdateRouteData): Promise<{ data: { route: Route } }> {
        return this.api.patch("/updateRoute", newRoute);
    }

}

export default RoutesService;