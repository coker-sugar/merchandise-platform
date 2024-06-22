import { useState, useEffect } from 'react';
import { Table, Button, Tabs, Checkbox, Popconfirm ,Radio} from 'antd';
import { Link } from 'react-router-dom';
import './index.css'
import { RowType } from '../../types/manage'
import { batchesOfflineAPI, getProductDetailAPI } from '../../api/manage';
const { TabPane } = Tabs;

// 从父组件获取的props
interface ProductTableProps {
  currentPage: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  products: RowType[]
}

const ProductList: React.FC<ProductTableProps> = ({ currentPage, pageSize, onChange, products }) => {
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
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]); 

  const [currentUser, setCurrentUser] = useState('admin');

  useEffect(() => {
    // 在组件挂载时从本地存储中获取角色名
    const role =  JSON.parse(localStorage.getItem('userdata')).username 
    setCurrentUser(role)
  }, []);
  // console.log(JSON.parse(localStorage.getItem('userdata')).username);
  //  const role = JSON.parse(localStorage.getItem('userdata')).username




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

  // 列表
  const columns = [
    {
      title: '商品ID', dataIndex: 'id', key: 'id', onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) })
    },
    { title: '商品名称', dataIndex: 'name', key: 'name', onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) }) },
    { title: '库存', dataIndex: 'stock', key: 'stock', onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) }) },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime', onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) }) },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime', onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) }) },
    {
      title: '商品状态', dataIndex: 'status', key: 'status', render: (status: number) => statusMap[status],
      onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) })
    },
    { title: '管理人', dataIndex: 'manager', key: 'manager', onCell: (record: RowType) => ({ onClick: () => handleRowClick(record) }) },
    // 操作（超级管理员）
    {

      title: '操作',
      key: 'action',
      render: (record: RowType) => {
        // console.log(record);
        return (
          <div >
            {currentUser === 'admin' && (
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

  // 行点击函数
  const handleRowClick = (record: RowType) => {
    getProductDetailAPI(record.id).then(res => {
      console.log(res);
      const data = {
        id: record.id,
        productDetail: res.data
      }
      localStorage.setItem('ProductDetailData', JSON.stringify(data));
    }).catch(err => {
      console.log(err);
    })

  }
  // 商品下线API
  const handleToggleStatus = (productIDs: string[] | string = []) => {
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


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: RowType[]) => {
      // 提取selectedRows数组中每个对象的id值
      const selectedIds = selectedRows.map(row => row.id);

      // 使用setSelectedIDs函数将id值设置为selected状态
      setSelectedIDs(selectedIds);
    },
    getCheckboxProps: (record: RowType) => ({
      disabled: record.status !== 5,
      // name: record.name,
    }),
  };


  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* 新建商品 */}
      <div className='new-product'>
        <h2>商品列表</h2>
        <div>
          <Link to="/NewProduct">
            <Button type="primary">新建商品</Button>
          </Link>
          <Popconfirm
            title="确认操作?"
            onConfirm={() =>handleToggleStatus(selectedIDs)}
            okText="是"
            cancelText="否"
          >
            <Button 
              style={{display:currentUser === 'admin'?'line-block':'none'}} 
              >批量下线
            </Button>
          </Popconfirm>
        </div>
      </div>

      <div>
        {/* TAB栏 */}
        <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)} style={{ padding: '0 20px' }}>
          <TabPane tab="全部" key="all" />
          <TabPane tab="已上线" key="active" />
          <TabPane tab="已下线" key="inactive" />
        </Tabs>
        {/* 商品列表 */}

        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          
          style={{ padding: '0 20px' }}
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
