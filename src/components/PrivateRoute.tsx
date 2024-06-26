// 判断用户是否登录
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from "../layout/index";

const PrivateRoute: React.FC = () => {
  const isLoggedIn = () => {
    //检查本地是否有账号 并且 auto是否为true，如果为true就进入，否则就进入landing页
    return !!localStorage.getItem('user') 

    // return !!localStorage.getItem('user') 
    // return true
// >>>>>>> db6737b57a0bb6cb54946b29c0a59a5b82aea8c4
  };

  return isLoggedIn() ? <Layout /> : <Navigate to="/landing" />;
};

export default PrivateRoute;
