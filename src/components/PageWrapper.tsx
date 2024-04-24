import { Box } from '@mui/material'
import React from 'react'

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}

const PageWrapper: React.FC<IProps> = ({ children }) => {
    return (
        <Box
            // maxWidth="1200px"
            m="0 auto"
        >
            {children}
        </Box>
    )
}

export default PageWrapper