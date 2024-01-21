import React from 'react';
import {Link, LinkProps} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

interface IProps extends LinkProps {
    to: string;
}

const CustomLink = (props: IProps) =>
    <Link
        component={RouterLink}
        style={{
            color: "inherit",
            textDecoration: "inherit",
            display: "inherit",
            flex: "inherit",
            justifyContent: "inherit",
            alignItems: "inherit"
        }}
        {...props}>
    </Link>
export default CustomLink;