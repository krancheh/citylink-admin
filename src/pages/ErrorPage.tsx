import { ErrorOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import CustomLink from '../components/common/CustomLink'

const ErrorPage = () => {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50vh" gap="10px">
            <ErrorOutlined fontSize='large' />
            <Typography variant='h4'>404</Typography>
            <Typography variant='h5'>Страница не найдена.</Typography>
            <CustomLink to='/'><Button>На главную</Button></CustomLink>
        </Box>
    )
}

export default ErrorPage