import { LineChart, LineChartProps } from "@opd/g2plot-react";
import '../../Styles/graphs/graphs.scss';


const data = [
  {
    date: "1",
    type: "download",
    value: 4623
  },
  {
    date: "2018/8/1",
    type: "bill",
    value: 182
  },
  {
    date: "2018/8/2",
    type: "download",
    value: 6145
  },
  {
    date: "2018/8/2",
    type: "register",
    value: 2016
  },
  {
    date: "2018/8/2",
    type: "bill",
    value: 257
  },
  {
    date: "2018/8/3",
    type: "download",
    value: 508
  },
  {
    date: "2018/8/3",
    type: "register",
    value: 2916
  },
  {
    date: "2018/8/3",
    type: "bill",
    value: 289
  },
  {
    date: "2018/8/4",
    type: "download",
    value: 6268
  },
  {
    date: "2018/8/4",
    type: "register",
    value: 4512
  },
  {
    date: "2018/8/4",
    type: "bill",
    value: 428
  },
  {
    date: "2018/8/5",
    type: "download",
    value: 6411
  },
  {
    date: "2018/8/5",
    type: "register",
    value: 8281
  },
  {
    date: "2018/8/5",
    type: "bill",
    value: 619
  },
  {
    date: "2018/8/6",
    type: "download",
    value: 1890
  },
  {
    date: "2018/8/6",
    type: "register",
    value: 2008
  },
  {
    date: "2018/8/6",
    type: "bill",
    value: 87
  },
];

const config: LineChartProps = {
  /* theme: "dark", */
  padding: "auto",
  autoFit: true,
  data,
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
  seriesField: "type"
};

const GraphLine = () => {

  return (
    <>
      <LineChart className="graph" {...config} />
    </>
  );
};

export default GraphLine;