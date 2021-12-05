import { SideBarItem } from '../interfaces/types';
import { FcLinux, FcComboChart, FcSettings } from 'react-icons/fc';

export const items: SideBarItem[] = [
    {
        id: "1",
        label: "Hola",
        icon: FcLinux,
        url: "/"
    },
    {
        id: "3",
        label: "Hola",
        icon: FcComboChart,
        url: "/"
    },
    {
        id: "2",
        label: "Hola",
        icon: FcSettings,
        url: "/"
    },
];