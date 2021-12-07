import { SideBarItem, SidebarMenuCard } from '../../interfaces/types';
import { classNames } from '../../util/clasess';
import { VscMenu } from 'react-icons/vsc'
/* import { SideBarMenuCardView } from './SideBarMenuCardView' */
import { SideBarMenuItemView } from './SideBarMenuItemView'

import '../../Styles/SideBar/sidebar.scss';

interface SideBarMenuProps {
    items: SideBarItem[];
    card: SidebarMenuCard;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar = ({ items, card, isOpen, setIsOpen }: SideBarMenuProps) => {
    
    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={classNames("SideBarMenu", isOpen ? "expanded" : "collapsed")}>
            <div className="menuButton">
                <button 
                    className="btnCollapsed"
                    onClick={handleClick}
                >
                    <VscMenu />
                </button>
            </div>
            {/* <SideBarMenuCardView card={ card } isOpen={ isOpen } /> */}
            {
                items.map(item => (
                    <SideBarMenuItemView key={ item.id } item={ item } isOpen={ isOpen } />
                ))
            }
        </div>
    )
}
