import { Box, IconButton, Typography } from "@mui/material"
import PageWrapper from "../components/containers/PageWrapper"
import { Update } from "@mui/icons-material"
import useGetStaff from "../hooks/useGetStaff"
import CustomModal from "../components/common/CustomModal"
import { useState } from "react"
import EmployeeForm from "../components/specific/EmployeeForm"
import StaffTable from "../components/specific/StaffTable"


const StaffPage = () => {
    const { staff, setStaff, isLoading } = useGetStaff();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица сотрудников</Typography>
                <IconButton onClick={() => null}><Update /></IconButton>
            </Box>

            <StaffTable staff={staff} isLoading={isLoading} setIsModalOpen={setIsModalOpen} />

            <CustomModal
                id="cities-modal"
                title='Добавить сотрудника'
                description='Заполните данные о сотруднике.'
                open={isModalOpen}
                closeHandler={handleCloseModal}
            >
                <EmployeeForm handleCloseModal={handleCloseModal} setStaff={setStaff} />
            </CustomModal>
        </PageWrapper>
    )
}
export default StaffPage