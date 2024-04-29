import { createApiFromPath } from "..";
import { Bus } from "../../types";



class BusService {
    private static api = createApiFromPath("/routes");

    static async getBuses(): Promise<{ data: { buses: Bus[] } }> {
        return this.api.get("/getBuses");
    }
}

export default BusService;