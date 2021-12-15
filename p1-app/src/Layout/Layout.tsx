import { useState } from 'react';
import { SideBar } from '../components/Sidebar/SideBar';
import { items } from '../helpers/ItemsSideBar';
import { card } from '../helpers/CardSideBar';

import classes from '../Styles/Layout/Layout.module.scss';

export const Layout = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <>
            <SideBar items={items} card={card} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div
                className={isOpen ? classes.container : classes.container2}
            >
                {children}
            </div>
        </>
    )
}
