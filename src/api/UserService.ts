import {createApiFromPath} from "./index";
import {AuthData, TokenData, UserData} from "../types";


class UserService {
    private static userApi = createApiFromPath("/user");
    static async login(data: AuthData): Promise<TokenData> {
        return this.userApi.post("/login", data);
    }
    static async checkAuth(): Promise<TokenData> {
        return this.userApi.get("auth");
    }
    static async update(data: UserData): Promise<TokenData> {
        return this.userApi.put("update", data);
    }
}

export default UserService;