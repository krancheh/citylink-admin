import { useEffect, useState } from "react";
import AnalyticsService, { AnalyticsParams, AnalyticsType } from "../api/AnalyticsService";


const fetchAnalytics = {
    tickets: AnalyticsService.getTicketsSold.bind(AnalyticsService),
    revenue: AnalyticsService.getRevenue.bind(AnalyticsService)
};

type Type = "tickets" | "revenue";

const useGetAnalytics = (type: Type, params: AnalyticsParams): [AnalyticsType[], boolean] => {
    const [data, setData] = useState<AnalyticsType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchAnalytics[type](params);
                setData(response.data);
            } catch (error) {
                console.error("Ошибка получения аналитики: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [type, params]);

    return [data, isLoading];
};

export default useGetAnalytics;