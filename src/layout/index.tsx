/**
 * TODO: 布局
 */
import React from "react";
import { Flex, Layout } from "antd";
import { Outlet } from 'react-router-dom';
import Aside from '../components/aside/index'
import "./index.css";
const { Sider, Content } = Layout;
import Header  from '../components/header'


const LayoutPage: React.FC = () => {
  return (
    <>
    <Header />
      <Flex gap="middle" > 
      <Layout className="layoutStyle">
        <Sider className="asideStyle">
          <Aside />
        </Sider>

        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Flex>
    </>
  );
};

export default LayoutPage;
