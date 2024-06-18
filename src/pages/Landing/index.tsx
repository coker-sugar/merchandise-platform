import React,{ useState } from 'react';  
import './index.css';
import {Button, Menu} from 'antd'
import {Link} from 'react-router-dom'
import LandingCard from '../../components/LandingCard';


function Landing() {  
  //记录哪个导航栏处于active状态
  const [key,setKey] = useState(['home'])
  //卡片渲染数据
  const cardData=[
    {
      title:'渠道运营',
      subTitle:'多渠道整合，选择合适的营销渠道',
      imgUrl:'https://picture.gptkong.com/20240617/1449174f502a534c1ca40e8ff825fd4991.jpg',
    },
    {
      title:'活跃运营',
      subTitle:'场景活跃 MAU重点建设',
      imgUrl:'https://picture.gptkong.com/20240617/14501bdfa247fa44ff9027bebafcc13093.jpg',
    },
    {
      title:'支付宝会员',
      subTitle:'会员等级、积分兑换、权益特权、成长体系',
      imgUrl:'https://picture.gptkong.com/20240617/1450ab28c1418e4992bf2b2f4ffc1bbd11.jpg',
    }
  ]
  return (  
    <div className='landing'>
      {/* 头部 */}
      <div className='landing-header'>
        {/* logo */}
        <img src="https://picture.gptkong.com/20240617/15010d95392ca44dd28eb6dc1042662585.png"  alt="" />
        {/* 菜单栏 */}
        <Menu  className='landing-menu' mode="horizontal" selectedKeys={key}>
          <Menu.Item key="home" onClick={()=>{ setKey(['home'])}}>
            <Link to='/'>首页</Link>
          </Menu.Item>
          <Menu.Item key="about" onClick={()=>{ setKey(['about'])}}>
            <Link to='/register'>用户运营</Link>
          </Menu.Item>
        </Menu>
        {/* 登录注册按钮 */}
        <Button className='landing-button' ><Link to='/login'>登陆/注册</Link></Button>
      </div>
      {/* 内容 */}
      <div className='landing-content'>
        {/* 大图片 */}
        <img className='landing-cover' src="https://picture.gptkong.com/20240617/1526d79b94ac7141a99f205b6e861e4621.jpg" width={'80vm'} alt="" />
        {/* 中间的slogan */}
        <div className="landing-slogan">
          <h2 style={{margin:'0 auto'}}>用户运营</h2>
          <p style={{color:'grey'}}>渠道运营、活跃运营、忠诚度运营，贯穿用户生命周期的全栈运营</p>
        </div>
        {/* 卡片 */}
        <div className="landing-cards">
          {cardData.map((item, index) => (  
          <LandingCard 
          imgUrl={item.imgUrl} 
          title={item.title} 
          subTitle={item.subTitle}
          />  
      ))}  
        </div>
      </div>
      {/* 底部 */}
      <div className="landing-footer">
        <div className="landing-contain">
          <div className="landing-left">
            <img  src="https://picture.gptkong.com/20240617/1528da0bf23a744e3a935a08b0c7331bed.png" alt=''/>
            <a href="https://www.antgroup.com/">|会员技术部</a>
          </div>
            
          <div className="landing-right">
            <a href="https://www.antgroup.com/">联系我们</a>&nbsp;&nbsp;
            <a href="https://www.antgroup.com/">加入我们</a>
          </div>
        </div>
        
      
        
          
      
        
      </div>
     

      
    </div>
  );  
}  
  
export default Landing;