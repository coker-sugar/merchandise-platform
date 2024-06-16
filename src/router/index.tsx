import { createBrowserRouter, RouteObject } from "react-router-dom";
/**
 * TODO: 路由配置
 */
import Layout from "../layout";
// 登录
import Login from "../components/PageLogin"
// 示例：redux的使用
import Exmple from "../components/exmple/exmple"
// 404页面
import NotFoundPage from "../components/404";

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
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
