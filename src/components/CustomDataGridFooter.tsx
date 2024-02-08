import { GridFooter, GridFooterContainer } from '@mui/x-data-grid';
import { ReactElement } from 'react';

interface IProps {
    children?: ReactElement | ReactElement[];
}

const CustomDataGridFooter: React.FC<IProps> = ({ children }) => {
    return (
        <GridFooterContainer sx={{ p: "0 10px" }}>
            {children}
            <GridFooter sx={{ border: "none" }} />
        </GridFooterContainer>
    )
}

export default CustomDataGridFooter