/**
 * TODO: 布局
 */
import React from "react";
import { Flex, Layout } from "antd";
import { Outlet } from 'react-router-dom';
import Aside from '../components/aside/index'
import "./index.css";
const { Sider, Content } = Layout;


const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#f4f4f4",
};

const layoutStyle = {
  overflow: "hidden",
  minWidth: "calc(50% - 8px)",
  minHeight: "96vh",
};

const LayoutPage: React.FC = () => {
  return (
    <Flex gap="middle" > 
      <Layout style={layoutStyle}>
        <Sider >
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
