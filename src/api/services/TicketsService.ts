import { createApiFromPath } from "..";
import { TicketData } from "../../types";



class TicketsService {
    static ticketsApi = createApiFromPath("/tickets");

    static async getTickets(): Promise<{ data: { tickets: TicketData[] } }> {
        return this.ticketsApi.get("/getTickets");
    }
}

export default TicketsService;