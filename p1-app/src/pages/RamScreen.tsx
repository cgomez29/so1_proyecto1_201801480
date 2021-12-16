import { useEffect, useRef, useState } from 'react';
import { ChartRam } from '../components/graphs/ChartRam';
import { Card } from '../components/Card/Card';
import { getRamState } from '../helpers/Ram';
import { RAMData } from '../interfaces/RamScreen';
import { AxiosResponse } from 'axios';
import { w3cwebsocket } from 'websocket';

import '../Styles/RAMScreen/RAMScreen.scss';

export const RamScreen = () => {
    const [data, updateData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const client = useRef<any>(null);

    const [ram, setRam] = useState<RAMData>({
        total: '',
        used: '',
        percentage: ''
    })

    const { total, used, percentage } = ram;

    useEffect(() => {
        getRamState().then(({ data }: AxiosResponse) => {
            setRam(data)
        });
    }, []);

    useEffect(() => {
        client.current = new w3cwebsocket('ws://localhost:4000/ram');
        client.current.onopen = () => {
            console.log("Websocket client connected")
            const obj = { run: "start" };
            client.current.send(JSON.stringify(obj));
        }

        client.current.onmessage = (evt: any) => {
            const dataR: RAMData = JSON.parse((evt.data).toString());
            setRam(dataR);

            updateData(current => {
                const array = [...current, parseFloat(dataR.percentage)];
                if (current.length >= 9) {
                    array.shift();
                }
                return array
            });
        };

        client.current.onclose = () => {
            console.log("Connection closed.");
        };

        return () => client.current.close();

    }, [])

    return (
        <>
            <h1>
                RAM
            </h1>
            <Card title={'Total RAM (MB)'} body={total} />
            <Card title={'Used RAM (MB)'} body={used} />
            <Card title={'%RAM'} body={percentage} />
            <h3 className='ram-chart-title'>Consumo de RAM</h3>
            <ChartRam data={data} />
        </>
    )
}
