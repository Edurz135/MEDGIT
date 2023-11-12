import React from "react";
import { Typography, Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";

const Sidebar = ({ tabsData, logoutItems, collapsed }) => {
  const { Sider } = Layout;

  return (
    <Sider collapsed={!collapsed} className="barra-lateral" style={{ background: "white" }}>
      <div className="menu">
        <Typography.Title level={1} style={{ color: "darkblue", fontSize: "30px", textAlign: "center" }}>
          M
        </Typography.Title>

        <Menu mode="inline" defaultSelectedKeys={["0"]} className="menu-container">
          {tabsData.map((tab) => (
            <Menu.Item key={tab.index}>
              <Link to={tab.url}>
                {tab.icon}
                <span>{tab.label}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>

        <Menu mode="inline" className="menu-container2">
          {logoutItems.map((logout) => (
            <Menu.Item key={logout.index} onClick={logout.onClick}>
              {logout.icon}
              <span>{logout.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;