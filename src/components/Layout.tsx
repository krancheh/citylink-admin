import React, {useState} from 'react';
import Header from "./Header";
import SideBar from "./SideBar";

export interface DrawerStatusProps {
    isDrawerOpen?: boolean;
    openDrawer?: () => void;
    closeDrawer?: () => void;
}

const Layout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    }

    return (
        <div>
            <Header isDrawerOpen={isDrawerOpen} openDrawer={openDrawer}/>
            <SideBar isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer}/>
        </div>
    );
};

export default Layout;