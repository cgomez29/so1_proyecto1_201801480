import { IoSkullOutline } from 'react-icons/io5';

interface Data {
    pid: string;
    name: string;
    user: string;
    state: string;
    ram: string;
}

interface TableItemProps {
    data: Data;
    headers: string[];
    handleKill: (id: string) => void;
}

export const TableItem = ({ data, headers, handleKill }: TableItemProps) => {

    const { pid, name, user, state, ram } = data;
    return (
        <tr className="table_row">
            <td className="table_cell" >
                <label className="label">{headers[0]}</label> {pid}
            </td>
            <td className="table_cell" >
                <label className="label">{headers[1]}</label> {name}
            </td>
            <td className="table_cell" >
                <label className="label">{headers[2]}</label> {user}
            </td>
            <td className="table_cell" >
                <label className="label">{headers[3]}</label> {state}
            </td>
            <td className="table_cell" >
                <label className="label">{headers[4]}</label> {ram}
            </td>
            <td className="table_cell">
                <button className="btn_kill" onClick={() => handleKill(pid)}>
                    {/* <label className="label">{ headers[5] }</label> */}
                    <IoSkullOutline className='btn_kill_icon' />
                </button>
            </td>
        </tr>
    )
}
