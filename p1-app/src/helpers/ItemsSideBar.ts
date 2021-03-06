import { SideBarItem } from '../interfaces/types';
import { FcLinux, FcComboChart, FcElectronics } from 'react-icons/fc';

export const items: SideBarItem[] = [
    {
        id: "1",
        label: "Dashboard",
        icon: FcLinux,
        url: "/"
    },
    {
        id: "2",
        label: "RAM",
        icon: FcComboChart,
        url: "/ram"
    },
    {
        id: "3",
        label: "CPU",
        icon: FcElectronics,
        url: "/cpu"
    },
];