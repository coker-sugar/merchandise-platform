import { Flex } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './index.less'
function Aside() {
  const location = useLocation();
  const categories = [
    { "id": 0, "name": "商品管理", "path": "/" },
    { "id": 1, "name": "数据大盘", "path": "/DataBoard" },
  ]
  return (
    <Flex className='aside' vertical={true} align='center' gap="large" style={{ justifyContent: "space-around" }}>
      {categories.map((item: any) => (
        <div key={item.id} className="marginRight">
          <Link className={`navlink ${location.pathname === item.path ? 'linkNow' : ''}`} to={item.path}> {item.name}</Link>
        </div>
      ))}
    </Flex>
  );
}

export default Aside;