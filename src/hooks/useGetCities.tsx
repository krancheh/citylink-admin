import { useEffect, useState } from "react";
import { City } from "../types";
import CitiesService from "../api/services/CitiesService";
import useSetSnackbar from "./useSetSnackbar";



const useGetCities = (cityName: string) => {
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const setSnackbarError = useSetSnackbar();

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const result = await CitiesService.getCities(cityName);
                setCities(result.data.cities);
            } catch (e: any) {
                setSnackbarError({ children: e.message, severity: "error" })
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityName])

    return { cities, setCities, isLoading };
}
export default useGetCities