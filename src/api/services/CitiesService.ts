import { createApiFromPath } from "..";
import { City } from "../../types";



class CitiesService {
    private static api = createApiFromPath("/routes");

    static async getCities(cityName: string): Promise<{ data: { cities: City[] } }> {
        return this.api.get("/getCities", { params: { cityName } });
    }
    static async addCity(cityName: string): Promise<{ data: { city: City } }> {
        return this.api.post("/addCity", { cityName });
    }

    static async updateCity(city: City): Promise<{ data: { city: City } }> {
        return this.api.patch("/updateCity", { cityId: city.id, cityName: city.cityName });
    }

    static async deleteCity(cityId: number): Promise<{ data: { city: City } }> {
        return this.api.delete("/deleteCity", { params: { cityId } });
    }
}

export default CitiesService;