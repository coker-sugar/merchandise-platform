import { createBrowserRouter, RouteObject } from "react-router-dom";
/**
 * TODO: 路由配置
 */
import Layout from "../layout";
// 登录
import Login from "../pages/PageLogin"
//注册
import Register from "../pages/Register"

import Remeber from '../pages/Remeber'

import Detail from "../pages/detail"

import Landing from "../pages/Landing"
//商品管理页面
import Manage from "../pages/Manage"

// 示例：redux的使用
import Exmple from "../pages/exmple/exmple"

// 新建商品页
import NewProduct from "../pages/NewProduct";

//数据大盘页
import DataBoard from '../pages/DataBoard'

// 404页面
import NotFoundPage from "../pages/404";


import PrivateRoute from '../components/PrivateRoute';  // 引入PrivateRoute

import PrivateRouter from "./privateRoute";
const routes: RouteObject[] = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/remeber",
    element: <Remeber />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Manage />,
      },

      {
        path: "/DataBoard", 
        element:
          <PrivateRouter>
            <DataBoard />
          </PrivateRouter>,  
      },
    ],
  },
  {
    path: "/NewProduct",  
    element: <PrivateRouter>
      <NewProduct />
    </PrivateRouter>
  },
  {
    path: "/detail",
    element: <PrivateRouter>
      <Detail />
    </PrivateRouter>,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
