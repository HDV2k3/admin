// components/DashboardSidebar.tsx

import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PieChartOutlined,
  BarChartOutlined,
  SettingOutlined,
  DashboardOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;

const DashboardSidebar: React.FC = () => (
  <Sider
    width={200}
    className="site-layout-background"
    style={{ minHeight: "100vh" }}
  >
    <Menu mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%" }}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DashboardOutlined />}>
        <Link href="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<PieChartOutlined />}>
        <Link href="/dashboard/analytics">Analytics</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<MessageOutlined />}>
        <Link href="/support">Support</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<BarChartOutlined />}>
        <Link href="/dashboard/reports">Reports</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<SettingOutlined />}>
        <Link href="/dashboard/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default DashboardSidebar;
