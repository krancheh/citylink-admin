import {createApiFromPath} from "./index";


class RouteService {
    static routeApi = createApiFromPath("/route")
    static async getRouteRecords() {

    }
}


export default RouteService;