import { TableItem } from './TableItem'
import '../../Styles/Table/table.scss';

interface TableProps {
    headers: string[];
    data: any[];
    handleKill: (pid: string) => void;
}

export const Table = ({ headers, data, handleKill }: TableProps) => {
    return (
        <table className="table">
            <caption className="table_caption">Processes</caption>
            <thead className="table_head">
                <tr className="table_row">
                    {
                        headers.map((head, i) => (
                            <th className="table_heading" key={i}> {head} </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((data, i) => (
                        <TableItem key={i} data={data} headers={headers} handleKill={handleKill} />
                    ))
                }
            </tbody>
        </table>
    )
}
