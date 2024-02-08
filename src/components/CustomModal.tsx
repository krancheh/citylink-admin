import { Card, Modal, ModalOwnProps, Typography } from '@mui/material';
import React from 'react';

interface IProps extends ModalOwnProps {
    id: string;
    title: string;
    description?: string;
}

const CustomModal: React.FC<IProps> = ({ id, open, onClose, title, description, children }) => {
    return (
        <Modal
            id={id}
            open={open}
            onClose={onClose}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            aria-labelledby='modal-title'
            aria-describedby='modal-description'
        >
            <Card sx={{ p: "20px", width: "min(100%, 600px)" }}>
                <Typography variant='h6' id="modal-title">{title}</Typography>
                <Typography id="modal-description" m="15px 0">{description}</Typography>
                {children}
            </Card>
        </Modal>
    )
}

export default CustomModal