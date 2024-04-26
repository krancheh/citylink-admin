import { useEffect, useState } from "react";
import { Bus } from "../types";
import BusService from "../api/services/BusService";

const useGetBuses = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const result = await BusService.getBuses();
                setBuses(result.data.buses);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, [])

    return { buses, setBuses, isLoading };
}
export default useGetBuses