import React from 'react';
// 高阶组件，判断用户是否登录来决定是否进入页面
import { Navigate } from 'react-router-dom';

const PrivateRouter = ( {children} ) => {
  const user = localStorage.getItem('user');

  return user ? children : <Navigate to="/landing" />;
};

export default PrivateRouter;
