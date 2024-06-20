// 搭建基础信息组件
import React from 'react';
import { Flex, Table } from 'antd'
import type { TableColumnsType } from 'antd';
import { BasicInformationProps, DataType } from '../../types/detail'


const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'ID',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '操作时间',
        dataIndex: 'time',
    },
    {
        title: '操作人',
        dataIndex: 'operator',
    },
];
const data: DataType[] = [];
for (let i = 0; i < 26; i++) {
    data.push({
        key: i,
        ID: ` ${i}`,
        status: '审核中',
        time: `时间${i}`,
        operator: "zs"
    });
}


const BasicInformation: React.FC<BasicInformationProps> = (basic) => {

    return (
        <Flex vertical={true} gap="middle">
            <h3>基础信息</h3>
            <Flex className="basic-info" wrap={true} gap="middle">
                <div>商品名称：{basic.name}</div>
                <div>权益类型：{basic.typeId}</div>
                <div>描述信息：{basic.description}</div>
                <div>富文本：</div>
                <div>类目：{basic.categoryId}</div>
                <div>服务保障：{basic.serviceGuarantee}</div>
                <div>兑换限制：{basic.exchangeRestriction}</div>
                <div>创建时间：{basic.createTime}</div>
                <div>修改时间：{basic.updateTime}</div>
                <div>显示时间：{basic.time_on}-{basic.time_off}</div>
            </Flex>

            <h3>商品图片{`(${basic.picture.length})`}</h3>
            <Flex wrap={true} justify='space-between' className='img-container'>
                {basic.picture.map((item: string,index) => <img key={index} src={item} alt="" />) }
            </Flex>

            <h3>投放城市</h3>
            <Flex className="basic-info" vertical={true} gap="middle">
                <div>城市白名单：{basic.cityWhiteList}</div>
                <div>城市黑名单：{basic.cityBlackList}</div>
            </Flex>

            <h3>供应商信息</h3>
            <Flex className="basic-info">
                <div>供应商名称：{basic.Gname}</div>
                <div>供应商联系方式：{basic.Gphone}</div>
                <div></div>
            </Flex>

            <Table className='table' columns={columns} dataSource={data} />
        </Flex>
    )
}

export default BasicInformation;