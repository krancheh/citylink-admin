import { createApiFromPath } from "..";
import { Employee } from "../../types";



class StaffService {
    private static api = createApiFromPath("/routes");

    static async getStaff(): Promise<{ data: { staffs: Employee[] } }> {
        return this.api.get("/getStaff");
    }

    static async addStaff(newEmployee: Employee): Promise<{ data: Employee }> {
        return this.api.post("/addStaff", newEmployee);
    }
}

export default StaffService;