import { useState, useEffect } from 'react';
import { Form, DatePicker, Input, Select, Button } from 'antd';
import './index.css'
import ProductList from '../../components/ProductList';
import { FilterType } from '../../types/manage'
import { searchAPI } from '../../api/manage';
const { Option } = Select;


const Manage = () => {
  // 商品数据 
  const [products, setProducts] = useState([
    { id: '1', name: '商品1', stock: 100, startTime: '2024-06-01', endTime: '2024-06-30', status: 3, manager: '管理员A' },
    { id: '2', name: '商品2', stock: 50, startTime: '2024-07-01', endTime: '2024-07-31', status: 6, manager: '管理员B' },
    { id: '3', name: '商品2', stock: 50, startTime: '2024-07-01', endTime: '2024-07-31', status: 5, manager: '管理员B' },
    { id: '4', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 1, manager: '管理员B' },
    { id: '5', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 2, manager: '管理员B' },
    { id: '6', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 3, manager: '管理员B' },
    { id: '7', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 4, manager: '管理员B' },
    { id: '8', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 5, manager: '管理员B' },
    { id: '9', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 6, manager: '管理员B' },
    { id: '10', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 6, manager: '管理员B' },
    { id: '11', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 6, manager: '管理员B' },
    { id: '12', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 6, manager: '管理员B' },
    { id: '13', name: '商品2', stock: 50, startTime: '2023-07-01', endTime: '2024-07-31', status: 6, manager: '管理员B' },
  ]);
  // const [products, setProducts] = useState([]);
  // 从子组件获取数据
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  // 查询表单的数据
  const [filters, setFilters] = useState({
    productId: '',
    productName: '',
    startTime: '',
    endTime: '',
    productStatus: 0,
    manager: ''
  });
  // 重置按钮
  const handleReset = () => {
    setFilters({
      productId: '',
      productName: '',
      startTime: '',
      endTime: '',
      productStatus: 0,
      manager: ''
    });
  };
  // 处理查询逻辑
  const handleSubmit = (filterData: FilterType) => {
    console.log(filterData);
    searchAPI(filterData).then(res => {
      console.log(res)
      console.log(JSON.parse(res.data));
      setProducts(JSON.parse(res.data))
    }).catch(err => {
      console.log(err)
      console.log('请求错误')
    })
  };

  useEffect(() => {
    // 初始渲染时执行一次handleSubmit
    handleSubmit({ ...filters, pageNo: currentPage, pageSize: pageSize });
  }, [currentPage, pageSize]);

  return (

    <div className="manage">
      {/* 查询表单 */}
      <Form className='manage-form' layout="inline" onFinish={() => handleSubmit({ ...filters, pageNo: currentPage, pageSize: pageSize })}>
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
          <Select value={filters.productStatus } onChange={value => setFilters({ ...filters, productStatus: value })} style={{ width: 180 }}>
            <Option value={0}>请选择商品状态</Option>
            <Option value={1}>暂存</Option>
            <Option value={2}>审核中</Option>
            <Option value={3}>审核通过</Option>
            <Option value={4}>审核驳回</Option>
            <Option value={5}>上线</Option>
            <Option value={6}>下线</Option>
          </Select>
        </Form.Item>
        <Form.Item label="管理人">
          <Input value={filters.manager} onChange={e => setFilters({ ...filters, manager: e.target.value })} />
        </Form.Item>
        <Form.Item style={{ marginLeft: '20vw' }}>
          <Button type="primary" htmlType="submit">查询</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
      </Form>
      {/* 商品列表 */}
      <ProductList currentPage={currentPage} pageSize={pageSize} onChange={handleTableChange} products={products}></ProductList>
    </div>


  );
};

export default Manage;