import { Card } from '../components/Card/Card';
import { useEffect, useRef, useState } from 'react';
import { w3cwebsocket } from 'websocket';
import { UsedCPU } from '../interfaces/CPUScreen';
import { ChartCPU } from '../components/graphs/ChartCPU';

import '../Styles/CPUScreen/CPUScreen.scss';


export const CPUScreen = () => {
  const [data, updateData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [now, setNow] = useState<number>(0);
  const client = useRef<any>(null);
  
  useEffect(() => {
    client.current = new w3cwebsocket('ws://localhost:4000/ucpu');

    client.current.onopen = () => {
      console.log("Websocket client connected")
      const obj = { run: "start" };
      client.current.send(JSON.stringify(obj));
    }

    client.current.onclose = () => {
      console.log("Connection closed.");
    };
    
    client.current.onmessage = (evt :any) => {
      const dataR: UsedCPU = JSON.parse((evt.data).toString());
      let num: number = parseFloat(dataR.cpu.toFixed(2));
      setNow(num);
      
      updateData(current => {
        const array = [...current, num];
        if (current.length >= 9) {
          array.shift();
        }
        return array
      });
    };

    return () => {
      client.current.close();
      client.current = null;
    }
 
  }, [])
  
  return (
    <>
      <h1>
        CPUScreen
      </h1>
      <div className='cpu-card-container'>
        <Card title={'% CPU'} body={`${now}`} />
      </div>
      <ChartCPU data={data} />
    </>
  )
}
