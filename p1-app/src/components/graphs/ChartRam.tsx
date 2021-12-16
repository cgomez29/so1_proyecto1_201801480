import ReactApexChart from 'react-apexcharts';
import '../../Styles/graphs/graphs.scss';

interface ChartRamProps {
  data: number[]
}

export const ChartRam: React.FC<any> = ({ data }: ChartRamProps) => {
  const options = {
    chart: {

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

  const series = [
    {
      name: "RAM %",
      data: data.slice()
    },
  ];

  return (
    <ReactApexChart
      className="graph"
      type="area"
      data={data}
      options={options}
      series={series}
      height={420}
    />
  );
};