import { useState, useEffect } from 'react';
import { Form, DatePicker, Input, Select, Button } from 'antd';
import './index.css'
import ProductList from '../../components/ProductList';
import { FilterType } from '../../types/manage'
import { searchAPI } from '../../api/manage';
import moment from 'moment';
const { Option } = Select;


const Manage = () => {
  // 商品数据 
  const [products, setProducts] = useState([]);
  // 从子组件获取数据
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  
  // 查询表单的数据
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    startTime: '',
    endTime: '',
    state: 0,
    caretaker: '',
    pageNo:currentPage,
    pageSize:pageSize,

  });
  // 重置按钮
  const handleReset = () => {
    setFilters({
      id: '',
      name: '',
      startTime: '',
      endTime: '',
      state: 0,
      caretaker: '',
      pageNo: currentPage,
      pageSize: pageSize,
    });
  };
  // 处理查询逻辑
  const handleSubmit = (filterData:FilterType) => {
    console.log(filterData);
    searchAPI(filterData).then(res => {
      console.log(res.data.records)
      setProducts(res.data.records)
    }).catch(err => {
      console.log(err)
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
          <Input value={filters.id} onChange={e => setFilters({ ...filters, id: e.target.value })} />
        </Form.Item>
        <Form.Item label="商品名称">
          <Input value={filters.name} onChange={e => setFilters({ ...filters, name: e.target.value })} />
        </Form.Item>
        <Form.Item label="上线时间">
          <DatePicker value={filters.startTime ? moment(filters.startTime) : null} onChange={date => 
            {
            if (date) {
              const formattedDate = date.format('YYYY-MM-DD')+'T00:00:00';
              console.log(formattedDate);
              setFilters({ ...filters, startTime: formattedDate });
            } else {
              setFilters({ ...filters, startTime: '' });
            }
            
            }
          } />
        </Form.Item>
        <Form.Item label="下线时间">
          <DatePicker value={filters.endTime ? moment(filters.endTime) : null} onChange={date => {
            if (date) {
              const formattedDate = date.format('YYYY-MM-DD') + 'T12:00:00';
              console.log(formattedDate);
              setFilters({ ...filters, endTime: formattedDate });
            } else {
              setFilters({ ...filters, endTime: '' });
            }

          }

          } />
        </Form.Item>
        <Form.Item label="商品状态">
          <Select value={filters.state } onChange={value => setFilters({ ...filters, state: value })} style={{ width: 180 }}>
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
          <Input value={filters.caretaker} onChange={e => setFilters({ ...filters, caretaker: e.target.value })} />
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