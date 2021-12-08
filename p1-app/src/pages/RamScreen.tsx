import { useEffect, useState } from 'react';
import GraphLine from '../components/graphs/Test';
import { w3cwebsocket } from 'websocket';
import { Card } from '../components/Card/Card'
import { getRamState } from '../helpers/Ram'
import { RAMData } from '../interfaces/RamScreen'
const client = new w3cwebsocket('ws://localhost:4000/ram');


export const RamScreen = () => {
    
    const [ram, setRam] = useState<RAMData>({
        total: '',
        used: '',
        percentage: ''
    })

    const { total, used, percentage } = ram;

    useEffect(() => {

       getRamState().then(({ data }) => {
           setRam(data)
       })
        
        client.onopen = () => {
            console.log("Websocket client connected")
            const obj = { run: "start" };
            client.send(JSON.stringify(obj));
        }

        client.onmessage = (evt) => {
            console.log("Received Message: " + evt.data);
        };
        
        client.onclose = function (evt) {
          console.log("Connection closed.");
        };
    }, [])

    return (
        <>
            <h1>
                RamScreen
            </h1>
            <Card title={ 'Total RAM (MB)' } body={ total } />
            <Card title={ 'Used RAM (MB)' } body={ used } />
            <Card title={ '%RAM' } body={ percentage } />
            <GraphLine />
        </>
    )
}
