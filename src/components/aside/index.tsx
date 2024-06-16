import { Flex } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function Aside() {
  const location = useLocation();
  const categories = [
    { "id": 0, "name": "首页", "path": "/" },
    { "id": 1, "name": "样例", "path": "/exmple" },
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