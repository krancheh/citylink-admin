import { createApiFromPath } from "..";
import { Bus } from "../../types";



class BusService {
    private static staffApi = createApiFromPath("/routes");

    static async getBuses(): Promise<{ data: { buses: Bus[] } }> {
        return this.staffApi.get("/getBuses");
    }
}

export default BusService;