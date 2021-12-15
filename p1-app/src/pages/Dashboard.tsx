import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IoSkullOutline } from 'react-icons/io5';
import { TiFlowChildren } from 'react-icons/ti';

import { Table } from '../components/Table/Table';
import { Card } from '../components/Card/Card';
import { heads } from '../helpers/HeadTable';
import { killProcess } from '../helpers/CPU'
import { w3cwebsocket } from 'websocket';
import { CPU } from '../interfaces/CPUScreen'
import { ProcessTree } from '../components/ProcessTree/ProcessTree'

import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Dashboard/dashboard.scss';

export const Dashboard = () => {

    const [toogle, setToogle] = useState<boolean>(false);

    const client = useRef<any>(null);
    const [data, updateData] = useState<CPU>(
        {
            processes: [],
            running: 0,
            sleeping: 0,
            zombie: 0,
            stopped: 0,
            total_processes: 0,
        }
    );

    const { running, sleeping, zombie, stopped, total_processes, processes } = data;

    

    useEffect(() => {
      client.current = new w3cwebsocket('ws://localhost:4000/cpu');
  
      client.current.onopen = () => {
        console.log('Websocket client connected')
        const obj = { run: 'start' };
        client.current.send(JSON.stringify(obj));
      }
  
      client.current.onclose = () => {
        console.log('Connection closed.');
      };
  
      client.current.onmessage = (evt: any) => {
        //preparando string
        const json = (evt.data).toString();
        const res : CPU = JSON.parse(json);
        updateData(res); 
      };
  
      return () => {
        console.log("Se desmonto")
        client.current.close();
        client.current = null;
      }
  
    }, []);


    const handleKill = async (pid :string) => {
        const { data } = await killProcess(pid);
        console.log(data);
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

    const handleToogle = () => {
        setToogle(!toogle);
    }   

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
            <div className='submenu-container'>
                <button 
                    className='submenu-btn'
                    onClick={handleToogle}
                >
                        <div>
                            {
                                toogle ?
                                    <IoSkullOutline size="32" />
                                :
                                    <TiFlowChildren size="32"/>
                            }
                        </div>
                </button>
            </div>
            <div className="table-container animate__animated animate__zoomIn">
                {
                    toogle ? 
                        <ProcessTree />
                    : <Table headers={heads} data={processes} handleKill={handleKill} />
                }   
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
