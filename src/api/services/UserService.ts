import { createApiFromPath } from "../index";
import { AuthData, TokenData, UserData } from "../../types";


class UserService {
    private static api = createApiFromPath("/user");

    static async login(data: AuthData): Promise<TokenData> {
        return this.api.post("/login", data);
    }

    static async checkAuth(): Promise<TokenData> {
        return this.api.get("/auth");
    }

    static async update(data: UserData): Promise<TokenData> {
        return this.api.put("/update", data);
    }

    static async getUsers(): Promise<{ data: { users: UserData[] } }> {
        return this.api.get("/getUsers");
    }
}

export default UserService;