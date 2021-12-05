import { IconType } from "react-icons";

export interface SideBarItem {
    id: string;
    label: string;
    icon: IconType;
    url: string;
}

export interface SidebarMenuCard {
    id: string;
    displayName: string;
    photoUrl: string;
    title: string;
    url: string;
}