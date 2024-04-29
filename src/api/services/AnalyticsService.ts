import { createApiFromPath } from "../index";


export interface AnalyticsParams {
    startDate?: number;
    endDate?: number;
    filter?: Filter;
}

export type Filter = "byMonth" | "byDay";

export type AnalyticsType = {
    x: string;
    y: string;
}


class AnalyticsService {
    static api = createApiFromPath("/analytics");

    static async getTicketsSold(params: AnalyticsParams): Promise<{ data: AnalyticsType[] }> {
        return this.api.get("getTicketsSold", { params });
    }
    static async getRevenue(params: AnalyticsParams): Promise<{ data: AnalyticsType[] }> {
        return this.api.get("getRevenue", { params });
    }
}

export default AnalyticsService;