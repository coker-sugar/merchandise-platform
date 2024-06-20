import { Flex } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function Aside() {
  const location = useLocation();
  const categories = [
    { "id": 0, "name": "首页", "path": "/" },
    { "id": 1, "name": "样例", "path": "/exmple" },
    { "id": 2, "name": "新建商品页", "path": "/newProduct" },
    { "id": 3, "name": "数据大盘页", "path": "/dataBoard" },
    
  ]
  return (
    <Flex vertical={true} gap="large" style={{ justifyContent: "space-around" }}>
      {categories.map((item: any) => (
        <div key={item.id} className="marginRight">
          <Link className={`navlink ${location.pathname === item.path ? 'linkNow' : ''}`} to={item.path}> {item.name}</Link>
        </div>
      ))}
    </Flex>
  );
}

export default Aside;