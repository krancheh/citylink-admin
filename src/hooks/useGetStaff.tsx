import { useEffect, useState } from "react";
import StaffService from "../api/services/StaffService";
import { Employee } from "../types";



const useGetStaff = () => {
    const [staff, setStaff] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const result = await StaffService.getStaff();
                setStaff(result.data.staffs);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, [])

    return { staff, setStaff, isLoading };
}
export default useGetStaff