// pages/dashboard/index.tsx
"use client";
import { Layout } from "antd";
import DashboardContent from "./component/DashboardContent";
import DashboardHeader from "./component/DashboardHeader";
import DashboardSidebar from "./component/DashboardSidebar";

const { Content } = Layout;

const HomePage: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <DashboardSidebar />
    <Layout>
      <DashboardHeader />
      <Content style={{ margin: "16px" }}>
        <DashboardContent />
      </Content>
    </Layout>
  </Layout>
);

export default HomePage;


