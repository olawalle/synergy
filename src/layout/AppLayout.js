import React from "react";
import { DollarCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "/dashboard",
    icon: React.createElement(HomeOutlined),
    label: `Home`,
  },
  {
    key: "/dashboard/new-transaction",
    icon: React.createElement(DollarCircleOutlined),
    label: `New Transaction`,
  },
];

const AppLayout = () => {
  const navigation = useNavigate();
  const route = useLocation();

  const logoutHandler = () => {
    navigation("/");
  };

  return (
    <Layout className="h-100">
      <Sider className="h-[100vh]" breakpoint="lg" collapsedWidth="50">
        <div className="demo-logo-vertical h-[20px m-4 text-[20px] text-[#ffffff]">
          S<span className="hidden md:inline">ynergy</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[route.pathname]}
          items={items}
          onClick={(e) => {
            navigation(e.keyPath[0]);
          }}
        />
      </Sider>
      <Layout>
        <Header className="bg-white border-b-[1px] border-[#e9e9e9] pr-4 md:pr-[120px] flex justify-end items-center">
          <Dropdown
            menu={{
              items: [
                {
                  label: "Logout",
                  icon: <LogoutOutlined />,
                  onClick: logoutHandler,
                },
              ],
            }}
          >
            <div>
              <span className="mr-2 text-[12px] text-[#808080]">Test User</span>{" "}
              <Avatar src="https://randomuser.me/api/portraits/men/44.jpg" />
            </div>
          </Dropdown>
        </Header>
        <Content className="min-h-[80vh] max-h-[93vh] overflow-y-auto bg-[#ffffff]">
          <div className="h-full py-6 bg-[#fafafa]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
