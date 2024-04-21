import { createApiFromPath } from "./index";


export interface AnalyticsParams {
    startDate?: number;
    endDate?: number;
    filter?: "byMonth" | "byDay";
}

export interface AnalyticsTickets { date: string, ticketsAmount: string };
export interface AnalyticsRevenue { date: string, earnedSum: string };

class AnalyticsService {
    static analyticsApi = createApiFromPath("/analytics");

    static async getTicketsSold(params: AnalyticsParams): Promise<{ data: { tickets: AnalyticsTickets[] } }> {
        return this.analyticsApi.get("getTicketsSold", { params });
    }
    static async getRevenue(params: AnalyticsParams): Promise<{ data: { tickets: AnalyticsRevenue[] } }> {
        return this.analyticsApi.get("getRevenue", { params });
    }
}

export default AnalyticsService;