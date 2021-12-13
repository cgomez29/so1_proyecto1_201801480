import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IoSkullOutline } from 'react-icons/io5';
import { TiFlowChildren } from 'react-icons/ti';


import { Table } from '../components/Table/Table';
import { Card } from '../components/Card/Card';
import { heads } from '../helpers/HeadTable';
import { getCPUState, killProcess } from '../helpers/CPU'
import { CPU } from '../interfaces/CPUScreen'

import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Dashboard/dashboard.scss';



export const Dashboard = () => {

    const [dataCPU, setDataCPU] = useState<CPU>(
        {
            processes: [],
            running: 0,
            sleeping: 0,
            zombie: 0,
            stopped: 0,
            total_processes: 0,
        }
    );

    const { running, sleeping, zombie, stopped, total_processes, processes } = dataCPU;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const {data} = await getCPUState();
        setDataCPU(data);
    };

    const handleKill = async (pid :string) => {
        const { data } = await killProcess(pid);
        console.log(data);
        loadData();
        notify();
    }

    const notify = () => toast.success('Success', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return (
        <>
            <h1>
                Dashboard
            </h1>
            <div className="card-container animate__animated animate__zoomIn">
                <Card title={ 'Running' } body={ `${running}` } />
                <Card title={ 'Sleeping' } body={ `${sleeping}` } />
                <Card title={ 'Stopped' } body={ `${zombie}` } />
                <Card title={ 'Zombie' } body={ `${stopped}` } />
                <Card title={ 'Total' } body={ `${total_processes}` } />
            </div>
            <div className='SideBarMenuItemView submenu-container'>
                <Link to=''>
                    <div className={'ItemContent'}>
                        <div className='icon'>
                            <IoSkullOutline size="32"/>
                        </div>
                        <span className="label">
                            Processes
                        </span>
                    </div>
                </Link>
                <Link to=''>
                    <div className={'ItemContent'}>
                        <div className='icon'>
                            <TiFlowChildren size="32"/>
                        </div>
                        <span className="label">
                            Processes
                        </span>
                    </div>
                </Link>
            </div>
            <div className="table-container animate__animated animate__zoomIn">
                <Table headers={heads} data={processes} handleKill={handleKill} />
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
