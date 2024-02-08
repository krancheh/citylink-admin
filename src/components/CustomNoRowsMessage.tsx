import { Box, Typography } from '@mui/material'

const CustomNoRowsMessage = () => {
    return (
        <Box height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img style={{ opacity: 0.8 }} src={require('../assets/icons/no-rows.svg').default} alt="No data icon" />
            <Typography>Записей нет</Typography>
        </Box>
    )
}

export default CustomNoRowsMessage;