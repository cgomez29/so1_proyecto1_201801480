import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { w3cwebsocket } from 'websocket';

import '../../Styles/graphs/graphs.scss';

const client = new w3cwebsocket('ws://localhost:4000/ram');

export const ChartRam: React.FC<any> = () => {
    const [data, updateData] = useState<number[]>([0,0,0,0,0,0,0,0,0,0])

    const options = {
      chart: {
        background: '#454545',
        foreColor: '#ffffff',
        id: 'realtime',
        height: 350,
        animations: {
            enabled: true,
            dynamicAnimation: {
              speed: 10
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
          enabled: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            max: 17000,
            min: 0
        },
        legend: {
            show: false
        },
      }, 
      colors: ['#37574b', '#E91E63'],
      
      
    };



    useEffect(() => {
        client.onopen = () => {
          console.log("Websocket client connected")
          const obj = { run: "start" };
          client.send(JSON.stringify(obj));
        }
    
        client.onmessage = (evt) => {
            const dataR = JSON.parse((evt.data).toString());
            console.log(parseFloat(dataR?.used));
            let array = [parseFloat(dataR?.used), ...data ];
            
            updateData(array.slice(0,9));

        };
         
        client.onclose = (evt) => {
          console.log("Connection closed.");
        };
    }, [data])

    const series = [
      {
        name: "RAM (MB)",
        data: data.slice()
      },
    ];
  
    return (
        <ReactApexChart
          className="graph"
          type="area"
          data= {data}
          options={options}
          series={series}
        />
    );
  };