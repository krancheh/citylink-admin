import { createApiFromPath } from "..";
import { TicketData } from "../../types";



class TicketsService {
    static api = createApiFromPath("/tickets");

    static async getTickets(): Promise<{ data: { tickets: TicketData[] } }> {
        return this.api.get("/getTickets");
    }
}

export default TicketsService;