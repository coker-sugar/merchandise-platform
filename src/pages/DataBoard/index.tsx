import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Line, Column, Pie } from '@ant-design/charts';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { exchangeAPI, saleTop20API, exchangeWayAPI } from '../../api/board'

// const exchangeData = [
//     { type: '2024-06-10', value: 80 },
//     { type: '2024-06-12', value: 90 },
//     { type: '2024-06-14', value: 100 },
//     { type: '2024-06-16', value: 110 },
//     { type: '2024-06-18', value: 120 },
//     { type: '2024-06-20', value: 130 }
//   ];

//   const saleTop20Data = [
//     { type: '美容洗护', value: 180 },
//     { type: '生鲜水果', value: 190 },
//     { type: '粮油副食', value: 200 },
//     { type: '母婴用品', value: 310 },
//     { type: '家电家具', value: 120 }   
//   ];

//   const exchangeWayData = [
//     { type: '纯积分', value: 100 },
//     { type: '积分加现金', value: 899 },
//     { type: '纯现金', value: 100 }
//   ];


const DataBoard = () => {
    
    let [tabKey, setTabKey] = useState('1');

    // 开始时间和结束时间
    const [startTime, setStartTime] = useState<Dayjs>(dayjs().subtract(8, 'day'));
    const [endTime, setEndTime] = useState<Dayjs>(dayjs().subtract(1, 'day'));


    const onChangeTab = (key: string) => {
        setTabKey(key);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '兑换量'
        },
        {
            key: '2',
            label: '销量Top20'
        },
        {
            key: '3',
            label: '兑换方式'
        }
    ];



    const Calendar: React.FC = () => {
        const disabledDate = (current: dayjs.Dayjs): boolean => {
            // if (!current) {
            //     return false;
            // }
            return current.isAfter(dayjs()) || current.isBefore(dayjs().subtract(60, 'days'));
        };

        const handleDateChange = (dates: [Dayjs, Dayjs]) => {
                
                setStartTime(dates[0]);
                setEndTime(dates[1]);
                console.log(startTime.format('YYYY-MM-DD'), endTime.format('YYYY-MM-DD'));

        };
        useEffect(() => {
            console.log(startTime.format('YYYY-MM-DD'), endTime.format('YYYY-MM-DD'));
        }, [startTime, endTime]);

        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <DatePicker.RangePicker
                    onChange={handleDateChange}
                    disabledDate={disabledDate}
                    defaultValue={[startTime, endTime]}
                />
            </div>
        );
    };

    // 折线图
    const LineChart = () => {
        const [exchangeData, setExchangeData] = useState<any>([]);
        // 格式转换
        const transformData = (exchangeData) => {
            const { exchangeDataList, timeList } = exchangeData;

            const data = exchangeDataList.map((value, index) => ({
                type: timeList[index],
                value: value,
            }));
            // console.log(data);

            return data;
        };

        const useDidUpdateEffect = (fn: any, times: any) => {
            const didMountRef = useRef(false);
            useEffect(() => {
                if (didMountRef.current) fn();
                else didMountRef.current = true;
            }, times);
        };

        useDidUpdateEffect(() => {
            const startTimeStr = startTime.format('YYYY-MM-DD');
            const endTimeStr = endTime.format('YYYY-MM-DD');
            // 在组件挂载后调用接口获取数据
            console.log(111,startTimeStr);

            exchangeAPI(startTimeStr, endTimeStr).then(res => {
                // console.log(transformData(res.data));
                setExchangeData(transformData(res.data));
            }).catch(error => {
                console.error(error);
            });

        }, [startTime, endTime]);
        const config = {
            data: exchangeData,
            xField: 'type',
            yField: 'value',}

        return (<Line {...config} />)
    }

    // 柱状图
    const ColumnChart = () => {
        const transformData = (saleTop20Data) => {
            const { categoriesDataList, saleList } = saleTop20Data;

            const data = categoriesDataList.map((value, index) => ({
                type: saleList[index],
                value: value,
            }));
            console.log(data);

            return data;
        };
        const [saleTop20Data, setsaleTop20Data] = useState<any>([])

        const useDidUpdateEffect = (fn: any, times: any) => {
            const didMountRef = useRef(false);
            useEffect(() => {
                if (didMountRef.current) fn();
                else didMountRef.current = true;
            }, times);
        };

        useDidUpdateEffect(() => {
            // console.log(startTime);
            const startTimeStr = startTime.format('YYYY-MM-DD');
            const endTimeStr = endTime.format('YYYY-MM-DD');
            // 在组件挂载后调用接口获取数据
            saleTop20API(startTimeStr, endTimeStr).then(res => {
                console.log(res);
                console.log(transformData(res.data));

                setsaleTop20Data(transformData(res.data));
            }).catch(error => {
                console.log(error);
            });
        }, [startTime, endTime]);

        return (<Column data={saleTop20Data} xField="value" yField="type" />)
    }
    // 饼图
    const PieChart = () => {
        const transformData = (exchangeWayData) => {
            const { priceTypeList, saleList } = exchangeWayData;

            const data = priceTypeList.map((value, index) => ({
                type: saleList[index],
                value: value,
            }));
            console.log(data);

            return data;
        };
        const [exchangeWayData, setexchangeWayData] = useState<any>([])

        const useDidUpdateEffect = (fn: any, times: any) => {
            const didMountRef = useRef(false);
            useEffect(() => {
                if (didMountRef.current) fn();
                else didMountRef.current = true;
            }, times);
        };

        useDidUpdateEffect(() => {
            const startTimeStr = startTime.format('YYYY-MM-DD');
            const endTimeStr = endTime.format('YYYY-MM-DD');
            // 在组件挂载后调用接口获取数据
            exchangeWayAPI(startTimeStr, endTimeStr).then(res => {
                console.log(res);
                
                setexchangeWayData(transformData(res.data));
            }).catch(error => {
                console.error('111',error);
            });
            // console.log(startTime);
        }, [startTime, endTime]);

        return (<Pie data={exchangeWayData} angleField="value" colorField="type" />);
    }


    return (
        <div>
            <Calendar></Calendar>
            <Tabs style={{ padding: '20px' }} defaultActiveKey="1" items={items} onChange={onChangeTab} />
            {tabKey == '1' && <LineChart />}
            {tabKey == '2' && <ColumnChart />}
            {tabKey == '3' && <PieChart />}
        </div>
    );
};


export default DataBoard;