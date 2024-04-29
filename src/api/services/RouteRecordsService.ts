import { createApiFromPath } from "..";
import { RouteRecordData, RouteRecordSearchData } from "../../types";

export interface NewRouteRecord {
    departureCityId: number;
    destinationCityId: number;
    busAssignmentId: number;
    price: string;
    departureDate: string;
}

class RouteRecordsService {
    private static api = createApiFromPath("/routes");

    static async getRouteRecords(searchData: RouteRecordSearchData): Promise<{ data: { routes: RouteRecordData[], countRecords: number } }> {
        return this.api.get("/getRouteRecords", { params: searchData })
    }

    static async addRouteRecord(newRouteRecord: NewRouteRecord): Promise<{ data: { route: RouteRecordData } }> {
        return this.api.post("/addRouteRecords", newRouteRecord)
    }

    // static async updateRouteRecord(newRouteRecord: NewRouteRecord): Promise<{ data: { route: RouteRecordData } }> {
    //     return this.api.patch("/updateRouteRecords", newRouteRecord)
    // }
}

export default RouteRecordsService;