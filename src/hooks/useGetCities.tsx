import { useEffect, useState } from "react"
import { City } from "../types";
import RoutesService from "../api/RoutesService";

interface IProps {
    cityName: string;
}

const useGetCities = (props: IProps) => {
    const { cityName } = props;
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const result = await RoutesService.getCities(cityName);
                setCities(result.data.cities);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, [cityName])

    return { cities, setCities, isLoading };
}
export default useGetCities