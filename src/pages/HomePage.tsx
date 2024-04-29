import PageWrapper from "../components/containers/PageWrapper"
import { Typography } from "@mui/material"
import useGetAnalytics from "../hooks/useGetAnalytics"
import { useEffect, useState } from "react"
import { AnalyticsParams } from "../api/services/AnalyticsService"
import AnalyticsChart from "../components/common/AnalyticsChart"
import dayjs from "dayjs"

const HomePage = () => {
    const [analyticsParamsTickets, setAnalyticsParamsTickets] = useState<AnalyticsParams>({ startDate: dayjs().month(dayjs().month() - 1).valueOf(), endDate: dayjs().valueOf(), filter: "byDay" });
    const [analyticsParamsRevenue, setAnalyticsParamsRevenue] = useState<AnalyticsParams>({ startDate: dayjs().month(dayjs().month() - 1).valueOf(), endDate: dayjs().valueOf(), filter: "byDay" });

    const [tickets, isTicketsLoading] = useGetAnalytics("tickets", analyticsParamsTickets);
    const [revenue, isRevenueLoading] = useGetAnalytics("revenue", analyticsParamsRevenue);

    const [revenueXAxis, setRevenueXAxis] = useState<string[]>([]);
    const [revenueYAxis, setRevenueYAxis] = useState<number[]>([]);
    const [ticketsXAxis, setTicketsXAxis] = useState<string[]>([]);
    const [ticketsYAxis, setTicketsYAxis] = useState<number[]>([]);

    useEffect(() => {
        if (tickets.length) {
            const ticketsX: string[] = []
            const ticketsY: number[] = [];
            tickets.forEach(data => { ticketsX.push(data.x); ticketsY.push(+data.y) });

            setTicketsXAxis(ticketsX);
            setTicketsYAxis(ticketsY);
        }

        if (revenue.length) {
            const revenueX: string[] = []
            const revenueY: number[] = [];
            revenue.forEach(data => { revenueX.push(data.x); revenueY.push(+data.y) });

            setRevenueXAxis(revenueX);
            setRevenueYAxis(revenueY);
        }
    }, [tickets, revenue])

    return (
        <PageWrapper>
            <Typography variant="h4">График продаж</Typography>
            {isTicketsLoading && <Typography variant="body2">Загрузка..</Typography>}
            <AnalyticsChart setParams={setAnalyticsParamsTickets} data={{ x: ticketsXAxis, y: ticketsYAxis }} dataHint="шт." />
            <Typography variant="h4" mt={5}>График выручки</Typography>
            {isRevenueLoading && <Typography variant="body2">Загрузка..</Typography>}
            <AnalyticsChart setParams={setAnalyticsParamsRevenue} data={{ x: revenueXAxis, y: revenueYAxis }} dataHint="руб." />
        </PageWrapper>
    )
}

export default HomePage