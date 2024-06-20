import  { useState } from 'react';
import {  Form,DatePicker, Input, Select, Button } from 'antd';
import './index.css'
import ProductList from '../../components/ProductList';
import { FilterType} from '../../types/manage'
import { searchAPI } from '../../api/manage';
const { Option } = Select;


  const Manage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const handleTableChange = (page:number,pageSize:number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    };
    // 查询表单数据
    const [filters, setFilters] = useState({
      productId: '',
      productName: '',
      startTime: null,
      endTime: null,
      productStatus: '',
      manager: ''
    });
    // 重置按钮
    const handleReset = () => {
      setFilters({
        productId: '',
        productName: '',
        startTime: null,
        endTime: null,
        productStatus: '',
        manager: ''
      });
    };
    // 处理查询逻辑
    const handleSubmit = (filters) => {
      // console.log(filters);
      searchAPI({...filters,pageNo:currentPage,pageSize:pageSize}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    };
    
    return (
      
      
      
      <div className="manage">
        {/* 查询表单 */}
        <Form className='manage-form' layout="inline" onFinish={handleSubmit(filters)}>
          <Form.Item label="商品ID">
            <Input value={filters.productId} onChange={e => setFilters({ ...filters, productId: e.target.value })} />
          </Form.Item>
          <Form.Item label="商品名称">
            <Input value={filters.productName} onChange={e => setFilters({ ...filters, productName: e.target.value })} />
          </Form.Item>
          <Form.Item label="上线时间">
            <DatePicker value={filters.startTime} onChange={date => setFilters({ ...filters, startTime: date })} />
          </Form.Item>
          <Form.Item label="下线时间">
            <DatePicker value={filters.endTime} onChange={date => setFilters({ ...filters, endTime: date })} />
          </Form.Item>
          <Form.Item label="商品状态">
            <Select value={filters.productStatus|| '请选择商品状态'} onChange={value => setFilters({ ...filters, productStatus: value })} style={{ width: 180 }}>
              <Option value="1">暂存</Option>
              <Option value="2">审核中</Option>
              <Option value="3">审核通过</Option>
              <Option value="4">审核驳回</Option>
              <Option value="5">上线</Option>
              <Option value="6">下线</Option>
            </Select>
          </Form.Item>
          <Form.Item label="管理人">
            <Input value={filters.manager} onChange={e => setFilters({ ...filters, manager: e.target.value })} />
          </Form.Item>
          <Form.Item style={{ marginLeft:'20vw' }}>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
        {/* 商品列表 */}
        <ProductList currentPage={currentPage} pageSize={pageSize} onChange={handleTableChange} ></ProductList>
      </div>
      
      
    );
  };

export default Manage;