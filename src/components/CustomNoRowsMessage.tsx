import { Box, Typography } from '@mui/material'

const CustomNoRowsMessage = () => {
    return (
        <Box height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor="#fdfdfd">
            <Box height={{ sm: "auto", xs: "100px" }}>
                <img style={{ opacity: 0.8, height: "100%" }} src={require('../assets/icons/no-rows.svg').default} alt="No data icon" />
            </Box>
            <Typography>Записей нет</Typography>
        </Box>
    )
}

export default CustomNoRowsMessage;