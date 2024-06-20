import { useState } from 'react';
import { Table, Button, Tabs,Checkbox,Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'
import{RowType}from'../../types/manage'
import { batchesOfflineAPI } from '../../api/manage';
const { TabPane } = Tabs;


interface ProductTableProps {
  currentPage: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}
const ProductList: React.FC<ProductTableProps> = ({ currentPage, pageSize, onChange }) =>  {
  // 处于active状态的tab栏
  const [selectedTab, setSelectedTab] = useState('all');
  // 商品状态
  const statusMap = {
    1: '暂存',
    2: '审核中',
    3: '审核通过',
    4: '审核驳回',
    5: '上线',
    6: '下线',
  };
  // 批量操作选中的商品id  
  // const [selectedIDs, setSelectedIDs] = useState([]);
  // 当前用户是小二还是管理人
  const [currentUser, setCurrentUser] = useState({role: 'admin'});
  // 商品数据 之后由父组件查询传过来
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
  // tab栏筛选列表
  const filteredTabProducts = products.filter((product) => {
    if (selectedTab === 'all') {
      return true;
    } else if (selectedTab === 'active') {
      return product.status === 5;
    } else if (selectedTab === 'inactive') {
      return product.status === 6;
    }
    return false;
  });
  
// //处理哪些商品ID被选中
// const handleCheckboxChange = (productId, e) => {
//   if (e.target.checked) {
//     setSelectedIDs([...selectedIDs, productId]);
//   } else {
//     setSelectedIDs(selectedIDs.filter(id => id !== productId));
//   }
// };
  // 列表
  
  const columns = [
    // 多选框
    // {
    // title: '选择',
    // dataIndex: 'selected',
    // key: 'selected',
    // render: (record) => (
    //   record ? <Checkbox onChange={(e) => handleCheckboxChange(record.id, e)} /> : null
    // ),
    // },

    { title: '商品ID', dataIndex: 'id', key: 'id' },
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    { title: '商品状态', dataIndex: 'status', key: 'status', render: (status) => statusMap[status] },
    { title: '管理人', dataIndex: 'manager', key: 'manager'},
    // 操作（超级管理员）
    {
      
    title: '操作',
    key: 'action',
    render: (record:RowType) => {
      // console.log(record);
      return (
        <div >
          {currentUser.role === 'admin' && (
            <Popconfirm
            title="确认操作?"
            onConfirm={() => handleToggleStatus(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button disabled={record.status !== 5} >
              {record.status !== 5 ? '上线' : '下线'}
            </Button>
          </Popconfirm>
          )}
        </div>
      );
    }
    },
  ];

  // 商品下线API
  const handleToggleStatus = (productIDs = []) => {
    if (!Array.isArray(productIDs)) {
      productIDs = [productIDs];
    }
    
    
    batchesOfflineAPI(productIDs).then((response) => {
        // 处理返回的数据
        console.log(response);
        
        // const updatedProducts = 
    }).catch((error) => {
        // 处理错误
        console.log(error);
        
    });
    // setProducts(updatedProducts);
  };




  return (
    <div style={{backgroundColor: '#fff'}}>
      {/* 新建商品 */}
      <div className='new-product'>
        <h2>商品列表</h2>
        <div>
          <Link to="/NewProduct">
          <Button type="primary">新建商品</Button>
          </Link>
          {/* <Popconfirm
            title="确认操作?"
            onConfirm={() =>handleToggleStatus(selectedIDs)}
            okText="是"
            cancelText="否"
          >
            <Button 
              style={{display:currentUser.role === 'admin'?'line-block':'none'}} 
              >批量下线
            </Button>
          </Popconfirm> */}
        </div>
      </div>
      
      
      <div>
        {/* TAB栏 */}
      <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
        <TabPane tab="全部" key="all" />
        <TabPane tab="已上线" key="active" />
        <TabPane tab="已下线" key="inactive" />
      </Tabs>
      {/* 商品列表 */}
      <Table  
        columns={columns} 
        dataSource={filteredTabProducts} 
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: onChange,
        }}
        rowClassName={(record) => {
          if (record.status === 6) {
            return 'inactive-row';
          } else if (record.status === 5 && new Date(record.startTime) > new Date()) {
            return 'upcoming-row';
          }
          return '';
        }}
      />
      </div>
    </div>
  );
};

export default ProductList;