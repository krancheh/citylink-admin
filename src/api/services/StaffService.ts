import { createApiFromPath } from "..";
import { Employee } from "../../types";



class StaffService {
    private static staffApi = createApiFromPath("/routes");

    static async getStaff(): Promise<{ data: { staffs: Employee[] } }> {
        return this.staffApi.get("/getStaff");
    }

    static async addStaff(newEmployee: Employee): Promise<{ data: Employee }> {
        return this.staffApi.post("/addStaff", newEmployee);
    }
}

export default StaffService;