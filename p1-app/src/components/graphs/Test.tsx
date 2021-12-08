import { LineChart, LineChartProps } from "@opd/g2plot-react";
import { w3cwebsocket } from 'websocket';
import { useEffect } from "react";
import { GraphLineData, RAMData } from '../../interfaces/RamScreen';
import moment from 'moment';

import '../../Styles/graphs/graphs.scss';

let dataArray : GraphLineData[] = [
  {
    date: '',
    type: 'ram',
    value: 0
  },
];

const client = new w3cwebsocket('ws://localhost:4000/ram');

const config: LineChartProps = {
  /* theme: "dark", */
  padding: "auto",
  autoFit: true,
  data: dataArray,
  xField: "date",
  yField: "value",
  xAxis: {
    label: {
      autoHide: true,
    }
  },
  yAxis: {
    label: {
      // 数值格式化为千分位
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
    },
  },
  legend: {
    position: "right-top"
  },
  seriesField: "type",

};

const GraphLine = () => {
  /* const [dataGraph, setDataGraph] = useState<GraphLineData>({
        time: '17',
        type: 'ram',
        value: '16',
    })
 */
  useEffect(() => {
    client.onopen = () => {
      console.log("Websocket client connected")
      const obj = { run: "start" };
      client.send(JSON.stringify(obj));
    }

    client.onmessage = (evt) => {
      console.log("Received Message: " + evt.data);
      const data :RAMData = JSON.parse(JSON.stringify(evt.data));
      /* setDataGraph({value: data.value, time: '', type: 'ram'}); */
      dataArray.push({date: moment().format('LTS'), type: 'ram', value: parseFloat(data.used) }) 
      dataArray.shift();
    };
     
    client.onclose = (evt) => {
      console.log("Connection closed.");
    };
  }, [])

  return (
    <>
      <LineChart className="graph" {...config} data={dataArray} />
    </>
  );
};

export default GraphLine;