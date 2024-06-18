import { createBrowserRouter, RouteObject } from "react-router-dom";
/**
 * TODO: 路由配置
 */
import Layout from "../layout";
// 登录
import Login from "../pages/PageLogin"
import Landing from "../pages/Landing"
import Register from "../pages/Register"
// 示例：redux的使用
import Exmple from "../pages/exmple/exmple"

// 404页面
import NotFoundPage from "../pages/404";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },   
      {
        path: "/exmple",
        element: <Exmple />,
      },     
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
