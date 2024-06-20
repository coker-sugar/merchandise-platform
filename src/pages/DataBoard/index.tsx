import React from 'react';
import { Line, Column, Pie } from '@ant-design/charts';
import  {Tabs}  from 'antd';
import   exchangeData  from './data.tsx';
import   salesData  from './data.tsx';
import   exchangeTypeData  from './data.tsx';


const LineChart = () => (
  <Line data={exchangeData.exchangeData} xField="type" yField="value" />
);

const ColumnChart = () => (
  <Column data={salesData.salesData} xField="type" yField="value" />
);

const PieChart = () => (
  <Pie data={exchangeTypeData.exchangeTypeData} angleField="value" colorField="type" />
);


const DataBoard = () => {
  return (
    <Tabs>
      <Tabs.TabPane tab="折线图" key="1">
        <LineChart />
      </Tabs.TabPane>
      <Tabs.TabPane tab="柱状图" key="2">
        <ColumnChart />
      </Tabs.TabPane>
      <Tabs.TabPane tab="饼图" key="3">
        <PieChart />
      </Tabs.TabPane>
    </Tabs>
  );
};


// const DataBoard = () => {
//   return (
//     <div>
//       <Line data={exchangeData.exchangeData} xField="type" yField="value"  width={500} height={300}/>
//       <Column data={salesData.salesData} xField="type" yField="value" width={500} height={300}/>
//       <Pie data={exchangeTypeData.exchangeTypeData} angleField="value" colorField="type" width={500} height={300} />
//     </div>
//   );
// };

export default DataBoard;