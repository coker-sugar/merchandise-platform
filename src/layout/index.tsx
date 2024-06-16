/**
 * TODO: 布局
 */
import React from "react";
import { Flex, Layout } from "antd";
import { Outlet } from 'react-router-dom';
import Aside from '../components/HomePage/aside/index'
import "./index.css";
const { Sider, Content } = Layout;

const asideStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  display: "flex",
  minWidth: "calc(50% - 8px)",
  alignItems: "center"
};

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
};

const LayoutPage: React.FC = () => {
  return (
    <Flex gap="middle" wrap className={"layoutPage"}> 
      <Layout style={layoutStyle}>
        <Sider style={asideStyle}>
          <Aside />
        </Sider>

        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Flex>
  );
};

export default LayoutPage;
