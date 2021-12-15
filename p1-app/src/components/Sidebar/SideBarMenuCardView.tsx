import { SidebarMenuCard } from "../../interfaces/types"
import { classNames } from "../../util/clasess"

import '../../Styles/SideBar/SideBarMenuCardView.scss';

interface SideBarMenuCardViewProps {
    card: SidebarMenuCard;
    isOpen: boolean;
}

export const SideBarMenuCardView = ({ card, isOpen }: SideBarMenuCardViewProps) => {
    return (
        <div className="SideBarMenuCardView">
            <img
                className="profile"
                src={card.photoUrl}
                width="100%"
                alt={card.displayName}
            />
            <div className={classNames('profileInfo', isOpen ? "" : "collapsed")}>
                <div className="name">{card.displayName}</div>
                <div className="title">{card.title}</div>
            </div>
        </div>
    )
}
