/**
 * TODO: 布局
 */
import React from "react";
import { Flex, Layout } from "antd";
import { Outlet } from 'react-router-dom';
import Aside from '../components/aside/index'
import "./index.css";
const { Sider, Content } = Layout;


const LayoutPage: React.FC = () => {
  return (
    <Flex gap="middle" wrap className="layoutPage"> 
      <Layout className="layout">
        <Sider className="layout-sider">
          <Aside />
        </Sider>

        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Flex>
  );
};

export default LayoutPage;
