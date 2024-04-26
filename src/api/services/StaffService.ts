import { createApiFromPath } from "..";
import { Employee } from "../../types";



class StaffService {
    private static staffApi = createApiFromPath("/routes");

    static async getStaff(): Promise<{ data: { staffs: Employee[] } }> {
        return this.staffApi.get("/getStaff");
    }
}

export default StaffService;