import { useEffect, useState } from "react";
import AnalyticsService, { AnalyticsParams, AnalyticsRevenue, AnalyticsTickets } from "../api/AnalyticsService";


interface IProps {
    params: AnalyticsParams;
    type: "revenue" | "tickets";
}

const fetchAnalyticsMap = {
    revenue: AnalyticsService.getRevenue.bind(AnalyticsService),
    tickets: AnalyticsService.getTicketsSold.bind(AnalyticsService),
}

const useGetAnalytics = (props: IProps) => {
    const { params, type } = props;

    const [data, setData] = useState<AnalyticsTickets[] | AnalyticsRevenue[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchAnalytics = async () => {
            try {
                setIsLoading(true);

                const result = await fetchAnalyticsMap[type](params);
                setData(result.data.tickets);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAnalytics();
    }, [params, type])


    return [data, isLoading];
}
export default useGetAnalytics;